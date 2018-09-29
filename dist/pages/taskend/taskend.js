'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _OverTip = require('./../../components/overtip/OverTip.js');

var _OverTip2 = _interopRequireDefault(_OverTip);

var _toast = require('./../../miniprogram_npm/vant-weapp/toast/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _task = require('./../../api/task.js');

var _common = require('./../../config/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskEnd = function (_wepy$page) {
  _inherits(TaskEnd, _wepy$page);

  function TaskEnd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TaskEnd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TaskEnd.__proto__ || Object.getPrototypeOf(TaskEnd)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      enablePullDownRefresh: true,
      "usingComponents": {
        "van-tabbar": "/miniprogram_npm/vant-weapp/tabbar/index",
        "van-tabbar-item": "/miniprogram_npm/vant-weapp/tabbar-item/index",
        "van-icon": "/miniprogram_npm/vant-weapp/icon/index",
        "van-loading": "/miniprogram_npm/vant-weapp/loading/index",
        "van-toast": "/miniprogram_npm/vant-weapp/toast/index"
      }
    }, _this.data = {
      tabshow: 0,
      taskData: [],
      publishData: [],
      is_loading: false,
      taskpage: 1,
      publishpage: 1
    }, _this.$repeat = { "taskData": { "com": "OverTip", "props": "" }, "publishData": { "com": "OverTip", "props": "" } }, _this.$props = { "OverTip": {} }, _this.$events = {}, _this.components = {
      OverTip: _OverTip2.default
    }, _this.methods = {
      onChange: function onChange(event) {
        this.tabshow = event.detail;
      },

      //初始化数据
      homeLoad: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(that, callback) {
          var openid, res, resPublish;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  openid = _wepy2.default.getStorageSync(_common.OPENID);

                  that.taskpage = 1;
                  that.publishpage = 1;
                  _context.next = 5;
                  return (0, _task.selectTaskMineOver)({ openid: openid, page: 1, size: 8 });

                case 5:
                  res = _context.sent;


                  if (res.statusCode === 200) {
                    that.taskData = res.data;
                    that.$apply();
                  }

                  _context.next = 9;
                  return (0, _task.selectTaskMinePublish)({ openid: openid, page: 1, size: 8 });

                case 9:
                  resPublish = _context.sent;


                  if (resPublish.statusCode === 200) {
                    that.publishData = resPublish.data;
                    that.$apply();
                  }

                  if (callback) {
                    callback();
                  }

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function homeLoad(_x, _x2) {
          return _ref2.apply(this, arguments);
        }

        return homeLoad;
      }(),


      //刷新页面
      homeReflesh: function homeReflesh() {

        this.methods.homeLoad(this);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TaskEnd, [{
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {

      this.methods.homeLoad(this, _wepy2.default.stopPullDownRefresh);
    }
  }, {
    key: 'onShow',
    value: function onShow() {

      this.methods.homeLoad(this);
    }
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var openid, page, res, _page, _res;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                openid = _wepy2.default.getStorageSync(_common.OPENID);

                if (!(this.tabshow == 0)) {
                  _context2.next = 10;
                  break;
                }

                this.is_loading = true;
                page = this.taskpage + 1;
                _context2.next = 6;
                return (0, _task.selectTaskMineOver)({ openid: openid, page: page, size: 8 });

              case 6:
                res = _context2.sent;


                this.is_loading = false;
                this.$apply();
                if (res.statusCode === 200) {
                  if (res.data.length > 0) {
                    this.taskData = this.taskData.concat(res.data);
                    this.taskpage = page;
                    this.$apply();
                  } else {
                    (0, _toast2.default)("已经是最底页了！");
                  }
                } else {
                  _toast2.default.fail('网络异常');
                }

              case 10:
                if (!(this.tabshow == 1)) {
                  _context2.next = 19;
                  break;
                }

                this.is_loading = true;
                _page = this.publishpage + 1;
                _context2.next = 15;
                return (0, _task.selectTaskMinePublish)({ openid: openid, page: _page, size: 8 });

              case 15:
                _res = _context2.sent;


                this.is_loading = false;
                this.$apply();
                if (_res.statusCode === 200) {
                  if (_res.data.length > 0) {
                    this.taskData = this.taskData.concat(_res.data);
                    this.publishpage = _page;
                    this.$apply();
                  } else {
                    (0, _toast2.default)("已经是最底页了！");
                  }
                } else {
                  _toast2.default.fail('网络异常');
                }

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onReachBottom() {
        return _ref3.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }]);

  return TaskEnd;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(TaskEnd , 'pages/taskend/taskend'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tlbmQuanMiXSwibmFtZXMiOlsiVGFza0VuZCIsImNvbmZpZyIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ0YWJzaG93IiwidGFza0RhdGEiLCJwdWJsaXNoRGF0YSIsImlzX2xvYWRpbmciLCJ0YXNrcGFnZSIsInB1Ymxpc2hwYWdlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiT3ZlclRpcCIsIm1ldGhvZHMiLCJvbkNoYW5nZSIsImV2ZW50IiwiZGV0YWlsIiwiaG9tZUxvYWQiLCJ0aGF0IiwiY2FsbGJhY2siLCJvcGVuaWQiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJPUEVOSUQiLCJwYWdlIiwic2l6ZSIsInJlcyIsInN0YXR1c0NvZGUiLCIkYXBwbHkiLCJyZXNQdWJsaXNoIiwiaG9tZVJlZmxlc2giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwibGVuZ3RoIiwiY29uY2F0IiwiVG9hc3QiLCJmYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNDOzs7O0FBQ0E7Ozs7QUFDRDs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNOQyw2QkFBc0IsSUFEaEI7QUFFUCx5QkFBbUI7QUFDaEIsc0JBQWMsMENBREU7QUFFZiwyQkFBbUIsK0NBRko7QUFHYixvQkFBWSx3Q0FIQztBQUlYLHVCQUFlLDJDQUpKO0FBS1YscUJBQWE7QUFMSDtBQUZaLEssUUFVVEMsSSxHQUFLO0FBQ0hDLGVBQVEsQ0FETDtBQUVIQyxnQkFBUyxFQUZOO0FBR0hDLG1CQUFZLEVBSFQ7QUFJSEMsa0JBQVcsS0FKUjtBQUtIQyxnQkFBUyxDQUxOO0FBTUhDLG1CQUFZO0FBTlQsSyxRQVFOQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxTQUFQLEVBQWlCLFNBQVEsRUFBekIsRUFBWixFQUF5QyxlQUFjLEVBQUMsT0FBTSxTQUFQLEVBQWlCLFNBQVEsRUFB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QUFlSSxNQUFLQSxLQUFwQixFQUF5QkMsTUFBSyxDQUE5QixFQUF0QixDOzs7QUFBWEMsb0I7OztBQUVGLHFCQUFLckIsVUFBTCxHQUFnQixLQUFoQjtBQUNBLHFCQUFLdUIsTUFBTDtBQUNGLG9CQUFHRixLQUFJQyxVQUFKLEtBQWlCLEdBQXBCLEVBQXdCO0FBQ3RCLHNCQUFHRCxLQUFJekIsSUFBSixDQUFTK0IsTUFBVCxHQUFnQixDQUFuQixFQUFxQjtBQUNsQix5QkFBSzdCLFFBQUwsR0FBYyxLQUFLQSxRQUFMLENBQWM4QixNQUFkLENBQXFCUCxLQUFJekIsSUFBekIsQ0FBZDtBQUNBLHlCQUFLTSxXQUFMLEdBQWlCaUIsS0FBakI7QUFDQSx5QkFBS0ksTUFBTDtBQUNGLG1CQUpELE1BSUs7QUFDRix5Q0FBTSxVQUFOO0FBQ0M7QUFFSCxpQkFUSCxNQVNPO0FBQ0lNLGtDQUFNQyxJQUFOLENBQVcsTUFBWDtBQUVMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaEZvQmQsZUFBS0csSTs7a0JBQXJCMUIsTyIsImZpbGUiOiJ0YXNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAgaW1wb3J0IE92ZXJUaXAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vdmVydGlwL092ZXJUaXAnXHJcbiAgIGltcG9ydCBUb2FzdCBmcm9tICcuLi8uLi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC90b2FzdC90b2FzdCc7XHJcbiAgaW1wb3J0IHtzZWxlY3RUYXNrTWluZU92ZXIsc2VsZWN0VGFza01pbmVQdWJsaXNofSBmcm9tIFwiLi4vLi4vYXBpL3Rhc2tcIjtcclxuICBpbXBvcnQge09QRU5JRH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbW1vbic7XHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0VuZCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6dHJ1ZSxcclxuICAgICAgXCJ1c2luZ0NvbXBvbmVudHNcIjoge1xyXG4gICAgICAgICBcInZhbi10YWJiYXJcIjogXCIvbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvdGFiYmFyL2luZGV4XCIsXHJcbiAgICAgICAgICBcInZhbi10YWJiYXItaXRlbVwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC90YWJiYXItaXRlbS9pbmRleFwiLFxyXG4gICAgICAgICAgICBcInZhbi1pY29uXCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL2ljb24vaW5kZXhcIixcclxuICAgICAgICAgICAgICBcInZhbi1sb2FkaW5nXCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL2xvYWRpbmcvaW5kZXhcIixcclxuICAgICAgICAgICAgICAgXCJ2YW4tdG9hc3RcIjogXCIvbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvdG9hc3QvaW5kZXhcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkYXRhPXtcclxuICAgICAgdGFic2hvdzowLFxyXG4gICAgICB0YXNrRGF0YTpbXSxcclxuICAgICAgcHVibGlzaERhdGE6W10sXHJcbiAgICAgIGlzX2xvYWRpbmc6ZmFsc2UsXHJcbiAgICAgIHRhc2twYWdlOjEsXHJcbiAgICAgIHB1Ymxpc2hwYWdlOjFcclxuICAgIH1cclxuICAgJHJlcGVhdCA9IHtcInRhc2tEYXRhXCI6e1wiY29tXCI6XCJPdmVyVGlwXCIsXCJwcm9wc1wiOlwiXCJ9LFwicHVibGlzaERhdGFcIjp7XCJjb21cIjpcIk92ZXJUaXBcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJPdmVyVGlwXCI6e319O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzPXtcclxuICAgICAgICBPdmVyVGlwOk92ZXJUaXBcclxuICAgIH1cclxuXHJcbiAgb25QdWxsRG93blJlZnJlc2goKXtcclxuXHJcbiAgICAgIHRoaXMubWV0aG9kcy5ob21lTG9hZCh0aGlzLHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCk7XHJcbiAgICB9XHJcbiAgICAgb25TaG93KCl7XHJcbiAgICAgXHJcbiAgICAgICAgIHRoaXMubWV0aG9kcy5ob21lTG9hZCh0aGlzKTtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgYXN5bmMgIG9uUmVhY2hCb3R0b20oKXtcclxuICAgbGV0IG9wZW5pZD13ZXB5LmdldFN0b3JhZ2VTeW5jKE9QRU5JRCk7XHJcbiAgICBcclxuICAgICAgaWYodGhpcy50YWJzaG93PT0wKXtcclxuICAgICAgICB0aGlzLmlzX2xvYWRpbmc9dHJ1ZTtcclxuICAgICAgICAgICAgIGxldCBwYWdlPXRoaXMudGFza3BhZ2UrMTtcclxuICAgICAgICAgICAgIGxldCByZXM9IGF3YWl0IHNlbGVjdFRhc2tNaW5lT3Zlcih7b3BlbmlkOm9wZW5pZCxwYWdlOnBhZ2Usc2l6ZTo4fSlcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDApe1xyXG4gICAgICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGFza0RhdGE9dGhpcy50YXNrRGF0YS5jb25jYXQocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRhc2twYWdlPXBhZ2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBUb2FzdChcIuW3sue7j+aYr+acgOW6lemhteS6hu+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvYXN0LmZhaWwoJ+e9kee7nOW8guW4uCcpO1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnRhYnNob3c9PTEpe1xyXG4gICAgICAgIHRoaXMuaXNfbG9hZGluZz10cnVlO1xyXG4gICAgICAgICAgIGxldCBwYWdlPXRoaXMucHVibGlzaHBhZ2UrMTtcclxuICAgICAgICAgICAgIGxldCByZXM9IGF3YWl0IHNlbGVjdFRhc2tNaW5lUHVibGlzaCh7b3BlbmlkOm9wZW5pZCxwYWdlOnBhZ2Usc2l6ZTo4fSlcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDApe1xyXG4gICAgICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGFza0RhdGE9dGhpcy50YXNrRGF0YS5jb25jYXQocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnB1Ymxpc2hwYWdlPXBhZ2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBUb2FzdChcIuW3sue7j+aYr+acgOW6lemhteS6hu+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvYXN0LmZhaWwoJ+e9kee7nOW8guW4uCcpO1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbWV0aG9kcz17XHJcbiAgICBcclxuICAgICAgICBvbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMudGFic2hvdz1ldmVudC5kZXRhaWw7XHJcbiAgICAgICBcclxuICAgICAgIH0sXHJcbiAgICAgICAvL+WIneWni+WMluaVsOaNrlxyXG4gICAgICBhc3luYyAgaG9tZUxvYWQodGhhdCxjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICBsZXQgb3BlbmlkPXdlcHkuZ2V0U3RvcmFnZVN5bmMoT1BFTklEKTtcclxuICAgICAgICAgICAgICB0aGF0LnRhc2twYWdlPTE7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnB1Ymxpc2hwYWdlPTE7XHJcbiAgICAgICAgICAgICAgbGV0IHJlcz0gYXdhaXQgc2VsZWN0VGFza01pbmVPdmVyKHtvcGVuaWQ6b3BlbmlkLHBhZ2U6MSxzaXplOjh9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwKXtcclxuICAgICAgICAgICAgICAgdGhhdC50YXNrRGF0YT1yZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzUHVibGlzaD0gYXdhaXQgc2VsZWN0VGFza01pbmVQdWJsaXNoKHtvcGVuaWQ6b3BlbmlkLHBhZ2U6MSxzaXplOjh9KVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBpZihyZXNQdWJsaXNoLnN0YXR1c0NvZGU9PT0yMDApe1xyXG4gICAgICAgICAgICAgICB0aGF0LnB1Ymxpc2hEYXRhPXJlc1B1Ymxpc2guZGF0YTtcclxuICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICBpZihjYWxsYmFjayl7XHJcbiAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgfSxcclxuXHJcbiAgICAgIC8v5Yi35paw6aG16Z2iXHJcbiAgICAgICBob21lUmVmbGVzaCgpe1xyXG4gICAgICAgICBcclxuICAgICAgICAgdGhpcy5tZXRob2RzLmhvbWVMb2FkKHRoaXMpO1xyXG4gICAgICAgfVxyXG4gICBcclxuICAgIH1cclxuICB9XHJcbiJdfQ==