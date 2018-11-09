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
      taskAddr: '',
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
      }(),
      receiveTaskSubmit: function receiveTaskSubmit(e) {
        this.methods.tempMessage(e.detail.formId, this.taskdata.id, 1);
      },
      endTaskSubmit: function endTaskSubmit(e) {
        this.methods.tempMessage(e.detail.formId, this.taskdata.id, 2);
      },
      cancelTaskSubmit: function cancelTaskSubmit(e) {
        this.methods.tempMessage(e.detail.formId, this.taskdata.id, 3);
      },
      tempMessage: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(formId, taskId, type) {
          var res, res1;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return (0, _user.getAceessToken)();

                case 2:
                  res = _context4.sent;
                  _context4.next = 5;
                  return (0, _user.templeteMessege)({ formId: formId, taskId: taskId, type: type, token: res.data.access_token });

                case 5:
                  res1 = _context4.sent;

                case 6:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function tempMessage(_x3, _x4, _x5) {
          return _ref5.apply(this, arguments);
        }

        return tempMessage;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TaskInfo, [{
    key: 'onLoad',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(options) {
        var type, taskId, receiveId, res, param, userId, _res, resAddress, _data, address;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                //打开分享功能
                _wepy2.default.showShareMenu();

                //显示不同的页面
                type = options.type;

                //任务详情页

                if (!('mine' == type)) {
                  _context5.next = 15;
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
                _context5.next = 10;
                return (0, _task.getTaskById)({ taskId: taskId });

              case 10:
                res = _context5.sent;


                if (res.statusCode === 200 && res.data.id) {
                  this.taskdata = res.data;
                  this.nickName = res.data.nick_name;
                  this.taskAddr = res.data.task_addr;
                  this.address = res.data.address;
                  this.consignee_name = res.data.consignee_name;
                  this.consignee_mobile = res.data.consignee_mobile;
                  this.$apply();
                }
                _wepy2.default.hideLoading();

                _context5.next = 29;
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

                _context5.next = 22;
                return (0, _user.selectUser)({ id: userId });

              case 22:
                _res = _context5.sent;


                if (_res.statusCode === 200 && _res.data.id) {
                  this.nickName = _res.data.nick_name;
                  this.$apply();
                }
                //发布人地址信息
                _context5.next = 26;
                return (0, _address.selectAddress)({ id: param.address_id });

              case 26:
                resAddress = _context5.sent;


                if (resAddress.statusCode === 200 && resAddress.data.id) {
                  _data = resAddress.data;
                  address = _data.branch_courts + " " + _data.department_name + " " + _data.specific_address;

                  this.address = address;
                  this.$apply();
                }
                _wepy2.default.hideLoading();

              case 29:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onLoad(_x6) {
        return _ref6.apply(this, arguments);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tpbmZvLmpzIl0sIm5hbWVzIjpbIlRhc2tJbmZvIiwiY29uZmlnIiwiZGF0YSIsImlzbWluZSIsInRhc2tkYXRhIiwibmlja05hbWUiLCJhZGRyZXNzIiwidGFza0FkZHIiLCJjb25zaWduZWVfbmFtZSIsImNvbnNpZ25lZV9tb2JpbGUiLCJyZWNlaXZlSWQiLCJtZXRob2RzIiwicmVjZWl2ZVRhc2siLCJ1c2VySWQiLCJ0YXNrSWQiLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJvcGVuaWQiLCJnZXRTdG9yYWdlU3luYyIsIk9QRU5JRCIsImlkIiwicmVzIiwic3RhdHVzQ29kZSIsImhpZGVMb2FkaW5nIiwibmF2aWdhdGVCYWNrIiwiY2FuY2VsVGFzayIsImVuZFRhc2siLCJyZWNlaXZlVGFza1N1Ym1pdCIsImUiLCJ0ZW1wTWVzc2FnZSIsImRldGFpbCIsImZvcm1JZCIsImVuZFRhc2tTdWJtaXQiLCJjYW5jZWxUYXNrU3VibWl0IiwidHlwZSIsInRva2VuIiwiYWNjZXNzX3Rva2VuIiwicmVzMSIsIm9wdGlvbnMiLCJzaG93U2hhcmVNZW51Iiwibmlja19uYW1lIiwidGFza19hZGRyIiwiJGFwcGx5IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJ1c2VyX2lkIiwiYWRkcmVzc19pZCIsInJlc0FkZHJlc3MiLCJicmFuY2hfY291cnRzIiwiZGVwYXJ0bWVudF9uYW1lIiwic3BlY2lmaWNfYWRkcmVzcyIsInRhc2tfbmFtZSIsInRhc2tfcHJpY2UiLCJwYXRoIiwic3RyaW5naWZ5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0Q7O0FBQ0M7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDVCx5QkFBbUI7QUFDZCxxQkFBYSx5Q0FEQztBQUViLHNCQUFjLDBDQUZEO0FBR1oscUJBQWE7QUFIRDs7QUFEVixL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LHVCQUFLL0MsT0FBTCxHQUFhQSxPQUFiO0FBQ0UsdUJBQUtzQyxNQUFMO0FBRU47QUFDQTdCLCtCQUFLVSxXQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBS1VGLEcsRUFBSztBQUNwQixhQUFPO0FBQ0xOLGVBQU8sS0FBS2IsUUFBTCxDQUFja0QsU0FBZCxHQUF3QixHQUF4QixHQUE0QixPQUE1QixHQUFvQyxLQUFLbEQsUUFBTCxDQUFjbUQsVUFEcEQ7QUFFTEMsY0FBTSwrQ0FBNkNWLEtBQUtXLFNBQUwsQ0FBZSxLQUFLckQsUUFBcEI7QUFGOUMsT0FBUDtBQUlEOzs7O0VBN0ZxQ1csZUFBSzJDLEk7O2tCQUF0QjFELFEiLCJmaWxlIjoidGFza2luZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBkYXRhIGZyb20gJy4uLy4uL2NvbmZpZy9zY2hvb2xkYXRhJ1xyXG4gIGltcG9ydCB7T1BFTklEfSBmcm9tICcuLi8uLi9jb25maWcvY29tbW9uJztcclxuICBpbXBvcnQgVG9hc3QgZnJvbSAnLi4vLi4vbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvdG9hc3QvdG9hc3QnO1xyXG4gaW1wb3J0IHtzYXZlUmVjZWl2ZSxnZXRUYXNrQnlJZCx1cGRhdGVSZWNlaXZlRGVsZXRlLHVwZGF0ZVJlY2VpdmVFbmR9IGZyb20gJy4uLy4uL2FwaS90YXNrJ1xyXG4gIGltcG9ydCB7c2VsZWN0VXNlcix0ZW1wbGV0ZU1lc3NlZ2UsZ2V0QWNlZXNzVG9rZW59IGZyb20gJy4uLy4uL2FwaS91c2VyJ1xyXG4gIGltcG9ydCB7c2VsZWN0QWRkcmVzc30gZnJvbSAnLi4vLi4vYXBpL2FkZHJlc3MnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0luZm8gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgXCJ1c2luZ0NvbXBvbmVudHNcIjoge1xyXG4gICAgICAgICBcInZhbi1wYW5lbFwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC9wYW5lbC9pbmRleFwiLFxyXG4gICAgICAgICAgXCJ2YW4tYnV0dG9uXCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL2J1dHRvbi9pbmRleFwiLFxyXG4gICAgICAgICAgIFwidmFuLXRvYXN0XCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL3RvYXN0L2luZGV4XCJcclxuICAgICB9XHJcblxyXG4gICAgfVxyXG4gXHJcbiAgZGF0YT17XHJcbiAgICBpc21pbmU6dHJ1ZSxcclxuICAgIHRhc2tkYXRhOnt9LFxyXG4gICAgbmlja05hbWU6JycsXHJcbiAgICBhZGRyZXNzOicnLFxyXG4gICAgdGFza0FkZHI6JycsXHJcbiAgICBjb25zaWduZWVfbmFtZTpcIlwiLFxyXG4gICAgY29uc2lnbmVlX21vYmlsZTpcIlwiLFxyXG4gICAgcmVjZWl2ZUlkOicnXHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAvL+aJk+W8gOWIhuS6q+WKn+iDvVxyXG4gICB3ZXB5LnNob3dTaGFyZU1lbnUoKTtcclxuICBcclxuICAgICAgIC8v5pi+56S65LiN5ZCM55qE6aG16Z2iXHJcbiAgICAgICBsZXQgdHlwZT1vcHRpb25zLnR5cGU7XHJcblxyXG4gICAgICAgLy/ku7vliqHor6bmg4XpobVcclxuICAgICAgICBpZignbWluZSc9PXR5cGUpe1xyXG4gICAgICAgICAgdGhpcy5pc21pbmU9dHJ1ZVxyXG4gICAgICAgICAgbGV0IHRhc2tJZD1vcHRpb25zLnRhc2tJZDtcclxuICAgICAgICAgIGxldCByZWNlaXZlSWQ9b3B0aW9ucy5yZWNlaXZlSWQ7XHJcbiAgICAgICAgICB0aGlzLnJlY2VpdmVJZD1yZWNlaXZlSWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTon5Yqg6L295LitJyxcclxuICAgICAgICAgICBtYXNrOnRydWVcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgbGV0IHJlcz1hd2FpdCBnZXRUYXNrQnlJZCh7dGFza0lkOnRhc2tJZH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwJiZyZXMuZGF0YS5pZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tkYXRhPXJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uaWNrTmFtZT1yZXMuZGF0YS5uaWNrX25hbWU7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy50YXNrQWRkcj1yZXMuZGF0YS50YXNrX2FkZHI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3M9cmVzLmRhdGEuYWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uc2lnbmVlX25hbWU9cmVzLmRhdGEuY29uc2lnbmVlX25hbWU7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5jb25zaWduZWVfbW9iaWxlPXJlcy5kYXRhLmNvbnNpZ25lZV9tb2JpbGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgLy/lt7LmjqXku7vliqHor6bmg4XpobVcclxuICAgICAgICAgIHRoaXMuaXNtaW5lPWZhbHNlXHJcblxyXG4gICAgICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOifliqDovb3kuK0nLFxyXG4gICAgICAgICAgIG1hc2s6dHJ1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICBsZXQgcGFyYW09SlNPTi5wYXJzZShvcHRpb25zLnBhcmFtKTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrZGF0YT1wYXJhbVxyXG4gICAgICAgICBcclxuICAgICAgICAgbGV0IHVzZXJJZD1wYXJhbS51c2VyX2lkXHJcbiAgICAgICAgIC8v5Y+R5biD5Lq655So5oi35L+h5oGvXHJcbiAgICAgICAgIGxldCByZXM9YXdhaXQgc2VsZWN0VXNlcih7aWQ6dXNlcklkfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICAgICB0aGlzLm5pY2tOYW1lPXJlcy5kYXRhLm5pY2tfbmFtZTtcclxuICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgIC8v5Y+R5biD5Lq65Zyw5Z2A5L+h5oGvXHJcbiAgICAgICBsZXQgcmVzQWRkcmVzcz1hd2FpdCAgIHNlbGVjdEFkZHJlc3Moe2lkOnBhcmFtLmFkZHJlc3NfaWR9KTtcclxuICAgICAgICBcclxuICAgICAgICAgIGlmKHJlc0FkZHJlc3Muc3RhdHVzQ29kZT09PTIwMCYmcmVzQWRkcmVzcy5kYXRhLmlkKXtcclxuICAgICAgICAgICAgbGV0IGRhdGE9cmVzQWRkcmVzcy5kYXRhO1xyXG4gICAgICAgICAgICBsZXQgYWRkcmVzcz1kYXRhLmJyYW5jaF9jb3VydHMrXCIgXCIrZGF0YS5kZXBhcnRtZW50X25hbWUrXCIgXCIrZGF0YS5zcGVjaWZpY19hZGRyZXNzO1xyXG4gICAgICAgICAgICAgdGhpcy5hZGRyZXNzPWFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICB9XHJcbiBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLnRhc2tkYXRhLnRhc2tfbmFtZStcIiBcIitcIuS7u+WKoemHkemine+8mlwiK3RoaXMudGFza2RhdGEudGFza19wcmljZSxcclxuICAgICAgcGF0aDogJy9wYWdlcy90YXNraW5mby90YXNraW5mbz90eXBlPW90aGVyJnBhcmFtPScrSlNPTi5zdHJpbmdpZnkodGhpcy50YXNrZGF0YSlcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgICBtZXRob2RzPXtcclxuICAgICAgLy/mjqXljZVcclxuICAgICAgYXN5bmMgcmVjZWl2ZVRhc2sodXNlcklkLHRhc2tJZCl7XHJcbiAgICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTon5Yqg6L295LitJyxcclxuICAgICAgICAgICBtYXNrOnRydWVcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGxldCBvcGVuaWQ9d2VweS5nZXRTdG9yYWdlU3luYyhPUEVOSUQpO1xyXG4gICAgICAgICAgIGxldCByZXM9IGF3YWl0IHNhdmVSZWNlaXZlKHtcclxuICAgICAgICAgICAgICAgdGFza0lkOnRhc2tJZCxcclxuICAgICAgICAgICAgICAgaWQ6dXNlcklkLFxyXG4gICAgICAgICAgICAgICBvcGVuaWQ6b3BlbmlkXHJcbiAgICAgICAgICAgfSlcclxuICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwJiZyZXMuZGF0YS5pZCl7XHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBUb2FzdChcIumUmeivr1wiKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgIH0sXHJcbiAgICAgICAvL+WPlua2iOS7u+WKoVxyXG4gICAgICAgYXN5bmMgY2FuY2VsVGFzaygpe1xyXG4gICAgICAgICAgbGV0IHJlY2VpdmVJZD10aGlzLnJlY2VpdmVJZDtcclxuICAgICAgICAgIGxldCByZXM9YXdhaXQgIHVwZGF0ZVJlY2VpdmVEZWxldGUoe3JlY2VpdmVJZDpyZWNlaXZlSWR9KTtcclxuICAgICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBUb2FzdChcIumUmeivr1wiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgfSxcclxuICAgICAgIC8v5a6M5oiQ5Lu75YqhXHJcbiAgICAgICBhc3luYyBlbmRUYXNrKCl7XHJcbiAgICAgICAgICBsZXQgcmVjZWl2ZUlkPXRoaXMucmVjZWl2ZUlkO1xyXG4gICAgICAgICAgbGV0IHJlcz1hd2FpdCAgdXBkYXRlUmVjZWl2ZUVuZCh7cmVjZWl2ZUlkOnJlY2VpdmVJZH0pO1xyXG4gICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwJiZyZXMuZGF0YS5pZCl7XHJcbiAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBUb2FzdChcIumUmeivr1wiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgfSxcclxuXHJcbiAgICAgICByZWNlaXZlVGFza1N1Ym1pdChlKXtcclxuICAgICAgICAgdGhpcy5tZXRob2RzLnRlbXBNZXNzYWdlKGUuZGV0YWlsLmZvcm1JZCx0aGlzLnRhc2tkYXRhLmlkLDEpXHJcbiAgICAgICB9LFxyXG4gICAgICAgZW5kVGFza1N1Ym1pdChlKXtcclxuICAgICAgICAgdGhpcy5tZXRob2RzLnRlbXBNZXNzYWdlKGUuZGV0YWlsLmZvcm1JZCx0aGlzLnRhc2tkYXRhLmlkLDIpXHJcbiAgICAgICB9LFxyXG4gICAgICAgY2FuY2VsVGFza1N1Ym1pdChlKXtcclxuICAgICAgICAgIHRoaXMubWV0aG9kcy50ZW1wTWVzc2FnZShlLmRldGFpbC5mb3JtSWQsdGhpcy50YXNrZGF0YS5pZCwzKVxyXG4gICAgICAgfSxcclxuICAgICAgYXN5bmMgdGVtcE1lc3NhZ2UoZm9ybUlkLHRhc2tJZCx0eXBlKXtcclxuICAgICAgICAgbGV0IHJlcz1hd2FpdCBnZXRBY2Vlc3NUb2tlbigpXHJcbiAgICAgICAgIGxldCByZXMxPWF3YWl0IHRlbXBsZXRlTWVzc2VnZSh7Zm9ybUlkOmZvcm1JZCx0YXNrSWQ6dGFza0lkLHR5cGU6dHlwZSx0b2tlbjpyZXMuZGF0YS5hY2Nlc3NfdG9rZW59KVxyXG4gICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19