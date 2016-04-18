# UW Groups Web Service
This implements some of the [v1 UW Groups Webservice endpoints](https://wiki.cac.washington.edu/display/infra/Groups+Web+Service+REST+API).  Each endpoint is queried using convienent options to build the final ``request``. 

This module assumes you have gone through all the required steps to get access and verified that access as [documented in ther wiki](https://wiki.cac.washington.edu/display/infra/Groups+Web+Service+REST+API).

## Installation

    npm install uwgws

## USE
First setup a config object to hold variables for your x509 cert and key as well as some optional caching of responses from the service.  Cache options are detailed in the [micro-cache](https://www.npmjs.com/package/micro-cache) node module.

```JavaScript
import uwgws  from '../../lib/node/index';

let config = {
  baseUrl:   'https://iam-ws.u.washington.edu:7443/group_sws/v2/',
  cert:      '/home/you/yourcert.pem',
  key:       '/home/you/your.key',
  cacheMode: 'record',
  cachePath: '/home/you/cache/',
  cacheExt:  '.json',
  logLevel:  'info'
};

uwgws.initialize(config);
```

Now query for memberships for the desired group name or regid.  Set ``effective`` if you want effective membership, otherwise false or not at all.

```JavaScript
let options = {
  effective: true,
  id: 'uw_foster_it_developers_nodegws-test'
};

let result = await uwgws.membership.get(options);
console.log(result);
```

### Logging
This module uses ``winston`` for all logging.  Set an environment variable to a valid log level such as ``LOG_LEVEL=debug node yourscript.js``.

## Development
For linting, this assumes you have ``eslint`` and ``babel-eslint`` installed globally ``npm install eslint@2.x babel-eslint@next -g``.

Copy ``test/setup/config-sample.js`` to ``test/setup/config.js`` and edit values as needed. Use the ``npm`` commands indicated in ``package.json``.

    npm build
    npm test
    npm lint

## TO DO
Right now, this is ``0.x.0`` because of the minimal endpoint implementation.  Next up will be the group create endpoint.
