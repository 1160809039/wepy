module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577188972, function(require, module, exports) {
var generate = require('regjsgen').generate;
var parse = require('regjsparser').parse;
var regenerate = require('regenerate');
var iuMappings = require('./data/iu-mappings.json');
var ESCAPE_SETS = require('./data/character-class-escape-sets.js');

function getCharacterClassEscapeSet(character) {
	if (unicode) {
		if (ignoreCase) {
			return ESCAPE_SETS.UNICODE_IGNORE_CASE[character];
		}
		return ESCAPE_SETS.UNICODE[character];
	}
	return ESCAPE_SETS.REGULAR[character];
}

var object = {};
var hasOwnProperty = object.hasOwnProperty;
function has(object, property) {
	return hasOwnProperty.call(object, property);
}

// Prepare a Regenerate set containing all code points, used for negative
// character classes (if any).
var UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
// Without the `u` flag, the range stops at 0xFFFF.
// https://mths.be/es6#sec-pattern-semantics
var BMP_SET = regenerate().addRange(0x0, 0xFFFF);

// Prepare a Regenerate set containing all code points that are supposed to be
// matched by `/./u`. https://mths.be/es6#sec-atom
var DOT_SET_UNICODE = UNICODE_SET.clone() // all Unicode code points
	.remove(
		// minus `LineTerminator`s (https://mths.be/es6#sec-line-terminators):
		0x000A, // Line Feed <LF>
		0x000D, // Carriage Return <CR>
		0x2028, // Line Separator <LS>
		0x2029  // Paragraph Separator <PS>
	);
// Prepare a Regenerate set containing all code points that are supposed to be
// matched by `/./` (only BMP code points).
var DOT_SET = DOT_SET_UNICODE.clone()
	.intersection(BMP_SET);

// Add a range of code points + any case-folded code points in that range to a
// set.
regenerate.prototype.iuAddRange = function(min, max) {
	var $this = this;
	do {
		var folded = caseFold(min);
		if (folded) {
			$this.add(folded);
		}
	} while (++min <= max);
	return $this;
};

function assign(target, source) {
	for (var key in source) {
		// Note: `hasOwnProperty` is not needed here.
		target[key] = source[key];
	}
}

function update(item, pattern) {
	// TODO: Test if memoizing `pattern` here is worth the effort.
	if (!pattern) {
		return;
	}
	var tree = parse(pattern, '');
	switch (tree.type) {
		case 'characterClass':
		case 'group':
		case 'value':
			// No wrapping needed.
			break;
		default:
			// Wrap the pattern in a non-capturing group.
			tree = wrap(tree, pattern);
	}
	assign(item, tree);
}

function wrap(tree, pattern) {
	// Wrap the pattern in a non-capturing group.
	return {
		'type': 'group',
		'behavior': 'ignore',
		'body': [tree],
		'raw': '(?:' + pattern + ')'
	};
}

function caseFold(codePoint) {
	return has(iuMappings, codePoint) ? iuMappings[codePoint] : false;
}

var ignoreCase = false;
var unicode = false;
function processCharacterClass(characterClassItem) {
	var set = regenerate();
	var body = characterClassItem.body.forEach(function(item) {
		switch (item.type) {
			case 'value':
				set.add(item.codePoint);
				if (ignoreCase && unicode) {
					var folded = caseFold(item.codePoint);
					if (folded) {
						set.add(folded);
					}
				}
				break;
			case 'characterClassRange':
				var min = item.min.codePoint;
				var max = item.max.codePoint;
				set.addRange(min, max);
				if (ignoreCase && unicode) {
					set.iuAddRange(min, max);
				}
				break;
			case 'characterClassEscape':
				set.add(getCharacterClassEscapeSet(item.value));
				break;
			// The `default` clause is only here as a safeguard; it should never be
			// reached. Code coverage tools should ignore it.
			/* istanbul ignore next */
			default:
				throw Error('Unknown term type: ' + item.type);
		}
	});
	if (characterClassItem.negative) {
		set = (unicode ? UNICODE_SET : BMP_SET).clone().remove(set);
	}
	update(characterClassItem, set.toString());
	return characterClassItem;
}

function processTerm(item) {
	switch (item.type) {
		case 'dot':
			update(
				item,
				(unicode ? DOT_SET_UNICODE : DOT_SET).toString()
			);
			break;
		case 'characterClass':
			item = processCharacterClass(item);
			break;
		case 'characterClassEscape':
			update(
				item,
				getCharacterClassEscapeSet(item.value).toString()
			);
			break;
		case 'alternative':
		case 'disjunction':
		case 'group':
		case 'quantifier':
			item.body = item.body.map(processTerm);
			break;
		case 'value':
			var codePoint = item.codePoint;
			var set = regenerate(codePoint);
			if (ignoreCase && unicode) {
				var folded = caseFold(codePoint);
				if (folded) {
					set.add(folded);
				}
			}
			update(item, set.toString());
			break;
		case 'anchor':
		case 'empty':
		case 'group':
		case 'reference':
			// Nothing to do here.
			break;
		// The `default` clause is only here as a safeguard; it should never be
		// reached. Code coverage tools should ignore it.
		/* istanbul ignore next */
		default:
			throw Error('Unknown term type: ' + item.type);
	}
	return item;
};

module.exports = function(pattern, flags) {
	var tree = parse(pattern, flags);
	ignoreCase = flags ? flags.indexOf('i') > -1 : false;
	unicode = flags ? flags.indexOf('u') > -1 : false;
	assign(tree, processTerm(tree));
	return generate(tree);
};

}, function(modId) {var map = {"./data/iu-mappings.json":1536577188973,"./data/character-class-escape-sets.js":1536577188974}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188973, function(require, module, exports) {
module.exports = {
	"75": 8490,
	"83": 383,
	"107": 8490,
	"115": 383,
	"181": 924,
	"197": 8491,
	"383": 83,
	"452": 453,
	"453": 452,
	"455": 456,
	"456": 455,
	"458": 459,
	"459": 458,
	"497": 498,
	"498": 497,
	"837": 8126,
	"914": 976,
	"917": 1013,
	"920": 1012,
	"921": 8126,
	"922": 1008,
	"924": 181,
	"928": 982,
	"929": 1009,
	"931": 962,
	"934": 981,
	"937": 8486,
	"962": 931,
	"976": 914,
	"977": 1012,
	"981": 934,
	"982": 928,
	"1008": 922,
	"1009": 929,
	"1012": [
		920,
		977
	],
	"1013": 917,
	"7776": 7835,
	"7835": 7776,
	"8126": [
		837,
		921
	],
	"8486": 937,
	"8490": 75,
	"8491": 197,
	"66560": 66600,
	"66561": 66601,
	"66562": 66602,
	"66563": 66603,
	"66564": 66604,
	"66565": 66605,
	"66566": 66606,
	"66567": 66607,
	"66568": 66608,
	"66569": 66609,
	"66570": 66610,
	"66571": 66611,
	"66572": 66612,
	"66573": 66613,
	"66574": 66614,
	"66575": 66615,
	"66576": 66616,
	"66577": 66617,
	"66578": 66618,
	"66579": 66619,
	"66580": 66620,
	"66581": 66621,
	"66582": 66622,
	"66583": 66623,
	"66584": 66624,
	"66585": 66625,
	"66586": 66626,
	"66587": 66627,
	"66588": 66628,
	"66589": 66629,
	"66590": 66630,
	"66591": 66631,
	"66592": 66632,
	"66593": 66633,
	"66594": 66634,
	"66595": 66635,
	"66596": 66636,
	"66597": 66637,
	"66598": 66638,
	"66599": 66639,
	"66600": 66560,
	"66601": 66561,
	"66602": 66562,
	"66603": 66563,
	"66604": 66564,
	"66605": 66565,
	"66606": 66566,
	"66607": 66567,
	"66608": 66568,
	"66609": 66569,
	"66610": 66570,
	"66611": 66571,
	"66612": 66572,
	"66613": 66573,
	"66614": 66574,
	"66615": 66575,
	"66616": 66576,
	"66617": 66577,
	"66618": 66578,
	"66619": 66579,
	"66620": 66580,
	"66621": 66581,
	"66622": 66582,
	"66623": 66583,
	"66624": 66584,
	"66625": 66585,
	"66626": 66586,
	"66627": 66587,
	"66628": 66588,
	"66629": 66589,
	"66630": 66590,
	"66631": 66591,
	"66632": 66592,
	"66633": 66593,
	"66634": 66594,
	"66635": 66595,
	"66636": 66596,
	"66637": 66597,
	"66638": 66598,
	"66639": 66599,
	"68736": 68800,
	"68737": 68801,
	"68738": 68802,
	"68739": 68803,
	"68740": 68804,
	"68741": 68805,
	"68742": 68806,
	"68743": 68807,
	"68744": 68808,
	"68745": 68809,
	"68746": 68810,
	"68747": 68811,
	"68748": 68812,
	"68749": 68813,
	"68750": 68814,
	"68751": 68815,
	"68752": 68816,
	"68753": 68817,
	"68754": 68818,
	"68755": 68819,
	"68756": 68820,
	"68757": 68821,
	"68758": 68822,
	"68759": 68823,
	"68760": 68824,
	"68761": 68825,
	"68762": 68826,
	"68763": 68827,
	"68764": 68828,
	"68765": 68829,
	"68766": 68830,
	"68767": 68831,
	"68768": 68832,
	"68769": 68833,
	"68770": 68834,
	"68771": 68835,
	"68772": 68836,
	"68773": 68837,
	"68774": 68838,
	"68775": 68839,
	"68776": 68840,
	"68777": 68841,
	"68778": 68842,
	"68779": 68843,
	"68780": 68844,
	"68781": 68845,
	"68782": 68846,
	"68783": 68847,
	"68784": 68848,
	"68785": 68849,
	"68786": 68850,
	"68800": 68736,
	"68801": 68737,
	"68802": 68738,
	"68803": 68739,
	"68804": 68740,
	"68805": 68741,
	"68806": 68742,
	"68807": 68743,
	"68808": 68744,
	"68809": 68745,
	"68810": 68746,
	"68811": 68747,
	"68812": 68748,
	"68813": 68749,
	"68814": 68750,
	"68815": 68751,
	"68816": 68752,
	"68817": 68753,
	"68818": 68754,
	"68819": 68755,
	"68820": 68756,
	"68821": 68757,
	"68822": 68758,
	"68823": 68759,
	"68824": 68760,
	"68825": 68761,
	"68826": 68762,
	"68827": 68763,
	"68828": 68764,
	"68829": 68765,
	"68830": 68766,
	"68831": 68767,
	"68832": 68768,
	"68833": 68769,
	"68834": 68770,
	"68835": 68771,
	"68836": 68772,
	"68837": 68773,
	"68838": 68774,
	"68839": 68775,
	"68840": 68776,
	"68841": 68777,
	"68842": 68778,
	"68843": 68779,
	"68844": 68780,
	"68845": 68781,
	"68846": 68782,
	"68847": 68783,
	"68848": 68784,
	"68849": 68785,
	"68850": 68786,
	"71840": 71872,
	"71841": 71873,
	"71842": 71874,
	"71843": 71875,
	"71844": 71876,
	"71845": 71877,
	"71846": 71878,
	"71847": 71879,
	"71848": 71880,
	"71849": 71881,
	"71850": 71882,
	"71851": 71883,
	"71852": 71884,
	"71853": 71885,
	"71854": 71886,
	"71855": 71887,
	"71856": 71888,
	"71857": 71889,
	"71858": 71890,
	"71859": 71891,
	"71860": 71892,
	"71861": 71893,
	"71862": 71894,
	"71863": 71895,
	"71864": 71896,
	"71865": 71897,
	"71866": 71898,
	"71867": 71899,
	"71868": 71900,
	"71869": 71901,
	"71870": 71902,
	"71871": 71903,
	"71872": 71840,
	"71873": 71841,
	"71874": 71842,
	"71875": 71843,
	"71876": 71844,
	"71877": 71845,
	"71878": 71846,
	"71879": 71847,
	"71880": 71848,
	"71881": 71849,
	"71882": 71850,
	"71883": 71851,
	"71884": 71852,
	"71885": 71853,
	"71886": 71854,
	"71887": 71855,
	"71888": 71856,
	"71889": 71857,
	"71890": 71858,
	"71891": 71859,
	"71892": 71860,
	"71893": 71861,
	"71894": 71862,
	"71895": 71863,
	"71896": 71864,
	"71897": 71865,
	"71898": 71866,
	"71899": 71867,
	"71900": 71868,
	"71901": 71869,
	"71902": 71870,
	"71903": 71871
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188974, function(require, module, exports) {
// Generated by `/scripts/character-class-escape-sets.js`. Do not edit.
var regenerate = require('regenerate');

exports.REGULAR = {
	'd': regenerate()
		.addRange(0x30, 0x39),
	'D': regenerate()
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0xFFFF),
	's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF)
		.addRange(0x9, 0xD)
		.addRange(0x2000, 0x200A)
		.addRange(0x2028, 0x2029),
	'S': regenerate()
		.addRange(0x0, 0x8)
		.addRange(0xE, 0x1F)
		.addRange(0x21, 0x9F)
		.addRange(0xA1, 0x167F)
		.addRange(0x1681, 0x1FFF)
		.addRange(0x200B, 0x2027)
		.addRange(0x202A, 0x202E)
		.addRange(0x2030, 0x205E)
		.addRange(0x2060, 0x2FFF)
		.addRange(0x3001, 0xFEFE)
		.addRange(0xFF00, 0xFFFF),
	'w': regenerate(0x5F)
		.addRange(0x30, 0x39)
		.addRange(0x41, 0x5A)
		.addRange(0x61, 0x7A),
	'W': regenerate(0x60)
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x40)
		.addRange(0x5B, 0x5E)
		.addRange(0x7B, 0xFFFF)
};

exports.UNICODE = {
	'd': regenerate()
		.addRange(0x30, 0x39),
	'D': regenerate()
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x10FFFF),
	's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF)
		.addRange(0x9, 0xD)
		.addRange(0x2000, 0x200A)
		.addRange(0x2028, 0x2029),
	'S': regenerate()
		.addRange(0x0, 0x8)
		.addRange(0xE, 0x1F)
		.addRange(0x21, 0x9F)
		.addRange(0xA1, 0x167F)
		.addRange(0x1681, 0x1FFF)
		.addRange(0x200B, 0x2027)
		.addRange(0x202A, 0x202E)
		.addRange(0x2030, 0x205E)
		.addRange(0x2060, 0x2FFF)
		.addRange(0x3001, 0xFEFE)
		.addRange(0xFF00, 0x10FFFF),
	'w': regenerate(0x5F)
		.addRange(0x30, 0x39)
		.addRange(0x41, 0x5A)
		.addRange(0x61, 0x7A),
	'W': regenerate(0x60)
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x40)
		.addRange(0x5B, 0x5E)
		.addRange(0x7B, 0x10FFFF)
};

exports.UNICODE_IGNORE_CASE = {
	'd': regenerate()
		.addRange(0x30, 0x39),
	'D': regenerate()
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x10FFFF),
	's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF)
		.addRange(0x9, 0xD)
		.addRange(0x2000, 0x200A)
		.addRange(0x2028, 0x2029),
	'S': regenerate()
		.addRange(0x0, 0x8)
		.addRange(0xE, 0x1F)
		.addRange(0x21, 0x9F)
		.addRange(0xA1, 0x167F)
		.addRange(0x1681, 0x1FFF)
		.addRange(0x200B, 0x2027)
		.addRange(0x202A, 0x202E)
		.addRange(0x2030, 0x205E)
		.addRange(0x2060, 0x2FFF)
		.addRange(0x3001, 0xFEFE)
		.addRange(0xFF00, 0x10FFFF),
	'w': regenerate(0x5F, 0x17F, 0x212A)
		.addRange(0x30, 0x39)
		.addRange(0x41, 0x5A)
		.addRange(0x61, 0x7A),
	'W': regenerate(0x4B, 0x53, 0x60)
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x40)
		.addRange(0x5B, 0x5E)
		.addRange(0x7B, 0x10FFFF)
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577188972);
})()
//# sourceMappingURL=index.js.map