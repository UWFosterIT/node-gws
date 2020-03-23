/* eslint-disable max-nested-callbacks */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const config = require('../setup/config');
const uwgws = require('../../src/index');

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Search', () => {
  beforeEach(async () => {
    this.sandbox = sinon.createSandbox();
    this.stub = this.sandbox.stub.bind(this.sandbox);
    this.spy = this.sandbox.spy.bind(this.sandbox);
    await uwgws.initialize(config);
  });

  afterEach(() => {
    this.stub = undefined;
    this.spy = undefined;
    this.sandbox.restore();
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
      expect(result.data.length).to.be.greaterThan(6);
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
      expect(result.data.length).to.be.greaterThan(9);
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
