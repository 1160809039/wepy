module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187508, function(require, module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (rawLines, lineNumber, colNumber) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  colNumber = Math.max(colNumber, 0);

  var highlighted = opts.highlightCode && _chalk2.default.supportsColor || opts.forceColor;
  var chalk = _chalk2.default;
  if (opts.forceColor) {
    chalk = new _chalk2.default.constructor({ enabled: true });
  }
  var maybeHighlight = function maybeHighlight(chalkFn, string) {
    return highlighted ? chalkFn(string) : string;
  };
  var defs = getDefs(chalk);
  if (highlighted) rawLines = highlight(defs, rawLines);

  var linesAbove = opts.linesAbove || 2;
  var linesBelow = opts.linesBelow || 3;

  var lines = rawLines.split(NEWLINE);
  var start = Math.max(lineNumber - (linesAbove + 1), 0);
  var end = Math.min(lines.length, lineNumber + linesBelow);

  if (!lineNumber && !colNumber) {
    start = 0;
    end = lines.length;
  }

  var numberMaxWidth = String(end).length;

  var frame = lines.slice(start, end).map(function (line, index) {
    var number = start + 1 + index;
    var paddedNumber = (" " + number).slice(-numberMaxWidth);
    var gutter = " " + paddedNumber + " | ";
    if (number === lineNumber) {
      var markerLine = "";
      if (colNumber) {
        var markerSpacing = line.slice(0, colNumber - 1).replace(/[^\t]/g, " ");
        markerLine = ["\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), markerSpacing, maybeHighlight(defs.marker, "^")].join("");
      }
      return [maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line, markerLine].join("");
    } else {
      return " " + maybeHighlight(defs.gutter, gutter) + line;
    }
  }).join("\n");

  if (highlighted) {
    return chalk.reset(frame);
  } else {
    return frame;
  }
};

var _jsTokens = require("js-tokens");

var _jsTokens2 = _interopRequireDefault(_jsTokens);

var _esutils = require("esutils");

var _esutils2 = _interopRequireDefault(_esutils);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefs(chalk) {
  return {
    keyword: chalk.cyan,
    capitalized: chalk.yellow,
    jsx_tag: chalk.yellow,
    punctuator: chalk.yellow,

    number: chalk.magenta,
    string: chalk.green,
    regex: chalk.magenta,
    comment: chalk.grey,
    invalid: chalk.white.bgRed.bold,
    gutter: chalk.grey,
    marker: chalk.red.bold
  };
}

var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

var JSX_TAG = /^[a-z][\w-]*$/i;

var BRACKET = /^[()\[\]{}]$/;

function getTokenType(match) {
  var _match$slice = match.slice(-2),
      offset = _match$slice[0],
      text = _match$slice[1];

  var token = (0, _jsTokens.matchToToken)(match);

  if (token.type === "name") {
    if (_esutils2.default.keyword.isReservedWordES6(token.value)) {
      return "keyword";
    }

    if (JSX_TAG.test(token.value) && (text[offset - 1] === "<" || text.substr(offset - 2, 2) == "</")) {
      return "jsx_tag";
    }

    if (token.value[0] !== token.value[0].toLowerCase()) {
      return "capitalized";
    }
  }

  if (token.type === "punctuator" && BRACKET.test(token.value)) {
    return "bracket";
  }

  return token.type;
}

function highlight(defs, text) {
  return text.replace(_jsTokens2.default, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var type = getTokenType(args);
    var colorize = defs[type];
    if (colorize) {
      return args[0].split(NEWLINE).map(function (str) {
        return colorize(str);
      }).join("\n");
    } else {
      return args[0];
    }
  });
}

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187508);
})()
//# sourceMappingURL=index.js.map