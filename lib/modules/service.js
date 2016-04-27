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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL3NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxPO0FBQ0osbUJBQVksTUFBWixFQUFvQjtBQUFBOztBQUNsQixTQUFLLE1BQUwsR0FBaUIsTUFBakI7QUFDQSxTQUFLLEdBQUwsR0FBaUIsT0FBTyxHQUF4QjtBQUNBLFNBQUssS0FBTCxHQUFpQixPQUFPLEtBQXhCO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLEtBQUssVUFBTCxFQUFqQjtBQUNEOzs7OzZCQUVRLFEsRUFBVTtBQUNqQixhQUFPO0FBQ0wsc0JBQWMsS0FBSyxNQUFMLENBQVksSUFEckI7QUFFTCxrQkFBYyxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsRUFBeEIsQ0FGVDtBQUdMLGFBQWMsS0FBSyxNQUFMLENBQVksT0FBWixHQUFzQjtBQUgvQixPQUFQO0FBS0Q7OztpQ0FFWTtBQUNYLFVBQUksU0FBUyxlQUFLLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLGdDQUF4QixDQUFiOztBQUVBLGFBQU87QUFDTCxxQkFBYSxhQUFHLFlBQUgsQ0FBZ0IsTUFBaEIsRUFBd0IsT0FBeEI7QUFEUixPQUFQO0FBR0Q7Ozt5QkFFSSxRLEVBQVUsSyxFQUFPLEksRUFBTTtBQUFBOztBQUMxQixhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxVQUFVLE1BQUssUUFBTCxDQUFjLFFBQWQsQ0FBZDtBQUNBLFlBQUksS0FBSixFQUFXO0FBQ1QsK0JBQUUsTUFBRixDQUFTLFFBQVEsT0FBakIsRUFBMEIsSUFBMUI7QUFDQSxrQkFBUSxJQUFSLEdBQWUsS0FBZjtBQUNEOztBQUVELDBCQUFRLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLFVBQUMsR0FBRCxFQUFNLFFBQU4sRUFBZ0IsSUFBaEIsRUFBeUI7QUFDNUMsY0FBSSxHQUFKLEVBQVM7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QUFLLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIsSUFBNUIsQ0FBUjtBQUNELGFBVkQ7QUFXRDtBQUNGO0FBQ0YsT0FwRE0sQ0FBUDtBQXFERDs7O2lDQUVZLFEsRUFBVSxJLEVBQU07QUFDM0IsYUFBTztBQUNMLGVBQVksSUFEUDtBQUVMLG9CQUFZLFNBQVM7QUFGaEIsT0FBUDtBQUlEOzs7Ozs7a0JBR1ksTyIsImZpbGUiOiJzZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzICAgICAgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggICAgZnJvbSAncGF0aCc7XG5pbXBvcnQgXyAgICAgICBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuXG5jbGFzcyBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgICAgPSBjb25maWc7XG4gICAgdGhpcy5sb2cgICAgICAgPSBjb25maWcubG9nO1xuICAgIHRoaXMuY2FjaGUgICAgID0gY29uZmlnLmNhY2hlO1xuICAgIHRoaXMudGVtcGxhdGVzID0gdGhpcy5fdGVtcGxhdGVzKCk7XG4gIH1cblxuICBfb3B0aW9ucyhlbmRwb2ludCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZ2VudE9wdGlvbnM6IHRoaXMuY29uZmlnLmF1dGgsXG4gICAgICB1cmlDYWNoZTogICAgIGVuZHBvaW50LnJlcGxhY2UoL1xcLy9nLCAnJyksXG4gICAgICB1cmk6ICAgICAgICAgIHRoaXMuY29uZmlnLmJhc2VVcmwgKyBlbmRwb2ludFxuICAgIH07XG4gIH1cblxuICBfdGVtcGxhdGVzKCkge1xuICAgIGxldCBjZ1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vdGVtcGxhdGVzL2dyb3VwLWNyZWF0ZS5odG1sJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY3JlYXRlR3JvdXA6IGZzLnJlYWRGaWxlU3luYyhjZ1BhdGgsICd1dGYtOCcpXG4gICAgfTtcbiAgfVxuXG4gIF9wdXQoZW5kcG9pbnQsIHhodG1sLCBldGFnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyhlbmRwb2ludCk7XG4gICAgICBpZiAoeGh0bWwpIHtcbiAgICAgICAgXy5leHRlbmQob3B0aW9ucy5oZWFkZXJzLCBldGFnKTtcbiAgICAgICAgb3B0aW9ucy5ib2R5ID0geGh0bWw7XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QucHV0KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgX2RlbChlbmRwb2ludCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMoZW5kcG9pbnQpO1xuXG4gICAgICByZXF1ZXN0LmRlbChvcHRpb25zLCAoZXJyLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9nZXQoZW5kcG9pbnQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gd2lsZCAgICBubyBsb2FkIG5vIHNhdmVcbiAgICAgIC8vIGRyeXJ1biAgbG9hZCBub3Qgc2F2ZVxuICAgICAgLy8gcmVjb3JkICBsb2FkIGFuZCBzYXZlXG4gICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMoZW5kcG9pbnQpO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcuY2FjaGVNb2RlID09PSAnd2lsZCcpIHtcbiAgICAgICAgdGhpcy5sb2cuZGVidWcoYHdpbGQgLS0gJHtvcHRpb25zLnVyaX1gKTtcbiAgICAgICAgcmVxdWVzdC5nZXQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5jYWNoZU1vZGUgPT09ICdkcnlydW4nKSB7XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKGBkcnlydW4gZm9yICR7b3B0aW9ucy51cml9YCk7XG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5jYWNoZS5yZWFkKG9wdGlvbnMudXJpQ2FjaGUpO1xuICAgICAgICBpZiAoYm9keSkge1xuICAgICAgICAgIGxldCByZXNwb25zZSA9IHt9O1xuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgICAgICAgZnVsZmlsbCh0aGlzLl9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcXVlc3QuZ2V0KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdWxmaWxsKHRoaXMuX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcuY2FjaGVNb2RlID09PSAncmVjb3JkJykge1xuICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhgcmVjb3JkIC0tICR7b3B0aW9ucy51cml9YCk7XG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5jYWNoZS5yZWFkKG9wdGlvbnMudXJpQ2FjaGUpO1xuICAgICAgICBpZiAoYm9keSkge1xuICAgICAgICAgIGxldCByZXNwb25zZSA9IHt9O1xuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgICAgICAgZnVsZmlsbCh0aGlzLl9idWlsZFJlc3VsdChyZXNwb25zZSwgYm9keSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcXVlc3QuZ2V0KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FjaGUud3JpdGUob3B0aW9ucy51cmlDYWNoZSwgYm9keSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bGZpbGwodGhpcy5fYnVpbGRSZXN1bHQocmVzcG9uc2UsIGJvZHkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgX2J1aWxkUmVzdWx0KHJlc3BvbnNlLCBib2R5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHhodG1sOiAgICAgIGJvZHksXG4gICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlO1xuIl19