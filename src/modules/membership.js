import cheerio from 'cheerio';
import Service from './service';

class Membership extends Service {
  constructor(config) {
    super(config);
  }

  get(opt, cb) {
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
}

export default Membership;
