const _ = require('lodash');
const got = require('got');
const util = require('util');

class Service {
  constructor(config) {
    this.config = config;
    this.log = config.log;
    this.cache = config.cache;
  }

  options(endpoint) {
    return {
      agent: false,
      cert: this.config.auth.cert,
      key: this.config.auth.key,
      url: this.config.baseUrl + endpoint,
      uriCache: endpoint.replace(/\//g, ''),
    };
  }

  async put(endpoint, groupData, etag) {
    const options = this.options(endpoint);
    if (groupData) {
      _.extend(options.headers, etag);
      options.json = groupData;
    }

    const response = await got.put(options)
      .catch((err) => {
        if (!err.response) {
          this.log.error(`${err.name}: ${err.message}`);
          throw new Error('Unable to make PUT request');
        }
        return err.response;
      });
    this.log.debug(`PUT -- ${util.inspect(options.url, { depth: null })}`);
    return this.buildResult(response);
  }

  async del(endpoint) {
    const options = this.options(endpoint);
    const response = await got.delete(options)
      .catch((err) => {
        if (!err.response) {
          this.log.error(`${err.name}: ${err.message}`);
          throw new Error('Unable to make DELETE request');
        }
        return err.response;
      });
    this.log.debug(`DELETE -- ${options.url}`);
    return this.buildResult(response);
  }

  async get(endpoint) {
    // wild    no load no save
    // dryrun  load not save
    // record  load and save
    const options = this.options(endpoint);
    const { cacheMode } = this.config;
    let response = {};

    if (cacheMode !== 'wild') {
      const body = this.cache.read(options.uriCache);

      if (body) {
        response.statusCode = 200;
        response.body = body;
        this.log.debug(`${cacheMode} cache hit for ${options.url}`);
      } else {
        this.log.debug(`${cacheMode} cache miss for ${options.url}`);
      }
    }


    this.log.debug(`GET -- ${util.inspect(options.url, { depth: null })}`);
    response = await got.get(options)
      .catch((err) => {
        if (!err.response) {
          this.log.error(`${err.name}: ${err.message}`);
          throw new Error('Unable to make GET request');
        }
        return err.response;
      });

    if (cacheMode === 'record' && !!response.body) {
      this.cache.write(options.uriCache, response.body, true);
    }

    return this.buildResult(response);
  }

  buildResult(response) {
    const body = JSON.parse(response.body);
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
