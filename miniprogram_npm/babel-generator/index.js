module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187546, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.CodeGenerator = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = function (ast, opts, code) {
  var gen = new Generator(ast, opts, code);
  return gen.generate();
};

var _detectIndent = require("detect-indent");

var _detectIndent2 = _interopRequireDefault(_detectIndent);

var _sourceMap = require("./source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _printer = require("./printer");

var _printer2 = _interopRequireDefault(_printer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Generator = function (_Printer) {
  (0, _inherits3.default)(Generator, _Printer);

  function Generator(ast) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var code = arguments[2];
    (0, _classCallCheck3.default)(this, Generator);

    var tokens = ast.tokens || [];
    var format = normalizeOptions(code, opts, tokens);
    var map = opts.sourceMaps ? new _sourceMap2.default(opts, code) : null;

    var _this = (0, _possibleConstructorReturn3.default)(this, _Printer.call(this, format, map, tokens));

    _this.ast = ast;
    return _this;
  }

  Generator.prototype.generate = function generate() {
    return _Printer.prototype.generate.call(this, this.ast);
  };

  return Generator;
}(_printer2.default);

function normalizeOptions(code, opts, tokens) {
  var style = "  ";
  if (code && typeof code === "string") {
    var indent = (0, _detectIndent2.default)(code).indent;
    if (indent && indent !== " ") style = indent;
  }

  var format = {
    auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
    auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
    shouldPrintComment: opts.shouldPrintComment,
    retainLines: opts.retainLines,
    retainFunctionParens: opts.retainFunctionParens,
    comments: opts.comments == null || opts.comments,
    compact: opts.compact,
    minified: opts.minified,
    concise: opts.concise,
    quotes: opts.quotes || findCommonStringDelimiter(code, tokens),
    jsonCompatibleStrings: opts.jsonCompatibleStrings,
    indent: {
      adjustMultilineComment: true,
      style: style,
      base: 0
    },
    flowCommaSeparator: opts.flowCommaSeparator
  };

  if (format.minified) {
    format.compact = true;

    format.shouldPrintComment = format.shouldPrintComment || function () {
      return format.comments;
    };
  } else {
    format.shouldPrintComment = format.shouldPrintComment || function (value) {
      return format.comments || value.indexOf("@license") >= 0 || value.indexOf("@preserve") >= 0;
    };
  }

  if (format.compact === "auto") {
    format.compact = code.length > 500000;

    if (format.compact) {
      console.error("[BABEL] " + messages.get("codeGeneratorDeopt", opts.filename, "500KB"));
    }
  }

  if (format.compact) {
    format.indent.adjustMultilineComment = false;
  }

  return format;
}

function findCommonStringDelimiter(code, tokens) {
  var DEFAULT_STRING_DELIMITER = "double";
  if (!code) {
    return DEFAULT_STRING_DELIMITER;
  }

  var occurrences = {
    single: 0,
    double: 0
  };

  var checked = 0;

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.type.label !== "string") continue;

    var raw = code.slice(token.start, token.end);
    if (raw[0] === "'") {
      occurrences.single++;
    } else {
      occurrences.double++;
    }

    checked++;
    if (checked >= 3) break;
  }
  if (occurrences.single > occurrences.double) {
    return "single";
  } else {
    return "double";
  }
}

var CodeGenerator = exports.CodeGenerator = function () {
  function CodeGenerator(ast, opts, code) {
    (0, _classCallCheck3.default)(this, CodeGenerator);

    this._generator = new Generator(ast, opts, code);
  }

  CodeGenerator.prototype.generate = function generate() {
    return this._generator.generate();
  };

  return CodeGenerator;
}();
}, function(modId) {var map = {"./source-map":1536577187547,"./printer":1536577187548}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187547, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourceMap = function () {
  function SourceMap(opts, code) {
    (0, _classCallCheck3.default)(this, SourceMap);

    this._cachedMap = null;
    this._code = code;
    this._opts = opts;
    this._rawMappings = [];
  }

  SourceMap.prototype.get = function get() {
    if (!this._cachedMap) {
      var map = this._cachedMap = new _sourceMap2.default.SourceMapGenerator({
        file: this._opts.sourceMapTarget,
        sourceRoot: this._opts.sourceRoot
      });

      var code = this._code;
      if (typeof code === "string") {
        map.setSourceContent(this._opts.sourceFileName, code);
      } else if ((typeof code === "undefined" ? "undefined" : (0, _typeof3.default)(code)) === "object") {
        (0, _keys2.default)(code).forEach(function (sourceFileName) {
          map.setSourceContent(sourceFileName, code[sourceFileName]);
        });
      }

      this._rawMappings.forEach(map.addMapping, map);
    }

    return this._cachedMap.toJSON();
  };

  SourceMap.prototype.getRawMappings = function getRawMappings() {
    return this._rawMappings.slice();
  };

  SourceMap.prototype.mark = function mark(generatedLine, generatedColumn, line, column, identifierName, filename) {
    if (this._lastGenLine !== generatedLine && line === null) return;

    if (this._lastGenLine === generatedLine && this._lastSourceLine === line && this._lastSourceColumn === column) {
      return;
    }

    this._cachedMap = null;
    this._lastGenLine = generatedLine;
    this._lastSourceLine = line;
    this._lastSourceColumn = column;

    this._rawMappings.push({
      name: identifierName || undefined,
      generated: {
        line: generatedLine,
        column: generatedColumn
      },
      source: line == null ? undefined : filename || this._opts.sourceFileName,
      original: line == null ? undefined : {
        line: line,
        column: column
      }
    });
  };

  return SourceMap;
}();

exports.default = SourceMap;
module.exports = exports["default"];
}, function(modId) { var map = {"source-map":1536577187547}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187548, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _weakSet = require("babel-runtime/core-js/weak-set");

var _weakSet2 = _interopRequireDefault(_weakSet);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _findLast = require("lodash/findLast");

var _findLast2 = _interopRequireDefault(_findLast);

var _isInteger = require("lodash/isInteger");

var _isInteger2 = _interopRequireDefault(_isInteger);

var _repeat = require("lodash/repeat");

var _repeat2 = _interopRequireDefault(_repeat);

var _buffer = require("./buffer");

var _buffer2 = _interopRequireDefault(_buffer);

var _node = require("./node");

var n = _interopRequireWildcard(_node);

var _whitespace = require("./whitespace");

var _whitespace2 = _interopRequireDefault(_whitespace);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCIENTIFIC_NOTATION = /e/i;
var ZERO_DECIMAL_INTEGER = /\.0+$/;
var NON_DECIMAL_LITERAL = /^0[box]/;

var Printer = function () {
  function Printer(format, map, tokens) {
    (0, _classCallCheck3.default)(this, Printer);
    this.inForStatementInitCounter = 0;
    this._printStack = [];
    this._indent = 0;
    this._insideAux = false;
    this._printedCommentStarts = {};
    this._parenPushNewlineState = null;
    this._printAuxAfterOnNextUserNode = false;
    this._printedComments = new _weakSet2.default();
    this._endsWithInteger = false;
    this._endsWithWord = false;

    this.format = format || {};
    this._buf = new _buffer2.default(map);
    this._whitespace = tokens.length > 0 ? new _whitespace2.default(tokens) : null;
  }

  Printer.prototype.generate = function generate(ast) {
    this.print(ast);
    this._maybeAddAuxComment();

    return this._buf.get();
  };

  Printer.prototype.indent = function indent() {
    if (this.format.compact || this.format.concise) return;

    this._indent++;
  };

  Printer.prototype.dedent = function dedent() {
    if (this.format.compact || this.format.concise) return;

    this._indent--;
  };

  Printer.prototype.semicolon = function semicolon() {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this._maybeAddAuxComment();
    this._append(";", !force);
  };

  Printer.prototype.rightBrace = function rightBrace() {
    if (this.format.minified) {
      this._buf.removeLastSemicolon();
    }
    this.token("}");
  };

  Printer.prototype.space = function space() {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (this.format.compact) return;

    if (this._buf.hasContent() && !this.endsWith(" ") && !this.endsWith("\n") || force) {
      this._space();
    }
  };

  Printer.prototype.word = function word(str) {
    if (this._endsWithWord) this._space();

    this._maybeAddAuxComment();
    this._append(str);

    this._endsWithWord = true;
  };

  Printer.prototype.number = function number(str) {
    this.word(str);

    this._endsWithInteger = (0, _isInteger2.default)(+str) && !NON_DECIMAL_LITERAL.test(str) && !SCIENTIFIC_NOTATION.test(str) && !ZERO_DECIMAL_INTEGER.test(str) && str[str.length - 1] !== ".";
  };

  Printer.prototype.token = function token(str) {
    if (str === "--" && this.endsWith("!") || str[0] === "+" && this.endsWith("+") || str[0] === "-" && this.endsWith("-") || str[0] === "." && this._endsWithInteger) {
      this._space();
    }

    this._maybeAddAuxComment();
    this._append(str);
  };

  Printer.prototype.newline = function newline(i) {
    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    if (this.endsWith("\n\n")) return;

    if (typeof i !== "number") i = 1;

    i = Math.min(2, i);
    if (this.endsWith("{\n") || this.endsWith(":\n")) i--;
    if (i <= 0) return;

    for (var j = 0; j < i; j++) {
      this._newline();
    }
  };

  Printer.prototype.endsWith = function endsWith(str) {
    return this._buf.endsWith(str);
  };

  Printer.prototype.removeTrailingNewline = function removeTrailingNewline() {
    this._buf.removeTrailingNewline();
  };

  Printer.prototype.source = function source(prop, loc) {
    this._catchUp(prop, loc);

    this._buf.source(prop, loc);
  };

  Printer.prototype.withSource = function withSource(prop, loc, cb) {
    this._catchUp(prop, loc);

    this._buf.withSource(prop, loc, cb);
  };

  Printer.prototype._space = function _space() {
    this._append(" ", true);
  };

  Printer.prototype._newline = function _newline() {
    this._append("\n", true);
  };

  Printer.prototype._append = function _append(str) {
    var queue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    this._maybeAddParen(str);
    this._maybeIndent(str);

    if (queue) this._buf.queue(str);else this._buf.append(str);

    this._endsWithWord = false;
    this._endsWithInteger = false;
  };

  Printer.prototype._maybeIndent = function _maybeIndent(str) {
    if (this._indent && this.endsWith("\n") && str[0] !== "\n") {
      this._buf.queue(this._getIndent());
    }
  };

  Printer.prototype._maybeAddParen = function _maybeAddParen(str) {
    var parenPushNewlineState = this._parenPushNewlineState;
    if (!parenPushNewlineState) return;
    this._parenPushNewlineState = null;

    var i = void 0;
    for (i = 0; i < str.length && str[i] === " "; i++) {
      continue;
    }if (i === str.length) return;

    var cha = str[i];
    if (cha === "\n" || cha === "/") {
      this.token("(");
      this.indent();
      parenPushNewlineState.printed = true;
    }
  };

  Printer.prototype._catchUp = function _catchUp(prop, loc) {
    if (!this.format.retainLines) return;

    var pos = loc ? loc[prop] : null;
    if (pos && pos.line !== null) {
      var count = pos.line - this._buf.getCurrentLine();

      for (var i = 0; i < count; i++) {
        this._newline();
      }
    }
  };

  Printer.prototype._getIndent = function _getIndent() {
    return (0, _repeat2.default)(this.format.indent.style, this._indent);
  };

  Printer.prototype.startTerminatorless = function startTerminatorless() {
    return this._parenPushNewlineState = {
      printed: false
    };
  };

  Printer.prototype.endTerminatorless = function endTerminatorless(state) {
    if (state.printed) {
      this.dedent();
      this.newline();
      this.token(")");
    }
  };

  Printer.prototype.print = function print(node, parent) {
    var _this = this;

    if (!node) return;

    var oldConcise = this.format.concise;
    if (node._compact) {
      this.format.concise = true;
    }

    var printMethod = this[node.type];
    if (!printMethod) {
      throw new ReferenceError("unknown node of type " + (0, _stringify2.default)(node.type) + " with constructor " + (0, _stringify2.default)(node && node.constructor.name));
    }

    this._printStack.push(node);

    var oldInAux = this._insideAux;
    this._insideAux = !node.loc;
    this._maybeAddAuxComment(this._insideAux && !oldInAux);

    var needsParens = n.needsParens(node, parent, this._printStack);
    if (this.format.retainFunctionParens && node.type === "FunctionExpression" && node.extra && node.extra.parenthesized) {
      needsParens = true;
    }
    if (needsParens) this.token("(");

    this._printLeadingComments(node, parent);

    var loc = t.isProgram(node) || t.isFile(node) ? null : node.loc;
    this.withSource("start", loc, function () {
      _this[node.type](node, parent);
    });

    this._printTrailingComments(node, parent);

    if (needsParens) this.token(")");

    this._printStack.pop();

    this.format.concise = oldConcise;
    this._insideAux = oldInAux;
  };

  Printer.prototype._maybeAddAuxComment = function _maybeAddAuxComment(enteredPositionlessNode) {
    if (enteredPositionlessNode) this._printAuxBeforeComment();
    if (!this._insideAux) this._printAuxAfterComment();
  };

  Printer.prototype._printAuxBeforeComment = function _printAuxBeforeComment() {
    if (this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = true;

    var comment = this.format.auxiliaryCommentBefore;
    if (comment) {
      this._printComment({
        type: "CommentBlock",
        value: comment
      });
    }
  };

  Printer.prototype._printAuxAfterComment = function _printAuxAfterComment() {
    if (!this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = false;

    var comment = this.format.auxiliaryCommentAfter;
    if (comment) {
      this._printComment({
        type: "CommentBlock",
        value: comment
      });
    }
  };

  Printer.prototype.getPossibleRaw = function getPossibleRaw(node) {
    var extra = node.extra;
    if (extra && extra.raw != null && extra.rawValue != null && node.value === extra.rawValue) {
      return extra.raw;
    }
  };

  Printer.prototype.printJoin = function printJoin(nodes, parent) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!nodes || !nodes.length) return;

    if (opts.indent) this.indent();

    var newlineOpts = {
      addNewlines: opts.addNewlines
    };

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (!node) continue;

      if (opts.statement) this._printNewline(true, node, parent, newlineOpts);

      this.print(node, parent);

      if (opts.iterator) {
        opts.iterator(node, i);
      }

      if (opts.separator && i < nodes.length - 1) {
        opts.separator.call(this);
      }

      if (opts.statement) this._printNewline(false, node, parent, newlineOpts);
    }

    if (opts.indent) this.dedent();
  };

  Printer.prototype.printAndIndentOnComments = function printAndIndentOnComments(node, parent) {
    var indent = !!node.leadingComments;
    if (indent) this.indent();
    this.print(node, parent);
    if (indent) this.dedent();
  };

  Printer.prototype.printBlock = function printBlock(parent) {
    var node = parent.body;

    if (!t.isEmptyStatement(node)) {
      this.space();
    }

    this.print(node, parent);
  };

  Printer.prototype._printTrailingComments = function _printTrailingComments(node, parent) {
    this._printComments(this._getComments(false, node, parent));
  };

  Printer.prototype._printLeadingComments = function _printLeadingComments(node, parent) {
    this._printComments(this._getComments(true, node, parent));
  };

  Printer.prototype.printInnerComments = function printInnerComments(node) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!node.innerComments) return;
    if (indent) this.indent();
    this._printComments(node.innerComments);
    if (indent) this.dedent();
  };

  Printer.prototype.printSequence = function printSequence(nodes, parent) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    opts.statement = true;
    return this.printJoin(nodes, parent, opts);
  };

  Printer.prototype.printList = function printList(items, parent) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (opts.separator == null) {
      opts.separator = commaSeparator;
    }

    return this.printJoin(items, parent, opts);
  };

  Printer.prototype._printNewline = function _printNewline(leading, node, parent, opts) {
    var _this2 = this;

    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    var lines = 0;

    if (node.start != null && !node._ignoreUserWhitespace && this._whitespace) {
      if (leading) {
        var _comments = node.leadingComments;
        var _comment = _comments && (0, _find2.default)(_comments, function (comment) {
          return !!comment.loc && _this2.format.shouldPrintComment(comment.value);
        });

        lines = this._whitespace.getNewlinesBefore(_comment || node);
      } else {
        var _comments2 = node.trailingComments;
        var _comment2 = _comments2 && (0, _findLast2.default)(_comments2, function (comment) {
          return !!comment.loc && _this2.format.shouldPrintComment(comment.value);
        });

        lines = this._whitespace.getNewlinesAfter(_comment2 || node);
      }
    } else {
      if (!leading) lines++;
      if (opts.addNewlines) lines += opts.addNewlines(leading, node) || 0;

      var needs = n.needsWhitespaceAfter;
      if (leading) needs = n.needsWhitespaceBefore;
      if (needs(node, parent)) lines++;

      if (!this._buf.hasContent()) lines = 0;
    }

    this.newline(lines);
  };

  Printer.prototype._getComments = function _getComments(leading, node) {
    return node && (leading ? node.leadingComments : node.trailingComments) || [];
  };

  Printer.prototype._printComment = function _printComment(comment) {
    var _this3 = this;

    if (!this.format.shouldPrintComment(comment.value)) return;

    if (comment.ignore) return;

    if (this._printedComments.has(comment)) return;
    this._printedComments.add(comment);

    if (comment.start != null) {
      if (this._printedCommentStarts[comment.start]) return;
      this._printedCommentStarts[comment.start] = true;
    }

    this.newline(this._whitespace ? this._whitespace.getNewlinesBefore(comment) : 0);

    if (!this.endsWith("[") && !this.endsWith("{")) this.space();

    var val = comment.type === "CommentLine" ? "//" + comment.value + "\n" : "/*" + comment.value + "*/";

    if (comment.type === "CommentBlock" && this.format.indent.adjustMultilineComment) {
      var offset = comment.loc && comment.loc.start.column;
      if (offset) {
        var newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
        val = val.replace(newlineRegex, "\n");
      }

      var indentSize = Math.max(this._getIndent().length, this._buf.getCurrentColumn());
      val = val.replace(/\n(?!$)/g, "\n" + (0, _repeat2.default)(" ", indentSize));
    }

    this.withSource("start", comment.loc, function () {
      _this3._append(val);
    });

    this.newline((this._whitespace ? this._whitespace.getNewlinesAfter(comment) : 0) + (comment.type === "CommentLine" ? -1 : 0));
  };

  Printer.prototype._printComments = function _printComments(comments) {
    if (!comments || !comments.length) return;

    for (var _iterator = comments, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _comment3 = _ref;

      this._printComment(_comment3);
    }
  };

  return Printer;
}();

exports.default = Printer;


function commaSeparator() {
  this.token(",");
  this.space();
}

var _arr = [require("./generators/template-literals"), require("./generators/expressions"), require("./generators/statements"), require("./generators/classes"), require("./generators/methods"), require("./generators/modules"), require("./generators/types"), require("./generators/flow"), require("./generators/base"), require("./generators/jsx")];
for (var _i2 = 0; _i2 < _arr.length; _i2++) {
  var generator = _arr[_i2];
  (0, _assign2.default)(Printer.prototype, generator);
}
module.exports = exports["default"];
}, function(modId) { var map = {"./buffer":1536577187549,"./node":1536577187550,"./whitespace":1536577187553,"./generators/template-literals":1536577187554,"./generators/expressions":1536577187555,"./generators/statements":1536577187556,"./generators/classes":1536577187557,"./generators/methods":1536577187558,"./generators/modules":1536577187559,"./generators/types":1536577187560,"./generators/flow":1536577187561,"./generators/base":1536577187562,"./generators/jsx":1536577187563}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187549, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _trimRight = require("trim-right");

var _trimRight2 = _interopRequireDefault(_trimRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPACES_RE = /^[ \t]+$/;

var Buffer = function () {
  function Buffer(map) {
    (0, _classCallCheck3.default)(this, Buffer);
    this._map = null;
    this._buf = [];
    this._last = "";
    this._queue = [];
    this._position = {
      line: 1,
      column: 0
    };
    this._sourcePosition = {
      identifierName: null,
      line: null,
      column: null,
      filename: null
    };

    this._map = map;
  }

  Buffer.prototype.get = function get() {
    this._flush();

    var map = this._map;
    var result = {
      code: (0, _trimRight2.default)(this._buf.join("")),
      map: null,
      rawMappings: map && map.getRawMappings()
    };

    if (map) {
      Object.defineProperty(result, "map", {
        configurable: true,
        enumerable: true,
        get: function get() {
          return this.map = map.get();
        },
        set: function set(value) {
          Object.defineProperty(this, "map", { value: value, writable: true });
        }
      });
    }

    return result;
  };

  Buffer.prototype.append = function append(str) {
    this._flush();
    var _sourcePosition = this._sourcePosition,
        line = _sourcePosition.line,
        column = _sourcePosition.column,
        filename = _sourcePosition.filename,
        identifierName = _sourcePosition.identifierName;

    this._append(str, line, column, identifierName, filename);
  };

  Buffer.prototype.queue = function queue(str) {
    if (str === "\n") while (this._queue.length > 0 && SPACES_RE.test(this._queue[0][0])) {
      this._queue.shift();
    }var _sourcePosition2 = this._sourcePosition,
        line = _sourcePosition2.line,
        column = _sourcePosition2.column,
        filename = _sourcePosition2.filename,
        identifierName = _sourcePosition2.identifierName;

    this._queue.unshift([str, line, column, identifierName, filename]);
  };

  Buffer.prototype._flush = function _flush() {
    var item = void 0;
    while (item = this._queue.pop()) {
      this._append.apply(this, item);
    }
  };

  Buffer.prototype._append = function _append(str, line, column, identifierName, filename) {
    if (this._map && str[0] !== "\n") {
      this._map.mark(this._position.line, this._position.column, line, column, identifierName, filename);
    }

    this._buf.push(str);
    this._last = str[str.length - 1];

    for (var i = 0; i < str.length; i++) {
      if (str[i] === "\n") {
        this._position.line++;
        this._position.column = 0;
      } else {
        this._position.column++;
      }
    }
  };

  Buffer.prototype.removeTrailingNewline = function removeTrailingNewline() {
    if (this._queue.length > 0 && this._queue[0][0] === "\n") this._queue.shift();
  };

  Buffer.prototype.removeLastSemicolon = function removeLastSemicolon() {
    if (this._queue.length > 0 && this._queue[0][0] === ";") this._queue.shift();
  };

  Buffer.prototype.endsWith = function endsWith(suffix) {
    if (suffix.length === 1) {
      var last = void 0;
      if (this._queue.length > 0) {
        var str = this._queue[0][0];
        last = str[str.length - 1];
      } else {
        last = this._last;
      }

      return last === suffix;
    }

    var end = this._last + this._queue.reduce(function (acc, item) {
      return item[0] + acc;
    }, "");
    if (suffix.length <= end.length) {
      return end.slice(-suffix.length) === suffix;
    }

    return false;
  };

  Buffer.prototype.hasContent = function hasContent() {
    return this._queue.length > 0 || !!this._last;
  };

  Buffer.prototype.source = function source(prop, loc) {
    if (prop && !loc) return;

    var pos = loc ? loc[prop] : null;

    this._sourcePosition.identifierName = loc && loc.identifierName || null;
    this._sourcePosition.line = pos ? pos.line : null;
    this._sourcePosition.column = pos ? pos.column : null;
    this._sourcePosition.filename = loc && loc.filename || null;
  };

  Buffer.prototype.withSource = function withSource(prop, loc, cb) {
    if (!this._map) return cb();

    var originalLine = this._sourcePosition.line;
    var originalColumn = this._sourcePosition.column;
    var originalFilename = this._sourcePosition.filename;
    var originalIdentifierName = this._sourcePosition.identifierName;

    this.source(prop, loc);

    cb();

    this._sourcePosition.line = originalLine;
    this._sourcePosition.column = originalColumn;
    this._sourcePosition.filename = originalFilename;
    this._sourcePosition.identifierName = originalIdentifierName;
  };

  Buffer.prototype.getCurrentColumn = function getCurrentColumn() {
    var extra = this._queue.reduce(function (acc, item) {
      return item[0] + acc;
    }, "");
    var lastIndex = extra.lastIndexOf("\n");

    return lastIndex === -1 ? this._position.column + extra.length : extra.length - 1 - lastIndex;
  };

  Buffer.prototype.getCurrentLine = function getCurrentLine() {
    var extra = this._queue.reduce(function (acc, item) {
      return item[0] + acc;
    }, "");

    var count = 0;
    for (var i = 0; i < extra.length; i++) {
      if (extra[i] === "\n") count++;
    }

    return this._position.line + count;
  };

  return Buffer;
}();

exports.default = Buffer;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187550, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

exports.needsWhitespace = needsWhitespace;
exports.needsWhitespaceBefore = needsWhitespaceBefore;
exports.needsWhitespaceAfter = needsWhitespaceAfter;
exports.needsParens = needsParens;

var _whitespace = require("./whitespace");

var _whitespace2 = _interopRequireDefault(_whitespace);

var _parentheses = require("./parentheses");

var parens = _interopRequireWildcard(_parentheses);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expandAliases(obj) {
  var newObj = {};

  function add(type, func) {
    var fn = newObj[type];
    newObj[type] = fn ? function (node, parent, stack) {
      var result = fn(node, parent, stack);

      return result == null ? func(node, parent, stack) : result;
    } : func;
  }

  for (var _iterator = (0, _keys2.default)(obj), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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


    var aliases = t.FLIPPED_ALIAS_KEYS[type];
    if (aliases) {
      for (var _iterator2 = aliases, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var alias = _ref2;

        add(alias, obj[type]);
      }
    } else {
      add(type, obj[type]);
    }
  }

  return newObj;
}

var expandedParens = expandAliases(parens);
var expandedWhitespaceNodes = expandAliases(_whitespace2.default.nodes);
var expandedWhitespaceList = expandAliases(_whitespace2.default.list);

function find(obj, node, parent, printStack) {
  var fn = obj[node.type];
  return fn ? fn(node, parent, printStack) : null;
}

function isOrHasCallExpression(node) {
  if (t.isCallExpression(node)) {
    return true;
  }

  if (t.isMemberExpression(node)) {
    return isOrHasCallExpression(node.object) || !node.computed && isOrHasCallExpression(node.property);
  } else {
    return false;
  }
}

function needsWhitespace(node, parent, type) {
  if (!node) return 0;

  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  var linesInfo = find(expandedWhitespaceNodes, node, parent);

  if (!linesInfo) {
    var items = find(expandedWhitespaceList, node, parent);
    if (items) {
      for (var i = 0; i < items.length; i++) {
        linesInfo = needsWhitespace(items[i], node, type);
        if (linesInfo) break;
      }
    }
  }

  return linesInfo && linesInfo[type] || 0;
}

function needsWhitespaceBefore(node, parent) {
  return needsWhitespace(node, parent, "before");
}

function needsWhitespaceAfter(node, parent) {
  return needsWhitespace(node, parent, "after");
}

function needsParens(node, parent, printStack) {
  if (!parent) return false;

  if (t.isNewExpression(parent) && parent.callee === node) {
    if (isOrHasCallExpression(node)) return true;
  }

  return find(expandedParens, node, parent, printStack);
}
}, function(modId) { var map = {"./whitespace":1536577187551,"./parentheses":1536577187552}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187551, function(require, module, exports) {
"use strict";

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function crawl(node) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (t.isMemberExpression(node)) {
    crawl(node.object, state);
    if (node.computed) crawl(node.property, state);
  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
    crawl(node.left, state);
    crawl(node.right, state);
  } else if (t.isCallExpression(node)) {
    state.hasCall = true;
    crawl(node.callee, state);
  } else if (t.isFunction(node)) {
    state.hasFunction = true;
  } else if (t.isIdentifier(node)) {
    state.hasHelper = state.hasHelper || isHelper(node.callee);
  }

  return state;
}

function isHelper(node) {
  if (t.isMemberExpression(node)) {
    return isHelper(node.object) || isHelper(node.property);
  } else if (t.isIdentifier(node)) {
    return node.name === "require" || node.name[0] === "_";
  } else if (t.isCallExpression(node)) {
    return isHelper(node.callee);
  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
    return t.isIdentifier(node.left) && isHelper(node.left) || isHelper(node.right);
  } else {
    return false;
  }
}

function isType(node) {
  return t.isLiteral(node) || t.isObjectExpression(node) || t.isArrayExpression(node) || t.isIdentifier(node) || t.isMemberExpression(node);
}

exports.nodes = {
  AssignmentExpression: function AssignmentExpression(node) {
    var state = crawl(node.right);
    if (state.hasCall && state.hasHelper || state.hasFunction) {
      return {
        before: state.hasFunction,
        after: true
      };
    }
  },
  SwitchCase: function SwitchCase(node, parent) {
    return {
      before: node.consequent.length || parent.cases[0] === node
    };
  },
  LogicalExpression: function LogicalExpression(node) {
    if (t.isFunction(node.left) || t.isFunction(node.right)) {
      return {
        after: true
      };
    }
  },
  Literal: function Literal(node) {
    if (node.value === "use strict") {
      return {
        after: true
      };
    }
  },
  CallExpression: function CallExpression(node) {
    if (t.isFunction(node.callee) || isHelper(node)) {
      return {
        before: true,
        after: true
      };
    }
  },
  VariableDeclaration: function VariableDeclaration(node) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];

      var enabled = isHelper(declar.id) && !isType(declar.init);
      if (!enabled) {
        var state = crawl(declar.init);
        enabled = isHelper(declar.init) && state.hasCall || state.hasFunction;
      }

      if (enabled) {
        return {
          before: true,
          after: true
        };
      }
    }
  },
  IfStatement: function IfStatement(node) {
    if (t.isBlockStatement(node.consequent)) {
      return {
        before: true,
        after: true
      };
    }
  }
};

exports.nodes.ObjectProperty = exports.nodes.ObjectTypeProperty = exports.nodes.ObjectMethod = exports.nodes.SpreadProperty = function (node, parent) {
  if (parent.properties[0] === node) {
    return {
      before: true
    };
  }
};

exports.list = {
  VariableDeclaration: function VariableDeclaration(node) {
    return (0, _map2.default)(node.declarations, "init");
  },
  ArrayExpression: function ArrayExpression(node) {
    return node.elements;
  },
  ObjectExpression: function ObjectExpression(node) {
    return node.properties;
  }
};

[["Function", true], ["Class", true], ["Loop", true], ["LabeledStatement", true], ["SwitchStatement", true], ["TryStatement", true]].forEach(function (_ref) {
  var type = _ref[0],
      amounts = _ref[1];

  if (typeof amounts === "boolean") {
    amounts = { after: amounts, before: amounts };
  }
  [type].concat(t.FLIPPED_ALIAS_KEYS[type] || []).forEach(function (type) {
    exports.nodes[type] = function () {
      return amounts;
    };
  });
});
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187552, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.AwaitExpression = exports.FunctionTypeAnnotation = undefined;
exports.NullableTypeAnnotation = NullableTypeAnnotation;
exports.UpdateExpression = UpdateExpression;
exports.ObjectExpression = ObjectExpression;
exports.DoExpression = DoExpression;
exports.Binary = Binary;
exports.BinaryExpression = BinaryExpression;
exports.SequenceExpression = SequenceExpression;
exports.YieldExpression = YieldExpression;
exports.ClassExpression = ClassExpression;
exports.UnaryLike = UnaryLike;
exports.FunctionExpression = FunctionExpression;
exports.ArrowFunctionExpression = ArrowFunctionExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.AssignmentExpression = AssignmentExpression;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PRECEDENCE = {
  "||": 0,
  "&&": 1,
  "|": 2,
  "^": 3,
  "&": 4,
  "==": 5,
  "===": 5,
  "!=": 5,
  "!==": 5,
  "<": 6,
  ">": 6,
  "<=": 6,
  ">=": 6,
  in: 6,
  instanceof: 6,
  ">>": 7,
  "<<": 7,
  ">>>": 7,
  "+": 8,
  "-": 8,
  "*": 9,
  "/": 9,
  "%": 9,
  "**": 10
};

function NullableTypeAnnotation(node, parent) {
  return t.isArrayTypeAnnotation(parent);
}

exports.FunctionTypeAnnotation = NullableTypeAnnotation;
function UpdateExpression(node, parent) {
  return t.isMemberExpression(parent) && parent.object === node;
}

function ObjectExpression(node, parent, printStack) {
  return isFirstInStatement(printStack, { considerArrow: true });
}

function DoExpression(node, parent, printStack) {
  return isFirstInStatement(printStack);
}

function Binary(node, parent) {
  if ((t.isCallExpression(parent) || t.isNewExpression(parent)) && parent.callee === node || t.isUnaryLike(parent) || t.isMemberExpression(parent) && parent.object === node || t.isAwaitExpression(parent)) {
    return true;
  }

  if (t.isBinary(parent)) {
    var parentOp = parent.operator;
    var parentPos = PRECEDENCE[parentOp];

    var nodeOp = node.operator;
    var nodePos = PRECEDENCE[nodeOp];

    if (parentPos === nodePos && parent.right === node && !t.isLogicalExpression(parent) || parentPos > nodePos) {
      return true;
    }
  }

  return false;
}

function BinaryExpression(node, parent) {
  return node.operator === "in" && (t.isVariableDeclarator(parent) || t.isFor(parent));
}

function SequenceExpression(node, parent) {

  if (t.isForStatement(parent) || t.isThrowStatement(parent) || t.isReturnStatement(parent) || t.isIfStatement(parent) && parent.test === node || t.isWhileStatement(parent) && parent.test === node || t.isForInStatement(parent) && parent.right === node || t.isSwitchStatement(parent) && parent.discriminant === node || t.isExpressionStatement(parent) && parent.expression === node) {
    return false;
  }

  return true;
}

function YieldExpression(node, parent) {
  return t.isBinary(parent) || t.isUnaryLike(parent) || t.isCallExpression(parent) || t.isMemberExpression(parent) || t.isNewExpression(parent) || t.isConditionalExpression(parent) && node === parent.test;
}

exports.AwaitExpression = YieldExpression;
function ClassExpression(node, parent, printStack) {
  return isFirstInStatement(printStack, { considerDefaultExports: true });
}

function UnaryLike(node, parent) {
  return t.isMemberExpression(parent, { object: node }) || t.isCallExpression(parent, { callee: node }) || t.isNewExpression(parent, { callee: node });
}

function FunctionExpression(node, parent, printStack) {
  return isFirstInStatement(printStack, { considerDefaultExports: true });
}

function ArrowFunctionExpression(node, parent) {
  if (t.isExportDeclaration(parent) || t.isBinaryExpression(parent) || t.isLogicalExpression(parent) || t.isUnaryExpression(parent) || t.isTaggedTemplateExpression(parent)) {
    return true;
  }

  return UnaryLike(node, parent);
}

function ConditionalExpression(node, parent) {
  if (t.isUnaryLike(parent) || t.isBinary(parent) || t.isConditionalExpression(parent, { test: node }) || t.isAwaitExpression(parent)) {
    return true;
  }

  return UnaryLike(node, parent);
}

function AssignmentExpression(node) {
  if (t.isObjectPattern(node.left)) {
    return true;
  } else {
    return ConditionalExpression.apply(undefined, arguments);
  }
}

function isFirstInStatement(printStack) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$considerArrow = _ref.considerArrow,
      considerArrow = _ref$considerArrow === undefined ? false : _ref$considerArrow,
      _ref$considerDefaultE = _ref.considerDefaultExports,
      considerDefaultExports = _ref$considerDefaultE === undefined ? false : _ref$considerDefaultE;

  var i = printStack.length - 1;
  var node = printStack[i];
  i--;
  var parent = printStack[i];
  while (i > 0) {
    if (t.isExpressionStatement(parent, { expression: node }) || t.isTaggedTemplateExpression(parent) || considerDefaultExports && t.isExportDefaultDeclaration(parent, { declaration: node }) || considerArrow && t.isArrowFunctionExpression(parent, { body: node })) {
      return true;
    }

    if (t.isCallExpression(parent, { callee: node }) || t.isSequenceExpression(parent) && parent.expressions[0] === node || t.isMemberExpression(parent, { object: node }) || t.isConditional(parent, { test: node }) || t.isBinary(parent, { left: node }) || t.isAssignmentExpression(parent, { left: node })) {
      node = parent;
      i--;
      parent = printStack[i];
    } else {
      return false;
    }
  }

  return false;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187553, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Whitespace = function () {
  function Whitespace(tokens) {
    (0, _classCallCheck3.default)(this, Whitespace);

    this.tokens = tokens;
    this.used = {};
  }

  Whitespace.prototype.getNewlinesBefore = function getNewlinesBefore(node) {
    var startToken = void 0;
    var endToken = void 0;
    var tokens = this.tokens;

    var index = this._findToken(function (token) {
      return token.start - node.start;
    }, 0, tokens.length);
    if (index >= 0) {
      while (index && node.start === tokens[index - 1].start) {
        --index;
      }startToken = tokens[index - 1];
      endToken = tokens[index];
    }

    return this._getNewlinesBetween(startToken, endToken);
  };

  Whitespace.prototype.getNewlinesAfter = function getNewlinesAfter(node) {
    var startToken = void 0;
    var endToken = void 0;
    var tokens = this.tokens;

    var index = this._findToken(function (token) {
      return token.end - node.end;
    }, 0, tokens.length);
    if (index >= 0) {
      while (index && node.end === tokens[index - 1].end) {
        --index;
      }startToken = tokens[index];
      endToken = tokens[index + 1];
      if (endToken && endToken.type.label === ",") endToken = tokens[index + 2];
    }

    if (endToken && endToken.type.label === "eof") {
      return 1;
    } else {
      return this._getNewlinesBetween(startToken, endToken);
    }
  };

  Whitespace.prototype._getNewlinesBetween = function _getNewlinesBetween(startToken, endToken) {
    if (!endToken || !endToken.loc) return 0;

    var start = startToken ? startToken.loc.end.line : 1;
    var end = endToken.loc.start.line;
    var lines = 0;

    for (var line = start; line < end; line++) {
      if (typeof this.used[line] === "undefined") {
        this.used[line] = true;
        lines++;
      }
    }

    return lines;
  };

  Whitespace.prototype._findToken = function _findToken(test, start, end) {
    if (start >= end) return -1;
    var middle = start + end >>> 1;
    var match = test(this.tokens[middle]);
    if (match < 0) {
      return this._findToken(test, middle + 1, end);
    } else if (match > 0) {
      return this._findToken(test, start, middle);
    } else if (match === 0) {
      return middle;
    }
    return -1;
  };

  return Whitespace;
}();

exports.default = Whitespace;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187554, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.TaggedTemplateExpression = TaggedTemplateExpression;
exports.TemplateElement = TemplateElement;
exports.TemplateLiteral = TemplateLiteral;
function TaggedTemplateExpression(node) {
  this.print(node.tag, node);
  this.print(node.quasi, node);
}

function TemplateElement(node, parent) {
  var isFirst = parent.quasis[0] === node;
  var isLast = parent.quasis[parent.quasis.length - 1] === node;

  var value = (isFirst ? "`" : "}") + node.value.raw + (isLast ? "`" : "${");

  this.token(value);
}

function TemplateLiteral(node) {
  var quasis = node.quasis;

  for (var i = 0; i < quasis.length; i++) {
    this.print(quasis[i], node);

    if (i + 1 < quasis.length) {
      this.print(node.expressions[i], node);
    }
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187555, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.LogicalExpression = exports.BinaryExpression = exports.AwaitExpression = exports.YieldExpression = undefined;
exports.UnaryExpression = UnaryExpression;
exports.DoExpression = DoExpression;
exports.ParenthesizedExpression = ParenthesizedExpression;
exports.UpdateExpression = UpdateExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.NewExpression = NewExpression;
exports.SequenceExpression = SequenceExpression;
exports.ThisExpression = ThisExpression;
exports.Super = Super;
exports.Decorator = Decorator;
exports.CallExpression = CallExpression;
exports.Import = Import;
exports.EmptyStatement = EmptyStatement;
exports.ExpressionStatement = ExpressionStatement;
exports.AssignmentPattern = AssignmentPattern;
exports.AssignmentExpression = AssignmentExpression;
exports.BindExpression = BindExpression;
exports.MemberExpression = MemberExpression;
exports.MetaProperty = MetaProperty;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _node = require("../node");

var n = _interopRequireWildcard(_node);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function UnaryExpression(node) {
  if (node.operator === "void" || node.operator === "delete" || node.operator === "typeof") {
    this.word(node.operator);
    this.space();
  } else {
    this.token(node.operator);
  }

  this.print(node.argument, node);
}

function DoExpression(node) {
  this.word("do");
  this.space();
  this.print(node.body, node);
}

function ParenthesizedExpression(node) {
  this.token("(");
  this.print(node.expression, node);
  this.token(")");
}

function UpdateExpression(node) {
  if (node.prefix) {
    this.token(node.operator);
    this.print(node.argument, node);
  } else {
    this.print(node.argument, node);
    this.token(node.operator);
  }
}

function ConditionalExpression(node) {
  this.print(node.test, node);
  this.space();
  this.token("?");
  this.space();
  this.print(node.consequent, node);
  this.space();
  this.token(":");
  this.space();
  this.print(node.alternate, node);
}

function NewExpression(node, parent) {
  this.word("new");
  this.space();
  this.print(node.callee, node);
  if (node.arguments.length === 0 && this.format.minified && !t.isCallExpression(parent, { callee: node }) && !t.isMemberExpression(parent) && !t.isNewExpression(parent)) return;

  this.token("(");
  this.printList(node.arguments, node);
  this.token(")");
}

function SequenceExpression(node) {
  this.printList(node.expressions, node);
}

function ThisExpression() {
  this.word("this");
}

function Super() {
  this.word("super");
}

function Decorator(node) {
  this.token("@");
  this.print(node.expression, node);
  this.newline();
}

function commaSeparatorNewline() {
  this.token(",");
  this.newline();

  if (!this.endsWith("\n")) this.space();
}

function CallExpression(node) {
  this.print(node.callee, node);

  this.token("(");

  var isPrettyCall = node._prettyCall;

  var separator = void 0;
  if (isPrettyCall) {
    separator = commaSeparatorNewline;
    this.newline();
    this.indent();
  }

  this.printList(node.arguments, node, { separator: separator });

  if (isPrettyCall) {
    this.newline();
    this.dedent();
  }

  this.token(")");
}

function Import() {
  this.word("import");
}

function buildYieldAwait(keyword) {
  return function (node) {
    this.word(keyword);

    if (node.delegate) {
      this.token("*");
    }

    if (node.argument) {
      this.space();
      var terminatorState = this.startTerminatorless();
      this.print(node.argument, node);
      this.endTerminatorless(terminatorState);
    }
  };
}

var YieldExpression = exports.YieldExpression = buildYieldAwait("yield");
var AwaitExpression = exports.AwaitExpression = buildYieldAwait("await");

function EmptyStatement() {
  this.semicolon(true);
}

function ExpressionStatement(node) {
  this.print(node.expression, node);
  this.semicolon();
}

function AssignmentPattern(node) {
  this.print(node.left, node);
  if (node.left.optional) this.token("?");
  this.print(node.left.typeAnnotation, node);
  this.space();
  this.token("=");
  this.space();
  this.print(node.right, node);
}

function AssignmentExpression(node, parent) {
  var parens = this.inForStatementInitCounter && node.operator === "in" && !n.needsParens(node, parent);

  if (parens) {
    this.token("(");
  }

  this.print(node.left, node);

  this.space();
  if (node.operator === "in" || node.operator === "instanceof") {
    this.word(node.operator);
  } else {
    this.token(node.operator);
  }
  this.space();

  this.print(node.right, node);

  if (parens) {
    this.token(")");
  }
}

function BindExpression(node) {
  this.print(node.object, node);
  this.token("::");
  this.print(node.callee, node);
}

exports.BinaryExpression = AssignmentExpression;
exports.LogicalExpression = AssignmentExpression;
function MemberExpression(node) {
  this.print(node.object, node);

  if (!node.computed && t.isMemberExpression(node.property)) {
    throw new TypeError("Got a MemberExpression for MemberExpression property");
  }

  var computed = node.computed;
  if (t.isLiteral(node.property) && typeof node.property.value === "number") {
    computed = true;
  }

  if (computed) {
    this.token("[");
    this.print(node.property, node);
    this.token("]");
  } else {
    this.token(".");
    this.print(node.property, node);
  }
}

function MetaProperty(node) {
  this.print(node.meta, node);
  this.token(".");
  this.print(node.property, node);
}
}, function(modId) { var map = {"../node":1536577187550}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187556, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.ThrowStatement = exports.BreakStatement = exports.ReturnStatement = exports.ContinueStatement = exports.ForAwaitStatement = exports.ForOfStatement = exports.ForInStatement = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.WithStatement = WithStatement;
exports.IfStatement = IfStatement;
exports.ForStatement = ForStatement;
exports.WhileStatement = WhileStatement;
exports.DoWhileStatement = DoWhileStatement;
exports.LabeledStatement = LabeledStatement;
exports.TryStatement = TryStatement;
exports.CatchClause = CatchClause;
exports.SwitchStatement = SwitchStatement;
exports.SwitchCase = SwitchCase;
exports.DebuggerStatement = DebuggerStatement;
exports.VariableDeclaration = VariableDeclaration;
exports.VariableDeclarator = VariableDeclarator;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WithStatement(node) {
  this.word("with");
  this.space();
  this.token("(");
  this.print(node.object, node);
  this.token(")");
  this.printBlock(node);
}

function IfStatement(node) {
  this.word("if");
  this.space();
  this.token("(");
  this.print(node.test, node);
  this.token(")");
  this.space();

  var needsBlock = node.alternate && t.isIfStatement(getLastStatement(node.consequent));
  if (needsBlock) {
    this.token("{");
    this.newline();
    this.indent();
  }

  this.printAndIndentOnComments(node.consequent, node);

  if (needsBlock) {
    this.dedent();
    this.newline();
    this.token("}");
  }

  if (node.alternate) {
    if (this.endsWith("}")) this.space();
    this.word("else");
    this.space();
    this.printAndIndentOnComments(node.alternate, node);
  }
}

function getLastStatement(statement) {
  if (!t.isStatement(statement.body)) return statement;
  return getLastStatement(statement.body);
}

function ForStatement(node) {
  this.word("for");
  this.space();
  this.token("(");

  this.inForStatementInitCounter++;
  this.print(node.init, node);
  this.inForStatementInitCounter--;
  this.token(";");

  if (node.test) {
    this.space();
    this.print(node.test, node);
  }
  this.token(";");

  if (node.update) {
    this.space();
    this.print(node.update, node);
  }

  this.token(")");
  this.printBlock(node);
}

function WhileStatement(node) {
  this.word("while");
  this.space();
  this.token("(");
  this.print(node.test, node);
  this.token(")");
  this.printBlock(node);
}

var buildForXStatement = function buildForXStatement(op) {
  return function (node) {
    this.word("for");
    this.space();
    if (op === "await") {
      this.word("await");
      this.space();
    }
    this.token("(");

    this.print(node.left, node);
    this.space();
    this.word(op === "await" ? "of" : op);
    this.space();
    this.print(node.right, node);
    this.token(")");
    this.printBlock(node);
  };
};

var ForInStatement = exports.ForInStatement = buildForXStatement("in");
var ForOfStatement = exports.ForOfStatement = buildForXStatement("of");
var ForAwaitStatement = exports.ForAwaitStatement = buildForXStatement("await");

function DoWhileStatement(node) {
  this.word("do");
  this.space();
  this.print(node.body, node);
  this.space();
  this.word("while");
  this.space();
  this.token("(");
  this.print(node.test, node);
  this.token(")");
  this.semicolon();
}

function buildLabelStatement(prefix) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "label";

  return function (node) {
    this.word(prefix);

    var label = node[key];
    if (label) {
      this.space();

      var terminatorState = this.startTerminatorless();
      this.print(label, node);
      this.endTerminatorless(terminatorState);
    }

    this.semicolon();
  };
}

var ContinueStatement = exports.ContinueStatement = buildLabelStatement("continue");
var ReturnStatement = exports.ReturnStatement = buildLabelStatement("return", "argument");
var BreakStatement = exports.BreakStatement = buildLabelStatement("break");
var ThrowStatement = exports.ThrowStatement = buildLabelStatement("throw", "argument");

function LabeledStatement(node) {
  this.print(node.label, node);
  this.token(":");
  this.space();
  this.print(node.body, node);
}

function TryStatement(node) {
  this.word("try");
  this.space();
  this.print(node.block, node);
  this.space();

  if (node.handlers) {
    this.print(node.handlers[0], node);
  } else {
    this.print(node.handler, node);
  }

  if (node.finalizer) {
    this.space();
    this.word("finally");
    this.space();
    this.print(node.finalizer, node);
  }
}

function CatchClause(node) {
  this.word("catch");
  this.space();
  this.token("(");
  this.print(node.param, node);
  this.token(")");
  this.space();
  this.print(node.body, node);
}

function SwitchStatement(node) {
  this.word("switch");
  this.space();
  this.token("(");
  this.print(node.discriminant, node);
  this.token(")");
  this.space();
  this.token("{");

  this.printSequence(node.cases, node, {
    indent: true,
    addNewlines: function addNewlines(leading, cas) {
      if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
    }
  });

  this.token("}");
}

function SwitchCase(node) {
  if (node.test) {
    this.word("case");
    this.space();
    this.print(node.test, node);
    this.token(":");
  } else {
    this.word("default");
    this.token(":");
  }

  if (node.consequent.length) {
    this.newline();
    this.printSequence(node.consequent, node, { indent: true });
  }
}

function DebuggerStatement() {
  this.word("debugger");
  this.semicolon();
}

function variableDeclarationIdent() {
  this.token(",");
  this.newline();
  if (this.endsWith("\n")) for (var i = 0; i < 4; i++) {
    this.space(true);
  }
}

function constDeclarationIdent() {
  this.token(",");
  this.newline();
  if (this.endsWith("\n")) for (var i = 0; i < 6; i++) {
    this.space(true);
  }
}

function VariableDeclaration(node, parent) {
  this.word(node.kind);
  this.space();

  var hasInits = false;

  if (!t.isFor(parent)) {
    for (var _iterator = node.declarations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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
        hasInits = true;
      }
    }
  }

  var separator = void 0;
  if (hasInits) {
    separator = node.kind === "const" ? constDeclarationIdent : variableDeclarationIdent;
  }

  this.printList(node.declarations, node, { separator: separator });

  if (t.isFor(parent)) {
    if (parent.left === node || parent.init === node) return;
  }

  this.semicolon();
}

function VariableDeclarator(node) {
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  if (node.init) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.init, node);
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187557, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.ClassDeclaration = ClassDeclaration;
exports.ClassBody = ClassBody;
exports.ClassProperty = ClassProperty;
exports.ClassMethod = ClassMethod;
function ClassDeclaration(node) {
  this.printJoin(node.decorators, node);
  this.word("class");

  if (node.id) {
    this.space();
    this.print(node.id, node);
  }

  this.print(node.typeParameters, node);

  if (node.superClass) {
    this.space();
    this.word("extends");
    this.space();
    this.print(node.superClass, node);
    this.print(node.superTypeParameters, node);
  }

  if (node.implements) {
    this.space();
    this.word("implements");
    this.space();
    this.printList(node.implements, node);
  }

  this.space();
  this.print(node.body, node);
}

exports.ClassExpression = ClassDeclaration;
function ClassBody(node) {
  this.token("{");
  this.printInnerComments(node);
  if (node.body.length === 0) {
    this.token("}");
  } else {
    this.newline();

    this.indent();
    this.printSequence(node.body, node);
    this.dedent();

    if (!this.endsWith("\n")) this.newline();

    this.rightBrace();
  }
}

function ClassProperty(node) {
  this.printJoin(node.decorators, node);

  if (node.static) {
    this.word("static");
    this.space();
  }
  if (node.computed) {
    this.token("[");
    this.print(node.key, node);
    this.token("]");
  } else {
    this._variance(node);
    this.print(node.key, node);
  }
  this.print(node.typeAnnotation, node);
  if (node.value) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.value, node);
  }
  this.semicolon();
}

function ClassMethod(node) {
  this.printJoin(node.decorators, node);

  if (node.static) {
    this.word("static");
    this.space();
  }

  if (node.kind === "constructorCall") {
    this.word("call");
    this.space();
  }

  this._method(node);
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187558, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.FunctionDeclaration = undefined;
exports._params = _params;
exports._method = _method;
exports.FunctionExpression = FunctionExpression;
exports.ArrowFunctionExpression = ArrowFunctionExpression;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _params(node) {
  var _this = this;

  this.print(node.typeParameters, node);
  this.token("(");
  this.printList(node.params, node, {
    iterator: function iterator(node) {
      if (node.optional) _this.token("?");
      _this.print(node.typeAnnotation, node);
    }
  });
  this.token(")");

  if (node.returnType) {
    this.print(node.returnType, node);
  }
}

function _method(node) {
  var kind = node.kind;
  var key = node.key;

  if (kind === "method" || kind === "init") {
    if (node.generator) {
      this.token("*");
    }
  }

  if (kind === "get" || kind === "set") {
    this.word(kind);
    this.space();
  }

  if (node.async) {
    this.word("async");
    this.space();
  }

  if (node.computed) {
    this.token("[");
    this.print(key, node);
    this.token("]");
  } else {
    this.print(key, node);
  }

  this._params(node);
  this.space();
  this.print(node.body, node);
}

function FunctionExpression(node) {
  if (node.async) {
    this.word("async");
    this.space();
  }
  this.word("function");
  if (node.generator) this.token("*");

  if (node.id) {
    this.space();
    this.print(node.id, node);
  } else {
    this.space();
  }

  this._params(node);
  this.space();
  this.print(node.body, node);
}

exports.FunctionDeclaration = FunctionExpression;
function ArrowFunctionExpression(node) {
  if (node.async) {
    this.word("async");
    this.space();
  }

  var firstParam = node.params[0];

  if (node.params.length === 1 && t.isIdentifier(firstParam) && !hasTypes(node, firstParam)) {
    this.print(firstParam, node);
  } else {
    this._params(node);
  }

  this.space();
  this.token("=>");
  this.space();

  this.print(node.body, node);
}

function hasTypes(node, param) {
  return node.typeParameters || node.returnType || param.typeAnnotation || param.optional || param.trailingComments;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187559, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.ImportSpecifier = ImportSpecifier;
exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
exports.ExportDefaultSpecifier = ExportDefaultSpecifier;
exports.ExportSpecifier = ExportSpecifier;
exports.ExportNamespaceSpecifier = ExportNamespaceSpecifier;
exports.ExportAllDeclaration = ExportAllDeclaration;
exports.ExportNamedDeclaration = ExportNamedDeclaration;
exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
exports.ImportDeclaration = ImportDeclaration;
exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function ImportSpecifier(node) {
  if (node.importKind === "type" || node.importKind === "typeof") {
    this.word(node.importKind);
    this.space();
  }

  this.print(node.imported, node);
  if (node.local && node.local.name !== node.imported.name) {
    this.space();
    this.word("as");
    this.space();
    this.print(node.local, node);
  }
}

function ImportDefaultSpecifier(node) {
  this.print(node.local, node);
}

function ExportDefaultSpecifier(node) {
  this.print(node.exported, node);
}

function ExportSpecifier(node) {
  this.print(node.local, node);
  if (node.exported && node.local.name !== node.exported.name) {
    this.space();
    this.word("as");
    this.space();
    this.print(node.exported, node);
  }
}

function ExportNamespaceSpecifier(node) {
  this.token("*");
  this.space();
  this.word("as");
  this.space();
  this.print(node.exported, node);
}

function ExportAllDeclaration(node) {
  this.word("export");
  this.space();
  this.token("*");
  this.space();
  this.word("from");
  this.space();
  this.print(node.source, node);
  this.semicolon();
}

function ExportNamedDeclaration() {
  this.word("export");
  this.space();
  ExportDeclaration.apply(this, arguments);
}

function ExportDefaultDeclaration() {
  this.word("export");
  this.space();
  this.word("default");
  this.space();
  ExportDeclaration.apply(this, arguments);
}

function ExportDeclaration(node) {
  if (node.declaration) {
    var declar = node.declaration;
    this.print(declar, node);
    if (!t.isStatement(declar)) this.semicolon();
  } else {
    if (node.exportKind === "type") {
      this.word("type");
      this.space();
    }

    var specifiers = node.specifiers.slice(0);

    var hasSpecial = false;
    while (true) {
      var first = specifiers[0];
      if (t.isExportDefaultSpecifier(first) || t.isExportNamespaceSpecifier(first)) {
        hasSpecial = true;
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.token(",");
          this.space();
        }
      } else {
        break;
      }
    }

    if (specifiers.length || !specifiers.length && !hasSpecial) {
      this.token("{");
      if (specifiers.length) {
        this.space();
        this.printList(specifiers, node);
        this.space();
      }
      this.token("}");
    }

    if (node.source) {
      this.space();
      this.word("from");
      this.space();
      this.print(node.source, node);
    }

    this.semicolon();
  }
}

function ImportDeclaration(node) {
  this.word("import");
  this.space();

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.word(node.importKind);
    this.space();
  }

  var specifiers = node.specifiers.slice(0);
  if (specifiers && specifiers.length) {
    while (true) {
      var first = specifiers[0];
      if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.token(",");
          this.space();
        }
      } else {
        break;
      }
    }

    if (specifiers.length) {
      this.token("{");
      this.space();
      this.printList(specifiers, node);
      this.space();
      this.token("}");
    }

    this.space();
    this.word("from");
    this.space();
  }

  this.print(node.source, node);
  this.semicolon();
}

function ImportNamespaceSpecifier(node) {
  this.token("*");
  this.space();
  this.word("as");
  this.space();
  this.print(node.local, node);
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187560, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.ArrayPattern = exports.ObjectPattern = exports.RestProperty = exports.SpreadProperty = exports.SpreadElement = undefined;
exports.Identifier = Identifier;
exports.RestElement = RestElement;
exports.ObjectExpression = ObjectExpression;
exports.ObjectMethod = ObjectMethod;
exports.ObjectProperty = ObjectProperty;
exports.ArrayExpression = ArrayExpression;
exports.RegExpLiteral = RegExpLiteral;
exports.BooleanLiteral = BooleanLiteral;
exports.NullLiteral = NullLiteral;
exports.NumericLiteral = NumericLiteral;
exports.StringLiteral = StringLiteral;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _jsesc = require("jsesc");

var _jsesc2 = _interopRequireDefault(_jsesc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function Identifier(node) {
  if (node.variance) {
    if (node.variance === "plus") {
      this.token("+");
    } else if (node.variance === "minus") {
      this.token("-");
    }
  }

  this.word(node.name);
}

function RestElement(node) {
  this.token("...");
  this.print(node.argument, node);
}

exports.SpreadElement = RestElement;
exports.SpreadProperty = RestElement;
exports.RestProperty = RestElement;
function ObjectExpression(node) {
  var props = node.properties;

  this.token("{");
  this.printInnerComments(node);

  if (props.length) {
    this.space();
    this.printList(props, node, { indent: true, statement: true });
    this.space();
  }

  this.token("}");
}

exports.ObjectPattern = ObjectExpression;
function ObjectMethod(node) {
  this.printJoin(node.decorators, node);
  this._method(node);
}

function ObjectProperty(node) {
  this.printJoin(node.decorators, node);

  if (node.computed) {
    this.token("[");
    this.print(node.key, node);
    this.token("]");
  } else {
    if (t.isAssignmentPattern(node.value) && t.isIdentifier(node.key) && node.key.name === node.value.left.name) {
      this.print(node.value, node);
      return;
    }

    this.print(node.key, node);

    if (node.shorthand && t.isIdentifier(node.key) && t.isIdentifier(node.value) && node.key.name === node.value.name) {
      return;
    }
  }

  this.token(":");
  this.space();
  this.print(node.value, node);
}

function ArrayExpression(node) {
  var elems = node.elements;
  var len = elems.length;

  this.token("[");
  this.printInnerComments(node);

  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    if (elem) {
      if (i > 0) this.space();
      this.print(elem, node);
      if (i < len - 1) this.token(",");
    } else {
      this.token(",");
    }
  }

  this.token("]");
}

exports.ArrayPattern = ArrayExpression;
function RegExpLiteral(node) {
  this.word("/" + node.pattern + "/" + node.flags);
}

function BooleanLiteral(node) {
  this.word(node.value ? "true" : "false");
}

function NullLiteral() {
  this.word("null");
}

function NumericLiteral(node) {
  var raw = this.getPossibleRaw(node);
  var value = node.value + "";
  if (raw == null) {
    this.number(value);
  } else if (this.format.minified) {
    this.number(raw.length < value.length ? raw : value);
  } else {
    this.number(raw);
  }
}

function StringLiteral(node, parent) {
  var raw = this.getPossibleRaw(node);
  if (!this.format.minified && raw != null) {
    this.token(raw);
    return;
  }

  var opts = {
    quotes: t.isJSX(parent) ? "double" : this.format.quotes,
    wrap: true
  };
  if (this.format.jsonCompatibleStrings) {
    opts.json = true;
  }
  var val = (0, _jsesc2.default)(node.value, opts);

  return this.token(val);
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187561, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.TypeParameterDeclaration = exports.StringLiteralTypeAnnotation = exports.NumericLiteralTypeAnnotation = exports.GenericTypeAnnotation = exports.ClassImplements = undefined;
exports.AnyTypeAnnotation = AnyTypeAnnotation;
exports.ArrayTypeAnnotation = ArrayTypeAnnotation;
exports.BooleanTypeAnnotation = BooleanTypeAnnotation;
exports.BooleanLiteralTypeAnnotation = BooleanLiteralTypeAnnotation;
exports.NullLiteralTypeAnnotation = NullLiteralTypeAnnotation;
exports.DeclareClass = DeclareClass;
exports.DeclareFunction = DeclareFunction;
exports.DeclareInterface = DeclareInterface;
exports.DeclareModule = DeclareModule;
exports.DeclareModuleExports = DeclareModuleExports;
exports.DeclareTypeAlias = DeclareTypeAlias;
exports.DeclareOpaqueType = DeclareOpaqueType;
exports.DeclareVariable = DeclareVariable;
exports.DeclareExportDeclaration = DeclareExportDeclaration;
exports.ExistentialTypeParam = ExistentialTypeParam;
exports.FunctionTypeAnnotation = FunctionTypeAnnotation;
exports.FunctionTypeParam = FunctionTypeParam;
exports.InterfaceExtends = InterfaceExtends;
exports._interfaceish = _interfaceish;
exports._variance = _variance;
exports.InterfaceDeclaration = InterfaceDeclaration;
exports.IntersectionTypeAnnotation = IntersectionTypeAnnotation;
exports.MixedTypeAnnotation = MixedTypeAnnotation;
exports.EmptyTypeAnnotation = EmptyTypeAnnotation;
exports.NullableTypeAnnotation = NullableTypeAnnotation;

var _types = require("./types");

Object.defineProperty(exports, "NumericLiteralTypeAnnotation", {
  enumerable: true,
  get: function get() {
    return _types.NumericLiteral;
  }
});
Object.defineProperty(exports, "StringLiteralTypeAnnotation", {
  enumerable: true,
  get: function get() {
    return _types.StringLiteral;
  }
});
exports.NumberTypeAnnotation = NumberTypeAnnotation;
exports.StringTypeAnnotation = StringTypeAnnotation;
exports.ThisTypeAnnotation = ThisTypeAnnotation;
exports.TupleTypeAnnotation = TupleTypeAnnotation;
exports.TypeofTypeAnnotation = TypeofTypeAnnotation;
exports.TypeAlias = TypeAlias;
exports.OpaqueType = OpaqueType;
exports.TypeAnnotation = TypeAnnotation;
exports.TypeParameter = TypeParameter;
exports.TypeParameterInstantiation = TypeParameterInstantiation;
exports.ObjectTypeAnnotation = ObjectTypeAnnotation;
exports.ObjectTypeCallProperty = ObjectTypeCallProperty;
exports.ObjectTypeIndexer = ObjectTypeIndexer;
exports.ObjectTypeProperty = ObjectTypeProperty;
exports.ObjectTypeSpreadProperty = ObjectTypeSpreadProperty;
exports.QualifiedTypeIdentifier = QualifiedTypeIdentifier;
exports.UnionTypeAnnotation = UnionTypeAnnotation;
exports.TypeCastExpression = TypeCastExpression;
exports.VoidTypeAnnotation = VoidTypeAnnotation;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function AnyTypeAnnotation() {
  this.word("any");
}

function ArrayTypeAnnotation(node) {
  this.print(node.elementType, node);
  this.token("[");
  this.token("]");
}

function BooleanTypeAnnotation() {
  this.word("boolean");
}

function BooleanLiteralTypeAnnotation(node) {
  this.word(node.value ? "true" : "false");
}

function NullLiteralTypeAnnotation() {
  this.word("null");
}

function DeclareClass(node, parent) {
  if (!t.isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("class");
  this.space();
  this._interfaceish(node);
}

function DeclareFunction(node, parent) {
  if (!t.isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("function");
  this.space();
  this.print(node.id, node);
  this.print(node.id.typeAnnotation.typeAnnotation, node);
  this.semicolon();
}

function DeclareInterface(node) {
  this.word("declare");
  this.space();
  this.InterfaceDeclaration(node);
}

function DeclareModule(node) {
  this.word("declare");
  this.space();
  this.word("module");
  this.space();
  this.print(node.id, node);
  this.space();
  this.print(node.body, node);
}

function DeclareModuleExports(node) {
  this.word("declare");
  this.space();
  this.word("module");
  this.token(".");
  this.word("exports");
  this.print(node.typeAnnotation, node);
}

function DeclareTypeAlias(node) {
  this.word("declare");
  this.space();
  this.TypeAlias(node);
}

function DeclareOpaqueType(node, parent) {
  if (!t.isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.OpaqueType(node);
}

function DeclareVariable(node, parent) {
  if (!t.isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("var");
  this.space();
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  this.semicolon();
}

function DeclareExportDeclaration(node) {
  this.word("declare");
  this.space();
  this.word("export");
  this.space();
  if (node.default) {
    this.word("default");
    this.space();
  }

  FlowExportDeclaration.apply(this, arguments);
}

function FlowExportDeclaration(node) {
  if (node.declaration) {
    var declar = node.declaration;
    this.print(declar, node);
    if (!t.isStatement(declar)) this.semicolon();
  } else {
    this.token("{");
    if (node.specifiers.length) {
      this.space();
      this.printList(node.specifiers, node);
      this.space();
    }
    this.token("}");

    if (node.source) {
      this.space();
      this.word("from");
      this.space();
      this.print(node.source, node);
    }

    this.semicolon();
  }
}

function ExistentialTypeParam() {
  this.token("*");
}

function FunctionTypeAnnotation(node, parent) {
  this.print(node.typeParameters, node);
  this.token("(");
  this.printList(node.params, node);

  if (node.rest) {
    if (node.params.length) {
      this.token(",");
      this.space();
    }
    this.token("...");
    this.print(node.rest, node);
  }

  this.token(")");

  if (parent.type === "ObjectTypeCallProperty" || parent.type === "DeclareFunction") {
    this.token(":");
  } else {
    this.space();
    this.token("=>");
  }

  this.space();
  this.print(node.returnType, node);
}

function FunctionTypeParam(node) {
  this.print(node.name, node);
  if (node.optional) this.token("?");
  this.token(":");
  this.space();
  this.print(node.typeAnnotation, node);
}

function InterfaceExtends(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
}

exports.ClassImplements = InterfaceExtends;
exports.GenericTypeAnnotation = InterfaceExtends;
function _interfaceish(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  if (node.extends.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(node.extends, node);
  }
  if (node.mixins && node.mixins.length) {
    this.space();
    this.word("mixins");
    this.space();
    this.printList(node.mixins, node);
  }
  this.space();
  this.print(node.body, node);
}

function _variance(node) {
  if (node.variance === "plus") {
    this.token("+");
  } else if (node.variance === "minus") {
    this.token("-");
  }
}

function InterfaceDeclaration(node) {
  this.word("interface");
  this.space();
  this._interfaceish(node);
}

function andSeparator() {
  this.space();
  this.token("&");
  this.space();
}

function IntersectionTypeAnnotation(node) {
  this.printJoin(node.types, node, { separator: andSeparator });
}

function MixedTypeAnnotation() {
  this.word("mixed");
}

function EmptyTypeAnnotation() {
  this.word("empty");
}

function NullableTypeAnnotation(node) {
  this.token("?");
  this.print(node.typeAnnotation, node);
}

function NumberTypeAnnotation() {
  this.word("number");
}

function StringTypeAnnotation() {
  this.word("string");
}

function ThisTypeAnnotation() {
  this.word("this");
}

function TupleTypeAnnotation(node) {
  this.token("[");
  this.printList(node.types, node);
  this.token("]");
}

function TypeofTypeAnnotation(node) {
  this.word("typeof");
  this.space();
  this.print(node.argument, node);
}

function TypeAlias(node) {
  this.word("type");
  this.space();
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  this.space();
  this.token("=");
  this.space();
  this.print(node.right, node);
  this.semicolon();
}
function OpaqueType(node) {
  this.word("opaque");
  this.space();
  this.word("type");
  this.space();
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  if (node.supertype) {
    this.token(":");
    this.space();
    this.print(node.supertype, node);
  }
  if (node.impltype) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.impltype, node);
  }
  this.semicolon();
}

function TypeAnnotation(node) {
  this.token(":");
  this.space();
  if (node.optional) this.token("?");
  this.print(node.typeAnnotation, node);
}

function TypeParameter(node) {
  this._variance(node);

  this.word(node.name);

  if (node.bound) {
    this.print(node.bound, node);
  }

  if (node.default) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.default, node);
  }
}

function TypeParameterInstantiation(node) {
  this.token("<");
  this.printList(node.params, node, {});
  this.token(">");
}

exports.TypeParameterDeclaration = TypeParameterInstantiation;
function ObjectTypeAnnotation(node) {
  var _this = this;

  if (node.exact) {
    this.token("{|");
  } else {
    this.token("{");
  }

  var props = node.properties.concat(node.callProperties, node.indexers);

  if (props.length) {
    this.space();

    this.printJoin(props, node, {
      addNewlines: function addNewlines(leading) {
        if (leading && !props[0]) return 1;
      },

      indent: true,
      statement: true,
      iterator: function iterator() {
        if (props.length !== 1) {
          if (_this.format.flowCommaSeparator) {
            _this.token(",");
          } else {
            _this.semicolon();
          }
          _this.space();
        }
      }
    });

    this.space();
  }

  if (node.exact) {
    this.token("|}");
  } else {
    this.token("}");
  }
}

function ObjectTypeCallProperty(node) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this.print(node.value, node);
}

function ObjectTypeIndexer(node) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this._variance(node);
  this.token("[");
  this.print(node.id, node);
  this.token(":");
  this.space();
  this.print(node.key, node);
  this.token("]");
  this.token(":");
  this.space();
  this.print(node.value, node);
}

function ObjectTypeProperty(node) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this._variance(node);
  this.print(node.key, node);
  if (node.optional) this.token("?");
  this.token(":");
  this.space();
  this.print(node.value, node);
}

function ObjectTypeSpreadProperty(node) {
  this.token("...");
  this.print(node.argument, node);
}

function QualifiedTypeIdentifier(node) {
  this.print(node.qualification, node);
  this.token(".");
  this.print(node.id, node);
}

function orSeparator() {
  this.space();
  this.token("|");
  this.space();
}

function UnionTypeAnnotation(node) {
  this.printJoin(node.types, node, { separator: orSeparator });
}

function TypeCastExpression(node) {
  this.token("(");
  this.print(node.expression, node);
  this.print(node.typeAnnotation, node);
  this.token(")");
}

function VoidTypeAnnotation() {
  this.word("void");
}
}, function(modId) { var map = {"./types":1536577187560}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187562, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.File = File;
exports.Program = Program;
exports.BlockStatement = BlockStatement;
exports.Noop = Noop;
exports.Directive = Directive;

var _types = require("./types");

Object.defineProperty(exports, "DirectiveLiteral", {
  enumerable: true,
  get: function get() {
    return _types.StringLiteral;
  }
});
function File(node) {
  this.print(node.program, node);
}

function Program(node) {
  this.printInnerComments(node, false);

  this.printSequence(node.directives, node);
  if (node.directives && node.directives.length) this.newline();

  this.printSequence(node.body, node);
}

function BlockStatement(node) {
  this.token("{");
  this.printInnerComments(node);

  var hasDirectives = node.directives && node.directives.length;

  if (node.body.length || hasDirectives) {
    this.newline();

    this.printSequence(node.directives, node, { indent: true });
    if (hasDirectives) this.newline();

    this.printSequence(node.body, node, { indent: true });
    this.removeTrailingNewline();

    this.source("end", node.loc);

    if (!this.endsWith("\n")) this.newline();

    this.rightBrace();
  } else {
    this.source("end", node.loc);
    this.token("}");
  }
}

function Noop() {}

function Directive(node) {
  this.print(node.value, node);
  this.semicolon();
}
}, function(modId) { var map = {"./types":1536577187560}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187563, function(require, module, exports) {
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.JSXAttribute = JSXAttribute;
exports.JSXIdentifier = JSXIdentifier;
exports.JSXNamespacedName = JSXNamespacedName;
exports.JSXMemberExpression = JSXMemberExpression;
exports.JSXSpreadAttribute = JSXSpreadAttribute;
exports.JSXExpressionContainer = JSXExpressionContainer;
exports.JSXSpreadChild = JSXSpreadChild;
exports.JSXText = JSXText;
exports.JSXElement = JSXElement;
exports.JSXOpeningElement = JSXOpeningElement;
exports.JSXClosingElement = JSXClosingElement;
exports.JSXEmptyExpression = JSXEmptyExpression;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function JSXAttribute(node) {
  this.print(node.name, node);
  if (node.value) {
    this.token("=");
    this.print(node.value, node);
  }
}

function JSXIdentifier(node) {
  this.word(node.name);
}

function JSXNamespacedName(node) {
  this.print(node.namespace, node);
  this.token(":");
  this.print(node.name, node);
}

function JSXMemberExpression(node) {
  this.print(node.object, node);
  this.token(".");
  this.print(node.property, node);
}

function JSXSpreadAttribute(node) {
  this.token("{");
  this.token("...");
  this.print(node.argument, node);
  this.token("}");
}

function JSXExpressionContainer(node) {
  this.token("{");
  this.print(node.expression, node);
  this.token("}");
}

function JSXSpreadChild(node) {
  this.token("{");
  this.token("...");
  this.print(node.expression, node);
  this.token("}");
}

function JSXText(node) {
  this.token(node.value);
}

function JSXElement(node) {
  var open = node.openingElement;
  this.print(open, node);
  if (open.selfClosing) return;

  this.indent();
  for (var _iterator = node.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var child = _ref;

    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingElement, node);
}

function spaceSeparator() {
  this.space();
}

function JSXOpeningElement(node) {
  this.token("<");
  this.print(node.name, node);
  if (node.attributes.length > 0) {
    this.space();
    this.printJoin(node.attributes, node, { separator: spaceSeparator });
  }
  if (node.selfClosing) {
    this.space();
    this.token("/>");
  } else {
    this.token(">");
  }
}

function JSXClosingElement(node) {
  this.token("</");
  this.print(node.name, node);
  this.token(">");
}

function JSXEmptyExpression() {}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187546);
})()
//# sourceMappingURL=index.js.map