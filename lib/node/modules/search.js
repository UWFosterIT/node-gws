'use strict';

/* eslint-disable sort-keys */
let cheerio = require('cheerio');
let qs = require('query-string');
let Service = require('./service');

class Search extends Service {
  constructor(config) {
    super(config);
  }

  query(opt) {
    let params = {
      name: opt.name || '',
      stem: opt.stem || '',
      member: opt.member || '',
      owner: opt.owner || '',
      type: opt.effective ? 'effective' : 'direct',
      scope: opt.scope === 'all' ? 'all' : 'one'
    };

    let query = qs.stringify(params);

    return this._get(`search/?${query}`).then(result => {
      let $ = cheerio.load(result.xhtml);

      let data = [];

      $('.groupreference').each(function () {
        let group = {
          name: $('.name', this).text(),
          regid: $('.regid', this).text(),
          title: $('.title', this).text()
        };
        data.push(group);
      });

      result.data = data;
      return result;
    });
  }
}

module.exports = Search;
//# sourceMappingURL=search.js.map