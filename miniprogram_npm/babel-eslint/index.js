module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187537, function(require, module, exports) {
var babylonToEspree = require("./babylon-to-espree");
var Module          = require("module");
var path            = require("path");
var parse           = require("babylon").parse;
var t               = require("babel-types");
var tt              = require("babylon").tokTypes;
var traverse        = require("babel-traverse").default;
var codeFrame       = require("babel-code-frame");

var hasPatched = false;
var eslintOptions = {};

function getModules() {
  try {
    // avoid importing a local copy of eslint, try to find a peer dependency
    var eslintLoc = Module._resolveFilename("eslint", module.parent);
  } catch (err) {
    try {
      // avoids breaking in jest where module.parent is undefined
      eslintLoc = require.resolve("eslint");
    } catch (err) {
      throw new ReferenceError("couldn't resolve eslint");
    }
  }

  // get modules relative to what eslint will load
  var eslintMod = new Module(eslintLoc);
  eslintMod.filename = eslintLoc;
  eslintMod.paths = Module._nodeModulePaths(path.dirname(eslintLoc));

  try {
    var escope = eslintMod.require("eslint-scope");
    var Definition = eslintMod.require("eslint-scope/lib/definition").Definition;
    var referencer = eslintMod.require("eslint-scope/lib/referencer");
  } catch (err) {
    escope  = eslintMod.require("escope");
    Definition = eslintMod.require("escope/lib/definition").Definition;
    referencer = eslintMod.require("escope/lib/referencer");
  }

  var estraverse = eslintMod.require("estraverse");

  if (referencer.__esModule) referencer = referencer.default;

  return {
    Definition,
    escope,
    estraverse,
    referencer,
  };
}

function monkeypatch(modules) {
  var Definition = modules.Definition;
  var escope = modules.escope;
  var estraverse = modules.estraverse;
  var referencer = modules.referencer;

  Object.assign(estraverse.VisitorKeys, t.VISITOR_KEYS);
  estraverse.VisitorKeys.MethodDefinition.push("decorators");
  estraverse.VisitorKeys.Property.push("decorators");

  var analyze = escope.analyze;
  escope.analyze = function (ast, opts) {
    opts.ecmaVersion = eslintOptions.ecmaVersion;
    opts.sourceType = eslintOptions.sourceType;
    if (eslintOptions.globalReturn !== undefined) {
      opts.nodejsScope = eslintOptions.globalReturn;
    }

    var results = analyze.call(this, ast, opts);
    return results;
  };

  // if there are decorators, then visit each
  function visitDecorators(node) {
    if (!node.decorators) {
      return;
    }
    for (var i = 0; i < node.decorators.length; i++) {
      if (node.decorators[i].expression) {
        this.visit(node.decorators[i]);
      }
    }
  }

  // iterate through part of t.VISITOR_KEYS
  var flowFlippedAliasKeys = t.FLIPPED_ALIAS_KEYS.Flow.concat([
    "ArrayPattern",
    "ClassDeclaration",
    "ClassExpression",
    "FunctionDeclaration",
    "FunctionExpression",
    "Identifier",
    "ObjectPattern",
    "RestElement"
  ]);
  var visitorKeysMap = Object.keys(t.VISITOR_KEYS).reduce(function(acc, key) {
    var value = t.VISITOR_KEYS[key];
    if (flowFlippedAliasKeys.indexOf(value) === -1) {
      acc[key] = value;
    }
    return acc;
  }, {});

  var propertyTypes = {
    // loops
    callProperties: { type: "loop", values: ["value"] },
    indexers: { type: "loop", values: ["key", "value"] },
    properties: { type: "loop", values: ["argument", "value"] },
    types: { type: "loop" },
    params: { type: "loop" },
    // single property
    argument: { type: "single" },
    elementType: { type: "single" },
    qualification: { type: "single" },
    rest: { type: "single" },
    returnType: { type: "single" },
    // others
    typeAnnotation: { type: "typeAnnotation" },
    typeParameters: { type: "typeParameters" },
    id: { type: "id" }
  };

  function visitTypeAnnotation(node) {
    // get property to check (params, id, etc...)
    var visitorValues = visitorKeysMap[node.type];
    if (!visitorValues) {
      return;
    }

    // can have multiple properties
    for (var i = 0; i < visitorValues.length; i++) {
      var visitorValue = visitorValues[i];
      var propertyType = propertyTypes[visitorValue];
      var nodeProperty = node[visitorValue];
      // check if property or type is defined
      if (propertyType == null || nodeProperty == null) {
        continue;
      }
      if (propertyType.type === "loop") {
        for (var j = 0; j < nodeProperty.length; j++) {
          if (Array.isArray(propertyType.values)) {
            for (var k = 0; k < propertyType.values.length; k++) {
              var loopPropertyNode = nodeProperty[j][propertyType.values[k]];
              if (loopPropertyNode) {
                checkIdentifierOrVisit.call(this, loopPropertyNode);
              }
            }
          } else {
            checkIdentifierOrVisit.call(this, nodeProperty[j]);
          }
        }
      } else if (propertyType.type === "single") {
        checkIdentifierOrVisit.call(this, nodeProperty);
      } else if (propertyType.type === "typeAnnotation") {
        visitTypeAnnotation.call(this, node.typeAnnotation);
      } else if (propertyType.type === "typeParameters") {
        for (var l = 0; l < node.typeParameters.params.length; l++) {
          checkIdentifierOrVisit.call(this, node.typeParameters.params[l]);
        }
      } else if (propertyType.type === "id") {
        if (node.id.type === "Identifier") {
          checkIdentifierOrVisit.call(this, node.id);
        } else {
          visitTypeAnnotation.call(this, node.id);
        }
      }
    }
  }

  function checkIdentifierOrVisit(node) {
    if (node.typeAnnotation) {
      visitTypeAnnotation.call(this, node.typeAnnotation);
    } else if (node.type === "Identifier") {
      this.visit(node);
    } else {
      visitTypeAnnotation.call(this, node);
    }
  }

  function nestTypeParamScope(manager, node) {
    var parentScope = manager.__currentScope;
    var scope = new escope.Scope(manager, "type-parameters", parentScope, node, false);
    manager.__nestScope(scope);
    for (var j = 0; j < node.typeParameters.params.length; j++) {
      var name = node.typeParameters.params[j];
      scope.__define(name, new Definition("TypeParameter", name, name));
      if (name.typeAnnotation) {
        checkIdentifierOrVisit.call(this, name);
      }
    }
    scope.__define = function() {
      return parentScope.__define.apply(parentScope, arguments);
    };
    return scope;
  }

  // visit decorators that are in: ClassDeclaration / ClassExpression
  var visitClass = referencer.prototype.visitClass;
  referencer.prototype.visitClass = function(node) {
    visitDecorators.call(this, node);
    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope.call(this, this.scopeManager, node);
    }
    // visit flow type: ClassImplements
    if (node.implements) {
      for (var i = 0; i < node.implements.length; i++) {
        checkIdentifierOrVisit.call(this, node.implements[i]);
      }
    }
    if (node.superTypeParameters) {
      for (var k = 0; k < node.superTypeParameters.params.length; k++) {
        checkIdentifierOrVisit.call(this, node.superTypeParameters.params[k]);
      }
    }
    visitClass.call(this, node);
    if (typeParamScope) {
      this.close(node);
    }
  };

  // visit decorators that are in: Property / MethodDefinition
  var visitProperty = referencer.prototype.visitProperty;
  referencer.prototype.visitProperty = function(node) {
    if (node.value && node.value.type === "TypeCastExpression") {
      visitTypeAnnotation.call(this, node.value);
    }
    visitDecorators.call(this, node);
    visitProperty.call(this, node);
  };

  // visit ClassProperty as a Property.
  referencer.prototype.ClassProperty = function(node) {
    if (node.typeAnnotation) {
      visitTypeAnnotation.call(this, node.typeAnnotation);
    }
    this.visitProperty(node);
  };

  // visit flow type in FunctionDeclaration, FunctionExpression, ArrowFunctionExpression
  var visitFunction = referencer.prototype.visitFunction;
  referencer.prototype.visitFunction = function(node) {
    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope.call(this, this.scopeManager, node);
    }
    if (node.returnType) {
      checkIdentifierOrVisit.call(this, node.returnType);
    }
    // only visit if function parameters have types
    if (node.params) {
      for (var i = 0; i < node.params.length; i++) {
        var param = node.params[i];
        if (param.typeAnnotation) {
          checkIdentifierOrVisit.call(this, param);
        } else if (t.isAssignmentPattern(param)) {
          if (param.left.typeAnnotation) {
            checkIdentifierOrVisit.call(this, param.left);
          }
        }
      }
    }
    // set ArrayPattern/ObjectPattern visitor keys back to their original. otherwise
    // escope will traverse into them and include the identifiers within as declarations
    estraverse.VisitorKeys.ObjectPattern = ["properties"];
    estraverse.VisitorKeys.ArrayPattern = ["elements"];
    visitFunction.call(this, node);
    // set them back to normal...
    estraverse.VisitorKeys.ObjectPattern = t.VISITOR_KEYS.ObjectPattern;
    estraverse.VisitorKeys.ArrayPattern = t.VISITOR_KEYS.ArrayPattern;
    if (typeParamScope) {
      this.close(node);
    }
  };

  // visit flow type in VariableDeclaration
  var variableDeclaration = referencer.prototype.VariableDeclaration;
  referencer.prototype.VariableDeclaration = function(node) {
    if (node.declarations) {
      for (var i = 0; i < node.declarations.length; i++) {
        var id = node.declarations[i].id;
        var typeAnnotation = id.typeAnnotation;
        if (typeAnnotation) {
          checkIdentifierOrVisit.call(this, typeAnnotation);
        }
      }
    }
    variableDeclaration.call(this, node);
  };

  function createScopeVariable (node, name) {
    this.currentScope().variableScope.__define(name,
      new Definition(
        "Variable",
        name,
        node,
        null,
        null,
        null
      )
    );
  }

  referencer.prototype.InterfaceDeclaration = function(node) {
    createScopeVariable.call(this, node, node.id);
    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope.call(this, this.scopeManager, node);
    }
    // TODO: Handle mixins
    for (var i = 0; i < node.extends.length; i++) {
      visitTypeAnnotation.call(this, node.extends[i]);
    }
    visitTypeAnnotation.call(this, node.body);
    if (typeParamScope) {
      this.close(node);
    }
  };

  referencer.prototype.TypeAlias = function(node) {
    createScopeVariable.call(this, node, node.id);
    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope.call(this, this.scopeManager, node);
    }
    if (node.right) {
      visitTypeAnnotation.call(this, node.right);
    }
    if (typeParamScope) {
      this.close(node);
    }
  };

  referencer.prototype.DeclareModule =
  referencer.prototype.DeclareFunction =
  referencer.prototype.DeclareVariable =
  referencer.prototype.DeclareClass = function(node) {
    if (node.id) {
      createScopeVariable.call(this, node, node.id);
    }

    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope.call(this, this.scopeManager, node);
    }
    if (typeParamScope) {
      this.close(node);
    }
  };
}

exports.parse = function (code, options) {
  options = options || {};
  eslintOptions.ecmaVersion = options.ecmaVersion = options.ecmaVersion || 6;
  eslintOptions.sourceType = options.sourceType = options.sourceType || "module";
  eslintOptions.allowImportExportEverywhere = options.allowImportExportEverywhere = options.allowImportExportEverywhere || false;
  if (options.sourceType === "module") {
    eslintOptions.globalReturn = false;
  } else {
    delete eslintOptions.globalReturn;
  }

  if (!hasPatched) {
    hasPatched = true;
    try {
      monkeypatch(getModules());
    } catch (err) {
      console.error(err.stack);
      process.exit(1);
    }
  }

  return exports.parseNoPatch(code, options);
};

exports.parseNoPatch = function (code, options) {
  var opts = {
    codeFrame: options.hasOwnProperty("codeFrame") ? options.codeFrame : true,
    sourceType: options.sourceType,
    allowImportExportEverywhere: options.allowImportExportEverywhere, // consistent with espree
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    plugins: [
      "flow",
      "jsx",
      "asyncFunctions",
      "asyncGenerators",
      "classConstructorCall",
      "classProperties",
      "decorators",
      "doExpressions",
      "exponentiationOperator",
      "exportExtensions",
      "functionBind",
      "functionSent",
      "objectRestSpread",
      "trailingFunctionCommas",
      "dynamicImport"
    ]
  };

  var ast;
  try {
    ast = parse(code, opts);
  } catch (err) {
    if (err instanceof SyntaxError) {

      err.lineNumber = err.loc.line;
      err.column = err.loc.column;

      if (opts.codeFrame) {
        err.lineNumber = err.loc.line;
        err.column = err.loc.column + 1;

        // remove trailing "(LINE:COLUMN)" acorn message and add in esprima syntax error message start
        err.message = "Line " + err.lineNumber + ": " + err.message.replace(/ \((\d+):(\d+)\)$/, "") +
        // add codeframe
        "\n\n" +
        codeFrame(code, err.lineNumber, err.column, { highlightCode: true });
      }
    }

    throw err;
  }

  babylonToEspree(ast, traverse, tt, code);

  return ast;
};

}, function(modId) {var map = {"./babylon-to-espree":1536577187538}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187538, function(require, module, exports) {
"use strict";

var attachComments  = require("./attachComments");
var convertComments = require("./convertComments");
var toTokens        = require("./toTokens");
var toAST           = require("./toAST");

module.exports = function (ast, traverse, tt, code) {
  // remove EOF token, eslint doesn't use this for anything and it interferes
  // with some rules see https://github.com/babel/babel-eslint/issues/2
  // todo: find a more elegant way to do this
  ast.tokens.pop();

  // convert tokens
  ast.tokens = toTokens(ast.tokens, tt, code);

  // add comments
  convertComments(ast.comments);

  // transform esprima and acorn divergent nodes
  toAST(ast, traverse, code);

  // ast.program.tokens = ast.tokens;
  // ast.program.comments = ast.comments;
  // ast = ast.program;

  // remove File
  ast.type = "Program";
  ast.sourceType = ast.program.sourceType;
  ast.directives = ast.program.directives;
  ast.body = ast.program.body;
  delete ast.program;
  delete ast._paths;

  attachComments(ast, ast.comments, ast.tokens);
};

}, function(modId) { var map = {"./attachComments":1536577187539,"./convertComments":1536577187540,"./toTokens":1536577187541,"./toAST":1536577187544}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187539, function(require, module, exports) {
"use strict";

// comment fixes
module.exports = function (ast, comments, tokens) {
  if (comments.length) {
    var firstComment = comments[0];
    var lastComment = comments[comments.length - 1];
    // fixup program start
    if (!tokens.length) {
      // if no tokens, the program starts at the end of the last comment
      ast.start = lastComment.end;
      ast.loc.start.line = lastComment.loc.end.line;
      ast.loc.start.column = lastComment.loc.end.column;

      if (ast.leadingComments === null && ast.innerComments.length) {
        ast.leadingComments = ast.innerComments;
      }
    } else if (firstComment.start < tokens[0].start) {
      // if there are comments before the first token, the program starts at the first token
      var token = tokens[0];
      // ast.start = token.start;
      // ast.loc.start.line = token.loc.start.line;
      // ast.loc.start.column = token.loc.start.column;

      // estraverse do not put leading comments on first node when the comment
      // appear before the first token
      if (ast.body.length) {
        var node = ast.body[0];
        node.leadingComments = [];
        var firstTokenStart = token.start;
        var len = comments.length;
        for (var i = 0; i < len && comments[i].start < firstTokenStart; i++) {
          node.leadingComments.push(comments[i]);
        }
      }
    }
    // fixup program end
    if (tokens.length) {
      var lastToken = tokens[tokens.length - 1];
      if (lastComment.end > lastToken.end) {
        // If there is a comment after the last token, the program ends at the
        // last token and not the comment
        // ast.end = lastToken.end;
        ast.range[1] = lastToken.end;
        ast.loc.end.line = lastToken.loc.end.line;
        ast.loc.end.column = lastToken.loc.end.column;
      }
    }
  } else {
    if (!tokens.length) {
      ast.loc.start.line = 1;
      ast.loc.end.line = 1;
    }
  }
  if (ast.body && ast.body.length > 0) {
    ast.loc.start.line = ast.body[0].loc.start.line;
    ast.range[0] = ast.body[0].start;
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187540, function(require, module, exports) {
"use strict";

module.exports = function (comments) {
  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    if (comment.type === "CommentBlock") {
      comment.type = "Block";
    } else if (comment.type === "CommentLine") {
      comment.type = "Line";
    }
    // sometimes comments don't get ranges computed,
    // even with options.ranges === true
    if (!comment.range) {
      comment.range = [comment.start, comment.end];
    }
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187541, function(require, module, exports) {
"use strict";

var convertTemplateType = require("./convertTemplateType");
var toToken = require("./toToken");

module.exports = function (tokens, tt, code) {
  // transform tokens to type "Template"
  convertTemplateType(tokens, tt);

  var transformedTokens = [];
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.type !== "CommentLine" && token.type !== "CommentBlock") {
      transformedTokens.push(toToken(token, tt, code));
    }
  }

  return transformedTokens;
};

}, function(modId) { var map = {"./convertTemplateType":1536577187542,"./toToken":1536577187543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187542, function(require, module, exports) {
"use strict";

module.exports = function (tokens, tt) {
  var startingToken    = 0;
  var currentToken     = 0;
  var numBraces        = 0; // track use of {}
  var numBackQuotes    = 0; // track number of nested templates

  function isBackQuote(token) {
    return tokens[token].type === tt.backQuote;
  }

  function isTemplateStarter(token) {
    return isBackQuote(token) ||
           // only can be a template starter when in a template already
           tokens[token].type === tt.braceR && numBackQuotes > 0;
  }

  function isTemplateEnder(token) {
    return isBackQuote(token) ||
           tokens[token].type === tt.dollarBraceL;
  }

  // append the values between start and end
  function createTemplateValue(start, end) {
    var value = "";
    while (start <= end) {
      if (tokens[start].value) {
        value += tokens[start].value;
      } else if (tokens[start].type !== tt.template) {
        value += tokens[start].type.label;
      }
      start++;
    }
    return value;
  }

  // create Template token
  function replaceWithTemplateType(start, end) {
    var templateToken = {
      type: "Template",
      value: createTemplateValue(start, end),
      start: tokens[start].start,
      end: tokens[end].end,
      loc: {
        start: tokens[start].loc.start,
        end: tokens[end].loc.end
      }
    };

    // put new token in place of old tokens
    tokens.splice(start, end - start + 1, templateToken);
  }

  function trackNumBraces(token) {
    if (tokens[token].type === tt.braceL) {
      numBraces++;
    } else if (tokens[token].type === tt.braceR) {
      numBraces--;
    }
  }

  while (startingToken < tokens.length) {
    // template start: check if ` or }
    if (isTemplateStarter(startingToken) && numBraces === 0) {
      if (isBackQuote(startingToken)) {
        numBackQuotes++;
      }

      currentToken = startingToken + 1;

      // check if token after template start is "template"
      if (currentToken >= tokens.length - 1 || tokens[currentToken].type !== tt.template) {
        break;
      }

      // template end: find ` or ${
      while (!isTemplateEnder(currentToken)) {
        if (currentToken >= tokens.length - 1) {
          break;
        }
        currentToken++;
      }

      if (isBackQuote(currentToken)) {
        numBackQuotes--;
      }
      // template start and end found: create new token
      replaceWithTemplateType(startingToken, currentToken);
    } else if (numBackQuotes > 0) {
      trackNumBraces(startingToken);
    }
    startingToken++;
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187543, function(require, module, exports) {
"use strict";

module.exports = function (token, tt, source) {
  var type = token.type;
  token.range = [token.start, token.end];

  if (type === tt.name) {
    token.type = "Identifier";
  } else if (type === tt.semi || type === tt.comma ||
             type === tt.parenL || type === tt.parenR ||
             type === tt.braceL || type === tt.braceR ||
             type === tt.slash || type === tt.dot ||
             type === tt.bracketL || type === tt.bracketR ||
             type === tt.ellipsis || type === tt.arrow ||
             type === tt.star || type === tt.incDec ||
             type === tt.colon || type === tt.question ||
             type === tt.template || type === tt.backQuote ||
             type === tt.dollarBraceL || type === tt.at ||
             type === tt.logicalOR || type === tt.logicalAND ||
             type === tt.bitwiseOR || type === tt.bitwiseXOR ||
             type === tt.bitwiseAND || type === tt.equality ||
             type === tt.relational || type === tt.bitShift ||
             type === tt.plusMin || type === tt.modulo ||
             type === tt.exponent || type === tt.prefix ||
             type === tt.doubleColon ||
             type.isAssign) {
    token.type = "Punctuator";
    if (!token.value) token.value = type.label;
  } else if (type === tt.jsxTagStart) {
    token.type = "Punctuator";
    token.value = "<";
  } else if (type === tt.jsxTagEnd) {
    token.type = "Punctuator";
    token.value = ">";
  } else if (type === tt.jsxName) {
    token.type = "JSXIdentifier";
  } else if (type === tt.jsxText) {
    token.type = "JSXText";
  } else if (type.keyword === "null") {
    token.type = "Null";
  } else if (type.keyword === "false" || type.keyword === "true") {
    token.type = "Boolean";
  } else if (type.keyword) {
    token.type = "Keyword";
  } else if (type === tt.num) {
    token.type = "Numeric";
    token.value = source.slice(token.start, token.end);
  } else if (type === tt.string) {
    token.type = "String";
    token.value = source.slice(token.start, token.end);
  } else if (type === tt.regexp) {
    token.type = "RegularExpression";
    var value = token.value;
    token.regex = {
      pattern: value.pattern,
      flags: value.flags
    };
    token.value = `/${value.pattern}/${value.flags}`;
  }

  return token;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187544, function(require, module, exports) {
"use strict";

var convertComments = require("./convertComments");

module.exports = function (ast, traverse, code) {
  var state = { source: code };
  ast.range = [ast.start, ast.end];
  traverse(ast, astTransformVisitor, null, state);
};

function changeToLiteral(node, state) {
  node.type = "Literal";
  if (!node.raw) {
    if (node.extra && node.extra.raw) {
      node.raw = node.extra.raw;
    } else {
      node.raw = state.source.slice(node.start, node.end);
    }
  }
}

var astTransformVisitor = {
  noScope: true,
  enter (path) {
    var node = path.node;

    node.range = [node.start, node.end];

    // private var to track original node type
    node._babelType = node.type;

    if (node.innerComments) {
      node.trailingComments = node.innerComments;
      delete node.innerComments;
    }

    if (node.trailingComments) {
      convertComments(node.trailingComments);
    }

    if (node.leadingComments) {
      convertComments(node.leadingComments);
    }

    // make '_paths' non-enumerable (babel-eslint #200)
    Object.defineProperty(node, "_paths", { value: node._paths, writable: true });
  },
  exit (path, state) {
    var node = path.node;

    // fixDirectives
    if (path.isFunction() || path.isProgram()) {
      var directivesContainer = node;
      var body = node.body;
      if (node.type !== "Program") {
        directivesContainer = body;
        body = body.body;
      }
      if (directivesContainer.directives) {
        for (var i = directivesContainer.directives.length - 1; i >= 0; i--) {
          var directive = directivesContainer.directives[i];
          directive.type = "ExpressionStatement";
          directive.expression = directive.value;
          delete directive.value;
          directive.expression.type = "Literal";
          changeToLiteral(directive.expression, state);
          body.unshift(directive);
        }
        delete directivesContainer.directives;
      }
    }

    if (path.isJSXText()) {
      node.type = "Literal";
      node.raw = node.value;
    }

    if (path.isNumericLiteral() ||
        path.isStringLiteral()) {
      changeToLiteral(node, state);
    }

    if (path.isBooleanLiteral()) {
      node.type = "Literal";
      node.raw = String(node.value);
    }

    if (path.isNullLiteral()) {
      node.type = "Literal";
      node.raw = "null";
      node.value = null;
    }

    if (path.isRegExpLiteral()) {
      node.type = "Literal";
      node.raw = node.extra.raw;
      node.value = {};
      node.regex = {
        pattern: node.pattern,
        flags: node.flags
      };
      delete node.extra;
      delete node.pattern;
      delete node.flags;
    }

    if (path.isObjectProperty()) {
      node.type = "Property";
      node.kind = "init";
    }

    if (path.isClassMethod() || path.isObjectMethod()) {
      var code = state.source.slice(node.key.end, node.body.start);
      var offset = code.indexOf("(");

      node.value = {
        type: "FunctionExpression",
        id: node.id,
        params: node.params,
        body: node.body,
        async: node.async,
        generator: node.generator,
        expression: node.expression,
        defaults: [], // basic support - TODO: remove (old esprima)
        loc: {
          start: {
            line: node.key.loc.start.line,
            column: node.key.loc.end.column + offset // a[() {]
          },
          end: node.body.loc.end
        }
      };
      // [asdf]() {
      node.value.range = [node.key.end + offset, node.body.end];

      node.value.start = node.value.range && node.value.range[0] || node.value.loc.start.column;
      node.value.end = node.value.range && node.value.range[1] || node.value.loc.end.column;

      if (node.returnType) {
        node.value.returnType = node.returnType;
      }

      if (node.typeParameters) {
        node.value.typeParameters = node.typeParameters;
      }

      if (path.isClassMethod()) {
        node.type = "MethodDefinition";
      }

      if (path.isObjectMethod()) {
        node.type = "Property";
        if (node.kind === "method") {
          node.kind = "init";
        }
      }

      delete node.body;
      delete node.id;
      delete node.async;
      delete node.generator;
      delete node.expression;
      delete node.params;
      delete node.returnType;
      delete node.typeParameters;
    }

    if (path.isRestProperty() || path.isSpreadProperty()) {
      node.type = `Experimental${node.type}`;
    }

    if (path.isTypeParameter && path.isTypeParameter()) {
      node.type = "Identifier";
      node.typeAnnotation = node.bound;
      delete node.bound;
    }

    // flow: prevent "no-undef"
    // for "Component" in: "let x: React.Component"
    if (path.isQualifiedTypeIdentifier()) {
      delete node.id;
    }
    // for "b" in: "var a: { b: Foo }"
    if (path.isObjectTypeProperty()) {
      delete node.key;
    }
    // for "indexer" in: "var a: {[indexer: string]: number}"
    if (path.isObjectTypeIndexer()) {
      delete node.id;
    }
    // for "param" in: "var a: { func(param: Foo): Bar };"
    if (path.isFunctionTypeParam()) {
      delete node.name;
    }

    // modules

    if (path.isImportDeclaration()) {
      delete node.isType;
    }

    if (path.isExportDeclaration()) {
      var declar = path.get("declaration");
      if (declar.isClassExpression()) {
        node.declaration.type = "ClassDeclaration";
      } else if (declar.isFunctionExpression()) {
        node.declaration.type = "FunctionDeclaration";
      }
    }

    // TODO: remove (old esprima)
    if (path.isFunction()) {
      if (!node.defaults) {
        node.defaults = [];
      }
    }

    // template string range fixes
    if (path.isTemplateLiteral()) {
      for (var j = 0; j < node.quasis.length; j++) {
        var q = node.quasis[j];
        q.range[0] -= 1;
        if (q.tail) {
          q.range[1] += 1;
        } else {
          q.range[1] += 2;
        }
        q.loc.start.column -= 1;
        if (q.tail) {
          q.loc.end.column += 1;
        } else {
          q.loc.end.column += 2;
        }
      }
    }
  }
};

}, function(modId) { var map = {"./convertComments":1536577187540}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187537);
})()
//# sourceMappingURL=index.js.map