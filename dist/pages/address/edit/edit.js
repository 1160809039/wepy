'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../../../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _address = require('./../../../api/address.js');

var _notify = require('./../../../miniprogram_npm/vant-weapp/notify/notify.js');

var _notify2 = _interopRequireDefault(_notify);

var _common = require('./../../../config/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddressEdit = function (_wepy$page) {
  _inherits(AddressEdit, _wepy$page);

  function AddressEdit() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddressEdit);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddressEdit.__proto__ || Object.getPrototypeOf(AddressEdit)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "usingComponents": {
        "van-button": "/miniprogram_npm/vant-weapp/button/index",
        "van-switch": "/miniprogram_npm/vant-weapp/switch/index",
        "van-notify": "/miniprogram_npm/vant-weapp/notify/index"
      }

    }, _this.data = {
      checked: true,
      consigneeName: "",
      mobile: "",
      isdefault: "0",
      branchcourts: "",
      departmentname: "",
      specificaddress: "",
      id: 0
    }, _this.methods = {
      save: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var success, param, openid, res, _res;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  success = this.methods.validata(this);

                  if (!success) {
                    _context.next = 23;
                    break;
                  }

                  param = {};

                  param.consigneeName = this.consigneeName;
                  param.mobile = this.mobile;
                  param.isdefault = this.isdefault;
                  param.branchcourts = this.branchcourts;
                  param.departmentname = this.departmentname;
                  param.specificaddress = this.specificaddress;
                  openid = _wepy2.default.getStorageSync(_common.OPENID);

                  param.openid = openid;
                  //有id是编辑，没有的是保存

                  if (!this.id) {
                    _context.next = 19;
                    break;
                  }

                  param.id = this.id;
                  _context.next = 15;
                  return (0, _address.editAddress)(param);

                case 15:
                  res = _context.sent;

                  if (res.statusCode === 200 && res.data.id) {

                    _wepy2.default.navigateBack();
                  } else {
                    this.methods.notify("保存失败，请重试!!!");
                  }
                  _context.next = 23;
                  break;

                case 19:
                  _context.next = 21;
                  return (0, _address.saveAddress)(param);

                case 21:
                  _res = _context.sent;

                  if (_res.statusCode === 200 && _res.data.id) {

                    _wepy2.default.navigateBack();
                  } else {
                    this.methods.notify("保存失败，请重试!!!");
                  }

                case 23:
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
      }(),
      onChange: function onChange(event) {
        // 需要手动对 checked 状态进行更新
        this.checked = event.detail;
        if (this.checked) {
          this.isdefault = "0";
        } else {
          this.isdefault = "1";
        }
      },
      consigneeNameInput: function consigneeNameInput(e) {

        this.consigneeName = e.detail.value;
      },
      mobileInput: function mobileInput(e) {
        this.mobile = e.detail.value;
      },
      branchcourtsInput: function branchcourtsInput(e) {
        this.branchcourts = e.detail.value;
      },
      departmentnameInput: function departmentnameInput(e) {
        this.departmentname = e.detail.value;
      },
      specificaddressInput: function specificaddressInput(e) {
        this.specificaddress = e.detail.value;
      },
      validata: function validata(that) {

        if (!that.consigneeName) {

          this.notify("收货人不能为空");
          return false;
        }
        if (!that.mobile) {
          this.notify("手机号不能为空");
          return false;
        } else {
          if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(that.mobile)) {
            this.notify("手机号格式不正确");
            return false;
          }
          if (!that.branchcourts) {
            this.notify("分院不能为空");
            return false;
          }
          if (!that.departmentname) {
            this.notify("院系不能为空");
            return false;
          }
          if (!that.specificaddress) {
            this.notify("具体地址不能为空");
            return false;
          }
        }
        return true;
      },
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

  _createClass(AddressEdit, [{
    key: 'onLoad',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(param) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!param.id) {
                  _context2.next = 7;
                  break;
                }

                _wepy2.default.showLoading({
                  title: '加载中',
                  mask: true
                });
                _context2.next = 4;
                return (0, _address.selectAddress)({ id: param.id });

              case 4:
                res = _context2.sent;


                if (res.statusCode === 200 && res.data.id) {
                  this.id = res.data.id;
                  this.consigneeName = res.data.consignee_name;
                  this.mobile = res.data.consignee_mobile;
                  this.branchcourts = res.data.branch_courts;
                  this.departmentname = res.data.department_name;
                  this.specificaddress = res.data.specific_address;

                  if (res.data.is_default == 0) {
                    this.checked = true;
                  } else {
                    this.checked = false;
                  }
                  this.$apply();
                }
                _wepy2.default.hideLoading();

              case 7:
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
  }]);

  return AddressEdit;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(AddressEdit , 'pages/address/edit/edit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQuanMiXSwibmFtZXMiOlsiQWRkcmVzc0VkaXQiLCJjb25maWciLCJkYXRhIiwiY2hlY2tlZCIsImNvbnNpZ25lZU5hbWUiLCJtb2JpbGUiLCJpc2RlZmF1bHQiLCJicmFuY2hjb3VydHMiLCJkZXBhcnRtZW50bmFtZSIsInNwZWNpZmljYWRkcmVzcyIsImlkIiwibWV0aG9kcyIsInNhdmUiLCJzdWNjZXNzIiwidmFsaWRhdGEiLCJwYXJhbSIsIm9wZW5pZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsIk9QRU5JRCIsInJlcyIsInN0YXR1c0NvZGUiLCJuYXZpZ2F0ZUJhY2siLCJub3RpZnkiLCJvbkNoYW5nZSIsImV2ZW50IiwiZGV0YWlsIiwiY29uc2lnbmVlTmFtZUlucHV0IiwiZSIsInZhbHVlIiwibW9iaWxlSW5wdXQiLCJicmFuY2hjb3VydHNJbnB1dCIsImRlcGFydG1lbnRuYW1lSW5wdXQiLCJzcGVjaWZpY2FkZHJlc3NJbnB1dCIsInRoYXQiLCJ0ZXN0IiwibXNnIiwidGV4dCIsImR1cmF0aW9uIiwic2VsZWN0b3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImNvbnNpZ25lZV9uYW1lIiwiY29uc2lnbmVlX21vYmlsZSIsImJyYW5jaF9jb3VydHMiLCJkZXBhcnRtZW50X25hbWUiLCJzcGVjaWZpY19hZGRyZXNzIiwiaXNfZGVmYXVsdCIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDTix5QkFBbUI7QUFDakIsc0JBQWMsMENBREc7QUFFakIsc0JBQWMsMENBRkc7QUFHaEIsc0JBQWM7QUFIRTs7QUFEYixLLFFBUVRDLEksR0FBSztBQUNEQyxlQUFTLElBRFI7QUFFREMscUJBQWMsRUFGYjtB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OztBQUFWVSxtQjs7O0FBRUosb0JBQUdBLElBQUlDLFVBQUosS0FBaUIsR0FBakIsSUFBc0JELElBQUlsQixJQUFKLENBQVNRLEVBQWxDLEVBQXFDO0FBQ2hDLHVCQUFLQSxFQUFMLEdBQVFVLElBQUlsQixJQUFKLENBQVNRLEVBQWpCO0FBQ0EsdUJBQUtOLGFBQUwsR0FBbUJnQixJQUFJbEIsSUFBSixDQUFTMEMsY0FBNUI7QUFDQSx1QkFBS3ZDLE1BQUwsR0FBWWUsSUFBSWxCLElBQUosQ0FBUzJDLGdCQUFyQjtBQUNBLHVCQUFLdEMsWUFBTCxHQUFrQmEsSUFBSWxCLElBQUosQ0FBUzRDLGFBQTNCO0FBQ0EsdUJBQUt0QyxjQUFMLEdBQW9CWSxJQUFJbEIsSUFBSixDQUFTNkMsZUFBN0I7QUFDQSx1QkFBS3RDLGVBQUwsR0FBcUJXLElBQUlsQixJQUFKLENBQVM4QyxnQkFBOUI7O0FBRUEsc0JBQUc1QixJQUFJbEIsSUFBSixDQUFTK0MsVUFBVCxJQUFxQixDQUF4QixFQUEwQjtBQUN4Qix5QkFBSzlDLE9BQUwsR0FBYSxJQUFiO0FBQ0QsbUJBRkQsTUFFSztBQUNILHlCQUFLQSxPQUFMLEdBQWEsS0FBYjtBQUNEO0FBQ0QsdUJBQUsrQyxNQUFMO0FBQ0o7QUFDRGpDLCtCQUFLa0MsV0FBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXZKa0NsQyxlQUFLbUMsSTs7a0JBQXpCcEQsVyIsImZpbGUiOiJlZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXHJcbiAgaW1wb3J0IHtzYXZlQWRkcmVzcyxzZWxlY3RBZGRyZXNzLGVkaXRBZGRyZXNzfSBmcm9tICcuLi8uLi8uLi9hcGkvYWRkcmVzcydcclxuICBpbXBvcnQgTm90aWZ5IGZyb20gJy4uLy4uLy4uL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL25vdGlmeS9ub3RpZnknO1xyXG4gIGltcG9ydCB7T1BFTklEfSBmcm9tICcuLi8uLi8uLi9jb25maWcvY29tbW9uJztcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzRWRpdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICBcInVzaW5nQ29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgIFwidmFuLWJ1dHRvblwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC9idXR0b24vaW5kZXhcIixcclxuICAgICAgICAgXCJ2YW4tc3dpdGNoXCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL3N3aXRjaC9pbmRleFwiLFxyXG4gICAgICAgICAgXCJ2YW4tbm90aWZ5XCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL25vdGlmeS9pbmRleFwiXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBkYXRhPXtcclxuICAgICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgICAgIGNvbnNpZ25lZU5hbWU6XCJcIixcclxuICAgICAgICBtb2JpbGU6XCJcIixcclxuICAgICAgICBpc2RlZmF1bHQ6XCIwXCIsXHJcbiAgICAgICAgYnJhbmNoY291cnRzOlwiXCIsXHJcbiAgICAgICAgZGVwYXJ0bWVudG5hbWU6XCJcIixcclxuICAgICAgICBzcGVjaWZpY2FkZHJlc3M6XCJcIixcclxuICAgICAgICBpZDowXHJcbiAgICB9XHJcbiAgICBtZXRob2RzPXtcclxuICAgICAgYXN5bmMgIHNhdmUoKXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBsZXQgc3VjY2Vzcz0gdGhpcy5tZXRob2RzLnZhbGlkYXRhKHRoaXMpO1xyXG4gICAgICAgICAgICAgIGlmKHN1Y2Nlc3Mpe1xyXG4gICAgICAgICAgICAgICAgIGxldCBwYXJhbT17fTtcclxuICAgICAgICAgICAgICAgICBwYXJhbS5jb25zaWduZWVOYW1lPXRoaXMuY29uc2lnbmVlTmFtZTtcclxuICAgICAgICAgICAgICAgICBwYXJhbS5tb2JpbGU9dGhpcy5tb2JpbGU7XHJcbiAgICAgICAgICAgICAgICAgcGFyYW0uaXNkZWZhdWx0PXRoaXMuaXNkZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgIHBhcmFtLmJyYW5jaGNvdXJ0cz10aGlzLmJyYW5jaGNvdXJ0cztcclxuICAgICAgICAgICAgICAgICBwYXJhbS5kZXBhcnRtZW50bmFtZT10aGlzLmRlcGFydG1lbnRuYW1lO1xyXG4gICAgICAgICAgICAgICAgIHBhcmFtLnNwZWNpZmljYWRkcmVzcz10aGlzLnNwZWNpZmljYWRkcmVzcztcclxuICAgICAgICAgICAgICAgICBsZXQgb3BlbmlkPXdlcHkuZ2V0U3RvcmFnZVN5bmMoT1BFTklEKVxyXG4gICAgICAgICAgICAgICAgIHBhcmFtLm9wZW5pZD1vcGVuaWQ7XHJcbiAgICAgICAgICAgICAgIC8v5pyJaWTmmK/nvJbovpHvvIzmsqHmnInnmoTmmK/kv53lrZhcclxuICAgICAgICAgICAgICAgaWYodGhpcy5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICBwYXJhbS5pZD10aGlzLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXM9YXdhaXQgZWRpdEFkZHJlc3MocGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLm5vdGlmeShcIuS/neWtmOWksei0pe+8jOivt+mHjeivlSEhIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcz1hd2FpdCBzYXZlQWRkcmVzcyhwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMubm90aWZ5KFwi5L+d5a2Y5aSx6LSl77yM6K+36YeN6K+VISEhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgICAvLyDpnIDopoHmiYvliqjlr7kgY2hlY2tlZCDnirbmgIHov5vooYzmm7TmlrBcclxuICAgICAgICAgICB0aGlzLmNoZWNrZWQ9IGV2ZW50LmRldGFpbDtcclxuICAgICAgICAgICBpZih0aGlzLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAgdGhpcy5pc2RlZmF1bHQ9XCIwXCJcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgIHRoaXMuaXNkZWZhdWx0PVwiMVwiXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBjb25zaWduZWVOYW1lSW5wdXQoZSl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIHRoaXMuY29uc2lnbmVlTmFtZT1lLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgfSxcclxuICAgICAgICAgbW9iaWxlSW5wdXQoZSl7XHJcbiAgICAgICAgICAgIHRoaXMubW9iaWxlPWUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBicmFuY2hjb3VydHNJbnB1dChlKXtcclxuICAgICAgICAgICAgdGhpcy5icmFuY2hjb3VydHM9ZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIGRlcGFydG1lbnRuYW1lSW5wdXQoZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVwYXJ0bWVudG5hbWU9ZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIHNwZWNpZmljYWRkcmVzc0lucHV0KGUpe1xyXG4gICAgICAgICAgICAgdGhpcy5zcGVjaWZpY2FkZHJlc3M9ZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIHZhbGlkYXRhKHRoYXQpe1xyXG4gICAgICBcclxuICAgICAgICAgICAgICAgaWYoIXRoYXQuY29uc2lnbmVlTmFtZSl7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoXCLmlLbotKfkurrkuI3og73kuLrnqbpcIilcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGF0Lm1vYmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShcIuaJi+acuuWPt+S4jeiDveS4uuepulwiKVxyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZighKC9eMVszfDR8NXw4XVswLTldXFxkezQsOH0kLy50ZXN0KHRoYXQubW9iaWxlKSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFwi5omL5py65Y+35qC85byP5LiN5q2j56GuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGlmKCF0aGF0LmJyYW5jaGNvdXJ0cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShcIuWIhumZouS4jeiDveS4uuepulwiKVxyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoYXQuZGVwYXJ0bWVudG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoXCLpmaLns7vkuI3og73kuLrnqbpcIilcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGF0LnNwZWNpZmljYWRkcmVzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShcIuWFt+S9k+WcsOWdgOS4jeiDveS4uuepulwiKVxyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBub3RpZnkobXNnKXtcclxuICAgICAgICAgICAgICAgICAgICAgTm90aWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG1zZyxcclxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjY3VzdG9tLXNlbGVjdG9yJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGNTZDNkMnXHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICBhc3luYyBvbkxvYWQocGFyYW0pe1xyXG5cclxuICAgICAvL+i3r+eUseS4reaciWlk5Y+C5pWw55qE5piv57yW6L6R77yM5Yqg6L295pWw5o2uXHJcbiAgICAgaWYocGFyYW0uaWQpe1xyXG4gICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTon5Yqg6L295LitJyxcclxuICAgICAgICAgICBtYXNrOnRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgICBsZXQgcmVzPWF3YWl0IHNlbGVjdEFkZHJlc3Moe2lkOnBhcmFtLmlkfSk7XHJcbiAgICAgIFxyXG4gICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpe1xyXG4gICAgICAgICAgICAgIHRoaXMuaWQ9cmVzLmRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb25zaWduZWVOYW1lPXJlcy5kYXRhLmNvbnNpZ25lZV9uYW1lO1xyXG4gICAgICAgICAgICAgIHRoaXMubW9iaWxlPXJlcy5kYXRhLmNvbnNpZ25lZV9tb2JpbGU7XHJcbiAgICAgICAgICAgICAgdGhpcy5icmFuY2hjb3VydHM9cmVzLmRhdGEuYnJhbmNoX2NvdXJ0cztcclxuICAgICAgICAgICAgICB0aGlzLmRlcGFydG1lbnRuYW1lPXJlcy5kYXRhLmRlcGFydG1lbnRfbmFtZTtcclxuICAgICAgICAgICAgICB0aGlzLnNwZWNpZmljYWRkcmVzcz1yZXMuZGF0YS5zcGVjaWZpY19hZGRyZXNzO1xyXG4gICAgICBcclxuICAgICAgICAgICAgICBpZihyZXMuZGF0YS5pc19kZWZhdWx0PT0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZD10cnVlXHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQ9ZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gIH1cclxuIl19