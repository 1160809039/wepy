'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _schooldata = require('./../../config/schooldata.js');

var _schooldata2 = _interopRequireDefault(_schooldata);

var _common = require('./../../config/common.js');

var _toast = require('./../../miniprogram_npm/vant-weapp/toast/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _task = require('./../../api/task.js');

var _user = require('./../../api/user.js');

var _address = require('./../../api/address.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskInfo = function (_wepy$page) {
  _inherits(TaskInfo, _wepy$page);

  function TaskInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TaskInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TaskInfo.__proto__ || Object.getPrototypeOf(TaskInfo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "usingComponents": {
        "van-panel": "/miniprogram_npm/vant-weapp/panel/index",
        "van-button": "/miniprogram_npm/vant-weapp/button/index",
        "van-toast": "/miniprogram_npm/vant-weapp/toast/index"
      }

    }, _this.data = {
      ismine: true,
      taskdata: {},
      nickName: '',
      address: '',
      consignee_name: "",
      consignee_mobile: "",
      receiveId: ''
    }, _this.methods = {
      //接单
      receiveTask: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, taskId) {
          var openid, res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:

                  _wepy2.default.showLoading({
                    title: '加载中',
                    mask: true
                  });
                  openid = _wepy2.default.getStorageSync(_common.OPENID);
                  _context.next = 4;
                  return (0, _task.saveReceive)({
                    taskId: taskId,
                    id: userId,
                    openid: openid
                  });

                case 4:
                  res = _context.sent;

                  if (res.statusCode === 200 && res.data.id) {
                    _wepy2.default.hideLoading();
                    _wepy2.default.navigateBack();
                  } else {
                    (0, _toast2.default)("错误");
                  }

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function receiveTask(_x, _x2) {
          return _ref2.apply(this, arguments);
        }

        return receiveTask;
      }(),

      //取消任务
      cancelTask: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var receiveId, res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  receiveId = this.receiveId;
                  _context2.next = 3;
                  return (0, _task.updateReceiveDelete)({ receiveId: receiveId });

                case 3:
                  res = _context2.sent;

                  if (res.statusCode === 200 && res.data.id) {
                    _wepy2.default.navigateBack();
                  } else {
                    (0, _toast2.default)("错误");
                  }

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function cancelTask() {
          return _ref3.apply(this, arguments);
        }

        return cancelTask;
      }(),

      //完成任务
      endTask: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var receiveId, res;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  receiveId = this.receiveId;
                  _context3.next = 3;
                  return (0, _task.updateReceiveEnd)({ receiveId: receiveId });

                case 3:
                  res = _context3.sent;

                  if (res.statusCode === 200 && res.data.id) {
                    _wepy2.default.navigateBack();
                  } else {
                    (0, _toast2.default)("错误");
                  }

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function endTask() {
          return _ref4.apply(this, arguments);
        }

        return endTask;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TaskInfo, [{
    key: 'onLoad',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options) {
        var type, taskId, receiveId, res, param, userId, _res, resAddress, _data, address;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                //打开分享功能
                _wepy2.default.showShareMenu();

                //显示不同的页面
                type = options.type;

                //任务详情页

                if (!('mine' == type)) {
                  _context4.next = 15;
                  break;
                }

                this.ismine = true;
                taskId = options.taskId;
                receiveId = options.receiveId;

                this.receiveId = receiveId;

                _wepy2.default.showLoading({
                  title: '加载中',
                  mask: true
                });
                _context4.next = 10;
                return (0, _task.getTaskById)({ taskId: taskId });

              case 10:
                res = _context4.sent;


                if (res.statusCode === 200 && res.data.id) {
                  this.taskdata = res.data;
                  this.nickName = res.data.nick_name;
                  this.address = res.data.address;
                  this.consignee_name = res.data.consignee_name;
                  this.consignee_mobile = res.data.consignee_mobile;
                  this.$apply();
                }
                _wepy2.default.hideLoading();

                _context4.next = 29;
                break;

              case 15:

                //已接任务详情页
                this.ismine = false;

                _wepy2.default.showLoading({
                  title: '加载中',
                  mask: true
                });
                param = JSON.parse(options.param);


                this.taskdata = param;

                userId = param.user_id;
                //发布人用户信息

                _context4.next = 22;
                return (0, _user.selectUser)({ id: userId });

              case 22:
                _res = _context4.sent;


                if (_res.statusCode === 200 && _res.data.id) {
                  this.setData({
                    nickName: _res.data.nick_name
                  });
                }
                //发布人地址信息
                _context4.next = 26;
                return (0, _address.selectAddress)({ id: param.address_id });

              case 26:
                resAddress = _context4.sent;


                if (resAddress.statusCode === 200 && resAddress.data.id) {
                  _data = resAddress.data;
                  address = _data.branch_courts + " " + _data.department_name + " " + _data.specific_address;

                  this.setData({
                    address: address
                  });
                }
                _wepy2.default.hideLoading();

              case 29:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onLoad(_x3) {
        return _ref5.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.taskdata.task_name + " " + "任务金额：" + this.taskdata.task_price,
        path: '/pages/taskinfo/taskinfo?type=other&param=' + JSON.stringify(this.taskdata)
      };
    }
  }]);

  return TaskInfo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(TaskInfo , 'pages/taskinfo/taskinfo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tpbmZvLmpzIl0sIm5hbWVzIjpbIlRhc2tJbmZvIiwiY29uZmlnIiwiZGF0YSIsImlzbWluZSIsInRhc2tkYXRhIiwibmlja05hbWUiLCJhZGRyZXNzIiwiY29uc2lnbmVlX25hbWUiLCJjb25zaWduZWVfbW9iaWxlIiwicmVjZWl2ZUlkIiwibWV0aG9kcyIsInJlY2VpdmVUYXNrIiwidXNlcklkIiwidGFza0lkIiwid2VweSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJPUEVOSUQiLCJpZCIsInJlcyIsInN0YXR1c0NvZGUiLCJoaWRlTG9hZGluZyIsIm5hdmlnYXRlQmFjayIsImNhbmNlbFRhc2siLCJlbmRUYXNrIiwib3B0aW9ucyIsInNob3dTaGFyZU1lbnUiLCJ0eXBlIiwibmlja19uYW1lIiwiJGFwcGx5IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJ1c2VyX2lkIiwic2V0RGF0YSIsImFkZHJlc3NfaWQiLCJyZXNBZGRyZXNzIiwiYnJhbmNoX2NvdXJ0cyIsImRlcGFydG1lbnRfbmFtZSIsInNwZWNpZmljX2FkZHJlc3MiLCJ0YXNrX25hbWUiLCJ0YXNrX3ByaWNlIiwicGF0aCIsInN0cmluZ2lmeSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNEOztBQUNDOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1QseUJBQW1CO0FBQ2QscUJBQWEseUNBREM7QUFFYixzQkFBYywwQ0FGRDtBQUdaLHFCQUFhO0FBSEQ7O0FBRFYsSyxRQVNYQyxJLEdBQUs7QUFDSEMsY0FBTyxJQURKO0FBRUhDLGdCQUFTLEVBRk47QUFHSEMsZ0JBQVMsRUFITjtBQUlIQyxlQUFRLEVBSkw7QUFLSEMsc0JBQWUsRUFMWjtBQU1IQyx3QkFBaUIsRUFOZDtBQU9IQyxpQkFBVTtBQVBQLEss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O0FBQ3BCLGFBQU87QUFDTE4sZUFBTyxLQUFLWixRQUFMLENBQWN1QyxTQUFkLEdBQXdCLEdBQXhCLEdBQTRCLE9BQTVCLEdBQW9DLEtBQUt2QyxRQUFMLENBQWN3QyxVQURwRDtBQUVMQyxjQUFNLCtDQUE2Q1gsS0FBS1ksU0FBTCxDQUFlLEtBQUsxQyxRQUFwQjtBQUY5QyxPQUFQO0FBSUQ7Ozs7RUE3RnFDVSxlQUFLaUMsSTs7a0JBQXRCL0MsUSIsImZpbGUiOiJ0YXNraW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGRhdGEgZnJvbSAnLi4vLi4vY29uZmlnL3NjaG9vbGRhdGEnXHJcbiAgaW1wb3J0IHtPUEVOSUR9IGZyb20gJy4uLy4uL2NvbmZpZy9jb21tb24nO1xyXG4gIGltcG9ydCBUb2FzdCBmcm9tICcuLi8uLi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC90b2FzdC90b2FzdCc7XHJcbiBpbXBvcnQge3NhdmVSZWNlaXZlLGdldFRhc2tCeUlkLHVwZGF0ZVJlY2VpdmVEZWxldGUsdXBkYXRlUmVjZWl2ZUVuZH0gZnJvbSAnLi4vLi4vYXBpL3Rhc2snXHJcbiAgaW1wb3J0IHtzZWxlY3RVc2VyfSBmcm9tICcuLi8uLi9hcGkvdXNlcidcclxuICBpbXBvcnQge3NlbGVjdEFkZHJlc3N9IGZyb20gJy4uLy4uL2FwaS9hZGRyZXNzJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tJbmZvIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgIFwidXNpbmdDb21wb25lbnRzXCI6IHtcclxuICAgICAgICAgXCJ2YW4tcGFuZWxcIjogXCIvbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvcGFuZWwvaW5kZXhcIixcclxuICAgICAgICAgIFwidmFuLWJ1dHRvblwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC9idXR0b24vaW5kZXhcIixcclxuICAgICAgICAgICBcInZhbi10b2FzdFwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC90b2FzdC9pbmRleFwiXHJcbiAgICAgfVxyXG5cclxuICAgIH1cclxuIFxyXG4gIGRhdGE9e1xyXG4gICAgaXNtaW5lOnRydWUsXHJcbiAgICB0YXNrZGF0YTp7fSxcclxuICAgIG5pY2tOYW1lOicnLFxyXG4gICAgYWRkcmVzczonJyxcclxuICAgIGNvbnNpZ25lZV9uYW1lOlwiXCIsXHJcbiAgICBjb25zaWduZWVfbW9iaWxlOlwiXCIsXHJcbiAgICByZWNlaXZlSWQ6JydcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIC8v5omT5byA5YiG5Lqr5Yqf6IO9XHJcbiAgIHdlcHkuc2hvd1NoYXJlTWVudSgpO1xyXG4gIFxyXG4gICAgICAgLy/mmL7npLrkuI3lkIznmoTpobXpnaJcclxuICAgICAgIGxldCB0eXBlPW9wdGlvbnMudHlwZTtcclxuXHJcbiAgICAgICAvL+S7u+WKoeivpuaDhemhtVxyXG4gICAgICAgIGlmKCdtaW5lJz09dHlwZSl7XHJcbiAgICAgICAgICB0aGlzLmlzbWluZT10cnVlXHJcbiAgICAgICAgICBsZXQgdGFza0lkPW9wdGlvbnMudGFza0lkO1xyXG4gICAgICAgICAgbGV0IHJlY2VpdmVJZD1vcHRpb25zLnJlY2VpdmVJZDtcclxuICAgICAgICAgIHRoaXMucmVjZWl2ZUlkPXJlY2VpdmVJZDtcclxuICAgICAgICBcclxuICAgICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOifliqDovb3kuK0nLFxyXG4gICAgICAgICAgIG1hc2s6dHJ1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgICBsZXQgcmVzPWF3YWl0IGdldFRhc2tCeUlkKHt0YXNrSWQ6dGFza0lkfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza2RhdGE9cmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lPXJlcy5kYXRhLm5pY2tfbmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzcz1yZXMuZGF0YS5hZGRyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zaWduZWVfbmFtZT1yZXMuZGF0YS5jb25zaWduZWVfbmFtZTtcclxuICAgICAgICAgICAgICAgICB0aGlzLmNvbnNpZ25lZV9tb2JpbGU9cmVzLmRhdGEuY29uc2lnbmVlX21vYmlsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAvL+W3suaOpeS7u+WKoeivpuaDhemhtVxyXG4gICAgICAgICAgdGhpcy5pc21pbmU9ZmFsc2VcclxuXHJcbiAgICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6J+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgbWFzazp0cnVlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIGxldCBwYXJhbT1KU09OLnBhcnNlKG9wdGlvbnMucGFyYW0pO1xyXG5cclxuICAgICAgICB0aGlzLnRhc2tkYXRhPXBhcmFtXHJcbiAgICAgICAgIFxyXG4gICAgICAgICBsZXQgdXNlcklkPXBhcmFtLnVzZXJfaWRcclxuICAgICAgICAgLy/lj5HluIPkurrnlKjmiLfkv6Hmga9cclxuICAgICAgICAgbGV0IHJlcz1hd2FpdCBzZWxlY3RVc2VyKHtpZDp1c2VySWR9KTtcclxuICAgICAgICBcclxuICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBuaWNrTmFtZTpyZXMuZGF0YS5uaWNrX25hbWVcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgIC8v5Y+R5biD5Lq65Zyw5Z2A5L+h5oGvXHJcbiAgICAgICBsZXQgcmVzQWRkcmVzcz1hd2FpdCAgIHNlbGVjdEFkZHJlc3Moe2lkOnBhcmFtLmFkZHJlc3NfaWR9KTtcclxuICAgICAgICBcclxuICAgICAgICAgIGlmKHJlc0FkZHJlc3Muc3RhdHVzQ29kZT09PTIwMCYmcmVzQWRkcmVzcy5kYXRhLmlkKXtcclxuICAgICAgICAgICAgbGV0IGRhdGE9cmVzQWRkcmVzcy5kYXRhO1xyXG4gICAgICAgICAgICBsZXQgYWRkcmVzcz1kYXRhLmJyYW5jaF9jb3VydHMrXCIgXCIrZGF0YS5kZXBhcnRtZW50X25hbWUrXCIgXCIrZGF0YS5zcGVjaWZpY19hZGRyZXNzO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOmFkZHJlc3NcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgfVxyXG4gb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogdGhpcy50YXNrZGF0YS50YXNrX25hbWUrXCIgXCIrXCLku7vliqHph5Hpop3vvJpcIit0aGlzLnRhc2tkYXRhLnRhc2tfcHJpY2UsXHJcbiAgICAgIHBhdGg6ICcvcGFnZXMvdGFza2luZm8vdGFza2luZm8/dHlwZT1vdGhlciZwYXJhbT0nK0pTT04uc3RyaW5naWZ5KHRoaXMudGFza2RhdGEpXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgIC8v5o6l5Y2VXHJcbiAgICAgIGFzeW5jIHJlY2VpdmVUYXNrKHVzZXJJZCx0YXNrSWQpe1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6J+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgbWFzazp0cnVlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsZXQgb3BlbmlkPXdlcHkuZ2V0U3RvcmFnZVN5bmMoT1BFTklEKTtcclxuICAgICAgICAgICBsZXQgcmVzPSBhd2FpdCBzYXZlUmVjZWl2ZSh7XHJcbiAgICAgICAgICAgICAgIHRhc2tJZDp0YXNrSWQsXHJcbiAgICAgICAgICAgICAgIGlkOnVzZXJJZCxcclxuICAgICAgICAgICAgICAgb3BlbmlkOm9wZW5pZFxyXG4gICAgICAgICAgIH0pXHJcbiAgICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVG9hc3QoXCLplJnor69cIilcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICB9LFxyXG4gICAgICAgLy/lj5bmtojku7vliqFcclxuICAgICAgIGFzeW5jIGNhbmNlbFRhc2soKXtcclxuICAgICAgICAgIGxldCByZWNlaXZlSWQ9dGhpcy5yZWNlaXZlSWQ7XHJcbiAgICAgICAgICBsZXQgcmVzPWF3YWl0ICB1cGRhdGVSZWNlaXZlRGVsZXRlKHtyZWNlaXZlSWQ6cmVjZWl2ZUlkfSk7XHJcbiAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVG9hc3QoXCLplJnor69cIilcclxuICAgICAgICAgIH1cclxuICAgICAgIH0sXHJcbiAgICAgICAvL+WujOaIkOS7u+WKoVxyXG4gICAgICAgYXN5bmMgZW5kVGFzaygpe1xyXG4gICAgICAgICAgbGV0IHJlY2VpdmVJZD10aGlzLnJlY2VpdmVJZDtcclxuICAgICAgICAgIGxldCByZXM9YXdhaXQgIHVwZGF0ZVJlY2VpdmVFbmQoe3JlY2VpdmVJZDpyZWNlaXZlSWR9KTtcclxuICAgICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVG9hc3QoXCLplJnor69cIilcclxuICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==