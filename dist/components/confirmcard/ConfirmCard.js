'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _task = require('./../../api/task.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmCard = function (_wepy$component) {
    _inherits(ConfirmCard, _wepy$component);

    function ConfirmCard() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ConfirmCard);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfirmCard.__proto__ || Object.getPrototypeOf(ConfirmCard)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            taskdata: {
                type: Object
            }
        }, _this.methods = {
            confirmEnd: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
                    var res;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return (0, _task.updateReceiveConfirmEnd)({ receiveId: id });

                                case 2:
                                    res = _context.sent;

                                    if (res.statusCode === 200 && res.data.id) {
                                        _wepy2.default.showToast({
                                            title: '成功完成'
                                        });
                                        //删除成功刷新父页面
                                        this.$emit('homeReflesh');
                                    } else {
                                        _wepy2.default.showToast({
                                            title: '网络错误'
                                        });
                                    }

                                case 4:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function confirmEnd(_x) {
                    return _ref2.apply(this, arguments);
                }

                return confirmEnd;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ConfirmCard;
}(_wepy2.default.component);

exports.default = ConfirmCard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbmZpcm1DYXJkLmpzIl0sIm5hbWVzIjpbIkNvbmZpcm1DYXJkIiwicHJvcHMiLCJ0YXNrZGF0YSIsInR5cGUiLCJPYmplY3QiLCJtZXRob2RzIiwiY29uZmlybUVuZCIsImlkIiwicmVjZWl2ZUlkIiwicmVzIiwic3RhdHVzQ29kZSIsImRhdGEiLCJ3ZXB5Iiwic2hvd1RvYXN0IiwidGl0bGUiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNzQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BR3BCQyxLLEdBQU07QUFDRkMsc0JBQVM7QUFDTEMsc0JBQUtDO0FBREE7QUFEUCxTLFFBS0xDLE8sR0FBUTtBQUNFQyxzQkFERjtBQUFBLHFHQUNhQyxFQURiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkNBRWMsbUNBQXdCLEVBQUNDLFdBQVVELEVBQVgsRUFBeEIsQ0FGZDs7QUFBQTtBQUVJRSx1Q0FGSjs7QUFHQyx3Q0FBR0EsSUFBSUMsVUFBSixLQUFpQixHQUFqQixJQUFzQkQsSUFBSUUsSUFBSixDQUFTSixFQUFsQyxFQUFxQztBQUM5QkssdURBQUtDLFNBQUwsQ0FBZTtBQUNYQyxtREFBTTtBQURLLHlDQUFmO0FBR0E7QUFDRSw2Q0FBS0MsS0FBTCxDQUFXLGFBQVg7QUFDUixxQ0FORCxNQU1LO0FBQ0NILHVEQUFLQyxTQUFMLENBQWU7QUFDVkMsbURBQU07QUFESSx5Q0FBZjtBQUdMOztBQWJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsUzs7OztFQVIrQkYsZUFBS0ksUzs7a0JBQXpCaEIsVyIsImZpbGUiOiJDb25maXJtQ2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQge3VwZGF0ZVJlY2VpdmVDb25maXJtRW5kfSBmcm9tICcuLi8uLi9hcGkvdGFzaydcclxuZXhwb3J0IGRlZmF1bHQgIGNsYXNzIENvbmZpcm1DYXJkIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XHJcblxyXG4gICBcclxuICBwcm9wcz17XHJcbiAgICAgIHRhc2tkYXRhOntcclxuICAgICAgICAgIHR5cGU6T2JqZWN0XHJcbiAgICAgIH1cclxuICB9XHJcbiAgIG1ldGhvZHM9e1xyXG4gICAgICAgYXN5bmMgY29uZmlybUVuZChpZCl7XHJcbiAgICAgICAgICAgbGV0IHJlcz1hd2FpdCB1cGRhdGVSZWNlaXZlQ29uZmlybUVuZCh7cmVjZWl2ZUlkOmlkfSk7XHJcbiAgICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlPT09MjAwJiZyZXMuZGF0YS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+aIkOWKn+WujOaIkCdcclxuICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgIC8v5Yig6Zmk5oiQ5Yqf5Yi35paw54i26aG16Z2iXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2hvbWVSZWZsZXNoJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+e9kee7nOmUmeivrydcclxuICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICB9XHJcbn1cclxuIl19