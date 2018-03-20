require('../setup');

describe('Initializing the module', () => {
  it('should error when given missing cert or key', () => {
    let path     = __dirname.replace('/unit', '/utils');
    let certFile = `${path}/dummy.crt`;

    let invalid = {
      both: {
        certInfo: {
          file: {
            cert: 'sup',
            key:  'nope'
          }
        }
      },
      cert: {
        certInfo: {
          file: {
            cert: '',
            key:  'sup'
          }
        }
      },
      key: {
        certInfo: {
          file: {
            cert: 'nope',
            key:  ''
          }
        }
      },
      nothing: {
        certInfo: {
          file: {
            cert: '',
            key:  ''
          }
        }
      },
      withCert: {
        certInfo: {
          cert: certFile,
          key:  'sup'
        }
      },
    };

    return Promise.all([
      expect(uwgws.initialize(invalid.key)).to.be.rejected,
      expect(uwgws.initialize(invalid.cert)).to.be.rejected,
      expect(uwgws.initialize(invalid.nothing)).to.be.rejected,
      expect(uwgws.initialize(invalid.withCert)).to.be.rejected,
      expect(uwgws.initialize(invalid.both)).to.be.rejected
    ]);
  });
});

describe('Initializing the module', () => {
  it('should not error', () => {
    let path = __dirname.replace('/unit', '/utils');
    let valid = {
      certInfo: {
        file: {
          cert: `${path}/dummy.crt`,
          key:  `${path}/dummy.key`
        }
      }
    };

    let result = null;
    let service = function () {
      result = uwgws.initialize(valid);
    };

    expect(service).to.not.throw(Error);
    expect(result.cert).to.not.be.null;
    expect(result.key).to.not.be.null;
  });
});
