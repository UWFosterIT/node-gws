/* eslint-disable no-underscore-dangle*/
import cheerio from 'cheerio';
import Service from './service';

class Membership extends Service {
  constructor(config) {
    super(config);
  }

  get(opt) {
    let membership = 'member';
    if (opt.effective) {
      membership = 'effective_member';
    }

    return this._get(`group/${opt.id}/${membership}`)
      .then((result) => {
        let $ = cheerio.load(result.xhtml);
        let members = [];

        $('li', '.members').each(function (i, foo) {
          var anchor = $(this).children().first();
          let item = {
            netid: anchor.text(),
            type:  anchor.attr('type')
          };

          members.push(item);
        });

        result.data = members;
        return result;
      });
  }

  add(opt) {
    return this._put(`group/${opt.id}/member/${opt.netid}`)
      .then((result) => {
        return result;
      });
  }

  del(opt) {
    if (!opt.netid) {
      /* eslint-disable key-spacing */
      return {
        xhtml:      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                    '<html xmlns="http://www.w3.org/1999/xhtml">' +
                    '<head><title>Bad Request</title></head>' +
                    '<body>Member delete must include a list of id(s).</body></html>',
        statusCode: 400
      };
      /* eslint-enable key-spacing */
    }
    return this._del(`group/${opt.id}/member/${opt.netid}`)
      .then((result) => {
        return result;
      });
  }
}

export default Membership;
