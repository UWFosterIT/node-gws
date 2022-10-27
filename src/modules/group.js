const Service = require('./service');

class Group extends Service {
  get(opt) {
    return super.get(`group/${opt.id}`);
  }

  create(opts) {
    const etag = {
      ETag: '',
      'if-match': '*',
    };
    const groupData = {};
    groupData.data = opts;

    let synchronized = '';
    if (opts.sync !== undefined && opts.sync === true) {
      synchronized = '?synchronized';
    }

    return super.put(`group/${opts.id}${synchronized}`, groupData, etag);
  }

  async del(opts) {
    let synchronized = '';
    if (opts.sync !== undefined && opts.sync === true) {
      synchronized = '?synchronized';
    }
    return super.del(`group/${opts.id}${synchronized}`);
  }

  exchangeEnable(opt) {
    return super.put(`group/${opt.id}/affiliate/email?status=active&sender=${opt.sender}`);
  }

  history(opt) {
    return super.get(`group/${opt.id}/history`);
  }

  move(opts) {
    let synchronized = '';
    if (opts.sync !== undefined && opts.sync === true) {
      synchronized = '&synchronized';
    }
    return super.put(`groupMove/${opts.id}?newstem=${opts.newStem}${synchronized}`);
  }
}

module.exports = Group;
