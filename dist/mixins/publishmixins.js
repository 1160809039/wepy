'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _address = require('./../api/address.js');

var _task = require('./../api/task.js');

var _common = require('./../config/common.js');

var _index = require('./../store/types/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var publishMixin = function (_wepy$mixin) {
  _inherits(publishMixin, _wepy$mixin);

  function publishMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, publishMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = publishMixin.__proto__ || Object.getPrototypeOf(publishMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      address: '',
      addressId: 0,
      taskName: '',
      taskWeight: '1',
      taskPrice: '1',
      consigneeName: '',
      consigneeMobile: '',
      id: ''
    }, _this.methods = {
      toAdressList: function toAdressList() {
        _wepy2.default.navigateTo({
          url: '/pages/address/list/list?type=change'
        });
      },
      taskNameInput: function taskNameInput(e) {
        this.taskName = e.detail.value;
      },
      taskWeightInput: function taskWeightInput(e) {
        this.taskWeight = e.detail.value;
      },
      taskPriceInput: function taskPriceInput(e) {
        this.taskPrice = e.detail.value;
      },
      consigneeNameInput: function consigneeNameInput(e) {
        this.consigneeName = e.detail.value;
      },
      consigneeMobileInput: function consigneeMobileInput(e) {
        this.consigneeMobile = e.detail.value;
      },
      save: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var success, school, openid, param, res, _res;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  success = true;

                  if (!this.taskName) {

                    this.methods.notify("快递名称不能为空");
                    success = false;
                  }
                  if (!this.taskPrice) {
                    this.methods.notify("价格不能为空");
                    success = false;
                  } else {
                    if (!/^\d+\.?(\d+)?$/.test(this.taskPrice)) {
                      this.methods.notify("价格格式不正确");
                      success = false;
                    }
                  }
                  if (!this.taskWeight) {
                    this.methods.notify("重量不能为空");
                    success = false;
                  } else {
                    if (!/^\d+\.?(\d+)?$/.test(this.taskWeight)) {
                      this.methods.notify("重量格式不正确");
                      success = false;
                    }
                  }
                  if (!this.consigneeName) {
                    this.methods.notify("收货人不能为空");
                    success = false;
                  }
                  if (!this.consigneeMobile) {
                    this.methods.notify("收货人手机号不能为空");
                    success = false;
                  } else {
                    if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.consigneeMobile)) {
                      this.methods.notify("手机号格式不正确");
                      success = false;
                    }
                  }

                  if (!success) {
                    _context.next = 31;
                    break;
                  }

                  school = _wepy2.default.getStorageSync(_common.SCHOOL);
                  openid = _wepy2.default.getStorageSync(_common.OPENID);
                  param = {};

                  param.taskName = this.taskName;
                  param.taskWeight = this.taskWeight;
                  param.taskPrice = this.taskPrice;
                  param.schoolId = school.id;
                  param.openid = openid;
                  param.addressId = this.addressId;
                  param.consigneeName = this.consigneeName;
                  param.consigneeMobile = this.consigneeMobile;

                  if (!this.id) {
                    _context.next = 27;
                    break;
                  }

                  param.id = this.id;
                  _context.next = 22;
                  return (0, _task.updateTask)(param);

                case 22:
                  res = _context.sent;

                  console.log(res);
                  if (res.statusCode === 200 && res.data.id) {
                    _wepy2.default.navigateBack();
                  } else {
                    this.methods.notify("发布失败");
                  }

                  _context.next = 31;
                  break;

                case 27:
                  _context.next = 29;
                  return (0, _task.saveTask)(param);

                case 29:
                  _res = _context.sent;


                  if (_res.statusCode === 200 && _res.data.id) {
                    _wepy2.default.switchTab({
                      url: "/pages/index/index"
                    });
                  } else {
                    this.methods.notify("发布失败");
                  }

                case 31:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function save() {
          return _ref2.apply(this, arguments);
        }

        return save;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(publishMixin, [{
    key: 'onLoad',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var id;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //清空以前可能选择过的addressid
                _wepy2.default.$store.dispatch({ type: _index.SETADDRESS, payload: 0 });

                id = options.id;

                if (id) {
                  this.id = id;
                }

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onLoad(_x) {
        return _ref3.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onShow',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var addressId, res, _res2, openid, _res3;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:

                this.$apply();
                addressId = _wepy2.default.$store.getState().common.address;

                if (!addressId) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 5;
                return (0, _address.selectAddress)({ id: addressId });

              case 5:
                res = _context3.sent;

                if (res.statusCode === 200 && res.data.id) {
                  this.address = res.data.specific_address;
                  this.addressId = res.data.id;
                  this.consigneeName = res.data.consignee_name;
                  this.consigneeMobile = res.data.consignee_mobile;
                  this.$apply();
                }
                _context3.next = 22;
                break;

              case 9:
                if (!this.id) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 12;
                return (0, _task.getTaskById)({ taskId: this.id });

              case 12:
                _res2 = _context3.sent;


                if (_res2.statusCode === 200 && _res2.data.id) {
                  this.taskName = _res2.data.task_name;
                  this.taskWeight = _res2.data.task_weight;
                  this.taskPrice = _res2.data.task_price;
                  this.addressId = _res2.data.address_id;
                  this.consigneeName = _res2.data.consignee_name;
                  this.consigneeMobile = _res2.data.consignee_mobile;
                  this.address = _res2.data.specific_address;
                  this.$apply();
                  console.log("onLoad");
                  console.log(this.addressId);
                }
                _context3.next = 22;
                break;

              case 16:
                //显示默认地址
                _wepy2.default.showLoading({
                  title: '加载中',
                  mask: true
                });
                openid = _wepy2.default.getStorageSync(_common.OPENID);
                _context3.next = 20;
                return (0, _address.selectDefault)({ openid: openid });

              case 20:
                _res3 = _context3.sent;

                if (_res3.statusCode === 200 && _res3.data.id) {
                  this.address = _res3.data.specific_address;
                  this.addressId = _res3.data.id;
                  this.consigneeName = _res3.data.consignee_name;
                  this.consigneeMobile = _res3.data.consignee_mobile;
                  this.$apply();
                  _wepy2.default.hideLoading();
                } else {
                  this.address = '请选择';
                }

              case 22:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onShow() {
        return _ref4.apply(this, arguments);
      }

      return onShow;
    }()
  }]);

  return publishMixin;
}(_wepy2.default.mixin);

exports.default = publishMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2htaXhpbnMuanMiXSwibmFtZXMiOlsicHVibGlzaE1peGluIiwiZGF0YSIsImFkZHJlc3MiLCJhZGRyZXNzSWQiLCJ0YXNrTmFtZSIsInRhc2tXZWlnaHQiLCJ0YXNrUHJpY2UiLCJjb25zaWduZWVOYW1lIiwiY29uc2lnbmVlTW9iaWxlIiwiaWQiLCJtZXRob2RzIiwidG9BZHJlc3NMaXN0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0YXNrTmFtZUlucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwidGFza1dlaWdodElucHV0IiwidGFza1ByaWNlSW5wdXQiLCJjb25zaWduZWVOYW1lSW5wdXQiLCJjb25zaWduZWVNb2JpbGVJbnB1dCIsInNhdmUiLCJzdWNjZXNzIiwibm90aWZ5IiwidGVzdCIsInNjaG9vbCIsImdldFN0b3JhZ2VTeW5jIiwiU0NIT09MIiwib3BlbmlkIiwiT1BFTklEIiwicGFyYW0iLCJzY2hvb2xJZCIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXNDb2RlIiwibmF2aWdhdGVCYWNrIiwic3dpdGNoVGFiIiwib3B0aW9ucyIsIiRzdG9yZSIsImRpc3BhdGNoIiwidHlwZSIsIlNFVEFERFJFU1MiLCJwYXlsb2FkIiwiJGFwcGx5IiwiZ2V0U3RhdGUiLCJjb21tb24iLCJzcGVjaWZpY19hZGRyZXNzIiwiY29uc2lnbmVlX25hbWUiLCJjb25zaWduZWVfbW9iaWxlIiwidGFza0lkIiwidGFza19uYW1lIiwidGFza193ZWlnaHQiLCJ0YXNrX3ByaWNlIiwiYWRkcmVzc19pZCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiaGlkZUxvYWRpbmciLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFFakJDLEksR0FBSztBQUNEQyxlQUFRLEVBRFA7QUFFREMsaUJBQVUsQ0FGVDtBQUdE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Ozs7Ozs7OztFQTlLMkJVLGVBQUtpRCxLOztrQkFBMUI3RCxZIiwiZmlsZSI6InB1Ymxpc2htaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQge3NlbGVjdERlZmF1bHQsc2VsZWN0QWRkcmVzc30gZnJvbSAnLi4vYXBpL2FkZHJlc3MnXHJcbmltcG9ydCB7c2F2ZVRhc2ssdXBkYXRlVGFzayxnZXRUYXNrQnlJZH0gZnJvbSAnLi4vYXBpL3Rhc2snXHJcbmltcG9ydCB7T1BFTklELFNDSE9PTH0gZnJvbSAnLi4vY29uZmlnL2NvbW1vbidcclxuaW1wb3J0IHtTRVRBRERSRVNTfSBmcm9tICcuLi9zdG9yZS90eXBlcy9pbmRleCdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcHVibGlzaE1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XHJcbiAgXHJcbiAgICBkYXRhPXtcclxuICAgICAgICBhZGRyZXNzOicnLFxyXG4gICAgICAgIGFkZHJlc3NJZDowLFxyXG4gICAgICAgIHRhc2tOYW1lOicnLFxyXG4gICAgICAgIHRhc2tXZWlnaHQ6JzEnLFxyXG4gICAgICAgIHRhc2tQcmljZTonMScsXHJcbiAgICAgICAgY29uc2lnbmVlTmFtZTonJyxcclxuICAgICAgICBjb25zaWduZWVNb2JpbGU6JycsXHJcbiAgICAgICAgaWQ6JydcclxuICAgICAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICB0b0FkcmVzc0xpc3QoKXtcclxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOicvcGFnZXMvYWRkcmVzcy9saXN0L2xpc3Q/dHlwZT1jaGFuZ2UnXHJcbiAgICAgICAgfSlcclxuICAgICB9LFxyXG4gICAgIHRhc2tOYW1lSW5wdXQoZSl7XHJcbiAgICAgICAgdGhpcy50YXNrTmFtZT1lLmRldGFpbC52YWx1ZTtcclxuICAgICB9LFxyXG4gICAgICB0YXNrV2VpZ2h0SW5wdXQoZSl7XHJcbiAgICAgICAgIHRoaXMudGFza1dlaWdodD1lLmRldGFpbC52YWx1ZTtcclxuICAgICB9LFxyXG4gICAgICB0YXNrUHJpY2VJbnB1dChlKXtcclxuICAgICAgICB0aGlzLnRhc2tQcmljZT1lLmRldGFpbC52YWx1ZTtcclxuICAgICB9LFxyXG4gICAgICBjb25zaWduZWVOYW1lSW5wdXQoZSl7XHJcbiAgICAgICAgdGhpcy5jb25zaWduZWVOYW1lPWUuZGV0YWlsLnZhbHVlO1xyXG4gICAgIH0sXHJcbiAgICAgIGNvbnNpZ25lZU1vYmlsZUlucHV0KGUpe1xyXG4gICAgICAgIHRoaXMuY29uc2lnbmVlTW9iaWxlPWUuZGV0YWlsLnZhbHVlO1xyXG4gICAgIH0sXHJcbiAgICBhc3luYyBzYXZlKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHN1Y2Nlc3M9dHJ1ZTtcclxuICAgICAgICBpZighdGhpcy50YXNrTmFtZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMubm90aWZ5KFwi5b+r6YCS5ZCN56ew5LiN6IO95Li656m6XCIpXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M9IGZhbHNlO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoaXMudGFza1ByaWNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLku7fmoLzkuI3og73kuLrnqbpcIilcclxuICAgICAgICAgICAgICBzdWNjZXNzPSBmYWxzZTtcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgaWYoISgvXlxcZCtcXC4/KFxcZCspPyQvLnRlc3QodGhpcy50YXNrUHJpY2UpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMubm90aWZ5KFwi5Lu35qC85qC85byP5LiN5q2j56GuXCIpXHJcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhpcy50YXNrV2VpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLph43ph4/kuI3og73kuLrnqbpcIilcclxuICAgICAgICAgICAgICBzdWNjZXNzPSBmYWxzZTtcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgaWYoISgvXlxcZCtcXC4/KFxcZCspPyQvLnRlc3QodGhpcy50YXNrV2VpZ2h0KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLm5vdGlmeShcIumHjemHj+agvOW8j+S4jeato+ehrlwiKVxyXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoaXMuY29uc2lnbmVlTmFtZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMubm90aWZ5KFwi5pS26LSn5Lq65LiN6IO95Li656m6XCIpXHJcbiAgICAgICAgICAgICAgc3VjY2Vzcz0gZmFsc2U7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhpcy5jb25zaWduZWVNb2JpbGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLm5vdGlmeShcIuaUtui0p+S6uuaJi+acuuWPt+S4jeiDveS4uuepulwiKVxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M9IGZhbHNlO1xyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICBpZighKC9eMVszfDR8NXw4XVswLTldXFxkezQsOH0kLy50ZXN0KHRoaXMuY29uc2lnbmVlTW9iaWxlKSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLm5vdGlmeShcIuaJi+acuuWPt+agvOW8j+S4jeato+ehrlwiKVxyXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgIGlmKHN1Y2Nlc3Mpe1xyXG4gICAgICAgICAgICAgIGxldCBzY2hvb2w9d2VweS5nZXRTdG9yYWdlU3luYyhTQ0hPT0wpO1xyXG4gICAgICAgICAgICAgICBsZXQgb3BlbmlkPXdlcHkuZ2V0U3RvcmFnZVN5bmMoT1BFTklEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGxldCBwYXJhbT17fTtcclxuICAgICAgICAgICAgICAgICAgcGFyYW0udGFza05hbWU9dGhpcy50YXNrTmFtZTtcclxuICAgICAgICAgICAgICAgICAgcGFyYW0udGFza1dlaWdodD10aGlzLnRhc2tXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgIHBhcmFtLnRhc2tQcmljZT10aGlzLnRhc2tQcmljZTtcclxuICAgICAgICAgICAgICAgICAgcGFyYW0uc2Nob29sSWQ9c2Nob29sLmlkO1xyXG4gICAgICAgICAgICAgICAgICBwYXJhbS5vcGVuaWQ9b3BlbmlkO1xyXG4gICAgICAgICAgICAgICAgICBwYXJhbS5hZGRyZXNzSWQ9dGhpcy5hZGRyZXNzSWQ7XHJcbiAgICAgICAgICAgICAgICAgIHBhcmFtLmNvbnNpZ25lZU5hbWU9dGhpcy5jb25zaWduZWVOYW1lO1xyXG4gICAgICAgICAgICAgICAgICBwYXJhbS5jb25zaWduZWVNb2JpbGU9dGhpcy5jb25zaWduZWVNb2JpbGU7XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmlkPXRoaXMuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcz1hd2FpdCB1cGRhdGVUYXNrKHBhcmFtKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLlj5HluIPlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXM9YXdhaXQgc2F2ZVRhc2socGFyYW0pO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwJiZyZXMuZGF0YS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdXJsOlwiL3BhZ2VzL2luZGV4L2luZGV4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLm5vdGlmeShcIuWPkeW4g+Wksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuICB9XHJcblxyXG5cclxuICBhc3luYyBvbkxvYWQob3B0aW9ucyl7XHJcbiAgICAvL+a4heepuuS7peWJjeWPr+iDvemAieaLqei/h+eahGFkZHJlc3NpZFxyXG4gICB3ZXB5LiRzdG9yZS5kaXNwYXRjaCh7dHlwZTpTRVRBRERSRVNTLHBheWxvYWQ6MH0pXHJcbiAgICBcclxuXHJcbiAgICBsZXQgaWQ9b3B0aW9ucy5pZDtcclxuICAgIGlmKGlkKXtcclxuICAgICAgIHRoaXMuaWQ9aWQ7XHJcbiAgICB9XHJcbiAgIFxyXG4gIFxyXG59XHJcblxyXG5hc3luYyBvblNob3coKXtcclxuXHJcbiB0aGlzLiRhcHBseSgpO1xyXG5sZXQgYWRkcmVzc0lkPXdlcHkuJHN0b3JlLmdldFN0YXRlKCkuY29tbW9uLmFkZHJlc3M7XHJcbmlmKGFkZHJlc3NJZCl7XHJcbiAgICAgbGV0IHJlcz1hd2FpdCBzZWxlY3RBZGRyZXNzKHtpZDphZGRyZXNzSWR9KTtcclxuICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgIHRoaXMuYWRkcmVzcz1yZXMuZGF0YS5zcGVjaWZpY19hZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzc0lkPXJlcy5kYXRhLmlkO1xyXG4gICAgICAgICB0aGlzLmNvbnNpZ25lZU5hbWU9cmVzLmRhdGEuY29uc2lnbmVlX25hbWU7XHJcbiAgICAgICAgdGhpcy5jb25zaWduZWVNb2JpbGU9cmVzLmRhdGEuY29uc2lnbmVlX21vYmlsZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgIH1cclxuIH1lbHNle1xyXG4gICAgaWYodGhpcy5pZCl7XHJcbiAgICAgICAgIC8v5pi+56S66YCJ5oup5ZCO5Zyw5Z2AXHJcbiAgICAgICAgbGV0IHJlcz1hd2FpdCBnZXRUYXNrQnlJZCh7dGFza0lkOnRoaXMuaWR9KTtcclxuICAgXHJcbiAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tOYW1lPXJlcy5kYXRhLnRhc2tfbmFtZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrV2VpZ2h0PXJlcy5kYXRhLnRhc2tfd2VpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tQcmljZT1yZXMuZGF0YS50YXNrX3ByaWNlO1xyXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3NJZD1yZXMuZGF0YS5hZGRyZXNzX2lkO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNpZ25lZU5hbWU9cmVzLmRhdGEuY29uc2lnbmVlX25hbWU7XHJcbiAgICAgICAgICAgICB0aGlzLmNvbnNpZ25lZU1vYmlsZT1yZXMuZGF0YS5jb25zaWduZWVfbW9iaWxlO1xyXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3M9cmVzLmRhdGEuc3BlY2lmaWNfYWRkcmVzcztcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25Mb2FkXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWRkcmVzc0lkKVxyXG4gICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICAgIC8v5pi+56S66buY6K6k5Zyw5Z2AXHJcbiAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6J+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgIG1hc2s6dHJ1ZVxyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgICBsZXQgb3BlbmlkPXdlcHkuZ2V0U3RvcmFnZVN5bmMoT1BFTklEKTtcclxuICAgICAgICAgICAgIGxldCByZXM9YXdhaXQgc2VsZWN0RGVmYXVsdCh7b3BlbmlkOm9wZW5pZH0pO1xyXG4gICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwJiZyZXMuZGF0YS5pZCl7XHJcbiAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzcz1yZXMuZGF0YS5zcGVjaWZpY19hZGRyZXNzO1xyXG4gICAgICAgICAgICAgICB0aGlzLmFkZHJlc3NJZD1yZXMuZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgdGhpcy5jb25zaWduZWVOYW1lPXJlcy5kYXRhLmNvbnNpZ25lZV9uYW1lO1xyXG4gICAgICAgICAgICAgICB0aGlzLmNvbnNpZ25lZU1vYmlsZT1yZXMuZGF0YS5jb25zaWduZWVfbW9iaWxlO1xyXG4gICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzcz0n6K+36YCJ5oupJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiB9XHJcblxyXG59XHJcblxyXG5cclxufVxyXG4iXX0=