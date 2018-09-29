'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _user = require('./../../store/types/user.js');

var _toast = require('./../../miniprogram_npm/vant-weapp/toast/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _common = require('./../../config/common.js');

var _user2 = require('./../../api/user.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
  _inherits(Login, _wepy$page);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "usingComponents": {
        "van-toast": "/miniprogram_npm/vant-weapp/toast/index"
      }

    }, _this.methods = {
      bindGetUserInfo: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
          var resLogin, resOpenId, openid, resL;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _wepy2.default.$store.dispatch({ type: _user.USERADD, payload: res.detail.userInfo });

                  //  微信登录获取code
                  _context.next = 3;
                  return _wepy2.default.login();

                case 3:
                  resLogin = _context.sent;
                  _context.next = 6;
                  return (0, _user2.getOpenId)({
                    code: resLogin.code
                  });

                case 6:
                  resOpenId = _context.sent;

                  if (!(resOpenId.statusCode === 200)) {
                    _context.next = 14;
                    break;
                  }

                  openid = resOpenId.data.openid;

                  //  执行自己的登录流程

                  _context.next = 11;
                  return (0, _user2.login)({
                    openid: openid,
                    avatar: res.detail.userInfo.avatarUrl,
                    nickname: res.detail.userInfo.nickName
                  });

                case 11:
                  resL = _context.sent;


                  console.log(resL.statusCode === 200 && resL.data.openid);
                  if (resL.statusCode === 200 && resL.data.openid) {
                    _wepy2.default.setStorageSync(_common.OPENID, resL.data.openid);
                    _wepy2.default.switchTab({
                      url: '/pages/index/index'
                    });
                  } else {
                    _toast2.default.fail('网络异常');
                  }

                case 14:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function bindGetUserInfo(_x) {
          return _ref2.apply(this, arguments);
        }

        return bindGetUserInfo;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibWV0aG9kcyIsImJpbmRHZXRVc2VySW5mbyIsInJlcyIsIndlcHkiLCIkc3RvcmUiLCJkaXNwYXRjaCIsInR5cGUiLCJVU0VSQUREIiwicGF5bG9hZCIsImRldGFpbCIsInVzZXJJbmZvIiwibG9naW4iLCJyZXNMb2dpbiIsImNvZGUiLCJyZXNPcGVuSWQiLCJzdGF0dXNDb2RlIiwib3BlbmlkIiwiZGF0YSIsImF2YXRhciIsImF2YXRhclVybCIsIm5pY2tuYW1lIiwibmlja05hbWUiLCJyZXNMIiwiY29uc29sZSIsImxvZyIsInNldFN0b3JhZ2VTeW5jIiwiT1BFTklEIiwic3dpdGNoVGFiIiwidXJsIiwiVG9hc3QiLCJmYWlsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7OztBQUNDOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDb0JBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ04seUJBQW1CO0FBQ25CLHFCQUFhO0FBRE07O0FBRGIsSyxRQVNUQyxPLEdBQVE7QUFDRUMscUJBREY7QUFBQSw2RkFDa0JDLEdBRGxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVMQyxpQ0FBS0MsTUFBTCxDQUFZQyxRQUFaLENBQXFCLEVBQUNDLE1BQUtDLGFBQU4sRUFBY0MsU0FBUU4sSUFBSU8sTUFBSixDQUFXQyxRQUFqQyxFQUFyQjs7QUFFRDtBQUpNO0FBQUEseUJBS2VQLGVBQUtRLEtBQUwsRUFMZjs7QUFBQTtBQUtEQywwQkFMQztBQUFBO0FBQUEseUJBU21CLHNCQUFVO0FBQzdCQywwQkFBS0QsU0FBU0M7QUFEZSxtQkFBVixDQVRuQjs7QUFBQTtBQVNFQywyQkFURjs7QUFBQSx3QkFZQUEsVUFBVUMsVUFBVixLQUF1QixHQVp2QjtBQUFBO0FBQUE7QUFBQTs7QUFjS0Msd0JBZEwsR0FjYUYsVUFBVUcsSUFBVixDQUFlRCxNQWQ1Qjs7QUFnQkU7O0FBaEJGO0FBQUEseUJBaUJpQixrQkFBTTtBQUNwQkEsNEJBQU9BLE1BRGE7QUFFcEJFLDRCQUFPaEIsSUFBSU8sTUFBSixDQUFXQyxRQUFYLENBQW9CUyxTQUZQO0FBR3BCQyw4QkFBU2xCLElBQUlPLE1BQUosQ0FBV0MsUUFBWCxDQUFvQlc7QUFIVCxtQkFBTixDQWpCakI7O0FBQUE7QUFpQktDLHNCQWpCTDs7O0FBdUJJQywwQkFBUUMsR0FBUixDQUFZRixLQUFLUCxVQUFMLEtBQWtCLEdBQWxCLElBQXVCTyxLQUFLTCxJQUFMLENBQVVELE1BQTdDO0FBQ0Esc0JBQUdNLEtBQUtQLFVBQUwsS0FBa0IsR0FBbEIsSUFBdUJPLEtBQUtMLElBQUwsQ0FBVUQsTUFBcEMsRUFBMkM7QUFDeENiLG1DQUFLc0IsY0FBTCxDQUFvQkMsY0FBcEIsRUFBNEJKLEtBQUtMLElBQUwsQ0FBVUQsTUFBdEM7QUFDQWIsbUNBQUt3QixTQUFMLENBQWU7QUFDWkMsMkJBQUk7QUFEUSxxQkFBZjtBQUdGLG1CQUxELE1BS0s7QUFDRkMsb0NBQU1DLElBQU4sQ0FBVyxNQUFYO0FBQ0Y7O0FBL0JMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsSzs7Ozs7NkJBSEEsQ0FFUDs7OztFQVRnQzNCLGVBQUs0QixJOztrQkFBbkJqQyxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQge1VTRVJBRER9IGZyb20gJy4uLy4uL3N0b3JlL3R5cGVzL3VzZXInXHJcbiAgaW1wb3J0IFRvYXN0IGZyb20gJy4uLy4uL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL3RvYXN0L3RvYXN0JztcclxuICAgaW1wb3J0IHtPUEVOSUR9IGZyb20gJy4uLy4uL2NvbmZpZy9jb21tb24nXHJcbiAgIGltcG9ydCB7Z2V0T3BlbklkLGxvZ2lufSBmcm9tICcuLi8uLi9hcGkvdXNlcidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICBcInVzaW5nQ29tcG9uZW50c1wiOiB7XHJcbiAgICAgICBcInZhbi10b2FzdFwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC90b2FzdC9pbmRleFwiXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKXtcclxuICAgIFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgICBhc3luYyAgYmluZEdldFVzZXJJbmZvKHJlcyl7XHJcbiAgICAgICB3ZXB5LiRzdG9yZS5kaXNwYXRjaCh7dHlwZTpVU0VSQURELHBheWxvYWQ6cmVzLmRldGFpbC51c2VySW5mb30pXHJcblxyXG4gICAgICAvLyAg5b6u5L+h55m75b2V6I635Y+WY29kZVxyXG4gICAgICAgbGV0IHJlc0xvZ2luPSBhd2FpdCB3ZXB5LmxvZ2luKCk7XHJcblxyXG4gICAgICAgICBcclxuICAgICAgLy8gIOagueaNrmNvZGXljrvojrflj5ZvcGVuaWRcclxuICAgICAgICAgIGxldCByZXNPcGVuSWQ9IGF3YWl0IGdldE9wZW5JZCh7XHJcbiAgICAgICAgICAgIGNvZGU6cmVzTG9naW4uY29kZVxyXG4gICAgICAgICAgfSkgXHJcbiAgICAgICAgIGlmKHJlc09wZW5JZC5zdGF0dXNDb2RlPT09MjAwKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBsZXQgb3BlbmlkPSByZXNPcGVuSWQuZGF0YS5vcGVuaWQ7XHJcblxyXG4gICAgICAgICAgICAgIC8vICDmiafooYzoh6rlt7HnmoTnmbvlvZXmtYHnqItcclxuICAgICAgICAgICAgIGxldCByZXNMPSBhd2FpdCBsb2dpbih7XHJcbiAgICAgICAgICAgICAgIG9wZW5pZDpvcGVuaWQsXHJcbiAgICAgICAgICAgICAgIGF2YXRhcjpyZXMuZGV0YWlsLnVzZXJJbmZvLmF2YXRhclVybCxcclxuICAgICAgICAgICAgICAgbmlja25hbWU6cmVzLmRldGFpbC51c2VySW5mby5uaWNrTmFtZVxyXG4gICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNMLnN0YXR1c0NvZGU9PT0yMDAmJnJlc0wuZGF0YS5vcGVuaWQpXHJcbiAgICAgICAgICAgICAgICBpZihyZXNMLnN0YXR1c0NvZGU9PT0yMDAmJnJlc0wuZGF0YS5vcGVuaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhPUEVOSUQsIHJlc0wuZGF0YS5vcGVuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdXJsOicvcGFnZXMvaW5kZXgvaW5kZXgnXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgIFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICBUb2FzdC5mYWlsKCfnvZHnu5zlvILluLgnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gIFxyXG4gIH1cclxuIl19