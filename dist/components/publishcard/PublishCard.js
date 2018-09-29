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

var PublishCard = function (_wepy$component) {
  _inherits(PublishCard, _wepy$component);

  function PublishCard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PublishCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PublishCard.__proto__ || Object.getPrototypeOf(PublishCard)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      taskdata: {
        type: Object
      }
    }, _this.methods = {
      toEdit: function toEdit() {
        _wepy2.default.navigateTo({
          url: '/pages/publishedit/publishedit?id=' + this.taskdata.id
        });
      },

      //删除该任务
      deleteTask: function deleteTask(id) {
        var _this2 = this;

        _wepy2.default.showModal({
          content: '确定删除？',
          confirmColor: '#F56C6C'
        }).then(function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj) {
            var res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!obj.confirm) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 3;
                    return (0, _task.deleteTaskById)({ id: id });

                  case 3:
                    res = _context.sent;

                    if (res.statusCode === 200 && res.data.id) {
                      _wepy2.default.showToast({
                        title: '删除成功'
                      });
                      //删除成功刷新父页面
                      _this2.$emit('homeReflesh');
                    } else {
                      _wepy2.default.showToast({
                        title: '删除失败'
                      });
                    }

                  case 5:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PublishCard;
}(_wepy2.default.component);

exports.default = PublishCard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlB1Ymxpc2hDYXJkLmpzIl0sIm5hbWVzIjpbIlB1Ymxpc2hDYXJkIiwicHJvcHMiLCJ0YXNrZGF0YSIsInR5cGUiLCJPYmplY3QiLCJtZXRob2RzIiwidG9FZGl0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsImRlbGV0ZVRhc2siLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybUNvbG9yIiwidGhlbiIsIm9iaiIsImNvbmZpcm0iLCJyZXMiLCJzdGF0dXNDb2RlIiwiZGF0YSIsInNob3dUb2FzdCIsInRpdGxlIiwiJGVtaXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDc0JBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUdwQkMsSyxHQUFNO0FBQ0ZDLGdCQUFTO0FBQ0xDLGNBQUtDO0FBREE7QUFEUCxLLFFBS0xDLE8sR0FBUTtBQUNMQyxZQURLLG9CQUNHO0FBQ0pDLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUksdUNBQXFDLEtBQUtQLFFBQUwsQ0FBY1E7QUFEekMsU0FBaEI7QUFHRixPQUxHOztBQU1KO0FBQ0RDLGdCQVBLLHNCQU9NRCxFQVBOLEVBT1M7QUFBQTs7QUFDWkgsdUJBQUtLLFNBQUwsQ0FBZTtBQUNYQyxtQkFBUSxPQURHO0FBRVhDLHdCQUFhO0FBRkYsU0FBZixFQUdHQyxJQUhIO0FBQUEsOEVBR1EsaUJBQU1DLEdBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQ0hBLElBQUlDLE9BREQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSwyQkFHZSwwQkFBZSxFQUFDUCxJQUFHQSxFQUFKLEVBQWYsQ0FIZjs7QUFBQTtBQUdLUSx1QkFITDs7QUFJRSx3QkFBR0EsSUFBSUMsVUFBSixLQUFpQixHQUFqQixJQUFzQkQsSUFBSUUsSUFBSixDQUFTVixFQUFsQyxFQUFxQztBQUNsQ0gscUNBQUtjLFNBQUwsQ0FBZTtBQUNiQywrQkFBTTtBQURPLHVCQUFmO0FBR0E7QUFDQSw2QkFBS0MsS0FBTCxDQUFXLGFBQVg7QUFDRixxQkFORCxNQU1LO0FBQ0ZoQixxQ0FBS2MsU0FBTCxDQUFlO0FBQ2JDLCtCQUFNO0FBRE8sdUJBQWY7QUFHRjs7QUFkSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUhSOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0JBO0FBNUJHLEs7Ozs7RUFSK0JmLGVBQUtpQixTOztrQkFBekJ4QixXIiwiZmlsZSI6IlB1Ymxpc2hDYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7ZGVsZXRlVGFza0J5SWR9IGZyb20gJy4uLy4uL2FwaS90YXNrJ1xyXG5leHBvcnQgZGVmYXVsdCAgY2xhc3MgUHVibGlzaENhcmQgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcclxuXHJcbiAgIFxyXG4gIHByb3BzPXtcclxuICAgICAgdGFza2RhdGE6e1xyXG4gICAgICAgICAgdHlwZTpPYmplY3RcclxuICAgICAgfVxyXG4gIH1cclxuICAgbWV0aG9kcz17XHJcbiAgICAgIHRvRWRpdCgpe1xyXG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOicvcGFnZXMvcHVibGlzaGVkaXQvcHVibGlzaGVkaXQ/aWQ9Jyt0aGlzLnRhc2tkYXRhLmlkXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgfSwgXHJcbiAgICAgICAvL+WIoOmZpOivpeS7u+WKoVxyXG4gICAgICBkZWxldGVUYXNrKGlkKXtcclxuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6J+ehruWumuWIoOmZpO+8nycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1Db2xvcjonI0Y1NkM2QydcclxuICAgICAgICB9KS50aGVuKGFzeW5jIG9iaj0+e1xyXG4gICAgICAgICAgaWYob2JqLmNvbmZpcm0pe1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgbGV0IHJlcz1hd2FpdCBkZWxldGVUYXNrQnlJZCh7aWQ6aWR9KTtcclxuICAgICAgICAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGU9PT0yMDAmJnJlcy5kYXRhLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifliKDpmaTmiJDlip8nXHJcbiAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgIC8v5Yig6Zmk5oiQ5Yqf5Yi35paw54i26aG16Z2iXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2hvbWVSZWZsZXNoJyk7XHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+WIoOmZpOWksei0pSdcclxuICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==