# UW Groups Web Service

This implements some of the [v2 UW Groups Webservice endpoints](https://wiki.cac.washington.edu/display/infra/Groups+Web+Service+REST+API). Each endpoint is queried using convienent options to build the final request to GWS.

This module assumes you have gone through all the required steps to gain and verify access as [documented in their wiki](https://wiki.cac.washington.edu/display/infra/Groups+Web+Service+REST+API).

Note: Version 4.0.0 and later require Node 8

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
`xhtml` | This is the raw response from the server
`data` | This element represents parsed XHTML into JSON when possible for GET requests.
`error` | Boolean value represents the presence or absence of a business logic error. For example, adding an invalid netid to a valid group returns a `statusCode` of 200 but `error` = false
`message` | Array of error messages if `error` is true. There will generally be only one value unless you attempted to add multiple invalid netids to a group. Then each invalid id will generate an item in the `message` array.

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

## Development

    git clone git@github.com:UWFosterIT/node-gws.git
    cd node-gws
    # create a branch as needed. don't work on master
    yarn install
    cp test/setup/config-sample.js test/setup/config.js
    # put appropriate values in the new config.js
    npm test

It is recommended that you use the eval environment (https://eval.groups.uw.edu/group_sws/v2/) when developing/testing to avoid making lasting changes. And the search test will occassionaly timeout if you are using prod.

Run `npm run lint` and fix any errors or warnings before checking in your code.