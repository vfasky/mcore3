/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * es5 兼容包
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	__webpack_require__(1);
	
	var _index = __webpack_require__(4);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _index2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*! Native Promise Only
	    v0.8.1 (c) Kyle Simpson
	    MIT License: http://getify.mit-license.org
	*/
	
	(function UMD(name,context,definition){
		// special form of UMD for polyfilling across evironments
		context[name] = context[name] || definition();
		if (typeof module != "undefined" && module.exports) { module.exports = context[name]; }
		else if (true) { !(__WEBPACK_AMD_DEFINE_RESULT__ = function $AMD$(){ return context[name]; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); }
	})("Promise",typeof global != "undefined" ? global : this,function DEF(){
		/*jshint validthis:true */
		"use strict";
	
		var builtInProp, cycle, scheduling_queue,
			ToString = Object.prototype.toString,
			timer = (typeof setImmediate != "undefined") ?
				function timer(fn) { return setImmediate(fn); } :
				setTimeout
		;
	
		// dammit, IE8.
		try {
			Object.defineProperty({},"x",{});
			builtInProp = function builtInProp(obj,name,val,config) {
				return Object.defineProperty(obj,name,{
					value: val,
					writable: true,
					configurable: config !== false
				});
			};
		}
		catch (err) {
			builtInProp = function builtInProp(obj,name,val) {
				obj[name] = val;
				return obj;
			};
		}
	
		// Note: using a queue instead of array for efficiency
		scheduling_queue = (function Queue() {
			var first, last, item;
	
			function Item(fn,self) {
				this.fn = fn;
				this.self = self;
				this.next = void 0;
			}
	
			return {
				add: function add(fn,self) {
					item = new Item(fn,self);
					if (last) {
						last.next = item;
					}
					else {
						first = item;
					}
					last = item;
					item = void 0;
				},
				drain: function drain() {
					var f = first;
					first = last = cycle = void 0;
	
					while (f) {
						f.fn.call(f.self);
						f = f.next;
					}
				}
			};
		})();
	
		function schedule(fn,self) {
			scheduling_queue.add(fn,self);
			if (!cycle) {
				cycle = timer(scheduling_queue.drain);
			}
		}
	
		// promise duck typing
		function isThenable(o) {
			var _then, o_type = typeof o;
	
			if (o != null &&
				(
					o_type == "object" || o_type == "function"
				)
			) {
				_then = o.then;
			}
			return typeof _then == "function" ? _then : false;
		}
	
		function notify() {
			for (var i=0; i<this.chain.length; i++) {
				notifyIsolated(
					this,
					(this.state === 1) ? this.chain[i].success : this.chain[i].failure,
					this.chain[i]
				);
			}
			this.chain.length = 0;
		}
	
		// NOTE: This is a separate function to isolate
		// the `try..catch` so that other code can be
		// optimized better
		function notifyIsolated(self,cb,chain) {
			var ret, _then;
			try {
				if (cb === false) {
					chain.reject(self.msg);
				}
				else {
					if (cb === true) {
						ret = self.msg;
					}
					else {
						ret = cb.call(void 0,self.msg);
					}
	
					if (ret === chain.promise) {
						chain.reject(TypeError("Promise-chain cycle"));
					}
					else if (_then = isThenable(ret)) {
						_then.call(ret,chain.resolve,chain.reject);
					}
					else {
						chain.resolve(ret);
					}
				}
			}
			catch (err) {
				chain.reject(err);
			}
		}
	
		function resolve(msg) {
			var _then, self = this;
	
			// already triggered?
			if (self.triggered) { return; }
	
			self.triggered = true;
	
			// unwrap
			if (self.def) {
				self = self.def;
			}
	
			try {
				if (_then = isThenable(msg)) {
					schedule(function(){
						var def_wrapper = new MakeDefWrapper(self);
						try {
							_then.call(msg,
								function $resolve$(){ resolve.apply(def_wrapper,arguments); },
								function $reject$(){ reject.apply(def_wrapper,arguments); }
							);
						}
						catch (err) {
							reject.call(def_wrapper,err);
						}
					})
				}
				else {
					self.msg = msg;
					self.state = 1;
					if (self.chain.length > 0) {
						schedule(notify,self);
					}
				}
			}
			catch (err) {
				reject.call(new MakeDefWrapper(self),err);
			}
		}
	
		function reject(msg) {
			var self = this;
	
			// already triggered?
			if (self.triggered) { return; }
	
			self.triggered = true;
	
			// unwrap
			if (self.def) {
				self = self.def;
			}
	
			self.msg = msg;
			self.state = 2;
			if (self.chain.length > 0) {
				schedule(notify,self);
			}
		}
	
		function iteratePromises(Constructor,arr,resolver,rejecter) {
			for (var idx=0; idx<arr.length; idx++) {
				(function IIFE(idx){
					Constructor.resolve(arr[idx])
					.then(
						function $resolver$(msg){
							resolver(idx,msg);
						},
						rejecter
					);
				})(idx);
			}
		}
	
		function MakeDefWrapper(self) {
			this.def = self;
			this.triggered = false;
		}
	
		function MakeDef(self) {
			this.promise = self;
			this.state = 0;
			this.triggered = false;
			this.chain = [];
			this.msg = void 0;
		}
	
		function Promise(executor) {
			if (typeof executor != "function") {
				throw TypeError("Not a function");
			}
	
			if (this.__NPO__ !== 0) {
				throw TypeError("Not a promise");
			}
	
			// instance shadowing the inherited "brand"
			// to signal an already "initialized" promise
			this.__NPO__ = 1;
	
			var def = new MakeDef(this);
	
			this["then"] = function then(success,failure) {
				var o = {
					success: typeof success == "function" ? success : true,
					failure: typeof failure == "function" ? failure : false
				};
				// Note: `then(..)` itself can be borrowed to be used against
				// a different promise constructor for making the chained promise,
				// by substituting a different `this` binding.
				o.promise = new this.constructor(function extractChain(resolve,reject) {
					if (typeof resolve != "function" || typeof reject != "function") {
						throw TypeError("Not a function");
					}
	
					o.resolve = resolve;
					o.reject = reject;
				});
				def.chain.push(o);
	
				if (def.state !== 0) {
					schedule(notify,def);
				}
	
				return o.promise;
			};
			this["catch"] = function $catch$(failure) {
				return this.then(void 0,failure);
			};
	
			try {
				executor.call(
					void 0,
					function publicResolve(msg){
						resolve.call(def,msg);
					},
					function publicReject(msg) {
						reject.call(def,msg);
					}
				);
			}
			catch (err) {
				reject.call(def,err);
			}
		}
	
		var PromisePrototype = builtInProp({},"constructor",Promise,
			/*configurable=*/false
		);
	
		// Note: Android 4 cannot use `Object.defineProperty(..)` here
		Promise.prototype = PromisePrototype;
	
		// built-in "brand" to signal an "uninitialized" promise
		builtInProp(PromisePrototype,"__NPO__",0,
			/*configurable=*/false
		);
	
		builtInProp(Promise,"resolve",function Promise$resolve(msg) {
			var Constructor = this;
	
			// spec mandated checks
			// note: best "isPromise" check that's practical for now
			if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
				return msg;
			}
	
			return new Constructor(function executor(resolve,reject){
				if (typeof resolve != "function" || typeof reject != "function") {
					throw TypeError("Not a function");
				}
	
				resolve(msg);
			});
		});
	
		builtInProp(Promise,"reject",function Promise$reject(msg) {
			return new this(function executor(resolve,reject){
				if (typeof resolve != "function" || typeof reject != "function") {
					throw TypeError("Not a function");
				}
	
				reject(msg);
			});
		});
	
		builtInProp(Promise,"all",function Promise$all(arr) {
			var Constructor = this;
	
			// spec mandated checks
			if (ToString.call(arr) != "[object Array]") {
				return Constructor.reject(TypeError("Not an array"));
			}
			if (arr.length === 0) {
				return Constructor.resolve([]);
			}
	
			return new Constructor(function executor(resolve,reject){
				if (typeof resolve != "function" || typeof reject != "function") {
					throw TypeError("Not a function");
				}
	
				var len = arr.length, msgs = Array(len), count = 0;
	
				iteratePromises(Constructor,arr,function resolver(idx,msg) {
					msgs[idx] = msg;
					if (++count === len) {
						resolve(msgs);
					}
				},reject);
			});
		});
	
		builtInProp(Promise,"race",function Promise$race(arr) {
			var Constructor = this;
	
			// spec mandated checks
			if (ToString.call(arr) != "[object Array]") {
				return Constructor.reject(TypeError("Not an array"));
			}
	
			return new Constructor(function executor(resolve,reject){
				if (typeof resolve != "function" || typeof reject != "function") {
					throw TypeError("Not a function");
				}
	
				iteratePromises(Constructor,arr,function resolver(idx,msg){
					resolve(msg);
				},reject);
			});
		});
	
		return Promise;
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2).setImmediate))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * mcore version 3
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _util = __webpack_require__(5);
	
	var util = _interopRequireWildcard(_util);
	
	var _element = __webpack_require__(7);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _template = __webpack_require__(8);
	
	var _template2 = _interopRequireDefault(_template);
	
	var _eventEmitter = __webpack_require__(9);
	
	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);
	
	var _component = __webpack_require__(12);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	    version: '3',
	    util: util,
	    Element: _element2.default,
	    Template: _template2.default,
	    EventEmitter: _eventEmitter2.default,
	    Component: _component2.default
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 工具类
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	// import $ from 'jquery';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.get$ = get$;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isString = isString;
	exports.type = type;
	exports.isFunction = isFunction;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.extend = extend;
	exports.getEvents = getEvents;
	exports.getComponents = getComponents;
	exports.nextTick = nextTick;
	var $ = void 0;
	
	function get$() {
	    if ($) {
	        return $;
	    }
	    if (window.$) {
	        $ = window.$;
	        return window.$;
	    }
	    $ = __webpack_require__(6);
	    return $;
	}
	
	function isNumber(x) {
	    return get$().isNumeric(x);
	}
	
	function isArray(x) {
	    return get$().isArray(x);
	}
	
	function isString(x) {
	    return get$().type(x) === 'string';
	}
	
	function type(x) {
	    return get$().type(x);
	}
	
	function isFunction(x) {
	    return get$().isFunction(x);
	}
	
	/**
	 * 兼容 mcore 2
	 */
	function isObject(x) {
	    return get$().isPlainObject(x);
	}
	
	function isPlainObject(x) {
	    return get$().isPlainObject(x);
	}
	
	function extend(x) {
	    if (isArray(x)) {
	        return get$().extend(true, [], x);
	    }
	    return get$().extend(true, {}, x);
	}
	
	function getEvents(element) {
	    var events = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	    element.children.forEach(function (child) {
	        getEvents(child, events);
	    });
	
	    Object.keys(element.events).forEach(function (name) {
	        var curEvent = element.events[name];
	        if (!events.hasOwnProperty(name)) {
	            events[name] = [];
	        }
	        events[name].push({
	            funName: curEvent.funName,
	            args: curEvent.args,
	            target: element.template.refs
	        });
	    });
	
	    return events;
	}
	
	function getComponents(element) {
	    var components = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	    element.children.forEach(function (child) {
	        getComponents(child, components);
	    });
	
	    if (element._component) {
	        components.push(element._component);
	    }
	
	    return components;
	}
	
	/**
	 * 放到下一帧执行
	 */
	function nextTick(fun) {
	    if (window.requestAnimationFrame) {
	        return requestAnimationFrame(function () {
	            fun();
	        });
	    } else {
	        return setTimeout(function () {
	            fun();
	        }, 0);
	    }
	}
	nextTick.clear = function (id) {
	    if (window.requestAnimationFrame) {
	        return cancelAnimationFrame(id);
	    } else {
	        return clearTimeout(id);
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * mcore element
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _template = __webpack_require__(8);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Element = function () {
	    function Element(tagName, key) {
	        var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	        var dynamicProps = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	        var children = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	
	        var _this = this;
	
	        var events = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];
	        var view = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];
	
	        _classCallCheck(this, Element);
	
	        this.tagName = tagName.trim().toLowerCase();
	        this.key = key;
	        //静态属性
	        this.props = props;
	        this.props._key = key;
	        //动态属性
	        this.dynamicProps = dynamicProps;
	        //子元素
	        this.children = children;
	        //事件
	        this.events = events;
	
	        //上级 element
	        this.parentElement = null;
	
	        //所属的view
	        this.view = view;
	
	        if (false === Array.isArray(children)) {
	            children = [];
	        }
	
	        var count = 0;
	        children.forEach(function (child, i) {
	            if (child instanceof Element) {
	                //指定上级
	                child.parentElement = _this;
	                count += child.count;
	            } else {
	                _this.children[i] = String(child);
	            }
	            count++;
	        });
	        //子节点数量
	        this.count = count;
	    }
	
	    _createClass(Element, [{
	        key: "render",
	        value: function render() {
	            this.template = new _template2.default(this);
	            return this.template.render();
	        }
	    }, {
	        key: "destroy",
	        value: function destroy(notRemove) {
	            if (this.template) {
	                this.template.destroy(notRemove);
	            }
	        }
	    }]);
	
	    return Element;
	}();
	
	exports.default = Element;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 模板渲染
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(5);
	
	var _eventEmitter = __webpack_require__(9);
	
	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);
	
	var _binders = __webpack_require__(11);
	
	var _binders2 = _interopRequireDefault(_binders);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * 模板引擎
	 */
	
	var Template = function (_EventEmitter) {
	    _inherits(Template, _EventEmitter);
	
	    function Template(element) {
	        _classCallCheck(this, Template);
	
	        //标记是否监听事件
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Template).call(this));
	
	        _this._isWatchEvent = false;
	
	        _this.element = element;
	        //子元素的自定义组件
	        _this.childrenComponent = [];
	        return _this;
	    }
	
	    _createClass(Template, [{
	        key: 'destroy',
	        value: function destroy(notRemove) {
	            // 移除自身
	            if (!notRemove) {
	                if (this.refs && this.refs.parentNode && this.refs.parentNode.removeChild) {
	                    this.refs.parentNode.removeChild(this.refs);
	                }
	            }
	            this.emit('destroy');
	        }
	
	        /**
	         * 渲染 node
	         * @method render
	         * @return {Element}
	         */
	
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var node = void 0;
	            if (this.element.tagName == '_textnode') {
	
	                if (this.element.dynamicProps.hasOwnProperty('text')) {
	                    node = document.createTextNode(this.element.dynamicProps.text);
	                } else {
	                    node = document.createTextNode(this.element.props.text);
	                }
	                node._key = this.element.key;
	                this.refs = node;
	                // node._element = this.element;
	                return node;
	            }
	            node = document.createElement(this.element.tagName);
	            node._key = this.element.key;
	            this.refs = node;
	            node._element = this.element;
	
	            // 自定义组件初始化，子元素由 自定义组件 自己管理
	            if (Template.components.hasOwnProperty(this.element.tagName)) {
	
	                // 自定义组件，先设置静态属性
	                Object.keys(this.element.props).forEach(function (attr) {
	                    _this2.setAttr(attr.toLowerCase(), _this2.element.props[attr]);
	                });
	                //设置动态属性
	                Object.keys(this.element.dynamicProps).forEach(function (attr) {
	                    _this2.setAttr(attr.toLowerCase(), _this2.element.dynamicProps[attr], true);
	                });
	
	                this.element._component = new Template.components[this.element.tagName](node, this.element);
	                this.element._noDiffChild = true;
	                this.element.children = [];
	                this.element.count = 0;
	                node._component = this.element._component;
	                //TODO 兼容mcore2 可能要开启
	                // Object.keys(this.element.dynamicProps).forEach((attr)=>{
	                //     this.element._component.update(attr.toLowerCase(), this.element.dynamicProps[attr]);
	                // });
	            }
	            // 非自定义组件，渲染子元素
	            else {
	                    this.element.children.forEach(function (child) {
	                        if (child.render) {
	                            var childNode = child.render();
	                            if (childNode) {
	                                //收集自定义组件
	                                if (child._component) {
	                                    _this2.childrenComponent.push(child._component);
	                                }
	                                //收集子元素的所有自定义组件
	                                if (child.childrenComponent && child.childrenComponent.length) {
	                                    child.childrenComponent.forEach(function (c) {
	                                        _this2.childrenComponent.push(c);
	                                    });
	                                }
	
	                                _this2.refs.appendChild(childNode);
	                            } else {
	                                console.log(childNode);
	                            }
	                        } else {
	                            console.log(child);
	                            throw new Error('child not Mcore Element');
	                        }
	                    });
	                    //设置静态属性
	                    Object.keys(this.element.props).forEach(function (attr) {
	                        _this2.setAttr(attr.toLowerCase(), _this2.element.props[attr]);
	                    });
	                    //设置动态属性
	                    Object.keys(this.element.dynamicProps).forEach(function (attr) {
	                        _this2.setAttr(attr.toLowerCase(), _this2.element.dynamicProps[attr], true);
	                    });
	                }
	            return node;
	        }
	
	        /**
	         * 调用自定义属性
	         * @method callBinder
	         * @param  {Function | Object}   binder
	         * @param  {String}   status
	         * @param  {Mixed}   value
	         * @param  {Mixed}   attrValue
	         * @return {Void}
	         */
	
	    }, {
	        key: 'callBinder',
	        value: function callBinder(binder, status, value, attrValue) {
	            if ((0, _util.isFunction)(binder)) {
	                binder(this.refs, value, attrValue);
	                return;
	            }
	            if (status === 'init') {
	                if ((0, _util.isFunction)(binder.init)) {
	                    binder.init(this.refs, value, attrValue);
	                }
	                //兼容mcore2
	                if ((0, _util.isFunction)(binder.rendered)) {
	                    binder.rendered(this.refs, value, attrValue);
	                }
	            } else {
	                var binderFun = binder[status];
	                if ((0, _util.isFunction)(binderFun)) {
	                    binderFun(this.refs, value, attrValue);
	                }
	            }
	        }
	
	        /**
	         * 通知更新的值
	         */
	
	    }, {
	        key: 'update',
	        value: function update(attr, value, status) {
	            if (this.element._component) {
	                this.element._component.update(attr, value, status);
	            }
	            this.emit(status, attr, value);
	            this.emit('change:' + attr, value);
	        }
	
	        /**
	         * 设置 node 属性
	         * @method setAttr
	         * @param  {String}  attr
	         * @param  {Mixed}  value
	         * @param  {Boolean} isDynamic = false
	         * @param  {String}  status    = 'init'
	         */
	
	    }, {
	        key: 'setAttr',
	        value: function setAttr(attr, value) {
	            var isDynamic = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var status = arguments.length <= 3 || arguments[3] === undefined ? 'init' : arguments[3];
	
	            //处理动态属性
	            if (isDynamic) {
	                if (Template.binders.hasOwnProperty(attr)) {
	                    var binder = Template.binders[attr];
	                    this.callBinder(binder, status, value);
	                    return;
	                }
	                //处理 mc-class-* (mc-class-test="true" => 'class-test': true)的情况
	                var TemplateBinderKeys = Object.keys(Template.binders);
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = TemplateBinderKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var binderAttr = _step.value;
	
	                        if (binderAttr.indexOf('*')) {
	                            var t = binderAttr.split('*');
	                            if (t.length === 2) {
	                                var attrPrefix = t[0];
	                                var attrValue = attr.replace(attrPrefix, '');
	                                if (attr.indexOf(attrPrefix) === 0) {
	                                    var _binder = Template.binders[binderAttr];
	                                    this.callBinder(_binder, status, value, attrValue);
	                                    return;
	                                }
	                            }
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	
	                if (status != 'init') {
	                    this.update(attr, value, status);
	                }
	            }
	            if (attr === 'class') {
	                this.refs.className = value;
	                return;
	            } else if (attr === 'style') {
	                this.refs.style.cssText = value;
	                return;
	            }
	
	            var tagName = this.element.tagName;
	
	            if (attr === 'value' && ['input', 'textarea', 'select'].indexOf(tagName) !== -1) {
	                this.refs.value = value;
	                return;
	            }
	            if ((0, _util.isNumber)(value) || (0, _util.isString)(value)) {
	                this.refs.setAttribute(attr, value);
	            }
	        }
	    }]);
	
	    return Template;
	}(_eventEmitter2.default);
	
	/**
	 * 自定义组件
	 * @type {Object}
	 */
	
	
	exports.default = Template;
	Template.components = {};
	/**
	 * 自定义属性
	 * @type {Object}
	 */
	Template.binders = _binders2.default;
	
	/**
	 * 过滤函数
	 * @type {Object}
	 */
	Template.formatters = {};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * event Emitter
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventemitter = __webpack_require__(10);
	
	var _eventemitter2 = _interopRequireDefault(_eventemitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _eventemitter2.default;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;
	
	  if (!events) return names;
	
	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return this;
	
	  var listeners = this._events[evt]
	    , events = [];
	
	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 *
	 * 模板自定义属性
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var binders = {};
	
	binders.show = function (el, value) {
	    el.style.display = value ? '' : 'none';
	};
	
	binders.hide = function (el, value) {
	    el.style.display = value ? 'none' : '';
	};
	
	binders.checked = function (el, value) {
	    el.checked = value ? true : false;
	};
	
	binders.disabled = function (el, value) {
	    el.disabled = value ? true : false;
	};
	
	binders.focus = function (el, value) {
	    if (el.focus && value) {
	        el.focus();
	    } else if (el.blur && !value) {
	        el.blur();
	    }
	};
	
	binders.blur = function (el, value) {
	    if (el.focus && !value) {
	        el.focus();
	    } else if (el.blur && value) {
	        el.blur();
	    }
	};
	
	binders.html = function (el, value) {
	    el.innerHTML = value ? value : '';
	    el._element._noDiffChild = true;
	};
	
	// 声明不要diff子节点
	binders['no-diff-child'] = function (el, value) {
	    el._element._noDiffChild = value ? true : false;
	};
	
	binders['class-*'] = function (el, value, attrValue) {
	    var classNames = String(el.className || '').split(' ').filter(function (name) {
	        return name.trim().length;
	    }).map(function (name) {
	        return name.trim();
	    });
	    var ix = classNames.indexOf(attrValue);
	    if (!value) {
	        if (ix !== -1) {
	            classNames.splice(ix, 1);
	            el.className = classNames.join(' ');
	        }
	    } else {
	        if (ix == -1) {
	            classNames.push(attrValue);
	            el.className = classNames.join(' ');
	        }
	    }
	};
	
	exports.default = binders;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 组件
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventEmitter = __webpack_require__(9);
	
	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);
	
	var _util = __webpack_require__(5);
	
	var util = _interopRequireWildcard(_util);
	
	var _template = __webpack_require__(8);
	
	var _template2 = _interopRequireDefault(_template);
	
	var _element = __webpack_require__(7);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _diff = __webpack_require__(13);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	var _patch = __webpack_require__(14);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _watch = __webpack_require__(17);
	
	var _watch2 = _interopRequireDefault(_watch);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var isFunction = util.isFunction;
	var nextTick = util.nextTick;
	var getEvents = util.getEvents;
	var getComponents = util.getComponents;
	
	var templateHelper = {
	    Template: _template2.default,
	    util: util,
	    Element: _element2.default
	};
	
	var Component = function (_EventEmitter) {
	    _inherits(Component, _EventEmitter);
	
	    function Component(parentNode) {
	        var parentElement = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        _classCallCheck(this, Component);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this));
	
	        _this.parentNode = parentNode;
	        _this.parentElement = parentElement;
	        // 渲染完成，回调队列
	        _this._queueCallbacks = [];
	        // 正在排队的渲染队列id
	        _this._queueId = null;
	
	        _this.virtualDom = null;
	
	        // 模板 scope
	        _this.scope = parentElement.props || {};
	        Object.keys(parentElement.dynamicProps || {}).forEach(function (attr) {
	            _this.scope[attr] = parentElement.dynamicProps[attr];
	        });
	
	        // 观察scope, 如果改动，渲染模板
	        _this.watchScope = new _watch2.default(_this.scope, function (path) {
	            _this.renderQueue();
	        });
	
	        _this.init();
	        _this.watch();
	        return _this;
	    }
	
	    _createClass(Component, [{
	        key: 'init',
	        value: function init() {}
	    }, {
	        key: 'watch',
	        value: function watch() {}
	    }, {
	        key: 'mount',
	        value: function mount() {
	            var parentEl = arguments.length <= 0 || arguments[0] === undefined ? this.parentNode : arguments[0];
	
	            if (this.refs && parentEl.appendChild) {
	                parentEl.appendChild(this.refs);
	                this.emit('mount', this.refs);
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.watchScope.unwatch();
	
	            if (this.$refs) {
	                this.$refs.remove();
	                this.$refs = null;
	            }
	            getComponents(this.virtualDom).forEach(function (component) {
	                component.destroy();
	            });
	
	            // 渲染完成，回调队列
	            this._queueCallbacks = [];
	        }
	
	        /**
	         * 取调用自定组件的上级view
	         * @method parent
	         * @return {View}
	         */
	
	    }, {
	        key: 'parentView',
	        value: function parentView() {
	            return this.parentElement.view;
	        }
	
	        /**
	         * 触发组件的自定义事件
	         * @method emitEvent
	         * @param  {String}  eventName
	         * @param  {Array}  args
	         * @return {Void}
	         */
	
	    }, {
	        key: 'emitEvent',
	        value: function emitEvent(eventName, args) {
	            var parentView = this.parentView();
	            if (parentView && this.parentElement.events.hasOwnProperty(eventName)) {
	                var eventCtx = this.parentElement.events[eventName];
	                var callback = parentView[eventCtx.funName];
	                if (!isFunction(callback)) {
	                    return;
	                }
	                if (!Array.isArray(args)) {
	                    args = [];
	                }
	                //如果模板事件有参数，追加在最后一个参数
	                if (Array.isArray(eventCtx.args) && eventCtx.args.length) {
	                    args.push({
	                        type: 'eventContext',
	                        args: eventCtx.args
	                    });
	                }
	                callback.apply(parentView, args);
	            }
	        }
	
	        /**
	         * 放入渲染队列
	         * @method renderQueue
	         * @param  {Function | Boolean}    doneOrAsync
	         * @return {Void}
	         */
	
	    }, {
	        key: 'renderQueue',
	        value: function renderQueue(doneOrAsync) {
	            var _this2 = this;
	
	            //加入成功回调队列
	            if (isFunction(doneOrAsync)) {
	                this._queueCallbacks.push(doneOrAsync);
	            }
	            if (this._queueId) {
	                nextTick.clear(this._queueId);
	            }
	            //马上渲染，不进队列
	            if (true === doneOrAsync) {
	                return this._render();
	            } else {
	                this._queueId = nextTick(function () {
	                    _this2._render();
	                });
	            }
	        }
	
	        /**
	         * 真实的渲染操作
	         * @method _render
	         * @return {[type]} [description]
	         */
	
	    }, {
	        key: '_render',
	        value: function _render() {
	            var _this3 = this;
	
	            if (!this.virtualDomDefine) {
	                return;
	            }
	            var $ = util.get$();
	
	            var virtualDoms = this.virtualDomDefine(this.scope, this, templateHelper);
	            var virtualDom = void 0;
	            if (virtualDoms.length == 1) {
	                virtualDom = virtualDoms[0];
	            } else {
	                virtualDom = new _element2.default('mc-vd', '0', {}, {}, virtualDoms);
	            }
	
	            // 未渲染，不用对比
	            if (this.virtualDom === null) {
	                this.virtualDom = virtualDom;
	                this.refs = this.virtualDom.render();
	                this.$refs = $(this.refs);
	                this.mount();
	            } else {
	                var patches = (0, _diff2.default)(this.virtualDom, virtualDom);
	                //先移除事件绑定
	                if (this.$refs) {
	                    this.$refs.off();
	                }
	                //更新dom
	                (0, _patch2.default)(this.refs, patches);
	                this.$refs = $(this.refs);
	                this.virtualDom = virtualDom;
	            }
	            // 绑定事件
	            this.bindEvents();
	
	            this.emit('rendered', this.refs);
	            this._queueCallbacks.forEach(function (done, ix) {
	                if (isFunction(done)) {
	                    done(_this3.refs);
	                    _this3._queueCallbacks[ix] = null;
	                }
	            });
	
	            return this.refs;
	        }
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this4 = this;
	
	            if (!this.$refs) {
	                return;
	            }
	            var $ = util.get$();
	            this.events = getEvents(this.virtualDom);
	
	            Object.keys(this.events).forEach(function (eventName) {
	                var eventData = _this4.events[eventName];
	                _this4.$refs.on(eventName, function (event) {
	                    var res = null;
	                    var target = event.target;
	                    $.each(eventData, function (ix, ctx) {
	                        if (ctx.target === target || $.contains(ctx.target, target)) {
	                            var callback = _this4[ctx.funName];
	                            if (isFunction(callback)) {
	                                var _ret = function () {
	                                    var args = [event, ctx.target];
	                                    ctx.args.forEach(function (v) {
	                                        args.push(v);
	                                    });
	                                    res = callback.apply(_this4, args);
	                                    return {
	                                        v: res
	                                    };
	                                }();
	
	                                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                            }
	                        }
	                    });
	                    return res;
	                });
	            });
	        }
	
	        /**
	         * 更新 scope
	         * @method set
	         * @param  {String} attr
	         * @param  {Mixed} value
	         * @param  {Function | Boolean} doneOrAsync
	         */
	
	    }, {
	        key: 'set',
	        value: function set(attr, value) {
	            var _this5 = this;
	
	            var doneOrAsync = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	            if (!isFunction(value.then)) {
	                var isChange = this.scope[attr] !== value;
	                if (isChange) {
	                    this.scope[attr] = value;
	                    this.emit('changeScope', this.scope, attr, value);
	                    this.emit('change:' + attr, value);
	                }
	                this.renderQueue(doneOrAsync);
	            } else {
	                return value.then(function (val) {
	                    _this5.set(attr, val, doneOrAsync);
	                });
	            }
	        }
	
	        /**
	         * 取 scope 值， 兼容 mcore2
	         * @method get
	         * @param  {String} attr
	         * @param  {Mixed} defaultVal = null
	         * @return {Mixed}
	         */
	
	    }, {
	        key: 'get',
	        value: function get(attr) {
	            var defaultVal = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	            if (this.scope.hasOwnProperty(attr)) {
	                return this.scope[attr];
	            }
	            return defaultVal;
	        }
	
	        /**
	         * 移除属性
	         * @method remove
	         * @param  {String} attr
	         * @param  {Mixed} doneOrAsync = null
	         * @return {Void}
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove(attr) {
	            var doneOrAsync = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	            if (this.scope.hasOwnProperty(attr)) {
	                delete this.scope[attr];
	                this.emit('removeScope', this.scope, attr);
	                this.emit('change:' + attr, null);
	            }
	            this.renderQueue(doneOrAsync);
	        }
	
	        /**
	         * 对外接口
	         * @method update
	         * @param  {String} attr
	         * @param  {Mixed} value
	         * @param  {String} status
	         * @return {Void}
	         */
	
	    }, {
	        key: 'update',
	        value: function update(attr, value, status) {
	            if (status === 'remove') {
	                return this.remove(attr);
	            }
	            this.set(attr, value);
	        }
	    }, {
	        key: 'render',
	        value: function render(virtualDomDefine) {
	            var _this6 = this;
	
	            var scope = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	            var doneOrAsync = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	            this.virtualDomDefine = virtualDomDefine;
	            var scopeKeys = Object.keys(scope);
	            var promiseVals = [];
	            scopeKeys.forEach(function (attr) {
	                promiseVals.push(scope[attr]);
	            });
	            return Promise.all(promiseVals).then(function (results) {
	                scopeKeys.forEach(function (attr, ix) {
	                    _this6.set(attr, results[ix]);
	                });
	
	                //马上渲染
	                if (doneOrAsync === true) {
	                    return _this6.renderQueue(doneOrAsync);
	                }
	                return new Promise(function (resolve) {
	                    _this6.renderQueue(function (refs) {
	                        if (isFunction(doneOrAsync)) {
	                            doneOrAsync(refs);
	                        }
	                        resolve(refs);
	                    });
	                });
	            });
	        }
	    }]);
	
	    return Component;
	}(_eventEmitter2.default);
	
	exports.default = Component;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * diff Element
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = diff;
	
	var _patch = __webpack_require__(14);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _listDiff = __webpack_require__(15);
	
	var _listDiff2 = _interopRequireDefault(_listDiff);
	
	var _util = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * 比对两个虚拟dom, 标出变更部分
	 * @method dfsWalk
	 * @param  {[type]} oldNode
	 * @param  {[type]} newNode
	 * @param  {[type]} index
	 * @param  {[type]} patches
	 * @return {[type]} [description]
	 */
	function dfsWalk(oldNode, newNode, index, patches) {
	    var currentPatch = [];
	    // node is removed
	    if (newNode === null) {}
	    // 文本替换
	    else if ((0, _util.isString)(oldNode) && (0, _util.isString)(newNode)) {
	            if (newNode != oldNode) {
	                currentPatch.push({
	                    type: _patch2.default.TEXT,
	                    content: newNode
	                });
	            }
	        }
	        // 文本替换
	        else if (oldNode.tagName === '_textnode' && oldNode.tagName === newNode.tagName) {
	                if (newNode != oldNode) {
	                    currentPatch.push({
	                        type: _patch2.default.TEXT,
	                        content: String(newNode.dynamicProps.text || newNode.props.text || '')
	                    });
	                }
	            }
	            // 同一 node, 更新属性
	            else if (oldNode.tagName === newNode.tagName && oldNode._key === newNode._key) {
	                    var propsPatches = diffProps(oldNode, newNode);
	                    if (propsPatches) {
	                        currentPatch.push({
	                            type: _patch2.default.PROPS,
	                            props: propsPatches
	                        });
	                    }
	                    // 没有声明不要 diff 子元素
	                    if (!oldNode || !oldNode._noDiffChild) {
	                        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
	                    }
	                }
	                // 替换
	                else {
	                        currentPatch.push({
	                            type: _patch2.default.REPLACE,
	                            node: newNode
	                        });
	                    }
	
	    if (currentPatch.length) {
	        patches[index] = currentPatch;
	    }
	}
	
	function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
	    var diffs = (0, _listDiff2.default)(oldChildren, newChildren, '_key');
	    newChildren = diffs.children;
	    // 有移动
	    if (diffs.moves.length) {
	        var reorderPatch = {
	            type: _patch2.default.REORDER,
	            moves: diffs.moves
	        };
	        currentPatch.push(reorderPatch);
	    }
	    var leftNode = null;
	    var currentNodeIndex = index;
	    Array.from(oldChildren).forEach(function (child, i) {
	        var newChild = newChildren[i];
	        if (leftNode && leftNode.count) {
	            currentNodeIndex += leftNode.count + 1;
	        } else {
	            currentNodeIndex++;
	        }
	        dfsWalk(child, newChild, currentNodeIndex, patches);
	        leftNode = child;
	    });
	}
	
	/**
	 * 检查属性变更
	 * @method diffProps
	 * @param  {Element}  oldNode
	 * @param  {Element}  newNode
	 * @return {Object | Null}  [description]
	 */
	function diffProps(oldNode, newNode) {
	    var count = 0;
	    var oldProps = oldNode.dynamicProps;
	    var newProps = newNode.dynamicProps;
	    var propsPatches = {};
	
	    //判断旧值变更或删除
	    Object.keys(oldProps).forEach(function (attr) {
	        var value = oldProps[attr];
	        if (newProps[attr] !== value) {
	            count++;
	            propsPatches[attr] = newProps[attr];
	        }
	    });
	
	    // 查找新添加的值
	    Object.keys(newProps).forEach(function (attr) {
	        if (false === propsPatches.hasOwnProperty(attr)) {
	            count++;
	            propsPatches[attr] = newProps[attr];
	        }
	    });
	    if (count === 0) {
	        return null;
	    }
	    return propsPatches;
	}
	
	function diff(oldTree, newTree) {
	    var index = 0;
	    var patches = {};
	    dfsWalk(oldTree, newTree, index, patches);
	    return patches;
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 *
	 * 应用比对结果
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	// 替换
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = patch;
	var REPLACE = 0;
	// 重新排序
	var REORDER = 1;
	// 属性变更
	var PROPS = 2;
	// 文字
	var TEXT = 3;
	
	function dfsWalk(node, walker) {
	    var patches = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    var currentPatches = patches[walker.index];
	    //计算子节点数量
	    var len = void 0;
	
	    if (!node.childNodes || node._element && node._element._noDiffChild) {
	        len = 0;
	    } else {
	        len = node.childNodes.length;
	    }
	
	    for (var i = 0; i < len; i++) {
	        var child = node.childNodes[i];
	        walker.index++;
	        dfsWalk(child, walker, patches);
	    }
	    if (currentPatches) {
	        applyPatches(node, currentPatches);
	    }
	}
	
	function applyPatches(node, currentPatches) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = currentPatches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var currentPatch = _step.value;
	
	            switch (currentPatch.type) {
	                // 替换
	                case REPLACE:
	                    var newNode = void 0;
	                    if (currentPatch.node.render) {
	                        newNode = currentPatch.node.render();
	                    } else if (typeof currentPatch.node == 'string') {
	                        newNode = document.createTextNode(currentPatch.node);
	                    }
	                    if (newNode) {
	                        if (node._element && node._element.destroy) {
	                            node._element.destroy(true);
	                        }
	                        node.parentNode.replaceChild(newNode, node);
	                    }
	                    break;
	                // 重新排序
	                case REORDER:
	                    reorderChildren(node, currentPatch.moves);
	                    break;
	                // 属性变更
	                case PROPS:
	                    if (node._element && node._element.template) {
	                        var propkeys = Object.keys(currentPatch.props);
	                        var _iteratorNormalCompletion2 = true;
	                        var _didIteratorError2 = false;
	                        var _iteratorError2 = undefined;
	
	                        try {
	                            for (var _iterator2 = propkeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                                var attr = _step2.value;
	
	                                var value = currentPatch.props[attr];
	                                var status = value !== undefined ? 'update' : 'remove';
	                                node._element.template.setAttr(attr.toLowerCase(), value, true, status);
	                            }
	                        } catch (err) {
	                            _didIteratorError2 = true;
	                            _iteratorError2 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                    _iterator2.return();
	                                }
	                            } finally {
	                                if (_didIteratorError2) {
	                                    throw _iteratorError2;
	                                }
	                            }
	                        }
	                    } else {
	                        throw new Error('not mcore Element:' + node);
	                    }
	                    break;
	                // 变更文本
	                case TEXT:
	                    if (node.textContent) {
	                        node.textContent = currentPatch.content;
	                    } else {
	                        node.nodeValue = currentPatch.content;
	                    }
	                    break;
	                default:
	                    throw new Error('Unknown patch type ' + currentPatch.type);
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	}
	
	/**
	 * 重新排序
	 * @method reorderChildren
	 * @param  {Element}      node
	 * @param  {array}        moves
	 * @return {Void}
	 */
	function reorderChildren(node, moves) {
	    var staticNodeList = Array.from(node.childNodes);
	    var maps = {};
	    staticNodeList.forEach(function (node) {
	        var key = null;
	        if (node._element && node._element.key) {
	            key = node._element.key;
	        }
	        if (key === null && node.nodeType === 1) {
	            key = node.getAttribute('_key');
	        }
	        if (key) {
	            maps[key] = node;
	        }
	    });
	    moves.forEach(function (move) {
	        var index = move.index;
	        if (move.type === 0) {
	            // remove item
	            if (staticNodeList[index] == node.childNodes[index]) {
	                var childNode = node.childNodes[index];
	                if (childNode._element) {
	                    childNode._element.destroy(true);
	                }
	                node.removeChild(childNode);
	            }
	        } else if (move.type === 1) {
	            var insertNode = void 0;
	            // 使用旧节点
	            if (maps[move.item.key]) {
	                insertNode = maps[move.item.key];
	                if (insertNode._element && insertNode._element.template) {
	                    insertNode._element.template.emit('reorder', node);
	                }
	            }
	            // 创建一个新节点
	            else if (move.item.render) {
	                    insertNode = move.item.render();
	                }
	                // 创建文本
	                else {
	                        insertNode = document.createTextNode(String(move.item));
	                    }
	            staticNodeList.splice(index, 0, insertNode);
	            node.insertBefore(insertNode, node.childNodes[index] || null);
	        }
	    });
	}
	
	function patch(node, patches) {
	    var walker = {
	        index: 0
	    };
	    return dfsWalk(node, walker, patches);
	}
	
	patch.REPLACE = REPLACE;
	patch.REORDER = REORDER;
	patch.PROPS = PROPS;
	patch.TEXT = TEXT;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16).diff


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Diff two list in O(N).
	 * @param {Array} oldList - Original List
	 * @param {Array} newList - List After certain insertions, removes, or moves
	 * @return {Object} - {moves: <Array>}
	 *                  - moves is a list of actions that telling how to remove and insert
	 */
	function diff (oldList, newList, key) {
	  var oldMap = makeKeyIndexAndFree(oldList, key)
	  var newMap = makeKeyIndexAndFree(newList, key)
	
	  var newFree = newMap.free
	
	  var oldKeyIndex = oldMap.keyIndex
	  var newKeyIndex = newMap.keyIndex
	
	  var moves = []
	
	  // a simulate list to manipulate
	  var children = []
	  var i = 0
	  var item
	  var itemKey
	  var freeIndex = 0
	
	  // fist pass to check item in old list: if it's removed or not
	  while (i < oldList.length) {
	    item = oldList[i]
	    itemKey = getItemKey(item, key)
	    if (itemKey) {
	      if (!newKeyIndex.hasOwnProperty(itemKey)) {
	        children.push(null)
	      } else {
	        var newItemIndex = newKeyIndex[itemKey]
	        children.push(newList[newItemIndex])
	      }
	    } else {
	      var freeItem = newFree[freeIndex++]
	      children.push(freeItem || null)
	    }
	    i++
	  }
	
	  var simulateList = children.slice(0)
	
	  // remove items no longer exist
	  i = 0
	  while (i < simulateList.length) {
	    if (simulateList[i] === null) {
	      remove(i)
	      removeSimulate(i)
	    } else {
	      i++
	    }
	  }
	
	  // i is cursor pointing to a item in new list
	  // j is cursor pointing to a item in simulateList
	  var j = i = 0
	  while (i < newList.length) {
	    item = newList[i]
	    itemKey = getItemKey(item, key)
	
	    var simulateItem = simulateList[j]
	    var simulateItemKey = getItemKey(simulateItem, key)
	
	    if (simulateItem) {
	      if (itemKey === simulateItemKey) {
	        j++
	      } else {
	        // new item, just inesrt it
	        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
	          insert(i, item)
	        } else {
	          // if remove current simulateItem make item in right place
	          // then just remove it
	          var nextItemKey = getItemKey(simulateList[j + 1], key)
	          if (nextItemKey === itemKey) {
	            remove(i)
	            removeSimulate(j)
	            j++ // after removing, current j is right, just jump to next one
	          } else {
	            // else insert item
	            insert(i, item)
	          }
	        }
	      }
	    } else {
	      insert(i, item)
	    }
	
	    i++
	  }
	
	  function remove (index) {
	    var move = {index: index, type: 0}
	    moves.push(move)
	  }
	
	  function insert (index, item) {
	    var move = {index: index, item: item, type: 1}
	    moves.push(move)
	  }
	
	  function removeSimulate (index) {
	    simulateList.splice(index, 1)
	  }
	
	  return {
	    moves: moves,
	    children: children
	  }
	}
	
	/**
	 * Convert list to key-item keyIndex object.
	 * @param {Array} list
	 * @param {String|Function} key
	 */
	function makeKeyIndexAndFree (list, key) {
	  var keyIndex = {}
	  var free = []
	  for (var i = 0, len = list.length; i < len; i++) {
	    var item = list[i]
	    var itemKey = getItemKey(item, key)
	    if (itemKey) {
	      keyIndex[itemKey] = i
	    } else {
	      free.push(item)
	    }
	  }
	  return {
	    keyIndex: keyIndex,
	    free: free
	  }
	}
	
	function getItemKey (item, key) {
	  if (!item || !key) return void 666
	  return typeof key === 'string'
	    ? item[key]
	    : key(item)
	}
	
	exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
	exports.diff = diff


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * watch
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(18);
	__webpack_require__(19);
	
	var Watch = function () {
	    function Watch() {
	        var scope = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	        var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
	        _classCallCheck(this, Watch);
	
	        this.scope = scope;
	        this.callback = callback;
	
	        this._watchReg = {};
	        this._watchTotal = 0;
	        this.watch(this.scope);
	    }
	
	    _createClass(Watch, [{
	        key: 'observer',
	        value: function observer(changes, x, path) {
	            var _this = this;
	
	            changes.forEach(function (change) {
	                var curPath = path + '.' + change.name;
	                if (change.type === 'add') {
	                    _this.watch(x[change.name], curPath);
	                } else if (change.type === 'delete') {
	                    _this.unwatchByPath(curPath);
	                } else if (['reconfigure', 'update'].indexOf(change.type) !== -1) {
	                    _this.unwatchByPath(curPath);
	                    _this.watch(x[change.name], curPath);
	                }
	            });
	            this.callback(path);
	        }
	    }, {
	        key: 'unwatchByPath',
	        value: function unwatchByPath(path) {
	            var reg = this._watchReg[path];
	            if (!reg) {
	                return;
	            }
	            if (reg.type === 'object') {
	                Object.unobserve(reg.x, reg.observer);
	            } else if (reg.type === 'array') {
	                Array.unobserve(reg.x, reg.observer);
	            }
	            delete this._watchReg[path];
	        }
	    }, {
	        key: 'watch',
	        value: function watch(x) {
	            var _this2 = this;
	
	            var path = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	            var watchType = null;
	            if ((0, _util.isPlainObject)(x)) {
	                watchType = 'object';
	            } else if ((0, _util.isArray)(x)) {
	                watchType = 'array';
	            }
	            if (!watchType) {
	                return;
	            }
	
	            // 已经在观察列表
	            if (this._watchReg[path]) {
	                return;
	            }
	            this._watchReg[path] = {
	                x: x,
	                type: watchType,
	                observer: function observer(changes) {
	                    _this2.observer(changes, x, path);
	                }
	            };
	
	            this._watchTotal++;
	
	            if (watchType === 'object') {
	                Object.observe(x, this._watchReg[path].observer);
	                Object.keys(x).forEach(function (attr) {
	                    var v = x[attr];
	                    _this2.watch(v, path + '.' + attr);
	                });
	            } else if (watchType === 'array') {
	                Array.observe(x, this._watchReg[path].observer);
	                x.forEach(function (v, i) {
	                    _this2.watch(v, path + '.' + i);
	                });
	            }
	        }
	    }, {
	        key: 'unwatch',
	        value: function unwatch() {
	            var _this3 = this;
	
	            Object.keys(this._watchReg).forEach(function (path) {
	                _this3.unwatchByPath(path);
	            });
	            this._watchReg = {};
	        }
	    }]);
	
	    return Watch;
	}();
	
	exports.default = Watch;

/***/ },
/* 18 */
/***/ function(module, exports) {

	/*!
	 * Object.observe polyfill - v0.2.4
	 * by Massimo Artizzu (MaxArt2501)
	 *
	 * https://github.com/MaxArt2501/object-observe
	 *
	 * Licensed under the MIT License
	 * See LICENSE for details
	 */
	
	// Some type definitions
	/**
	 * This represents the data relative to an observed object
	 * @typedef  {Object}                     ObjectData
	 * @property {Map<Handler, HandlerData>}  handlers
	 * @property {String[]}                   properties
	 * @property {*[]}                        values
	 * @property {Descriptor[]}               descriptors
	 * @property {Notifier}                   notifier
	 * @property {Boolean}                    frozen
	 * @property {Boolean}                    extensible
	 * @property {Object}                     proto
	 */
	/**
	 * Function definition of a handler
	 * @callback Handler
	 * @param {ChangeRecord[]}                changes
	*/
	/**
	 * This represents the data relative to an observed object and one of its
	 * handlers
	 * @typedef  {Object}                     HandlerData
	 * @property {Map<Object, ObservedData>}  observed
	 * @property {ChangeRecord[]}             changeRecords
	 */
	/**
	 * @typedef  {Object}                     ObservedData
	 * @property {String[]}                   acceptList
	 * @property {ObjectData}                 data
	*/
	/**
	 * Type definition for a change. Any other property can be added using
	 * the notify() or performChange() methods of the notifier.
	 * @typedef  {Object}                     ChangeRecord
	 * @property {String}                     type
	 * @property {Object}                     object
	 * @property {String}                     [name]
	 * @property {*}                          [oldValue]
	 * @property {Number}                     [index]
	 */
	/**
	 * Type definition for a notifier (what Object.getNotifier returns)
	 * @typedef  {Object}                     Notifier
	 * @property {Function}                   notify
	 * @property {Function}                   performChange
	 */
	/**
	 * Function called with Notifier.performChange. It may optionally return a
	 * ChangeRecord that gets automatically notified, but `type` and `object`
	 * properties are overridden.
	 * @callback Performer
	 * @returns {ChangeRecord|undefined}
	 */
	
	Object.observe || (function(O, A, root, _undefined) {
	    "use strict";
	
	        /**
	         * Relates observed objects and their data
	         * @type {Map<Object, ObjectData}
	         */
	    var observed,
	        /**
	         * List of handlers and their data
	         * @type {Map<Handler, Map<Object, HandlerData>>}
	         */
	        handlers,
	
	        defaultAcceptList = [ "add", "update", "delete", "reconfigure", "setPrototype", "preventExtensions" ];
	
	    // Functions for internal usage
	
	        /**
	         * Checks if the argument is an Array object. Polyfills Array.isArray.
	         * @function isArray
	         * @param {?*} object
	         * @returns {Boolean}
	         */
	    var isArray = A.isArray || (function(toString) {
	            return function (object) { return toString.call(object) === "[object Array]"; };
	        })(O.prototype.toString),
	
	        /**
	         * Returns the index of an item in a collection, or -1 if not found.
	         * Uses the generic Array.indexOf or Array.prototype.indexOf if available.
	         * @function inArray
	         * @param {Array} array
	         * @param {*} pivot           Item to look for
	         * @param {Number} [start=0]  Index to start from
	         * @returns {Number}
	         */
	        inArray = A.prototype.indexOf ? A.indexOf || function(array, pivot, start) {
	            return A.prototype.indexOf.call(array, pivot, start);
	        } : function(array, pivot, start) {
	            for (var i = start || 0; i < array.length; i++)
	                if (array[i] === pivot)
	                    return i;
	            return -1;
	        },
	
	        /**
	         * Returns an instance of Map, or a Map-like object is Map is not
	         * supported or doesn't support forEach()
	         * @function createMap
	         * @returns {Map}
	         */
	        createMap = root.Map === _undefined || !Map.prototype.forEach ? function() {
	            // Lightweight shim of Map. Lacks clear(), entries(), keys() and
	            // values() (the last 3 not supported by IE11, so can't use them),
	            // it doesn't handle the constructor's argument (like IE11) and of
	            // course it doesn't support for...of.
	            // Chrome 31-35 and Firefox 13-24 have a basic support of Map, but
	            // they lack forEach(), so their native implementation is bad for
	            // this polyfill. (Chrome 36+ supports Object.observe.)
	            var keys = [], values = [];
	
	            return {
	                size: 0,
	                has: function(key) { return inArray(keys, key) > -1; },
	                get: function(key) { return values[inArray(keys, key)]; },
	                set: function(key, value) {
	                    var i = inArray(keys, key);
	                    if (i === -1) {
	                        keys.push(key);
	                        values.push(value);
	                        this.size++;
	                    } else values[i] = value;
	                },
	                "delete": function(key) {
	                    var i = inArray(keys, key);
	                    if (i > -1) {
	                        keys.splice(i, 1);
	                        values.splice(i, 1);
	                        this.size--;
	                    }
	                },
	                forEach: function(callback/*, thisObj*/) {
	                    for (var i = 0; i < keys.length; i++)
	                        callback.call(arguments[1], values[i], keys[i], this);
	                }
	            };
	        } : function() { return new Map(); },
	
	        /**
	         * Simple shim for Object.getOwnPropertyNames when is not available
	         * Misses checks on object, don't use as a replacement of Object.keys/getOwnPropertyNames
	         * @function getProps
	         * @param {Object} object
	         * @returns {String[]}
	         */
	        getProps = O.getOwnPropertyNames ? (function() {
	            var func = O.getOwnPropertyNames;
	            try {
	                arguments.callee;
	            } catch (e) {
	                // Strict mode is supported
	
	                // In strict mode, we can't access to "arguments", "caller" and
	                // "callee" properties of functions. Object.getOwnPropertyNames
	                // returns [ "prototype", "length", "name" ] in Firefox; it returns
	                // "caller" and "arguments" too in Chrome and in Internet
	                // Explorer, so those values must be filtered.
	                var avoid = (func(inArray).join(" ") + " ").replace(/prototype |length |name /g, "").slice(0, -1).split(" ");
	                if (avoid.length) func = function(object) {
	                    var props = O.getOwnPropertyNames(object);
	                    if (typeof object === "function")
	                        for (var i = 0, j; i < avoid.length;)
	                            if ((j = inArray(props, avoid[i++])) > -1)
	                                props.splice(j, 1);
	
	                    return props;
	                };
	            }
	            return func;
	        })() : function(object) {
	            // Poor-mouth version with for...in (IE8-)
	            var props = [], prop, hop;
	            if ("hasOwnProperty" in object) {
	                for (prop in object)
	                    if (object.hasOwnProperty(prop))
	                        props.push(prop);
	            } else {
	                hop = O.hasOwnProperty;
	                for (prop in object)
	                    if (hop.call(object, prop))
	                        props.push(prop);
	            }
	
	            // Inserting a common non-enumerable property of arrays
	            if (isArray(object))
	                props.push("length");
	
	            return props;
	        },
	
	        /**
	         * Return the prototype of the object... if defined.
	         * @function getPrototype
	         * @param {Object} object
	         * @returns {Object}
	         */
	        getPrototype = O.getPrototypeOf,
	
	        /**
	         * Return the descriptor of the object... if defined.
	         * IE8 supports a (useless) Object.getOwnPropertyDescriptor for DOM
	         * nodes only, so defineProperties is checked instead.
	         * @function getDescriptor
	         * @param {Object} object
	         * @param {String} property
	         * @returns {Descriptor}
	         */
	        getDescriptor = O.defineProperties && O.getOwnPropertyDescriptor,
	
	        /**
	         * Sets up the next check and delivering iteration, using
	         * requestAnimationFrame or a (close) polyfill.
	         * @function nextFrame
	         * @param {function} func
	         * @returns {number}
	         */
	        nextFrame = root.requestAnimationFrame || root.webkitRequestAnimationFrame || (function() {
	            var initial = +new Date,
	                last = initial;
	            return function(func) {
	                return setTimeout(function() {
	                    func((last = +new Date) - initial);
	                }, 17);
	            };
	        })(),
	
	        /**
	         * Sets up the observation of an object
	         * @function doObserve
	         * @param {Object} object
	         * @param {Handler} handler
	         * @param {String[]} [acceptList]
	         */
	        doObserve = function(object, handler, acceptList) {
	            var data = observed.get(object);
	
	            if (data) {
	                performPropertyChecks(data, object);
	                setHandler(object, data, handler, acceptList);
	            } else {
	                data = createObjectData(object);
	                setHandler(object, data, handler, acceptList);
	
	                if (observed.size === 1)
	                    // Let the observation begin!
	                    nextFrame(runGlobalLoop);
	            }
	        },
	
	        /**
	         * Creates the initial data for an observed object
	         * @function createObjectData
	         * @param {Object} object
	         */
	        createObjectData = function(object, data) {
	            var props = getProps(object),
	                values = [], descs, i = 0,
	                data = {
	                    handlers: createMap(),
	                    frozen: O.isFrozen ? O.isFrozen(object) : false,
	                    extensible: O.isExtensible ? O.isExtensible(object) : true,
	                    proto: getPrototype && getPrototype(object),
	                    properties: props,
	                    values: values,
	                    notifier: retrieveNotifier(object, data)
	                };
	
	            if (getDescriptor) {
	                descs = data.descriptors = [];
	                while (i < props.length) {
	                    descs[i] = getDescriptor(object, props[i]);
	                    values[i] = object[props[i++]];
	                }
	            } else while (i < props.length)
	                values[i] = object[props[i++]];
	
	            observed.set(object, data);
	
	            return data;
	        },
	
	        /**
	         * Performs basic property value change checks on an observed object
	         * @function performPropertyChecks
	         * @param {ObjectData} data
	         * @param {Object} object
	         * @param {String} [except]  Doesn't deliver the changes to the
	         *                           handlers that accept this type
	         */
	        performPropertyChecks = (function() {
	            var updateCheck = getDescriptor ? function(object, data, idx, except, descr) {
	                var key = data.properties[idx],
	                    value = object[key],
	                    ovalue = data.values[idx],
	                    odesc = data.descriptors[idx];
	
	                if ("value" in descr && (ovalue === value
	                        ? ovalue === 0 && 1/ovalue !== 1/value
	                        : ovalue === ovalue || value === value)) {
	                    addChangeRecord(object, data, {
	                        name: key,
	                        type: "update",
	                        object: object,
	                        oldValue: ovalue
	                    }, except);
	                    data.values[idx] = value;
	                }
	                if (odesc.configurable && (!descr.configurable
	                        || descr.writable !== odesc.writable
	                        || descr.enumerable !== odesc.enumerable
	                        || descr.get !== odesc.get
	                        || descr.set !== odesc.set)) {
	                    addChangeRecord(object, data, {
	                        name: key,
	                        type: "reconfigure",
	                        object: object,
	                        oldValue: ovalue
	                    }, except);
	                    data.descriptors[idx] = descr;
	                }
	            } : function(object, data, idx, except) {
	                var key = data.properties[idx],
	                    value = object[key],
	                    ovalue = data.values[idx];
	
	                if (ovalue === value ? ovalue === 0 && 1/ovalue !== 1/value
	                        : ovalue === ovalue || value === value) {
	                    addChangeRecord(object, data, {
	                        name: key,
	                        type: "update",
	                        object: object,
	                        oldValue: ovalue
	                    }, except);
	                    data.values[idx] = value;
	                }
	            };
	
	            // Checks if some property has been deleted
	            var deletionCheck = getDescriptor ? function(object, props, proplen, data, except) {
	                var i = props.length, descr;
	                while (proplen && i--) {
	                    if (props[i] !== null) {
	                        descr = getDescriptor(object, props[i]);
	                        proplen--;
	
	                        // If there's no descriptor, the property has really
	                        // been deleted; otherwise, it's been reconfigured so
	                        // that's not enumerable anymore
	                        if (descr) updateCheck(object, data, i, except, descr);
	                        else {
	                            addChangeRecord(object, data, {
	                                name: props[i],
	                                type: "delete",
	                                object: object,
	                                oldValue: data.values[i]
	                            }, except);
	                            data.properties.splice(i, 1);
	                            data.values.splice(i, 1);
	                            data.descriptors.splice(i, 1);
	                        }
	                    }
	                }
	            } : function(object, props, proplen, data, except) {
	                var i = props.length;
	                while (proplen && i--)
	                    if (props[i] !== null) {
	                        addChangeRecord(object, data, {
	                            name: props[i],
	                            type: "delete",
	                            object: object,
	                            oldValue: data.values[i]
	                        }, except);
	                        data.properties.splice(i, 1);
	                        data.values.splice(i, 1);
	                        proplen--;
	                    }
	            };
	
	            return function(data, object, except) {
	                if (!data.handlers.size || data.frozen) return;
	
	                var props, proplen, keys,
	                    values = data.values,
	                    descs = data.descriptors,
	                    i = 0, idx,
	                    key, value,
	                    proto, descr;
	
	                // If the object isn't extensible, we don't need to check for new
	                // or deleted properties
	                if (data.extensible) {
	
	                    props = data.properties.slice();
	                    proplen = props.length;
	                    keys = getProps(object);
	
	                    if (descs) {
	                        while (i < keys.length) {
	                            key = keys[i++];
	                            idx = inArray(props, key);
	                            descr = getDescriptor(object, key);
	
	                            if (idx === -1) {
	                                addChangeRecord(object, data, {
	                                    name: key,
	                                    type: "add",
	                                    object: object
	                                }, except);
	                                data.properties.push(key);
	                                values.push(object[key]);
	                                descs.push(descr);
	                            } else {
	                                props[idx] = null;
	                                proplen--;
	                                updateCheck(object, data, idx, except, descr);
	                            }
	                        }
	                        deletionCheck(object, props, proplen, data, except);
	
	                        if (!O.isExtensible(object)) {
	                            data.extensible = false;
	                            addChangeRecord(object, data, {
	                                type: "preventExtensions",
	                                object: object
	                            }, except);
	
	                            data.frozen = O.isFrozen(object);
	                        }
	                    } else {
	                        while (i < keys.length) {
	                            key = keys[i++];
	                            idx = inArray(props, key);
	                            value = object[key];
	
	                            if (idx === -1) {
	                                addChangeRecord(object, data, {
	                                    name: key,
	                                    type: "add",
	                                    object: object
	                                }, except);
	                                data.properties.push(key);
	                                values.push(value);
	                            } else {
	                                props[idx] = null;
	                                proplen--;
	                                updateCheck(object, data, idx, except);
	                            }
	                        }
	                        deletionCheck(object, props, proplen, data, except);
	                    }
	
	                } else if (!data.frozen) {
	
	                    // If the object is not extensible, but not frozen, we just have
	                    // to check for value changes
	                    for (; i < props.length; i++) {
	                        key = props[i];
	                        updateCheck(object, data, i, except, getDescriptor(object, key));
	                    }
	
	                    if (O.isFrozen(object))
	                        data.frozen = true;
	                }
	
	                if (getPrototype) {
	                    proto = getPrototype(object);
	                    if (proto !== data.proto) {
	                        addChangeRecord(object, data, {
	                            type: "setPrototype",
	                            name: "__proto__",
	                            object: object,
	                            oldValue: data.proto
	                        });
	                        data.proto = proto;
	                    }
	                }
	            };
	        })(),
	
	        /**
	         * Sets up the main loop for object observation and change notification
	         * It stops if no object is observed.
	         * @function runGlobalLoop
	         */
	        runGlobalLoop = function() {
	            if (observed.size) {
	                observed.forEach(performPropertyChecks);
	                handlers.forEach(deliverHandlerRecords);
	                nextFrame(runGlobalLoop);
	            }
	        },
	
	        /**
	         * Deliver the change records relative to a certain handler, and resets
	         * the record list.
	         * @param {HandlerData} hdata
	         * @param {Handler} handler
	         */
	        deliverHandlerRecords = function(hdata, handler) {
	            var records = hdata.changeRecords;
	            if (records.length) {
	                hdata.changeRecords = [];
	                handler(records);
	            }
	        },
	
	        /**
	         * Returns the notifier for an object - whether it's observed or not
	         * @function retrieveNotifier
	         * @param {Object} object
	         * @param {ObjectData} [data]
	         * @returns {Notifier}
	         */
	        retrieveNotifier = function(object, data) {
	            if (arguments.length < 2)
	                data = observed.get(object);
	
	            /** @type {Notifier} */
	            return data && data.notifier || {
	                /**
	                 * @method notify
	                 * @see http://arv.github.io/ecmascript-object-observe/#notifierprototype._notify
	                 * @memberof Notifier
	                 * @param {ChangeRecord} changeRecord
	                 */
	                notify: function(changeRecord) {
	                    changeRecord.type; // Just to check the property is there...
	
	                    // If there's no data, the object has been unobserved
	                    var data = observed.get(object);
	                    if (data) {
	                        var recordCopy = { object: object }, prop;
	                        for (prop in changeRecord)
	                            if (prop !== "object")
	                                recordCopy[prop] = changeRecord[prop];
	                        addChangeRecord(object, data, recordCopy);
	                    }
	                },
	
	                /**
	                 * @method performChange
	                 * @see http://arv.github.io/ecmascript-object-observe/#notifierprototype_.performchange
	                 * @memberof Notifier
	                 * @param {String} changeType
	                 * @param {Performer} func     The task performer
	                 * @param {*} [thisObj]        Used to set `this` when calling func
	                 */
	                performChange: function(changeType, func/*, thisObj*/) {
	                    if (typeof changeType !== "string")
	                        throw new TypeError("Invalid non-string changeType");
	
	                    if (typeof func !== "function")
	                        throw new TypeError("Cannot perform non-function");
	
	                    // If there's no data, the object has been unobserved
	                    var data = observed.get(object),
	                        prop, changeRecord,
	                        thisObj = arguments[2],
	                        result = thisObj === _undefined ? func() : func.call(thisObj);
	
	                    data && performPropertyChecks(data, object, changeType);
	
	                    // If there's no data, the object has been unobserved
	                    if (data && result && typeof result === "object") {
	                        changeRecord = { object: object, type: changeType };
	                        for (prop in result)
	                            if (prop !== "object" && prop !== "type")
	                                changeRecord[prop] = result[prop];
	                        addChangeRecord(object, data, changeRecord);
	                    }
	                }
	            };
	        },
	
	        /**
	         * Register (or redefines) an handler in the collection for a given
	         * object and a given type accept list.
	         * @function setHandler
	         * @param {Object} object
	         * @param {ObjectData} data
	         * @param {Handler} handler
	         * @param {String[]} acceptList
	         */
	        setHandler = function(object, data, handler, acceptList) {
	            var hdata = handlers.get(handler);
	            if (!hdata)
	                handlers.set(handler, hdata = {
	                    observed: createMap(),
	                    changeRecords: []
	                });
	            hdata.observed.set(object, {
	                acceptList: acceptList.slice(),
	                data: data
	            });
	            data.handlers.set(handler, hdata);
	        },
	
	        /**
	         * Adds a change record in a given ObjectData
	         * @function addChangeRecord
	         * @param {Object} object
	         * @param {ObjectData} data
	         * @param {ChangeRecord} changeRecord
	         * @param {String} [except]
	         */
	        addChangeRecord = function(object, data, changeRecord, except) {
	            data.handlers.forEach(function(hdata) {
	                var acceptList = hdata.observed.get(object).acceptList;
	                // If except is defined, Notifier.performChange has been
	                // called, with except as the type.
	                // All the handlers that accepts that type are skipped.
	                if ((typeof except !== "string"
	                        || inArray(acceptList, except) === -1)
	                        && inArray(acceptList, changeRecord.type) > -1)
	                    hdata.changeRecords.push(changeRecord);
	            });
	        };
	
	    observed = createMap();
	    handlers = createMap();
	
	    /**
	     * @function Object.observe
	     * @see http://arv.github.io/ecmascript-object-observe/#Object.observe
	     * @param {Object} object
	     * @param {Handler} handler
	     * @param {String[]} [acceptList]
	     * @throws {TypeError}
	     * @returns {Object}               The observed object
	     */
	    O.observe = function observe(object, handler, acceptList) {
	        if (!object || typeof object !== "object" && typeof object !== "function")
	            throw new TypeError("Object.observe cannot observe non-object");
	
	        if (typeof handler !== "function")
	            throw new TypeError("Object.observe cannot deliver to non-function");
	
	        if (O.isFrozen && O.isFrozen(handler))
	            throw new TypeError("Object.observe cannot deliver to a frozen function object");
	
	        if (acceptList === _undefined)
	            acceptList = defaultAcceptList;
	        else if (!acceptList || typeof acceptList !== "object")
	            throw new TypeError("Third argument to Object.observe must be an array of strings.");
	
	        doObserve(object, handler, acceptList);
	
	        return object;
	    };
	
	    /**
	     * @function Object.unobserve
	     * @see http://arv.github.io/ecmascript-object-observe/#Object.unobserve
	     * @param {Object} object
	     * @param {Handler} handler
	     * @throws {TypeError}
	     * @returns {Object}         The given object
	     */
	    O.unobserve = function unobserve(object, handler) {
	        if (object === null || typeof object !== "object" && typeof object !== "function")
	            throw new TypeError("Object.unobserve cannot unobserve non-object");
	
	        if (typeof handler !== "function")
	            throw new TypeError("Object.unobserve cannot deliver to non-function");
	
	        var hdata = handlers.get(handler), odata;
	
	        if (hdata && (odata = hdata.observed.get(object))) {
	            hdata.observed.forEach(function(odata, object) {
	                performPropertyChecks(odata.data, object);
	            });
	            nextFrame(function() {
	                deliverHandlerRecords(hdata, handler);
	            });
	
	            // In Firefox 13-18, size is a function, but createMap should fall
	            // back to the shim for those versions
	            if (hdata.observed.size === 1 && hdata.observed.has(object))
	                handlers["delete"](handler);
	            else hdata.observed["delete"](object);
	
	            if (odata.data.handlers.size === 1)
	                observed["delete"](object);
	            else odata.data.handlers["delete"](handler);
	        }
	
	        return object;
	    };
	
	    /**
	     * @function Object.getNotifier
	     * @see http://arv.github.io/ecmascript-object-observe/#GetNotifier
	     * @param {Object} object
	     * @throws {TypeError}
	     * @returns {Notifier}
	     */
	    O.getNotifier = function getNotifier(object) {
	        if (object === null || typeof object !== "object" && typeof object !== "function")
	            throw new TypeError("Object.getNotifier cannot getNotifier non-object");
	
	        if (O.isFrozen && O.isFrozen(object)) return null;
	
	        return retrieveNotifier(object);
	    };
	
	    /**
	     * @function Object.deliverChangeRecords
	     * @see http://arv.github.io/ecmascript-object-observe/#Object.deliverChangeRecords
	     * @see http://arv.github.io/ecmascript-object-observe/#DeliverChangeRecords
	     * @param {Handler} handler
	     * @throws {TypeError}
	     */
	    O.deliverChangeRecords = function deliverChangeRecords(handler) {
	        if (typeof handler !== "function")
	            throw new TypeError("Object.deliverChangeRecords cannot deliver to non-function");
	
	        var hdata = handlers.get(handler);
	        if (hdata) {
	            hdata.observed.forEach(function(odata, object) {
	                performPropertyChecks(odata.data, object);
	            });
	            deliverHandlerRecords(hdata, handler);
	        }
	    };
	
	})(Object, Array, this);


/***/ },
/* 19 */
/***/ function(module, exports) {

	Object.observe && !Array.observe && (function(O, A) {
	"use strict";
	
	var notifier = O.getNotifier,
	    perform = "performChange",
	    original = "_original",
	    type = "splice";
	
	var wrappers = {
	    push: function push(item) {
	        var args = arguments,
	            ret = push[original].apply(this, args);
	
	        notifier(this)[perform](type, function() {
	            return {
	                index: ret - args.length,
	                addedCount: args.length,
	                removed: []
	            };
	        });
	
	        return ret;
	    },
	    unshift: function unshift(item) {
	        var args = arguments,
	            ret = unshift[original].apply(this, args);
	
	        notifier(this)[perform](type, function() {
	            return {
	                index: 0,
	                addedCount: args.length,
	                removed: []
	            };
	        });
	
	        return ret;
	    },
	    pop: function pop() {
	        var len = this.length,
	            item = pop[original].call(this);
	
	        if (this.length !== len)
	            notifier(this)[perform](type, function() {
	                return {
	                    index: this.length,
	                    addedCount: 0,
	                    removed: [ item ]
	                };
	            }, this);
	
	        return item;
	    },
	    shift: function shift() {
	        var len = this.length,
	            item = shift[original].call(this);
	
	        if (this.length !== len)
	            notifier(this)[perform](type, function() {
	                return {
	                    index: 0,
	                    addedCount: 0,
	                    removed: [ item ]
	                };
	            }, this);
	
	        return item;
	    },
	    splice: function splice(start, deleteCount) {
	        var args = arguments,
	            removed = splice[original].apply(this, args);
	
	        if (removed.length || args.length > 2)
	            notifier(this)[perform](type, function() {
	                return {
	                    index: start,
	                    addedCount: args.length - 2,
	                    removed: removed
	                };
	            }, this);
	
	        return removed;
	    }
	};
	
	for (var wrapper in wrappers) {
	    wrappers[wrapper][original] = A.prototype[wrapper];
	    A.prototype[wrapper] = wrappers[wrapper];
	}
	
	A.observe = function(object, handler) {
	    return O.observe(object, handler, [ "add", "update", "delete", type ]);
	};
	A.unobserve = O.unobserve;
	
	})(Object, Array);


/***/ }
/******/ ]);
//# sourceMappingURL=mcore3.es5.js.map