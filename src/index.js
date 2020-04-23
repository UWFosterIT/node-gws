const AWS = require('aws-sdk');
const fs = require('fs');
const log4js = require('@log4js-node/log4js-api');
const util = require('util');
const _ = require('lodash');
const MicroCache = require('micro-cache');
const Group = require('./modules/group');
const Membership = require('./modules/membership');
const Search = require('./modules/search');

const FileCertificate = {
  readCertificate: async (opts) => {
    if (opts.cert === '' || opts.key === ''
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      || !fs.existsSync(opts.cert) || !fs.existsSync(opts.key)) {
      throw new Error(`Client cert '${opts.cert}' or key '${opts.key}' can not be found`);
    }

    return {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      cert: fs.readFileSync(opts.cert),
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      key: fs.readFileSync(opts.key),
      rejectUnauthorized: false,
    };
  },
};

const S3Certificate = {
  readCertificate: async (opts) => {
    const s3 = new AWS.S3();
    const cert = await s3.getObject({
      Bucket: opts.certBucket,
      Key: opts.certKey,
    }).promise().catch((err) => {
      throw Error('S3 get cert error', err);
    });
    const key = await s3.getObject({
      Bucket: opts.keyBucket,
      Key: opts.keyKey,
    }).promise().catch((err) => {
      throw Error('S3 get key error', err);
    });

    return {
      cert: cert.Body,
      key: key.Body,
      rejectUnauthorized: false,
    };
  },
};

async function readCertificate(options) {
  let certReader;
  let opts = options;

  switch (true) {
    case _.has(opts, 'file'):
      certReader = Object.create(FileCertificate);
      opts = opts.file;
      break;

    case _.has(opts, 's3'):
      certReader = Object.create(S3Certificate);
      opts = opts.s3;
      break;

    default:
      throw Error('Certificate reader not supported');
  }

  return certReader.readCertificate(opts);
}

const UWGWS = {
  async initialize(options) {
    const config = { ...options };
    config.auth = await readCertificate(config.certInfo);
    config.cache = new MicroCache(
      options.cachePath,
      options.logLevel,
      options.cacheExt,
    );

    config.log = log4js.getLogger('node-gws');

    this.group = new Group(config);
    this.membership = new Membership(config);
    this.search = new Search(config);

    return this;
  },
};

module.exports = UWGWS;

process.on('unhandledRejection', (reason, p) => {
  console.error(`Promise: ${util.inspect(p)}\nReason: ${reason}`);
  process.exit(1);
});
