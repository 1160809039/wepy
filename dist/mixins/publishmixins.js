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
      taskAddr: '',
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
      taskAddrInput: function taskAddrInput(e) {
        this.taskAddr = e.detail.value;
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

                  if (!this.taskAddr) {
                    this.methods.notify("地址描述不能为空");
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
                    _context.next = 33;
                    break;
                  }

                  school = _wepy2.default.getStorageSync(_common.SCHOOL);
                  openid = _wepy2.default.getStorageSync(_common.OPENID);
                  param = {};

                  param.taskName = this.taskName;
                  param.taskWeight = this.taskWeight;
                  param.taskAddr = this.taskAddr;
                  param.taskPrice = this.taskPrice;
                  param.schoolId = school.id;
                  param.openid = openid;
                  param.addressId = this.addressId;
                  param.consigneeName = this.consigneeName;
                  param.consigneeMobile = this.consigneeMobile;

                  if (!this.id) {
                    _context.next = 29;
                    break;
                  }

                  param.id = this.id;
                  _context.next = 24;
                  return (0, _task.updateTask)(param);

                case 24:
                  res = _context.sent;

                  console.log(res);
                  if (res.statusCode === 200 && res.data.id) {
                    _wepy2.default.navigateBack();
                  } else {
                    this.methods.notify("更改失败");
                  }

                  _context.next = 33;
                  break;

                case 29:
                  _context.next = 31;
                  return (0, _task.saveTask)(param);

                case 31:
                  _res = _context.sent;


                  if (_res.statusCode === 200 && _res.data.id) {
                    _wepy2.default.switchTab({
                      url: "/pages/index/index"
                    });
                  } else {
                    this.methods.notify("发布失败");
                  }

                case 33:
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
                  this.taskAddr = _res2.data.task_addr;
                  this.taskPrice = _res2.data.task_price;
                  this.addressId = _res2.data.address_id;
                  this.consigneeName = _res2.data.consignee_name;
                  this.consigneeMobile = _res2.data.consignee_mobile;
                  this.address = _res2.data.specific_address;
                  this.$apply();

                  console.log(this.taskAddr);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2htaXhpbnMuanMiXSwibmFtZXMiOlsicHVibGlzaE1peGluIiwiZGF0YSIsImFkZHJlc3MiLCJhZGRyZXNzSWQiLCJ0YXNrTmFtZSIsInRhc2tXZWlnaHQiLCJ0YXNrUHJpY2UiLCJ0YXNrQWRkciIsImNvbnNpZ25lZU5hbWUiLCJjb25zaWduZWVNb2JpbGUiLCJpZCIsIm1ldGhvZHMiLCJ0b0FkcmVzc0xpc3QiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsInRhc2tOYW1lSW5wdXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJ0YXNrV2VpZ2h0SW5wdXQiLCJ0YXNrUHJpY2VJbnB1dCIsImNvbnNpZ25lZU5hbWVJbnB1dCIsInRhc2tBZGRySW5wdXQiLCJjb25zaWduZWVNb2JpbGVJbnB1dCIsInNhdmUiLCJzdWNjZXNzIiwibm90aWZ5IiwidGVzdCIsInNjaG9vbCIsImdldFN0b3JhZ2VTeW5jIiwiU0NIT09MIiwib3BlbmlkIiwiT1BFTklEIiwicGFyYW0iLCJzY2hvb2xJZCIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXNDb2RlIiwibmF2aWdhdGVCYWNrIiwic3dpdGNoVGFiIiwib3B0aW9ucyIsIiRzdG9yZSIsImRpc3BhdGNoIiwidHlwZSIsIlNFVEFERFJFU1MiLCJwYXlsb2FkIiwiJGFwcGx5IiwiZ2V0U3RhdGUiLCJjb21tb24iLCJzcGVjaWZpY19hZGRyZXNzIiwiY29uc2lnbmVlX25hbWUiLCJjb25zaWduZWVfbW9iaWxlIiwidGFza0lkIiwidGFza19uYW1lIiwidGFza193ZWlnaHQiLCJ0YXNrX2FkZHIiLCJ0YXNrX3ByaWNlIiwiYWRkcmVzc19pZCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiaGlkZUxvYWRpbmciLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFFakJDLEksR0FB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LENBQVNTLEVBQWxDLEVBQXFDO0FBQ2pDLHVCQUFLUixPQUFMLEdBQWFrQyxNQUFJbkMsSUFBSixDQUFTa0QsZ0JBQXRCO0FBQ0EsdUJBQUtoRCxTQUFMLEdBQWVpQyxNQUFJbkMsSUFBSixDQUFTUyxFQUF4QjtBQUNBLHVCQUFLRixhQUFMLEdBQW1CNEIsTUFBSW5DLElBQUosQ0FBU21ELGNBQTVCO0FBQ0EsdUJBQUszQyxlQUFMLEdBQXFCMkIsTUFBSW5DLElBQUosQ0FBU29ELGdCQUE5QjtBQUNBLHVCQUFLTCxNQUFMO0FBQ0FuQyxpQ0FBS2tELFdBQUw7QUFDQyxpQkFQTCxNQU9TO0FBQ0YsdUJBQUs3RCxPQUFMLEdBQWEsS0FBYjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMUwyQlcsZUFBS21ELEs7O2tCQUExQmhFLFkiLCJmaWxlIjoicHVibGlzaG1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7c2VsZWN0RGVmYXVsdCxzZWxlY3RBZGRyZXNzfSBmcm9tICcuLi9hcGkvYWRkcmVzcydcclxuaW1wb3J0IHtzYXZlVGFzayx1cGRhdGVUYXNrLGdldFRhc2tCeUlkfSBmcm9tICcuLi9hcGkvdGFzaydcclxuaW1wb3J0IHtPUEVOSUQsU0NIT09MfSBmcm9tICcuLi9jb25maWcvY29tbW9uJ1xyXG5pbXBvcnQge1NFVEFERFJFU1N9IGZyb20gJy4uL3N0b3JlL3R5cGVzL2luZGV4J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwdWJsaXNoTWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcclxuICBcclxuICAgIGRhdGE9e1xyXG4gICAgICAgIGFkZHJlc3M6JycsXHJcbiAgICAgICAgYWRkcmVzc0lkOjAsXHJcbiAgICAgICAgdGFza05hbWU6JycsXHJcbiAgICAgICAgdGFza1dlaWdodDonMScsXHJcbiAgICAgICAgdGFza1ByaWNlOicxJyxcclxuICAgICAgICB0YXNrQWRkcjonJyxcclxuICAgICAgICBjb25zaWduZWVOYW1lOicnLFxyXG4gICAgICAgIGNvbnNpZ25lZU1vYmlsZTonJyxcclxuICAgICAgICBpZDonJ1xyXG4gICAgICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRvQWRyZXNzTGlzdCgpe1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6Jy9wYWdlcy9hZGRyZXNzL2xpc3QvbGlzdD90eXBlPWNoYW5nZSdcclxuICAgICAgICB9KVxyXG4gICAgIH0sXHJcbiAgICAgdGFza05hbWVJbnB1dChlKXtcclxuICAgICAgICB0aGlzLnRhc2tOYW1lPWUuZGV0YWlsLnZhbHVlO1xyXG4gICAgIH0sXHJcbiAgICAgIHRhc2tXZWlnaHRJbnB1dChlKXtcclxuICAgICAgICAgdGhpcy50YXNrV2VpZ2h0PWUuZGV0YWlsLnZhbHVlO1xyXG4gICAgIH0sXHJcbiAgICAgIHRhc2tQcmljZUlucHV0KGUpe1xyXG4gICAgICAgIHRoaXMudGFza1ByaWNlPWUuZGV0YWlsLnZhbHVlO1xyXG4gICAgIH0sXHJcbiAgICAgIGNvbnNpZ25lZU5hbWVJbnB1dChlKXtcclxuICAgICAgICB0aGlzLmNvbnNpZ25lZU5hbWU9ZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgfSxcclxuICAgICB0YXNrQWRkcklucHV0KGUpe1xyXG4gICAgICB0aGlzLnRhc2tBZGRyPWUuZGV0YWlsLnZhbHVlO1xyXG4gICAgIH0sXHJcbiAgICAgIGNvbnNpZ25lZU1vYmlsZUlucHV0KGUpe1xyXG4gICAgICAgIHRoaXMuY29uc2lnbmVlTW9iaWxlPWUuZGV0YWlsLnZhbHVlO1xyXG4gICAgIH0sXHJcbiAgICBhc3luYyBzYXZlKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHN1Y2Nlc3M9dHJ1ZTtcclxuICAgICAgICBpZighdGhpcy50YXNrTmFtZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMubm90aWZ5KFwi5b+r6YCS5ZCN56ew5LiN6IO95Li656m6XCIpXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M9IGZhbHNlO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoaXMudGFza1ByaWNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLku7fmoLzkuI3og73kuLrnqbpcIilcclxuICAgICAgICAgICAgICBzdWNjZXNzPSBmYWxzZTtcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgaWYoISgvXlxcZCtcXC4/KFxcZCspPyQvLnRlc3QodGhpcy50YXNrUHJpY2UpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMubm90aWZ5KFwi5Lu35qC85qC85byP5LiN5q2j56GuXCIpXHJcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhpcy50YXNrV2VpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLph43ph4/kuI3og73kuLrnqbpcIilcclxuICAgICAgICAgICAgICBzdWNjZXNzPSBmYWxzZTtcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgaWYoISgvXlxcZCtcXC4/KFxcZCspPyQvLnRlc3QodGhpcy50YXNrV2VpZ2h0KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLm5vdGlmeShcIumHjemHj+agvOW8j+S4jeato+ehrlwiKVxyXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoaXMuY29uc2lnbmVlTmFtZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMubm90aWZ5KFwi5pS26LSn5Lq65LiN6IO95Li656m6XCIpXHJcbiAgICAgICAgICAgICAgc3VjY2Vzcz0gZmFsc2U7XHJcbiAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICBpZighdGhpcy50YXNrQWRkcil7XHJcbiAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLlnLDlnYDmj4/ov7DkuI3og73kuLrnqbpcIilcclxuICAgICAgICAgICAgc3VjY2Vzcz0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoaXMuY29uc2lnbmVlTW9iaWxlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLmlLbotKfkurrmiYvmnLrlj7fkuI3og73kuLrnqbpcIilcclxuICAgICAgICAgICAgICBzdWNjZXNzPSBmYWxzZTtcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgaWYoISgvXjFbM3w0fDV8OF1bMC05XVxcZHs0LDh9JC8udGVzdCh0aGlzLmNvbnNpZ25lZU1vYmlsZSkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLmiYvmnLrlj7fmoLzlvI/kuI3mraPnoa5cIilcclxuICAgICAgICAgICAgICAgICAgc3VjY2Vzcz0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBpZihzdWNjZXNzKXtcclxuICAgICAgICAgICAgICBsZXQgc2Nob29sPXdlcHkuZ2V0U3RvcmFnZVN5bmMoU0NIT09MKTtcclxuICAgICAgICAgICAgICAgbGV0IG9wZW5pZD13ZXB5LmdldFN0b3JhZ2VTeW5jKE9QRU5JRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBsZXQgcGFyYW09e307XHJcbiAgICAgICAgICAgICAgICAgIHBhcmFtLnRhc2tOYW1lPXRoaXMudGFza05hbWU7XHJcbiAgICAgICAgICAgICAgICAgIHBhcmFtLnRhc2tXZWlnaHQ9dGhpcy50YXNrV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICBwYXJhbS50YXNrQWRkcj10aGlzLnRhc2tBZGRyO1xyXG4gICAgICAgICAgICAgICAgICBwYXJhbS50YXNrUHJpY2U9dGhpcy50YXNrUHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgIHBhcmFtLnNjaG9vbElkPXNjaG9vbC5pZDtcclxuICAgICAgICAgICAgICAgICAgcGFyYW0ub3BlbmlkPW9wZW5pZDtcclxuICAgICAgICAgICAgICAgICAgcGFyYW0uYWRkcmVzc0lkPXRoaXMuYWRkcmVzc0lkO1xyXG4gICAgICAgICAgICAgICAgICBwYXJhbS5jb25zaWduZWVOYW1lPXRoaXMuY29uc2lnbmVlTmFtZTtcclxuICAgICAgICAgICAgICAgICAgcGFyYW0uY29uc2lnbmVlTW9iaWxlPXRoaXMuY29uc2lnbmVlTW9iaWxlO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBpZih0aGlzLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5pZD10aGlzLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXM9YXdhaXQgdXBkYXRlVGFzayhwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwJiZyZXMuZGF0YS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMubm90aWZ5KFwi5pu05pS55aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzPWF3YWl0IHNhdmVUYXNrKHBhcmFtKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHVybDpcIi9wYWdlcy9pbmRleC9pbmRleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5ub3RpZnkoXCLlj5HluIPlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpe1xyXG4gICAgLy/muIXnqbrku6XliY3lj6/og73pgInmi6nov4fnmoRhZGRyZXNzaWRcclxuICAgd2VweS4kc3RvcmUuZGlzcGF0Y2goe3R5cGU6U0VUQUREUkVTUyxwYXlsb2FkOjB9KVxyXG4gICAgXHJcblxyXG4gICAgbGV0IGlkPW9wdGlvbnMuaWQ7XHJcbiAgICBpZihpZCl7XHJcbiAgICAgICB0aGlzLmlkPWlkO1xyXG4gICAgfVxyXG4gICBcclxuICBcclxufVxyXG5cclxuYXN5bmMgb25TaG93KCl7XHJcblxyXG4gdGhpcy4kYXBwbHkoKTtcclxubGV0IGFkZHJlc3NJZD13ZXB5LiRzdG9yZS5nZXRTdGF0ZSgpLmNvbW1vbi5hZGRyZXNzO1xyXG5pZihhZGRyZXNzSWQpe1xyXG4gICAgIGxldCByZXM9YXdhaXQgc2VsZWN0QWRkcmVzcyh7aWQ6YWRkcmVzc0lkfSk7XHJcbiAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICB0aGlzLmFkZHJlc3M9cmVzLmRhdGEuc3BlY2lmaWNfYWRkcmVzcztcclxuICAgICAgICB0aGlzLmFkZHJlc3NJZD1yZXMuZGF0YS5pZDtcclxuICAgICAgICAgdGhpcy5jb25zaWduZWVOYW1lPXJlcy5kYXRhLmNvbnNpZ25lZV9uYW1lO1xyXG4gICAgICAgIHRoaXMuY29uc2lnbmVlTW9iaWxlPXJlcy5kYXRhLmNvbnNpZ25lZV9tb2JpbGU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICB9XHJcbiB9ZWxzZXtcclxuICAgIGlmKHRoaXMuaWQpe1xyXG4gICAgICAgICAvL+aYvuekuumAieaLqeWQjuWcsOWdgFxyXG4gICAgICAgIGxldCByZXM9YXdhaXQgZ2V0VGFza0J5SWQoe3Rhc2tJZDp0aGlzLmlkfSk7XHJcbiAgIFxyXG4gICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy50YXNrTmFtZT1yZXMuZGF0YS50YXNrX25hbWU7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1dlaWdodD1yZXMuZGF0YS50YXNrX3dlaWdodDtcclxuICAgICAgICAgICAgdGhpcy50YXNrQWRkcj1yZXMuZGF0YS50YXNrX2FkZHI7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1ByaWNlPXJlcy5kYXRhLnRhc2tfcHJpY2U7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc0lkPXJlcy5kYXRhLmFkZHJlc3NfaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2lnbmVlTmFtZT1yZXMuZGF0YS5jb25zaWduZWVfbmFtZTtcclxuICAgICAgICAgICAgIHRoaXMuY29uc2lnbmVlTW9iaWxlPXJlcy5kYXRhLmNvbnNpZ25lZV9tb2JpbGU7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcz1yZXMuZGF0YS5zcGVjaWZpY19hZGRyZXNzO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGFza0FkZHIpXHJcbiAgICAgfVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgLy/mmL7npLrpu5jorqTlnLDlnYBcclxuICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTon5Yqg6L295LitJyxcclxuICAgICAgICAgICAgbWFzazp0cnVlXHJcbiAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIGxldCBvcGVuaWQ9d2VweS5nZXRTdG9yYWdlU3luYyhPUEVOSUQpO1xyXG4gICAgICAgICAgICAgbGV0IHJlcz1hd2FpdCBzZWxlY3REZWZhdWx0KHtvcGVuaWQ6b3BlbmlkfSk7XHJcbiAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzPXJlcy5kYXRhLnNwZWNpZmljX2FkZHJlc3M7XHJcbiAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzc0lkPXJlcy5kYXRhLmlkO1xyXG4gICAgICAgICAgICAgICB0aGlzLmNvbnNpZ25lZU5hbWU9cmVzLmRhdGEuY29uc2lnbmVlX25hbWU7XHJcbiAgICAgICAgICAgICAgIHRoaXMuY29uc2lnbmVlTW9iaWxlPXJlcy5kYXRhLmNvbnNpZ25lZV9tb2JpbGU7XHJcbiAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzPSfor7fpgInmi6knXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuIH1cclxuXHJcbn1cclxuXHJcblxyXG59XHJcbiJdfQ==