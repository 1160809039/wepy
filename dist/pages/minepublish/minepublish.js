'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _task = require('./../../api/task.js');

var _PublishCard = require('./../../components/publishcard/PublishCard.js');

var _PublishCard2 = _interopRequireDefault(_PublishCard);

var _ConfirmCard = require('./../../components/confirmcard/ConfirmCard.js');

var _ConfirmCard2 = _interopRequireDefault(_ConfirmCard);

var _common = require('./../../config/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MinePublish = function (_wepy$page) {
  _inherits(MinePublish, _wepy$page);

  function MinePublish() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MinePublish);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MinePublish.__proto__ || Object.getPrototypeOf(MinePublish)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      enablePullDownRefresh: true,
      "usingComponents": {
        "van-tabbar": "/miniprogram_npm/vant-weapp/tabbar/index",
        "van-tabbar-item": "/miniprogram_npm/vant-weapp/tabbar-item/index",
        "van-icon": "/miniprogram_npm/vant-weapp/icon/index"
      }
    }, _this.data = {
      tabshow: 0,
      taskData: [],
      confirmData: [],
      infocount: 0
    }, _this.$repeat = { "confirmData": { "com": "ConfirmCard", "props": "taskdata" }, "taskData": { "com": "PublishCard", "props": "taskdata" } }, _this.$props = { "ConfirmCard": { "xmlns:v-bind": { "value": "", "for": "confirmData", "item": "item", "index": "index", "key": "index" }, "v-bind:taskdata.once": { "value": "item", "type": "item", "for": "confirmData", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "confirmData", "item": "item", "index": "index", "key": "index" } }, "PublishCard": { "v-bind:taskdata.once": { "value": "item", "type": "item", "for": "taskData", "item": "item", "index": "index", "key": "index" } } }, _this.$events = { "ConfirmCard": { "v-on:homeReflesh": "homeReflesh" }, "PublishCard": { "v-on:homeReflesh": "homeReflesh" } }, _this.components = {
      PublishCard: _PublishCard2.default,
      ConfirmCard: _ConfirmCard2.default
    }, _this.methods = {
      toAdressList: function toAdressList() {
        _wepy2.default.navigateTo({
          url: '/pages/address/list/list'
        });
      },
      onChange: function onChange(event) {
        this.tabshow = event.detail;
      },

      //初始化数据
      homeLoad: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(that, callback) {
          var openid, resConfirm, resTask;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  openid = _wepy2.default.getStorageSync(_common.OPENID);

                  //加载我的待完成数据

                  _context.next = 3;
                  return (0, _task.selectTaskConfirmed)({ openid: openid });

                case 3:
                  resConfirm = _context.sent;

                  if (resConfirm.statusCode === 200) {
                    that.confirmData = resConfirm.data;
                    that.infocount = resConfirm.data.length;
                    that.$apply();
                  }

                  //加载我的发布的数据
                  _context.next = 7;
                  return (0, _task.selectTaskByOpenId)({ openid: openid });

                case 7:
                  resTask = _context.sent;

                  if (resTask.statusCode === 200) {
                    that.taskData = resTask.data;
                    that.$apply();
                  }
                  if (callback) {
                    callback();
                  }

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function homeLoad(_x, _x2) {
          return _ref2.apply(this, arguments);
        }

        return homeLoad;
      }(),


      //刷新页面
      homeReflesh: function homeReflesh() {

        this.methods.homeLoad(this);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MinePublish, [{
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {

      this.methods.homeLoad(this, _wepy2.default.stopPullDownRefresh);
    }
  }, {
    key: 'onShow',
    value: function onShow() {

      this.methods.homeLoad(this);
    }
  }]);

  return MinePublish;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(MinePublish , 'pages/minepublish/minepublish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmVwdWJsaXNoLmpzIl0sIm5hbWVzIjpbIk1pbmVQdWJsaXNoIiwiY29uZmlnIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGF0YSIsInRhYnNob3ciLCJ0YXNrRGF0YSIsImNvbmZpcm1EYXRhIiwiaW5mb2NvdW50IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiUHVibGlzaENhcmQiLCJDb25maXJtQ2FyZCIsIm1ldGhvZHMiLCJ0b0FkcmVzc0xpc3QiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJkZXRhaWwiLCJob21lTG9hZCIsInRoYXQiLCJjYWxsYmFjayIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwiT1BFTklEIiwicmVzQ29uZmlybSIsInN0YXR1c0NvZGUiLCJsZW5ndGgiLCIkYXBwbHkiLCJyZXNUYXNrIiwiaG9tZVJlZmxlc2giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUztBQUNOQyw2QkFBc0IsSUFEaEI7QUFFUCx5QkFBbUI7QUFDaEIsc0JBQWMsMENBREU7QUFFZiwyQkFBbUIsK0NBRko7QUFHYixvQkFBWTtBQUhDO0FBRlosSyxRQVFUQyxJLEdBQUs7QUFDSEMsZUFBUSxDQURMO0FBRUhDLGdCQUFTLEVBRk47QUFHSEMsbUJBQVksRUFIVDtBQUlIQyxpQkFBVTtBQUpQLEssUUFNTkMsTyxHQUFVLEVBQUMsZUFBYyxFQUFDLE9BQU0sYUFBUCxFQUFxQixTQUFRLFVBQTdCLEVBQWYsRUFBd0QsWUFBVyxFQUFDLE9BQU0sYUFBUCxFQUFxQixTQUFRLFVBQTdCLEVBQW5FLEUsUUFDYkMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxhQUFsQixFQUFnQyxRQUFPLE1BQXZDLEVBQThDLFNBQVEsT0FBdEQsRUFBOEQsT0FBTSxPQUFwRSxFQUFoQixFQUE2Rix3QkFBdUIsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixPQUFNLGFBQXBDLEVBQWtELFFBQU8sTUFBekQsRUFBZ0UsU0FBUSxPQUF4RSxFQUFnRixPQUFNLE9BQXRGLEVBQXBILEVBQW1OLGNBQWEsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLGFBQWxCLEVBQWdDLFFBQU8sTUFBdkMsRUFBOEMsU0FBUSxPQUF0RCxFQUE4RCxPQUFNLE9BQXBFLEVBQWhPLEVBQWYsRUFBNlQsZUFBYyxFQUFDLHdCQUF1QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sVUFBcEMsRUFBK0MsUUFBTyxNQUF0RCxFQUE2RCxTQUFRLE9BQXJFLEVBQTZFLE9BQU0sT0FBbkYsRUFBeEIsRUFBM1UsRSxRQUNUQyxPLEdBQVUsRUFBQyxlQUFjLEVBQUMsb0JBQW1CLGFBQXBCLEVBQWYsRUFBa0QsZUFBYyxFQUFDLG9CQUFtQixhQUFwQixFQUFoRSxFLFFBQ1RDLFUsR0FBVztBQUNOQyxtQkFBWUEscUJBRE47QUFFTkMsbUJBQVlBO0FBRk4sSyxRQWNSQyxPLEdBQVE7QUFFTEMsa0JBRkssMEJBRVM7QUFDWEMsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSTtBQURVLFNBQWhCO0FBR0YsT0FOSTtBQU9KQyxjQVBJLG9CQU9LQyxLQVBMLEVBT1k7QUFDaEIsYUFBS2hCLE9BQUwsR0FBYWdCLE1BQU1DLE1BQW5CO0FBRUEsT0FWSTs7QUFXTDtBQUNNQyxjQVpEO0FBQUEsNkZBWVVDLElBWlYsRUFZZUMsUUFaZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFhS0Msd0JBYkwsR0FhWVQsZUFBS1UsY0FBTCxDQUFvQkMsY0FBcEIsQ0FiWjs7QUFlTjs7QUFmTTtBQUFBLHlCQWdCaUIsK0JBQW9CLEVBQUNGLFFBQU9BLE1BQVIsRUFBcEIsQ0FoQmpCOztBQUFBO0FBZ0JBRyw0QkFoQkE7O0FBaUJOLHNCQUFHQSxXQUFXQyxVQUFYLEtBQXdCLEdBQTNCLEVBQStCO0FBQzFCTix5QkFBS2pCLFdBQUwsR0FBaUJzQixXQUFXekIsSUFBNUI7QUFDQW9CLHlCQUFLaEIsU0FBTCxHQUFlcUIsV0FBV3pCLElBQVgsQ0FBZ0IyQixNQUEvQjtBQUNBUCx5QkFBS1EsTUFBTDtBQUNIOztBQUVIO0FBdkJPO0FBQUEseUJBd0JZLDhCQUFtQixFQUFDTixRQUFPQSxNQUFSLEVBQW5CLENBeEJaOztBQUFBO0FBd0JGTyx5QkF4QkU7O0FBeUJMLHNCQUFHQSxRQUFRSCxVQUFSLEtBQXFCLEdBQXhCLEVBQTRCO0FBQ3hCTix5QkFBS2xCLFFBQUwsR0FBYzJCLFFBQVE3QixJQUF0QjtBQUNBb0IseUJBQUtRLE1BQUw7QUFDSDtBQUNELHNCQUFHUCxRQUFILEVBQVk7QUFDVkE7QUFDRDs7QUEvQkk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7OztBQW1DTjtBQUNDUyxpQkFwQ0sseUJBb0NROztBQUVYLGFBQUtuQixPQUFMLENBQWFRLFFBQWIsQ0FBc0IsSUFBdEI7QUFDRDtBQXZDSSxLOzs7Ozt3Q0FUUzs7QUFFZixXQUFLUixPQUFMLENBQWFRLFFBQWIsQ0FBc0IsSUFBdEIsRUFBMkJOLGVBQUtrQixtQkFBaEM7QUFDRDs7OzZCQUNROztBQUVKLFdBQUtwQixPQUFMLENBQWFRLFFBQWIsQ0FBc0IsSUFBdEI7QUFFSjs7OztFQS9Cc0NOLGVBQUttQixJOztrQkFBekJuQyxXIiwiZmlsZSI6Im1pbmVwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXHJcbiAgIFxyXG4gIGltcG9ydCB7c2VsZWN0VGFza0J5T3BlbklkLHNlbGVjdFRhc2tDb25maXJtZWR9IGZyb20gXCIuLi8uLi9hcGkvdGFza1wiO1xyXG4gIGltcG9ydCBQdWJsaXNoQ2FyZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3B1Ymxpc2hjYXJkL1B1Ymxpc2hDYXJkJztcclxuICBpbXBvcnQgQ29uZmlybUNhcmQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb25maXJtY2FyZC9Db25maXJtQ2FyZCc7XHJcbiAgaW1wb3J0IHtPUEVOSUR9IGZyb20gJy4uLy4uL2NvbmZpZy9jb21tb24nO1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmVQdWJsaXNoIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDp0cnVlLFxyXG4gICAgICBcInVzaW5nQ29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgIFwidmFuLXRhYmJhclwiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC90YWJiYXIvaW5kZXhcIixcclxuICAgICAgICAgIFwidmFuLXRhYmJhci1pdGVtXCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL3RhYmJhci1pdGVtL2luZGV4XCIsXHJcbiAgICAgICAgICAgIFwidmFuLWljb25cIjogXCIvbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvaWNvbi9pbmRleFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGRhdGE9e1xyXG4gICAgICB0YWJzaG93OjAsXHJcbiAgICAgIHRhc2tEYXRhOltdLFxyXG4gICAgICBjb25maXJtRGF0YTpbXSxcclxuICAgICAgaW5mb2NvdW50OjAsXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7XCJjb25maXJtRGF0YVwiOntcImNvbVwiOlwiQ29uZmlybUNhcmRcIixcInByb3BzXCI6XCJ0YXNrZGF0YVwifSxcInRhc2tEYXRhXCI6e1wiY29tXCI6XCJQdWJsaXNoQ2FyZFwiLFwicHJvcHNcIjpcInRhc2tkYXRhXCJ9fTtcclxuJHByb3BzID0ge1wiQ29uZmlybUNhcmRcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImNvbmZpcm1EYXRhXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6dGFza2RhdGEub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImNvbmZpcm1EYXRhXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJjb25maXJtRGF0YVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcIlB1Ymxpc2hDYXJkXCI6e1widi1iaW5kOnRhc2tkYXRhLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJ0YXNrRGF0YVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7XCJDb25maXJtQ2FyZFwiOntcInYtb246aG9tZVJlZmxlc2hcIjpcImhvbWVSZWZsZXNoXCJ9LFwiUHVibGlzaENhcmRcIjp7XCJ2LW9uOmhvbWVSZWZsZXNoXCI6XCJob21lUmVmbGVzaFwifX07XHJcbiBjb21wb25lbnRzPXtcclxuICAgICAgUHVibGlzaENhcmQ6UHVibGlzaENhcmQsXHJcbiAgICAgIENvbmZpcm1DYXJkOkNvbmZpcm1DYXJkXHJcbiAgICB9XHJcblxyXG4gIG9uUHVsbERvd25SZWZyZXNoKCl7XHJcblxyXG4gICAgICB0aGlzLm1ldGhvZHMuaG9tZUxvYWQodGhpcyx3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2gpO1xyXG4gICAgfVxyXG4gICAgIG9uU2hvdygpe1xyXG4gICAgIFxyXG4gICAgICAgICB0aGlzLm1ldGhvZHMuaG9tZUxvYWQodGhpcyk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgIFxyXG4gICAgICAgdG9BZHJlc3NMaXN0KCl7XHJcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6Jy9wYWdlcy9hZGRyZXNzL2xpc3QvbGlzdCdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICB9LFxyXG4gICAgICAgIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50YWJzaG93PWV2ZW50LmRldGFpbDtcclxuICAgICAgIFxyXG4gICAgICAgfSxcclxuICAgICAgIC8v5Yid5aeL5YyW5pWw5o2uXHJcbiAgICAgIGFzeW5jICBob21lTG9hZCh0aGF0LGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgIGxldCBvcGVuaWQ9d2VweS5nZXRTdG9yYWdlU3luYyhPUEVOSUQpO1xyXG5cclxuICAgICAgLy/liqDovb3miJHnmoTlvoXlrozmiJDmlbDmja5cclxuICAgICAgICBsZXQgcmVzQ29uZmlybT1hd2FpdCBzZWxlY3RUYXNrQ29uZmlybWVkKHtvcGVuaWQ6b3BlbmlkfSk7XHJcbiAgICAgIGlmKHJlc0NvbmZpcm0uc3RhdHVzQ29kZT09PTIwMCl7XHJcbiAgICAgICAgICAgdGhhdC5jb25maXJtRGF0YT1yZXNDb25maXJtLmRhdGE7XHJcbiAgICAgICAgICAgdGhhdC5pbmZvY291bnQ9cmVzQ29uZmlybS5kYXRhLmxlbmd0aDtcclxuICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAvL+WKoOi9veaIkeeahOWPkeW4g+eahOaVsOaNrlxyXG4gICAgICBsZXQgcmVzVGFzaz1hd2FpdCBzZWxlY3RUYXNrQnlPcGVuSWQoe29wZW5pZDpvcGVuaWR9KTtcclxuICAgICAgIGlmKHJlc1Rhc2suc3RhdHVzQ29kZT09PTIwMCl7XHJcbiAgICAgICAgICAgdGhhdC50YXNrRGF0YT1yZXNUYXNrLmRhdGE7XHJcbiAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgIH1cclxuICAgICAgIGlmKGNhbGxiYWNrKXtcclxuICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICB9LFxyXG5cclxuICAgICAgLy/liLfmlrDpobXpnaJcclxuICAgICAgIGhvbWVSZWZsZXNoKCl7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICB0aGlzLm1ldGhvZHMuaG9tZUxvYWQodGhpcyk7XHJcbiAgICAgICB9XHJcbiAgIFxyXG4gICAgfVxyXG4gIH1cclxuIl19