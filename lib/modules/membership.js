'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-underscore-dangle*/


var Membership = function (_Service) {
  _inherits(Membership, _Service);

  function Membership(config) {
    _classCallCheck(this, Membership);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Membership).call(this, config));
  }

  _createClass(Membership, [{
    key: 'get',
    value: function get(opt) {
      var membership = 'member';
      if (opt.effective) {
        membership = 'effective_member';
      }

      return this._get('group/' + opt.id + '/' + membership).then(function (result) {
        var $ = _cheerio2.default.load(result.xhtml);
        var members = [];

        $('li', '.members').each(function (i, foo) {
          var anchor = $(this).children().first();
          var item = {
            netid: anchor.text(),
            type: anchor.attr('type')
          };

          members.push(item);
        });

        result.data = members;
        return result;
      });
    }
  }, {
    key: 'add',
    value: function add(opt) {
      return this._put('group/' + opt.id + '/member/' + opt.netid).then(function (result) {
        return result;
      });
    }
  }, {
    key: 'del',
    value: function del(opt) {
      if (!opt.netid) {
        /* eslint-disable key-spacing */
        return {
          xhtml: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' + '<html xmlns="http://www.w3.org/1999/xhtml">' + '<head><title>Bad Request</title></head>' + '<body>Member delete must include a list of id(s).</body></html>',
          statusCode: 400
        };
        /* eslint-enable key-spacing */
      }
      return this._del('group/' + opt.id + '/member/' + opt.netid).then(function (result) {
        return result;
      });
    }
  }]);

  return Membership;
}(_service2.default);

exports.default = Membership;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL21lbWJlcnNoaXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUZBOzs7SUFJTSxVOzs7QUFDSixzQkFBWSxNQUFaLEVBQW9CO0FBQUE7O0FBQUEseUZBQ1osTUFEWTtBQUVuQjs7Ozt3QkFFRyxHLEVBQUs7QUFDUCxVQUFJLGFBQWEsUUFBakI7QUFDQSxVQUFJLElBQUksU0FBUixFQUFtQjtBQUNqQixxQkFBYSxrQkFBYjtBQUNEOztBQUVELGFBQU8sS0FBSyxJQUFMLFlBQW1CLElBQUksRUFBdkIsU0FBNkIsVUFBN0IsRUFDSixJQURJLENBQ0MsVUFBQyxNQUFELEVBQVk7QUFDaEIsWUFBSSxJQUFJLGtCQUFRLElBQVIsQ0FBYSxPQUFPLEtBQXBCLENBQVI7QUFDQSxZQUFJLFVBQVUsRUFBZDs7QUFFQSxVQUFFLElBQUYsRUFBUSxVQUFSLEVBQW9CLElBQXBCLENBQXlCLFVBQVUsQ0FBVixFQUFhLEdBQWIsRUFBa0I7QUFDekMsY0FBSSxTQUFTLEVBQUUsSUFBRixFQUFRLFFBQVIsR0FBbUIsS0FBbkIsRUFBYjtBQUNBLGNBQUksT0FBTztBQUNULG1CQUFPLE9BQU8sSUFBUCxFQURFO0FBRVQsa0JBQU8sT0FBTyxJQUFQLENBQVksTUFBWjtBQUZFLFdBQVg7O0FBS0Esa0JBQVEsSUFBUixDQUFhLElBQWI7QUFDRCxTQVJEOztBQVVBLGVBQU8sSUFBUCxHQUFjLE9BQWQ7QUFDQSxlQUFPLE1BQVA7QUFDRCxPQWpCSSxDQUFQO0FBa0JEOzs7d0JBRUcsRyxFQUFLO0FBQ1AsYUFBTyxLQUFLLElBQUwsWUFBbUIsSUFBSSxFQUF2QixnQkFBb0MsSUFBSSxLQUF4QyxFQUNKLElBREksQ0FDQyxVQUFDLE1BQUQsRUFBWTtBQUNoQixlQUFPLE1BQVA7QUFDRCxPQUhJLENBQVA7QUFJRDs7O3dCQUVHLEcsRUFBSztBQUNQLFVBQUksQ0FBQyxJQUFJLEtBQVQsRUFBZ0I7QUFDZDtBQUNBLGVBQU87QUFDTCxpQkFBWSw4SEFDQSw2Q0FEQSxHQUVBLHlDQUZBLEdBR0EsaUVBSlA7QUFLTCxzQkFBWTtBQUxQLFNBQVA7QUFPQTtBQUNEO0FBQ0QsYUFBTyxLQUFLLElBQUwsWUFBbUIsSUFBSSxFQUF2QixnQkFBb0MsSUFBSSxLQUF4QyxFQUNKLElBREksQ0FDQyxVQUFDLE1BQUQsRUFBWTtBQUNoQixlQUFPLE1BQVA7QUFDRCxPQUhJLENBQVA7QUFJRDs7Ozs7O2tCQUdZLFUiLCJmaWxlIjoibWVtYmVyc2hpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlKi9cbmltcG9ydCBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcblxuY2xhc3MgTWVtYmVyc2hpcCBleHRlbmRzIFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcihjb25maWcpO1xuICB9XG5cbiAgZ2V0KG9wdCkge1xuICAgIGxldCBtZW1iZXJzaGlwID0gJ21lbWJlcic7XG4gICAgaWYgKG9wdC5lZmZlY3RpdmUpIHtcbiAgICAgIG1lbWJlcnNoaXAgPSAnZWZmZWN0aXZlX21lbWJlcic7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2dldChgZ3JvdXAvJHtvcHQuaWR9LyR7bWVtYmVyc2hpcH1gKVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBsZXQgJCA9IGNoZWVyaW8ubG9hZChyZXN1bHQueGh0bWwpO1xuICAgICAgICBsZXQgbWVtYmVycyA9IFtdO1xuXG4gICAgICAgICQoJ2xpJywgJy5tZW1iZXJzJykuZWFjaChmdW5jdGlvbiAoaSwgZm9vKSB7XG4gICAgICAgICAgdmFyIGFuY2hvciA9ICQodGhpcykuY2hpbGRyZW4oKS5maXJzdCgpO1xuICAgICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgbmV0aWQ6IGFuY2hvci50ZXh0KCksXG4gICAgICAgICAgICB0eXBlOiAgYW5jaG9yLmF0dHIoJ3R5cGUnKVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBtZW1iZXJzLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc3VsdC5kYXRhID0gbWVtYmVycztcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgYWRkKG9wdCkge1xuICAgIHJldHVybiB0aGlzLl9wdXQoYGdyb3VwLyR7b3B0LmlkfS9tZW1iZXIvJHtvcHQubmV0aWR9YClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgZGVsKG9wdCkge1xuICAgIGlmICghb3B0Lm5ldGlkKSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBrZXktc3BhY2luZyAqL1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeGh0bWw6ICAgICAgJzwhRE9DVFlQRSBodG1sIFBVQkxJQyBcIi0vL1czQy8vRFREIFhIVE1MIDEuMCBUcmFuc2l0aW9uYWwvL0VOXCIgXCJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS10cmFuc2l0aW9uYWwuZHRkXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8aHRtbCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxoZWFkPjx0aXRsZT5CYWQgUmVxdWVzdDwvdGl0bGU+PC9oZWFkPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGJvZHk+TWVtYmVyIGRlbGV0ZSBtdXN0IGluY2x1ZGUgYSBsaXN0IG9mIGlkKHMpLjwvYm9keT48L2h0bWw+JyxcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwXG4gICAgICB9O1xuICAgICAgLyogZXNsaW50LWVuYWJsZSBrZXktc3BhY2luZyAqL1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVsKGBncm91cC8ke29wdC5pZH0vbWVtYmVyLyR7b3B0Lm5ldGlkfWApXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZW1iZXJzaGlwO1xuIl19