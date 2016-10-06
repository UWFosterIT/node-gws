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

      // eval isn't bad, reading in an xhtml template as a string literal with opt
      // see the respective template for how the options are used
      var xhtml = eval('`' + this.templates.createGroup + '`');
      return this._put('group/' + opt.id, xhtml, etag);
    }
  }, {
    key: 'del',
    value: function del(opt) {
      return this._del('group/' + opt.id);
    }
  }, {
    key: 'exchangeEnable',
    value: function exchangeEnable(opt) {
      return this._put('group/' + opt.id + '/affiliate/email?status=active&sender=' + opt.sender);
    }
  }]);

  return Membership;
}(_service2.default);

exports.default = Membership;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2dyb3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGQTs7O0lBSU0sVTs7O0FBQ0osc0JBQVksTUFBWixFQUFvQjtBQUFBOztBQUFBLHlGQUNaLE1BRFk7QUFFbkI7Ozs7OEJBRVMsUSxFQUFVLEssRUFBTztBQUN6QixVQUFJLE9BQU8sRUFBWDtBQUNBLFlBQU0sSUFBTixFQUFZLFFBQVosRUFBc0IsSUFBdEIsQ0FBMkIsVUFBVSxDQUFWLEVBQWEsR0FBYixFQUFrQjtBQUMzQyxZQUFJLE9BQU87QUFDVCxjQUFNLE1BQU0sSUFBTixFQUFZLElBQVosRUFERztBQUVULGdCQUFNLE1BQU0sSUFBTixFQUFZLElBQVosQ0FBaUIsTUFBakI7QUFGRyxTQUFYO0FBSUEsYUFBSyxJQUFMLENBQVUsSUFBVjtBQUNELE9BTkQ7O0FBUUEsYUFBTyxJQUFQO0FBQ0Q7Ozt3QkFFRyxHLEVBQUs7QUFBQTs7QUFDUCxhQUFPLEtBQUssSUFBTCxZQUFtQixJQUFJLEVBQXZCLEVBQ0osSUFESSxDQUNDLFVBQUMsTUFBRCxFQUFZO0FBQ2hCLFlBQUksSUFBSSxrQkFBUSxJQUFSLENBQWEsT0FBTyxLQUFwQixDQUFSO0FBQ0EsWUFBSSxRQUFRO0FBQ1YsdUJBQWtCLEVBQUUsY0FBRixFQUFrQixJQUFsQixFQURSO0FBRVYsMEJBQWtCLEVBQUUsaUJBQUYsRUFBcUIsSUFBckIsRUFGUjtBQUdWLG1CQUFrQixFQUFFLFVBQUYsRUFBYyxJQUFkLEVBSFI7QUFJVixxQkFBa0IsRUFBRSxhQUFGLEVBQWlCLElBQWpCLEVBSlI7QUFLVixzQkFBa0IsRUFBRSxjQUFGLEVBQWtCLElBQWxCLEVBTFI7QUFNVixzQkFBa0IsRUFBRSxjQUFGLEVBQWtCLElBQWxCLEVBTlI7QUFPVixvQkFBa0IsRUFBRSxZQUFGLEVBQWdCLElBQWhCLEVBUFI7QUFRVixzQkFBa0IsRUFBRSxjQUFGLEVBQWtCLElBQWxCLEVBUlI7QUFTVixxQkFBa0IsRUFBRSxhQUFGLEVBQWlCLElBQWpCLEVBVFI7QUFVVixzQkFBa0IsRUFBRSxhQUFGLEVBQWlCLElBQWpCLEVBVlI7QUFXVixxQkFBa0IsRUFBRSxZQUFGLEVBQWdCLElBQWhCLEVBWFI7QUFZVix1QkFBa0IsRUFBRSxjQUFGLEVBQWtCLElBQWxCLEVBWlI7QUFhVix3QkFBa0IsRUFBRSxlQUFGLEVBQW1CLElBQW5CLEVBYlI7QUFjVixlQUFrQixFQUFFLE1BQUYsRUFBVSxJQUFWLEVBZFI7QUFlVixzQkFBa0IsRUFBRSxhQUFGLEVBQWlCLElBQWpCLEVBZlI7QUFnQlYsNEJBQWtCLEVBQUUsbUJBQUYsRUFBdUIsSUFBdkIsRUFoQlI7QUFpQlYsd0JBQWtCLEVBQUUsZUFBRixFQUFtQixJQUFuQixFQWpCUjtBQWtCVixpQkFBa0IsRUFBRSxRQUFGLEVBQVksSUFBWixFQWxCUjtBQW1CVix3QkFBa0IsRUFBRSxlQUFGLEVBQW1CLElBQW5CLEVBbkJSO0FBb0JWLGlCQUFrQixFQUFFLFFBQUYsRUFBWSxJQUFaO0FBcEJSLFNBQVo7O0FBdUJBLGNBQU0sS0FBTixHQUEwQixPQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXlCLENBQXpCLENBQTFCO0FBQ0EsY0FBTSxNQUFOLEdBQTBCLE9BQUssU0FBTCxDQUFlLFNBQWYsRUFBMEIsQ0FBMUIsQ0FBMUI7QUFDQSxjQUFNLFFBQU4sR0FBMEIsT0FBSyxTQUFMLENBQWUsV0FBZixFQUE0QixDQUE1QixDQUExQjtBQUNBLGNBQU0sUUFBTixHQUEwQixPQUFLLFNBQUwsQ0FBZSxXQUFmLEVBQTRCLENBQTVCLENBQTFCO0FBQ0EsY0FBTSxPQUFOLEdBQTBCLE9BQUssU0FBTCxDQUFlLFVBQWYsRUFBMkIsQ0FBM0IsQ0FBMUI7QUFDQSxjQUFNLE9BQU4sR0FBMEIsT0FBSyxTQUFMLENBQWUsWUFBZixFQUE2QixDQUE3QixDQUExQjtBQUNBLGNBQU0sT0FBTixHQUEwQixPQUFLLFNBQUwsQ0FBZSxVQUFmLEVBQTJCLENBQTNCLENBQTFCO0FBQ0EsY0FBTSxNQUFOLEdBQTBCLE9BQUssU0FBTCxDQUFlLFNBQWYsRUFBMEIsQ0FBMUIsQ0FBMUI7QUFDQSxjQUFNLE9BQU4sR0FBMEIsT0FBSyxTQUFMLENBQWUsVUFBZixFQUEyQixDQUEzQixDQUExQjtBQUNBLGNBQU0saUJBQU4sR0FBMEIsT0FBSyxTQUFMLENBQWUscUJBQWYsRUFBc0MsQ0FBdEMsQ0FBMUI7O0FBRUEsZUFBTyxJQUFQLEdBQWMsS0FBZDtBQUNBLGVBQU8sTUFBUDtBQUNELE9BdkNJLENBQVA7QUF3Q0Q7OzsyQkFFTSxHLEVBQUs7QUFDVixVQUFJLE9BQU87QUFDVCxvQkFBWSxHQURIO0FBRVQsZ0JBQVk7QUFGSCxPQUFYOztBQUtBO0FBQ0E7QUFDQSxVQUFJLFFBQVEsS0FBSyxNQUFNLEtBQUssU0FBTCxDQUFlLFdBQXJCLEdBQW1DLEdBQXhDLENBQVo7QUFDQSxhQUFPLEtBQUssSUFBTCxZQUFtQixJQUFJLEVBQXZCLEVBQTZCLEtBQTdCLEVBQW9DLElBQXBDLENBQVA7QUFDRDs7O3dCQUVHLEcsRUFBSztBQUNQLGFBQU8sS0FBSyxJQUFMLFlBQW1CLElBQUksRUFBdkIsQ0FBUDtBQUNEOzs7bUNBRWMsRyxFQUFLO0FBQ2xCLGFBQU8sS0FBSyxJQUFMLFlBQW1CLElBQUksRUFBdkIsOENBQWtFLElBQUksTUFBdEUsQ0FBUDtBQUNEOzs7Ozs7a0JBR1ksVSIsImZpbGUiOiJncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlKi9cbmltcG9ydCBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcblxuY2xhc3MgTWVtYmVyc2hpcCBleHRlbmRzIFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcihjb25maWcpO1xuICB9XG5cbiAgX2VudGl0aWVzKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgcXVlcnkoJ2xpJywgc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGksIGZvbykge1xuICAgICAgbGV0IGl0ZW0gPSB7XG4gICAgICAgIGlkOiAgIHF1ZXJ5KHRoaXMpLnRleHQoKSxcbiAgICAgICAgdHlwZTogcXVlcnkodGhpcykuYXR0cigndHlwZScpXG4gICAgICB9O1xuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBnZXQob3B0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldChgZ3JvdXAvJHtvcHQuaWR9YClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgbGV0ICQgPSBjaGVlcmlvLmxvYWQocmVzdWx0LnhodG1sKTtcbiAgICAgICAgbGV0IGdyb3VwID0ge1xuICAgICAgICAgIGF1dGhuRmFjdG9yOiAgICAgICQoJy5hdXRobmZhY3RvcicpLnRleHQoKSxcbiAgICAgICAgICBjbGFzc2lmaWNhdGlvbjogICAkKCcuY2xhc3NpZmljYXRpb24nKS50ZXh0KCksXG4gICAgICAgICAgY29udGFjdDogICAgICAgICAgJCgnLmNvbnRhY3QnKS50ZXh0KCksXG4gICAgICAgICAgY291cnNlUXRyOiAgICAgICAgJCgnLmNvdXJzZV9xdHInKS50ZXh0KCksXG4gICAgICAgICAgY291cnNlWWVhcjogICAgICAgJCgnLmNvdXJzZV95ZWFyJykudGV4dCgpLFxuICAgICAgICAgIGNvdXJzZUN1cnI6ICAgICAgICQoJy5jb3Vyc2VfY3VycicpLnRleHQoKSxcbiAgICAgICAgICBjb3Vyc2VObzogICAgICAgICAkKCcuY291cnNlX25vJykudGV4dCgpLFxuICAgICAgICAgIGNvdXJzZVNlY3Q6ICAgICAgICQoJy5jb3Vyc2Vfc2VjdCcpLnRleHQoKSxcbiAgICAgICAgICBjb3Vyc2VTTE46ICAgICAgICAkKCcuY291cnNlX3NsbicpLnRleHQoKSxcbiAgICAgICAgICBjcmVhdGVUaW1lOiAgICAgICAkKCcuY3JlYXRldGltZScpLnRleHQoKSxcbiAgICAgICAgICBkZXBlbmRzT246ICAgICAgICAkKCcuZGVwZW5kc29uJykudGV4dCgpLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAgICAgICQoJy5kZXNjcmlwdGlvbicpLnRleHQoKSxcbiAgICAgICAgICBlbWFpbEVuYWJsZWQ6ICAgICAkKCcuZW1haWxlbmFibGVkJykudGV4dCgpLFxuICAgICAgICAgIGdpZDogICAgICAgICAgICAgICQoJy5naWQnKS50ZXh0KCksXG4gICAgICAgICAgbW9kaWZ5VGltZTogICAgICAgJCgnLm1vZGlmeXRpbWUnKS50ZXh0KCksXG4gICAgICAgICAgbWVtYmVyTW9kaWZ5VGltZTogJCgnLm1lbWJlcm1vZGlmeXRpbWUnKS50ZXh0KCksXG4gICAgICAgICAgcHVibGlzaEVtYWlsOiAgICAgJCgnLnB1Ymxpc2hlbWFpbCcpLnRleHQoKSxcbiAgICAgICAgICByZWdpZDogICAgICAgICAgICAkKCcucmVnaWQnKS50ZXh0KCksXG4gICAgICAgICAgcmVwb3J0VG9PcmlnOiAgICAgJCgnLnJlcG9ydHRvb3JpZycpLnRleHQoKSxcbiAgICAgICAgICB0aXRsZTogICAgICAgICAgICAkKCcudGl0bGUnKS50ZXh0KClcbiAgICAgICAgfTtcblxuICAgICAgICBncm91cC5uYW1lcyAgICAgICAgICAgICA9IHRoaXMuX2VudGl0aWVzKCcubmFtZXMnLCAkKTtcbiAgICAgICAgZ3JvdXAuYWRtaW5zICAgICAgICAgICAgPSB0aGlzLl9lbnRpdGllcygnLmFkbWlucycsICQpO1xuICAgICAgICBncm91cC51cGRhdGVycyAgICAgICAgICA9IHRoaXMuX2VudGl0aWVzKCcudXBkYXRlcnMnLCAkKTtcbiAgICAgICAgZ3JvdXAuY3JlYXRvcnMgICAgICAgICAgPSB0aGlzLl9lbnRpdGllcygnLmNyZWF0b3JzJywgJCk7XG4gICAgICAgIGdyb3VwLnJlYWRlcnMgICAgICAgICAgID0gdGhpcy5fZW50aXRpZXMoJy5yZWFkZXJzJywgJCk7XG4gICAgICAgIGdyb3VwLnNlbmRlcnMgICAgICAgICAgID0gdGhpcy5fZW50aXRpZXMoJy5hdXRob3JpZ3MnLCAkKTtcbiAgICAgICAgZ3JvdXAudmlld2VycyAgICAgICAgICAgPSB0aGlzLl9lbnRpdGllcygnLnZpZXdlcnMnLCAkKTtcbiAgICAgICAgZ3JvdXAub3B0SW5zICAgICAgICAgICAgPSB0aGlzLl9lbnRpdGllcygnLm9wdGlucycsICQpO1xuICAgICAgICBncm91cC5vcHRPdXRzICAgICAgICAgICA9IHRoaXMuX2VudGl0aWVzKCcub3B0b3V0cycsICQpO1xuICAgICAgICBncm91cC5jb3Vyc2VJbnN0cnVjdG9ycyA9IHRoaXMuX2VudGl0aWVzKCcuY291cnNlX2luc3RydWN0b3JzJywgJCk7XG5cbiAgICAgICAgcmVzdWx0LmRhdGEgPSBncm91cDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlKG9wdCkge1xuICAgIGxldCBldGFnID0ge1xuICAgICAgJ2lmLW1hdGNoJzogJyonLFxuICAgICAgJ0VUYWcnOiAgICAgJydcbiAgICB9O1xuXG4gICAgLy8gZXZhbCBpc24ndCBiYWQsIHJlYWRpbmcgaW4gYW4geGh0bWwgdGVtcGxhdGUgYXMgYSBzdHJpbmcgbGl0ZXJhbCB3aXRoIG9wdFxuICAgIC8vIHNlZSB0aGUgcmVzcGVjdGl2ZSB0ZW1wbGF0ZSBmb3IgaG93IHRoZSBvcHRpb25zIGFyZSB1c2VkXG4gICAgbGV0IHhodG1sID0gZXZhbCgnYCcgKyB0aGlzLnRlbXBsYXRlcy5jcmVhdGVHcm91cCArICdgJyk7XG4gICAgcmV0dXJuIHRoaXMuX3B1dChgZ3JvdXAvJHtvcHQuaWR9YCwgeGh0bWwsIGV0YWcpO1xuICB9XG5cbiAgZGVsKG9wdCkge1xuICAgIHJldHVybiB0aGlzLl9kZWwoYGdyb3VwLyR7b3B0LmlkfWApO1xuICB9XG5cbiAgZXhjaGFuZ2VFbmFibGUob3B0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1dChgZ3JvdXAvJHtvcHQuaWR9L2FmZmlsaWF0ZS9lbWFpbD9zdGF0dXM9YWN0aXZlJnNlbmRlcj0ke29wdC5zZW5kZXJ9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVtYmVyc2hpcDtcbiJdfQ==