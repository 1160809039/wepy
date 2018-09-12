module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187564, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (opts) {
  var visitor = {};

  function isAssignment(node) {
    return node && node.operator === opts.operator + "=";
  }

  function buildAssignment(left, right) {
    return t.assignmentExpression("=", left, right);
  }

  visitor.ExpressionStatement = function (path, file) {
    if (path.isCompletionRecord()) return;

    var expr = path.node.expression;
    if (!isAssignment(expr)) return;

    var nodes = [];
    var exploded = (0, _babelHelperExplodeAssignableExpression2.default)(expr.left, nodes, file, path.scope, true);

    nodes.push(t.expressionStatement(buildAssignment(exploded.ref, opts.build(exploded.uid, expr.right))));

    path.replaceWithMultiple(nodes);
  };

  visitor.AssignmentExpression = function (path, file) {
    var node = path.node,
        scope = path.scope;

    if (!isAssignment(node)) return;

    var nodes = [];
    var exploded = (0, _babelHelperExplodeAssignableExpression2.default)(node.left, nodes, file, scope);
    nodes.push(buildAssignment(exploded.ref, opts.build(exploded.uid, node.right)));
    path.replaceWithMultiple(nodes);
  };

  visitor.BinaryExpression = function (path) {
    var node = path.node;

    if (node.operator === opts.operator) {
      path.replaceWith(opts.build(node.left, node.right));
    }
  };

  return visitor;
};

var _babelHelperExplodeAssignableExpression = require("babel-helper-explode-assignable-expression");

var _babelHelperExplodeAssignableExpression2 = _interopRequireDefault(_babelHelperExplodeAssignableExpression);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187564);
})()
//# sourceMappingURL=index.js.map