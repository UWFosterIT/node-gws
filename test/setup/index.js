let chai      = require('chai');
let config    = require('./config');
let sinon     = require('sinon');
let sinonChai = require('sinon-chai');
let uwgws     = require('../../lib/node/index');

chai.use(sinonChai);
global.expect = chai.expect;
global.config = config;
global.uwgws  = uwgws;

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
  this.stub = this.sandbox.stub.bind(this.sandbox);
  this.spy  = this.sandbox.spy.bind(this.sandbox);
});

afterEach(function () {
  this.stub = null;
  this.spy  = null;
  this.sandbox.restore();
});
