# UW Groups Web Service

This implements some of the [v2 UW Groups Webservice endpoints](https://wiki.cac.washington.edu/display/infra/Groups+Web+Service+REST+API). Each endpoint is queried using convienent options to build the final request to GWS.

This module assumes you have gone through all the required steps to gain and verify access as [documented in their wiki](https://wiki.cac.washington.edu/display/infra/Groups+Web+Service+REST+API).

Note: Version 4.0.0 and later require Node 8
Note: Version 5.0.0 and later use the GWS v3 JSON API. Responses from this library may be different because of changes in the GWS API output.

## Installation

    npm install uwgws

## USE

First setup a config object to hold variables for your x509 cert and key as well as some optional caching of responses from the service. Cache options are detailed in the [micro-cache](https://www.npmjs.com/package/micro-cache) node module.

The certInfo object should only contain either a file or an s3 object. If you include both, only the file object will be picked up.

```JavaScript
let uwgws = require('uwgws');

let config = {
  baseUrl:   'https://iam-ws.u.washington.edu:7443/group_sws/v2/',
  cacheExt:  '.json',
  cacheMode: 'wild',
  cachePath: './cache/',
  certInfo:  {
    file: {
      cert: 'path-to-local/cert.pem',
      key:  'path-to-local/key.key'
    }
    // s3: {
    //   certBucket: 'uwfosterit.certs',
    //   certKey:    'laps_cert.cer',
    //   keyBucket:  'uwfosterit.certs',
    //   keyKey:     'laps_cert.key'
    // }
  },
  // cert:     '/home/gabugabu/.ssh/gabugabu.bschool.uwca.pem',
  // key:      '/home/gabugabu/.ssh/gabugabu.bschool.key',
  logLevel: 'info'
};

await uwgws.initialize(config);
```

Now query for memberships for the desired group name or regid. Set `effective: true` if you want effective membership, otherwise false or not at all.

```JavaScript
let options = {
  effective: true,
  id: 'uw_foster_staff_it_developers_nodegws-test'
};

let result = await uwgws.membership.get(options);
console.log(result);
```

### Using a local cache

The `cacheMode` can be set to any one of the following modes. This uses the `micro-cache` node module as a local file system cache.

- `wild`: all requests go out to the internet over HTTP, nothing is loaded from cache, and nothing is saved to the cache.
- `dryrun`: Loads files from cache if it exists, uses HTTP calls when cache doesn't exist, doesn't save to the cache.
- `record`: Loads files from the cache and saves new files to the cache.

### Logging

This module uses `log4js` for all logging. Set an environment variable to a valid log level such as `LOG_LEVEL=debug node script.js`. Alternatively, the log level can be set using the `logLevel` property of the `node-gws` config.

## Endpoint Implementation

All links below go to the official service documentation. The code block refers to the implemented method in this module.

### Fully Supported

All of the `uwgws` methods return a promise for a result object that contains the following elements:

Return Object Element | Meaning
---------- | ---------------
`statusCode` | This element represents the HTTP statusCode of the API response.
`data` | This is the data element returned by the GWS API. If no data element is returned by the API, this will be an empty object.
`error` | Boolean value represents the presence or absence of a business logic error. For example, adding an invalid netid to a valid group returns a `statusCode` of 200 but `error` = true.
`message` | Array of error details returned by the API. Some operations return an "error" message when successful.
`notFound` | Array of invalid UW Net IDs when adding members to a valid group. An add operation will return a status code of 200, a message of OK and the error element will be set to true when the `notFound` element is present.

All of the `options` parameters are outlined in `src/modules/[endpoint]`.

Endpoint  | Implementation
------------- | -------------
[Membership - Get](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Get+Members)  | `uwgws.membership.get(options)`
[Membership - Update](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Update+Members)  | `uwgws.membership.add(options)`
[Membership - Delete](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Delete+Members)  | `uwgws.membership.del(options)`
[Group - Create](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Create+Group)  | `uwgws.group.create(options)`
[Group - Delete](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Delete+Group)  | `uwgws.group.del(options)`
[Group - History](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Get+History) | `uwgws.group.history(options)`
[Search - Query](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Search) | `uwgws.search.query(options)`

### LDAP cache

The group service behind the GWS API uses LDAP caches to improve reliability and response time for some requests. The caches may take several seconds to update after changes to GWS are made. This can cause inconsistency in that you may not 'read what you wrote' during the time the cache is invalid.

If you need to ensure cache consistency, you can add `sync: true` to the options of group create and membership add operations.

## Development

    git clone git@github.com:UWFosterIT/node-gws.git
    cd node-gws
    # create a branch as needed. don't work on master
    npm install
    cp test/setup/config-sample.js test/setup/config.js
    # put appropriate values in the new config.js
    npm test

It is recommended that you use the eval environment (https://eval.groups.uw.edu/group_sws/v3/) when developing/testing to avoid making lasting changes. And the search test will occasionally timeout if you are using prod.