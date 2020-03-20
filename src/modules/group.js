let Service = require('./service');

class Group extends Service {
  constructor(config) {
    super(config);
  }

  _entities(selector, query) {
    let list = [];
    query('li', selector).each(function () {
      let item = {
        id:   query(this).text(),
        type: query(this).attr('type')
      };
      list.push(item);
    });

    return list;
  }

  get(opt) {
    return this._get(`group/${opt.id}`);
  }

  create(opts) {
    let etag = {
      'ETag':     '',
      'if-match': '*'
    };
    let groupData = {};
    groupData.data = opts;

    let synchronized = '';
    if (opts.sync !== undefined && opts.sync === true) {
      synchronized = '?synchronized';
    }

    return this._put(`group/${opts.id}${synchronized}`, groupData, etag);
  }

  del(opt) {
    return this._del(`group/${opt.id}`);
  }

  exchangeEnable(opt) {
    return this._put(`group/${opt.id}/affiliate/email?status=active&sender=${opt.sender}`);
  }

  history(opt) {
    return this._get(`group/${opt.id}/history`);
  }

  move(opt) {
    return this._put(`groupMove/${opt.id}?newstem=${opt.newStem}`);
  }
}

module.exports = Group;
