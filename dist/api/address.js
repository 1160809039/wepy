'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteAddress = exports.selectDefault = exports.editAddress = exports.selectAddress = exports.addressList = exports.saveAddress = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../config/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveAddress = exports.saveAddress = function saveAddress(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'saveAddress',
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

var addressList = exports.addressList = function addressList(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'addressList',
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

var selectAddress = exports.selectAddress = function selectAddress(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'selectAddress',
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

var editAddress = exports.editAddress = function editAddress(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'editAddress',
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
var selectDefault = exports.selectDefault = function selectDefault(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'selectDefault',
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

var deleteAddress = exports.deleteAddress = function deleteAddress(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'deleteAddress',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsic2F2ZUFkZHJlc3MiLCJwYXJhbSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJET01BSU4iLCJkYXRhIiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsInJlcyIsImNhdGNoIiwiYWRkcmVzc0xpc3QiLCJzZWxlY3RBZGRyZXNzIiwiZWRpdEFkZHJlc3MiLCJzZWxlY3REZWZhdWx0IiwiZGVsZXRlQWRkcmVzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFFTyxJQUFNQSxvQ0FBWSxTQUFaQSxXQUFZLENBQVNDLEtBQVQsRUFBZTtBQUNwQyxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDakNDLHVCQUFLQyxPQUFMLENBQWE7QUFDVEMsaUJBQUtDLGlCQUFPLGFBREg7QUFFVEMsa0JBQU1SLEtBRkc7QUFHVFMsb0JBQU8sTUFIRTtBQUlUQyxvQkFBUTtBQUNOLGdDQUFnQjtBQURWO0FBSkMsU0FBYixFQU9HQyxJQVBILENBUUk7QUFBQSxtQkFBS1QsUUFBUVUsR0FBUixDQUFMO0FBQUEsU0FSSixFQVNFQyxLQVRGLENBVUk7QUFBQSxtQkFBS1YsT0FBT1MsR0FBUCxDQUFMO0FBQUEsU0FWSjtBQVlILEtBYk0sQ0FBUDtBQWNILENBZk07O0FBaUJBLElBQU1FLG9DQUFZLFNBQVpBLFdBQVksQ0FBU2QsS0FBVCxFQUFlO0FBQ3BDLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNqQ0MsdUJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxpQkFBS0MsaUJBQU8sYUFESDtBQUVUQyxrQkFBTVIsS0FGRztBQUdUUyxvQkFBTyxNQUhFO0FBSVRDLG9CQUFRO0FBQ04sZ0NBQWdCO0FBRFY7QUFKQyxTQUFiLEVBT0dDLElBUEgsQ0FRSTtBQUFBLG1CQUFLVCxRQUFRVSxHQUFSLENBQUw7QUFBQSxTQVJKLEVBU0VDLEtBVEYsQ0FVSTtBQUFBLG1CQUFLVixPQUFPUyxHQUFQLENBQUw7QUFBQSxTQVZKO0FBWUgsS0FiTSxDQUFQO0FBY0gsQ0FmTTs7QUFpQkEsSUFBTUcsd0NBQWMsU0FBZEEsYUFBYyxDQUFTZixLQUFULEVBQWU7QUFDdEMsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtCO0FBQ2pDQyx1QkFBS0MsT0FBTCxDQUFhO0FBQ1RDLGlCQUFLQyxpQkFBTyxlQURIO0FBRVRDLGtCQUFNUixLQUZHO0FBR1RTLG9CQUFPLE1BSEU7QUFJVEMsb0JBQVE7QUFDTixnQ0FBZ0I7QUFEVjtBQUpDLFNBQWIsRUFPR0MsSUFQSCxDQVFJO0FBQUEsbUJBQUtULFFBQVFVLEdBQVIsQ0FBTDtBQUFBLFNBUkosRUFTRUMsS0FURixDQVVJO0FBQUEsbUJBQUtWLE9BQU9TLEdBQVAsQ0FBTDtBQUFBLFNBVko7QUFZSCxLQWJNLENBQVA7QUFjSCxDQWZNOztBQWtCQSxJQUFNSSxvQ0FBWSxTQUFaQSxXQUFZLENBQVNoQixLQUFULEVBQWU7QUFDcEMsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtCO0FBQ2pDQyx1QkFBS0MsT0FBTCxDQUFhO0FBQ1RDLGlCQUFLQyxpQkFBTyxhQURIO0FBRVRDLGtCQUFNUixLQUZHO0FBR1RTLG9CQUFPLE1BSEU7QUFJVEMsb0JBQVE7QUFDTixnQ0FBZ0I7QUFEVjtBQUpDLFNBQWIsRUFPR0MsSUFQSCxDQVFJO0FBQUEsbUJBQUtULFFBQVFVLEdBQVIsQ0FBTDtBQUFBLFNBUkosRUFTRUMsS0FURixDQVVJO0FBQUEsbUJBQUtWLE9BQU9TLEdBQVAsQ0FBTDtBQUFBLFNBVko7QUFZSCxLQWJNLENBQVA7QUFjSCxDQWZNO0FBZ0JBLElBQU1LLHdDQUFjLFNBQWRBLGFBQWMsQ0FBU2pCLEtBQVQsRUFBZTtBQUN0QyxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDakNDLHVCQUFLQyxPQUFMLENBQWE7QUFDVEMsaUJBQUtDLGlCQUFPLGVBREg7QUFFVEMsa0JBQU1SLEtBRkc7QUFHVFMsb0JBQU8sTUFIRTtBQUlUQyxvQkFBUTtBQUNOLGdDQUFnQjtBQURWO0FBSkMsU0FBYixFQU9HQyxJQVBILENBUUk7QUFBQSxtQkFBS1QsUUFBUVUsR0FBUixDQUFMO0FBQUEsU0FSSixFQVNFQyxLQVRGLENBVUk7QUFBQSxtQkFBS1YsT0FBT1MsR0FBUCxDQUFMO0FBQUEsU0FWSjtBQVlILEtBYk0sQ0FBUDtBQWNILENBZk07O0FBa0JBLElBQU1NLHdDQUFjLFNBQWRBLGFBQWMsQ0FBU2xCLEtBQVQsRUFBZTtBQUN0QyxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDakNDLHVCQUFLQyxPQUFMLENBQWE7QUFDVEMsaUJBQUtDLGlCQUFPLGVBREg7QUFFVEMsa0JBQU1SLEtBRkc7QUFHVFMsb0JBQU8sTUFIRTtBQUlUQyxvQkFBUTtBQUNOLGdDQUFnQjtBQURWO0FBSkMsU0FBYixFQU9HQyxJQVBILENBUUk7QUFBQSxtQkFBS1QsUUFBUVUsR0FBUixDQUFMO0FBQUEsU0FSSixFQVNFQyxLQVRGLENBVUk7QUFBQSxtQkFBS1YsT0FBT1MsR0FBUCxDQUFMO0FBQUEsU0FWSjtBQVlILEtBYk0sQ0FBUDtBQWNILENBZk0iLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5pbXBvcnQge0RPTUFJTn0gZnJvbSAnLi4vY29uZmlnL2NvbW1vbic7XHJcblxyXG5leHBvcnQgY29uc3Qgc2F2ZUFkZHJlc3M9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnc2F2ZUFkZHJlc3MnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSkgXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhZGRyZXNzTGlzdD1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKydhZGRyZXNzTGlzdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHJlcz0+cmVzb2x2ZShyZXMpXHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgcmVzPT5yZWplY3QocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9KSBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNlbGVjdEFkZHJlc3M9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnc2VsZWN0QWRkcmVzcycsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHJlcz0+cmVzb2x2ZShyZXMpXHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgcmVzPT5yZWplY3QocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9KSBcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBlZGl0QWRkcmVzcz1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKydlZGl0QWRkcmVzcycsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHJlcz0+cmVzb2x2ZShyZXMpXHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgcmVzPT5yZWplY3QocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9KSBcclxufVxyXG5leHBvcnQgY29uc3Qgc2VsZWN0RGVmYXVsdD1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKydzZWxlY3REZWZhdWx0JyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pIFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFkZHJlc3M9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnZGVsZXRlQWRkcmVzcycsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHJlcz0+cmVzb2x2ZShyZXMpXHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgcmVzPT5yZWplY3QocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9KSBcclxufVxyXG4iXX0=