module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577188964, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (context) {
  var plugin = {
    visitor: require("./visit").visitor
  };

  // Some presets manually call child presets, but fail to pass along the
  // context object. Out of an abundance of caution, we verify that it
  // exists first to avoid causing unnecessary breaking changes.
  var version = context && context.version;

  // The "name" property is not allowed in older versions of Babel (6.x)
  // and will cause the plugin validator to throw an exception.
  if (version && parseInt(version, 10) >= 7) {
    plugin.name = "regenerator-transform";
  }

  return plugin;
};
}, function(modId) {var map = {"./visit":1536577188965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188965, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _hoist = require("./hoist");

var _emit = require("./emit");

var _replaceShorthandObjectMethod = require("./replaceShorthandObjectMethod");

var _replaceShorthandObjectMethod2 = _interopRequireDefault(_replaceShorthandObjectMethod);

var _util = require("./util");

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.visitor = {
  Function: {
    exit: function exit(path, state) {
      var node = path.node;

      if (node.generator) {
        if (node.async) {
          // Async generator
          if (state.opts.asyncGenerators === false) return;
        } else {
          // Plain generator
          if (state.opts.generators === false) return;
        }
      } else if (node.async) {
        // Async function
        if (state.opts.async === false) return;
      } else {
        // Not a generator or async function.
        return;
      }

      // if this is an ObjectMethod, we need to convert it to an ObjectProperty
      path = (0, _replaceShorthandObjectMethod2.default)(path);
      node = path.node;

      var contextId = path.scope.generateUidIdentifier("context");
      var argsId = path.scope.generateUidIdentifier("args");

      path.ensureBlock();
      var bodyBlockPath = path.get("body");

      if (node.async) {
        bodyBlockPath.traverse(awaitVisitor);
      }

      bodyBlockPath.traverse(functionSentVisitor, {
        context: contextId
      });

      var outerBody = [];
      var innerBody = [];

      bodyBlockPath.get("body").forEach(function (childPath) {
        var node = childPath.node;
        if (t.isExpressionStatement(node) && t.isStringLiteral(node.expression)) {
          // Babylon represents directives like "use strict" as elements
          // of a bodyBlockPath.node.directives array, but they could just
          // as easily be represented (by other parsers) as traditional
          // string-literal-valued expression statements, so we need to
          // handle that here. (#248)
          outerBody.push(node);
        } else if (node && node._blockHoist != null) {
          outerBody.push(node);
        } else {
          innerBody.push(node);
        }
      });

      if (outerBody.length > 0) {
        // Only replace the inner body if we actually hoisted any statements
        // to the outer body.
        bodyBlockPath.node.body = innerBody;
      }

      var outerFnExpr = getOuterFnExpr(path);
      // Note that getOuterFnExpr has the side-effect of ensuring that the
      // function has a name (so node.id will always be an Identifier), even
      // if a temporary name has to be synthesized.
      t.assertIdentifier(node.id);
      var innerFnId = t.identifier(node.id.name + "$");

      // Turn all declarations into vars, and replace the original
      // declarations with equivalent assignment expressions.
      var vars = (0, _hoist.hoist)(path);

      var didRenameArguments = renameArguments(path, argsId);
      if (didRenameArguments) {
        vars = vars || t.variableDeclaration("var", []);
        var argumentIdentifier = t.identifier("arguments");
        // we need to do this as otherwise arguments in arrow functions gets hoisted
        argumentIdentifier._shadowedFunctionLiteral = path;
        vars.declarations.push(t.variableDeclarator(argsId, argumentIdentifier));
      }

      var emitter = new _emit.Emitter(contextId);
      emitter.explode(path.get("body"));

      if (vars && vars.declarations.length > 0) {
        outerBody.push(vars);
      }

      var wrapArgs = [emitter.getContextFunction(innerFnId),
      // Async functions that are not generators don't care about the
      // outer function because they don't need it to be marked and don't
      // inherit from its .prototype.
      node.generator ? outerFnExpr : t.nullLiteral(), t.thisExpression()];

      var tryLocsList = emitter.getTryLocsList();
      if (tryLocsList) {
        wrapArgs.push(tryLocsList);
      }

      var wrapCall = t.callExpression(util.runtimeProperty(node.async ? "async" : "wrap"), wrapArgs);

      outerBody.push(t.returnStatement(wrapCall));
      node.body = t.blockStatement(outerBody);

      var oldDirectives = bodyBlockPath.node.directives;
      if (oldDirectives) {
        // Babylon represents directives like "use strict" as elements of
        // a bodyBlockPath.node.directives array. (#248)
        node.body.directives = oldDirectives;
      }

      var wasGeneratorFunction = node.generator;
      if (wasGeneratorFunction) {
        node.generator = false;
      }

      if (node.async) {
        node.async = false;
      }

      if (wasGeneratorFunction && t.isExpression(node)) {
        util.replaceWithOrRemove(path, t.callExpression(util.runtimeProperty("mark"), [node]));
        path.addComment("leading", "#__PURE__");
      }

      // Generators are processed in 'exit' handlers so that regenerator only has to run on
      // an ES5 AST, but that means traversal will not pick up newly inserted references
      // to things like 'regeneratorRuntime'. To avoid this, we explicitly requeue.
      path.requeue();
    }
  }
};

// Given a NodePath for a Function, return an Expression node that can be
// used to refer reliably to the function object from inside the function.
// This expression is essentially a replacement for arguments.callee, with
// the key advantage that it works in strict mode.
function getOuterFnExpr(funPath) {
  var node = funPath.node;
  t.assertFunction(node);

  if (!node.id) {
    // Default-exported function declarations, and function expressions may not
    // have a name to reference, so we explicitly add one.
    node.id = funPath.scope.parent.generateUidIdentifier("callee");
  }

  if (node.generator && // Non-generator functions don't need to be marked.
  t.isFunctionDeclaration(node)) {
    // Return the identifier returned by runtime.mark(<node.id>).
    return getMarkedFunctionId(funPath);
  }

  return node.id;
}

var getMarkInfo = require("private").makeAccessor();

function getMarkedFunctionId(funPath) {
  var node = funPath.node;
  t.assertIdentifier(node.id);

  var blockPath = funPath.findParent(function (path) {
    return path.isProgram() || path.isBlockStatement();
  });

  if (!blockPath) {
    return node.id;
  }

  var block = blockPath.node;
  _assert2.default.ok(Array.isArray(block.body));

  var info = getMarkInfo(block);
  if (!info.decl) {
    info.decl = t.variableDeclaration("var", []);
    blockPath.unshiftContainer("body", info.decl);
    info.declPath = blockPath.get("body.0");
  }

  _assert2.default.strictEqual(info.declPath.node, info.decl);

  // Get a new unique identifier for our marked variable.
  var markedId = blockPath.scope.generateUidIdentifier("marked");
  var markCallExp = t.callExpression(util.runtimeProperty("mark"), [node.id]);

  var index = info.decl.declarations.push(t.variableDeclarator(markedId, markCallExp)) - 1;

  var markCallExpPath = info.declPath.get("declarations." + index + ".init");

  _assert2.default.strictEqual(markCallExpPath.node, markCallExp);

  markCallExpPath.addComment("leading", "#__PURE__");

  return markedId;
}

function renameArguments(funcPath, argsId) {
  var state = {
    didRenameArguments: false,
    argsId: argsId
  };

  funcPath.traverse(argumentsVisitor, state);

  // If the traversal replaced any arguments references, then we need to
  // alias the outer function's arguments binding (be it the implicit
  // arguments object or some other parameter or variable) to the variable
  // named by argsId.
  return state.didRenameArguments;
}

var argumentsVisitor = {
  "FunctionExpression|FunctionDeclaration": function FunctionExpressionFunctionDeclaration(path) {
    path.skip();
  },

  Identifier: function Identifier(path, state) {
    if (path.node.name === "arguments" && util.isReference(path)) {
      util.replaceWithOrRemove(path, state.argsId);
      state.didRenameArguments = true;
    }
  }
};

var functionSentVisitor = {
  MetaProperty: function MetaProperty(path) {
    var node = path.node;


    if (node.meta.name === "function" && node.property.name === "sent") {
      util.replaceWithOrRemove(path, t.memberExpression(this.context, t.identifier("_sent")));
    }
  }
};

var awaitVisitor = {
  Function: function Function(path) {
    path.skip(); // Don't descend into nested function scopes.
  },

  AwaitExpression: function AwaitExpression(path) {
    // Convert await expressions to yield expressions.
    var argument = path.node.argument;

    // Transforming `await x` to `yield regeneratorRuntime.awrap(x)`
    // causes the argument to be wrapped in such a way that the runtime
    // can distinguish between awaited and merely yielded values.
    util.replaceWithOrRemove(path, t.yieldExpression(t.callExpression(util.runtimeProperty("awrap"), [argument]), false));
  }
};
}, function(modId) { var map = {"./hoist":1536577188966,"./emit":1536577188968,"./replaceShorthandObjectMethod":1536577188971,"./util":1536577188967}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188966, function(require, module, exports) {
"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _util = require("./util");

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var hasOwn = Object.prototype.hasOwnProperty;

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
exports.hoist = function (funPath) {
  t.assertFunction(funPath.node);

  var vars = {};

  function varDeclToExpr(vdec, includeIdentifiers) {
    t.assertVariableDeclaration(vdec);
    // TODO assert.equal(vdec.kind, "var");
    var exprs = [];

    vdec.declarations.forEach(function (dec) {
      // Note: We duplicate 'dec.id' here to ensure that the variable declaration IDs don't
      // have the same 'loc' value, since that can make sourcemaps and retainLines behave poorly.
      vars[dec.id.name] = t.identifier(dec.id.name);

      if (dec.init) {
        exprs.push(t.assignmentExpression("=", dec.id, dec.init));
      } else if (includeIdentifiers) {
        exprs.push(dec.id);
      }
    });

    if (exprs.length === 0) return null;

    if (exprs.length === 1) return exprs[0];

    return t.sequenceExpression(exprs);
  }

  funPath.get("body").traverse({
    VariableDeclaration: {
      exit: function exit(path) {
        var expr = varDeclToExpr(path.node, false);
        if (expr === null) {
          path.remove();
        } else {
          // We don't need to traverse this expression any further because
          // there can't be any new declarations inside an expression.
          util.replaceWithOrRemove(path, t.expressionStatement(expr));
        }

        // Since the original node has been either removed or replaced,
        // avoid traversing it any further.
        path.skip();
      }
    },

    ForStatement: function ForStatement(path) {
      var init = path.node.init;
      if (t.isVariableDeclaration(init)) {
        util.replaceWithOrRemove(path.get("init"), varDeclToExpr(init, false));
      }
    },

    ForXStatement: function ForXStatement(path) {
      var left = path.get("left");
      if (left.isVariableDeclaration()) {
        util.replaceWithOrRemove(left, varDeclToExpr(left.node, true));
      }
    },

    FunctionDeclaration: function FunctionDeclaration(path) {
      var node = path.node;
      vars[node.id.name] = node.id;

      var assignment = t.expressionStatement(t.assignmentExpression("=", node.id, t.functionExpression(node.id, node.params, node.body, node.generator, node.expression)));

      if (path.parentPath.isBlockStatement()) {
        // Insert the assignment form before the first statement in the
        // enclosing block.
        path.parentPath.unshiftContainer("body", assignment);

        // Remove the function declaration now that we've inserted the
        // equivalent assignment form at the beginning of the block.
        path.remove();
      } else {
        // If the parent node is not a block statement, then we can just
        // replace the declaration with the equivalent assignment form
        // without worrying about hoisting it.
        util.replaceWithOrRemove(path, assignment);
      }

      // Don't hoist variables out of inner functions.
      path.skip();
    },

    FunctionExpression: function FunctionExpression(path) {
      // Don't descend into nested function expressions.
      path.skip();
    }
  });

  var paramNames = {};
  funPath.get("params").forEach(function (paramPath) {
    var param = paramPath.node;
    if (t.isIdentifier(param)) {
      paramNames[param.name] = param;
    } else {
      // Variables declared by destructuring parameter patterns will be
      // harmlessly re-declared.
    }
  });

  var declarations = [];

  (0, _keys2.default)(vars).forEach(function (name) {
    if (!hasOwn.call(paramNames, name)) {
      declarations.push(t.variableDeclarator(vars[name], null));
    }
  });

  if (declarations.length === 0) {
    return null; // Be sure to handle this case!
  }

  return t.variableDeclaration("var", declarations);
};
}, function(modId) { var map = {"./util":1536577188967}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188967, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.runtimeProperty = runtimeProperty;
exports.isReference = isReference;
exports.replaceWithOrRemove = replaceWithOrRemove;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function runtimeProperty(name) {
  return t.memberExpression(t.identifier("regeneratorRuntime"), t.identifier(name), false);
} /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */

function isReference(path) {
  return path.isReferenced() || path.parentPath.isAssignmentExpression({ left: path.node });
}

function replaceWithOrRemove(path, replacement) {
  if (replacement) {
    path.replaceWith(replacement);
  } else {
    path.remove();
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188968, function(require, module, exports) {
"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _leap = require("./leap");

var leap = _interopRequireWildcard(_leap);

var _meta = require("./meta");

var meta = _interopRequireWildcard(_meta);

var _util = require("./util");

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwn = Object.prototype.hasOwnProperty; /**
                                               * Copyright (c) 2014, Facebook, Inc.
                                               * All rights reserved.
                                               *
                                               * This source code is licensed under the BSD-style license found in the
                                               * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
                                               * additional grant of patent rights can be found in the PATENTS file in
                                               * the same directory.
                                               */

function Emitter(contextId) {
  _assert2.default.ok(this instanceof Emitter);
  t.assertIdentifier(contextId);

  // Used to generate unique temporary names.
  this.nextTempId = 0;

  // In order to make sure the context object does not collide with
  // anything in the local scope, we might have to rename it, so we
  // refer to it symbolically instead of just assuming that it will be
  // called "context".
  this.contextId = contextId;

  // An append-only list of Statements that grows each time this.emit is
  // called.
  this.listing = [];

  // A sparse array whose keys correspond to locations in this.listing
  // that have been marked as branch/jump targets.
  this.marked = [true];

  // The last location will be marked when this.getDispatchLoop is
  // called.
  this.finalLoc = loc();

  // A list of all leap.TryEntry statements emitted.
  this.tryEntries = [];

  // Each time we evaluate the body of a loop, we tell this.leapManager
  // to enter a nested loop context that determines the meaning of break
  // and continue statements therein.
  this.leapManager = new leap.LeapManager(this);
}

var Ep = Emitter.prototype;
exports.Emitter = Emitter;

// Offsets into this.listing that could be used as targets for branches or
// jumps are represented as numeric Literal nodes. This representation has
// the amazingly convenient benefit of allowing the exact value of the
// location to be determined at any time, even after generating code that
// refers to the location.
function loc() {
  return t.numericLiteral(-1);
}

// Sets the exact value of the given location to the offset of the next
// Statement emitted.
Ep.mark = function (loc) {
  t.assertLiteral(loc);
  var index = this.listing.length;
  if (loc.value === -1) {
    loc.value = index;
  } else {
    // Locations can be marked redundantly, but their values cannot change
    // once set the first time.
    _assert2.default.strictEqual(loc.value, index);
  }
  this.marked[index] = true;
  return loc;
};

Ep.emit = function (node) {
  if (t.isExpression(node)) {
    node = t.expressionStatement(node);
  }

  t.assertStatement(node);
  this.listing.push(node);
};

// Shorthand for emitting assignment statements. This will come in handy
// for assignments to temporary variables.
Ep.emitAssign = function (lhs, rhs) {
  this.emit(this.assign(lhs, rhs));
  return lhs;
};

// Shorthand for an assignment statement.
Ep.assign = function (lhs, rhs) {
  return t.expressionStatement(t.assignmentExpression("=", lhs, rhs));
};

// Convenience function for generating expressions like context.next,
// context.sent, and context.rval.
Ep.contextProperty = function (name, computed) {
  return t.memberExpression(this.contextId, computed ? t.stringLiteral(name) : t.identifier(name), !!computed);
};

// Shorthand for setting context.rval and jumping to `context.stop()`.
Ep.stop = function (rval) {
  if (rval) {
    this.setReturnValue(rval);
  }

  this.jump(this.finalLoc);
};

Ep.setReturnValue = function (valuePath) {
  t.assertExpression(valuePath.value);

  this.emitAssign(this.contextProperty("rval"), this.explodeExpression(valuePath));
};

Ep.clearPendingException = function (tryLoc, assignee) {
  t.assertLiteral(tryLoc);

  var catchCall = t.callExpression(this.contextProperty("catch", true), [tryLoc]);

  if (assignee) {
    this.emitAssign(assignee, catchCall);
  } else {
    this.emit(catchCall);
  }
};

// Emits code for an unconditional jump to the given location, even if the
// exact value of the location is not yet known.
Ep.jump = function (toLoc) {
  this.emitAssign(this.contextProperty("next"), toLoc);
  this.emit(t.breakStatement());
};

// Conditional jump.
Ep.jumpIf = function (test, toLoc) {
  t.assertExpression(test);
  t.assertLiteral(toLoc);

  this.emit(t.ifStatement(test, t.blockStatement([this.assign(this.contextProperty("next"), toLoc), t.breakStatement()])));
};

// Conditional jump, with the condition negated.
Ep.jumpIfNot = function (test, toLoc) {
  t.assertExpression(test);
  t.assertLiteral(toLoc);

  var negatedTest = void 0;
  if (t.isUnaryExpression(test) && test.operator === "!") {
    // Avoid double negation.
    negatedTest = test.argument;
  } else {
    negatedTest = t.unaryExpression("!", test);
  }

  this.emit(t.ifStatement(negatedTest, t.blockStatement([this.assign(this.contextProperty("next"), toLoc), t.breakStatement()])));
};

// Returns a unique MemberExpression that can be used to store and
// retrieve temporary values. Since the object of the member expression is
// the context object, which is presumed to coexist peacefully with all
// other local variables, and since we just increment `nextTempId`
// monotonically, uniqueness is assured.
Ep.makeTempVar = function () {
  return this.contextProperty("t" + this.nextTempId++);
};

Ep.getContextFunction = function (id) {
  return t.functionExpression(id || null /*Anonymous*/
  , [this.contextId], t.blockStatement([this.getDispatchLoop()]), false, // Not a generator anymore!
  false // Nor an expression.
  );
};

// Turns this.listing into a loop of the form
//
//   while (1) switch (context.next) {
//   case 0:
//   ...
//   case n:
//     return context.stop();
//   }
//
// Each marked location in this.listing will correspond to one generated
// case statement.
Ep.getDispatchLoop = function () {
  var self = this;
  var cases = [];
  var current = void 0;

  // If we encounter a break, continue, or return statement in a switch
  // case, we can skip the rest of the statements until the next case.
  var alreadyEnded = false;

  self.listing.forEach(function (stmt, i) {
    if (self.marked.hasOwnProperty(i)) {
      cases.push(t.switchCase(t.numericLiteral(i), current = []));
      alreadyEnded = false;
    }

    if (!alreadyEnded) {
      current.push(stmt);
      if (t.isCompletionStatement(stmt)) alreadyEnded = true;
    }
  });

  // Now that we know how many statements there will be in this.listing,
  // we can finally resolve this.finalLoc.value.
  this.finalLoc.value = this.listing.length;

  cases.push(t.switchCase(this.finalLoc, [
    // Intentionally fall through to the "end" case...
  ]),

  // So that the runtime can jump to the final location without having
  // to know its offset, we provide the "end" case as a synonym.
  t.switchCase(t.stringLiteral("end"), [
  // This will check/clear both context.thrown and context.rval.
  t.returnStatement(t.callExpression(this.contextProperty("stop"), []))]));

  return t.whileStatement(t.numericLiteral(1), t.switchStatement(t.assignmentExpression("=", this.contextProperty("prev"), this.contextProperty("next")), cases));
};

Ep.getTryLocsList = function () {
  if (this.tryEntries.length === 0) {
    // To avoid adding a needless [] to the majority of runtime.wrap
    // argument lists, force the caller to handle this case specially.
    return null;
  }

  var lastLocValue = 0;

  return t.arrayExpression(this.tryEntries.map(function (tryEntry) {
    var thisLocValue = tryEntry.firstLoc.value;
    _assert2.default.ok(thisLocValue >= lastLocValue, "try entries out of order");
    lastLocValue = thisLocValue;

    var ce = tryEntry.catchEntry;
    var fe = tryEntry.finallyEntry;

    var locs = [tryEntry.firstLoc,
    // The null here makes a hole in the array.
    ce ? ce.firstLoc : null];

    if (fe) {
      locs[2] = fe.firstLoc;
      locs[3] = fe.afterLoc;
    }

    return t.arrayExpression(locs);
  }));
};

// All side effects must be realized in order.

// If any subexpression harbors a leap, all subexpressions must be
// neutered of side effects.

// No destructive modification of AST nodes.

Ep.explode = function (path, ignoreResult) {
  var node = path.node;
  var self = this;

  t.assertNode(node);

  if (t.isDeclaration(node)) throw getDeclError(node);

  if (t.isStatement(node)) return self.explodeStatement(path);

  if (t.isExpression(node)) return self.explodeExpression(path, ignoreResult);

  switch (node.type) {
    case "Program":
      return path.get("body").map(self.explodeStatement, self);

    case "VariableDeclarator":
      throw getDeclError(node);

    // These node types should be handled by their parent nodes
    // (ObjectExpression, SwitchStatement, and TryStatement, respectively).
    case "Property":
    case "SwitchCase":
    case "CatchClause":
      throw new Error(node.type + " nodes should be handled by their parents");

    default:
      throw new Error("unknown Node of type " + (0, _stringify2.default)(node.type));
  }
};

function getDeclError(node) {
  return new Error("all declarations should have been transformed into " + "assignments before the Exploder began its work: " + (0, _stringify2.default)(node));
}

Ep.explodeStatement = function (path, labelId) {
  var stmt = path.node;
  var self = this;
  var before = void 0,
      after = void 0,
      head = void 0;

  t.assertStatement(stmt);

  if (labelId) {
    t.assertIdentifier(labelId);
  } else {
    labelId = null;
  }

  // Explode BlockStatement nodes even if they do not contain a yield,
  // because we don't want or need the curly braces.
  if (t.isBlockStatement(stmt)) {
    path.get("body").forEach(function (path) {
      self.explodeStatement(path);
    });
    return;
  }

  if (!meta.containsLeap(stmt)) {
    // Technically we should be able to avoid emitting the statement
    // altogether if !meta.hasSideEffects(stmt), but that leads to
    // confusing generated code (for instance, `while (true) {}` just
    // disappears) and is probably a more appropriate job for a dedicated
    // dead code elimination pass.
    self.emit(stmt);
    return;
  }

  switch (stmt.type) {
    case "ExpressionStatement":
      self.explodeExpression(path.get("expression"), true);
      break;

    case "LabeledStatement":
      after = loc();

      // Did you know you can break from any labeled block statement or
      // control structure? Well, you can! Note: when a labeled loop is
      // encountered, the leap.LabeledEntry created here will immediately
      // enclose a leap.LoopEntry on the leap manager's stack, and both
      // entries will have the same label. Though this works just fine, it
      // may seem a bit redundant. In theory, we could check here to
      // determine if stmt knows how to handle its own label; for example,
      // stmt happens to be a WhileStatement and so we know it's going to
      // establish its own LoopEntry when we explode it (below). Then this
      // LabeledEntry would be unnecessary. Alternatively, we might be
      // tempted not to pass stmt.label down into self.explodeStatement,
      // because we've handled the label here, but that's a mistake because
      // labeled loops may contain labeled continue statements, which is not
      // something we can handle in this generic case. All in all, I think a
      // little redundancy greatly simplifies the logic of this case, since
      // it's clear that we handle all possible LabeledStatements correctly
      // here, regardless of whether they interact with the leap manager
      // themselves. Also remember that labels and break/continue-to-label
      // statements are rare, and all of this logic happens at transform
      // time, so it has no additional runtime cost.
      self.leapManager.withEntry(new leap.LabeledEntry(after, stmt.label), function () {
        self.explodeStatement(path.get("body"), stmt.label);
      });

      self.mark(after);

      break;

    case "WhileStatement":
      before = loc();
      after = loc();

      self.mark(before);
      self.jumpIfNot(self.explodeExpression(path.get("test")), after);
      self.leapManager.withEntry(new leap.LoopEntry(after, before, labelId), function () {
        self.explodeStatement(path.get("body"));
      });
      self.jump(before);
      self.mark(after);

      break;

    case "DoWhileStatement":
      var first = loc();
      var test = loc();
      after = loc();

      self.mark(first);
      self.leapManager.withEntry(new leap.LoopEntry(after, test, labelId), function () {
        self.explode(path.get("body"));
      });
      self.mark(test);
      self.jumpIf(self.explodeExpression(path.get("test")), first);
      self.mark(after);

      break;

    case "ForStatement":
      head = loc();
      var update = loc();
      after = loc();

      if (stmt.init) {
        // We pass true here to indicate that if stmt.init is an expression
        // then we do not care about its result.
        self.explode(path.get("init"), true);
      }

      self.mark(head);

      if (stmt.test) {
        self.jumpIfNot(self.explodeExpression(path.get("test")), after);
      } else {
        // No test means continue unconditionally.
      }

      self.leapManager.withEntry(new leap.LoopEntry(after, update, labelId), function () {
        self.explodeStatement(path.get("body"));
      });

      self.mark(update);

      if (stmt.update) {
        // We pass true here to indicate that if stmt.update is an
        // expression then we do not care about its result.
        self.explode(path.get("update"), true);
      }

      self.jump(head);

      self.mark(after);

      break;

    case "TypeCastExpression":
      return self.explodeExpression(path.get("expression"));

    case "ForInStatement":
      head = loc();
      after = loc();

      var keyIterNextFn = self.makeTempVar();
      self.emitAssign(keyIterNextFn, t.callExpression(util.runtimeProperty("keys"), [self.explodeExpression(path.get("right"))]));

      self.mark(head);

      var keyInfoTmpVar = self.makeTempVar();
      self.jumpIf(t.memberExpression(t.assignmentExpression("=", keyInfoTmpVar, t.callExpression(keyIterNextFn, [])), t.identifier("done"), false), after);

      self.emitAssign(stmt.left, t.memberExpression(keyInfoTmpVar, t.identifier("value"), false));

      self.leapManager.withEntry(new leap.LoopEntry(after, head, labelId), function () {
        self.explodeStatement(path.get("body"));
      });

      self.jump(head);

      self.mark(after);

      break;

    case "BreakStatement":
      self.emitAbruptCompletion({
        type: "break",
        target: self.leapManager.getBreakLoc(stmt.label)
      });

      break;

    case "ContinueStatement":
      self.emitAbruptCompletion({
        type: "continue",
        target: self.leapManager.getContinueLoc(stmt.label)
      });

      break;

    case "SwitchStatement":
      // Always save the discriminant into a temporary variable in case the
      // test expressions overwrite values like context.sent.
      var disc = self.emitAssign(self.makeTempVar(), self.explodeExpression(path.get("discriminant")));

      after = loc();
      var defaultLoc = loc();
      var condition = defaultLoc;
      var caseLocs = [];

      // If there are no cases, .cases might be undefined.
      var cases = stmt.cases || [];

      for (var i = cases.length - 1; i >= 0; --i) {
        var c = cases[i];
        t.assertSwitchCase(c);

        if (c.test) {
          condition = t.conditionalExpression(t.binaryExpression("===", disc, c.test), caseLocs[i] = loc(), condition);
        } else {
          caseLocs[i] = defaultLoc;
        }
      }

      var discriminant = path.get("discriminant");
      util.replaceWithOrRemove(discriminant, condition);
      self.jump(self.explodeExpression(discriminant));

      self.leapManager.withEntry(new leap.SwitchEntry(after), function () {
        path.get("cases").forEach(function (casePath) {
          var i = casePath.key;
          self.mark(caseLocs[i]);

          casePath.get("consequent").forEach(function (path) {
            self.explodeStatement(path);
          });
        });
      });

      self.mark(after);
      if (defaultLoc.value === -1) {
        self.mark(defaultLoc);
        _assert2.default.strictEqual(after.value, defaultLoc.value);
      }

      break;

    case "IfStatement":
      var elseLoc = stmt.alternate && loc();
      after = loc();

      self.jumpIfNot(self.explodeExpression(path.get("test")), elseLoc || after);

      self.explodeStatement(path.get("consequent"));

      if (elseLoc) {
        self.jump(after);
        self.mark(elseLoc);
        self.explodeStatement(path.get("alternate"));
      }

      self.mark(after);

      break;

    case "ReturnStatement":
      self.emitAbruptCompletion({
        type: "return",
        value: self.explodeExpression(path.get("argument"))
      });

      break;

    case "WithStatement":
      throw new Error("WithStatement not supported in generator functions.");

    case "TryStatement":
      after = loc();

      var handler = stmt.handler;

      var catchLoc = handler && loc();
      var catchEntry = catchLoc && new leap.CatchEntry(catchLoc, handler.param);

      var finallyLoc = stmt.finalizer && loc();
      var finallyEntry = finallyLoc && new leap.FinallyEntry(finallyLoc, after);

      var tryEntry = new leap.TryEntry(self.getUnmarkedCurrentLoc(), catchEntry, finallyEntry);

      self.tryEntries.push(tryEntry);
      self.updateContextPrevLoc(tryEntry.firstLoc);

      self.leapManager.withEntry(tryEntry, function () {
        self.explodeStatement(path.get("block"));

        if (catchLoc) {
          if (finallyLoc) {
            // If we have both a catch block and a finally block, then
            // because we emit the catch block first, we need to jump over
            // it to the finally block.
            self.jump(finallyLoc);
          } else {
            // If there is no finally block, then we need to jump over the
            // catch block to the fall-through location.
            self.jump(after);
          }

          self.updateContextPrevLoc(self.mark(catchLoc));

          var bodyPath = path.get("handler.body");
          var safeParam = self.makeTempVar();
          self.clearPendingException(tryEntry.firstLoc, safeParam);

          bodyPath.traverse(catchParamVisitor, {
            safeParam: safeParam,
            catchParamName: handler.param.name
          });

          self.leapManager.withEntry(catchEntry, function () {
            self.explodeStatement(bodyPath);
          });
        }

        if (finallyLoc) {
          self.updateContextPrevLoc(self.mark(finallyLoc));

          self.leapManager.withEntry(finallyEntry, function () {
            self.explodeStatement(path.get("finalizer"));
          });

          self.emit(t.returnStatement(t.callExpression(self.contextProperty("finish"), [finallyEntry.firstLoc])));
        }
      });

      self.mark(after);

      break;

    case "ThrowStatement":
      self.emit(t.throwStatement(self.explodeExpression(path.get("argument"))));

      break;

    default:
      throw new Error("unknown Statement of type " + (0, _stringify2.default)(stmt.type));
  }
};

var catchParamVisitor = {
  Identifier: function Identifier(path, state) {
    if (path.node.name === state.catchParamName && util.isReference(path)) {
      util.replaceWithOrRemove(path, state.safeParam);
    }
  },

  Scope: function Scope(path, state) {
    if (path.scope.hasOwnBinding(state.catchParamName)) {
      // Don't descend into nested scopes that shadow the catch
      // parameter with their own declarations.
      path.skip();
    }
  }
};

Ep.emitAbruptCompletion = function (record) {
  if (!isValidCompletion(record)) {
    _assert2.default.ok(false, "invalid completion record: " + (0, _stringify2.default)(record));
  }

  _assert2.default.notStrictEqual(record.type, "normal", "normal completions are not abrupt");

  var abruptArgs = [t.stringLiteral(record.type)];

  if (record.type === "break" || record.type === "continue") {
    t.assertLiteral(record.target);
    abruptArgs[1] = record.target;
  } else if (record.type === "return" || record.type === "throw") {
    if (record.value) {
      t.assertExpression(record.value);
      abruptArgs[1] = record.value;
    }
  }

  this.emit(t.returnStatement(t.callExpression(this.contextProperty("abrupt"), abruptArgs)));
};

function isValidCompletion(record) {
  var type = record.type;

  if (type === "normal") {
    return !hasOwn.call(record, "target");
  }

  if (type === "break" || type === "continue") {
    return !hasOwn.call(record, "value") && t.isLiteral(record.target);
  }

  if (type === "return" || type === "throw") {
    return hasOwn.call(record, "value") && !hasOwn.call(record, "target");
  }

  return false;
}

// Not all offsets into emitter.listing are potential jump targets. For
// example, execution typically falls into the beginning of a try block
// without jumping directly there. This method returns the current offset
// without marking it, so that a switch case will not necessarily be
// generated for this offset (I say "not necessarily" because the same
// location might end up being marked in the process of emitting other
// statements). There's no logical harm in marking such locations as jump
// targets, but minimizing the number of switch cases keeps the generated
// code shorter.
Ep.getUnmarkedCurrentLoc = function () {
  return t.numericLiteral(this.listing.length);
};

// The context.prev property takes the value of context.next whenever we
// evaluate the switch statement discriminant, which is generally good
// enough for tracking the last location we jumped to, but sometimes
// context.prev needs to be more precise, such as when we fall
// successfully out of a try block and into a finally block without
// jumping. This method exists to update context.prev to the freshest
// available location. If we were implementing a full interpreter, we
// would know the location of the current instruction with complete
// precision at all times, but we don't have that luxury here, as it would
// be costly and verbose to set context.prev before every statement.
Ep.updateContextPrevLoc = function (loc) {
  if (loc) {
    t.assertLiteral(loc);

    if (loc.value === -1) {
      // If an uninitialized location literal was passed in, set its value
      // to the current this.listing.length.
      loc.value = this.listing.length;
    } else {
      // Otherwise assert that the location matches the current offset.
      _assert2.default.strictEqual(loc.value, this.listing.length);
    }
  } else {
    loc = this.getUnmarkedCurrentLoc();
  }

  // Make sure context.prev is up to date in case we fell into this try
  // statement without jumping to it. TODO Consider avoiding this
  // assignment when we know control must have jumped here.
  this.emitAssign(this.contextProperty("prev"), loc);
};

Ep.explodeExpression = function (path, ignoreResult) {
  var expr = path.node;
  if (expr) {
    t.assertExpression(expr);
  } else {
    return expr;
  }

  var self = this;
  var result = void 0; // Used optionally by several cases below.
  var after = void 0;

  function finish(expr) {
    t.assertExpression(expr);
    if (ignoreResult) {
      self.emit(expr);
    } else {
      return expr;
    }
  }

  // If the expression does not contain a leap, then we either emit the
  // expression as a standalone statement or return it whole.
  if (!meta.containsLeap(expr)) {
    return finish(expr);
  }

  // If any child contains a leap (such as a yield or labeled continue or
  // break statement), then any sibling subexpressions will almost
  // certainly have to be exploded in order to maintain the order of their
  // side effects relative to the leaping child(ren).
  var hasLeapingChildren = meta.containsLeap.onlyChildren(expr);

  // In order to save the rest of explodeExpression from a combinatorial
  // trainwreck of special cases, explodeViaTempVar is responsible for
  // deciding when a subexpression needs to be "exploded," which is my
  // very technical term for emitting the subexpression as an assignment
  // to a temporary variable and the substituting the temporary variable
  // for the original subexpression. Think of exploded view diagrams, not
  // Michael Bay movies. The point of exploding subexpressions is to
  // control the precise order in which the generated code realizes the
  // side effects of those subexpressions.
  function explodeViaTempVar(tempVar, childPath, ignoreChildResult) {
    _assert2.default.ok(!ignoreChildResult || !tempVar, "Ignoring the result of a child expression but forcing it to " + "be assigned to a temporary variable?");

    var result = self.explodeExpression(childPath, ignoreChildResult);

    if (ignoreChildResult) {
      // Side effects already emitted above.

    } else if (tempVar || hasLeapingChildren && !t.isLiteral(result)) {
      // If tempVar was provided, then the result will always be assigned
      // to it, even if the result does not otherwise need to be assigned
      // to a temporary variable.  When no tempVar is provided, we have
      // the flexibility to decide whether a temporary variable is really
      // necessary.  Unfortunately, in general, a temporary variable is
      // required whenever any child contains a yield expression, since it
      // is difficult to prove (at all, let alone efficiently) whether
      // this result would evaluate to the same value before and after the
      // yield (see #206).  One narrow case where we can prove it doesn't
      // matter (and thus we do not need a temporary variable) is when the
      // result in question is a Literal value.
      result = self.emitAssign(tempVar || self.makeTempVar(), result);
    }
    return result;
  }

  // If ignoreResult is true, then we must take full responsibility for
  // emitting the expression with all its side effects, and we should not
  // return a result.

  switch (expr.type) {
    case "MemberExpression":
      return finish(t.memberExpression(self.explodeExpression(path.get("object")), expr.computed ? explodeViaTempVar(null, path.get("property")) : expr.property, expr.computed));

    case "CallExpression":
      var calleePath = path.get("callee");
      var argsPath = path.get("arguments");

      var newCallee = void 0;
      var newArgs = [];

      var hasLeapingArgs = false;
      argsPath.forEach(function (argPath) {
        hasLeapingArgs = hasLeapingArgs || meta.containsLeap(argPath.node);
      });

      if (t.isMemberExpression(calleePath.node)) {
        if (hasLeapingArgs) {
          // If the arguments of the CallExpression contained any yield
          // expressions, then we need to be sure to evaluate the callee
          // before evaluating the arguments, but if the callee was a member
          // expression, then we must be careful that the object of the
          // member expression still gets bound to `this` for the call.

          var newObject = explodeViaTempVar(
          // Assign the exploded callee.object expression to a temporary
          // variable so that we can use it twice without reevaluating it.
          self.makeTempVar(), calleePath.get("object"));

          var newProperty = calleePath.node.computed ? explodeViaTempVar(null, calleePath.get("property")) : calleePath.node.property;

          newArgs.unshift(newObject);

          newCallee = t.memberExpression(t.memberExpression(newObject, newProperty, calleePath.node.computed), t.identifier("call"), false);
        } else {
          newCallee = self.explodeExpression(calleePath);
        }
      } else {
        newCallee = explodeViaTempVar(null, calleePath);

        if (t.isMemberExpression(newCallee)) {
          // If the callee was not previously a MemberExpression, then the
          // CallExpression was "unqualified," meaning its `this` object
          // should be the global object. If the exploded expression has
          // become a MemberExpression (e.g. a context property, probably a
          // temporary variable), then we need to force it to be unqualified
          // by using the (0, object.property)(...) trick; otherwise, it
          // will receive the object of the MemberExpression as its `this`
          // object.
          newCallee = t.sequenceExpression([t.numericLiteral(0), newCallee]);
        }
      }

      argsPath.forEach(function (argPath) {
        newArgs.push(explodeViaTempVar(null, argPath));
      });

      return finish(t.callExpression(newCallee, newArgs));

    case "NewExpression":
      return finish(t.newExpression(explodeViaTempVar(null, path.get("callee")), path.get("arguments").map(function (argPath) {
        return explodeViaTempVar(null, argPath);
      })));

    case "ObjectExpression":
      return finish(t.objectExpression(path.get("properties").map(function (propPath) {
        if (propPath.isObjectProperty()) {
          return t.objectProperty(propPath.node.key, explodeViaTempVar(null, propPath.get("value")), propPath.node.computed);
        } else {
          return propPath.node;
        }
      })));

    case "ArrayExpression":
      return finish(t.arrayExpression(path.get("elements").map(function (elemPath) {
        return explodeViaTempVar(null, elemPath);
      })));

    case "SequenceExpression":
      var lastIndex = expr.expressions.length - 1;

      path.get("expressions").forEach(function (exprPath) {
        if (exprPath.key === lastIndex) {
          result = self.explodeExpression(exprPath, ignoreResult);
        } else {
          self.explodeExpression(exprPath, true);
        }
      });

      return result;

    case "LogicalExpression":
      after = loc();

      if (!ignoreResult) {
        result = self.makeTempVar();
      }

      var left = explodeViaTempVar(result, path.get("left"));

      if (expr.operator === "&&") {
        self.jumpIfNot(left, after);
      } else {
        _assert2.default.strictEqual(expr.operator, "||");
        self.jumpIf(left, after);
      }

      explodeViaTempVar(result, path.get("right"), ignoreResult);

      self.mark(after);

      return result;

    case "ConditionalExpression":
      var elseLoc = loc();
      after = loc();
      var test = self.explodeExpression(path.get("test"));

      self.jumpIfNot(test, elseLoc);

      if (!ignoreResult) {
        result = self.makeTempVar();
      }

      explodeViaTempVar(result, path.get("consequent"), ignoreResult);
      self.jump(after);

      self.mark(elseLoc);
      explodeViaTempVar(result, path.get("alternate"), ignoreResult);

      self.mark(after);

      return result;

    case "UnaryExpression":
      return finish(t.unaryExpression(expr.operator,
      // Can't (and don't need to) break up the syntax of the argument.
      // Think about delete a[b].
      self.explodeExpression(path.get("argument")), !!expr.prefix));

    case "BinaryExpression":
      return finish(t.binaryExpression(expr.operator, explodeViaTempVar(null, path.get("left")), explodeViaTempVar(null, path.get("right"))));

    case "AssignmentExpression":
      return finish(t.assignmentExpression(expr.operator, self.explodeExpression(path.get("left")), self.explodeExpression(path.get("right"))));

    case "UpdateExpression":
      return finish(t.updateExpression(expr.operator, self.explodeExpression(path.get("argument")), expr.prefix));

    case "YieldExpression":
      after = loc();
      var arg = expr.argument && self.explodeExpression(path.get("argument"));

      if (arg && expr.delegate) {
        var _result = self.makeTempVar();

        self.emit(t.returnStatement(t.callExpression(self.contextProperty("delegateYield"), [arg, t.stringLiteral(_result.property.name), after])));

        self.mark(after);

        return _result;
      }

      self.emitAssign(self.contextProperty("next"), after);
      self.emit(t.returnStatement(arg || null));
      self.mark(after);

      return self.contextProperty("sent");

    default:
      throw new Error("unknown Expression of type " + (0, _stringify2.default)(expr.type));
  }
};
}, function(modId) { var map = {"./leap":1536577188969,"./meta":1536577188970,"./util":1536577188967}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188969, function(require, module, exports) {
"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _util = require("util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Entry() {
  _assert2.default.ok(this instanceof Entry);
} /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */

function FunctionEntry(returnLoc) {
  Entry.call(this);
  t.assertLiteral(returnLoc);
  this.returnLoc = returnLoc;
}

(0, _util.inherits)(FunctionEntry, Entry);
exports.FunctionEntry = FunctionEntry;

function LoopEntry(breakLoc, continueLoc, label) {
  Entry.call(this);

  t.assertLiteral(breakLoc);
  t.assertLiteral(continueLoc);

  if (label) {
    t.assertIdentifier(label);
  } else {
    label = null;
  }

  this.breakLoc = breakLoc;
  this.continueLoc = continueLoc;
  this.label = label;
}

(0, _util.inherits)(LoopEntry, Entry);
exports.LoopEntry = LoopEntry;

function SwitchEntry(breakLoc) {
  Entry.call(this);
  t.assertLiteral(breakLoc);
  this.breakLoc = breakLoc;
}

(0, _util.inherits)(SwitchEntry, Entry);
exports.SwitchEntry = SwitchEntry;

function TryEntry(firstLoc, catchEntry, finallyEntry) {
  Entry.call(this);

  t.assertLiteral(firstLoc);

  if (catchEntry) {
    _assert2.default.ok(catchEntry instanceof CatchEntry);
  } else {
    catchEntry = null;
  }

  if (finallyEntry) {
    _assert2.default.ok(finallyEntry instanceof FinallyEntry);
  } else {
    finallyEntry = null;
  }

  // Have to have one or the other (or both).
  _assert2.default.ok(catchEntry || finallyEntry);

  this.firstLoc = firstLoc;
  this.catchEntry = catchEntry;
  this.finallyEntry = finallyEntry;
}

(0, _util.inherits)(TryEntry, Entry);
exports.TryEntry = TryEntry;

function CatchEntry(firstLoc, paramId) {
  Entry.call(this);

  t.assertLiteral(firstLoc);
  t.assertIdentifier(paramId);

  this.firstLoc = firstLoc;
  this.paramId = paramId;
}

(0, _util.inherits)(CatchEntry, Entry);
exports.CatchEntry = CatchEntry;

function FinallyEntry(firstLoc, afterLoc) {
  Entry.call(this);
  t.assertLiteral(firstLoc);
  t.assertLiteral(afterLoc);
  this.firstLoc = firstLoc;
  this.afterLoc = afterLoc;
}

(0, _util.inherits)(FinallyEntry, Entry);
exports.FinallyEntry = FinallyEntry;

function LabeledEntry(breakLoc, label) {
  Entry.call(this);

  t.assertLiteral(breakLoc);
  t.assertIdentifier(label);

  this.breakLoc = breakLoc;
  this.label = label;
}

(0, _util.inherits)(LabeledEntry, Entry);
exports.LabeledEntry = LabeledEntry;

function LeapManager(emitter) {
  _assert2.default.ok(this instanceof LeapManager);

  var Emitter = require("./emit").Emitter;
  _assert2.default.ok(emitter instanceof Emitter);

  this.emitter = emitter;
  this.entryStack = [new FunctionEntry(emitter.finalLoc)];
}

var LMp = LeapManager.prototype;
exports.LeapManager = LeapManager;

LMp.withEntry = function (entry, callback) {
  _assert2.default.ok(entry instanceof Entry);
  this.entryStack.push(entry);
  try {
    callback.call(this.emitter);
  } finally {
    var popped = this.entryStack.pop();
    _assert2.default.strictEqual(popped, entry);
  }
};

LMp._findLeapLocation = function (property, label) {
  for (var i = this.entryStack.length - 1; i >= 0; --i) {
    var entry = this.entryStack[i];
    var loc = entry[property];
    if (loc) {
      if (label) {
        if (entry.label && entry.label.name === label.name) {
          return loc;
        }
      } else if (entry instanceof LabeledEntry) {
        // Ignore LabeledEntry entries unless we are actually breaking to
        // a label.
      } else {
        return loc;
      }
    }
  }

  return null;
};

LMp.getBreakLoc = function (label) {
  return this._findLeapLocation("breakLoc", label);
};

LMp.getContinueLoc = function (label) {
  return this._findLeapLocation("continueLoc", label);
};
}, function(modId) { var map = {"util":1536577188967,"./emit":1536577188968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188970, function(require, module, exports) {
"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var m = require("private").makeAccessor(); /**
                                            * Copyright (c) 2014, Facebook, Inc.
                                            * All rights reserved.
                                            *
                                            * This source code is licensed under the BSD-style license found in the
                                            * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
                                            * additional grant of patent rights can be found in the PATENTS file in
                                            * the same directory.
                                            */

var hasOwn = Object.prototype.hasOwnProperty;

function makePredicate(propertyName, knownTypes) {
  function onlyChildren(node) {
    t.assertNode(node);

    // Assume no side effects until we find out otherwise.
    var result = false;

    function check(child) {
      if (result) {
        // Do nothing.
      } else if (Array.isArray(child)) {
        child.some(check);
      } else if (t.isNode(child)) {
        _assert2.default.strictEqual(result, false);
        result = predicate(child);
      }
      return result;
    }

    var keys = t.VISITOR_KEYS[node.type];
    if (keys) {
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var child = node[key];
        check(child);
      }
    }

    return result;
  }

  function predicate(node) {
    t.assertNode(node);

    var meta = m(node);
    if (hasOwn.call(meta, propertyName)) return meta[propertyName];

    // Certain types are "opaque," which means they have no side
    // effects or leaps and we don't care about their subexpressions.
    if (hasOwn.call(opaqueTypes, node.type)) return meta[propertyName] = false;

    if (hasOwn.call(knownTypes, node.type)) return meta[propertyName] = true;

    return meta[propertyName] = onlyChildren(node);
  }

  predicate.onlyChildren = onlyChildren;

  return predicate;
}

var opaqueTypes = {
  FunctionExpression: true,
  ArrowFunctionExpression: true
};

// These types potentially have side effects regardless of what side
// effects their subexpressions have.
var sideEffectTypes = {
  CallExpression: true, // Anything could happen!
  ForInStatement: true, // Modifies the key variable.
  UnaryExpression: true, // Think delete.
  BinaryExpression: true, // Might invoke .toString() or .valueOf().
  AssignmentExpression: true, // Side-effecting by definition.
  UpdateExpression: true, // Updates are essentially assignments.
  NewExpression: true // Similar to CallExpression.
};

// These types are the direct cause of all leaps in control flow.
var leapTypes = {
  YieldExpression: true,
  BreakStatement: true,
  ContinueStatement: true,
  ReturnStatement: true,
  ThrowStatement: true
};

// All leap types are also side effect types.
for (var type in leapTypes) {
  if (hasOwn.call(leapTypes, type)) {
    sideEffectTypes[type] = leapTypes[type];
  }
}

exports.hasSideEffects = makePredicate("hasSideEffects", sideEffectTypes);
exports.containsLeap = makePredicate("containsLeap", leapTypes);
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188971, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.default = replaceShorthandObjectMethod;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _util = require("./util");

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// this function converts a shorthand object generator method into a normal
// (non-shorthand) object property which is a generator function expression. for
// example, this:
//
//  var foo = {
//    *bar(baz) { return 5; }
//  }
//
// should be replaced with:
//
//  var foo = {
//    bar: function*(baz) { return 5; }
//  }
//
// to do this, it clones the parameter array and the body of the object generator
// method into a new FunctionExpression.
//
// this method can be passed any Function AST node path, and it will return
// either:
//   a) the path that was passed in (iff the path did not need to be replaced) or
//   b) the path of the new FunctionExpression that was created as a replacement
//     (iff the path did need to be replaced)
//
// In either case, though, the caller can count on the fact that the return value
// is a Function AST node path.
//
// If this function is called with an AST node path that is not a Function (or with an
// argument that isn't an AST node path), it will throw an error.
function replaceShorthandObjectMethod(path) {
  if (!path.node || !t.isFunction(path.node)) {
    throw new Error("replaceShorthandObjectMethod can only be called on Function AST node paths.");
  }

  // this function only replaces shorthand object methods (called ObjectMethod
  // in Babel-speak).
  if (!t.isObjectMethod(path.node)) {
    return path;
  }

  // this function only replaces generators.
  if (!path.node.generator) {
    return path;
  }

  var parameters = path.node.params.map(function (param) {
    return t.cloneDeep(param);
  });

  var functionExpression = t.functionExpression(null, // id
  parameters, // params
  t.cloneDeep(path.node.body), // body
  path.node.generator, path.node.async);

  util.replaceWithOrRemove(path, t.objectProperty(t.cloneDeep(path.node.key), // key
  functionExpression, //value
  path.node.computed, // computed
  false // shorthand
  ));

  // path now refers to the ObjectProperty AST node path, but we want to return a
  // Function AST node path for the function expression we created. we know that
  // the FunctionExpression we just created is the value of the ObjectProperty,
  // so return the "value" path off of this path.
  return path.get("value");
}
}, function(modId) { var map = {"./util":1536577188967}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577188964);
})()
//# sourceMappingURL=index.js.map