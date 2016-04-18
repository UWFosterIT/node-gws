'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
  function Service(config) {
    _classCallCheck(this, Service);

    this.config = config;
    this.log = config.log;
    this.cache = config.cache;
    this.templates = this._templates();
  }

  _createClass(Service, [{
    key: '_options',
    value: function _options(endpoint) {
      return {
        agentOptions: this.config.auth,
        uriCache: endpoint.replace(/\//g, ''),
        uri: this.config.baseUrl + endpoint
      };
    }
  }, {
    key: '_templates',
    value: function _templates() {
      var cgPath = _path2.default.resolve(__dirname, '../templates/group-create.html');

      return {
        createGroup: _fs2.default.readFileSync(cgPath, 'utf-8')
      };
    }
  }, {
    key: '_put',
    value: function _put(endpoint, xhtml, etag) {
      var _this = this;

      return new Promise(function (fulfill, reject) {
        var options = _this._options(endpoint);
        _underscore2.default.extend(options.headers, etag);
        options.body = xhtml;

        _request2.default.put(options, function (err, response, body) {
          if (err) {
            reject(err);
          }

          fulfill(_this._buildResult(response, body));
        });
      });
    }
  }, {
    key: '_get',
    value: function _get(endpoint) {
      var _this2 = this;

      return new Promise(function (fulfill, reject) {
        // wild    no load no save
        // dryrun  load not save
        // record  load and save
        var options = _this2._options(endpoint);

        if (_this2.config.cacheMode === 'wild') {
          _this2.log.debug('wild -- ' + options.uri);
          _request2.default.get(options, function (err, response, body) {
            if (err) {
              reject(err);
            }

            fulfill(_this2._buildResult(response, body));
          });
        } else if (_this2.config.cacheMode === 'dryrun') {
          _this2.log.debug('dryrun for ' + options.uri);
          var body = _this2.cache.read(options.uriCache);
          if (body) {
            var response = {};
            response.statusCode = 200;
            fulfill(_this2._buildResult(response, body));
          } else {
            _request2.default.get(options, function (err, response, body) {
              if (err) {
                reject(err);
              }

              fulfill(_this2._buildResult(response, body));
            });
          }
        } else if (_this2.config.cacheMode === 'record') {
          _this2.log.debug('record -- ' + options.uri);
          var _body = _this2.cache.read(options.uriCache);
          if (_body) {
            var _response = {};
            _response.statusCode = 200;
            fulfill(_this2._buildResult(_response, _body));
          } else {
            _request2.default.get(options, function (err, response, body) {
              if (err) {
                reject(err);
              }

              if (response.statusCode === 200) {
                _this2.cache.write(options.uriCache, body, true);
              }

              fulfill(_this2._buildResult(response, body));
            });
          }
        }
      });
    }
  }, {
    key: '_buildResult',
    value: function _buildResult(response, body) {
      return {
        xhtml: body,
        statusCode: response.statusCode
      };
    }
  }]);

  return Service;
}();

exports.default = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL3NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTTtBQUNKLFdBREksT0FDSixDQUFZLE1BQVosRUFBb0I7MEJBRGhCLFNBQ2dCOztBQUNsQixTQUFLLE1BQUwsR0FBaUIsTUFBakIsQ0FEa0I7QUFFbEIsU0FBSyxHQUFMLEdBQWlCLE9BQU8sR0FBUCxDQUZDO0FBR2xCLFNBQUssS0FBTCxHQUFpQixPQUFPLEtBQVAsQ0FIQztBQUlsQixTQUFLLFNBQUwsR0FBaUIsS0FBSyxVQUFMLEVBQWpCLENBSmtCO0dBQXBCOztlQURJOzs2QkFRSyxVQUFVO0FBQ2pCLGFBQU87QUFDTCxzQkFBYyxLQUFLLE1BQUwsQ0FBWSxJQUFaO0FBQ2Qsa0JBQWMsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEVBQXhCLENBQWQ7QUFDQSxhQUFjLEtBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsUUFBdEI7T0FIaEIsQ0FEaUI7Ozs7aUNBUU47QUFDWCxVQUFJLFNBQVMsZUFBSyxPQUFMLENBQWEsU0FBYixFQUF3QixnQ0FBeEIsQ0FBVCxDQURPOztBQUdYLGFBQU87QUFDTCxxQkFBYSxhQUFHLFlBQUgsQ0FBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsQ0FBYjtPQURGLENBSFc7Ozs7eUJBUVIsVUFBVSxPQUFPLE1BQU07OztBQUMxQixhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxVQUFVLE1BQUssUUFBTCxDQUFjLFFBQWQsQ0FBVixDQURrQztBQUV0Qyw2QkFBRSxNQUFGLENBQVMsUUFBUSxPQUFSLEVBQWlCLElBQTFCLEVBRnNDO0FBR3RDLGdCQUFRLElBQVIsR0FBZSxLQUFmLENBSHNDOztBQUt0QywwQkFBUSxHQUFSLENBQVksT0FBWixFQUFxQixVQUFDLEdBQUQsRUFBTSxRQUFOLEVBQWdC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LFNBQVMsVUFBVDtPQUZkLENBRDJCOzs7O1NBaEd6Qjs7O2tCQXdHUyIsImZpbGUiOiJzZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzICAgICAgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggICAgZnJvbSAncGF0aCc7XG5pbXBvcnQgXyAgICAgICBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuXG5jbGFzcyBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgICAgPSBjb25maWc7XG4gICAgdGhpcy5sb2cgICAgICAgPSBjb25maWcubG9nO1xuICAgIHRoaXMuY2FjaGUgICAgID0gY29uZmlnLmNhY2hlO1xuICAgIHRoaXMudGVtcGxhdGVzID0gdGhpcy5fdGVtcGxhdGVzKCk7XG4gIH1cblxuICBfb3B0aW9ucyhlbmRwb2ludCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZ2VudE9wdGlvbnM6IHRoaXMuY29uZmlnLmF1dGgsXG4gICAgICB1cmlDYWNoZTogICAgIGVuZHBvaW50LnJlcGxhY2UoL1xcLy9nLCAnJyksXG4gICAgICB1cmk6ICAgICAgICAgIHRoaXMuY29uZmlnLmJhc2VVcmwgKyBlbmRwb2ludFxuICAgIH07XG4gIH1cblxuICBfdGVtcGxhdGVzKCkge1xuICAgIGxldCBjZ1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vdGVtcGxhdGVzL2dyb3VwLWNyZWF0ZS5odG1sJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY3JlYXRlR3JvdXA6IGZzLnJlYWRGaWxlU3luYyhjZ1BhdGgsICd1dGYtOCcpXG4gICAgfTtcbiAgfVxuXG4gIF9wdXQoZW5kcG9pbnQsIHhodG1sLCBldGFnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyhlbmRwb2ludCk7XG4gICAgICBfLmV4dGVuZChvcHRpb25zLmhlYWRlcnMsIGV0YWcpO1xuICAgICAgb3B0aW9ucy5ib2R5ID0geGh0bWw7XG5cbiAgICAgIHJlcXVlc3QucHV0KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgX2dldChlbmRwb2ludCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyB3aWxkICAgIG5vIGxvYWQgbm8gc2F2ZVxuICAgICAgLy8gZHJ5cnVuICBsb2FkIG5vdCBzYXZlXG4gICAgICAvLyByZWNvcmQgIGxvYWQgYW5kIHNhdmVcbiAgICAgIGxldCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyhlbmRwb2ludCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZU1vZGUgPT09ICd3aWxkJykge1xuICAgICAgICB0aGlzLmxvZy5kZWJ1Zyhgd2lsZCAtLSAke29wdGlvbnMudXJpfWApO1xuICAgICAgICByZXF1ZXN0LmdldChvcHRpb25zLCAoZXJyLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmNhY2hlTW9kZSA9PT0gJ2RyeXJ1bicpIHtcbiAgICAgICAgdGhpcy5sb2cuZGVidWcoYGRyeXJ1biBmb3IgJHtvcHRpb25zLnVyaX1gKTtcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLmNhY2hlLnJlYWQob3B0aW9ucy51cmlDYWNoZSk7XG4gICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0ge307XG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVxdWVzdC5nZXQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5jYWNoZU1vZGUgPT09ICdyZWNvcmQnKSB7XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKGByZWNvcmQgLS0gJHtvcHRpb25zLnVyaX1gKTtcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLmNhY2hlLnJlYWQob3B0aW9ucy51cmlDYWNoZSk7XG4gICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0ge307XG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVxdWVzdC5nZXQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZS53cml0ZShvcHRpb25zLnVyaUNhY2hlLCBib2R5LCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVsZmlsbCh0aGlzLl9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBfYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeGh0bWw6ICAgICAgYm9keSxcbiAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGVcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2U7XG4iXX0=