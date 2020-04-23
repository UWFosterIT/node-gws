/* eslint-disable sort-keys */
const qs = require('query-string');
const Service = require('./service');

class Search extends Service {
  query(opt) {
    const params = {
      name: opt.name || '',
      stem: opt.stem || '',
      member: opt.member || '',
      owner: opt.owner || '',
      type: opt.effective ? 'effective' : 'direct',
      scope: opt.scope === 'all' ? 'all' : 'one',
    };

    const query = qs.stringify(params);

    return super.get(`search/?${query}`);
  }
}

module.exports = Search;
