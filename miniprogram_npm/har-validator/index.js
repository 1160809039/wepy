module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577188111, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.afterRequest = afterRequest;
exports.beforeRequest = beforeRequest;
exports.browser = browser;
exports.cache = cache;
exports.content = content;
exports.cookie = cookie;
exports.creator = creator;
exports.entry = entry;
exports.har = har;
exports.header = header;
exports.log = log;
exports.page = page;
exports.pageTimings = pageTimings;
exports.postData = postData;
exports.query = query;
exports.request = request;
exports.response = response;
exports.timings = timings;

var _harSchema = require('har-schema');

var schemas = _interopRequireWildcard(_harSchema);

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ajv = void 0;

function validate(name) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // validator config
  ajv = ajv || new _ajv2.default({
    allErrors: true,
    schemas: schemas
  });

  var validate = ajv.getSchema(name + '.json');

  return new Promise(function (resolve, reject) {
    var valid = validate(data);

    !valid ? reject(new _error2.default(validate.errors)) : resolve(data);
  });
}

function afterRequest(data) {
  return validate('afterRequest', data);
}

function beforeRequest(data) {
  return validate('beforeRequest', data);
}

function browser(data) {
  return validate('browser', data);
}

function cache(data) {
  return validate('cache', data);
}

function content(data) {
  return validate('content', data);
}

function cookie(data) {
  return validate('cookie', data);
}

function creator(data) {
  return validate('creator', data);
}

function entry(data) {
  return validate('entry', data);
}

function har(data) {
  return validate('har', data);
}

function header(data) {
  return validate('header', data);
}

function log(data) {
  return validate('log', data);
}

function page(data) {
  return validate('page', data);
}

function pageTimings(data) {
  return validate('pageTimings', data);
}

function postData(data) {
  return validate('postData', data);
}

function query(data) {
  return validate('query', data);
}

function request(data) {
  return validate('request', data);
}

function response(data) {
  return validate('response', data);
}

function timings(data) {
  return validate('timings', data);
}
}, function(modId) {var map = {"./error":1536577188112}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188112, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HARError;
function HARError(errors) {
  var message = 'validation failed';

  this.name = 'HARError';
  this.message = message;
  this.errors = errors;

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error(message).stack;
  }
}

HARError.prototype = Error.prototype;
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577188111);
})()
//# sourceMappingURL=index.js.map