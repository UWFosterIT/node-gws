import qs      from 'query-string';
import Service from './service';

class Membership extends Service {
  constructor(config) {
    super(config);
  }

  create(opt) {
    // eval isnt bad, reading in an xhtml template as a string literal with opt
    let etag = { 'if-match': '*', 'ETag': ''};
    let xhtml = eval('`' + this.templates.createGroup + '`');
    return this._put(`group/${opt.id}`, xhtml, etag);
  }
}

export default Membership;
