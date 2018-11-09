'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.templeteMessege = exports.selectUser = exports.login = exports.getAceessToken = exports.getOpenId = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../config/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOpenId = exports.getOpenId = function getOpenId(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'getOpenId',
            data: param,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }
        }).then(function (res) {
            return resolve(res);
        }).catch(function (res) {
            return reject(res);
        });
    });
};

var getAceessToken = exports.getAceessToken = function getAceessToken(param) {
    return new Promise(function (resolve, reject) {
        return _wepy2.default.request({
            url: _common.DOMAIN + 'getAceessToken',
            data: param,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }
        }).then(function (res) {
            return resolve(res);
        }).catch(function (res) {
            return reject(res);
        });
    });
};
var login = exports.login = function login(param) {
    return new Promise(function (resolve, reject) {
        return _wepy2.default.request({
            url: _common.DOMAIN + 'login',
            data: param,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }
        }).then(function (res) {
            return resolve(res);
        }).catch(function (res) {
            return reject(res);
        });
    });
};
var selectUser = exports.selectUser = function selectUser(param) {
    return new Promise(function (resolve, reject) {
        return _wepy2.default.request({
            url: _common.DOMAIN + 'selectUser',
            data: param,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }
        }).then(function (res) {
            return resolve(res);
        }).catch(function (res) {
            return reject(res);
        });
    });
};

var templeteMessege = exports.templeteMessege = function templeteMessege(param) {
    return new Promise(function (resolve, reject) {
        return _wepy2.default.request({
            url: _common.DOMAIN + 'templeteMessege',
            data: param,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }
        }).then(function (res) {
            return resolve(res);
        }).catch(function (res) {
            return reject(res);
        });
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiZ2V0T3BlbklkIiwicGFyYW0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiRE9NQUlOIiwiZGF0YSIsIm1ldGhvZCIsImhlYWRlciIsInRoZW4iLCJyZXMiLCJjYXRjaCIsImdldEFjZWVzc1Rva2VuIiwibG9naW4iLCJzZWxlY3RVc2VyIiwidGVtcGxldGVNZXNzZWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUVPLElBQU1BLGdDQUFVLFNBQVZBLFNBQVUsQ0FBU0MsS0FBVCxFQUFlO0FBQ2xDLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNqQ0MsdUJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxpQkFBS0MsaUJBQU8sV0FESDtBQUVUQyxrQkFBTVIsS0FGRztBQUdUUyxvQkFBTyxNQUhFO0FBSVRDLG9CQUFRO0FBQ04sZ0NBQWdCO0FBRFY7QUFKQyxTQUFiLEVBT0dDLElBUEgsQ0FRSTtBQUFBLG1CQUFLVCxRQUFRVSxHQUFSLENBQUw7QUFBQSxTQVJKLEVBU0VDLEtBVEYsQ0FVSTtBQUFBLG1CQUFLVixPQUFPUyxHQUFQLENBQUw7QUFBQSxTQVZKO0FBWUgsS0FiTSxDQUFQO0FBY0gsQ0FmTTs7QUFrQkEsSUFBTUUsMENBQWUsU0FBZkEsY0FBZSxDQUFTZCxLQUFULEVBQWU7QUFDdkMsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtCO0FBQ2pDLGVBQU9DLGVBQUtDLE9BQUwsQ0FBYTtBQUNoQkMsaUJBQUtDLGlCQUFPLGdCQURJO0FBRWhCQyxrQkFBTVIsS0FGVTtBQUdoQlMsb0JBQU8sTUFIUztBQUloQkMsb0JBQVE7QUFDTixnQ0FBZ0I7QUFEVjtBQUpRLFNBQWIsRUFPSkMsSUFQSSxDQVFIO0FBQUEsbUJBQUtULFFBQVFVLEdBQVIsQ0FBTDtBQUFBLFNBUkcsRUFTTEMsS0FUSyxDQVVIO0FBQUEsbUJBQUtWLE9BQU9TLEdBQVAsQ0FBTDtBQUFBLFNBVkcsQ0FBUDtBQVlILEtBYk0sQ0FBUDtBQWNILENBZk07QUFnQkEsSUFBTUcsd0JBQU0sU0FBTkEsS0FBTSxDQUFTZixLQUFULEVBQWU7QUFDOUIsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtCO0FBQ2pDLGVBQU9DLGVBQUtDLE9BQUwsQ0FBYTtBQUNoQkMsaUJBQUtDLGlCQUFPLE9BREk7QUFFaEJDLGtCQUFNUixLQUZVO0FBR2hCUyxvQkFBTyxNQUhTO0FBSWhCQyxvQkFBUTtBQUNOLGdDQUFnQjtBQURWO0FBSlEsU0FBYixFQU9KQyxJQVBJLENBUUg7QUFBQSxtQkFBS1QsUUFBUVUsR0FBUixDQUFMO0FBQUEsU0FSRyxFQVNMQyxLQVRLLENBVUg7QUFBQSxtQkFBS1YsT0FBT1MsR0FBUCxDQUFMO0FBQUEsU0FWRyxDQUFQO0FBWUgsS0FiTSxDQUFQO0FBY0gsQ0FmTTtBQWdCQSxJQUFNSSxrQ0FBVyxTQUFYQSxVQUFXLENBQVNoQixLQUFULEVBQWU7QUFDbkMsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtCO0FBQ2pDLGVBQU9DLGVBQUtDLE9BQUwsQ0FBYTtBQUNoQkMsaUJBQUtDLGlCQUFPLFlBREk7QUFFaEJDLGtCQUFNUixLQUZVO0FBR2hCUyxvQkFBTyxNQUhTO0FBSWhCQyxvQkFBUTtBQUNOLGdDQUFnQjtBQURWO0FBSlEsU0FBYixFQU9KQyxJQVBJLENBUUg7QUFBQSxtQkFBS1QsUUFBUVUsR0FBUixDQUFMO0FBQUEsU0FSRyxFQVNMQyxLQVRLLENBVUg7QUFBQSxtQkFBS1YsT0FBT1MsR0FBUCxDQUFMO0FBQUEsU0FWRyxDQUFQO0FBWUgsS0FiTSxDQUFQO0FBY0gsQ0FmTTs7QUFrQkEsSUFBTUssNENBQWdCLFNBQWhCQSxlQUFnQixDQUFTakIsS0FBVCxFQUFlO0FBQ3hDLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNqQyxlQUFPQyxlQUFLQyxPQUFMLENBQWE7QUFDaEJDLGlCQUFLQyxpQkFBTyxpQkFESTtBQUVoQkMsa0JBQU1SLEtBRlU7QUFHaEJTLG9CQUFPLE1BSFM7QUFJaEJDLG9CQUFRO0FBQ04sZ0NBQWdCO0FBRFY7QUFKUSxTQUFiLEVBT0pDLElBUEksQ0FRSDtBQUFBLG1CQUFLVCxRQUFRVSxHQUFSLENBQUw7QUFBQSxTQVJHLEVBU0xDLEtBVEssQ0FVSDtBQUFBLG1CQUFLVixPQUFPUyxHQUFQLENBQUw7QUFBQSxTQVZHLENBQVA7QUFZSCxLQWJNLENBQVA7QUFjSCxDQWZNIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuaW1wb3J0IHtET01BSU59IGZyb20gJy4uL2NvbmZpZy9jb21tb24nO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE9wZW5JZD1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKydnZXRPcGVuSWQnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSkgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWNlZXNzVG9rZW49ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBET01BSU4rJ2dldEFjZWVzc1Rva2VuJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pIFxyXG59XHJcbmV4cG9ydCBjb25zdCBsb2dpbj1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnbG9naW4nLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSkgXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNlbGVjdFVzZXI9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBET01BSU4rJ3NlbGVjdFVzZXInLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSkgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgdGVtcGxldGVNZXNzZWdlPWZ1bmN0aW9uKHBhcmFtKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKyd0ZW1wbGV0ZU1lc3NlZ2UnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSkgXHJcbn1cclxuIl19