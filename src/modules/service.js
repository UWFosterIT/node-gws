const _ = require('underscore');
const request = require('request');
const rp = require('request-promise');
const util = require('util');

class Service {
  constructor(config) {
    this.config = config;
    this.log = config.log;
    this.cache = config.cache;
  }

  _options(endpoint) {
    return {
      agentOptions:            this.config.auth,
      uri:                     this.config.baseUrl + endpoint,
      uriCache:                endpoint.replace(/\//g, ''),
      resolveWithFullResponse: true,
      timeout:                 300000,
      agent:                   false,
      pool:                    {maxSockets: Infinity},
    };
  }

  _put(endpoint, groupData, etag) {
    const options = this._options(endpoint);
    if (groupData) {
      _.extend(options.headers, etag);
      options.body = groupData;
    }
    options.json = true;

    return rp.put(options)
      .then((response) => {
        console.log('response.body ssagli', response.body);
        console.log('statusCode ssagli', response.statusCode);
        return this._buildResult(response, response.body);
      })
      .catch((err) => {
        console.log('err put', err);
        // return err;
        return this._buildErrorResult(err);
        // throw new Error(err);
      });
    // (err, response, body) => {
    //   if (err) {
    //     this.log.debug(`PUT err ssagli ${util.inspect(err, {depth: null})}`);
    //     reject(err);
    //   }
    //   this.log.debug(`PUT -- ${util.inspect(options, {depth: null})}`);
    //   fulfill(this._buildResult(response, body));
    // }
  }

  _del(endpoint) {
    // return new Promise((fulfill, reject) => {
    const options = this._options(endpoint);
    options.json = true;
    return rp.del(options)
      .then((response) => {
        // console.log('DELETE response', response);
        return this._buildResult(response, response.body);
      })
      .catch((err) => {
        // console.log('err del', err);
        // return err;
        return this._buildErrorResult(err);
        // throw new Error(err);
      });
    // rp.del(options, (err, response, body) => {
    //   if (err) {
    //     reject(err);
    //   }
    //   this.log.debug(`DELETE -- ${options.uri}`);
    //   fulfill(this._buildResult(response, body));
    // });
    // });
  }

  _get(endpoint) {
    // wild    no load no save
    // dryrun  load not save
    // record  load and save
    const options = this._options(endpoint);
    options.json = true;
    if (this.config.cacheMode === 'wild') {
      this.log.debug(`wild -- GET -- ${options.uri}`);

      return rp.get(options)
        .then((response) => {
          return this._buildResult(response, response.body);
        })
        .catch((err) => {
          console.log('err1', err);
          // return err;
          return this._buildErrorResult(err);
          // throw new Error(err);
        });
    } else if (this.config.cacheMode === 'dryrun') {
      this.log.debug(`dryrun for ${options.uri}`);
      const body = this.cache.read(options.uriCache);
      if (body) {
        const response = {};
        response.statusCode = 200;
        return new Promise((fulfill) => {
          fulfill(this._buildResult(response, body));
        });
      }
      return rp.get(options)
        .then((response) => {
          return this._buildResult(response, response.body);
        })
        .catch((err) => {
          console.log('err2', err);
          throw new Error(err);
        });

    } else if (this.config.cacheMode === 'record') {
      this.log.debug(`record -- ${options.uri}`);
      const body = this.cache.read(options.uriCache);
      if (body) {
        const response = {};
        response.statusCode = 200;
        return new Promise((fulfill) => {
          fulfill(this._buildResult(response, JSON.parse(body)));
        });
      }
      return rp.get(options)
        .then((response) => {
          if (response.statusCode === 200) {
            this.cache.write(options.uriCache, JSON.stringify(body), true);
          }
          return this._buildResult(response, response.body);
        })
        .catch((err) => {
          console.log('err3', err);
          throw new Error(err);
        });
    }
  }

  _buildResult(response, body) {
    this.log.debug(`Response body: ${util.inspect(body, {depth: null})}`);
    const result = {};
    result.data = {};
    result.error = false;
    result.statusCode = response.statusCode;
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

  _buildErrorResult(response) {
    this.log.debug(`Response body: ${util.inspect(response, {depth: null})}`);
    const result = {};
    result.statusCode = response.statusCode;
    if (result.statusCode !== 200 && result.statusCode !== 201) {
      result.error = true;
      result.message = response.error.errors[0].detail;
    } else {
      result.message = response.error.errors[0].detail;
      if (typeof response.error.errors[0].notFound !== 'undefined' && response.error.errors[0].notFound.length > 0) {
        result.error = true;
        result.notFound = response.error.errors[0].notFound;
      }
    }
    return result;
  }
}

module.exports = Service;
