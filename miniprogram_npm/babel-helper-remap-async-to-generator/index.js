module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187573, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (path, file, helpers) {
  if (!helpers) {
    helpers = { wrapAsync: file };
    file = null;
  }
  path.traverse(awaitVisitor, {
    file: file,
    wrapAwait: helpers.wrapAwait
  });

  if (path.isClassMethod() || path.isObjectMethod()) {
    classOrObjectMethod(path, helpers.wrapAsync);
  } else {
    plainFunction(path, helpers.wrapAsync);
  }
};

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _forAwait = require("./for-await");

var _forAwait2 = _interopRequireDefault(_forAwait);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildWrapper = (0, _babelTemplate2.default)("\n  (() => {\n    var REF = FUNCTION;\n    return function NAME(PARAMS) {\n      return REF.apply(this, arguments);\n    };\n  })\n");

var namedBuildWrapper = (0, _babelTemplate2.default)("\n  (() => {\n    var REF = FUNCTION;\n    function NAME(PARAMS) {\n      return REF.apply(this, arguments);\n    }\n    return NAME;\n  })\n");

var awaitVisitor = {
  Function: function Function(path) {
    if (path.isArrowFunctionExpression() && !path.node.async) {
      path.arrowFunctionToShadowed();
      return;
    }
    path.skip();
  },
  AwaitExpression: function AwaitExpression(_ref, _ref2) {
    var node = _ref.node;
    var wrapAwait = _ref2.wrapAwait;

    node.type = "YieldExpression";
    if (wrapAwait) {
      node.argument = t.callExpression(wrapAwait, [node.argument]);
    }
  },
  ForAwaitStatement: function ForAwaitStatement(path, _ref3) {
    var file = _ref3.file,
        wrapAwait = _ref3.wrapAwait;
    var node = path.node;


    var build = (0, _forAwait2.default)(path, {
      getAsyncIterator: file.addHelper("asyncIterator"),
      wrapAwait: wrapAwait
    });

    var declar = build.declar,
        loop = build.loop;

    var block = loop.body;

    path.ensureBlock();

    if (declar) {
      block.body.push(declar);
    }

    block.body = block.body.concat(node.body.body);

    t.inherits(loop, node);
    t.inherits(loop.body, node.body);

    if (build.replaceParent) {
      path.parentPath.replaceWithMultiple(build.node);
      path.remove();
    } else {
      path.replaceWithMultiple(build.node);
    }
  }
};

function classOrObjectMethod(path, callId) {
  var node = path.node;
  var body = node.body;

  node.async = false;

  var container = t.functionExpression(null, [], t.blockStatement(body.body), true);
  container.shadow = true;
  body.body = [t.returnStatement(t.callExpression(t.callExpression(callId, [container]), []))];

  node.generator = false;
}

function plainFunction(path, callId) {
  var node = path.node;
  var isDeclaration = path.isFunctionDeclaration();
  var asyncFnId = node.id;
  var wrapper = buildWrapper;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToShadowed();
  } else if (!isDeclaration && asyncFnId) {
    wrapper = namedBuildWrapper;
  }

  node.async = false;
  node.generator = true;

  node.id = null;

  if (isDeclaration) {
    node.type = "FunctionExpression";
  }

  var built = t.callExpression(callId, [node]);
  var container = wrapper({
    NAME: asyncFnId,
    REF: path.scope.generateUidIdentifier("ref"),
    FUNCTION: built,
    PARAMS: node.params.reduce(function (acc, param) {
      acc.done = acc.done || t.isAssignmentPattern(param) || t.isRestElement(param);

      if (!acc.done) {
        acc.params.push(path.scope.generateUidIdentifier("x"));
      }

      return acc;
    }, {
      params: [],
      done: false
    }).params
  }).expression;

  if (isDeclaration) {
    var declar = t.variableDeclaration("let", [t.variableDeclarator(t.identifier(asyncFnId.name), t.callExpression(container, []))]);
    declar._blockHoist = true;

    path.replaceWith(declar);
  } else {
    var retFunction = container.body.body[1].argument;
    if (!asyncFnId) {
      (0, _babelHelperFunctionName2.default)({
        node: retFunction,
        parent: path.parent,
        scope: path.scope
      });
    }

    if (!retFunction || retFunction.id || node.params.length) {
      path.replaceWith(t.callExpression(container, []));
    } else {
      path.replaceWith(built);
    }
  }
}

module.exports = exports["default"];
}, function(modId) {var map = {"./for-await":1536577187574}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187574, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (path, helpers) {
  var node = path.node,
      scope = path.scope,
      parent = path.parent;


  var stepKey = scope.generateUidIdentifier("step");
  var stepValue = scope.generateUidIdentifier("value");
  var left = node.left;
  var declar = void 0;

  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    declar = t.expressionStatement(t.assignmentExpression("=", left, stepValue));
  } else if (t.isVariableDeclaration(left)) {
    declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, stepValue)]);
  }

  var template = buildForAwait();

  (0, _babelTraverse2.default)(template, forAwaitVisitor, null, {
    ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
    ITERATOR_COMPLETION: scope.generateUidIdentifier("iteratorNormalCompletion"),
    ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
    ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
    GET_ITERATOR: helpers.getAsyncIterator,
    OBJECT: node.right,
    STEP_VALUE: stepValue,
    STEP_KEY: stepKey,
    AWAIT: helpers.wrapAwait
  });

  template = template.body.body;

  var isLabeledParent = t.isLabeledStatement(parent);
  var tryBody = template[3].block.body;
  var loop = tryBody[0];

  if (isLabeledParent) {
    tryBody[0] = t.labeledStatement(parent.label, loop);
  }

  return {
    replaceParent: isLabeledParent,
    node: template,
    declar: declar,
    loop: loop
  };
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var buildForAwait = (0, _babelTemplate2.default)("\n  function* wrapper() {\n    var ITERATOR_COMPLETION = true;\n    var ITERATOR_HAD_ERROR_KEY = false;\n    var ITERATOR_ERROR_KEY = undefined;\n    try {\n      for (\n        var ITERATOR_KEY = GET_ITERATOR(OBJECT), STEP_KEY, STEP_VALUE;\n        (\n          STEP_KEY = yield AWAIT(ITERATOR_KEY.next()),\n          ITERATOR_COMPLETION = STEP_KEY.done,\n          STEP_VALUE = yield AWAIT(STEP_KEY.value),\n          !ITERATOR_COMPLETION\n        );\n        ITERATOR_COMPLETION = true) {\n      }\n    } catch (err) {\n      ITERATOR_HAD_ERROR_KEY = true;\n      ITERATOR_ERROR_KEY = err;\n    } finally {\n      try {\n        if (!ITERATOR_COMPLETION && ITERATOR_KEY.return) {\n          yield AWAIT(ITERATOR_KEY.return());\n        }\n      } finally {\n        if (ITERATOR_HAD_ERROR_KEY) {\n          throw ITERATOR_ERROR_KEY;\n        }\n      }\n    }\n  }\n");

var forAwaitVisitor = {
  noScope: true,

  Identifier: function Identifier(path, replacements) {
    if (path.node.name in replacements) {
      path.replaceInline(replacements[path.node.name]);
    }
  },
  CallExpression: function CallExpression(path, replacements) {
    var callee = path.node.callee;

    if (t.isIdentifier(callee) && callee.name === "AWAIT" && !replacements.AWAIT) {
      path.replaceWith(path.node.arguments[0]);
    }
  }
};

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187573);
})()
//# sourceMappingURL=index.js.map