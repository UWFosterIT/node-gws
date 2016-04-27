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
    key: '_entities',
    value: function _entities(selector, query) {
      var list = [];
      query('li', selector).each(function (i, foo) {
        var item = {
          id: query(this).text(),
          type: query(this).attr('type')
        };
        list.push(item);
      });

      return list;
    }
  }, {
    key: 'get',
    value: function get(opt) {
      var _this2 = this;

      return this._get('group/' + opt.id).then(function (result) {
        var $ = _cheerio2.default.load(result.xhtml);
        var group = {
          authnFactor: $('.authnfactor').text(),
          classification: $('.classification').text(),
          contact: $('.contact').text(),
          courseQtr: $('.course_qtr').text(),
          courseYear: $('.course_year').text(),
          courseCurr: $('.course_curr').text(),
          courseNo: $('.course_no').text(),
          courseSect: $('.course_sect').text(),
          courseSLN: $('.course_sln').text(),
          createTime: $('.createtime').text(),
          dependsOn: $('.dependson').text(),
          description: $('.description').text(),
          emailEnabled: $('.emailenabled').text(),
          gid: $('.gid').text(),
          modifyTime: $('.modifytime').text(),
          memberModifyTime: $('.membermodifytime').text(),
          publishEmail: $('.publishemail').text(),
          regid: $('.regid').text(),
          reportToOrig: $('.reporttoorig').text(),
          title: $('.title').text()
        };

        group.names = _this2._entities('.names', $);
        group.admins = _this2._entities('.admins', $);
        group.updaters = _this2._entities('.updaters', $);
        group.creators = _this2._entities('.creators', $);
        group.readers = _this2._entities('.readers', $);
        group.senders = _this2._entities('.authorigs', $);
        group.viewers = _this2._entities('.viewers', $);
        group.optIns = _this2._entities('.optins', $);
        group.optOuts = _this2._entities('.optouts', $);
        group.courseInstructors = _this2._entities('.course_instructors', $);

        result.data = group;
        return result;
      });
    }
  }, {
    key: 'create',
    value: function create(opt) {
      var etag = {
        'if-match': '*',
        'ETag': ''
      };

      // eval isnt bad, reading in an xhtml template as a string literal with opt
      // see the respective template for how the options are used
      var xhtml = eval('`' + this.templates.createGroup + '`');
      return this._put('group/' + opt.id, xhtml, etag);
    }
  }, {
    key: 'del',
    value: function del(opt) {
      return this._del('group/' + opt.id);
    }
  }]);

  return Membership;
}(_service2.default);

exports.default = Membership;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2dyb3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sVTs7O0FBQ0osc0JBQVksTUFBWixFQUFvQjtBQUFBOztBQUFBLHlGQUNaLE1BRFk7QUFFbkI7Ozs7OEJBRVMsUSxFQUFVLEssRUFBTztBQUN6QixVQUFJLE9BQU8sRUFBWDtBQUNBLFlBQU0sSUFBTixFQUFZLFFBQVosRUFBc0IsSUFBdEIsQ0FBMkIsVUFBVSxDQUFWLEVBQWEsR0FBYixFQUFrQjtBQUMzQyxZQUFJLE9BQU87QUFDVCxjQUFNLE1BQU0sSUFBTixFQUFZLElBQVosRUFERztBQUVULGdCQUFNLE1BQU0sSUFBTixFQUFZLElBQVosQ0FBaUIsTUFBakI7QUFGRyxTQUFYO0FBSUEsYUFBSyxJQUFMLENBQVUsSUFBVjtBQUNELE9BTkQ7O0FBUUEsYUFBTyxJQUFQO0FBQ0Q7Ozt3QkFFRyxHLEVBQUs7QUFBQTs7QUFDUCxhQUFPLEtBQUssSUFBTCxZQUFtQixJQUFJLEVBQXZCLEVBQ0osSUFESSxDQUNDLFVBQUMsTUFBRCxFQUFZO0FBQ2hCLFlBQUksSUFBSSxrQkFBUSxJQUFSLENBQWEsT0FBTyxLQUFwQixDQUFSO0FBQ0EsWUFBSSxRQUFRO0FBQ1YsdUJBQWtCLEVBQUUsY0FBRixFQUFrQixJQUFsQixFQURSO0FBRVYsMEJBQWtCLEVBQUUsaUJBQUYsRUFBcUIsSUFBckIsRUFGUjtBQUdWLG1CQUFrQixFQUFFLFVBQUYsRUFBYyxJQUFkLEVBSFI7QUFJVixxQkFBa0IsRUFBRSxhQUFGLEVBQWlCLElBQWpCLEVBSlI7QUFLVixzQkFBa0IsRUFBRSxjQUFGLEVBQWtCLElBQWxCLEVBTFI7QUFNVixzQkFBa0IsRUFBRSxjQUFGLEVBQWtCLElBQWxCLEVBTlI7QUFPVixvQkFBa0IsRUFBRSxZQUFGLEVBQWdCLElBQWhCLEVBUFI7QUFRVixzQkFBa0IsRUFBRSxjQUFGLEVBQWtCLElBQWxCLEVBUlI7QUFTVixxQkFBa0IsRUFBRSxhQUFGLEVBQWlCLElBQWpCLEVBVFI7QUFVVixzQkFBa0IsRUFBRSxhQUFGLEVBQWlCLElBQWpCLEVBVlI7QUFXVixxQkFBa0IsRUFBRSxZQUFGLEVBQWdCLElBQWhCLEVBWFI7QUFZVix1QkFBa0IsRUFBRSxjQUFGLEVBQWtCLElBQWxCLEVBWlI7QUFhVix3QkFBa0IsRUFBRSxlQUFGLEVBQW1CLElBQW5CLEVBYlI7QUFjVixlQUFrQixFQUFFLE1BQUYsRUFBVSxJQUFWLEVBZFI7QUFlVixzQkFBa0IsRUFBRSxhQUFGLEVBQWlCLElBQWpCLEVBZlI7QUFnQlYsNEJBQWtCLEVBQUUsbUJBQUYsRUFBdUIsSUFBdkIsRUFoQlI7QUFpQlYsd0JBQWtCLEVBQUUsZUFBRixFQUFtQixJQUFuQixFQWpCUjtBQWtCVixpQkFBa0IsRUFBRSxRQUFGLEVBQVksSUFBWixFQWxCUjtBQW1CVix3QkFBa0IsRUFBRSxlQUFGLEVBQW1CLElBQW5CLEVBbkJSO0FBb0JWLGlCQUFrQixFQUFFLFFBQUYsRUFBWSxJQUFaO0FBcEJSLFNBQVo7O0FBdUJBLGNBQU0sS0FBTixHQUEwQixPQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXlCLENBQXpCLENBQTFCO0FBQ0EsY0FBTSxNQUFOLEdBQTBCLE9BQUssU0FBTCxDQUFlLFNBQWYsRUFBMEIsQ0FBMUIsQ0FBMUI7QUFDQSxjQUFNLFFBQU4sR0FBMEIsT0FBSyxTQUFMLENBQWUsV0FBZixFQUE0QixDQUE1QixDQUExQjtBQUNBLGNBQU0sUUFBTixHQUEwQixPQUFLLFNBQUwsQ0FBZSxXQUFmLEVBQTRCLENBQTVCLENBQTFCO0FBQ0EsY0FBTSxPQUFOLEdBQTBCLE9BQUssU0FBTCxDQUFlLFVBQWYsRUFBMkIsQ0FBM0IsQ0FBMUI7QUFDQSxjQUFNLE9BQU4sR0FBMEIsT0FBSyxTQUFMLENBQWUsWUFBZixFQUE2QixDQUE3QixDQUExQjtBQUNBLGNBQU0sT0FBTixHQUEwQixPQUFLLFNBQUwsQ0FBZSxVQUFmLEVBQTJCLENBQTNCLENBQTFCO0FBQ0EsY0FBTSxNQUFOLEdBQTBCLE9BQUssU0FBTCxDQUFlLFNBQWYsRUFBMEIsQ0FBMUIsQ0FBMUI7QUFDQSxjQUFNLE9BQU4sR0FBMEIsT0FBSyxTQUFMLENBQWUsVUFBZixFQUEyQixDQUEzQixDQUExQjtBQUNBLGNBQU0saUJBQU4sR0FBMEIsT0FBSyxTQUFMLENBQWUscUJBQWYsRUFBc0MsQ0FBdEMsQ0FBMUI7O0FBRUEsZUFBTyxJQUFQLEdBQWMsS0FBZDtBQUNBLGVBQU8sTUFBUDtBQUNELE9BdkNJLENBQVA7QUF3Q0Q7OzsyQkFFTSxHLEVBQUs7QUFDVixVQUFJLE9BQU87QUFDVCxvQkFBWSxHQURIO0FBRVQsZ0JBQVk7QUFGSCxPQUFYOzs7O0FBT0EsVUFBSSxRQUFRLEtBQUssTUFBTSxLQUFLLFNBQUwsQ0FBZSxXQUFyQixHQUFtQyxHQUF4QyxDQUFaO0FBQ0EsYUFBTyxLQUFLLElBQUwsWUFBbUIsSUFBSSxFQUF2QixFQUE2QixLQUE3QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0Q7Ozt3QkFFRyxHLEVBQUs7QUFDUCxhQUFPLEtBQUssSUFBTCxZQUFtQixJQUFJLEVBQXZCLENBQVA7QUFDRDs7Ozs7O2tCQUdZLFUiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hlZXJpbyBmcm9tICdjaGVlcmlvJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vc2VydmljZSc7XG5cbmNsYXNzIE1lbWJlcnNoaXAgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgfVxuXG4gIF9lbnRpdGllcyhzZWxlY3RvciwgcXVlcnkpIHtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIHF1ZXJ5KCdsaScsIHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChpLCBmb28pIHtcbiAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICBpZDogICBxdWVyeSh0aGlzKS50ZXh0KCksXG4gICAgICAgIHR5cGU6IHF1ZXJ5KHRoaXMpLmF0dHIoJ3R5cGUnKVxuICAgICAgfTtcbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgZ2V0KG9wdCkge1xuICAgIHJldHVybiB0aGlzLl9nZXQoYGdyb3VwLyR7b3B0LmlkfWApXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGxldCAkID0gY2hlZXJpby5sb2FkKHJlc3VsdC54aHRtbCk7XG4gICAgICAgIGxldCBncm91cCA9IHtcbiAgICAgICAgICBhdXRobkZhY3RvcjogICAgICAkKCcuYXV0aG5mYWN0b3InKS50ZXh0KCksXG4gICAgICAgICAgY2xhc3NpZmljYXRpb246ICAgJCgnLmNsYXNzaWZpY2F0aW9uJykudGV4dCgpLFxuICAgICAgICAgIGNvbnRhY3Q6ICAgICAgICAgICQoJy5jb250YWN0JykudGV4dCgpLFxuICAgICAgICAgIGNvdXJzZVF0cjogICAgICAgICQoJy5jb3Vyc2VfcXRyJykudGV4dCgpLFxuICAgICAgICAgIGNvdXJzZVllYXI6ICAgICAgICQoJy5jb3Vyc2VfeWVhcicpLnRleHQoKSxcbiAgICAgICAgICBjb3Vyc2VDdXJyOiAgICAgICAkKCcuY291cnNlX2N1cnInKS50ZXh0KCksXG4gICAgICAgICAgY291cnNlTm86ICAgICAgICAgJCgnLmNvdXJzZV9ubycpLnRleHQoKSxcbiAgICAgICAgICBjb3Vyc2VTZWN0OiAgICAgICAkKCcuY291cnNlX3NlY3QnKS50ZXh0KCksXG4gICAgICAgICAgY291cnNlU0xOOiAgICAgICAgJCgnLmNvdXJzZV9zbG4nKS50ZXh0KCksXG4gICAgICAgICAgY3JlYXRlVGltZTogICAgICAgJCgnLmNyZWF0ZXRpbWUnKS50ZXh0KCksXG4gICAgICAgICAgZGVwZW5kc09uOiAgICAgICAgJCgnLmRlcGVuZHNvbicpLnRleHQoKSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogICAgICAkKCcuZGVzY3JpcHRpb24nKS50ZXh0KCksXG4gICAgICAgICAgZW1haWxFbmFibGVkOiAgICAgJCgnLmVtYWlsZW5hYmxlZCcpLnRleHQoKSxcbiAgICAgICAgICBnaWQ6ICAgICAgICAgICAgICAkKCcuZ2lkJykudGV4dCgpLFxuICAgICAgICAgIG1vZGlmeVRpbWU6ICAgICAgICQoJy5tb2RpZnl0aW1lJykudGV4dCgpLFxuICAgICAgICAgIG1lbWJlck1vZGlmeVRpbWU6ICQoJy5tZW1iZXJtb2RpZnl0aW1lJykudGV4dCgpLFxuICAgICAgICAgIHB1Ymxpc2hFbWFpbDogICAgICQoJy5wdWJsaXNoZW1haWwnKS50ZXh0KCksXG4gICAgICAgICAgcmVnaWQ6ICAgICAgICAgICAgJCgnLnJlZ2lkJykudGV4dCgpLFxuICAgICAgICAgIHJlcG9ydFRvT3JpZzogICAgICQoJy5yZXBvcnR0b29yaWcnKS50ZXh0KCksXG4gICAgICAgICAgdGl0bGU6ICAgICAgICAgICAgJCgnLnRpdGxlJykudGV4dCgpXG4gICAgICAgIH07XG5cbiAgICAgICAgZ3JvdXAubmFtZXMgICAgICAgICAgICAgPSB0aGlzLl9lbnRpdGllcygnLm5hbWVzJywgJCk7XG4gICAgICAgIGdyb3VwLmFkbWlucyAgICAgICAgICAgID0gdGhpcy5fZW50aXRpZXMoJy5hZG1pbnMnLCAkKTtcbiAgICAgICAgZ3JvdXAudXBkYXRlcnMgICAgICAgICAgPSB0aGlzLl9lbnRpdGllcygnLnVwZGF0ZXJzJywgJCk7XG4gICAgICAgIGdyb3VwLmNyZWF0b3JzICAgICAgICAgID0gdGhpcy5fZW50aXRpZXMoJy5jcmVhdG9ycycsICQpO1xuICAgICAgICBncm91cC5yZWFkZXJzICAgICAgICAgICA9IHRoaXMuX2VudGl0aWVzKCcucmVhZGVycycsICQpO1xuICAgICAgICBncm91cC5zZW5kZXJzICAgICAgICAgICA9IHRoaXMuX2VudGl0aWVzKCcuYXV0aG9yaWdzJywgJCk7XG4gICAgICAgIGdyb3VwLnZpZXdlcnMgICAgICAgICAgID0gdGhpcy5fZW50aXRpZXMoJy52aWV3ZXJzJywgJCk7XG4gICAgICAgIGdyb3VwLm9wdElucyAgICAgICAgICAgID0gdGhpcy5fZW50aXRpZXMoJy5vcHRpbnMnLCAkKTtcbiAgICAgICAgZ3JvdXAub3B0T3V0cyAgICAgICAgICAgPSB0aGlzLl9lbnRpdGllcygnLm9wdG91dHMnLCAkKTtcbiAgICAgICAgZ3JvdXAuY291cnNlSW5zdHJ1Y3RvcnMgPSB0aGlzLl9lbnRpdGllcygnLmNvdXJzZV9pbnN0cnVjdG9ycycsICQpO1xuXG4gICAgICAgIHJlc3VsdC5kYXRhID0gZ3JvdXA7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZShvcHQpIHtcbiAgICBsZXQgZXRhZyA9IHtcbiAgICAgICdpZi1tYXRjaCc6ICcqJyxcbiAgICAgICdFVGFnJzogICAgICcnXG4gICAgfTtcblxuICAgIC8vIGV2YWwgaXNudCBiYWQsIHJlYWRpbmcgaW4gYW4geGh0bWwgdGVtcGxhdGUgYXMgYSBzdHJpbmcgbGl0ZXJhbCB3aXRoIG9wdFxuICAgIC8vIHNlZSB0aGUgcmVzcGVjdGl2ZSB0ZW1wbGF0ZSBmb3IgaG93IHRoZSBvcHRpb25zIGFyZSB1c2VkXG4gICAgbGV0IHhodG1sID0gZXZhbCgnYCcgKyB0aGlzLnRlbXBsYXRlcy5jcmVhdGVHcm91cCArICdgJyk7XG4gICAgcmV0dXJuIHRoaXMuX3B1dChgZ3JvdXAvJHtvcHQuaWR9YCwgeGh0bWwsIGV0YWcpO1xuICB9XG5cbiAgZGVsKG9wdCkge1xuICAgIHJldHVybiB0aGlzLl9kZWwoYGdyb3VwLyR7b3B0LmlkfWApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lbWJlcnNoaXA7XG4iXX0=