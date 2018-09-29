'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _address = require('./../../api/address.js');

var _task = require('./../../api/task.js');

var _index = require('./../../store/types/index.js');

var _notify = require('./../../miniprogram_npm/vant-weapp/notify/notify.js');

var _notify2 = _interopRequireDefault(_notify);

var _common = require('./../../config/common.js');

var _publishmixins = require('./../../mixins/publishmixins.js');

var _publishmixins2 = _interopRequireDefault(_publishmixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Publish = function (_wepy$page) {
  _inherits(Publish, _wepy$page);

  function Publish() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Publish);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Publish.__proto__ || Object.getPrototypeOf(Publish)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "usingComponents": {
        "van-button": "/miniprogram_npm/vant-weapp/button/index",
        "van-notify": "/miniprogram_npm/vant-weapp/notify/index"
      }
    }, _this.mixins = [_publishmixins2.default], _this.methods = {
      notify: function notify(msg) {
        (0, _notify2.default)({
          text: msg,
          duration: 2000,
          selector: '#custom-selector',
          backgroundColor: '#F56C6C'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Publish;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImNvbmZpZyIsIm1peGlucyIsInB1Ymxpc2hNaXhpbnMiLCJtZXRob2RzIiwibm90aWZ5IiwibXNnIiwidGV4dCIsImR1cmF0aW9uIiwic2VsZWN0b3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQzs7QUFDQTs7QUFDQzs7OztBQUNGOztBQUVBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1AseUJBQW1CO0FBQ2hCLHNCQUFjLDBDQURFO0FBRWhCLHNCQUFjO0FBRkU7QUFEWixLLFFBTVhDLE0sR0FBTyxDQUFDQyx1QkFBRCxDLFFBS0xDLE8sR0FBUTtBQUNMQyxZQURLLGtCQUNFQyxHQURGLEVBQ007QUFDRyw4QkFBTztBQUNOQyxnQkFBTUQsR0FEQTtBQUVORSxvQkFBVSxJQUZKO0FBR05DLG9CQUFVLGtCQUhKO0FBSU5DLDJCQUFpQjtBQUpYLFNBQVA7QUFNWDtBQVJFLEs7Ozs7RUFaMkJDLGVBQUtDLEk7O2tCQUFyQlosTyIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXHJcbiAgaW1wb3J0IHtzZWxlY3REZWZhdWx0LHNlbGVjdEFkZHJlc3N9IGZyb20gJy4uLy4uL2FwaS9hZGRyZXNzJ1xyXG4gICBpbXBvcnQge3NhdmVUYXNrfSBmcm9tICcuLi8uLi9hcGkvdGFzaydcclxuICAgaW1wb3J0IHtTRVRBRERSRVNTfSBmcm9tICcuLi8uLi9zdG9yZS90eXBlcy9pbmRleCdcclxuICAgIGltcG9ydCBOb3RpZnkgZnJvbSAnLi4vLi4vbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvbm90aWZ5L25vdGlmeSc7XHJcbiAgaW1wb3J0IHtPUEVOSUQsU0NIT09MfSBmcm9tICcuLi8uLi9jb25maWcvY29tbW9uJ1xyXG5cclxuICBpbXBvcnQgcHVibGlzaE1peGlucyBmcm9tICcuLi8uLi9taXhpbnMvcHVibGlzaG1peGlucydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgXCJ1c2luZ0NvbXBvbmVudHNcIjoge1xyXG4gICAgICAgICBcInZhbi1idXR0b25cIjogXCIvbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvYnV0dG9uL2luZGV4XCIsXHJcbiAgICAgICAgIFwidmFuLW5vdGlmeVwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC9ub3RpZnkvaW5kZXhcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgbWl4aW5zPVtwdWJsaXNoTWl4aW5zXVxyXG4gIFxyXG5cclxuXHJcblxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgICBub3RpZnkobXNnKXtcclxuICAgICAgICAgICAgICAgICAgICAgTm90aWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG1zZyxcclxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjY3VzdG9tLXNlbGVjdG9yJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGNTZDNkMnXHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=