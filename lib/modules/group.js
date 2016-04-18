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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2dyb3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU07OztBQUNKLFdBREksVUFDSixDQUFZLE1BQVosRUFBb0I7MEJBRGhCLFlBQ2dCOztrRUFEaEIsdUJBRUksU0FEWTtHQUFwQjs7ZUFESTs7MkJBS0csS0FBSzs7QUFFVixVQUFJLE9BQU8sRUFBRSxZQUFZLEdBQVosRUFBaUIsUUFBUSxFQUFSLEVBQTFCLENBRk07QUFHVixVQUFJLFFBQVEsS0FBSyxNQUFNLEtBQUssU0FBTCxDQUFlLFdBQWYsR0FBNkIsR0FBbkMsQ0FBYixDQUhNO0FBSVYsYUFBTyxLQUFLLElBQUwsWUFBbUIsSUFBSSxFQUFKLEVBQVUsS0FBN0IsRUFBb0MsSUFBcEMsQ0FBUCxDQUpVOzs7O1NBTFI7OztrQkFhUyIsImZpbGUiOiJncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxcyAgICAgIGZyb20gJ3F1ZXJ5LXN0cmluZyc7XG5pbXBvcnQgU2VydmljZSBmcm9tICcuL3NlcnZpY2UnO1xuXG5jbGFzcyBNZW1iZXJzaGlwIGV4dGVuZHMgU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZyk7XG4gIH1cblxuICBjcmVhdGUob3B0KSB7XG4gICAgLy8gZXZhbCBpc250IGJhZCwgcmVhZGluZyBpbiBhbiB4aHRtbCB0ZW1wbGF0ZSBhcyBhIHN0cmluZyBsaXRlcmFsIHdpdGggb3B0XG4gICAgbGV0IGV0YWcgPSB7ICdpZi1tYXRjaCc6ICcqJywgJ0VUYWcnOiAnJ307XG4gICAgbGV0IHhodG1sID0gZXZhbCgnYCcgKyB0aGlzLnRlbXBsYXRlcy5jcmVhdGVHcm91cCArICdgJyk7XG4gICAgcmV0dXJuIHRoaXMuX3B1dChgZ3JvdXAvJHtvcHQuaWR9YCwgeGh0bWwsIGV0YWcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lbWJlcnNoaXA7XG4iXX0=