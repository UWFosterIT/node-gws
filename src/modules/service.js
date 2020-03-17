const _ = require('underscore');
const request = require('request');
const util = require('util');

class Service {
  constructor(config) {
    this.config = config;
    this.log = config.log;
    this.cache = config.cache;
  }

  _options(endpoint) {
    return {
      agentOptions: this.config.auth,
      uri:          this.config.baseUrl + endpoint,
      uriCache:     endpoint.replace(/\//g, ''),
    };
  }

  _put(endpoint, groupData, etag) {
    return new Promise((fulfill, reject) => {
      const options = this._options(endpoint);
      if (groupData) {
        _.extend(options.headers, etag);
        options.body = groupData;
      }
      options.json = true;

      request.put(options, (err, response, body) => {
        if (err) {
          this.log.debug(`PUT err ssagli ${util.inspect(err, {depth: null})}`);
          reject(err);
        }
        this.log.debug(`PUT -- ${util.inspect(options, {depth: null})}`);
        fulfill(this._buildResult(response, body));
      });
    });
  }

  _del(endpoint) {
    return new Promise((fulfill, reject) => {
      const options = this._options(endpoint);
      options.json = true;

      request.del(options, (err, response, body) => {
        if (err) {
          reject(err);
        }
        this.log.debug(`DELETE -- ${options.uri}`);
        fulfill(this._buildResult(response, body));
      });
    });
  }

  _get(endpoint) {
    return new Promise((fulfill, reject) => {
      // wild    no load no save
      // dryrun  load not save
      // record  load and save
      const options = this._options(endpoint);
      options.json = true;
      if (this.config.cacheMode === 'wild') {
        this.log.debug(`wild -- GET -- ${options.uri}`);

        request.get(options, (err, response, body) => {
          if (err) {
            reject(err);
          }
          fulfill(this._buildResult(response, body));
        });
      } else if (this.config.cacheMode === 'dryrun') {
        this.log.debug(`dryrun for ${options.uri}`);
        const body = this.cache.read(options.uriCache);
        if (body) {
          const response = {};
          response.statusCode = 200;
          fulfill(this._buildResult(response, body));
        } else {
          request.get(options, (err, response, body) => {
            if (err) {
              reject(err);
            }
            fulfill(this._buildResult(response, body));
          });
        }
      } else if (this.config.cacheMode === 'record') {
        this.log.debug(`record -- ${options.uri}`);
        const body = this.cache.read(options.uriCache);
        if (body) {
          const response = {};
          response.statusCode = 200;
          fulfill(this._buildResult(response, JSON.parse(body)));
        } else {
          request.get(options, (err, response, body) => {
            if (!err) {
              if (response.statusCode === 200) {
                this.cache.write(options.uriCache, JSON.stringify(body), true);
              }
              fulfill(this._buildResult(response, body));
            } else {
              reject(err);
            }
          });
        }
      }
    });
  }

  _buildResult(response, body) {
    this.log.debug(`Response body: ${util.inspect(body, {depth: null})}`);
    const result = {};
    result.data = {};
    result.error = false;
    result.statusCode = response.statusCode;
    this.log.debug(`ssagli response.statusCode ${util.inspect(response.statusCode, {depth: null})}`);
    this.log.debug(`ssagli response.statusMessage ${util.inspect(response.statusMessage, {depth: null})}`);
    this.log.debug(`ssagli response.message ${util.inspect(response.message, {depth: null})}`);
    if (result.statusCode !== 200 && result.statusCode !== 201) {
      result.error = true;
      result.message = body.errors[0].detail;
    } else {
      if (typeof body.errors !== 'undefined') {
        result.message = body.errors[0].detail;
        if (typeof body.errors[0].notFound !== 'undefined' && body.errors[0].notFound.length > 0) {
          result.error = true;
          result.notFound = body.errors[0].notFound;
        }
      }

      if (typeof body.data !== 'undefined') {
        result.data = body.data;
      }
    }
    return result;
  }
}

module.exports = Service;
