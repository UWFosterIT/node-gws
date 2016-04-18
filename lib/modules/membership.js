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
    value: function get(opt, cb) {
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
  }]);

  return Membership;
}(_service2.default);

exports.default = Membership;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL21lbWJlcnNoaXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTTs7O0FBQ0osV0FESSxVQUNKLENBQVksTUFBWixFQUFvQjswQkFEaEIsWUFDZ0I7O2tFQURoQix1QkFFSSxTQURZO0dBQXBCOztlQURJOzt3QkFLQSxLQUFLLElBQUk7QUFDWCxVQUFJLGFBQWEsUUFBYixDQURPO0FBRVgsVUFBSSxJQUFJLFNBQUosRUFBZTtBQUNqQixxQkFBYSxrQkFBYixDQURpQjtPQUFuQjs7QUFJQSxhQUFPLEtBQUssSUFBTCxZQUFtQixJQUFJLEVBQUosU0FBVSxVQUE3QixFQUNKLElBREksQ0FDQyxVQUFDLE1BQUQsRUFBWTtBQUNoQixZQUFJLElBQUksa0JBQVEsSUFBUixDQUFhLE9BQU8sS0FBUCxDQUFqQixDQURZO0FBRWhCLFlBQUksVUFBVSxFQUFWLENBRlk7O0FBSWhCLFVBQUUsSUFBRixFQUFRLFVBQVIsRUFBb0IsSUFBcEIsQ0FBeUIsVUFBVSxDQUFWLEVBQWEsR0FBYixFQUFrQjtBQUN6QyxjQUFJLFNBQVMsRUFBRSxJQUFGLEVBQVEsUUFBUixHQUFtQixLQUFuQixFQUFULENBRHFDO0FBRXpDLGNBQUksT0FBTztBQUNULG1CQUFPLE9BQU8sSUFBUCxFQUFQO0FBQ0Esa0JBQU8sT0FBTyxJQUFQLENBQVksTUFBWixDQUFQO1dBRkUsQ0FGcUM7O0FBT3pDLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBUHlDO1NBQWxCLENBQXpCLENBSmdCOztBQWNoQixlQUFPLElBQVAsR0FBYyxPQUFkLENBZGdCO0FBZWhCLGVBQU8sTUFBUCxDQWZnQjtPQUFaLENBRFIsQ0FOVzs7OztTQUxUOzs7a0JBZ0NTIiwiZmlsZSI6Im1lbWJlcnNoaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hlZXJpbyBmcm9tICdjaGVlcmlvJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vc2VydmljZSc7XG5cbmNsYXNzIE1lbWJlcnNoaXAgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgfVxuXG4gIGdldChvcHQsIGNiKSB7XG4gICAgbGV0IG1lbWJlcnNoaXAgPSAnbWVtYmVyJztcbiAgICBpZiAob3B0LmVmZmVjdGl2ZSkge1xuICAgICAgbWVtYmVyc2hpcCA9ICdlZmZlY3RpdmVfbWVtYmVyJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZ2V0KGBncm91cC8ke29wdC5pZH0vJHttZW1iZXJzaGlwfWApXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGxldCAkID0gY2hlZXJpby5sb2FkKHJlc3VsdC54aHRtbCk7XG4gICAgICAgIGxldCBtZW1iZXJzID0gW107XG5cbiAgICAgICAgJCgnbGknLCAnLm1lbWJlcnMnKS5lYWNoKGZ1bmN0aW9uIChpLCBmb28pIHtcbiAgICAgICAgICB2YXIgYW5jaG9yID0gJCh0aGlzKS5jaGlsZHJlbigpLmZpcnN0KCk7XG4gICAgICAgICAgbGV0IGl0ZW0gPSB7XG4gICAgICAgICAgICBuZXRpZDogYW5jaG9yLnRleHQoKSxcbiAgICAgICAgICAgIHR5cGU6ICBhbmNob3IuYXR0cigndHlwZScpXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG1lbWJlcnMucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzdWx0LmRhdGEgPSBtZW1iZXJzO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVtYmVyc2hpcDtcbiJdfQ==