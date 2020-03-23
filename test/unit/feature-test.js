const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const uwgws = require('../../src/index');

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Initializing the module with bad config info', () => {
  beforeEach(() => {
    this.sandbox = sinon.createSandbox();
    this.stub = this.sandbox.stub.bind(this.sandbox);
    this.spy = this.sandbox.spy.bind(this.sandbox);
  });

  afterEach(() => {
    this.stub = undefined;
    this.spy = undefined;
    this.sandbox.restore();
  });

  it('should error when given missing cert or key', () => {
    const path = __dirname.replace('/unit', '/utils');
    const certFile = `${path}/dummy.crt`;

    const invalid = {
      both: {
        certInfo: {
          file: {
            cert: 'sup',
            key: 'nope',
          },
        },
      },
      cert: {
        certInfo: {
          file: {
            cert: '',
            key: 'sup',
          },
        },
      },
      key: {
        certInfo: {
          file: {
            cert: 'nope',
            key: '',
          },
        },
      },
      nothing: {
        certInfo: {
          file: {
            cert: '',
            key: '',
          },
        },
      },
      withCert: {
        certInfo: {
          cert: certFile,
          key: 'sup',
        },
      },
    };

    return Promise.all([
      expect(uwgws.initialize(invalid.key)).to.be.rejected,
      expect(uwgws.initialize(invalid.cert)).to.be.rejected,
      expect(uwgws.initialize(invalid.nothing)).to.be.rejected,
      expect(uwgws.initialize(invalid.withCert)).to.be.rejected,
      expect(uwgws.initialize(invalid.both)).to.be.rejected,
    ]);
  });
});

describe('Initializing the module with dummy certs', () => {
  it('should not error', async () => {
    const path = __dirname.replace('/unit', '/utils/');
    const valid = {
      certInfo: {
        file: {
          cert: `${path}/dummy.crt`,
          key: `${path}/dummy.key`,
        },
      },
    };

    return expect(uwgws.initialize(valid)).to.not.be.rejected
      .then((result) => {
        expect(result.group.config.auth.cert).to.not.be.an('undefined');
        expect(result.group.config.auth.key).to.not.be.an('undefined');
      });
  });
});
