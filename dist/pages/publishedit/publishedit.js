'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _task = require('./../../api/task.js');

var _index = require('./../../store/types/index.js');

var _common = require('./../../config/common.js');

var _publishmixins = require('./../../mixins/publishmixins.js');

var _publishmixins2 = _interopRequireDefault(_publishmixins);

var _address = require('./../../api/address.js');

var _notify = require('./../../miniprogram_npm/vant-weapp/notify/notify.js');

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishEdit = function (_wepy$page) {
  _inherits(PublishEdit, _wepy$page);

  function PublishEdit() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PublishEdit);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PublishEdit.__proto__ || Object.getPrototypeOf(PublishEdit)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "usingComponents": {
        "van-button": "/miniprogram_npm/vant-weapp/button/index",
        "van-notify": "/miniprogram_npm/vant-weapp/notify/index"
      }
    }, _this.mixins = [_publishmixins2.default], _this.methods = {
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

  return PublishEdit;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(PublishEdit , 'pages/publishedit/publishedit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hlZGl0LmpzIl0sIm5hbWVzIjpbIlB1Ymxpc2hFZGl0IiwiY29uZmlnIiwibWl4aW5zIiwicHVibGlzaE1peGlucyIsIm1ldGhvZHMiLCJub3RpZnkiLCJtc2ciLCJ0ZXh0IiwiZHVyYXRpb24iLCJzZWxlY3RvciIsImJhY2tncm91bmRDb2xvciIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUVDOztBQUNGOztBQUNBOztBQUNDOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUCx5QkFBbUI7QUFDaEIsc0JBQWMsMENBREU7QUFFaEIsc0JBQWM7QUFGRTtBQURaLEssUUFNWkMsTSxHQUFPLENBQUNDLHVCQUFELEMsUUFFSkMsTyxHQUFRO0FBQ0xDLFlBREssa0JBQ0VDLEdBREYsRUFDTTtBQUNHLDhCQUFPO0FBQ05DLGdCQUFNRCxHQURBO0FBRU5FLG9CQUFVLElBRko7QUFHTkMsb0JBQVUsa0JBSEo7QUFJTkMsMkJBQWlCO0FBSlgsU0FBUDtBQU1YO0FBUkUsSzs7OztFQVQrQkMsZUFBS0MsSTs7a0JBQXpCWixXIiwiZmlsZSI6InB1Ymxpc2hlZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXHJcblxyXG4gICBpbXBvcnQge2dldFRhc2tCeUlkfSBmcm9tICcuLi8uLi9hcGkvdGFzaydcclxuIGltcG9ydCB7U0VUQUREUkVTU30gZnJvbSAnLi4vLi4vc3RvcmUvdHlwZXMvaW5kZXgnXHJcbiBpbXBvcnQge09QRU5JRCxTQ0hPT0x9IGZyb20gJy4uLy4uL2NvbmZpZy9jb21tb24nXHJcbiAgaW1wb3J0IHB1Ymxpc2hNaXhpbnMgZnJvbSAnLi4vLi4vbWl4aW5zL3B1Ymxpc2htaXhpbnMnXHJcbiAgaW1wb3J0IHtzZWxlY3REZWZhdWx0LHNlbGVjdEFkZHJlc3N9IGZyb20gJy4uLy4uL2FwaS9hZGRyZXNzJ1xyXG4gIGltcG9ydCBOb3RpZnkgZnJvbSAnLi4vLi4vbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvbm90aWZ5L25vdGlmeSc7XHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaEVkaXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBcInVzaW5nQ29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgIFwidmFuLWJ1dHRvblwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC9idXR0b24vaW5kZXhcIixcclxuICAgICAgICAgXCJ2YW4tbm90aWZ5XCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL25vdGlmeS9pbmRleFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuIG1peGlucz1bcHVibGlzaE1peGluc11cclxuICAgXHJcbiAgICBtZXRob2RzPXtcclxuICAgICAgIG5vdGlmeShtc2cpe1xyXG4gICAgICAgICAgICAgICAgICAgICBOb3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogbXNnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNjdXN0b20tc2VsZWN0b3InLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0Y1NkM2QydcclxuICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgfVxyXG4iXX0=