/* eslint-disable sort-keys */
let qs      = require('query-string');
let Service = require('./service');

class Search extends Service {
  constructor(config) {
    super(config);
  }

  query(opt) {
    let params = {
      name:   opt.name   || '',
      stem:   opt.stem   || '',
      member: opt.member || '',
      owner:  opt.owner  || '',
      type:   opt.effective ? 'effective' : 'direct',
      scope:  opt.scope === 'all' ? 'all' : 'one'
    };

    let query = qs.stringify(params);

    return this._get(`search/?${query}`);
  }
}

module.exports = Search;
