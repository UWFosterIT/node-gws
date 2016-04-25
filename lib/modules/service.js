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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL3NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTTtBQUNKLFdBREksT0FDSixDQUFZLE1BQVosRUFBb0I7MEJBRGhCLFNBQ2dCOztBQUNsQixTQUFLLE1BQUwsR0FBaUIsTUFBakIsQ0FEa0I7QUFFbEIsU0FBSyxHQUFMLEdBQWlCLE9BQU8sR0FBUCxDQUZDO0FBR2xCLFNBQUssS0FBTCxHQUFpQixPQUFPLEtBQVAsQ0FIQztBQUlsQixTQUFLLFNBQUwsR0FBaUIsS0FBSyxVQUFMLEVBQWpCLENBSmtCO0dBQXBCOztlQURJOzs2QkFRSyxVQUFVO0FBQ2pCLGFBQU87QUFDTCxzQkFBYyxLQUFLLE1BQUwsQ0FBWSxJQUFaO0FBQ2Qsa0JBQWMsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEVBQXhCLENBQWQ7QUFDQSxhQUFjLEtBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsUUFBdEI7T0FIaEIsQ0FEaUI7Ozs7aUNBUU47QUFDWCxVQUFJLFNBQVMsZUFBSyxPQUFMLENBQWEsU0FBYixFQUF3QixnQ0FBeEIsQ0FBVCxDQURPOztBQUdYLGFBQU87QUFDTCxxQkFBYSxhQUFHLFlBQUgsQ0FBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsQ0FBYjtPQURGLENBSFc7Ozs7eUJBUVIsVUFBVSxPQUFPLE1BQU07OztBQUMxQixhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxVQUFVLE1BQUssUUFBTCxDQUFjLFFBQWQsQ0FBVixDQURrQztBQUV0QyxZQUFJLEtBQUosRUFBVztBQUNULCtCQUFFLE1BQUYsQ0FBUyxRQUFRLE9BQVIsRUFBaUIsSUFBMUIsRUFEUztBQUVULGtCQUFRLElBQVIsR0FBZSxLQUFmLENBRlM7U0FBWDs7QUFLQSwwQkFBUSxHQUFSLENBQVksT0FBWixFQUFxQixVQUFD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QUFOLEVBQWdCLElBQWhCLEVBQXlCO0FBQzVDLGtCQUFJLEdBQUosRUFBUztBQUNQLHVCQUFPLEdBQVAsRUFETztlQUFUOztBQUlBLGtCQUFJLFNBQVMsVUFBVCxLQUF3QixHQUF4QixFQUE2QjtBQUMvQix1QkFBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixRQUFRLFFBQVIsRUFBa0IsSUFBbkMsRUFBeUMsSUFBekMsRUFEK0I7ZUFBakM7O0FBSUEsc0JBQVEsT0FBSyxZQUFMLENBQWtCLFFBQWxCLEVBQTRCLElBQTVCLENBQVIsRUFUNEM7YUFBekIsQ0FBckIsQ0FESztXQUpQO1NBSEs7T0EvQlUsQ0FBbkIsQ0FEYTs7OztpQ0F3REYsVUFBVSxNQUFNO0FBQzNCLGFBQU87QUFDTCxlQUFZLElBQVo7QUFDQSxvQkFBWSxTQUFTLFVBQVQ7T0FGZCxDQUQyQjs7OztTQWhIekI7OztrQkF3SFMiLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyAgICAgIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoICAgIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF8gICAgICAgZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcblxuY2xhc3MgU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnICAgID0gY29uZmlnO1xuICAgIHRoaXMubG9nICAgICAgID0gY29uZmlnLmxvZztcbiAgICB0aGlzLmNhY2hlICAgICA9IGNvbmZpZy5jYWNoZTtcbiAgICB0aGlzLnRlbXBsYXRlcyA9IHRoaXMuX3RlbXBsYXRlcygpO1xuICB9XG5cbiAgX29wdGlvbnMoZW5kcG9pbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWdlbnRPcHRpb25zOiB0aGlzLmNvbmZpZy5hdXRoLFxuICAgICAgdXJpQ2FjaGU6ICAgICBlbmRwb2ludC5yZXBsYWNlKC9cXC8vZywgJycpLFxuICAgICAgdXJpOiAgICAgICAgICB0aGlzLmNvbmZpZy5iYXNlVXJsICsgZW5kcG9pbnRcbiAgICB9O1xuICB9XG5cbiAgX3RlbXBsYXRlcygpIHtcbiAgICBsZXQgY2dQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3RlbXBsYXRlcy9ncm91cC1jcmVhdGUuaHRtbCcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNyZWF0ZUdyb3VwOiBmcy5yZWFkRmlsZVN5bmMoY2dQYXRoLCAndXRmLTgnKVxuICAgIH07XG4gIH1cblxuICBfcHV0KGVuZHBvaW50LCB4aHRtbCwgZXRhZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMoZW5kcG9pbnQpO1xuICAgICAgaWYgKHhodG1sKSB7XG4gICAgICAgIF8uZXh0ZW5kKG9wdGlvbnMuaGVhZGVycywgZXRhZyk7XG4gICAgICAgIG9wdGlvbnMuYm9keSA9IHhodG1sO1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LnB1dChvcHRpb25zLCAoZXJyLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9kZWwoZW5kcG9pbnQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zKGVuZHBvaW50KTtcblxuICAgICAgcmVxdWVzdC5kZWwob3B0aW9ucywgKGVyciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVsZmlsbCh0aGlzLl9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBfZ2V0KGVuZHBvaW50KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgIC8vIHdpbGQgICAgbm8gbG9hZCBubyBzYXZlXG4gICAgICAvLyBkcnlydW4gIGxvYWQgbm90IHNhdmVcbiAgICAgIC8vIHJlY29yZCAgbG9hZCBhbmQgc2F2ZVxuICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zKGVuZHBvaW50KTtcblxuICAgICAgaWYgKHRoaXMuY29uZmlnLmNhY2hlTW9kZSA9PT0gJ3dpbGQnKSB7XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKGB3aWxkIC0tICR7b3B0aW9ucy51cml9YCk7XG4gICAgICAgIHJlcXVlc3QuZ2V0KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVsZmlsbCh0aGlzLl9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcuY2FjaGVNb2RlID09PSAnZHJ5cnVuJykge1xuICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhgZHJ5cnVuIGZvciAke29wdGlvbnMudXJpfWApO1xuICAgICAgICBsZXQgYm9keSA9IHRoaXMuY2FjaGUucmVhZChvcHRpb25zLnVyaUNhY2hlKTtcbiAgICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXF1ZXN0LmdldChvcHRpb25zLCAoZXJyLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVsZmlsbCh0aGlzLl9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmNhY2hlTW9kZSA9PT0gJ3JlY29yZCcpIHtcbiAgICAgICAgdGhpcy5sb2cuZGVidWcoYHJlY29yZCAtLSAke29wdGlvbnMudXJpfWApO1xuICAgICAgICBsZXQgYm9keSA9IHRoaXMuY2FjaGUucmVhZChvcHRpb25zLnVyaUNhY2hlKTtcbiAgICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXF1ZXN0LmdldChvcHRpb25zLCAoZXJyLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICB0aGlzLmNhY2hlLndyaXRlKG9wdGlvbnMudXJpQ2FjaGUsIGJvZHksIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIF9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkge1xuICAgIHJldHVybiB7XG4gICAgICB4aHRtbDogICAgICBib2R5LFxuICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VydmljZTtcbiJdfQ==