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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      return this._del('group/' + opt.id + '/member/' + opt.netid).then(function (result) {
        return result;
      });
    }
  }]);

  return Membership;
}(_service2.default);

exports.default = Membership;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL21lbWJlcnNoaXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxVO1lBQUEsVTs7QUFDSixXQURJLFVBQ0osQ0FBWSxNQUFaLEVBQW9CO0FBQUEsMEJBRGhCLFVBQ2dCOztBQUFBLGtFQURoQixVQUNnQixhQUNaLE1BRFk7QUFFbkI7O2VBSEcsVTs7d0JBS0EsRyxFQUFLO0FBQ1AsVUFBSSxhQUFhLFFBQWpCO0FBQ0EsVUFBSSxJQUFJLFNBQVIsRUFBbUI7QUFDakIscUJBQWEsa0JBQWI7QUFDRDs7QUFFRCxhQUFPLEtBQUssSUFBTCxZQUFtQixJQUFJLEVBQXZCLFNBQTZCLFVBQTdCLEVBQ0osSUFESSxDQUNDLFVBQUMsTUFBRCxFQUFZO0FBQ2hCLFlBQUksSUFBSSxrQkFBUSxJQUFSLENBQWEsT0FBTyxLQUFwQixDQUFSO0FBQ0EsWUFBSSxVQUFVLEVBQWQ7O0FBRUEsVUFBRSxJQUFGLEVBQVEsVUFBUixFQUFvQixJQUFwQixDQUF5QixVQUFVLENBQVYsRUFBYSxHQUFiLEVBQWtCO0FBQ3pDLGNBQUksU0FBUyxFQUFFLElBQUYsRUFBUSxRQUFSLEdBQW1CLEtBQW5CLEVBQWI7QUFDQSxjQUFJLE9BQU87QUFDVCxtQkFBTyxPQUFPLElBQVAsRUFERTtBQUVULGtCQUFPLE9BQU8sSUFBUCxDQUFZLE1BQVo7QUFGRSxXQUFYOztBQUtBLGtCQUFRLElBQVIsQ0FBYSxJQUFiO0FBQ0QsU0FSRDs7QUFVQSxlQUFPLElBQVAsR0FBYyxPQUFkO0FBQ0EsZUFBTyxNQUFQO0FBQ0QsT0FqQkksQ0FBUDtBQWtCRDs7O3dCQUVHLEcsRUFBSztBQUNQLGFBQU8sS0FBSyxJQUFMLFlBQW1CLElBQUksRUFBdkIsZ0JBQW9DLElBQUksS0FBeEMsRUFDSixJQURJLENBQ0MsVUFBQyxNQUFELEVBQVk7QUFDaEIsZUFBTyxNQUFQO0FBQ0QsT0FISSxDQUFQO0FBSUQ7Ozt3QkFFRyxHLEVBQUs7QUFDUCxhQUFPLEtBQUssSUFBTCxZQUFtQixJQUFJLEVBQXZCLGdCQUFvQyxJQUFJLEtBQXhDLEVBQ0osSUFESSxDQUNDLFVBQUMsTUFBRCxFQUFZO0FBQ2hCLGVBQU8sTUFBUDtBQUNELE9BSEksQ0FBUDtBQUlEOzs7U0EzQ0csVTs7O2tCQThDUyxVIiwiZmlsZSI6Im1lbWJlcnNoaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hlZXJpbyBmcm9tICdjaGVlcmlvJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vc2VydmljZSc7XG5cbmNsYXNzIE1lbWJlcnNoaXAgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgfVxuXG4gIGdldChvcHQpIHtcbiAgICBsZXQgbWVtYmVyc2hpcCA9ICdtZW1iZXInO1xuICAgIGlmIChvcHQuZWZmZWN0aXZlKSB7XG4gICAgICBtZW1iZXJzaGlwID0gJ2VmZmVjdGl2ZV9tZW1iZXInO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9nZXQoYGdyb3VwLyR7b3B0LmlkfS8ke21lbWJlcnNoaXB9YClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgbGV0ICQgPSBjaGVlcmlvLmxvYWQocmVzdWx0LnhodG1sKTtcbiAgICAgICAgbGV0IG1lbWJlcnMgPSBbXTtcblxuICAgICAgICAkKCdsaScsICcubWVtYmVycycpLmVhY2goZnVuY3Rpb24gKGksIGZvbykge1xuICAgICAgICAgIHZhciBhbmNob3IgPSAkKHRoaXMpLmNoaWxkcmVuKCkuZmlyc3QoKTtcbiAgICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgIG5ldGlkOiBhbmNob3IudGV4dCgpLFxuICAgICAgICAgICAgdHlwZTogIGFuY2hvci5hdHRyKCd0eXBlJylcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgbWVtYmVycy5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXN1bHQuZGF0YSA9IG1lbWJlcnM7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIGFkZChvcHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcHV0KGBncm91cC8ke29wdC5pZH0vbWVtYmVyLyR7b3B0Lm5ldGlkfWApXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIGRlbChvcHQpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsKGBncm91cC8ke29wdC5pZH0vbWVtYmVyLyR7b3B0Lm5ldGlkfWApXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZW1iZXJzaGlwO1xuIl19