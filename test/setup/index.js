import config from './config';
import uwgws  from '../../lib/index';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
global.expect = chai.expect;
global.config = config;
global.uwgws = uwgws;

global.mochaAsync = (fn) => {
  return async (done) => {
    try {
      await fn();
      done();
    } catch (err) {
      done(err);
    }
  };
};

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
  this.stub = this.sandbox.stub.bind(this.sandbox);
  this.spy  = this.sandbox.spy.bind(this.sandbox);
});

afterEach(function () {
  this.stub = undefined;
  this.spy = undefined;
  this.sandbox.restore();
});
