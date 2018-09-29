'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Person = function (_wepy$page) {
  _inherits(Person, _wepy$page);

  function Person() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Person);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Person.__proto__ || Object.getPrototypeOf(Person)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.computed = {
      getUser: function getUser() {
        return _wepy2.default.$store.getState().user;
      }
    }, _this.methods = {
      toAdressList: function toAdressList() {
        _wepy2.default.navigateTo({
          url: '/pages/address/list/list'
        });
      },
      toMinePublish: function toMinePublish() {
        _wepy2.default.navigateTo({
          url: '/pages/minepublish/minepublish'
        });
      },
      toTaskEnd: function toTaskEnd() {
        _wepy2.default.navigateTo({
          url: '/pages/taskend/taskend'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Person, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Person;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Person , 'pages/person/person'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbi5qcyJdLCJuYW1lcyI6WyJQZXJzb24iLCJjb25maWciLCJjb21wdXRlZCIsImdldFVzZXIiLCJ3ZXB5IiwiJHN0b3JlIiwiZ2V0U3RhdGUiLCJ1c2VyIiwibWV0aG9kcyIsInRvQWRyZXNzTGlzdCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b01pbmVQdWJsaXNoIiwidG9UYXNrRW5kIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUyxFLFFBSVRDLFEsR0FBUztBQUNQQyxhQURPLHFCQUNFO0FBQ0wsZUFBT0MsZUFBS0MsTUFBTCxDQUFZQyxRQUFaLEdBQXVCQyxJQUE5QjtBQUNIO0FBSE0sSyxRQVFSQyxPLEdBQVE7QUFDSEMsa0JBREcsMEJBQ1c7QUFDZEwsdUJBQUtNLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSTtBQURVLFNBQWhCO0FBR0QsT0FMSTtBQU1KQyxtQkFOSSwyQkFNVztBQUNUUix1QkFBS00sVUFBTCxDQUFnQjtBQUNqQkMsZUFBSTtBQURhLFNBQWhCO0FBR0osT0FWRTtBQVlGRSxlQVpFLHVCQVlTO0FBQ1BULHVCQUFLTSxVQUFMLENBQWdCO0FBQ2pCQyxlQUFJO0FBRGEsU0FBaEI7QUFHSjtBQWhCRSxLOzs7Ozs2QkFIRCxDQUVOOzs7O0VBWmlDUCxlQUFLVSxJOztrQkFBckJkLE0iLCJmaWxlIjoicGVyc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcnNvbiAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuICAgXHJcbiAgICBjb21wdXRlZD17XHJcbiAgICAgIGdldFVzZXIoKXtcclxuICAgICAgICAgIHJldHVybiB3ZXB5LiRzdG9yZS5nZXRTdGF0ZSgpLnVzZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgfVxyXG4gICAgIG1ldGhvZHM9e1xyXG4gICAgICAgICAgdG9BZHJlc3NMaXN0KCl7XHJcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6Jy9wYWdlcy9hZGRyZXNzL2xpc3QvbGlzdCdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgdG9NaW5lUHVibGlzaCgpe1xyXG4gICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDonL3BhZ2VzL21pbmVwdWJsaXNoL21pbmVwdWJsaXNoJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgdG9UYXNrRW5kKCl7XHJcbiAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOicvcGFnZXMvdGFza2VuZC90YXNrZW5kJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgIH1cclxuICAgICBcclxuICB9XHJcbiJdfQ==