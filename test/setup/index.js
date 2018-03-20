import 'source-map-support';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from './config';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import uwgws from '../../lib/node/index';

chai.use(sinonChai);
chai.use(chaiAsPromised);
global.expect = chai.expect;
global.config = config;
global.uwgws = uwgws;

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
  this.stub = this.sandbox.stub.bind(this.sandbox);
  this.spy = this.sandbox.spy.bind(this.sandbox);
});

afterEach(function () {
  this.stub = null;
  this.spy = null;
  this.sandbox.restore();
});
