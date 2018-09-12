module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577188062, function(require, module, exports) {
/* eslint-disable guard-for-in */
'use strict';
var repeating = require('repeating');

// detect either spaces or tabs but not both to properly handle tabs
// for indentation and spaces for alignment
var INDENT_RE = /^(?:( )+|\t+)/;

function getMostUsed(indents) {
	var result = 0;
	var maxUsed = 0;
	var maxWeight = 0;

	for (var n in indents) {
		var indent = indents[n];
		var u = indent[0];
		var w = indent[1];

		if (u > maxUsed || u === maxUsed && w > maxWeight) {
			maxUsed = u;
			maxWeight = w;
			result = Number(n);
		}
	}

	return result;
}

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	// used to see if tabs or spaces are the most used
	var tabs = 0;
	var spaces = 0;

	// remember the size of previous line's indentation
	var prev = 0;

	// remember how many indents/unindents as occurred for a given size
	// and how much lines follow a given indentation
	//
	// indents = {
	//    3: [1, 0],
	//    4: [1, 5],
	//    5: [1, 0],
	//   12: [1, 0],
	// }
	var indents = {};

	// pointer to the array of last used indent
	var current;

	// whether the last action was an indent (opposed to an unindent)
	var isIndent;

	str.split(/\n/g).forEach(function (line) {
		if (!line) {
			// ignore empty lines
			return;
		}

		var indent;
		var matches = line.match(INDENT_RE);

		if (!matches) {
			indent = 0;
		} else {
			indent = matches[0].length;

			if (matches[1]) {
				spaces++;
			} else {
				tabs++;
			}
		}

		var diff = indent - prev;
		prev = indent;

		if (diff) {
			// an indent or unindent has been detected

			isIndent = diff > 0;

			current = indents[isIndent ? diff : -diff];

			if (current) {
				current[0]++;
			} else {
				current = indents[diff] = [1, 0];
			}
		} else if (current) {
			// if the last action was an indent, increment the weight
			current[1] += Number(isIndent);
		}
	});

	var amount = getMostUsed(indents);

	var type;
	var actual;
	if (!amount) {
		type = null;
		actual = '';
	} else if (spaces >= tabs) {
		type = 'space';
		actual = repeating(' ', amount);
	} else {
		type = 'tab';
		actual = repeating('\t', amount);
	}

	return {
		amount: amount,
		type: type,
		indent: actual
	};
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577188062);
})()
//# sourceMappingURL=index.js.map