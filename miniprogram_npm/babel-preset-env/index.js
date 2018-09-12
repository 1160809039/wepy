module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187623, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.transformIncludesAndExcludes = exports.isPluginRequired = undefined;
exports.default = buildPreset;

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

var _builtIns = require("../data/built-ins.json");

var _builtIns2 = _interopRequireDefault(_builtIns);

var _defaultIncludes = require("./default-includes");

var _moduleTransformations = require("./module-transformations");

var _moduleTransformations2 = _interopRequireDefault(_moduleTransformations);

var _normalizeOptions = require("./normalize-options.js");

var _normalizeOptions2 = _interopRequireDefault(_normalizeOptions);

var _plugins = require("../data/plugins.json");

var _plugins2 = _interopRequireDefault(_plugins);

var _transformPolyfillRequirePlugin = require("./transform-polyfill-require-plugin");

var _transformPolyfillRequirePlugin2 = _interopRequireDefault(_transformPolyfillRequirePlugin);

var _targetsParser = require("./targets-parser");

var _targetsParser2 = _interopRequireDefault(_targetsParser);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determine if a transformation is required
 *
 * NOTE: This assumes `supportedEnvironments` has already been parsed by `getTargets`
 *
 * @param  {Object}  supportedEnvironments  An Object containing environment keys and the lowest
 *                                          supported version as a value
 * @param  {Object}  plugin                 An Object containing environment keys and the lowest
 *                                          version the feature was implemented in as a value
 * @return {Boolean} Whether or not the transformation is required
 */
var isPluginRequired = exports.isPluginRequired = function isPluginRequired(supportedEnvironments, plugin) {
  var targetEnvironments = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) {
    return true;
  }

  var isRequiredForEnvironments = targetEnvironments.filter(function (environment) {
    // Feature is not implemented in that environment
    if (!plugin[environment]) {
      return true;
    }

    var lowestImplementedVersion = plugin[environment];
    var lowestTargetedVersion = supportedEnvironments[environment];

    if (!_semver2.default.valid(lowestTargetedVersion)) {
      throw new Error(
      // eslint-disable-next-line max-len
      "Invalid version passed for target \"" + environment + "\": \"" + lowestTargetedVersion + "\". Versions must be in semver format (major.minor.patch)");
    }

    return _semver2.default.gt((0, _utils.semverify)(lowestImplementedVersion), lowestTargetedVersion);
  });

  return isRequiredForEnvironments.length > 0;
};

var hasBeenLogged = false;

var logPlugin = function logPlugin(plugin, targets, list) {
  var envList = list[plugin] || {};
  var filteredList = Object.keys(targets).reduce(function (a, b) {
    if (!envList[b] || _semver2.default.lt(targets[b], (0, _utils.semverify)(envList[b]))) {
      a[b] = (0, _utils.prettifyVersion)(targets[b]);
    }
    return a;
  }, {});
  var logStr = "  " + plugin + " " + JSON.stringify(filteredList);
  console.log(logStr);
};

var filterItem = function filterItem(targets, exclusions, list, item) {
  var isDefault = _defaultIncludes.defaultWebIncludes.indexOf(item) >= 0;
  var notExcluded = exclusions.indexOf(item) === -1;

  if (isDefault) return notExcluded;
  var isRequired = isPluginRequired(targets, list[item]);
  return isRequired && notExcluded;
};

var getBuiltInTargets = function getBuiltInTargets(targets) {
  var builtInTargets = (0, _utils._extends)({}, targets);
  if (builtInTargets.uglify != null) {
    delete builtInTargets.uglify;
  }
  return builtInTargets;
};

var transformIncludesAndExcludes = exports.transformIncludesAndExcludes = function transformIncludesAndExcludes(opts) {
  return {
    all: opts,
    plugins: opts.filter(function (opt) {
      return !opt.match(/^(es\d+|web)\./);
    }),
    builtIns: opts.filter(function (opt) {
      return opt.match(/^(es\d+|web)\./);
    })
  };
};

function getPlatformSpecificDefaultFor(targets) {
  var targetNames = Object.keys(targets);
  var isAnyTarget = !targetNames.length;
  var isWebTarget = targetNames.some(function (name) {
    return name !== "node";
  });

  return isAnyTarget || isWebTarget ? _defaultIncludes.defaultWebIncludes : [];
}

function buildPreset(context) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var validatedOptions = (0, _normalizeOptions2.default)(opts);
  var debug = validatedOptions.debug,
      loose = validatedOptions.loose,
      moduleType = validatedOptions.moduleType,
      spec = validatedOptions.spec,
      useBuiltIns = validatedOptions.useBuiltIns;


  var targets = (0, _targetsParser2.default)(validatedOptions.targets);
  var include = transformIncludesAndExcludes(validatedOptions.include);
  var exclude = transformIncludesAndExcludes(validatedOptions.exclude);

  var filterPlugins = filterItem.bind(null, targets, exclude.plugins, _plugins2.default);
  var transformations = Object.keys(_plugins2.default).filter(filterPlugins).concat(include.plugins);

  var polyfills = void 0;
  var polyfillTargets = void 0;
  if (useBuiltIns) {
    polyfillTargets = getBuiltInTargets(targets);
    var filterBuiltIns = filterItem.bind(null, polyfillTargets, exclude.builtIns, _builtIns2.default);
    polyfills = Object.keys(_builtIns2.default).concat(getPlatformSpecificDefaultFor(polyfillTargets)).filter(filterBuiltIns).concat(include.builtIns);
  }

  if (debug && !hasBeenLogged) {
    hasBeenLogged = true;
    console.log("babel-preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify((0, _utils.prettifyTargets)(targets), null, 2));
    console.log("\nModules transform: " + moduleType);
    console.log("\nUsing plugins:");
    transformations.forEach(function (transform) {
      logPlugin(transform, targets, _plugins2.default);
    });
    if (useBuiltIns && polyfills.length) {
      console.log("\nUsing polyfills:");
      polyfills.forEach(function (polyfill) {
        logPlugin(polyfill, polyfillTargets, _builtIns2.default);
      });
    }
  }

  var regenerator = transformations.indexOf("transform-regenerator") >= 0;
  var modulePlugin = moduleType !== false && _moduleTransformations2.default[moduleType];
  var plugins = [];

  // NOTE: not giving spec here yet to avoid compatibility issues when
  // babel-plugin-transform-es2015-modules-commonjs gets its spec mode
  modulePlugin && plugins.push([require("babel-plugin-" + modulePlugin), { loose: loose }]);

  plugins.push.apply(plugins, transformations.map(function (pluginName) {
    return [require("babel-plugin-" + pluginName), { spec: spec, loose: loose }];
  }));

  useBuiltIns && plugins.push([_transformPolyfillRequirePlugin2.default, { polyfills: polyfills, regenerator: regenerator }]);

  return {
    plugins: plugins
  };
}
}, function(modId) {var map = {"../data/built-ins.json":1536577187624,"./default-includes":1536577187625,"./module-transformations":1536577187626,"./normalize-options.js":1536577187627,"../data/plugins.json":1536577187628,"./transform-polyfill-require-plugin":1536577187629,"./targets-parser":1536577187630,"./utils":1536577187631}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187624, function(require, module, exports) {
module.exports = {
  "es6.typed.array-buffer": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.data-view": {
    "chrome": "5",
    "opera": "12",
    "edge": "12",
    "firefox": "15",
    "safari": "5.1",
    "node": "0.12",
    "ie": "10",
    "android": "4",
    "ios": "6",
    "electron": "1.1"
  },
  "es6.typed.int8-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint8-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint8-clamped-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.int16-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint16-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.int32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.float32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.float64-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.map": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.set": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.weak-map": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "9",
    "node": "6.5",
    "ios": "9",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.weak-set": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "9",
    "node": "6.5",
    "ios": "9",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.reflect.apply": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.construct": {
    "chrome": "49",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.define-property": {
    "chrome": "49",
    "edge": "13",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.delete-property": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get-own-property-descriptor": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get-prototype-of": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.has": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.is-extensible": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.own-keys": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.prevent-extensions": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.set": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.set-prototype-of": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.promise": {
    "chrome": "51",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.symbol": {
    "chrome": "51",
    "firefox": "51",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.object.freeze": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.seal": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.prevent-extensions": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.is-frozen": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.is-sealed": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.is-extensible": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.get-own-property-descriptor": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.get-prototype-of": {
    "chrome": "44",
    "edge": "12",
    "firefox": "3.5",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.keys": {
    "chrome": "40",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "27",
    "electron": "0.21"
  },
  "es6.object.get-own-property-names": {
    "chrome": "40",
    "edge": "12",
    "firefox": "33",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "27",
    "electron": "0.21"
  },
  "es6.object.assign": {
    "chrome": "45",
    "edge": "12",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.object.is": {
    "chrome": "19",
    "edge": "12",
    "firefox": "22",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "electron": "0.2"
  },
  "es6.object.set-prototype-of": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ie": "11",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.function.name": {
    "chrome": "51",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.string.raw": {
    "chrome": "41",
    "edge": "12",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.from-code-point": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.code-point-at": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.repeat": {
    "chrome": "41",
    "edge": "12",
    "firefox": "24",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.starts-with": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.ends-with": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.includes": {
    "chrome": "41",
    "edge": "12",
    "firefox": "40",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.regexp.flags": {
    "chrome": "49",
    "firefox": "37",
    "safari": "9",
    "node": "6",
    "ios": "9",
    "opera": "36",
    "electron": "1"
  },
  "es6.regexp.match": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.replace": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.split": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.search": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.array.from": {
    "chrome": "51",
    "edge": "15",
    "firefox": "36",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.array.of": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.copy-within": {
    "chrome": "45",
    "edge": "12",
    "firefox": "32",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.find": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.find-index": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.fill": {
    "chrome": "45",
    "edge": "12",
    "firefox": "31",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.iterator": {
    "chrome": "38",
    "edge": "12",
    "firefox": "28",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.number.is-finite": {
    "chrome": "19",
    "edge": "12",
    "firefox": "16",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "electron": "0.2"
  },
  "es6.number.is-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "16",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.is-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "32",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.is-nan": {
    "chrome": "19",
    "edge": "12",
    "firefox": "15",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "electron": "0.2"
  },
  "es6.number.epsilon": {
    "chrome": "34",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.min-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.max-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.math.acosh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.asinh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.atanh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.cbrt": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.clz32": {
    "chrome": "38",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.cosh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.expm1": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.fround": {
    "chrome": "38",
    "edge": "12",
    "firefox": "26",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.hypot": {
    "chrome": "38",
    "edge": "12",
    "firefox": "27",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.imul": {
    "chrome": "30",
    "edge": "12",
    "firefox": "23",
    "safari": "7",
    "node": "0.12",
    "android": "4.4",
    "ios": "7",
    "opera": "17",
    "electron": "0.2"
  },
  "es6.math.log1p": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.log10": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.log2": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.sign": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.sinh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.tanh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.trunc": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es7.array.includes": {
    "chrome": "47",
    "edge": "14",
    "firefox": "43",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "34",
    "electron": "0.36"
  },
  "es7.object.values": {
    "chrome": "54",
    "edge": "14",
    "firefox": "47",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "opera": "41",
    "electron": "1.5"
  },
  "es7.object.entries": {
    "chrome": "54",
    "edge": "14",
    "firefox": "47",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "opera": "41",
    "electron": "1.5"
  },
  "es7.object.get-own-property-descriptors": {
    "chrome": "54",
    "edge": "15",
    "firefox": "50",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "opera": "41",
    "electron": "1.5"
  },
  "es7.string.pad-start": {
    "chrome": "57",
    "edge": "15",
    "firefox": "48",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "opera": "44",
    "electron": "1.7"
  },
  "es7.string.pad-end": {
    "chrome": "57",
    "edge": "15",
    "firefox": "48",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "opera": "44",
    "electron": "1.7"
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187625, function(require, module, exports) {
"use strict";

exports.__esModule = true;
var defaultWebIncludes = exports.defaultWebIncludes = ["web.timers", "web.immediate", "web.dom.iterable"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187626, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.default = {
  "amd": "transform-es2015-modules-amd",
  "commonjs": "transform-es2015-modules-commonjs",
  "systemjs": "transform-es2015-modules-systemjs",
  "umd": "transform-es2015-modules-umd"
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187627, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.validateModulesOption = exports.validateSpecOption = exports.validateLooseOption = exports.validateBoolOption = exports.checkDuplicateIncludeExcludes = exports.normalizePluginNames = exports.normalizePluginName = exports.validateIncludesAndExcludes = undefined;
exports.default = normalizeOptions;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _builtIns = require("../data/built-ins.json");

var _builtIns2 = _interopRequireDefault(_builtIns);

var _defaultIncludes = require("./default-includes");

var _moduleTransformations = require("./module-transformations");

var _moduleTransformations2 = _interopRequireDefault(_moduleTransformations);

var _plugins = require("../data/plugins.json");

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validIncludesAndExcludes = [].concat(Object.keys(_plugins2.default), Object.keys(_moduleTransformations2.default).map(function (m) {
  return _moduleTransformations2.default[m];
}), Object.keys(_builtIns2.default), _defaultIncludes.defaultWebIncludes);

var hasBeenWarned = false;

var validateIncludesAndExcludes = exports.validateIncludesAndExcludes = function validateIncludesAndExcludes() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var type = arguments[1];

  (0, _invariant2.default)(Array.isArray(opts), "Invalid Option: The '" + type + "' option must be an Array<String> of plugins/built-ins");

  var unknownOpts = [];
  opts.forEach(function (opt) {
    if (validIncludesAndExcludes.indexOf(opt) === -1) {
      unknownOpts.push(opt);
    }
  });

  (0, _invariant2.default)(unknownOpts.length === 0, "Invalid Option: The plugins/built-ins '" + unknownOpts + "' passed to the '" + type + "' option are not\n    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env");

  return opts;
};

var normalizePluginName = exports.normalizePluginName = function normalizePluginName(plugin) {
  return plugin.replace(/^babel-plugin-/, "");
};

var normalizePluginNames = exports.normalizePluginNames = function normalizePluginNames(plugins) {
  return plugins.map(normalizePluginName);
};

var checkDuplicateIncludeExcludes = exports.checkDuplicateIncludeExcludes = function checkDuplicateIncludeExcludes() {
  var include = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var duplicates = include.filter(function (opt) {
    return exclude.indexOf(opt) >= 0;
  });

  (0, _invariant2.default)(duplicates.length === 0, "Invalid Option: The plugins/built-ins '" + duplicates + "' were found in both the \"include\" and\n    \"exclude\" options.");
};

var validateBoolOption = exports.validateBoolOption = function validateBoolOption(name, value, defaultValue) {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new Error("Preset env: '" + name + "' option must be a boolean.");
  }

  return value;
};

var validateLooseOption = exports.validateLooseOption = function validateLooseOption(looseOpt) {
  return validateBoolOption("loose", looseOpt, false);
};
var validateSpecOption = exports.validateSpecOption = function validateSpecOption(specOpt) {
  return validateBoolOption("spec", specOpt, false);
};

var validateModulesOption = exports.validateModulesOption = function validateModulesOption() {
  var modulesOpt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "commonjs";

  (0, _invariant2.default)(modulesOpt === false || Object.keys(_moduleTransformations2.default).indexOf(modulesOpt) > -1, "Invalid Option: The 'modules' option must be either 'false' to indicate no modules, or a\n    module type which can be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'.");

  return modulesOpt;
};

function normalizeOptions(opts) {
  // TODO: remove whitelist in favor of include in next major
  if (opts.whitelist && !hasBeenWarned) {
    console.warn("Deprecation Warning: The \"whitelist\" option has been deprecated in favor of \"include\" to\n      match the newly added \"exclude\" option (instead of \"blacklist\").");
    hasBeenWarned = true;
  }

  (0, _invariant2.default)(!(opts.whitelist && opts.include), "Invalid Option: The \"whitelist\" and the \"include\" option are the same and one can be used at\n    a time");

  if (opts.exclude) {
    opts.exclude = normalizePluginNames(opts.exclude);
  }

  if (opts.whitelist || opts.include) {
    opts.include = normalizePluginNames(opts.whitelist || opts.include);
  }

  checkDuplicateIncludeExcludes(opts.include, opts.exclude);

  return {
    debug: opts.debug,
    exclude: validateIncludesAndExcludes(opts.exclude, "exclude"),
    include: validateIncludesAndExcludes(opts.include, "include"),
    loose: validateLooseOption(opts.loose),
    moduleType: validateModulesOption(opts.modules),
    spec: validateSpecOption(opts.spec),
    targets: opts.targets,
    useBuiltIns: opts.useBuiltIns
  };
}
}, function(modId) { var map = {"../data/built-ins.json":1536577187624,"./default-includes":1536577187625,"./module-transformations":1536577187626,"../data/plugins.json":1536577187628}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187628, function(require, module, exports) {
module.exports = {
  "check-es2015-constants": {
    "chrome": "49",
    "edge": "14",
    "firefox": "51",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "transform-es2015-arrow-functions": {
    "chrome": "47",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "34",
    "electron": "0.36"
  },
  "transform-es2015-block-scoped-functions": {
    "chrome": "41",
    "edge": "12",
    "firefox": "46",
    "safari": "10",
    "node": "4",
    "ie": "11",
    "ios": "10",
    "opera": "28",
    "electron": "0.24"
  },
  "transform-es2015-block-scoping": {
    "chrome": "49",
    "edge": "14",
    "firefox": "51",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "transform-es2015-classes": {
    "chrome": "46",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-es2015-computed-properties": {
    "chrome": "44",
    "edge": "12",
    "firefox": "34",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "opera": "31",
    "electron": "0.31"
  },
  "transform-es2015-destructuring": {
    "chrome": "51",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-es2015-duplicate-keys": {
    "chrome": "42",
    "edge": "12",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "29",
    "electron": "0.27"
  },
  "transform-es2015-for-of": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-es2015-function-name": {
    "chrome": "51",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-es2015-literals": {
    "chrome": "44",
    "edge": "12",
    "firefox": "53",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "transform-es2015-object-super": {
    "chrome": "46",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-es2015-parameters": {
    "chrome": "49",
    "edge": "14",
    "firefox": "53",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "transform-es2015-shorthand-properties": {
    "chrome": "43",
    "edge": "12",
    "firefox": "33",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "30",
    "electron": "0.29"
  },
  "transform-es2015-spread": {
    "chrome": "46",
    "edge": "13",
    "firefox": "36",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-es2015-sticky-regex": {
    "chrome": "49",
    "edge": "13",
    "firefox": "3",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "transform-es2015-template-literals": {
    "chrome": "41",
    "edge": "13",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "transform-es2015-typeof-symbol": {
    "chrome": "38",
    "edge": "12",
    "firefox": "36",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "25",
    "electron": "0.2"
  },
  "transform-es2015-unicode-regex": {
    "chrome": "50",
    "edge": "13",
    "firefox": "46",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "transform-regenerator": {
    "chrome": "50",
    "edge": "13",
    "firefox": "53",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "transform-exponentiation-operator": {
    "chrome": "52",
    "edge": "14",
    "firefox": "52",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "opera": "39",
    "electron": "1.3"
  },
  "transform-async-to-generator": {
    "chrome": "55",
    "edge": "15",
    "firefox": "52",
    "safari": "10.1",
    "node": "7.6",
    "ios": "10.3",
    "opera": "42",
    "electron": "1.6"
  },
  "syntax-trailing-function-commas": {
    "chrome": "58",
    "edge": "14",
    "firefox": "52",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "opera": "45",
    "electron": "1.7"
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187629, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function createImportDeclaration(polyfill) {
    var declar = t.importDeclaration([], t.stringLiteral(polyfill));
    declar._blockHoist = 3;
    return declar;
  }

  function createRequireStatement(polyfill) {
    return t.expressionStatement(t.callExpression(t.identifier("require"), [t.stringLiteral(polyfill)]));
  }

  function isRequire(path) {
    return t.isExpressionStatement(path.node) && t.isCallExpression(path.node.expression) && t.isIdentifier(path.node.expression.callee) && path.node.expression.callee.name === "require" && path.node.expression.arguments.length === 1 && t.isStringLiteral(path.node.expression.arguments[0]) && isPolyfillSource(path.node.expression.arguments[0].value);
  }

  function createImport(polyfill, requireType, core) {
    if (core) {
      polyfill = "core-js/modules/" + polyfill;
    }

    if (requireType === "import") {
      return createImportDeclaration(polyfill);
    } else {
      return createRequireStatement(polyfill);
    }
  }

  function createImports(polyfills, requireType, regenerator) {
    var imports = polyfills.filter(function (el, i, arr) {
      return arr.indexOf(el) === i;
    }).map(function (polyfill) {
      return createImport(polyfill, requireType, true);
    });

    return [].concat(imports, [regenerator && createImport("regenerator-runtime/runtime", requireType)]).filter(Boolean);
  }

  var isPolyfillImport = {
    ImportDeclaration: function ImportDeclaration(path, state) {
      if (path.node.specifiers.length === 0 && isPolyfillSource(path.node.source.value)) {
        this.numPolyfillImports++;
        if (this.numPolyfillImports > 1) {
          path.remove();
          return;
        }

        path.replaceWithMultiple(createImports(state.opts.polyfills, "import", state.opts.regenerator));
      }
    },
    Program: function Program(path, state) {
      var _this = this;

      if (!state.opts.polyfills) {
        throw path.buildCodeFrameError("\nThere was an issue in \"babel-preset-env\" such that\nthe \"polyfills\" option was not correctly passed\nto the \"transform-polyfill-require\" plugin\n");
      }
      path.get("body").forEach(function (bodyPath) {
        if (isRequire(bodyPath)) {
          _this.numPolyfillImports++;
          if (_this.numPolyfillImports > 1) {
            path.remove();
            return;
          }

          bodyPath.replaceWithMultiple(createImports(state.opts.polyfills, "require", state.opts.regenerator));
        }
      });
    }
  };

  return {
    name: "transform-polyfill-require",
    visitor: isPolyfillImport,
    pre: function pre() {
      this.numPolyfillImports = 0;
    }
  };
};

function isPolyfillSource(value) {
  return value === "babel-polyfill" || value === "core-js";
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187630, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _browserslist = require("browserslist");

var _browserslist2 = _interopRequireDefault(_browserslist);

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserNameMap = {
  android: "android",
  chrome: "chrome",
  and_chr: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ios_saf: "ios",
  safari: "safari"
};

var isBrowsersQueryValid = function isBrowsersQueryValid(browsers) {
  return typeof browsers === "string" || Array.isArray(browsers);
};

var semverMin = function semverMin(first, second) {
  return first && _semver2.default.lt(first, second) ? first : second;
};

var getLowestVersions = function getLowestVersions(browsers) {
  return browsers.reduce(function (all, browser) {
    var _browser$split = browser.split(" "),
        browserName = _browser$split[0],
        browserVersion = _browser$split[1];

    var normalizedBrowserName = browserNameMap[browserName];

    if (!normalizedBrowserName) {
      return all;
    }

    try {
      // Browser version can return as "10.0-10.2"
      var splitVersion = browserVersion.split("-")[0];
      var parsedBrowserVersion = (0, _utils.semverify)(splitVersion);

      all[normalizedBrowserName] = semverMin(all[normalizedBrowserName], parsedBrowserVersion);
    } catch (e) {}

    return all;
  }, {});
};

var outputDecimalWarning = function outputDecimalWarning(decimalTargets) {
  if (!decimalTargets || !decimalTargets.length) {
    return;
  }

  console.log("Warning, the following targets are using a decimal version:");
  console.log("");
  decimalTargets.forEach(function (_ref) {
    var target = _ref.target,
        value = _ref.value;
    return console.log("  " + target + ": " + value);
  });
  console.log("");
  console.log("We recommend using a string for minor/patch versions to avoid numbers like 6.10");
  console.log("getting parsed as 6.1, which can lead to unexpected behavior.");
  console.log("");
};

var targetParserMap = {
  __default: function __default(target, value) {
    return [target, (0, _utils.semverify)(value)];
  },

  // Parse `node: true` and `node: "current"` to version
  node: function node(target, value) {
    var parsed = value === true || value === "current" ? process.versions.node : (0, _utils.semverify)(value);

    return [target, parsed];
  },

  // Only valid value for Uglify is `true`
  uglify: function uglify(target, value) {
    return [target, value === true];
  }
};

var getTargets = function getTargets() {
  var targets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var targetOpts = {};

  // Parse browsers target via browserslist
  if (isBrowsersQueryValid(targets.browsers)) {
    targetOpts = getLowestVersions((0, _browserslist2.default)(targets.browsers));
  }

  // Parse remaining targets
  var parsed = Object.keys(targets).reduce(function (results, target) {
    if (target !== "browsers") {
      var value = targets[target];

      // Warn when specifying minor/patch as a decimal
      if (typeof value === "number" && value % 1 !== 0) {
        results.decimalWarnings.push({ target: target, value: value });
      }

      // Check if we have a target parser?
      var parser = targetParserMap[target] || targetParserMap.__default;

      var _parser = parser(target, value),
          parsedTarget = _parser[0],
          parsedValue = _parser[1];

      if (parsedValue) {
        results.targets[parsedTarget] = parsedValue;
      }
    }

    return results;
  }, {
    targets: targetOpts,
    decimalWarnings: []
  });

  outputDecimalWarning(parsed.decimalWarnings);

  return parsed.targets;
};

exports.default = getTargets;
}, function(modId) { var map = {"./utils":1536577187631}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187631, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.prettifyTargets = exports.prettifyVersion = exports.semverify = exports._extends = undefined;

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = exports._extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

// Convert version to a semver value.
// 2.5 -> 2.5.0; 1 -> 1.0.0;
// @flow
var semverify = exports.semverify = function semverify(version) {
  if (typeof version === "string" && _semver2.default.valid(version)) {
    return version;
  }

  var split = version.toString().split(".");

  while (split.length < 3) {
    split.push(0);
  }

  return split.join(".");
};

var prettifyVersion = exports.prettifyVersion = function prettifyVersion(version) {
  if (typeof version !== "string") {
    return version;
  }

  var parts = [_semver2.default.major(version)];
  var minor = _semver2.default.minor(version);
  var patch = _semver2.default.patch(version);

  if (minor || patch) {
    parts.push(minor);
  }

  if (patch) {
    parts.push(patch);
  }

  return parts.join(".");
};

var prettifyTargets = exports.prettifyTargets = function prettifyTargets() {
  var targets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(targets).reduce(function (results, target) {
    var value = targets[target];

    if (typeof value === "string") {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187623);
})()
//# sourceMappingURL=index.js.map