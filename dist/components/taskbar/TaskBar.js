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

var TaskBar = function (_wepy$component) {
    _inherits(TaskBar, _wepy$component);

    function TaskBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TaskBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TaskBar.__proto__ || Object.getPrototypeOf(TaskBar)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            taskdata: {
                type: Object
            }
        }, _this.methods = {
            toTaskInfo: function toTaskInfo() {
                _wepy2.default.navigateTo({
                    url: '/pages/taskinfo/taskinfo?type=other&param=' + JSON.stringify(this.taskdata)
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return TaskBar;
}(_wepy2.default.component);

exports.default = TaskBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhc2tCYXIuanMiXSwibmFtZXMiOlsiVGFza0JhciIsInByb3BzIiwidGFza2RhdGEiLCJ0eXBlIiwiT2JqZWN0IiwibWV0aG9kcyIsInRvVGFza0luZm8iLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3NCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDcEJDLEssR0FBTTtBQUNGQyxzQkFBUztBQUNMQyxzQkFBS0M7QUFEQTtBQURQLFMsUUFNTkMsTyxHQUFRO0FBQ0pDLHNCQURJLHdCQUNRO0FBQ1JDLCtCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHlCQUFJLCtDQUE2Q0MsS0FBS0MsU0FBTCxDQUFlLEtBQUtULFFBQXBCO0FBRHJDLGlCQUFoQjtBQUdIO0FBTEcsUzs7OztFQVA0QkssZUFBS0ssUzs7a0JBQXJCWixPIiwiZmlsZSI6IlRhc2tCYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgIGNsYXNzIFRhc2tCYXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcclxuICBwcm9wcz17XHJcbiAgICAgIHRhc2tkYXRhOntcclxuICAgICAgICAgIHR5cGU6T2JqZWN0XHJcbiAgICAgIH1cclxuICB9XHJcbiAgXHJcbiAgbWV0aG9kcz17XHJcbiAgICAgIHRvVGFza0luZm8oKXsgICBcclxuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOicvcGFnZXMvdGFza2luZm8vdGFza2luZm8/dHlwZT1vdGhlciZwYXJhbT0nK0pTT04uc3RyaW5naWZ5KHRoaXMudGFza2RhdGEpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgfVxyXG4gXHJcbn1cclxuIl19