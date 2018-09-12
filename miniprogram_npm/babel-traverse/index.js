module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187637, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.visitors = exports.Hub = exports.Scope = exports.NodePath = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _path = require("./path");

Object.defineProperty(exports, "NodePath", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_path).default;
  }
});

var _scope = require("./scope");

Object.defineProperty(exports, "Scope", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scope).default;
  }
});

var _hub = require("./hub");

Object.defineProperty(exports, "Hub", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_hub).default;
  }
});
exports.default = traverse;

var _context = require("./context");

var _context2 = _interopRequireDefault(_context);

var _visitors = require("./visitors");

var visitors = _interopRequireWildcard(_visitors);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _cache = require("./cache");

var cache = _interopRequireWildcard(_cache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.visitors = visitors;
function traverse(parent, opts, scope, state, parentPath) {
  if (!parent) return;
  if (!opts) opts = {};

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error(messages.get("traverseNeedsParent", parent.type));
    }
  }

  visitors.explode(opts);

  traverse.node(parent, opts, scope, state, parentPath);
}

traverse.visitors = visitors;
traverse.verify = visitors.verify;
traverse.explode = visitors.explode;

traverse.NodePath = require("./path");
traverse.Scope = require("./scope");
traverse.Hub = require("./hub");

traverse.cheap = function (node, enter) {
  return t.traverseFast(node, enter);
};

traverse.node = function (node, opts, scope, state, parentPath, skipKeys) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new _context2.default(scope, opts, state, parentPath);
  for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var key = _ref;

    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
  }
};

traverse.clearNode = function (node, opts) {
  t.removeProperties(node, opts);

  cache.path.delete(node);
};

traverse.removeProperties = function (tree, opts) {
  t.traverseFast(tree, traverse.clearNode, opts);
  return tree;
};

function hasBlacklistedType(path, state) {
  if (path.node.type === state.type) {
    state.has = true;
    path.stop();
  }
}

traverse.hasType = function (tree, scope, type, blacklistTypes) {
  if ((0, _includes2.default)(blacklistTypes, tree.type)) return false;

  if (tree.type === type) return true;

  var state = {
    has: false,
    type: type
  };

  traverse(tree, {
    blacklist: blacklistTypes,
    enter: hasBlacklistedType
  }, scope, state);

  return state.has;
};

traverse.clearCache = function () {
  cache.clear();
};

traverse.clearCache.clearPath = cache.clearPath;
traverse.clearCache.clearScope = cache.clearScope;

traverse.copyCache = function (source, destination) {
  if (cache.path.has(source)) {
    cache.path.set(destination, cache.path.get(source));
  }
};
}, function(modId) {var map = {"./path":1536577187638,"./scope":1536577187640,"./hub":1536577187659,"./context":1536577187660,"./visitors":1536577187661,"./cache":1536577187643}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187638, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _virtualTypes = require("./lib/virtual-types");

var virtualTypes = _interopRequireWildcard(_virtualTypes);

var _debug2 = require("debug");

var _debug3 = _interopRequireDefault(_debug2);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _scope = require("../scope");

var _scope2 = _interopRequireDefault(_scope);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _cache = require("../cache");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _debug = (0, _debug3.default)("babel");

var NodePath = function () {
  function NodePath(hub, parent) {
    (0, _classCallCheck3.default)(this, NodePath);

    this.parent = parent;
    this.hub = hub;
    this.contexts = [];
    this.data = {};
    this.shouldSkip = false;
    this.shouldStop = false;
    this.removed = false;
    this.state = null;
    this.opts = null;
    this.skipKeys = null;
    this.parentPath = null;
    this.context = null;
    this.container = null;
    this.listKey = null;
    this.inList = false;
    this.parentKey = null;
    this.key = null;
    this.node = null;
    this.scope = null;
    this.type = null;
    this.typeAnnotation = null;
  }

  NodePath.get = function get(_ref) {
    var hub = _ref.hub,
        parentPath = _ref.parentPath,
        parent = _ref.parent,
        container = _ref.container,
        listKey = _ref.listKey,
        key = _ref.key;

    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    (0, _invariant2.default)(parent, "To get a node path the parent needs to exist");

    var targetNode = container[key];

    var paths = _cache.path.get(parent) || [];
    if (!_cache.path.has(parent)) {
      _cache.path.set(parent, paths);
    }

    var path = void 0;

    for (var i = 0; i < paths.length; i++) {
      var pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (!path) {
      path = new NodePath(hub, parent);
      paths.push(path);
    }

    path.setup(parentPath, container, listKey, key);

    return path;
  };

  NodePath.prototype.getScope = function getScope(scope) {
    var ourScope = scope;

    if (this.isScope()) {
      ourScope = new _scope2.default(this, scope);
    }

    return ourScope;
  };

  NodePath.prototype.setData = function setData(key, val) {
    return this.data[key] = val;
  };

  NodePath.prototype.getData = function getData(key, def) {
    var val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  };

  NodePath.prototype.buildCodeFrameError = function buildCodeFrameError(msg) {
    var Error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SyntaxError;

    return this.hub.file.buildCodeFrameError(this.node, msg, Error);
  };

  NodePath.prototype.traverse = function traverse(visitor, state) {
    (0, _index2.default)(this.node, visitor, this.scope, state, this);
  };

  NodePath.prototype.mark = function mark(type, message) {
    this.hub.file.metadata.marked.push({
      type: type,
      message: message,
      loc: this.node.loc
    });
  };

  NodePath.prototype.set = function set(key, node) {
    t.validate(this.node, key, node);
    this.node[key] = node;
  };

  NodePath.prototype.getPathLocation = function getPathLocation() {
    var parts = [];
    var path = this;
    do {
      var key = path.key;
      if (path.inList) key = path.listKey + "[" + key + "]";
      parts.unshift(key);
    } while (path = path.parentPath);
    return parts.join(".");
  };

  NodePath.prototype.debug = function debug(buildMessage) {
    if (!_debug.enabled) return;
    _debug(this.getPathLocation() + " " + this.type + ": " + buildMessage());
  };

  return NodePath;
}();

exports.default = NodePath;


(0, _assign2.default)(NodePath.prototype, require("./ancestry"));
(0, _assign2.default)(NodePath.prototype, require("./inference"));
(0, _assign2.default)(NodePath.prototype, require("./replacement"));
(0, _assign2.default)(NodePath.prototype, require("./evaluation"));
(0, _assign2.default)(NodePath.prototype, require("./conversion"));
(0, _assign2.default)(NodePath.prototype, require("./introspection"));
(0, _assign2.default)(NodePath.prototype, require("./context"));
(0, _assign2.default)(NodePath.prototype, require("./removal"));
(0, _assign2.default)(NodePath.prototype, require("./modification"));
(0, _assign2.default)(NodePath.prototype, require("./family"));
(0, _assign2.default)(NodePath.prototype, require("./comments"));

var _loop2 = function _loop2() {
  if (_isArray) {
    if (_i >= _iterator.length) return "break";
    _ref2 = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) return "break";
    _ref2 = _i.value;
  }

  var type = _ref2;

  var typeKey = "is" + type;
  NodePath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };

  NodePath.prototype["assert" + type] = function (opts) {
    if (!this[typeKey](opts)) {
      throw new TypeError("Expected node path of type " + type);
    }
  };
};

for (var _iterator = t.TYPES, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
  var _ref2;

  var _ret2 = _loop2();

  if (_ret2 === "break") break;
}

var _loop = function _loop(type) {
  if (type[0] === "_") return "continue";
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);

  var virtualType = virtualTypes[type];

  NodePath.prototype["is" + type] = function (opts) {
    return virtualType.checkPath(this, opts);
  };
};

for (var type in virtualTypes) {
  var _ret = _loop(type);

  if (_ret === "continue") continue;
}
module.exports = exports["default"];
}, function(modId) { var map = {"./lib/virtual-types":1536577187639,"../index":1536577187637,"../scope":1536577187640,"../cache":1536577187643,"./ancestry":1536577187644,"./inference":1536577187645,"./replacement":1536577187648,"./evaluation":1536577187649,"./conversion":1536577187650,"./introspection":1536577187651,"./context":1536577187652,"./removal":1536577187653,"./modification":1536577187655,"./family":1536577187657,"./comments":1536577187658}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187639, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.Flow = exports.Pure = exports.Generated = exports.User = exports.Var = exports.BlockScoped = exports.Referenced = exports.Scope = exports.Expression = exports.Statement = exports.BindingIdentifier = exports.ReferencedMemberExpression = exports.ReferencedIdentifier = undefined;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ReferencedIdentifier = exports.ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],
  checkPath: function checkPath(_ref, opts) {
    var node = _ref.node,
        parent = _ref.parent;

    if (!t.isIdentifier(node, opts) && !t.isJSXMemberExpression(parent, opts)) {
      if (t.isJSXIdentifier(node, opts)) {
        if (_babelTypes.react.isCompatTag(node.name)) return false;
      } else {
        return false;
      }
    }

    return t.isReferenced(node, parent);
  }
};

var ReferencedMemberExpression = exports.ReferencedMemberExpression = {
  types: ["MemberExpression"],
  checkPath: function checkPath(_ref2) {
    var node = _ref2.node,
        parent = _ref2.parent;

    return t.isMemberExpression(node) && t.isReferenced(node, parent);
  }
};

var BindingIdentifier = exports.BindingIdentifier = {
  types: ["Identifier"],
  checkPath: function checkPath(_ref3) {
    var node = _ref3.node,
        parent = _ref3.parent;

    return t.isIdentifier(node) && t.isBinding(node, parent);
  }
};

var Statement = exports.Statement = {
  types: ["Statement"],
  checkPath: function checkPath(_ref4) {
    var node = _ref4.node,
        parent = _ref4.parent;

    if (t.isStatement(node)) {
      if (t.isVariableDeclaration(node)) {
        if (t.isForXStatement(parent, { left: node })) return false;
        if (t.isForStatement(parent, { init: node })) return false;
      }

      return true;
    } else {
      return false;
    }
  }
};

var Expression = exports.Expression = {
  types: ["Expression"],
  checkPath: function checkPath(path) {
    if (path.isIdentifier()) {
      return path.isReferencedIdentifier();
    } else {
      return t.isExpression(path.node);
    }
  }
};

var Scope = exports.Scope = {
  types: ["Scopable"],
  checkPath: function checkPath(path) {
    return t.isScope(path.node, path.parent);
  }
};

var Referenced = exports.Referenced = {
  checkPath: function checkPath(path) {
    return t.isReferenced(path.node, path.parent);
  }
};

var BlockScoped = exports.BlockScoped = {
  checkPath: function checkPath(path) {
    return t.isBlockScoped(path.node);
  }
};

var Var = exports.Var = {
  types: ["VariableDeclaration"],
  checkPath: function checkPath(path) {
    return t.isVar(path.node);
  }
};

var User = exports.User = {
  checkPath: function checkPath(path) {
    return path.node && !!path.node.loc;
  }
};

var Generated = exports.Generated = {
  checkPath: function checkPath(path) {
    return !path.isUser();
  }
};

var Pure = exports.Pure = {
  checkPath: function checkPath(path, opts) {
    return path.scope.isPure(path.node, opts);
  }
};

var Flow = exports.Flow = {
  types: ["Flow", "ImportDeclaration", "ExportDeclaration", "ImportSpecifier"],
  checkPath: function checkPath(_ref5) {
    var node = _ref5.node;

    if (t.isFlow(node)) {
      return true;
    } else if (t.isImportDeclaration(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else if (t.isExportDeclaration(node)) {
      return node.exportKind === "type";
    } else if (t.isImportSpecifier(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else {
      return false;
    }
  }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187640, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _repeat = require("lodash/repeat");

var _repeat2 = _interopRequireDefault(_repeat);

var _renamer = require("./lib/renamer");

var _renamer2 = _interopRequireDefault(_renamer);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _defaults = require("lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _binding2 = require("./binding");

var _binding3 = _interopRequireDefault(_binding2);

var _globals = require("globals");

var _globals2 = _interopRequireDefault(_globals);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _cache = require("../cache");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crawlCallsCount = 0;

function getCache(path, parentScope, self) {
  var scopes = _cache.scope.get(path.node) || [];

  for (var _iterator = scopes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var scope = _ref;

    if (scope.parent === parentScope && scope.path === path) return scope;
  }

  scopes.push(self);

  if (!_cache.scope.has(path.node)) {
    _cache.scope.set(path.node, scopes);
  }
}

function gatherNodeParts(node, parts) {
  if (t.isModuleDeclaration(node)) {
    if (node.source) {
      gatherNodeParts(node.source, parts);
    } else if (node.specifiers && node.specifiers.length) {
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

        gatherNodeParts(specifier, parts);
      }
    } else if (node.declaration) {
      gatherNodeParts(node.declaration, parts);
    }
  } else if (t.isModuleSpecifier(node)) {
    gatherNodeParts(node.local, parts);
  } else if (t.isMemberExpression(node)) {
    gatherNodeParts(node.object, parts);
    gatherNodeParts(node.property, parts);
  } else if (t.isIdentifier(node)) {
    parts.push(node.name);
  } else if (t.isLiteral(node)) {
    parts.push(node.value);
  } else if (t.isCallExpression(node)) {
    gatherNodeParts(node.callee, parts);
  } else if (t.isObjectExpression(node) || t.isObjectPattern(node)) {
    for (var _iterator3 = node.properties, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var prop = _ref3;

      gatherNodeParts(prop.key || prop.argument, parts);
    }
  }
}

var collectorVisitor = {
  For: function For(path) {
    for (var _iterator4 = t.FOR_INIT_KEYS, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var key = _ref4;

      var declar = path.get(key);
      if (declar.isVar()) path.scope.getFunctionParent().registerBinding("var", declar);
    }
  },
  Declaration: function Declaration(path) {
    if (path.isBlockScoped()) return;

    if (path.isExportDeclaration() && path.get("declaration").isDeclaration()) return;

    path.scope.getFunctionParent().registerDeclaration(path);
  },
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    state.references.push(path);
  },
  ForXStatement: function ForXStatement(path, state) {
    var left = path.get("left");
    if (left.isPattern() || left.isIdentifier()) {
      state.constantViolations.push(left);
    }
  },


  ExportDeclaration: {
    exit: function exit(path) {
      var node = path.node,
          scope = path.scope;

      var declar = node.declaration;
      if (t.isClassDeclaration(declar) || t.isFunctionDeclaration(declar)) {
        var _id = declar.id;
        if (!_id) return;

        var binding = scope.getBinding(_id.name);
        if (binding) binding.reference(path);
      } else if (t.isVariableDeclaration(declar)) {
        for (var _iterator5 = declar.declarations, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
          var _ref5;

          if (_isArray5) {
            if (_i5 >= _iterator5.length) break;
            _ref5 = _iterator5[_i5++];
          } else {
            _i5 = _iterator5.next();
            if (_i5.done) break;
            _ref5 = _i5.value;
          }

          var decl = _ref5;

          var ids = t.getBindingIdentifiers(decl);
          for (var name in ids) {
            var _binding = scope.getBinding(name);
            if (_binding) _binding.reference(path);
          }
        }
      }
    }
  },

  LabeledStatement: function LabeledStatement(path) {
    path.scope.getProgramParent().addGlobal(path.node);
    path.scope.getBlockParent().registerDeclaration(path);
  },
  AssignmentExpression: function AssignmentExpression(path, state) {
    state.assignments.push(path);
  },
  UpdateExpression: function UpdateExpression(path, state) {
    state.constantViolations.push(path.get("argument"));
  },
  UnaryExpression: function UnaryExpression(path, state) {
    if (path.node.operator === "delete") {
      state.constantViolations.push(path.get("argument"));
    }
  },
  BlockScoped: function BlockScoped(path) {
    var scope = path.scope;
    if (scope.path === path) scope = scope.parent;
    scope.getBlockParent().registerDeclaration(path);
  },
  ClassDeclaration: function ClassDeclaration(path) {
    var id = path.node.id;
    if (!id) return;

    var name = id.name;
    path.scope.bindings[name] = path.scope.getBinding(name);
  },
  Block: function Block(path) {
    var paths = path.get("body");
    for (var _iterator6 = paths, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
      var _ref6;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref6 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref6 = _i6.value;
      }

      var bodyPath = _ref6;

      if (bodyPath.isFunctionDeclaration()) {
        path.scope.getBlockParent().registerDeclaration(bodyPath);
      }
    }
  }
};

var uid = 0;

var Scope = function () {
  function Scope(path, parentScope) {
    (0, _classCallCheck3.default)(this, Scope);

    if (parentScope && parentScope.block === path.node) {
      return parentScope;
    }

    var cached = getCache(path, parentScope, this);
    if (cached) return cached;

    this.uid = uid++;
    this.parent = parentScope;
    this.hub = path.hub;

    this.parentBlock = path.parent;
    this.block = path.node;
    this.path = path;

    this.labels = new _map2.default();
  }

  Scope.prototype.traverse = function traverse(node, opts, state) {
    (0, _index2.default)(node, opts, this, state, this.path);
  };

  Scope.prototype.generateDeclaredUidIdentifier = function generateDeclaredUidIdentifier() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "temp";

    var id = this.generateUidIdentifier(name);
    this.push({ id: id });
    return id;
  };

  Scope.prototype.generateUidIdentifier = function generateUidIdentifier() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "temp";

    return t.identifier(this.generateUid(name));
  };

  Scope.prototype.generateUid = function generateUid() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "temp";

    name = t.toIdentifier(name).replace(/^_+/, "").replace(/[0-9]+$/g, "");

    var uid = void 0;
    var i = 0;
    do {
      uid = this._generateUid(name, i);
      i++;
    } while (this.hasLabel(uid) || this.hasBinding(uid) || this.hasGlobal(uid) || this.hasReference(uid));

    var program = this.getProgramParent();
    program.references[uid] = true;
    program.uids[uid] = true;

    return uid;
  };

  Scope.prototype._generateUid = function _generateUid(name, i) {
    var id = name;
    if (i > 1) id += i;
    return "_" + id;
  };

  Scope.prototype.generateUidIdentifierBasedOnNode = function generateUidIdentifierBasedOnNode(parent, defaultName) {
    var node = parent;

    if (t.isAssignmentExpression(parent)) {
      node = parent.left;
    } else if (t.isVariableDeclarator(parent)) {
      node = parent.id;
    } else if (t.isObjectProperty(node) || t.isObjectMethod(node)) {
      node = node.key;
    }

    var parts = [];
    gatherNodeParts(node, parts);

    var id = parts.join("$");
    id = id.replace(/^_/, "") || defaultName || "ref";

    return this.generateUidIdentifier(id.slice(0, 20));
  };

  Scope.prototype.isStatic = function isStatic(node) {
    if (t.isThisExpression(node) || t.isSuper(node)) {
      return true;
    }

    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding) {
        return binding.constant;
      } else {
        return this.hasBinding(node.name);
      }
    }

    return false;
  };

  Scope.prototype.maybeGenerateMemoised = function maybeGenerateMemoised(node, dontPush) {
    if (this.isStatic(node)) {
      return null;
    } else {
      var _id2 = this.generateUidIdentifierBasedOnNode(node);
      if (!dontPush) this.push({ id: _id2 });
      return _id2;
    }
  };

  Scope.prototype.checkBlockScopedCollisions = function checkBlockScopedCollisions(local, kind, name, id) {
    if (kind === "param") return;

    if (kind === "hoisted" && local.kind === "let") return;

    var duplicate = kind === "let" || local.kind === "let" || local.kind === "const" || local.kind === "module" || local.kind === "param" && (kind === "let" || kind === "const");

    if (duplicate) {
      throw this.hub.file.buildCodeFrameError(id, messages.get("scopeDuplicateDeclaration", name), TypeError);
    }
  };

  Scope.prototype.rename = function rename(oldName, newName, block) {
    var binding = this.getBinding(oldName);
    if (binding) {
      newName = newName || this.generateUidIdentifier(oldName).name;
      return new _renamer2.default(binding, oldName, newName).rename(block);
    }
  };

  Scope.prototype._renameFromMap = function _renameFromMap(map, oldName, newName, value) {
    if (map[oldName]) {
      map[newName] = value;
      map[oldName] = null;
    }
  };

  Scope.prototype.dump = function dump() {
    var sep = (0, _repeat2.default)("-", 60);
    console.log(sep);
    var scope = this;
    do {
      console.log("#", scope.block.type);
      for (var name in scope.bindings) {
        var binding = scope.bindings[name];
        console.log(" -", name, {
          constant: binding.constant,
          references: binding.references,
          violations: binding.constantViolations.length,
          kind: binding.kind
        });
      }
    } while (scope = scope.parent);
    console.log(sep);
  };

  Scope.prototype.toArray = function toArray(node, i) {
    var file = this.hub.file;

    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding && binding.constant && binding.path.isGenericType("Array")) return node;
    }

    if (t.isArrayExpression(node)) {
      return node;
    }

    if (t.isIdentifier(node, { name: "arguments" })) {
      return t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier("Array"), t.identifier("prototype")), t.identifier("slice")), t.identifier("call")), [node]);
    }

    var helperName = "toArray";
    var args = [node];
    if (i === true) {
      helperName = "toConsumableArray";
    } else if (i) {
      args.push(t.numericLiteral(i));
      helperName = "slicedToArray";
    }
    return t.callExpression(file.addHelper(helperName), args);
  };

  Scope.prototype.hasLabel = function hasLabel(name) {
    return !!this.getLabel(name);
  };

  Scope.prototype.getLabel = function getLabel(name) {
    return this.labels.get(name);
  };

  Scope.prototype.registerLabel = function registerLabel(path) {
    this.labels.set(path.node.label.name, path);
  };

  Scope.prototype.registerDeclaration = function registerDeclaration(path) {
    if (path.isLabeledStatement()) {
      this.registerLabel(path);
    } else if (path.isFunctionDeclaration()) {
      this.registerBinding("hoisted", path.get("id"), path);
    } else if (path.isVariableDeclaration()) {
      var declarations = path.get("declarations");
      for (var _iterator7 = declarations, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
        var _ref7;

        if (_isArray7) {
          if (_i7 >= _iterator7.length) break;
          _ref7 = _iterator7[_i7++];
        } else {
          _i7 = _iterator7.next();
          if (_i7.done) break;
          _ref7 = _i7.value;
        }

        var declar = _ref7;

        this.registerBinding(path.node.kind, declar);
      }
    } else if (path.isClassDeclaration()) {
      this.registerBinding("let", path);
    } else if (path.isImportDeclaration()) {
      var specifiers = path.get("specifiers");
      for (var _iterator8 = specifiers, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);;) {
        var _ref8;

        if (_isArray8) {
          if (_i8 >= _iterator8.length) break;
          _ref8 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done) break;
          _ref8 = _i8.value;
        }

        var specifier = _ref8;

        this.registerBinding("module", specifier);
      }
    } else if (path.isExportDeclaration()) {
      var _declar = path.get("declaration");
      if (_declar.isClassDeclaration() || _declar.isFunctionDeclaration() || _declar.isVariableDeclaration()) {
        this.registerDeclaration(_declar);
      }
    } else {
      this.registerBinding("unknown", path);
    }
  };

  Scope.prototype.buildUndefinedNode = function buildUndefinedNode() {
    if (this.hasBinding("undefined")) {
      return t.unaryExpression("void", t.numericLiteral(0), true);
    } else {
      return t.identifier("undefined");
    }
  };

  Scope.prototype.registerConstantViolation = function registerConstantViolation(path) {
    var ids = path.getBindingIdentifiers();
    for (var name in ids) {
      var binding = this.getBinding(name);
      if (binding) binding.reassign(path);
    }
  };

  Scope.prototype.registerBinding = function registerBinding(kind, path) {
    var bindingPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : path;

    if (!kind) throw new ReferenceError("no `kind`");

    if (path.isVariableDeclaration()) {
      var declarators = path.get("declarations");
      for (var _iterator9 = declarators, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : (0, _getIterator3.default)(_iterator9);;) {
        var _ref9;

        if (_isArray9) {
          if (_i9 >= _iterator9.length) break;
          _ref9 = _iterator9[_i9++];
        } else {
          _i9 = _iterator9.next();
          if (_i9.done) break;
          _ref9 = _i9.value;
        }

        var declar = _ref9;

        this.registerBinding(kind, declar);
      }
      return;
    }

    var parent = this.getProgramParent();
    var ids = path.getBindingIdentifiers(true);

    for (var name in ids) {
      for (var _iterator10 = ids[name], _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : (0, _getIterator3.default)(_iterator10);;) {
        var _ref10;

        if (_isArray10) {
          if (_i10 >= _iterator10.length) break;
          _ref10 = _iterator10[_i10++];
        } else {
          _i10 = _iterator10.next();
          if (_i10.done) break;
          _ref10 = _i10.value;
        }

        var _id3 = _ref10;

        var local = this.getOwnBinding(name);
        if (local) {
          if (local.identifier === _id3) continue;

          this.checkBlockScopedCollisions(local, kind, name, _id3);
        }

        if (local && local.path.isFlow()) local = null;

        parent.references[name] = true;

        this.bindings[name] = new _binding3.default({
          identifier: _id3,
          existing: local,
          scope: this,
          path: bindingPath,
          kind: kind
        });
      }
    }
  };

  Scope.prototype.addGlobal = function addGlobal(node) {
    this.globals[node.name] = node;
  };

  Scope.prototype.hasUid = function hasUid(name) {
    var scope = this;

    do {
      if (scope.uids[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  Scope.prototype.hasGlobal = function hasGlobal(name) {
    var scope = this;

    do {
      if (scope.globals[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  Scope.prototype.hasReference = function hasReference(name) {
    var scope = this;

    do {
      if (scope.references[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  Scope.prototype.isPure = function isPure(node, constantsOnly) {
    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (!binding) return false;
      if (constantsOnly) return binding.constant;
      return true;
    } else if (t.isClass(node)) {
      if (node.superClass && !this.isPure(node.superClass, constantsOnly)) return false;
      return this.isPure(node.body, constantsOnly);
    } else if (t.isClassBody(node)) {
      for (var _iterator11 = node.body, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : (0, _getIterator3.default)(_iterator11);;) {
        var _ref11;

        if (_isArray11) {
          if (_i11 >= _iterator11.length) break;
          _ref11 = _iterator11[_i11++];
        } else {
          _i11 = _iterator11.next();
          if (_i11.done) break;
          _ref11 = _i11.value;
        }

        var method = _ref11;

        if (!this.isPure(method, constantsOnly)) return false;
      }
      return true;
    } else if (t.isBinary(node)) {
      return this.isPure(node.left, constantsOnly) && this.isPure(node.right, constantsOnly);
    } else if (t.isArrayExpression(node)) {
      for (var _iterator12 = node.elements, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : (0, _getIterator3.default)(_iterator12);;) {
        var _ref12;

        if (_isArray12) {
          if (_i12 >= _iterator12.length) break;
          _ref12 = _iterator12[_i12++];
        } else {
          _i12 = _iterator12.next();
          if (_i12.done) break;
          _ref12 = _i12.value;
        }

        var elem = _ref12;

        if (!this.isPure(elem, constantsOnly)) return false;
      }
      return true;
    } else if (t.isObjectExpression(node)) {
      for (var _iterator13 = node.properties, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : (0, _getIterator3.default)(_iterator13);;) {
        var _ref13;

        if (_isArray13) {
          if (_i13 >= _iterator13.length) break;
          _ref13 = _iterator13[_i13++];
        } else {
          _i13 = _iterator13.next();
          if (_i13.done) break;
          _ref13 = _i13.value;
        }

        var prop = _ref13;

        if (!this.isPure(prop, constantsOnly)) return false;
      }
      return true;
    } else if (t.isClassMethod(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly)) return false;
      if (node.kind === "get" || node.kind === "set") return false;
      return true;
    } else if (t.isClassProperty(node) || t.isObjectProperty(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly)) return false;
      return this.isPure(node.value, constantsOnly);
    } else if (t.isUnaryExpression(node)) {
      return this.isPure(node.argument, constantsOnly);
    } else {
      return t.isPureish(node);
    }
  };

  Scope.prototype.setData = function setData(key, val) {
    return this.data[key] = val;
  };

  Scope.prototype.getData = function getData(key) {
    var scope = this;
    do {
      var data = scope.data[key];
      if (data != null) return data;
    } while (scope = scope.parent);
  };

  Scope.prototype.removeData = function removeData(key) {
    var scope = this;
    do {
      var data = scope.data[key];
      if (data != null) scope.data[key] = null;
    } while (scope = scope.parent);
  };

  Scope.prototype.init = function init() {
    if (!this.references) this.crawl();
  };

  Scope.prototype.crawl = function crawl() {
    _crawlCallsCount++;
    this._crawl();
    _crawlCallsCount--;
  };

  Scope.prototype._crawl = function _crawl() {
    var path = this.path;

    this.references = (0, _create2.default)(null);
    this.bindings = (0, _create2.default)(null);
    this.globals = (0, _create2.default)(null);
    this.uids = (0, _create2.default)(null);
    this.data = (0, _create2.default)(null);

    if (path.isLoop()) {
      for (var _iterator14 = t.FOR_INIT_KEYS, _isArray14 = Array.isArray(_iterator14), _i14 = 0, _iterator14 = _isArray14 ? _iterator14 : (0, _getIterator3.default)(_iterator14);;) {
        var _ref14;

        if (_isArray14) {
          if (_i14 >= _iterator14.length) break;
          _ref14 = _iterator14[_i14++];
        } else {
          _i14 = _iterator14.next();
          if (_i14.done) break;
          _ref14 = _i14.value;
        }

        var key = _ref14;

        var node = path.get(key);
        if (node.isBlockScoped()) this.registerBinding(node.node.kind, node);
      }
    }

    if (path.isFunctionExpression() && path.has("id")) {
      if (!path.get("id").node[t.NOT_LOCAL_BINDING]) {
        this.registerBinding("local", path.get("id"), path);
      }
    }

    if (path.isClassExpression() && path.has("id")) {
      if (!path.get("id").node[t.NOT_LOCAL_BINDING]) {
        this.registerBinding("local", path);
      }
    }

    if (path.isFunction()) {
      var params = path.get("params");
      for (var _iterator15 = params, _isArray15 = Array.isArray(_iterator15), _i15 = 0, _iterator15 = _isArray15 ? _iterator15 : (0, _getIterator3.default)(_iterator15);;) {
        var _ref15;

        if (_isArray15) {
          if (_i15 >= _iterator15.length) break;
          _ref15 = _iterator15[_i15++];
        } else {
          _i15 = _iterator15.next();
          if (_i15.done) break;
          _ref15 = _i15.value;
        }

        var param = _ref15;

        this.registerBinding("param", param);
      }
    }

    if (path.isCatchClause()) {
      this.registerBinding("let", path);
    }

    var parent = this.getProgramParent();
    if (parent.crawling) return;

    var state = {
      references: [],
      constantViolations: [],
      assignments: []
    };

    this.crawling = true;
    path.traverse(collectorVisitor, state);
    this.crawling = false;

    for (var _iterator16 = state.assignments, _isArray16 = Array.isArray(_iterator16), _i16 = 0, _iterator16 = _isArray16 ? _iterator16 : (0, _getIterator3.default)(_iterator16);;) {
      var _ref16;

      if (_isArray16) {
        if (_i16 >= _iterator16.length) break;
        _ref16 = _iterator16[_i16++];
      } else {
        _i16 = _iterator16.next();
        if (_i16.done) break;
        _ref16 = _i16.value;
      }

      var _path = _ref16;

      var ids = _path.getBindingIdentifiers();
      var programParent = void 0;
      for (var name in ids) {
        if (_path.scope.getBinding(name)) continue;

        programParent = programParent || _path.scope.getProgramParent();
        programParent.addGlobal(ids[name]);
      }

      _path.scope.registerConstantViolation(_path);
    }

    for (var _iterator17 = state.references, _isArray17 = Array.isArray(_iterator17), _i17 = 0, _iterator17 = _isArray17 ? _iterator17 : (0, _getIterator3.default)(_iterator17);;) {
      var _ref17;

      if (_isArray17) {
        if (_i17 >= _iterator17.length) break;
        _ref17 = _iterator17[_i17++];
      } else {
        _i17 = _iterator17.next();
        if (_i17.done) break;
        _ref17 = _i17.value;
      }

      var ref = _ref17;

      var binding = ref.scope.getBinding(ref.node.name);
      if (binding) {
        binding.reference(ref);
      } else {
        ref.scope.getProgramParent().addGlobal(ref.node);
      }
    }

    for (var _iterator18 = state.constantViolations, _isArray18 = Array.isArray(_iterator18), _i18 = 0, _iterator18 = _isArray18 ? _iterator18 : (0, _getIterator3.default)(_iterator18);;) {
      var _ref18;

      if (_isArray18) {
        if (_i18 >= _iterator18.length) break;
        _ref18 = _iterator18[_i18++];
      } else {
        _i18 = _iterator18.next();
        if (_i18.done) break;
        _ref18 = _i18.value;
      }

      var _path2 = _ref18;

      _path2.scope.registerConstantViolation(_path2);
    }
  };

  Scope.prototype.push = function push(opts) {
    var path = this.path;

    if (!path.isBlockStatement() && !path.isProgram()) {
      path = this.getBlockParent().path;
    }

    if (path.isSwitchStatement()) {
      path = this.getFunctionParent().path;
    }

    if (path.isLoop() || path.isCatchClause() || path.isFunction()) {
      t.ensureBlock(path.node);
      path = path.get("body");
    }

    var unique = opts.unique;
    var kind = opts.kind || "var";
    var blockHoist = opts._blockHoist == null ? 2 : opts._blockHoist;

    var dataKey = "declaration:" + kind + ":" + blockHoist;
    var declarPath = !unique && path.getData(dataKey);

    if (!declarPath) {
      var declar = t.variableDeclaration(kind, []);
      declar._generated = true;
      declar._blockHoist = blockHoist;

      var _path$unshiftContaine = path.unshiftContainer("body", [declar]);

      declarPath = _path$unshiftContaine[0];

      if (!unique) path.setData(dataKey, declarPath);
    }

    var declarator = t.variableDeclarator(opts.id, opts.init);
    declarPath.node.declarations.push(declarator);
    this.registerBinding(kind, declarPath.get("declarations").pop());
  };

  Scope.prototype.getProgramParent = function getProgramParent() {
    var scope = this;
    do {
      if (scope.path.isProgram()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  };

  Scope.prototype.getFunctionParent = function getFunctionParent() {
    var scope = this;
    do {
      if (scope.path.isFunctionParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  };

  Scope.prototype.getBlockParent = function getBlockParent() {
    var scope = this;
    do {
      if (scope.path.isBlockParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
  };

  Scope.prototype.getAllBindings = function getAllBindings() {
    var ids = (0, _create2.default)(null);

    var scope = this;
    do {
      (0, _defaults2.default)(ids, scope.bindings);
      scope = scope.parent;
    } while (scope);

    return ids;
  };

  Scope.prototype.getAllBindingsOfKind = function getAllBindingsOfKind() {
    var ids = (0, _create2.default)(null);

    for (var _iterator19 = arguments, _isArray19 = Array.isArray(_iterator19), _i19 = 0, _iterator19 = _isArray19 ? _iterator19 : (0, _getIterator3.default)(_iterator19);;) {
      var _ref19;

      if (_isArray19) {
        if (_i19 >= _iterator19.length) break;
        _ref19 = _iterator19[_i19++];
      } else {
        _i19 = _iterator19.next();
        if (_i19.done) break;
        _ref19 = _i19.value;
      }

      var kind = _ref19;

      var scope = this;
      do {
        for (var name in scope.bindings) {
          var binding = scope.bindings[name];
          if (binding.kind === kind) ids[name] = binding;
        }
        scope = scope.parent;
      } while (scope);
    }

    return ids;
  };

  Scope.prototype.bindingIdentifierEquals = function bindingIdentifierEquals(name, node) {
    return this.getBindingIdentifier(name) === node;
  };

  Scope.prototype.warnOnFlowBinding = function warnOnFlowBinding(binding) {
    if (_crawlCallsCount === 0 && binding && binding.path.isFlow()) {
      console.warn("\n        You or one of the Babel plugins you are using are using Flow declarations as bindings.\n        Support for this will be removed in version 7. To find out the caller, grep for this\n        message and change it to a `console.trace()`.\n      ");
    }
    return binding;
  };

  Scope.prototype.getBinding = function getBinding(name) {
    var scope = this;

    do {
      var binding = scope.getOwnBinding(name);
      if (binding) return this.warnOnFlowBinding(binding);
    } while (scope = scope.parent);
  };

  Scope.prototype.getOwnBinding = function getOwnBinding(name) {
    return this.warnOnFlowBinding(this.bindings[name]);
  };

  Scope.prototype.getBindingIdentifier = function getBindingIdentifier(name) {
    var info = this.getBinding(name);
    return info && info.identifier;
  };

  Scope.prototype.getOwnBindingIdentifier = function getOwnBindingIdentifier(name) {
    var binding = this.bindings[name];
    return binding && binding.identifier;
  };

  Scope.prototype.hasOwnBinding = function hasOwnBinding(name) {
    return !!this.getOwnBinding(name);
  };

  Scope.prototype.hasBinding = function hasBinding(name, noGlobals) {
    if (!name) return false;
    if (this.hasOwnBinding(name)) return true;
    if (this.parentHasBinding(name, noGlobals)) return true;
    if (this.hasUid(name)) return true;
    if (!noGlobals && (0, _includes2.default)(Scope.globals, name)) return true;
    if (!noGlobals && (0, _includes2.default)(Scope.contextVariables, name)) return true;
    return false;
  };

  Scope.prototype.parentHasBinding = function parentHasBinding(name, noGlobals) {
    return this.parent && this.parent.hasBinding(name, noGlobals);
  };

  Scope.prototype.moveBindingTo = function moveBindingTo(name, scope) {
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
      info.scope = scope;
      scope.bindings[name] = info;
    }
  };

  Scope.prototype.removeOwnBinding = function removeOwnBinding(name) {
    delete this.bindings[name];
  };

  Scope.prototype.removeBinding = function removeBinding(name) {
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
    }

    var scope = this;
    do {
      if (scope.uids[name]) {
        scope.uids[name] = false;
      }
    } while (scope = scope.parent);
  };

  return Scope;
}();

Scope.globals = (0, _keys2.default)(_globals2.default.builtin);
Scope.contextVariables = ["arguments", "undefined", "Infinity", "NaN"];
exports.default = Scope;
module.exports = exports["default"];
}, function(modId) { var map = {"./lib/renamer":1536577187641,"../index":1536577187637,"./binding":1536577187642,"../cache":1536577187643}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187641, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _binding = require("../binding");

var _binding2 = _interopRequireDefault(_binding);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renameVisitor = {
  ReferencedIdentifier: function ReferencedIdentifier(_ref, state) {
    var node = _ref.node;

    if (node.name === state.oldName) {
      node.name = state.newName;
    }
  },
  Scope: function Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.oldName, state.binding.identifier)) {
      path.skip();
    }
  },
  "AssignmentExpression|Declaration": function AssignmentExpressionDeclaration(path, state) {
    var ids = path.getOuterBindingIdentifiers();

    for (var name in ids) {
      if (name === state.oldName) ids[name].name = state.newName;
    }
  }
};

var Renamer = function () {
  function Renamer(binding, oldName, newName) {
    (0, _classCallCheck3.default)(this, Renamer);

    this.newName = newName;
    this.oldName = oldName;
    this.binding = binding;
  }

  Renamer.prototype.maybeConvertFromExportDeclaration = function maybeConvertFromExportDeclaration(parentDeclar) {
    var exportDeclar = parentDeclar.parentPath.isExportDeclaration() && parentDeclar.parentPath;
    if (!exportDeclar) return;

    var isDefault = exportDeclar.isExportDefaultDeclaration();

    if (isDefault && (parentDeclar.isFunctionDeclaration() || parentDeclar.isClassDeclaration()) && !parentDeclar.node.id) {
      parentDeclar.node.id = parentDeclar.scope.generateUidIdentifier("default");
    }

    var bindingIdentifiers = parentDeclar.getOuterBindingIdentifiers();
    var specifiers = [];

    for (var name in bindingIdentifiers) {
      var localName = name === this.oldName ? this.newName : name;
      var exportedName = isDefault ? "default" : name;
      specifiers.push(t.exportSpecifier(t.identifier(localName), t.identifier(exportedName)));
    }

    if (specifiers.length) {
      var aliasDeclar = t.exportNamedDeclaration(null, specifiers);

      if (parentDeclar.isFunctionDeclaration()) {
        aliasDeclar._blockHoist = 3;
      }

      exportDeclar.insertAfter(aliasDeclar);
      exportDeclar.replaceWith(parentDeclar.node);
    }
  };

  Renamer.prototype.rename = function rename(block) {
    var binding = this.binding,
        oldName = this.oldName,
        newName = this.newName;
    var scope = binding.scope,
        path = binding.path;


    var parentDeclar = path.find(function (path) {
      return path.isDeclaration() || path.isFunctionExpression();
    });
    if (parentDeclar) {
      this.maybeConvertFromExportDeclaration(parentDeclar);
    }

    scope.traverse(block || scope.block, renameVisitor, this);

    if (!block) {
      scope.removeOwnBinding(oldName);
      scope.bindings[newName] = binding;
      this.binding.identifier.name = newName;
    }

    if (binding.type === "hoisted") {}
  };

  return Renamer;
}();

exports.default = Renamer;
module.exports = exports["default"];
}, function(modId) { var map = {"../binding":1536577187642}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187642, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Binding = function () {
  function Binding(_ref) {
    var existing = _ref.existing,
        identifier = _ref.identifier,
        scope = _ref.scope,
        path = _ref.path,
        kind = _ref.kind;
    (0, _classCallCheck3.default)(this, Binding);

    this.identifier = identifier;
    this.scope = scope;
    this.path = path;
    this.kind = kind;

    this.constantViolations = [];
    this.constant = true;

    this.referencePaths = [];
    this.referenced = false;
    this.references = 0;

    this.clearValue();

    if (existing) {
      this.constantViolations = [].concat(existing.path, existing.constantViolations, this.constantViolations);
    }
  }

  Binding.prototype.deoptValue = function deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  };

  Binding.prototype.setValue = function setValue(value) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value = value;
  };

  Binding.prototype.clearValue = function clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue = false;
    this.value = null;
  };

  Binding.prototype.reassign = function reassign(path) {
    this.constant = false;
    if (this.constantViolations.indexOf(path) !== -1) {
      return;
    }
    this.constantViolations.push(path);
  };

  Binding.prototype.reference = function reference(path) {
    if (this.referencePaths.indexOf(path) !== -1) {
      return;
    }
    this.referenced = true;
    this.references++;
    this.referencePaths.push(path);
  };

  Binding.prototype.dereference = function dereference() {
    this.references--;
    this.referenced = !!this.references;
  };

  return Binding;
}();

exports.default = Binding;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187643, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.scope = exports.path = undefined;

var _weakMap = require("babel-runtime/core-js/weak-map");

var _weakMap2 = _interopRequireDefault(_weakMap);

exports.clear = clear;
exports.clearPath = clearPath;
exports.clearScope = clearScope;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = exports.path = new _weakMap2.default();
var scope = exports.scope = new _weakMap2.default();

function clear() {
  clearPath();
  clearScope();
}

function clearPath() {
  exports.path = path = new _weakMap2.default();
}

function clearScope() {
  exports.scope = scope = new _weakMap2.default();
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187644, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.findParent = findParent;
exports.find = find;
exports.getFunctionParent = getFunctionParent;
exports.getStatementParent = getStatementParent;
exports.getEarliestCommonAncestorFrom = getEarliestCommonAncestorFrom;
exports.getDeepestCommonAncestorFrom = getDeepestCommonAncestorFrom;
exports.getAncestry = getAncestry;
exports.isAncestor = isAncestor;
exports.isDescendant = isDescendant;
exports.inType = inType;
exports.inShadow = inShadow;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findParent(callback) {
  var path = this;
  while (path = path.parentPath) {
    if (callback(path)) return path;
  }
  return null;
}

function find(callback) {
  var path = this;
  do {
    if (callback(path)) return path;
  } while (path = path.parentPath);
  return null;
}

function getFunctionParent() {
  return this.findParent(function (path) {
    return path.isFunction() || path.isProgram();
  });
}

function getStatementParent() {
  var path = this;
  do {
    if (Array.isArray(path.container)) {
      return path;
    }
  } while (path = path.parentPath);
}

function getEarliestCommonAncestorFrom(paths) {
  return this.getDeepestCommonAncestorFrom(paths, function (deepest, i, ancestries) {
    var earliest = void 0;
    var keys = t.VISITOR_KEYS[deepest.type];

    for (var _iterator = ancestries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var ancestry = _ref;

      var path = ancestry[i + 1];

      if (!earliest) {
        earliest = path;
        continue;
      }

      if (path.listKey && earliest.listKey === path.listKey) {
        if (path.key < earliest.key) {
          earliest = path;
          continue;
        }
      }

      var earliestKeyIndex = keys.indexOf(earliest.parentKey);
      var currentKeyIndex = keys.indexOf(path.parentKey);
      if (earliestKeyIndex > currentKeyIndex) {
        earliest = path;
      }
    }

    return earliest;
  });
}

function getDeepestCommonAncestorFrom(paths, filter) {
  var _this = this;

  if (!paths.length) {
    return this;
  }

  if (paths.length === 1) {
    return paths[0];
  }

  var minDepth = Infinity;

  var lastCommonIndex = void 0,
      lastCommon = void 0;

  var ancestries = paths.map(function (path) {
    var ancestry = [];

    do {
      ancestry.unshift(path);
    } while ((path = path.parentPath) && path !== _this);

    if (ancestry.length < minDepth) {
      minDepth = ancestry.length;
    }

    return ancestry;
  });

  var first = ancestries[0];

  depthLoop: for (var i = 0; i < minDepth; i++) {
    var shouldMatch = first[i];

    for (var _iterator2 = ancestries, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var ancestry = _ref2;

      if (ancestry[i] !== shouldMatch) {
        break depthLoop;
      }
    }

    lastCommonIndex = i;
    lastCommon = shouldMatch;
  }

  if (lastCommon) {
    if (filter) {
      return filter(lastCommon, lastCommonIndex, ancestries);
    } else {
      return lastCommon;
    }
  } else {
    throw new Error("Couldn't find intersection");
  }
}

function getAncestry() {
  var path = this;
  var paths = [];
  do {
    paths.push(path);
  } while (path = path.parentPath);
  return paths;
}

function isAncestor(maybeDescendant) {
  return maybeDescendant.isDescendant(this);
}

function isDescendant(maybeAncestor) {
  return !!this.findParent(function (parent) {
    return parent === maybeAncestor;
  });
}

function inType() {
  var path = this;
  while (path) {
    for (var _iterator3 = arguments, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var type = _ref3;

      if (path.node.type === type) return true;
    }
    path = path.parentPath;
  }

  return false;
}

function inShadow(key) {
  var parentFn = this.isFunction() ? this : this.findParent(function (p) {
    return p.isFunction();
  });
  if (!parentFn) return;

  if (parentFn.isFunctionExpression() || parentFn.isFunctionDeclaration()) {
    var shadow = parentFn.node.shadow;

    if (shadow && (!key || shadow[key] !== false)) {
      return parentFn;
    }
  } else if (parentFn.isArrowFunctionExpression()) {
    return parentFn;
  }

  return null;
}
}, function(modId) { var map = {"./index":1536577187638}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187645, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.getTypeAnnotation = getTypeAnnotation;
exports._getTypeAnnotation = _getTypeAnnotation;
exports.isBaseType = isBaseType;
exports.couldBeBaseType = couldBeBaseType;
exports.baseTypeStrictlyMatches = baseTypeStrictlyMatches;
exports.isGenericType = isGenericType;

var _inferers = require("./inferers");

var inferers = _interopRequireWildcard(_inferers);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTypeAnnotation() {
  if (this.typeAnnotation) return this.typeAnnotation;

  var type = this._getTypeAnnotation() || t.anyTypeAnnotation();
  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  return this.typeAnnotation = type;
}

function _getTypeAnnotation() {
  var node = this.node;

  if (!node) {
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      var declar = this.parentPath.parentPath;
      var declarParent = declar.parentPath;

      if (declar.key === "left" && declarParent.isForInStatement()) {
        return t.stringTypeAnnotation();
      }

      if (declar.key === "left" && declarParent.isForOfStatement()) {
        return t.anyTypeAnnotation();
      }

      return t.voidTypeAnnotation();
    } else {
      return;
    }
  }

  if (node.typeAnnotation) {
    return node.typeAnnotation;
  }

  var inferer = inferers[node.type];
  if (inferer) {
    return inferer.call(this, node);
  }

  inferer = inferers[this.parentPath.type];
  if (inferer && inferer.validParent) {
    return this.parentPath.getTypeAnnotation();
  }
}

function isBaseType(baseName, soft) {
  return _isBaseType(baseName, this.getTypeAnnotation(), soft);
}

function _isBaseType(baseName, type, soft) {
  if (baseName === "string") {
    return t.isStringTypeAnnotation(type);
  } else if (baseName === "number") {
    return t.isNumberTypeAnnotation(type);
  } else if (baseName === "boolean") {
    return t.isBooleanTypeAnnotation(type);
  } else if (baseName === "any") {
    return t.isAnyTypeAnnotation(type);
  } else if (baseName === "mixed") {
    return t.isMixedTypeAnnotation(type);
  } else if (baseName === "empty") {
    return t.isEmptyTypeAnnotation(type);
  } else if (baseName === "void") {
    return t.isVoidTypeAnnotation(type);
  } else {
    if (soft) {
      return false;
    } else {
      throw new Error("Unknown base type " + baseName);
    }
  }
}

function couldBeBaseType(name) {
  var type = this.getTypeAnnotation();
  if (t.isAnyTypeAnnotation(type)) return true;

  if (t.isUnionTypeAnnotation(type)) {
    for (var _iterator = type.types, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var type2 = _ref;

      if (t.isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
        return true;
      }
    }
    return false;
  } else {
    return _isBaseType(name, type, true);
  }
}

function baseTypeStrictlyMatches(right) {
  var left = this.getTypeAnnotation();
  right = right.getTypeAnnotation();

  if (!t.isAnyTypeAnnotation(left) && t.isFlowBaseAnnotation(left)) {
    return right.type === left.type;
  }
}

function isGenericType(genericName) {
  var type = this.getTypeAnnotation();
  return t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName });
}
}, function(modId) { var map = {"./inferers":1536577187646}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187646, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.ClassDeclaration = exports.ClassExpression = exports.FunctionDeclaration = exports.ArrowFunctionExpression = exports.FunctionExpression = exports.Identifier = undefined;

var _infererReference = require("./inferer-reference");

Object.defineProperty(exports, "Identifier", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_infererReference).default;
  }
});
exports.VariableDeclarator = VariableDeclarator;
exports.TypeCastExpression = TypeCastExpression;
exports.NewExpression = NewExpression;
exports.TemplateLiteral = TemplateLiteral;
exports.UnaryExpression = UnaryExpression;
exports.BinaryExpression = BinaryExpression;
exports.LogicalExpression = LogicalExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.SequenceExpression = SequenceExpression;
exports.AssignmentExpression = AssignmentExpression;
exports.UpdateExpression = UpdateExpression;
exports.StringLiteral = StringLiteral;
exports.NumericLiteral = NumericLiteral;
exports.BooleanLiteral = BooleanLiteral;
exports.NullLiteral = NullLiteral;
exports.RegExpLiteral = RegExpLiteral;
exports.ObjectExpression = ObjectExpression;
exports.ArrayExpression = ArrayExpression;
exports.RestElement = RestElement;
exports.CallExpression = CallExpression;
exports.TaggedTemplateExpression = TaggedTemplateExpression;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VariableDeclarator() {
  var id = this.get("id");

  if (id.isIdentifier()) {
    return this.get("init").getTypeAnnotation();
  } else {
    return;
  }
}

function TypeCastExpression(node) {
  return node.typeAnnotation;
}

TypeCastExpression.validParent = true;

function NewExpression(node) {
  if (this.get("callee").isIdentifier()) {
    return t.genericTypeAnnotation(node.callee);
  }
}

function TemplateLiteral() {
  return t.stringTypeAnnotation();
}

function UnaryExpression(node) {
  var operator = node.operator;

  if (operator === "void") {
    return t.voidTypeAnnotation();
  } else if (t.NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.numberTypeAnnotation();
  } else if (t.STRING_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.stringTypeAnnotation();
  } else if (t.BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.booleanTypeAnnotation();
  }
}

function BinaryExpression(node) {
  var operator = node.operator;

  if (t.NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t.numberTypeAnnotation();
  } else if (t.BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t.booleanTypeAnnotation();
  } else if (operator === "+") {
    var right = this.get("right");
    var left = this.get("left");

    if (left.isBaseType("number") && right.isBaseType("number")) {
      return t.numberTypeAnnotation();
    } else if (left.isBaseType("string") || right.isBaseType("string")) {
      return t.stringTypeAnnotation();
    }

    return t.unionTypeAnnotation([t.stringTypeAnnotation(), t.numberTypeAnnotation()]);
  }
}

function LogicalExpression() {
  return t.createUnionTypeAnnotation([this.get("left").getTypeAnnotation(), this.get("right").getTypeAnnotation()]);
}

function ConditionalExpression() {
  return t.createUnionTypeAnnotation([this.get("consequent").getTypeAnnotation(), this.get("alternate").getTypeAnnotation()]);
}

function SequenceExpression() {
  return this.get("expressions").pop().getTypeAnnotation();
}

function AssignmentExpression() {
  return this.get("right").getTypeAnnotation();
}

function UpdateExpression(node) {
  var operator = node.operator;
  if (operator === "++" || operator === "--") {
    return t.numberTypeAnnotation();
  }
}

function StringLiteral() {
  return t.stringTypeAnnotation();
}

function NumericLiteral() {
  return t.numberTypeAnnotation();
}

function BooleanLiteral() {
  return t.booleanTypeAnnotation();
}

function NullLiteral() {
  return t.nullLiteralTypeAnnotation();
}

function RegExpLiteral() {
  return t.genericTypeAnnotation(t.identifier("RegExp"));
}

function ObjectExpression() {
  return t.genericTypeAnnotation(t.identifier("Object"));
}

function ArrayExpression() {
  return t.genericTypeAnnotation(t.identifier("Array"));
}

function RestElement() {
  return ArrayExpression();
}

RestElement.validParent = true;

function Func() {
  return t.genericTypeAnnotation(t.identifier("Function"));
}

exports.FunctionExpression = Func;
exports.ArrowFunctionExpression = Func;
exports.FunctionDeclaration = Func;
exports.ClassExpression = Func;
exports.ClassDeclaration = Func;
function CallExpression() {
  return resolveCall(this.get("callee"));
}

function TaggedTemplateExpression() {
  return resolveCall(this.get("tag"));
}

function resolveCall(callee) {
  callee = callee.resolve();

  if (callee.isFunction()) {
    if (callee.is("async")) {
      if (callee.is("generator")) {
        return t.genericTypeAnnotation(t.identifier("AsyncIterator"));
      } else {
        return t.genericTypeAnnotation(t.identifier("Promise"));
      }
    } else {
      if (callee.node.returnType) {
        return callee.node.returnType;
      } else {}
    }
  }
}
}, function(modId) { var map = {"./inferer-reference":1536577187647}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187647, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (node) {
  if (!this.isReferenced()) return;

  var binding = this.scope.getBinding(node.name);
  if (binding) {
    if (binding.identifier.typeAnnotation) {
      return binding.identifier.typeAnnotation;
    } else {
      return getTypeAnnotationBindingConstantViolations(this, node.name);
    }
  }

  if (node.name === "undefined") {
    return t.voidTypeAnnotation();
  } else if (node.name === "NaN" || node.name === "Infinity") {
    return t.numberTypeAnnotation();
  } else if (node.name === "arguments") {}
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTypeAnnotationBindingConstantViolations(path, name) {
  var binding = path.scope.getBinding(name);

  var types = [];
  path.typeAnnotation = t.unionTypeAnnotation(types);

  var functionConstantViolations = [];
  var constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);

  var testType = getConditionalAnnotation(path, name);
  if (testType) {
    var testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);

    constantViolations = constantViolations.filter(function (path) {
      return testConstantViolations.indexOf(path) < 0;
    });

    types.push(testType.typeAnnotation);
  }

  if (constantViolations.length) {
    constantViolations = constantViolations.concat(functionConstantViolations);

    for (var _iterator = constantViolations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var violation = _ref;

      types.push(violation.getTypeAnnotation());
    }
  }

  if (types.length) {
    return t.createUnionTypeAnnotation(types);
  }
}

function getConstantViolationsBefore(binding, path, functions) {
  var violations = binding.constantViolations.slice();
  violations.unshift(binding.path);
  return violations.filter(function (violation) {
    violation = violation.resolve();
    var status = violation._guessExecutionStatusRelativeTo(path);
    if (functions && status === "function") functions.push(violation);
    return status === "before";
  });
}

function inferAnnotationFromBinaryExpression(name, path) {
  var operator = path.node.operator;

  var right = path.get("right").resolve();
  var left = path.get("left").resolve();

  var target = void 0;
  if (left.isIdentifier({ name: name })) {
    target = right;
  } else if (right.isIdentifier({ name: name })) {
    target = left;
  }
  if (target) {
    if (operator === "===") {
      return target.getTypeAnnotation();
    } else if (t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.numberTypeAnnotation();
    } else {
      return;
    }
  } else {
    if (operator !== "===") return;
  }

  var typeofPath = void 0;
  var typePath = void 0;
  if (left.isUnaryExpression({ operator: "typeof" })) {
    typeofPath = left;
    typePath = right;
  } else if (right.isUnaryExpression({ operator: "typeof" })) {
    typeofPath = right;
    typePath = left;
  }
  if (!typePath && !typeofPath) return;

  typePath = typePath.resolve();
  if (!typePath.isLiteral()) return;

  var typeValue = typePath.node.value;
  if (typeof typeValue !== "string") return;

  if (!typeofPath.get("argument").isIdentifier({ name: name })) return;

  return t.createTypeAnnotationBasedOnTypeof(typePath.node.value);
}

function getParentConditionalPath(path) {
  var parentPath = void 0;
  while (parentPath = path.parentPath) {
    if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
      if (path.key === "test") {
        return;
      } else {
        return parentPath;
      }
    } else {
      path = parentPath;
    }
  }
}

function getConditionalAnnotation(path, name) {
  var ifStatement = getParentConditionalPath(path);
  if (!ifStatement) return;

  var test = ifStatement.get("test");
  var paths = [test];
  var types = [];

  do {
    var _path = paths.shift().resolve();

    if (_path.isLogicalExpression()) {
      paths.push(_path.get("left"));
      paths.push(_path.get("right"));
    }

    if (_path.isBinaryExpression()) {
      var type = inferAnnotationFromBinaryExpression(name, _path);
      if (type) types.push(type);
    }
  } while (paths.length);

  if (types.length) {
    return {
      typeAnnotation: t.createUnionTypeAnnotation(types),
      ifStatement: ifStatement
    };
  } else {
    return getConditionalAnnotation(ifStatement, name);
  }
}
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187648, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.replaceWithMultiple = replaceWithMultiple;
exports.replaceWithSourceString = replaceWithSourceString;
exports.replaceWith = replaceWith;
exports._replaceWith = _replaceWith;
exports.replaceExpressionWithStatements = replaceExpressionWithStatements;
exports.replaceInline = replaceInline;

var _babelCodeFrame = require("babel-code-frame");

var _babelCodeFrame2 = _interopRequireDefault(_babelCodeFrame);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./index");

var _index4 = _interopRequireDefault(_index3);

var _babylon = require("babylon");

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hoistVariablesVisitor = {
  Function: function Function(path) {
    path.skip();
  },
  VariableDeclaration: function VariableDeclaration(path) {
    if (path.node.kind !== "var") return;

    var bindings = path.getBindingIdentifiers();
    for (var key in bindings) {
      path.scope.push({ id: bindings[key] });
    }

    var exprs = [];

    for (var _iterator = path.node.declarations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var declar = _ref;

      if (declar.init) {
        exprs.push(t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init)));
      }
    }

    path.replaceWithMultiple(exprs);
  }
};

function replaceWithMultiple(nodes) {
  this.resync();

  nodes = this._verifyNodeList(nodes);
  t.inheritLeadingComments(nodes[0], this.node);
  t.inheritTrailingComments(nodes[nodes.length - 1], this.node);
  this.node = this.container[this.key] = null;
  this.insertAfter(nodes);

  if (this.node) {
    this.requeue();
  } else {
    this.remove();
  }
}

function replaceWithSourceString(replacement) {
  this.resync();

  try {
    replacement = "(" + replacement + ")";
    replacement = (0, _babylon.parse)(replacement);
  } catch (err) {
    var loc = err.loc;
    if (loc) {
      err.message += " - make sure this is an expression.";
      err.message += "\n" + (0, _babelCodeFrame2.default)(replacement, loc.line, loc.column + 1);
    }
    throw err;
  }

  replacement = replacement.program.body[0].expression;
  _index2.default.removeProperties(replacement);
  return this.replaceWith(replacement);
}

function replaceWith(replacement) {
  this.resync();

  if (this.removed) {
    throw new Error("You can't replace this node, we've already removed it");
  }

  if (replacement instanceof _index4.default) {
    replacement = replacement.node;
  }

  if (!replacement) {
    throw new Error("You passed `path.replaceWith()` a falsy node, use `path.remove()` instead");
  }

  if (this.node === replacement) {
    return;
  }

  if (this.isProgram() && !t.isProgram(replacement)) {
    throw new Error("You can only replace a Program root node with another Program node");
  }

  if (Array.isArray(replacement)) {
    throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
  }

  if (typeof replacement === "string") {
    throw new Error("Don't use `path.replaceWith()` with a source string, use `path.replaceWithSourceString()`");
  }

  if (this.isNodeType("Statement") && t.isExpression(replacement)) {
    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement) && !this.parentPath.isExportDefaultDeclaration()) {
      replacement = t.expressionStatement(replacement);
    }
  }

  if (this.isNodeType("Expression") && t.isStatement(replacement)) {
    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement)) {
      return this.replaceExpressionWithStatements([replacement]);
    }
  }

  var oldNode = this.node;
  if (oldNode) {
    t.inheritsComments(replacement, oldNode);
    t.removeComments(oldNode);
  }

  this._replaceWith(replacement);
  this.type = replacement.type;

  this.setScope();

  this.requeue();
}

function _replaceWith(node) {
  if (!this.container) {
    throw new ReferenceError("Container is falsy");
  }

  if (this.inList) {
    t.validate(this.parent, this.key, [node]);
  } else {
    t.validate(this.parent, this.key, node);
  }

  this.debug(function () {
    return "Replace with " + (node && node.type);
  });

  this.node = this.container[this.key] = node;
}

function replaceExpressionWithStatements(nodes) {
  this.resync();

  var toSequenceExpression = t.toSequenceExpression(nodes, this.scope);

  if (t.isSequenceExpression(toSequenceExpression)) {
    var exprs = toSequenceExpression.expressions;

    if (exprs.length >= 2 && this.parentPath.isExpressionStatement()) {
      this._maybePopFromStatements(exprs);
    }

    if (exprs.length === 1) {
      this.replaceWith(exprs[0]);
    } else {
      this.replaceWith(toSequenceExpression);
    }
  } else if (toSequenceExpression) {
    this.replaceWith(toSequenceExpression);
  } else {
    var container = t.functionExpression(null, [], t.blockStatement(nodes));
    container.shadow = true;

    this.replaceWith(t.callExpression(container, []));
    this.traverse(hoistVariablesVisitor);

    var completionRecords = this.get("callee").getCompletionRecords();
    for (var _iterator2 = completionRecords, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var path = _ref2;

      if (!path.isExpressionStatement()) continue;

      var loop = path.findParent(function (path) {
        return path.isLoop();
      });
      if (loop) {
        var uid = loop.getData("expressionReplacementReturnUid");

        if (!uid) {
          var callee = this.get("callee");
          uid = callee.scope.generateDeclaredUidIdentifier("ret");
          callee.get("body").pushContainer("body", t.returnStatement(uid));
          loop.setData("expressionReplacementReturnUid", uid);
        } else {
          uid = t.identifier(uid.name);
        }

        path.get("expression").replaceWith(t.assignmentExpression("=", uid, path.node.expression));
      } else {
        path.replaceWith(t.returnStatement(path.node.expression));
      }
    }

    return this.node;
  }
}

function replaceInline(nodes) {
  this.resync();

  if (Array.isArray(nodes)) {
    if (Array.isArray(this.container)) {
      nodes = this._verifyNodeList(nodes);
      this._containerInsertAfter(nodes);
      return this.remove();
    } else {
      return this.replaceWithMultiple(nodes);
    }
  } else {
    return this.replaceWith(nodes);
  }
}
}, function(modId) { var map = {"../index":1536577187637,"./index":1536577187638}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187649, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

exports.evaluateTruthy = evaluateTruthy;
exports.evaluate = evaluate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALID_CALLEES = ["String", "Number", "Math"];
var INVALID_METHODS = ["random"];

function evaluateTruthy() {
  var res = this.evaluate();
  if (res.confident) return !!res.value;
}

function evaluate() {
  var confident = true;
  var deoptPath = void 0;
  var seen = new _map2.default();

  function deopt(path) {
    if (!confident) return;
    deoptPath = path;
    confident = false;
  }

  var value = evaluate(this);
  if (!confident) value = undefined;
  return {
    confident: confident,
    deopt: deoptPath,
    value: value
  };

  function evaluate(path) {
    var node = path.node;


    if (seen.has(node)) {
      var existing = seen.get(node);
      if (existing.resolved) {
        return existing.value;
      } else {
        deopt(path);
        return;
      }
    } else {
      var item = { resolved: false };
      seen.set(node, item);

      var val = _evaluate(path);
      if (confident) {
        item.resolved = true;
        item.value = val;
      }
      return val;
    }
  }

  function _evaluate(path) {
    if (!confident) return;

    var node = path.node;


    if (path.isSequenceExpression()) {
      var exprs = path.get("expressions");
      return evaluate(exprs[exprs.length - 1]);
    }

    if (path.isStringLiteral() || path.isNumericLiteral() || path.isBooleanLiteral()) {
      return node.value;
    }

    if (path.isNullLiteral()) {
      return null;
    }

    if (path.isTemplateLiteral()) {
      var str = "";

      var i = 0;
      var _exprs = path.get("expressions");

      for (var _iterator = node.quasis, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var elem = _ref;

        if (!confident) break;

        str += elem.value.cooked;

        var expr = _exprs[i++];
        if (expr) str += String(evaluate(expr));
      }

      if (!confident) return;
      return str;
    }

    if (path.isConditionalExpression()) {
      var testResult = evaluate(path.get("test"));
      if (!confident) return;
      if (testResult) {
        return evaluate(path.get("consequent"));
      } else {
        return evaluate(path.get("alternate"));
      }
    }

    if (path.isExpressionWrapper()) {
      return evaluate(path.get("expression"));
    }

    if (path.isMemberExpression() && !path.parentPath.isCallExpression({ callee: node })) {
      var property = path.get("property");
      var object = path.get("object");

      if (object.isLiteral() && property.isIdentifier()) {
        var _value = object.node.value;
        var type = typeof _value === "undefined" ? "undefined" : (0, _typeof3.default)(_value);
        if (type === "number" || type === "string") {
          return _value[property.node.name];
        }
      }
    }

    if (path.isReferencedIdentifier()) {
      var binding = path.scope.getBinding(node.name);

      if (binding && binding.constantViolations.length > 0) {
        return deopt(binding.path);
      }

      if (binding && path.node.start < binding.path.node.end) {
        return deopt(binding.path);
      }

      if (binding && binding.hasValue) {
        return binding.value;
      } else {
        if (node.name === "undefined") {
          return binding ? deopt(binding.path) : undefined;
        } else if (node.name === "Infinity") {
          return binding ? deopt(binding.path) : Infinity;
        } else if (node.name === "NaN") {
          return binding ? deopt(binding.path) : NaN;
        }

        var resolved = path.resolve();
        if (resolved === path) {
          return deopt(path);
        } else {
          return evaluate(resolved);
        }
      }
    }

    if (path.isUnaryExpression({ prefix: true })) {
      if (node.operator === "void") {
        return undefined;
      }

      var argument = path.get("argument");
      if (node.operator === "typeof" && (argument.isFunction() || argument.isClass())) {
        return "function";
      }

      var arg = evaluate(argument);
      if (!confident) return;
      switch (node.operator) {
        case "!":
          return !arg;
        case "+":
          return +arg;
        case "-":
          return -arg;
        case "~":
          return ~arg;
        case "typeof":
          return typeof arg === "undefined" ? "undefined" : (0, _typeof3.default)(arg);
      }
    }

    if (path.isArrayExpression()) {
      var arr = [];
      var elems = path.get("elements");
      for (var _iterator2 = elems, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var _elem = _ref2;

        _elem = _elem.evaluate();

        if (_elem.confident) {
          arr.push(_elem.value);
        } else {
          return deopt(_elem);
        }
      }
      return arr;
    }

    if (path.isObjectExpression()) {
      var obj = {};
      var props = path.get("properties");
      for (var _iterator3 = props, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var prop = _ref3;

        if (prop.isObjectMethod() || prop.isSpreadProperty()) {
          return deopt(prop);
        }
        var keyPath = prop.get("key");
        var key = keyPath;
        if (prop.node.computed) {
          key = key.evaluate();
          if (!key.confident) {
            return deopt(keyPath);
          }
          key = key.value;
        } else if (key.isIdentifier()) {
          key = key.node.name;
        } else {
          key = key.node.value;
        }
        var valuePath = prop.get("value");
        var _value2 = valuePath.evaluate();
        if (!_value2.confident) {
          return deopt(valuePath);
        }
        _value2 = _value2.value;
        obj[key] = _value2;
      }
      return obj;
    }

    if (path.isLogicalExpression()) {
      var wasConfident = confident;
      var left = evaluate(path.get("left"));
      var leftConfident = confident;
      confident = wasConfident;
      var right = evaluate(path.get("right"));
      var rightConfident = confident;
      confident = leftConfident && rightConfident;

      switch (node.operator) {
        case "||":
          if (left && leftConfident) {
            confident = true;
            return left;
          }

          if (!confident) return;

          return left || right;
        case "&&":
          if (!left && leftConfident || !right && rightConfident) {
            confident = true;
          }

          if (!confident) return;

          return left && right;
      }
    }

    if (path.isBinaryExpression()) {
      var _left = evaluate(path.get("left"));
      if (!confident) return;
      var _right = evaluate(path.get("right"));
      if (!confident) return;

      switch (node.operator) {
        case "-":
          return _left - _right;
        case "+":
          return _left + _right;
        case "/":
          return _left / _right;
        case "*":
          return _left * _right;
        case "%":
          return _left % _right;
        case "**":
          return Math.pow(_left, _right);
        case "<":
          return _left < _right;
        case ">":
          return _left > _right;
        case "<=":
          return _left <= _right;
        case ">=":
          return _left >= _right;
        case "==":
          return _left == _right;
        case "!=":
          return _left != _right;
        case "===":
          return _left === _right;
        case "!==":
          return _left !== _right;
        case "|":
          return _left | _right;
        case "&":
          return _left & _right;
        case "^":
          return _left ^ _right;
        case "<<":
          return _left << _right;
        case ">>":
          return _left >> _right;
        case ">>>":
          return _left >>> _right;
      }
    }

    if (path.isCallExpression()) {
      var callee = path.get("callee");
      var context = void 0;
      var func = void 0;

      if (callee.isIdentifier() && !path.scope.getBinding(callee.node.name, true) && VALID_CALLEES.indexOf(callee.node.name) >= 0) {
        func = global[node.callee.name];
      }

      if (callee.isMemberExpression()) {
        var _object = callee.get("object");
        var _property = callee.get("property");

        if (_object.isIdentifier() && _property.isIdentifier() && VALID_CALLEES.indexOf(_object.node.name) >= 0 && INVALID_METHODS.indexOf(_property.node.name) < 0) {
          context = global[_object.node.name];
          func = context[_property.node.name];
        }

        if (_object.isLiteral() && _property.isIdentifier()) {
          var _type = (0, _typeof3.default)(_object.node.value);
          if (_type === "string" || _type === "number") {
            context = _object.node.value;
            func = context[_property.node.name];
          }
        }
      }

      if (func) {
        var args = path.get("arguments").map(evaluate);
        if (!confident) return;

        return func.apply(context, args);
      }
    }

    deopt(path);
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187650, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.toComputedKey = toComputedKey;
exports.ensureBlock = ensureBlock;
exports.arrowFunctionToShadowed = arrowFunctionToShadowed;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function toComputedKey() {
  var node = this.node;

  var key = void 0;
  if (this.isMemberExpression()) {
    key = node.property;
  } else if (this.isProperty() || this.isMethod()) {
    key = node.key;
  } else {
    throw new ReferenceError("todo");
  }

  if (!node.computed) {
    if (t.isIdentifier(key)) key = t.stringLiteral(key.name);
  }

  return key;
}

function ensureBlock() {
  return t.ensureBlock(this.node);
}

function arrowFunctionToShadowed() {
  if (!this.isArrowFunctionExpression()) return;

  this.ensureBlock();

  var node = this.node;

  node.expression = false;
  node.type = "FunctionExpression";
  node.shadow = node.shadow || true;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187651, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.is = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.matchesPattern = matchesPattern;
exports.has = has;
exports.isStatic = isStatic;
exports.isnt = isnt;
exports.equals = equals;
exports.isNodeType = isNodeType;
exports.canHaveVariableDeclarationOrExpression = canHaveVariableDeclarationOrExpression;
exports.canSwapBetweenExpressionAndStatement = canSwapBetweenExpressionAndStatement;
exports.isCompletionRecord = isCompletionRecord;
exports.isStatementOrBlock = isStatementOrBlock;
exports.referencesImport = referencesImport;
exports.getSource = getSource;
exports.willIMaybeExecuteBefore = willIMaybeExecuteBefore;
exports._guessExecutionStatusRelativeTo = _guessExecutionStatusRelativeTo;
exports._guessExecutionStatusRelativeToDifferentFunctions = _guessExecutionStatusRelativeToDifferentFunctions;
exports.resolve = resolve;
exports._resolve = _resolve;

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matchesPattern(pattern, allowPartial) {
  if (!this.isMemberExpression()) return false;

  var parts = pattern.split(".");
  var search = [this.node];
  var i = 0;

  function matches(name) {
    var part = parts[i];
    return part === "*" || name === part;
  }

  while (search.length) {
    var node = search.shift();

    if (allowPartial && i === parts.length) {
      return true;
    }

    if (t.isIdentifier(node)) {
      if (!matches(node.name)) return false;
    } else if (t.isLiteral(node)) {
      if (!matches(node.value)) return false;
    } else if (t.isMemberExpression(node)) {
      if (node.computed && !t.isLiteral(node.property)) {
        return false;
      } else {
        search.unshift(node.property);
        search.unshift(node.object);
        continue;
      }
    } else if (t.isThisExpression(node)) {
      if (!matches("this")) return false;
    } else {
      return false;
    }

    if (++i > parts.length) {
      return false;
    }
  }

  return i === parts.length;
}

function has(key) {
  var val = this.node && this.node[key];
  if (val && Array.isArray(val)) {
    return !!val.length;
  } else {
    return !!val;
  }
}

function isStatic() {
  return this.scope.isStatic(this.node);
}

var is = exports.is = has;

function isnt(key) {
  return !this.has(key);
}

function equals(key, value) {
  return this.node[key] === value;
}

function isNodeType(type) {
  return t.isType(this.type, type);
}

function canHaveVariableDeclarationOrExpression() {
  return (this.key === "init" || this.key === "left") && this.parentPath.isFor();
}

function canSwapBetweenExpressionAndStatement(replacement) {
  if (this.key !== "body" || !this.parentPath.isArrowFunctionExpression()) {
    return false;
  }

  if (this.isExpression()) {
    return t.isBlockStatement(replacement);
  } else if (this.isBlockStatement()) {
    return t.isExpression(replacement);
  }

  return false;
}

function isCompletionRecord(allowInsideFunction) {
  var path = this;
  var first = true;

  do {
    var container = path.container;

    if (path.isFunction() && !first) {
      return !!allowInsideFunction;
    }

    first = false;

    if (Array.isArray(container) && path.key !== container.length - 1) {
      return false;
    }
  } while ((path = path.parentPath) && !path.isProgram());

  return true;
}

function isStatementOrBlock() {
  if (this.parentPath.isLabeledStatement() || t.isBlockStatement(this.container)) {
    return false;
  } else {
    return (0, _includes2.default)(t.STATEMENT_OR_BLOCK_KEYS, this.key);
  }
}

function referencesImport(moduleSource, importName) {
  if (!this.isReferencedIdentifier()) return false;

  var binding = this.scope.getBinding(this.node.name);
  if (!binding || binding.kind !== "module") return false;

  var path = binding.path;
  var parent = path.parentPath;
  if (!parent.isImportDeclaration()) return false;

  if (parent.node.source.value === moduleSource) {
    if (!importName) return true;
  } else {
    return false;
  }

  if (path.isImportDefaultSpecifier() && importName === "default") {
    return true;
  }

  if (path.isImportNamespaceSpecifier() && importName === "*") {
    return true;
  }

  if (path.isImportSpecifier() && path.node.imported.name === importName) {
    return true;
  }

  return false;
}

function getSource() {
  var node = this.node;
  if (node.end) {
    return this.hub.file.code.slice(node.start, node.end);
  } else {
    return "";
  }
}

function willIMaybeExecuteBefore(target) {
  return this._guessExecutionStatusRelativeTo(target) !== "after";
}

function _guessExecutionStatusRelativeTo(target) {
  var targetFuncParent = target.scope.getFunctionParent();
  var selfFuncParent = this.scope.getFunctionParent();

  if (targetFuncParent.node !== selfFuncParent.node) {
    var status = this._guessExecutionStatusRelativeToDifferentFunctions(targetFuncParent);
    if (status) {
      return status;
    } else {
      target = targetFuncParent.path;
    }
  }

  var targetPaths = target.getAncestry();
  if (targetPaths.indexOf(this) >= 0) return "after";

  var selfPaths = this.getAncestry();

  var commonPath = void 0;
  var targetIndex = void 0;
  var selfIndex = void 0;
  for (selfIndex = 0; selfIndex < selfPaths.length; selfIndex++) {
    var selfPath = selfPaths[selfIndex];
    targetIndex = targetPaths.indexOf(selfPath);
    if (targetIndex >= 0) {
      commonPath = selfPath;
      break;
    }
  }
  if (!commonPath) {
    return "before";
  }

  var targetRelationship = targetPaths[targetIndex - 1];
  var selfRelationship = selfPaths[selfIndex - 1];
  if (!targetRelationship || !selfRelationship) {
    return "before";
  }

  if (targetRelationship.listKey && targetRelationship.container === selfRelationship.container) {
    return targetRelationship.key > selfRelationship.key ? "before" : "after";
  }

  var targetKeyPosition = t.VISITOR_KEYS[targetRelationship.type].indexOf(targetRelationship.key);
  var selfKeyPosition = t.VISITOR_KEYS[selfRelationship.type].indexOf(selfRelationship.key);
  return targetKeyPosition > selfKeyPosition ? "before" : "after";
}

function _guessExecutionStatusRelativeToDifferentFunctions(targetFuncParent) {
  var targetFuncPath = targetFuncParent.path;
  if (!targetFuncPath.isFunctionDeclaration()) return;

  var binding = targetFuncPath.scope.getBinding(targetFuncPath.node.id.name);

  if (!binding.references) return "before";

  var referencePaths = binding.referencePaths;

  for (var _iterator = referencePaths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var path = _ref;

    if (path.key !== "callee" || !path.parentPath.isCallExpression()) {
      return;
    }
  }

  var allStatus = void 0;

  for (var _iterator2 = referencePaths, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var _path = _ref2;

    var childOfFunction = !!_path.find(function (path) {
      return path.node === targetFuncPath.node;
    });
    if (childOfFunction) continue;

    var status = this._guessExecutionStatusRelativeTo(_path);

    if (allStatus) {
      if (allStatus !== status) return;
    } else {
      allStatus = status;
    }
  }

  return allStatus;
}

function resolve(dangerous, resolved) {
  return this._resolve(dangerous, resolved) || this;
}

function _resolve(dangerous, resolved) {
  if (resolved && resolved.indexOf(this) >= 0) return;

  resolved = resolved || [];
  resolved.push(this);

  if (this.isVariableDeclarator()) {
    if (this.get("id").isIdentifier()) {
      return this.get("init").resolve(dangerous, resolved);
    } else {}
  } else if (this.isReferencedIdentifier()) {
    var binding = this.scope.getBinding(this.node.name);
    if (!binding) return;

    if (!binding.constant) return;

    if (binding.kind === "module") return;

    if (binding.path !== this) {
      var ret = binding.path.resolve(dangerous, resolved);

      if (this.find(function (parent) {
        return parent.node === ret.node;
      })) return;
      return ret;
    }
  } else if (this.isTypeCastExpression()) {
    return this.get("expression").resolve(dangerous, resolved);
  } else if (dangerous && this.isMemberExpression()) {

    var targetKey = this.toComputedKey();
    if (!t.isLiteral(targetKey)) return;

    var targetName = targetKey.value;

    var target = this.get("object").resolve(dangerous, resolved);

    if (target.isObjectExpression()) {
      var props = target.get("properties");
      for (var _iterator3 = props, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var prop = _ref3;

        if (!prop.isProperty()) continue;

        var key = prop.get("key");

        var match = prop.isnt("computed") && key.isIdentifier({ name: targetName });

        match = match || key.isLiteral({ value: targetName });

        if (match) return prop.get("value").resolve(dangerous, resolved);
      }
    } else if (target.isArrayExpression() && !isNaN(+targetName)) {
      var elems = target.get("elements");
      var elem = elems[targetName];
      if (elem) return elem.resolve(dangerous, resolved);
    }
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187652, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.call = call;
exports._call = _call;
exports.isBlacklisted = isBlacklisted;
exports.visit = visit;
exports.skip = skip;
exports.skipKey = skipKey;
exports.stop = stop;
exports.setScope = setScope;
exports.setContext = setContext;
exports.resync = resync;
exports._resyncParent = _resyncParent;
exports._resyncKey = _resyncKey;
exports._resyncList = _resyncList;
exports._resyncRemoved = _resyncRemoved;
exports.popContext = popContext;
exports.pushContext = pushContext;
exports.setup = setup;
exports.setKey = setKey;
exports.requeue = requeue;
exports._getQueueContexts = _getQueueContexts;

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function call(key) {
  var opts = this.opts;

  this.debug(function () {
    return key;
  });

  if (this.node) {
    if (this._call(opts[key])) return true;
  }

  if (this.node) {
    return this._call(opts[this.node.type] && opts[this.node.type][key]);
  }

  return false;
}

function _call(fns) {
  if (!fns) return false;

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

    if (!fn) continue;

    var node = this.node;
    if (!node) return true;

    var ret = fn.call(this.state, this, this.state);
    if (ret) throw new Error("Unexpected return value from visitor method " + fn);

    if (this.node !== node) return true;

    if (this.shouldStop || this.shouldSkip || this.removed) return true;
  }

  return false;
}

function isBlacklisted() {
  var blacklist = this.opts.blacklist;
  return blacklist && blacklist.indexOf(this.node.type) > -1;
}

function visit() {
  if (!this.node) {
    return false;
  }

  if (this.isBlacklisted()) {
    return false;
  }

  if (this.opts.shouldSkip && this.opts.shouldSkip(this)) {
    return false;
  }

  if (this.call("enter") || this.shouldSkip) {
    this.debug(function () {
      return "Skip...";
    });
    return this.shouldStop;
  }

  this.debug(function () {
    return "Recursing into...";
  });
  _index2.default.node(this.node, this.opts, this.scope, this.state, this, this.skipKeys);

  this.call("exit");

  return this.shouldStop;
}

function skip() {
  this.shouldSkip = true;
}

function skipKey(key) {
  this.skipKeys[key] = true;
}

function stop() {
  this.shouldStop = true;
  this.shouldSkip = true;
}

function setScope() {
  if (this.opts && this.opts.noScope) return;

  var target = this.context && this.context.scope;

  if (!target) {
    var path = this.parentPath;
    while (path && !target) {
      if (path.opts && path.opts.noScope) return;

      target = path.scope;
      path = path.parentPath;
    }
  }

  this.scope = this.getScope(target);
  if (this.scope) this.scope.init();
}

function setContext(context) {
  this.shouldSkip = false;
  this.shouldStop = false;
  this.removed = false;
  this.skipKeys = {};

  if (context) {
    this.context = context;
    this.state = context.state;
    this.opts = context.opts;
  }

  this.setScope();

  return this;
}

function resync() {
  if (this.removed) return;

  this._resyncParent();
  this._resyncList();
  this._resyncKey();
}

function _resyncParent() {
  if (this.parentPath) {
    this.parent = this.parentPath.node;
  }
}

function _resyncKey() {
  if (!this.container) return;

  if (this.node === this.container[this.key]) return;

  if (Array.isArray(this.container)) {
    for (var i = 0; i < this.container.length; i++) {
      if (this.container[i] === this.node) {
        return this.setKey(i);
      }
    }
  } else {
    for (var key in this.container) {
      if (this.container[key] === this.node) {
        return this.setKey(key);
      }
    }
  }

  this.key = null;
}

function _resyncList() {
  if (!this.parent || !this.inList) return;

  var newContainer = this.parent[this.listKey];
  if (this.container === newContainer) return;

  this.container = newContainer || null;
}

function _resyncRemoved() {
  if (this.key == null || !this.container || this.container[this.key] !== this.node) {
    this._markRemoved();
  }
}

function popContext() {
  this.contexts.pop();
  this.setContext(this.contexts[this.contexts.length - 1]);
}

function pushContext(context) {
  this.contexts.push(context);
  this.setContext(context);
}

function setup(parentPath, container, listKey, key) {
  this.inList = !!listKey;
  this.listKey = listKey;
  this.parentKey = listKey || key;
  this.container = container;

  this.parentPath = parentPath || this.parentPath;
  this.setKey(key);
}

function setKey(key) {
  this.key = key;
  this.node = this.container[this.key];
  this.type = this.node && this.node.type;
}

function requeue() {
  var pathToQueue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;

  if (pathToQueue.removed) return;

  var contexts = this.contexts;

  for (var _iterator2 = contexts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var context = _ref2;

    context.maybeQueue(pathToQueue);
  }
}

function _getQueueContexts() {
  var path = this;
  var contexts = this.contexts;
  while (!contexts.length) {
    path = path.parentPath;
    contexts = path.contexts;
  }
  return contexts;
}
}, function(modId) { var map = {"../index":1536577187637}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187653, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.remove = remove;
exports._callRemovalHooks = _callRemovalHooks;
exports._remove = _remove;
exports._markRemoved = _markRemoved;
exports._assertUnremoved = _assertUnremoved;

var _removalHooks = require("./lib/removal-hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function remove() {
  this._assertUnremoved();

  this.resync();

  if (this._callRemovalHooks()) {
    this._markRemoved();
    return;
  }

  this.shareCommentsWithSiblings();
  this._remove();
  this._markRemoved();
}

function _callRemovalHooks() {
  for (var _iterator = _removalHooks.hooks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    if (fn(this, this.parentPath)) return true;
  }
}

function _remove() {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key, 1);
    this.updateSiblingKeys(this.key, -1);
  } else {
    this._replaceWith(null);
  }
}

function _markRemoved() {
  this.shouldSkip = true;
  this.removed = true;
  this.node = null;
}

function _assertUnremoved() {
  if (this.removed) {
    throw this.buildCodeFrameError("NodePath has been removed so is read-only.");
  }
}
}, function(modId) { var map = {"./lib/removal-hooks":1536577187654}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187654, function(require, module, exports) {
"use strict";

exports.__esModule = true;
var hooks = exports.hooks = [function (self, parent) {
  var removeParent = self.key === "test" && (parent.isWhile() || parent.isSwitchCase()) || self.key === "declaration" && parent.isExportDeclaration() || self.key === "body" && parent.isLabeledStatement() || self.listKey === "declarations" && parent.isVariableDeclaration() && parent.node.declarations.length === 1 || self.key === "expression" && parent.isExpressionStatement();

  if (removeParent) {
    parent.remove();
    return true;
  }
}, function (self, parent) {
  if (parent.isSequenceExpression() && parent.node.expressions.length === 1) {
    parent.replaceWith(parent.node.expressions[0]);
    return true;
  }
}, function (self, parent) {
  if (parent.isBinary()) {
    if (self.key === "left") {
      parent.replaceWith(parent.node.right);
    } else {
      parent.replaceWith(parent.node.left);
    }
    return true;
  }
}, function (self, parent) {
  if (parent.isIfStatement() && (self.key === "consequent" || self.key === "alternate") || self.key === "body" && (parent.isLoop() || parent.isArrowFunctionExpression())) {
    self.replaceWith({
      type: "BlockStatement",
      body: []
    });
    return true;
  }
}];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187655, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.insertBefore = insertBefore;
exports._containerInsert = _containerInsert;
exports._containerInsertBefore = _containerInsertBefore;
exports._containerInsertAfter = _containerInsertAfter;
exports._maybePopFromStatements = _maybePopFromStatements;
exports.insertAfter = insertAfter;
exports.updateSiblingKeys = updateSiblingKeys;
exports._verifyNodeList = _verifyNodeList;
exports.unshiftContainer = unshiftContainer;
exports.pushContainer = pushContainer;
exports.hoist = hoist;

var _cache = require("../cache");

var _hoister = require("./lib/hoister");

var _hoister2 = _interopRequireDefault(_hoister);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertBefore(nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
    return this.parentPath.insertBefore(nodes);
  } else if (this.isNodeType("Expression") || this.parentPath.isForStatement() && this.key === "init") {
    if (this.node) nodes.push(this.node);
    this.replaceExpressionWithStatements(nodes);
  } else {
    this._maybePopFromStatements(nodes);
    if (Array.isArray(this.container)) {
      return this._containerInsertBefore(nodes);
    } else if (this.isStatementOrBlock()) {
      if (this.node) nodes.push(this.node);
      this._replaceWith(t.blockStatement(nodes));
    } else {
      throw new Error("We don't know what to do with this node type. " + "We were previously a Statement but we can't fit in here?");
    }
  }

  return [this];
}

function _containerInsert(from, nodes) {
  this.updateSiblingKeys(from, nodes.length);

  var paths = [];

  for (var i = 0; i < nodes.length; i++) {
    var to = from + i;
    var node = nodes[i];
    this.container.splice(to, 0, node);

    if (this.context) {
      var path = this.context.create(this.parent, this.container, to, this.listKey);

      if (this.context.queue) path.pushContext(this.context);
      paths.push(path);
    } else {
      paths.push(_index2.default.get({
        parentPath: this.parentPath,
        parent: this.parent,
        container: this.container,
        listKey: this.listKey,
        key: to
      }));
    }
  }

  var contexts = this._getQueueContexts();

  for (var _iterator = paths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _path = _ref;

    _path.setScope();
    _path.debug(function () {
      return "Inserted.";
    });

    for (var _iterator2 = contexts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var context = _ref2;

      context.maybeQueue(_path, true);
    }
  }

  return paths;
}

function _containerInsertBefore(nodes) {
  return this._containerInsert(this.key, nodes);
}

function _containerInsertAfter(nodes) {
  return this._containerInsert(this.key + 1, nodes);
}

function _maybePopFromStatements(nodes) {
  var last = nodes[nodes.length - 1];
  var isIdentifier = t.isIdentifier(last) || t.isExpressionStatement(last) && t.isIdentifier(last.expression);

  if (isIdentifier && !this.isCompletionRecord()) {
    nodes.pop();
  }
}

function insertAfter(nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
    return this.parentPath.insertAfter(nodes);
  } else if (this.isNodeType("Expression") || this.parentPath.isForStatement() && this.key === "init") {
    if (this.node) {
      var temp = this.scope.generateDeclaredUidIdentifier();
      nodes.unshift(t.expressionStatement(t.assignmentExpression("=", temp, this.node)));
      nodes.push(t.expressionStatement(temp));
    }
    this.replaceExpressionWithStatements(nodes);
  } else {
    this._maybePopFromStatements(nodes);
    if (Array.isArray(this.container)) {
      return this._containerInsertAfter(nodes);
    } else if (this.isStatementOrBlock()) {
      if (this.node) nodes.unshift(this.node);
      this._replaceWith(t.blockStatement(nodes));
    } else {
      throw new Error("We don't know what to do with this node type. " + "We were previously a Statement but we can't fit in here?");
    }
  }

  return [this];
}

function updateSiblingKeys(fromIndex, incrementBy) {
  if (!this.parent) return;

  var paths = _cache.path.get(this.parent);
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (path.key >= fromIndex) {
      path.key += incrementBy;
    }
  }
}

function _verifyNodeList(nodes) {
  if (!nodes) {
    return [];
  }

  if (nodes.constructor !== Array) {
    nodes = [nodes];
  }

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var msg = void 0;

    if (!node) {
      msg = "has falsy node";
    } else if ((typeof node === "undefined" ? "undefined" : (0, _typeof3.default)(node)) !== "object") {
      msg = "contains a non-object node";
    } else if (!node.type) {
      msg = "without a type";
    } else if (node instanceof _index2.default) {
      msg = "has a NodePath when it expected a raw object";
    }

    if (msg) {
      var type = Array.isArray(node) ? "array" : typeof node === "undefined" ? "undefined" : (0, _typeof3.default)(node);
      throw new Error("Node list " + msg + " with the index of " + i + " and type of " + type);
    }
  }

  return nodes;
}

function unshiftContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  var path = _index2.default.get({
    parentPath: this,
    parent: this.node,
    container: this.node[listKey],
    listKey: listKey,
    key: 0
  });

  return path.insertBefore(nodes);
}

function pushContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  var container = this.node[listKey];
  var path = _index2.default.get({
    parentPath: this,
    parent: this.node,
    container: container,
    listKey: listKey,
    key: container.length
  });

  return path.replaceWithMultiple(nodes);
}

function hoist() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.scope;

  var hoister = new _hoister2.default(this, scope);
  return hoister.run();
}
}, function(modId) { var map = {"../cache":1536577187643,"./lib/hoister":1536577187656,"./index":1536577187638}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187656, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var referenceVisitor = {
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    if (path.isJSXIdentifier() && _babelTypes.react.isCompatTag(path.node.name) && !path.parentPath.isJSXMemberExpression()) {
      return;
    }

    if (path.node.name === "this") {
      var scope = path.scope;
      do {
        if (scope.path.isFunction() && !scope.path.isArrowFunctionExpression()) break;
      } while (scope = scope.parent);
      if (scope) state.breakOnScopePaths.push(scope.path);
    }

    var binding = path.scope.getBinding(path.node.name);
    if (!binding) return;

    if (binding !== state.scope.getBinding(path.node.name)) return;

    state.bindings[path.node.name] = binding;
  }
};

var PathHoister = function () {
  function PathHoister(path, scope) {
    (0, _classCallCheck3.default)(this, PathHoister);

    this.breakOnScopePaths = [];

    this.bindings = {};

    this.scopes = [];

    this.scope = scope;
    this.path = path;

    this.attachAfter = false;
  }

  PathHoister.prototype.isCompatibleScope = function isCompatibleScope(scope) {
    for (var key in this.bindings) {
      var binding = this.bindings[key];
      if (!scope.bindingIdentifierEquals(key, binding.identifier)) {
        return false;
      }
    }

    return true;
  };

  PathHoister.prototype.getCompatibleScopes = function getCompatibleScopes() {
    var scope = this.path.scope;
    do {
      if (this.isCompatibleScope(scope)) {
        this.scopes.push(scope);
      } else {
        break;
      }

      if (this.breakOnScopePaths.indexOf(scope.path) >= 0) {
        break;
      }
    } while (scope = scope.parent);
  };

  PathHoister.prototype.getAttachmentPath = function getAttachmentPath() {
    var path = this._getAttachmentPath();
    if (!path) return;

    var targetScope = path.scope;

    if (targetScope.path === path) {
      targetScope = path.scope.parent;
    }

    if (targetScope.path.isProgram() || targetScope.path.isFunction()) {
      for (var name in this.bindings) {
        if (!targetScope.hasOwnBinding(name)) continue;

        var binding = this.bindings[name];

        if (binding.kind === "param") continue;

        if (this.getAttachmentParentForPath(binding.path).key > path.key) {
          this.attachAfter = true;
          path = binding.path;

          for (var _iterator = binding.constantViolations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var violationPath = _ref;

            if (this.getAttachmentParentForPath(violationPath).key > path.key) {
              path = violationPath;
            }
          }
        }
      }
    }

    if (path.parentPath.isExportDeclaration()) {
      path = path.parentPath;
    }

    return path;
  };

  PathHoister.prototype._getAttachmentPath = function _getAttachmentPath() {
    var scopes = this.scopes;

    var scope = scopes.pop();

    if (!scope) return;

    if (scope.path.isFunction()) {
      if (this.hasOwnParamBindings(scope)) {
        if (this.scope === scope) return;

        return scope.path.get("body").get("body")[0];
      } else {
        return this.getNextScopeAttachmentParent();
      }
    } else if (scope.path.isProgram()) {
      return this.getNextScopeAttachmentParent();
    }
  };

  PathHoister.prototype.getNextScopeAttachmentParent = function getNextScopeAttachmentParent() {
    var scope = this.scopes.pop();
    if (scope) return this.getAttachmentParentForPath(scope.path);
  };

  PathHoister.prototype.getAttachmentParentForPath = function getAttachmentParentForPath(path) {
    do {
      if (!path.parentPath || Array.isArray(path.container) && path.isStatement() || path.isVariableDeclarator() && path.parentPath.node !== null && path.parentPath.node.declarations.length > 1) return path;
    } while (path = path.parentPath);
  };

  PathHoister.prototype.hasOwnParamBindings = function hasOwnParamBindings(scope) {
    for (var name in this.bindings) {
      if (!scope.hasOwnBinding(name)) continue;

      var binding = this.bindings[name];

      if (binding.kind === "param" && binding.constant) return true;
    }
    return false;
  };

  PathHoister.prototype.run = function run() {
    var node = this.path.node;
    if (node._hoisted) return;
    node._hoisted = true;

    this.path.traverse(referenceVisitor, this);

    this.getCompatibleScopes();

    var attachTo = this.getAttachmentPath();
    if (!attachTo) return;

    if (attachTo.getFunctionParent() === this.path.getFunctionParent()) return;

    var uid = attachTo.scope.generateUidIdentifier("ref");
    var declarator = t.variableDeclarator(uid, this.path.node);

    var insertFn = this.attachAfter ? "insertAfter" : "insertBefore";
    attachTo[insertFn]([attachTo.isVariableDeclarator() ? declarator : t.variableDeclaration("var", [declarator])]);

    var parent = this.path.parentPath;
    if (parent.isJSXElement() && this.path.container === parent.node.children) {
      uid = t.JSXExpressionContainer(uid);
    }

    this.path.replaceWith(uid);
  };

  return PathHoister;
}();

exports.default = PathHoister;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187657, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.getStatementParent = getStatementParent;
exports.getOpposite = getOpposite;
exports.getCompletionRecords = getCompletionRecords;
exports.getSibling = getSibling;
exports.getPrevSibling = getPrevSibling;
exports.getNextSibling = getNextSibling;
exports.getAllNextSiblings = getAllNextSiblings;
exports.getAllPrevSiblings = getAllPrevSiblings;
exports.get = get;
exports._getKey = _getKey;
exports._getPattern = _getPattern;
exports.getBindingIdentifiers = getBindingIdentifiers;
exports.getOuterBindingIdentifiers = getOuterBindingIdentifiers;
exports.getBindingIdentifierPaths = getBindingIdentifierPaths;
exports.getOuterBindingIdentifierPaths = getOuterBindingIdentifierPaths;

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatementParent() {
  var path = this;

  do {
    if (!path.parentPath || Array.isArray(path.container) && path.isStatement()) {
      break;
    } else {
      path = path.parentPath;
    }
  } while (path);

  if (path && (path.isProgram() || path.isFile())) {
    throw new Error("File/Program node, we can't possibly find a statement parent to this");
  }

  return path;
}

function getOpposite() {
  if (this.key === "left") {
    return this.getSibling("right");
  } else if (this.key === "right") {
    return this.getSibling("left");
  }
}

function getCompletionRecords() {
  var paths = [];

  var add = function add(path) {
    if (path) paths = paths.concat(path.getCompletionRecords());
  };

  if (this.isIfStatement()) {
    add(this.get("consequent"));
    add(this.get("alternate"));
  } else if (this.isDoExpression() || this.isFor() || this.isWhile()) {
    add(this.get("body"));
  } else if (this.isProgram() || this.isBlockStatement()) {
    add(this.get("body").pop());
  } else if (this.isFunction()) {
    return this.get("body").getCompletionRecords();
  } else if (this.isTryStatement()) {
    add(this.get("block"));
    add(this.get("handler"));
    add(this.get("finalizer"));
  } else {
    paths.push(this);
  }

  return paths;
}

function getSibling(key) {
  return _index2.default.get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key
  });
}

function getPrevSibling() {
  return this.getSibling(this.key - 1);
}

function getNextSibling() {
  return this.getSibling(this.key + 1);
}

function getAllNextSiblings() {
  var _key = this.key;
  var sibling = this.getSibling(++_key);
  var siblings = [];
  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(++_key);
  }
  return siblings;
}

function getAllPrevSiblings() {
  var _key = this.key;
  var sibling = this.getSibling(--_key);
  var siblings = [];
  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(--_key);
  }
  return siblings;
}

function get(key, context) {
  if (context === true) context = this.context;
  var parts = key.split(".");
  if (parts.length === 1) {
    return this._getKey(key, context);
  } else {
    return this._getPattern(parts, context);
  }
}

function _getKey(key, context) {
  var _this = this;

  var node = this.node;
  var container = node[key];

  if (Array.isArray(container)) {
    return container.map(function (_, i) {
      return _index2.default.get({
        listKey: key,
        parentPath: _this,
        parent: node,
        container: container,
        key: i
      }).setContext(context);
    });
  } else {
    return _index2.default.get({
      parentPath: this,
      parent: node,
      container: node,
      key: key
    }).setContext(context);
  }
}

function _getPattern(parts, context) {
  var path = this;
  for (var _iterator = parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var part = _ref;

    if (part === ".") {
      path = path.parentPath;
    } else {
      if (Array.isArray(path)) {
        path = path[part];
      } else {
        path = path.get(part, context);
      }
    }
  }
  return path;
}

function getBindingIdentifiers(duplicates) {
  return t.getBindingIdentifiers(this.node, duplicates);
}

function getOuterBindingIdentifiers(duplicates) {
  return t.getOuterBindingIdentifiers(this.node, duplicates);
}

function getBindingIdentifierPaths() {
  var duplicates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var outerOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var path = this;
  var search = [].concat(path);
  var ids = (0, _create2.default)(null);

  while (search.length) {
    var id = search.shift();
    if (!id) continue;
    if (!id.node) continue;

    var keys = t.getBindingIdentifiers.keys[id.node.type];

    if (id.isIdentifier()) {
      if (duplicates) {
        var _ids = ids[id.node.name] = ids[id.node.name] || [];
        _ids.push(id);
      } else {
        ids[id.node.name] = id;
      }
      continue;
    }

    if (id.isExportDeclaration()) {
      var declaration = id.get("declaration");
      if (declaration.isDeclaration()) {
        search.push(declaration);
      }
      continue;
    }

    if (outerOnly) {
      if (id.isFunctionDeclaration()) {
        search.push(id.get("id"));
        continue;
      }
      if (id.isFunctionExpression()) {
        continue;
      }
    }

    if (keys) {
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var child = id.get(key);
        if (Array.isArray(child) || child.node) {
          search = search.concat(child);
        }
      }
    }
  }

  return ids;
}

function getOuterBindingIdentifierPaths(duplicates) {
  return this.getBindingIdentifierPaths(duplicates, true);
}
}, function(modId) { var map = {"./index":1536577187638}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187658, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.shareCommentsWithSiblings = shareCommentsWithSiblings;
exports.addComment = addComment;
exports.addComments = addComments;
function shareCommentsWithSiblings() {
  if (typeof this.key === "string") return;

  var node = this.node;
  if (!node) return;

  var trailing = node.trailingComments;
  var leading = node.leadingComments;
  if (!trailing && !leading) return;

  var prev = this.getSibling(this.key - 1);
  var next = this.getSibling(this.key + 1);

  if (!prev.node) prev = next;
  if (!next.node) next = prev;

  prev.addComments("trailing", leading);
  next.addComments("leading", trailing);
}

function addComment(type, content, line) {
  this.addComments(type, [{
    type: line ? "CommentLine" : "CommentBlock",
    value: content
  }]);
}

function addComments(type, comments) {
  if (!comments) return;

  var node = this.node;
  if (!node) return;

  var key = type + "Comments";

  if (node[key]) {
    node[key] = node[key].concat(comments);
  } else {
    node[key] = comments;
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187659, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hub = function Hub(file, options) {
  (0, _classCallCheck3.default)(this, Hub);

  this.file = file;
  this.options = options;
};

exports.default = Hub;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187660, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _path2 = require("./path");

var _path3 = _interopRequireDefault(_path2);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testing = process.env.NODE_ENV === "test";

var TraversalContext = function () {
  function TraversalContext(scope, opts, state, parentPath) {
    (0, _classCallCheck3.default)(this, TraversalContext);
    this.queue = null;

    this.parentPath = parentPath;
    this.scope = scope;
    this.state = state;
    this.opts = opts;
  }

  TraversalContext.prototype.shouldVisit = function shouldVisit(node) {
    var opts = this.opts;
    if (opts.enter || opts.exit) return true;

    if (opts[node.type]) return true;

    var keys = t.VISITOR_KEYS[node.type];
    if (!keys || !keys.length) return false;

    for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var key = _ref;

      if (node[key]) return true;
    }

    return false;
  };

  TraversalContext.prototype.create = function create(node, obj, key, listKey) {
    return _path3.default.get({
      parentPath: this.parentPath,
      parent: node,
      container: obj,
      key: key,
      listKey: listKey
    });
  };

  TraversalContext.prototype.maybeQueue = function maybeQueue(path, notPriority) {
    if (this.trap) {
      throw new Error("Infinite cycle detected");
    }

    if (this.queue) {
      if (notPriority) {
        this.queue.push(path);
      } else {
        this.priorityQueue.push(path);
      }
    }
  };

  TraversalContext.prototype.visitMultiple = function visitMultiple(container, parent, listKey) {
    if (container.length === 0) return false;

    var queue = [];

    for (var key = 0; key < container.length; key++) {
      var node = container[key];
      if (node && this.shouldVisit(node)) {
        queue.push(this.create(parent, container, key, listKey));
      }
    }

    return this.visitQueue(queue);
  };

  TraversalContext.prototype.visitSingle = function visitSingle(node, key) {
    if (this.shouldVisit(node[key])) {
      return this.visitQueue([this.create(node, node, key)]);
    } else {
      return false;
    }
  };

  TraversalContext.prototype.visitQueue = function visitQueue(queue) {
    this.queue = queue;
    this.priorityQueue = [];

    var visited = [];
    var stop = false;

    for (var _iterator2 = queue, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var path = _ref2;

      path.resync();

      if (path.contexts.length === 0 || path.contexts[path.contexts.length - 1] !== this) {
        path.pushContext(this);
      }

      if (path.key === null) continue;

      if (testing && queue.length >= 10000) {
        this.trap = true;
      }

      if (visited.indexOf(path.node) >= 0) continue;
      visited.push(path.node);

      if (path.visit()) {
        stop = true;
        break;
      }

      if (this.priorityQueue.length) {
        stop = this.visitQueue(this.priorityQueue);
        this.priorityQueue = [];
        this.queue = queue;
        if (stop) break;
      }
    }

    for (var _iterator3 = queue, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var _path = _ref3;

      _path.popContext();
    }

    this.queue = null;

    return stop;
  };

  TraversalContext.prototype.visit = function visit(node, key) {
    var nodes = node[key];
    if (!nodes) return false;

    if (Array.isArray(nodes)) {
      return this.visitMultiple(nodes, node, key);
    } else {
      return this.visitSingle(node, key);
    }
  };

  return TraversalContext;
}();

exports.default = TraversalContext;
module.exports = exports["default"];
}, function(modId) { var map = {"./path":1536577187638}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187661, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.explode = explode;
exports.verify = verify;
exports.merge = merge;

var _virtualTypes = require("./path/lib/virtual-types");

var virtualTypes = _interopRequireWildcard(_virtualTypes);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _clone = require("lodash/clone");

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function explode(visitor) {
  if (visitor._exploded) return visitor;
  visitor._exploded = true;

  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    var parts = nodeType.split("|");
    if (parts.length === 1) continue;

    var fns = visitor[nodeType];
    delete visitor[nodeType];

    for (var _iterator = parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var part = _ref;

      visitor[part] = fns;
    }
  }

  verify(visitor);

  delete visitor.__esModule;

  ensureEntranceObjects(visitor);

  ensureCallbackArrays(visitor);

  for (var _iterator2 = (0, _keys2.default)(visitor), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var _nodeType3 = _ref2;

    if (shouldIgnoreKey(_nodeType3)) continue;

    var wrapper = virtualTypes[_nodeType3];
    if (!wrapper) continue;

    var _fns2 = visitor[_nodeType3];
    for (var type in _fns2) {
      _fns2[type] = wrapCheck(wrapper, _fns2[type]);
    }

    delete visitor[_nodeType3];

    if (wrapper.types) {
      for (var _iterator4 = wrapper.types, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref4 = _i4.value;
        }

        var _type = _ref4;

        if (visitor[_type]) {
          mergePair(visitor[_type], _fns2);
        } else {
          visitor[_type] = _fns2;
        }
      }
    } else {
      mergePair(visitor, _fns2);
    }
  }

  for (var _nodeType in visitor) {
    if (shouldIgnoreKey(_nodeType)) continue;

    var _fns = visitor[_nodeType];

    var aliases = t.FLIPPED_ALIAS_KEYS[_nodeType];

    var deprecratedKey = t.DEPRECATED_KEYS[_nodeType];
    if (deprecratedKey) {
      console.trace("Visitor defined for " + _nodeType + " but it has been renamed to " + deprecratedKey);
      aliases = [deprecratedKey];
    }

    if (!aliases) continue;

    delete visitor[_nodeType];

    for (var _iterator3 = aliases, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var alias = _ref3;

      var existing = visitor[alias];
      if (existing) {
        mergePair(existing, _fns);
      } else {
        visitor[alias] = (0, _clone2.default)(_fns);
      }
    }
  }

  for (var _nodeType2 in visitor) {
    if (shouldIgnoreKey(_nodeType2)) continue;

    ensureCallbackArrays(visitor[_nodeType2]);
  }

  return visitor;
}

function verify(visitor) {
  if (visitor._verified) return;

  if (typeof visitor === "function") {
    throw new Error(messages.get("traverseVerifyRootFunction"));
  }

  for (var nodeType in visitor) {
    if (nodeType === "enter" || nodeType === "exit") {
      validateVisitorMethods(nodeType, visitor[nodeType]);
    }

    if (shouldIgnoreKey(nodeType)) continue;

    if (t.TYPES.indexOf(nodeType) < 0) {
      throw new Error(messages.get("traverseVerifyNodeType", nodeType));
    }

    var visitors = visitor[nodeType];
    if ((typeof visitors === "undefined" ? "undefined" : (0, _typeof3.default)(visitors)) === "object") {
      for (var visitorKey in visitors) {
        if (visitorKey === "enter" || visitorKey === "exit") {
          validateVisitorMethods(nodeType + "." + visitorKey, visitors[visitorKey]);
        } else {
          throw new Error(messages.get("traverseVerifyVisitorProperty", nodeType, visitorKey));
        }
      }
    }
  }

  visitor._verified = true;
}

function validateVisitorMethods(path, val) {
  var fns = [].concat(val);
  for (var _iterator5 = fns, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
    var _ref5;

    if (_isArray5) {
      if (_i5 >= _iterator5.length) break;
      _ref5 = _iterator5[_i5++];
    } else {
      _i5 = _iterator5.next();
      if (_i5.done) break;
      _ref5 = _i5.value;
    }

    var fn = _ref5;

    if (typeof fn !== "function") {
      throw new TypeError("Non-function found defined in " + path + " with type " + (typeof fn === "undefined" ? "undefined" : (0, _typeof3.default)(fn)));
    }
  }
}

function merge(visitors) {
  var states = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var wrapper = arguments[2];

  var rootVisitor = {};

  for (var i = 0; i < visitors.length; i++) {
    var visitor = visitors[i];
    var state = states[i];

    explode(visitor);

    for (var type in visitor) {
      var visitorType = visitor[type];

      if (state || wrapper) {
        visitorType = wrapWithStateOrWrapper(visitorType, state, wrapper);
      }

      var nodeVisitor = rootVisitor[type] = rootVisitor[type] || {};
      mergePair(nodeVisitor, visitorType);
    }
  }

  return rootVisitor;
}

function wrapWithStateOrWrapper(oldVisitor, state, wrapper) {
  var newVisitor = {};

  var _loop = function _loop(key) {
    var fns = oldVisitor[key];

    if (!Array.isArray(fns)) return "continue";

    fns = fns.map(function (fn) {
      var newFn = fn;

      if (state) {
        newFn = function newFn(path) {
          return fn.call(state, path, state);
        };
      }

      if (wrapper) {
        newFn = wrapper(state.key, key, newFn);
      }

      return newFn;
    });

    newVisitor[key] = fns;
  };

  for (var key in oldVisitor) {
    var _ret = _loop(key);

    if (_ret === "continue") continue;
  }

  return newVisitor;
}

function ensureEntranceObjects(obj) {
  for (var key in obj) {
    if (shouldIgnoreKey(key)) continue;

    var fns = obj[key];
    if (typeof fns === "function") {
      obj[key] = { enter: fns };
    }
  }
}

function ensureCallbackArrays(obj) {
  if (obj.enter && !Array.isArray(obj.enter)) obj.enter = [obj.enter];
  if (obj.exit && !Array.isArray(obj.exit)) obj.exit = [obj.exit];
}

function wrapCheck(wrapper, fn) {
  var newFn = function newFn(path) {
    if (wrapper.checkPath(path)) {
      return fn.apply(this, arguments);
    }
  };
  newFn.toString = function () {
    return fn.toString();
  };
  return newFn;
}

function shouldIgnoreKey(key) {
  if (key[0] === "_") return true;

  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;

  if (key === "blacklist" || key === "noScope" || key === "skipKeys") return true;

  return false;
}

function mergePair(dest, src) {
  for (var key in src) {
    dest[key] = [].concat(dest[key] || [], src[key]);
  }
}
}, function(modId) { var map = {"./path/lib/virtual-types":1536577187639}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187637);
})()
//# sourceMappingURL=index.js.map