'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectUser = exports.login = exports.getOpenId = undefined;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiZ2V0T3BlbklkIiwicGFyYW0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiRE9NQUlOIiwiZGF0YSIsIm1ldGhvZCIsImhlYWRlciIsInRoZW4iLCJyZXMiLCJjYXRjaCIsImxvZ2luIiwic2VsZWN0VXNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFFTyxJQUFNQSxnQ0FBVSxTQUFWQSxTQUFVLENBQVNDLEtBQVQsRUFBZTtBQUNsQyxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDakNDLHVCQUFLQyxPQUFMLENBQWE7QUFDVEMsaUJBQUtDLGlCQUFPLFdBREg7QUFFVEMsa0JBQU1SLEtBRkc7QUFHVFMsb0JBQU8sTUFIRTtBQUlUQyxvQkFBUTtBQUNOLGdDQUFnQjtBQURWO0FBSkMsU0FBYixFQU9HQyxJQVBILENBUUk7QUFBQSxtQkFBS1QsUUFBUVUsR0FBUixDQUFMO0FBQUEsU0FSSixFQVNFQyxLQVRGLENBVUk7QUFBQSxtQkFBS1YsT0FBT1MsR0FBUCxDQUFMO0FBQUEsU0FWSjtBQVlILEtBYk0sQ0FBUDtBQWNILENBZk07O0FBa0JBLElBQU1FLHdCQUFNLFNBQU5BLEtBQU0sQ0FBU2QsS0FBVCxFQUFlO0FBQzlCLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNqQyxlQUFPQyxlQUFLQyxPQUFMLENBQWE7QUFDaEJDLGlCQUFLQyxpQkFBTyxPQURJO0FBRWhCQyxrQkFBTVIsS0FGVTtBQUdoQlMsb0JBQU8sTUFIUztBQUloQkMsb0JBQVE7QUFDTixnQ0FBZ0I7QUFEVjtBQUpRLFNBQWIsRUFPSkMsSUFQSSxDQVFIO0FBQUEsbUJBQUtULFFBQVFVLEdBQVIsQ0FBTDtBQUFBLFNBUkcsRUFTTEMsS0FUSyxDQVVIO0FBQUEsbUJBQUtWLE9BQU9TLEdBQVAsQ0FBTDtBQUFBLFNBVkcsQ0FBUDtBQVlILEtBYk0sQ0FBUDtBQWNILENBZk07QUFnQkEsSUFBTUcsa0NBQVcsU0FBWEEsVUFBVyxDQUFTZixLQUFULEVBQWU7QUFDbkMsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtCO0FBQ2pDLGVBQU9DLGVBQUtDLE9BQUwsQ0FBYTtBQUNoQkMsaUJBQUtDLGlCQUFPLFlBREk7QUFFaEJDLGtCQUFNUixLQUZVO0FBR2hCUyxvQkFBTyxNQUhTO0FBSWhCQyxvQkFBUTtBQUNOLGdDQUFnQjtBQURWO0FBSlEsU0FBYixFQU9KQyxJQVBJLENBUUg7QUFBQSxtQkFBS1QsUUFBUVUsR0FBUixDQUFMO0FBQUEsU0FSRyxFQVNMQyxLQVRLLENBVUg7QUFBQSxtQkFBS1YsT0FBT1MsR0FBUCxDQUFMO0FBQUEsU0FWRyxDQUFQO0FBWUgsS0FiTSxDQUFQO0FBY0gsQ0FmTSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmltcG9ydCB7RE9NQUlOfSBmcm9tICcuLi9jb25maWcvY29tbW9uJztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRPcGVuSWQ9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnZ2V0T3BlbklkJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pIFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2luPWZ1bmN0aW9uKHBhcmFtKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKydsb2dpbicsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHJlcz0+cmVzb2x2ZShyZXMpXHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgcmVzPT5yZWplY3QocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9KSBcclxufVxyXG5leHBvcnQgY29uc3Qgc2VsZWN0VXNlcj1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnc2VsZWN0VXNlcicsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHJlcz0+cmVzb2x2ZShyZXMpXHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgcmVzPT5yZWplY3QocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9KSBcclxufVxyXG4iXX0=