'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _schooldata = require('./../../config/schooldata.js');

var _schooldata2 = _interopRequireDefault(_schooldata);

var _common = require('./../../config/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var School = function (_wepy$page) {
  _inherits(School, _wepy$page);

  function School() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, School);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = School.__proto__ || Object.getPrototypeOf(School)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "usingComponents": {
        "van-tree-select": "/miniprogram_npm/vant-weapp/tree-select/index"
      }

    }, _this.methods = {
      onClickNav: function onClickNav(_ref2) {
        var _ref2$detail = _ref2.detail,
            detail = _ref2$detail === undefined ? {} : _ref2$detail;


        //选择省份
        this.setData({
          mainActiveIndex: detail.index || 0
        });
      },
      onClickItem: function onClickItem(_ref3) {
        var _ref3$detail = _ref3.detail,
            detail = _ref3$detail === undefined ? {} : _ref3$detail;


        //选择学校
        this.setData({
          activeId: detail.id
        });
        _wepy2.default.setStorageSync(_common.SCHOOL, detail);

        _wepy2.default.switchTab({
          url: '/pages/index/index'
        });
      }
    }, _this.data = {
      items: []
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(School, [{
    key: 'onLoad',
    value: function onLoad() {
      this.items = _schooldata2.default.schooldata;
    }
  }]);

  return School;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(School , 'pages/school/school'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaG9vbC5qcyJdLCJuYW1lcyI6WyJTY2hvb2wiLCJjb25maWciLCJtZXRob2RzIiwib25DbGlja05hdiIsImRldGFpbCIsInNldERhdGEiLCJtYWluQWN0aXZlSW5kZXgiLCJpbmRleCIsIm9uQ2xpY2tJdGVtIiwiYWN0aXZlSWQiLCJpZCIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsIlNDSE9PTCIsInN3aXRjaFRhYiIsInVybCIsImRhdGEiLCJpdGVtcyIsInNjaG9vbGRhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDVCx5QkFBbUI7QUFDZCwyQkFBbUI7QUFETDs7QUFEVixLLFFBT1RDLE8sR0FBUTtBQUNIQyxnQkFERyw2QkFDeUI7QUFBQSxpQ0FBZkMsTUFBZTtBQUFBLFlBQWZBLE1BQWUsZ0NBQU4sRUFBTTs7O0FBRTFCO0FBQ1AsYUFBS0MsT0FBTCxDQUFhO0FBQ1hDLDJCQUFpQkYsT0FBT0csS0FBUCxJQUFnQjtBQUR0QixTQUFiO0FBR0QsT0FQUztBQVNWQyxpQkFUVSw4QkFTbUI7QUFBQSxpQ0FBZkosTUFBZTtBQUFBLFlBQWZBLE1BQWUsZ0NBQU4sRUFBTTs7O0FBRTNCO0FBQ0EsYUFBS0MsT0FBTCxDQUFhO0FBQ1hJLG9CQUFVTCxPQUFPTTtBQUROLFNBQWI7QUFHQ0MsdUJBQUtDLGNBQUwsQ0FBb0JDLGNBQXBCLEVBQTJCVCxNQUEzQjs7QUFFQ08sdUJBQUtHLFNBQUwsQ0FBZTtBQUNQQyxlQUFJO0FBREcsU0FBZjtBQUdGO0FBcEJRLEssUUE4QlJDLEksR0FBSztBQUNEQyxhQUFNO0FBREwsSzs7Ozs7NkJBSkc7QUFDSixXQUFLQSxLQUFMLEdBQVdELHFCQUFLRSxVQUFoQjtBQUNGOzs7O0VBcENnQ1AsZUFBS1EsSTs7a0JBQXBCbkIsTSIsImZpbGUiOiJzY2hvb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCdcclxuICBpbXBvcnQgZGF0YSBmcm9tICcuLi8uLi9jb25maWcvc2Nob29sZGF0YSdcclxuICBpbXBvcnQge1NDSE9PTH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbW1vbidcclxuICBcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTY2hvb2wgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgXCJ1c2luZ0NvbXBvbmVudHNcIjoge1xyXG4gICAgICAgICBcInZhbi10cmVlLXNlbGVjdFwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC90cmVlLXNlbGVjdC9pbmRleFwiXHJcbiAgICAgfVxyXG4gICAgXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgICAgIG9uQ2xpY2tOYXYoeyBkZXRhaWwgPSB7fSB9KSB7XHJcblxyXG4gICAgICAgICAgIC8v6YCJ5oup55yB5Lu9XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBtYWluQWN0aXZlSW5kZXg6IGRldGFpbC5pbmRleCB8fCAwXHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBvbkNsaWNrSXRlbSh7IGRldGFpbCA9IHt9IH0pIHtcclxuXHJcbiAgICAvL+mAieaLqeWtpuagoVxyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgYWN0aXZlSWQ6IGRldGFpbC5pZFxyXG4gICAgfSk7XHJcbiAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhTQ0hPT0wsZGV0YWlsKVxyXG4gICAgIFxyXG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgdXJsOicvcGFnZXMvaW5kZXgvaW5kZXgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgIH1cclxuICAgXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLml0ZW1zPWRhdGEuc2Nob29sZGF0YTtcclxuICAgICB9XHJcblxyXG4gICAgZGF0YT17XHJcbiAgICAgICAgaXRlbXM6W11cclxuICAgIH1cclxuICBcclxuICB9XHJcbiJdfQ==