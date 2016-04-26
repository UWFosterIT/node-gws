'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

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
    key: 'create',
    value: function create(opt) {
      // eval isnt bad, reading in an xhtml template as a string literal with opt
      var etag = { 'if-match': '*', 'ETag': '' };
      var xhtml = eval('`' + this.templates.createGroup + '`');
      return this._put('group/' + opt.id, xhtml, etag);
    }
  }]);

  return Membership;
}(_service2.default);

exports.default = Membership;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2dyb3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sVTtZQUFBLFU7O0FBQ0osV0FESSxVQUNKLENBQVksTUFBWixFQUFvQjtBQUFBLDBCQURoQixVQUNnQjs7QUFBQSxrRUFEaEIsVUFDZ0IsYUFDWixNQURZO0FBRW5COztlQUhHLFU7OzJCQUtHLEcsRUFBSzs7QUFFVixVQUFJLE9BQU8sRUFBRSxZQUFZLEdBQWQsRUFBbUIsUUFBUSxFQUEzQixFQUFYO0FBQ0EsVUFBSSxRQUFRLEtBQUssTUFBTSxLQUFLLFNBQUwsQ0FBZSxXQUFyQixHQUFtQyxHQUF4QyxDQUFaO0FBQ0EsYUFBTyxLQUFLLElBQUwsWUFBbUIsSUFBSSxFQUF2QixFQUE2QixLQUE3QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0Q7OztTQVZHLFU7OztrQkFhUyxVIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHFzICAgICAgZnJvbSAncXVlcnktc3RyaW5nJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vc2VydmljZSc7XG5cbmNsYXNzIE1lbWJlcnNoaXAgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgfVxuXG4gIGNyZWF0ZShvcHQpIHtcbiAgICAvLyBldmFsIGlzbnQgYmFkLCByZWFkaW5nIGluIGFuIHhodG1sIHRlbXBsYXRlIGFzIGEgc3RyaW5nIGxpdGVyYWwgd2l0aCBvcHRcbiAgICBsZXQgZXRhZyA9IHsgJ2lmLW1hdGNoJzogJyonLCAnRVRhZyc6ICcnfTtcbiAgICBsZXQgeGh0bWwgPSBldmFsKCdgJyArIHRoaXMudGVtcGxhdGVzLmNyZWF0ZUdyb3VwICsgJ2AnKTtcbiAgICByZXR1cm4gdGhpcy5fcHV0KGBncm91cC8ke29wdC5pZH1gLCB4aHRtbCwgZXRhZyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVtYmVyc2hpcDtcbiJdfQ==