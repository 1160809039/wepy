module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187662, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.createTypeAnnotationBasedOnTypeof = exports.removeTypeDuplicates = exports.createUnionTypeAnnotation = exports.valueToNode = exports.toBlock = exports.toExpression = exports.toStatement = exports.toBindingIdentifierName = exports.toIdentifier = exports.toKeyAlias = exports.toSequenceExpression = exports.toComputedKey = exports.isNodesEquivalent = exports.isImmutable = exports.isScope = exports.isSpecifierDefault = exports.isVar = exports.isBlockScoped = exports.isLet = exports.isValidIdentifier = exports.isReferenced = exports.isBinding = exports.getOuterBindingIdentifiers = exports.getBindingIdentifiers = exports.TYPES = exports.react = exports.DEPRECATED_KEYS = exports.BUILDER_KEYS = exports.NODE_FIELDS = exports.ALIAS_KEYS = exports.VISITOR_KEYS = exports.NOT_LOCAL_BINDING = exports.BLOCK_SCOPED_SYMBOL = exports.INHERIT_KEYS = exports.UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = exports.NUMBER_UNARY_OPERATORS = exports.BOOLEAN_UNARY_OPERATORS = exports.BINARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = exports.EQUALITY_BINARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = exports.UPDATE_OPERATORS = exports.LOGICAL_OPERATORS = exports.COMMENT_KEYS = exports.FOR_INIT_KEYS = exports.FLATTENABLE_KEYS = exports.STATEMENT_OR_BLOCK_KEYS = undefined;

var _getOwnPropertySymbols = require("babel-runtime/core-js/object/get-own-property-symbols");

var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _constants = require("./constants");

Object.defineProperty(exports, "STATEMENT_OR_BLOCK_KEYS", {
  enumerable: true,
  get: function get() {
    return _constants.STATEMENT_OR_BLOCK_KEYS;
  }
});
Object.defineProperty(exports, "FLATTENABLE_KEYS", {
  enumerable: true,
  get: function get() {
    return _constants.FLATTENABLE_KEYS;
  }
});
Object.defineProperty(exports, "FOR_INIT_KEYS", {
  enumerable: true,
  get: function get() {
    return _constants.FOR_INIT_KEYS;
  }
});
Object.defineProperty(exports, "COMMENT_KEYS", {
  enumerable: true,
  get: function get() {
    return _constants.COMMENT_KEYS;
  }
});
Object.defineProperty(exports, "LOGICAL_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.LOGICAL_OPERATORS;
  }
});
Object.defineProperty(exports, "UPDATE_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.UPDATE_OPERATORS;
  }
});
Object.defineProperty(exports, "BOOLEAN_NUMBER_BINARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.BOOLEAN_NUMBER_BINARY_OPERATORS;
  }
});
Object.defineProperty(exports, "EQUALITY_BINARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.EQUALITY_BINARY_OPERATORS;
  }
});
Object.defineProperty(exports, "COMPARISON_BINARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.COMPARISON_BINARY_OPERATORS;
  }
});
Object.defineProperty(exports, "BOOLEAN_BINARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.BOOLEAN_BINARY_OPERATORS;
  }
});
Object.defineProperty(exports, "NUMBER_BINARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.NUMBER_BINARY_OPERATORS;
  }
});
Object.defineProperty(exports, "BINARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.BINARY_OPERATORS;
  }
});
Object.defineProperty(exports, "BOOLEAN_UNARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.BOOLEAN_UNARY_OPERATORS;
  }
});
Object.defineProperty(exports, "NUMBER_UNARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.NUMBER_UNARY_OPERATORS;
  }
});
Object.defineProperty(exports, "STRING_UNARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.STRING_UNARY_OPERATORS;
  }
});
Object.defineProperty(exports, "UNARY_OPERATORS", {
  enumerable: true,
  get: function get() {
    return _constants.UNARY_OPERATORS;
  }
});
Object.defineProperty(exports, "INHERIT_KEYS", {
  enumerable: true,
  get: function get() {
    return _constants.INHERIT_KEYS;
  }
});
Object.defineProperty(exports, "BLOCK_SCOPED_SYMBOL", {
  enumerable: true,
  get: function get() {
    return _constants.BLOCK_SCOPED_SYMBOL;
  }
});
Object.defineProperty(exports, "NOT_LOCAL_BINDING", {
  enumerable: true,
  get: function get() {
    return _constants.NOT_LOCAL_BINDING;
  }
});
exports.is = is;
exports.isType = isType;
exports.validate = validate;
exports.shallowEqual = shallowEqual;
exports.appendToMemberExpression = appendToMemberExpression;
exports.prependToMemberExpression = prependToMemberExpression;
exports.ensureBlock = ensureBlock;
exports.clone = clone;
exports.cloneWithoutLoc = cloneWithoutLoc;
exports.cloneDeep = cloneDeep;
exports.buildMatchMemberExpression = buildMatchMemberExpression;
exports.removeComments = removeComments;
exports.inheritsComments = inheritsComments;
exports.inheritTrailingComments = inheritTrailingComments;
exports.inheritLeadingComments = inheritLeadingComments;
exports.inheritInnerComments = inheritInnerComments;
exports.inherits = inherits;
exports.assertNode = assertNode;
exports.isNode = isNode;
exports.traverseFast = traverseFast;
exports.removeProperties = removeProperties;
exports.removePropertiesDeep = removePropertiesDeep;

var _retrievers = require("./retrievers");

Object.defineProperty(exports, "getBindingIdentifiers", {
  enumerable: true,
  get: function get() {
    return _retrievers.getBindingIdentifiers;
  }
});
Object.defineProperty(exports, "getOuterBindingIdentifiers", {
  enumerable: true,
  get: function get() {
    return _retrievers.getOuterBindingIdentifiers;
  }
});

var _validators = require("./validators");

Object.defineProperty(exports, "isBinding", {
  enumerable: true,
  get: function get() {
    return _validators.isBinding;
  }
});
Object.defineProperty(exports, "isReferenced", {
  enumerable: true,
  get: function get() {
    return _validators.isReferenced;
  }
});
Object.defineProperty(exports, "isValidIdentifier", {
  enumerable: true,
  get: function get() {
    return _validators.isValidIdentifier;
  }
});
Object.defineProperty(exports, "isLet", {
  enumerable: true,
  get: function get() {
    return _validators.isLet;
  }
});
Object.defineProperty(exports, "isBlockScoped", {
  enumerable: true,
  get: function get() {
    return _validators.isBlockScoped;
  }
});
Object.defineProperty(exports, "isVar", {
  enumerable: true,
  get: function get() {
    return _validators.isVar;
  }
});
Object.defineProperty(exports, "isSpecifierDefault", {
  enumerable: true,
  get: function get() {
    return _validators.isSpecifierDefault;
  }
});
Object.defineProperty(exports, "isScope", {
  enumerable: true,
  get: function get() {
    return _validators.isScope;
  }
});
Object.defineProperty(exports, "isImmutable", {
  enumerable: true,
  get: function get() {
    return _validators.isImmutable;
  }
});
Object.defineProperty(exports, "isNodesEquivalent", {
  enumerable: true,
  get: function get() {
    return _validators.isNodesEquivalent;
  }
});

var _converters = require("./converters");

Object.defineProperty(exports, "toComputedKey", {
  enumerable: true,
  get: function get() {
    return _converters.toComputedKey;
  }
});
Object.defineProperty(exports, "toSequenceExpression", {
  enumerable: true,
  get: function get() {
    return _converters.toSequenceExpression;
  }
});
Object.defineProperty(exports, "toKeyAlias", {
  enumerable: true,
  get: function get() {
    return _converters.toKeyAlias;
  }
});
Object.defineProperty(exports, "toIdentifier", {
  enumerable: true,
  get: function get() {
    return _converters.toIdentifier;
  }
});
Object.defineProperty(exports, "toBindingIdentifierName", {
  enumerable: true,
  get: function get() {
    return _converters.toBindingIdentifierName;
  }
});
Object.defineProperty(exports, "toStatement", {
  enumerable: true,
  get: function get() {
    return _converters.toStatement;
  }
});
Object.defineProperty(exports, "toExpression", {
  enumerable: true,
  get: function get() {
    return _converters.toExpression;
  }
});
Object.defineProperty(exports, "toBlock", {
  enumerable: true,
  get: function get() {
    return _converters.toBlock;
  }
});
Object.defineProperty(exports, "valueToNode", {
  enumerable: true,
  get: function get() {
    return _converters.valueToNode;
  }
});

var _flow = require("./flow");

Object.defineProperty(exports, "createUnionTypeAnnotation", {
  enumerable: true,
  get: function get() {
    return _flow.createUnionTypeAnnotation;
  }
});
Object.defineProperty(exports, "removeTypeDuplicates", {
  enumerable: true,
  get: function get() {
    return _flow.removeTypeDuplicates;
  }
});
Object.defineProperty(exports, "createTypeAnnotationBasedOnTypeof", {
  enumerable: true,
  get: function get() {
    return _flow.createTypeAnnotationBasedOnTypeof;
  }
});

var _toFastProperties = require("to-fast-properties");

var _toFastProperties2 = _interopRequireDefault(_toFastProperties);

var _clone = require("lodash/clone");

var _clone2 = _interopRequireDefault(_clone);

var _uniq = require("lodash/uniq");

var _uniq2 = _interopRequireDefault(_uniq);

require("./definitions/init");

var _definitions = require("./definitions");

var _react2 = require("./react");

var _react = _interopRequireWildcard(_react2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = exports;

function registerType(type) {
  var is = t["is" + type];
  if (!is) {
    is = t["is" + type] = function (node, opts) {
      return t.is(type, node, opts);
    };
  }

  t["assert" + type] = function (node, opts) {
    opts = opts || {};
    if (!is(node, opts)) {
      throw new Error("Expected type " + (0, _stringify2.default)(type) + " with option " + (0, _stringify2.default)(opts));
    }
  };
}

exports.VISITOR_KEYS = _definitions.VISITOR_KEYS;
exports.ALIAS_KEYS = _definitions.ALIAS_KEYS;
exports.NODE_FIELDS = _definitions.NODE_FIELDS;
exports.BUILDER_KEYS = _definitions.BUILDER_KEYS;
exports.DEPRECATED_KEYS = _definitions.DEPRECATED_KEYS;
exports.react = _react;


for (var type in t.VISITOR_KEYS) {
  registerType(type);
}

t.FLIPPED_ALIAS_KEYS = {};

(0, _keys2.default)(t.ALIAS_KEYS).forEach(function (type) {
  t.ALIAS_KEYS[type].forEach(function (alias) {
    var types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
    types.push(type);
  });
});

(0, _keys2.default)(t.FLIPPED_ALIAS_KEYS).forEach(function (type) {
  t[type.toUpperCase() + "_TYPES"] = t.FLIPPED_ALIAS_KEYS[type];
  registerType(type);
});

var TYPES = exports.TYPES = (0, _keys2.default)(t.VISITOR_KEYS).concat((0, _keys2.default)(t.FLIPPED_ALIAS_KEYS)).concat((0, _keys2.default)(t.DEPRECATED_KEYS));

function is(type, node, opts) {
  if (!node) return false;

  var matches = isType(node.type, type);
  if (!matches) return false;

  if (typeof opts === "undefined") {
    return true;
  } else {
    return t.shallowEqual(node, opts);
  }
}

function isType(nodeType, targetType) {
  if (nodeType === targetType) return true;

  if (t.ALIAS_KEYS[targetType]) return false;

  var aliases = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType) return true;

    for (var _iterator = aliases, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var alias = _ref;

      if (nodeType === alias) return true;
    }
  }

  return false;
}

(0, _keys2.default)(t.BUILDER_KEYS).forEach(function (type) {
  var keys = t.BUILDER_KEYS[type];

  function builder() {
    if (arguments.length > keys.length) {
      throw new Error("t." + type + ": Too many arguments passed. Received " + arguments.length + " but can receive " + ("no more than " + keys.length));
    }

    var node = {};
    node.type = type;

    var i = 0;

    for (var _iterator2 = keys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var _key = _ref2;

      var field = t.NODE_FIELDS[type][_key];

      var arg = arguments[i++];
      if (arg === undefined) arg = (0, _clone2.default)(field.default);

      node[_key] = arg;
    }

    for (var key in node) {
      validate(node, key, node[key]);
    }

    return node;
  }

  t[type] = builder;
  t[type[0].toLowerCase() + type.slice(1)] = builder;
});

var _loop = function _loop(_type) {
  var newType = t.DEPRECATED_KEYS[_type];

  function proxy(fn) {
    return function () {
      console.trace("The node type " + _type + " has been renamed to " + newType);
      return fn.apply(this, arguments);
    };
  }

  t[_type] = t[_type[0].toLowerCase() + _type.slice(1)] = proxy(t[newType]);
  t["is" + _type] = proxy(t["is" + newType]);
  t["assert" + _type] = proxy(t["assert" + newType]);
};

for (var _type in t.DEPRECATED_KEYS) {
  _loop(_type);
}

function validate(node, key, val) {
  if (!node) return;

  var fields = t.NODE_FIELDS[node.type];
  if (!fields) return;

  var field = fields[key];
  if (!field || !field.validate) return;
  if (field.optional && val == null) return;

  field.validate(node, key, val);
}

function shallowEqual(actual, expected) {
  var keys = (0, _keys2.default)(expected);

  for (var _iterator3 = keys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
    var _ref3;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref3 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref3 = _i3.value;
    }

    var key = _ref3;

    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}

function appendToMemberExpression(member, append, computed) {
  member.object = t.memberExpression(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}

function prependToMemberExpression(member, prepend) {
  member.object = t.memberExpression(prepend, member.object);
  return member;
}

function ensureBlock(node) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "body";

  return node[key] = t.toBlock(node[key], node);
}

function clone(node) {
  if (!node) return node;
  var newNode = {};
  for (var key in node) {
    if (key[0] === "_") continue;
    newNode[key] = node[key];
  }
  return newNode;
}

function cloneWithoutLoc(node) {
  var newNode = clone(node);
  delete newNode.loc;
  return newNode;
}

function cloneDeep(node) {
  if (!node) return node;
  var newNode = {};

  for (var key in node) {
    if (key[0] === "_") continue;

    var val = node[key];

    if (val) {
      if (val.type) {
        val = t.cloneDeep(val);
      } else if (Array.isArray(val)) {
        val = val.map(t.cloneDeep);
      }
    }

    newNode[key] = val;
  }

  return newNode;
}

function buildMatchMemberExpression(match, allowPartial) {
  var parts = match.split(".");

  return function (member) {
    if (!t.isMemberExpression(member)) return false;

    var search = [member];
    var i = 0;

    while (search.length) {
      var node = search.shift();

      if (allowPartial && i === parts.length) {
        return true;
      }

      if (t.isIdentifier(node)) {
        if (parts[i] !== node.name) return false;
      } else if (t.isStringLiteral(node)) {
        if (parts[i] !== node.value) return false;
      } else if (t.isMemberExpression(node)) {
        if (node.computed && !t.isStringLiteral(node.property)) {
          return false;
        } else {
          search.push(node.object);
          search.push(node.property);
          continue;
        }
      } else {
        return false;
      }

      if (++i > parts.length) {
        return false;
      }
    }

    return true;
  };
}

function removeComments(node) {
  for (var _iterator4 = t.COMMENT_KEYS, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
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

    delete node[key];
  }
  return node;
}

function inheritsComments(child, parent) {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);
  return child;
}

function inheritTrailingComments(child, parent) {
  _inheritComments("trailingComments", child, parent);
}

function inheritLeadingComments(child, parent) {
  _inheritComments("leadingComments", child, parent);
}

function inheritInnerComments(child, parent) {
  _inheritComments("innerComments", child, parent);
}

function _inheritComments(key, child, parent) {
  if (child && parent) {
    child[key] = (0, _uniq2.default)([].concat(child[key], parent[key]).filter(Boolean));
  }
}

function inherits(child, parent) {
  if (!child || !parent) return child;

  for (var _iterator5 = t.INHERIT_KEYS.optional, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
    var _ref5;

    if (_isArray5) {
      if (_i5 >= _iterator5.length) break;
      _ref5 = _iterator5[_i5++];
    } else {
      _i5 = _iterator5.next();
      if (_i5.done) break;
      _ref5 = _i5.value;
    }

    var _key2 = _ref5;

    if (child[_key2] == null) {
      child[_key2] = parent[_key2];
    }
  }

  for (var key in parent) {
    if (key[0] === "_") child[key] = parent[key];
  }

  for (var _iterator6 = t.INHERIT_KEYS.force, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
    var _ref6;

    if (_isArray6) {
      if (_i6 >= _iterator6.length) break;
      _ref6 = _iterator6[_i6++];
    } else {
      _i6 = _iterator6.next();
      if (_i6.done) break;
      _ref6 = _i6.value;
    }

    var _key3 = _ref6;

    child[_key3] = parent[_key3];
  }

  t.inheritsComments(child, parent);

  return child;
}

function assertNode(node) {
  if (!isNode(node)) {
    throw new TypeError("Not a valid node " + (node && node.type));
  }
}

function isNode(node) {
  return !!(node && _definitions.VISITOR_KEYS[node.type]);
}

(0, _toFastProperties2.default)(t);
(0, _toFastProperties2.default)(t.VISITOR_KEYS);

function traverseFast(node, enter, opts) {
  if (!node) return;

  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  opts = opts || {};
  enter(node, opts);

  for (var _iterator7 = keys, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
    var _ref7;

    if (_isArray7) {
      if (_i7 >= _iterator7.length) break;
      _ref7 = _iterator7[_i7++];
    } else {
      _i7 = _iterator7.next();
      if (_i7.done) break;
      _ref7 = _i7.value;
    }

    var key = _ref7;

    var subNode = node[key];

    if (Array.isArray(subNode)) {
      for (var _iterator8 = subNode, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);;) {
        var _ref8;

        if (_isArray8) {
          if (_i8 >= _iterator8.length) break;
          _ref8 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done) break;
          _ref8 = _i8.value;
        }

        var _node = _ref8;

        traverseFast(_node, enter, opts);
      }
    } else {
      traverseFast(subNode, enter, opts);
    }
  }
}

var CLEAR_KEYS = ["tokens", "start", "end", "loc", "raw", "rawValue"];

var CLEAR_KEYS_PLUS_COMMENTS = t.COMMENT_KEYS.concat(["comments"]).concat(CLEAR_KEYS);

function removeProperties(node, opts) {
  opts = opts || {};
  var map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
  for (var _iterator9 = map, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : (0, _getIterator3.default)(_iterator9);;) {
    var _ref9;

    if (_isArray9) {
      if (_i9 >= _iterator9.length) break;
      _ref9 = _iterator9[_i9++];
    } else {
      _i9 = _iterator9.next();
      if (_i9.done) break;
      _ref9 = _i9.value;
    }

    var _key4 = _ref9;

    if (node[_key4] != null) node[_key4] = undefined;
  }

  for (var key in node) {
    if (key[0] === "_" && node[key] != null) node[key] = undefined;
  }

  var syms = (0, _getOwnPropertySymbols2.default)(node);
  for (var _iterator10 = syms, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : (0, _getIterator3.default)(_iterator10);;) {
    var _ref10;

    if (_isArray10) {
      if (_i10 >= _iterator10.length) break;
      _ref10 = _iterator10[_i10++];
    } else {
      _i10 = _iterator10.next();
      if (_i10.done) break;
      _ref10 = _i10.value;
    }

    var sym = _ref10;

    node[sym] = null;
  }
}

function removePropertiesDeep(tree, opts) {
  traverseFast(tree, removeProperties, opts);
  return tree;
}
}, function(modId) {var map = {"./constants":1536577187663,"./retrievers":1536577187664,"./validators":1536577187665,"./converters":1536577187666,"./flow":1536577187667,"./definitions/init":1536577187668,"./definitions":1536577187669,"./react":1536577187676}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187663, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.NOT_LOCAL_BINDING = exports.BLOCK_SCOPED_SYMBOL = exports.INHERIT_KEYS = exports.UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = exports.NUMBER_UNARY_OPERATORS = exports.BOOLEAN_UNARY_OPERATORS = exports.BINARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = exports.EQUALITY_BINARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = exports.UPDATE_OPERATORS = exports.LOGICAL_OPERATORS = exports.COMMENT_KEYS = exports.FOR_INIT_KEYS = exports.FLATTENABLE_KEYS = exports.STATEMENT_OR_BLOCK_KEYS = undefined;

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATEMENT_OR_BLOCK_KEYS = exports.STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
var FLATTENABLE_KEYS = exports.FLATTENABLE_KEYS = ["body", "expressions"];
var FOR_INIT_KEYS = exports.FOR_INIT_KEYS = ["left", "init"];
var COMMENT_KEYS = exports.COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"];

var LOGICAL_OPERATORS = exports.LOGICAL_OPERATORS = ["||", "&&"];
var UPDATE_OPERATORS = exports.UPDATE_OPERATORS = ["++", "--"];

var BOOLEAN_NUMBER_BINARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
var EQUALITY_BINARY_OPERATORS = exports.EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="];
var COMPARISON_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = [].concat(EQUALITY_BINARY_OPERATORS, ["in", "instanceof"]);
var BOOLEAN_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = [].concat(COMPARISON_BINARY_OPERATORS, BOOLEAN_NUMBER_BINARY_OPERATORS);
var NUMBER_BINARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = ["-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];
var BINARY_OPERATORS = exports.BINARY_OPERATORS = ["+"].concat(NUMBER_BINARY_OPERATORS, BOOLEAN_BINARY_OPERATORS);

var BOOLEAN_UNARY_OPERATORS = exports.BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
var NUMBER_UNARY_OPERATORS = exports.NUMBER_UNARY_OPERATORS = ["+", "-", "++", "--", "~"];
var STRING_UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = ["typeof"];
var UNARY_OPERATORS = exports.UNARY_OPERATORS = ["void"].concat(BOOLEAN_UNARY_OPERATORS, NUMBER_UNARY_OPERATORS, STRING_UNARY_OPERATORS);

var INHERIT_KEYS = exports.INHERIT_KEYS = {
  optional: ["typeAnnotation", "typeParameters", "returnType"],
  force: ["start", "loc", "end"]
};

var BLOCK_SCOPED_SYMBOL = exports.BLOCK_SCOPED_SYMBOL = (0, _for2.default)("var used to be block scoped");
var NOT_LOCAL_BINDING = exports.NOT_LOCAL_BINDING = (0, _for2.default)("should not be considered a local binding");
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187664, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.getBindingIdentifiers = getBindingIdentifiers;
exports.getOuterBindingIdentifiers = getOuterBindingIdentifiers;

var _index = require("./index");

var t = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBindingIdentifiers(node, duplicates, outerOnly) {
  var search = [].concat(node);
  var ids = (0, _create2.default)(null);

  while (search.length) {
    var id = search.shift();
    if (!id) continue;

    var keys = t.getBindingIdentifiers.keys[id.type];

    if (t.isIdentifier(id)) {
      if (duplicates) {
        var _ids = ids[id.name] = ids[id.name] || [];
        _ids.push(id);
      } else {
        ids[id.name] = id;
      }
      continue;
    }

    if (t.isExportDeclaration(id)) {
      if (t.isDeclaration(id.declaration)) {
        search.push(id.declaration);
      }
      continue;
    }

    if (outerOnly) {
      if (t.isFunctionDeclaration(id)) {
        search.push(id.id);
        continue;
      }

      if (t.isFunctionExpression(id)) {
        continue;
      }
    }

    if (keys) {
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (id[key]) {
          search = search.concat(id[key]);
        }
      }
    }
  }

  return ids;
}

getBindingIdentifiers.keys = {
  DeclareClass: ["id"],
  DeclareFunction: ["id"],
  DeclareModule: ["id"],
  DeclareVariable: ["id"],
  InterfaceDeclaration: ["id"],
  TypeAlias: ["id"],
  OpaqueType: ["id"],

  CatchClause: ["param"],
  LabeledStatement: ["label"],
  UnaryExpression: ["argument"],
  AssignmentExpression: ["left"],

  ImportSpecifier: ["local"],
  ImportNamespaceSpecifier: ["local"],
  ImportDefaultSpecifier: ["local"],
  ImportDeclaration: ["specifiers"],

  ExportSpecifier: ["exported"],
  ExportNamespaceSpecifier: ["exported"],
  ExportDefaultSpecifier: ["exported"],

  FunctionDeclaration: ["id", "params"],
  FunctionExpression: ["id", "params"],

  ClassDeclaration: ["id"],
  ClassExpression: ["id"],

  RestElement: ["argument"],
  UpdateExpression: ["argument"],

  RestProperty: ["argument"],
  ObjectProperty: ["value"],

  AssignmentPattern: ["left"],
  ArrayPattern: ["elements"],
  ObjectPattern: ["properties"],

  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id"]
};

function getOuterBindingIdentifiers(node, duplicates) {
  return getBindingIdentifiers(node, duplicates, true);
}
}, function(modId) { var map = {"./index":1536577187662}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187665, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.isBinding = isBinding;
exports.isReferenced = isReferenced;
exports.isValidIdentifier = isValidIdentifier;
exports.isLet = isLet;
exports.isBlockScoped = isBlockScoped;
exports.isVar = isVar;
exports.isSpecifierDefault = isSpecifierDefault;
exports.isScope = isScope;
exports.isImmutable = isImmutable;
exports.isNodesEquivalent = isNodesEquivalent;

var _retrievers = require("./retrievers");

var _esutils = require("esutils");

var _esutils2 = _interopRequireDefault(_esutils);

var _index = require("./index");

var t = _interopRequireWildcard(_index);

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBinding(node, parent) {
  var keys = _retrievers.getBindingIdentifiers.keys[parent.type];
  if (keys) {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = parent[key];
      if (Array.isArray(val)) {
        if (val.indexOf(node) >= 0) return true;
      } else {
        if (val === node) return true;
      }
    }
  }

  return false;
}

function isReferenced(node, parent) {
  switch (parent.type) {
    case "BindExpression":
      return parent.object === node || parent.callee === node;

    case "MemberExpression":
    case "JSXMemberExpression":
      if (parent.property === node && parent.computed) {
        return true;
      } else if (parent.object === node) {
        return true;
      } else {
        return false;
      }

    case "MetaProperty":
      return false;

    case "ObjectProperty":
      if (parent.key === node) {
        return parent.computed;
      }

    case "VariableDeclarator":
      return parent.id !== node;

    case "ArrowFunctionExpression":
    case "FunctionDeclaration":
    case "FunctionExpression":
      for (var _iterator = parent.params, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

        if (param === node) return false;
      }

      return parent.id !== node;

    case "ExportSpecifier":
      if (parent.source) {
        return false;
      } else {
        return parent.local === node;
      }

    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return false;

    case "JSXAttribute":
      return parent.name !== node;

    case "ClassProperty":
      if (parent.key === node) {
        return parent.computed;
      } else {
        return parent.value === node;
      }

    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;

    case "ClassDeclaration":
    case "ClassExpression":
      return parent.id !== node;

    case "ClassMethod":
    case "ObjectMethod":
      return parent.key === node && parent.computed;

    case "LabeledStatement":
      return false;

    case "CatchClause":
      return parent.param !== node;

    case "RestElement":
      return false;

    case "AssignmentExpression":
      return parent.right === node;

    case "AssignmentPattern":
      return parent.right === node;

    case "ObjectPattern":
    case "ArrayPattern":
      return false;
  }

  return true;
}

function isValidIdentifier(name) {
  if (typeof name !== "string" || _esutils2.default.keyword.isReservedWordES6(name, true)) {
    return false;
  } else if (name === "await") {
    return false;
  } else {
    return _esutils2.default.keyword.isIdentifierNameES6(name);
  }
}

function isLet(node) {
  return t.isVariableDeclaration(node) && (node.kind !== "var" || node[_constants.BLOCK_SCOPED_SYMBOL]);
}

function isBlockScoped(node) {
  return t.isFunctionDeclaration(node) || t.isClassDeclaration(node) || t.isLet(node);
}

function isVar(node) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !node[_constants.BLOCK_SCOPED_SYMBOL];
}

function isSpecifierDefault(specifier) {
  return t.isImportDefaultSpecifier(specifier) || t.isIdentifier(specifier.imported || specifier.exported, { name: "default" });
}

function isScope(node, parent) {
  if (t.isBlockStatement(node) && t.isFunction(parent, { body: node })) {
    return false;
  }

  return t.isScopable(node);
}

function isImmutable(node) {
  if (t.isType(node.type, "Immutable")) return true;

  if (t.isIdentifier(node)) {
    if (node.name === "undefined") {
      return true;
    } else {
      return false;
    }
  }

  return false;
}

function isNodesEquivalent(a, b) {
  if ((typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) !== "object" || (typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) !== "object" || a == null || b == null) {
    return a === b;
  }

  if (a.type !== b.type) {
    return false;
  }

  var fields = (0, _keys2.default)(t.NODE_FIELDS[a.type] || a.type);

  for (var _iterator2 = fields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var field = _ref2;

    if ((0, _typeof3.default)(a[field]) !== (0, _typeof3.default)(b[field])) {
      return false;
    }

    if (Array.isArray(a[field])) {
      if (!Array.isArray(b[field])) {
        return false;
      }
      if (a[field].length !== b[field].length) {
        return false;
      }

      for (var i = 0; i < a[field].length; i++) {
        if (!isNodesEquivalent(a[field][i], b[field][i])) {
          return false;
        }
      }
      continue;
    }

    if (!isNodesEquivalent(a[field], b[field])) {
      return false;
    }
  }

  return true;
}
}, function(modId) { var map = {"./retrievers":1536577187664,"./index":1536577187662,"./constants":1536577187663}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187666, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _maxSafeInteger = require("babel-runtime/core-js/number/max-safe-integer");

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.toComputedKey = toComputedKey;
exports.toSequenceExpression = toSequenceExpression;
exports.toKeyAlias = toKeyAlias;
exports.toIdentifier = toIdentifier;
exports.toBindingIdentifierName = toBindingIdentifierName;
exports.toStatement = toStatement;
exports.toExpression = toExpression;
exports.toBlock = toBlock;
exports.valueToNode = valueToNode;

var _isPlainObject = require("lodash/isPlainObject");

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isRegExp = require("lodash/isRegExp");

var _isRegExp2 = _interopRequireDefault(_isRegExp);

var _index = require("./index");

var t = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toComputedKey(node) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : node.key || node.property;

  if (!node.computed) {
    if (t.isIdentifier(key)) key = t.stringLiteral(key.name);
  }
  return key;
}

function gatherSequenceExpressions(nodes, scope, declars) {
  var exprs = [];
  var ensureLastUndefined = true;

  for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    ensureLastUndefined = false;

    if (t.isExpression(node)) {
      exprs.push(node);
    } else if (t.isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (t.isVariableDeclaration(node)) {
      if (node.kind !== "var") return;

      for (var _iterator2 = node.declarations, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var declar = _ref2;

        var bindings = t.getBindingIdentifiers(declar);
        for (var key in bindings) {
          declars.push({
            kind: node.kind,
            id: bindings[key]
          });
        }

        if (declar.init) {
          exprs.push(t.assignmentExpression("=", declar.id, declar.init));
        }
      }

      ensureLastUndefined = true;
    } else if (t.isIfStatement(node)) {
      var consequent = node.consequent ? gatherSequenceExpressions([node.consequent], scope, declars) : scope.buildUndefinedNode();
      var alternate = node.alternate ? gatherSequenceExpressions([node.alternate], scope, declars) : scope.buildUndefinedNode();
      if (!consequent || !alternate) return;

      exprs.push(t.conditionalExpression(node.test, consequent, alternate));
    } else if (t.isBlockStatement(node)) {
      var body = gatherSequenceExpressions(node.body, scope, declars);
      if (!body) return;

      exprs.push(body);
    } else if (t.isEmptyStatement(node)) {
      ensureLastUndefined = true;
    } else {
      return;
    }
  }

  if (ensureLastUndefined) {
    exprs.push(scope.buildUndefinedNode());
  }

  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return t.sequenceExpression(exprs);
  }
}

function toSequenceExpression(nodes, scope) {
  if (!nodes || !nodes.length) return;

  var declars = [];
  var result = gatherSequenceExpressions(nodes, scope, declars);
  if (!result) return;

  for (var _iterator3 = declars, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
    var _ref3;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref3 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref3 = _i3.value;
    }

    var declar = _ref3;

    scope.push(declar);
  }

  return result;
}

function toKeyAlias(node) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : node.key;

  var alias = void 0;

  if (node.kind === "method") {
    return toKeyAlias.increment() + "";
  } else if (t.isIdentifier(key)) {
    alias = key.name;
  } else if (t.isStringLiteral(key)) {
    alias = (0, _stringify2.default)(key.value);
  } else {
    alias = (0, _stringify2.default)(t.removePropertiesDeep(t.cloneDeep(key)));
  }

  if (node.computed) {
    alias = "[" + alias + "]";
  }

  if (node.static) {
    alias = "static:" + alias;
  }

  return alias;
}

toKeyAlias.uid = 0;

toKeyAlias.increment = function () {
  if (toKeyAlias.uid >= _maxSafeInteger2.default) {
    return toKeyAlias.uid = 0;
  } else {
    return toKeyAlias.uid++;
  }
};

function toIdentifier(name) {
  name = name + "";

  name = name.replace(/[^a-zA-Z0-9$_]/g, "-");

  name = name.replace(/^[-0-9]+/, "");

  name = name.replace(/[-\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (!t.isValidIdentifier(name)) {
    name = "_" + name;
  }

  return name || "_";
}

function toBindingIdentifierName(name) {
  name = toIdentifier(name);
  if (name === "eval" || name === "arguments") name = "_" + name;
  return name;
}

function toStatement(node, ignore) {
  if (t.isStatement(node)) {
    return node;
  }

  var mustHaveId = false;
  var newType = void 0;

  if (t.isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if (t.isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if (t.isAssignmentExpression(node)) {
    return t.expressionStatement(node);
  }

  if (mustHaveId && !node.id) {
    newType = false;
  }

  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error("cannot turn " + node.type + " to a statement");
    }
  }

  node.type = newType;

  return node;
}

function toExpression(node) {
  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  if (t.isExpression(node)) {
    return node;
  }

  if (t.isClass(node)) {
    node.type = "ClassExpression";
  } else if (t.isFunction(node)) {
    node.type = "FunctionExpression";
  }

  if (!t.isExpression(node)) {
    throw new Error("cannot turn " + node.type + " to an expression");
  }

  return node;
}

function toBlock(node, parent) {
  if (t.isBlockStatement(node)) {
    return node;
  }

  if (t.isEmptyStatement(node)) {
    node = [];
  }

  if (!Array.isArray(node)) {
    if (!t.isStatement(node)) {
      if (t.isFunction(parent)) {
        node = t.returnStatement(node);
      } else {
        node = t.expressionStatement(node);
      }
    }

    node = [node];
  }

  return t.blockStatement(node);
}

function valueToNode(value) {
  if (value === undefined) {
    return t.identifier("undefined");
  }

  if (value === true || value === false) {
    return t.booleanLiteral(value);
  }

  if (value === null) {
    return t.nullLiteral();
  }

  if (typeof value === "string") {
    return t.stringLiteral(value);
  }

  if (typeof value === "number") {
    return t.numericLiteral(value);
  }

  if ((0, _isRegExp2.default)(value)) {
    var pattern = value.source;
    var flags = value.toString().match(/\/([a-z]+|)$/)[1];
    return t.regExpLiteral(pattern, flags);
  }

  if (Array.isArray(value)) {
    return t.arrayExpression(value.map(t.valueToNode));
  }

  if ((0, _isPlainObject2.default)(value)) {
    var props = [];
    for (var key in value) {
      var nodeKey = void 0;
      if (t.isValidIdentifier(key)) {
        nodeKey = t.identifier(key);
      } else {
        nodeKey = t.stringLiteral(key);
      }
      props.push(t.objectProperty(nodeKey, t.valueToNode(value[key])));
    }
    return t.objectExpression(props);
  }

  throw new Error("don't know how to turn this value into a node");
}
}, function(modId) { var map = {"./index":1536577187662}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187667, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.createUnionTypeAnnotation = createUnionTypeAnnotation;
exports.removeTypeDuplicates = removeTypeDuplicates;
exports.createTypeAnnotationBasedOnTypeof = createTypeAnnotationBasedOnTypeof;

var _index = require("./index");

var t = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createUnionTypeAnnotation(types) {
  var flattened = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return t.unionTypeAnnotation(flattened);
  }
}

function removeTypeDuplicates(nodes) {
  var generics = {};
  var bases = {};

  var typeGroups = [];

  var types = [];

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (!node) continue;

    if (types.indexOf(node) >= 0) {
      continue;
    }

    if (t.isAnyTypeAnnotation(node)) {
      return [node];
    }

    if (t.isFlowBaseAnnotation(node)) {
      bases[node.type] = node;
      continue;
    }

    if (t.isUnionTypeAnnotation(node)) {
      if (typeGroups.indexOf(node.types) < 0) {
        nodes = nodes.concat(node.types);
        typeGroups.push(node.types);
      }
      continue;
    }

    if (t.isGenericTypeAnnotation(node)) {
      var name = node.id.name;

      if (generics[name]) {
        var existing = generics[name];
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params.concat(node.typeParameters.params));
          }
        } else {
          existing = node.typeParameters;
        }
      } else {
        generics[name] = node;
      }

      continue;
    }

    types.push(node);
  }

  for (var type in bases) {
    types.push(bases[type]);
  }

  for (var _name in generics) {
    types.push(generics[_name]);
  }

  return types;
}

function createTypeAnnotationBasedOnTypeof(type) {
  if (type === "string") {
    return t.stringTypeAnnotation();
  } else if (type === "number") {
    return t.numberTypeAnnotation();
  } else if (type === "undefined") {
    return t.voidTypeAnnotation();
  } else if (type === "boolean") {
    return t.booleanTypeAnnotation();
  } else if (type === "function") {
    return t.genericTypeAnnotation(t.identifier("Function"));
  } else if (type === "object") {
    return t.genericTypeAnnotation(t.identifier("Object"));
  } else if (type === "symbol") {
    return t.genericTypeAnnotation(t.identifier("Symbol"));
  } else {
    throw new Error("Invalid typeof value");
  }
}
}, function(modId) { var map = {"./index":1536577187662}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187668, function(require, module, exports) {
"use strict";

require("./index");

require("./core");

require("./es2015");

require("./flow");

require("./jsx");

require("./misc");

require("./experimental");
}, function(modId) { var map = {"./index":1536577187669,"./core":1536577187670,"./es2015":1536577187671,"./flow":1536577187672,"./jsx":1536577187673,"./misc":1536577187674,"./experimental":1536577187675}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187669, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.DEPRECATED_KEYS = exports.BUILDER_KEYS = exports.NODE_FIELDS = exports.ALIAS_KEYS = exports.VISITOR_KEYS = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.assertEach = assertEach;
exports.assertOneOf = assertOneOf;
exports.assertNodeType = assertNodeType;
exports.assertNodeOrValueType = assertNodeOrValueType;
exports.assertValueType = assertValueType;
exports.chain = chain;
exports.default = defineType;

var _index = require("../index");

var t = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VISITOR_KEYS = exports.VISITOR_KEYS = {};
var ALIAS_KEYS = exports.ALIAS_KEYS = {};
var NODE_FIELDS = exports.NODE_FIELDS = {};
var BUILDER_KEYS = exports.BUILDER_KEYS = {};
var DEPRECATED_KEYS = exports.DEPRECATED_KEYS = {};

function getType(val) {
  if (Array.isArray(val)) {
    return "array";
  } else if (val === null) {
    return "null";
  } else if (val === undefined) {
    return "undefined";
  } else {
    return typeof val === "undefined" ? "undefined" : (0, _typeof3.default)(val);
  }
}

function assertEach(callback) {
  function validator(node, key, val) {
    if (!Array.isArray(val)) return;

    for (var i = 0; i < val.length; i++) {
      callback(node, key + "[" + i + "]", val[i]);
    }
  }
  validator.each = callback;
  return validator;
}

function assertOneOf() {
  for (var _len = arguments.length, vals = Array(_len), _key = 0; _key < _len; _key++) {
    vals[_key] = arguments[_key];
  }

  function validate(node, key, val) {
    if (vals.indexOf(val) < 0) {
      throw new TypeError("Property " + key + " expected value to be one of " + (0, _stringify2.default)(vals) + " but got " + (0, _stringify2.default)(val));
    }
  }

  validate.oneOf = vals;

  return validate;
}

function assertNodeType() {
  for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    types[_key2] = arguments[_key2];
  }

  function validate(node, key, val) {
    var valid = false;

    for (var _iterator = types, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var type = _ref;

      if (t.is(type, val)) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      throw new TypeError("Property " + key + " of " + node.type + " expected node to be of a type " + (0, _stringify2.default)(types) + " " + ("but instead got " + (0, _stringify2.default)(val && val.type)));
    }
  }

  validate.oneOfNodeTypes = types;

  return validate;
}

function assertNodeOrValueType() {
  for (var _len3 = arguments.length, types = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    types[_key3] = arguments[_key3];
  }

  function validate(node, key, val) {
    var valid = false;

    for (var _iterator2 = types, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var type = _ref2;

      if (getType(val) === type || t.is(type, val)) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      throw new TypeError("Property " + key + " of " + node.type + " expected node to be of a type " + (0, _stringify2.default)(types) + " " + ("but instead got " + (0, _stringify2.default)(val && val.type)));
    }
  }

  validate.oneOfNodeOrValueTypes = types;

  return validate;
}

function assertValueType(type) {
  function validate(node, key, val) {
    var valid = getType(val) === type;

    if (!valid) {
      throw new TypeError("Property " + key + " expected type of " + type + " but got " + getType(val));
    }
  }

  validate.type = type;

  return validate;
}

function chain() {
  for (var _len4 = arguments.length, fns = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    fns[_key4] = arguments[_key4];
  }

  function validate() {
    for (var _iterator3 = fns, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var fn = _ref3;

      fn.apply(undefined, arguments);
    }
  }
  validate.chainOf = fns;
  return validate;
}

function defineType(type) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var inherits = opts.inherits && store[opts.inherits] || {};

  opts.fields = opts.fields || inherits.fields || {};
  opts.visitor = opts.visitor || inherits.visitor || [];
  opts.aliases = opts.aliases || inherits.aliases || [];
  opts.builder = opts.builder || inherits.builder || opts.visitor || [];

  if (opts.deprecatedAlias) {
    DEPRECATED_KEYS[opts.deprecatedAlias] = type;
  }

  for (var _iterator4 = opts.visitor.concat(opts.builder), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
    var _ref4;

    if (_isArray4) {
      if (_i4 >= _iterator4.length) break;
      _ref4 = _iterator4[_i4++];
    } else {
      _i4 = _iterator4.next();
      if (_i4.done) break;
      _ref4 = _i4.value;
    }

    var _key5 = _ref4;

    opts.fields[_key5] = opts.fields[_key5] || {};
  }

  for (var key in opts.fields) {
    var field = opts.fields[key];

    if (opts.builder.indexOf(key) === -1) {
      field.optional = true;
    }
    if (field.default === undefined) {
      field.default = null;
    } else if (!field.validate) {
      field.validate = assertValueType(getType(field.default));
    }
  }

  VISITOR_KEYS[type] = opts.visitor;
  BUILDER_KEYS[type] = opts.builder;
  NODE_FIELDS[type] = opts.fields;
  ALIAS_KEYS[type] = opts.aliases;

  store[type] = opts;
}

var store = {};
}, function(modId) { var map = {"../index":1536577187662}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187670, function(require, module, exports) {
"use strict";

var _index = require("../index");

var t = _interopRequireWildcard(_index);

var _constants = require("../constants");

var _index2 = require("./index");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(0, _index3.default)("ArrayExpression", {
  fields: {
    elements: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeOrValueType)("null", "Expression", "SpreadElement"))),
      default: []
    }
  },
  visitor: ["elements"],
  aliases: ["Expression"]
});

(0, _index3.default)("AssignmentExpression", {
  fields: {
    operator: {
      validate: (0, _index2.assertValueType)("string")
    },
    left: {
      validate: (0, _index2.assertNodeType)("LVal")
    },
    right: {
      validate: (0, _index2.assertNodeType)("Expression")
    }
  },
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});

(0, _index3.default)("BinaryExpression", {
  builder: ["operator", "left", "right"],
  fields: {
    operator: {
      validate: _index2.assertOneOf.apply(undefined, _constants.BINARY_OPERATORS)
    },
    left: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    right: {
      validate: (0, _index2.assertNodeType)("Expression")
    }
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

(0, _index3.default)("Directive", {
  visitor: ["value"],
  fields: {
    value: {
      validate: (0, _index2.assertNodeType)("DirectiveLiteral")
    }
  }
});

(0, _index3.default)("DirectiveLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _index2.assertValueType)("string")
    }
  }
});

(0, _index3.default)("BlockStatement", {
  builder: ["body", "directives"],
  visitor: ["directives", "body"],
  fields: {
    directives: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Directive"))),
      default: []
    },
    body: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});

(0, _index3.default)("BreakStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: (0, _index2.assertNodeType)("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

(0, _index3.default)("CallExpression", {
  visitor: ["callee", "arguments"],
  fields: {
    callee: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    arguments: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Expression", "SpreadElement")))
    }
  },
  aliases: ["Expression"]
});

(0, _index3.default)("CatchClause", {
  visitor: ["param", "body"],
  fields: {
    param: {
      validate: (0, _index2.assertNodeType)("Identifier")
    },
    body: {
      validate: (0, _index2.assertNodeType)("BlockStatement")
    }
  },
  aliases: ["Scopable"]
});

(0, _index3.default)("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  fields: {
    test: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    consequent: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    alternate: {
      validate: (0, _index2.assertNodeType)("Expression")
    }
  },
  aliases: ["Expression", "Conditional"]
});

(0, _index3.default)("ContinueStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: (0, _index2.assertNodeType)("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

(0, _index3.default)("DebuggerStatement", {
  aliases: ["Statement"]
});

(0, _index3.default)("DoWhileStatement", {
  visitor: ["test", "body"],
  fields: {
    test: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _index2.assertNodeType)("Statement")
    }
  },
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

(0, _index3.default)("EmptyStatement", {
  aliases: ["Statement"]
});

(0, _index3.default)("ExpressionStatement", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: (0, _index2.assertNodeType)("Expression")
    }
  },
  aliases: ["Statement", "ExpressionWrapper"]
});

(0, _index3.default)("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"],
  fields: {
    program: {
      validate: (0, _index2.assertNodeType)("Program")
    }
  }
});

(0, _index3.default)("ForInStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: (0, _index2.assertNodeType)("VariableDeclaration", "LVal")
    },
    right: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _index2.assertNodeType)("Statement")
    }
  }
});

(0, _index3.default)("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
  fields: {
    init: {
      validate: (0, _index2.assertNodeType)("VariableDeclaration", "Expression"),
      optional: true
    },
    test: {
      validate: (0, _index2.assertNodeType)("Expression"),
      optional: true
    },
    update: {
      validate: (0, _index2.assertNodeType)("Expression"),
      optional: true
    },
    body: {
      validate: (0, _index2.assertNodeType)("Statement")
    }
  }
});

(0, _index3.default)("FunctionDeclaration", {
  builder: ["id", "params", "body", "generator", "async"],
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  fields: {
    id: {
      validate: (0, _index2.assertNodeType)("Identifier")
    },
    params: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("LVal")))
    },
    body: {
      validate: (0, _index2.assertNodeType)("BlockStatement")
    },
    generator: {
      default: false,
      validate: (0, _index2.assertValueType)("boolean")
    },
    async: {
      default: false,
      validate: (0, _index2.assertValueType)("boolean")
    }
  },
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration"]
});

(0, _index3.default)("FunctionExpression", {
  inherits: "FunctionDeclaration",
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
  fields: {
    id: {
      validate: (0, _index2.assertNodeType)("Identifier"),
      optional: true
    },
    params: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("LVal")))
    },
    body: {
      validate: (0, _index2.assertNodeType)("BlockStatement")
    },
    generator: {
      default: false,
      validate: (0, _index2.assertValueType)("boolean")
    },
    async: {
      default: false,
      validate: (0, _index2.assertValueType)("boolean")
    }
  }
});

(0, _index3.default)("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation"],
  aliases: ["Expression", "LVal"],
  fields: {
    name: {
      validate: function validate(node, key, val) {
        if (!t.isValidIdentifier(val)) {}
      }
    },
    decorators: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Decorator")))
    }
  }
});

(0, _index3.default)("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement", "Conditional"],
  fields: {
    test: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    consequent: {
      validate: (0, _index2.assertNodeType)("Statement")
    },
    alternate: {
      optional: true,
      validate: (0, _index2.assertNodeType)("Statement")
    }
  }
});

(0, _index3.default)("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"],
  fields: {
    label: {
      validate: (0, _index2.assertNodeType)("Identifier")
    },
    body: {
      validate: (0, _index2.assertNodeType)("Statement")
    }
  }
});

(0, _index3.default)("StringLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _index2.assertValueType)("string")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});

(0, _index3.default)("NumericLiteral", {
  builder: ["value"],
  deprecatedAlias: "NumberLiteral",
  fields: {
    value: {
      validate: (0, _index2.assertValueType)("number")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});

(0, _index3.default)("NullLiteral", {
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});

(0, _index3.default)("BooleanLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _index2.assertValueType)("boolean")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});

(0, _index3.default)("RegExpLiteral", {
  builder: ["pattern", "flags"],
  deprecatedAlias: "RegexLiteral",
  aliases: ["Expression", "Literal"],
  fields: {
    pattern: {
      validate: (0, _index2.assertValueType)("string")
    },
    flags: {
      validate: (0, _index2.assertValueType)("string"),
      default: ""
    }
  }
});

(0, _index3.default)("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"],
  fields: {
    operator: {
      validate: _index2.assertOneOf.apply(undefined, _constants.LOGICAL_OPERATORS)
    },
    left: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    right: {
      validate: (0, _index2.assertNodeType)("Expression")
    }
  }
});

(0, _index3.default)("MemberExpression", {
  builder: ["object", "property", "computed"],
  visitor: ["object", "property"],
  aliases: ["Expression", "LVal"],
  fields: {
    object: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    property: {
      validate: function validate(node, key, val) {
        var expectedType = node.computed ? "Expression" : "Identifier";
        (0, _index2.assertNodeType)(expectedType)(node, key, val);
      }
    },
    computed: {
      default: false
    }
  }
});

(0, _index3.default)("NewExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"],
  fields: {
    callee: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    arguments: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Expression", "SpreadElement")))
    }
  }
});

(0, _index3.default)("Program", {
  visitor: ["directives", "body"],
  builder: ["body", "directives"],
  fields: {
    directives: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Directive"))),
      default: []
    },
    body: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block", "FunctionParent"]
});

(0, _index3.default)("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("ObjectMethod", "ObjectProperty", "SpreadProperty")))
    }
  }
});

(0, _index3.default)("ObjectMethod", {
  builder: ["kind", "key", "params", "body", "computed"],
  fields: {
    kind: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("string"), (0, _index2.assertOneOf)("method", "get", "set")),
      default: "method"
    },
    computed: {
      validate: (0, _index2.assertValueType)("boolean"),
      default: false
    },
    key: {
      validate: function validate(node, key, val) {
        var expectedTypes = node.computed ? ["Expression"] : ["Identifier", "StringLiteral", "NumericLiteral"];
        _index2.assertNodeType.apply(undefined, expectedTypes)(node, key, val);
      }
    },
    decorators: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Decorator")))
    },
    body: {
      validate: (0, _index2.assertNodeType)("BlockStatement")
    },
    generator: {
      default: false,
      validate: (0, _index2.assertValueType)("boolean")
    },
    async: {
      default: false,
      validate: (0, _index2.assertValueType)("boolean")
    }
  },
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  aliases: ["UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember"]
});

(0, _index3.default)("ObjectProperty", {
  builder: ["key", "value", "computed", "shorthand", "decorators"],
  fields: {
    computed: {
      validate: (0, _index2.assertValueType)("boolean"),
      default: false
    },
    key: {
      validate: function validate(node, key, val) {
        var expectedTypes = node.computed ? ["Expression"] : ["Identifier", "StringLiteral", "NumericLiteral"];
        _index2.assertNodeType.apply(undefined, expectedTypes)(node, key, val);
      }
    },
    value: {
      validate: (0, _index2.assertNodeType)("Expression", "Pattern", "RestElement")
    },
    shorthand: {
      validate: (0, _index2.assertValueType)("boolean"),
      default: false
    },
    decorators: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Decorator"))),
      optional: true
    }
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable", "Property", "ObjectMember"]
});

(0, _index3.default)("RestElement", {
  visitor: ["argument", "typeAnnotation"],
  aliases: ["LVal"],
  fields: {
    argument: {
      validate: (0, _index2.assertNodeType)("LVal")
    },
    decorators: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Decorator")))
    }
  }
});

(0, _index3.default)("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: (0, _index2.assertNodeType)("Expression"),
      optional: true
    }
  }
});

(0, _index3.default)("SequenceExpression", {
  visitor: ["expressions"],
  fields: {
    expressions: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Expression")))
    }
  },
  aliases: ["Expression"]
});

(0, _index3.default)("SwitchCase", {
  visitor: ["test", "consequent"],
  fields: {
    test: {
      validate: (0, _index2.assertNodeType)("Expression"),
      optional: true
    },
    consequent: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("Statement")))
    }
  }
});

(0, _index3.default)("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"],
  fields: {
    discriminant: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    cases: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("SwitchCase")))
    }
  }
});

(0, _index3.default)("ThisExpression", {
  aliases: ["Expression"]
});

(0, _index3.default)("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: (0, _index2.assertNodeType)("Expression")
    }
  }
});

(0, _index3.default)("TryStatement", {
  visitor: ["block", "handler", "finalizer"],
  aliases: ["Statement"],
  fields: {
    body: {
      validate: (0, _index2.assertNodeType)("BlockStatement")
    },
    handler: {
      optional: true,
      handler: (0, _index2.assertNodeType)("BlockStatement")
    },
    finalizer: {
      optional: true,
      validate: (0, _index2.assertNodeType)("BlockStatement")
    }
  }
});

(0, _index3.default)("UnaryExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: true
    },
    argument: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    operator: {
      validate: _index2.assertOneOf.apply(undefined, _constants.UNARY_OPERATORS)
    }
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});

(0, _index3.default)("UpdateExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: false
    },
    argument: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    operator: {
      validate: _index2.assertOneOf.apply(undefined, _constants.UPDATE_OPERATORS)
    }
  },
  visitor: ["argument"],
  aliases: ["Expression"]
});

(0, _index3.default)("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"],
  fields: {
    kind: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("string"), (0, _index2.assertOneOf)("var", "let", "const"))
    },
    declarations: {
      validate: (0, _index2.chain)((0, _index2.assertValueType)("array"), (0, _index2.assertEach)((0, _index2.assertNodeType)("VariableDeclarator")))
    }
  }
});

(0, _index3.default)("VariableDeclarator", {
  visitor: ["id", "init"],
  fields: {
    id: {
      validate: (0, _index2.assertNodeType)("LVal")
    },
    init: {
      optional: true,
      validate: (0, _index2.assertNodeType)("Expression")
    }
  }
});

(0, _index3.default)("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
  fields: {
    test: {
      validate: (0, _index2.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _index2.assertNodeType)("BlockStatement", "Statement")
    }
  }
});

(0, _index3.default)("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"],
  fields: {
    object: {
      object: (0, _index2.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _index2.assertNodeType)("BlockStatement", "Statement")
    }
  }
});
}, function(modId) { var map = {"../index":1536577187662,"../constants":1536577187663,"./index":1536577187669}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187671, function(require, module, exports) {
"use strict";

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)("AssignmentPattern", {
  visitor: ["left", "right"],
  aliases: ["Pattern", "LVal"],
  fields: {
    left: {
      validate: (0, _index.assertNodeType)("Identifier")
    },
    right: {
      validate: (0, _index.assertNodeType)("Expression")
    },
    decorators: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("Decorator")))
    }
  }
});

(0, _index2.default)("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  aliases: ["Pattern", "LVal"],
  fields: {
    elements: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("Identifier", "Pattern", "RestElement")))
    },
    decorators: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("Decorator")))
    }
  }
});

(0, _index2.default)("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
  fields: {
    params: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("LVal")))
    },
    body: {
      validate: (0, _index.assertNodeType)("BlockStatement", "Expression")
    },
    async: {
      validate: (0, _index.assertValueType)("boolean"),
      default: false
    }
  }
});

(0, _index2.default)("ClassBody", {
  visitor: ["body"],
  fields: {
    body: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("ClassMethod", "ClassProperty")))
    }
  }
});

(0, _index2.default)("ClassDeclaration", {
  builder: ["id", "superClass", "body", "decorators"],
  visitor: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Statement", "Declaration", "Pureish"],
  fields: {
    id: {
      validate: (0, _index.assertNodeType)("Identifier")
    },
    body: {
      validate: (0, _index.assertNodeType)("ClassBody")
    },
    superClass: {
      optional: true,
      validate: (0, _index.assertNodeType)("Expression")
    },
    decorators: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("Decorator")))
    }
  }
});

(0, _index2.default)("ClassExpression", {
  inherits: "ClassDeclaration",
  aliases: ["Scopable", "Class", "Expression", "Pureish"],
  fields: {
    id: {
      optional: true,
      validate: (0, _index.assertNodeType)("Identifier")
    },
    body: {
      validate: (0, _index.assertNodeType)("ClassBody")
    },
    superClass: {
      optional: true,
      validate: (0, _index.assertNodeType)("Expression")
    },
    decorators: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("Decorator")))
    }
  }
});

(0, _index2.default)("ExportAllDeclaration", {
  visitor: ["source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    source: {
      validate: (0, _index.assertNodeType)("StringLiteral")
    }
  }
});

(0, _index2.default)("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    declaration: {
      validate: (0, _index.assertNodeType)("FunctionDeclaration", "ClassDeclaration", "Expression")
    }
  }
});

(0, _index2.default)("ExportNamedDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    declaration: {
      validate: (0, _index.assertNodeType)("Declaration"),
      optional: true
    },
    specifiers: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("ExportSpecifier")))
    },
    source: {
      validate: (0, _index.assertNodeType)("StringLiteral"),
      optional: true
    }
  }
});

(0, _index2.default)("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _index.assertNodeType)("Identifier")
    },
    exported: {
      validate: (0, _index.assertNodeType)("Identifier")
    }
  }
});

(0, _index2.default)("ForOfStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: (0, _index.assertNodeType)("VariableDeclaration", "LVal")
    },
    right: {
      validate: (0, _index.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _index.assertNodeType)("Statement")
    }
  }
});

(0, _index2.default)("ImportDeclaration", {
  visitor: ["specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration"],
  fields: {
    specifiers: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier")))
    },
    source: {
      validate: (0, _index.assertNodeType)("StringLiteral")
    }
  }
});

(0, _index2.default)("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _index.assertNodeType)("Identifier")
    }
  }
});

(0, _index2.default)("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _index.assertNodeType)("Identifier")
    }
  }
});

(0, _index2.default)("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _index.assertNodeType)("Identifier")
    },
    imported: {
      validate: (0, _index.assertNodeType)("Identifier")
    },
    importKind: {
      validate: (0, _index.assertOneOf)(null, "type", "typeof")
    }
  }
});

(0, _index2.default)("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"],
  fields: {
    meta: {
      validate: (0, _index.assertValueType)("string")
    },
    property: {
      validate: (0, _index.assertValueType)("string")
    }
  }
});

(0, _index2.default)("ClassMethod", {
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
  builder: ["kind", "key", "params", "body", "computed", "static"],
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  fields: {
    kind: {
      validate: (0, _index.chain)((0, _index.assertValueType)("string"), (0, _index.assertOneOf)("get", "set", "method", "constructor")),
      default: "method"
    },
    computed: {
      default: false,
      validate: (0, _index.assertValueType)("boolean")
    },
    static: {
      default: false,
      validate: (0, _index.assertValueType)("boolean")
    },
    key: {
      validate: function validate(node, key, val) {
        var expectedTypes = node.computed ? ["Expression"] : ["Identifier", "StringLiteral", "NumericLiteral"];
        _index.assertNodeType.apply(undefined, expectedTypes)(node, key, val);
      }
    },
    params: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("LVal")))
    },
    body: {
      validate: (0, _index.assertNodeType)("BlockStatement")
    },
    generator: {
      default: false,
      validate: (0, _index.assertValueType)("boolean")
    },
    async: {
      default: false,
      validate: (0, _index.assertValueType)("boolean")
    }
  }
});

(0, _index2.default)("ObjectPattern", {
  visitor: ["properties", "typeAnnotation"],
  aliases: ["Pattern", "LVal"],
  fields: {
    properties: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("RestProperty", "Property")))
    },
    decorators: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("Decorator")))
    }
  }
});

(0, _index2.default)("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});

(0, _index2.default)("Super", {
  aliases: ["Expression"]
});

(0, _index2.default)("TaggedTemplateExpression", {
  visitor: ["tag", "quasi"],
  aliases: ["Expression"],
  fields: {
    tag: {
      validate: (0, _index.assertNodeType)("Expression")
    },
    quasi: {
      validate: (0, _index.assertNodeType)("TemplateLiteral")
    }
  }
});

(0, _index2.default)("TemplateElement", {
  builder: ["value", "tail"],
  fields: {
    value: {},
    tail: {
      validate: (0, _index.assertValueType)("boolean"),
      default: false
    }
  }
});

(0, _index2.default)("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression", "Literal"],
  fields: {
    quasis: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("TemplateElement")))
    },
    expressions: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("Expression")))
    }
  }
});

(0, _index2.default)("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    delegate: {
      validate: (0, _index.assertValueType)("boolean"),
      default: false
    },
    argument: {
      optional: true,
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});
}, function(modId) { var map = {"./index":1536577187669}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187672, function(require, module, exports) {
"use strict";

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)("AnyTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {}
});

(0, _index2.default)("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("BooleanTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {}
});

(0, _index2.default)("BooleanLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("NullLiteralTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {}
});

(0, _index2.default)("ClassImplements", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: ["key", "value", "typeAnnotation", "decorators", "computed"],
  aliases: ["Property"],
  fields: {
    computed: {
      validate: (0, _index.assertValueType)("boolean"),
      default: false
    }
  }
});

(0, _index2.default)("DeclareClass", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("DeclareFunction", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("DeclareInterface", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("DeclareModule", {
  visitor: ["id", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("DeclareModuleExports", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("DeclareTypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("DeclareOpaqueType", {
  visitor: ["id", "typeParameters", "supertype"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("DeclareVariable", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("DeclareExportDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("ExistentialTypeParam", {
  aliases: ["Flow"]
});

(0, _index2.default)("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("InterfaceDeclaration", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("MixedTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

(0, _index2.default)("EmptyTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

(0, _index2.default)("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("NumericLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("NumberTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {}
});

(0, _index2.default)("StringLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("StringTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {}
});

(0, _index2.default)("ThisTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {}
});

(0, _index2.default)("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("OpaqueType", {
  visitor: ["id", "typeParameters", "impltype", "supertype"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {}
});

(0, _index2.default)("TypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["Flow", "ExpressionWrapper", "Expression"],
  fields: {}
});

(0, _index2.default)("TypeParameter", {
  visitor: ["bound"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("TypeParameterDeclaration", {
  visitor: ["params"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("TypeParameterInstantiation", {
  visitor: ["params"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {}
});

(0, _index2.default)("ObjectTypeIndexer", {
  visitor: ["id", "key", "value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {}
});

(0, _index2.default)("ObjectTypeProperty", {
  visitor: ["key", "value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {}
});

(0, _index2.default)("ObjectTypeSpreadProperty", {
  visitor: ["argument"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {}
});

(0, _index2.default)("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {}
});

(0, _index2.default)("VoidTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {}
});
}, function(modId) { var map = {"./index":1536577187669}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187673, function(require, module, exports) {
"use strict";

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: (0, _index.assertNodeType)("JSXIdentifier", "JSXNamespacedName")
    },
    value: {
      optional: true,
      validate: (0, _index.assertNodeType)("JSXElement", "StringLiteral", "JSXExpressionContainer")
    }
  }
});

(0, _index2.default)("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: (0, _index.assertNodeType)("JSXIdentifier", "JSXMemberExpression")
    }
  }
});

(0, _index2.default)("JSXElement", {
  builder: ["openingElement", "closingElement", "children", "selfClosing"],
  visitor: ["openingElement", "children", "closingElement"],
  aliases: ["JSX", "Immutable", "Expression"],
  fields: {
    openingElement: {
      validate: (0, _index.assertNodeType)("JSXOpeningElement")
    },
    closingElement: {
      optional: true,
      validate: (0, _index.assertNodeType)("JSXClosingElement")
    },
    children: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement")))
    }
  }
});

(0, _index2.default)("JSXEmptyExpression", {
  aliases: ["JSX", "Expression"]
});

(0, _index2.default)("JSXExpressionContainer", {
  visitor: ["expression"],
  aliases: ["JSX", "Immutable"],
  fields: {
    expression: {
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});

(0, _index2.default)("JSXSpreadChild", {
  visitor: ["expression"],
  aliases: ["JSX", "Immutable"],
  fields: {
    expression: {
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});

(0, _index2.default)("JSXIdentifier", {
  builder: ["name"],
  aliases: ["JSX", "Expression"],
  fields: {
    name: {
      validate: (0, _index.assertValueType)("string")
    }
  }
});

(0, _index2.default)("JSXMemberExpression", {
  visitor: ["object", "property"],
  aliases: ["JSX", "Expression"],
  fields: {
    object: {
      validate: (0, _index.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
    },
    property: {
      validate: (0, _index.assertNodeType)("JSXIdentifier")
    }
  }
});

(0, _index2.default)("JSXNamespacedName", {
  visitor: ["namespace", "name"],
  aliases: ["JSX"],
  fields: {
    namespace: {
      validate: (0, _index.assertNodeType)("JSXIdentifier")
    },
    name: {
      validate: (0, _index.assertNodeType)("JSXIdentifier")
    }
  }
});

(0, _index2.default)("JSXOpeningElement", {
  builder: ["name", "attributes", "selfClosing"],
  visitor: ["name", "attributes"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: (0, _index.assertNodeType)("JSXIdentifier", "JSXMemberExpression")
    },
    selfClosing: {
      default: false,
      validate: (0, _index.assertValueType)("boolean")
    },
    attributes: {
      validate: (0, _index.chain)((0, _index.assertValueType)("array"), (0, _index.assertEach)((0, _index.assertNodeType)("JSXAttribute", "JSXSpreadAttribute")))
    }
  }
});

(0, _index2.default)("JSXSpreadAttribute", {
  visitor: ["argument"],
  aliases: ["JSX"],
  fields: {
    argument: {
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});

(0, _index2.default)("JSXText", {
  aliases: ["JSX", "Immutable"],
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _index.assertValueType)("string")
    }
  }
});
}, function(modId) { var map = {"./index":1536577187669}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187674, function(require, module, exports) {
"use strict";

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)("Noop", {
  visitor: []
});

(0, _index2.default)("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression", "ExpressionWrapper"],
  fields: {
    expression: {
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});
}, function(modId) { var map = {"./index":1536577187669}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187675, function(require, module, exports) {
"use strict";

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)("AwaitExpression", {
  builder: ["argument"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    argument: {
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});

(0, _index2.default)("ForAwaitStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: (0, _index.assertNodeType)("VariableDeclaration", "LVal")
    },
    right: {
      validate: (0, _index.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _index.assertNodeType)("Statement")
    }
  }
});

(0, _index2.default)("BindExpression", {
  visitor: ["object", "callee"],
  aliases: ["Expression"],
  fields: {}
});

(0, _index2.default)("Import", {
  aliases: ["Expression"]
});

(0, _index2.default)("Decorator", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});

(0, _index2.default)("DoExpression", {
  visitor: ["body"],
  aliases: ["Expression"],
  fields: {
    body: {
      validate: (0, _index.assertNodeType)("BlockStatement")
    }
  }
});

(0, _index2.default)("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: (0, _index.assertNodeType)("Identifier")
    }
  }
});

(0, _index2.default)("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: (0, _index.assertNodeType)("Identifier")
    }
  }
});

(0, _index2.default)("RestProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: (0, _index.assertNodeType)("LVal")
    }
  }
});

(0, _index2.default)("SpreadProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: (0, _index.assertNodeType)("Expression")
    }
  }
});
}, function(modId) { var map = {"./index":1536577187669}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187676, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.isReactComponent = undefined;
exports.isCompatTag = isCompatTag;
exports.buildChildren = buildChildren;

var _index = require("./index");

var t = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var isReactComponent = exports.isReactComponent = t.buildMatchMemberExpression("React.Component");

function isCompatTag(tagName) {
  return !!tagName && /^[a-z]|\-/.test(tagName);
}

function cleanJSXElementLiteralChild(child, args) {
  var lines = child.value.split(/\r\n|\n|\r/);

  var lastNonEmptyLine = 0;

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].match(/[^ \t]/)) {
      lastNonEmptyLine = i;
    }
  }

  var str = "";

  for (var _i = 0; _i < lines.length; _i++) {
    var line = lines[_i];

    var isFirstLine = _i === 0;
    var isLastLine = _i === lines.length - 1;
    var isLastNonEmptyLine = _i === lastNonEmptyLine;

    var trimmedLine = line.replace(/\t/g, " ");

    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^[ ]+/, "");
    }

    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/[ ]+$/, "");
    }

    if (trimmedLine) {
      if (!isLastNonEmptyLine) {
        trimmedLine += " ";
      }

      str += trimmedLine;
    }
  }

  if (str) args.push(t.stringLiteral(str));
}

function buildChildren(node) {
  var elems = [];

  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];

    if (t.isJSXText(child)) {
      cleanJSXElementLiteralChild(child, elems);
      continue;
    }

    if (t.isJSXExpressionContainer(child)) child = child.expression;
    if (t.isJSXEmptyExpression(child)) continue;

    elems.push(child);
  }

  return elems;
}
}, function(modId) { var map = {"./index":1536577187662}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187662);
})()
//# sourceMappingURL=index.js.map