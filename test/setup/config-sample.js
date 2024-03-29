const config = {
  baseUrl: 'https://eval.groups.uw.edu/group_sws/v3/',
  cacheExt: '.json',
  cacheMode: 'wild',
  cachePath: '.cache/',
  certInfo: {
    file: {
      cert: 'PATH TO LOCAL CERT',
      key: 'PATH TO LOCAL KEY',
    },
    // s3: {
    //   certBucket: 'CERT AWS BUCKET',
    //   certKey:    'CERT AWS KEY',
    //   keyBucket:  'KEY AWS BUCKET',
    //   keyKey:     'KEY AWS KEY'
    // }
  },
  logLevel: 'info',
};

module.exports = config;
