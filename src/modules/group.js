/* eslint-disable no-underscore-dangle*/
import cheerio from 'cheerio';
import Service from './service';

class Membership extends Service {
  constructor(config) {
    super(config);
  }

  _entities(selector, query) {
    let list = [];
    query('li', selector).each(function (i, foo) {
      let item = {
        id:   query(this).text(),
        type: query(this).attr('type')
      };
      list.push(item);
    });

    return list;
  }

  get(opt) {
    return this._get(`group/${opt.id}`)
      .then((result) => {
        let $ = cheerio.load(result.xhtml);
        let group = {
          authnFactor:      $('.authnfactor').text(),
          classification:   $('.classification').text(),
          contact:          $('.contact').text(),
          courseQtr:        $('.course_qtr').text(),
          courseYear:       $('.course_year').text(),
          courseCurr:       $('.course_curr').text(),
          courseNo:         $('.course_no').text(),
          courseSect:       $('.course_sect').text(),
          courseSLN:        $('.course_sln').text(),
          createTime:       $('.createtime').text(),
          dependsOn:        $('.dependson').text(),
          description:      $('.description').text(),
          emailEnabled:     $('.emailenabled').text(),
          gid:              $('.gid').text(),
          modifyTime:       $('.modifytime').text(),
          memberModifyTime: $('.membermodifytime').text(),
          publishEmail:     $('.publishemail').text(),
          regid:            $('.regid').text(),
          reportToOrig:     $('.reporttoorig').text(),
          title:            $('.title').text()
        };

        group.names             = this._entities('.names', $);
        group.admins            = this._entities('.admins', $);
        group.updaters          = this._entities('.updaters', $);
        group.creators          = this._entities('.creators', $);
        group.readers           = this._entities('.readers', $);
        group.senders           = this._entities('.authorigs', $);
        group.viewers           = this._entities('.viewers', $);
        group.optIns            = this._entities('.optins', $);
        group.optOuts           = this._entities('.optouts', $);
        group.courseInstructors = this._entities('.course_instructors', $);

        result.data = group;
        return result;
      });
  }

  create(opt) {
    let etag = {
      'if-match': '*',
      'ETag':     ''
    };

    // eval isn't bad, reading in an xhtml template as a string literal with opt
    // see the respective template for how the options are used
    let xhtml = eval('`' + this.templates.createGroup + '`');
    return this._put(`group/${opt.id}`, xhtml, etag);
  }

  del(opt) {
    return this._del(`group/${opt.id}`);
  }

  exchangeEnable(opt) {
    return this._put(`group/${opt.id}/affiliate/email?status=active&sender=${opt.sender}`);
  }
}

export default Membership;
