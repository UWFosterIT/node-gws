const _ = require('underscore');
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
        return this._buildResult(response, response.body);
      })
      .catch((err) => {
        return this._buildErrorResult(err);
      });
  }

  _del(endpoint) {
    const options = this._options(endpoint);
    options.json = true;
    return rp.del(options)
      .then((response) => {
        return this._buildResult(response, response.body);
      })
      .catch((err) => {
        return this._buildErrorResult(err);
      });
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
          return this._buildErrorResult(err);
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
          return this._buildErrorResult(err);
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
          return this._buildErrorResult(err);
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
