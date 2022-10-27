const Service = require('./service');

class Membership extends Service {
  get(opt) {
    let membership = 'member';
    if (opt.effective) {
      membership = 'effective_member';
    }

    return super.get(`group/${opt.id}/${membership}`);
  }

  add(opt) {
    let netIdList = opt.netid;
    if (Array.isArray(opt.netid)) {
      netIdList = opt.netid.join(',');
    }
    let synchronized = '';
    if (opt.sync !== undefined && opt.sync === true) {
      synchronized = '?synchronized';
    }

    return super.put(`group/${opt.id}/member/${netIdList}${synchronized}`);
  }

  replaceMembership(opt) {
    let synchronized = '';
    if (opt.sync !== undefined && opt.sync === true) {
      synchronized = '?synchronized';
    }

    return super.put(`group/${opt.id}/member${synchronized}`, opt.data);
  }

  del(opt) {
    if (!opt.netid) {
      return {
        error: true,
        message: ['Member delete must include a list of id(s)'],
        statusCode: 400,
      };
    }

    let synchronized = '';
    if (opt.sync !== undefined && opt.sync === true) {
      synchronized = '?synchronized';
    }

    return super.del(`group/${opt.id}/member/${opt.netid}${synchronized}`);
  }
}

module.exports = Membership;
