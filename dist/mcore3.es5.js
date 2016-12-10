(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["$"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_31__) {
return /******/ (function(modules) { // webpackBootstrap
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
	'use strict';
	__webpack_require__(1);
	var array_from_1 = __webpack_require__(4);
	array_from_1.shim();
	var index_1 = __webpack_require__(29);
	module.exports = index_1.default;


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
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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

	'use strict';
	
	var define = __webpack_require__(5);
	
	var implementation = __webpack_require__(9);
	var getPolyfill = __webpack_require__(27);
	var shim = __webpack_require__(28);
	
	// eslint-disable-next-line no-unused-vars
	var boundFromShim = function from(array) {
	    // eslint-disable-next-line no-invalid-this
		return implementation.apply(this || Array, arguments);
	};
	
	define(boundFromShim, {
		'getPolyfill': getPolyfill,
		'implementation': implementation,
		'shim': shim
	});
	
	module.exports = boundFromShim;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys = __webpack_require__(6);
	var foreach = __webpack_require__(8);
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
	
	var toStr = Object.prototype.toString;
	
	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};
	
	var arePropertyDescriptorsSupported = function () {
		var obj = {};
		try {
			Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	        /* eslint-disable no-unused-vars, no-restricted-syntax */
	        for (var _ in obj) { return false; }
	        /* eslint-enable no-unused-vars, no-restricted-syntax */
			return obj.x === obj;
		} catch (e) { /* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();
	
	var defineProperty = function (object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value;
		}
	};
	
	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols) {
			props = props.concat(Object.getOwnPropertySymbols(map));
		}
		foreach(props, function (name) {
			defineProperty(object, name, map[name], predicates[name]);
		});
	};
	
	defineProperties.supportsDescriptors = !!supportsDescriptors;
	
	module.exports = defineProperties;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(7);
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};
	
	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];
	
		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}
	
		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}
	
		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}
	
		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	
			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
	
	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			}(1, 2));
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};
	
	module.exports = keysShim;


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	
	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;
	
	module.exports = function forEach (obj, fn, ctx) {
	    if (toString.call(fn) !== '[object Function]') {
	        throw new TypeError('iterator must be a function');
	    }
	    var l = obj.length;
	    if (l === +l) {
	        for (var i = 0; i < l; i++) {
	            fn.call(ctx, obj[i], i, obj);
	        }
	    } else {
	        for (var k in obj) {
	            if (hasOwn.call(obj, k)) {
	                fn.call(ctx, obj[k], k, obj);
	            }
	        }
	    }
	};
	


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ES = __webpack_require__(10);
	var supportsDescriptors = __webpack_require__(5).supportsDescriptors;
	
	/*! https://mths.be/array-from v0.2.0 by @mathias */
	module.exports = function from(arrayLike) {
		var defineProperty = supportsDescriptors ? Object.defineProperty : function put(object, key, descriptor) {
			object[key] = descriptor.value;
		};
		var C = this;
		if (arrayLike === null || typeof arrayLike === 'undefined') {
			throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
		}
		var items = ES.ToObject(arrayLike);
	
		var mapFn, T;
		if (typeof arguments[1] !== 'undefined') {
			mapFn = arguments[1];
			if (!ES.IsCallable(mapFn)) {
				throw new TypeError('When provided, the second argument to `Array.from` must be a function');
			}
			if (arguments.length > 2) {
				T = arguments[2];
			}
		}
	
		var len = ES.ToLength(items.length);
		var A = ES.IsCallable(C) ? ES.ToObject(new C(len)) : new Array(len);
		var k = 0;
		var kValue, mappedValue;
		while (k < len) {
			kValue = items[k];
			if (mapFn) {
				mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : ES.Call(mapFn, T, [kValue, k]);
			} else {
				mappedValue = kValue;
			}
			defineProperty(A, k, {
				'configurable': true,
				'enumerable': true,
				'value': mappedValue,
				'writable': true
			});
			k += 1;
		}
		A.length = len;
		return A;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
	var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;
	
	var $isNaN = __webpack_require__(11);
	var $isFinite = __webpack_require__(12);
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
	
	var assign = __webpack_require__(13);
	var sign = __webpack_require__(14);
	var mod = __webpack_require__(15);
	var isPrimitive = __webpack_require__(16);
	var toPrimitive = __webpack_require__(17);
	var parseInteger = parseInt;
	var bind = __webpack_require__(22);
	var strSlice = bind.call(Function.call, String.prototype.slice);
	var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
	var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
	var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
	var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
	var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
	var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
	var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);
	
	// whitespace from: http://es5.github.io/#x15.5.4.20
	// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
	var ws = [
		'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
		'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
		'\u2029\uFEFF'
	].join('');
	var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
	var replace = bind.call(Function.call, String.prototype.replace);
	var trim = function (value) {
		return replace(value, trimRegex, '');
	};
	
	var ES5 = __webpack_require__(24);
	
	var hasRegExpMatcher = __webpack_require__(26);
	
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
	var ES6 = assign(assign({}, ES5), {
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
		Call: function Call(F, V) {
			var args = arguments.length > 2 ? arguments[2] : [];
			if (!this.IsCallable(F)) {
				throw new TypeError(F + ' is not a function');
			}
			return F.apply(V, args);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
		ToPrimitive: toPrimitive,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
		// ToBoolean: ES5.ToBoolean,
	
		// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
		ToNumber: function ToNumber(argument) {
			var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
			if (typeof value === 'symbol') {
				throw new TypeError('Cannot convert a Symbol value to a number');
			}
			if (typeof value === 'string') {
				if (isBinary(value)) {
					return this.ToNumber(parseInteger(strSlice(value, 2), 2));
				} else if (isOctal(value)) {
					return this.ToNumber(parseInteger(strSlice(value, 2), 8));
				} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
					return NaN;
				} else {
					var trimmed = trim(value);
					if (trimmed !== value) {
						return this.ToNumber(trimmed);
					}
				}
			}
			return Number(value);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
		// ToInteger: ES5.ToNumber,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
		// ToInt32: ES5.ToInt32,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
		// ToUint32: ES5.ToUint32,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
		ToInt16: function ToInt16(argument) {
			var int16bit = this.ToUint16(argument);
			return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
		// ToUint16: ES5.ToUint16,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
		ToInt8: function ToInt8(argument) {
			var int8bit = this.ToUint8(argument);
			return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
		ToUint8: function ToUint8(argument) {
			var number = this.ToNumber(argument);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x100);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
		ToUint8Clamp: function ToUint8Clamp(argument) {
			var number = this.ToNumber(argument);
			if ($isNaN(number) || number <= 0) { return 0; }
			if (number >= 0xFF) { return 0xFF; }
			var f = Math.floor(argument);
			if (f + 0.5 < number) { return f + 1; }
			if (number < f + 0.5) { return f; }
			if (f % 2 !== 0) { return f + 1; }
			return f;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
		ToString: function ToString(argument) {
			if (typeof argument === 'symbol') {
				throw new TypeError('Cannot convert a Symbol value to a string');
			}
			return String(argument);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
		ToObject: function ToObject(value) {
			this.RequireObjectCoercible(value);
			return Object(value);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
		ToPropertyKey: function ToPropertyKey(argument) {
			var key = this.ToPrimitive(argument, String);
			return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
		ToLength: function ToLength(argument) {
			var len = this.ToInteger(argument);
			if (len <= 0) { return 0; } // includes converting -0 to +0
			if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
			return len;
		},
	
		// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
		CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
			if (toStr.call(argument) !== '[object String]') {
				throw new TypeError('must be a string');
			}
			if (argument === '-0') { return -0; }
			var n = this.ToNumber(argument);
			if (this.SameValue(this.ToString(n), argument)) { return n; }
			return void 0;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
		RequireObjectCoercible: ES5.CheckObjectCoercible,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
		IsArray: Array.isArray || function IsArray(argument) {
			return toStr.call(argument) === '[object Array]';
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
		// IsCallable: ES5.IsCallable,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
		IsConstructor: function IsConstructor(argument) {
			return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
		IsExtensible: function IsExtensible(obj) {
			if (!Object.preventExtensions) { return true; }
			if (isPrimitive(obj)) {
				return false;
			}
			return Object.isExtensible(obj);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
		IsInteger: function IsInteger(argument) {
			if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
				return false;
			}
			var abs = Math.abs(argument);
			return Math.floor(abs) === abs;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
		IsPropertyKey: function IsPropertyKey(argument) {
			return typeof argument === 'string' || typeof argument === 'symbol';
		},
	
		// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
		IsRegExp: function IsRegExp(argument) {
			if (!argument || typeof argument !== 'object') {
				return false;
			}
			if (hasSymbols) {
				var isRegExp = argument[Symbol.match];
				if (typeof isRegExp !== 'undefined') {
					return ES5.ToBoolean(isRegExp);
				}
			}
			return hasRegExpMatcher(argument);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
		// SameValue: ES5.SameValue,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
		SameValueZero: function SameValueZero(x, y) {
			return (x === y) || ($isNaN(x) && $isNaN(y));
		},
	
		Type: function Type(x) {
			if (typeof x === 'symbol') {
				return 'Symbol';
			}
			return ES5.Type(x);
		},
	
		// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
		SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
			if (this.Type(O) !== 'Object') {
				throw new TypeError('Assertion failed: Type(O) is not Object');
			}
			var C = O.constructor;
			if (typeof C === 'undefined') {
				return defaultConstructor;
			}
			if (this.Type(C) !== 'Object') {
				throw new TypeError('O.constructor is not an Object');
			}
			var S = hasSymbols && Symbol.species ? C[Symbol.species] : undefined;
			if (S == null) {
				return defaultConstructor;
			}
			if (this.IsConstructor(S)) {
				return S;
			}
			throw new TypeError('no constructor found');
		}
	});
	
	delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible
	
	module.exports = ES6;


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	var $isNaN = Number.isNaN || function (a) { return a !== a; };
	
	module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ },
/* 13 */
/***/ function(module, exports) {

	var has = Object.prototype.hasOwnProperty;
	module.exports = Object.assign || function assign(target, source) {
		for (var key in source) {
			if (has.call(source, key)) {
				target[key] = source[key];
			}
		}
		return target;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function sign(number) {
		return number >= 0 ? 1 : -1;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function mod(number, modulo) {
		var remain = number % modulo;
		return Math.floor(remain >= 0 ? remain : remain + modulo);
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
	
	var isPrimitive = __webpack_require__(18);
	var isCallable = __webpack_require__(19);
	var isDate = __webpack_require__(20);
	var isSymbol = __webpack_require__(21);
	
	var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
		if (typeof O === 'undefined' || O === null) {
			throw new TypeError('Cannot call method on ' + O);
		}
		if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
			throw new TypeError('hint must be "string" or "number"');
		}
		var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
		var method, result, i;
		for (i = 0; i < methodNames.length; ++i) {
			method = O[methodNames[i]];
			if (isCallable(method)) {
				result = method.call(O);
				if (isPrimitive(result)) {
					return result;
				}
			}
		}
		throw new TypeError('No default value');
	};
	
	var GetMethod = function GetMethod(O, P) {
		var func = O[P];
		if (func !== null && typeof func !== 'undefined') {
			if (!isCallable(func)) {
				throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
			}
			return func;
		}
	};
	
	// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		var hint = 'default';
		if (arguments.length > 1) {
			if (PreferredType === String) {
				hint = 'string';
			} else if (PreferredType === Number) {
				hint = 'number';
			}
		}
	
		var exoticToPrim;
		if (hasSymbols) {
			if (Symbol.toPrimitive) {
				exoticToPrim = GetMethod(input, Symbol.toPrimitive);
			} else if (isSymbol(input)) {
				exoticToPrim = Symbol.prototype.valueOf;
			}
		}
		if (typeof exoticToPrim !== 'undefined') {
			var result = exoticToPrim.call(input, hint);
			if (isPrimitive(result)) {
				return result;
			}
			throw new TypeError('unable to convert exotic object to primitive');
		}
		if (hint === 'default' && (isDate(input) || isSymbol(input))) {
			hint = 'string';
		}
		return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	var fnToStr = Function.prototype.toString;
	
	var constructorRegex = /^\s*class /;
	var isES6ClassFn = function isES6ClassFn(value) {
		try {
			var fnStr = fnToStr.call(value);
			var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
			var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
			var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
			return constructorRegex.test(spaceStripped);
		} catch (e) {
			return false; // not a function
		}
	};
	
	var tryFunctionObject = function tryFunctionObject(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	
	module.exports = function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	var getDay = Date.prototype.getDay;
	var tryDateObject = function tryDateObject(value) {
		try {
			getDay.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	
	var toStr = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	
	module.exports = function isDateObject(value) {
		if (typeof value !== 'object' || value === null) { return false; }
		return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
	
	if (hasSymbols) {
		var symToStr = Symbol.prototype.toString;
		var symStringRegex = /^Symbol\(.*\)$/;
		var isSymbolObject = function isSymbolObject(value) {
			if (typeof value.valueOf() !== 'symbol') { return false; }
			return symStringRegex.test(symToStr.call(value));
		};
		module.exports = function isSymbol(value) {
			if (typeof value === 'symbol') { return true; }
			if (toStr.call(value) !== '[object Symbol]') { return false; }
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else {
		module.exports = function isSymbol(value) {
			// this environment does not support Symbols.
			return false;
		};
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var implementation = __webpack_require__(23);
	
	module.exports = Function.prototype.bind || implementation;


/***/ },
/* 23 */
/***/ function(module, exports) {

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';
	
	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);
	
	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };
	
	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }
	
	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
	
	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }
	
	    return bound;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $isNaN = __webpack_require__(11);
	var $isFinite = __webpack_require__(12);
	
	var sign = __webpack_require__(14);
	var mod = __webpack_require__(15);
	
	var IsCallable = __webpack_require__(19);
	var toPrimitive = __webpack_require__(25);
	
	// https://es5.github.io/#x9
	var ES5 = {
		ToPrimitive: toPrimitive,
	
		ToBoolean: function ToBoolean(value) {
			return Boolean(value);
		},
		ToNumber: function ToNumber(value) {
			return Number(value);
		},
		ToInteger: function ToInteger(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number)) { return 0; }
			if (number === 0 || !$isFinite(number)) { return number; }
			return sign(number) * Math.floor(Math.abs(number));
		},
		ToInt32: function ToInt32(x) {
			return this.ToNumber(x) >> 0;
		},
		ToUint32: function ToUint32(x) {
			return this.ToNumber(x) >>> 0;
		},
		ToUint16: function ToUint16(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x10000);
		},
		ToString: function ToString(value) {
			return String(value);
		},
		ToObject: function ToObject(value) {
			this.CheckObjectCoercible(value);
			return Object(value);
		},
		CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
			/* jshint eqnull:true */
			if (value == null) {
				throw new TypeError(optMessage || 'Cannot call method on ' + value);
			}
			return value;
		},
		IsCallable: IsCallable,
		SameValue: function SameValue(x, y) {
			if (x === y) { // 0 === -0, but they are not identical.
				if (x === 0) { return 1 / x === 1 / y; }
				return true;
			}
			return $isNaN(x) && $isNaN(y);
		},
	
		// http://www.ecma-international.org/ecma-262/5.1/#sec-8
		Type: function Type(x) {
			if (x === null) {
				return 'Null';
			}
			if (typeof x === 'undefined') {
				return 'Undefined';
			}
			if (typeof x === 'function' || typeof x === 'object') {
				return 'Object';
			}
			if (typeof x === 'number') {
				return 'Number';
			}
			if (typeof x === 'boolean') {
				return 'Boolean';
			}
			if (typeof x === 'string') {
				return 'String';
			}
		}
	};
	
	module.exports = ES5;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	
	var isPrimitive = __webpack_require__(18);
	
	var isCallable = __webpack_require__(19);
	
	// https://es5.github.io/#x8.12
	var ES5internalSlots = {
		'[[DefaultValue]]': function (O, hint) {
			var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);
	
			if (actualHint === String || actualHint === Number) {
				var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
				var value, i;
				for (i = 0; i < methods.length; ++i) {
					if (isCallable(O[methods[i]])) {
						value = O[methods[i]]();
						if (isPrimitive(value)) {
							return value;
						}
					}
				}
				throw new TypeError('No default value');
			}
			throw new TypeError('invalid [[DefaultValue]] hint supplied');
		}
	};
	
	// https://es5.github.io/#x9
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	var regexExec = RegExp.prototype.exec;
	var tryRegexExec = function tryRegexExec(value) {
		try {
			regexExec.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var regexClass = '[object RegExp]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	
	module.exports = function isRegex(value) {
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ES = __webpack_require__(10);
	var implementation = __webpack_require__(9);
	
	var tryCall = function (fn) {
		try {
			fn();
			return true;
		} catch (e) {
			return false;
		}
	};
	
	module.exports = function getPolyfill() {
		var implemented = ES.IsCallable(Array.from)
			&& tryCall(function () { Array.from({ 'length': -Infinity }); })
			&& !tryCall(function () { Array.from([], undefined); });
	
		return implemented ? Array.from : implementation;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(5);
	var getPolyfill = __webpack_require__(27);
	
	module.exports = function shimArrayFrom() {
		var polyfill = getPolyfill();
	
		define(Array, { 'from': polyfill }, {
			'from': function () {
				return Array.from !== polyfill;
			}
		});
	
		return polyfill;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * mcore version 3
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var util = __webpack_require__(30);
	var element_1 = __webpack_require__(32);
	var template_1 = __webpack_require__(33);
	var eventEmitter_1 = __webpack_require__(35);
	var component_1 = __webpack_require__(39);
	var route = __webpack_require__(47);
	var view_1 = __webpack_require__(50);
	var app_1 = __webpack_require__(51);
	var http_1 = __webpack_require__(52);
	var helper_1 = __webpack_require__(53);
	helper_1.buildCss();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    version: '3',
	    util: util,
	    route: route,
	    http: http_1.default,
	    Element: element_1.default,
	    Template: template_1.default,
	    EventEmitter: eventEmitter_1.default,
	    Component: component_1.default,
	    View: view_1.default,
	    App: app_1.default
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 工具类
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var jquery = __webpack_require__(31);
	var element_1 = __webpack_require__(32);
	var VAR_REG = /(^[a-zA-Z0-9_-]+)$/;
	var _isIOS = null;
	var _isWeixinBrowser = null;
	/**
	 * 是否 ios
	 */
	function isIOS() {
	    if (_isIOS === null) {
	        _isIOS = typeof window === 'object' && (/iphone|ipad/gi).test(window.navigator.appVersion);
	    }
	    return _isIOS;
	}
	exports.isIOS = isIOS;
	/**
	 * 是否运行在微信里
	 */
	function isWeixinBrowser() {
	    if (_isWeixinBrowser === null) {
	        _isWeixinBrowser = typeof window === 'object' && (/MicroMessenger/i).test(window.navigator.userAgent);
	    }
	    return _isWeixinBrowser;
	}
	exports.isWeixinBrowser = isWeixinBrowser;
	/**
	 * 返回一个 jquery
	 */
	function get$() {
	    if (typeof $ === 'function') {
	        return $;
	    }
	    return jquery;
	}
	exports.get$ = get$;
	/**
	 * 遍历数组
	 * @param arr 要遍历的数组
	 * @param {function} callback 回调函数
	 */
	function each(arr, callback) {
	    get$().each(arr, function (k, v) {
	        return callback(v, k);
	    });
	}
	exports.each = each;
	/**
	 * 是否数组
	 * @param x 要检查的变量
	 */
	function isNumber(x) {
	    return get$().isNumeric(x);
	}
	exports.isNumber = isNumber;
	/**
	 * 是否数组
	 * @param x 要检查的变量
	 */
	function isArray(x) {
	    return get$().isArray(x);
	}
	exports.isArray = isArray;
	/**
	 * 是否文本
	 * @param x 要检查的变量
	 */
	function isString(x) {
	    return get$().type(x) === 'string';
	}
	exports.isString = isString;
	/**
	 * 返回类型
	 * @param x 要检查的变量
	 */
	function type(x) {
	    return get$().type(x);
	}
	exports.type = type;
	/**
	 * 是否函数
	 * @param x 要检查的变量
	 */
	function isFunction(x) {
	    return get$().isFunction(x);
	}
	exports.isFunction = isFunction;
	/**
	 * 是否一个简单对象
	 * @param x 要检查的变量
	 */
	function isObject(x) {
	    return get$().isPlainObject(x);
	}
	exports.isObject = isObject;
	/**
	 * 是否一个简单对象
	 * @param x 要检查的变量
	 */
	function isPlainObject(x) {
	    return get$().isPlainObject(x);
	}
	exports.isPlainObject = isPlainObject;
	/**
	 * clone 对象
	 * @param x 要 clone 的变量
	 */
	function clone(x) {
	    if (isArray(x)) {
	        return get$().extend(true, [], x);
	    }
	    else if (isPlainObject(x)) {
	        return get$().extend(true, {}, x);
	    }
	    return x;
	}
	exports.clone = clone;
	function extend(x) {
	    return clone(x);
	}
	exports.extend = extend;
	/**
	 * 取 mcore element 的所有事件 （含子树）
	 * @param element mcore Element
	 * @param events 事件数据
	 */
	function getEvents(element, events) {
	    if (events === void 0) { events = {}; }
	    if (element.children) {
	        element.children.forEach(function (child) {
	            getEvents(child, events);
	        });
	    }
	    Object.keys(element.events).forEach(function (name) {
	        var curEvent = element.events[name];
	        if (!events.hasOwnProperty(name)) {
	            events[name] = [];
	        }
	        events[name].push({
	            funName: curEvent.funName,
	            args: curEvent.args,
	            target: function () {
	                // console.log(element);
	                return element.refs;
	            },
	            element: element
	        });
	    });
	    return events;
	}
	exports.getEvents = getEvents;
	/**
	 * 如果组件指定 mc-children-container="true", 返回特定 MCElement
	 */
	function getComponentContainer(elements, maxLevel, level) {
	    if (maxLevel === void 0) { maxLevel = 100; }
	    if (level === void 0) { level = 0; }
	    if (maxLevel === level) {
	        return null;
	    }
	    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
	        var el = elements_1[_i];
	        if (el.dynamicProps['children-container']) {
	            return el;
	        }
	        var findChildren = getComponentContainer(el.children, maxLevel, level + 1);
	        if (findChildren) {
	            return findChildren;
	        }
	    }
	    return null;
	}
	exports.getComponentContainer = getComponentContainer;
	/**
	 * 取 mcore element 的所有组件 （含子树）
	 * @param element mcore Element
	 * @param components 组件列表
	 */
	function getComponents(element, components) {
	    if (components === void 0) { components = []; }
	    if (!element) {
	        return components;
	    }
	    if (element.children) {
	        element.children.forEach(function (child) {
	            getComponents(child, components);
	        });
	    }
	    if (element._component) {
	        components.push(element._component);
	    }
	    return components;
	}
	exports.getComponents = getComponents;
	/**
	 * 根据属性路径从对象中取值
	 * @param path 属性路径
	 * @param obj 对象
	 */
	function getObjAttrByPath(path, obj) {
	    if (obj === void 0) { obj = {}; }
	    if (path.indexOf('.') === -1) {
	        return obj[path];
	    }
	    var pathArr = path.split('.');
	    var curObj = obj;
	    each(pathArr, function (curPath) {
	        if (isNumber(curPath) && isArray(curObj)) {
	            var ix = parseInt(curPath);
	            if (ix < pathArr.length) {
	                curObj = curObj[ix];
	                return;
	            }
	            else {
	                curObj = null;
	                return false;
	            }
	        }
	        else if (isObject(curObj) && curObj.hasOwnProperty(curPath)) {
	            curObj = curObj[curPath];
	            return;
	        }
	        else {
	            curObj = null;
	            return false;
	        }
	    });
	    return curObj;
	}
	exports.getObjAttrByPath = getObjAttrByPath;
	/**
	 * 解释动态值
	 * @param dynamicCode 动态表达式
	 * @param dynamicCodeStr 静态代码
	 * @param view 对应的 view
	 */
	function parseDynamicVal(dynamicCode, dynamicCodeStr, view) {
	    if (type(dynamicCode) === 'function') {
	        type(console) !== 'undefined' && console.error('dynamicCode can not be a function');
	        return '';
	    }
	    else if (type(dynamicCode) !== 'undefined'
	        && ((type(element_1.default) === 'function' || type(element_1.default) === 'object')
	            && dynamicCode instanceof element_1.default === false)) {
	        return type(dynamicCode) === 'undefined' ? '' : dynamicCode;
	    }
	    else if (type(view[dynamicCode]) !== 'undefined') {
	        return view[dynamicCode];
	    }
	    else if (VAR_REG.test(dynamicCodeStr)) {
	        return type(dynamicCodeStr) === 'undefined' ? '' : dynamicCodeStr;
	    }
	    else {
	        return '';
	    }
	}
	exports.parseDynamicVal = parseDynamicVal;
	/**
	 * 调用过滤函数
	 * @param formatterName 函数名
	 * @param mcore
	 */
	function callFormatter(formatterName, mcore) {
	    if (mcore.Template.formatters.hasOwnProperty(formatterName)) {
	        return mcore.Template.formatters[formatterName];
	    }
	    return function () { };
	}
	exports.callFormatter = callFormatter;
	/**
	 * NodeList to Array
	 */
	function nodeListToArray(nodeList) {
	    var list = [];
	    for (var i = 0, len = nodeList.length; i < len; i++) {
	        list.push(nodeList[i]);
	    }
	    return list;
	}
	exports.nodeListToArray = nodeListToArray;
	/**
	 * 放到下一帧执行
	 */
	var NextTick = (function () {
	    function NextTick() {
	    }
	    NextTick.requestAnimationFrame = function () {
	        return typeof requestAnimationFrame === 'function' ? requestAnimationFrame : setTimeout;
	    };
	    NextTick.cancelAnimationFrame = function () {
	        return typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;
	    };
	    /**
	     * 放到下一帧执行
	     * @param {function} fun 任务
	     * @return 任务id
	     */
	    NextTick.next = function (fun) {
	        return NextTick.requestAnimationFrame()(function () {
	            fun();
	        });
	    };
	    /**
	     * 清除需要下一帧执行的任务
	     * @param id 任务id
	     */
	    NextTick.clear = function (id) {
	        return NextTick.cancelAnimationFrame()(id);
	    };
	    return NextTick;
	}());
	exports.NextTick = NextTick;


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_31__;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * mcore element
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var template_1 = __webpack_require__(33);
	/**
	 * mcore element
	 */
	var Element = (function () {
	    // get refs() {
	    //     return this.template ? this.template.refs : null
	    // }
	    function Element(tagName, key, props, dynamicProps, children, events, view) {
	        if (props === void 0) { props = {}; }
	        if (dynamicProps === void 0) { dynamicProps = {}; }
	        if (children === void 0) { children = []; }
	        if (events === void 0) { events = {}; }
	        if (view === void 0) { view = null; }
	        var _this = this;
	        /**
	         * 不 diff 节元素
	         */
	        this._noDiffChild = false;
	        /**
	         * 是否有绑定 binder
	         */
	        this._binder = false;
	        this.tagName = tagName.trim().toLowerCase();
	        this.key = key;
	        this.props = props;
	        this.dynamicProps = dynamicProps;
	        this.children = children;
	        this.events = events;
	        this.parentElement = null;
	        this.view = view;
	        if (Array.isArray(children) === false) {
	            children = [];
	        }
	        var count = 0;
	        children.forEach(function (child, i) {
	            if (child instanceof Element) {
	                // 指定上级
	                child.parentElement = _this;
	                count += child.count;
	            }
	            count++;
	        });
	        // 子节点数量
	        this.count = count;
	    }
	    /**
	     * 复制已经渲染的 element
	     */
	    Element.prototype.cloneElement = function (element) {
	        var _this = this;
	        this._component = element._component;
	        this._noDiffChild = element._noDiffChild;
	        this._binder = element._binder;
	        this.refs = element.refs;
	        this.view = element.view;
	        // this.children = element.children
	        // this.count = element.count
	        this.template = element.template;
	        this.template.element = this;
	        if (this._component) {
	            this._component.bindEvents();
	        }
	        element = null;
	        // 设置动态属性
	        Object.keys(this.dynamicProps).forEach(function (attr) {
	            _this.template.setAttr(attr.toLowerCase(), _this.dynamicProps[attr], true, 'update');
	        });
	        return this.refs;
	    };
	    Element.prototype.render = function () {
	        this.template = new template_1.default(this);
	        this.refs = this.template.render();
	        return this.refs;
	    };
	    Element.prototype.destroy = function (notRemove) {
	        if (notRemove === void 0) { notRemove = false; }
	        if (this.template) {
	            this.template.destroy(notRemove);
	        }
	    };
	    return Element;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Element;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 模板渲染
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var tslib_1 = __webpack_require__(34);
	var util_1 = __webpack_require__(30);
	var eventEmitter_1 = __webpack_require__(35);
	var binders_1 = __webpack_require__(37);
	var formatters_1 = __webpack_require__(38);
	var util = __webpack_require__(30);
	/**
	 * 模板引擎
	 */
	var Template = (function (_super) {
	    tslib_1.__extends(Template, _super);
	    function Template(element) {
	        var _this = _super.call(this) || this;
	        _this._isWatchEvent = false;
	        _this.element = element;
	        return _this;
	        // this.childrenComponent = []
	    }
	    Template.prototype.destroy = function (notRemove) {
	        if (notRemove === void 0) { notRemove = false; }
	        util.getComponents(this.element).forEach(function (component) {
	            component.destroy();
	        });
	        // 移除自身
	        if (!notRemove) {
	            if (this.refs && this.refs.parentNode && this.refs.parentNode.removeChild) {
	                this.refs.parentNode.removeChild(this.refs);
	            }
	        }
	        this.emit('destroy');
	    };
	    /**
	     * 渲染 node
	     * @method render
	     * @return {Element}
	     */
	    Template.prototype.render = function () {
	        var _this = this;
	        var node;
	        if (this.element.tagName == '_textnode') {
	            if (this.element.dynamicProps.hasOwnProperty('text')) {
	                node = document.createTextNode(this.element.dynamicProps.text);
	            }
	            else {
	                node = document.createTextNode(this.element.props.text);
	            }
	            node._key = this.element.key;
	            // console.log(this.element.key, this.element);
	            this.refs = node;
	            // node._element = this.element;
	            return node;
	        }
	        node = document.createElement(this.element.tagName);
	        node._key = this.element.key;
	        node._element = this.element;
	        this.refs = node;
	        // 自定义组件初始化，子元素由 自定义组件 自己管理
	        if (Template.components.hasOwnProperty(this.element.tagName)) {
	            // 自定义组件，先设置静态属性
	            Object.keys(this.element.props).forEach(function (attr) {
	                _this.setAttr(attr.toLowerCase(), _this.element.props[attr]);
	            });
	            // 设置动态属性
	            Object.keys(this.element.dynamicProps).forEach(function (attr) {
	                _this.setAttr(attr.toLowerCase(), _this.element.dynamicProps[attr], true);
	            });
	            this.element._component = new Template.components[this.element.tagName](node, this.element);
	            this.element._noDiffChild = true;
	        }
	        else {
	            this.element.children.forEach(function (child) {
	                if (child.render) {
	                    var childNode = child.render();
	                    if (childNode) {
	                        _this.refs.appendChild(childNode);
	                    }
	                    else {
	                        console.log(childNode);
	                    }
	                }
	                else {
	                    console.log(child);
	                    throw new Error('child not Mcore Element');
	                }
	            });
	            // 设置静态属性
	            Object.keys(this.element.props).forEach(function (attr) {
	                _this.setAttr(attr.toLowerCase(), _this.element.props[attr]);
	            });
	            // 设置动态属性
	            Object.keys(this.element.dynamicProps).forEach(function (attr) {
	                _this.setAttr(attr.toLowerCase(), _this.element.dynamicProps[attr], true);
	            });
	        }
	        return this.refs;
	    };
	    /**
	     * 调用自定义属性
	     */
	    Template.prototype.callBinder = function (binder, status, value, attrValue) {
	        if (attrValue === void 0) { attrValue = null; }
	        if (util_1.isFunction(binder)) {
	            this.element._binder = true;
	            binder(this.refs, value, attrValue);
	        }
	        if (status === 'init') {
	            if (util_1.isFunction(binder.init)) {
	                this.element._binder = true;
	                binder.init(this.refs, value, attrValue);
	            }
	            // 兼容mcore2
	            if (util_1.isFunction(binder.rendered)) {
	                this.element._binder = true;
	                binder.rendered(this.refs, value, attrValue);
	            }
	        }
	        else {
	            var binderFun = binder[status];
	            if (util_1.isFunction(binderFun)) {
	                this.element._binder = true;
	                binderFun(this.refs, value, attrValue);
	            }
	        }
	    };
	    /**
	     * 通知更新的值
	     */
	    Template.prototype.update = function (attr, value, status) {
	        if (this.element._component) {
	            this.element._component.update(attr, value, status);
	        }
	        this.emit(status, attr, value);
	        this.emit('change:' + attr, value);
	    };
	    /**
	     * 设置 node 属性
	     */
	    Template.prototype.setAttr = function (attr, value, isDynamic, status) {
	        if (isDynamic === void 0) { isDynamic = false; }
	        if (status === void 0) { status = 'init'; }
	        // 处理动态属性
	        if (isDynamic) {
	            if (this.element.dynamicProps.hasOwnProperty(attr) === false) {
	                return;
	            }
	            if (Template.binders.hasOwnProperty(attr)) {
	                var binder = Template.binders[attr];
	                this.callBinder(binder, status, value);
	                return;
	            }
	            // 处理 mc-class-* (mc-class-test="true" => 'class-test': true)的情况
	            var TemplateBinderKeys = Object.keys(Template.binders);
	            for (var _i = 0, TemplateBinderKeys_1 = TemplateBinderKeys; _i < TemplateBinderKeys_1.length; _i++) {
	                var binderAttr = TemplateBinderKeys_1[_i];
	                if (binderAttr.indexOf('*')) {
	                    var t = binderAttr.split('*');
	                    if (t.length === 2) {
	                        var attrPrefix = t[0];
	                        var attrValue = attr.replace(attrPrefix, '');
	                        if (attr.indexOf(attrPrefix) === 0) {
	                            var binder = Template.binders[binderAttr];
	                            this.callBinder(binder, status, value, attrValue);
	                            return;
	                        }
	                    }
	                }
	            }
	            if (status != 'init' && this.element.dynamicProps[attr] !== value) {
	                this.update(attr, value, status);
	                return;
	            }
	        }
	        if (attr === 'class') {
	            this.refs.className = value;
	            return;
	        }
	        else if (attr === 'style') {
	            this.refs.style.cssText = value;
	            return;
	        }
	        // else if(attr === '_key'){
	        //     return;
	        // }
	        var tagName = this.element.tagName;
	        if (attr === 'value' && ['input', 'textarea', 'select'].indexOf(tagName) !== -1) {
	            this.refs.value = value;
	            return;
	        }
	        if (util_1.isNumber(value) || util_1.isString(value) || value === true) {
	            this.refs.setAttribute(attr, value);
	        }
	    };
	    return Template;
	}(eventEmitter_1.default));
	/**
	 * 绑定的自定义组件
	 */
	Template.components = {};
	/**
	 * binders
	 */
	Template.binders = binders_1.default;
	/**
	 * 过滤函数
	 */
	Template.formatters = formatters_1.default;
	/**
	 * 通过 function name 取 function
	 */
	Template.strToFun = function (el, value) {
	    if (!el._element || !el._element.view || !el._element.view[value]) {
	        return function () { };
	    }
	    return function () {
	        return el._element.view[value].apply(el._element.view, arguments);
	    };
	};
	/**
	 * 取模板对应的 view
	 */
	Template.getEnv = function (el) {
	    return el._element.view;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Template;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0
	
	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.
	
	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global global, define, System, Reflect, Promise */
	var __extends;
	var __assign;
	var __rest;
	var __decorate;
	var __param;
	var __metadata;
	var __awaiter;
	var __generator;
	(function (factory) {
	    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
	    if (typeof System === "object" && typeof System.register === "function") {
	        System.register("tslib", [], function (exporter) {
	            factory(createExporter(root, exporter));
	            return { setters: [], execute: function() { } };
	        });
	    }
	    else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (exports) { factory(createExporter(root, createExporter(exports))); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    else if (typeof module === "object" && typeof module.exports === "object") {
	        factory(createExporter(root, createExporter(module.exports)));
	    }
	    else {
	        factory(createExporter(root));
	    }
	
	    function createExporter(exports, previous) {
	        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
	    }
	})
	(function (exporter) {
	    __extends = function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	
	    __assign = Object.assign || function (t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	
	    __rest = function (s, e) {
	        var t = {};
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	            t[p] = s[p];
	        if (s != null && typeof Object.getOwnPropertySymbols === "function")
	            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
	                t[p[i]] = s[p[i]];
	        return t;
	    };
	
	    __decorate = function (decorators, target, key, desc) {
	        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	        return c > 3 && r && Object.defineProperty(target, key, r), r;
	    };
	
	    __param = function (paramIndex, decorator) {
	        return function (target, key) { decorator(target, key, paramIndex); }
	    };
	
	    __metadata = function (metadataKey, metadataValue) {
	        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	    };
	
	    __awaiter = function (thisArg, _arguments, P, generator) {
	        return new (P || (P = Promise))(function (resolve, reject) {
	            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	            step((generator = generator.apply(thisArg, _arguments)).next());
	        });
	    };
	
	    __generator = function (thisArg, body) {
	        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
	        return { next: verb(0), "throw": verb(1), "return": verb(2) };
	        function verb(n) { return function (v) { return step([n, v]); }; }
	        function step(op) {
	            if (f) throw new TypeError("Generator is already executing.");
	            while (_) try {
	                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	                if (y = 0, t) op = [0, t.value];
	                switch (op[0]) {
	                    case 0: case 1: t = op; break;
	                    case 4: _.label++; return { value: op[1], done: false };
	                    case 5: _.label++; y = op[1]; op = [0]; continue;
	                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                    default:
	                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                        if (t[2]) _.ops.pop();
	                        _.trys.pop(); continue;
	                }
	                op = body.call(thisArg, _);
	            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	        }
	    };
	
	    exporter("__extends", __extends);
	    exporter("__assign", __assign);
	    exporter("__rest", __rest);
	    exporter("__decorate", __decorate);
	    exporter("__param", __param);
	    exporter("__metadata", __metadata);
	    exporter("__awaiter", __awaiter);
	    exporter("__generator", __generator);
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * event Emitter
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var EventEmitter = __webpack_require__(36);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = EventEmitter;


/***/ },
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 模板自定义属性
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var util_1 = __webpack_require__(30);
	var binder = {
	    // /**
	    //  * 显示 dom
	    //  */
	    // show: function (el: HTMLElement, value) {
	    //     el.style.display = value ? '' : 'none'
	    // },
	    // /**
	    //  * 隐藏
	    //  */
	    // hide: function (el: HTMLElement, value) {
	    //     el.style.display = value ? 'none' : ''
	    // },
	    /**
	     * 选中
	     */
	    checked: function (el, value) {
	        if (value) {
	            el.checked = true;
	        }
	        else {
	            el.checked = false;
	        }
	    },
	    /**
	     * 禁用
	     */
	    disabled: function (el, value) {
	        if (value) {
	            el.disabled = true;
	        }
	        else {
	            el.disabled = false;
	        }
	    },
	    /**
	     * 只读
	     */
	    readonly: function (el, value) {
	        if (value) {
	            el.readOnly = true;
	        }
	        else {
	            el.readOnly = false;
	        }
	    },
	    /**
	     * 取得焦点
	     */
	    focus: function (el, value) {
	        if (el.focus && value) {
	            el.focus();
	        }
	        else if (el.blur && !value) {
	            el.blur();
	        }
	    },
	    /**
	     * 失去焦点
	     */
	    blur: function (el, value) {
	        if (el.focus && !value) {
	            el.focus();
	        }
	        else if (el.blur && value) {
	            el.blur();
	        }
	    },
	    /**
	     * html 内容
	     */
	    html: function (el, value) {
	        el.innerHTML = value || '';
	        el._element._noDiffChild = true;
	    },
	    /**
	     * 声明不要diff子节点
	     */
	    'no-diff-child': function (el, value) {
	        el._element._noDiffChild = value;
	    },
	    /**
	     * 值为真是，设置 dom class
	     */
	    'class-*': function (el, value, attrValue) {
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
	        }
	        else if (ix === -1) {
	            classNames.push(attrValue);
	            el.className = classNames.join(' ');
	        }
	    },
	    /**
	     * 根据表单的name值，取 data 对应的属性值
	     */
	    'form-load-data': {
	        init: function (el, data) {
	            if (data === void 0) { data = {}; }
	            if (el.tagName.toLowerCase() !== 'form' || !el._element) {
	                return el.setAttribute('load-data', data);
	            }
	            var $ = util_1.get$();
	            var $form = $(el);
	            Object.keys(data).forEach(function (k) {
	                var v = data[k];
	                var $el = $form.find("[name=" + k + "]");
	                if ($el.is('[type=checkbox],[type=radio]')) {
	                    $el.prop('checked', String($el.val()) === String(v));
	                }
	                else {
	                    $el.val(v);
	                }
	            });
	        }
	    },
	    /**
	     * 当 from 中的元素触发 change 事件，
	     * 且该元素的 name 值与 dataKey 的属性对上
	     * 则自动更新 dataKey 属性的值
	     */
	    'form-sync': {
	        init: function (el, dataKey) {
	            if (el.tagName.toLowerCase() !== 'form' || !el._element || !el._element.view) {
	                return el.setAttribute('sync', dataKey);
	            }
	            var view = el._element.view;
	            var $ = util_1.get$();
	            var $form = $(el);
	            var soure = dataKey;
	            if (util_1.isString(dataKey)) {
	                soure = util_1.getObjAttrByPath(dataKey, view.scope);
	            }
	            $form.on('change', '[name]', function () {
	                var $el = $(this);
	                var name = $el.attr('name');
	                if (name && soure) {
	                    if ($el.is('[type=checkbox],[type=radio]')) {
	                        var val = $el.prop('checked') ? this.value : '';
	                        soure[name] = val;
	                    }
	                    else {
	                        soure[name] = this.value;
	                    }
	                }
	            });
	        }
	    }
	};
	// 兼容 mcore2 
	binder['load-data'] = binder['form-load-data'];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = binder;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 过滤函数
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var util_1 = __webpack_require__(30);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    toNumber: function (x) {
	        if (util_1.isNumber(x)) {
	            return Number(x);
	        }
	        return 0;
	    },
	    toFixed: function (x, len) {
	        if (len === void 0) { len = 1; }
	        if (util_1.isNumber(x)) {
	            return Number(Number(x).toFixed(len));
	        }
	        return 0;
	    },
	    in: function (x) {
	        var arr = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            arr[_i - 1] = arguments[_i];
	        }
	        return arr.indexOf(x) !== -1;
	    },
	    objToStyle: function (value) {
	        var autoPx = [
	            'width', 'height', 'left', 'top', 'right', 'bottom',
	            'margin-top', 'margin-left', 'margin-right', 'margin-bottom',
	            'padding-top', 'padding-left', 'padding-right', 'padding-bottom'
	        ];
	        var css = [];
	        Object.keys(value).forEach(function (key) {
	            var val = value[key];
	            if (autoPx.indexOf(key) !== -1 && util_1.isNumber(val)) {
	                val = val + 'px';
	            }
	            css.push(key + ": " + val);
	        });
	        return css.join(';');
	    }
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 组件
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var tslib_1 = __webpack_require__(34);
	var eventEmitter_1 = __webpack_require__(35);
	var util = __webpack_require__(30);
	var template_1 = __webpack_require__(33);
	var element_1 = __webpack_require__(32);
	var diff_1 = __webpack_require__(40);
	var patch_1 = __webpack_require__(41);
	var watch_1 = __webpack_require__(44);
	var isFunction = util.isFunction;
	var nextTick = util.NextTick;
	var getEvents = util.getEvents;
	var getComponents = util.getComponents;
	var templateHelper = {
	    Template: template_1.default,
	    util: util,
	    Element: element_1.default
	};
	var keyCode = {
	    keyenter: 13,
	    keyesc: 27,
	    'key-enter': 13,
	    'key-esc': 27,
	    'key-back': 8,
	    'key-tab': 9,
	    'key-left': 37,
	    'key-up': 38,
	    'key-right': 39,
	    'key-down': 40,
	    'key-escape': 27
	};
	var $_win = null;
	var $_body = null;
	var _id = 0;
	var notProxyEvents = ['focus', 'blur'];
	var Component = (function (_super) {
	    tslib_1.__extends(Component, _super);
	    function Component(parentNode, parentElement, args) {
	        if (parentElement === void 0) { parentElement = {}; }
	        if (args === void 0) { args = {}; }
	        var _this = _super.call(this) || this;
	        // 渲染完成，回调队列
	        _this._queueCallbacks = [];
	        // 正在排队的渲染队列id
	        _this._queueId = null;
	        // 存放注册事件
	        _this._regEvents = [];
	        // 是否在观察 scope
	        _this._initWatchScope = false;
	        _this.util = util;
	        _this.nextTick = nextTick;
	        // 是否在微信中打开
	        _this.isWeixinBrowser = util.isWeixinBrowser();
	        // 是否在ios中打开
	        _this.isIOS = util.isIOS();
	        Object.keys(args).forEach(function (key) {
	            _this[key] = args[key];
	        });
	        _this.parentNode = parentNode;
	        // 兼容mcore2
	        _this.el = parentNode;
	        _this.parentElement = parentElement;
	        _this._initWatchScope = false;
	        _this.id = _id++;
	        // this.virtualDom = null
	        // 存放 window 及 body 引用
	        if ($_win === null || $_body === null) {
	            $_win = util.get$()(window);
	            $_body = util.get$()('body');
	        }
	        _this.$win = $_win;
	        _this.$body = $_body;
	        // 模板 scope
	        _this.scope = parentElement.props || {};
	        Object.keys(parentElement.dynamicProps || {}).forEach(function (attr) {
	            _this.scope[attr] = parentElement.dynamicProps[attr];
	        });
	        _this.beforeInit();
	        _this.init();
	        _this.watch();
	        return _this;
	    }
	    Component.prototype.beforeInit = function () { };
	    Component.prototype.init = function () { };
	    Component.prototype.watch = function () { };
	    /**
	     * 取自定义组件子自的子节点
	     */
	    Component.prototype.getSoureChildrens = function () {
	        if (!this.parentNode || !this.parentNode.hasOwnProperty('_element')) {
	            return [];
	        }
	        return this.parentNode._element.template.element.children;
	    };
	    Component.prototype.mount = function (parentEl) {
	        if (parentEl === void 0) { parentEl = this.parentNode; }
	        if (this.refs && parentEl.appendChild && !(util.get$().contains(parentEl, this.refs))) {
	            parentEl.appendChild(this.refs);
	            this.emit('mount', this.refs);
	        }
	    };
	    Component.prototype.destroy = function (notRemove) {
	        if (notRemove === void 0) { notRemove = false; }
	        if (this._initWatchScope) {
	            this.watchScope.unwatch();
	            this.watchScope.off('update');
	        }
	        getComponents(this.virtualDom).forEach(function (component) {
	            component.destroy();
	        });
	        if (!notRemove && this.$refs) {
	            this.$refs.remove();
	            this.$refs = null;
	        }
	        else if (this.$refs) {
	            this.$refs.off();
	        }
	        // 渲染完成，回调队列
	        this._queueCallbacks = [];
	    };
	    /**
	     * 取调用自定组件的上级view
	     */
	    Component.prototype.parentView = function () {
	        return this.parentElement.view;
	    };
	    /**
	     * 触发组件的自定义事件
	     */
	    Component.prototype.emitEvent = function (eventName, args) {
	        var parentView = this.parentView();
	        if (parentView && this.parentElement.events.hasOwnProperty(eventName)) {
	            var eventCtx = this.parentElement.events[eventName];
	            var callback = parentView[eventCtx.funName];
	            if (!isFunction(callback)) {
	                return;
	            }
	            if (!Array.isArray(args)) {
	                if (args && args.length !== undefined) {
	                    args = Array.from(args);
	                }
	                else {
	                    args = [];
	                }
	            }
	            // 如果模板事件有参数，追加在最后一个参数
	            if (Array.isArray(eventCtx.args) && eventCtx.args.length) {
	                args = args.concat(eventCtx.args);
	            }
	            callback.apply(parentView, args);
	        }
	    };
	    /**
	     * 放入渲染队列
	     */
	    Component.prototype.renderQueue = function (doneOrAsync) {
	        var _this = this;
	        if (doneOrAsync === void 0) { doneOrAsync = null; }
	        // 加入成功回调队列
	        if (isFunction(doneOrAsync)) {
	            this._queueCallbacks.push(doneOrAsync);
	        }
	        if (this._queueId) {
	            nextTick.clear(this._queueId);
	        }
	        // 马上渲染，不进队列
	        if (doneOrAsync === true) {
	            return this._render();
	        }
	        else {
	            this._queueId = nextTick.next(function () {
	                _this._render();
	            });
	        }
	    };
	    /**
	     * 真实的渲染操作
	     * @method _render
	     * @return {[type]} [description]
	     */
	    Component.prototype._render = function () {
	        var _this = this;
	        if (!this.virtualDomDefine) {
	            return;
	        }
	        var $ = util.get$();
	        // console.log(this.scope)
	        var virtualDoms = this.virtualDomDefine(this.scope, this, templateHelper);
	        var virtualDom;
	        var soureChildrens = this.getSoureChildrens();
	        var soureChildrensLen = soureChildrens.length;
	        if (virtualDoms.length === 1 && soureChildrensLen === 0) {
	            virtualDom = virtualDoms[0];
	        }
	        else if (soureChildrensLen) {
	            var container = util.getComponentContainer(virtualDoms);
	            if (container) {
	                container.children = container.children.concat(soureChildrens);
	                if (virtualDoms.length === 1) {
	                    virtualDom = virtualDoms[0];
	                }
	                else {
	                    virtualDom = new element_1.default('mc-vd', '0', {}, {}, virtualDoms, {}, this);
	                }
	            }
	            else {
	                virtualDom = new element_1.default('mc-vd', '0', {}, {}, virtualDoms.concat(soureChildrens), {}, this);
	            }
	        }
	        else {
	            // console.log(this)
	            virtualDom = new element_1.default('mc-vd', '0', {}, {}, virtualDoms, {}, this);
	        }
	        if (!virtualDom.parentElement) {
	            virtualDom.parentElement = this.parentElement;
	        }
	        if (this.virtualDom && this.virtualDom.tagName !== virtualDom.tagName) {
	            if (this.$refs)
	                this.$refs.remove();
	            if (this._initWatchScope) {
	                this.watchScope.unwatch();
	                this.watchScope.off('update');
	                this._initWatchScope = false;
	            }
	            this._regEvents = [];
	            this.virtualDom = null;
	        }
	        // 未渲染，不用对比
	        if (!this.virtualDom) {
	            this.virtualDom = virtualDom;
	            // console.log(this.virtualDom)
	            this.refs = this.virtualDom.render();
	            this.$refs = $(this.refs);
	            this.mount();
	        }
	        else {
	            var patches = diff_1.default(this.virtualDom, virtualDom);
	            // if(this.getSoureChildrens().length) {
	            //     console.log(patches)
	            // }
	            // console.log(patches)
	            // 更新dom
	            patch_1.patch(this.refs, patches);
	            this.virtualDom = virtualDom;
	        }
	        // 绑定事件
	        this.bindEvents();
	        this.emit('rendered', this.refs);
	        this._queueCallbacks.forEach(function (done, ix) {
	            if (isFunction(done)) {
	                done(_this.refs);
	                _this._queueCallbacks[ix] = null;
	            }
	        });
	        if (!this._initWatchScope) {
	            this._initWatchScope = true;
	            // 观察scope, 如果改动，渲染模板
	            this.watchScope = new watch_1.default(this.scope, function () {
	                _this.renderQueue();
	            });
	            var times_1 = {};
	            this.watchScope.on('update', function (path, val) {
	                if (path !== 'scope') {
	                    path = path.replace('scope.', '');
	                    var now_1 = (new Date()).getTime();
	                    var paths_1 = path.split('.');
	                    paths_1.forEach(function (v, index) {
	                        var curPath = paths_1.slice(0, paths_1.length - index).join('.');
	                        var value = util.getObjAttrByPath(curPath, _this.scope);
	                        if (times_1[curPath] && now_1 - times_1[curPath] < 100) {
	                            return false;
	                        }
	                        times_1[curPath] = (new Date()).getTime();
	                        _this.emit('update:' + curPath, value);
	                    });
	                }
	            });
	        }
	        return this.refs;
	    };
	    Component.prototype.callEvent = function (event, eventName) {
	        var $ = util.get$();
	        var res = null;
	        var target = event.target;
	        var eventData = this.events[eventName];
	        if (Array.isArray(eventData)) {
	            for (var i = 0, len = eventData.length; i < len; i++) {
	                var ctx = eventData[i];
	                var ctxTarget = ctx.target();
	                // console.log(ctxTarget, target)
	                if (ctxTarget && (ctxTarget === target || $.contains(ctxTarget, target))) {
	                    var callback = this[ctx.funName];
	                    if (isFunction(callback)) {
	                        var args = [event, ctxTarget];
	                        args = args.concat(ctx.args);
	                        res = callback.apply(this, args);
	                        if (res === false) {
	                            break;
	                        }
	                    }
	                }
	            }
	        }
	        return res;
	    };
	    Component.prototype.regEvent = function (eventName) {
	        var _this = this;
	        var $ = util.get$();
	        if (this._regEvents.indexOf(eventName) === -1) {
	            this._regEvents.push(eventName);
	            if (keyCode.hasOwnProperty(eventName)) {
	                this.$refs.on('keyup', function (event) {
	                    if (event.keyCode == keyCode[eventName]) {
	                        return _this.callEvent(event, eventName);
	                    }
	                });
	            }
	            else if (notProxyEvents.indexOf(eventName) === -1) {
	                this.$refs.on(eventName, function (event) {
	                    return _this.callEvent(event, eventName);
	                });
	            }
	            else if (['focus', 'blur'].indexOf(eventName) !== -1) {
	                this.$refs.on(eventName, 'input, textarea, select, [tabindex]', function (event) {
	                    return _this.callEvent(event, eventName);
	                });
	            }
	        }
	    };
	    Component.prototype.unRegEvent = function (eventName) {
	        var ix = this._regEvents.indexOf(eventName);
	        if (ix !== -1) {
	            this.$refs.off(eventName);
	            this._regEvents.splice(ix, 1);
	        }
	        if (this.getSoureChildrens().length) {
	            console.log('unReg', eventName);
	        }
	    };
	    Component.prototype.bindEvents = function () {
	        var _this = this;
	        if (!this.$refs) {
	            return;
	        }
	        var $ = util.get$();
	        // if (this.events) {
	        //     this.oldEvents = this.events
	        // }
	        this.events = getEvents(this.virtualDom);
	        var curEvents = Object.keys(this.events);
	        this._regEvents.forEach(function (regEventName) {
	            if (curEvents.indexOf(regEventName) === -1) {
	                _this.unRegEvent(regEventName);
	            }
	        });
	        curEvents.forEach(function (eventName) {
	            _this.regEvent(eventName);
	        });
	    };
	    /**
	     * 更新 scope
	     * @method set
	     * @param  {String} attr
	     * @param  {Mixed} value
	     * @param  {Function | Boolean} doneOrAsync
	     */
	    Component.prototype.set = function (attr, value, doneOrAsync, isPromeisCallback) {
	        var _this = this;
	        if (doneOrAsync === void 0) { doneOrAsync = null; }
	        if (isPromeisCallback === void 0) { isPromeisCallback = false; }
	        if (isPromeisCallback || !value || !isFunction(value.then)) {
	            var isChange = this.scope[attr] !== value;
	            // console.log(isChange)
	            if (isChange) {
	                this.scope[attr] = value;
	            }
	            // else{
	            //     this.renderQueue(doneOrAsync);
	            // }
	            this.emit('changeScope', this.scope, attr, value);
	            this.emit('change:' + attr, value);
	            return isChange;
	        }
	        else {
	            return value.then(function (val) {
	                var isChange = _this.set(attr, val, doneOrAsync, true);
	                return isChange;
	            });
	        }
	    };
	    /**
	     * 取 scope 值， 兼容 mcore2
	     * @method get
	     * @param  {String} attr
	     * @param  {Mixed} defaultVal = null
	     * @return {Mixed}
	     */
	    Component.prototype.get = function (attr, defaultVal) {
	        if (defaultVal === void 0) { defaultVal = null; }
	        if (this.scope.hasOwnProperty(attr)) {
	            return this.scope[attr];
	        }
	        return defaultVal;
	    };
	    /**
	     * 移除属性
	     * @method remove
	     * @param  {String} attr
	     * @param  {Mixed} doneOrAsync = null
	     * @return {Void}
	     */
	    Component.prototype.remove = function (attr, doneOrAsync) {
	        if (doneOrAsync === void 0) { doneOrAsync = null; }
	        if (this.scope.hasOwnProperty(attr)) {
	            delete this.scope[attr];
	            this.emit('removeScope', this.scope, attr);
	            this.emit('change:' + attr, null);
	        }
	        this.renderQueue(doneOrAsync);
	    };
	    /**
	     * 对外接口
	     * @method update
	     * @param  {String} attr
	     * @param  {Mixed} value
	     * @param  {String} status
	     * @return {Void}
	     */
	    Component.prototype.update = function (attr, value, status) {
	        if (status === 'remove') {
	            return this.remove(attr);
	        }
	        this.set(attr, value);
	    };
	    Component.prototype.render = function (virtualDomDefine, scope, doneOrAsync) {
	        var _this = this;
	        if (scope === void 0) { scope = {}; }
	        if (doneOrAsync === void 0) { doneOrAsync = null; }
	        this.virtualDomDefine = virtualDomDefine;
	        var scopeKeys = Object.keys(scope);
	        var promiseVals = [];
	        var setKeys = [];
	        scopeKeys.forEach(function (attr) {
	            if (scope[attr] && isFunction(scope[attr].then)) {
	                promiseVals.push(scope[attr]);
	                setKeys.push(attr);
	            }
	            else {
	                _this.set(attr, scope[attr]);
	            }
	        });
	        if (promiseVals.length === 0) {
	            // console.log(this.scope)
	            return new Promise(function (resolve) {
	                _this.renderQueue(function (refs) {
	                    if (isFunction(doneOrAsync)) {
	                        doneOrAsync(refs);
	                    }
	                    resolve(refs);
	                });
	            });
	        }
	        return Promise.all(promiseVals).then(function (results) {
	            setKeys.forEach(function (attr, ix) {
	                _this.set(attr, results[ix]);
	            });
	            // 马上渲染
	            if (doneOrAsync === true) {
	                return _this.renderQueue(doneOrAsync);
	            }
	            return new Promise(function (resolve) {
	                _this.renderQueue(function (refs) {
	                    if (isFunction(doneOrAsync)) {
	                        doneOrAsync(refs);
	                    }
	                    resolve(refs);
	                });
	            });
	        });
	    };
	    return Component;
	}(eventEmitter_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Component;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * diff Element
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var patch = __webpack_require__(41);
	var listDiff = __webpack_require__(42);
	/**
	 * 比对两个虚拟dom, 标出变更部分
	 */
	function dfsWalk(oldNode, newNode, index, patches, oldNodeIx) {
	    var currentPatch = [];
	    // node is removed
	    if (newNode === null) {
	    }
	    else if (oldNode.tagName === '_textnode' && oldNode.tagName === newNode.tagName) {
	        var oldText = String(oldNode.dynamicProps.hasOwnProperty('text') ? oldNode.dynamicProps.text : oldNode.props.text);
	        var newText = String(newNode.dynamicProps.hasOwnProperty('text') ? newNode.dynamicProps.text : newNode.props.text);
	        if (oldText != newText) {
	            currentPatch.push({
	                type: patch.TEXT,
	                content: newText == 'undefined' ? '' : newText
	            });
	        }
	    }
	    else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
	        // 变更静态属性
	        diffAndPatchStaticProps(oldNode, newNode);
	        var propsPatches = diffProps(oldNode, newNode);
	        // console.log(propsPatches)
	        if (propsPatches) {
	            currentPatch.push({
	                type: patch.PROPS,
	                props: propsPatches
	            });
	        }
	        if (!newNode.refs && oldNode.refs) {
	            newNode.cloneElement(oldNode);
	        }
	        // 没有声明不要 diff 子元素
	        if (!oldNode || !oldNode._noDiffChild || !newNode._noDiffChild) {
	            diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
	        }
	    }
	    else {
	        currentPatch.push({
	            type: patch.REPLACE,
	            node: newNode,
	            oldNode: oldNode,
	            index: oldNodeIx
	        });
	    }
	    if (currentPatch.length) {
	        patches[index] = currentPatch;
	    }
	}
	function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
	    var diffs = listDiff(oldChildren, newChildren, 'key');
	    newChildren = diffs.children;
	    // 有移动
	    if (diffs.moves.length) {
	        // console.log(diffs.moves)
	        var reorderPatch = {
	            type: patch.REORDER,
	            moves: diffs.moves
	        };
	        // console.log(diffs, oldChildren, newChildren);
	        currentPatch.push(reorderPatch);
	    }
	    var leftNode = null;
	    var currentNodeIndex = index;
	    oldChildren.forEach(function (child, i) {
	        var newChild = newChildren[i];
	        if (leftNode && leftNode.count) {
	            currentNodeIndex += leftNode.count + 1;
	        }
	        else {
	            currentNodeIndex++;
	        }
	        dfsWalk(child, newChild, currentNodeIndex, patches, i);
	        leftNode = child;
	    });
	}
	/**
	 * 检查并更新静态属性
	 */
	function diffAndPatchStaticProps(oldNode, newNode) {
	    // if(oldNode._noDiffChild || oldNode._component){
	    //     return;
	    // }
	    var oldProps = oldNode.props;
	    var newProps = newNode.props;
	    var node = oldNode.refs;
	    var propsPatches = {};
	    if (!node) {
	        console.log(oldNode._element);
	        throw new Error('node not inexistence');
	    }
	    // 判断旧值变更或删除
	    Object.keys(oldProps).forEach(function (attr) {
	        // if(attr === '_key'){
	        //     return;
	        // }
	        var value = oldProps[attr];
	        if (newProps[attr] !== value) {
	            propsPatches[attr] = newProps[attr];
	            if (newProps[attr] === undefined) {
	                node.removeAttribute(attr);
	            }
	            else {
	                node.setAttribute(attr, newProps[attr]);
	            }
	        }
	    });
	    // 查找新添加的值
	    Object.keys(newProps).forEach(function (attr) {
	        if (propsPatches.hasOwnProperty(attr) === false) {
	            node.setAttribute(attr, newProps[attr]);
	        }
	    });
	    if (oldNode._binder) {
	        for (var i = node.attributes.length - 1; i >= 0; i--) {
	            var attr = String(node.attributes[i].name);
	            // if(attr === '_key'){
	            //     return;
	            // }
	            if (newProps.hasOwnProperty(attr) === false) {
	                node.removeAttribute(attr);
	            }
	        }
	    }
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
	    // console.log(newProps);
	    // 判断旧值变更或删除
	    Object.keys(oldProps).forEach(function (attr) {
	        var value = oldProps[attr];
	        if (newProps[attr] !== value) {
	            count++;
	            propsPatches[attr] = newProps[attr];
	        }
	    });
	    // 查找新添加的值
	    Object.keys(newProps).forEach(function (attr) {
	        if (propsPatches.hasOwnProperty(attr) === false) {
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
	    // console.log(oldTree, newTree);
	    dfsWalk(oldTree, newTree, index, patches, -1);
	    return patches;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = diff;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 应用比对结果
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var util_1 = __webpack_require__(30);
	// 替换
	var REPLACE = 0;
	exports.REPLACE = REPLACE;
	// 重新排序
	var REORDER = 1;
	exports.REORDER = REORDER;
	// 属性变更
	var PROPS = 2;
	exports.PROPS = PROPS;
	// 文字
	var TEXT = 3;
	exports.TEXT = TEXT;
	function dfsWalk(node, walker, patches) {
	    if (patches === void 0) { patches = {}; }
	    if (!node)
	        return;
	    var currentPatches = patches[walker.index];
	    // 计算子节点数量
	    var len;
	    if (!node.childNodes || (node._element && node._element._noDiffChild)) {
	        len = 0;
	    }
	    else {
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
	    for (var _i = 0, currentPatches_1 = currentPatches; _i < currentPatches_1.length; _i++) {
	        var currentPatch = currentPatches_1[_i];
	        switch (currentPatch.type) {
	            // 替换
	            case REPLACE:
	                var newNode = void 0;
	                // if(currentPatch.node) {
	                //     console.log(currentPatch.node._component)
	                // }
	                // if (!currentPatch.node._component || !currentPatch.node.refs) {
	                //     newNode = currentPatch.node.render()
	                // }
	                // else {
	                //     console.log(currentPatch.node)
	                //     newNode = currentPatch.node.refs
	                // }
	                // neNode = currentPatch.node.render()
	                // else if (typeof currentPatch.node == 'string') {
	                //     newNode = document.createTextNode(currentPatch.node)
	                //     console.log(newNode)
	                // }
	                if (node.parentNode && node.parentNode.replaceChild) {
	                    var childNodes = util_1.nodeListToArray(node.parentNode.childNodes);
	                    // console.log('replace: %s -> %s', currentPatch.node.tagName, node._element.tagName)
	                    // console.log(childNodes)
	                    var isMatch = false;
	                    // let oldNode = <MCElement>childNodes[currentPatch.index]
	                    for (var i = currentPatch.index; i < childNodes.length; i++) {
	                        var childNode = childNodes[i];
	                        // console.log(childNode._element, currentPatch.node)
	                        if (childNode && childNode._element && childNode._element.tagName == currentPatch.node.tagName && childNode._element._component) {
	                            isMatch = true;
	                            // childNode._element.key = currentPatch.node.key
	                            // currentPatch.node = childNode._element
	                            // newNode = childNode
	                            newNode = currentPatch.node.cloneElement(childNode._element);
	                            // console.log(newNode.childNodes)
	                            break;
	                        }
	                    }
	                    if (isMatch === false) {
	                        newNode = currentPatch.node.render();
	                    }
	                    if (newNode) {
	                        try {
	                            node.parentNode.replaceChild(newNode, node);
	                        }
	                        catch (error) {
	                            console.log(node, newNode, currentPatches);
	                        }
	                    }
	                }
	                // if (newNode) {
	                //     // let element = node._element
	                //     if (node.parentNode) {
	                //         node.parentNode.replaceChild(newNode, node)
	                //     }
	                //     // if (element && element.destroy) {
	                //     //     element.destroy()
	                //     // }
	                // }
	                break;
	            // 重新排序
	            case REORDER:
	                reorderChildren(node, currentPatch.moves);
	                break;
	            // 属性变更
	            case PROPS:
	                if (node._element) {
	                    var propkeys = Object.keys(currentPatch.props);
	                    for (var _a = 0, propkeys_1 = propkeys; _a < propkeys_1.length; _a++) {
	                        var attr = propkeys_1[_a];
	                        // console.log(attr, currentPatch.props[attr])
	                        var value = currentPatch.props[attr];
	                        var status_1 = value !== undefined ? 'update' : 'remove';
	                        if (node._element.template) {
	                            node._element.template.setAttr(attr.toLowerCase(), value, true, status_1);
	                        }
	                        if (node._element._component) {
	                            node._element._component.set(attr.toLowerCase(), value);
	                        }
	                    }
	                }
	                else if (node.textContent) {
	                    node.textContent = currentPatch.content;
	                }
	                else if (node.nodeValue) {
	                    node.nodeValue = currentPatch.content;
	                }
	                else {
	                    console.log(node);
	                    throw new Error('not mcore Element:' + node);
	                }
	                break;
	            // 变更文本
	            case TEXT:
	                // console.log(node.textContent, currentPatch);
	                if (node.textContent) {
	                    node.textContent = currentPatch.content;
	                }
	                else {
	                    node.nodeValue = currentPatch.content;
	                }
	                break;
	            default:
	                throw new Error('Unknown patch type ' + currentPatch.type);
	        }
	    }
	}
	/**
	 * 重新排序
	 * @method reorderChildren
	 * @param  node
	 * @param  moves
	 */
	function reorderChildren(node, moves) {
	    var staticNodeList = util_1.nodeListToArray(node.childNodes);
	    var maps = {};
	    staticNodeList.forEach(function (node) {
	        var key = null;
	        if (node._element && node._element.key) {
	            key = node._element.key;
	        }
	        if (key) {
	            maps[key] = node;
	        }
	    });
	    moves.forEach(function (move) {
	        var index = move.index;
	        // 删除
	        if (move.type === 0) {
	            if (staticNodeList[index] == node.childNodes[index]) {
	                var childNode = node.childNodes[index];
	                if (childNode) {
	                    if (childNode._element) {
	                        childNode._element.destroy(true);
	                    }
	                    node.removeChild(childNode);
	                }
	            }
	            staticNodeList.splice(index, 1);
	        }
	        else if (move.type === 1) {
	            var insertNode = void 0;
	            var oldNode = maps[move.item.key];
	            // 使用旧节点
	            if (oldNode && oldNode._element == move.item) {
	                insertNode = maps[move.item.key];
	                if (insertNode._element && insertNode._element.template) {
	                    insertNode._element.template.emit('reorder', node);
	                }
	            }
	            else if (move.item.render) {
	                insertNode = move.item.render();
	            }
	            else {
	                insertNode = document.createTextNode(String(move.item));
	            }
	            if (insertNode && node.insertBefore) {
	                staticNodeList.splice(index, 0, insertNode);
	                node.insertBefore(insertNode, (node.childNodes[index] || null));
	            }
	        }
	    });
	}
	function patch(node, patches) {
	    var walker = {
	        index: 0
	    };
	    return dfsWalk(node, walker, patches);
	}
	exports.patch = patch;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(43).diff


/***/ },
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * watch
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var tslib_1 = __webpack_require__(34);
	var eventEmitter_1 = __webpack_require__(35);
	__webpack_require__(45);
	__webpack_require__(46);
	var util_1 = __webpack_require__(30);
	var Watch = (function (_super) {
	    tslib_1.__extends(Watch, _super);
	    function Watch(scope, callback) {
	        if (scope === void 0) { scope = {}; }
	        if (callback === void 0) { callback = function (path) { }; }
	        var _this = _super.call(this) || this;
	        var nextTickTime = null;
	        _this.scope = scope;
	        _this.callback = function (path) {
	            if (nextTickTime) {
	                util_1.NextTick.clear(nextTickTime);
	            }
	            nextTickTime = util_1.NextTick.next(function () {
	                callback(path);
	            });
	            // console.log(path);
	        };
	        _this._watchReg = {};
	        _this._watchTotal = 0;
	        _this.watch(_this.scope);
	        return _this;
	    }
	    Watch.prototype.observer = function (changes, x, path) {
	        var _this = this;
	        changes.forEach(function (change) {
	            var curPath = path + '.' + change.name;
	            _this.emit('update', curPath, change.object);
	            if (change.type === 'add') {
	                _this.watch(x[change.name], curPath);
	            }
	            else if (change.type === 'splice' && path != 'scope') {
	                _this.unwatchByPath(path);
	                _this.watch(x, path);
	            }
	            else if (change.type === 'delete') {
	                _this.unwatchByPath(curPath);
	            }
	            else if (change.type === 'update' || change.type === 'reconfigure') {
	                _this.unwatchByPath(curPath);
	                _this.watch(x[change.name], curPath);
	            }
	            else {
	                console.log(change);
	            }
	        });
	        this.callback(path);
	    };
	    Watch.prototype.unwatchByPath = function (path) {
	        var _this = this;
	        Object.keys(this._watchReg).reverse().forEach(function (key) {
	            if (key.indexOf(path + '.') === 0) {
	                _this._unwatchByPath(key);
	            }
	        });
	        this._unwatchByPath(path);
	    };
	    Watch.prototype._unwatchByPath = function (path) {
	        var reg = this._watchReg[path];
	        if (!reg) {
	            return;
	        }
	        if (reg.type === 'object') {
	            Object.unobserve(reg.x, reg.observer);
	        }
	        else if (reg.type === 'array') {
	            Array.unobserve(reg.x, reg.observer);
	        }
	        delete this._watchReg[path];
	    };
	    Watch.prototype.watch = function (x, path) {
	        var _this = this;
	        if (path === void 0) { path = 'scope'; }
	        var watchType = null;
	        if (util_1.isPlainObject(x)) {
	            watchType = 'object';
	        }
	        else if (util_1.isArray(x)) {
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
	            observer: function (changes) {
	                _this.observer(changes, x, path);
	            }
	        };
	        this._watchTotal++;
	        if (watchType === 'object') {
	            Object.observe(x, this._watchReg[path].observer);
	            Object.keys(x).forEach(function (attr) {
	                var v = x[attr];
	                _this.watch(v, path + '.' + attr);
	            });
	        }
	        else if (watchType === 'array') {
	            Array.observe(x, this._watchReg[path].observer);
	            x.forEach(function (v, i) {
	                _this.watch(v, path + '.' + i);
	            });
	        }
	    };
	    Watch.prototype.unwatch = function () {
	        var _this = this;
	        Object.keys(this._watchReg).forEach(function (path) {
	            _this.unwatchByPath(path);
	        });
	        this._watchReg = {};
	    };
	    return Watch;
	}(eventEmitter_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Watch;


/***/ },
/* 45 */
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
/* 46 */
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


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 路由
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var pathToRegexp = __webpack_require__(48);
	var util_1 = __webpack_require__(30);
	function pathToObject(path) {
	    var url = String(path).trim();
	    var argStr = '';
	    var attr = [];
	    if (url.indexOf('?') !== -1) {
	        argStr = url.split('?').pop();
	    }
	    else if (url.indexOf('&') !== -1) {
	        argStr = url;
	    }
	    if (argStr === '') {
	        return {};
	    }
	    var args = argStr.split('&');
	    var data = {};
	    var keys = [];
	    args.forEach(function (v) {
	        if (v.indexOf('=') === -1) {
	            return;
	        }
	        var vArr = v.split('=');
	        if (vArr.length !== 2) {
	            return;
	        }
	        var key = vArr[0].trim();
	        var value = decodeValue(vArr[1]);
	        data[key] = value;
	    });
	    return data;
	}
	exports.pathToObject = pathToObject;
	function decodeValue(value) {
	    if (util_1.isNumber(value) && String(value).length < 14) {
	        value = Number(value);
	    }
	    else if (value) {
	        value = decodeURIComponent(value);
	    }
	    else {
	        value = null;
	    }
	    return value;
	}
	var Route = (function () {
	    function Route(hashchange, sensitive) {
	        if (hashchange === void 0) { hashchange = Route.changeByLocationHash; }
	        if (sensitive === void 0) { sensitive = false; }
	        this.hashchange = hashchange;
	        this.sensitive = sensitive;
	        this.rule = [];
	    }
	    Route.changeByLocationHash = function (emit) {
	        var hashChanged = function () {
	            emit(window.location.hash.substring(1));
	        };
	        if (window.addEventListener) {
	            window.addEventListener('hashchange', hashChanged, false);
	        }
	        else if (window.attachEven) {
	            window.attachEven('onhashchange', hashChanged);
	        }
	        else {
	            throw new Error('window not support hashchange event');
	        }
	        hashChanged();
	    };
	    Route.prototype.run = function () {
	        var _this = this;
	        this.hashchange(function (url) {
	            _this.match(url);
	        });
	    };
	    Route.prototype.add = function (path, fn) {
	        var keys = [];
	        var reg = pathToRegexp(path, keys, this.sensitive);
	        this.rule.push({
	            path: path,
	            reg: reg,
	            keys: keys,
	            fn: fn
	        });
	        return this;
	    };
	    Route.prototype.toUrl = function (path, args, options) {
	        if (args === void 0) { args = {}; }
	        if (options === void 0) { options = {}; }
	        return pathToRegexp.compile(path)(args, options);
	    };
	    Route.prototype.match = function (url) {
	        var path = String(url);
	        var fullPath = path;
	        var argStr = '';
	        var getIx = path.indexOf('?');
	        var isMatch = false;
	        if (getIx === -1) {
	            getIx = path.indexOf('&');
	        }
	        if (getIx !== -1) {
	            argStr = path.substring(getIx);
	            path = path.substring(0, getIx);
	        }
	        util_1.each(this.rule, function (v) {
	            var res = v.reg.exec(path);
	            if (res === null) {
	                return;
	            }
	            isMatch = true;
	            var context = pathToObject(argStr);
	            var data = {};
	            var args = [];
	            for (var i = 1, len = res.length; i < len; i++) {
	                var k = v.keys[i - 1];
	                var value = decodeValue(res[i]);
	                if (k && k.name) {
	                    data[k.name] = value;
	                }
	                args.push(value);
	            }
	            if (isMatch) {
	                var env = {
	                    url: fullPath,
	                    path: path,
	                    args: argStr,
	                    rule: v.path,
	                    context: context,
	                    keys: v.keys,
	                    data: data
	                };
	                v.fn.apply(env, args);
	                return false;
	            }
	        });
	        return this;
	    };
	    return Route;
	}());
	exports.Route = Route;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var isarray = __webpack_require__(49)
	
	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp
	module.exports.parse = parse
	module.exports.compile = compile
	module.exports.tokensToFunction = tokensToFunction
	module.exports.tokensToRegExp = tokensToRegExp
	
	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')
	
	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var defaultDelimiter = options && options.delimiter || '/'
	  var res
	
	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length
	
	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }
	
	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]
	
	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }
	
	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || defaultDelimiter
	    var pattern = capture || group
	
	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    })
	  }
	
	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }
	
	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }
	
	  return tokens
	}
	
	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}
	
	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}
	
	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}
	
	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)
	
	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }
	
	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent
	
	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]
	
	      if (typeof token === 'string') {
	        path += token
	
	        continue
	      }
	
	      var value = data[token.name]
	      var segment
	
	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }
	
	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }
	
	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }
	
	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }
	
	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])
	
	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }
	
	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }
	
	        continue
	      }
	
	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)
	
	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }
	
	      path += token.prefix + segment
	    }
	
	    return path
	  }
	}
	
	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}
	
	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}
	
	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}
	
	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}
	
	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)
	
	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }
	
	  return attachKeys(path, keys)
	}
	
	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []
	
	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }
	
	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
	
	  return attachKeys(regexp, keys)
	}
	
	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}
	
	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }
	
	  options = options || {}
	
	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	
	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]
	
	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'
	
	      keys.push(token)
	
	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }
	
	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }
	
	      route += capture
	    }
	  }
	
	  var delimiter = escapeString(options.delimiter || '/')
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter
	
	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
	  }
	
	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
	  }
	
	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}
	
	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }
	
	  options = options || {}
	
	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }
	
	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }
	
	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}


/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * view
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var tslib_1 = __webpack_require__(34);
	var component_1 = __webpack_require__(39);
	var _$iframe = null;
	var View = (function (_super) {
	    tslib_1.__extends(View, _super);
	    function View($el, app) {
	        var _this = _super.call(this, $el[0], {}, { app: app }) || this;
	        _this.$el = $el;
	        return _this;
	    }
	    View.prototype.setTitle = function (title) {
	        var _this = this;
	        this.title = title;
	        if (document.title === title) {
	            return;
	        }
	        document.title = title;
	        if (this.isWeixinBrowser && this.isIOS) {
	            if (_$iframe === null) {
	                _$iframe = this.util.get$()('<iframe style="width: 0; height: 0" src="/favicon.ico"></iframe>');
	            }
	            var $iframe_1 = _$iframe;
	            $iframe_1.one('load', function () {
	                _this.nextTick.next(function () {
	                    $iframe_1.remove();
	                });
	            }).appendTo(this.$body);
	        }
	    };
	    View.prototype.back = function () {
	        if (window.history.length >= 1) {
	            window.history.back();
	        }
	        else {
	            window.location.href = '#';
	        }
	        return false;
	    };
	    View.prototype.run = function () { };
	    View.prototype.afterRun = function () { };
	    return View;
	}(component_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = View;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * app es6
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var tslib_1 = __webpack_require__(34);
	var route_1 = __webpack_require__(47);
	var eventEmitter_1 = __webpack_require__(35);
	var util_1 = __webpack_require__(30);
	var App = (function (_super) {
	    tslib_1.__extends(App, _super);
	    function App($el, options) {
	        if (options === void 0) { options = {}; }
	        var _this;
	        var $ = util_1.get$();
	        _this = _super.call(this) || this;
	        _this.$el = $el;
	        _this.options = $.extend({
	            viewClass: 'mcore-app-view',
	            routeChange: route_1.Route.changeByLocationHash
	        }, options);
	        // 路由
	        _this.router = new route_1.Route(_this.options.routeChange);
	        // 当前的 view
	        _this.curView = null;
	        // 中间件
	        _this._middlewares = [];
	        // url map
	        _this._viewUrlMap = {};
	        // 过场动画
	        _this._changeViewEvent = {
	            // 移除 view 之前
	            before: function (oldView, done, app) {
	                done();
	            },
	            // 插入新 view 之后
	            after: function (newView, done, app) {
	                done();
	            }
	        };
	        return _this;
	    }
	    App.prototype.route = function (path, View) {
	        var _this = this;
	        // 兼容 esModule
	        if (View.default) {
	            View = View.default;
	        }
	        if (!this._viewUrlMap.hasOwnProperty(View.viewName)) {
	            this._viewUrlMap[View.viewName] = [];
	        }
	        this._viewUrlMap[View.viewName].push({
	            path: path,
	            toUrl: function (args, options) {
	                return _this.router.toUrl(path, args, options);
	            }
	        });
	        var self = this;
	        this.router.add(path, function () {
	            self.runView(View, this, arguments);
	        });
	        return this;
	    };
	    // 添加中间件
	    App.prototype.use = function (middleware) {
	        this._middlewares.push(middleware);
	        return this;
	    };
	    App.prototype._runView = function (done, err) {
	        this.curView.instantiate.route = this.env.route;
	        this.curView.instantiate.context = this.env.context;
	        this.curView.instantiate.run.apply(this.curView.instantiate, this.env.args);
	        this.emit('runView', this.curView);
	        // console.log(this.curView.instantiate);
	        done(err, this.curView.instantiate);
	    };
	    App.prototype.stack = function (ix, err, done) {
	        var _this = this;
	        if (ix === void 0) { ix = 0; }
	        if (err === void 0) { err = null; }
	        if (done === void 0) { done = function () { }; }
	        if (ix >= this._middlewares.length) {
	            return this._runView(done, err);
	        }
	        var middleware = this._middlewares[ix];
	        var nextIx = ix + 1;
	        var next = function (err) {
	            _this.stack(nextIx, err, done);
	        };
	        this.env.view = this.curView.instantiate;
	        middleware.call(this.env, err, next);
	    };
	    // 调用中间件
	    App.prototype.runMiddlewares = function (done) {
	        if (this._middlewares.length === 0) {
	            return this._runView(done);
	        }
	        this.stack(0, null, done);
	    };
	    App.prototype._initView = function (ViewClass, viewName) {
	        var _this = this;
	        var $el = util_1.get$()('<div />');
	        $el.attr('class', this.options.viewClass);
	        var instantiate = new ViewClass($el, this);
	        this.curView = {
	            name: viewName,
	            instantiate: instantiate
	        };
	        this.runMiddlewares(function (err, instantiate) {
	            instantiate.$el.appendTo(_this.$el);
	            if (!err) {
	                _this._changeViewEvent.after(_this.curView, function () {
	                    instantiate.afterRun();
	                }, _this);
	            }
	        });
	    };
	    // 启动view
	    App.prototype.runView = function (View, route, args) {
	        var _this = this;
	        var viewName = View.viewName;
	        if (!viewName) {
	            throw new Error('View not viewName');
	        }
	        this.env = {
	            route: route,
	            context: route.context,
	            args: args,
	            viewName: viewName,
	            app: this
	        };
	        if (this.curView) {
	            // 已经初始化，只调用run方法
	            if (this.curView.name === viewName) {
	                this.runMiddlewares(function (err, instantiate) {
	                    if (!err) {
	                        instantiate.afterRun();
	                    }
	                });
	                return;
	            }
	            this._changeViewEvent.before(this.curView, function () {
	                _this.emit('destroyView', _this.curView);
	                _this.curView.instantiate.destroy();
	                // console.log(this.curView.instantiate.$el);
	                _this.curView.instantiate.$el.remove();
	                _this._initView(View, viewName);
	            }, this);
	        }
	        else {
	            this._initView(View, viewName);
	        }
	    };
	    App.prototype.run = function () {
	        this.router.run();
	    };
	    return App;
	}(eventEmitter_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = App;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * http
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var util_1 = __webpack_require__(30);
	// 兼容mcore2
	if (typeof Promise.prototype.done == 'undefined') {
	    Promise.prototype.done = function (onFulfilled, onRejected) {
	        return this.then(onFulfilled, onRejected).catch(function (error) {
	            setTimeout(function () {
	                throw error;
	            }, 0);
	        });
	    };
	}
	if (typeof Promise.prototype.fail == 'undefined') {
	    Promise.prototype.fail = function (onResolveOrReject) {
	        return this.then(function () { }, onResolveOrReject).catch(function (error) {
	            throw error;
	        });
	    };
	}
	if (typeof Promise.prototype.always == 'undefined') {
	    Promise.prototype.always = function (onResolveOrReject) {
	        return this.then(onResolveOrReject, function (reason) {
	            onResolveOrReject(reason);
	            throw reason;
	        });
	    };
	}
	var _networkErrCallback = function (xhr, status, hideError) {
	    if (hideError === void 0) { hideError = false; }
	    var msg = 'Network Error';
	    var $ = util_1.get$();
	    // 后端是否返回错误信息
	    if (xhr.responseText)
	        try {
	            var res = $.parseJSON(xhr.responseText);
	            if (res.error) {
	                msg = res.error;
	            }
	        }
	        catch (error) { }
	    var httpCode = xhr.statusCode().status;
	    if (httpCode) {
	        msg = msg + ' ( code: ' + httpCode + ' )';
	    }
	    // 是否需要隐藏
	    if (!hideError) {
	        if (window.alert) {
	            window.alert(msg);
	        }
	    }
	    else {
	        console.log(msg);
	    }
	};
	// 默认： 业务层面的出错处理
	var _errCallback = function (res, hideError, xhr) {
	    if (res === void 0) { res = {}; }
	    if (hideError === void 0) { hideError = false; }
	    var msg = res.error || res.msg || 'An unknown error occurred';
	    // 是否需要隐藏
	    if (!hideError) {
	        if (window.alert) {
	            window.alert(msg);
	        }
	    }
	    else {
	        console.log(msg);
	    }
	};
	var http = {
	    onBeforeSend: function (xhr) { },
	    sendDataFormat: function (data) {
	        return data;
	    },
	    // 返回数据的处理
	    responseFormat: function (res) {
	        return res;
	    },
	    // 注册错误处理
	    regErrCallback: function (type, fun) {
	        if (type === 'network') {
	            _networkErrCallback = fun;
	        }
	        else {
	            _errCallback = fun;
	        }
	    },
	    // 构造请求头
	    buildHeaders: function () {
	        return {};
	    },
	    // 判断请求是否成功
	    isSuccess: function (res) { return Number(res.code) === 1; },
	    // 注册请求完成事件（无论成功与否）
	    onComplete: function (xhr) { }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = http;
	function ajax(type, url, data, hideError, timeout) {
	    if (hideError === void 0) { hideError = false; }
	    if (timeout === void 0) { timeout = 10000; }
	    var $ = util_1.get$();
	    data = http.sendDataFormat(data);
	    var options = {
	        cache: false,
	        data: data,
	        dataType: 'json',
	        type: type || 'GET',
	        timeout: timeout,
	        headers: http.buildHeaders()
	    };
	    if (typeof window !== 'undefined' && window.FormData && data instanceof window.FormData) {
	        options.processData = false;
	        options.contentType = false;
	    }
	    if (type === 'JSONP') {
	        options.type = 'GET';
	        options.dataType = 'jsonp';
	    }
	    var xhr = $.ajax(url, options);
	    xhr.sendData = options.data;
	    http.onBeforeSend(xhr);
	    var promise = new Promise(function (resolve, reject) {
	        xhr.then(function (res) {
	            if (http.isSuccess(res, xhr)) {
	                return resolve(http.responseFormat(res));
	            }
	            else {
	                reject(res);
	                return _errCallback(res, hideError, xhr);
	            }
	        }).fail(function (xhr, status) {
	            reject(xhr);
	            if (!xhr.statusCode().status) {
	                _networkErrCallback(xhr, status, hideError);
	            }
	            else {
	                var res = {};
	                try {
	                    res = $.parseJSON(xhr.responseText);
	                }
	                catch (error) { }
	                _errCallback(res, hideError);
	            }
	        }).always(function () {
	            http.onComplete(xhr);
	        });
	    });
	    promise.xhr = xhr;
	    promise.reject = Promise.reject;
	    return promise;
	}
	['get', 'post', 'jsonp', 'head', 'options', 'put', 'delete', 'trace', 'connect', 'patch'].forEach(function (method) {
	    http[method] = function (url, data, hideError, timeout) {
	        if (hideError === void 0) { hideError = false; }
	        if (timeout === void 0) { timeout = 10000; }
	        return ajax(method.toUpperCase(), url, data, hideError, timeout);
	    };
	});


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 增加一些辅助 mcore 的 方法
	 * @author vfasky<vfasky@gmail.com>
	 *
	 **/
	'use strict';
	var util_1 = __webpack_require__(30);
	function buildCss() {
	    var $ = util_1.get$();
	    var css = "\n    <style>\n        .mc-hide {\n            display: none !important;\n        }\n    </style>";
	    var $target = $('head');
	    if ($target.length === 0) {
	        $target = $('html');
	    }
	    $target.append(css);
	}
	exports.buildCss = buildCss;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=mcore3.es5.js.map