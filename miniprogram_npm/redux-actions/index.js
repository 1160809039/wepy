module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577188924, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleActions = exports.handleAction = exports.createCurriedAction = exports.createActions = exports.createAction = exports.combineActions = undefined;

var _combineActions = require('./combineActions');

var _combineActions2 = _interopRequireDefault(_combineActions);

var _createAction = require('./createAction');

var _createAction2 = _interopRequireDefault(_createAction);

var _createActions = require('./createActions');

var _createActions2 = _interopRequireDefault(_createActions);

var _createCurriedAction = require('./createCurriedAction');

var _createCurriedAction2 = _interopRequireDefault(_createCurriedAction);

var _handleAction = require('./handleAction');

var _handleAction2 = _interopRequireDefault(_handleAction);

var _handleActions = require('./handleActions');

var _handleActions2 = _interopRequireDefault(_handleActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.combineActions = _combineActions2.default;
exports.createAction = _createAction2.default;
exports.createActions = _createActions2.default;
exports.createCurriedAction = _createCurriedAction2.default;
exports.handleAction = _handleAction2.default;
exports.handleActions = _handleActions2.default;
}, function(modId) {var map = {"./combineActions":1536577188925,"./createAction":1536577188932,"./createActions":1536577188935,"./createCurriedAction":1536577188947,"./handleAction":1536577188948,"./handleActions":1536577188950}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188925, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineActions;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _isFunction = require('./utils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isSymbol = require('./utils/isSymbol');

var _isSymbol2 = _interopRequireDefault(_isSymbol);

var _isEmpty = require('./utils/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _toString = require('./utils/toString');

var _toString2 = _interopRequireDefault(_toString);

var _isString = require('./utils/isString');

var _isString2 = _interopRequireDefault(_isString);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidActionType(type) {
  return (0, _isString2.default)(type) || (0, _isFunction2.default)(type) || (0, _isSymbol2.default)(type);
}

function isValidActionTypes(types) {
  if ((0, _isEmpty2.default)(types)) {
    return false;
  }
  return types.every(isValidActionType);
}

function combineActions() {
  for (var _len = arguments.length, actionsTypes = Array(_len), _key = 0; _key < _len; _key++) {
    actionsTypes[_key] = arguments[_key];
  }

  (0, _invariant2.default)(isValidActionTypes(actionsTypes), 'Expected action types to be strings, symbols, or action creators');
  var combinedActionType = actionsTypes.map(_toString2.default).join(_constants.ACTION_TYPE_DELIMITER);
  return { toString: function toString() {
      return combinedActionType;
    } };
}
}, function(modId) { var map = {"./utils/isFunction":1536577188926,"./utils/isSymbol":1536577188927,"./utils/isEmpty":1536577188928,"./utils/toString":1536577188929,"./utils/isString":1536577188930,"./constants":1536577188931}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188926, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return typeof value === 'function';
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188927, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.prototype.toString.call(value) === '[object Symbol]';
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188928, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value.length === 0;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188929, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value.toString();
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188930, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return typeof value === 'string';
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188931, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_NAMESPACE = exports.DEFAULT_NAMESPACE = '/';
var ACTION_TYPE_DELIMITER = exports.ACTION_TYPE_DELIMITER = '||';
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188932, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAction;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _isFunction = require('./utils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _identity = require('./utils/identity');

var _identity2 = _interopRequireDefault(_identity);

var _isNull = require('./utils/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAction(type) {
  var payloadCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _identity2.default;
  var metaCreator = arguments[2];

  (0, _invariant2.default)((0, _isFunction2.default)(payloadCreator) || (0, _isNull2.default)(payloadCreator), 'Expected payloadCreator to be a function, undefined or null');

  var finalPayloadCreator = (0, _isNull2.default)(payloadCreator) || payloadCreator === _identity2.default ? _identity2.default : function (head) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return head instanceof Error ? head : payloadCreator.apply(undefined, [head].concat(args));
  };

  var hasMeta = (0, _isFunction2.default)(metaCreator);
  var typeString = type.toString();

  var actionCreator = function actionCreator() {
    var payload = finalPayloadCreator.apply(undefined, arguments);
    var action = { type: type };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      action.meta = metaCreator.apply(undefined, arguments);
    }

    return action;
  };

  actionCreator.toString = function () {
    return typeString;
  };

  return actionCreator;
}
}, function(modId) { var map = {"./utils/isFunction":1536577188926,"./utils/identity":1536577188933,"./utils/isNull":1536577188934}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188933, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188934, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value === null;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188935, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createActions;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _isPlainObject = require('./utils/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isFunction = require('./utils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _identity = require('./utils/identity');

var _identity2 = _interopRequireDefault(_identity);

var _isArray = require('./utils/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isString = require('./utils/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isNil = require('./utils/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _getLastElement = require('./utils/getLastElement');

var _getLastElement2 = _interopRequireDefault(_getLastElement);

var _camelCase = require('./utils/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _arrayToObject = require('./utils/arrayToObject');

var _arrayToObject2 = _interopRequireDefault(_arrayToObject);

var _flattenActionMap = require('./utils/flattenActionMap');

var _flattenActionMap2 = _interopRequireDefault(_flattenActionMap);

var _unflattenActionCreators = require('./utils/unflattenActionCreators');

var _unflattenActionCreators2 = _interopRequireDefault(_unflattenActionCreators);

var _createAction = require('./createAction');

var _createAction2 = _interopRequireDefault(_createAction);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createActions(actionMap) {
  for (var _len = arguments.length, identityActions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    identityActions[_key - 1] = arguments[_key];
  }

  var options = (0, _isPlainObject2.default)((0, _getLastElement2.default)(identityActions)) ? identityActions.pop() : {};
  (0, _invariant2.default)(identityActions.every(_isString2.default) && ((0, _isString2.default)(actionMap) || (0, _isPlainObject2.default)(actionMap)), 'Expected optional object followed by string action types');
  if ((0, _isString2.default)(actionMap)) {
    return actionCreatorsFromIdentityActions([actionMap].concat(identityActions), options);
  }
  return _extends({}, actionCreatorsFromActionMap(actionMap, options), actionCreatorsFromIdentityActions(identityActions, options));
}

function actionCreatorsFromActionMap(actionMap, options) {
  var flatActionMap = (0, _flattenActionMap2.default)(actionMap, options);
  var flatActionCreators = actionMapToActionCreators(flatActionMap);
  return (0, _unflattenActionCreators2.default)(flatActionCreators, options);
}

function actionMapToActionCreators(actionMap) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      prefix = _ref.prefix,
      _ref$namespace = _ref.namespace,
      namespace = _ref$namespace === undefined ? _constants.DEFAULT_NAMESPACE : _ref$namespace;

  function isValidActionMapValue(actionMapValue) {
    if ((0, _isFunction2.default)(actionMapValue) || (0, _isNil2.default)(actionMapValue)) {
      return true;
    }

    if ((0, _isArray2.default)(actionMapValue)) {
      var _actionMapValue = _slicedToArray(actionMapValue, 2),
          _actionMapValue$ = _actionMapValue[0],
          payload = _actionMapValue$ === undefined ? _identity2.default : _actionMapValue$,
          meta = _actionMapValue[1];

      return (0, _isFunction2.default)(payload) && (0, _isFunction2.default)(meta);
    }

    return false;
  }

  return (0, _arrayToObject2.default)(Object.keys(actionMap), function (partialActionCreators, type) {
    var actionMapValue = actionMap[type];
    (0, _invariant2.default)(isValidActionMapValue(actionMapValue), 'Expected function, undefined, null, or array with payload and meta ' + ('functions for ' + type));
    var prefixedType = prefix ? '' + prefix + namespace + type : type;
    var actionCreator = (0, _isArray2.default)(actionMapValue) ? _createAction2.default.apply(undefined, [prefixedType].concat(_toConsumableArray(actionMapValue))) : (0, _createAction2.default)(prefixedType, actionMapValue);
    return _extends({}, partialActionCreators, _defineProperty({}, type, actionCreator));
  });
}

function actionCreatorsFromIdentityActions(identityActions, options) {
  var actionMap = (0, _arrayToObject2.default)(identityActions, function (partialActionMap, type) {
    return _extends({}, partialActionMap, _defineProperty({}, type, _identity2.default));
  });
  var actionCreators = actionMapToActionCreators(actionMap, options);
  return (0, _arrayToObject2.default)(Object.keys(actionCreators), function (partialActionCreators, type) {
    return _extends({}, partialActionCreators, _defineProperty({}, (0, _camelCase2.default)(type), actionCreators[type]));
  });
}
}, function(modId) { var map = {"./utils/isPlainObject":1536577188936,"./utils/isFunction":1536577188926,"./utils/identity":1536577188933,"./utils/isArray":1536577188937,"./utils/isString":1536577188930,"./utils/isNil":1536577188938,"./utils/getLastElement":1536577188939,"./utils/camelCase":1536577188940,"./utils/arrayToObject":1536577188941,"./utils/flattenActionMap":1536577188942,"./utils/unflattenActionCreators":1536577188946,"./createAction":1536577188932,"./constants":1536577188931}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188936, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (value) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || value === null) return false;

  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188937, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return Array.isArray(value);
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188938, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value === null || value === undefined;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188939, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (array) {
  return array[array.length - 1];
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188940, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespacer = '/';

exports.default = function (type) {
  return type.indexOf(namespacer) === -1 ? (0, _lodash2.default)(type) : type.split(namespacer).map(function (part) {
    return (0, _lodash2.default)(part);
  }).join(namespacer);
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188941, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (array, callback) {
  return array.reduce(function (partialObject, element) {
    return callback(partialObject, element);
  }, {});
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188942, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _flattenWhenNode = require('./flattenWhenNode');

var _flattenWhenNode2 = _interopRequireDefault(_flattenWhenNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _flattenWhenNode2.default)(_isPlainObject2.default);
}, function(modId) { var map = {"./isPlainObject":1536577188936,"./flattenWhenNode":1536577188943}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188943, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _isMap = require('./isMap');

var _isMap2 = _interopRequireDefault(_isMap);

var _ownKeys = require('./ownKeys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function get(key, x) {
  return (0, _isMap2.default)(x) ? x.get(key) : x[key];
}

exports.default = function (predicate) {
  return function flatten(map) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$namespace = _ref.namespace,
        namespace = _ref$namespace === undefined ? _constants.DEFAULT_NAMESPACE : _ref$namespace,
        prefix = _ref.prefix;

    var partialFlatMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var partialFlatActionType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    function connectNamespace(type) {
      var _ref2;

      if (!partialFlatActionType) return type;
      var types = type.toString().split(_constants.ACTION_TYPE_DELIMITER);
      var partials = partialFlatActionType.split(_constants.ACTION_TYPE_DELIMITER);
      return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(partials.map(function (p) {
        return types.map(function (t) {
          return '' + p + namespace + t;
        });
      }))).join(_constants.ACTION_TYPE_DELIMITER);
    }

    function connectPrefix(type) {
      if (partialFlatActionType || !prefix) {
        return type;
      }

      return '' + prefix + namespace + type;
    }

    (0, _ownKeys2.default)(map).forEach(function (type) {
      var nextNamespace = connectPrefix(connectNamespace(type));
      var mapValue = get(type, map);

      if (predicate(mapValue)) {
        flatten(mapValue, { namespace: namespace, prefix: prefix }, partialFlatMap, nextNamespace);
      } else {
        partialFlatMap[nextNamespace] = mapValue;
      }
    });

    return partialFlatMap;
  };
};
}, function(modId) { var map = {"../constants":1536577188931,"./isMap":1536577188944,"./ownKeys":1536577188945}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188944, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value instanceof Map;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188945, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ownKeys;

var _isMap = require('./isMap');

var _isMap2 = _interopRequireDefault(_isMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object) {
  if ((0, _isMap2.default)(object)) {
    return Array.from(object.keys());
  }

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    return Reflect.ownKeys(object);
  }

  var keys = Object.getOwnPropertyNames(object);

  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(object));
  }

  return keys;
}
}, function(modId) { var map = {"./isMap":1536577188944}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188946, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unflattenActionCreators;

var _constants = require('../constants');

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _camelCase = require('./camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unflattenActionCreators(flatActionCreators) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$namespace = _ref.namespace,
      namespace = _ref$namespace === undefined ? _constants.DEFAULT_NAMESPACE : _ref$namespace,
      prefix = _ref.prefix;

  function unflatten(flatActionType) {
    var partialNestedActionCreators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var partialFlatActionTypePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var nextNamespace = (0, _camelCase2.default)(partialFlatActionTypePath.shift());
    if ((0, _isEmpty2.default)(partialFlatActionTypePath)) {
      partialNestedActionCreators[nextNamespace] = flatActionCreators[flatActionType];
    } else {
      if (!partialNestedActionCreators[nextNamespace]) {
        partialNestedActionCreators[nextNamespace] = {};
      }
      unflatten(flatActionType, partialNestedActionCreators[nextNamespace], partialFlatActionTypePath);
    }
  }

  var nestedActionCreators = {};
  Object.getOwnPropertyNames(flatActionCreators).forEach(function (type) {
    var unprefixedType = prefix ? type.replace('' + prefix + namespace, '') : type;
    return unflatten(type, nestedActionCreators, unprefixedType.split(namespace));
  });

  return nestedActionCreators;
}
}, function(modId) { var map = {"../constants":1536577188931,"./isEmpty":1536577188928,"./camelCase":1536577188940}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188947, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.curry');

var _lodash2 = _interopRequireDefault(_lodash);

var _createAction = require('./createAction');

var _createAction2 = _interopRequireDefault(_createAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (type, payloadCreator) {
  return (0, _lodash2.default)((0, _createAction2.default)(type, payloadCreator), payloadCreator.length);
};
}, function(modId) { var map = {"./createAction":1536577188932}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188948, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = handleAction;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _isFunction = require('./utils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isPlainObject = require('./utils/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _identity = require('./utils/identity');

var _identity2 = _interopRequireDefault(_identity);

var _isNil = require('./utils/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _isUndefined = require('./utils/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _toString = require('./utils/toString');

var _toString2 = _interopRequireDefault(_toString);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleAction(type) {
  var reducer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _identity2.default;
  var defaultState = arguments[2];

  var types = (0, _toString2.default)(type).split(_constants.ACTION_TYPE_DELIMITER);
  (0, _invariant2.default)(!(0, _isUndefined2.default)(defaultState), 'defaultState for reducer handling ' + types.join(', ') + ' should be defined');
  (0, _invariant2.default)((0, _isFunction2.default)(reducer) || (0, _isPlainObject2.default)(reducer), 'Expected reducer to be a function or object with next and throw reducers');

  var _ref = (0, _isFunction2.default)(reducer) ? [reducer, reducer] : [reducer.next, reducer.throw].map(function (aReducer) {
    return (0, _isNil2.default)(aReducer) ? _identity2.default : aReducer;
  }),
      _ref2 = _slicedToArray(_ref, 2),
      nextReducer = _ref2[0],
      throwReducer = _ref2[1];

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];
    var actionType = action.type;

    if (!actionType || types.indexOf((0, _toString2.default)(actionType)) === -1) {
      return state;
    }

    return (action.error === true ? throwReducer : nextReducer)(state, action);
  };
}
}, function(modId) { var map = {"./utils/isFunction":1536577188926,"./utils/isPlainObject":1536577188936,"./utils/identity":1536577188933,"./utils/isNil":1536577188938,"./utils/isUndefined":1536577188949,"./utils/toString":1536577188929,"./constants":1536577188931}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188949, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value === undefined;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188950, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleActions;

var _reduceReducers = require('reduce-reducers');

var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _isPlainObject = require('./utils/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isMap = require('./utils/isMap');

var _isMap2 = _interopRequireDefault(_isMap);

var _ownKeys = require('./utils/ownKeys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _flattenReducerMap = require('./utils/flattenReducerMap');

var _flattenReducerMap2 = _interopRequireDefault(_flattenReducerMap);

var _handleAction = require('./handleAction');

var _handleAction2 = _interopRequireDefault(_handleAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function get(key, x) {
  return (0, _isMap2.default)(x) ? x.get(key) : x[key];
}

function handleActions(handlers, defaultState) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  (0, _invariant2.default)((0, _isPlainObject2.default)(handlers) || (0, _isMap2.default)(handlers), 'Expected handlers to be a plain object.');
  var flattenedReducerMap = (0, _flattenReducerMap2.default)(handlers, options);
  var reducers = (0, _ownKeys2.default)(flattenedReducerMap).map(function (type) {
    return (0, _handleAction2.default)(type, get(type, flattenedReducerMap), defaultState);
  });
  var reducer = _reduceReducers2.default.apply(undefined, _toConsumableArray(reducers));
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];
    return reducer(state, action);
  };
}
}, function(modId) { var map = {"./utils/isPlainObject":1536577188936,"./utils/isMap":1536577188944,"./utils/ownKeys":1536577188945,"./utils/flattenReducerMap":1536577188951,"./handleAction":1536577188948}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188951, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isMap = require('./isMap');

var _isMap2 = _interopRequireDefault(_isMap);

var _hasGeneratorInterface = require('./hasGeneratorInterface');

var _hasGeneratorInterface2 = _interopRequireDefault(_hasGeneratorInterface);

var _flattenWhenNode = require('./flattenWhenNode');

var _flattenWhenNode2 = _interopRequireDefault(_flattenWhenNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _flattenWhenNode2.default)(function (node) {
  return ((0, _isPlainObject2.default)(node) || (0, _isMap2.default)(node)) && !(0, _hasGeneratorInterface2.default)(node);
});
}, function(modId) { var map = {"./isPlainObject":1536577188936,"./isMap":1536577188944,"./hasGeneratorInterface":1536577188952,"./flattenWhenNode":1536577188943}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188952, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasGeneratorInterface;

var _ownKeys = require('./ownKeys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasGeneratorInterface(handler) {
  var keys = (0, _ownKeys2.default)(handler);
  var hasOnlyInterfaceNames = keys.every(function (ownKey) {
    return ownKey === 'next' || ownKey === 'throw';
  });
  return keys.length && keys.length <= 2 && hasOnlyInterfaceNames;
}
}, function(modId) { var map = {"./ownKeys":1536577188945}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577188924);
})()
//# sourceMappingURL=index.js.map