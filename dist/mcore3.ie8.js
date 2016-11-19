(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["$"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_33__) {
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

	'use strict';
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	var array_from_1 = __webpack_require__(6);
	array_from_1.shim();
	var index_1 = __webpack_require__(31);
	module.exports = index_1.default;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * https://github.com/es-shims/es5-shim
	 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
	 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
	 */
	
	// vim: ts=4 sts=4 sw=4 expandtab
	
	// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
	;
	
	// UMD (Universal Module Definition)
	// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
	(function (root, factory) {
	    'use strict';
	
	    /* global define, exports, module */
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.returnExports = factory();
	    }
	}(this, function () {
	    /**
	     * Brings an environment as close to ECMAScript 5 compliance
	     * as is possible with the facilities of erstwhile engines.
	     *
	     * Annotated ES5: http://es5.github.com/ (specific links below)
	     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
	     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
	     */
	
	    // Shortcut to an often accessed properties, in order to avoid multiple
	    // dereference that costs universally. This also holds a reference to known-good
	    // functions.
	    var $Array = Array;
	    var ArrayPrototype = $Array.prototype;
	    var $Object = Object;
	    var ObjectPrototype = $Object.prototype;
	    var $Function = Function;
	    var FunctionPrototype = $Function.prototype;
	    var $String = String;
	    var StringPrototype = $String.prototype;
	    var $Number = Number;
	    var NumberPrototype = $Number.prototype;
	    var array_slice = ArrayPrototype.slice;
	    var array_splice = ArrayPrototype.splice;
	    var array_push = ArrayPrototype.push;
	    var array_unshift = ArrayPrototype.unshift;
	    var array_concat = ArrayPrototype.concat;
	    var array_join = ArrayPrototype.join;
	    var call = FunctionPrototype.call;
	    var apply = FunctionPrototype.apply;
	    var max = Math.max;
	    var min = Math.min;
	
	    // Having a toString local variable name breaks in Opera so use to_string.
	    var to_string = ObjectPrototype.toString;
	
	    /* global Symbol */
	    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
	    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\/\/.*\n/g, ''); var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, ''); var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };
	
	    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
	    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
	    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
	
	    /* inlined from http://npmjs.com/define-properties */
	    var supportsDescriptors = $Object.defineProperty && (function () {
	        try {
	            var obj = {};
	            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
	                return false;
	            }
	            return obj.x === obj;
	        } catch (e) { /* this is ES3 */
	            return false;
	        }
	    }());
	    var defineProperties = (function (has) {
	        // Define configurable, writable, and non-enumerable props
	        // if they don't exist.
	        var defineProperty;
	        if (supportsDescriptors) {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                $Object.defineProperty(object, name, {
	                    configurable: true,
	                    enumerable: false,
	                    writable: true,
	                    value: method
	                });
	            };
	        } else {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                object[name] = method;
	            };
	        }
	        return function defineProperties(object, map, forceAssign) {
	            for (var name in map) {
	                if (has.call(map, name)) {
	                    defineProperty(object, name, map[name], forceAssign);
	                }
	            }
	        };
	    }(ObjectPrototype.hasOwnProperty));
	
	    //
	    // Util
	    // ======
	    //
	
	    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
	    var isPrimitive = function isPrimitive(input) {
	        var type = typeof input;
	        return input === null || (type !== 'object' && type !== 'function');
	    };
	
	    var isActualNaN = $Number.isNaN || function isActualNaN(x) {
	        return x !== x;
	    };
	
	    var ES = {
	        // ES5 9.4
	        // http://es5.github.com/#x9.4
	        // http://jsperf.com/to-integer
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
	        ToInteger: function ToInteger(num) {
	            var n = +num;
	            if (isActualNaN(n)) {
	                n = 0;
	            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	                n = (n > 0 || -1) * Math.floor(Math.abs(n));
	            }
	            return n;
	        },
	
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
	        ToPrimitive: function ToPrimitive(input) {
	            var val, valueOf, toStr;
	            if (isPrimitive(input)) {
	                return input;
	            }
	            valueOf = input.valueOf;
	            if (isCallable(valueOf)) {
	                val = valueOf.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            toStr = input.toString;
	            if (isCallable(toStr)) {
	                val = toStr.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            throw new TypeError();
	        },
	
	        // ES5 9.9
	        // http://es5.github.com/#x9.9
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
	        ToObject: function (o) {
	            if (o == null) { // this matches both null and undefined
	                throw new TypeError("can't convert " + o + ' to object');
	            }
	            return $Object(o);
	        },
	
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
	        ToUint32: function ToUint32(x) {
	            return x >>> 0;
	        }
	    };
	
	    //
	    // Function
	    // ========
	    //
	
	    // ES-5 15.3.4.5
	    // http://es5.github.com/#x15.3.4.5
	
	    var Empty = function Empty() {};
	
	    defineProperties(FunctionPrototype, {
	        bind: function bind(that) { // .length is 1
	            // 1. Let Target be the this value.
	            var target = this;
	            // 2. If IsCallable(Target) is false, throw a TypeError exception.
	            if (!isCallable(target)) {
	                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	            }
	            // 3. Let A be a new (possibly empty) internal list of all of the
	            //   argument values provided after thisArg (arg1, arg2 etc), in order.
	            // XXX slicedArgs will stand in for "A" if used
	            var args = array_slice.call(arguments, 1); // for normal call
	            // 4. Let F be a new native ECMAScript object.
	            // 11. Set the [[Prototype]] internal property of F to the standard
	            //   built-in Function prototype object as specified in 15.3.3.1.
	            // 12. Set the [[Call]] internal property of F as described in
	            //   15.3.4.5.1.
	            // 13. Set the [[Construct]] internal property of F as described in
	            //   15.3.4.5.2.
	            // 14. Set the [[HasInstance]] internal property of F as described in
	            //   15.3.4.5.3.
	            var bound;
	            var binder = function () {
	
	                if (this instanceof bound) {
	                    // 15.3.4.5.2 [[Construct]]
	                    // When the [[Construct]] internal method of a function object,
	                    // F that was created using the bind function is called with a
	                    // list of arguments ExtraArgs, the following steps are taken:
	                    // 1. Let target be the value of F's [[TargetFunction]]
	                    //   internal property.
	                    // 2. If target has no [[Construct]] internal method, a
	                    //   TypeError exception is thrown.
	                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Construct]] internal
	                    //   method of target providing args as the arguments.
	
	                    var result = apply.call(
	                        target,
	                        this,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );
	                    if ($Object(result) === result) {
	                        return result;
	                    }
	                    return this;
	
	                } else {
	                    // 15.3.4.5.1 [[Call]]
	                    // When the [[Call]] internal method of a function object, F,
	                    // which was created using the bind function is called with a
	                    // this value and a list of arguments ExtraArgs, the following
	                    // steps are taken:
	                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                    //   property.
	                    // 3. Let target be the value of F's [[TargetFunction]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Call]] internal method
	                    //   of target providing boundThis as the this value and
	                    //   providing args as the arguments.
	
	                    // equiv: target.call(this, ...boundArgs, ...args)
	                    return apply.call(
	                        target,
	                        that,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );
	
	                }
	
	            };
	
	            // 15. If the [[Class]] internal property of Target is "Function", then
	            //     a. Let L be the length property of Target minus the length of A.
	            //     b. Set the length own property of F to either 0 or L, whichever is
	            //       larger.
	            // 16. Else set the length own property of F to 0.
	
	            var boundLength = max(0, target.length - args.length);
	
	            // 17. Set the attributes of the length own property of F to the values
	            //   specified in 15.3.5.1.
	            var boundArgs = [];
	            for (var i = 0; i < boundLength; i++) {
	                array_push.call(boundArgs, '$' + i);
	            }
	
	            // XXX Build a dynamic function with desired amount of arguments is the only
	            // way to set the length property of a function.
	            // In environments where Content Security Policies enabled (Chrome extensions,
	            // for ex.) all use of eval or Function costructor throws an exception.
	            // However in all of these environments Function.prototype.bind exists
	            // and so this code will never be executed.
	            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);
	
	            if (target.prototype) {
	                Empty.prototype = target.prototype;
	                bound.prototype = new Empty();
	                // Clean up dangling references.
	                Empty.prototype = null;
	            }
	
	            // TODO
	            // 18. Set the [[Extensible]] internal property of F to true.
	
	            // TODO
	            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	            // 20. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	            //   false.
	            // 21. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	            //   and false.
	
	            // TODO
	            // NOTE Function objects created using Function.prototype.bind do not
	            // have a prototype property or the [[Code]], [[FormalParameters]], and
	            // [[Scope]] internal properties.
	            // XXX can't delete prototype in pure-js.
	
	            // 22. Return F.
	            return bound;
	        }
	    });
	
	    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
	    // use it in defining shortcuts.
	    var owns = call.bind(ObjectPrototype.hasOwnProperty);
	    var toStr = call.bind(ObjectPrototype.toString);
	    var arraySlice = call.bind(array_slice);
	    var arraySliceApply = apply.bind(array_slice);
	    var strSlice = call.bind(StringPrototype.slice);
	    var strSplit = call.bind(StringPrototype.split);
	    var strIndexOf = call.bind(StringPrototype.indexOf);
	    var pushCall = call.bind(array_push);
	    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
	    var arraySort = call.bind(ArrayPrototype.sort);
	
	    //
	    // Array
	    // =====
	    //
	
	    var isArray = $Array.isArray || function isArray(obj) {
	        return toStr(obj) === '[object Array]';
	    };
	
	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.13
	    // Return len+argCount.
	    // [bugfix, ielt8]
	    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
	    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
	    defineProperties(ArrayPrototype, {
	        unshift: function () {
	            array_unshift.apply(this, arguments);
	            return this.length;
	        }
	    }, hasUnshiftReturnValueBug);
	
	    // ES5 15.4.3.2
	    // http://es5.github.com/#x15.4.3.2
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	    defineProperties($Array, { isArray: isArray });
	
	    // The IsCallable() check in the Array functions
	    // has been replaced with a strict check on the
	    // internal class of the object to trap cases where
	    // the provided function was actually a regular
	    // expression literal, which in V8 and
	    // JavaScriptCore is a typeof "function".  Only in
	    // V8 are regular expression literals permitted as
	    // reduce parameters, so it is desirable in the
	    // general case for the shim to match the more
	    // strict and common behavior of rejecting regular
	    // expressions.
	
	    // ES5 15.4.4.18
	    // http://es5.github.com/#x15.4.4.18
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach
	
	    // Check failure of by-index access of string characters (IE < 9)
	    // and failure of `0 in boxedString` (Rhino)
	    var boxedString = $Object('a');
	    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
	
	    var properlyBoxesContext = function properlyBoxed(method) {
	        // Check node 0.6.21 bug where third parameter is not boxed
	        var properlyBoxesNonStrict = true;
	        var properlyBoxesStrict = true;
	        var threwException = false;
	        if (method) {
	            try {
	                method.call('foo', function (_, __, context) {
	                    if (typeof context !== 'object') {
	                        properlyBoxesNonStrict = false;
	                    }
	                });
	
	                method.call([1], function () {
	                    'use strict';
	
	                    properlyBoxesStrict = typeof this === 'string';
	                }, 'x');
	            } catch (e) {
	                threwException = true;
	            }
	        }
	        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
	    };
	
	    defineProperties(ArrayPrototype, {
	        forEach: function forEach(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var i = -1;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }
	
	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.forEach callback must be a function');
	            }
	
	            while (++i < length) {
	                if (i in self) {
	                    // Invoke the callback function with call, passing arguments:
	                    // context, property value, property key, thisArg object
	                    if (typeof T === 'undefined') {
	                        callbackfn(self[i], i, object);
	                    } else {
	                        callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	        }
	    }, !properlyBoxesContext(ArrayPrototype.forEach));
	
	    // ES5 15.4.4.19
	    // http://es5.github.com/#x15.4.4.19
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
	    defineProperties(ArrayPrototype, {
	        map: function map(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = $Array(length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }
	
	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.map callback must be a function');
	            }
	
	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    if (typeof T === 'undefined') {
	                        result[i] = callbackfn(self[i], i, object);
	                    } else {
	                        result[i] = callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.map));
	
	    // ES5 15.4.4.20
	    // http://es5.github.com/#x15.4.4.20
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
	    defineProperties(ArrayPrototype, {
	        filter: function filter(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = [];
	            var value;
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }
	
	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.filter callback must be a function');
	            }
	
	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    value = self[i];
	                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
	                        pushCall(result, value);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.filter));
	
	    // ES5 15.4.4.16
	    // http://es5.github.com/#x15.4.4.16
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
	    defineProperties(ArrayPrototype, {
	        every: function every(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }
	
	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.every callback must be a function');
	            }
	
	            for (var i = 0; i < length; i++) {
	                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.every));
	
	    // ES5 15.4.4.17
	    // http://es5.github.com/#x15.4.4.17
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
	    defineProperties(ArrayPrototype, {
	        some: function some(callbackfn/*, thisArg */) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }
	
	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.some callback must be a function');
	            }
	
	            for (var i = 0; i < length; i++) {
	                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.some));
	
	    // ES5 15.4.4.21
	    // http://es5.github.com/#x15.4.4.21
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
	    var reduceCoercesToObject = false;
	    if (ArrayPrototype.reduce) {
	        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduce: function reduce(callbackfn/*, initialValue*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	
	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduce callback must be a function');
	            }
	
	            // no value to return if no initial value and an empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduce of empty array with no initial value');
	            }
	
	            var i = 0;
	            var result;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i++];
	                        break;
	                    }
	
	                    // if array contains no values, no initial value to return
	                    if (++i >= length) {
	                        throw new TypeError('reduce of empty array with no initial value');
	                    }
	                } while (true);
	            }
	
	            for (; i < length; i++) {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            }
	
	            return result;
	        }
	    }, !reduceCoercesToObject);
	
	    // ES5 15.4.4.22
	    // http://es5.github.com/#x15.4.4.22
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
	    var reduceRightCoercesToObject = false;
	    if (ArrayPrototype.reduceRight) {
	        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduceRight: function reduceRight(callbackfn/*, initial*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	
	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduceRight callback must be a function');
	            }
	
	            // no value to return if no initial value, empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduceRight of empty array with no initial value');
	            }
	
	            var result;
	            var i = length - 1;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i--];
	                        break;
	                    }
	
	                    // if array contains no values, no initial value to return
	                    if (--i < 0) {
	                        throw new TypeError('reduceRight of empty array with no initial value');
	                    }
	                } while (true);
	            }
	
	            if (i < 0) {
	                return result;
	            }
	
	            do {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            } while (i--);
	
	            return result;
	        }
	    }, !reduceRightCoercesToObject);
	
	    // ES5 15.4.4.14
	    // http://es5.github.com/#x15.4.4.14
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	    defineProperties(ArrayPrototype, {
	        indexOf: function indexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);
	
	            if (length === 0) {
	                return -1;
	            }
	
	            var i = 0;
	            if (arguments.length > 1) {
	                i = ES.ToInteger(arguments[1]);
	            }
	
	            // handle negative indices
	            i = i >= 0 ? i : max(0, length + i);
	            for (; i < length; i++) {
	                if (i in self && self[i] === searchElement) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2IndexOfBug);
	
	    // ES5 15.4.4.15
	    // http://es5.github.com/#x15.4.4.15
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
	    defineProperties(ArrayPrototype, {
	        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);
	
	            if (length === 0) {
	                return -1;
	            }
	            var i = length - 1;
	            if (arguments.length > 1) {
	                i = min(i, ES.ToInteger(arguments[1]));
	            }
	            // handle negative indices
	            i = i >= 0 ? i : length - Math.abs(i);
	            for (; i >= 0; i--) {
	                if (i in self && searchElement === self[i]) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2LastIndexOfBug);
	
	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.12
	    var spliceNoopReturnsEmptyArray = (function () {
	        var a = [1, 2];
	        var result = a.splice();
	        return a.length === 2 && isArray(result) && result.length === 0;
	    }());
	    defineProperties(ArrayPrototype, {
	        // Safari 5.0 bug where .splice() returns undefined
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            } else {
	                return array_splice.apply(this, arguments);
	            }
	        }
	    }, !spliceNoopReturnsEmptyArray);
	
	    var spliceWorksWithEmptyObject = (function () {
	        var obj = {};
	        ArrayPrototype.splice.call(obj, 0, 0, 1);
	        return obj.length === 1;
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            }
	            var args = arguments;
	            this.length = max(ES.ToInteger(this.length), 0);
	            if (arguments.length > 0 && typeof deleteCount !== 'number') {
	                args = arraySlice(arguments);
	                if (args.length < 2) {
	                    pushCall(args, this.length - start);
	                } else {
	                    args[1] = ES.ToInteger(deleteCount);
	                }
	            }
	            return array_splice.apply(this, args);
	        }
	    }, !spliceWorksWithEmptyObject);
	    var spliceWorksWithLargeSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
	        var arr = new $Array(1e5);
	        // note: the index MUST be 8 or larger or the test will false pass
	        arr[8] = 'x';
	        arr.splice(1, 1);
	        // note: this test must be defined *after* the indexOf shim
	        // per https://github.com/es-shims/es5-shim/issues/313
	        return arr.indexOf('x') === 7;
	    }());
	    var spliceWorksWithSmallSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Opera 12.15 breaks on this, no idea why.
	        var n = 256;
	        var arr = [];
	        arr[n] = 'a';
	        arr.splice(n + 1, 0, 'b');
	        return arr[n] === 'a';
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            var O = ES.ToObject(this);
	            var A = [];
	            var len = ES.ToUint32(O.length);
	            var relativeStart = ES.ToInteger(start);
	            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);
	            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);
	
	            var k = 0;
	            var from;
	            while (k < actualDeleteCount) {
	                from = $String(actualStart + k);
	                if (owns(O, from)) {
	                    A[k] = O[from];
	                }
	                k += 1;
	            }
	
	            var items = arraySlice(arguments, 2);
	            var itemCount = items.length;
	            var to;
	            if (itemCount < actualDeleteCount) {
	                k = actualStart;
	                var maxK = len - actualDeleteCount;
	                while (k < maxK) {
	                    from = $String(k + actualDeleteCount);
	                    to = $String(k + itemCount);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k += 1;
	                }
	                k = len;
	                var minK = len - actualDeleteCount + itemCount;
	                while (k > minK) {
	                    delete O[k - 1];
	                    k -= 1;
	                }
	            } else if (itemCount > actualDeleteCount) {
	                k = len - actualDeleteCount;
	                while (k > actualStart) {
	                    from = $String(k + actualDeleteCount - 1);
	                    to = $String(k + itemCount - 1);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k -= 1;
	                }
	            }
	            k = actualStart;
	            for (var i = 0; i < items.length; ++i) {
	                O[k] = items[i];
	                k += 1;
	            }
	            O.length = len - actualDeleteCount + itemCount;
	
	            return A;
	        }
	    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);
	
	    var originalJoin = ArrayPrototype.join;
	    var hasStringJoinBug;
	    try {
	        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
	    } catch (e) {
	        hasStringJoinBug = true;
	    }
	    if (hasStringJoinBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
	            }
	        }, hasStringJoinBug);
	    }
	
	    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
	    if (hasJoinUndefinedBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(this, sep);
	            }
	        }, hasJoinUndefinedBug);
	    }
	
	    var pushShim = function push(item) {
	        var O = ES.ToObject(this);
	        var n = ES.ToUint32(O.length);
	        var i = 0;
	        while (i < arguments.length) {
	            O[n + i] = arguments[i];
	            i += 1;
	        }
	        O.length = n + i;
	        return n + i;
	    };
	
	    var pushIsNotGeneric = (function () {
	        var obj = {};
	        var result = Array.prototype.push.call(obj, undefined);
	        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
	    }());
	    defineProperties(ArrayPrototype, {
	        push: function push(item) {
	            if (isArray(this)) {
	                return array_push.apply(this, arguments);
	            }
	            return pushShim.apply(this, arguments);
	        }
	    }, pushIsNotGeneric);
	
	    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
	    var pushUndefinedIsWeird = (function () {
	        var arr = [];
	        var result = arr.push(undefined);
	        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
	    }());
	    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);
	
	    // ES5 15.2.3.14
	    // http://es5.github.io/#x15.4.4.10
	    // Fix boxed string bug
	    defineProperties(ArrayPrototype, {
	        slice: function (start, end) {
	            var arr = isString(this) ? strSplit(this, '') : this;
	            return arraySliceApply(arr, arguments);
	        }
	    }, splitString);
	
	    var sortIgnoresNonFunctions = (function () {
	        try {
	            [1, 2].sort(null);
	            [1, 2].sort({});
	            return true;
	        } catch (e) {}
	        return false;
	    }());
	    var sortThrowsOnRegex = (function () {
	        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
	        try {
	            [1, 2].sort(/a/);
	            return false;
	        } catch (e) {}
	        return true;
	    }());
	    var sortIgnoresUndefined = (function () {
	        // applies in IE 8, for one.
	        try {
	            [1, 2].sort(undefined);
	            return true;
	        } catch (e) {}
	        return false;
	    }());
	    defineProperties(ArrayPrototype, {
	        sort: function sort(compareFn) {
	            if (typeof compareFn === 'undefined') {
	                return arraySort(this);
	            }
	            if (!isCallable(compareFn)) {
	                throw new TypeError('Array.prototype.sort callback must be a function');
	            }
	            return arraySort(this, compareFn);
	        }
	    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);
	
	    //
	    // Object
	    // ======
	    //
	
	    // ES5 15.2.3.14
	    // http://es5.github.com/#x15.2.3.14
	
	    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString');
	    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
	    var hasStringEnumBug = !owns('x', '0');
	    var equalsConstructorPrototype = function (o) {
	        var ctor = o.constructor;
	        return ctor && ctor.prototype === o;
	    };
	    var blacklistedKeys = {
	        $window: true,
	        $console: true,
	        $parent: true,
	        $self: true,
	        $frame: true,
	        $frames: true,
	        $frameElement: true,
	        $webkitIndexedDB: true,
	        $webkitStorageInfo: true,
	        $external: true
	    };
	    var hasAutomationEqualityBug = (function () {
	        /* globals window */
	        if (typeof window === 'undefined') {
	            return false;
	        }
	        for (var k in window) {
	            try {
	                if (!blacklistedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
	                    equalsConstructorPrototype(window[k]);
	                }
	            } catch (e) {
	                return true;
	            }
	        }
	        return false;
	    }());
	    var equalsConstructorPrototypeIfNotBuggy = function (object) {
	        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
	            return equalsConstructorPrototype(object);
	        }
	        try {
	            return equalsConstructorPrototype(object);
	        } catch (e) {
	            return false;
	        }
	    };
	    var dontEnums = [
	        'toString',
	        'toLocaleString',
	        'valueOf',
	        'hasOwnProperty',
	        'isPrototypeOf',
	        'propertyIsEnumerable',
	        'constructor'
	    ];
	    var dontEnumsLength = dontEnums.length;
	
	    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
	    // can be replaced with require('is-arguments') if we ever use a build process instead
	    var isStandardArguments = function isArguments(value) {
	        return toStr(value) === '[object Arguments]';
	    };
	    var isLegacyArguments = function isArguments(value) {
	        return value !== null &&
	            typeof value === 'object' &&
	            typeof value.length === 'number' &&
	            value.length >= 0 &&
	            !isArray(value) &&
	            isCallable(value.callee);
	    };
	    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;
	
	    defineProperties($Object, {
	        keys: function keys(object) {
	            var isFn = isCallable(object);
	            var isArgs = isArguments(object);
	            var isObject = object !== null && typeof object === 'object';
	            var isStr = isObject && isString(object);
	
	            if (!isObject && !isFn && !isArgs) {
	                throw new TypeError('Object.keys called on a non-object');
	            }
	
	            var theKeys = [];
	            var skipProto = hasProtoEnumBug && isFn;
	            if ((isStr && hasStringEnumBug) || isArgs) {
	                for (var i = 0; i < object.length; ++i) {
	                    pushCall(theKeys, $String(i));
	                }
	            }
	
	            if (!isArgs) {
	                for (var name in object) {
	                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
	                        pushCall(theKeys, $String(name));
	                    }
	                }
	            }
	
	            if (hasDontEnumBug) {
	                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	                for (var j = 0; j < dontEnumsLength; j++) {
	                    var dontEnum = dontEnums[j];
	                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
	                        pushCall(theKeys, dontEnum);
	                    }
	                }
	            }
	            return theKeys;
	        }
	    });
	
	    var keysWorksWithArguments = $Object.keys && (function () {
	        // Safari 5.0 bug
	        return $Object.keys(arguments).length === 2;
	    }(1, 2));
	    var keysHasArgumentsLengthBug = $Object.keys && (function () {
	        var argKeys = $Object.keys(arguments);
	        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
	    }(1));
	    var originalKeys = $Object.keys;
	    defineProperties($Object, {
	        keys: function keys(object) {
	            if (isArguments(object)) {
	                return originalKeys(arraySlice(object));
	            } else {
	                return originalKeys(object);
	            }
	        }
	    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);
	
	    //
	    // Date
	    // ====
	    //
	
	    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
	    var aNegativeTestDate = new Date(-1509842289600292);
	    var aPositiveTestDate = new Date(1449662400000);
	    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
	    var hasToDateStringFormatBug;
	    var hasToStringFormatBug;
	    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
	    if (timeZoneOffset < -720) {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
	        hasToStringFormatBug = !(/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
	    } else {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
	        hasToStringFormatBug = !(/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
	    }
	
	    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
	    var originalGetMonth = call.bind(Date.prototype.getMonth);
	    var originalGetDate = call.bind(Date.prototype.getDate);
	    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
	    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
	    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
	    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
	    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
	    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
	    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
	    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
	    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	    var daysInMonth = function daysInMonth(month, year) {
	        return originalGetDate(new Date(year, month, 0));
	    };
	
	    defineProperties(Date.prototype, {
	        getFullYear: function getFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            if (year < 0 && originalGetMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getMonth: function getMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getDate: function getDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            var date = originalGetDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        },
	        getUTCFullYear: function getUTCFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            if (year < 0 && originalGetUTCMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getUTCMonth: function getUTCMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getUTCDate: function getUTCDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            var date = originalGetUTCDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        }
	    }, hasNegativeMonthYearBug);
	
	    defineProperties(Date.prototype, {
	        toUTCString: function toUTCString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = originalGetUTCDay(this);
	            var date = originalGetUTCDate(this);
	            var month = originalGetUTCMonth(this);
	            var year = originalGetUTCFullYear(this);
	            var hour = originalGetUTCHours(this);
	            var minute = originalGetUTCMinutes(this);
	            var second = originalGetUTCSeconds(this);
	            return dayName[day] + ', ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                monthName[month] + ' ' +
	                year + ' ' +
	                (hour < 10 ? '0' + hour : hour) + ':' +
	                (minute < 10 ? '0' + minute : minute) + ':' +
	                (second < 10 ? '0' + second : second) + ' GMT';
	        }
	    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);
	
	    // Opera 12 has `,`
	    defineProperties(Date.prototype, {
	        toDateString: function toDateString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            return dayName[day] + ' ' +
	                monthName[month] + ' ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                year;
	        }
	    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);
	
	    // can't use defineProperties here because of toString enumeration issue in IE <= 8
	    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
	        Date.prototype.toString = function toString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            var hour = this.getHours();
	            var minute = this.getMinutes();
	            var second = this.getSeconds();
	            var timezoneOffset = this.getTimezoneOffset();
	            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
	            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
	            return dayName[day] + ' ' +
	                monthName[month] + ' ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                year + ' ' +
	                (hour < 10 ? '0' + hour : hour) + ':' +
	                (minute < 10 ? '0' + minute : minute) + ':' +
	                (second < 10 ? '0' + second : second) + ' GMT' +
	                (timezoneOffset > 0 ? '-' : '+') +
	                (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset) +
	                (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
	        };
	        if (supportsDescriptors) {
	            $Object.defineProperty(Date.prototype, 'toString', {
	                configurable: true,
	                enumerable: false,
	                writable: true
	            });
	        }
	    }
	
	    // ES5 15.9.5.43
	    // http://es5.github.com/#x15.9.5.43
	    // This function returns a String value represent the instance in time
	    // represented by this Date object. The format of the String is the Date Time
	    // string format defined in 15.9.1.15. All fields are present in the String.
	    // The time zone is always UTC, denoted by the suffix Z. If the time value of
	    // this object is not a finite Number a RangeError exception is thrown.
	    var negativeDate = -62198755200000;
	    var negativeYearString = '-000001';
	    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
	    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';
	
	    var getTime = call.bind(Date.prototype.getTime);
	
	    defineProperties(Date.prototype, {
	        toISOString: function toISOString() {
	            if (!isFinite(this) || !isFinite(getTime(this))) {
	                // Adope Photoshop requires the second check.
	                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
	            }
	
	            var year = originalGetUTCFullYear(this);
	
	            var month = originalGetUTCMonth(this);
	            // see https://github.com/es-shims/es5-shim/issues/111
	            year += Math.floor(month / 12);
	            month = (month % 12 + 12) % 12;
	
	            // the date time string format is specified in 15.9.1.15.
	            var result = [month + 1, originalGetUTCDate(this), originalGetUTCHours(this), originalGetUTCMinutes(this), originalGetUTCSeconds(this)];
	            year = (
	                (year < 0 ? '-' : (year > 9999 ? '+' : '')) +
	                strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)
	            );
	
	            for (var i = 0; i < result.length; ++i) {
	                // pad months, days, hours, minutes, and seconds to have two digits.
	                result[i] = strSlice('00' + result[i], -2);
	            }
	            // pad milliseconds to have three digits.
	            return (
	                year + '-' + arraySlice(result, 0, 2).join('-') +
	                'T' + arraySlice(result, 2).join(':') + '.' +
	                strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'
	            );
	        }
	    }, hasNegativeDateBug || hasSafari51DateBug);
	
	    // ES5 15.9.5.44
	    // http://es5.github.com/#x15.9.5.44
	    // This function provides a String representation of a Date object for use by
	    // JSON.stringify (15.12.3).
	    var dateToJSONIsSupported = (function () {
	        try {
	            return Date.prototype.toJSON &&
	                new Date(NaN).toJSON() === null &&
	                new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
	                Date.prototype.toJSON.call({ // generic
	                    toISOString: function () { return true; }
	                });
	        } catch (e) {
	            return false;
	        }
	    }());
	    if (!dateToJSONIsSupported) {
	        Date.prototype.toJSON = function toJSON(key) {
	            // When the toJSON method is called with argument key, the following
	            // steps are taken:
	
	            // 1.  Let O be the result of calling ToObject, giving it the this
	            // value as its argument.
	            // 2. Let tv be ES.ToPrimitive(O, hint Number).
	            var O = $Object(this);
	            var tv = ES.ToPrimitive(O);
	            // 3. If tv is a Number and is not finite, return null.
	            if (typeof tv === 'number' && !isFinite(tv)) {
	                return null;
	            }
	            // 4. Let toISO be the result of calling the [[Get]] internal method of
	            // O with argument "toISOString".
	            var toISO = O.toISOString;
	            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
	            if (!isCallable(toISO)) {
	                throw new TypeError('toISOString property is not callable');
	            }
	            // 6. Return the result of calling the [[Call]] internal method of
	            //  toISO with O as the this value and an empty argument list.
	            return toISO.call(O);
	
	            // NOTE 1 The argument is ignored.
	
	            // NOTE 2 The toJSON function is intentionally generic; it does not
	            // require that its this value be a Date object. Therefore, it can be
	            // transferred to other kinds of objects for use as a method. However,
	            // it does require that any such object have a toISOString method. An
	            // object is free to use the argument key to filter its
	            // stringification.
	        };
	    }
	
	    // ES5 15.9.4.2
	    // http://es5.github.com/#x15.9.4.2
	    // based on work shared by Daniel Friesen (dantman)
	    // http://gist.github.com/303249
	    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
	    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
	    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
	    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
	        // XXX global assignment won't work in embeddings that use
	        // an alternate object for the context.
	        /* global Date: true */
	        /* eslint-disable no-undef */
	        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
	        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
	        /* eslint-disable no-implicit-globals */
	        Date = (function (NativeDate) {
	        /* eslint-enable no-implicit-globals */
	        /* eslint-enable no-undef */
	            // Date.length === 7
	            var DateShim = function Date(Y, M, D, h, m, s, ms) {
	                var length = arguments.length;
	                var date;
	                if (this instanceof NativeDate) {
	                    var seconds = s;
	                    var millis = ms;
	                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
	                        // work around a Safari 8/9 bug where it treats the seconds as signed
	                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                        var sToShift = Math.floor(msToShift / 1e3);
	                        seconds += sToShift;
	                        millis -= sToShift * 1e3;
	                    }
	                    date = length === 1 && $String(Y) === Y ? // isString(Y)
	                        // We explicitly pass it through parse:
	                        new NativeDate(DateShim.parse(Y)) :
	                        // We have to manually make calls depending on argument
	                        // length here
	                        length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) :
	                        length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) :
	                        length >= 5 ? new NativeDate(Y, M, D, h, m) :
	                        length >= 4 ? new NativeDate(Y, M, D, h) :
	                        length >= 3 ? new NativeDate(Y, M, D) :
	                        length >= 2 ? new NativeDate(Y, M) :
	                        length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y) :
	                                      new NativeDate();
	                } else {
	                    date = NativeDate.apply(this, arguments);
	                }
	                if (!isPrimitive(date)) {
	                    // Prevent mixups with unfixed Date object
	                    defineProperties(date, { constructor: DateShim }, true);
	                }
	                return date;
	            };
	
	            // 15.9.1.15 Date Time String Format.
	            var isoDateExpression = new RegExp('^' +
	                '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +
	                                          // 6-digit extended year
	                '(?:-(\\d{2})' + // optional month capture
	                '(?:-(\\d{2})' + // optional day capture
	                '(?:' + // capture hours:minutes:seconds.milliseconds
	                    'T(\\d{2})' + // hours capture
	                    ':(\\d{2})' + // minutes capture
	                    '(?:' + // optional :seconds.milliseconds
	                        ':(\\d{2})' + // seconds capture
	                        '(?:(\\.\\d{1,}))?' + // milliseconds capture
	                    ')?' +
	                '(' + // capture UTC offset component
	                    'Z|' + // UTC capture
	                    '(?:' + // offset specifier +/-hours:minutes
	                        '([-+])' + // sign capture
	                        '(\\d{2})' + // hours offset capture
	                        ':(\\d{2})' + // minutes offset capture
	                    ')' +
	                ')?)?)?)?' +
	            '$');
	
	            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
	
	            var dayFromMonth = function dayFromMonth(year, month) {
	                var t = month > 1 ? 1 : 0;
	                return (
	                    months[month] +
	                    Math.floor((year - 1969 + t) / 4) -
	                    Math.floor((year - 1901 + t) / 100) +
	                    Math.floor((year - 1601 + t) / 400) +
	                    365 * (year - 1970)
	                );
	            };
	
	            var toUTC = function toUTC(t) {
	                var s = 0;
	                var ms = t;
	                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
	                    // work around a Safari 8/9 bug where it treats the seconds as signed
	                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                    var sToShift = Math.floor(msToShift / 1e3);
	                    s += sToShift;
	                    ms -= sToShift * 1e3;
	                }
	                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
	            };
	
	            // Copy any custom methods a 3rd party library may have added
	            for (var key in NativeDate) {
	                if (owns(NativeDate, key)) {
	                    DateShim[key] = NativeDate[key];
	                }
	            }
	
	            // Copy "native" methods explicitly; they may be non-enumerable
	            defineProperties(DateShim, {
	                now: NativeDate.now,
	                UTC: NativeDate.UTC
	            }, true);
	            DateShim.prototype = NativeDate.prototype;
	            defineProperties(DateShim.prototype, {
	                constructor: DateShim
	            }, true);
	
	            // Upgrade Date.parse to handle simplified ISO 8601 strings
	            var parseShim = function parse(string) {
	                var match = isoDateExpression.exec(string);
	                if (match) {
	                    // parse months, days, hours, minutes, seconds, and milliseconds
	                    // provide default values if necessary
	                    // parse the UTC offset component
	                    var year = $Number(match[1]),
	                        month = $Number(match[2] || 1) - 1,
	                        day = $Number(match[3] || 1) - 1,
	                        hour = $Number(match[4] || 0),
	                        minute = $Number(match[5] || 0),
	                        second = $Number(match[6] || 0),
	                        millisecond = Math.floor($Number(match[7] || 0) * 1000),
	                        // When time zone is missed, local offset should be used
	                        // (ES 5.1 bug)
	                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
	                        isLocalTime = Boolean(match[4] && !match[8]),
	                        signOffset = match[9] === '-' ? 1 : -1,
	                        hourOffset = $Number(match[10] || 0),
	                        minuteOffset = $Number(match[11] || 0),
	                        result;
	                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
	                    if (
	                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) &&
	                        minute < 60 && second < 60 && millisecond < 1000 &&
	                        month > -1 && month < 12 && hourOffset < 24 &&
	                        minuteOffset < 60 && // detect invalid offsets
	                        day > -1 &&
	                        day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
	                    ) {
	                        result = (
	                            (dayFromMonth(year, month) + day) * 24 +
	                            hour +
	                            hourOffset * signOffset
	                        ) * 60;
	                        result = (
	                            (result + minute + minuteOffset * signOffset) * 60 +
	                            second
	                        ) * 1000 + millisecond;
	                        if (isLocalTime) {
	                            result = toUTC(result);
	                        }
	                        if (-8.64e15 <= result && result <= 8.64e15) {
	                            return result;
	                        }
	                    }
	                    return NaN;
	                }
	                return NativeDate.parse.apply(this, arguments);
	            };
	            defineProperties(DateShim, { parse: parseShim });
	
	            return DateShim;
	        }(Date));
	        /* global Date: false */
	    }
	
	    // ES5 15.9.4.4
	    // http://es5.github.com/#x15.9.4.4
	    if (!Date.now) {
	        Date.now = function now() {
	            return new Date().getTime();
	        };
	    }
	
	    //
	    // Number
	    // ======
	    //
	
	    // ES5.1 15.7.4.5
	    // http://es5.github.com/#x15.7.4.5
	    var hasToFixedBugs = NumberPrototype.toFixed && (
	      (0.00008).toFixed(3) !== '0.000' ||
	      (0.9).toFixed(0) !== '1' ||
	      (1.255).toFixed(2) !== '1.25' ||
	      (1000000000000000128).toFixed(0) !== '1000000000000000128'
	    );
	
	    var toFixedHelpers = {
	        base: 1e7,
	        size: 6,
	        data: [0, 0, 0, 0, 0, 0],
	        multiply: function multiply(n, c) {
	            var i = -1;
	            var c2 = c;
	            while (++i < toFixedHelpers.size) {
	                c2 += n * toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
	                c2 = Math.floor(c2 / toFixedHelpers.base);
	            }
	        },
	        divide: function divide(n) {
	            var i = toFixedHelpers.size;
	            var c = 0;
	            while (--i >= 0) {
	                c += toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = Math.floor(c / n);
	                c = (c % n) * toFixedHelpers.base;
	            }
	        },
	        numToString: function numToString() {
	            var i = toFixedHelpers.size;
	            var s = '';
	            while (--i >= 0) {
	                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
	                    var t = $String(toFixedHelpers.data[i]);
	                    if (s === '') {
	                        s = t;
	                    } else {
	                        s += strSlice('0000000', 0, 7 - t.length) + t;
	                    }
	                }
	            }
	            return s;
	        },
	        pow: function pow(x, n, acc) {
	            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
	        },
	        log: function log(x) {
	            var n = 0;
	            var x2 = x;
	            while (x2 >= 4096) {
	                n += 12;
	                x2 /= 4096;
	            }
	            while (x2 >= 2) {
	                n += 1;
	                x2 /= 2;
	            }
	            return n;
	        }
	    };
	
	    var toFixedShim = function toFixed(fractionDigits) {
	        var f, x, s, m, e, z, j, k;
	
	        // Test for NaN and round fractionDigits down
	        f = $Number(fractionDigits);
	        f = isActualNaN(f) ? 0 : Math.floor(f);
	
	        if (f < 0 || f > 20) {
	            throw new RangeError('Number.toFixed called with invalid number of decimals');
	        }
	
	        x = $Number(this);
	
	        if (isActualNaN(x)) {
	            return 'NaN';
	        }
	
	        // If it is too big or small, return the string value of the number
	        if (x <= -1e21 || x >= 1e21) {
	            return $String(x);
	        }
	
	        s = '';
	
	        if (x < 0) {
	            s = '-';
	            x = -x;
	        }
	
	        m = '0';
	
	        if (x > 1e-21) {
	            // 1e-21 < x < 1e21
	            // -70 < log2(x) < 70
	            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
	            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
	            z *= 0x10000000000000; // Math.pow(2, 52);
	            e = 52 - e;
	
	            // -18 < e < 122
	            // x = z / 2 ^ e
	            if (e > 0) {
	                toFixedHelpers.multiply(0, z);
	                j = f;
	
	                while (j >= 7) {
	                    toFixedHelpers.multiply(1e7, 0);
	                    j -= 7;
	                }
	
	                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
	                j = e - 1;
	
	                while (j >= 23) {
	                    toFixedHelpers.divide(1 << 23);
	                    j -= 23;
	                }
	
	                toFixedHelpers.divide(1 << j);
	                toFixedHelpers.multiply(1, 1);
	                toFixedHelpers.divide(2);
	                m = toFixedHelpers.numToString();
	            } else {
	                toFixedHelpers.multiply(0, z);
	                toFixedHelpers.multiply(1 << (-e), 0);
	                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
	            }
	        }
	
	        if (f > 0) {
	            k = m.length;
	
	            if (k <= f) {
	                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
	            } else {
	                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
	            }
	        } else {
	            m = s + m;
	        }
	
	        return m;
	    };
	    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);
	
	    var hasToPrecisionUndefinedBug = (function () {
	        try {
	            return 1.0.toPrecision(undefined) === '1';
	        } catch (e) {
	            return true;
	        }
	    }());
	    var originalToPrecision = NumberPrototype.toPrecision;
	    defineProperties(NumberPrototype, {
	        toPrecision: function toPrecision(precision) {
	            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
	        }
	    }, hasToPrecisionUndefinedBug);
	
	    //
	    // String
	    // ======
	    //
	
	    // ES5 15.5.4.14
	    // http://es5.github.com/#x15.5.4.14
	
	    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	    // Many browsers do not split properly with regular expressions or they
	    // do not perform the split correctly under obscure conditions.
	    // See http://blog.stevenlevithan.com/archives/cross-browser-split
	    // I've tested in many browsers and this seems to cover the deviant ones:
	    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	    //       [undefined, "t", undefined, "e", ...]
	    //    ''.split(/.?/) should be [], not [""]
	    //    '.'.split(/()()/) should be ["."], not ["", "", "."]
	
	    if (
	        'ab'.split(/(?:ab)*/).length !== 2 ||
	        '.'.split(/(.?)(.?)/).length !== 4 ||
	        'tesst'.split(/(s)*/)[1] === 't' ||
	        'test'.split(/(?:)/, -1).length !== 4 ||
	        ''.split(/.?/).length ||
	        '.'.split(/()()/).length > 1
	    ) {
	        (function () {
	            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
	            var maxSafe32BitInt = Math.pow(2, 32) - 1;
	
	            StringPrototype.split = function (separator, limit) {
	                var string = String(this);
	                if (typeof separator === 'undefined' && limit === 0) {
	                    return [];
	                }
	
	                // If `separator` is not a regex, use native split
	                if (!isRegex(separator)) {
	                    return strSplit(this, separator, limit);
	                }
	
	                var output = [];
	                var flags = (separator.ignoreCase ? 'i' : '') +
	                            (separator.multiline ? 'm' : '') +
	                            (separator.unicode ? 'u' : '') + // in ES6
	                            (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
	                    lastLastIndex = 0,
	                    // Make `global` and avoid `lastIndex` issues by working with a copy
	                    separator2, match, lastIndex, lastLength;
	                var separatorCopy = new RegExp(separator.source, flags + 'g');
	                if (!compliantExecNpcg) {
	                    // Doesn't need flags gy, but they don't hurt
	                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	                }
	                /* Values for `limit`, per the spec:
	                 * If undefined: 4294967295 // maxSafe32BitInt
	                 * If 0, Infinity, or NaN: 0
	                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	                 * If other: Type-convert, then use the above rules
	                 */
	                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
	                match = separatorCopy.exec(string);
	                while (match) {
	                    // `separatorCopy.lastIndex` is not reliable cross-browser
	                    lastIndex = match.index + match[0].length;
	                    if (lastIndex > lastLastIndex) {
	                        pushCall(output, strSlice(string, lastLastIndex, match.index));
	                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                        // nonparticipating capturing groups
	                        if (!compliantExecNpcg && match.length > 1) {
	                            /* eslint-disable no-loop-func */
	                            match[0].replace(separator2, function () {
	                                for (var i = 1; i < arguments.length - 2; i++) {
	                                    if (typeof arguments[i] === 'undefined') {
	                                        match[i] = void 0;
	                                    }
	                                }
	                            });
	                            /* eslint-enable no-loop-func */
	                        }
	                        if (match.length > 1 && match.index < string.length) {
	                            array_push.apply(output, arraySlice(match, 1));
	                        }
	                        lastLength = match[0].length;
	                        lastLastIndex = lastIndex;
	                        if (output.length >= splitLimit) {
	                            break;
	                        }
	                    }
	                    if (separatorCopy.lastIndex === match.index) {
	                        separatorCopy.lastIndex++; // Avoid an infinite loop
	                    }
	                    match = separatorCopy.exec(string);
	                }
	                if (lastLastIndex === string.length) {
	                    if (lastLength || !separatorCopy.test('')) {
	                        pushCall(output, '');
	                    }
	                } else {
	                    pushCall(output, strSlice(string, lastLastIndex));
	                }
	                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
	            };
	        }());
	
	    // [bugfix, chrome]
	    // If separator is undefined, then the result array contains just one String,
	    // which is the this value (converted to a String). If limit is not undefined,
	    // then the output array is truncated so that it contains no more than limit
	    // elements.
	    // "0".split(undefined, 0) -> []
	    } else if ('0'.split(void 0, 0).length) {
	        StringPrototype.split = function split(separator, limit) {
	            if (typeof separator === 'undefined' && limit === 0) {
	                return [];
	            }
	            return strSplit(this, separator, limit);
	        };
	    }
	
	    var str_replace = StringPrototype.replace;
	    var replaceReportsGroupsCorrectly = (function () {
	        var groups = [];
	        'x'.replace(/x(.)?/g, function (match, group) {
	            pushCall(groups, group);
	        });
	        return groups.length === 1 && typeof groups[0] === 'undefined';
	    }());
	
	    if (!replaceReportsGroupsCorrectly) {
	        StringPrototype.replace = function replace(searchValue, replaceValue) {
	            var isFn = isCallable(replaceValue);
	            var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
	            if (!isFn || !hasCapturingGroups) {
	                return str_replace.call(this, searchValue, replaceValue);
	            } else {
	                var wrappedReplaceValue = function (match) {
	                    var length = arguments.length;
	                    var originalLastIndex = searchValue.lastIndex;
	                    searchValue.lastIndex = 0;
	                    var args = searchValue.exec(match) || [];
	                    searchValue.lastIndex = originalLastIndex;
	                    pushCall(args, arguments[length - 2], arguments[length - 1]);
	                    return replaceValue.apply(this, args);
	                };
	                return str_replace.call(this, searchValue, wrappedReplaceValue);
	            }
	        };
	    }
	
	    // ECMA-262, 3rd B.2.3
	    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	    // non-normative section suggesting uniform semantics and it should be
	    // normalized across all browsers
	    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	    var string_substr = StringPrototype.substr;
	    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	    defineProperties(StringPrototype, {
	        substr: function substr(start, length) {
	            var normalizedStart = start;
	            if (start < 0) {
	                normalizedStart = max(this.length + start, 0);
	            }
	            return string_substr.call(this, normalizedStart, length);
	        }
	    }, hasNegativeSubstrBug);
	
	    // ES5 15.5.4.20
	    // whitespace from: http://es5.github.io/#x15.5.4.20
	    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
	        '\u2029\uFEFF';
	    var zeroWidth = '\u200b';
	    var wsRegexChars = '[' + ws + ']';
	    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
	    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
	    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
	    defineProperties(StringPrototype, {
	        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
	        // http://perfectionkills.com/whitespace-deviations/
	        trim: function trim() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
	        }
	    }, hasTrimWhitespaceBug);
	    var trim = call.bind(String.prototype.trim);
	
	    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var S = $String(this);
	            var searchStr = $String(searchString);
	            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
	            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
	            var start = min(max(pos, 0), S.length);
	            var searchLen = searchStr.length;
	            var k = start + searchLen;
	            while (k > 0) {
	                k = max(0, k - searchLen);
	                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
	                if (index !== -1) {
	                    return k + index;
	                }
	            }
	            return -1;
	        }
	    }, hasLastIndexBug);
	
	    var originalLastIndexOf = StringPrototype.lastIndexOf;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            return originalLastIndexOf.apply(this, arguments);
	        }
	    }, StringPrototype.lastIndexOf.length !== 1);
	
	    // ES-5 15.1.2.2
	    /* eslint-disable radix */
	    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
	    /* eslint-enable radix */
	        /* global parseInt: true */
	        parseInt = (function (origParseInt) {
	            var hexRegex = /^[\-+]?0[xX]/;
	            return function parseInt(str, radix) {
	                var string = trim(String(str));
	                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
	                return origParseInt(string, defaultedRadix);
	            };
	        }(parseInt));
	    }
	
	    // https://es5.github.io/#x15.1.2.3
	    if (1 / parseFloat('-0') !== -Infinity) {
	        /* global parseFloat: true */
	        parseFloat = (function (origParseFloat) {
	            return function parseFloat(string) {
	                var inputString = trim(String(string));
	                var result = origParseFloat(inputString);
	                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
	            };
	        }(parseFloat));
	    }
	
	    if (String(new RangeError('test')) !== 'RangeError: test') {
	        var errorToStringShim = function toString() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var name = this.name;
	            if (typeof name === 'undefined') {
	                name = 'Error';
	            } else if (typeof name !== 'string') {
	                name = $String(name);
	            }
	            var msg = this.message;
	            if (typeof msg === 'undefined') {
	                msg = '';
	            } else if (typeof msg !== 'string') {
	                msg = $String(msg);
	            }
	            if (!name) {
	                return msg;
	            }
	            if (!msg) {
	                return name;
	            }
	            return name + ': ' + msg;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        Error.prototype.toString = errorToStringShim;
	    }
	
	    if (supportsDescriptors) {
	        var ensureNonEnumerable = function (obj, prop) {
	            if (isEnum(obj, prop)) {
	                var desc = Object.getOwnPropertyDescriptor(obj, prop);
	                if (desc.configurable) {
	                    desc.enumerable = false;
	                    Object.defineProperty(obj, prop, desc);
	                }
	            }
	        };
	        ensureNonEnumerable(Error.prototype, 'message');
	        if (Error.prototype.message !== '') {
	            Error.prototype.message = '';
	        }
	        ensureNonEnumerable(Error.prototype, 'name');
	    }
	
	    if (String(/a/mig) !== '/a/gim') {
	        var regexToString = function toString() {
	            var str = '/' + this.source + '/';
	            if (this.global) {
	                str += 'g';
	            }
	            if (this.ignoreCase) {
	                str += 'i';
	            }
	            if (this.multiline) {
	                str += 'm';
	            }
	            return str;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        RegExp.prototype.toString = regexToString;
	    }
	}));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * https://github.com/es-shims/es5-shim
	 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
	 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
	 */
	
	// vim: ts=4 sts=4 sw=4 expandtab
	
	// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
	;
	
	// UMD (Universal Module Definition)
	// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
	(function (root, factory) {
	    'use strict';
	
	    /* global define, exports, module */
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.returnExports = factory();
	    }
	}(this, function () {
	
	    var call = Function.call;
	    var prototypeOfObject = Object.prototype;
	    var owns = call.bind(prototypeOfObject.hasOwnProperty);
	    var isEnumerable = call.bind(prototypeOfObject.propertyIsEnumerable);
	    var toStr = call.bind(prototypeOfObject.toString);
	
	    // If JS engine supports accessors creating shortcuts.
	    var defineGetter;
	    var defineSetter;
	    var lookupGetter;
	    var lookupSetter;
	    var supportsAccessors = owns(prototypeOfObject, '__defineGetter__');
	    if (supportsAccessors) {
	        /* eslint-disable no-underscore-dangle */
	        defineGetter = call.bind(prototypeOfObject.__defineGetter__);
	        defineSetter = call.bind(prototypeOfObject.__defineSetter__);
	        lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
	        lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
	        /* eslint-enable no-underscore-dangle */
	    }
	
	    var isPrimitive = function isPrimitive(o) {
	        return o == null || (typeof o !== 'object' && typeof o !== 'function');
	    };
	
	    // ES5 15.2.3.2
	    // http://es5.github.com/#x15.2.3.2
	    if (!Object.getPrototypeOf) {
	        // https://github.com/es-shims/es5-shim/issues#issue/2
	        // http://ejohn.org/blog/objectgetprototypeof/
	        // recommended by fschaefer on github
	        //
	        // sure, and webreflection says ^_^
	        // ... this will nerever possibly return null
	        // ... Opera Mini breaks here with infinite loops
	        Object.getPrototypeOf = function getPrototypeOf(object) {
	            /* eslint-disable no-proto */
	            var proto = object.__proto__;
	            /* eslint-enable no-proto */
	            if (proto || proto === null) {
	                return proto;
	            } else if (toStr(object.constructor) === '[object Function]') {
	                return object.constructor.prototype;
	            } else if (object instanceof Object) {
	                return prototypeOfObject;
	            } else {
	                // Correctly return null for Objects created with `Object.create(null)`
	                // (shammed or native) or `{ __proto__: null}`.  Also returns null for
	                // cross-realm objects on browsers that lack `__proto__` support (like
	                // IE <11), but that's the best we can do.
	                return null;
	            }
	        };
	    }
	
	    // ES5 15.2.3.3
	    // http://es5.github.com/#x15.2.3.3
	
	    var doesGetOwnPropertyDescriptorWork = function doesGetOwnPropertyDescriptorWork(object) {
	        try {
	            object.sentinel = 0;
	            return Object.getOwnPropertyDescriptor(object, 'sentinel').value === 0;
	        } catch (exception) {
	            return false;
	        }
	    };
	
	    // check whether getOwnPropertyDescriptor works if it's given. Otherwise, shim partially.
	    if (Object.defineProperty) {
	        var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
	        var getOwnPropertyDescriptorWorksOnDom = typeof document === 'undefined' ||
	        doesGetOwnPropertyDescriptorWork(document.createElement('div'));
	        if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
	            var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
	        }
	    }
	
	    if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
	        var ERR_NON_OBJECT = 'Object.getOwnPropertyDescriptor called on a non-object: ';
	
	        /* eslint-disable no-proto */
	        Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
	            if (isPrimitive(object)) {
	                throw new TypeError(ERR_NON_OBJECT + object);
	            }
	
	            // make a valiant attempt to use the real getOwnPropertyDescriptor
	            // for I8's DOM elements.
	            if (getOwnPropertyDescriptorFallback) {
	                try {
	                    return getOwnPropertyDescriptorFallback.call(Object, object, property);
	                } catch (exception) {
	                    // try the shim if the real one doesn't work
	                }
	            }
	
	            var descriptor;
	
	            // If object does not owns property return undefined immediately.
	            if (!owns(object, property)) {
	                return descriptor;
	            }
	
	            // If object has a property then it's for sure `configurable`, and
	            // probably `enumerable`. Detect enumerability though.
	            descriptor = {
	                enumerable: isEnumerable(object, property),
	                configurable: true
	            };
	
	            // If JS engine supports accessor properties then property may be a
	            // getter or setter.
	            if (supportsAccessors) {
	                // Unfortunately `__lookupGetter__` will return a getter even
	                // if object has own non getter property along with a same named
	                // inherited getter. To avoid misbehavior we temporary remove
	                // `__proto__` so that `__lookupGetter__` will return getter only
	                // if it's owned by an object.
	                var prototype = object.__proto__;
	                var notPrototypeOfObject = object !== prototypeOfObject;
	                // avoid recursion problem, breaking in Opera Mini when
	                // Object.getOwnPropertyDescriptor(Object.prototype, 'toString')
	                // or any other Object.prototype accessor
	                if (notPrototypeOfObject) {
	                    object.__proto__ = prototypeOfObject;
	                }
	
	                var getter = lookupGetter(object, property);
	                var setter = lookupSetter(object, property);
	
	                if (notPrototypeOfObject) {
	                    // Once we have getter and setter we can put values back.
	                    object.__proto__ = prototype;
	                }
	
	                if (getter || setter) {
	                    if (getter) {
	                        descriptor.get = getter;
	                    }
	                    if (setter) {
	                        descriptor.set = setter;
	                    }
	                    // If it was accessor property we're done and return here
	                    // in order to avoid adding `value` to the descriptor.
	                    return descriptor;
	                }
	            }
	
	            // If we got this far we know that object has an own property that is
	            // not an accessor so we set it as a value and return descriptor.
	            descriptor.value = object[property];
	            descriptor.writable = true;
	            return descriptor;
	        };
	        /* eslint-enable no-proto */
	    }
	
	    // ES5 15.2.3.4
	    // http://es5.github.com/#x15.2.3.4
	    if (!Object.getOwnPropertyNames) {
	        Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
	            return Object.keys(object);
	        };
	    }
	
	    // ES5 15.2.3.5
	    // http://es5.github.com/#x15.2.3.5
	    if (!Object.create) {
	
	        // Contributed by Brandon Benvie, October, 2012
	        var createEmpty;
	        var supportsProto = !({ __proto__: null } instanceof Object);
	                            // the following produces false positives
	                            // in Opera Mini => not a reliable check
	                            // Object.prototype.__proto__ === null
	
	        // Check for document.domain and active x support
	        // No need to use active x approach when document.domain is not set
	        // see https://github.com/es-shims/es5-shim/issues/150
	        // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	        /* global ActiveXObject */
	        var shouldUseActiveX = function shouldUseActiveX() {
	            // return early if document.domain not set
	            if (!document.domain) {
	                return false;
	            }
	
	            try {
	                return !!new ActiveXObject('htmlfile');
	            } catch (exception) {
	                return false;
	            }
	        };
	
	        // This supports IE8 when document.domain is used
	        // see https://github.com/es-shims/es5-shim/issues/150
	        // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	        var getEmptyViaActiveX = function getEmptyViaActiveX() {
	            var empty;
	            var xDoc;
	
	            xDoc = new ActiveXObject('htmlfile');
	
	            var script = 'script';
	            xDoc.write('<' + script + '></' + script + '>');
	            xDoc.close();
	
	            empty = xDoc.parentWindow.Object.prototype;
	            xDoc = null;
	
	            return empty;
	        };
	
	        // The original implementation using an iframe
	        // before the activex approach was added
	        // see https://github.com/es-shims/es5-shim/issues/150
	        var getEmptyViaIFrame = function getEmptyViaIFrame() {
	            var iframe = document.createElement('iframe');
	            var parent = document.body || document.documentElement;
	            var empty;
	
	            iframe.style.display = 'none';
	            parent.appendChild(iframe);
	            /* eslint-disable no-script-url */
	            iframe.src = 'javascript:';
	            /* eslint-enable no-script-url */
	
	            empty = iframe.contentWindow.Object.prototype;
	            parent.removeChild(iframe);
	            iframe = null;
	
	            return empty;
	        };
	
	        /* global document */
	        if (supportsProto || typeof document === 'undefined') {
	            createEmpty = function () {
	                return { __proto__: null };
	            };
	        } else {
	            // In old IE __proto__ can't be used to manually set `null`, nor does
	            // any other method exist to make an object that inherits from nothing,
	            // aside from Object.prototype itself. Instead, create a new global
	            // object and *steal* its Object.prototype and strip it bare. This is
	            // used as the prototype to create nullary objects.
	            createEmpty = function () {
	                // Determine which approach to use
	                // see https://github.com/es-shims/es5-shim/issues/150
	                var empty = shouldUseActiveX() ? getEmptyViaActiveX() : getEmptyViaIFrame();
	
	                delete empty.constructor;
	                delete empty.hasOwnProperty;
	                delete empty.propertyIsEnumerable;
	                delete empty.isPrototypeOf;
	                delete empty.toLocaleString;
	                delete empty.toString;
	                delete empty.valueOf;
	
	                var Empty = function Empty() {};
	                Empty.prototype = empty;
	                // short-circuit future calls
	                createEmpty = function () {
	                    return new Empty();
	                };
	                return new Empty();
	            };
	        }
	
	        Object.create = function create(prototype, properties) {
	
	            var object;
	            var Type = function Type() {}; // An empty constructor.
	
	            if (prototype === null) {
	                object = createEmpty();
	            } else {
	                if (prototype !== null && isPrimitive(prototype)) {
	                    // In the native implementation `parent` can be `null`
	                    // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
	                    // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
	                    // like they are in modern browsers. Using `Object.create` on DOM elements
	                    // is...err...probably inappropriate, but the native version allows for it.
	                    throw new TypeError('Object prototype may only be an Object or null'); // same msg as Chrome
	                }
	                Type.prototype = prototype;
	                object = new Type();
	                // IE has no built-in implementation of `Object.getPrototypeOf`
	                // neither `__proto__`, but this manually setting `__proto__` will
	                // guarantee that `Object.getPrototypeOf` will work as expected with
	                // objects created using `Object.create`
	                /* eslint-disable no-proto */
	                object.__proto__ = prototype;
	                /* eslint-enable no-proto */
	            }
	
	            if (properties !== void 0) {
	                Object.defineProperties(object, properties);
	            }
	
	            return object;
	        };
	    }
	
	    // ES5 15.2.3.6
	    // http://es5.github.com/#x15.2.3.6
	
	    // Patch for WebKit and IE8 standard mode
	    // Designed by hax <hax.github.com>
	    // related issue: https://github.com/es-shims/es5-shim/issues#issue/5
	    // IE8 Reference:
	    //     http://msdn.microsoft.com/en-us/library/dd282900.aspx
	    //     http://msdn.microsoft.com/en-us/library/dd229916.aspx
	    // WebKit Bugs:
	    //     https://bugs.webkit.org/show_bug.cgi?id=36423
	
	    var doesDefinePropertyWork = function doesDefinePropertyWork(object) {
	        try {
	            Object.defineProperty(object, 'sentinel', {});
	            return 'sentinel' in object;
	        } catch (exception) {
	            return false;
	        }
	    };
	
	    // check whether defineProperty works if it's given. Otherwise,
	    // shim partially.
	    if (Object.defineProperty) {
	        var definePropertyWorksOnObject = doesDefinePropertyWork({});
	        var definePropertyWorksOnDom = typeof document === 'undefined' ||
	            doesDefinePropertyWork(document.createElement('div'));
	        if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
	            var definePropertyFallback = Object.defineProperty,
	                definePropertiesFallback = Object.defineProperties;
	        }
	    }
	
	    if (!Object.defineProperty || definePropertyFallback) {
	        var ERR_NON_OBJECT_DESCRIPTOR = 'Property description must be an object: ';
	        var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object: ';
	        var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined on this javascript engine';
	
	        Object.defineProperty = function defineProperty(object, property, descriptor) {
	            if (isPrimitive(object)) {
	                throw new TypeError(ERR_NON_OBJECT_TARGET + object);
	            }
	            if (isPrimitive(descriptor)) {
	                throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
	            }
	            // make a valiant attempt to use the real defineProperty
	            // for I8's DOM elements.
	            if (definePropertyFallback) {
	                try {
	                    return definePropertyFallback.call(Object, object, property, descriptor);
	                } catch (exception) {
	                    // try the shim if the real one doesn't work
	                }
	            }
	
	            // If it's a data property.
	            if ('value' in descriptor) {
	                // fail silently if 'writable', 'enumerable', or 'configurable'
	                // are requested but not supported
	                /*
	                // alternate approach:
	                if ( // can't implement these features; allow false but not true
	                    ('writable' in descriptor && !descriptor.writable) ||
	                    ('enumerable' in descriptor && !descriptor.enumerable) ||
	                    ('configurable' in descriptor && !descriptor.configurable)
	                ))
	                    throw new RangeError(
	                        'This implementation of Object.defineProperty does not support configurable, enumerable, or writable.'
	                    );
	                */
	
	                if (supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
	                    // As accessors are supported only on engines implementing
	                    // `__proto__` we can safely override `__proto__` while defining
	                    // a property to make sure that we don't hit an inherited
	                    // accessor.
	                    /* eslint-disable no-proto */
	                    var prototype = object.__proto__;
	                    object.__proto__ = prototypeOfObject;
	                    // Deleting a property anyway since getter / setter may be
	                    // defined on object itself.
	                    delete object[property];
	                    object[property] = descriptor.value;
	                    // Setting original `__proto__` back now.
	                    object.__proto__ = prototype;
	                    /* eslint-enable no-proto */
	                } else {
	                    object[property] = descriptor.value;
	                }
	            } else {
	                var hasGetter = 'get' in descriptor;
	                var hasSetter = 'set' in descriptor;
	                if (!supportsAccessors && (hasGetter || hasSetter)) {
	                    throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
	                }
	                // If we got that far then getters and setters can be defined !!
	                if (hasGetter) {
	                    defineGetter(object, property, descriptor.get);
	                }
	                if (hasSetter) {
	                    defineSetter(object, property, descriptor.set);
	                }
	            }
	            return object;
	        };
	    }
	
	    // ES5 15.2.3.7
	    // http://es5.github.com/#x15.2.3.7
	    if (!Object.defineProperties || definePropertiesFallback) {
	        Object.defineProperties = function defineProperties(object, properties) {
	            // make a valiant attempt to use the real defineProperties
	            if (definePropertiesFallback) {
	                try {
	                    return definePropertiesFallback.call(Object, object, properties);
	                } catch (exception) {
	                    // try the shim if the real one doesn't work
	                }
	            }
	
	            Object.keys(properties).forEach(function (property) {
	                if (property !== '__proto__') {
	                    Object.defineProperty(object, property, properties[property]);
	                }
	            });
	            return object;
	        };
	    }
	
	    // ES5 15.2.3.8
	    // http://es5.github.com/#x15.2.3.8
	    if (!Object.seal) {
	        Object.seal = function seal(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.seal can only be called on Objects.');
	            }
	            // this is misleading and breaks feature-detection, but
	            // allows "securable" code to "gracefully" degrade to working
	            // but insecure code.
	            return object;
	        };
	    }
	
	    // ES5 15.2.3.9
	    // http://es5.github.com/#x15.2.3.9
	    if (!Object.freeze) {
	        Object.freeze = function freeze(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.freeze can only be called on Objects.');
	            }
	            // this is misleading and breaks feature-detection, but
	            // allows "securable" code to "gracefully" degrade to working
	            // but insecure code.
	            return object;
	        };
	    }
	
	    // detect a Rhino bug and patch it
	    try {
	        Object.freeze(function () {});
	    } catch (exception) {
	        Object.freeze = (function (freezeObject) {
	            return function freeze(object) {
	                if (typeof object === 'function') {
	                    return object;
	                } else {
	                    return freezeObject(object);
	                }
	            };
	        }(Object.freeze));
	    }
	
	    // ES5 15.2.3.10
	    // http://es5.github.com/#x15.2.3.10
	    if (!Object.preventExtensions) {
	        Object.preventExtensions = function preventExtensions(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.preventExtensions can only be called on Objects.');
	            }
	            // this is misleading and breaks feature-detection, but
	            // allows "securable" code to "gracefully" degrade to working
	            // but insecure code.
	            return object;
	        };
	    }
	
	    // ES5 15.2.3.11
	    // http://es5.github.com/#x15.2.3.11
	    if (!Object.isSealed) {
	        Object.isSealed = function isSealed(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.isSealed can only be called on Objects.');
	            }
	            return false;
	        };
	    }
	
	    // ES5 15.2.3.12
	    // http://es5.github.com/#x15.2.3.12
	    if (!Object.isFrozen) {
	        Object.isFrozen = function isFrozen(object) {
	            if (Object(object) !== object) {
	                throw new TypeError('Object.isFrozen can only be called on Objects.');
	            }
	            return false;
	        };
	    }
	
	    // ES5 15.2.3.13
	    // http://es5.github.com/#x15.2.3.13
	    if (!Object.isExtensible) {
	        Object.isExtensible = function isExtensible(object) {
	            // 1. If Type(O) is not Object throw a TypeError exception.
	            if (Object(object) !== object) {
	                throw new TypeError('Object.isExtensible can only be called on Objects.');
	            }
	            // 2. Return the Boolean value of the [[Extensible]] internal property of O.
	            var name = '';
	            while (owns(object, name)) {
	                name += '?';
	            }
	            object[name] = true;
	            var returnValue = owns(object, name);
	            delete object[name];
	            return returnValue;
	        };
	    }
	
	}));


/***/ },
/* 3 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4).setImmediate))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(5).nextTick;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).setImmediate, __webpack_require__(4).clearImmediate))

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(7);
	
	var implementation = __webpack_require__(11);
	var getPolyfill = __webpack_require__(29);
	var shim = __webpack_require__(30);
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys = __webpack_require__(8);
	var foreach = __webpack_require__(10);
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(9);
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ES = __webpack_require__(12);
	var supportsDescriptors = __webpack_require__(7).supportsDescriptors;
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
	var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;
	
	var $isNaN = __webpack_require__(13);
	var $isFinite = __webpack_require__(14);
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
	
	var assign = __webpack_require__(15);
	var sign = __webpack_require__(16);
	var mod = __webpack_require__(17);
	var isPrimitive = __webpack_require__(18);
	var toPrimitive = __webpack_require__(19);
	var parseInteger = parseInt;
	var bind = __webpack_require__(24);
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
	
	var ES5 = __webpack_require__(26);
	
	var hasRegExpMatcher = __webpack_require__(28);
	
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
/* 13 */
/***/ function(module, exports) {

	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	var $isNaN = Number.isNaN || function (a) { return a !== a; };
	
	module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports) {

	module.exports = function sign(number) {
		return number >= 0 ? 1 : -1;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function mod(number, modulo) {
		var remain = number % modulo;
		return Math.floor(remain >= 0 ? remain : remain + modulo);
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
	
	var isPrimitive = __webpack_require__(20);
	var isCallable = __webpack_require__(21);
	var isDate = __webpack_require__(22);
	var isSymbol = __webpack_require__(23);
	
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
/* 20 */
/***/ function(module, exports) {

	module.exports = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var implementation = __webpack_require__(25);
	
	module.exports = Function.prototype.bind || implementation;


/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $isNaN = __webpack_require__(13);
	var $isFinite = __webpack_require__(14);
	
	var sign = __webpack_require__(16);
	var mod = __webpack_require__(17);
	
	var IsCallable = __webpack_require__(21);
	var toPrimitive = __webpack_require__(27);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	
	var isPrimitive = __webpack_require__(20);
	
	var isCallable = __webpack_require__(21);
	
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
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ES = __webpack_require__(12);
	var implementation = __webpack_require__(11);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(7);
	var getPolyfill = __webpack_require__(29);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var util = __webpack_require__(32);
	var element_1 = __webpack_require__(34);
	var template_1 = __webpack_require__(35);
	var eventEmitter_1 = __webpack_require__(36);
	var component_1 = __webpack_require__(40);
	var route = __webpack_require__(48);
	var view_1 = __webpack_require__(51);
	var app_1 = __webpack_require__(52);
	var http_1 = __webpack_require__(53);
	var helper_1 = __webpack_require__(54);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var jquery = __webpack_require__(33);
	var VAR_REG = /(^[a-zA-Z0-9_-]+)$/;
	var _isIOS = null;
	var _isWeixinBrowser = null;
	function isIOS() {
	    if (_isIOS === null) {
	        _isIOS = typeof window === 'object' && (/iphone|ipad/gi).test(window.navigator.appVersion);
	    }
	    return _isIOS;
	}
	exports.isIOS = isIOS;
	function isWeixinBrowser() {
	    if (_isWeixinBrowser === null) {
	        _isWeixinBrowser = typeof window === 'object' && (/MicroMessenger/i).test(window.navigator.userAgent);
	    }
	    return _isWeixinBrowser;
	}
	exports.isWeixinBrowser = isWeixinBrowser;
	function get$() {
	    if (typeof $ === 'function') {
	        return $;
	    }
	    return jquery;
	}
	exports.get$ = get$;
	function each(arr, callback) {
	    get$().each(arr, function (k, v) {
	        return callback(v, k);
	    });
	}
	exports.each = each;
	function isNumber(x) {
	    return get$().isNumeric(x);
	}
	exports.isNumber = isNumber;
	function isArray(x) {
	    return get$().isArray(x);
	}
	exports.isArray = isArray;
	function isString(x) {
	    return get$().type(x) === 'string';
	}
	exports.isString = isString;
	function type(x) {
	    return get$().type(x);
	}
	exports.type = type;
	function isFunction(x) {
	    return get$().isFunction(x);
	}
	exports.isFunction = isFunction;
	function isObject(x) {
	    return get$().isPlainObject(x);
	}
	exports.isObject = isObject;
	function isPlainObject(x) {
	    return get$().isPlainObject(x);
	}
	exports.isPlainObject = isPlainObject;
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
	                return element.refs;
	            },
	            element: element
	        });
	    });
	    return events;
	}
	exports.getEvents = getEvents;
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
	function parseDynamicVal(dynamicCode, dynamicCodeStr, view) {
	    if (type(dynamicCode) === 'function') {
	        type(console) !== 'undefined' && console.error('dynamicCode can not be a function');
	        return '';
	    }
	    else if (type(dynamicCode) !== 'undefined'
	        && ((type(Element) === 'function' || type(Element) === 'object')
	            && dynamicCode instanceof Element === false)) {
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
	function callFormatter(formatterName, mcore) {
	    if (mcore.Template.formatters.hasOwnProperty(formatterName)) {
	        return mcore.Template.formatters[formatterName];
	    }
	    return function () { };
	}
	exports.callFormatter = callFormatter;
	function nodeListToArray(nodeList) {
	    var list = [];
	    for (var i = 0, len = nodeList.length; i < len; i++) {
	        list.push(nodeList[i]);
	    }
	    return list;
	}
	exports.nodeListToArray = nodeListToArray;
	var NextTick = (function () {
	    function NextTick() {
	    }
	    NextTick.requestAnimationFrame = function () {
	        return typeof requestAnimationFrame === 'function' ? requestAnimationFrame : setTimeout;
	    };
	    NextTick.cancelAnimationFrame = function () {
	        return typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;
	    };
	    NextTick.next = function (fun) {
	        return NextTick.requestAnimationFrame()(function () {
	            fun();
	        });
	    };
	    NextTick.clear = function (id) {
	        return NextTick.cancelAnimationFrame()(id);
	    };
	    return NextTick;
	}());
	exports.NextTick = NextTick;


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_33__;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var template_1 = __webpack_require__(35);
	var Element = (function () {
	    function Element(tagName, key, props, dynamicProps, children, events, view) {
	        var _this = this;
	        if (props === void 0) { props = {}; }
	        if (dynamicProps === void 0) { dynamicProps = {}; }
	        if (children === void 0) { children = []; }
	        if (events === void 0) { events = {}; }
	        if (view === void 0) { view = null; }
	        this._noDiffChild = false;
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
	                child.parentElement = _this;
	                count += child.count;
	            }
	            count++;
	        });
	        this.count = count;
	    }
	    Element.prototype.cloneElement = function (element) {
	        var _this = this;
	        this._component = element._component;
	        this._noDiffChild = element._noDiffChild;
	        this._binder = element._binder;
	        this.refs = element.refs;
	        this.view = element.view;
	        this.template = element.template;
	        this.template.element = this;
	        element = null;
	        Object.keys(this.dynamicProps).forEach(function (attr) {
	            _this.template.setAttr(attr.toLowerCase(), _this.dynamicProps[attr], true, 'update');
	        });
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var util_1 = __webpack_require__(32);
	var eventEmitter_1 = __webpack_require__(36);
	var binders_1 = __webpack_require__(38);
	var formatters_1 = __webpack_require__(39);
	var util = __webpack_require__(32);
	var getComponents = util.getComponents;
	var Template = (function (_super) {
	    __extends(Template, _super);
	    function Template(element) {
	        _super.call(this);
	        this._isWatchEvent = false;
	        this.element = element;
	    }
	    Template.prototype.destroy = function (notRemove) {
	        if (notRemove === void 0) { notRemove = false; }
	        getComponents(this.element).forEach(function (component) {
	            component.destroy();
	        });
	        if (!notRemove) {
	            if (this.refs && this.refs.parentNode && this.refs.parentNode.removeChild) {
	                this.refs.parentNode.removeChild(this.refs);
	            }
	        }
	        this.emit('destroy');
	    };
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
	            this.refs = node;
	            return node;
	        }
	        node = document.createElement(this.element.tagName);
	        node._key = this.element.key;
	        node._element = this.element;
	        this.refs = node;
	        if (Template.components.hasOwnProperty(this.element.tagName)) {
	            Object.keys(this.element.props).forEach(function (attr) {
	                _this.setAttr(attr.toLowerCase(), _this.element.props[attr]);
	            });
	            Object.keys(this.element.dynamicProps).forEach(function (attr) {
	                _this.setAttr(attr.toLowerCase(), _this.element.dynamicProps[attr], true);
	            });
	            this.element._component = new Template.components[this.element.tagName](node, this.element);
	            this.element._noDiffChild = true;
	            this.element.children = [];
	            this.element.count = 0;
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
	            Object.keys(this.element.props).forEach(function (attr) {
	                _this.setAttr(attr.toLowerCase(), _this.element.props[attr]);
	            });
	            Object.keys(this.element.dynamicProps).forEach(function (attr) {
	                _this.setAttr(attr.toLowerCase(), _this.element.dynamicProps[attr], true);
	            });
	        }
	        return this.refs;
	    };
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
	    Template.prototype.update = function (attr, value, status) {
	        if (this.element._component) {
	            this.element._component.update(attr, value, status);
	        }
	        this.emit(status, attr, value);
	        this.emit('change:' + attr, value);
	    };
	    Template.prototype.setAttr = function (attr, value, isDynamic, status) {
	        if (isDynamic === void 0) { isDynamic = false; }
	        if (status === void 0) { status = 'init'; }
	        if (isDynamic) {
	            if (this.element.dynamicProps.hasOwnProperty(attr) === false) {
	                return;
	            }
	            if (Template.binders.hasOwnProperty(attr)) {
	                var binder = Template.binders[attr];
	                this.callBinder(binder, status, value);
	                return;
	            }
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
	        var tagName = this.element.tagName;
	        if (attr === 'value' && ['input', 'textarea', 'select'].indexOf(tagName) !== -1) {
	            this.refs.value = value;
	            return;
	        }
	        if (util_1.isNumber(value) || util_1.isString(value) || value === true) {
	            this.refs.setAttribute(attr, value);
	        }
	    };
	    Template.components = {};
	    Template.binders = binders_1.default;
	    Template.formatters = formatters_1.default;
	    Template.strToFun = function (el, value) {
	        if (!el._element || !el._element.view || !el._element.view[value]) {
	            return function () { };
	        }
	        return function () {
	            return el._element.view[value].apply(el._element.view, arguments);
	        };
	    };
	    Template.getEnv = function (el) {
	        return el._element.view;
	    };
	    return Template;
	}(eventEmitter_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Template;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var EventEmitter = __webpack_require__(37);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = EventEmitter;


/***/ },
/* 37 */
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var util_1 = __webpack_require__(32);
	var binder = {
	    checked: function (el, value) {
	        if (value) {
	            el.checked = true;
	        }
	        else {
	            el.checked = false;
	        }
	    },
	    disabled: function (el, value) {
	        if (value) {
	            el.disabled = true;
	        }
	        else {
	            el.disabled = false;
	        }
	    },
	    focus: function (el, value) {
	        if (el.focus && value) {
	            el.focus();
	        }
	        else if (el.blur && !value) {
	            el.blur();
	        }
	    },
	    blur: function (el, value) {
	        if (el.focus && !value) {
	            el.focus();
	        }
	        else if (el.blur && value) {
	            el.blur();
	        }
	    },
	    html: function (el, value) {
	        el.innerHTML = value || '';
	        el._element._noDiffChild = true;
	    },
	    'no-diff-child': function (el, value) {
	        el._element._noDiffChild = value;
	    },
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
	binder['load-data'] = binder['form-load-data'];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = binder;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var util_1 = __webpack_require__(32);
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var eventEmitter_1 = __webpack_require__(36);
	var util = __webpack_require__(32);
	var template_1 = __webpack_require__(35);
	var element_1 = __webpack_require__(34);
	var diff_1 = __webpack_require__(41);
	var patch_1 = __webpack_require__(42);
	var watch_1 = __webpack_require__(45);
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
	    __extends(Component, _super);
	    function Component(parentNode, parentElement, args) {
	        var _this = this;
	        if (parentElement === void 0) { parentElement = {}; }
	        if (args === void 0) { args = {}; }
	        _super.call(this);
	        this._queueCallbacks = [];
	        this._queueId = null;
	        this._regEvents = [];
	        this._initWatchScope = false;
	        this.util = util;
	        this.nextTick = nextTick;
	        this.isWeixinBrowser = util.isWeixinBrowser();
	        this.isIOS = util.isIOS();
	        Object.keys(args).forEach(function (key) {
	            _this[key] = args[key];
	        });
	        this.parentNode = parentNode;
	        this.el = parentNode;
	        this.parentElement = parentElement;
	        this._initWatchScope = false;
	        this.id = _id++;
	        if ($_win === null || $_body === null) {
	            $_win = util.get$()(window);
	            $_body = util.get$()('body');
	        }
	        this.$win = $_win;
	        this.$body = $_body;
	        this.scope = parentElement.props || {};
	        Object.keys(parentElement.dynamicProps || {}).forEach(function (attr) {
	            _this.scope[attr] = parentElement.dynamicProps[attr];
	        });
	        this.beforeInit();
	        this.init();
	        this.watch();
	    }
	    Component.prototype.beforeInit = function () { };
	    Component.prototype.init = function () { };
	    Component.prototype.watch = function () { };
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
	        this._queueCallbacks = [];
	    };
	    Component.prototype.parentView = function () {
	        return this.parentElement.view;
	    };
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
	            if (Array.isArray(eventCtx.args) && eventCtx.args.length) {
	                args = args.concat(eventCtx.args);
	            }
	            callback.apply(parentView, args);
	        }
	    };
	    Component.prototype.renderQueue = function (doneOrAsync) {
	        var _this = this;
	        if (doneOrAsync === void 0) { doneOrAsync = null; }
	        if (isFunction(doneOrAsync)) {
	            this._queueCallbacks.push(doneOrAsync);
	        }
	        if (this._queueId) {
	            nextTick.clear(this._queueId);
	        }
	        if (doneOrAsync === true) {
	            return this._render();
	        }
	        else {
	            this._queueId = nextTick.next(function () {
	                _this._render();
	            });
	        }
	    };
	    Component.prototype._render = function () {
	        var _this = this;
	        if (!this.virtualDomDefine) {
	            return;
	        }
	        var $ = util.get$();
	        var virtualDoms = this.virtualDomDefine(this.scope, this, templateHelper);
	        var virtualDom;
	        if (virtualDoms.length == 1) {
	            virtualDom = virtualDoms[0];
	        }
	        else {
	            virtualDom = new element_1.default('mc-vd', '0', {}, {}, virtualDoms);
	        }
	        if (!this.virtualDom) {
	            this.virtualDom = virtualDom;
	            this.refs = this.virtualDom.render();
	            this.$refs = $(this.refs);
	            this.mount();
	        }
	        else {
	            var patches = diff_1.default(this.virtualDom, virtualDom);
	            patch_1.patch(this.refs, patches);
	            this.virtualDom = virtualDom;
	        }
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
	            this.watchScope = new watch_1.default(this.scope, function () {
	                _this.renderQueue();
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
	    };
	    Component.prototype.bindEvents = function () {
	        var _this = this;
	        if (!this.$refs) {
	            return;
	        }
	        var $ = util.get$();
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
	    Component.prototype.set = function (attr, value, doneOrAsync, isPromeisCallback) {
	        var _this = this;
	        if (doneOrAsync === void 0) { doneOrAsync = null; }
	        if (isPromeisCallback === void 0) { isPromeisCallback = false; }
	        if (isPromeisCallback || !value || !isFunction(value.then)) {
	            var isChange = this.scope[attr] !== value;
	            if (isChange) {
	                this.scope[attr] = value;
	                this.emit('update:' + attr, value);
	            }
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
	    Component.prototype.get = function (attr, defaultVal) {
	        if (defaultVal === void 0) { defaultVal = null; }
	        if (this.scope.hasOwnProperty(attr)) {
	            return this.scope[attr];
	        }
	        return defaultVal;
	    };
	    Component.prototype.remove = function (attr, doneOrAsync) {
	        if (doneOrAsync === void 0) { doneOrAsync = null; }
	        if (this.scope.hasOwnProperty(attr)) {
	            delete this.scope[attr];
	            this.emit('removeScope', this.scope, attr);
	            this.emit('change:' + attr, null);
	        }
	        this.renderQueue(doneOrAsync);
	    };
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
	        scopeKeys.forEach(function (attr) {
	            if (scope[attr].then) {
	                promiseVals.push(scope[attr]);
	            }
	            else {
	                _this.set(attr, scope[attr]);
	            }
	        });
	        if (promiseVals.length === 0) {
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
	            scopeKeys.forEach(function (attr, ix) {
	                _this.set(attr, results[ix]);
	            });
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var patch = __webpack_require__(42);
	var listDiff = __webpack_require__(43);
	function dfsWalk(oldNode, newNode, index, patches) {
	    var currentPatch = [];
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
	        diffAndPatchStaticProps(oldNode, newNode);
	        var propsPatches = diffProps(oldNode, newNode);
	        if (propsPatches) {
	            currentPatch.push({
	                type: patch.PROPS,
	                props: propsPatches
	            });
	        }
	        if (!newNode.refs && oldNode.refs) {
	            newNode.cloneElement(oldNode);
	        }
	        if (!oldNode || !oldNode._noDiffChild || !newNode._noDiffChild) {
	            diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
	        }
	    }
	    else {
	        currentPatch.push({
	            type: patch.REPLACE,
	            node: newNode
	        });
	    }
	    if (currentPatch.length) {
	        patches[index] = currentPatch;
	    }
	}
	function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
	    var diffs = listDiff(oldChildren, newChildren, 'key');
	    newChildren = diffs.children;
	    if (diffs.moves.length) {
	        var reorderPatch = {
	            type: patch.REORDER,
	            moves: diffs.moves
	        };
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
	        dfsWalk(child, newChild, currentNodeIndex, patches);
	        leftNode = child;
	    });
	}
	function diffAndPatchStaticProps(oldNode, newNode) {
	    var oldProps = oldNode.props;
	    var newProps = newNode.props;
	    var node = oldNode.refs;
	    var propsPatches = {};
	    if (!node) {
	        console.log(oldNode._element);
	        throw new Error('node not inexistence');
	    }
	    Object.keys(oldProps).forEach(function (attr) {
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
	    Object.keys(newProps).forEach(function (attr) {
	        if (propsPatches.hasOwnProperty(attr) === false) {
	            node.setAttribute(attr, newProps[attr]);
	        }
	    });
	    if (oldNode._binder) {
	        for (var i = node.attributes.length - 1; i >= 0; i--) {
	            var attr = String(node.attributes[i].name);
	            if (newProps.hasOwnProperty(attr) === false) {
	                node.removeAttribute(attr);
	            }
	        }
	    }
	}
	function diffProps(oldNode, newNode) {
	    var count = 0;
	    var oldProps = oldNode.dynamicProps;
	    var newProps = newNode.dynamicProps;
	    var propsPatches = {};
	    Object.keys(oldProps).forEach(function (attr) {
	        var value = oldProps[attr];
	        if (newProps[attr] !== value) {
	            count++;
	            propsPatches[attr] = newProps[attr];
	        }
	    });
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
	    dfsWalk(oldTree, newTree, index, patches);
	    return patches;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = diff;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var util_1 = __webpack_require__(32);
	var REPLACE = 0;
	exports.REPLACE = REPLACE;
	var REORDER = 1;
	exports.REORDER = REORDER;
	var PROPS = 2;
	exports.PROPS = PROPS;
	var TEXT = 3;
	exports.TEXT = TEXT;
	function dfsWalk(node, walker, patches) {
	    if (patches === void 0) { patches = {}; }
	    var currentPatches = patches[walker.index];
	    var len;
	    if ((!node.childNodes) || (node._element && node._element._noDiffChild)) {
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
	            case REPLACE:
	                var newNode = void 0;
	                if (currentPatch.node.render) {
	                    newNode = currentPatch.node.render();
	                }
	                else if (typeof currentPatch.node == 'string') {
	                    newNode = document.createTextNode(currentPatch.node);
	                }
	                if (newNode) {
	                    var element = node._element;
	                    if (node.parentNode) {
	                        node.parentNode.replaceChild(newNode, node);
	                    }
	                    if (element && element.destroy) {
	                        element.destroy();
	                    }
	                }
	                break;
	            case REORDER:
	                reorderChildren(node, currentPatch.moves);
	                break;
	            case PROPS:
	                if (node._element) {
	                    var propkeys = Object.keys(currentPatch.props);
	                    for (var _a = 0, propkeys_1 = propkeys; _a < propkeys_1.length; _a++) {
	                        var attr = propkeys_1[_a];
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
	            case TEXT:
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(44).diff


/***/ },
/* 44 */
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(46);
	__webpack_require__(47);
	var util_1 = __webpack_require__(32);
	var Watch = (function () {
	    function Watch(scope, callback) {
	        if (scope === void 0) { scope = {}; }
	        if (callback === void 0) { callback = function (path) { }; }
	        var nextTickTime = null;
	        this.scope = scope;
	        this.callback = function (path) {
	            if (nextTickTime) {
	                util_1.NextTick.clear(nextTickTime);
	            }
	            nextTickTime = util_1.NextTick.next(function () {
	                callback(path);
	            });
	        };
	        this._watchReg = {};
	        this._watchTotal = 0;
	        this.watch(this.scope);
	    }
	    Watch.prototype.observer = function (changes, x, path) {
	        var _this = this;
	        changes.forEach(function (change) {
	            var curPath = path + '.' + change.name;
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
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Watch;


/***/ },
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var pathToRegexp = __webpack_require__(49);
	var util_1 = __webpack_require__(32);
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isarray = __webpack_require__(50)
	
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
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
	
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
	
	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }
	
	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
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
/* 50 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var component_1 = __webpack_require__(40);
	var _$iframe = null;
	var View = (function (_super) {
	    __extends(View, _super);
	    function View($el, app) {
	        _super.call(this, $el[0], {}, { app: app });
	        this.$el = $el;
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var route_1 = __webpack_require__(48);
	var eventEmitter_1 = __webpack_require__(36);
	var util_1 = __webpack_require__(32);
	var App = (function (_super) {
	    __extends(App, _super);
	    function App($el, options) {
	        if (options === void 0) { options = {}; }
	        var $ = util_1.get$();
	        _super.call(this);
	        this.$el = $el;
	        this.options = $.extend({
	            viewClass: 'mcore-app-view',
	            routeChange: route_1.Route.changeByLocationHash
	        }, options);
	        this.router = new route_1.Route(this.options.routeChange);
	        this.curView = null;
	        this._middlewares = [];
	        this._viewUrlMap = {};
	        this._changeViewEvent = {
	            before: function (oldView, done, app) {
	                done();
	            },
	            after: function (newView, done, app) {
	                done();
	            }
	        };
	    }
	    App.prototype.route = function (path, View) {
	        var _this = this;
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
	    App.prototype.use = function (middleware) {
	        this._middlewares.push(middleware);
	        return this;
	    };
	    App.prototype._runView = function (done, err) {
	        this.curView.instantiate.route = this.env.route;
	        this.curView.instantiate.context = this.env.context;
	        this.curView.instantiate.run.apply(this.curView.instantiate, this.env.args);
	        this.emit('runView', this.curView);
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var util_1 = __webpack_require__(32);
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
	    if (!hideError) {
	        if (window.alert) {
	            window.alert(msg);
	        }
	    }
	    else {
	        console.log(msg);
	    }
	};
	var _errCallback = function (res, hideError, xhr) {
	    if (res === void 0) { res = {}; }
	    if (hideError === void 0) { hideError = false; }
	    var msg = res.error || res.msg || 'An unknown error occurred';
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
	    responseFormat: function (res) {
	        return res;
	    },
	    regErrCallback: function (type, fun) {
	        if (type === 'network') {
	            _networkErrCallback = fun;
	        }
	        else {
	            _errCallback = fun;
	        }
	    },
	    buildHeaders: function () {
	        return {};
	    },
	    isSuccess: function (res) { return Number(res.code) === 1; },
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var util_1 = __webpack_require__(32);
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
//# sourceMappingURL=mcore3.ie8.js.map