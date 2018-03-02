'use strict';

let fs = require('fs');
let Group = require('./modules/group');
let log4js = require('log4js');
let Membership = require('./modules/membership');
let MicroCache = require('micro-cache');
let Search = require('./modules/search');

function readCertificate(cert = '', key = '') {
  if (cert === '' || key === '' || !fs.existsSync(cert) || !fs.existsSync(key)) {
    throw new Error(`Client cert ${cert} or key ${key} can not be found`);
  }

  return {
    cert: fs.readFileSync(cert),
    key: fs.readFileSync(key),
    rejectUnauthorized: false
  };
}

let UWGWS = {
  initialize(options) {
    let config = options;
    config.auth = readCertificate(options.cert, options.key);

    config.cache = new MicroCache(options.cachePath, options.logLevel, options.cacheExt);

    log4js.configure({
      appenders: {
        out: {
          layout: { type: 'colored' },
          type: 'stdout'
        }
      },
      categories: {
        default: {
          appenders: ['out'],
          level: process.env.LOG_LEVEL || config.logLevel || 'info'
        }
      }
    });

    config.log = log4js.getLogger();

    this.group = new Group(config);
    this.membership = new Membership(config);
    this.search = new Search(config);

    return this;
  }
};

module.exports = UWGWS;
//# sourceMappingURL=index.js.map