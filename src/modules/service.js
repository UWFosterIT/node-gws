const _ = require('lodash');
const util = require('util');

class Service {
  constructor(config) {
    this.config = config;
    this.log = config.log;
    this.cache = config.cache;
    this.got = config.got;
  }

  options(endpoint) {
    return {
      request: {
        https: {
          certificate: this.config.auth.cert,
          key: this.config.auth.key,
        },
        url: this.config.baseUrl + endpoint,
      },
      uriCache: endpoint.replace(/\//g, ''),
    };
  }

  async put(endpoint, groupData, etag) {
    const options = this.options(endpoint);
    if (groupData) {
      _.extend(options.request.headers, etag);
      options.request.json = groupData;
    }

    if (this.config.cacheMode !== 'wild') {
      this.cache.remove(options.uriCache);
    }

    const response = await this.got.put(options.request)
      .catch((err) => {
        if (!err.response) {
          this.log.error(`${err.name}: ${err.message}`);
          throw new Error('Unable to make PUT request');
        }
        return err.response;
      });
    this.log.debug(`PUT -- ${util.inspect(options.request.url, { depth: null })}`);
    return this.buildResult(response);
  }

  async del(endpoint) {
    const options = this.options(endpoint);

    if (this.config.cacheMode !== 'wild') {
      this.cache.remove(options.uriCache);
    }

    const response = await this.got.delete(options.request)
      .catch((err) => {
        if (!err.response) {
          this.log.error(`${err.name}: ${err.message}`);
          throw new Error('Unable to make DELETE request');
        }
        return err.response;
      });
    this.log.debug(`DELETE -- ${options.request.url}`);
    return this.buildResult(response);
  }

  async get(endpoint) {
    // wild    no load no save
    // dryrun  load not save
    // record  load and save
    const options = this.options(endpoint);
    let response = {};

    if (this.config.cacheMode !== 'wild') {
      const body = this.cache.read(options.uriCache);
      if (body) {
        response.statusCode = 200;
        response.body = body;
        this.log.debug(`${this.config.cacheMode} cache hit for ${options.request.url}`);
      } else {
        this.log.debug(`${this.config.cacheMode} cache miss for ${options.request.url}`);
      }
    }

    this.log.debug(`GET -- ${util.inspect(options.request.url, { depth: null })}`);
    response = await this.got.get(options.request)
      .catch((err) => {
        if (!err.response) {
          this.log.error(`${err.name}: ${err.message}`);
          throw new Error('Unable to make GET request');
        }
        return err.response;
      });

    if (this.config.cacheMode === 'record' && !response.body.errors) {
      this.cache.write(options.uriCache, response.body, true);
    }

    return this.buildResult(response);
  }

  buildResult(response) {
    let body;
    try {
      body = JSON.parse(response.body);
    } catch (error) {
      this.log.error(`Bad JSON response: ${response.body}`);
      throw error;
    }
    this.log.trace(`Response body: ${util.inspect(body, { depth: null })}`);
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
}

module.exports = Service;
