'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _wepyRedux = require('./npm/wepy-redux/lib/index.js');

var _store = require('./store/index.js');

var _store2 = _interopRequireDefault(_store);

var _user = require('./store/types/user.js');

var _common = require('./config/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _store2.default)();
(0, _wepyRedux.setStore)(store);
_wepy2.default.$store = store;

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index/index', 'pages/publish/publish', 'pages/person/person', 'pages/address/list/list', 'pages/address/edit/edit', 'pages/school/school', 'pages/taskinfo/taskinfo', 'pages/minepublish/minepublish', 'pages/publishedit/publishedit', 'pages/login/login', 'pages/taskend/taskend', 'pages/about/about'],
      navigateToMiniProgramAppIdList: ["wx769534252da8f614"],
      window: _defineProperty({
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '校园快递',
        navigationBarTextStyle: 'black'
      }, 'backgroundTextStyle', "dark"),
      tabBar: {
        color: "#7A7E83",
        selectedColor: "#7A7E83",
        borderStyle: "white",
        backgroundColor: "#ffffff",
        list: [{
          pagePath: "pages/index/index",
          iconPath: "static/img/icon/订单.png",
          selectedIconPath: "static/img/icon/订单.png",
          text: "任务单"
        }, {
          pagePath: "pages/publish/publish",
          iconPath: "static/img/icon/添加.png",
          selectedIconPath: "static/img/icon/添加.png",
          text: "发布任务"
        }, {
          pagePath: "pages/person/person",
          iconPath: "static/img/icon/我.png",
          selectedIconPath: "static/img/icon/我.png",
          text: "我"
        }]
      }
    };
    _this.globalData = {
      userInfo: null
    };

    _this.use('requestfix');
    _this.use('promisify');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {

      //打开分享功能
      _wepy2.default.showShareMenu();

      //检查是否登录
      _wepy2.default.getSetting().then(function (res) {
        if (res.authSetting['scope.userInfo']) {
          //以防万一，检查一遍openid
          var openid = _wepy2.default.getStorageSync(_common.OPENID);
          if (openid) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            _wepy2.default.getUserInfo().then(function (res) {
              _wepy2.default.$store.dispatch({ type: _user.USERADD, payload: res.userInfo });
            });
          }
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsIndlcHkiLCIkc3RvcmUiLCJjb25maWciLCJwYWdlcyIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbUFwcElkTGlzdCIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImJhY2tncm91bmRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwic2VsZWN0ZWRJY29uUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJzaG93U2hhcmVNZW51IiwiZ2V0U2V0dGluZyIsInRoZW4iLCJyZXMiLCJhdXRoU2V0dGluZyIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwiT1BFTklEIiwiZ2V0VXNlckluZm8iLCJkaXNwYXRjaCIsInR5cGUiLCJVU0VSQUREIiwicGF5bG9hZCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQVFBOztBQUNFOzs7Ozs7Ozs7Ozs7QUFORixJQUFNQSxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7QUFDQUMsZUFBS0MsTUFBTCxHQUFZRixLQUFaOzs7OztBQWlFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBMURmRyxNQTBEZSxHQTFETjtBQUNQQyxhQUFPLENBQ0wsbUJBREssRUFFTCx1QkFGSyxFQUdMLHFCQUhLLEVBSUwseUJBSkssRUFLTCx5QkFMSyxFQU1MLHFCQU5LLEVBT0wseUJBUEssRUFRTCwrQkFSSyxFQVNMLCtCQVRLLEVBVUwsbUJBVkssRUFXTCx1QkFYSyxFQVlMLG1CQVpLLENBREE7QUFlUEMsc0NBQWdDLENBQ2hDLG9CQURnQyxDQWZ6QjtBQWtCUEM7QUFDRUMsNkJBQXFCLE9BRHZCO0FBRUVDLHNDQUE4QixNQUZoQztBQUdFQyxnQ0FBd0IsTUFIMUI7QUFJRUMsZ0NBQXdCO0FBSjFCLGdDQUtzQixNQUx0QixDQWxCTztBQXlCUEMsY0FBTztBQUNMQyxlQUFPLFNBREY7QUFFTEMsdUJBQWUsU0FGVjtBQUdMQyxxQkFBYSxPQUhSO0FBSUxDLHlCQUFpQixTQUpaO0FBS0xDLGNBQU0sQ0FDSjtBQUNFQyxvQkFBVSxtQkFEWjtBQUVFQyxvQkFBVSx3QkFGWjtBQUdFQyw0QkFBaUIsd0JBSG5CO0FBSUVDLGdCQUFNO0FBSlIsU0FESSxFQU9IO0FBQ0NILG9CQUFVLHVCQURYO0FBRUNDLG9CQUFVLHdCQUZYO0FBR0NDLDRCQUFpQix3QkFIbEI7QUFJQ0MsZ0JBQU07QUFKUCxTQVBHLEVBYUo7QUFDRUgsb0JBQVUscUJBRFo7QUFFRUMsb0JBQVUsdUJBRlo7QUFHRUMsNEJBQWlCLHVCQUhuQjtBQUlFQyxnQkFBTTtBQUpSLFNBYkk7QUFMRDtBQXpCQSxLQTBETTtBQUFBLFVBSmZDLFVBSWUsR0FKRjtBQUNYQyxnQkFBVTtBQURDLEtBSUU7O0FBRWIsVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFDQSxVQUFLQSxHQUFMLENBQVMsV0FBVDtBQUhhO0FBSWQ7Ozs7K0JBRVU7O0FBRVQ7QUFDRHRCLHFCQUFLdUIsYUFBTDs7QUFHRDtBQUNDdkIscUJBQUt3QixVQUFMLEdBQWtCQyxJQUFsQixDQUF1QixlQUFLO0FBQ3JCLFlBQUlDLElBQUlDLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDeEM7QUFDQyxjQUFJQyxTQUFPNUIsZUFBSzZCLGNBQUwsQ0FBb0JDLGNBQXBCLENBQVg7QUFDQSxjQUFHRixNQUFILEVBQVU7QUFDRDtBQUNDNUIsMkJBQUsrQixXQUFMLEdBQW1CTixJQUFuQixDQUF3QixlQUFPO0FBQzVCekIsNkJBQUtDLE1BQUwsQ0FBWStCLFFBQVosQ0FBcUIsRUFBQ0MsTUFBS0MsYUFBTixFQUFjQyxTQUFRVCxJQUFJTCxRQUExQixFQUFyQjtBQUNMLGFBRkU7QUFJTDtBQUVOO0FBRUgsT0FkSDtBQWlCQTs7OztFQXpGMEJyQixlQUFLb0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJzsgXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG53ZXB5LiRzdG9yZT1zdG9yZVxuXG5cbmltcG9ydCB7VVNFUkFERH0gZnJvbSAnLi9zdG9yZS90eXBlcy91c2VyJ1xuICBpbXBvcnQge09QRU5JRH0gZnJvbSAnLi9jb25maWcvY29tbW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaW5kZXgvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL3B1Ymxpc2gvcHVibGlzaCcsXG4gICAgICAncGFnZXMvcGVyc29uL3BlcnNvbicsXG4gICAgICAncGFnZXMvYWRkcmVzcy9saXN0L2xpc3QnLFxuICAgICAgJ3BhZ2VzL2FkZHJlc3MvZWRpdC9lZGl0JyxcbiAgICAgICdwYWdlcy9zY2hvb2wvc2Nob29sJyxcbiAgICAgICdwYWdlcy90YXNraW5mby90YXNraW5mbycsXG4gICAgICAncGFnZXMvbWluZXB1Ymxpc2gvbWluZXB1Ymxpc2gnLFxuICAgICAgJ3BhZ2VzL3B1Ymxpc2hlZGl0L3B1Ymxpc2hlZGl0JyxcbiAgICAgICdwYWdlcy9sb2dpbi9sb2dpbicsXG4gICAgICAncGFnZXMvdGFza2VuZC90YXNrZW5kJyxcbiAgICAgICdwYWdlcy9hYm91dC9hYm91dCdcbiAgICBdLFxuICAgIG5hdmlnYXRlVG9NaW5pUHJvZ3JhbUFwcElkTGlzdDogW1xuICAgIFwid3g3Njk1MzQyNTJkYThmNjE0XCJcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmoKHlm63lv6vpgJInLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6XCJkYXJrXCJcbiAgICB9LFxuICAgIHRhYkJhcjp7XG4gICAgICBjb2xvcjogXCIjN0E3RTgzXCIsXG4gICAgICBzZWxlY3RlZENvbG9yOiBcIiM3QTdFODNcIixcbiAgICAgIGJvcmRlclN0eWxlOiBcIndoaXRlXCIsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvaW5kZXgvaW5kZXhcIixcbiAgICAgICAgICBpY29uUGF0aDogXCJzdGF0aWMvaW1nL2ljb24v6K6i5Y2VLnBuZ1wiLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6XCJzdGF0aWMvaW1nL2ljb24v6K6i5Y2VLnBuZ1wiLFxuICAgICAgICAgIHRleHQ6IFwi5Lu75Yqh5Y2VXCJcbiAgICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL3B1Ymxpc2gvcHVibGlzaFwiLFxuICAgICAgICAgIGljb25QYXRoOiBcInN0YXRpYy9pbWcvaWNvbi/mt7vliqAucG5nXCIsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDpcInN0YXRpYy9pbWcvaWNvbi/mt7vliqAucG5nXCIsXG4gICAgICAgICAgdGV4dDogXCLlj5HluIPku7vliqFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvcGVyc29uL3BlcnNvblwiLFxuICAgICAgICAgIGljb25QYXRoOiBcInN0YXRpYy9pbWcvaWNvbi/miJEucG5nXCIsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDpcInN0YXRpYy9pbWcvaWNvbi/miJEucG5nXCIsXG4gICAgICAgICAgdGV4dDogXCLmiJFcIlxuICAgICAgICB9XG4gICAgICAgXVxuICAgIH1cbiAgfVxuICBcblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XG4gIH1cblxuICBvbkxhdW5jaCgpIHtcblxuICAgIC8v5omT5byA5YiG5Lqr5Yqf6IO9XG4gICB3ZXB5LnNob3dTaGFyZU1lbnUoKVxuICBcblxuICAvL+ajgOafpeaYr+WQpueZu+W9lVxuICAgd2VweS5nZXRTZXR0aW5nKCkudGhlbihyZXM9PntcbiAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAvL+S7pemYsuS4h+S4gO+8jOajgOafpeS4gOmBjW9wZW5pZFxuICAgICAgICAgIGxldCBvcGVuaWQ9d2VweS5nZXRTdG9yYWdlU3luYyhPUEVOSUQpXG4gICAgICAgICAgaWYob3BlbmlkKXtcbiAgICAgICAgICAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzlj6/ku6Xnm7TmjqXosIPnlKggZ2V0VXNlckluZm8g6I635Y+W5aS05YOP5pi156ewXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuZ2V0VXNlckluZm8oKS50aGVuKHJlcz0+ICB7XG4gICAgICAgICAgICAgICAgICAgICAgIHdlcHkuJHN0b3JlLmRpc3BhdGNoKHt0eXBlOlVTRVJBREQscGF5bG9hZDpyZXMudXNlckluZm99KSBcbiAgICAgICAgICAgICAgICAgfSkgIFxuICAgICAgXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICBcbiAgICAgfSlcblxuICAgIFxuICB9XG5cblxufVxuIl19