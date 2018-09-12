module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187616, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = function (_ref) {
  var t = _ref.types;

  var IGNORE = (0, _symbol2.default)();

  return {
    visitor: {
      Scope: function Scope(_ref2) {
        var scope = _ref2.scope;

        if (!scope.getBinding("Symbol")) {
          return;
        }

        scope.rename("Symbol");
      },
      UnaryExpression: function UnaryExpression(path) {
        var node = path.node,
            parent = path.parent;

        if (node[IGNORE]) return;
        if (path.find(function (path) {
          return path.node && !!path.node._generated;
        })) return;

        if (path.parentPath.isBinaryExpression() && t.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
          var opposite = path.getOpposite();
          if (opposite.isLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "object") {
            return;
          }
        }

        if (node.operator === "typeof") {
          var call = t.callExpression(this.addHelper("typeof"), [node.argument]);
          if (path.get("argument").isIdentifier()) {
            var undefLiteral = t.stringLiteral("undefined");
            var unary = t.unaryExpression("typeof", node.argument);
            unary[IGNORE] = true;
            path.replaceWith(t.conditionalExpression(t.binaryExpression("===", unary, undefLiteral), undefLiteral, call));
          } else {
            path.replaceWith(call);
          }
        }
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187616);
})()
//# sourceMappingURL=index.js.map