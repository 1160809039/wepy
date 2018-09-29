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
      pages: ['pages/index/index', 'pages/publish/publish', 'pages/person/person', 'pages/address/list/list', 'pages/address/edit/edit', 'pages/school/school', 'pages/taskinfo/taskinfo', 'pages/minepublish/minepublish', 'pages/publishedit/publishedit', 'pages/login/login', 'pages/taskend/taskend'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsIndlcHkiLCIkc3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImJhY2tncm91bmRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwic2VsZWN0ZWRJY29uUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJzaG93U2hhcmVNZW51IiwiZ2V0U2V0dGluZyIsInRoZW4iLCJyZXMiLCJhdXRoU2V0dGluZyIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwiT1BFTklEIiwiZ2V0VXNlckluZm8iLCJkaXNwYXRjaCIsInR5cGUiLCJVU0VSQUREIiwicGF5bG9hZCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQVFBOztBQUNFOzs7Ozs7Ozs7Ozs7QUFORixJQUFNQSxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7QUFDQUMsZUFBS0MsTUFBTCxHQUFZRixLQUFaOzs7OztBQThERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBdkRmRyxNQXVEZSxHQXZETjtBQUNQQyxhQUFPLENBQ0wsbUJBREssRUFFTCx1QkFGSyxFQUdMLHFCQUhLLEVBSUwseUJBSkssRUFLTCx5QkFMSyxFQU1MLHFCQU5LLEVBT0wseUJBUEssRUFRTCwrQkFSSyxFQVNMLCtCQVRLLEVBVUwsbUJBVkssRUFXTCx1QkFYSyxDQURBO0FBZVBDO0FBQ0VDLDZCQUFxQixPQUR2QjtBQUVFQyxzQ0FBOEIsTUFGaEM7QUFHRUMsZ0NBQXdCLE1BSDFCO0FBSUVDLGdDQUF3QjtBQUoxQixnQ0FLc0IsTUFMdEIsQ0FmTztBQXNCUEMsY0FBTztBQUNMQyxlQUFPLFNBREY7QUFFTEMsdUJBQWUsU0FGVjtBQUdMQyxxQkFBYSxPQUhSO0FBSUxDLHlCQUFpQixTQUpaO0FBS0xDLGNBQU0sQ0FDSjtBQUNFQyxvQkFBVSxtQkFEWjtBQUVFQyxvQkFBVSx3QkFGWjtBQUdFQyw0QkFBaUIsd0JBSG5CO0FBSUVDLGdCQUFNO0FBSlIsU0FESSxFQU9IO0FBQ0NILG9CQUFVLHVCQURYO0FBRUNDLG9CQUFVLHdCQUZYO0FBR0NDLDRCQUFpQix3QkFIbEI7QUFJQ0MsZ0JBQU07QUFKUCxTQVBHLEVBYUo7QUFDRUgsb0JBQVUscUJBRFo7QUFFRUMsb0JBQVUsdUJBRlo7QUFHRUMsNEJBQWlCLHVCQUhuQjtBQUlFQyxnQkFBTTtBQUpSLFNBYkk7QUFMRDtBQXRCQSxLQXVETTtBQUFBLFVBSmZDLFVBSWUsR0FKRjtBQUNYQyxnQkFBVTtBQURDLEtBSUU7O0FBRWIsVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFDQSxVQUFLQSxHQUFMLENBQVMsV0FBVDtBQUhhO0FBSWQ7Ozs7K0JBRVU7O0FBRVQ7QUFDRHJCLHFCQUFLc0IsYUFBTDs7QUFHRDtBQUNDdEIscUJBQUt1QixVQUFMLEdBQWtCQyxJQUFsQixDQUF1QixlQUFLO0FBQ3JCLFlBQUlDLElBQUlDLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDeEM7QUFDQyxjQUFJQyxTQUFPM0IsZUFBSzRCLGNBQUwsQ0FBb0JDLGNBQXBCLENBQVg7QUFDQSxjQUFHRixNQUFILEVBQVU7QUFDRDtBQUNDM0IsMkJBQUs4QixXQUFMLEdBQW1CTixJQUFuQixDQUF3QixlQUFPO0FBQzVCeEIsNkJBQUtDLE1BQUwsQ0FBWThCLFFBQVosQ0FBcUIsRUFBQ0MsTUFBS0MsYUFBTixFQUFjQyxTQUFRVCxJQUFJTCxRQUExQixFQUFyQjtBQUNMLGFBRkU7QUFJTDtBQUVOO0FBRUgsT0FkSDtBQWlCQTs7OztFQXRGMEJwQixlQUFLbUMsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJzsgXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG53ZXB5LiRzdG9yZT1zdG9yZVxuXG5cbmltcG9ydCB7VVNFUkFERH0gZnJvbSAnLi9zdG9yZS90eXBlcy91c2VyJ1xuICBpbXBvcnQge09QRU5JRH0gZnJvbSAnLi9jb25maWcvY29tbW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaW5kZXgvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL3B1Ymxpc2gvcHVibGlzaCcsXG4gICAgICAncGFnZXMvcGVyc29uL3BlcnNvbicsXG4gICAgICAncGFnZXMvYWRkcmVzcy9saXN0L2xpc3QnLFxuICAgICAgJ3BhZ2VzL2FkZHJlc3MvZWRpdC9lZGl0JyxcbiAgICAgICdwYWdlcy9zY2hvb2wvc2Nob29sJyxcbiAgICAgICdwYWdlcy90YXNraW5mby90YXNraW5mbycsXG4gICAgICAncGFnZXMvbWluZXB1Ymxpc2gvbWluZXB1Ymxpc2gnLFxuICAgICAgJ3BhZ2VzL3B1Ymxpc2hlZGl0L3B1Ymxpc2hlZGl0JyxcbiAgICAgICdwYWdlcy9sb2dpbi9sb2dpbicsXG4gICAgICAncGFnZXMvdGFza2VuZC90YXNrZW5kJ1xuICAgIFxuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+agoeWbreW/q+mAkicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTpcImRhcmtcIlxuICAgIH0sXG4gICAgdGFiQmFyOntcbiAgICAgIGNvbG9yOiBcIiM3QTdFODNcIixcbiAgICAgIHNlbGVjdGVkQ29sb3I6IFwiIzdBN0U4M1wiLFxuICAgICAgYm9yZGVyU3R5bGU6IFwid2hpdGVcIixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9pbmRleC9pbmRleFwiLFxuICAgICAgICAgIGljb25QYXRoOiBcInN0YXRpYy9pbWcvaWNvbi/orqLljZUucG5nXCIsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDpcInN0YXRpYy9pbWcvaWNvbi/orqLljZUucG5nXCIsXG4gICAgICAgICAgdGV4dDogXCLku7vliqHljZVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvcHVibGlzaC9wdWJsaXNoXCIsXG4gICAgICAgICAgaWNvblBhdGg6IFwic3RhdGljL2ltZy9pY29uL+a3u+WKoC5wbmdcIixcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOlwic3RhdGljL2ltZy9pY29uL+a3u+WKoC5wbmdcIixcbiAgICAgICAgICB0ZXh0OiBcIuWPkeW4g+S7u+WKoVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9wZXJzb24vcGVyc29uXCIsXG4gICAgICAgICAgaWNvblBhdGg6IFwic3RhdGljL2ltZy9pY29uL+aIkS5wbmdcIixcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOlwic3RhdGljL2ltZy9pY29uL+aIkS5wbmdcIixcbiAgICAgICAgICB0ZXh0OiBcIuaIkVwiXG4gICAgICAgIH1cbiAgICAgICBdXG4gICAgfVxuICB9XG4gIFxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuXG4gICAgLy/miZPlvIDliIbkuqvlip/og71cbiAgIHdlcHkuc2hvd1NoYXJlTWVudSgpXG4gIFxuXG4gIC8v5qOA5p+l5piv5ZCm55m75b2VXG4gICB3ZXB5LmdldFNldHRpbmcoKS50aGVuKHJlcz0+e1xuICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgIC8v5Lul6Ziy5LiH5LiA77yM5qOA5p+l5LiA6YGNb3BlbmlkXG4gICAgICAgICAgbGV0IG9wZW5pZD13ZXB5LmdldFN0b3JhZ2VTeW5jKE9QRU5JRClcbiAgICAgICAgICBpZihvcGVuaWQpe1xuICAgICAgICAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7BcbiAgICAgICAgICAgICAgICAgICAgd2VweS5nZXRVc2VySW5mbygpLnRoZW4ocmVzPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgd2VweS4kc3RvcmUuZGlzcGF0Y2goe3R5cGU6VVNFUkFERCxwYXlsb2FkOnJlcy51c2VySW5mb30pIFxuICAgICAgICAgICAgICAgICB9KSAgXG4gICAgICBcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIFxuICAgICB9KVxuXG4gICAgXG4gIH1cblxuXG59XG4iXX0=