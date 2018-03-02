'use strict';

let cheerio = require('cheerio');
let Service = require('./service');

class Group extends Service {
  constructor(config) {
    super(config);
  }

  _entities(selector, query) {
    let list = [];
    query('li', selector).each(function () {
      let item = {
        id: query(this).text(),
        type: query(this).attr('type')
      };
      list.push(item);
    });

    return list;
  }

  get(opt) {
    return this._get(`group/${opt.id}`).then(result => {
      let $ = cheerio.load(result.xhtml);
      let group = {
        authnFactor: $('.authnfactor').text(),
        classification: $('.classification').text(),
        contact: $('.contact').text(),
        courseCurr: $('.course_curr').text(),
        courseNo: $('.course_no').text(),
        courseQtr: $('.course_qtr').text(),
        courseSect: $('.course_sect').text(),
        courseSLN: $('.course_sln').text(),
        courseYear: $('.course_year').text(),
        createTime: $('.createtime').text(),
        dependsOn: $('.dependson').text(),
        description: $('.description').text(),
        emailEnabled: $('.emailenabled').text(),
        gid: $('.gid').text(),
        memberModifyTime: $('.membermodifytime').text(),
        modifyTime: $('.modifytime').text(),
        publishEmail: $('.publishemail').text(),
        regid: $('.regid').text(),
        reportToOrig: $('.reporttoorig').text(),
        title: $('.title').text()
      };

      group.names = this._entities('.names', $);
      group.admins = this._entities('.admins', $);
      group.updaters = this._entities('.updaters', $);
      group.creators = this._entities('.creators', $);
      group.readers = this._entities('.readers', $);
      group.senders = this._entities('.authorigs', $);
      group.viewers = this._entities('.viewers', $);
      group.optIns = this._entities('.optins', $);
      group.optOuts = this._entities('.optouts', $);
      group.courseInstructors = this._entities('.course_instructors', $);

      result.data = group;
      return result;
    });
  }

  create(opt) {
    let etag = {
      'ETag': '',
      'if-match': '*'
    };

    // eval isn't bad, reading in an xhtml template as a string literal with opt
    // see the respective template for how the options are used
    let xhtml = eval(`\`${this.templates.createGroup}\``);
    return this._put(`group/${opt.id}`, xhtml, etag);
  }

  del(opt) {
    return this._del(`group/${opt.id}`);
  }

  exchangeEnable(opt) {
    return this._put(`group/${opt.id}/affiliate/email?status=active&sender=${opt.sender}`);
  }

  history(opt) {
    return this._get(`group/${opt.id}/history`).then(result => {
      let $ = cheerio.load(result.xhtml);

      let items = $('li');
      let history = [];

      for (let i in items) {
        if (items[i].attribs && items[i].attribs.activity === 'membership') {
          history.push(items[i].attribs);
        }
      }

      result.data = history;
      return result;
    });
  }

  move(opt) {
    return this._put(`groupMove/${opt.id}?newstem=${opt.newStem}`);
  }
}

module.exports = Group;
//# sourceMappingURL=group.js.map