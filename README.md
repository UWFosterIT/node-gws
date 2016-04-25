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

### Using a local cache

The ``cacheMode`` can be set to any one of the following modes.  This uses the ``micro-cache`` node module as a local file system cache.  

- wild: all requests go out to the internet, don't load anything from cache, doesn't save anything.
- dryrun: Loads files from cache if exists, does http calls when cache doesn't exist, doesn't save to the cache.
- record: Loads files from the cache and saves new ones to the cache.

### Logging
This module uses ``winston`` for all logging.  Set an environment variable to a valid log level such as ``LOG_LEVEL=debug node yourscript.js``.

## Endpoint Implementation
All links below go to the official service documentation.  The code block refers to it's implementation in this module.

#### Fully Supported
All of the ``uwgws`` methods return a promise for a result object that contains the following elements:

Return Object Element | Meaning
---------- | ---------------
``statusCode`` | This element represents the HTTP statusCode of the API response.
``data`` | This element represents the data returned by the GWS API. This element is the raw xhtml response from the server if the request HTTP response is something other than the expected XHTML.

In most methods, the response body xhtml is parsed and returned in ``data`` element as JSON. This means most of the original body is removed to provide cleaner access to only the data you need.

All of the ``options`` parameters are outlined in ``sr/modules/[endpoint]``

Endpoint  | Implementation
------------- | -------------
[Membership - Get](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Get+Members)  | ``uwgws.membership.get(options)``
[Membership - Update](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Update+Members)  | ``uwgws.membership.add(options)``
[Membership - Delete](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Delete+Members)  | ``uwgws.membership.del(options)``

## Development
Copy ``test/setup/config-sample.js`` to ``test/setup/config.js`` and edit values as needed. Use the ``npm`` commands indicated in ``package.json``.

    npm build
    npm test

## TO DO
Right now, this is ``0.x.0`` because of the minimal endpoint implementation.  Next up will be the group create endpoint.
