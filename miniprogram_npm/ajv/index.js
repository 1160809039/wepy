module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187442, function(require, module, exports) {
'use strict';

var compileSchema = require('./compile')
  , resolve = require('./compile/resolve')
  , Cache = require('./cache')
  , SchemaObject = require('./compile/schema_obj')
  , stableStringify = require('json-stable-stringify')
  , formats = require('./compile/formats')
  , rules = require('./compile/rules')
  , v5 = require('./v5')
  , util = require('./compile/util')
  , async = require('./async')
  , co = require('co');

module.exports = Ajv;

Ajv.prototype.compileAsync = async.compile;

var customKeyword = require('./keyword');
Ajv.prototype.addKeyword = customKeyword.add;
Ajv.prototype.getKeyword = customKeyword.get;
Ajv.prototype.removeKeyword = customKeyword.remove;
Ajv.ValidationError = require('./compile/validation_error');

var META_SCHEMA_ID = 'http://json-schema.org/draft-04/schema';
var SCHEMA_URI_FORMAT = /^(?:(?:[a-z][a-z0-9+-.]*:)?\/\/)?[^\s]*$/i;
function SCHEMA_URI_FORMAT_FUNC(str) {
  return SCHEMA_URI_FORMAT.test(str);
}

var META_IGNORE_OPTIONS = [ 'removeAdditional', 'useDefaults', 'coerceTypes' ];

/**
 * Creates validator instance.
 * Usage: `Ajv(opts)`
 * @param {Object} opts optional options
 * @return {Object} ajv instance
 */
function Ajv(opts) {
  if (!(this instanceof Ajv)) return new Ajv(opts);
  var self = this;

  opts = this._opts = util.copy(opts) || {};
  this._schemas = {};
  this._refs = {};
  this._fragments = {};
  this._formats = formats(opts.format);
  this._cache = opts.cache || new Cache;
  this._loadingSchemas = {};
  this._compilations = [];
  this.RULES = rules();

  // this is done on purpose, so that methods are bound to the instance
  // (without using bind) so that they can be used without the instance
  this.validate = validate;
  this.compile = compile;
  this.addSchema = addSchema;
  this.addMetaSchema = addMetaSchema;
  this.validateSchema = validateSchema;
  this.getSchema = getSchema;
  this.removeSchema = removeSchema;
  this.addFormat = addFormat;
  this.errorsText = errorsText;

  this._addSchema = _addSchema;
  this._compile = _compile;

  opts.loopRequired = opts.loopRequired || Infinity;
  if (opts.async || opts.transpile) async.setup(opts);
  if (opts.beautify === true) opts.beautify = { indent_size: 2 };
  if (opts.errorDataPath == 'property') opts._errorDataPathProperty = true;
  this._metaOpts = getMetaSchemaOptions();

  if (opts.formats) addInitialFormats();
  addDraft4MetaSchema();
  if (opts.v5) v5.enable(this);
  if (typeof opts.meta == 'object') addMetaSchema(opts.meta);
  addInitialSchemas();


  /**
   * Validate data using schema
   * Schema will be compiled and cached (using serialized JSON as key. [json-stable-stringify](https://github.com/substack/json-stable-stringify) is used to serialize.
   * @param  {String|Object} schemaKeyRef key, ref or schema object
   * @param  {Any} data to be validated
   * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
   */
  function validate(schemaKeyRef, data) {
    var v;
    if (typeof schemaKeyRef == 'string') {
      v = getSchema(schemaKeyRef);
      if (!v) throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
    } else {
      var schemaObj = _addSchema(schemaKeyRef);
      v = schemaObj.validate || _compile(schemaObj);
    }

    var valid = v(data);
    if (v.$async === true)
      return self._opts.async == '*' ? co(valid) : valid;
    self.errors = v.errors;
    return valid;
  }


  /**
   * Create validating function for passed schema.
   * @param  {Object} schema schema object
   * @param  {Boolean} _meta true if schema is a meta-schema. Used internally to compile meta schemas of custom keywords.
   * @return {Function} validating function
   */
  function compile(schema, _meta) {
    var schemaObj = _addSchema(schema, undefined, _meta);
    return schemaObj.validate || _compile(schemaObj);
  }


  /**
   * Adds schema to the instance.
   * @param {Object|Array} schema schema or array of schemas. If array is passed, `key` and other parameters will be ignored.
   * @param {String} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
   * @param {Boolean} _skipValidation true to skip schema validation. Used internally, option validateSchema should be used instead.
   * @param {Boolean} _meta true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
   */
  function addSchema(schema, key, _skipValidation, _meta) {
    if (Array.isArray(schema)){
      for (var i=0; i<schema.length; i++) addSchema(schema[i], undefined, _skipValidation, _meta);
      return;
    }
    // can key/id have # inside?
    key = resolve.normalizeId(key || schema.id);
    checkUnique(key);
    self._schemas[key] = _addSchema(schema, _skipValidation, _meta, true);
  }


  /**
   * Add schema that will be used to validate other schemas
   * options in META_IGNORE_OPTIONS are alway set to false
   * @param {Object} schema schema object
   * @param {String} key optional schema key
   * @param {Boolean} skipValidation true to skip schema validation, can be used to override validateSchema option for meta-schema
   */
  function addMetaSchema(schema, key, skipValidation) {
    addSchema(schema, key, skipValidation, true);
  }


  /**
   * Validate schema
   * @param {Object} schema schema to validate
   * @param {Boolean} throwOrLogError pass true to throw (or log) an error if invalid
   * @return {Boolean} true if schema is valid
   */
  function validateSchema(schema, throwOrLogError) {
    var $schema = schema.$schema || self._opts.defaultMeta || defaultMeta();
    var currentUriFormat = self._formats.uri;
    self._formats.uri = typeof currentUriFormat == 'function'
                        ? SCHEMA_URI_FORMAT_FUNC
                        : SCHEMA_URI_FORMAT;
    var valid;
    try { valid = validate($schema, schema); }
    finally { self._formats.uri = currentUriFormat; }
    if (!valid && throwOrLogError) {
      var message = 'schema is invalid: ' + errorsText();
      if (self._opts.validateSchema == 'log') console.error(message);
      else throw new Error(message);
    }
    return valid;
  }


  function defaultMeta() {
    var meta = self._opts.meta;
    self._opts.defaultMeta = typeof meta == 'object'
                              ? meta.id || meta
                              : self._opts.v5
                                ? v5.META_SCHEMA_ID
                                : META_SCHEMA_ID;
    return self._opts.defaultMeta;
  }


  /**
   * Get compiled schema from the instance by `key` or `ref`.
   * @param  {String} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
   * @return {Function} schema validating function (with property `schema`).
   */
  function getSchema(keyRef) {
    var schemaObj = _getSchemaObj(keyRef);
    switch (typeof schemaObj) {
      case 'object': return schemaObj.validate || _compile(schemaObj);
      case 'string': return getSchema(schemaObj);
      case 'undefined': return _getSchemaFragment(keyRef);
    }
  }


  function _getSchemaFragment(ref) {
    var res = resolve.schema.call(self, { schema: {} }, ref);
    if (res) {
      var schema = res.schema
        , root = res.root
        , baseId = res.baseId;
      var v = compileSchema.call(self, schema, root, undefined, baseId);
      self._fragments[ref] = new SchemaObject({
        ref: ref,
        fragment: true,
        schema: schema,
        root: root,
        baseId: baseId,
        validate: v
      });
      return v;
    }
  }


  function _getSchemaObj(keyRef) {
    keyRef = resolve.normalizeId(keyRef);
    return self._schemas[keyRef] || self._refs[keyRef] || self._fragments[keyRef];
  }


  /**
   * Remove cached schema(s).
   * If no parameter is passed all schemas but meta-schemas are removed.
   * If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
   * Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
   * @param  {String|Object|RegExp} schemaKeyRef key, ref, pattern to match key/ref or schema object
   */
  function removeSchema(schemaKeyRef) {
    if (schemaKeyRef instanceof RegExp) {
      _removeAllSchemas(self._schemas, schemaKeyRef);
      _removeAllSchemas(self._refs, schemaKeyRef);
      return;
    }
    switch (typeof schemaKeyRef) {
      case 'undefined':
        _removeAllSchemas(self._schemas);
        _removeAllSchemas(self._refs);
        self._cache.clear();
        return;
      case 'string':
        var schemaObj = _getSchemaObj(schemaKeyRef);
        if (schemaObj) self._cache.del(schemaObj.jsonStr);
        delete self._schemas[schemaKeyRef];
        delete self._refs[schemaKeyRef];
        return;
      case 'object':
        var jsonStr = stableStringify(schemaKeyRef);
        self._cache.del(jsonStr);
        var id = schemaKeyRef.id;
        if (id) {
          id = resolve.normalizeId(id);
          delete self._schemas[id];
          delete self._refs[id];
        }
    }
  }


  function _removeAllSchemas(schemas, regex) {
    for (var keyRef in schemas) {
      var schemaObj = schemas[keyRef];
      if (!schemaObj.meta && (!regex || regex.test(keyRef))) {
        self._cache.del(schemaObj.jsonStr);
        delete schemas[keyRef];
      }
    }
  }


  function _addSchema(schema, skipValidation, meta, shouldAddSchema) {
    if (typeof schema != 'object') throw new Error('schema should be object');
    var jsonStr = stableStringify(schema);
    var cached = self._cache.get(jsonStr);
    if (cached) return cached;

    shouldAddSchema = shouldAddSchema || self._opts.addUsedSchema !== false;

    var id = resolve.normalizeId(schema.id);
    if (id && shouldAddSchema) checkUnique(id);

    var willValidate = self._opts.validateSchema !== false && !skipValidation;
    var recursiveMeta;
    if (willValidate && !(recursiveMeta = schema.id && schema.id == schema.$schema))
      validateSchema(schema, true);

    var localRefs = resolve.ids.call(self, schema);

    var schemaObj = new SchemaObject({
      id: id,
      schema: schema,
      localRefs: localRefs,
      jsonStr: jsonStr,
      meta: meta
    });

    if (id[0] != '#' && shouldAddSchema) self._refs[id] = schemaObj;
    self._cache.put(jsonStr, schemaObj);

    if (willValidate && recursiveMeta) validateSchema(schema, true);

    return schemaObj;
  }


  function _compile(schemaObj, root) {
    if (schemaObj.compiling) {
      schemaObj.validate = callValidate;
      callValidate.schema = schemaObj.schema;
      callValidate.errors = null;
      callValidate.root = root ? root : callValidate;
      if (schemaObj.schema.$async === true)
        callValidate.$async = true;
      return callValidate;
    }
    schemaObj.compiling = true;

    var currentOpts;
    if (schemaObj.meta) {
      currentOpts = self._opts;
      self._opts = self._metaOpts;
    }

    var v;
    try { v = compileSchema.call(self, schemaObj.schema, root, schemaObj.localRefs); }
    finally {
      schemaObj.compiling = false;
      if (schemaObj.meta) self._opts = currentOpts;
    }

    schemaObj.validate = v;
    schemaObj.refs = v.refs;
    schemaObj.refVal = v.refVal;
    schemaObj.root = v.root;
    return v;


    function callValidate() {
      var _validate = schemaObj.validate;
      var result = _validate.apply(null, arguments);
      callValidate.errors = _validate.errors;
      return result;
    }
  }


  /**
   * Convert array of error message objects to string
   * @param  {Array<Object>} errors optional array of validation errors, if not passed errors from the instance are used.
   * @param  {Object} options optional options with properties `separator` and `dataVar`.
   * @return {String} human readable string with all errors descriptions
   */
  function errorsText(errors, options) {
    errors = errors || self.errors;
    if (!errors) return 'No errors';
    options = options || {};
    var separator = options.separator === undefined ? ', ' : options.separator;
    var dataVar = options.dataVar === undefined ? 'data' : options.dataVar;

    var text = '';
    for (var i=0; i<errors.length; i++) {
      var e = errors[i];
      if (e) text += dataVar + e.dataPath + ' ' + e.message + separator;
    }
    return text.slice(0, -separator.length);
  }


  /**
   * Add custom format
   * @param {String} name format name
   * @param {String|RegExp|Function} format string is converted to RegExp; function should return boolean (true when valid)
   */
  function addFormat(name, format) {
    if (typeof format == 'string') format = new RegExp(format);
    self._formats[name] = format;
  }


  function addDraft4MetaSchema() {
    if (self._opts.meta !== false) {
      var metaSchema = require('./refs/json-schema-draft-04.json');
      addMetaSchema(metaSchema, META_SCHEMA_ID, true);
      self._refs['http://json-schema.org/schema'] = META_SCHEMA_ID;
    }
  }


  function addInitialSchemas() {
    var optsSchemas = self._opts.schemas;
    if (!optsSchemas) return;
    if (Array.isArray(optsSchemas)) addSchema(optsSchemas);
    else for (var key in optsSchemas) addSchema(optsSchemas[key], key);
  }


  function addInitialFormats() {
    for (var name in self._opts.formats) {
      var format = self._opts.formats[name];
      addFormat(name, format);
    }
  }


  function checkUnique(id) {
    if (self._schemas[id] || self._refs[id])
      throw new Error('schema with key or id "' + id + '" already exists');
  }


  function getMetaSchemaOptions() {
    var metaOpts = util.copy(self._opts);
    for (var i=0; i<META_IGNORE_OPTIONS.length; i++)
      delete metaOpts[META_IGNORE_OPTIONS[i]];
    return metaOpts;
  }
}

}, function(modId) {var map = {"./compile":1536577187443,"./compile/resolve":1536577187444,"./cache":1536577187452,"./compile/schema_obj":1536577187448,"./compile/formats":1536577187453,"./compile/rules":1536577187454,"./v5":1536577187474,"./compile/util":1536577187446,"./async":1536577187449,"./keyword":1536577187480,"./compile/validation_error":1536577187451,"./refs/json-schema-draft-04.json":1536577187482}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187443, function(require, module, exports) {
'use strict';

var resolve = require('./resolve')
  , util = require('./util')
  , stableStringify = require('json-stable-stringify')
  , async = require('../async');

var beautify;

function loadBeautify(){
  if (beautify === undefined) {
    var name = 'js-beautify';
    try { beautify = require(name).js_beautify; }
    catch(e) { beautify = false; }
  }
}

var validateGenerator = require('../dotjs/validate');

/**
 * Functions below are used inside compiled validations function
 */

var co = require('co');
var ucs2length = util.ucs2length;
var equal = require('./equal');

// this error is thrown by async schemas to return validation errors via exception
var ValidationError = require('./validation_error');

module.exports = compile;


/**
 * Compiles schema to validation function
 * @this   Ajv
 * @param  {Object} schema schema object
 * @param  {Object} root object with information about the root schema for this schema
 * @param  {Object} localRefs the hash of local references inside the schema (created by resolve.id), used for inline resolution
 * @param  {String} baseId base ID for IDs in the schema
 * @return {Function} validation function
 */
function compile(schema, root, localRefs, baseId) {
  /* jshint validthis: true, evil: true */
  /* eslint no-shadow: 0 */
  var self = this
    , opts = this._opts
    , refVal = [ undefined ]
    , refs = {}
    , patterns = []
    , patternsHash = {}
    , defaults = []
    , defaultsHash = {}
    , customRules = []
    , keepSourceCode = opts.sourceCode !== false;

  root = root || { schema: schema, refVal: refVal, refs: refs };

  var c = checkCompiling.call(this, schema, root, baseId);
  var compilation = this._compilations[c.index];
  if (c.compiling) return (compilation.callValidate = callValidate);

  var formats = this._formats;
  var RULES = this.RULES;

  try {
    var v = localCompile(schema, root, localRefs, baseId);
    compilation.validate = v;
    var cv = compilation.callValidate;
    if (cv) {
      cv.schema = v.schema;
      cv.errors = null;
      cv.refs = v.refs;
      cv.refVal = v.refVal;
      cv.root = v.root;
      cv.$async = v.$async;
      if (keepSourceCode) cv.sourceCode = v.sourceCode;
    }
    return v;
  } finally {
    endCompiling.call(this, schema, root, baseId);
  }

  function callValidate() {
    var validate = compilation.validate;
    var result = validate.apply(null, arguments);
    callValidate.errors = validate.errors;
    return result;
  }

  function localCompile(_schema, _root, localRefs, baseId) {
    var isRoot = !_root || (_root && _root.schema == _schema);
    if (_root.schema != root.schema)
      return compile.call(self, _schema, _root, localRefs, baseId);

    var $async = _schema.$async === true;
    if ($async && !opts.transpile) async.setup(opts);

    var sourceCode = validateGenerator({
      isTop: true,
      schema: _schema,
      isRoot: isRoot,
      baseId: baseId,
      root: _root,
      schemaPath: '',
      errSchemaPath: '#',
      errorPath: '""',
      RULES: RULES,
      validate: validateGenerator,
      util: util,
      resolve: resolve,
      resolveRef: resolveRef,
      usePattern: usePattern,
      useDefault: useDefault,
      useCustomRule: useCustomRule,
      opts: opts,
      formats: formats,
      self: self
    });

    sourceCode = vars(refVal, refValCode) + vars(patterns, patternCode)
                   + vars(defaults, defaultCode) + vars(customRules, customRuleCode)
                   + sourceCode;

    if (opts.beautify) {
      loadBeautify();
      /* istanbul ignore else */
      if (beautify) sourceCode = beautify(sourceCode, opts.beautify);
      else console.error('"npm install js-beautify" to use beautify option');
    }
    // console.log('\n\n\n *** \n', sourceCode);
    var validate, validateCode
      , transpile = opts._transpileFunc;
    try {
      validateCode = $async && transpile
                      ? transpile(sourceCode)
                      : sourceCode;

      var makeValidate = new Function(
        'self',
        'RULES',
        'formats',
        'root',
        'refVal',
        'defaults',
        'customRules',
        'co',
        'equal',
        'ucs2length',
        'ValidationError',
        validateCode
      );

      validate = makeValidate(
        self,
        RULES,
        formats,
        root,
        refVal,
        defaults,
        customRules,
        co,
        equal,
        ucs2length,
        ValidationError
      );

      refVal[0] = validate;
    } catch(e) {
      console.error('Error compiling schema, function code:', validateCode);
      throw e;
    }

    validate.schema = _schema;
    validate.errors = null;
    validate.refs = refs;
    validate.refVal = refVal;
    validate.root = isRoot ? validate : _root;
    if ($async) validate.$async = true;
    if (keepSourceCode) validate.sourceCode = sourceCode;
    if (opts.sourceCode === true) {
      validate.source = {
        patterns: patterns,
        defaults: defaults
      };
    }

    return validate;
  }

  function resolveRef(baseId, ref, isRoot) {
    ref = resolve.url(baseId, ref);
    var refIndex = refs[ref];
    var _refVal, refCode;
    if (refIndex !== undefined) {
      _refVal = refVal[refIndex];
      refCode = 'refVal[' + refIndex + ']';
      return resolvedRef(_refVal, refCode);
    }
    if (!isRoot && root.refs) {
      var rootRefId = root.refs[ref];
      if (rootRefId !== undefined) {
        _refVal = root.refVal[rootRefId];
        refCode = addLocalRef(ref, _refVal);
        return resolvedRef(_refVal, refCode);
      }
    }

    refCode = addLocalRef(ref);
    var v = resolve.call(self, localCompile, root, ref);
    if (!v) {
      var localSchema = localRefs && localRefs[ref];
      if (localSchema) {
        v = resolve.inlineRef(localSchema, opts.inlineRefs)
            ? localSchema
            : compile.call(self, localSchema, root, localRefs, baseId);
      }
    }

    if (v) {
      replaceLocalRef(ref, v);
      return resolvedRef(v, refCode);
    }
  }

  function addLocalRef(ref, v) {
    var refId = refVal.length;
    refVal[refId] = v;
    refs[ref] = refId;
    return 'refVal' + refId;
  }

  function replaceLocalRef(ref, v) {
    var refId = refs[ref];
    refVal[refId] = v;
  }

  function resolvedRef(refVal, code) {
    return typeof refVal == 'object'
            ? { code: code, schema: refVal, inline: true }
            : { code: code, $async: refVal && refVal.$async };
  }

  function usePattern(regexStr) {
    var index = patternsHash[regexStr];
    if (index === undefined) {
      index = patternsHash[regexStr] = patterns.length;
      patterns[index] = regexStr;
    }
    return 'pattern' + index;
  }

  function useDefault(value) {
    switch (typeof value) {
      case 'boolean':
      case 'number':
        return '' + value;
      case 'string':
        return util.toQuotedString(value);
      case 'object':
        if (value === null) return 'null';
        var valueStr = stableStringify(value);
        var index = defaultsHash[valueStr];
        if (index === undefined) {
          index = defaultsHash[valueStr] = defaults.length;
          defaults[index] = value;
        }
        return 'default' + index;
    }
  }

  function useCustomRule(rule, schema, parentSchema, it) {
    var validateSchema = rule.definition.validateSchema;
    if (validateSchema && self._opts.validateSchema !== false) {
      var valid = validateSchema(schema);
      if (!valid) {
        var message = 'keyword schema is invalid: ' + self.errorsText(validateSchema.errors);
        if (self._opts.validateSchema == 'log') console.error(message);
        else throw new Error(message);
      }
    }

    var compile = rule.definition.compile
      , inline = rule.definition.inline
      , macro = rule.definition.macro;

    var validate;
    if (compile) {
      validate = compile.call(self, schema, parentSchema, it);
    } else if (macro) {
      validate = macro.call(self, schema, parentSchema, it);
      if (opts.validateSchema !== false) self.validateSchema(validate, true);
    } else if (inline) {
      validate = inline.call(self, it, rule.keyword, schema, parentSchema);
    } else {
      validate = rule.definition.validate;
    }

    var index = customRules.length;
    customRules[index] = validate;

    return {
      code: 'customRule' + index,
      validate: validate
    };
  }
}


/**
 * Checks if the schema is currently compiled
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 * @return {Object} object with properties "index" (compilation index) and "compiling" (boolean)
 */
function checkCompiling(schema, root, baseId) {
  /* jshint validthis: true */
  var index = compIndex.call(this, schema, root, baseId);
  if (index >= 0) return { index: index, compiling: true };
  index = this._compilations.length;
  this._compilations[index] = {
    schema: schema,
    root: root,
    baseId: baseId
  };
  return { index: index, compiling: false };
}


/**
 * Removes the schema from the currently compiled list
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 */
function endCompiling(schema, root, baseId) {
  /* jshint validthis: true */
  var i = compIndex.call(this, schema, root, baseId);
  if (i >= 0) this._compilations.splice(i, 1);
}


/**
 * Index of schema compilation in the currently compiled list
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 * @return {Integer} compilation index
 */
function compIndex(schema, root, baseId) {
  /* jshint validthis: true */
  for (var i=0; i<this._compilations.length; i++) {
    var c = this._compilations[i];
    if (c.schema == schema && c.root == root && c.baseId == baseId) return i;
  }
  return -1;
}


function patternCode(i, patterns) {
  return 'var pattern' + i + ' = new RegExp(' + util.toQuotedString(patterns[i]) + ');';
}


function defaultCode(i) {
  return 'var default' + i + ' = defaults[' + i + '];';
}


function refValCode(i, refVal) {
  return refVal[i] ? 'var refVal' + i + ' = refVal[' + i + '];' : '';
}


function customRuleCode(i) {
  return 'var customRule' + i + ' = customRules[' + i + '];';
}


function vars(arr, statement) {
  if (!arr.length) return '';
  var code = '';
  for (var i=0; i<arr.length; i++)
    code += statement(i, arr);
  return code;
}

}, function(modId) { var map = {"./resolve":1536577187444,"./util":1536577187446,"../async":1536577187449,"../dotjs/validate":1536577187450,"./equal":1536577187445,"./validation_error":1536577187451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187444, function(require, module, exports) {
'use strict';

var url = require('url')
  , equal = require('./equal')
  , util = require('./util')
  , SchemaObject = require('./schema_obj');

module.exports = resolve;

resolve.normalizeId = normalizeId;
resolve.fullPath = getFullPath;
resolve.url = resolveUrl;
resolve.ids = resolveIds;
resolve.inlineRef = inlineRef;
resolve.schema = resolveSchema;

/**
 * [resolve and compile the references ($ref)]
 * @this   Ajv
 * @param  {Function} compile reference to schema compilation funciton (localCompile)
 * @param  {Object} root object with information about the root schema for the current schema
 * @param  {String} ref reference to resolve
 * @return {Object|Function} schema object (if the schema can be inlined) or validation function
 */
function resolve(compile, root, ref) {
  /* jshint validthis: true */
  var refVal = this._refs[ref];
  if (typeof refVal == 'string') {
    if (this._refs[refVal]) refVal = this._refs[refVal];
    else return resolve.call(this, compile, root, refVal);
  }

  refVal = refVal || this._schemas[ref];
  if (refVal instanceof SchemaObject) {
    return inlineRef(refVal.schema, this._opts.inlineRefs)
            ? refVal.schema
            : refVal.validate || this._compile(refVal);
  }

  var res = resolveSchema.call(this, root, ref);
  var schema, v, baseId;
  if (res) {
    schema = res.schema;
    root = res.root;
    baseId = res.baseId;
  }

  if (schema instanceof SchemaObject) {
    v = schema.validate || compile.call(this, schema.schema, root, undefined, baseId);
  } else if (schema) {
    v = inlineRef(schema, this._opts.inlineRefs)
        ? schema
        : compile.call(this, schema, root, undefined, baseId);
  }

  return v;
}


/**
 * Resolve schema, its root and baseId
 * @this Ajv
 * @param  {Object} root root object with properties schema, refVal, refs
 * @param  {String} ref  reference to resolve
 * @return {Object} object with properties schema, root, baseId
 */
function resolveSchema(root, ref) {
  /* jshint validthis: true */
  var p = url.parse(ref, false, true)
    , refPath = _getFullPath(p)
    , baseId = getFullPath(root.schema.id);
  if (refPath !== baseId) {
    var id = normalizeId(refPath);
    var refVal = this._refs[id];
    if (typeof refVal == 'string') {
      return resolveRecursive.call(this, root, refVal, p);
    } else if (refVal instanceof SchemaObject) {
      if (!refVal.validate) this._compile(refVal);
      root = refVal;
    } else {
      refVal = this._schemas[id];
      if (refVal instanceof SchemaObject) {
        if (!refVal.validate) this._compile(refVal);
        if (id == normalizeId(ref))
          return { schema: refVal, root: root, baseId: baseId };
        root = refVal;
      } else {
        return;
      }
    }
    if (!root.schema) return;
    baseId = getFullPath(root.schema.id);
  }
  return getJsonPointer.call(this, p, baseId, root.schema, root);
}


/* @this Ajv */
function resolveRecursive(root, ref, parsedRef) {
  /* jshint validthis: true */
  var res = resolveSchema.call(this, root, ref);
  if (res) {
    var schema = res.schema;
    var baseId = res.baseId;
    root = res.root;
    if (schema.id) baseId = resolveUrl(baseId, schema.id);
    return getJsonPointer.call(this, parsedRef, baseId, schema, root);
  }
}


var PREVENT_SCOPE_CHANGE = util.toHash(['properties', 'patternProperties', 'enum', 'dependencies', 'definitions']);
/* @this Ajv */
function getJsonPointer(parsedRef, baseId, schema, root) {
  /* jshint validthis: true */
  parsedRef.hash = parsedRef.hash || '';
  if (parsedRef.hash.slice(0,2) != '#/') return;
  var parts = parsedRef.hash.split('/');

  for (var i = 1; i < parts.length; i++) {
    var part = parts[i];
    if (part) {
      part = util.unescapeFragment(part);
      schema = schema[part];
      if (!schema) break;
      if (schema.id && !PREVENT_SCOPE_CHANGE[part]) baseId = resolveUrl(baseId, schema.id);
      if (schema.$ref) {
        var $ref = resolveUrl(baseId, schema.$ref);
        var res = resolveSchema.call(this, root, $ref);
        if (res) {
          schema = res.schema;
          root = res.root;
          baseId = res.baseId;
        }
      }
    }
  }
  if (schema && schema != root.schema)
    return { schema: schema, root: root, baseId: baseId };
}


var SIMPLE_INLINED = util.toHash([
  'type', 'format', 'pattern',
  'maxLength', 'minLength',
  'maxProperties', 'minProperties',
  'maxItems', 'minItems',
  'maximum', 'minimum',
  'uniqueItems', 'multipleOf',
  'required', 'enum'
]);
function inlineRef(schema, limit) {
  if (limit === false) return false;
  if (limit === undefined || limit === true) return checkNoRef(schema);
  else if (limit) return countKeys(schema) <= limit;
}


function checkNoRef(schema) {
  var item;
  if (Array.isArray(schema)) {
    for (var i=0; i<schema.length; i++) {
      item = schema[i];
      if (typeof item == 'object' && !checkNoRef(item)) return false;
    }
  } else {
    for (var key in schema) {
      if (key == '$ref') return false;
      item = schema[key];
      if (typeof item == 'object' && !checkNoRef(item)) return false;
    }
  }
  return true;
}


function countKeys(schema) {
  var count = 0, item;
  if (Array.isArray(schema)) {
    for (var i=0; i<schema.length; i++) {
      item = schema[i];
      if (typeof item == 'object') count += countKeys(item);
      if (count == Infinity) return Infinity;
    }
  } else {
    for (var key in schema) {
      if (key == '$ref') return Infinity;
      if (SIMPLE_INLINED[key]) {
        count++;
      } else {
        item = schema[key];
        if (typeof item == 'object') count += countKeys(item) + 1;
        if (count == Infinity) return Infinity;
      }
    }
  }
  return count;
}


function getFullPath(id, normalize) {
  if (normalize !== false) id = normalizeId(id);
  var p = url.parse(id, false, true);
  return _getFullPath(p);
}


function _getFullPath(p) {
  var protocolSeparator = p.protocol || p.href.slice(0,2) == '//' ? '//' : '';
  return (p.protocol||'') + protocolSeparator + (p.host||'') + (p.path||'')  + '#';
}


var TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
  return id ? id.replace(TRAILING_SLASH_HASH, '') : '';
}


function resolveUrl(baseId, id) {
  id = normalizeId(id);
  return url.resolve(baseId, id);
}


/* @this Ajv */
function resolveIds(schema) {
  /* eslint no-shadow: 0 */
  /* jshint validthis: true */
  var id = normalizeId(schema.id);
  var localRefs = {};
  _resolveIds.call(this, schema, getFullPath(id, false), id);
  return localRefs;

  /* @this Ajv */
  function _resolveIds(schema, fullPath, baseId) {
    /* jshint validthis: true */
    if (Array.isArray(schema)) {
      for (var i=0; i<schema.length; i++)
        _resolveIds.call(this, schema[i], fullPath+'/'+i, baseId);
    } else if (schema && typeof schema == 'object') {
      if (typeof schema.id == 'string') {
        var id = baseId = baseId
                          ? url.resolve(baseId, schema.id)
                          : schema.id;
        id = normalizeId(id);

        var refVal = this._refs[id];
        if (typeof refVal == 'string') refVal = this._refs[refVal];
        if (refVal && refVal.schema) {
          if (!equal(schema, refVal.schema))
            throw new Error('id "' + id + '" resolves to more than one schema');
        } else if (id != normalizeId(fullPath)) {
          if (id[0] == '#') {
            if (localRefs[id] && !equal(schema, localRefs[id]))
              throw new Error('id "' + id + '" resolves to more than one schema');
            localRefs[id] = schema;
          } else {
            this._refs[id] = fullPath;
          }
        }
      }
      for (var key in schema)
        _resolveIds.call(this, schema[key], fullPath+'/'+util.escapeFragment(key), baseId);
    }
  }
}

}, function(modId) { var map = {"./equal":1536577187445,"./util":1536577187446,"./schema_obj":1536577187448}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187445, function(require, module, exports) {
'use strict';

/*eslint complexity: 0*/

module.exports = function equal(a, b) {
  if (a === b) return true;

  var arrA = Array.isArray(a)
    , arrB = Array.isArray(b)
    , i;

  if (arrA && arrB) {
    if (a.length != b.length) return false;
    for (i = 0; i < a.length; i++)
      if (!equal(a[i], b[i])) return false;
    return true;
  }

  if (arrA != arrB) return false;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    var keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;

    for (i = 0; i < keys.length; i++)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = 0; i < keys.length; i++)
      if(!equal(a[keys[i]], b[keys[i]])) return false;

    return true;
  }

  return false;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187446, function(require, module, exports) {
'use strict';


module.exports = {
  copy: copy,
  checkDataType: checkDataType,
  checkDataTypes: checkDataTypes,
  coerceToTypes: coerceToTypes,
  toHash: toHash,
  getProperty: getProperty,
  escapeQuotes: escapeQuotes,
  ucs2length: require('./ucs2length'),
  varOccurences: varOccurences,
  varReplace: varReplace,
  cleanUpCode: cleanUpCode,
  cleanUpVarErrors: cleanUpVarErrors,
  schemaHasRules: schemaHasRules,
  schemaHasRulesExcept: schemaHasRulesExcept,
  stableStringify: require('json-stable-stringify'),
  toQuotedString: toQuotedString,
  getPathExpr: getPathExpr,
  getPath: getPath,
  getData: getData,
  unescapeFragment: unescapeFragment,
  escapeFragment: escapeFragment,
  escapeJsonPointer: escapeJsonPointer
};


function copy(o, to) {
  to = to || {};
  for (var key in o) to[key] = o[key];
  return to;
}


function checkDataType(dataType, data, negate) {
  var EQUAL = negate ? ' !== ' : ' === '
    , AND = negate ? ' || ' : ' && '
    , OK = negate ? '!' : ''
    , NOT = negate ? '' : '!';
  switch (dataType) {
    case 'null': return data + EQUAL + 'null';
    case 'array': return OK + 'Array.isArray(' + data + ')';
    case 'object': return '(' + OK + data + AND +
                          'typeof ' + data + EQUAL + '"object"' + AND +
                          NOT + 'Array.isArray(' + data + '))';
    case 'integer': return '(typeof ' + data + EQUAL + '"number"' + AND +
                           NOT + '(' + data + ' % 1)' +
                           AND + data + EQUAL + data + ')';
    default: return 'typeof ' + data + EQUAL + '"' + dataType + '"';
  }
}


function checkDataTypes(dataTypes, data) {
  switch (dataTypes.length) {
    case 1: return checkDataType(dataTypes[0], data, true);
    default:
      var code = '';
      var types = toHash(dataTypes);
      if (types.array && types.object) {
        code = types.null ? '(': '(!' + data + ' || ';
        code += 'typeof ' + data + ' !== "object")';
        delete types.null;
        delete types.array;
        delete types.object;
      }
      if (types.number) delete types.integer;
      for (var t in types)
        code += (code ? ' && ' : '' ) + checkDataType(t, data, true);

      return code;
  }
}


var COERCE_TO_TYPES = toHash([ 'string', 'number', 'integer', 'boolean', 'null' ]);
function coerceToTypes(optionCoerceTypes, dataTypes) {
  if (Array.isArray(dataTypes)) {
    var types = [];
    for (var i=0; i<dataTypes.length; i++) {
      var t = dataTypes[i];
      if (COERCE_TO_TYPES[t]) types[types.length] = t;
      else if (optionCoerceTypes === 'array' && t === 'array') types[types.length] = t;
    }
    if (types.length) return types;
  } else if (COERCE_TO_TYPES[dataTypes]) {
    return [dataTypes];
  } else if (optionCoerceTypes === 'array' && dataTypes === 'array') {
    return ['array'];
  }
}


function toHash(arr) {
  var hash = {};
  for (var i=0; i<arr.length; i++) hash[arr[i]] = true;
  return hash;
}


var IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
var SINGLE_QUOTE = /'|\\/g;
function getProperty(key) {
  return typeof key == 'number'
          ? '[' + key + ']'
          : IDENTIFIER.test(key)
            ? '.' + key
            : "['" + escapeQuotes(key) + "']";
}


function escapeQuotes(str) {
  return str.replace(SINGLE_QUOTE, '\\$&')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\f/g, '\\f')
            .replace(/\t/g, '\\t');
}


function varOccurences(str, dataVar) {
  dataVar += '[^0-9]';
  var matches = str.match(new RegExp(dataVar, 'g'));
  return matches ? matches.length : 0;
}


function varReplace(str, dataVar, expr) {
  dataVar += '([^0-9])';
  expr = expr.replace(/\$/g, '$$$$');
  return str.replace(new RegExp(dataVar, 'g'), expr + '$1');
}


var EMPTY_ELSE = /else\s*{\s*}/g
  , EMPTY_IF_NO_ELSE = /if\s*\([^)]+\)\s*\{\s*\}(?!\s*else)/g
  , EMPTY_IF_WITH_ELSE = /if\s*\(([^)]+)\)\s*\{\s*\}\s*else(?!\s*if)/g;
function cleanUpCode(out) {
  return out.replace(EMPTY_ELSE, '')
            .replace(EMPTY_IF_NO_ELSE, '')
            .replace(EMPTY_IF_WITH_ELSE, 'if (!($1))');
}


var ERRORS_REGEXP = /[^v\.]errors/g
  , REMOVE_ERRORS = /var errors = 0;|var vErrors = null;|validate.errors = vErrors;/g
  , REMOVE_ERRORS_ASYNC = /var errors = 0;|var vErrors = null;/g
  , RETURN_VALID = 'return errors === 0;'
  , RETURN_TRUE = 'validate.errors = null; return true;'
  , RETURN_ASYNC = /if \(errors === 0\) return true;\s*else throw new ValidationError\(vErrors\);/
  , RETURN_TRUE_ASYNC = 'return true;';

function cleanUpVarErrors(out, async) {
  var matches = out.match(ERRORS_REGEXP);
  if (!matches || matches.length !== 2) return out;
  return async
          ? out.replace(REMOVE_ERRORS_ASYNC, '')
               .replace(RETURN_ASYNC, RETURN_TRUE_ASYNC)
          : out.replace(REMOVE_ERRORS, '')
               .replace(RETURN_VALID, RETURN_TRUE);
}


function schemaHasRules(schema, rules) {
  for (var key in schema) if (rules[key]) return true;
}


function schemaHasRulesExcept(schema, rules, exceptKeyword) {
  for (var key in schema) if (key != exceptKeyword && rules[key]) return true;
}


function toQuotedString(str) {
  return '\'' + escapeQuotes(str) + '\'';
}


function getPathExpr(currentPath, expr, jsonPointers, isNumber) {
  var path = jsonPointers // false by default
              ? '\'/\' + ' + expr + (isNumber ? '' : '.replace(/~/g, \'~0\').replace(/\\//g, \'~1\')')
              : (isNumber ? '\'[\' + ' + expr + ' + \']\'' : '\'[\\\'\' + ' + expr + ' + \'\\\']\'');
  return joinPaths(currentPath, path);
}


function getPath(currentPath, prop, jsonPointers) {
  var path = jsonPointers // false by default
              ? toQuotedString('/' + escapeJsonPointer(prop))
              : toQuotedString(getProperty(prop));
  return joinPaths(currentPath, path);
}


var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, lvl, paths) {
  var up, jsonPointer, data, matches;
  if ($data === '') return 'rootData';
  if ($data[0] == '/') {
    if (!JSON_POINTER.test($data)) throw new Error('Invalid JSON-pointer: ' + $data);
    jsonPointer = $data;
    data = 'rootData';
  } else {
    matches = $data.match(RELATIVE_JSON_POINTER);
    if (!matches) throw new Error('Invalid JSON-pointer: ' + $data);
    up = +matches[1];
    jsonPointer = matches[2];
    if (jsonPointer == '#') {
      if (up >= lvl) throw new Error('Cannot access property/index ' + up + ' levels up, current level is ' + lvl);
      return paths[lvl - up];
    }

    if (up > lvl) throw new Error('Cannot access data ' + up + ' levels up, current level is ' + lvl);
    data = 'data' + ((lvl - up) || '');
    if (!jsonPointer) return data;
  }

  var expr = data;
  var segments = jsonPointer.split('/');
  for (var i=0; i<segments.length; i++) {
    var segment = segments[i];
    if (segment) {
      data += getProperty(unescapeJsonPointer(segment));
      expr += ' && ' + data;
    }
  }
  return expr;
}


function joinPaths (a, b) {
  if (a == '""') return b;
  return (a + ' + ' + b).replace(/' \+ '/g, '');
}


function unescapeFragment(str) {
  return unescapeJsonPointer(decodeURIComponent(str));
}


function escapeFragment(str) {
  return encodeURIComponent(escapeJsonPointer(str));
}


function escapeJsonPointer(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}


function unescapeJsonPointer(str) {
  return str.replace(/~1/g, '/').replace(/~0/g, '~');
}

}, function(modId) { var map = {"./ucs2length":1536577187447}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187447, function(require, module, exports) {
'use strict';

// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
module.exports = function ucs2length(str) {
  var length = 0
    , len = str.length
    , pos = 0
    , value;
  while (pos < len) {
    length++;
    value = str.charCodeAt(pos++);
    if (value >= 0xD800 && value <= 0xDBFF && pos < len) {
      // high surrogate, and there is a next character
      value = str.charCodeAt(pos);
      if ((value & 0xFC00) == 0xDC00) pos++; // low surrogate
    }
  }
  return length;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187448, function(require, module, exports) {
'use strict';

var util = require('./util');

module.exports = SchemaObject;

function SchemaObject(obj) {
  util.copy(obj, this);
}

}, function(modId) { var map = {"./util":1536577187446}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187449, function(require, module, exports) {
'use strict';

module.exports = {
  setup: setupAsync,
  compile: compileAsync
};


var util = require('./compile/util');

var ASYNC = {
  '*': checkGenerators,
  'co*': checkGenerators,
  'es7': checkAsyncFunction
};

var TRANSPILE = {
  'nodent': getNodent,
  'regenerator': getRegenerator
};

var MODES = [
  { async: 'co*' },
  { async: 'es7', transpile: 'nodent' },
  { async: 'co*', transpile: 'regenerator' }
];


var regenerator, nodent;


function setupAsync(opts, required) {
  if (required !== false) required = true;
  var async = opts.async
    , transpile = opts.transpile
    , check;

  switch (typeof transpile) {
    case 'string':
      var get = TRANSPILE[transpile];
      if (!get) throw new Error('bad transpiler: ' + transpile);
      return (opts._transpileFunc = get(opts, required));
    case 'undefined':
    case 'boolean':
      if (typeof async == 'string') {
        check = ASYNC[async];
        if (!check) throw new Error('bad async mode: ' + async);
        return (opts.transpile = check(opts, required));
      }

      for (var i=0; i<MODES.length; i++) {
        var _opts = MODES[i];
        if (setupAsync(_opts, false)) {
          util.copy(_opts, opts);
          return opts.transpile;
        }
      }
      /* istanbul ignore next */
      throw new Error('generators, nodent and regenerator are not available');
    case 'function':
      return (opts._transpileFunc = opts.transpile);
    default:
      throw new Error('bad transpiler: ' + transpile);
  }
}


function checkGenerators(opts, required) {
  /* jshint evil: true */
  try {
    (new Function('(function*(){})()'))();
    return true;
  } catch(e) {
    /* istanbul ignore next */
    if (required) throw new Error('generators not supported');
  }
}


function checkAsyncFunction(opts, required) {
  /* jshint evil: true */
  try {
    (new Function('(async function(){})()'))();
    /* istanbul ignore next */
    return true;
  } catch(e) {
    if (required) throw new Error('es7 async functions not supported');
  }
}


function getRegenerator(opts, required) {
  try {
    if (!regenerator) {
      var name = 'regenerator';
      regenerator = require(name);
      regenerator.runtime();
    }
    if (!opts.async || opts.async === true)
      opts.async = 'es7';
    return regeneratorTranspile;
  } catch(e) {
    /* istanbul ignore next */
    if (required) throw new Error('regenerator not available');
  }
}


function regeneratorTranspile(code) {
  return regenerator.compile(code).code;
}


function getNodent(opts, required) {
  /* jshint evil: true */
  try {
    if (!nodent) {
      var name = 'nodent';
      nodent = require(name)({ log: false, dontInstallRequireHook: true });
    }
    if (opts.async != 'es7') {
      if (opts.async && opts.async !== true) console.warn('nodent transpiles only es7 async functions');
      opts.async = 'es7';
    }
    return nodentTranspile;
  } catch(e) {
    /* istanbul ignore next */
    if (required) throw new Error('nodent not available');
  }
}


function nodentTranspile(code) {
  return nodent.compile(code, '', { promises: true, sourcemap: false }).code;
}


/**
 * Creates validating function for passed schema with asynchronous loading of missing schemas.
 * `loadSchema` option should be a function that accepts schema uri and node-style callback.
 * @this  Ajv
 * @param {Object}   schema schema object
 * @param {Function} callback node-style callback, it is always called with 2 parameters: error (or null) and validating function.
 */
function compileAsync(schema, callback) {
  /* eslint no-shadow: 0 */
  /* jshint validthis: true */
  var schemaObj;
  var self = this;
  try {
    schemaObj = this._addSchema(schema);
  } catch(e) {
    setTimeout(function() { callback(e); });
    return;
  }
  if (schemaObj.validate) {
    setTimeout(function() { callback(null, schemaObj.validate); });
  } else {
    if (typeof this._opts.loadSchema != 'function')
      throw new Error('options.loadSchema should be a function');
    _compileAsync(schema, callback, true);
  }


  function _compileAsync(schema, callback, firstCall) {
    var validate;
    try { validate = self.compile(schema); }
    catch(e) {
      if (e.missingSchema) loadMissingSchema(e);
      else deferCallback(e);
      return;
    }
    deferCallback(null, validate);

    function loadMissingSchema(e) {
      var ref = e.missingSchema;
      if (self._refs[ref] || self._schemas[ref])
        return callback(new Error('Schema ' + ref + ' is loaded but ' + e.missingRef + ' cannot be resolved'));
      var _callbacks = self._loadingSchemas[ref];
      if (_callbacks) {
        if (typeof _callbacks == 'function')
          self._loadingSchemas[ref] = [_callbacks, schemaLoaded];
        else
          _callbacks[_callbacks.length] = schemaLoaded;
      } else {
        self._loadingSchemas[ref] = schemaLoaded;
        self._opts.loadSchema(ref, function (err, sch) {
          var _callbacks = self._loadingSchemas[ref];
          delete self._loadingSchemas[ref];
          if (typeof _callbacks == 'function') {
            _callbacks(err, sch);
          } else {
            for (var i=0; i<_callbacks.length; i++)
              _callbacks[i](err, sch);
          }
        });
      }

      function schemaLoaded(err, sch) {
        if (err) return callback(err);
        if (!(self._refs[ref] || self._schemas[ref])) {
          try {
            self.addSchema(sch, ref);
          } catch(e) {
            callback(e);
            return;
          }
        }
        _compileAsync(schema, callback);
      }
    }

    function deferCallback(err, validate) {
      if (firstCall) setTimeout(function() { callback(err, validate); });
      else return callback(err, validate);
    }
  }
}

}, function(modId) { var map = {"./compile/util":1536577187446}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187450, function(require, module, exports) {
'use strict';
module.exports = function generate_validate(it, $keyword) {
  var out = '';
  var $async = it.schema.$async === true;
  if (it.isTop) {
    var $top = it.isTop,
      $lvl = it.level = 0,
      $dataLvl = it.dataLevel = 0,
      $data = 'data';
    it.rootId = it.resolve.fullPath(it.root.schema.id);
    it.baseId = it.baseId || it.rootId;
    if ($async) {
      it.async = true;
      var $es7 = it.opts.async == 'es7';
      it.yieldAwait = $es7 ? 'await' : 'yield';
    }
    delete it.isTop;
    it.dataPathArr = [undefined];
    out += ' var validate = ';
    if ($async) {
      if ($es7) {
        out += ' (async function ';
      } else {
        if (it.opts.async == 'co*') {
          out += 'co.wrap';
        }
        out += '(function* ';
      }
    } else {
      out += ' (function ';
    }
    out += ' (data, dataPath, parentData, parentDataProperty, rootData) { \'use strict\'; var vErrors = null; ';
    out += ' var errors = 0;     ';
    out += ' if (rootData === undefined) rootData = data;';
  } else {
    var $lvl = it.level,
      $dataLvl = it.dataLevel,
      $data = 'data' + ($dataLvl || '');
    if (it.schema.id) it.baseId = it.resolve.url(it.baseId, it.schema.id);
    if ($async && !it.async) throw new Error('async schema in sync schema');
    out += ' var errs_' + ($lvl) + ' = errors;';
  }
  var $valid = 'valid' + $lvl,
    $breakOnError = !it.opts.allErrors,
    $closingBraces1 = '',
    $closingBraces2 = '';
  var $typeSchema = it.schema.type,
    $typeIsArray = Array.isArray($typeSchema);
  if ($typeSchema && it.opts.coerceTypes) {
    var $coerceToTypes = it.util.coerceToTypes(it.opts.coerceTypes, $typeSchema);
    if ($coerceToTypes) {
      var $schemaPath = it.schemaPath + '.type',
        $errSchemaPath = it.errSchemaPath + '/type',
        $method = $typeIsArray ? 'checkDataTypes' : 'checkDataType';
      out += ' if (' + (it.util[$method]($typeSchema, $data, true)) + ') {  ';
      var $dataType = 'dataType' + $lvl,
        $coerced = 'coerced' + $lvl;
      out += ' var ' + ($dataType) + ' = typeof ' + ($data) + '; ';
      if (it.opts.coerceTypes == 'array') {
        out += ' if (' + ($dataType) + ' == \'object\' && Array.isArray(' + ($data) + ')) ' + ($dataType) + ' = \'array\'; ';
      }
      out += ' var ' + ($coerced) + ' = undefined; ';
      var $bracesCoercion = '';
      var arr1 = $coerceToTypes;
      if (arr1) {
        var $type, $i = -1,
          l1 = arr1.length - 1;
        while ($i < l1) {
          $type = arr1[$i += 1];
          if ($i) {
            out += ' if (' + ($coerced) + ' === undefined) { ';
            $bracesCoercion += '}';
          }
          if (it.opts.coerceTypes == 'array' && $type != 'array') {
            out += ' if (' + ($dataType) + ' == \'array\' && ' + ($data) + '.length == 1) { ' + ($coerced) + ' = ' + ($data) + ' = ' + ($data) + '[0]; ' + ($dataType) + ' = typeof ' + ($data) + ';  } ';
          }
          if ($type == 'string') {
            out += ' if (' + ($dataType) + ' == \'number\' || ' + ($dataType) + ' == \'boolean\') ' + ($coerced) + ' = \'\' + ' + ($data) + '; else if (' + ($data) + ' === null) ' + ($coerced) + ' = \'\'; ';
          } else if ($type == 'number' || $type == 'integer') {
            out += ' if (' + ($dataType) + ' == \'boolean\' || ' + ($data) + ' === null || (' + ($dataType) + ' == \'string\' && ' + ($data) + ' && ' + ($data) + ' == +' + ($data) + ' ';
            if ($type == 'integer') {
              out += ' && !(' + ($data) + ' % 1)';
            }
            out += ')) ' + ($coerced) + ' = +' + ($data) + '; ';
          } else if ($type == 'boolean') {
            out += ' if (' + ($data) + ' === \'false\' || ' + ($data) + ' === 0 || ' + ($data) + ' === null) ' + ($coerced) + ' = false; else if (' + ($data) + ' === \'true\' || ' + ($data) + ' === 1) ' + ($coerced) + ' = true; ';
          } else if ($type == 'null') {
            out += ' if (' + ($data) + ' === \'\' || ' + ($data) + ' === 0 || ' + ($data) + ' === false) ' + ($coerced) + ' = null; ';
          } else if (it.opts.coerceTypes == 'array' && $type == 'array') {
            out += ' if (' + ($dataType) + ' == \'string\' || ' + ($dataType) + ' == \'number\' || ' + ($dataType) + ' == \'boolean\' || ' + ($data) + ' == null) ' + ($coerced) + ' = [' + ($data) + ']; ';
          }
        }
      }
      out += ' ' + ($bracesCoercion) + ' if (' + ($coerced) + ' === undefined) {   ';
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
        if ($typeIsArray) {
          out += '' + ($typeSchema.join(","));
        } else {
          out += '' + ($typeSchema);
        }
        out += '\' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should be ';
          if ($typeIsArray) {
            out += '' + ($typeSchema.join(","));
          } else {
            out += '' + ($typeSchema);
          }
          out += '\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' } else {  ';
      var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
        $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
      out += ' ' + ($data) + ' = ' + ($coerced) + '; ';
      if (!$dataLvl) {
        out += 'if (' + ($parentData) + ' !== undefined)';
      }
      out += ' ' + ($parentData) + '[' + ($parentDataProperty) + '] = ' + ($coerced) + '; } } ';
    }
  }
  var $refKeywords;
  if (it.schema.$ref && ($refKeywords = it.util.schemaHasRulesExcept(it.schema, it.RULES.all, '$ref'))) {
    if (it.opts.extendRefs == 'fail') {
      throw new Error('$ref: validation keywords used in schema at path "' + it.errSchemaPath + '"');
    } else if (it.opts.extendRefs == 'ignore') {
      $refKeywords = false;
      console.log('$ref: keywords ignored in schema at path "' + it.errSchemaPath + '"');
    } else if (it.opts.extendRefs !== true) {
      console.log('$ref: all keywords used in schema at path "' + it.errSchemaPath + '". It will change in the next major version, see issue #260. Use option { extendRefs: true } to keep current behaviour');
    }
  }
  if (it.schema.$ref && !$refKeywords) {
    out += ' ' + (it.RULES.all.$ref.code(it, '$ref')) + ' ';
    if ($breakOnError) {
      out += ' } if (errors === ';
      if ($top) {
        out += '0';
      } else {
        out += 'errs_' + ($lvl);
      }
      out += ') { ';
      $closingBraces2 += '}';
    }
  } else {
    var arr2 = it.RULES;
    if (arr2) {
      var $rulesGroup, i2 = -1,
        l2 = arr2.length - 1;
      while (i2 < l2) {
        $rulesGroup = arr2[i2 += 1];
        if ($shouldUseGroup($rulesGroup)) {
          if ($rulesGroup.type) {
            out += ' if (' + (it.util.checkDataType($rulesGroup.type, $data)) + ') { ';
          }
          if (it.opts.useDefaults && !it.compositeRule) {
            if ($rulesGroup.type == 'object' && it.schema.properties) {
              var $schema = it.schema.properties,
                $schemaKeys = Object.keys($schema);
              var arr3 = $schemaKeys;
              if (arr3) {
                var $propertyKey, i3 = -1,
                  l3 = arr3.length - 1;
                while (i3 < l3) {
                  $propertyKey = arr3[i3 += 1];
                  var $sch = $schema[$propertyKey];
                  if ($sch.default !== undefined) {
                    var $passData = $data + it.util.getProperty($propertyKey);
                    out += '  if (' + ($passData) + ' === undefined) ' + ($passData) + ' = ';
                    if (it.opts.useDefaults == 'shared') {
                      out += ' ' + (it.useDefault($sch.default)) + ' ';
                    } else {
                      out += ' ' + (JSON.stringify($sch.default)) + ' ';
                    }
                    out += '; ';
                  }
                }
              }
            } else if ($rulesGroup.type == 'array' && Array.isArray(it.schema.items)) {
              var arr4 = it.schema.items;
              if (arr4) {
                var $sch, $i = -1,
                  l4 = arr4.length - 1;
                while ($i < l4) {
                  $sch = arr4[$i += 1];
                  if ($sch.default !== undefined) {
                    var $passData = $data + '[' + $i + ']';
                    out += '  if (' + ($passData) + ' === undefined) ' + ($passData) + ' = ';
                    if (it.opts.useDefaults == 'shared') {
                      out += ' ' + (it.useDefault($sch.default)) + ' ';
                    } else {
                      out += ' ' + (JSON.stringify($sch.default)) + ' ';
                    }
                    out += '; ';
                  }
                }
              }
            }
          }
          var arr5 = $rulesGroup.rules;
          if (arr5) {
            var $rule, i5 = -1,
              l5 = arr5.length - 1;
            while (i5 < l5) {
              $rule = arr5[i5 += 1];
              if ($shouldUseRule($rule)) {
                out += ' ' + ($rule.code(it, $rule.keyword)) + ' ';
                if ($breakOnError) {
                  $closingBraces1 += '}';
                }
              }
            }
          }
          if ($breakOnError) {
            out += ' ' + ($closingBraces1) + ' ';
            $closingBraces1 = '';
          }
          if ($rulesGroup.type) {
            out += ' } ';
            if ($typeSchema && $typeSchema === $rulesGroup.type && !$coerceToTypes) {
              var $typeChecked = true;
              out += ' else { ';
              var $schemaPath = it.schemaPath + '.type',
                $errSchemaPath = it.errSchemaPath + '/type';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ('type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
                if ($typeIsArray) {
                  out += '' + ($typeSchema.join(","));
                } else {
                  out += '' + ($typeSchema);
                }
                out += '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'should be ';
                  if ($typeIsArray) {
                    out += '' + ($typeSchema.join(","));
                  } else {
                    out += '' + ($typeSchema);
                  }
                  out += '\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + (__err) + ']); ';
                } else {
                  out += ' validate.errors = [' + (__err) + ']; return false; ';
                }
              } else {
                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              out += ' } ';
            }
          }
          if ($breakOnError) {
            out += ' if (errors === ';
            if ($top) {
              out += '0';
            } else {
              out += 'errs_' + ($lvl);
            }
            out += ') { ';
            $closingBraces2 += '}';
          }
        }
      }
    }
  }
  if ($typeSchema && !$typeChecked && !$coerceToTypes) {
    var $schemaPath = it.schemaPath + '.type',
      $errSchemaPath = it.errSchemaPath + '/type',
      $method = $typeIsArray ? 'checkDataTypes' : 'checkDataType';
    out += ' if (' + (it.util[$method]($typeSchema, $data, true)) + ') {   ';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
      if ($typeIsArray) {
        out += '' + ($typeSchema.join(","));
      } else {
        out += '' + ($typeSchema);
      }
      out += '\' } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should be ';
        if ($typeIsArray) {
          out += '' + ($typeSchema.join(","));
        } else {
          out += '' + ($typeSchema);
        }
        out += '\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' }';
  }
  if ($breakOnError) {
    out += ' ' + ($closingBraces2) + ' ';
  }
  if ($top) {
    if ($async) {
      out += ' if (errors === 0) return true;           ';
      out += ' else throw new ValidationError(vErrors); ';
    } else {
      out += ' validate.errors = vErrors; ';
      out += ' return errors === 0;       ';
    }
    out += ' }); return validate;';
  } else {
    out += ' var ' + ($valid) + ' = errors === errs_' + ($lvl) + ';';
  }
  out = it.util.cleanUpCode(out);
  if ($top && $breakOnError) {
    out = it.util.cleanUpVarErrors(out, $async);
  }

  function $shouldUseGroup($rulesGroup) {
    for (var i = 0; i < $rulesGroup.rules.length; i++)
      if ($shouldUseRule($rulesGroup.rules[i])) return true;
  }

  function $shouldUseRule($rule) {
    return it.schema[$rule.keyword] !== undefined || ($rule.keyword == 'properties' && (it.schema.additionalProperties === false || typeof it.schema.additionalProperties == 'object' || (it.schema.patternProperties && Object.keys(it.schema.patternProperties).length) || (it.opts.v5 && it.schema.patternGroups && Object.keys(it.schema.patternGroups).length)));
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187451, function(require, module, exports) {
'use strict';

module.exports = ValidationError;


function ValidationError(errors) {
  this.message = 'validation failed';
  this.errors = errors;
  this.ajv = this.validation = true;
}


ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187452, function(require, module, exports) {
'use strict';


var Cache = module.exports = function Cache() {
  this._cache = {};
};


Cache.prototype.put = function Cache_put(key, value) {
  this._cache[key] = value;
};


Cache.prototype.get = function Cache_get(key) {
  return this._cache[key];
};


Cache.prototype.del = function Cache_del(key) {
  delete this._cache[key];
};


Cache.prototype.clear = function Cache_clear() {
  this._cache = {};
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187453, function(require, module, exports) {
'use strict';

var util = require('./util');

var DATE = /^\d\d\d\d-(\d\d)-(\d\d)$/;
var DAYS = [0,31,29,31,30,31,30,31,31,30,31,30,31];
var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i;
var HOSTNAME = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*)?(?:\#(?:[a-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*)?$/i;
var UUID = /^(?:urn\:uuid\:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
var JSON_POINTER = /^(?:\/(?:[^~\/]|~0|~1)*)*$|^\#(?:\/(?:[a-z0-9_\-\.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:\#|(?:\/(?:[^~\/]|~0|~1)*)*)$/;


module.exports = formats;

function formats(mode) {
  mode = mode == 'full' ? 'full' : 'fast';
  var formatDefs = util.copy(formats[mode]);
  for (var fName in formats.compare) {
    formatDefs[fName] = {
      validate: formatDefs[fName],
      compare: formats.compare[fName]
    };
  }
  return formatDefs;
}


formats.fast = {
  // date: http://tools.ietf.org/html/rfc3339#section-5.6
  date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
  time: /^[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
  'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i,
  // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  uri: /^(?:[a-z][a-z0-9+-.]*)?(?:\:|\/)\/?[^\s]*$/i,
  // email (sources from jsen validator):
  // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
  // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
  email: /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
  hostname: HOSTNAME,
  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
  regex: regex,
  // uuid: http://tools.ietf.org/html/rfc4122
  uuid: UUID,
  // JSON-pointer: https://tools.ietf.org/html/rfc6901
  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
  'json-pointer': JSON_POINTER,
  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
  'relative-json-pointer': RELATIVE_JSON_POINTER
};


formats.full = {
  date: date,
  time: time,
  'date-time': date_time,
  uri: uri,
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: hostname,
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
  regex: regex,
  uuid: UUID,
  'json-pointer': JSON_POINTER,
  'relative-json-pointer': RELATIVE_JSON_POINTER
};


formats.compare = {
  date: compareDate,
  time: compareTime,
  'date-time': compareDateTime
};


function date(str) {
  // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
  var matches = str.match(DATE);
  if (!matches) return false;

  var month = +matches[1];
  var day = +matches[2];
  return month >= 1 && month <= 12 && day >= 1 && day <= DAYS[month];
}


function time(str, full) {
  var matches = str.match(TIME);
  if (!matches) return false;

  var hour = matches[1];
  var minute = matches[2];
  var second = matches[3];
  var timeZone = matches[5];
  return hour <= 23 && minute <= 59 && second <= 59 && (!full || timeZone);
}


var DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
  // http://tools.ietf.org/html/rfc3339#section-5.6
  var dateTime = str.split(DATE_TIME_SEPARATOR);
  return dateTime.length == 2 && date(dateTime[0]) && time(dateTime[1], true);
}


function hostname(str) {
  // https://tools.ietf.org/html/rfc1034#section-3.5
  // https://tools.ietf.org/html/rfc1123#section-2
  return str.length <= 255 && HOSTNAME.test(str);
}


var NOT_URI_FRAGMENT = /\/|\:/;
function uri(str) {
  // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}


function regex(str) {
  try {
    new RegExp(str);
    return true;
  } catch(e) {
    return false;
  }
}


function compareDate(d1, d2) {
  if (!(d1 && d2)) return;
  if (d1 > d2) return 1;
  if (d1 < d2) return -1;
  if (d1 === d2) return 0;
}


function compareTime(t1, t2) {
  if (!(t1 && t2)) return;
  t1 = t1.match(TIME);
  t2 = t2.match(TIME);
  if (!(t1 && t2)) return;
  t1 = t1[1] + t1[2] + t1[3] + (t1[4]||'');
  t2 = t2[1] + t2[2] + t2[3] + (t2[4]||'');
  if (t1 > t2) return 1;
  if (t1 < t2) return -1;
  if (t1 === t2) return 0;
}


function compareDateTime(dt1, dt2) {
  if (!(dt1 && dt2)) return;
  dt1 = dt1.split(DATE_TIME_SEPARATOR);
  dt2 = dt2.split(DATE_TIME_SEPARATOR);
  var res = compareDate(dt1[0], dt2[0]);
  if (res === undefined) return;
  return res || compareTime(dt1[1], dt2[1]);
}

}, function(modId) { var map = {"./util":1536577187446}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187454, function(require, module, exports) {
'use strict';

var ruleModules = require('./_rules')
  , toHash = require('./util').toHash;

module.exports = function rules() {
  var RULES = [
    { type: 'number',
      rules: [ 'maximum', 'minimum', 'multipleOf'] },
    { type: 'string',
      rules: [ 'maxLength', 'minLength', 'pattern', 'format' ] },
    { type: 'array',
      rules: [ 'maxItems', 'minItems', 'uniqueItems', 'items' ] },
    { type: 'object',
      rules: [ 'maxProperties', 'minProperties', 'required', 'dependencies', 'properties' ] },
    { rules: [ '$ref', 'enum', 'not', 'anyOf', 'oneOf', 'allOf' ] }
  ];

  var ALL = [ 'type', 'additionalProperties', 'patternProperties' ];
  var KEYWORDS = [ 'additionalItems', '$schema', 'id', 'title', 'description', 'default' ];
  var TYPES = [ 'number', 'integer', 'string', 'array', 'object', 'boolean', 'null' ];
  RULES.all = toHash(ALL);

  RULES.forEach(function (group) {
    group.rules = group.rules.map(function (keyword) {
      ALL.push(keyword);
      var rule = RULES.all[keyword] = {
        keyword: keyword,
        code: ruleModules[keyword]
      };
      return rule;
    });
  });

  RULES.keywords = toHash(ALL.concat(KEYWORDS));
  RULES.types = toHash(TYPES);
  RULES.custom = {};

  return RULES;
};

}, function(modId) { var map = {"./_rules":1536577187455,"./util":1536577187446}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187455, function(require, module, exports) {
'use strict';

//all requires must be explicit because browserify won't work with dynamic requires
module.exports = {
  '$ref': require('../dotjs/ref'),
  allOf: require('../dotjs/allOf'),
  anyOf: require('../dotjs/anyOf'),
  dependencies: require('../dotjs/dependencies'),
  'enum': require('../dotjs/enum'),
  format: require('../dotjs/format'),
  items: require('../dotjs/items'),
  maximum: require('../dotjs/_limit'),
  minimum: require('../dotjs/_limit'),
  maxItems: require('../dotjs/_limitItems'),
  minItems: require('../dotjs/_limitItems'),
  maxLength: require('../dotjs/_limitLength'),
  minLength: require('../dotjs/_limitLength'),
  maxProperties: require('../dotjs/_limitProperties'),
  minProperties: require('../dotjs/_limitProperties'),
  multipleOf: require('../dotjs/multipleOf'),
  not: require('../dotjs/not'),
  oneOf: require('../dotjs/oneOf'),
  pattern: require('../dotjs/pattern'),
  properties: require('../dotjs/properties'),
  required: require('../dotjs/required'),
  uniqueItems: require('../dotjs/uniqueItems'),
  validate: require('../dotjs/validate')
};

}, function(modId) { var map = {"../dotjs/ref":1536577187456,"../dotjs/allOf":1536577187457,"../dotjs/anyOf":1536577187458,"../dotjs/dependencies":1536577187459,"../dotjs/enum":1536577187460,"../dotjs/format":1536577187461,"../dotjs/items":1536577187462,"../dotjs/_limit":1536577187463,"../dotjs/_limitItems":1536577187464,"../dotjs/_limitLength":1536577187465,"../dotjs/_limitProperties":1536577187466,"../dotjs/multipleOf":1536577187467,"../dotjs/not":1536577187468,"../dotjs/oneOf":1536577187469,"../dotjs/pattern":1536577187470,"../dotjs/properties":1536577187471,"../dotjs/required":1536577187472,"../dotjs/uniqueItems":1536577187473,"../dotjs/validate":1536577187450}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187456, function(require, module, exports) {
'use strict';
module.exports = function generate_ref(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $async, $refCode;
  if ($schema == '#' || $schema == '#/') {
    if (it.isRoot) {
      $async = it.async;
      $refCode = 'validate';
    } else {
      $async = it.root.schema.$async === true;
      $refCode = 'root.refVal[0]';
    }
  } else {
    var $refVal = it.resolveRef(it.baseId, $schema, it.isRoot);
    if ($refVal === undefined) {
      var $message = 'can\'t resolve reference ' + $schema + ' from id ' + it.baseId;
      if (it.opts.missingRefs == 'fail') {
        console.log($message);
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('$ref') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { ref: \'' + (it.util.escapeQuotes($schema)) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'can\\\'t resolve reference ' + (it.util.escapeQuotes($schema)) + '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: ' + (it.util.toQuotedString($schema)) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        if ($breakOnError) {
          out += ' if (false) { ';
        }
      } else if (it.opts.missingRefs == 'ignore') {
        console.log($message);
        if ($breakOnError) {
          out += ' if (true) { ';
        }
      } else {
        var $error = new Error($message);
        $error.missingRef = it.resolve.url(it.baseId, $schema);
        $error.missingSchema = it.resolve.normalizeId(it.resolve.fullPath($error.missingRef));
        throw $error;
      }
    } else if ($refVal.inline) {
      var $it = it.util.copy(it);
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      $it.schema = $refVal.schema;
      $it.schemaPath = '';
      $it.errSchemaPath = $schema;
      var $code = it.validate($it).replace(/validate\.schema/g, $refVal.code);
      out += ' ' + ($code) + ' ';
      if ($breakOnError) {
        out += ' if (' + ($nextValid) + ') { ';
      }
    } else {
      $async = $refVal.$async === true;
      $refCode = $refVal.code;
    }
  }
  if ($refCode) {
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    if (it.opts.passContext) {
      out += ' ' + ($refCode) + '.call(this, ';
    } else {
      out += ' ' + ($refCode) + '( ';
    }
    out += ' ' + ($data) + ', (dataPath || \'\')';
    if (it.errorPath != '""') {
      out += ' + ' + (it.errorPath);
    }
    var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
      $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
    out += ' , ' + ($parentData) + ' , ' + ($parentDataProperty) + ', rootData)  ';
    var __callValidate = out;
    out = $$outStack.pop();
    if ($async) {
      if (!it.async) throw new Error('async schema referenced by sync schema');
      out += ' try { ';
      if ($breakOnError) {
        out += 'var ' + ($valid) + ' =';
      }
      out += ' ' + (it.yieldAwait) + ' ' + (__callValidate) + '; } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; } ';
      if ($breakOnError) {
        out += ' if (' + ($valid) + ') { ';
      }
    } else {
      out += ' if (!' + (__callValidate) + ') { if (vErrors === null) vErrors = ' + ($refCode) + '.errors; else vErrors = vErrors.concat(' + ($refCode) + '.errors); errors = vErrors.length; } ';
      if ($breakOnError) {
        out += ' else { ';
      }
    }
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187457, function(require, module, exports) {
'use strict';
module.exports = function generate_allOf(it, $keyword) {
  var out = ' ';
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $currentBaseId = $it.baseId,
    $allSchemasEmpty = true;
  var arr1 = $schema;
  if (arr1) {
    var $sch, $i = -1,
      l1 = arr1.length - 1;
    while ($i < l1) {
      $sch = arr1[$i += 1];
      if (it.util.schemaHasRules($sch, it.RULES.all)) {
        $allSchemasEmpty = false;
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + (it.validate($it)) + ' ';
        $it.baseId = $currentBaseId;
        if ($breakOnError) {
          out += ' if (' + ($nextValid) + ') { ';
          $closingBraces += '}';
        }
      }
    }
  }
  if ($breakOnError) {
    if ($allSchemasEmpty) {
      out += ' if (true) { ';
    } else {
      out += ' ' + ($closingBraces.slice(0, -1)) + ' ';
    }
  }
  out = it.util.cleanUpCode(out);
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187458, function(require, module, exports) {
'use strict';
module.exports = function generate_anyOf(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $noEmptySchema = $schema.every(function($sch) {
    return it.util.schemaHasRules($sch, it.RULES.all);
  });
  if ($noEmptySchema) {
    var $currentBaseId = $it.baseId;
    out += ' var ' + ($errs) + ' = errors; var ' + ($valid) + ' = false;  ';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var arr1 = $schema;
    if (arr1) {
      var $sch, $i = -1,
        l1 = arr1.length - 1;
      while ($i < l1) {
        $sch = arr1[$i += 1];
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + (it.validate($it)) + ' ';
        $it.baseId = $currentBaseId;
        out += ' ' + ($valid) + ' = ' + ($valid) + ' || ' + ($nextValid) + '; if (!' + ($valid) + ') { ';
        $closingBraces += '}';
      }
    }
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' ' + ($closingBraces) + ' if (!' + ($valid) + ') {  var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('anyOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should match some schema in anyOf\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
    if (it.opts.allErrors) {
      out += ' } ';
    }
    out = it.util.cleanUpCode(out);
  } else {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187459, function(require, module, exports) {
'use strict';
module.exports = function generate_dependencies(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $schemaDeps = {},
    $propertyDeps = {};
  for ($property in $schema) {
    var $sch = $schema[$property];
    var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
    $deps[$property] = $sch;
  }
  out += 'var ' + ($errs) + ' = errors;';
  var $currentErrorPath = it.errorPath;
  out += 'var missing' + ($lvl) + ';';
  for (var $property in $propertyDeps) {
    $deps = $propertyDeps[$property];
    out += ' if (' + ($data) + (it.util.getProperty($property)) + ' !== undefined ';
    if ($breakOnError) {
      out += ' && ( ';
      var arr1 = $deps;
      if (arr1) {
        var _$property, $i = -1,
          l1 = arr1.length - 1;
        while ($i < l1) {
          _$property = arr1[$i += 1];
          if ($i) {
            out += ' || ';
          }
          var $prop = it.util.getProperty(_$property);
          out += ' ( ' + ($data) + ($prop) + ' === undefined && (missing' + ($lvl) + ' = ' + (it.util.toQuotedString(it.opts.jsonPointers ? _$property : $prop)) + ') ) ';
        }
      }
      out += ')) {  ';
      var $propertyPath = 'missing' + $lvl,
        $missingProperty = '\' + ' + $propertyPath + ' + \'';
      if (it.opts._errorDataPathProperty) {
        it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
      }
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('dependencies') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { property: \'' + (it.util.escapeQuotes($property)) + '\', missingProperty: \'' + ($missingProperty) + '\', depsCount: ' + ($deps.length) + ', deps: \'' + (it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", "))) + '\' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should have ';
          if ($deps.length == 1) {
            out += 'property ' + (it.util.escapeQuotes($deps[0]));
          } else {
            out += 'properties ' + (it.util.escapeQuotes($deps.join(", ")));
          }
          out += ' when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
    } else {
      out += ' ) { ';
      var arr2 = $deps;
      if (arr2) {
        var $reqProperty, i2 = -1,
          l2 = arr2.length - 1;
        while (i2 < l2) {
          $reqProperty = arr2[i2 += 1];
          var $prop = it.util.getProperty($reqProperty),
            $missingProperty = it.util.escapeQuotes($reqProperty);
          if (it.opts._errorDataPathProperty) {
            it.errorPath = it.util.getPath($currentErrorPath, $reqProperty, it.opts.jsonPointers);
          }
          out += ' if (' + ($data) + ($prop) + ' === undefined) {  var err =   '; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + ('dependencies') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { property: \'' + (it.util.escapeQuotes($property)) + '\', missingProperty: \'' + ($missingProperty) + '\', depsCount: ' + ($deps.length) + ', deps: \'' + (it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", "))) + '\' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'should have ';
              if ($deps.length == 1) {
                out += 'property ' + (it.util.escapeQuotes($deps[0]));
              } else {
                out += 'properties ' + (it.util.escapeQuotes($deps.join(", ")));
              }
              out += ' when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
        }
      }
    }
    out += ' }   ';
    if ($breakOnError) {
      $closingBraces += '}';
      out += ' else { ';
    }
  }
  it.errorPath = $currentErrorPath;
  var $currentBaseId = $it.baseId;
  for (var $property in $schemaDeps) {
    var $sch = $schemaDeps[$property];
    if (it.util.schemaHasRules($sch, it.RULES.all)) {
      out += ' ' + ($nextValid) + ' = true; if (' + ($data) + (it.util.getProperty($property)) + ' !== undefined) { ';
      $it.schema = $sch;
      $it.schemaPath = $schemaPath + it.util.getProperty($property);
      $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($property);
      out += '  ' + (it.validate($it)) + ' ';
      $it.baseId = $currentBaseId;
      out += ' }  ';
      if ($breakOnError) {
        out += ' if (' + ($nextValid) + ') { ';
        $closingBraces += '}';
      }
    }
  }
  if ($breakOnError) {
    out += '   ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187460, function(require, module, exports) {
'use strict';
module.exports = function generate_enum(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $i = 'i' + $lvl,
    $vSchema = 'schema' + $lvl;
  if (!$isData) {
    out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + ';';
  }
  out += 'var ' + ($valid) + ';';
  if ($isData) {
    out += ' if (schema' + ($lvl) + ' === undefined) ' + ($valid) + ' = true; else if (!Array.isArray(schema' + ($lvl) + ')) ' + ($valid) + ' = false; else {';
  }
  out += '' + ($valid) + ' = false;for (var ' + ($i) + '=0; ' + ($i) + '<' + ($vSchema) + '.length; ' + ($i) + '++) if (equal(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + '])) { ' + ($valid) + ' = true; break; }';
  if ($isData) {
    out += '  }  ';
  }
  out += ' if (!' + ($valid) + ') {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('enum') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { allowedValues: schema' + ($lvl) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be equal to one of the allowed values\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' }';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187461, function(require, module, exports) {
'use strict';
module.exports = function generate_format(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  if (it.opts.format === false) {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
    return out;
  }
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $unknownFormats = it.opts.unknownFormats,
    $allowUnknown = Array.isArray($unknownFormats);
  if ($isData) {
    var $format = 'format' + $lvl;
    out += ' var ' + ($format) + ' = formats[' + ($schemaValue) + ']; var isObject' + ($lvl) + ' = typeof ' + ($format) + ' == \'object\' && !(' + ($format) + ' instanceof RegExp) && ' + ($format) + '.validate; if (isObject' + ($lvl) + ') { ';
    if (it.async) {
      out += ' var async' + ($lvl) + ' = ' + ($format) + '.async; ';
    }
    out += ' ' + ($format) + ' = ' + ($format) + '.validate; } if (  ';
    if ($isData) {
      out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'string\') || ';
    }
    out += ' (';
    if ($unknownFormats === true || $allowUnknown) {
      out += ' (' + ($schemaValue) + ' && !' + ($format) + ' ';
      if ($allowUnknown) {
        out += ' && self._opts.unknownFormats.indexOf(' + ($schemaValue) + ') == -1 ';
      }
      out += ') || ';
    }
    out += ' (' + ($format) + ' && !(typeof ' + ($format) + ' == \'function\' ? ';
    if (it.async) {
      out += ' (async' + ($lvl) + ' ? ' + (it.yieldAwait) + ' ' + ($format) + '(' + ($data) + ') : ' + ($format) + '(' + ($data) + ')) ';
    } else {
      out += ' ' + ($format) + '(' + ($data) + ') ';
    }
    out += ' : ' + ($format) + '.test(' + ($data) + '))))) {';
  } else {
    var $format = it.formats[$schema];
    if (!$format) {
      if ($unknownFormats === true || ($allowUnknown && $unknownFormats.indexOf($schema) == -1)) {
        throw new Error('unknown format "' + $schema + '" is used in schema at path "' + it.errSchemaPath + '"');
      } else {
        if (!$allowUnknown) {
          console.warn('unknown format "' + $schema + '" ignored in schema at path "' + it.errSchemaPath + '"');
          if ($unknownFormats !== 'ignore') console.warn('In the next major version it will throw exception. See option unknownFormats for more information');
        }
        if ($breakOnError) {
          out += ' if (true) { ';
        }
        return out;
      }
    }
    var $isObject = typeof $format == 'object' && !($format instanceof RegExp) && $format.validate;
    if ($isObject) {
      var $async = $format.async === true;
      $format = $format.validate;
    }
    if ($async) {
      if (!it.async) throw new Error('async format in sync schema');
      var $formatRef = 'formats' + it.util.getProperty($schema) + '.validate';
      out += ' if (!(' + (it.yieldAwait) + ' ' + ($formatRef) + '(' + ($data) + '))) { ';
    } else {
      out += ' if (! ';
      var $formatRef = 'formats' + it.util.getProperty($schema);
      if ($isObject) $formatRef += '.validate';
      if (typeof $format == 'function') {
        out += ' ' + ($formatRef) + '(' + ($data) + ') ';
      } else {
        out += ' ' + ($formatRef) + '.test(' + ($data) + ') ';
      }
      out += ') { ';
    }
  }
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('format') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { format:  ';
    if ($isData) {
      out += '' + ($schemaValue);
    } else {
      out += '' + (it.util.toQuotedString($schema));
    }
    out += '  } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match format "';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + (it.util.escapeQuotes($schema));
      }
      out += '"\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + (it.util.toQuotedString($schema));
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' } ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187462, function(require, module, exports) {
'use strict';
module.exports = function generate_items(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $idx = 'i' + $lvl,
    $dataNxt = $it.dataLevel = it.dataLevel + 1,
    $nextData = 'data' + $dataNxt,
    $currentBaseId = it.baseId;
  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
  if (Array.isArray($schema)) {
    var $additionalItems = it.schema.additionalItems;
    if ($additionalItems === false) {
      out += ' ' + ($valid) + ' = ' + ($data) + '.length <= ' + ($schema.length) + '; ';
      var $currErrSchemaPath = $errSchemaPath;
      $errSchemaPath = it.errSchemaPath + '/additionalItems';
      out += '  if (!' + ($valid) + ') {   ';
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('additionalItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schema.length) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should NOT have more than ' + ($schema.length) + ' items\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' } ';
      $errSchemaPath = $currErrSchemaPath;
      if ($breakOnError) {
        $closingBraces += '}';
        out += ' else { ';
      }
    }
    var arr1 = $schema;
    if (arr1) {
      var $sch, $i = -1,
        l1 = arr1.length - 1;
      while ($i < l1) {
        $sch = arr1[$i += 1];
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          out += ' ' + ($nextValid) + ' = true; if (' + ($data) + '.length > ' + ($i) + ') { ';
          var $passData = $data + '[' + $i + ']';
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + '[' + $i + ']';
          $it.errSchemaPath = $errSchemaPath + '/' + $i;
          $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
          $it.dataPathArr[$dataNxt] = $i;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          out += ' }  ';
          if ($breakOnError) {
            out += ' if (' + ($nextValid) + ') { ';
            $closingBraces += '}';
          }
        }
      }
    }
    if (typeof $additionalItems == 'object' && it.util.schemaHasRules($additionalItems, it.RULES.all)) {
      $it.schema = $additionalItems;
      $it.schemaPath = it.schemaPath + '.additionalItems';
      $it.errSchemaPath = it.errSchemaPath + '/additionalItems';
      out += ' ' + ($nextValid) + ' = true; if (' + ($data) + '.length > ' + ($schema.length) + ') {  for (var ' + ($idx) + ' = ' + ($schema.length) + '; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
      $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
      var $passData = $data + '[' + $idx + ']';
      $it.dataPathArr[$dataNxt] = $idx;
      var $code = it.validate($it);
      $it.baseId = $currentBaseId;
      if (it.util.varOccurences($code, $nextData) < 2) {
        out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
      } else {
        out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
      }
      if ($breakOnError) {
        out += ' if (!' + ($nextValid) + ') break; ';
      }
      out += ' } }  ';
      if ($breakOnError) {
        out += ' if (' + ($nextValid) + ') { ';
        $closingBraces += '}';
      }
    }
  } else if (it.util.schemaHasRules($schema, it.RULES.all)) {
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += '  for (var ' + ($idx) + ' = ' + (0) + '; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
    var $passData = $data + '[' + $idx + ']';
    $it.dataPathArr[$dataNxt] = $idx;
    var $code = it.validate($it);
    $it.baseId = $currentBaseId;
    if (it.util.varOccurences($code, $nextData) < 2) {
      out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
    } else {
      out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
    }
    if ($breakOnError) {
      out += ' if (!' + ($nextValid) + ') break; ';
    }
    out += ' }  ';
    if ($breakOnError) {
      out += ' if (' + ($nextValid) + ') { ';
      $closingBraces += '}';
    }
  }
  if ($breakOnError) {
    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187463, function(require, module, exports) {
'use strict';
module.exports = function generate__limit(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $isMax = $keyword == 'maximum',
    $exclusiveKeyword = $isMax ? 'exclusiveMaximum' : 'exclusiveMinimum',
    $schemaExcl = it.schema[$exclusiveKeyword],
    $isDataExcl = it.opts.v5 && $schemaExcl && $schemaExcl.$data,
    $op = $isMax ? '<' : '>',
    $notOp = $isMax ? '>' : '<';
  if ($isDataExcl) {
    var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr),
      $exclusive = 'exclusive' + $lvl,
      $opExpr = 'op' + $lvl,
      $opStr = '\' + ' + $opExpr + ' + \'';
    out += ' var schemaExcl' + ($lvl) + ' = ' + ($schemaValueExcl) + '; ';
    $schemaValueExcl = 'schemaExcl' + $lvl;
    out += ' var exclusive' + ($lvl) + '; if (typeof ' + ($schemaValueExcl) + ' != \'boolean\' && typeof ' + ($schemaValueExcl) + ' != \'undefined\') { ';
    var $errorKeyword = $exclusiveKeyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ($errorKeyword || '_exclusiveLimit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'' + ($exclusiveKeyword) + ' should be boolean\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } else if( ';
    if ($isData) {
      out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
    }
    out += ' ((exclusive' + ($lvl) + ' = ' + ($schemaValueExcl) + ' === true) ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaValue) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ') || ' + ($data) + ' !== ' + ($data) + ') { var op' + ($lvl) + ' = exclusive' + ($lvl) + ' ? \'' + ($op) + '\' : \'' + ($op) + '=\';';
  } else {
    var $exclusive = $schemaExcl === true,
      $opStr = $op;
    if (!$exclusive) $opStr += '=';
    var $opExpr = '\'' + $opStr + '\'';
    out += ' if ( ';
    if ($isData) {
      out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
    }
    out += ' ' + ($data) + ' ' + ($notOp);
    if ($exclusive) {
      out += '=';
    }
    out += ' ' + ($schemaValue) + ' || ' + ($data) + ' !== ' + ($data) + ') {';
  }
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { comparison: ' + ($opExpr) + ', limit: ' + ($schemaValue) + ', exclusive: ' + ($exclusive) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be ' + ($opStr) + ' ';
      if ($isData) {
        out += '\' + ' + ($schemaValue);
      } else {
        out += '' + ($schema) + '\'';
      }
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' } ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187464, function(require, module, exports) {
'use strict';
module.exports = function generate__limitItems(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxItems' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
  }
  out += ' ' + ($data) + '.length ' + ($op) + ' ' + ($schemaValue) + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT have ';
      if ($keyword == 'maxItems') {
        out += 'more';
      } else {
        out += 'less';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + ($schema);
      }
      out += ' items\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187465, function(require, module, exports) {
'use strict';
module.exports = function generate__limitLength(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxLength' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
  }
  if (it.opts.unicode === false) {
    out += ' ' + ($data) + '.length ';
  } else {
    out += ' ucs2length(' + ($data) + ') ';
  }
  out += ' ' + ($op) + ' ' + ($schemaValue) + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitLength') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT be ';
      if ($keyword == 'maxLength') {
        out += 'longer';
      } else {
        out += 'shorter';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + ($schema);
      }
      out += ' characters\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187466, function(require, module, exports) {
'use strict';
module.exports = function generate__limitProperties(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxProperties' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
  }
  out += ' Object.keys(' + ($data) + ').length ' + ($op) + ' ' + ($schemaValue) + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitProperties') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT have ';
      if ($keyword == 'maxProperties') {
        out += 'more';
      } else {
        out += 'less';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + ($schema);
      }
      out += ' properties\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187467, function(require, module, exports) {
'use strict';
module.exports = function generate_multipleOf(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  out += 'var division' + ($lvl) + ';if (';
  if ($isData) {
    out += ' ' + ($schemaValue) + ' !== undefined && ( typeof ' + ($schemaValue) + ' != \'number\' || ';
  }
  out += ' (division' + ($lvl) + ' = ' + ($data) + ' / ' + ($schemaValue) + ', ';
  if (it.opts.multipleOfPrecision) {
    out += ' Math.abs(Math.round(division' + ($lvl) + ') - division' + ($lvl) + ') > 1e-' + (it.opts.multipleOfPrecision) + ' ';
  } else {
    out += ' division' + ($lvl) + ' !== parseInt(division' + ($lvl) + ') ';
  }
  out += ' ) ';
  if ($isData) {
    out += '  )  ';
  }
  out += ' ) {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('multipleOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { multipleOf: ' + ($schemaValue) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be multiple of ';
      if ($isData) {
        out += '\' + ' + ($schemaValue);
      } else {
        out += '' + ($schema) + '\'';
      }
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + ($schema);
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187468, function(require, module, exports) {
'use strict';
module.exports = function generate_not(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  if (it.util.schemaHasRules($schema, it.RULES.all)) {
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += ' var ' + ($errs) + ' = errors;  ';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    $it.createErrors = false;
    var $allErrorsOption;
    if ($it.opts.allErrors) {
      $allErrorsOption = $it.opts.allErrors;
      $it.opts.allErrors = false;
    }
    out += ' ' + (it.validate($it)) + ' ';
    $it.createErrors = true;
    if ($allErrorsOption) $it.opts.allErrors = $allErrorsOption;
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' if (' + ($nextValid) + ') {   ';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('not') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT be valid\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
    if (it.opts.allErrors) {
      out += ' } ';
    }
  } else {
    out += '  var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('not') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT be valid\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if ($breakOnError) {
      out += ' if (false) { ';
    }
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187469, function(require, module, exports) {
'use strict';
module.exports = function generate_oneOf(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  out += 'var ' + ($errs) + ' = errors;var prevValid' + ($lvl) + ' = false;var ' + ($valid) + ' = false;';
  var $currentBaseId = $it.baseId;
  var $wasComposite = it.compositeRule;
  it.compositeRule = $it.compositeRule = true;
  var arr1 = $schema;
  if (arr1) {
    var $sch, $i = -1,
      l1 = arr1.length - 1;
    while ($i < l1) {
      $sch = arr1[$i += 1];
      if (it.util.schemaHasRules($sch, it.RULES.all)) {
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + (it.validate($it)) + ' ';
        $it.baseId = $currentBaseId;
      } else {
        out += ' var ' + ($nextValid) + ' = true; ';
      }
      if ($i) {
        out += ' if (' + ($nextValid) + ' && prevValid' + ($lvl) + ') ' + ($valid) + ' = false; else { ';
        $closingBraces += '}';
      }
      out += ' if (' + ($nextValid) + ') ' + ($valid) + ' = prevValid' + ($lvl) + ' = true;';
    }
  }
  it.compositeRule = $it.compositeRule = $wasComposite;
  out += '' + ($closingBraces) + 'if (!' + ($valid) + ') {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('oneOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match exactly one schema in oneOf\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; }';
  if (it.opts.allErrors) {
    out += ' } ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187470, function(require, module, exports) {
'use strict';
module.exports = function generate_pattern(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $regexp = $isData ? '(new RegExp(' + $schemaValue + '))' : it.usePattern($schema);
  out += 'if ( ';
  if ($isData) {
    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'string\') || ';
  }
  out += ' !' + ($regexp) + '.test(' + ($data) + ') ) {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('pattern') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { pattern:  ';
    if ($isData) {
      out += '' + ($schemaValue);
    } else {
      out += '' + (it.util.toQuotedString($schema));
    }
    out += '  } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match pattern "';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + (it.util.escapeQuotes($schema));
      }
      out += '"\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + (it.util.toQuotedString($schema));
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187471, function(require, module, exports) {
'use strict';
module.exports = function generate_properties(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $key = 'key' + $lvl,
    $dataNxt = $it.dataLevel = it.dataLevel + 1,
    $nextData = 'data' + $dataNxt;
  var $schemaKeys = Object.keys($schema || {}),
    $pProperties = it.schema.patternProperties || {},
    $pPropertyKeys = Object.keys($pProperties),
    $aProperties = it.schema.additionalProperties,
    $someProperties = $schemaKeys.length || $pPropertyKeys.length,
    $noAdditional = $aProperties === false,
    $additionalIsSchema = typeof $aProperties == 'object' && Object.keys($aProperties).length,
    $removeAdditional = it.opts.removeAdditional,
    $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional,
    $ownProperties = it.opts.ownProperties,
    $currentBaseId = it.baseId;
  var $required = it.schema.required;
  if ($required && !(it.opts.v5 && $required.$data) && $required.length < it.opts.loopRequired) var $requiredHash = it.util.toHash($required);
  if (it.opts.v5) {
    var $pgProperties = it.schema.patternGroups || {},
      $pgPropertyKeys = Object.keys($pgProperties);
  }
  out += 'var ' + ($errs) + ' = errors;var ' + ($nextValid) + ' = true;';
  if ($checkAdditional) {
    out += ' for (var ' + ($key) + ' in ' + ($data) + ') {  ';
    if ($ownProperties) {
      out += ' if (!Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($key) + ')) continue; ';
    }
    if ($someProperties) {
      out += ' var isAdditional' + ($lvl) + ' = !(false ';
      if ($schemaKeys.length) {
        if ($schemaKeys.length > 5) {
          out += ' || validate.schema' + ($schemaPath) + '[' + ($key) + '] ';
        } else {
          var arr1 = $schemaKeys;
          if (arr1) {
            var $propertyKey, i1 = -1,
              l1 = arr1.length - 1;
            while (i1 < l1) {
              $propertyKey = arr1[i1 += 1];
              out += ' || ' + ($key) + ' == ' + (it.util.toQuotedString($propertyKey)) + ' ';
            }
          }
        }
      }
      if ($pPropertyKeys.length) {
        var arr2 = $pPropertyKeys;
        if (arr2) {
          var $pProperty, $i = -1,
            l2 = arr2.length - 1;
          while ($i < l2) {
            $pProperty = arr2[$i += 1];
            out += ' || ' + (it.usePattern($pProperty)) + '.test(' + ($key) + ') ';
          }
        }
      }
      if (it.opts.v5 && $pgPropertyKeys && $pgPropertyKeys.length) {
        var arr3 = $pgPropertyKeys;
        if (arr3) {
          var $pgProperty, $i = -1,
            l3 = arr3.length - 1;
          while ($i < l3) {
            $pgProperty = arr3[$i += 1];
            out += ' || ' + (it.usePattern($pgProperty)) + '.test(' + ($key) + ') ';
          }
        }
      }
      out += ' ); if (isAdditional' + ($lvl) + ') { ';
    }
    if ($removeAdditional == 'all') {
      out += ' delete ' + ($data) + '[' + ($key) + ']; ';
    } else {
      var $currentErrorPath = it.errorPath;
      var $additionalProperty = '\' + ' + $key + ' + \'';
      if (it.opts._errorDataPathProperty) {
        it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
      }
      if ($noAdditional) {
        if ($removeAdditional) {
          out += ' delete ' + ($data) + '[' + ($key) + ']; ';
        } else {
          out += ' ' + ($nextValid) + ' = false; ';
          var $currErrSchemaPath = $errSchemaPath;
          $errSchemaPath = it.errSchemaPath + '/additionalProperties';
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = ''; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + ('additionalProperties') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { additionalProperty: \'' + ($additionalProperty) + '\' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'should NOT have additional properties\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
            if (it.async) {
              out += ' throw new ValidationError([' + (__err) + ']); ';
            } else {
              out += ' validate.errors = [' + (__err) + ']; return false; ';
            }
          } else {
            out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
          }
          $errSchemaPath = $currErrSchemaPath;
          if ($breakOnError) {
            out += ' break; ';
          }
        }
      } else if ($additionalIsSchema) {
        if ($removeAdditional == 'failing') {
          out += ' var ' + ($errs) + ' = errors;  ';
          var $wasComposite = it.compositeRule;
          it.compositeRule = $it.compositeRule = true;
          $it.schema = $aProperties;
          $it.schemaPath = it.schemaPath + '.additionalProperties';
          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          out += ' if (!' + ($nextValid) + ') { errors = ' + ($errs) + '; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete ' + ($data) + '[' + ($key) + ']; }  ';
          it.compositeRule = $it.compositeRule = $wasComposite;
        } else {
          $it.schema = $aProperties;
          $it.schemaPath = it.schemaPath + '.additionalProperties';
          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          if ($breakOnError) {
            out += ' if (!' + ($nextValid) + ') break; ';
          }
        }
      }
      it.errorPath = $currentErrorPath;
    }
    if ($someProperties) {
      out += ' } ';
    }
    out += ' }  ';
    if ($breakOnError) {
      out += ' if (' + ($nextValid) + ') { ';
      $closingBraces += '}';
    }
  }
  var $useDefaults = it.opts.useDefaults && !it.compositeRule;
  if ($schemaKeys.length) {
    var arr4 = $schemaKeys;
    if (arr4) {
      var $propertyKey, i4 = -1,
        l4 = arr4.length - 1;
      while (i4 < l4) {
        $propertyKey = arr4[i4 += 1];
        var $sch = $schema[$propertyKey];
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          var $prop = it.util.getProperty($propertyKey),
            $passData = $data + $prop,
            $hasDefault = $useDefaults && $sch.default !== undefined;
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + $prop;
          $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($propertyKey);
          $it.errorPath = it.util.getPath(it.errorPath, $propertyKey, it.opts.jsonPointers);
          $it.dataPathArr[$dataNxt] = it.util.toQuotedString($propertyKey);
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            $code = it.util.varReplace($code, $nextData, $passData);
            var $useData = $passData;
          } else {
            var $useData = $nextData;
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ';
          }
          if ($hasDefault) {
            out += ' ' + ($code) + ' ';
          } else {
            if ($requiredHash && $requiredHash[$propertyKey]) {
              out += ' if (' + ($useData) + ' === undefined) { ' + ($nextValid) + ' = false; ';
              var $currentErrorPath = it.errorPath,
                $currErrSchemaPath = $errSchemaPath,
                $missingProperty = it.util.escapeQuotes($propertyKey);
              if (it.opts._errorDataPathProperty) {
                it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
              }
              $errSchemaPath = it.errSchemaPath + '/required';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'';
                  if (it.opts._errorDataPathProperty) {
                    out += 'is a required property';
                  } else {
                    out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                  }
                  out += '\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + (__err) + ']); ';
                } else {
                  out += ' validate.errors = [' + (__err) + ']; return false; ';
                }
              } else {
                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              $errSchemaPath = $currErrSchemaPath;
              it.errorPath = $currentErrorPath;
              out += ' } else { ';
            } else {
              if ($breakOnError) {
                out += ' if (' + ($useData) + ' === undefined) { ' + ($nextValid) + ' = true; } else { ';
              } else {
                out += ' if (' + ($useData) + ' !== undefined) { ';
              }
            }
            out += ' ' + ($code) + ' } ';
          }
        }
        if ($breakOnError) {
          out += ' if (' + ($nextValid) + ') { ';
          $closingBraces += '}';
        }
      }
    }
  }
  var arr5 = $pPropertyKeys;
  if (arr5) {
    var $pProperty, i5 = -1,
      l5 = arr5.length - 1;
    while (i5 < l5) {
      $pProperty = arr5[i5 += 1];
      var $sch = $pProperties[$pProperty];
      if (it.util.schemaHasRules($sch, it.RULES.all)) {
        $it.schema = $sch;
        $it.schemaPath = it.schemaPath + '.patternProperties' + it.util.getProperty($pProperty);
        $it.errSchemaPath = it.errSchemaPath + '/patternProperties/' + it.util.escapeFragment($pProperty);
        out += ' for (var ' + ($key) + ' in ' + ($data) + ') {  ';
        if ($ownProperties) {
          out += ' if (!Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($key) + ')) continue; ';
        }
        out += ' if (' + (it.usePattern($pProperty)) + '.test(' + ($key) + ')) { ';
        $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
        var $passData = $data + '[' + $key + ']';
        $it.dataPathArr[$dataNxt] = $key;
        var $code = it.validate($it);
        $it.baseId = $currentBaseId;
        if (it.util.varOccurences($code, $nextData) < 2) {
          out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
        } else {
          out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
        }
        if ($breakOnError) {
          out += ' if (!' + ($nextValid) + ') break; ';
        }
        out += ' } ';
        if ($breakOnError) {
          out += ' else ' + ($nextValid) + ' = true; ';
        }
        out += ' }  ';
        if ($breakOnError) {
          out += ' if (' + ($nextValid) + ') { ';
          $closingBraces += '}';
        }
      }
    }
  }
  if (it.opts.v5) {
    var arr6 = $pgPropertyKeys;
    if (arr6) {
      var $pgProperty, i6 = -1,
        l6 = arr6.length - 1;
      while (i6 < l6) {
        $pgProperty = arr6[i6 += 1];
        var $pgSchema = $pgProperties[$pgProperty],
          $sch = $pgSchema.schema;
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          $it.schema = $sch;
          $it.schemaPath = it.schemaPath + '.patternGroups' + it.util.getProperty($pgProperty) + '.schema';
          $it.errSchemaPath = it.errSchemaPath + '/patternGroups/' + it.util.escapeFragment($pgProperty) + '/schema';
          out += ' var pgPropCount' + ($lvl) + ' = 0; for (var ' + ($key) + ' in ' + ($data) + ') {  ';
          if ($ownProperties) {
            out += ' if (!Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($key) + ')) continue; ';
          }
          out += ' if (' + (it.usePattern($pgProperty)) + '.test(' + ($key) + ')) { pgPropCount' + ($lvl) + '++; ';
          $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          if ($breakOnError) {
            out += ' if (!' + ($nextValid) + ') break; ';
          }
          out += ' } ';
          if ($breakOnError) {
            out += ' else ' + ($nextValid) + ' = true; ';
          }
          out += ' }  ';
          if ($breakOnError) {
            out += ' if (' + ($nextValid) + ') { ';
            $closingBraces += '}';
          }
          var $pgMin = $pgSchema.minimum,
            $pgMax = $pgSchema.maximum;
          if ($pgMin !== undefined || $pgMax !== undefined) {
            out += ' var ' + ($valid) + ' = true; ';
            var $currErrSchemaPath = $errSchemaPath;
            if ($pgMin !== undefined) {
              var $limit = $pgMin,
                $reason = 'minimum',
                $moreOrLess = 'less';
              out += ' ' + ($valid) + ' = pgPropCount' + ($lvl) + ' >= ' + ($pgMin) + '; ';
              $errSchemaPath = it.errSchemaPath + '/patternGroups/minimum';
              out += '  if (!' + ($valid) + ') {   ';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ('patternGroups') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { reason: \'' + ($reason) + '\', limit: ' + ($limit) + ', pattern: \'' + (it.util.escapeQuotes($pgProperty)) + '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'should NOT have ' + ($moreOrLess) + ' than ' + ($limit) + ' properties matching pattern "' + (it.util.escapeQuotes($pgProperty)) + '"\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + (__err) + ']); ';
                } else {
                  out += ' validate.errors = [' + (__err) + ']; return false; ';
                }
              } else {
                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              out += ' } ';
              if ($pgMax !== undefined) {
                out += ' else ';
              }
            }
            if ($pgMax !== undefined) {
              var $limit = $pgMax,
                $reason = 'maximum',
                $moreOrLess = 'more';
              out += ' ' + ($valid) + ' = pgPropCount' + ($lvl) + ' <= ' + ($pgMax) + '; ';
              $errSchemaPath = it.errSchemaPath + '/patternGroups/maximum';
              out += '  if (!' + ($valid) + ') {   ';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ('patternGroups') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { reason: \'' + ($reason) + '\', limit: ' + ($limit) + ', pattern: \'' + (it.util.escapeQuotes($pgProperty)) + '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'should NOT have ' + ($moreOrLess) + ' than ' + ($limit) + ' properties matching pattern "' + (it.util.escapeQuotes($pgProperty)) + '"\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + (__err) + ']); ';
                } else {
                  out += ' validate.errors = [' + (__err) + ']; return false; ';
                }
              } else {
                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              out += ' } ';
            }
            $errSchemaPath = $currErrSchemaPath;
            if ($breakOnError) {
              out += ' if (' + ($valid) + ') { ';
              $closingBraces += '}';
            }
          }
        }
      }
    }
  }
  if ($breakOnError) {
    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187472, function(require, module, exports) {
'use strict';
module.exports = function generate_required(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $vSchema = 'schema' + $lvl;
  if (!$isData) {
    if ($schema.length < it.opts.loopRequired && it.schema.properties && Object.keys(it.schema.properties).length) {
      var $required = [];
      var arr1 = $schema;
      if (arr1) {
        var $property, i1 = -1,
          l1 = arr1.length - 1;
        while (i1 < l1) {
          $property = arr1[i1 += 1];
          var $propertySch = it.schema.properties[$property];
          if (!($propertySch && it.util.schemaHasRules($propertySch, it.RULES.all))) {
            $required[$required.length] = $property;
          }
        }
      }
    } else {
      var $required = $schema;
    }
  }
  if ($isData || $required.length) {
    var $currentErrorPath = it.errorPath,
      $loopRequired = $isData || $required.length >= it.opts.loopRequired;
    if ($breakOnError) {
      out += ' var missing' + ($lvl) + '; ';
      if ($loopRequired) {
        if (!$isData) {
          out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + '; ';
        }
        var $i = 'i' + $lvl,
          $propertyPath = 'schema' + $lvl + '[' + $i + ']',
          $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
        }
        out += ' var ' + ($valid) + ' = true; ';
        if ($isData) {
          out += ' if (schema' + ($lvl) + ' === undefined) ' + ($valid) + ' = true; else if (!Array.isArray(schema' + ($lvl) + ')) ' + ($valid) + ' = false; else {';
        }
        out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < ' + ($vSchema) + '.length; ' + ($i) + '++) { ' + ($valid) + ' = ' + ($data) + '[' + ($vSchema) + '[' + ($i) + ']] !== undefined; if (!' + ($valid) + ') break; } ';
        if ($isData) {
          out += '  }  ';
        }
        out += '  if (!' + ($valid) + ') {   ';
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else { ';
      } else {
        out += ' if ( ';
        var arr2 = $required;
        if (arr2) {
          var _$property, $i = -1,
            l2 = arr2.length - 1;
          while ($i < l2) {
            _$property = arr2[$i += 1];
            if ($i) {
              out += ' || ';
            }
            var $prop = it.util.getProperty(_$property);
            out += ' ( ' + ($data) + ($prop) + ' === undefined && (missing' + ($lvl) + ' = ' + (it.util.toQuotedString(it.opts.jsonPointers ? _$property : $prop)) + ') ) ';
          }
        }
        out += ') {  ';
        var $propertyPath = 'missing' + $lvl,
          $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
        }
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else { ';
      }
    } else {
      if ($loopRequired) {
        if (!$isData) {
          out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + '; ';
        }
        var $i = 'i' + $lvl,
          $propertyPath = 'schema' + $lvl + '[' + $i + ']',
          $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
        }
        if ($isData) {
          out += ' if (' + ($vSchema) + ' && !Array.isArray(' + ($vSchema) + ')) {  var err =   '; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'';
              if (it.opts._errorDataPathProperty) {
                out += 'is a required property';
              } else {
                out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
              }
              out += '\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (' + ($vSchema) + ' !== undefined) { ';
        }
        out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < ' + ($vSchema) + '.length; ' + ($i) + '++) { if (' + ($data) + '[' + ($vSchema) + '[' + ($i) + ']] === undefined) {  var err =   '; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ';
        if ($isData) {
          out += '  }  ';
        }
      } else {
        var arr3 = $required;
        if (arr3) {
          var $reqProperty, i3 = -1,
            l3 = arr3.length - 1;
          while (i3 < l3) {
            $reqProperty = arr3[i3 += 1];
            var $prop = it.util.getProperty($reqProperty),
              $missingProperty = it.util.escapeQuotes($reqProperty);
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPath($currentErrorPath, $reqProperty, it.opts.jsonPointers);
            }
            out += ' if (' + ($data) + ($prop) + ' === undefined) {  var err =   '; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'';
                if (it.opts._errorDataPathProperty) {
                  out += 'is a required property';
                } else {
                  out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                }
                out += '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
          }
        }
      }
    }
    it.errorPath = $currentErrorPath;
  } else if ($breakOnError) {
    out += ' if (true) {';
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187473, function(require, module, exports) {
'use strict';
module.exports = function generate_uniqueItems(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  if (($schema || $isData) && it.opts.uniqueItems !== false) {
    if ($isData) {
      out += ' var ' + ($valid) + '; if (' + ($schemaValue) + ' === false || ' + ($schemaValue) + ' === undefined) ' + ($valid) + ' = true; else if (typeof ' + ($schemaValue) + ' != \'boolean\') ' + ($valid) + ' = false; else { ';
    }
    out += ' var ' + ($valid) + ' = true; if (' + ($data) + '.length > 1) { var i = ' + ($data) + '.length, j; outer: for (;i--;) { for (j = i; j--;) { if (equal(' + ($data) + '[i], ' + ($data) + '[j])) { ' + ($valid) + ' = false; break outer; } } } } ';
    if ($isData) {
      out += '  }  ';
    }
    out += ' if (!' + ($valid) + ') {   ';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ('uniqueItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { i: i, j: j } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT have duplicate items (items ## \' + j + \' and \' + i + \' are identical)\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema:  ';
        if ($isData) {
          out += 'validate.schema' + ($schemaPath);
        } else {
          out += '' + ($schema);
        }
        out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } ';
    if ($breakOnError) {
      out += ' else { ';
    }
  } else {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187474, function(require, module, exports) {
'use strict';

var META_SCHEMA_ID = 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/json-schema-v5.json';

module.exports = {
  enable: enableV5,
  META_SCHEMA_ID: META_SCHEMA_ID
};


function enableV5(ajv) {
  var inlineFunctions = {
    'switch': require('./dotjs/switch'),
    'constant': require('./dotjs/constant'),
    '_formatLimit': require('./dotjs/_formatLimit'),
    'patternRequired': require('./dotjs/patternRequired')
  };

  if (ajv._opts.meta !== false) {
    var metaSchema = require('./refs/json-schema-v5.json');
    ajv.addMetaSchema(metaSchema, META_SCHEMA_ID);
  }
  _addKeyword('constant');
  ajv.addKeyword('contains', { type: 'array', macro: containsMacro });

  _addKeyword('formatMaximum', 'string', inlineFunctions._formatLimit);
  _addKeyword('formatMinimum', 'string', inlineFunctions._formatLimit);
  ajv.addKeyword('formatExclusiveMaximum');
  ajv.addKeyword('formatExclusiveMinimum');

  ajv.addKeyword('patternGroups'); // implemented in properties.jst
  _addKeyword('patternRequired', 'object');
  _addKeyword('switch');


  function _addKeyword(keyword, types, inlineFunc) {
    var definition = {
      inline: inlineFunc || inlineFunctions[keyword],
      statements: true,
      errors: 'full'
    };
    if (types) definition.type = types;
    ajv.addKeyword(keyword, definition);
  }
}


function containsMacro(schema) {
  return {
    not: { items: { not: schema } }
  };
}

}, function(modId) { var map = {"./dotjs/switch":1536577187475,"./dotjs/constant":1536577187476,"./dotjs/_formatLimit":1536577187477,"./dotjs/patternRequired":1536577187478,"./refs/json-schema-v5.json":1536577187479}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187475, function(require, module, exports) {
'use strict';
module.exports = function generate_switch(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $ifPassed = 'ifPassed' + it.level,
    $currentBaseId = $it.baseId,
    $shouldContinue;
  out += 'var ' + ($ifPassed) + ';';
  var arr1 = $schema;
  if (arr1) {
    var $sch, $caseIndex = -1,
      l1 = arr1.length - 1;
    while ($caseIndex < l1) {
      $sch = arr1[$caseIndex += 1];
      if ($caseIndex && !$shouldContinue) {
        out += ' if (!' + ($ifPassed) + ') { ';
        $closingBraces += '}';
      }
      if ($sch.if && it.util.schemaHasRules($sch.if, it.RULES.all)) {
        out += ' var ' + ($errs) + ' = errors;   ';
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        $it.createErrors = false;
        $it.schema = $sch.if;
        $it.schemaPath = $schemaPath + '[' + $caseIndex + '].if';
        $it.errSchemaPath = $errSchemaPath + '/' + $caseIndex + '/if';
        out += '  ' + (it.validate($it)) + ' ';
        $it.baseId = $currentBaseId;
        $it.createErrors = true;
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += ' ' + ($ifPassed) + ' = ' + ($nextValid) + '; if (' + ($ifPassed) + ') {  ';
        if (typeof $sch.then == 'boolean') {
          if ($sch.then === false) {
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = ''; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('switch') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { caseIndex: ' + ($caseIndex) + ' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'should pass "switch" keyword validation\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
              if (it.async) {
                out += ' throw new ValidationError([' + (__err) + ']); ';
              } else {
                out += ' validate.errors = [' + (__err) + ']; return false; ';
              }
            } else {
              out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
            }
          }
          out += ' var ' + ($nextValid) + ' = ' + ($sch.then) + '; ';
        } else {
          $it.schema = $sch.then;
          $it.schemaPath = $schemaPath + '[' + $caseIndex + '].then';
          $it.errSchemaPath = $errSchemaPath + '/' + $caseIndex + '/then';
          out += '  ' + (it.validate($it)) + ' ';
          $it.baseId = $currentBaseId;
        }
        out += '  } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } } ';
      } else {
        out += ' ' + ($ifPassed) + ' = true;  ';
        if (typeof $sch.then == 'boolean') {
          if ($sch.then === false) {
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = ''; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('switch') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { caseIndex: ' + ($caseIndex) + ' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'should pass "switch" keyword validation\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
              if (it.async) {
                out += ' throw new ValidationError([' + (__err) + ']); ';
              } else {
                out += ' validate.errors = [' + (__err) + ']; return false; ';
              }
            } else {
              out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
            }
          }
          out += ' var ' + ($nextValid) + ' = ' + ($sch.then) + '; ';
        } else {
          $it.schema = $sch.then;
          $it.schemaPath = $schemaPath + '[' + $caseIndex + '].then';
          $it.errSchemaPath = $errSchemaPath + '/' + $caseIndex + '/then';
          out += '  ' + (it.validate($it)) + ' ';
          $it.baseId = $currentBaseId;
        }
      }
      $shouldContinue = $sch.continue
    }
  }
  out += '' + ($closingBraces) + 'var ' + ($valid) + ' = ' + ($nextValid) + '; ';
  out = it.util.cleanUpCode(out);
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187476, function(require, module, exports) {
'use strict';
module.exports = function generate_constant(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  if (!$isData) {
    out += ' var schema' + ($lvl) + ' = validate.schema' + ($schemaPath) + ';';
  }
  out += 'var ' + ($valid) + ' = equal(' + ($data) + ', schema' + ($lvl) + '); if (!' + ($valid) + ') {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ('constant') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be equal to constant\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' }';
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187477, function(require, module, exports) {
'use strict';
module.exports = function generate__formatLimit(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  out += 'var ' + ($valid) + ' = undefined;';
  if (it.opts.format === false) {
    out += ' ' + ($valid) + ' = true; ';
    return out;
  }
  var $schemaFormat = it.schema.format,
    $isDataFormat = it.opts.v5 && $schemaFormat.$data,
    $closingBraces = '';
  if ($isDataFormat) {
    var $schemaValueFormat = it.util.getData($schemaFormat.$data, $dataLvl, it.dataPathArr),
      $format = 'format' + $lvl,
      $compare = 'compare' + $lvl;
    out += ' var ' + ($format) + ' = formats[' + ($schemaValueFormat) + '] , ' + ($compare) + ' = ' + ($format) + ' && ' + ($format) + '.compare;';
  } else {
    var $format = it.formats[$schemaFormat];
    if (!($format && $format.compare)) {
      out += '  ' + ($valid) + ' = true; ';
      return out;
    }
    var $compare = 'formats' + it.util.getProperty($schemaFormat) + '.compare';
  }
  var $isMax = $keyword == 'formatMaximum',
    $exclusiveKeyword = 'formatExclusive' + ($isMax ? 'Maximum' : 'Minimum'),
    $schemaExcl = it.schema[$exclusiveKeyword],
    $isDataExcl = it.opts.v5 && $schemaExcl && $schemaExcl.$data,
    $op = $isMax ? '<' : '>',
    $result = 'result' + $lvl;
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  if ($isDataExcl) {
    var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr),
      $exclusive = 'exclusive' + $lvl,
      $opExpr = 'op' + $lvl,
      $opStr = '\' + ' + $opExpr + ' + \'';
    out += ' var schemaExcl' + ($lvl) + ' = ' + ($schemaValueExcl) + '; ';
    $schemaValueExcl = 'schemaExcl' + $lvl;
    out += ' if (typeof ' + ($schemaValueExcl) + ' != \'boolean\' && ' + ($schemaValueExcl) + ' !== undefined) { ' + ($valid) + ' = false; ';
    var $errorKeyword = $exclusiveKeyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ($errorKeyword || '_formatExclusiveLimit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'' + ($exclusiveKeyword) + ' should be boolean\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' }  ';
    if ($breakOnError) {
      $closingBraces += '}';
      out += ' else { ';
    }
    if ($isData) {
      out += ' if (' + ($schemaValue) + ' === undefined) ' + ($valid) + ' = true; else if (typeof ' + ($schemaValue) + ' != \'string\') ' + ($valid) + ' = false; else { ';
      $closingBraces += '}';
    }
    if ($isDataFormat) {
      out += ' if (!' + ($compare) + ') ' + ($valid) + ' = true; else { ';
      $closingBraces += '}';
    }
    out += ' var ' + ($result) + ' = ' + ($compare) + '(' + ($data) + ',  ';
    if ($isData) {
      out += '' + ($schemaValue);
    } else {
      out += '' + (it.util.toQuotedString($schema));
    }
    out += ' ); if (' + ($result) + ' === undefined) ' + ($valid) + ' = false; var ' + ($exclusive) + ' = ' + ($schemaValueExcl) + ' === true; if (' + ($valid) + ' === undefined) { ' + ($valid) + ' = ' + ($exclusive) + ' ? ' + ($result) + ' ' + ($op) + ' 0 : ' + ($result) + ' ' + ($op) + '= 0; } if (!' + ($valid) + ') var op' + ($lvl) + ' = ' + ($exclusive) + ' ? \'' + ($op) + '\' : \'' + ($op) + '=\';';
  } else {
    var $exclusive = $schemaExcl === true,
      $opStr = $op;
    if (!$exclusive) $opStr += '=';
    var $opExpr = '\'' + $opStr + '\'';
    if ($isData) {
      out += ' if (' + ($schemaValue) + ' === undefined) ' + ($valid) + ' = true; else if (typeof ' + ($schemaValue) + ' != \'string\') ' + ($valid) + ' = false; else { ';
      $closingBraces += '}';
    }
    if ($isDataFormat) {
      out += ' if (!' + ($compare) + ') ' + ($valid) + ' = true; else { ';
      $closingBraces += '}';
    }
    out += ' var ' + ($result) + ' = ' + ($compare) + '(' + ($data) + ',  ';
    if ($isData) {
      out += '' + ($schemaValue);
    } else {
      out += '' + (it.util.toQuotedString($schema));
    }
    out += ' ); if (' + ($result) + ' === undefined) ' + ($valid) + ' = false; if (' + ($valid) + ' === undefined) ' + ($valid) + ' = ' + ($result) + ' ' + ($op);
    if (!$exclusive) {
      out += '=';
    }
    out += ' 0;';
  }
  out += '' + ($closingBraces) + 'if (!' + ($valid) + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_formatLimit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { comparison: ' + ($opExpr) + ', limit:  ';
    if ($isData) {
      out += '' + ($schemaValue);
    } else {
      out += '' + (it.util.toQuotedString($schema));
    }
    out += ' , exclusive: ' + ($exclusive) + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be ' + ($opStr) + ' "';
      if ($isData) {
        out += '\' + ' + ($schemaValue) + ' + \'';
      } else {
        out += '' + (it.util.escapeQuotes($schema));
      }
      out += '"\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + ($schemaPath);
      } else {
        out += '' + (it.util.toQuotedString($schema));
      }
      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + (__err) + ']); ';
    } else {
      out += ' validate.errors = [' + (__err) + ']; return false; ';
    }
  } else {
    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '}';
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187478, function(require, module, exports) {
'use strict';
module.exports = function generate_patternRequired(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $key = 'key' + $lvl,
    $matched = 'patternMatched' + $lvl,
    $closingBraces = '',
    $ownProperties = it.opts.ownProperties;
  out += 'var ' + ($valid) + ' = true;';
  var arr1 = $schema;
  if (arr1) {
    var $pProperty, i1 = -1,
      l1 = arr1.length - 1;
    while (i1 < l1) {
      $pProperty = arr1[i1 += 1];
      out += ' var ' + ($matched) + ' = false; for (var ' + ($key) + ' in ' + ($data) + ') {  ';
      if ($ownProperties) {
        out += ' if (!Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($key) + ')) continue; ';
      }
      out += ' ' + ($matched) + ' = ' + (it.usePattern($pProperty)) + '.test(' + ($key) + '); if (' + ($matched) + ') break; } ';
      var $missingPattern = it.util.escapeQuotes($pProperty);
      out += ' if (!' + ($matched) + ') { ' + ($valid) + ' = false;  var err =   '; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('patternRequired') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingPattern: \'' + ($missingPattern) + '\' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should have property matching pattern \\\'' + ($missingPattern) + '\\\'\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; }   ';
      if ($breakOnError) {
        $closingBraces += '}';
        out += ' else { ';
      }
    }
  }
  out += '' + ($closingBraces);
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187479, function(require, module, exports) {
module.exports = {
    "id": "https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/json-schema-v5.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Core schema meta-schema (v5 proposals)",
    "definitions": {
        "schemaArray": {
            "type": "array",
            "minItems": 1,
            "items": { "$ref": "#" }
        },
        "positiveInteger": {
            "type": "integer",
            "minimum": 0
        },
        "positiveIntegerDefault0": {
            "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
        },
        "simpleTypes": {
            "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
        },
        "stringArray": {
            "type": "array",
            "items": { "type": "string" },
            "minItems": 1,
            "uniqueItems": true
        },
        "$data": {
            "type": "object",
            "required": [ "$data" ],
            "properties": {
                "$data": {
                    "type": "string",
                    "anyOf": [
                        { "format": "relative-json-pointer" }, 
                        { "format": "json-pointer" }
                    ]
                }
            },
            "additionalProperties": false
        }
    },
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri"
        },
        "$schema": {
            "type": "string",
            "format": "uri"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "default": {},
        "multipleOf": {
            "anyOf": [
                {
                    "type": "number",
                    "minimum": 0,
                    "exclusiveMinimum": true
                },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "maximum": {
            "anyOf": [
                { "type": "number" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "exclusiveMaximum": {
            "anyOf": [
                {
                    "type": "boolean",
                    "default": false
                },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "minimum": {
            "anyOf": [
                { "type": "number" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "exclusiveMinimum": {
            "anyOf": [
                {
                    "type": "boolean",
                    "default": false
                },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "maxLength": {
            "anyOf": [
                { "$ref": "#/definitions/positiveInteger" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "minLength": {
            "anyOf": [
                { "$ref": "#/definitions/positiveIntegerDefault0" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "pattern": {
            "anyOf": [
                {
                    "type": "string",
                    "format": "regex"
                },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "additionalItems": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" },
                { "$ref": "#/definitions/$data" }
            ],
            "default": {}
        },
        "items": {
            "anyOf": [
                { "$ref": "#" },
                { "$ref": "#/definitions/schemaArray" }
            ],
            "default": {}
        },
        "maxItems": {
            "anyOf": [
                { "$ref": "#/definitions/positiveInteger" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "minItems": {
            "anyOf": [
                { "$ref": "#/definitions/positiveIntegerDefault0" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "uniqueItems": {
            "anyOf": [
                {
                    "type": "boolean",
                    "default": false
                },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "maxProperties": {
            "anyOf": [
                { "$ref": "#/definitions/positiveInteger" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "minProperties": {
            "anyOf": [
                { "$ref": "#/definitions/positiveIntegerDefault0" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "required": {
            "anyOf": [
                { "$ref": "#/definitions/stringArray" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "additionalProperties": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" },
                { "$ref": "#/definitions/$data" }
            ],
            "default": {}
        },
        "definitions": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "properties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "patternProperties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "dependencies": {
            "type": "object",
            "additionalProperties": {
                "anyOf": [
                    { "$ref": "#" },
                    { "$ref": "#/definitions/stringArray" }
                ]
            }
        },
        "enum": {
            "anyOf": [
                {
                    "type": "array",
                    "minItems": 1,
                    "uniqueItems": true
                },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "type": {
            "anyOf": [
                { "$ref": "#/definitions/simpleTypes" },
                {
                    "type": "array",
                    "items": { "$ref": "#/definitions/simpleTypes" },
                    "minItems": 1,
                    "uniqueItems": true
                }
            ]
        },
        "allOf": { "$ref": "#/definitions/schemaArray" },
        "anyOf": { "$ref": "#/definitions/schemaArray" },
        "oneOf": { "$ref": "#/definitions/schemaArray" },
        "not": { "$ref": "#" },
        "format": {
            "anyOf": [
                { "type": "string" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "formatMaximum": {
            "anyOf": [
                { "type": "string" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "formatMinimum": {
            "anyOf": [
                { "type": "string" },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "formatExclusiveMaximum": {
            "anyOf": [
                {
                    "type": "boolean",
                    "default": false
                },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "formatExclusiveMinimum": {
            "anyOf": [
                {
                    "type": "boolean",
                    "default": false
                },
                { "$ref": "#/definitions/$data" }
            ]
        },
        "constant": {
            "anyOf": [
                {},
                { "$ref": "#/definitions/$data" }
            ]
        },
        "contains": { "$ref": "#" },
        "patternGroups": {
            "type": "object",
            "additionalProperties": {
                "type": "object",
                "required": [ "schema" ],
                "properties": {
                    "maximum": {
                        "anyOf": [
                            { "$ref": "#/definitions/positiveInteger" },
                            { "$ref": "#/definitions/$data" }
                        ]
                    },
                    "minimum": {
                        "anyOf": [
                            { "$ref": "#/definitions/positiveIntegerDefault0" },
                            { "$ref": "#/definitions/$data" }
                        ]
                    },
                    "schema": { "$ref": "#" }
                },
                "additionalProperties": false
            },
            "default": {}
        },
        "switch": {
            "type": "array",
            "items": {
                "required": [ "then" ],
                "properties": {
                    "if": { "$ref": "#" },
                    "then": {
                        "anyOf": [
                            { "type": "boolean" },
                            { "$ref": "#" }
                        ]
                    },
                    "continue": { "type": "boolean" }
                },
                "additionalProperties": false,
                "dependencies": {
                    "continue": [ "if" ]
                }
            }
        }
    },
    "dependencies": {
        "exclusiveMaximum": [ "maximum" ],
        "exclusiveMinimum": [ "minimum" ],
        "formatMaximum": [ "format" ],
        "formatMinimum": [ "format" ],
        "formatExclusiveMaximum": [ "formatMaximum" ],
        "formatExclusiveMinimum": [ "formatMinimum" ]
    },
    "default": {}
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187480, function(require, module, exports) {
'use strict';

var IDENTIFIER = /^[a-z_$][a-z0-9_$\-]*$/i;
var customRuleCode = require('./dotjs/custom');

module.exports = {
  add: addKeyword,
  get: getKeyword,
  remove: removeKeyword
};

/**
 * Define custom keyword
 * @this  Ajv
 * @param {String} keyword custom keyword, should be unique (including different from all standard, custom and macro keywords).
 * @param {Object} definition keyword definition object with properties `type` (type(s) which the keyword applies to), `validate` or `compile`.
 */
function addKeyword(keyword, definition) {
  /* jshint validthis: true */
  /* eslint no-shadow: 0 */
  var RULES = this.RULES;

  if (RULES.keywords[keyword])
    throw new Error('Keyword ' + keyword + ' is already defined');

  if (!IDENTIFIER.test(keyword))
    throw new Error('Keyword ' + keyword + ' is not a valid identifier');

  if (definition) {
    if (definition.macro && definition.valid !== undefined)
      throw new Error('"valid" option cannot be used with macro keywords');

    var dataType = definition.type;
    if (Array.isArray(dataType)) {
      var i, len = dataType.length;
      for (i=0; i<len; i++) checkDataType(dataType[i]);
      for (i=0; i<len; i++) _addRule(keyword, dataType[i], definition);
    } else {
      if (dataType) checkDataType(dataType);
      _addRule(keyword, dataType, definition);
    }

    var $data = definition.$data === true && this._opts.v5;
    if ($data && !definition.validate)
      throw new Error('$data support: "validate" function is not defined');

    var metaSchema = definition.metaSchema;
    if (metaSchema) {
      if ($data) {
        metaSchema = {
          anyOf: [
            metaSchema,
            { '$ref': 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/json-schema-v5.json#/definitions/$data' }
          ]
        };
      }
      definition.validateSchema = this.compile(metaSchema, true);
    }
  }

  RULES.keywords[keyword] = RULES.all[keyword] = true;


  function _addRule(keyword, dataType, definition) {
    var ruleGroup;
    for (var i=0; i<RULES.length; i++) {
      var rg = RULES[i];
      if (rg.type == dataType) {
        ruleGroup = rg;
        break;
      }
    }

    if (!ruleGroup) {
      ruleGroup = { type: dataType, rules: [] };
      RULES.push(ruleGroup);
    }

    var rule = {
      keyword: keyword,
      definition: definition,
      custom: true,
      code: customRuleCode
    };
    ruleGroup.rules.push(rule);
    RULES.custom[keyword] = rule;
  }


  function checkDataType(dataType) {
    if (!RULES.types[dataType]) throw new Error('Unknown type ' + dataType);
  }
}


/**
 * Get keyword
 * @this  Ajv
 * @param {String} keyword pre-defined or custom keyword.
 * @return {Object|Boolean} custom keyword definition, `true` if it is a predefined keyword, `false` otherwise.
 */
function getKeyword(keyword) {
  /* jshint validthis: true */
  var rule = this.RULES.custom[keyword];
  return rule ? rule.definition : this.RULES.keywords[keyword] || false;
}


/**
 * Remove keyword
 * @this  Ajv
 * @param {String} keyword pre-defined or custom keyword.
 */
function removeKeyword(keyword) {
  /* jshint validthis: true */
  var RULES = this.RULES;
  delete RULES.keywords[keyword];
  delete RULES.all[keyword];
  delete RULES.custom[keyword];
  for (var i=0; i<RULES.length; i++) {
    var rules = RULES[i].rules;
    for (var j=0; j<rules.length; j++) {
      if (rules[j].keyword == keyword) {
        rules.splice(j, 1);
        break;
      }
    }
  }
}

}, function(modId) { var map = {"./dotjs/custom":1536577187481}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187481, function(require, module, exports) {
'use strict';
module.exports = function generate_custom(it, $keyword) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $isData = it.opts.v5 && $schema && $schema.$data,
    $schemaValue;
  if ($isData) {
    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $rule = this,
    $definition = 'definition' + $lvl,
    $rDef = $rule.definition;
  var $compile, $inline, $macro, $ruleValidate, $validateCode;
  if ($isData && $rDef.$data) {
    $validateCode = 'keywordValidate' + $lvl;
    var $validateSchema = $rDef.validateSchema;
    out += ' var ' + ($definition) + ' = RULES.custom[\'' + ($keyword) + '\'].definition; var ' + ($validateCode) + ' = ' + ($definition) + '.validate;';
  } else {
    $ruleValidate = it.useCustomRule($rule, $schema, it.schema, it);
    $schemaValue = 'validate.schema' + $schemaPath;
    $validateCode = $ruleValidate.code;
    $compile = $rDef.compile;
    $inline = $rDef.inline;
    $macro = $rDef.macro;
  }
  var $ruleErrs = $validateCode + '.errors',
    $i = 'i' + $lvl,
    $ruleErr = 'ruleErr' + $lvl,
    $asyncKeyword = $rDef.async;
  if ($asyncKeyword && !it.async) throw new Error('async keyword in sync schema');
  if (!($inline || $macro)) {
    out += '' + ($ruleErrs) + ' = null;';
  }
  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
  if ($validateSchema) {
    out += ' ' + ($valid) + ' = ' + ($definition) + '.validateSchema(' + ($schemaValue) + '); if (' + ($valid) + ') {';
  }
  if ($inline) {
    if ($rDef.statements) {
      out += ' ' + ($ruleValidate.validate) + ' ';
    } else {
      out += ' ' + ($valid) + ' = ' + ($ruleValidate.validate) + '; ';
    }
  } else if ($macro) {
    var $it = it.util.copy(it);
    $it.level++;
    var $nextValid = 'valid' + $it.level;
    $it.schema = $ruleValidate.validate;
    $it.schemaPath = '';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var $code = it.validate($it).replace(/validate\.schema/g, $validateCode);
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' ' + ($code);
  } else {
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    out += '  ' + ($validateCode) + '.call( ';
    if (it.opts.passContext) {
      out += 'this';
    } else {
      out += 'self';
    }
    if ($compile || $rDef.schema === false) {
      out += ' , ' + ($data) + ' ';
    } else {
      out += ' , ' + ($schemaValue) + ' , ' + ($data) + ' , validate.schema' + (it.schemaPath) + ' ';
    }
    out += ' , (dataPath || \'\')';
    if (it.errorPath != '""') {
      out += ' + ' + (it.errorPath);
    }
    var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
      $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
    out += ' , ' + ($parentData) + ' , ' + ($parentDataProperty) + ' , rootData )  ';
    var def_callRuleValidate = out;
    out = $$outStack.pop();
    if ($rDef.errors === false) {
      out += ' ' + ($valid) + ' = ';
      if ($asyncKeyword) {
        out += '' + (it.yieldAwait);
      }
      out += '' + (def_callRuleValidate) + '; ';
    } else {
      if ($asyncKeyword) {
        $ruleErrs = 'customErrors' + $lvl;
        out += ' var ' + ($ruleErrs) + ' = null; try { ' + ($valid) + ' = ' + (it.yieldAwait) + (def_callRuleValidate) + '; } catch (e) { ' + ($valid) + ' = false; if (e instanceof ValidationError) ' + ($ruleErrs) + ' = e.errors; else throw e; } ';
      } else {
        out += ' ' + ($ruleErrs) + ' = null; ' + ($valid) + ' = ' + (def_callRuleValidate) + '; ';
      }
    }
  }
  if ($rDef.modifying) {
    out += ' ' + ($data) + ' = ' + ($parentData) + '[' + ($parentDataProperty) + '];';
  }
  if ($validateSchema) {
    out += ' }';
  }
  if ($rDef.valid) {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  } else {
    out += ' if ( ';
    if ($rDef.valid === undefined) {
      out += ' !';
      if ($macro) {
        out += '' + ($nextValid);
      } else {
        out += '' + ($valid);
      }
    } else {
      out += ' ' + (!$rDef.valid) + ' ';
    }
    out += ') { ';
    $errorKeyword = $rule.keyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { keyword: \'' + ($rule.keyword) + '\' } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should pass "' + ($rule.keyword) + '" keyword validation\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + (__err) + ']); ';
      } else {
        out += ' validate.errors = [' + (__err) + ']; return false; ';
      }
    } else {
      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    var def_customError = out;
    out = $$outStack.pop();
    if ($inline) {
      if ($rDef.errors) {
        if ($rDef.errors != 'full') {
          out += '  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + '; if (' + ($ruleErr) + '.schemaPath === undefined) { ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '"; } ';
          if (it.opts.verbose) {
            out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
          }
          out += ' } ';
        }
      } else {
        if ($rDef.errors === false) {
          out += ' ' + (def_customError) + ' ';
        } else {
          out += ' if (' + ($errs) + ' == errors) { ' + (def_customError) + ' } else {  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + '; if (' + ($ruleErr) + '.schemaPath === undefined) { ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '"; } ';
          if (it.opts.verbose) {
            out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
          }
          out += ' } } ';
        }
      }
    } else if ($macro) {
      out += '   var err =   '; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { keyword: \'' + ($rule.keyword) + '\' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should pass "' + ($rule.keyword) + '" keyword validation\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      if (!it.compositeRule && $breakOnError) { /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError(vErrors); ';
        } else {
          out += ' validate.errors = vErrors; return false; ';
        }
      }
    } else {
      if ($rDef.errors === false) {
        out += ' ' + (def_customError) + ' ';
      } else {
        out += ' if (Array.isArray(' + ($ruleErrs) + ')) { if (vErrors === null) vErrors = ' + ($ruleErrs) + '; else vErrors = vErrors.concat(' + ($ruleErrs) + '); errors = vErrors.length;  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + ';  ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '";  ';
        if (it.opts.verbose) {
          out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
        }
        out += ' } } else { ' + (def_customError) + ' } ';
      }
    }
    out += ' } ';
    if ($breakOnError) {
      out += ' else { ';
    }
  }
  return out;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187482, function(require, module, exports) {
module.exports = {
    "id": "http://json-schema.org/draft-04/schema#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Core schema meta-schema",
    "definitions": {
        "schemaArray": {
            "type": "array",
            "minItems": 1,
            "items": { "$ref": "#" }
        },
        "positiveInteger": {
            "type": "integer",
            "minimum": 0
        },
        "positiveIntegerDefault0": {
            "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
        },
        "simpleTypes": {
            "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
        },
        "stringArray": {
            "type": "array",
            "items": { "type": "string" },
            "minItems": 1,
            "uniqueItems": true
        }
    },
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri"
        },
        "$schema": {
            "type": "string",
            "format": "uri"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "default": {},
        "multipleOf": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        },
        "maximum": {
            "type": "number"
        },
        "exclusiveMaximum": {
            "type": "boolean",
            "default": false
        },
        "minimum": {
            "type": "number"
        },
        "exclusiveMinimum": {
            "type": "boolean",
            "default": false
        },
        "maxLength": { "$ref": "#/definitions/positiveInteger" },
        "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "pattern": {
            "type": "string",
            "format": "regex"
        },
        "additionalItems": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "items": {
            "anyOf": [
                { "$ref": "#" },
                { "$ref": "#/definitions/schemaArray" }
            ],
            "default": {}
        },
        "maxItems": { "$ref": "#/definitions/positiveInteger" },
        "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "uniqueItems": {
            "type": "boolean",
            "default": false
        },
        "maxProperties": { "$ref": "#/definitions/positiveInteger" },
        "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "required": { "$ref": "#/definitions/stringArray" },
        "additionalProperties": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "definitions": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "properties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "patternProperties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "dependencies": {
            "type": "object",
            "additionalProperties": {
                "anyOf": [
                    { "$ref": "#" },
                    { "$ref": "#/definitions/stringArray" }
                ]
            }
        },
        "enum": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true
        },
        "type": {
            "anyOf": [
                { "$ref": "#/definitions/simpleTypes" },
                {
                    "type": "array",
                    "items": { "$ref": "#/definitions/simpleTypes" },
                    "minItems": 1,
                    "uniqueItems": true
                }
            ]
        },
        "allOf": { "$ref": "#/definitions/schemaArray" },
        "anyOf": { "$ref": "#/definitions/schemaArray" },
        "oneOf": { "$ref": "#/definitions/schemaArray" },
        "not": { "$ref": "#" }
    },
    "dependencies": {
        "exclusiveMaximum": [ "maximum" ],
        "exclusiveMinimum": [ "minimum" ]
    },
    "default": {}
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187442);
})()
//# sourceMappingURL=index.js.map