'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('./../../npm/redux-actions/lib/index.js');

var _user = require('./../types/user.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (0, _reduxActions.handleActions)(_defineProperty({}, _user.USERADD, function (state, action) {
  return _extends({}, state, {
    userinfo: action.payload
  });
}), {
  userinfo: {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVVNFUkFERCIsInN0YXRlIiwiYWN0aW9uIiwidXNlcmluZm8iLCJwYXlsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O2tCQUllLHFEQUNWQSxhQURVLFlBQ0FDLEtBREEsRUFDTUMsTUFETixFQUNjO0FBQ3ZCLHNCQUNLRCxLQURMO0FBRUVFLGNBQVVELE9BQU9FO0FBRm5CO0FBSUQsQ0FOVSxHQVFWO0FBQ0RELFlBQVU7QUFEVCxDQVJVLEMiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJ1xyXG5pbXBvcnQgeyBVU0VSQUREIH0gZnJvbSAnLi4vdHlwZXMvdXNlcidcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQWN0aW9ucyh7XHJcbiAgICBbVVNFUkFERF0gKHN0YXRlLGFjdGlvbikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIHVzZXJpbmZvOiBhY3Rpb24ucGF5bG9hZFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgfSwge1xyXG4gICAgdXNlcmluZm86IHt9XHJcbiAgfSkiXX0=