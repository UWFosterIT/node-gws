/* eslint-disable max-nested-callbacks */
require('../setup');

describe('Search', () => {

  beforeEach(() => {
    uwgws.initialize(config);
  });

  it('should search by group name', async () => {
    let query  = {name: 'student'};
    let result = await uwgws.search.query(query);

    expect(result.statusCode).to.eql(200);
    expect(result.error).to.eql(false);
    expect(result.message.length).to.eql(0);
    expect(Array.isArray(result.data)).to.eql(true);
    expect(result.data.length).to.be.greaterThan(10);
  });

  describe('searching by stem', () => {
    let scopedCount;

    it('should search by stem', async () => {
      let query = {stem: 'uw_foster_staff'};
      let result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message.length).to.eql(0);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(10);
      scopedCount = result.data.length;
    });

    it('should return more results with wider scope', async () => {
      let query = {
        scope: 'all',
        stem:  'uw_foster_staff'
      };
      let result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message.length).to.eql(0);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(10);
      expect(result.data.length).to.be.greaterThan(scopedCount);
    });
  });

  describe('searching by member', () => {
    let directCount;

    it('should search by member', async () => {
      let query  = {member: 'schad'};
      let result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message.length).to.eql(0);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(10);
      directCount = result.data.length;
    });

    it('should return more results with effective membership', async () => {
      let query = {
        effective: true,
        member:    'schad'
      };
      let result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message.length).to.eql(0);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(10);
      expect(result.data.length).to.be.greaterThan(directCount);
    });
  });

  describe('searching by owner', () => {
    let directCount;

    it('should search by owner', async () => {
      let query  = {owner: 'milesm'};
      let result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message.length).to.eql(0);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(5);
      directCount = result.data.length;
    });

    it('should return more results with effective ownership', async () => {
      let query = {
        effective: true,
        owner:     'milesm'
      };
      let result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message.length).to.eql(0);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(10);
      expect(result.data.length).to.be.greaterThan(directCount);
    });
  });

});
