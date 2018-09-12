module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187607, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = function (_ref) {
  var t = _ref.types;

  function Property(path, node, scope, getObjectRef, file) {
    var replaceSupers = new _babelHelperReplaceSupers2.default({
      getObjectRef: getObjectRef,
      methodNode: node,
      methodPath: path,
      isStatic: true,
      scope: scope,
      file: file
    });

    replaceSupers.replace();
  }

  var CONTAINS_SUPER = (0, _symbol2.default)();

  return {
    visitor: {
      Super: function Super(path) {
        var parentObj = path.findParent(function (path) {
          return path.isObjectExpression();
        });
        if (parentObj) parentObj.node[CONTAINS_SUPER] = true;
      },


      ObjectExpression: {
        exit: function exit(path, file) {
          if (!path.node[CONTAINS_SUPER]) return;

          var objectRef = void 0;
          var getObjectRef = function getObjectRef() {
            return objectRef = objectRef || path.scope.generateUidIdentifier("obj");
          };

          var propPaths = path.get("properties");
          for (var _iterator = propPaths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
            var _ref2;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref2 = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref2 = _i.value;
            }

            var propPath = _ref2;

            if (propPath.isObjectProperty()) propPath = propPath.get("value");
            Property(propPath, propPath.node, path.scope, getObjectRef, file);
          }

          if (objectRef) {
            path.scope.push({ id: objectRef });
            path.replaceWith(t.assignmentExpression("=", objectRef, path.node));
          }
        }
      }
    }
  };
};

var _babelHelperReplaceSupers = require("babel-helper-replace-supers");

var _babelHelperReplaceSupers2 = _interopRequireDefault(_babelHelperReplaceSupers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187607);
})()
//# sourceMappingURL=index.js.map