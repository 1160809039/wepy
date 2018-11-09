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
      },
      toAbout: function toAbout() {
        _wepy2.default.navigateTo({
          url: '/pages/about/about'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbi5qcyJdLCJuYW1lcyI6WyJQZXJzb24iLCJjb25maWciLCJjb21wdXRlZCIsImdldFVzZXIiLCJ3ZXB5IiwiJHN0b3JlIiwiZ2V0U3RhdGUiLCJ1c2VyIiwibWV0aG9kcyIsInRvQWRyZXNzTGlzdCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b01pbmVQdWJsaXNoIiwidG9UYXNrRW5kIiwidG9BYm91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVMsRSxRQUlUQyxRLEdBQVM7QUFDUEMsYUFETyxxQkFDRTtBQUNMLGVBQU9DLGVBQUtDLE1BQUwsQ0FBWUMsUUFBWixHQUF1QkMsSUFBOUI7QUFDSDtBQUhNLEssUUFRUkMsTyxHQUFRO0FBQ0hDLGtCQURHLDBCQUNXO0FBQ2RMLHVCQUFLTSxVQUFMLENBQWdCO0FBQ2RDLGVBQUk7QUFEVSxTQUFoQjtBQUdELE9BTEk7QUFNSkMsbUJBTkksMkJBTVc7QUFDVFIsdUJBQUtNLFVBQUwsQ0FBZ0I7QUFDakJDLGVBQUk7QUFEYSxTQUFoQjtBQUdKLE9BVkU7QUFZRkUsZUFaRSx1QkFZUztBQUNQVCx1QkFBS00sVUFBTCxDQUFnQjtBQUNqQkMsZUFBSTtBQURhLFNBQWhCO0FBR0osT0FoQkU7QUFpQkhHLGFBakJHLHFCQWlCTTtBQUNIVix1QkFBS00sVUFBTCxDQUFnQjtBQUNsQkMsZUFBSTtBQURjLFNBQWhCO0FBR0w7QUFyQkUsSzs7Ozs7NkJBSEQsQ0FFTjs7OztFQVppQ1AsZUFBS1csSTs7a0JBQXJCZixNIiwiZmlsZSI6InBlcnNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJzb24gIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgY29tcHV0ZWQ9e1xyXG4gICAgICBnZXRVc2VyKCl7XHJcbiAgICAgICAgICByZXR1cm4gd2VweS4kc3RvcmUuZ2V0U3RhdGUoKS51c2VyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICAgICAgIFxyXG4gICAgIH1cclxuICAgICBtZXRob2RzPXtcclxuICAgICAgICAgIHRvQWRyZXNzTGlzdCgpe1xyXG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOicvcGFnZXMvYWRkcmVzcy9saXN0L2xpc3QnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgIHRvTWluZVB1Ymxpc2goKXtcclxuICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICB1cmw6Jy9wYWdlcy9taW5lcHVibGlzaC9taW5lcHVibGlzaCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgIHRvVGFza0VuZCgpe1xyXG4gICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDonL3BhZ2VzL3Rhc2tlbmQvdGFza2VuZCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0b0Fib3V0KCl7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDonL3BhZ2VzL2Fib3V0L2Fib3V0J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgIH1cclxuICAgICBcclxuICB9XHJcbiJdfQ==