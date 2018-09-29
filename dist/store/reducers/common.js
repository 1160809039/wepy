'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('./../../npm/redux-actions/lib/index.js');

var _common = require('./../types/common.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _common.SETPAGE, function (state, action) {
  return _extends({}, state, {
    page: action.payload
  });
}), _defineProperty(_handleActions, _common.SETADDRESS, function (state, action) {
  return _extends({}, state, {
    address: action.payload
  });
}), _handleActions), {
  page: 1,
  address: 0
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJTRVRQQUdFIiwic3RhdGUiLCJhY3Rpb24iLCJwYWdlIiwicGF5bG9hZCIsIlNFVEFERFJFU1MiLCJhZGRyZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7a0JBSWUsdUZBQ1ZBLGVBRFUsWUFDQUMsS0FEQSxFQUNNQyxNQUROLEVBQ2M7QUFDdkIsc0JBQ0tELEtBREw7QUFFRUUsVUFBTUQsT0FBT0U7QUFGZjtBQUlELENBTlUsbUNBT1ZDLGtCQVBVLFlBT0dKLEtBUEgsRUFPU0MsTUFQVCxFQU9pQjtBQUMxQixzQkFDS0QsS0FETDtBQUVFSyxhQUFTSixPQUFPRTtBQUZsQjtBQUlELENBWlUsb0JBYVY7QUFDREQsUUFBTSxDQURMO0FBRURHLFdBQVE7QUFGUCxDQWJVLEMiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGFuZGxlQWN0aW9ucyB9IGZyb20gJ3JlZHV4LWFjdGlvbnMnXHJcbmltcG9ydCB7IFNFVFBBR0UsU0VUQUREUkVTUyB9IGZyb20gJy4uL3R5cGVzL2NvbW1vbidcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQWN0aW9ucyh7XHJcbiAgICBbU0VUUEFHRV0gKHN0YXRlLGFjdGlvbikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIHBhZ2U6IGFjdGlvbi5wYXlsb2FkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbU0VUQUREUkVTU10gKHN0YXRlLGFjdGlvbikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGFkZHJlc3M6IGFjdGlvbi5wYXlsb2FkXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LCB7XHJcbiAgICBwYWdlOiAxLFxyXG4gICAgYWRkcmVzczowXHJcbiAgfSkiXX0=