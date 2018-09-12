module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577189066, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    event: _event2.default,
    app: _app2.default,
    component: _component2.default,
    page: _page2.default,
    mixin: _mixin2.default,

    $createApp: _base2.default.$createApp,
    $createPage: _base2.default.$createPage,

    $isEmpty: _util2.default.$isEmpty,
    $isEqual: _util2.default.$isEqual,
    $isDeepEqual: _util2.default.$isDeepEqual,
    $has: _util2.default.$has,
    $extend: _util2.default.$extend,
    $isPlainObject: _util2.default.$isPlainObject,
    $copy: _util2.default.$copy
};
//# sourceMappingURL=wepy.js.map
}, function(modId) {var map = {"./app":1536577189067,"./page":1536577189069,"./component":1536577189070,"./event":1536577189071,"./base":1536577189073,"./util":1536577189072,"./mixin":1536577189074}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189067, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _native = require('./native');

var _native2 = _interopRequireDefault(_native);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestMQ = {
    map: {},
    mq: [],
    running: [],
    MAX_REQUEST: 5,
    push: function push(param) {
        param.t = +new Date();
        while (this.mq.indexOf(param.t) > -1 || this.running.indexOf(param.t) > -1) {
            param.t += Math.random() * 10 >> 0;
        }
        this.mq.push(param.t);
        this.map[param.t] = param;
    },
    next: function next() {
        var me = this;

        if (this.mq.length === 0) return;

        if (this.running.length < this.MAX_REQUEST - 1) {
            var newone = this.mq.shift();
            var obj = this.map[newone];
            var oldComplete = obj.complete;
            obj.complete = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                me.running.splice(me.running.indexOf(obj.t), 1);
                delete me.map[obj.t];
                oldComplete && oldComplete.apply(obj, args);
                me.next();
            };
            this.running.push(obj.t);
            return wx.request(obj);
        }
    },
    request: function request(obj) {

        obj = obj || {};
        obj = typeof obj === 'string' ? { url: obj } : obj;

        this.push(obj);

        return this.next();
    }
};

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.$addons = {};
        this.$interceptors = {};
        this.$pages = {};
    }

    _createClass(_class, [{
        key: '$init',
        value: function $init(wepy) {
            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this.$initAPI(wepy, config.noPromiseAPI);
            this.$wxapp = getApp();
        }
    }, {
        key: 'use',
        value: function use(addon) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            if (typeof addon === 'string' && this[addon]) {
                this.$addons[addon] = 1;
                this[addon](args);
            } else {
                this.$addons[addon.name] = new addon(args);
            }
        }
    }, {
        key: 'intercept',
        value: function intercept(api, provider) {
            this.$interceptors[api] = provider;
        }
    }, {
        key: 'promisify',
        value: function promisify() {}
    }, {
        key: 'requestfix',
        value: function requestfix() {}
    }, {
        key: '$initAPI',
        value: function $initAPI(wepy, noPromiseAPI) {
            var self = this;
            var noPromiseMethods = {
                stopRecord: true,
                getRecorderManager: true,
                pauseVoice: true,
                stopVoice: true,
                pauseBackgroundAudio: true,
                stopBackgroundAudio: true,
                getBackgroundAudioManager: true,
                createAudioContext: true,
                createInnerAudioContext: true,
                createVideoContext: true,
                createCameraContext: true,

                createMapContext: true,

                canIUse: true,
                startAccelerometer: true,
                stopAccelerometer: true,
                startCompass: true,
                stopCompass: true,
                onBLECharacteristicValueChange: true,
                onBLEConnectionStateChange: true,

                hideToast: true,
                hideLoading: true,
                showNavigationBarLoading: true,
                hideNavigationBarLoading: true,
                navigateBack: true,
                createAnimation: true,
                pageScrollTo: true,
                createSelectorQuery: true,
                createCanvasContext: true,
                createContext: true,
                drawCanvas: true,
                hideKeyboard: true,
                stopPullDownRefresh: true,

                reportAnalytics: true,

                arrayBufferToBase64: true,
                base64ToArrayBuffer: true
            };
            if (noPromiseAPI) {
                if (Array.isArray(noPromiseAPI)) {
                    noPromiseAPI.forEach(function (v) {
                        return noPromiseMethods[v] = true;
                    });
                } else {
                    for (var k in noPromiseAPI) {
                        noPromiseMethods[k] = noPromiseAPI[k];
                    }
                }
            }
            Object.keys(wx).forEach(function (key) {
                if (!noPromiseMethods[key] && key.substr(0, 2) !== 'on' && !/\w+Sync$/.test(key)) {
                    Object.defineProperty(_native2.default, key, {
                        get: function get() {
                            return function (obj) {
                                obj = obj || {};
                                if (self.$interceptors[key] && self.$interceptors[key].config) {
                                    var rst = self.$interceptors[key].config.call(self, obj);
                                    if (rst === false) {
                                        if (self.$addons.promisify) {
                                            return Promise.reject('aborted by interceptor');
                                        } else {
                                            obj.fail && obj.fail('aborted by interceptor');
                                            return;
                                        }
                                    }
                                    obj = rst;
                                }
                                if (key === 'request') {
                                    obj = typeof obj === 'string' ? { url: obj } : obj;
                                }
                                if (typeof obj === 'string') {
                                    return wx[key](obj);
                                }
                                if (self.$addons.promisify) {
                                    var task = void 0;
                                    var p = new Promise(function (resolve, reject) {
                                        var bak = {};
                                        ['fail', 'success', 'complete'].forEach(function (k) {
                                            bak[k] = obj[k];
                                            obj[k] = function (res) {
                                                if (self.$interceptors[key] && self.$interceptors[key][k]) {
                                                    res = self.$interceptors[key][k].call(self, res);
                                                }
                                                if (k === 'success') resolve(res);else if (k === 'fail') reject(res);
                                            };
                                        });
                                        if (self.$addons.requestfix && key === 'request') {
                                            RequestMQ.request(obj);
                                        } else {
                                            task = wx[key](obj);
                                        }
                                    });
                                    if (key === 'uploadFile' || key === 'downloadFile') {
                                        p.progress = function (cb) {
                                            task.onProgressUpdate(cb);
                                            return p;
                                        };
                                        p.abort = function (cb) {
                                            cb && cb();
                                            task.abort();
                                            return p;
                                        };
                                    }
                                    return p;
                                } else {
                                    var bak = {};
                                    ['fail', 'success', 'complete'].forEach(function (k) {
                                        bak[k] = obj[k];
                                        obj[k] = function (res) {
                                            if (self.$interceptors[key] && self.$interceptors[key][k]) {
                                                res = self.$interceptors[key][k].call(self, res);
                                            }
                                            bak[k] && bak[k].call(self, res);
                                        };
                                    });
                                    if (self.$addons.requestfix && key === 'request') {
                                        RequestMQ.request(obj);
                                    } else {
                                        return wx[key](obj);
                                    }
                                }
                            };
                        }
                    });
                    wepy[key] = _native2.default[key];
                } else {
                    Object.defineProperty(_native2.default, key, {
                        get: function get() {
                            return function () {
                                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                                    args[_key3] = arguments[_key3];
                                }

                                return wx[key].apply(wx, args);
                            };
                        }
                    });
                    wepy[key] = _native2.default[key];
                }
            });
        }
    }]);

    return _class;
}();

exports.default = _class;
//# sourceMappingURL=app.js.map
}, function(modId) { var map = {"./native":1536577189068}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189068, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};
//# sourceMappingURL=native.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189069, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _native = require('./native');

var _native2 = _interopRequireDefault(_native);

var _component2 = require('./component');

var _component3 = _interopRequireDefault(_component2);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_component) {
    _inherits(_class, _component);

    function _class() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.$isComponent = false, _this.$preloadData = undefined, _this.$prefetchData = undefined, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class, [{
        key: '$init',
        value: function $init(wxpage, $parent) {

            this.$parent = $parent;
            this.$root = this;
            if (!$parent.$wxapp) {
                $parent.$wxapp = getApp();
            }
            this.$wxapp = $parent.$wxapp;
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), '$init', this).call(this, wxpage, this);
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'onLoad', this).call(this);
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'onUnload', this).call(this);
        }
    }, {
        key: '$preload',
        value: function $preload(key, data) {
            if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
                var k = void 0;
                for (k in key) {
                    this.$preload(k, key[k]);
                }
            } else {
                (this.$preloadData ? this.$preloadData : this.$preloadData = {})[key] = data;
            }
        }
    }, {
        key: '$route',
        value: function $route(type, url) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (typeof url === 'string') {
                var s = url + '?';
                if (params) {
                    var k = void 0;
                    for (k in params) {
                        s += k + '=' + params[k] + '&';
                    }
                }
                s = s.substring(0, s.length - 1);
                url = { url: s };
            } else {
                params = _util2.default.$getParams(url.url);
            }

            if (!this.$parent.__route__) {
                this.$parent.__route__ = getCurrentPages()[0].__route__;
                this.$parent.__wxWebviewId__ = getCurrentPages()[0].__wxWebviewId__;
            }
            var absoluteRoute = this.$parent.__route__[0] !== '/' ? '/' + this.$parent.__route__ : this.$parent.__route__;
            var realPath = _util2.default.$resolvePath(absoluteRoute, url.url.split('?')[0]);
            var goTo = this.$parent.$pages[realPath];
            if (goTo && goTo.onPrefetch) {
                var prevPage = this.$parent.__prevPage__;
                var preloadData = undefined;
                if (prevPage && prevPage.$preloadData) {
                    preloadData = prevPage.$preloadData;
                }
                goTo.$prefetchData = goTo.onPrefetch(params, { from: this, preload: preloadData });
            }
            return _native2.default[type](url);
        }
    }, {
        key: '$redirect',
        value: function $redirect(url, params) {
            return this.$route('redirectTo', url, params);
        }
    }, {
        key: '$navigate',
        value: function $navigate(url, params) {
            return this.$route('navigateTo', url, params);
        }
    }, {
        key: '$switch',
        value: function $switch(url) {
            if (typeof url === 'string') url = { url: url };

            return _native2.default.switchTab(url);
        }
    }, {
        key: '$back',
        value: function $back(delta) {
            var p = delta || {};
            if (typeof p === 'number') p = { delta: p };

            if (!p.delta) p.delta = 1;

            return _native2.default.navigateBack(p);
        }
    }]);

    return _class;
}(_component3.default);

exports.default = _class;
//# sourceMappingURL=page.js.map
}, function(modId) { var map = {"./native":1536577189068,"./component":1536577189070,"./util":1536577189072}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189070, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Props = {
    check: function check(t, val) {
        switch (t) {
            case String:
                return typeof val === 'string';
            case Number:
                return typeof val === 'number';
            case Boolean:
                return typeof val === 'boolean';
            case Function:
                return typeof val === 'function';
            case Object:
                return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
            case Array:
                return toString.call(val) === '[object Array]';
            default:
                return val instanceof t;
        }
    },
    build: function build(props) {
        var rst = {};
        if (typeof props === 'string') {
            rst[props] = {};
        } else if (toString.call(props) === '[object Array]') {
            props.forEach(function (p) {
                rst[p] = {};
            });
        } else {
            Object.keys(props).forEach(function (p) {
                if (typeof props[p] === 'function') {
                    rst[p] = {
                        type: [props[p]]
                    };
                } else if (toString.call(props[p]) === '[object Array]') {
                    rst[p] = {
                        type: props[p]
                    };
                } else rst[p] = props[p];

                if (rst[p].type && toString.call(rst[p].type) !== '[object Array]') rst[p].type = [rst[p].type];
            });
        }
        return rst;
    },
    valid: function valid(props, key, val) {
        var _this = this;

        var valid = false;
        if (props[key]) {
            if (!props[key].type) {
                valid = true;
            } else {
                return props[key].type.some(function (t) {
                    return _this.check(t, val);
                });
            }
        }
        return valid;
    },
    getValue: function getValue(props, key, value, com) {
        var rst;
        if (value !== undefined && this.valid(props, key, value)) {
            rst = value;
        } else if (typeof props[key].default === 'function') {
            rst = props[key].default();
        } else rst = props[key].default;
        return props[key].coerce ? props[key].coerce.call(com, rst) : rst;
    }
};

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.$com = {};
        this.$events = {};
        this.$mixins = [];
        this.$isComponent = true;
        this.$prefix = '';
        this.$mappingProps = {};
        this.data = {};
        this.methods = {};
    }

    _createClass(_class, [{
        key: '$init',
        value: function $init($wxpage, $root, $parent) {
            var _this2 = this;

            var self = this;

            this.$wxpage = $wxpage;
            if (this.$isComponent) {
                this.$root = $root || this.$root;
                this.$parent = $parent || this.$parent;
                this.$wxapp = this.$root.$parent.$wxapp;
            }

            if (this.props) {
                this.props = Props.build(this.props);
            }

            var k = void 0,
                defaultData = {};

            var props = this.props;
            var key = void 0,
                val = void 0,
                binded = void 0;
            var inRepeat = false,
                repeatKey = void 0;

            if (this.$initData === undefined) {
                this.$initData = _util2.default.$copy(this.data, true);
            } else {
                this.data = _util2.default.$copy(this.$initData, true);
            }

            if (this.$props) {
                for (key in this.$props) {
                    for (binded in this.$props[key]) {
                        if (/\.sync$/.test(binded)) {
                            if (!this.$mappingProps[this.$props[key][binded]]) this.$mappingProps[this.$props[key][binded]] = {};
                            this.$mappingProps[this.$props[key][binded]][key] = binded.substring(7, binded.length - 5);
                        }
                    }
                }
            }

            if (props) {
                for (key in props) {
                    if (keyCheck(this, key)) {
                        val = undefined;
                        if ($parent && $parent.$props && $parent.$props[this.$name]) {
                            val = $parent.$props[this.$name][key];
                            binded = $parent.$props[this.$name]['v-bind:' + key + '.once'] || $parent.$props[this.$name]['v-bind:' + key + '.sync'];
                            if (binded) {
                                if ((typeof binded === 'undefined' ? 'undefined' : _typeof(binded)) === 'object') {
                                    (function () {
                                        props[key].repeat = binded.for;
                                        props[key].item = binded.item;
                                        props[key].index = binded.index;
                                        props[key].key = binded.key;
                                        props[key].value = binded.value;

                                        inRepeat = true;

                                        var bindfor = binded.for,
                                            binddata = $parent;
                                        bindfor.split('.').forEach(function (t) {
                                            binddata = binddata ? binddata[t] : {};
                                        });
                                        if (binddata && ((typeof binddata === 'undefined' ? 'undefined' : _typeof(binddata)) === 'object' || typeof binddata === 'string')) {
                                            repeatKey = Object.keys(binddata)[0];
                                        }

                                        if (!_this2.$mappingProps[key]) _this2.$mappingProps[key] = {};
                                        _this2.$mappingProps[key]['parent'] = {
                                            mapping: binded.for,
                                            from: key
                                        };
                                    })();
                                } else {
                                    val = $parent[binded];
                                    if (props[key].twoWay) {
                                        if (!this.$mappingProps[key]) this.$mappingProps[key] = {};
                                        this.$mappingProps[key]['parent'] = binded;
                                    }
                                }
                            } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.value !== undefined) {
                                this.data[key] = val.value;
                            }
                        }
                        if (!this.data[key] && !props[key].repeat) {
                            val = Props.getValue(props, key, val, this);
                            this.data[key] = val;
                        }
                    }
                }
            }

            if (typeof this.data === 'function') {
                this.data = this.data.apply(this.data);
            }

            for (k in this.data) {
                if (keyCheck(this, k)) {
                    defaultData['' + this.$prefix + k] = this.data[k];
                    this[k] = this.data[k];
                }
            }

            this.$data = _util2.default.$copy(this.data, true);
            if (inRepeat && repeatKey !== undefined) this.$setIndex(repeatKey);

            if (this.computed) {
                for (k in this.computed) {
                    if (keyCheck(this, k)) {
                        var fn = this.computed[k];
                        defaultData['' + this.$prefix + k] = fn.call(this);
                        this[k] = _util2.default.$copy(defaultData['' + this.$prefix + k], true);
                    }
                }
            }
            this.setData(defaultData);

            var coms = Object.getOwnPropertyNames(this.$com);
            if (coms.length) {
                coms.forEach(function (name) {
                    var com = _this2.$com[name];
                    com.$init(_this2.getWxPage(), $root, _this2);
                });
            }
        }
    }, {
        key: '$initMixins',
        value: function $initMixins() {
            var _this3 = this;

            if (this.mixins) {
                if (typeof this.mixins === 'function') {
                    this.mixins = [this.mixins];
                }
            } else {
                this.mixins = [];
            }
            this.mixins.forEach(function (mix) {
                var inst = new mix();
                inst.$init(_this3);
                _this3.$mixins.push(inst);
            });
        }
    }, {
        key: '$onLoad',
        value: function $onLoad() {
            var _this4 = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            [].concat(this.$mixins, this).forEach(function (mix) {
                mix['onLoad'] && mix['onLoad'].apply(_this4, args);
            });

            var coms = Object.getOwnPropertyNames(this.$com);
            if (coms.length) {
                coms.forEach(function (name) {
                    var com = _this4.$com[name];
                    com.$onLoad.call(com);
                });
            }
        }
    }, {
        key: '$onUnload',
        value: function $onUnload() {
            var _this5 = this;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var coms = Object.getOwnPropertyNames(this.$com);
            if (coms.length) {
                coms.forEach(function (name) {
                    var com = _this5.$com[name];
                    com.$onUnload.call(com);
                });
            }

            [].concat(this.$mixins, this).forEach(function (mix) {
                mix['onUnload'] && mix['onUnload'].apply(_this5, args);
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'onUnload',
        value: function onUnload() {}
    }, {
        key: 'setData',
        value: function setData(k, v) {
            if (typeof k === 'string') {
                if (v) {
                    var tmp = {};
                    tmp[k] = v;
                    k = tmp;
                } else {
                    var _tmp = {};
                    _tmp[k] = this.data['' + k];
                    k = _tmp;
                }
                return this.$wxpage.setData(k);
            }
            var t = null,
                reg = new RegExp('^' + this.$prefix.replace(/\$/g, '\\$'), 'ig');

            for (t in k) {
                var noPrefix = t.replace(reg, '');
                this.$data[noPrefix] = _util2.default.$copy(k[t], true);

                if (_util2.default.isImmutable(k[t])) {
                    k[t] = k[t].toJS();
                }

                if (k[t] === undefined) {
                    delete k[t];
                }
            }

            if (typeof v === 'function') {
                return this.$root.$wxpage.setData(k, v);
            }
            return this.$root.$wxpage.setData(k);
        }
    }, {
        key: 'getWxPage',
        value: function getWxPage() {
            return this.$wxpage;
        }
    }, {
        key: 'getCurrentPages',
        value: function (_getCurrentPages) {
            function getCurrentPages() {
                return _getCurrentPages.apply(this, arguments);
            }

            getCurrentPages.toString = function () {
                return _getCurrentPages.toString();
            };

            return getCurrentPages;
        }(function () {
            return getCurrentPages();
        })
    }, {
        key: '$setIndex',
        value: function $setIndex(index) {
            var _this6 = this;

            this.$index = index;

            var props = this.props,
                $parent = this.$parent;
            var key = void 0,
                val = void 0,
                binded = void 0;
            if (props) {
                for (key in props) {
                    val = undefined;
                    if ($parent && $parent.$props && $parent.$props[this.$name]) {
                        val = $parent.$props[this.$name][key];
                        binded = $parent.$props[this.$name]['v-bind:' + key + '.once'] || $parent.$props[this.$name]['v-bind:' + key + '.sync'];
                        if (binded) {
                            if ((typeof binded === 'undefined' ? 'undefined' : _typeof(binded)) === 'object') {
                                (function () {
                                    var bindfor = binded.for,
                                        binddata = $parent;

                                    if (bindfor.indexOf('[') === 0) {
                                        var bdarr = [];
                                        bindfor = bindfor.substr(1, bindfor.length - 2).trim();

                                        bindfor.split(',').forEach(function (e) {
                                            var bd = $parent;
                                            e.trim().split('.').forEach(function (t) {
                                                bd = bd ? bd[t] : {};
                                            });
                                            bdarr.push(bd);
                                        });

                                        binddata = bdarr;
                                    } else {
                                        bindfor.split('.').forEach(function (t) {
                                            binddata = binddata ? binddata[t] : {};
                                        });
                                    }

                                    index = Array.isArray(binddata) ? +index : index;

                                    if (props[key].value === props[key].item) {
                                        val = binddata[index];
                                    } else if (props[key].value === props[key].index) {
                                        val = index;
                                    } else if (props[key].value === props[key].key) {
                                        val = index;
                                    } else {
                                        val = $parent[props[key].value];
                                    }
                                    _this6.$index = index;
                                    _this6.data[key] = val;
                                    _this6[key] = val;
                                    _this6.$data[key] = _util2.default.$copy(_this6[key], true);
                                })();
                            }
                        }
                    }
                }

                for (key in this.$com) {
                    this.$com[key].$index = undefined;
                }
            }
        }
    }, {
        key: '$getComponent',
        value: function $getComponent(com) {
            var _this7 = this;

            if (typeof com === 'string') {
                if (com.indexOf('/') === -1) {
                    return this.$com[com];
                } else if (com === '/') {
                    return this.$parent;
                } else {
                    var path = com.split('/');
                    path.forEach(function (s, i) {
                        if (i === 0) {
                            if (s === '') {
                                com = _this7.$root;
                            } else if (s === '.') {
                                com = _this7;
                            } else if (s === '..') {
                                com = _this7.$parent;
                            } else {
                                com = _this7.$getComponent(s);
                            }
                        } else if (s) {
                            com = com.$com[s];
                        }
                    });
                }
            }
            return (typeof com === 'undefined' ? 'undefined' : _typeof(com)) !== 'object' ? null : com;
        }
    }, {
        key: '$invoke',
        value: function $invoke(com, method) {
            com = this.$getComponent(com);

            if (!com) {
                throw new Error('Invalid path: ' + com);
            }

            var fn = com.methods ? com.methods[method] : '';

            for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                args[_key3 - 2] = arguments[_key3];
            }

            if (typeof fn === 'function') {
                var $evt = new _event2.default('', this, 'invoke');
                var rst = fn.apply(com, args.concat($evt));
                com.$apply();
                return rst;
            } else {
                fn = com[method];
            }

            if (typeof fn === 'function') {
                return fn.apply(com, args);
            } else {
                throw new Error('Invalid method: ' + method);
            }
        }
    }, {
        key: '$broadcast',
        value: function $broadcast(evtName) {
            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = arguments[_key4];
            }

            var com = this;
            var $evt = typeof evtName === 'string' ? new _event2.default(evtName, this, 'broadcast') : $evt;
            var queue = [com];

            while (queue.length && $evt.active) {
                var current = queue.shift();

                var _loop = function _loop(_c) {
                    _c = current.$com[_c];
                    queue.push(_c);
                    var fn = getEventsFn(_c, evtName);
                    if (fn) {
                        _c.$apply(function () {
                            fn.apply(_c, args.concat($evt));
                        });
                    }
                    if (!$evt.active) return 'break';
                    c = _c;
                };

                for (var c in current.$com) {
                    var _ret3 = _loop(c);

                    if (_ret3 === 'break') break;
                }
            }
        }
    }, {
        key: '$emit',
        value: function $emit(evtName) {
            var _this8 = this;

            for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                args[_key5 - 1] = arguments[_key5];
            }

            var com = this;
            var source = this;
            var $evt = new _event2.default(evtName, source, 'emit');

            args = args.concat($evt);

            if (this.$parent && this.$parent.$events && this.$parent.$events[this.$name]) {
                var method = this.$parent.$events[this.$name]['v-on:' + evtName];
                if (method && this.$parent.methods) {
                    var _fn = this.$parent.methods[method];
                    if (typeof _fn === 'function') {
                        this.$parent.$apply(function () {
                            _fn.apply(_this8.$parent, args);
                        });
                        return;
                    } else {
                        throw new Error('Invalid method from emit, component is ' + this.$parent.$name + ', method is ' + method + '. Make sure you defined it already.\n');
                    }
                }
            }

            var _loop2 = function _loop2() {
                var comContext = com;
                var fn = getEventsFn(comContext, evtName);
                if (fn) {
                    if (typeof fn === 'function') {
                        comContext.$apply(function () {
                            fn.apply(comContext, args);
                        });
                    } else if (Array.isArray(fn)) {
                        fn.forEach(function (f) {
                            f.apply(comContext, args);
                        });
                        comContext.$apply();
                    }
                }
                com = comContext.$parent;
            };

            while (com && com.$isComponent !== undefined && $evt.active) {
                _loop2();
            }
        }
    }, {
        key: '$on',
        value: function $on(evtName, fn) {
            var _this9 = this;

            if (typeof evtName === 'string') {
                (this.$events[evtName] || (this.$events[evtName] = [])).push(fn);
            } else if (Array.isArray(evtName)) {
                evtName.forEach(function (k) {
                    _this9.$on(k, fn);
                });
            } else if ((typeof evtName === 'undefined' ? 'undefined' : _typeof(evtName)) === 'object') {
                for (var k in evtName) {
                    this.$on(k, evtName[k]);
                }
            }
            return this;
        }
    }, {
        key: '$once',
        value: function $once(evtName, fn) {
            var self = this;
            var oncefn = function oncefn() {
                self.$off(evtName, oncefn);
                fn.apply(self, arguments);
            };
            oncefn.fn = fn;
            this.$on(evtName, oncefn);
        }
    }, {
        key: '$off',
        value: function $off(evtName, fn) {
            var _this10 = this;

            if (evtName === undefined) {
                this.$events = {};
            } else if (typeof evtName === 'string') {
                if (fn) {
                    var fns = this.$events[evtName];
                    var i = fns.length;
                    while (i--) {
                        if (fn === fns[i] || fn === fns[i].fn) {
                            fns.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    this.$events[evtName] = [];
                }
            } else if (Array.isArray(evtName)) {
                evtName.forEach(function (k) {
                    _this10.$off(k, fn);
                });
            }
            return this;
        }
    }, {
        key: '$apply',
        value: function $apply(fn) {
            if (typeof fn === 'function') {
                fn.call(this);
                this.$apply();
            } else {
                if (this.$$phase) {
                    this.$$phase = '$apply';
                } else {
                    this.$digest();
                }
            }
        }
    }, {
        key: '$digest',
        value: function $digest() {
            var _this11 = this;

            var k = void 0;
            var originData = this.$data;
            this.$$phase = '$digest';
            this.$$dc = 0;
            while (this.$$phase) {
                this.$$dc++;
                if (this.$$dc >= 3) {
                    throw new Error('Can not call $apply in $apply process');
                }
                var readyToSet = {};
                if (this.computed) {
                    for (k in this.computed) {
                        var _fn2 = this.computed[k],
                            val = _fn2.call(this);
                        if (!_util2.default.$isEqual(this[k], val)) {
                            readyToSet[this.$prefix + k] = val;
                            this[k] = _util2.default.$copy(val, true);
                        }
                    }
                }
                for (k in originData) {
                    if (!_util2.default.$isEqual(this[k], originData[k])) {
                        if (this.watch) {
                            if (this.watch[k]) {
                                if (typeof this.watch[k] === 'function') {
                                    this.watch[k].call(this, this[k], originData[k]);
                                } else if (typeof this.watch[k] === 'string' && typeof this.methods[k] === 'function') {
                                    this.methods[k].call(this, this[k], originData[k]);
                                }
                            }
                        }

                        readyToSet[this.$prefix + k] = this[k];
                        this.data[k] = this[k];
                        originData[k] = _util2.default.$copy(this[k], true);
                        if (this.$repeat && this.$repeat[k]) {
                            var $repeat = this.$repeat[k];
                            this.$com[$repeat.com].data[$repeat.props] = this[k];
                            this.$com[$repeat.com].$setIndex(0);
                            this.$com[$repeat.com].$apply();
                        }
                        if (this.$mappingProps[k]) {
                            Object.keys(this.$mappingProps[k]).forEach(function (changed) {
                                var mapping = _this11.$mappingProps[k][changed];
                                if ((typeof mapping === 'undefined' ? 'undefined' : _typeof(mapping)) === 'object') {
                                    _this11.$parent.$apply();
                                } else if (changed === 'parent' && !_util2.default.$isEqual(_this11.$parent.$data[mapping], _this11[k])) {
                                    _this11.$parent[mapping] = _this11[k];
                                    _this11.$parent.data[mapping] = _this11[k];
                                    _this11.$parent.$apply();
                                } else if (changed !== 'parent' && !_util2.default.$isEqual(_this11.$com[changed].$data[mapping], _this11[k])) {
                                    _this11.$com[changed][mapping] = _this11[k];
                                    _this11.$com[changed].data[mapping] = _this11[k];
                                    _this11.$com[changed].$apply();
                                }
                            });
                        }
                    }
                }
                if (Object.keys(readyToSet).length) {
                    this.setData(readyToSet, function () {
                        if (_this11.$$nextTick) {
                            var $$nextTick = _this11.$$nextTick;
                            _this11.$$nextTick = null;
                            if ($$nextTick.promise) {
                                $$nextTick();
                            } else {
                                $$nextTick.call(_this11);
                            }
                        }
                    });
                } else {
                    if (this.$$nextTick) {
                        var $$nextTick = this.$$nextTick;
                        this.$$nextTick = null;
                        if ($$nextTick.promise) {
                            $$nextTick();
                        } else {
                            $$nextTick.call(this);
                        }
                    }
                }
                this.$$phase = this.$$phase === '$apply' ? '$digest' : false;
            }
        }
    }, {
        key: '$nextTick',
        value: function $nextTick(fn) {
            var _this12 = this;

            if (typeof fn === 'undefined') {
                return new Promise(function (resolve, reject) {
                    _this12.$$nextTick = function () {
                        resolve();
                    };
                    _this12.$$nextTick.promise = true;
                });
            }
            this.$$nextTick = fn;
        }
    }]);

    return _class;
}();

exports.default = _class;

function keyCheck(vm, k) {
    if (typeof vm[k] === 'function') {
        console.warn('You are not allowed to define a function "' + k + '" in data.');
        return 0;
    } else if (['data', 'props', 'methods', 'events', 'mixins'].indexOf(k) !== -1) {
        console.warn('"' + k + '" is reserved word, please fix it.');
        return 0;
    } else if (k[0] === '$') {
        console.warn('"' + k + ': You can not define a property started with "$"');
        return 0;
    }
    return 1;
}

function getEventsFn(comContext, evtName) {
    var fn = comContext.events ? comContext.events[evtName] : comContext.$events[evtName] ? comContext.$events[evtName] : undefined;
    var typeFn = typeof fn === 'undefined' ? 'undefined' : _typeof(fn);
    var fnFn = void 0;
    if (typeFn === 'string') {
        var method = comContext.methods && comContext.methods[fn];
        if (typeof method === 'function') {
            fnFn = method;
        }
    } else if (typeFn === 'function' || Array.isArray(fn)) {
        fnFn = fn;
    }
    return fnFn;
}
//# sourceMappingURL=component.js.map
}, function(modId) { var map = {"./event":1536577189071,"./util":1536577189072}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189071, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(name, source, type) {
        _classCallCheck(this, _class);

        this.active = true;


        this.name = name;
        this.source = source;
        this.type = type;
    }

    _createClass(_class, [{
        key: "$destroy",
        value: function $destroy() {
            this.active = false;
        }
    }, {
        key: "$transfor",
        value: function $transfor(wxevent) {
            var k = 0;
            for (k in wxevent) {
                this[k] = wxevent[k];
            }
        }
    }]);

    return _class;
}();

exports.default = _class;
//# sourceMappingURL=event.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189072, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isImmutable(maybeImmutable) {
    if (!maybeImmutable || (typeof maybeImmutable === 'undefined' ? 'undefined' : _typeof(maybeImmutable)) !== 'object') {
        return false;
    }

    var IMMUTABLE_KEYS = ['@@__IMMUTABLE_ITERABLE__@@', '@@__IMMUTABLE_KEYED__@@', '@@__IMMUTABLE_INDEXED__@@', '@@__IMMUTABLE_ORDERED__@@', '@@__IMMUTABLE_RECORD__@@'];

    return !!IMMUTABLE_KEYS.filter(function (key) {
        return maybeImmutable[key];
    }).length;
}

exports.default = {
    $isEmpty: function $isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },
    $isEqual: function $isEqual(a, b, aStack, bStack) {
        if (isImmutable(a)) return a.equals(b);
        if (isImmutable(b)) return b.equals(a);

        if (a === b) return a !== 0 || 1 / a === 1 / b;

        if (a !== a) return b !== b;

        if (!a || !b) return a === b;

        var type = typeof a === 'undefined' ? 'undefined' : _typeof(a);
        if (type !== 'function' && type !== 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') return false;
        return this.$isDeepEqual(a, b, aStack, bStack);
    },
    $isDeepEqual: function $isDeepEqual(a, b, aStack, bStack) {
        if (isImmutable(a)) a = a.toJS();

        if (isImmutable(b)) b = b.toJS();

        var self = this;

        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) return +b !== +b;

                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
            case '[object Symbol]':
                var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;
                return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
        }

        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') return a === b;

            var aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
                return false;
            }
        }

        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            if (aStack[length] === a) return bStack[length] === b;
        }

        aStack.push(a);
        bStack.push(b);

        if (areArrays) {
            length = a.length;
            if (length !== b.length) return false;

            while (length--) {
                if (!self.$isEqual(a[length], b[length], aStack, bStack)) return false;
            }
        } else {
            var keys = Object.keys(a),
                key;
            length = keys.length;

            if (Object.keys(b).length !== length) return false;
            while (length--) {
                key = keys[length];
                if (!(self.$has(b, key) && self.$isEqual(a[key], b[key], aStack, bStack))) return false;
            }
        }

        aStack.pop();
        bStack.pop();
        return true;
    },
    $has: function $has(obj, path) {
        if (toString.call(path) !== '[object Array]') {
            return obj && hasOwnProperty.call(obj, path);
        }
        var length = path.length;
        for (var i = 0; i < length; i++) {
            var key = path[i];
            if (!obj || !hasOwnProperty.call(obj, key)) {
                return false;
            }
            obj = obj[key];
        }
        return !!length;
    },
    $extend: function $extend() {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        var self = this;

        if (typeof target === 'boolean') {
            deep = target;

            target = arguments[i] || {};
            i++;
        }

        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && !(typeof target === 'function')) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if (options = arguments[i]) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && (self.$isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && self.$isPlainObject(src) ? src : {};
                        }

                        target[name] = self.$extend(deep, clone, copy);
                    } else {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    },
    $copy: function $copy(obj) {
        var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (Array.isArray(obj)) {
            return this.$extend(deep, [], obj);
        } else if ('' + obj === 'null') {
            return obj;
        } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
            if (isImmutable(obj)) return obj;
            return this.$extend(deep, {}, obj);
        } else return obj;
    },
    $isPlainObject: function $isPlainObject(obj) {
        var proto, Ctor;

        if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
            return false;
        }

        proto = Object.getPrototypeOf(obj);

        if (!proto) {
            return true;
        }

        Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return typeof Ctor === 'function' && Object.prototype.hasOwnProperty.toString.call(Ctor) === Object.prototype.hasOwnProperty.toString.call(Object);
    },
    $resolvePath: function $resolvePath(route, url) {
        if (!url) return route;
        if (url[0] === '/') {
            url = url.substr(1);
            return this.$resolvePath('', url);
        }
        if (url[0] !== '.') {
            return this.$resolvePath(route, './' + url);
        }
        var current = route.split('/');
        if (url[0] === '.' && url[1] === '/') {
            url = url.substr(2);
            if (url[0] !== '.') {
                if (current.length) current[current.length - 1] = url;else current = [url];
                return current.length === 1 ? '/' + current[0] : current.join('/');
            }
            return this.$resolvePath(current.join('/'), url);
        }
        if (url[0] === '.' && url[1] === '.' && url[2] === '/') {
            url = url.replace(/^\.*/ig, '');
            current.pop();
            return this.$resolvePath(current.join('/'), '.' + url);
        }
        if (url[0] === '.') {
            return this.$resolvePath(route, url.substr(1));
        }
    },
    $getParams: function $getParams(url) {
        var rst = {};
        var quoteIndex = url.indexOf('?');

        if (quoteIndex !== -1) {
            var str = url.substr(quoteIndex + 1);
            var tmp = void 0;
            str.split('&').forEach(function (v) {
                tmp = v.split('=');
                rst[tmp[0]] = decodeURIComponent(tmp[1]);
            });
        }
        return rst;
    },


    isImmutable: isImmutable,

    hyphenate: function hyphenate(str) {
        return str.replace(/([^-])([A-Z])/g, '$1-$2').replace(/([^-])([A-Z])/g, '$1-$2').toLowerCase();
    },
    camelize: function camelize(str) {
        return str.replace(/-(\w)/g, function (_, c) {
            return c ? c.toUpperCase() : '';
        });
    }
};
//# sourceMappingURL=util.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189073, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PAGE_EVENT = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap'];
var APP_EVENT = ['onLaunch', 'onShow', 'onHide', 'onError', 'onPageNotFound'];

var $bindEvt = function $bindEvt(config, com, prefix) {
    com.$prefix = _util2.default.camelize(prefix || '');
    Object.getOwnPropertyNames(com.components || {}).forEach(function (name) {
        var cClass = com.components[name];
        var child = new cClass();
        child.$initMixins();
        child.$name = name;
        var comPrefix = prefix ? prefix + child.$name + '$' : '$' + child.$name + '$';

        com.$com[name] = child;

        $bindEvt(config, child, comPrefix);
    });
    Object.getOwnPropertyNames(com.constructor.prototype || []).forEach(function (prop) {
        if (prop !== 'constructor' && PAGE_EVENT.indexOf(prop) === -1) {
            config[prop] = function () {
                com.constructor.prototype[prop].apply(com, arguments);
                com.$apply();
            };
        }
    });

    var allMethods = Object.getOwnPropertyNames(com.methods || []);

    com.$mixins.forEach(function (mix) {
        allMethods = allMethods.concat(Object.getOwnPropertyNames(mix.methods || []));
    });

    allMethods.forEach(function (method, i) {
        config[com.$prefix + method] = function (e) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var evt = new _event2.default('system', this, e.type);
            evt.$transfor(e);
            var wepyParams = [],
                paramsLength = 0,
                tmp = void 0,
                p = void 0,
                comIndex = void 0;
            if (e.currentTarget && e.currentTarget.dataset) {
                tmp = e.currentTarget.dataset;
                while (tmp['wpy' + method.toLowerCase() + (p = String.fromCharCode(65 + paramsLength++))] !== undefined) {
                    wepyParams.push(tmp['wpy' + method.toLowerCase() + p]);
                }
                if (tmp.comIndex !== undefined) {
                    comIndex = tmp.comIndex;
                }
            }

            if (comIndex !== undefined) {
                comIndex = ('' + comIndex).split('-');
                var level = comIndex.length,
                    _tmp = level;
                while (level-- > 0) {
                    _tmp = level;
                    var tmpcom = com;
                    while (_tmp-- > 0) {
                        tmpcom = tmpcom.$parent;
                    }
                    tmpcom.$setIndex(comIndex.shift());
                }
            }

            args = args.concat(wepyParams);
            var rst = void 0,
                mixRst = void 0;
            var comfn = com.methods[method];
            if (comfn) {
                rst = comfn.apply(com, args.concat(evt));
            }
            com.$mixins.forEach(function (mix) {
                mix.methods[method] && (mixRst = mix.methods[method].apply(com, args.concat(evt)));
            });
            com.$apply();
            return comfn ? rst : mixRst;
        };
    });
    return config;
};

exports.default = {
    $createApp: function $createApp(appClass, appConfig) {
        var config = {};
        var app = new appClass();

        if (!this.$instance) {
            app.$init(this, appConfig);
            this.$instance = app;
            this.$appConfig = appConfig;
        }

        if (arguments.length === 2 && arguments[1] === true) {
            config.$app = app;
        }

        app.$wxapp = getApp();

        APP_EVENT = APP_EVENT.concat(appConfig.appEvents || []);
        PAGE_EVENT = PAGE_EVENT.concat(appConfig.pageEvents || []);

        APP_EVENT.forEach(function (v) {
            config[v] = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                var rst = void 0;
                !app.$wxapp && (app.$wxapp = getApp());
                app[v] && (rst = app[v].apply(app, args));
                return rst;
            };
        });
        return config;
    },
    $createPage: function $createPage(pageClass, pagePath) {
        var self = this;
        var config = {},
            k = void 0;
        var page = new pageClass();
        if (typeof pagePath === 'string') {
            this.$instance.$pages['/' + pagePath] = page;
        }
        page.$initMixins();

        if (typeof pagePath === 'boolean' && pagePath || arguments.length === 3 && arguments[2] === true) config.$page = page;

        config.onLoad = function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            !('options' in this) && (this.options = args.length ? args[0] : {});

            page.$name = pageClass.name || 'unnamed';
            page.$init(this, self.$instance, self.$instance);

            var prevPage = self.$instance.__prevPage__;
            var secParams = {};
            secParams.from = prevPage ? prevPage : undefined;

            if (prevPage && prevPage.$preloadData) {
                secParams.preload = prevPage.$preloadData;
                prevPage.$preloadData = undefined;
            }
            if (page.$prefetchData) {
                secParams.prefetch = page.$prefetchData;
                page.$prefetchData = undefined;
            }
            args.push(secParams);

            page.$onLoad.apply(page, args);

            page.$apply();
        };

        config.onUnload = function () {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            page.$onUnload.apply(page, args);
        };

        config.onShow = function () {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            self.$instance.__prevPage__ = page;

            [].concat(page.$mixins, page).forEach(function (mix) {
                mix['onShow'] && mix['onShow'].apply(page, args);
            });

            var pages = getCurrentPages();
            var pageId = pages[pages.length - 1].__route__;
            var webViewId = pages[pages.length - 1].__wxWebviewId__;

            if (self.$instance.__wxWebviewId__ !== webViewId) {

                page.$wxpage = this;

                self.$instance.__route__ = pageId;
                self.$instance.__wxWebviewId__ = webViewId;

                [].concat(page.$mixins, page).forEach(function (mix) {
                    mix['onRoute'] && mix['onRoute'].apply(page, args);
                });
            }

            page.$apply();
        };

        PAGE_EVENT.forEach(function (v) {
            if (v !== 'onLoad' && v !== 'onUnload' && v !== 'onShow') {
                config[v] = function () {
                    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                        args[_key6] = arguments[_key6];
                    }

                    var rst = void 0;

                    if (v === 'onShareAppMessage') {
                        page[v] && (rst = page[v].apply(page, args));
                        return rst;
                    }

                    [].concat(page.$mixins, page).forEach(function (mix) {
                        mix[v] && mix[v].apply(page, args);
                    });

                    if (v !== 'onPageScroll') {
                        page.$apply();
                    }

                    return rst;
                };
            }
        });

        if (!page.onShareAppMessage) {
            delete config.onShareAppMessage;
        }

        if ([].concat(page.$mixins, page).findIndex(function (mix) {
            return mix['onPageScroll'];
        }) === -1) {
            delete config.onPageScroll;
        }

        return $bindEvt(config, page, '');
    }
};
//# sourceMappingURL=base.js.map
}, function(modId) { var map = {"./event":1536577189071,"./util":1536577189072}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577189074, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.data = {};
        this.computed = {};
        this.components = {};
        this.methods = {};
        this.events = {};
    }

    _createClass(_class, [{
        key: '$init',
        value: function $init(parent) {
            var _this = this;

            var k = void 0;

            Object.getOwnPropertyNames(this).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(this))).forEach(function (k) {
                if (k[0] + k[1] !== 'on' && k !== 'constructor') {
                    if (!parent[k]) parent[k] = _this[k];
                }
            });

            ['data', 'computed', 'events', 'components'].forEach(function (item) {
                Object.getOwnPropertyNames(_this[item]).forEach(function (k) {
                    if (k !== 'init' && !parent[item][k]) parent[item][k] = _this[item][k];
                });
            });
        }
    }]);

    return _class;
}();

exports.default = _class;
//# sourceMappingURL=mixin.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577189066);
})()
//# sourceMappingURL=index.js.map