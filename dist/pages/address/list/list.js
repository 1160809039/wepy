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

var _common = require('./../../../config/common.js');

var _index = require('./../../../store/types/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddressList = function (_wepy$page) {
  _inherits(AddressList, _wepy$page);

  function AddressList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddressList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddressList.__proto__ || Object.getPrototypeOf(AddressList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      addressData: [],
      isChange: false
    }, _this.methods = {
      //跳转编辑地址页面
      toEidt: function toEidt(id) {
        _wepy2.default.navigateTo({
          url: '/pages/address/edit/edit?id=' + id
        });
      },

      //选择地址
      changeAddress: function changeAddress(id) {
        if (this.isChange) {
          _wepy2.default.$store.dispatch({ type: _index.SETADDRESS, payload: id });
          _wepy2.default.navigateBack();
        }
      },
      touchstart: function touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startY = e.changedTouches[0].clientY;
        this.addressData.forEach(function (v, i) {
          v.isTouchMove = false;
        });
      },
      touchmove: function touchmove(e) {
        var that = this,
            index = e.currentTarget.dataset.index,
            //当前索引

        startX = that.startX,
            //开始X坐标
        startY = that.startY,
            //开始Y坐标
        touchMoveX = e.changedTouches[0].clientX,
            //滑动变化坐标
        touchMoveY = e.changedTouches[0].clientY,
            //滑动变化坐标
        //获取滑动角度
        angle = that.methods.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

        that.addressData.forEach(function (v, i) {
          v.isTouchMove = false;
          //滑动超过30度角 return

          if (Math.abs(angle) > 30) return;
          if (i == index) {
            if (touchMoveX > startX) //右滑
              v.isTouchMove = false;else //左滑
              v.isTouchMove = true;
          }
        });
        that.$apply();
      },
      angle: function angle(start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y;
        //返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
      },
      delete: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, e) {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _address.deleteAddress)({ id: id });

                case 2:
                  res = _context.sent;

                  console.log(res);
                  console.log(res.statusCode === 200 && res.data.id);
                  if (res.statusCode === 200 && res.data.id) {
                    this.addressData.splice(e.currentTarget.dataset.index, 1);
                    this.$apply();
                  }

                  this.addressData.forEach(function (v, i) {
                    v.isTouchMove = false;
                  });

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _delete(_x, _x2) {
          return _ref2.apply(this, arguments);
        }

        return _delete;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddressList, [{
    key: 'onLoad',
    value: function onLoad(option) {

      //标记这是选择地址情景
      if (option.type == "change") {
        this.isChange = true;
      }
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var openid, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:

                //加载地址列表
                openid = _wepy2.default.getStorageSync(_common.OPENID);
                _context2.next = 3;
                return (0, _address.addressList)({ openid: openid });

              case 3:
                res = _context2.sent;

                if (res.statusCode === 200) {
                  this.addressData = res.data;
                  this.addressData.forEach(function (v, i) {
                    v.isTouchMove = false;
                  });
                  this.$apply();
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onShow() {
        return _ref3.apply(this, arguments);
      }

      return onShow;
    }()
  }]);

  return AddressList;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(AddressList , 'pages/address/list/list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsiQWRkcmVzc0xpc3QiLCJjb25maWciLCJkYXRhIiwiYWRkcmVzc0RhdGEiLCJpc0NoYW5nZSIsIm1ldGhvZHMiLCJ0b0VpZHQiLCJpZCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hhbmdlQWRkcmVzcyIsIiRzdG9yZSIsImRpc3BhdGNoIiwidHlwZSIsIlNFVEFERFJFU1MiLCJwYXlsb2FkIiwibmF2aWdhdGVCYWNrIiwidG91Y2hzdGFydCIsImUiLCJzdGFydFgiLCJjaGFuZ2VkVG91Y2hlcyIsImNsaWVudFgiLCJzdGFydFkiLCJjbGllbnRZIiwiZm9yRWFjaCIsInYiLCJpIiwiaXNUb3VjaE1vdmUiLCJ0b3VjaG1vdmUiLCJ0aGF0IiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInRvdWNoTW92ZVgiLCJ0b3VjaE1vdmVZIiwiYW5nbGUiLCJYIiwiWSIsIk1hdGgiLCJhYnMiLCIkYXBwbHkiLCJzdGFydCIsImVuZCIsIl9YIiwiX1kiLCJhdGFuIiwiUEkiLCJkZWxldGUiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzQ29kZSIsInNwbGljZSIsIm9wdGlvbiIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwiT1BFTklEIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTLEUsUUFLVkMsSSxHQUFLO0FBQ0hDLG1CQUFhLEVBRFY7QUFFSEMsZ0JBQVM7QUFGTixLLFFBNEJKQyxPLEdBQVE7QUFDTjtBQUNBQyxZQUZNLGtCQUVDQyxFQUZELEVBRUk7QUFDUEMsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDYkMsZUFBSSxpQ0FBK0JIO0FBRHRCLFNBQWhCO0FBR0YsT0FOSzs7QUFPTjtBQUNBSSxtQkFSTSx5QkFRUUosRUFSUixFQVFXO0FBQ2YsWUFB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d0JGLEtBQWhELEVBQXVELENBQXZEO0FBQ0EseUJBQUtVLE1BQUw7QUFDRjs7QUFFQSx1QkFBS3RDLFdBQUwsQ0FBaUJzQixPQUFqQixDQUF5QixVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDbkNELHNCQUFFRSxXQUFGLEdBQWMsS0FBZDtBQUNGLG1CQUZKOztBQTlESjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEs7Ozs7OzJCQXZCRjBCLE0sRUFBTzs7QUFFWDtBQUNBLFVBQUdBLE9BQU94QyxJQUFQLElBQWEsUUFBaEIsRUFBeUI7QUFDbkIsYUFBS1YsUUFBTCxHQUFjLElBQWQ7QUFDTDtBQUNIOzs7Ozs7Ozs7OztBQUdBO0FBQ09tRCxzQixHQUFPL0MsZUFBS2dELGNBQUwsQ0FBb0JDLGNBQXBCLEM7O3VCQUNJLDBCQUFZLEVBQUNGLFFBQU9BLE1BQVIsRUFBWixDOzs7QUFBWE4sbUI7O0FBQ0osb0JBQUdBLElBQUlHLFVBQUosS0FBaUIsR0FBcEIsRUFBd0I7QUFDdEIsdUJBQUtqRCxXQUFMLEdBQWlCOEMsSUFBSS9DLElBQXJCO0FBQ0EsdUJBQUtDLFdBQUwsQ0FBaUJzQixPQUFqQixDQUF5QixVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDdkNELHNCQUFFRSxXQUFGLEdBQWMsS0FBZDtBQUNELG1CQUZEO0FBR0EsdUJBQUthLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTdCbUNqQyxlQUFLa0QsSTs7a0JBQXpCMUQsVyIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXHJcbiAgaW1wb3J0IHthZGRyZXNzTGlzdCxkZWxldGVBZGRyZXNzfSBmcm9tICcuLi8uLi8uLi9hcGkvYWRkcmVzcydcclxuICBpbXBvcnQge09QRU5JRH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnL2NvbW1vbic7XHJcbiAgaW1wb3J0IHtTRVRBRERSRVNTfSBmcm9tICcuLi8uLi8uLi9zdG9yZS90eXBlcy9pbmRleCdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICBcclxuICAgIFxyXG4gICAgICBcclxuICAgIH1cclxuICAgZGF0YT17XHJcbiAgICAgYWRkcmVzc0RhdGEgOltdLFxyXG4gICAgIGlzQ2hhbmdlOmZhbHNlXHJcbiAgIH1cclxuXHJcbiAgIG9uTG9hZChvcHRpb24pe1xyXG5cclxuICAgICAgLy/moIforrDov5nmmK/pgInmi6nlnLDlnYDmg4Xmma9cclxuICAgICAgaWYob3B0aW9uLnR5cGU9PVwiY2hhbmdlXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmlzQ2hhbmdlPXRydWVcclxuICAgICAgfVxyXG4gICB9XHJcbiAgYXN5bmMgIG9uU2hvdygpe1xyXG4gICBcclxuICAgIC8v5Yqg6L295Zyw5Z2A5YiX6KGoXHJcbiAgICAgICBsZXQgb3BlbmlkPXdlcHkuZ2V0U3RvcmFnZVN5bmMoT1BFTklEKVxyXG4gICAgICAgbGV0IHJlcz0gYXdhaXQgYWRkcmVzc0xpc3Qoe29wZW5pZDpvcGVuaWR9KTtcclxuICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwKXtcclxuICAgICAgICAgdGhpcy5hZGRyZXNzRGF0YT1yZXMuZGF0YTtcclxuICAgICAgICAgdGhpcy5hZGRyZXNzRGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XHJcbiAgICAgICAgICAgdi5pc1RvdWNoTW92ZT1mYWxzZTtcclxuICAgICAgICAgfSlcclxuICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgIFxyXG5cclxuICAgIG1ldGhvZHM9e1xyXG4gICAgICAvL+i3s+i9rOe8lui+keWcsOWdgOmhtemdolxyXG4gICAgICB0b0VpZHQoaWQpe1xyXG4gICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6Jy9wYWdlcy9hZGRyZXNzL2VkaXQvZWRpdD9pZD0nK2lkXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICAvL+mAieaLqeWcsOWdgFxyXG4gICAgICBjaGFuZ2VBZGRyZXNzKGlkKXtcclxuICAgICAgICBpZih0aGlzLmlzQ2hhbmdlKXtcclxuICAgICAgICAgICAgd2VweS4kc3RvcmUuZGlzcGF0Y2goe3R5cGU6U0VUQUREUkVTUyxwYXlsb2FkOmlkfSlcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgIHRvdWNoc3RhcnQoZSl7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0WD1lLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0WT0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgICAgIHRoaXMuYWRkcmVzc0RhdGEuZm9yRWFjaChmdW5jdGlvbiAodiwgaSkge1xyXG4gICAgICAgICAgIHYuaXNUb3VjaE1vdmU9ZmFsc2U7XHJcbiAgICAgICAgIH0pXHJcbiAgICAgIH0sdG91Y2htb3ZlKGUpe1xyXG4gICAgICAgICAgbGV0IHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgIGluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgsLy/lvZPliY3ntKLlvJVcclxuICAgICAgICAgICBcclxuICAgICAgICAgICBzdGFydFggPSB0aGF0LnN0YXJ0WCwvL+W8gOWni1jlnZDmoIdcclxuICAgICAgICAgICBzdGFydFkgPSB0aGF0LnN0YXJ0WSwvL+W8gOWni1nlnZDmoIdcclxuICAgICAgICAgICB0b3VjaE1vdmVYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLC8v5ruR5Yqo5Y+Y5YyW5Z2Q5qCHXHJcbiAgICAgICAgICAgdG91Y2hNb3ZlWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSwvL+a7keWKqOWPmOWMluWdkOagh1xyXG4gICAgICAgICAgIC8v6I635Y+W5ruR5Yqo6KeS5bqmXHJcbiAgICAgICAgICAgYW5nbGUgPSB0aGF0Lm1ldGhvZHMuYW5nbGUoeyBYOiBzdGFydFgsIFk6IHN0YXJ0WSB9LCB7IFg6IHRvdWNoTW92ZVgsIFk6IHRvdWNoTW92ZVkgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgdGhhdC5hZGRyZXNzRGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdi5pc1RvdWNoTW92ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgIC8v5ruR5Yqo6LaF6L+HMzDluqbop5IgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhhbmdsZSkgPiAzMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3VjaE1vdmVYID4gc3RhcnRYKSAvL+WPs+a7kVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5pc1RvdWNoTW92ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgLy/lt6bmu5FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LmlzVG91Y2hNb3ZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgIFxyXG4gICAgICAgfSxhbmdsZShzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgdmFyIF9YID0gZW5kLlggLSBzdGFydC5YLFxyXG4gICAgICAgICAgICAgICAgIF9ZID0gZW5kLlkgLSBzdGFydC5ZXHJcbiAgICAgICAgICAgICAgICAvL+i/lOWbnuinkuW6piAvTWF0aC5hdGFuKCnov5Tlm57mlbDlrZfnmoTlj43mraPliIflgLxcclxuICAgICAgICAgICAgICAgIHJldHVybiAzNjAgKiBNYXRoLmF0YW4oX1kgLyBfWCkgLyAoMiAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXN5bmMgIGRlbGV0ZShpZCxlKXtcclxuICAgICAgICAgICAgICAgbGV0IHJlcz1hd2FpdCBkZWxldGVBZGRyZXNzKHtpZDppZH0pO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuc3RhdHVzQ29kZT09PTIwMCYmcmVzLmRhdGEuaWQpXHJcbiAgICAgICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwJiZyZXMuZGF0YS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzc0RhdGEuc3BsaWNlKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzRGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2LmlzVG91Y2hNb3ZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICBcclxuICB9XHJcbiJdfQ==