'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _TaskBar = require('./../../components/taskbar/TaskBar.js');

var _TaskBar2 = _interopRequireDefault(_TaskBar);

var _MineTaskBar = require('./../../components/minetaskbar/MineTaskBar.js');

var _MineTaskBar2 = _interopRequireDefault(_MineTaskBar);

var _task = require('./../../api/task.js');

var _common = require('./../../config/common.js');

var _toast = require('./../../miniprogram_npm/vant-weapp/toast/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _index = require('./../../store/types/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {

      enablePullDownRefresh: true,
      "usingComponents": {
        "van-tab": "/miniprogram_npm/vant-weapp/tab/index",
        "van-tabs": "/miniprogram_npm/vant-weapp/tabs/index",
        "van-toast": "/miniprogram_npm/vant-weapp/toast/index",
        "van-loading": "/miniprogram_npm/vant-weapp/loading/index"

      }
    }, _this.$repeat = { "taskdata": { "com": "TaskBar", "props": "taskdata" }, "minedata": { "com": "MineTaskBar", "props": "taskdata" } }, _this.$props = { "TaskBar": { "xmlns:v-bind": { "value": "", "for": "taskdata", "item": "item", "index": "index", "key": "item.id" }, "v-bind:taskdata.once": { "value": "item", "type": "item", "for": "taskdata", "item": "item", "index": "index", "key": "item.id" } }, "MineTaskBar": { "v-bind:taskdata.once": { "value": "item", "type": "item", "for": "minedata", "item": "item", "index": "index", "key": "index" } } }, _this.$events = {}, _this.components = {
      TaskBar: _TaskBar2.default,
      MineTaskBar: _MineTaskBar2.default
    }, _this.data = {
      taskdata: [],

      minedata: [],
      is_loading: false
    }, _this.computed = {
      school: function school() {
        return _wepy2.default.getStorageSync(_common.SCHOOL);
      }
    }, _this.methods = {
      toSelectSchool: function toSelectSchool() {
        _wepy2.default.navigateTo({
          url: '/pages/school/school'
        });
      },
      homeLoad: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, that, callback) {
          var resTask, openid, resReceive;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _task.taskList)({ page: 1, schoolId: id, size: 8 });

                case 2:
                  resTask = _context.sent;

                  if (resTask.statusCode === 200) {
                    that.taskdata = resTask.data;
                    that.$apply();
                    _wepy2.default.$store.dispatch({ type: _index.SETPAGE, payload: 1 });
                  } else {
                    _toast2.default.fail('网络异常');
                  }
                  openid = _wepy2.default.getStorageSync(_common.OPENID);
                  _context.next = 7;
                  return (0, _task.selectReceive)({ openid: openid });

                case 7:
                  resReceive = _context.sent;

                  if (resReceive.statusCode === 200) {
                    that.minedata = resReceive.data;
                    that.$apply();
                    if (callback) {
                      //停止下拉刷新动画
                      callback();
                    }
                  } else {
                    _toast2.default.fail('网络异常');
                  }

                case 9:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function homeLoad(_x, _x2, _x3) {
          return _ref2.apply(this, arguments);
        }

        return homeLoad;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      var school = _wepy2.default.getStorageSync(_common.SCHOOL);
      this.methods.homeLoad(school.id, this, _wepy2.default.stopPullDownRefresh);
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      var _this2 = this;

      //底部刷新下一页
      var school = _wepy2.default.getStorageSync(_common.SCHOOL);
      var page = _wepy2.default.$store.getState().common.page + 1;

      this.is_loading = true;
      (0, _task.taskList)({ page: page, schoolId: school.id, size: 8 }).then(function (res) {
        _this2.is_loading = false;
        _this2.$apply();
        if (res.statusCode === 200) {
          if (res.data.length > 0) {
            _this2.taskdata = _this2.taskdata.concat(res.data);
            _this2.$apply();
            _wepy2.default.$store.dispatch({ type: _index.SETPAGE, payload: page });
          } else {
            (0, _toast2.default)("已经是最底页了！");
          }
        } else {
          _toast2.default.fail('网络异常');
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {

      //  let query = wepy.createSelectorQuery();
      //   query.select(".task_list").boundingClientRect(
      //     res=>{
      //      console.log(res)
      //     }
      //   ).exec()  

      //防止未及时跳转登录页面
      var that = this;
      var openid = _wepy2.default.getStorageSync(_common.OPENID);
      if (openid) {
        var school = _wepy2.default.getStorageSync(_common.SCHOOL);
        if (!school && !school.id) {
          _wepy2.default.navigateTo({
            url: '/pages/school/school'
          });
        } else {

          this.methods.homeLoad(school.id, this);
        }
      } else {
        _wepy2.default.navigateTo({
          url: '/pages/login/login'
        });
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiVGFza0JhciIsIk1pbmVUYXNrQmFyIiwiZGF0YSIsInRhc2tkYXRhIiwibWluZWRhdGEiLCJpc19sb2FkaW5nIiwiY29tcHV0ZWQiLCJzY2hvb2wiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJTQ0hPT0wiLCJtZXRob2RzIiwidG9TZWxlY3RTY2hvb2wiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaG9tZUxvYWQiLCJpZCIsInRoYXQiLCJjYWxsYmFjayIsInBhZ2UiLCJzY2hvb2xJZCIsInNpemUiLCJyZXNUYXNrIiwic3RhdHVzQ29kZSIsIiRhcHBseSIsIiRzdG9yZSIsImRpc3BhdGNoIiwidHlwZSIsIlNFVFBBR0UiLCJwYXlsb2FkIiwiVG9hc3QiLCJmYWlsIiwib3BlbmlkIiwiT1BFTklEIiwicmVzUmVjZWl2ZSIsInN0b3BQdWxsRG93blJlZnJlc2giLCJnZXRTdGF0ZSIsImNvbW1vbiIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJjb25jYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0Q7Ozs7Ozs7Ozs7OztJQUVzQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7O0FBRVBDLDZCQUFzQixJQUZmO0FBR1AseUJBQW1CO0FBQ2hCLG1CQUFXLHVDQURLO0FBRWhCLG9CQUFZLHdDQUZJO0FBR2hCLHFCQUFhLHlDQUhHO0FBSWYsdUJBQWU7O0FBSkE7QUFIWixLLFFBV1ZDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxPQUFNLFNBQVAsRUFBaUIsU0FBUSxVQUF6QixFQUFaLEVBQWlELFlBQVcsRUFBQyxPQUFNLGFBQVAsRUFBcUIsU0FBUSxVQUE3QixFQUE1RCxFLFFBQ2JDLE0sR0FB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Q0FBZ0I7QUFDYkMsZUFBSTtBQURTLFNBQWhCO0FBR0Y7QUFJRDs7OztFQXJGK0JOLGVBQUtXLEk7O2tCQUFuQjFCLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBpbXBvcnQgVGFza0JhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Rhc2tiYXIvVGFza0Jhcic7XG4gIGltcG9ydCBNaW5lVGFza0JhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL21pbmV0YXNrYmFyL01pbmVUYXNrQmFyJztcbiAgaW1wb3J0IHt0YXNrTGlzdCxzZWxlY3RSZWNlaXZlfSBmcm9tICcuLi8uLi9hcGkvdGFzayc7XG4gIGltcG9ydCB7U0NIT09MLE9QRU5JRH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbW1vbic7XG4gIGltcG9ydCBUb2FzdCBmcm9tICcuLi8uLi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC90b2FzdC90b2FzdCc7XG4gaW1wb3J0IHtTRVRQQUdFfSBmcm9tICcuLi8uLi9zdG9yZS90eXBlcy9pbmRleCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgIFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOnRydWUsXG4gICAgICBcInVzaW5nQ29tcG9uZW50c1wiOiB7XG4gICAgICAgICBcInZhbi10YWJcIjogXCIvbWluaXByb2dyYW1fbnBtL3ZhbnQtd2VhcHAvdGFiL2luZGV4XCIsXG4gICAgICAgICBcInZhbi10YWJzXCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL3RhYnMvaW5kZXhcIixcbiAgICAgICAgIFwidmFuLXRvYXN0XCI6IFwiL21pbmlwcm9ncmFtX25wbS92YW50LXdlYXBwL3RvYXN0L2luZGV4XCIsXG4gICAgICAgICAgXCJ2YW4tbG9hZGluZ1wiOiBcIi9taW5pcHJvZ3JhbV9ucG0vdmFudC13ZWFwcC9sb2FkaW5nL2luZGV4XCJcblxuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJ0YXNrZGF0YVwiOntcImNvbVwiOlwiVGFza0JhclwiLFwicHJvcHNcIjpcInRhc2tkYXRhXCJ9LFwibWluZWRhdGFcIjp7XCJjb21cIjpcIk1pbmVUYXNrQmFyXCIsXCJwcm9wc1wiOlwidGFza2RhdGFcIn19O1xyXG4kcHJvcHMgPSB7XCJUYXNrQmFyXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJ0YXNrZGF0YVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcIml0ZW0uaWRcIn0sXCJ2LWJpbmQ6dGFza2RhdGEub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInRhc2tkYXRhXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbS5pZFwifX0sXCJNaW5lVGFza0JhclwiOntcInYtYmluZDp0YXNrZGF0YS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwibWluZWRhdGFcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzPXtcbiAgICAgIFRhc2tCYXI6VGFza0JhcixcbiAgICAgIE1pbmVUYXNrQmFyOk1pbmVUYXNrQmFyXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuIFxuICAgIFxuICAgIH1cblxuICAgIG9uUHVsbERvd25SZWZyZXNoKCl7XG4gICAgICBsZXQgc2Nob29sPSAgd2VweS5nZXRTdG9yYWdlU3luYyhTQ0hPT0wpXG4gICAgICB0aGlzLm1ldGhvZHMuaG9tZUxvYWQoc2Nob29sLmlkLHRoaXMsd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKTtcbiAgICB9XG5cbiAgICBvblJlYWNoQm90dG9tKCl7XG4gICAgIFxuICAgICAgLy/lupXpg6jliLfmlrDkuIvkuIDpobVcbiAgICAgIGxldCBzY2hvb2w9ICB3ZXB5LmdldFN0b3JhZ2VTeW5jKFNDSE9PTClcbiAgICAgIGxldCBwYWdlPXdlcHkuJHN0b3JlLmdldFN0YXRlKCkuY29tbW9uLnBhZ2UrMTtcbiAgXG4gICAgICB0aGlzLmlzX2xvYWRpbmc9dHJ1ZTtcbiAgICAgIHRhc2tMaXN0KHsgcGFnZTpwYWdlLCBzY2hvb2xJZDpzY2hvb2wuaWQsIHNpemU6OH0pLnRoZW4ocmVzPT57XG4gICAgICAgICB0aGlzLmlzX2xvYWRpbmc9ZmFsc2U7XG4gICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09PTIwMCl7XG4gICAgICAgICAgaWYocmVzLmRhdGEubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tkYXRhPSB0aGlzLnRhc2tkYXRhLmNvbmNhdChyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuJHN0b3JlLmRpc3BhdGNoKHt0eXBlOlNFVFBBR0UscGF5bG9hZDpwYWdlfSlcbiAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIFRvYXN0KFwi5bey57uP5piv5pyA5bqV6aG15LqG77yBXCIpXG4gICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvYXN0LmZhaWwoJ+e9kee7nOW8guW4uCcpO1xuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgIH0pXG4gICB9XG4gICAgIG9uU2hvdygpe1xuICAgICAgXG5cbiAgICAgIC8vICBsZXQgcXVlcnkgPSB3ZXB5LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKTtcbiAgICAgIC8vICAgcXVlcnkuc2VsZWN0KFwiLnRhc2tfbGlzdFwiKS5ib3VuZGluZ0NsaWVudFJlY3QoXG4gICAgICAvLyAgICAgcmVzPT57XG4gICAgICAvLyAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgICkuZXhlYygpICBcblxuICAgICAgLy/pmLLmraLmnKrlj4rml7bot7PovaznmbvlvZXpobXpnaJcbiAgICAgIGxldCB0aGF0PXRoaXM7XG4gICAgICBsZXQgb3BlbmlkPXdlcHkuZ2V0U3RvcmFnZVN5bmMoT1BFTklEKVxuICAgICAgaWYob3BlbmlkKXtcbiAgICAgICAgIGxldCBzY2hvb2w9ICB3ZXB5LmdldFN0b3JhZ2VTeW5jKFNDSE9PTClcbiAgICAgICAgICBpZighc2Nob29sICYmICFzY2hvb2wuaWQpe1xuICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6Jy9wYWdlcy9zY2hvb2wvc2Nob29sJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLmhvbWVMb2FkKHNjaG9vbC5pZCx0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgXG4gICAgICB9ZWxzZXtcbiAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6Jy9wYWdlcy9sb2dpbi9sb2dpbidcbiAgICAgICAgICB9KVxuICAgICAgfVxuXG5cbiAgICAgXG4gICAgIH1cbiAgICBkYXRhPXtcbiAgICAgICB0YXNrZGF0YTpbXSxcblxuICAgICAgIG1pbmVkYXRhOltdLFxuICAgICAgIGlzX2xvYWRpbmc6ZmFsc2VcbiAgICB9XG5cbiAgICBjb21wdXRlZD17XG4gICAgICAgc2Nob29sKCl7XG4gICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYyhTQ0hPT0wpXG4gICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHM9e1xuICAgICAgdG9TZWxlY3RTY2hvb2woKXtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6Jy9wYWdlcy9zY2hvb2wvc2Nob29sJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgYXN5bmMgaG9tZUxvYWQoaWQsdGhhdCxjYWxsYmFjayl7XG4gICAgICAgIC8v6aaW6aG15Yi35pawXG4gICAgICAgIGxldCByZXNUYXNrPSBhd2FpdCAgdGFza0xpc3QoeyBwYWdlOjEsIHNjaG9vbElkOmlkLCBzaXplOjh9KTtcbiAgICAgICAgIGlmKHJlc1Rhc2suc3RhdHVzQ29kZT09PTIwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGFza2RhdGE9cmVzVGFzay5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS4kc3RvcmUuZGlzcGF0Y2goe3R5cGU6U0VUUEFHRSxwYXlsb2FkOjF9KVxuICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9hc3QuZmFpbCgn572R57uc5byC5bi4Jyk7XG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBsZXQgb3BlbmlkPSAgd2VweS5nZXRTdG9yYWdlU3luYyhPUEVOSUQpO1xuICAgICAgICAgICAgICAgIGxldCByZXNSZWNlaXZlPWF3YWl0IHNlbGVjdFJlY2VpdmUoe29wZW5pZDpvcGVuaWR9KSAgXG4gICAgICAgICAgICAgICAgIGlmKHJlc1JlY2VpdmUuc3RhdHVzQ29kZT09PTIwMCl7XG4gICAgICAgICAgICAgICAgICAgdGhhdC5taW5lZGF0YT1yZXNSZWNlaXZlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WBnOatouS4i+aLieWIt+aWsOWKqOeUu1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICBUb2FzdC5mYWlsKCfnvZHnu5zlvILluLgnKTtcbiAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgICAgICAgXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=