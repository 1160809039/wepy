'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('./../../npm/redux/lib/index.js');

var _counter = require('./counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _user = require('./user.js');

var _user2 = _interopRequireDefault(_user);

var _common = require('./common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  counter: _counter2.default,
  user: _user2.default,
  common: _common2.default
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvdW50ZXIiLCJ1c2VyIiwiY29tbW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFDZSw0QkFBZ0I7QUFDN0JBLDRCQUQ2QjtBQUU3QkMsc0JBRjZCO0FBRzdCQztBQUg2QixDQUFoQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgY291bnRlciBmcm9tICcuL2NvdW50ZXInXG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXInXG5pbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgY291bnRlcixcbiAgdXNlcixcbiAgY29tbW9uXG59KSJdfQ==