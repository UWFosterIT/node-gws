let _       = require('underscore');
let request = require('request');

class Service {
  constructor(config) {
    this.config    = config;
    this.log       = config.log;
    this.cache     = config.cache;
    // this.templates = this._templates();
  }

  _options(endpoint) {
    return {
      agentOptions: this.config.auth,
      uri:          this.config.baseUrl + endpoint,
      uriCache:     endpoint.replace(/\//g, '')
    };
  }

  _put(endpoint, groupData, etag) {
    return new Promise((fulfill, reject) => {
      let options = this._options(endpoint);
      if (groupData) {
        _.extend(options.headers, etag);
        options.body = groupData;
      }
      options.json = true;

      request.put(options, (err, response, body) => {
        if (err) {
          reject(err);
        }
        fulfill(this._buildResult(response, body));
      });
    });
  }

  _del(endpoint) {
    return new Promise((fulfill, reject) => {
      let options = this._options(endpoint);
      options.json = true;

      request.del(options, (err, response, body) => {
        if (err) {
          reject(err);
        }
        fulfill(this._buildResult(response, body));
      });
    });
  }

  _get(endpoint) {
    return new Promise((fulfill, reject) => {
      // wild    no load no save
      // dryrun  load not save
      // record  load and save
      let options = this._options(endpoint);
      options.json = true;
      if (this.config.cacheMode === 'wild') {
        this.log.debug(`wild -- ${options.uri}`);

        request.get(options, (err, response, body) => {
          if (err) {
            reject(err);
          }
          fulfill(this._buildResult(response, body));
        });
      } else if (this.config.cacheMode === 'dryrun') {
        this.log.debug(`dryrun for ${options.uri}`);
        let body = this.cache.read(options.uriCache);
        if (body) {
          let response = {};
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
        let body = this.cache.read(options.uriCache);
        if (body) {
          let response = {};
          response.statusCode = 200;
          fulfill(this._buildResult(response, body));
        } else {

          request.get(options, (err, response, body) => {
            if (err) {
              reject(err);
            }
            if (response.statusCode === 200) {
              this.cache.write(options.uriCache, body, true);
            }
            fulfill(this._buildResult(response, body));
          });
        }
      }
    });
  }

  _buildResult(response, body) {
    let result = {};
    result.statusCode = response.statusCode;
    if (result.statusCode !== 200 && result.statusCode !== 201) {
      // console.log(body.errors);
      result.message = body.errors[0].detail;
      result.data = {};
    } else {
      if (typeof body.errors !== 'undefined') {
        result.message = body.errors[0].detail;
      }
      result.data = body.data;
    }
    return result;
  }
}

module.exports = Service;
