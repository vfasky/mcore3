module.exports =
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
	 * webpack loader
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	var _index = __webpack_require__(1);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var loaderUtils = __webpack_require__(14);
	
	module.exports = function (html) {
	    var callback = void 0,
	        query = void 0,
	        code = void 0,
	        js = void 0;
	    query = loaderUtils.parseQuery(this.query);
	    if (this.cacheable) {
	        this.cacheable();
	    }
	    callback = this.async();
	    code = (0, _index2.default)(html, query);
	    js = 'module.exports = ' + code;
	    callback(null, js);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 将 html 解释成 virtual-dom 的定义
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _htmlparser = __webpack_require__(2);
	
	var _htmlparser2 = _interopRequireDefault(_htmlparser);
	
	var _jsBeautify = __webpack_require__(3);
	
	var _filter = __webpack_require__(4);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _parseDomDef = __webpack_require__(5);
	
	var _parseDomDef2 = _interopRequireDefault(_parseDomDef);
	
	var _config = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (html) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    if (!options.moduleName) {
	        options.moduleName = 'mcore3';
	    }
	    var domTree = (0, _filter2.default)(_htmlparser2.default.parseDOM(html, {
	        decodeEntities: true
	    }));
	
	    var forCode = '';
	
	    domTree.forEach(function (domAttr, k) {
	        forCode += '\n            (' + (0, _parseDomDef2.default)(domAttr) + ')(' + _config.variable.scopeName + ', ' + _config.variable.treeName + ', \'' + k + '\');\n        ';
	    });
	
	    var code = 'function(' + _config.variable.scopeName + ', ' + _config.variable.viewName + ', ' + _config.variable.mcoreName + '){\n            var ' + _config.variable.utilName + ' = {\n                clone: ' + _config.variable.mcoreName + '.util.clone,\n                build: function(tagName, key, attr, dynamicAttr, events, children){\n                    return new ' + _config.variable.mcoreName + '.Element(tagName, key, attr, dynamicAttr, children, events, ' + _config.variable.viewName + ');\n                },\n                parseDynamicVal: function(dynamicCode, dynamicCodeStr){\n                    return ' + _config.variable.mcoreName + '.util.parseDynamicVal(dynamicCode, dynamicCodeStr, ' + _config.variable.viewName + ');\n                },\n                callFormatter: function(formatterName){\n                    return ' + _config.variable.mcoreName + '.util.callFormatter(formatterName, ' + _config.variable.mcoreName + ');\n                },\n            };\n            var ' + _config.variable.treeName + ' = [];\n            ' + forCode + '\n            return ' + _config.variable.treeName + ';\n        };\n    ';
	
	    code = (0, _jsBeautify.js_beautify)(code, {
	        indent_size: 4
	    });
	    //console.log(code);
	    return code;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("htmlparser2");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("js-beautify");

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 *
	 * 过滤掉不需要的 dom
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var domTree = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    return domTree.filter(function (dom) {
	        if (dom.type == 'comment') {
	            return false;
	        } else if (dom.type == 'text' && dom.data.trim().length === 0) {
	            return false;
	        }
	        return true;
	    });
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释 dom, 并生成 virtual-dom 定义
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _filter = __webpack_require__(4);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _parseFor = __webpack_require__(6);
	
	var _parseFor2 = _interopRequireDefault(_parseFor);
	
	var _parseText = __webpack_require__(13);
	
	var _parseText2 = _interopRequireDefault(_parseText);
	
	var _config = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * 解释并生成 virtual-dom 定义
	 * @return Array
	 */
	
	exports.default = function (domAttr) {
	  // if(domAttr.type === 'text'){
	  //     return parseText(domAttr);
	  // }
	  var code = 'function(' + _config.variable.scopeName + ', ' + _config.variable.treeName + ', ' + _config.variable.pathName + '){\n        ' + (domAttr.type === 'text' ? (0, _parseText2.default)(domAttr) : (0, _parseFor2.default)(domAttr)) + '\n    }';
	
	  return code;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释 for 标签
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _build = __webpack_require__(7);
	
	var _build2 = _interopRequireDefault(_build);
	
	var _util = __webpack_require__(9);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _parseAttr = __webpack_require__(10);
	
	var _parseAttr2 = _interopRequireDefault(_parseAttr);
	
	var _parseIf = __webpack_require__(12);
	
	var _config = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var buildArray = function buildArray(domAttr, iName, vName) {
	    var code = '\n\n        ' + _config.variable.forArrayName + '.forEach(function(' + vName + ', ' + iName + '){\n            ' + (0, _parseIf.begin)(domAttr) + '\n                var ' + _config.variable.childrenName + ';\n                ' + (0, _parseAttr2.default)(domAttr) + '\n                ' + (0, _build2.default)(domAttr, _config.variable.pathName + ' + \'.\' + (' + _config.variable.treeName + '.length)') + '\n            ' + (0, _parseIf.end)(domAttr) + '\n        });\n    ';
	    return code;
	};
	
	var buildObject = function buildObject(domAttr, kName, vName, oName) {
	    var code = '\n\n        ' + _config.variable.forObjKeysName + '.forEach(function(' + kName + ', ' + _config.variable.forIName + '){\n            var ' + vName + ' = ' + oName + '[' + kName + '];\n            ' + (0, _parseIf.begin)(domAttr) + '\n                var ' + _config.variable.childrenName + ';\n                ' + (0, _parseAttr2.default)(domAttr) + '\n                ' + (0, _build2.default)(domAttr, _config.variable.pathName + ' + \'.\' + ' + _config.variable.pathIName) + '\n            ' + (0, _parseIf.end)(domAttr) + '\n        });\n    ';
	    return code;
	};
	
	exports.default = function (domAttr) {
	    var code = '';
	
	    if (!domAttr.attribs['mc-for']) {
	        code = '\n            var ' + _config.variable.forArrayName + ' = [0];\n            ' + buildArray(domAttr, _config.variable.forIName, _config.variable.forVName, _config.variable.pathStaticIName) + '\n\n        ';
	    } else {
	        var forCode = domAttr.attribs['mc-for'];
	
	        if (forCode.indexOf(' in ') !== -1) {
	            var iName = forCode.split(' in ').shift().indexOf(',') !== -1 ? forCode.split(',').pop().split(' in')[0].trim() : _config.variable.forIxName;
	            var vName = forCode.split(' ')[0].replace(',', '');
	            code += '\n                /* [for-in] ' + domAttr.attribs['mc-for'] + ' */\n                var ' + _config.variable.forArrayName + ' = ' + forCode.split(' in ').pop() + ';\n                if(false == Array.isArray(' + _config.variable.forArrayName + ')){\n                    ' + _config.variable.forArrayName + ' = [];\n                }\n                ' + buildArray(domAttr, iName, vName) + '\n            ';
	        } else if (forCode.indexOf(' of ') !== -1) {
	            var kName = forCode.split(' of ')[0];
	            var oName = forCode.split(' of ').pop();
	            var _vName = _config.variable.forVName;
	            if (kName.indexOf(',') !== -1) {
	                _vName = kName.split(',').pop();
	                kName = kName.split(',')[0];
	            }
	            code += '\n                /* [for-of] ' + domAttr.attribs['mc-for'] + ' */\n                var ' + _config.variable.forObjKeysName + ' = Object.keys(' + oName + ' || {});\n                ' + buildObject(domAttr, kName, _vName, oName) + '\n            ';
	        }
	    }
	
	    return code;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 生成 dom 定义
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _parseDomDef = __webpack_require__(5);
	
	var _parseDomDef2 = _interopRequireDefault(_parseDomDef);
	
	var _filter = __webpack_require__(4);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _config = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (domAttr, key) {
	
	    var forCode = '\n\n        var ' + _config.variable.pathSubIName + ' = String(' + key + ');\n        var ' + _config.variable.textNodeTotal + ' = 0;\n    ';
	
	    if (Array.isArray(domAttr.children)) {
	        var childrens = (0, _filter2.default)(domAttr.children);
	        var len = childrens.length;
	
	        childrens.forEach(function (attr, k) {
	            forCode += '\n                (' + (0, _parseDomDef2.default)(attr) + ')(' + _config.variable.scopeName + ', ' + _config.variable.childrenName + ', ' + _config.variable.pathSubIName + ');\n            ';
	        });
	    }
	
	    var code = '\n\n        ' + _config.variable.childrenName + ' = [];\n\n\n        ' + forCode + '\n        ' + _config.variable.treeName + '.push(\n            ' + _config.variable.utilName + '.build(\n                \'' + domAttr.name + '\', ' + _config.variable.pathSubIName + ', ' + _config.variable.attrName + ',\n                ' + _config.variable.dynamicAttrName + ', ' + _config.variable.eventName + ', ' + _config.variable.childrenName + '\n            )\n        );\n    ';
	
	    return code;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 *
	 * 生成变量配置
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var variable = exports.variable = {
	    scopeName: 'scope',
	    treeName: '__mc__tree',
	    childrenName: '__mc__children',
	    attrName: '__mc__attr',
	    tmpAttrName: '__mc__tmpAttr',
	    dynamicAttrName: '__mc__dynamicAttr',
	    eventName: '__mc__event',
	    utilName: '__mc__util',
	    pathName: '__mc_path',
	    forArrayName: '__mc__forArr',
	    forIName: '__mc__i',
	    forIxName: '__mc__$ix_',
	    forVName: '__mc__$vn_',
	    forObjKeysName: '__mc__objKeys',
	    strValsName: '__mc__strVal',
	    strName: '__mc__str',
	    mcoreName: '__mc__mcore',
	    viewName: '__mc__view',
	    pathIName: '__mc__pathI',
	    pathSubIName: '__mc__pathSubI',
	    pathSubArr: '__mc__pathSubArr',
	    pathStaticIName: '__mc__pathStaticI'
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释 属性
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _parseFormatters = __webpack_require__(11);
	
	var _parseFormatters2 = _interopRequireDefault(_parseFormatters);
	
	var _config = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _funReg = /(^[a-zA-Z0-9_-]+)\(([^]+)\)$/;
	var _varReg = /(^[a-zA-Z0-9_-]+)$/;
	/**
	 * 解释动态属性
	 */
	var parseDynamicAttr = function parseDynamicAttr(name, dynamicVal, dynamicAttrName) {
	    name = name.replace('mc-', '');
	    if (!dynamicVal) {
	        dynamicVal = "''";
	    }
	    if (dynamicVal.indexOf(' | ') !== -1) {
	        return (0, _parseFormatters2.default)(name, dynamicVal, dynamicAttrName, _config.variable.utilName);
	    }
	    if (_varReg.test(dynamicVal)) {
	        return '\n            if(typeof (' + dynamicVal + ') == \'undefined\'){\n                ' + dynamicAttrName + '[\'' + name + '\'] = ' + _config.variable.utilName + '.parseDynamicVal(\'' + dynamicVal + '\', \'' + dynamicVal + '\');\n            }\n            else{\n                ' + dynamicAttrName + '[\'' + name + '\'] = ' + _config.variable.utilName + '.parseDynamicVal(' + dynamicVal + ', \'' + dynamicVal + '\');\n            }\n        ';
	    } else {
	        return '\n            ' + dynamicAttrName + '[\'' + name + '\'] = ' + _config.variable.utilName + '.parseDynamicVal((' + dynamicVal + '), \'' + dynamicVal.replace(/'/g, "\\'") + '\');\n        ';
	    }
	};
	
	exports.default = function (domAttr) {
	    var attrKeys = Object.keys(domAttr.attribs);
	
	    var igKeys = ['mc-for', 'mc-if', 'mc-unless'];
	
	    var code = '\n        var ' + _config.variable.attrName + ' = {}, ' + _config.variable.dynamicAttrName + ' = {}, ' + _config.variable.eventName + ' = {};\n        \n    ';
	
	    attrKeys.forEach(function (v) {
	        if (igKeys.indexOf(v) != -1) {
	            return false;
	        }
	        //解释事件
	        if (v.indexOf('mc-on-') === 0) {
	            var eventFunCode = domAttr.attribs[v];
	            var funName = void 0,
	                args = [];
	            if (_funReg.test(eventFunCode)) {
	                funName = eventFunCode.substr(0, eventFunCode.indexOf('('));
	                args = eventFunCode.substr(eventFunCode.indexOf('(') + 1);
	                args = args.substr(0, args.length - 1).split(',');
	            } else {
	                funName = eventFunCode;
	            }
	            code += '\n                ' + _config.variable.eventName + '[\'' + v.replace('mc-on-', '') + '\'] = {\n                    \'funName\': \'' + funName + '\',\n                    \'args\': [' + args.join(', ') + ']\n                };\n            ';
	            return false;
	        }
	        //解释静态属性
	        if (v.indexOf('mc-') !== 0) {
	            code += '\n                ' + _config.variable.attrName + '[\'' + v + '\'] = \'' + domAttr.attribs[v] + '\';\n            ';
	        } else {
	            code += parseDynamicAttr(v, domAttr.attribs[v], _config.variable.dynamicAttrName);
	        }
	    });
	
	    return code;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释过滤函数
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _config = __webpack_require__(8);
	
	var _formattersArgsReg = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
	
	exports.default = function (name, dynamicVal, dynamicAttrName) {
	    var funcs = dynamicVal.split(' | ');
	    var startVal = funcs.shift();
	
	    var formatterCode = '';
	
	    funcs.forEach(function (fun) {
	        var args = [];
	        var isHasTag = false;
	        fun = String(fun);
	
	        if (fun.indexOf('(') == -1) {
	            fun.replace(_formattersArgsReg, function (v) {
	                if (v === ']' && args.length > 2) {
	                    var _attr = args.pop();
	                    args[args.length - 1] = args[args.length - 1] + _attr + v;
	                } else {
	                    args.push(v);
	                }
	            });
	        } else {
	            (function () {
	                fun.split(' ').forEach(function (v) {
	                    var val = v.trim();
	                    if (val.length > 0) {
	                        args.push(val.replace(/\\'/g, '__00__').replace(/\\"/g, '__01__'));
	                    }
	                });
	                // 处理 xx xx
	                var mIx = -1;
	                args.forEach(function (v, k) {
	                    if (mIx == -1 && v.indexOf("'") === 0 && v.slice(1).indexOf("'") == -1) {
	                        mIx = k;
	                    } else if (mIx != -1 && v.indexOf("'") != -1) {
	                        var strVal = [];
	                        for (var i = mIx; i < k + 1; i++) {
	                            strVal.push(args[i]);
	                            args[i] = '';
	                        }
	                        args[mIx] = strVal.join(' ');
	                        mIx = -1;
	                    }
	                });
	
	                mIx = -1;
	                args.forEach(function (v, k) {
	                    if (mIx === -1 && v.indexOf('"') === 0 && v.slice(1).indexOf('"') === -1) {
	                        mIx = k;
	                    } else if (mIx !== -1 && v.indexOf('"') !== -1) {
	                        var strVal = [];
	                        for (var i = mIx; i < k + 1; i++) {
	                            strVal.push(args[i]);
	                            args[i] = '';
	                        }
	                        args[mIx] = strVal.join(' ');
	                        mIx = -1;
	                    }
	                });
	
	                args = args.filter(function (v) {
	                    return v.length > 0;
	                }).map(function (v) {
	                    v = v.replace(/__00__/g, "\\'").replace(/__01__/g, '\\"');
	                    if (v.slice(-1) === ',') {
	                        v = v.slice(0, v.length - 1);
	                    }
	                    return v;
	                });
	            })();
	        }
	
	        var formatter = args[0];
	        args[0] = 'x';
	
	        formatterCode += '\n            x = ' + _config.variable.utilName + '.callFormatter(\'' + formatter + '\')(' + args.join(',') + ');\n        ';
	    });
	
	    var code = '\n        var ' + _config.variable.tmpAttrName + ';\n        try{\n            ' + _config.variable.tmpAttrName + ' = ' + startVal + ';\n        }catch(err){}\n\n        ' + dynamicAttrName + '[\'' + name + '\'] = (function(x){\n            ' + formatterCode + '\n            return x === undefined ? \'\' : x;\n        })(' + _config.variable.tmpAttrName + ');\n    ';
	
	    return code;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 *
	 * 解释 if unless
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.begin = begin;
	exports.end = end;
	function begin(domAttr) {
	    if (!domAttr.attribs['mc-if'] && !domAttr.attribs['mc-unless']) {
	        return '';
	    }
	    if (domAttr.attribs['mc-if']) {
	        return '\n            /* [mc-if] ' + domAttr.attribs['mc-if'] + ' */\n            if(' + domAttr.attribs['mc-if'] + '){\n        ';
	    } else {
	        return '\n            /* [mc-unless] ' + domAttr.attribs['mc-unless'] + ' */\n            if(!(' + domAttr.attribs['mc-unless'] + ')){\n        ';
	    }
	}
	
	function end(domAttr) {
	    if (!domAttr.attribs['mc-if'] && !domAttr.attribs['mc-unless']) {
	        return '';
	    } else {
	        return '}';
	    }
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释文本
	 * @author vfasky <vfasky@gmail.com>
	 **/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _parseFormatters = __webpack_require__(11);
	
	var _parseFormatters2 = _interopRequireDefault(_parseFormatters);
	
	var _config = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _signReg = /\{([^}]+)\}/g;
	var _strEndReg = /[^]+""$/;
	
	exports.default = function (domAttr) {
	    domAttr.data = domAttr.data.replace(/\n/g, ' ');
	    var text = domAttr.data;
	    var code = '\n        var ' + _config.variable.pathStaticIName + ' = ' + _config.variable.pathName + ' + \'.\' + ' + _config.variable.treeName + '.length;\n    ';
	
	    if (_signReg.test(text)) {
	        (function () {
	            code += 'var ' + _config.variable.strValsName + ' = {}';
	            var mapTree = [];
	            var mapTreeId = 0;
	            var runtimeCode = text.replace(_signReg, function (key, val) {
	                var reKey = 'rp_' + mapTreeId++;
	                mapTree.push({
	                    key: reKey,
	                    val: val
	                });
	                return '" + ' + _config.variable.strValsName + '[\'' + reKey + '\'] + "';
	            });
	
	            runtimeCode = '"' + runtimeCode;
	            if (false === _strEndReg.test(runtimeCode)) {
	                runtimeCode += '"';
	            }
	
	            mapTree.forEach(function (v) {
	                code += (0, _parseFormatters2.default)(v.key, v.val, _config.variable.strValsName);
	            });
	
	            code += '\n            /* [formatter] ' + text.trim() + ' */\n            var ' + _config.variable.strName + ' = ' + runtimeCode + ';\n            var ' + _config.variable.dynamicAttrName + ' = {text: ' + _config.variable.strName + '};\n            ' + _config.variable.treeName + '.push(' + _config.variable.utilName + '.build(\n                \'_textNode\', ' + _config.variable.pathStaticIName + ', {},\n                ' + _config.variable.dynamicAttrName + ', {}, []\n            ));\n        ';
	        })();
	    } else {
	        // code += `
	        //     ${variable.treeName}.push('${text}');
	        // `;
	        code += '\n            var ' + _config.variable.attrName + ' = {text:\'' + text + '\'};\n            ' + _config.variable.treeName + '.push(' + _config.variable.utilName + '.build(\'_textNode\', ' + _config.variable.pathStaticIName + ', ' + _config.variable.attrName + '));\n        ';
	    }
	
	    return code;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("loader-utils");

/***/ }
/******/ ]);
//# sourceMappingURL=h2svd-loader.js.map