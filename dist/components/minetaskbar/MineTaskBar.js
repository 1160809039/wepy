'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MineTaskBar = function (_wepy$component) {
    _inherits(MineTaskBar, _wepy$component);

    function MineTaskBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MineTaskBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MineTaskBar.__proto__ || Object.getPrototypeOf(MineTaskBar)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            taskdata: {
                type: Object
            }
        }, _this.methods = {
            toTaskInfo: function toTaskInfo(taskId, receiveId) {
                _wepy2.default.navigateTo({
                    url: '/pages/taskinfo/taskinfo?type=mine&taskId=' + taskId + '&receiveId=' + receiveId
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return MineTaskBar;
}(_wepy2.default.component);

exports.default = MineTaskBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1pbmVUYXNrQmFyLmpzIl0sIm5hbWVzIjpbIk1pbmVUYXNrQmFyIiwicHJvcHMiLCJ0YXNrZGF0YSIsInR5cGUiLCJPYmplY3QiLCJtZXRob2RzIiwidG9UYXNrSW5mbyIsInRhc2tJZCIsInJlY2VpdmVJZCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNzQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BRXBCQyxLLEdBQU07QUFDRkMsc0JBQVM7QUFDTEMsc0JBQUtDO0FBREE7QUFEUCxTLFFBS0xDLE8sR0FBUTtBQUNMQyxzQkFESyxzQkFDTUMsTUFETixFQUNhQyxTQURiLEVBQ3VCO0FBQ3hCQywrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyx5QkFBSSwrQ0FBNkNKLE1BQTdDLEdBQW9ELGFBQXBELEdBQWtFQztBQUQxRCxpQkFBaEI7QUFHSDtBQUxJLFM7Ozs7RUFQK0JDLGVBQUtHLFM7O2tCQUF6QlosVyIsImZpbGUiOiJNaW5lVGFza0Jhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCAgY2xhc3MgTWluZVRhc2tCYXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcclxuIFxyXG4gIHByb3BzPXtcclxuICAgICAgdGFza2RhdGE6e1xyXG4gICAgICAgICAgdHlwZTpPYmplY3RcclxuICAgICAgfVxyXG4gIH1cclxuICAgbWV0aG9kcz17XHJcbiAgICAgIHRvVGFza0luZm8odGFza0lkLHJlY2VpdmVJZCl7XHJcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDonL3BhZ2VzL3Rhc2tpbmZvL3Rhc2tpbmZvP3R5cGU9bWluZSZ0YXNrSWQ9Jyt0YXNrSWQrJyZyZWNlaXZlSWQ9JytyZWNlaXZlSWRcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuICB9XHJcbn1cclxuIl19