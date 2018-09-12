module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187632, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (opts.only != null) only = _babelCore.util.arrayify(opts.only, _babelCore.util.regexify);
  if (opts.ignore != null) ignore = _babelCore.util.arrayify(opts.ignore, _babelCore.util.regexify);

  if (opts.extensions) hookExtensions(_babelCore.util.arrayify(opts.extensions));

  if (opts.cache === false) cache = null;

  delete opts.extensions;
  delete opts.ignore;
  delete opts.cache;
  delete opts.only;

  (0, _extend2.default)(transformOpts, opts);
};

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _sourceMapSupport = require("source-map-support");

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _cache = require("./cache");

var registerCache = _interopRequireWildcard(_cache);

var _extend = require("lodash/extend");

var _extend2 = _interopRequireDefault(_extend);

var _babelCore = require("babel-core");

var babel = _interopRequireWildcard(_babelCore);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install({
  handleUncaughtExceptions: false,
  environment: "node",
  retrieveSourceMap: function retrieveSourceMap(source) {
    var map = maps && maps[source];
    if (map) {
      return {
        url: null,
        map: map
      };
    } else {
      return null;
    }
  }
});

registerCache.load();
var cache = registerCache.get();

var transformOpts = {};

var ignore = void 0;
var only = void 0;

var oldHandlers = {};
var maps = {};

var cwd = process.cwd();

function getRelativePath(filename) {
  return _path2.default.relative(cwd, filename);
}

function mtime(filename) {
  return +_fs2.default.statSync(filename).mtime;
}

function compile(filename) {
  var result = void 0;

  var opts = new _babelCore.OptionManager().init((0, _extend2.default)({ sourceRoot: _path2.default.dirname(filename) }, (0, _cloneDeep2.default)(transformOpts), { filename: filename }));

  var cacheKey = (0, _stringify2.default)(opts) + ":" + babel.version;

  var env = process.env.BABEL_ENV || process.env.NODE_ENV;
  if (env) cacheKey += ":" + env;

  if (cache) {
    var cached = cache[cacheKey];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  if (!result) {
    result = babel.transformFileSync(filename, (0, _extend2.default)(opts, {
      babelrc: false,
      sourceMaps: "both",
      ast: false
    }));
  }

  if (cache) {
    cache[cacheKey] = result;
    result.mtime = mtime(filename);
  }

  maps[filename] = result.map;

  return result.code;
}

function shouldIgnore(filename) {
  if (!ignore && !only) {
    return getRelativePath(filename).split(_path2.default.sep).indexOf("node_modules") >= 0;
  } else {
    return _babelCore.util.shouldIgnore(filename, ignore || [], only);
  }
}

function loader(m, filename) {
  m._compile(compile(filename), filename);
}

function registerExtension(ext) {
  var old = oldHandlers[ext] || oldHandlers[".js"] || require.extensions[".js"];

  require.extensions[ext] = function (m, filename) {
    if (shouldIgnore(filename)) {
      old(m, filename);
    } else {
      loader(m, filename, old);
    }
  };
}

function hookExtensions(_exts) {
  (0, _keys2.default)(oldHandlers).forEach(function (ext) {
    var old = oldHandlers[ext];
    if (old === undefined) {
      delete require.extensions[ext];
    } else {
      require.extensions[ext] = old;
    }
  });

  oldHandlers = {};

  _exts.forEach(function (ext) {
    oldHandlers[ext] = require.extensions[ext];
    registerExtension(ext);
  });
}

hookExtensions(_babelCore.util.canCompile.EXTENSIONS);

module.exports = exports["default"];
}, function(modId) {var map = {"./cache":1536577187633}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187633, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.save = save;
exports.load = load;
exports.get = get;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require("mkdirp");

var _homeOrTmp = require("home-or-tmp");

var _homeOrTmp2 = _interopRequireDefault(_homeOrTmp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILENAME = process.env.BABEL_CACHE_PATH || _path2.default.join(_homeOrTmp2.default, ".babel.json");
var data = {};

function save() {
  var serialised = "{}";

  try {
    serialised = (0, _stringify2.default)(data, null, "  ");
  } catch (err) {

    if (err.message === "Invalid string length") {
      err.message = "Cache too large so it's been cleared.";
      console.error(err.stack);
    } else {
      throw err;
    }
  }

  (0, _mkdirp.sync)(_path2.default.dirname(FILENAME));
  _fs2.default.writeFileSync(FILENAME, serialised);
}

function load() {
  if (process.env.BABEL_DISABLE_CACHE) return;

  process.on("exit", save);
  process.nextTick(save);

  if (!_fs2.default.existsSync(FILENAME)) return;

  try {
    data = JSON.parse(_fs2.default.readFileSync(FILENAME));
  } catch (err) {
    return;
  }
}

function get() {
  return data;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187632);
})()
//# sourceMappingURL=index.js.map