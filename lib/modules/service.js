let _       = require('underscore');
let cheerio = require('cheerio');
let fs      = require('fs');
let path    = require('path');
let request = require('request');

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
      uri:          this.config.baseUrl + endpoint,
      uriCache:     endpoint.replace(/\//g, '')
    };
  }

  _templates() {
    let cgPath = path.resolve(__dirname, '../../templates/group-create.html');
    return {createGroup: fs.readFileSync(cgPath, 'utf-8')};
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
    let err = false;
    let msg = [];
    const $ = cheerio.load(body);

    // Not found, unauthorized
    if (response.statusCode == 404 || response.statusCode == 401) {
      err = true;
      // Add and Get return errors in different formats because why not?
      let message = $('.alert').text();
      if (message == '') {
        message = $('.error_message').text()
      }

      // History (and probably others) don't include error messages because of course.
      if (message == '') {
        message = 'Unknown error. Most likely the group does not exist.';
      }

      msg.push(message.trim());
    }

    // Problems with adds
    let missing = $('.notfoundmembers').find($('.notfoundmember')).length;
    if (missing > 0) {
      err = true;
      $('.notfoundmember').each(function(i, elem) {
        msg.push($(this).text() + ' is not a valid netid');
      });
    }

    return {
      error:      err,
      message:    msg,
      statusCode: response.statusCode,
      xhtml:      body
    };
  }
}

module.exports = Service;
