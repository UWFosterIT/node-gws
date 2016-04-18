import fs           from 'fs';
import winston      from 'winston';
import MicroCache   from 'micro-cache';
import Membership   from './modules/membership';
import Group        from './modules/group';

function readCertificate(cert = '', key = '') {
  if (cert === '' || key === '' ||
      !fs.existsSync(cert) || !fs.existsSync(key)) {
    throw new Error(`Client cert ${cert} or key ${key} can not be found`);
  }

  return {
    cert:               fs.readFileSync(cert),
    key:                fs.readFileSync(key),
    rejectUnauthorized: false
  };
}

let UWGWS = {
  initialize(options) {
    let config = options;
    config.auth = readCertificate(options.cert, options.key);

    winston.loggers.add('uwgws', {
      console: {
        colorize:    true,
        label:       'uwgws',
        level:       process.env.LOG_LEVEL || options.logLevel,
        prettyPrint: true
      }
    });

    config.log = winston.loggers.get('uwgws');
    config.cache = new MicroCache(
      options.cachePath,
      options.logLevel,
      options.cacheExt
    );

    this.membership = new Membership(config);
    this.group      = new Group(config);

    return this;
  }
};

module.exports = UWGWS;
