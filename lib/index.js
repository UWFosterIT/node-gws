'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _microCache = require('micro-cache');

var _microCache2 = _interopRequireDefault(_microCache);

var _membership = require('./modules/membership');

var _membership2 = _interopRequireDefault(_membership);

var _group = require('./modules/group');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readCertificate() {
  var cert = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var key = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  if (cert === '' || key === '' || !_fs2.default.existsSync(cert) || !_fs2.default.existsSync(key)) {
    throw new Error('Client cert ' + cert + ' or key ' + key + ' can not be found');
  }

  return {
    cert: _fs2.default.readFileSync(cert),
    key: _fs2.default.readFileSync(key),
    rejectUnauthorized: false
  };
}

var UWGWS = {
  initialize: function initialize(options) {
    var config = options;
    config.auth = readCertificate(options.cert, options.key);

    _winston2.default.loggers.add('uwgws', {
      console: {
        colorize: true,
        label: 'uwgws',
        level: process.env.LOG_LEVEL || options.logLevel,
        prettyPrint: true
      }
    });

    config.log = _winston2.default.loggers.get('uwgws');
    config.cache = new _microCache2.default(options.cachePath, options.logLevel, options.cacheExt);

    this.membership = new _membership2.default(config);
    this.group = new _group2.default(config);

    return this;
  }
};

module.exports = UWGWS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZUFBVCxHQUE4QztBQUFBLE1BQXJCLElBQXFCLHlEQUFkLEVBQWM7QUFBQSxNQUFWLEdBQVUseURBQUosRUFBSTs7QUFDNUMsTUFBSSxTQUFTLEVBQVQsSUFBZSxRQUFRLEVBQXZCLElBQ0EsQ0FBQyxhQUFHLFVBQUgsQ0FBYyxJQUFkLENBREQsSUFDd0IsQ0FBQyxhQUFHLFVBQUgsQ0FBYyxHQUFkLENBRDdCLEVBQ2lEO0FBQy9DLFVBQU0sSUFBSSxLQUFKLGtCQUF5QixJQUF6QixnQkFBd0MsR0FBeEMsdUJBQU47QUFDRDs7QUFFRCxTQUFPO0FBQ0wsVUFBb0IsYUFBRyxZQUFILENBQWdCLElBQWhCLENBRGY7QUFFTCxTQUFvQixhQUFHLFlBQUgsQ0FBZ0IsR0FBaEIsQ0FGZjtBQUdMLHdCQUFvQjtBQUhmLEdBQVA7QUFLRDs7QUFFRCxJQUFJLFFBQVE7QUFDVixZQURVLHNCQUNDLE9BREQsRUFDVTtBQUNsQixRQUFJLFNBQVMsT0FBYjtBQUNBLFdBQU8sSUFBUCxHQUFjLGdCQUFnQixRQUFRLElBQXhCLEVBQThCLFFBQVEsR0FBdEMsQ0FBZDs7QUFFQSxzQkFBUSxPQUFSLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCLEVBQTZCO0FBQzNCLGVBQVM7QUFDUCxrQkFBYSxJQUROO0FBRVAsZUFBYSxPQUZOO0FBR1AsZUFBYSxRQUFRLEdBQVIsQ0FBWSxTQUFaLElBQXlCLFFBQVEsUUFIdkM7QUFJUCxxQkFBYTtBQUpOO0FBRGtCLEtBQTdCOztBQVNBLFdBQU8sR0FBUCxHQUFhLGtCQUFRLE9BQVIsQ0FBZ0IsR0FBaEIsQ0FBb0IsT0FBcEIsQ0FBYjtBQUNBLFdBQU8sS0FBUCxHQUFlLHlCQUNiLFFBQVEsU0FESyxFQUViLFFBQVEsUUFGSyxFQUdiLFFBQVEsUUFISyxDQUFmOztBQU1BLFNBQUssVUFBTCxHQUFrQix5QkFBZSxNQUFmLENBQWxCO0FBQ0EsU0FBSyxLQUFMLEdBQWtCLG9CQUFVLE1BQVYsQ0FBbEI7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7QUF6QlMsQ0FBWjs7QUE0QkEsT0FBTyxPQUFQLEdBQWlCLEtBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzICAgICAgICAgICBmcm9tICdmcyc7XG5pbXBvcnQgd2luc3RvbiAgICAgIGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IE1pY3JvQ2FjaGUgICBmcm9tICdtaWNyby1jYWNoZSc7XG5pbXBvcnQgTWVtYmVyc2hpcCAgIGZyb20gJy4vbW9kdWxlcy9tZW1iZXJzaGlwJztcbmltcG9ydCBHcm91cCAgICAgICAgZnJvbSAnLi9tb2R1bGVzL2dyb3VwJztcblxuZnVuY3Rpb24gcmVhZENlcnRpZmljYXRlKGNlcnQgPSAnJywga2V5ID0gJycpIHtcbiAgaWYgKGNlcnQgPT09ICcnIHx8IGtleSA9PT0gJycgfHxcbiAgICAgICFmcy5leGlzdHNTeW5jKGNlcnQpIHx8ICFmcy5leGlzdHNTeW5jKGtleSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENsaWVudCBjZXJ0ICR7Y2VydH0gb3Iga2V5ICR7a2V5fSBjYW4gbm90IGJlIGZvdW5kYCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNlcnQ6ICAgICAgICAgICAgICAgZnMucmVhZEZpbGVTeW5jKGNlcnQpLFxuICAgIGtleTogICAgICAgICAgICAgICAgZnMucmVhZEZpbGVTeW5jKGtleSksXG4gICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZVxuICB9O1xufVxuXG5sZXQgVVdHV1MgPSB7XG4gIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgIGxldCBjb25maWcgPSBvcHRpb25zO1xuICAgIGNvbmZpZy5hdXRoID0gcmVhZENlcnRpZmljYXRlKG9wdGlvbnMuY2VydCwgb3B0aW9ucy5rZXkpO1xuXG4gICAgd2luc3Rvbi5sb2dnZXJzLmFkZCgndXdnd3MnLCB7XG4gICAgICBjb25zb2xlOiB7XG4gICAgICAgIGNvbG9yaXplOiAgICB0cnVlLFxuICAgICAgICBsYWJlbDogICAgICAgJ3V3Z3dzJyxcbiAgICAgICAgbGV2ZWw6ICAgICAgIHByb2Nlc3MuZW52LkxPR19MRVZFTCB8fCBvcHRpb25zLmxvZ0xldmVsLFxuICAgICAgICBwcmV0dHlQcmludDogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uZmlnLmxvZyA9IHdpbnN0b24ubG9nZ2Vycy5nZXQoJ3V3Z3dzJyk7XG4gICAgY29uZmlnLmNhY2hlID0gbmV3IE1pY3JvQ2FjaGUoXG4gICAgICBvcHRpb25zLmNhY2hlUGF0aCxcbiAgICAgIG9wdGlvbnMubG9nTGV2ZWwsXG4gICAgICBvcHRpb25zLmNhY2hlRXh0XG4gICAgKTtcblxuICAgIHRoaXMubWVtYmVyc2hpcCA9IG5ldyBNZW1iZXJzaGlwKGNvbmZpZyk7XG4gICAgdGhpcy5ncm91cCAgICAgID0gbmV3IEdyb3VwKGNvbmZpZyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBVV0dXUztcbiJdfQ==