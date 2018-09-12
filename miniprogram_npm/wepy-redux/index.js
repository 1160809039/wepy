module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577189062, function(require, module, exports) {
'use strict';

exports.__esModule = true;
exports.mapActions = exports.mapState = exports.getStore = exports.setStore = exports.connect = undefined;

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _store = require('./store');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.connect = _connect2.default;
exports.setStore = _store.setStore;
exports.getStore = _store.getStore;
exports.mapState = _helpers.mapState;
exports.mapActions = _helpers.mapActions;
}, function(modId) {var map = {"./connect":1536577189063,"./store":1536577189064,"./helpers":1536577189065}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189063, function(require, module, exports) {
'use strict';

exports.__esModule = true;
exports.default = connect;

var _store = require('../store');

var _helpers = require('../helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connect(states, actions) {
    states = (0, _helpers.mapState)(states || {});
    actions = (0, _helpers.mapActions)(actions || {});
    return function connectComponent(Component) {
        var unSubscribe = null;

        var _onLoad = Component.prototype.onLoad;
        var _onUnload = Component.prototype.onUnload;

        var onStateChange = function onStateChange() {
            var _this = this;

            var store = (0, _store.getStore)();
            var hasChanged = false;
            Object.keys(states).forEach(function (k) {
                var newV = states[k].call(_this);
                if (_this[k] !== newV) {
                    _this[k] = newV;
                    hasChanged = true;
                }
            });
            hasChanged && this.$apply();
        };
        return function (_Component) {
            _inherits(_class, _Component);

            function _class() {
                _classCallCheck(this, _class);

                var _this2 = _possibleConstructorReturn(this, _Component.call(this));

                _this2.computed = Object.assign(_this2.computed || {}, states);
                _this2.methods = Object.assign(_this2.methods || {}, actions);
                return _this2;
            }

            _class.prototype.onLoad = function onLoad() {
                var store = (0, _store.getStore)();
                unSubscribe = store.subscribe(onStateChange.bind(this));
                onStateChange.call(this);
                _onLoad && _onLoad.apply(this, arguments);
            };

            _class.prototype.onUnload = function onUnload() {
                unSubscribe && unSubscribe();
                unSubscribe = null;
                _onUnload && _onUnload.apply(this, arguments);
            };

            return _class;
        }(Component);
    };
};
}, function(modId) { var map = {"../store":1536577189064,"../helpers":1536577189065}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189064, function(require, module, exports) {
"use strict";

exports.__esModule = true;
exports.getStore = getStore;
exports.setStore = setStore;


var store = null;

function getStore() {
    return store;
}

function setStore(s) {
    store = s;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189065, function(require, module, exports) {
'use strict';

exports.__esModule = true;
exports.mapActions = exports.mapState = undefined;

var _store = require('../store');

var mapState = exports.mapState = function mapState(states) {
    var res = {};
    normalizeMap(states).forEach(function (_ref) {
        var key = _ref.key,
            val = _ref.val;

        res[key] = function mappedState() {
            var store = (0, _store.getStore)();
            var state = store.getState();
            return typeof val === 'function' ? val.call(this, state) : state[val];
        };
    });
    return res;
};

var mapActions = exports.mapActions = function mapActions(actions) {
    var res = {};
    normalizeMap(actions).forEach(function (_ref2) {
        var key = _ref2.key,
            val = _ref2.val;

        res[key] = function mappedAction() {
            var store = (0, _store.getStore)();
            var dispatchParam = void 0;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (typeof val === 'string') {
                dispatchParam = {
                    type: val,

                    payload: args.length > 1 ? args : args[0]
                };
            } else {
                dispatchParam = typeof val === 'function' ? val.apply(store, args) : val;
            }
            return store.dispatch.call(store, dispatchParam);
        };
    });
    return res;
};

function normalizeMap(map) {
    return Array.isArray(map) ? map.map(function (key) {
        return { key: key, val: key };
    }) : Object.keys(map).map(function (key) {
        return { key: key, val: map[key] };
    });
}
}, function(modId) { var map = {"../store":1536577189064}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577189062);
})()
//# sourceMappingURL=index.js.map