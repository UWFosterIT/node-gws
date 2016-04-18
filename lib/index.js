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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZUFBVCxHQUE4QztNQUFyQiw2REFBTyxrQkFBYztNQUFWLDREQUFNLGtCQUFJOztBQUM1QyxNQUFJLFNBQVMsRUFBVCxJQUFlLFFBQVEsRUFBUixJQUNmLENBQUMsYUFBRyxVQUFILENBQWMsSUFBZCxDQUFELElBQXdCLENBQUMsYUFBRyxVQUFILENBQWMsR0FBZCxDQUFELEVBQXFCO0FBQy9DLFVBQU0sSUFBSSxLQUFKLGtCQUF5QixvQkFBZSx5QkFBeEMsQ0FBTixDQUQrQztHQURqRDs7QUFLQSxTQUFPO0FBQ0wsVUFBb0IsYUFBRyxZQUFILENBQWdCLElBQWhCLENBQXBCO0FBQ0EsU0FBb0IsYUFBRyxZQUFILENBQWdCLEdBQWhCLENBQXBCO0FBQ0Esd0JBQW9CLEtBQXBCO0dBSEYsQ0FONEM7Q0FBOUM7O0FBYUEsSUFBSSxRQUFRO0FBQ1Ysa0NBQVcsU0FBUztBQUNsQixRQUFJLFNBQVMsT0FBVCxDQURjO0FBRWxCLFdBQU8sSUFBUCxHQUFjLGdCQUFnQixRQUFRLElBQVIsRUFBYyxRQUFRLEdBQVIsQ0FBNUMsQ0FGa0I7O0FBSWxCLHNCQUFRLE9BQVIsQ0FBZ0IsR0FBaEIsQ0FBb0IsT0FBcEIsRUFBNkI7QUFDM0IsZUFBUztBQUNQLGtCQUFhLElBQWI7QUFDQSxlQUFhLE9BQWI7QUFDQSxlQUFhLFFBQVEsR0FBUixDQUFZLFNBQVosSUFBeUIsUUFBUSxRQUFSO0FBQ3RDLHFCQUFhLElBQWI7T0FKRjtLQURGLEVBSmtCOztBQWFsQixXQUFPLEdBQVAsR0FBYSxrQkFBUSxPQUFSLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCLENBQWIsQ0Fia0I7QUFjbEIsV0FBTyxLQUFQLEdBQWUseUJBQ2IsUUFBUSxTQUFSLEVBQ0EsUUFBUSxRQUFSLEVBQ0EsUUFBUSxRQUFSLENBSEYsQ0Fka0I7O0FBb0JsQixTQUFLLFVBQUwsR0FBa0IseUJBQWUsTUFBZixDQUFsQixDQXBCa0I7QUFxQmxCLFNBQUssS0FBTCxHQUFrQixvQkFBVSxNQUFWLENBQWxCLENBckJrQjs7QUF1QmxCLFdBQU8sSUFBUCxDQXZCa0I7R0FEVjtDQUFSOztBQTRCSixPQUFPLE9BQVAsR0FBaUIsS0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgICAgICAgICAgIGZyb20gJ2ZzJztcbmltcG9ydCB3aW5zdG9uICAgICAgZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgTWljcm9DYWNoZSAgIGZyb20gJ21pY3JvLWNhY2hlJztcbmltcG9ydCBNZW1iZXJzaGlwICAgZnJvbSAnLi9tb2R1bGVzL21lbWJlcnNoaXAnO1xuaW1wb3J0IEdyb3VwICAgICAgICBmcm9tICcuL21vZHVsZXMvZ3JvdXAnO1xuXG5mdW5jdGlvbiByZWFkQ2VydGlmaWNhdGUoY2VydCA9ICcnLCBrZXkgPSAnJykge1xuICBpZiAoY2VydCA9PT0gJycgfHwga2V5ID09PSAnJyB8fFxuICAgICAgIWZzLmV4aXN0c1N5bmMoY2VydCkgfHwgIWZzLmV4aXN0c1N5bmMoa2V5KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2xpZW50IGNlcnQgJHtjZXJ0fSBvciBrZXkgJHtrZXl9IGNhbiBub3QgYmUgZm91bmRgKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2VydDogICAgICAgICAgICAgICBmcy5yZWFkRmlsZVN5bmMoY2VydCksXG4gICAga2V5OiAgICAgICAgICAgICAgICBmcy5yZWFkRmlsZVN5bmMoa2V5KSxcbiAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlXG4gIH07XG59XG5cbmxldCBVV0dXUyA9IHtcbiAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgbGV0IGNvbmZpZyA9IG9wdGlvbnM7XG4gICAgY29uZmlnLmF1dGggPSByZWFkQ2VydGlmaWNhdGUob3B0aW9ucy5jZXJ0LCBvcHRpb25zLmtleSk7XG5cbiAgICB3aW5zdG9uLmxvZ2dlcnMuYWRkKCd1d2d3cycsIHtcbiAgICAgIGNvbnNvbGU6IHtcbiAgICAgICAgY29sb3JpemU6ICAgIHRydWUsXG4gICAgICAgIGxhYmVsOiAgICAgICAndXdnd3MnLFxuICAgICAgICBsZXZlbDogICAgICAgcHJvY2Vzcy5lbnYuTE9HX0xFVkVMIHx8IG9wdGlvbnMubG9nTGV2ZWwsXG4gICAgICAgIHByZXR0eVByaW50OiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25maWcubG9nID0gd2luc3Rvbi5sb2dnZXJzLmdldCgndXdnd3MnKTtcbiAgICBjb25maWcuY2FjaGUgPSBuZXcgTWljcm9DYWNoZShcbiAgICAgIG9wdGlvbnMuY2FjaGVQYXRoLFxuICAgICAgb3B0aW9ucy5sb2dMZXZlbCxcbiAgICAgIG9wdGlvbnMuY2FjaGVFeHRcbiAgICApO1xuXG4gICAgdGhpcy5tZW1iZXJzaGlwID0gbmV3IE1lbWJlcnNoaXAoY29uZmlnKTtcbiAgICB0aGlzLmdyb3VwICAgICAgPSBuZXcgR3JvdXAoY29uZmlnKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVXR1dTO1xuIl19