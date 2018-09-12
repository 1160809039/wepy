module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187509, function(require, module, exports) {
module.exports = require("./lib/api/node.js");

}, function(modId) {var map = {"./lib/api/node.js":1536577187510}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187510, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.transformFromAst = exports.transform = exports.analyse = exports.Pipeline = exports.OptionManager = exports.traverse = exports.types = exports.messages = exports.util = exports.version = exports.resolvePreset = exports.resolvePlugin = exports.template = exports.buildExternalHelpers = exports.options = exports.File = undefined;

var _file = require("../transformation/file");

Object.defineProperty(exports, "File", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_file).default;
  }
});

var _config = require("../transformation/file/options/config");

Object.defineProperty(exports, "options", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_config).default;
  }
});

var _buildExternalHelpers = require("../tools/build-external-helpers");

Object.defineProperty(exports, "buildExternalHelpers", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_buildExternalHelpers).default;
  }
});

var _babelTemplate = require("babel-template");

Object.defineProperty(exports, "template", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_babelTemplate).default;
  }
});

var _resolvePlugin = require("../helpers/resolve-plugin");

Object.defineProperty(exports, "resolvePlugin", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_resolvePlugin).default;
  }
});

var _resolvePreset = require("../helpers/resolve-preset");

Object.defineProperty(exports, "resolvePreset", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_resolvePreset).default;
  }
});

var _package = require("../../package");

Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function get() {
    return _package.version;
  }
});
exports.Plugin = Plugin;
exports.transformFile = transformFile;
exports.transformFileSync = transformFileSync;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _util = require("../util");

var util = _interopRequireWildcard(_util);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _optionManager = require("../transformation/file/options/option-manager");

var _optionManager2 = _interopRequireDefault(_optionManager);

var _pipeline = require("../transformation/pipeline");

var _pipeline2 = _interopRequireDefault(_pipeline);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.util = util;
exports.messages = messages;
exports.types = t;
exports.traverse = _babelTraverse2.default;
exports.OptionManager = _optionManager2.default;
function Plugin(alias) {
  throw new Error("The (" + alias + ") Babel 5 plugin is being run with Babel 6.");
}

exports.Pipeline = _pipeline2.default;


var pipeline = new _pipeline2.default();
var analyse = exports.analyse = pipeline.analyse.bind(pipeline);
var transform = exports.transform = pipeline.transform.bind(pipeline);
var transformFromAst = exports.transformFromAst = pipeline.transformFromAst.bind(pipeline);

function transformFile(filename, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;

  _fs2.default.readFile(filename, function (err, code) {
    var result = void 0;

    if (!err) {
      try {
        result = transform(code, opts);
      } catch (_err) {
        err = _err;
      }
    }

    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

function transformFileSync(filename) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  opts.filename = filename;
  return transform(_fs2.default.readFileSync(filename, "utf8"), opts);
}
}, function(modId) { var map = {"../transformation/file":1536577187511,"../transformation/file/options/config":1536577187519,"../tools/build-external-helpers":1536577187534,"../helpers/resolve-plugin":1536577187520,"../helpers/resolve-preset":1536577187524,"../util":1536577187518,"../transformation/file/options/option-manager":1536577187513,"../transformation/pipeline":1536577187535}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187511, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.File = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _babelHelpers = require("babel-helpers");

var _babelHelpers2 = _interopRequireDefault(_babelHelpers);

var _metadata = require("./metadata");

var metadataVisitor = _interopRequireWildcard(_metadata);

var _convertSourceMap = require("convert-source-map");

var _convertSourceMap2 = _interopRequireDefault(_convertSourceMap);

var _optionManager = require("./options/option-manager");

var _optionManager2 = _interopRequireDefault(_optionManager);

var _pluginPass = require("../plugin-pass");

var _pluginPass2 = _interopRequireDefault(_pluginPass);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelCodeFrame = require("babel-code-frame");

var _babelCodeFrame2 = _interopRequireDefault(_babelCodeFrame);

var _defaults = require("lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

var _store = require("../../store");

var _store2 = _interopRequireDefault(_store);

var _babylon = require("babylon");

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _mergeMap = require("./merge-map");

var _mergeMap2 = _interopRequireDefault(_mergeMap);

var _resolve = require("../../helpers/resolve");

var _resolve2 = _interopRequireDefault(_resolve);

var _blockHoist = require("../internal-plugins/block-hoist");

var _blockHoist2 = _interopRequireDefault(_blockHoist);

var _shadowFunctions = require("../internal-plugins/shadow-functions");

var _shadowFunctions2 = _interopRequireDefault(_shadowFunctions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shebangRegex = /^#!.*/;

var INTERNAL_PLUGINS = [[_blockHoist2.default], [_shadowFunctions2.default]];

var errorVisitor = {
  enter: function enter(path, state) {
    var loc = path.node.loc;
    if (loc) {
      state.loc = loc;
      path.stop();
    }
  }
};

var File = function (_Store) {
  (0, _inherits3.default)(File, _Store);

  function File() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var pipeline = arguments[1];
    (0, _classCallCheck3.default)(this, File);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this));

    _this.pipeline = pipeline;

    _this.log = new _logger2.default(_this, opts.filename || "unknown");
    _this.opts = _this.initOptions(opts);

    _this.parserOpts = {
      sourceType: _this.opts.sourceType,
      sourceFileName: _this.opts.filename,
      plugins: []
    };

    _this.pluginVisitors = [];
    _this.pluginPasses = [];

    _this.buildPluginsForOptions(_this.opts);

    if (_this.opts.passPerPreset) {
      _this.perPresetOpts = [];
      _this.opts.presets.forEach(function (presetOpts) {
        var perPresetOpts = (0, _assign2.default)((0, _create2.default)(_this.opts), presetOpts);
        _this.perPresetOpts.push(perPresetOpts);
        _this.buildPluginsForOptions(perPresetOpts);
      });
    }

    _this.metadata = {
      usedHelpers: [],
      marked: [],
      modules: {
        imports: [],
        exports: {
          exported: [],
          specifiers: []
        }
      }
    };

    _this.dynamicImportTypes = {};
    _this.dynamicImportIds = {};
    _this.dynamicImports = [];
    _this.declarations = {};
    _this.usedHelpers = {};

    _this.path = null;
    _this.ast = {};

    _this.code = "";
    _this.shebang = "";

    _this.hub = new _babelTraverse.Hub(_this);
    return _this;
  }

  File.prototype.getMetadata = function getMetadata() {
    var has = false;
    for (var _iterator = this.ast.program.body, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var node = _ref;

      if (t.isModuleDeclaration(node)) {
        has = true;
        break;
      }
    }
    if (has) {
      this.path.traverse(metadataVisitor, this);
    }
  };

  File.prototype.initOptions = function initOptions(opts) {
    opts = new _optionManager2.default(this.log, this.pipeline).init(opts);

    if (opts.inputSourceMap) {
      opts.sourceMaps = true;
    }

    if (opts.moduleId) {
      opts.moduleIds = true;
    }

    opts.basename = _path2.default.basename(opts.filename, _path2.default.extname(opts.filename));

    opts.ignore = util.arrayify(opts.ignore, util.regexify);

    if (opts.only) opts.only = util.arrayify(opts.only, util.regexify);

    (0, _defaults2.default)(opts, {
      moduleRoot: opts.sourceRoot
    });

    (0, _defaults2.default)(opts, {
      sourceRoot: opts.moduleRoot
    });

    (0, _defaults2.default)(opts, {
      filenameRelative: opts.filename
    });

    var basenameRelative = _path2.default.basename(opts.filenameRelative);

    (0, _defaults2.default)(opts, {
      sourceFileName: basenameRelative,
      sourceMapTarget: basenameRelative
    });

    return opts;
  };

  File.prototype.buildPluginsForOptions = function buildPluginsForOptions(opts) {
    if (!Array.isArray(opts.plugins)) {
      return;
    }

    var plugins = opts.plugins.concat(INTERNAL_PLUGINS);
    var currentPluginVisitors = [];
    var currentPluginPasses = [];

    for (var _iterator2 = plugins, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var ref = _ref2;
      var plugin = ref[0],
          pluginOpts = ref[1];


      currentPluginVisitors.push(plugin.visitor);
      currentPluginPasses.push(new _pluginPass2.default(this, plugin, pluginOpts));

      if (plugin.manipulateOptions) {
        plugin.manipulateOptions(opts, this.parserOpts, this);
      }
    }

    this.pluginVisitors.push(currentPluginVisitors);
    this.pluginPasses.push(currentPluginPasses);
  };

  File.prototype.getModuleName = function getModuleName() {
    var opts = this.opts;
    if (!opts.moduleIds) {
      return null;
    }

    if (opts.moduleId != null && !opts.getModuleId) {
      return opts.moduleId;
    }

    var filenameRelative = opts.filenameRelative;
    var moduleName = "";

    if (opts.moduleRoot != null) {
      moduleName = opts.moduleRoot + "/";
    }

    if (!opts.filenameRelative) {
      return moduleName + opts.filename.replace(/^\//, "");
    }

    if (opts.sourceRoot != null) {
      var sourceRootRegEx = new RegExp("^" + opts.sourceRoot + "\/?");
      filenameRelative = filenameRelative.replace(sourceRootRegEx, "");
    }

    filenameRelative = filenameRelative.replace(/\.(\w*?)$/, "");

    moduleName += filenameRelative;

    moduleName = moduleName.replace(/\\/g, "/");

    if (opts.getModuleId) {
      return opts.getModuleId(moduleName) || moduleName;
    } else {
      return moduleName;
    }
  };

  File.prototype.resolveModuleSource = function resolveModuleSource(source) {
    var resolveModuleSource = this.opts.resolveModuleSource;
    if (resolveModuleSource) source = resolveModuleSource(source, this.opts.filename);
    return source;
  };

  File.prototype.addImport = function addImport(source, imported) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : imported;

    var alias = source + ":" + imported;
    var id = this.dynamicImportIds[alias];

    if (!id) {
      source = this.resolveModuleSource(source);
      id = this.dynamicImportIds[alias] = this.scope.generateUidIdentifier(name);

      var specifiers = [];

      if (imported === "*") {
        specifiers.push(t.importNamespaceSpecifier(id));
      } else if (imported === "default") {
        specifiers.push(t.importDefaultSpecifier(id));
      } else {
        specifiers.push(t.importSpecifier(id, t.identifier(imported)));
      }

      var declar = t.importDeclaration(specifiers, t.stringLiteral(source));
      declar._blockHoist = 3;

      this.path.unshiftContainer("body", declar);
    }

    return id;
  };

  File.prototype.addHelper = function addHelper(name) {
    var declar = this.declarations[name];
    if (declar) return declar;

    if (!this.usedHelpers[name]) {
      this.metadata.usedHelpers.push(name);
      this.usedHelpers[name] = true;
    }

    var generator = this.get("helperGenerator");
    var runtime = this.get("helpersNamespace");
    if (generator) {
      var res = generator(name);
      if (res) return res;
    } else if (runtime) {
      return t.memberExpression(runtime, t.identifier(name));
    }

    var ref = (0, _babelHelpers2.default)(name);
    var uid = this.declarations[name] = this.scope.generateUidIdentifier(name);

    if (t.isFunctionExpression(ref) && !ref.id) {
      ref.body._compact = true;
      ref._generated = true;
      ref.id = uid;
      ref.type = "FunctionDeclaration";
      this.path.unshiftContainer("body", ref);
    } else {
      ref._compact = true;
      this.scope.push({
        id: uid,
        init: ref,
        unique: true
      });
    }

    return uid;
  };

  File.prototype.addTemplateObject = function addTemplateObject(helperName, strings, raw) {
    var stringIds = raw.elements.map(function (string) {
      return string.value;
    });
    var name = helperName + "_" + raw.elements.length + "_" + stringIds.join(",");

    var declar = this.declarations[name];
    if (declar) return declar;

    var uid = this.declarations[name] = this.scope.generateUidIdentifier("templateObject");

    var helperId = this.addHelper(helperName);
    var init = t.callExpression(helperId, [strings, raw]);
    init._compact = true;
    this.scope.push({
      id: uid,
      init: init,
      _blockHoist: 1.9 });
    return uid;
  };

  File.prototype.buildCodeFrameError = function buildCodeFrameError(node, msg) {
    var Error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SyntaxError;

    var loc = node && (node.loc || node._loc);

    var err = new Error(msg);

    if (loc) {
      err.loc = loc.start;
    } else {
      (0, _babelTraverse2.default)(node, errorVisitor, this.scope, err);

      err.message += " (This is an error on an internal node. Probably an internal error";

      if (err.loc) {
        err.message += ". Location has been estimated.";
      }

      err.message += ")";
    }

    return err;
  };

  File.prototype.mergeSourceMap = function mergeSourceMap(map) {
    var inputMap = this.opts.inputSourceMap;

    if (inputMap && map) {
      return (0, _mergeMap2.default)(inputMap, map);
    } else {
      return map;
    }
  };

  File.prototype.parse = function parse(code) {
    var parseCode = _babylon.parse;
    var parserOpts = this.opts.parserOpts;

    if (parserOpts) {
      parserOpts = (0, _assign2.default)({}, this.parserOpts, parserOpts);

      if (parserOpts.parser) {
        if (typeof parserOpts.parser === "string") {
          var dirname = _path2.default.dirname(this.opts.filename) || process.cwd();
          var parser = (0, _resolve2.default)(parserOpts.parser, dirname);
          if (parser) {
            parseCode = require(parser).parse;
          } else {
            throw new Error("Couldn't find parser " + parserOpts.parser + " with \"parse\" method " + ("relative to directory " + dirname));
          }
        } else {
          parseCode = parserOpts.parser;
        }

        parserOpts.parser = {
          parse: function parse(source) {
            return (0, _babylon.parse)(source, parserOpts);
          }
        };
      }
    }

    this.log.debug("Parse start");
    var ast = parseCode(code, parserOpts || this.parserOpts);
    this.log.debug("Parse stop");
    return ast;
  };

  File.prototype._addAst = function _addAst(ast) {
    this.path = _babelTraverse.NodePath.get({
      hub: this.hub,
      parentPath: null,
      parent: ast,
      container: ast,
      key: "program"
    }).setContext();
    this.scope = this.path.scope;
    this.ast = ast;
    this.getMetadata();
  };

  File.prototype.addAst = function addAst(ast) {
    this.log.debug("Start set AST");
    this._addAst(ast);
    this.log.debug("End set AST");
  };

  File.prototype.transform = function transform() {
    for (var i = 0; i < this.pluginPasses.length; i++) {
      var pluginPasses = this.pluginPasses[i];
      this.call("pre", pluginPasses);
      this.log.debug("Start transform traverse");

      var visitor = _babelTraverse2.default.visitors.merge(this.pluginVisitors[i], pluginPasses, this.opts.wrapPluginVisitorMethod);
      (0, _babelTraverse2.default)(this.ast, visitor, this.scope);

      this.log.debug("End transform traverse");
      this.call("post", pluginPasses);
    }

    return this.generate();
  };

  File.prototype.wrap = function wrap(code, callback) {
    code = code + "";

    try {
      if (this.shouldIgnore()) {
        return this.makeResult({ code: code, ignored: true });
      } else {
        return callback();
      }
    } catch (err) {
      if (err._babel) {
        throw err;
      } else {
        err._babel = true;
      }

      var message = err.message = this.opts.filename + ": " + err.message;

      var loc = err.loc;
      if (loc) {
        err.codeFrame = (0, _babelCodeFrame2.default)(code, loc.line, loc.column + 1, this.opts);
        message += "\n" + err.codeFrame;
      }

      if (process.browser) {
        err.message = message;
      }

      if (err.stack) {
        var newStack = err.stack.replace(err.message, message);
        err.stack = newStack;
      }

      throw err;
    }
  };

  File.prototype.addCode = function addCode(code) {
    code = (code || "") + "";
    code = this.parseInputSourceMap(code);
    this.code = code;
  };

  File.prototype.parseCode = function parseCode() {
    this.parseShebang();
    var ast = this.parse(this.code);
    this.addAst(ast);
  };

  File.prototype.shouldIgnore = function shouldIgnore() {
    var opts = this.opts;
    return util.shouldIgnore(opts.filename, opts.ignore, opts.only);
  };

  File.prototype.call = function call(key, pluginPasses) {
    for (var _iterator3 = pluginPasses, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var pass = _ref3;

      var plugin = pass.plugin;
      var fn = plugin[key];
      if (fn) fn.call(pass, this);
    }
  };

  File.prototype.parseInputSourceMap = function parseInputSourceMap(code) {
    var opts = this.opts;

    if (opts.inputSourceMap !== false) {
      var inputMap = _convertSourceMap2.default.fromSource(code);
      if (inputMap) {
        opts.inputSourceMap = inputMap.toObject();
        code = _convertSourceMap2.default.removeComments(code);
      }
    }

    return code;
  };

  File.prototype.parseShebang = function parseShebang() {
    var shebangMatch = shebangRegex.exec(this.code);
    if (shebangMatch) {
      this.shebang = shebangMatch[0];
      this.code = this.code.replace(shebangRegex, "");
    }
  };

  File.prototype.makeResult = function makeResult(_ref4) {
    var code = _ref4.code,
        map = _ref4.map,
        ast = _ref4.ast,
        ignored = _ref4.ignored;

    var result = {
      metadata: null,
      options: this.opts,
      ignored: !!ignored,
      code: null,
      ast: null,
      map: map || null
    };

    if (this.opts.code) {
      result.code = code;
    }

    if (this.opts.ast) {
      result.ast = ast;
    }

    if (this.opts.metadata) {
      result.metadata = this.metadata;
    }

    return result;
  };

  File.prototype.generate = function generate() {
    var opts = this.opts;
    var ast = this.ast;

    var result = { ast: ast };
    if (!opts.code) return this.makeResult(result);

    var gen = _babelGenerator2.default;
    if (opts.generatorOpts.generator) {
      gen = opts.generatorOpts.generator;

      if (typeof gen === "string") {
        var dirname = _path2.default.dirname(this.opts.filename) || process.cwd();
        var generator = (0, _resolve2.default)(gen, dirname);
        if (generator) {
          gen = require(generator).print;
        } else {
          throw new Error("Couldn't find generator " + gen + " with \"print\" method relative " + ("to directory " + dirname));
        }
      }
    }

    this.log.debug("Generation start");

    var _result = gen(ast, opts.generatorOpts ? (0, _assign2.default)(opts, opts.generatorOpts) : opts, this.code);
    result.code = _result.code;
    result.map = _result.map;

    this.log.debug("Generation end");

    if (this.shebang) {
      result.code = this.shebang + "\n" + result.code;
    }

    if (result.map) {
      result.map = this.mergeSourceMap(result.map);
    }

    if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
      result.code += "\n" + _convertSourceMap2.default.fromObject(result.map).toComment();
    }

    if (opts.sourceMaps === "inline") {
      result.map = null;
    }

    return this.makeResult(result);
  };

  return File;
}(_store2.default);

exports.default = File;
exports.File = File;
}, function(modId) { var map = {"./metadata":1536577187512,"./options/option-manager":1536577187513,"../plugin-pass":1536577187529,"./logger":1536577187530,"../../store":1536577187515,"../../util":1536577187518,"./merge-map":1536577187531,"../../helpers/resolve":1536577187522,"../internal-plugins/block-hoist":1536577187532,"../internal-plugins/shadow-functions":1536577187533}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187512, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.ImportDeclaration = exports.ModuleDeclaration = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.ExportDeclaration = ExportDeclaration;
exports.Scope = Scope;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModuleDeclaration = exports.ModuleDeclaration = {
  enter: function enter(path, file) {
    var node = path.node;

    if (node.source) {
      node.source.value = file.resolveModuleSource(node.source.value);
    }
  }
};

var ImportDeclaration = exports.ImportDeclaration = {
  exit: function exit(path, file) {
    var node = path.node;


    var specifiers = [];
    var imported = [];
    file.metadata.modules.imports.push({
      source: node.source.value,
      imported: imported,
      specifiers: specifiers
    });

    for (var _iterator = path.get("specifiers"), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var specifier = _ref;

      var local = specifier.node.local.name;

      if (specifier.isImportDefaultSpecifier()) {
        imported.push("default");
        specifiers.push({
          kind: "named",
          imported: "default",
          local: local
        });
      }

      if (specifier.isImportSpecifier()) {
        var importedName = specifier.node.imported.name;
        imported.push(importedName);
        specifiers.push({
          kind: "named",
          imported: importedName,
          local: local
        });
      }

      if (specifier.isImportNamespaceSpecifier()) {
        imported.push("*");
        specifiers.push({
          kind: "namespace",
          local: local
        });
      }
    }
  }
};

function ExportDeclaration(path, file) {
  var node = path.node;


  var source = node.source ? node.source.value : null;
  var exports = file.metadata.modules.exports;

  var declar = path.get("declaration");
  if (declar.isStatement()) {
    var bindings = declar.getBindingIdentifiers();

    for (var name in bindings) {
      exports.exported.push(name);
      exports.specifiers.push({
        kind: "local",
        local: name,
        exported: path.isExportDefaultDeclaration() ? "default" : name
      });
    }
  }

  if (path.isExportNamedDeclaration() && node.specifiers) {
    for (var _iterator2 = node.specifiers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var specifier = _ref2;

      var exported = specifier.exported.name;
      exports.exported.push(exported);

      if (t.isExportDefaultSpecifier(specifier)) {
        exports.specifiers.push({
          kind: "external",
          local: exported,
          exported: exported,
          source: source
        });
      }

      if (t.isExportNamespaceSpecifier(specifier)) {
        exports.specifiers.push({
          kind: "external-namespace",
          exported: exported,
          source: source
        });
      }

      var local = specifier.local;
      if (!local) continue;

      if (source) {
        exports.specifiers.push({
          kind: "external",
          local: local.name,
          exported: exported,
          source: source
        });
      }

      if (!source) {
        exports.specifiers.push({
          kind: "local",
          local: local.name,
          exported: exported
        });
      }
    }
  }

  if (path.isExportAllDeclaration()) {
    exports.specifiers.push({
      kind: "external-all",
      source: source
    });
  }
}

function Scope(path) {
  path.skip();
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187513, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _node = require("../../../api/node");

var context = _interopRequireWildcard(_node);

var _plugin2 = require("../../plugin");

var _plugin3 = _interopRequireDefault(_plugin2);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _index = require("./index");

var _resolvePlugin = require("../../../helpers/resolve-plugin");

var _resolvePlugin2 = _interopRequireDefault(_resolvePlugin);

var _resolvePreset = require("../../../helpers/resolve-preset");

var _resolvePreset2 = _interopRequireDefault(_resolvePreset);

var _cloneDeepWith = require("lodash/cloneDeepWith");

var _cloneDeepWith2 = _interopRequireDefault(_cloneDeepWith);

var _clone = require("lodash/clone");

var _clone2 = _interopRequireDefault(_clone);

var _merge = require("../../../helpers/merge");

var _merge2 = _interopRequireDefault(_merge);

var _config2 = require("./config");

var _config3 = _interopRequireDefault(_config2);

var _removed = require("./removed");

var _removed2 = _interopRequireDefault(_removed);

var _buildConfigChain = require("./build-config-chain");

var _buildConfigChain2 = _interopRequireDefault(_buildConfigChain);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OptionManager = function () {
  function OptionManager(log) {
    (0, _classCallCheck3.default)(this, OptionManager);

    this.resolvedConfigs = [];
    this.options = OptionManager.createBareOptions();
    this.log = log;
  }

  OptionManager.memoisePluginContainer = function memoisePluginContainer(fn, loc, i, alias) {
    for (var _iterator = OptionManager.memoisedPlugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var cache = _ref;

      if (cache.container === fn) return cache.plugin;
    }

    var obj = void 0;

    if (typeof fn === "function") {
      obj = fn(context);
    } else {
      obj = fn;
    }

    if ((typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) === "object") {
      var _plugin = new _plugin3.default(obj, alias);
      OptionManager.memoisedPlugins.push({
        container: fn,
        plugin: _plugin
      });
      return _plugin;
    } else {
      throw new TypeError(messages.get("pluginNotObject", loc, i, typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) + loc + i);
    }
  };

  OptionManager.createBareOptions = function createBareOptions() {
    var opts = {};

    for (var _key in _config3.default) {
      var opt = _config3.default[_key];
      opts[_key] = (0, _clone2.default)(opt.default);
    }

    return opts;
  };

  OptionManager.normalisePlugin = function normalisePlugin(plugin, loc, i, alias) {
    plugin = plugin.__esModule ? plugin.default : plugin;

    if (!(plugin instanceof _plugin3.default)) {
      if (typeof plugin === "function" || (typeof plugin === "undefined" ? "undefined" : (0, _typeof3.default)(plugin)) === "object") {
        plugin = OptionManager.memoisePluginContainer(plugin, loc, i, alias);
      } else {
        throw new TypeError(messages.get("pluginNotFunction", loc, i, typeof plugin === "undefined" ? "undefined" : (0, _typeof3.default)(plugin)));
      }
    }

    plugin.init(loc, i);

    return plugin;
  };

  OptionManager.normalisePlugins = function normalisePlugins(loc, dirname, plugins) {
    return plugins.map(function (val, i) {
      var plugin = void 0,
          options = void 0;

      if (!val) {
        throw new TypeError("Falsy value found in plugins");
      }

      if (Array.isArray(val)) {
        plugin = val[0];
        options = val[1];
      } else {
        plugin = val;
      }

      var alias = typeof plugin === "string" ? plugin : loc + "$" + i;

      if (typeof plugin === "string") {
        var pluginLoc = (0, _resolvePlugin2.default)(plugin, dirname);
        if (pluginLoc) {
          plugin = require(pluginLoc);
        } else {
          throw new ReferenceError(messages.get("pluginUnknown", plugin, loc, i, dirname));
        }
      }

      plugin = OptionManager.normalisePlugin(plugin, loc, i, alias);

      return [plugin, options];
    });
  };

  OptionManager.prototype.mergeOptions = function mergeOptions(_ref2) {
    var _this = this;

    var rawOpts = _ref2.options,
        extendingOpts = _ref2.extending,
        alias = _ref2.alias,
        loc = _ref2.loc,
        dirname = _ref2.dirname;

    alias = alias || "foreign";
    if (!rawOpts) return;

    if ((typeof rawOpts === "undefined" ? "undefined" : (0, _typeof3.default)(rawOpts)) !== "object" || Array.isArray(rawOpts)) {
      this.log.error("Invalid options type for " + alias, TypeError);
    }

    var opts = (0, _cloneDeepWith2.default)(rawOpts, function (val) {
      if (val instanceof _plugin3.default) {
        return val;
      }
    });

    dirname = dirname || process.cwd();
    loc = loc || alias;

    for (var _key2 in opts) {
      var option = _config3.default[_key2];

      if (!option && this.log) {
        if (_removed2.default[_key2]) {
          this.log.error("Using removed Babel 5 option: " + alias + "." + _key2 + " - " + _removed2.default[_key2].message, ReferenceError);
        } else {
          var unknownOptErr = "Unknown option: " + alias + "." + _key2 + ". Check out http://babeljs.io/docs/usage/options/ for more information about options.";
          var presetConfigErr = "A common cause of this error is the presence of a configuration options object without the corresponding preset name. Example:\n\nInvalid:\n  `{ presets: [{option: value}] }`\nValid:\n  `{ presets: [['presetName', {option: value}]] }`\n\nFor more detailed information on preset configuration, please see https://babeljs.io/docs/en/plugins#pluginpresets-options.";


          this.log.error(unknownOptErr + "\n\n" + presetConfigErr, ReferenceError);
        }
      }
    }

    (0, _index.normaliseOptions)(opts);

    if (opts.plugins) {
      opts.plugins = OptionManager.normalisePlugins(loc, dirname, opts.plugins);
    }

    if (opts.presets) {
      if (opts.passPerPreset) {
        opts.presets = this.resolvePresets(opts.presets, dirname, function (preset, presetLoc) {
          _this.mergeOptions({
            options: preset,
            extending: preset,
            alias: presetLoc,
            loc: presetLoc,
            dirname: dirname
          });
        });
      } else {
        this.mergePresets(opts.presets, dirname);
        delete opts.presets;
      }
    }

    if (rawOpts === extendingOpts) {
      (0, _assign2.default)(extendingOpts, opts);
    } else {
      (0, _merge2.default)(extendingOpts || this.options, opts);
    }
  };

  OptionManager.prototype.mergePresets = function mergePresets(presets, dirname) {
    var _this2 = this;

    this.resolvePresets(presets, dirname, function (presetOpts, presetLoc) {
      _this2.mergeOptions({
        options: presetOpts,
        alias: presetLoc,
        loc: presetLoc,
        dirname: _path2.default.dirname(presetLoc || "")
      });
    });
  };

  OptionManager.prototype.resolvePresets = function resolvePresets(presets, dirname, onResolve) {
    return presets.map(function (val) {
      var options = void 0;
      if (Array.isArray(val)) {
        if (val.length > 2) {
          throw new Error("Unexpected extra options " + (0, _stringify2.default)(val.slice(2)) + " passed to preset.");
        }

        var _val = val;
        val = _val[0];
        options = _val[1];
      }

      var presetLoc = void 0;
      try {
        if (typeof val === "string") {
          presetLoc = (0, _resolvePreset2.default)(val, dirname);

          if (!presetLoc) {
            throw new Error("Couldn't find preset " + (0, _stringify2.default)(val) + " relative to directory " + (0, _stringify2.default)(dirname));
          }

          val = require(presetLoc);
        }

        if ((typeof val === "undefined" ? "undefined" : (0, _typeof3.default)(val)) === "object" && val.__esModule) {
          if (val.default) {
            val = val.default;
          } else {
            var _val2 = val,
                __esModule = _val2.__esModule,
                rest = (0, _objectWithoutProperties3.default)(_val2, ["__esModule"]);

            val = rest;
          }
        }

        if ((typeof val === "undefined" ? "undefined" : (0, _typeof3.default)(val)) === "object" && val.buildPreset) val = val.buildPreset;

        if (typeof val !== "function" && options !== undefined) {
          throw new Error("Options " + (0, _stringify2.default)(options) + " passed to " + (presetLoc || "a preset") + " which does not accept options.");
        }

        if (typeof val === "function") val = val(context, options, { dirname: dirname });

        if ((typeof val === "undefined" ? "undefined" : (0, _typeof3.default)(val)) !== "object") {
          throw new Error("Unsupported preset format: " + val + ".");
        }

        onResolve && onResolve(val, presetLoc);
      } catch (e) {
        if (presetLoc) {
          e.message += " (While processing preset: " + (0, _stringify2.default)(presetLoc) + ")";
        }
        throw e;
      }
      return val;
    });
  };

  OptionManager.prototype.normaliseOptions = function normaliseOptions() {
    var opts = this.options;

    for (var _key3 in _config3.default) {
      var option = _config3.default[_key3];
      var val = opts[_key3];

      if (!val && option.optional) continue;

      if (option.alias) {
        opts[option.alias] = opts[option.alias] || val;
      } else {
        opts[_key3] = val;
      }
    }
  };

  OptionManager.prototype.init = function init() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _iterator2 = (0, _buildConfigChain2.default)(opts, this.log), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var _config = _ref3;

      this.mergeOptions(_config);
    }

    this.normaliseOptions(opts);

    return this.options;
  };

  return OptionManager;
}();

exports.default = OptionManager;


OptionManager.memoisedPlugins = [];
module.exports = exports["default"];
}, function(modId) { var map = {"../../../api/node":1536577187510,"../../plugin":1536577187514,"./index":1536577187516,"../../../helpers/resolve-plugin":1536577187520,"../../../helpers/resolve-preset":1536577187524,"../../../helpers/merge":1536577187526,"./config":1536577187519,"./removed":1536577187527,"./build-config-chain":1536577187528}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187514, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _optionManager = require("./file/options/option-manager");

var _optionManager2 = _interopRequireDefault(_optionManager);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _clone = require("lodash/clone");

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GLOBAL_VISITOR_PROPS = ["enter", "exit"];

var Plugin = function (_Store) {
  (0, _inherits3.default)(Plugin, _Store);

  function Plugin(plugin, key) {
    (0, _classCallCheck3.default)(this, Plugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this));

    _this.initialized = false;
    _this.raw = (0, _assign2.default)({}, plugin);
    _this.key = _this.take("name") || key;

    _this.manipulateOptions = _this.take("manipulateOptions");
    _this.post = _this.take("post");
    _this.pre = _this.take("pre");
    _this.visitor = _this.normaliseVisitor((0, _clone2.default)(_this.take("visitor")) || {});
    return _this;
  }

  Plugin.prototype.take = function take(key) {
    var val = this.raw[key];
    delete this.raw[key];
    return val;
  };

  Plugin.prototype.chain = function chain(target, key) {
    if (!target[key]) return this[key];
    if (!this[key]) return target[key];

    var fns = [target[key], this[key]];

    return function () {
      var val = void 0;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var _iterator = fns, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var fn = _ref;

        if (fn) {
          var ret = fn.apply(this, args);
          if (ret != null) val = ret;
        }
      }
      return val;
    };
  };

  Plugin.prototype.maybeInherit = function maybeInherit(loc) {
    var inherits = this.take("inherits");
    if (!inherits) return;

    inherits = _optionManager2.default.normalisePlugin(inherits, loc, "inherits");

    this.manipulateOptions = this.chain(inherits, "manipulateOptions");
    this.post = this.chain(inherits, "post");
    this.pre = this.chain(inherits, "pre");
    this.visitor = _babelTraverse2.default.visitors.merge([inherits.visitor, this.visitor]);
  };

  Plugin.prototype.init = function init(loc, i) {
    if (this.initialized) return;
    this.initialized = true;

    this.maybeInherit(loc);

    for (var key in this.raw) {
      throw new Error(messages.get("pluginInvalidProperty", loc, i, key));
    }
  };

  Plugin.prototype.normaliseVisitor = function normaliseVisitor(visitor) {
    for (var _iterator2 = GLOBAL_VISITOR_PROPS, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var key = _ref2;

      if (visitor[key]) {
        throw new Error("Plugins aren't allowed to specify catch-all enter/exit handlers. " + "Please target individual nodes.");
      }
    }

    _babelTraverse2.default.explode(visitor);
    return visitor;
  };

  return Plugin;
}(_store2.default);

exports.default = Plugin;
module.exports = exports["default"];
}, function(modId) { var map = {"./file/options/option-manager":1536577187513,"../store":1536577187515}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187515, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Store = function (_Map) {
  (0, _inherits3.default)(Store, _Map);

  function Store() {
    (0, _classCallCheck3.default)(this, Store);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Map.call(this));

    _this.dynamicData = {};
    return _this;
  }

  Store.prototype.setDynamic = function setDynamic(key, fn) {
    this.dynamicData[key] = fn;
  };

  Store.prototype.get = function get(key) {
    if (this.has(key)) {
      return _Map.prototype.get.call(this, key);
    } else {
      if (Object.prototype.hasOwnProperty.call(this.dynamicData, key)) {
        var val = this.dynamicData[key]();
        this.set(key, val);
        return val;
      }
    }
  };

  return Store;
}(_map2.default);

exports.default = Store;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187516, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.config = undefined;
exports.normaliseOptions = normaliseOptions;

var _parsers = require("./parsers");

var parsers = _interopRequireWildcard(_parsers);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.config = _config2.default;
function normaliseOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var key in options) {
    var val = options[key];
    if (val == null) continue;

    var opt = _config2.default[key];
    if (opt && opt.alias) opt = _config2.default[opt.alias];
    if (!opt) continue;

    var parser = parsers[opt.type];
    if (parser) val = parser(val);

    options[key] = val;
  }

  return options;
}
}, function(modId) { var map = {"./parsers":1536577187517,"./config":1536577187519}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187517, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.filename = undefined;
exports.boolean = boolean;
exports.booleanString = booleanString;
exports.list = list;

var _slash = require("slash");

var _slash2 = _interopRequireDefault(_slash);

var _util = require("../../../util");

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filename = exports.filename = _slash2.default;

function boolean(val) {
  return !!val;
}

function booleanString(val) {
  return util.booleanify(val);
}

function list(val) {
  return util.list(val);
}
}, function(modId) { var map = {"../../../util":1536577187518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187518, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.inspect = exports.inherits = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _util = require("util");

Object.defineProperty(exports, "inherits", {
  enumerable: true,
  get: function get() {
    return _util.inherits;
  }
});
Object.defineProperty(exports, "inspect", {
  enumerable: true,
  get: function get() {
    return _util.inspect;
  }
});
exports.canCompile = canCompile;
exports.list = list;
exports.regexify = regexify;
exports.arrayify = arrayify;
exports.booleanify = booleanify;
exports.shouldIgnore = shouldIgnore;

var _escapeRegExp = require("lodash/escapeRegExp");

var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

var _startsWith = require("lodash/startsWith");

var _startsWith2 = _interopRequireDefault(_startsWith);

var _minimatch = require("minimatch");

var _minimatch2 = _interopRequireDefault(_minimatch);

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _isRegExp = require("lodash/isRegExp");

var _isRegExp2 = _interopRequireDefault(_isRegExp);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _slash = require("slash");

var _slash2 = _interopRequireDefault(_slash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function canCompile(filename, altExts) {
  var exts = altExts || canCompile.EXTENSIONS;
  var ext = _path2.default.extname(filename);
  return (0, _includes2.default)(exts, ext);
}

canCompile.EXTENSIONS = [".js", ".jsx", ".es6", ".es"];

function list(val) {
  if (!val) {
    return [];
  } else if (Array.isArray(val)) {
    return val;
  } else if (typeof val === "string") {
    return val.split(",");
  } else {
    return [val];
  }
}

function regexify(val) {
  if (!val) {
    return new RegExp(/.^/);
  }

  if (Array.isArray(val)) {
    val = new RegExp(val.map(_escapeRegExp2.default).join("|"), "i");
  }

  if (typeof val === "string") {
    val = (0, _slash2.default)(val);

    if ((0, _startsWith2.default)(val, "./") || (0, _startsWith2.default)(val, "*/")) val = val.slice(2);
    if ((0, _startsWith2.default)(val, "**/")) val = val.slice(3);

    var regex = _minimatch2.default.makeRe(val, { nocase: true });
    return new RegExp(regex.source.slice(1, -1), "i");
  }

  if ((0, _isRegExp2.default)(val)) {
    return val;
  }

  throw new TypeError("illegal type for regexify");
}

function arrayify(val, mapFn) {
  if (!val) return [];
  if (typeof val === "boolean") return arrayify([val], mapFn);
  if (typeof val === "string") return arrayify(list(val), mapFn);

  if (Array.isArray(val)) {
    if (mapFn) val = val.map(mapFn);
    return val;
  }

  return [val];
}

function booleanify(val) {
  if (val === "true" || val == 1) {
    return true;
  }

  if (val === "false" || val == 0 || !val) {
    return false;
  }

  return val;
}

function shouldIgnore(filename) {
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var only = arguments[2];

  filename = filename.replace(/\\/g, "/");

  if (only) {
    for (var _iterator = only, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var pattern = _ref;

      if (_shouldIgnore(pattern, filename)) return false;
    }
    return true;
  } else if (ignore.length) {
    for (var _iterator2 = ignore, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var _pattern = _ref2;

      if (_shouldIgnore(_pattern, filename)) return true;
    }
  }

  return false;
}

function _shouldIgnore(pattern, filename) {
  if (typeof pattern === "function") {
    return pattern(filename);
  } else {
    return pattern.test(filename);
  }
}
}, function(modId) { var map = {"util":1536577187518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187519, function(require, module, exports) {
"use strict";

module.exports = {
  filename: {
    type: "filename",
    description: "filename to use when reading from stdin - this will be used in source-maps, errors etc",
    default: "unknown",
    shorthand: "f"
  },

  filenameRelative: {
    hidden: true,
    type: "string"
  },

  inputSourceMap: {
    hidden: true
  },

  env: {
    hidden: true,
    default: {}
  },

  mode: {
    description: "",
    hidden: true
  },

  retainLines: {
    type: "boolean",
    default: false,
    description: "retain line numbers - will result in really ugly code"
  },

  highlightCode: {
    description: "enable/disable ANSI syntax highlighting of code frames (on by default)",
    type: "boolean",
    default: true
  },

  suppressDeprecationMessages: {
    type: "boolean",
    default: false,
    hidden: true
  },

  presets: {
    type: "list",
    description: "",
    default: []
  },

  plugins: {
    type: "list",
    default: [],
    description: ""
  },

  ignore: {
    type: "list",
    description: "list of glob paths to **not** compile",
    default: []
  },

  only: {
    type: "list",
    description: "list of glob paths to **only** compile"
  },

  code: {
    hidden: true,
    default: true,
    type: "boolean"
  },

  metadata: {
    hidden: true,
    default: true,
    type: "boolean"
  },

  ast: {
    hidden: true,
    default: true,
    type: "boolean"
  },

  extends: {
    type: "string",
    hidden: true
  },

  comments: {
    type: "boolean",
    default: true,
    description: "write comments to generated output (true by default)"
  },

  shouldPrintComment: {
    hidden: true,
    description: "optional callback to control whether a comment should be inserted, when this is used the comments option is ignored"
  },

  wrapPluginVisitorMethod: {
    hidden: true,
    description: "optional callback to wrap all visitor methods"
  },

  compact: {
    type: "booleanString",
    default: "auto",
    description: "do not include superfluous whitespace characters and line terminators [true|false|auto]"
  },

  minified: {
    type: "boolean",
    default: false,
    description: "save as much bytes when printing [true|false]"
  },

  sourceMap: {
    alias: "sourceMaps",
    hidden: true
  },

  sourceMaps: {
    type: "booleanString",
    description: "[true|false|inline]",
    default: false,
    shorthand: "s"
  },

  sourceMapTarget: {
    type: "string",
    description: "set `file` on returned source map"
  },

  sourceFileName: {
    type: "string",
    description: "set `sources[0]` on returned source map"
  },

  sourceRoot: {
    type: "filename",
    description: "the root from which all sources are relative"
  },

  babelrc: {
    description: "Whether or not to look up .babelrc and .babelignore files",
    type: "boolean",
    default: true
  },

  sourceType: {
    description: "",
    default: "module"
  },

  auxiliaryCommentBefore: {
    type: "string",
    description: "print a comment before any injected non-user code"
  },

  auxiliaryCommentAfter: {
    type: "string",
    description: "print a comment after any injected non-user code"
  },

  resolveModuleSource: {
    hidden: true
  },

  getModuleId: {
    hidden: true
  },

  moduleRoot: {
    type: "filename",
    description: "optional prefix for the AMD module formatter that will be prepend to the filename on module definitions"
  },

  moduleIds: {
    type: "boolean",
    default: false,
    shorthand: "M",
    description: "insert an explicit id for modules"
  },

  moduleId: {
    description: "specify a custom name for module ids",
    type: "string"
  },

  passPerPreset: {
    description: "Whether to spawn a traversal pass per a preset. By default all presets are merged.",
    type: "boolean",
    default: false,
    hidden: true
  },

  parserOpts: {
    description: "Options to pass into the parser, or to change parsers (parserOpts.parser)",
    default: false
  },

  generatorOpts: {
    description: "Options to pass into the generator, or to change generators (generatorOpts.generator)",
    default: false
  }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187520, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.default = resolvePlugin;

var _resolveFromPossibleNames = require("./resolve-from-possible-names");

var _resolveFromPossibleNames2 = _interopRequireDefault(_resolveFromPossibleNames);

var _getPossiblePluginNames = require("./get-possible-plugin-names");

var _getPossiblePluginNames2 = _interopRequireDefault(_getPossiblePluginNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolvePlugin(pluginName) {
  var dirname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.cwd();

  return (0, _resolveFromPossibleNames2.default)((0, _getPossiblePluginNames2.default)(pluginName), dirname);
}
module.exports = exports["default"];
}, function(modId) { var map = {"./resolve-from-possible-names":1536577187521,"./get-possible-plugin-names":1536577187523}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187521, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.default = resolveFromPossibleNames;

var _resolve = require("./resolve");

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveFromPossibleNames(possibleNames, dirname) {
  return possibleNames.reduce(function (accum, curr) {
    return accum || (0, _resolve2.default)(curr, dirname);
  }, null);
}
module.exports = exports["default"];
}, function(modId) { var map = {"./resolve":1536577187522}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187522, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = function (loc) {
  var relative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.cwd();

  if ((typeof _module2.default === "undefined" ? "undefined" : (0, _typeof3.default)(_module2.default)) === "object") return null;

  var relativeMod = relativeModules[relative];

  if (!relativeMod) {
    relativeMod = new _module2.default();

    var filename = _path2.default.join(relative, ".babelrc");
    relativeMod.id = filename;
    relativeMod.filename = filename;

    relativeMod.paths = _module2.default._nodeModulePaths(relative);
    relativeModules[relative] = relativeMod;
  }

  try {
    return _module2.default._resolveFilename(loc, relativeMod);
  } catch (err) {
    return null;
  }
};

var _module = require("module");

var _module2 = _interopRequireDefault(_module);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var relativeModules = {};

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187523, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.default = getPossiblePluginNames;
function getPossiblePluginNames(pluginName) {
  return ["babel-plugin-" + pluginName, pluginName];
}
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187524, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.default = resolvePreset;

var _resolveFromPossibleNames = require("./resolve-from-possible-names");

var _resolveFromPossibleNames2 = _interopRequireDefault(_resolveFromPossibleNames);

var _getPossiblePresetNames = require("./get-possible-preset-names");

var _getPossiblePresetNames2 = _interopRequireDefault(_getPossiblePresetNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolvePreset(presetName) {
  var dirname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.cwd();

  return (0, _resolveFromPossibleNames2.default)((0, _getPossiblePresetNames2.default)(presetName), dirname);
}
module.exports = exports["default"];
}, function(modId) { var map = {"./resolve-from-possible-names":1536577187521,"./get-possible-preset-names":1536577187525}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187525, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.default = getPossiblePresetNames;
function getPossiblePresetNames(presetName) {
  var possibleNames = ["babel-preset-" + presetName, presetName];

  var matches = presetName.match(/^(@[^/]+)\/(.+)$/);
  if (matches) {
    var orgName = matches[1],
        presetPath = matches[2];

    possibleNames.push(orgName + "/babel-preset-" + presetPath);
  }

  return possibleNames;
}
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187526, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (dest, src) {
  if (!dest || !src) return;

  return (0, _mergeWith2.default)(dest, src, function (a, b) {
    if (b && Array.isArray(a)) {
      var newArray = b.slice(0);

      for (var _iterator = a, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var item = _ref;

        if (newArray.indexOf(item) < 0) {
          newArray.push(item);
        }
      }

      return newArray;
    }
  });
};

var _mergeWith = require("lodash/mergeWith");

var _mergeWith2 = _interopRequireDefault(_mergeWith);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187527, function(require, module, exports) {
"use strict";

module.exports = {
  "auxiliaryComment": {
    "message": "Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"
  },
  "blacklist": {
    "message": "Put the specific transforms you want in the `plugins` option"
  },
  "breakConfig": {
    "message": "This is not a necessary option in Babel 6"
  },
  "experimental": {
    "message": "Put the specific transforms you want in the `plugins` option"
  },
  "externalHelpers": {
    "message": "Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"
  },
  "extra": {
    "message": ""
  },
  "jsxPragma": {
    "message": "use the `pragma` option in the `react-jsx` plugin . Check out http://babeljs.io/docs/plugins/transform-react-jsx/"
  },

  "loose": {
    "message": "Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."
  },
  "metadataUsedHelpers": {
    "message": "Not required anymore as this is enabled by default"
  },
  "modules": {
    "message": "Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"
  },
  "nonStandard": {
    "message": "Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"
  },
  "optional": {
    "message": "Put the specific transforms you want in the `plugins` option"
  },
  "sourceMapName": {
    "message": "Use the `sourceMapTarget` option"
  },
  "stage": {
    "message": "Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"
  },
  "whitelist": {
    "message": "Put the specific transforms you want in the `plugins` option"
  }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187528, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = buildConfigChain;

var _resolve = require("../../../helpers/resolve");

var _resolve2 = _interopRequireDefault(_resolve);

var _json = require("json5");

var _json2 = _interopRequireDefault(_json);

var _pathIsAbsolute = require("path-is-absolute");

var _pathIsAbsolute2 = _interopRequireDefault(_pathIsAbsolute);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var existsCache = {};
var jsonCache = {};

var BABELIGNORE_FILENAME = ".babelignore";
var BABELRC_FILENAME = ".babelrc";
var PACKAGE_FILENAME = "package.json";

function exists(filename) {
  var cached = existsCache[filename];
  if (cached == null) {
    return existsCache[filename] = _fs2.default.existsSync(filename);
  } else {
    return cached;
  }
}

function buildConfigChain() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var log = arguments[1];

  var filename = opts.filename;
  var builder = new ConfigChainBuilder(log);

  if (opts.babelrc !== false) {
    builder.findConfigs(filename);
  }

  builder.mergeConfig({
    options: opts,
    alias: "base",
    dirname: filename && _path2.default.dirname(filename)
  });

  return builder.configs;
}

var ConfigChainBuilder = function () {
  function ConfigChainBuilder(log) {
    (0, _classCallCheck3.default)(this, ConfigChainBuilder);

    this.resolvedConfigs = [];
    this.configs = [];
    this.log = log;
  }

  ConfigChainBuilder.prototype.findConfigs = function findConfigs(loc) {
    if (!loc) return;

    if (!(0, _pathIsAbsolute2.default)(loc)) {
      loc = _path2.default.join(process.cwd(), loc);
    }

    var foundConfig = false;
    var foundIgnore = false;

    while (loc !== (loc = _path2.default.dirname(loc))) {
      if (!foundConfig) {
        var configLoc = _path2.default.join(loc, BABELRC_FILENAME);
        if (exists(configLoc)) {
          this.addConfig(configLoc);
          foundConfig = true;
        }

        var pkgLoc = _path2.default.join(loc, PACKAGE_FILENAME);
        if (!foundConfig && exists(pkgLoc)) {
          foundConfig = this.addConfig(pkgLoc, "babel", JSON);
        }
      }

      if (!foundIgnore) {
        var ignoreLoc = _path2.default.join(loc, BABELIGNORE_FILENAME);
        if (exists(ignoreLoc)) {
          this.addIgnoreConfig(ignoreLoc);
          foundIgnore = true;
        }
      }

      if (foundIgnore && foundConfig) return;
    }
  };

  ConfigChainBuilder.prototype.addIgnoreConfig = function addIgnoreConfig(loc) {
    var file = _fs2.default.readFileSync(loc, "utf8");
    var lines = file.split("\n");

    lines = lines.map(function (line) {
      return line.replace(/#(.*?)$/, "").trim();
    }).filter(function (line) {
      return !!line;
    });

    if (lines.length) {
      this.mergeConfig({
        options: { ignore: lines },
        alias: loc,
        dirname: _path2.default.dirname(loc)
      });
    }
  };

  ConfigChainBuilder.prototype.addConfig = function addConfig(loc, key) {
    var json = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _json2.default;

    if (this.resolvedConfigs.indexOf(loc) >= 0) {
      return false;
    }

    this.resolvedConfigs.push(loc);

    var content = _fs2.default.readFileSync(loc, "utf8");
    var options = void 0;

    try {
      options = jsonCache[content] = jsonCache[content] || json.parse(content);
      if (key) options = options[key];
    } catch (err) {
      err.message = loc + ": Error while parsing JSON - " + err.message;
      throw err;
    }

    this.mergeConfig({
      options: options,
      alias: loc,
      dirname: _path2.default.dirname(loc)
    });

    return !!options;
  };

  ConfigChainBuilder.prototype.mergeConfig = function mergeConfig(_ref) {
    var options = _ref.options,
        alias = _ref.alias,
        loc = _ref.loc,
        dirname = _ref.dirname;

    if (!options) {
      return false;
    }

    options = (0, _assign2.default)({}, options);

    dirname = dirname || process.cwd();
    loc = loc || alias;

    if (options.extends) {
      var extendsLoc = (0, _resolve2.default)(options.extends, dirname);
      if (extendsLoc) {
        this.addConfig(extendsLoc);
      } else {
        if (this.log) this.log.error("Couldn't resolve extends clause of " + options.extends + " in " + alias);
      }
      delete options.extends;
    }

    this.configs.push({
      options: options,
      alias: alias,
      loc: loc,
      dirname: dirname
    });

    var envOpts = void 0;
    var envKey = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
    if (options.env) {
      envOpts = options.env[envKey];
      delete options.env;
    }

    this.mergeConfig({
      options: envOpts,
      alias: alias + ".env." + envKey,
      dirname: dirname
    });
  };

  return ConfigChainBuilder;
}();

module.exports = exports["default"];
}, function(modId) { var map = {"../../../helpers/resolve":1536577187522}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187529, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _file5 = require("./file");

var _file6 = _interopRequireDefault(_file5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PluginPass = function (_Store) {
  (0, _inherits3.default)(PluginPass, _Store);

  function PluginPass(file, plugin) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck3.default)(this, PluginPass);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this));

    _this.plugin = plugin;
    _this.key = plugin.key;
    _this.file = file;
    _this.opts = options;
    return _this;
  }

  PluginPass.prototype.addHelper = function addHelper() {
    var _file;

    return (_file = this.file).addHelper.apply(_file, arguments);
  };

  PluginPass.prototype.addImport = function addImport() {
    var _file2;

    return (_file2 = this.file).addImport.apply(_file2, arguments);
  };

  PluginPass.prototype.getModuleName = function getModuleName() {
    var _file3;

    return (_file3 = this.file).getModuleName.apply(_file3, arguments);
  };

  PluginPass.prototype.buildCodeFrameError = function buildCodeFrameError() {
    var _file4;

    return (_file4 = this.file).buildCodeFrameError.apply(_file4, arguments);
  };

  return PluginPass;
}(_store2.default);

exports.default = PluginPass;
module.exports = exports["default"];
}, function(modId) { var map = {"../store":1536577187515,"./file":1536577187511}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187530, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _node = require("debug/node");

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verboseDebug = (0, _node2.default)("babel:verbose");
var generalDebug = (0, _node2.default)("babel");

var seenDeprecatedMessages = [];

var Logger = function () {
  function Logger(file, filename) {
    (0, _classCallCheck3.default)(this, Logger);

    this.filename = filename;
    this.file = file;
  }

  Logger.prototype._buildMessage = function _buildMessage(msg) {
    var parts = "[BABEL] " + this.filename;
    if (msg) parts += ": " + msg;
    return parts;
  };

  Logger.prototype.warn = function warn(msg) {
    console.warn(this._buildMessage(msg));
  };

  Logger.prototype.error = function error(msg) {
    var Constructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;

    throw new Constructor(this._buildMessage(msg));
  };

  Logger.prototype.deprecate = function deprecate(msg) {
    if (this.file.opts && this.file.opts.suppressDeprecationMessages) return;

    msg = this._buildMessage(msg);

    if (seenDeprecatedMessages.indexOf(msg) >= 0) return;

    seenDeprecatedMessages.push(msg);

    console.error(msg);
  };

  Logger.prototype.verbose = function verbose(msg) {
    if (verboseDebug.enabled) verboseDebug(this._buildMessage(msg));
  };

  Logger.prototype.debug = function debug(msg) {
    if (generalDebug.enabled) generalDebug(this._buildMessage(msg));
  };

  Logger.prototype.deopt = function deopt(node, msg) {
    this.debug(msg);
  };

  return Logger;
}();

exports.default = Logger;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187531, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

exports.default = mergeSourceMap;

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeSourceMap(inputMap, map) {
  var input = buildMappingData(inputMap);
  var output = buildMappingData(map);

  var mergedGenerator = new _sourceMap2.default.SourceMapGenerator();
  for (var _iterator = input.sources, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref2;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref2 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref2 = _i.value;
    }

    var _ref4 = _ref2;
    var _source = _ref4.source;

    if (typeof _source.content === "string") {
      mergedGenerator.setSourceContent(_source.path, _source.content);
    }
  }

  if (output.sources.length === 1) {
    var defaultSource = output.sources[0];
    var insertedMappings = new _map2.default();

    eachInputGeneratedRange(input, function (generated, original, source) {
      eachOverlappingGeneratedOutputRange(defaultSource, generated, function (item) {
        var key = makeMappingKey(item);
        if (insertedMappings.has(key)) return;
        insertedMappings.set(key, item);

        mergedGenerator.addMapping({
          source: source.path,
          original: {
            line: original.line,
            column: original.columnStart
          },
          generated: {
            line: item.line,
            column: item.columnStart
          },
          name: original.name
        });
      });
    });

    for (var _iterator2 = insertedMappings.values(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var item = _ref3;

      if (item.columnEnd === Infinity) {
        continue;
      }

      var clearItem = {
        line: item.line,
        columnStart: item.columnEnd
      };

      var key = makeMappingKey(clearItem);
      if (insertedMappings.has(key)) {
        continue;
      }

      mergedGenerator.addMapping({
        generated: {
          line: clearItem.line,
          column: clearItem.columnStart
        }
      });
    }
  }

  var result = mergedGenerator.toJSON();

  if (typeof input.sourceRoot === "string") {
    result.sourceRoot = input.sourceRoot;
  }
  return result;
}

function makeMappingKey(item) {
  return (0, _stringify2.default)([item.line, item.columnStart]);
}

function eachOverlappingGeneratedOutputRange(outputFile, inputGeneratedRange, callback) {
  var overlappingOriginal = filterApplicableOriginalRanges(outputFile, inputGeneratedRange);

  for (var _iterator3 = overlappingOriginal, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
    var _ref6;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref6 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref6 = _i3.value;
    }

    var _ref7 = _ref6;
    var _generated = _ref7.generated;

    for (var _iterator4 = _generated, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
      var _ref8;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref8 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref8 = _i4.value;
      }

      var item = _ref8;

      callback(item);
    }
  }
}

function filterApplicableOriginalRanges(_ref9, _ref10) {
  var mappings = _ref9.mappings;
  var line = _ref10.line,
      columnStart = _ref10.columnStart,
      columnEnd = _ref10.columnEnd;

  return filterSortedArray(mappings, function (_ref11) {
    var outOriginal = _ref11.original;

    if (line > outOriginal.line) return -1;
    if (line < outOriginal.line) return 1;

    if (columnStart >= outOriginal.columnEnd) return -1;
    if (columnEnd <= outOriginal.columnStart) return 1;

    return 0;
  });
}

function eachInputGeneratedRange(map, callback) {
  for (var _iterator5 = map.sources, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
    var _ref13;

    if (_isArray5) {
      if (_i5 >= _iterator5.length) break;
      _ref13 = _iterator5[_i5++];
    } else {
      _i5 = _iterator5.next();
      if (_i5.done) break;
      _ref13 = _i5.value;
    }

    var _ref14 = _ref13;
    var _source2 = _ref14.source,
        _mappings = _ref14.mappings;

    for (var _iterator6 = _mappings, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
      var _ref16;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref16 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref16 = _i6.value;
      }

      var _ref17 = _ref16;
      var _original = _ref17.original,
          _generated2 = _ref17.generated;

      for (var _iterator7 = _generated2, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
        var _ref18;

        if (_isArray7) {
          if (_i7 >= _iterator7.length) break;
          _ref18 = _iterator7[_i7++];
        } else {
          _i7 = _iterator7.next();
          if (_i7.done) break;
          _ref18 = _i7.value;
        }

        var item = _ref18;

        callback(item, _original, _source2);
      }
    }
  }
}

function buildMappingData(map) {
  var consumer = new _sourceMap2.default.SourceMapConsumer((0, _extends3.default)({}, map, {
    sourceRoot: null
  }));

  var sources = new _map2.default();
  var mappings = new _map2.default();

  var last = null;

  consumer.computeColumnSpans();

  consumer.eachMapping(function (m) {
    if (m.originalLine === null) return;

    var source = sources.get(m.source);
    if (!source) {
      source = {
        path: m.source,
        content: consumer.sourceContentFor(m.source, true)
      };
      sources.set(m.source, source);
    }

    var sourceData = mappings.get(source);
    if (!sourceData) {
      sourceData = {
        source: source,
        mappings: []
      };
      mappings.set(source, sourceData);
    }

    var obj = {
      line: m.originalLine,
      columnStart: m.originalColumn,
      columnEnd: Infinity,
      name: m.name
    };

    if (last && last.source === source && last.mapping.line === m.originalLine) {
      last.mapping.columnEnd = m.originalColumn;
    }

    last = {
      source: source,
      mapping: obj
    };

    sourceData.mappings.push({
      original: obj,
      generated: consumer.allGeneratedPositionsFor({
        source: m.source,
        line: m.originalLine,
        column: m.originalColumn
      }).map(function (item) {
        return {
          line: item.line,
          columnStart: item.column,

          columnEnd: item.lastColumn + 1
        };
      })
    });
  }, null, _sourceMap2.default.SourceMapConsumer.ORIGINAL_ORDER);

  return {
    file: map.file,
    sourceRoot: map.sourceRoot,
    sources: (0, _from2.default)(mappings.values())
  };
}

function findInsertionLocation(array, callback) {
  var left = 0;
  var right = array.length;
  while (left < right) {
    var mid = Math.floor((left + right) / 2);
    var item = array[mid];

    var result = callback(item);
    if (result === 0) {
      left = mid;
      break;
    }
    if (result >= 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  var i = left;
  if (i < array.length) {
    while (i > 0 && callback(array[i]) >= 0) {
      i--;
    }
    return i + 1;
  }

  return i;
}

function filterSortedArray(array, callback) {
  var start = findInsertionLocation(array, callback);

  var results = [];
  for (var i = start; i < array.length && callback(array[i]) === 0; i++) {
    results.push(array[i]);
  }

  return results;
}
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187532, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _plugin = require("../plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _sortBy = require("lodash/sortBy");

var _sortBy2 = _interopRequireDefault(_sortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _plugin2.default({

  name: "internal.blockHoist",

  visitor: {
    Block: {
      exit: function exit(_ref) {
        var node = _ref.node;

        var hasChange = false;
        for (var i = 0; i < node.body.length; i++) {
          var bodyNode = node.body[i];
          if (bodyNode && bodyNode._blockHoist != null) {
            hasChange = true;
            break;
          }
        }
        if (!hasChange) return;

        node.body = (0, _sortBy2.default)(node.body, function (bodyNode) {
          var priority = bodyNode && bodyNode._blockHoist;
          if (priority == null) priority = 1;
          if (priority === true) priority = 2;

          return -1 * priority;
        });
      }
    }
  }
});
module.exports = exports["default"];
}, function(modId) { var map = {"../plugin":1536577187514}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187533, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _plugin = require("../plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUPER_THIS_BOUND = (0, _symbol2.default)("super this bound");

var superVisitor = {
  CallExpression: function CallExpression(path) {
    if (!path.get("callee").isSuper()) return;

    var node = path.node;

    if (node[SUPER_THIS_BOUND]) return;
    node[SUPER_THIS_BOUND] = true;

    path.replaceWith(t.assignmentExpression("=", this.id, node));
  }
};

exports.default = new _plugin2.default({
  name: "internal.shadowFunctions",

  visitor: {
    ThisExpression: function ThisExpression(path) {
      remap(path, "this");
    },
    ReferencedIdentifier: function ReferencedIdentifier(path) {
      if (path.node.name === "arguments") {
        remap(path, "arguments");
      }
    }
  }
});


function shouldShadow(path, shadowPath) {
  if (path.is("_forceShadow")) {
    return true;
  } else {
    return shadowPath;
  }
}

function remap(path, key) {
  var shadowPath = path.inShadow(key);
  if (!shouldShadow(path, shadowPath)) return;

  var shadowFunction = path.node._shadowedFunctionLiteral;

  var currentFunction = void 0;
  var passedShadowFunction = false;

  var fnPath = path.find(function (innerPath) {
    if (innerPath.parentPath && innerPath.parentPath.isClassProperty() && innerPath.key === "value") {
      return true;
    }
    if (path === innerPath) return false;
    if (innerPath.isProgram() || innerPath.isFunction()) {
      currentFunction = currentFunction || innerPath;
    }

    if (innerPath.isProgram()) {
      passedShadowFunction = true;

      return true;
    } else if (innerPath.isFunction() && !innerPath.isArrowFunctionExpression()) {
      if (shadowFunction) {
        if (innerPath === shadowFunction || innerPath.node === shadowFunction.node) return true;
      } else {
        if (!innerPath.is("shadow")) return true;
      }

      passedShadowFunction = true;
      return false;
    }

    return false;
  });

  if (shadowFunction && fnPath.isProgram() && !shadowFunction.isProgram()) {
    fnPath = path.findParent(function (p) {
      return p.isProgram() || p.isFunction();
    });
  }

  if (fnPath === currentFunction) return;

  if (!passedShadowFunction) return;

  var cached = fnPath.getData(key);
  if (!cached) {
    var id = path.scope.generateUidIdentifier(key);

    fnPath.setData(key, id);
    cached = id;

    var classPath = fnPath.findParent(function (p) {
      return p.isClass();
    });
    var hasSuperClass = !!(classPath && classPath.node && classPath.node.superClass);

    if (key === "this" && fnPath.isMethod({ kind: "constructor" }) && hasSuperClass) {
      fnPath.scope.push({ id: id });

      fnPath.traverse(superVisitor, { id: id });
    } else {
      var init = key === "this" ? t.thisExpression() : t.identifier(key);

      if (shadowFunction) init._shadowedFunctionLiteral = shadowFunction;

      fnPath.scope.push({ id: id, init: init });
    }
  }

  var node = t.cloneDeep(cached);
  node.loc = path.node.loc;

  return path.replaceWith(node);
}
module.exports = exports["default"];
}, function(modId) { var map = {"../plugin":1536577187514}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187534, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (whitelist) {
  var outputType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "global";

  var namespace = t.identifier("babelHelpers");

  var builder = function builder(body) {
    return buildHelpers(body, namespace, whitelist);
  };

  var tree = void 0;

  var build = {
    global: buildGlobal,
    umd: buildUmd,
    var: buildVar
  }[outputType];

  if (build) {
    tree = build(namespace, builder);
  } else {
    throw new Error(messages.get("unsupportedOutputType", outputType));
  }

  return (0, _babelGenerator2.default)(tree).code;
};

var _babelHelpers = require("babel-helpers");

var helpers = _interopRequireWildcard(_babelHelpers);

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var buildUmdWrapper = (0, _babelTemplate2.default)("\n  (function (root, factory) {\n    if (typeof define === \"function\" && define.amd) {\n      define(AMD_ARGUMENTS, factory);\n    } else if (typeof exports === \"object\") {\n      factory(COMMON_ARGUMENTS);\n    } else {\n      factory(BROWSER_ARGUMENTS);\n    }\n  })(UMD_ROOT, function (FACTORY_PARAMETERS) {\n    FACTORY_BODY\n  });\n");

function buildGlobal(namespace, builder) {
  var body = [];
  var container = t.functionExpression(null, [t.identifier("global")], t.blockStatement(body));
  var tree = t.program([t.expressionStatement(t.callExpression(container, [helpers.get("selfGlobal")]))]);

  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.assignmentExpression("=", t.memberExpression(t.identifier("global"), namespace), t.objectExpression([])))]));

  builder(body);

  return tree;
}

function buildUmd(namespace, builder) {
  var body = [];
  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.identifier("global"))]));

  builder(body);

  return t.program([buildUmdWrapper({
    FACTORY_PARAMETERS: t.identifier("global"),
    BROWSER_ARGUMENTS: t.assignmentExpression("=", t.memberExpression(t.identifier("root"), namespace), t.objectExpression([])),
    COMMON_ARGUMENTS: t.identifier("exports"),
    AMD_ARGUMENTS: t.arrayExpression([t.stringLiteral("exports")]),
    FACTORY_BODY: body,
    UMD_ROOT: t.identifier("this")
  })]);
}

function buildVar(namespace, builder) {
  var body = [];
  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.objectExpression([]))]));
  builder(body);
  body.push(t.expressionStatement(namespace));
  return t.program(body);
}

function buildHelpers(body, namespace, whitelist) {
  helpers.list.forEach(function (name) {
    if (whitelist && whitelist.indexOf(name) < 0) return;

    var key = t.identifier(name);
    body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(namespace, key), helpers.get(name))));
  });
}
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187535, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _normalizeAst = require("../helpers/normalize-ast");

var _normalizeAst2 = _interopRequireDefault(_normalizeAst);

var _plugin = require("./plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _file = require("./file");

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pipeline = function () {
  function Pipeline() {
    (0, _classCallCheck3.default)(this, Pipeline);
  }

  Pipeline.prototype.lint = function lint(code) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    opts.code = false;
    opts.mode = "lint";
    return this.transform(code, opts);
  };

  Pipeline.prototype.pretransform = function pretransform(code, opts) {
    var file = new _file2.default(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file;
    });
  };

  Pipeline.prototype.transform = function transform(code, opts) {
    var file = new _file2.default(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file.transform();
    });
  };

  Pipeline.prototype.analyse = function analyse(code) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var visitor = arguments[2];

    opts.code = false;
    if (visitor) {
      opts.plugins = opts.plugins || [];
      opts.plugins.push(new _plugin2.default({ visitor: visitor }));
    }
    return this.transform(code, opts).metadata;
  };

  Pipeline.prototype.transformFromAst = function transformFromAst(ast, code, opts) {
    ast = (0, _normalizeAst2.default)(ast);

    var file = new _file2.default(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.addAst(ast);
      return file.transform();
    });
  };

  return Pipeline;
}();

exports.default = Pipeline;
module.exports = exports["default"];
}, function(modId) { var map = {"../helpers/normalize-ast":1536577187536,"./plugin":1536577187514,"./file":1536577187511}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187536, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (ast, comments, tokens) {
  if (ast) {
    if (ast.type === "Program") {
      return t.file(ast, comments || [], tokens || []);
    } else if (ast.type === "File") {
      return ast;
    }
  }

  throw new Error("Not a valid ast?");
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187509);
})()
//# sourceMappingURL=index.js.map