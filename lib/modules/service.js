'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-underscore-dangle*/


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

      return { createGroup: _fs2.default.readFileSync(cgPath, 'utf-8') };
    }
  }, {
    key: '_put',
    value: function _put(endpoint, xhtml, etag) {
      var _this = this;

      return new Promise(function (fulfill, reject) {
        var options = _this._options(endpoint);
        if (xhtml) {
          _underscore2.default.extend(options.headers, etag);
          options.body = xhtml;
        }

        _request2.default.put(options, function (err, response, body) {
          if (err) {
            reject(err);
          }

          fulfill(_this._buildResult(response, body));
        });
      });
    }
  }, {
    key: '_del',
    value: function _del(endpoint) {
      var _this2 = this;

      return new Promise(function (fulfill, reject) {
        var options = _this2._options(endpoint);

        _request2.default.del(options, function (err, response, body) {
          if (err) {
            reject(err);
          }

          fulfill(_this2._buildResult(response, body));
        });
      });
    }
  }, {
    key: '_get',
    value: function _get(endpoint) {
      var _this3 = this;

      return new Promise(function (fulfill, reject) {
        // wild    no load no save
        // dryrun  load not save
        // record  load and save
        var options = _this3._options(endpoint);

        if (_this3.config.cacheMode === 'wild') {
          _this3.log.debug('wild -- ' + options.uri);
          _request2.default.get(options, function (err, response, body) {
            if (err) {
              reject(err);
            }

            fulfill(_this3._buildResult(response, body));
          });
        } else if (_this3.config.cacheMode === 'dryrun') {
          _this3.log.debug('dryrun for ' + options.uri);
          var body = _this3.cache.read(options.uriCache);
          if (body) {
            var response = {};
            response.statusCode = 200;
            fulfill(_this3._buildResult(response, body));
          } else {
            _request2.default.get(options, function (err, response, body) {
              if (err) {
                reject(err);
              }

              fulfill(_this3._buildResult(response, body));
            });
          }
        } else if (_this3.config.cacheMode === 'record') {
          _this3.log.debug('record -- ' + options.uri);
          var _body = _this3.cache.read(options.uriCache);
          if (_body) {
            var _response = {};
            _response.statusCode = 200;
            fulfill(_this3._buildResult(_response, _body));
          } else {
            _request2.default.get(options, function (err, response, body) {
              if (err) {
                reject(err);
              }

              if (response.statusCode === 200) {
                _this3.cache.write(options.uriCache, body, true);
              }

              fulfill(_this3._buildResult(response, body));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL3NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FqQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sTztBQUNKLG1CQUFZLE1BQVosRUFBb0I7QUFBQTs7QUFDbEIsU0FBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLFNBQUssR0FBTCxHQUFXLE9BQU8sR0FBbEI7QUFDQSxTQUFLLEtBQUwsR0FBYSxPQUFPLEtBQXBCO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLEtBQUssVUFBTCxFQUFqQjtBQUNEOzs7OzZCQUVRLFEsRUFBVTtBQUNqQixhQUFPO0FBQ0wsc0JBQWMsS0FBSyxNQUFMLENBQVksSUFEckI7QUFFTCxrQkFBYyxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsRUFBeEIsQ0FGVDtBQUdMLGFBQWMsS0FBSyxNQUFMLENBQVksT0FBWixHQUFzQjtBQUgvQixPQUFQO0FBS0Q7OztpQ0FFWTtBQUNYLFVBQUksU0FBUyxlQUFLLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLGdDQUF4QixDQUFiOztBQUVBLGFBQU8sRUFBQyxhQUFhLGFBQUcsWUFBSCxDQUFnQixNQUFoQixFQUF3QixPQUF4QixDQUFkLEVBQVA7QUFDRDs7O3lCQUVJLFEsRUFBVSxLLEVBQU8sSSxFQUFNO0FBQUE7O0FBQzFCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxZQUFJLFVBQVUsTUFBSyxRQUFMLENBQWMsUUFBZCxDQUFkO0FBQ0EsWUFBSSxLQUFKLEVBQVc7QUFDVCwrQkFBRSxNQUFGLENBQVMsUUFBUSxPQUFqQixFQUEwQixJQUExQjtBQUNBLGtCQUFRLElBQVIsR0FBZSxLQUFmO0FBQ0Q7O0FBRUQsMEJBQVEsR0FBUixDQUFZLE9BQVosRUFBcUIsVUFBQyxHQUFELEVBQU0sUUFBTixFQUFnQixJQUFoQixFQUF5QjtBQUM1QyxjQUFJLEdBQUosRUFB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OztBQUVELHNCQUFRLE9BQUssWUFBTCxDQUFrQixRQUFsQixFQUE0QixJQUE1QixDQUFSO0FBQ0QsYUFWRDtBQVdEO0FBQ0Y7QUFDRixPQXBETSxDQUFQO0FBcUREOzs7aUNBRVksUSxFQUFVLEksRUFBTTtBQUMzQixhQUFPO0FBQ0wsZUFBWSxJQURQO0FBRUwsb0JBQVksU0FBUztBQUZoQixPQUFQO0FBSUQ7Ozs7OztrQkFHWSxPIiwiZmlsZSI6InNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSovXG5pbXBvcnQgZnMgICAgICBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCAgICBmcm9tICdwYXRoJztcbmltcG9ydCBfICAgICAgIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5cbmNsYXNzIFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLmxvZyA9IGNvbmZpZy5sb2c7XG4gICAgdGhpcy5jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICB0aGlzLnRlbXBsYXRlcyA9IHRoaXMuX3RlbXBsYXRlcygpO1xuICB9XG5cbiAgX29wdGlvbnMoZW5kcG9pbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWdlbnRPcHRpb25zOiB0aGlzLmNvbmZpZy5hdXRoLFxuICAgICAgdXJpQ2FjaGU6ICAgICBlbmRwb2ludC5yZXBsYWNlKC9cXC8vZywgJycpLFxuICAgICAgdXJpOiAgICAgICAgICB0aGlzLmNvbmZpZy5iYXNlVXJsICsgZW5kcG9pbnRcbiAgICB9O1xuICB9XG5cbiAgX3RlbXBsYXRlcygpIHtcbiAgICBsZXQgY2dQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3RlbXBsYXRlcy9ncm91cC1jcmVhdGUuaHRtbCcpO1xuXG4gICAgcmV0dXJuIHtjcmVhdGVHcm91cDogZnMucmVhZEZpbGVTeW5jKGNnUGF0aCwgJ3V0Zi04Jyl9O1xuICB9XG5cbiAgX3B1dChlbmRwb2ludCwgeGh0bWwsIGV0YWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zKGVuZHBvaW50KTtcbiAgICAgIGlmICh4aHRtbCkge1xuICAgICAgICBfLmV4dGVuZChvcHRpb25zLmhlYWRlcnMsIGV0YWcpO1xuICAgICAgICBvcHRpb25zLmJvZHkgPSB4aHRtbDtcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5wdXQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVsZmlsbCh0aGlzLl9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBfZGVsKGVuZHBvaW50KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyhlbmRwb2ludCk7XG5cbiAgICAgIHJlcXVlc3QuZGVsKG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgX2dldChlbmRwb2ludCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyB3aWxkICAgIG5vIGxvYWQgbm8gc2F2ZVxuICAgICAgLy8gZHJ5cnVuICBsb2FkIG5vdCBzYXZlXG4gICAgICAvLyByZWNvcmQgIGxvYWQgYW5kIHNhdmVcbiAgICAgIGxldCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyhlbmRwb2ludCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZU1vZGUgPT09ICd3aWxkJykge1xuICAgICAgICB0aGlzLmxvZy5kZWJ1Zyhgd2lsZCAtLSAke29wdGlvbnMudXJpfWApO1xuICAgICAgICByZXF1ZXN0LmdldChvcHRpb25zLCAoZXJyLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmNhY2hlTW9kZSA9PT0gJ2RyeXJ1bicpIHtcbiAgICAgICAgdGhpcy5sb2cuZGVidWcoYGRyeXJ1biBmb3IgJHtvcHRpb25zLnVyaX1gKTtcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLmNhY2hlLnJlYWQob3B0aW9ucy51cmlDYWNoZSk7XG4gICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0ge307XG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVxdWVzdC5nZXQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5jYWNoZU1vZGUgPT09ICdyZWNvcmQnKSB7XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKGByZWNvcmQgLS0gJHtvcHRpb25zLnVyaX1gKTtcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLmNhY2hlLnJlYWQob3B0aW9ucy51cmlDYWNoZSk7XG4gICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0ge307XG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVxdWVzdC5nZXQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZS53cml0ZShvcHRpb25zLnVyaUNhY2hlLCBib2R5LCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVsZmlsbCh0aGlzLl9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBfYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeGh0bWw6ICAgICAgYm9keSxcbiAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGVcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2U7XG4iXX0=