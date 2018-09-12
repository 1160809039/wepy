module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187600, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var messages = _ref.messages,
      template = _ref.template,
      t = _ref.types;

  var buildForOfArray = template("\n    for (var KEY = 0; KEY < ARR.length; KEY++) BODY;\n  ");

  var buildForOfLoose = template("\n    for (var LOOP_OBJECT = OBJECT,\n             IS_ARRAY = Array.isArray(LOOP_OBJECT),\n             INDEX = 0,\n             LOOP_OBJECT = IS_ARRAY ? LOOP_OBJECT : LOOP_OBJECT[Symbol.iterator]();;) {\n      var ID;\n      if (IS_ARRAY) {\n        if (INDEX >= LOOP_OBJECT.length) break;\n        ID = LOOP_OBJECT[INDEX++];\n      } else {\n        INDEX = LOOP_OBJECT.next();\n        if (INDEX.done) break;\n        ID = INDEX.value;\n      }\n    }\n  ");

  var buildForOf = template("\n    var ITERATOR_COMPLETION = true;\n    var ITERATOR_HAD_ERROR_KEY = false;\n    var ITERATOR_ERROR_KEY = undefined;\n    try {\n      for (var ITERATOR_KEY = OBJECT[Symbol.iterator](), STEP_KEY; !(ITERATOR_COMPLETION = (STEP_KEY = ITERATOR_KEY.next()).done); ITERATOR_COMPLETION = true) {\n      }\n    } catch (err) {\n      ITERATOR_HAD_ERROR_KEY = true;\n      ITERATOR_ERROR_KEY = err;\n    } finally {\n      try {\n        if (!ITERATOR_COMPLETION && ITERATOR_KEY.return) {\n          ITERATOR_KEY.return();\n        }\n      } finally {\n        if (ITERATOR_HAD_ERROR_KEY) {\n          throw ITERATOR_ERROR_KEY;\n        }\n      }\n    }\n  ");


  function _ForOfStatementArray(path) {
    var node = path.node,
        scope = path.scope;

    var nodes = [];
    var right = node.right;

    if (!t.isIdentifier(right) || !scope.hasBinding(right.name)) {
      var uid = scope.generateUidIdentifier("arr");
      nodes.push(t.variableDeclaration("var", [t.variableDeclarator(uid, right)]));
      right = uid;
    }

    var iterationKey = scope.generateUidIdentifier("i");

    var loop = buildForOfArray({
      BODY: node.body,
      KEY: iterationKey,
      ARR: right
    });

    t.inherits(loop, node);
    t.ensureBlock(loop);

    var iterationValue = t.memberExpression(right, iterationKey, true);

    var left = node.left;
    if (t.isVariableDeclaration(left)) {
      left.declarations[0].init = iterationValue;
      loop.body.body.unshift(left);
    } else {
      loop.body.body.unshift(t.expressionStatement(t.assignmentExpression("=", left, iterationValue)));
    }

    if (path.parentPath.isLabeledStatement()) {
      loop = t.labeledStatement(path.parentPath.node.label, loop);
    }

    nodes.push(loop);

    return nodes;
  }

  return {
    visitor: {
      ForOfStatement: function ForOfStatement(path, state) {
        if (path.get("right").isArrayExpression()) {
          if (path.parentPath.isLabeledStatement()) {
            return path.parentPath.replaceWithMultiple(_ForOfStatementArray(path));
          } else {
            return path.replaceWithMultiple(_ForOfStatementArray(path));
          }
        }

        var callback = spec;
        if (state.opts.loose) callback = loose;

        var node = path.node;

        var build = callback(path, state);
        var declar = build.declar;
        var loop = build.loop;
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
    }
  };

  function loose(path, file) {
    var node = path.node,
        scope = path.scope,
        parent = path.parent;
    var left = node.left;

    var declar = void 0,
        id = void 0;

    if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
      id = left;
    } else if (t.isVariableDeclaration(left)) {
      id = scope.generateUidIdentifier("ref");
      declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, id)]);
    } else {
      throw file.buildCodeFrameError(left, messages.get("unknownForHead", left.type));
    }

    var iteratorKey = scope.generateUidIdentifier("iterator");
    var isArrayKey = scope.generateUidIdentifier("isArray");

    var loop = buildForOfLoose({
      LOOP_OBJECT: iteratorKey,
      IS_ARRAY: isArrayKey,
      OBJECT: node.right,
      INDEX: scope.generateUidIdentifier("i"),
      ID: id
    });

    if (!declar) {
      loop.body.body.shift();
    }

    var isLabeledParent = t.isLabeledStatement(parent);
    var labeled = void 0;

    if (isLabeledParent) {
      labeled = t.labeledStatement(parent.label, loop);
    }

    return {
      replaceParent: isLabeledParent,
      declar: declar,
      node: labeled || loop,
      loop: loop
    };
  }

  function spec(path, file) {
    var node = path.node,
        scope = path.scope,
        parent = path.parent;

    var left = node.left;
    var declar = void 0;

    var stepKey = scope.generateUidIdentifier("step");
    var stepValue = t.memberExpression(stepKey, t.identifier("value"));

    if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
      declar = t.expressionStatement(t.assignmentExpression("=", left, stepValue));
    } else if (t.isVariableDeclaration(left)) {
      declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, stepValue)]);
    } else {
      throw file.buildCodeFrameError(left, messages.get("unknownForHead", left.type));
    }

    var iteratorKey = scope.generateUidIdentifier("iterator");

    var template = buildForOf({
      ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
      ITERATOR_COMPLETION: scope.generateUidIdentifier("iteratorNormalCompletion"),
      ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
      ITERATOR_KEY: iteratorKey,
      STEP_KEY: stepKey,
      OBJECT: node.right,
      BODY: null
    });

    var isLabeledParent = t.isLabeledStatement(parent);

    var tryBody = template[3].block.body;
    var loop = tryBody[0];

    if (isLabeledParent) {
      tryBody[0] = t.labeledStatement(parent.label, loop);
    }

    return {
      replaceParent: isLabeledParent,
      declar: declar,
      loop: loop,
      node: template
    };
  }
};

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187600);
})()
//# sourceMappingURL=index.js.map