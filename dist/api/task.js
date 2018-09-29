'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectTaskMinePublish = exports.updateReceiveConfirmEnd = exports.selectTaskMineOver = exports.updateTask = exports.deleteTaskById = exports.selectTaskConfirmed = exports.selectTaskByOpenId = exports.updateReceiveEnd = exports.updateReceiveDelete = exports.getTaskById = exports.selectReceive = exports.saveReceive = exports.saveTask = exports.taskList = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../config/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskList = exports.taskList = function taskList(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'tasklist',
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

var saveTask = exports.saveTask = function saveTask(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'saveTask',
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
var saveReceive = exports.saveReceive = function saveReceive(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'saveReceive',
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

var selectReceive = exports.selectReceive = function selectReceive(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'selectReceive',
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
var getTaskById = exports.getTaskById = function getTaskById(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'getTaskById',
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

var updateReceiveDelete = exports.updateReceiveDelete = function updateReceiveDelete(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'updateReceiveDelete',
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
var updateReceiveEnd = exports.updateReceiveEnd = function updateReceiveEnd(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'updateReceiveEnd',
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

var selectTaskByOpenId = exports.selectTaskByOpenId = function selectTaskByOpenId(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'selectTaskByOpenId',
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

var selectTaskConfirmed = exports.selectTaskConfirmed = function selectTaskConfirmed(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'selectTaskConfirmed',
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

var deleteTaskById = exports.deleteTaskById = function deleteTaskById(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'deleteTaskById',
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

var updateTask = exports.updateTask = function updateTask(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'updateTask',
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

var selectTaskMineOver = exports.selectTaskMineOver = function selectTaskMineOver(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'selectTaskMineOver',
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

var updateReceiveConfirmEnd = exports.updateReceiveConfirmEnd = function updateReceiveConfirmEnd(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'updateReceiveConfirmEnd',
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

var selectTaskMinePublish = exports.selectTaskMinePublish = function selectTaskMinePublish(param) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _common.DOMAIN + 'selectTaskMinePublish',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2suanMiXSwibmFtZXMiOlsidGFza0xpc3QiLCJwYXJhbSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJET01BSU4iLCJkYXRhIiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsInJlcyIsImNhdGNoIiwic2F2ZVRhc2siLCJzYXZlUmVjZWl2ZSIsInNlbGVjdFJlY2VpdmUiLCJnZXRUYXNrQnlJZCIsInVwZGF0ZVJlY2VpdmVEZWxldGUiLCJ1cGRhdGVSZWNlaXZlRW5kIiwic2VsZWN0VGFza0J5T3BlbklkIiwic2VsZWN0VGFza0NvbmZpcm1lZCIsImRlbGV0ZVRhc2tCeUlkIiwidXBkYXRlVGFzayIsInNlbGVjdFRhc2tNaW5lT3ZlciIsInVwZGF0ZVJlY2VpdmVDb25maXJtRW5kIiwic2VsZWN0VGFza01pbmVQdWJsaXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUVPLElBQU1BLDhCQUFTLFNBQVRBLFFBQVMsQ0FBU0MsS0FBVCxFQUFlO0FBQ2pDLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNqQ0MsdUJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxpQkFBS0MsaUJBQU8sVUFESDtBQUVUQyxrQkFBTVIsS0FGRztBQUdUUyxvQkFBTyxNQUhFO0FBSVRDLG9CQUFRO0FBQ04sZ0NBQWdCO0FBRFY7QUFKQyxTQUFiLEVBT0dDLElBUEgsQ0FRSTtBQUFBLG1CQUFLVCxRQUFRVSxHQUFSLENBQUw7QUFBQSxTQVJKLEVBU0VDLEtBVEYsQ0FVSTtBQUFBLG1CQUFLVixPQUFPUyxHQUFQLENBQUw7QUFBQSxTQVZKO0FBWUgsS0FiTSxDQUFQO0FBY0gsQ0FmTTs7QUFpQkEsSUFBTUUsOEJBQVMsU0FBVEEsUUFBUyxDQUFTZCxLQUFULEVBQWU7QUFDakMsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtC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QVRGLENBVUk7QUFBQSxtQkFBS1YsT0FBT1MsR0FBUCxDQUFMO0FBQUEsU0FWSjtBQVlILEtBYk0sQ0FBUDtBQWNILENBZk0iLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5pbXBvcnQge0RPTUFJTn0gZnJvbSAnLi4vY29uZmlnL2NvbW1vbic7XHJcblxyXG5leHBvcnQgY29uc3QgdGFza0xpc3Q9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisndGFza2xpc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNhdmVUYXNrPWZ1bmN0aW9uKHBhcmFtKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBET01BSU4rJ3NhdmVUYXNrJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNhdmVSZWNlaXZlPWZ1bmN0aW9uKHBhcmFtKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBET01BSU4rJ3NhdmVSZWNlaXZlJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RSZWNlaXZlPWZ1bmN0aW9uKHBhcmFtKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBET01BSU4rJ3NlbGVjdFJlY2VpdmUnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSlcclxufVxyXG5leHBvcnQgY29uc3QgZ2V0VGFza0J5SWQ9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnZ2V0VGFza0J5SWQnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVSZWNlaXZlRGVsZXRlPWZ1bmN0aW9uKHBhcmFtKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBET01BSU4rJ3VwZGF0ZVJlY2VpdmVEZWxldGUnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSlcclxufVxyXG5leHBvcnQgY29uc3QgdXBkYXRlUmVjZWl2ZUVuZD1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKyd1cGRhdGVSZWNlaXZlRW5kJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RUYXNrQnlPcGVuSWQ9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnc2VsZWN0VGFza0J5T3BlbklkJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RUYXNrQ29uZmlybWVkPWZ1bmN0aW9uKHBhcmFtKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBET01BSU4rJ3NlbGVjdFRhc2tDb25maXJtZWQnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVUYXNrQnlJZD1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKydkZWxldGVUYXNrQnlJZCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHJlcz0+cmVzb2x2ZShyZXMpXHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgcmVzPT5yZWplY3QocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVRhc2s9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisndXBkYXRlVGFzaycsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHJlcz0+cmVzb2x2ZShyZXMpXHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgcmVzPT5yZWplY3QocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHNlbGVjdFRhc2tNaW5lT3Zlcj1mdW5jdGlvbihwYXJhbSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogRE9NQUlOKydzZWxlY3RUYXNrTWluZU92ZXInLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICByZXM9PnJlc29sdmUocmVzKVxyXG4gICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgIHJlcz0+cmVqZWN0KHJlcylcclxuICAgICAgICApO1xyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVJlY2VpdmVDb25maXJtRW5kPWZ1bmN0aW9uKHBhcmFtKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBET01BSU4rJ3VwZGF0ZVJlY2VpdmVDb25maXJtRW5kJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RUYXNrTWluZVB1Ymxpc2g9ZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IERPTUFJTisnc2VsZWN0VGFza01pbmVQdWJsaXNoJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgcmVzPT5yZXNvbHZlKHJlcylcclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICByZXM9PnJlamVjdChyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbiJdfQ==