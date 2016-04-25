import fs      from 'fs';
import path    from 'path';
import _       from 'underscore';
import request from 'request';

class Service {
  constructor(config) {
    this.config    = config;
    this.log       = config.log;
    this.cache     = config.cache;
    this.templates = this._templates();
  }

  _options(endpoint) {
    return {
      agentOptions: this.config.auth,
      uriCache:     endpoint.replace(/\//g, ''),
      uri:          this.config.baseUrl + endpoint
    };
  }

  _templates() {
    let cgPath = path.resolve(__dirname, '../templates/group-create.html');

    return {
      createGroup: fs.readFileSync(cgPath, 'utf-8')
    };
  }

  _put(endpoint, xhtml, etag) {
    return new Promise((fulfill, reject) => {
      let options = this._options(endpoint);
      if (xhtml) {
        _.extend(options.headers, etag);
        options.body = xhtml;
      }

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
    return {
      xhtml:      body,
      statusCode: response.statusCode
    };
  }
}

export default Service;
