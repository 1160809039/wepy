module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187608, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function () {
  return {
    visitor: _babelTraverse.visitors.merge([{
      ArrowFunctionExpression: function ArrowFunctionExpression(path) {
        var params = path.get("params");
        for (var _iterator = params, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var param = _ref;

          if (param.isRestElement() || param.isAssignmentPattern()) {
            path.arrowFunctionToShadowed();
            break;
          }
        }
      }
    }, destructuring.visitor, rest.visitor, def.visitor])
  };
};

var _babelTraverse = require("babel-traverse");

var _destructuring = require("./destructuring");

var destructuring = _interopRequireWildcard(_destructuring);

var _default = require("./default");

var def = _interopRequireWildcard(_default);

var _rest = require("./rest");

var rest = _interopRequireWildcard(_rest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
}, function(modId) {var map = {"./destructuring":1536577187609,"./default":1536577187610,"./rest":1536577187611}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187609, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.visitor = undefined;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var visitor = exports.visitor = {
  Function: function Function(path) {
    var params = path.get("params");

    var hoistTweak = t.isRestElement(params[params.length - 1]) ? 1 : 0;
    var outputParamsLength = params.length - hoistTweak;

    for (var i = 0; i < outputParamsLength; i++) {
      var param = params[i];
      if (param.isArrayPattern() || param.isObjectPattern()) {
        var uid = path.scope.generateUidIdentifier("ref");

        var declar = t.variableDeclaration("let", [t.variableDeclarator(param.node, uid)]);
        declar._blockHoist = outputParamsLength - i;

        path.ensureBlock();
        path.get("body").unshiftContainer("body", declar);

        param.replaceWith(uid);
      }
    }
  }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187610, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.visitor = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _babelHelperGetFunctionArity = require("babel-helper-get-function-arity");

var _babelHelperGetFunctionArity2 = _interopRequireDefault(_babelHelperGetFunctionArity);

var _babelHelperCallDelegate = require("babel-helper-call-delegate");

var _babelHelperCallDelegate2 = _interopRequireDefault(_babelHelperCallDelegate);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildDefaultParam = (0, _babelTemplate2.default)("\n  let VARIABLE_NAME =\n    ARGUMENTS.length > ARGUMENT_KEY && ARGUMENTS[ARGUMENT_KEY] !== undefined ?\n      ARGUMENTS[ARGUMENT_KEY]\n    :\n      DEFAULT_VALUE;\n");

var buildCutOff = (0, _babelTemplate2.default)("\n  let $0 = $1[$2];\n");

function hasDefaults(node) {
  for (var _iterator = node.params, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var param = _ref;

    if (!t.isIdentifier(param)) return true;
  }
  return false;
}

function isSafeBinding(scope, node) {
  if (!scope.hasOwnBinding(node.name)) return true;

  var _scope$getOwnBinding = scope.getOwnBinding(node.name),
      kind = _scope$getOwnBinding.kind;

  return kind === "param" || kind === "local";
}

var iifeVisitor = {
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    var scope = path.scope,
        node = path.node;

    if (node.name === "eval" || !isSafeBinding(scope, node)) {
      state.iife = true;
      path.stop();
    }
  },
  Scope: function Scope(path) {
    path.skip();
  }
};

var visitor = exports.visitor = {
  Function: function Function(path) {
    var node = path.node,
        scope = path.scope;

    if (!hasDefaults(node)) return;

    path.ensureBlock();

    var state = {
      iife: false,
      scope: scope
    };

    var body = [];

    var argsIdentifier = t.identifier("arguments");
    argsIdentifier._shadowedFunctionLiteral = path;

    function pushDefNode(left, right, i) {
      var defNode = buildDefaultParam({
        VARIABLE_NAME: left,
        DEFAULT_VALUE: right,
        ARGUMENT_KEY: t.numericLiteral(i),
        ARGUMENTS: argsIdentifier
      });
      defNode._blockHoist = node.params.length - i;
      body.push(defNode);
    }

    var lastNonDefaultParam = (0, _babelHelperGetFunctionArity2.default)(node);

    var params = path.get("params");
    for (var i = 0; i < params.length; i++) {
      var param = params[i];

      if (!param.isAssignmentPattern()) {
        if (!state.iife && !param.isIdentifier()) {
          param.traverse(iifeVisitor, state);
        }

        continue;
      }

      var left = param.get("left");
      var right = param.get("right");

      if (i >= lastNonDefaultParam || left.isPattern()) {
        var placeholder = scope.generateUidIdentifier("x");
        placeholder._isDefaultPlaceholder = true;
        node.params[i] = placeholder;
      } else {
        node.params[i] = left.node;
      }

      if (!state.iife) {
        if (right.isIdentifier() && !isSafeBinding(scope, right.node)) {
          state.iife = true;
        } else {
          right.traverse(iifeVisitor, state);
        }
      }

      pushDefNode(left.node, right.node, i);
    }

    for (var _i2 = lastNonDefaultParam + 1; _i2 < node.params.length; _i2++) {
      var _param = node.params[_i2];
      if (_param._isDefaultPlaceholder) continue;

      var declar = buildCutOff(_param, argsIdentifier, t.numericLiteral(_i2));
      declar._blockHoist = node.params.length - _i2;
      body.push(declar);
    }

    node.params = node.params.slice(0, lastNonDefaultParam);

    if (state.iife) {
      body.push((0, _babelHelperCallDelegate2.default)(path, scope));
      path.set("body", t.blockStatement(body));
    } else {
      path.get("body").unshiftContainer("body", body);
    }
  }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187611, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.visitor = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildRest = (0, _babelTemplate2.default)("\n  for (var LEN = ARGUMENTS.length,\n           ARRAY = Array(ARRAY_LEN),\n           KEY = START;\n       KEY < LEN;\n       KEY++) {\n    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];\n  }\n");

var restIndex = (0, _babelTemplate2.default)("\n  ARGUMENTS.length <= INDEX ? undefined : ARGUMENTS[INDEX]\n");

var restIndexImpure = (0, _babelTemplate2.default)("\n  REF = INDEX, ARGUMENTS.length <= REF ? undefined : ARGUMENTS[REF]\n");

var restLength = (0, _babelTemplate2.default)("\n  ARGUMENTS.length <= OFFSET ? 0 : ARGUMENTS.length - OFFSET\n");

var memberExpressionOptimisationVisitor = {
  Scope: function Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      path.skip();
    }
  },
  Flow: function Flow(path) {
    if (path.isTypeCastExpression()) return;

    path.skip();
  },


  "Function|ClassProperty": function FunctionClassProperty(path, state) {
    var oldNoOptimise = state.noOptimise;
    state.noOptimise = true;
    path.traverse(memberExpressionOptimisationVisitor, state);
    state.noOptimise = oldNoOptimise;

    path.skip();
  },

  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    var node = path.node;

    if (node.name === "arguments") {
      state.deopted = true;
    }

    if (node.name !== state.name) return;

    if (state.noOptimise) {
      state.deopted = true;
    } else {
      var parentPath = path.parentPath;

      if (parentPath.listKey === "params" && parentPath.key < state.offset) {
        return;
      }

      if (parentPath.isMemberExpression({ object: node })) {
        var grandparentPath = parentPath.parentPath;

        var argsOptEligible = !state.deopted && !(grandparentPath.isAssignmentExpression() && parentPath.node === grandparentPath.node.left || grandparentPath.isLVal() || grandparentPath.isForXStatement() || grandparentPath.isUpdateExpression() || grandparentPath.isUnaryExpression({ operator: "delete" }) || (grandparentPath.isCallExpression() || grandparentPath.isNewExpression()) && parentPath.node === grandparentPath.node.callee);

        if (argsOptEligible) {
          if (parentPath.node.computed) {
            if (parentPath.get("property").isBaseType("number")) {
              state.candidates.push({ cause: "indexGetter", path: path });
              return;
            }
          } else if (parentPath.node.property.name === "length") {
              state.candidates.push({ cause: "lengthGetter", path: path });
              return;
            }
        }
      }

      if (state.offset === 0 && parentPath.isSpreadElement()) {
        var call = parentPath.parentPath;
        if (call.isCallExpression() && call.node.arguments.length === 1) {
          state.candidates.push({ cause: "argSpread", path: path });
          return;
        }
      }

      state.references.push(path);
    }
  },
  BindingIdentifier: function BindingIdentifier(_ref, state) {
    var node = _ref.node;

    if (node.name === state.name) {
      state.deopted = true;
    }
  }
};
function hasRest(node) {
  return t.isRestElement(node.params[node.params.length - 1]);
}

function optimiseIndexGetter(path, argsId, offset) {
  var index = void 0;

  if (t.isNumericLiteral(path.parent.property)) {
    index = t.numericLiteral(path.parent.property.value + offset);
  } else if (offset === 0) {
    index = path.parent.property;
  } else {
    index = t.binaryExpression("+", path.parent.property, t.numericLiteral(offset));
  }

  var scope = path.scope;

  if (!scope.isPure(index)) {
    var temp = scope.generateUidIdentifierBasedOnNode(index);
    scope.push({ id: temp, kind: "var" });
    path.parentPath.replaceWith(restIndexImpure({
      ARGUMENTS: argsId,
      INDEX: index,
      REF: temp
    }));
  } else {
    path.parentPath.replaceWith(restIndex({
      ARGUMENTS: argsId,
      INDEX: index
    }));
  }
}

function optimiseLengthGetter(path, argsId, offset) {
  if (offset) {
    path.parentPath.replaceWith(restLength({
      ARGUMENTS: argsId,
      OFFSET: t.numericLiteral(offset)
    }));
  } else {
    path.replaceWith(argsId);
  }
}

var visitor = exports.visitor = {
  Function: function Function(path) {
    var node = path.node,
        scope = path.scope;

    if (!hasRest(node)) return;

    var rest = node.params.pop().argument;

    var argsId = t.identifier("arguments");

    argsId._shadowedFunctionLiteral = path;

    var state = {
      references: [],
      offset: node.params.length,

      argumentsNode: argsId,
      outerBinding: scope.getBindingIdentifier(rest.name),

      candidates: [],

      name: rest.name,

      deopted: false
    };

    path.traverse(memberExpressionOptimisationVisitor, state);

    if (!state.deopted && !state.references.length) {
      for (var _iterator = state.candidates, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref3;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref3 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref3 = _i.value;
        }

        var _ref4 = _ref3;
        var _path = _ref4.path,
            cause = _ref4.cause;

        switch (cause) {
          case "indexGetter":
            optimiseIndexGetter(_path, argsId, state.offset);
            break;
          case "lengthGetter":
            optimiseLengthGetter(_path, argsId, state.offset);
            break;
          default:
            _path.replaceWith(argsId);
        }
      }
      return;
    }

    state.references = state.references.concat(state.candidates.map(function (_ref5) {
      var path = _ref5.path;
      return path;
    }));

    state.deopted = state.deopted || !!node.shadow;

    var start = t.numericLiteral(node.params.length);
    var key = scope.generateUidIdentifier("key");
    var len = scope.generateUidIdentifier("len");

    var arrKey = key;
    var arrLen = len;
    if (node.params.length) {
      arrKey = t.binaryExpression("-", key, start);

      arrLen = t.conditionalExpression(t.binaryExpression(">", len, start), t.binaryExpression("-", len, start), t.numericLiteral(0));
    }

    var loop = buildRest({
      ARGUMENTS: argsId,
      ARRAY_KEY: arrKey,
      ARRAY_LEN: arrLen,
      START: start,
      ARRAY: rest,
      KEY: key,
      LEN: len
    });

    if (state.deopted) {
      loop._blockHoist = node.params.length + 1;
      node.body.body.unshift(loop);
    } else {
      loop._blockHoist = 1;

      var target = path.getEarliestCommonAncestorFrom(state.references).getStatementParent();

      target.findParent(function (path) {
        if (path.isLoop()) {
          target = path;
        } else {
          return path.isFunction();
        }
      });

      target.insertBefore(loop);
    }
  }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187608);
})()
//# sourceMappingURL=index.js.map