require('../setup');

describe('Search', () => {
  beforeEach(async () => {
    await uwgws.initialize(config);
  });

  it('should search by group name', async () => {
    const query = { name: '*student*' };
    const result = await uwgws.search.query(query);

    expect(result.statusCode).to.eql(200);
    expect(result.error).to.eql(false);
    expect(Array.isArray(result.data)).to.eql(true);
    expect(result.data.length).to.be.greaterThan(10);
  });

  describe('searching by stem', () => {
    let scopedCount;

    it('should search by stem', async () => {
      const query = { stem: 'uw_foster_staff' };
      const result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(10);
      scopedCount = result.data.length;
    });

    // Disabling this for now. Functionality of GWS API seems broken.

    it('should return more results with wider scope', async () => {
      const query = {
        scope: 'all',
        stem: 'uw_foster_staff',
      };
      const result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(10);
      expect(result.data.length).to.be.greaterThan(scopedCount);
    });
  });

  describe('searching by member', () => {
    let directCount;

    it('should search by member', async () => {
      const query = { member: 'fostserv' };
      const result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(5);
      directCount = result.data.length;
    });

    it('should return more results with effective membership', async () => {
      const query = {
        effective: true,
        member: 'fostserv',
      };
      const result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(8);
      expect(result.data.length).to.be.greaterThan(directCount);
    });
  });

  describe('searching by owner', () => {
    let directCount;

    it('should search by owner', async () => {
      const query = { owner: 'mercert' };
      const result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(5);
      directCount = result.data.length;
    });

    it('should return more results with effective ownership', async () => {
      const query = {
        effective: true,
        owner: 'mercert',
      };
      const result = await uwgws.search.query(query);

      expect(result.statusCode).to.eql(200);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.be.greaterThan(10);
      expect(result.data.length).to.be.greaterThan(directCount);
    });
  });
});
