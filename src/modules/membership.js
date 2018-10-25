let Service = require('./service');

class Membership extends Service {
  constructor(config) {
    super(config);
  }

  get(opt) {
    let membership = 'member';
    if (opt.effective) {
      membership = 'effective_member';
    }

    return this._get(`group/${opt.id}/${membership}`);
  }

  add(opt) {
    if (Array.isArray(opt.netid)) {
      opt.netid = opt.netid.join(',');
    }
    let synchronized = '';
    if (opt.sync !== undefined && opt.sync === true) {
      synchronized = '?synchronized=true';
    }

    return this._put(`group/${opt.id}/member/${opt.netid}${synchronized}`);
  }

  del(opt) {
    if (!opt.netid) {
      return {
        error:      true,
        message:    ['Member delete must include a list of id(s)'],
        statusCode: 400
      };
    }

    return this._del(`group/${opt.id}/member/${opt.netid}`);
  }
}

module.exports = Membership;
