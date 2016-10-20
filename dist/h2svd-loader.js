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

	/// <reference path="../../definition/loader-utils.d.ts" />
	/**
	 *
	 * webpack loader
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var index_1 = __webpack_require__(1);
	var loaderUtils = __webpack_require__(13);
	function loader(html) {
	    var callback, query, code, js;
	    query = loaderUtils.parseQuery(this.query);
	    if (this.cacheable) {
	        this.cacheable();
	    }
	    callback = this.async();
	    code = index_1.default(html, query);
	    js = "module.exports = " + code;
	    callback(null, js);
	}
	module.exports = loader;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../definition/htmlparser2.d.ts" />
	/**
	 * html to mcore dom
	 * @author vfasky<vfasky@gmail.com>
	 *
	 **/
	'use strict';
	var htmlparser = __webpack_require__(2);
	var js_beautify_1 = __webpack_require__(3);
	var filter_1 = __webpack_require__(4);
	var parseDomDef_1 = __webpack_require__(5);
	var config_1 = __webpack_require__(8);
	function default_1(html, options) {
	    if (options === void 0) { options = {}; }
	    var domTree = filter_1.default(htmlparser.parseDOM(html, {
	        decodeEntities: true
	    }));
	    var forCode = '';
	    domTree.forEach(function (domAttr, k) {
	        forCode += "\n            (" + parseDomDef_1.default(domAttr) + ")(" + config_1.variable.scopeName + ", " + config_1.variable.treeName + ", '" + k + "');\n        ";
	    });
	    var code = "function (" + config_1.variable.scopeName + ", " + config_1.variable.viewName + ", " + config_1.variable.mcoreName + ") { // index\n            var " + config_1.variable.utilName + " = {\n                clone: " + config_1.variable.mcoreName + ".util.clone,\n                build: function(tagName, key, attr, dynamicAttr, events, children){\n                    return new " + config_1.variable.mcoreName + ".Element(tagName, key, attr, dynamicAttr, children, events, " + config_1.variable.viewName + ")\n                },\n                parseDynamicVal: function(dynamicCode, dynamicCodeStr){\n                    return " + config_1.variable.mcoreName + ".util.parseDynamicVal(dynamicCode, dynamicCodeStr, " + config_1.variable.viewName + ")\n                },\n                callFormatter: function(formatterName){\n                    return " + config_1.variable.mcoreName + ".util.callFormatter(formatterName, " + config_1.variable.mcoreName + ")\n                }\n            }\n            var " + config_1.variable.treeName + " = [];\n            \n            " + forCode + "\n\n            return " + config_1.variable.treeName + "\n        }\n    ";
	    code = js_beautify_1.js(code, {
	        indent_size: 4
	    });
	    // console.log(code);
	    return code;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


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
	 * 过滤掉不需要的 dom
	 * @author vfasky<vfasky@gmail.com>
	 *
	 **/
	'use strict';
	function default_1(domTree) {
	    if (domTree === void 0) { domTree = []; }
	    return domTree.filter(function (dom) {
	        if (dom.type === 'comment')
	            return false;
	        if (dom.type === 'text' && dom.data.trim().length === 0)
	            return false;
	        return true;
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 解释 htmlParserDom , 并生成 mcore dom
	 * @author vfasky<vfasky@gmail.com>
	 *
	 **/
	'use strict';
	var parseFor_1 = __webpack_require__(6);
	var parseText_1 = __webpack_require__(12);
	var config_1 = __webpack_require__(8);
	/**
	 * 解释并生成 virtual-dom 定义
	 * @return Array
	 */
	function default_1(domAttr) {
	    // if(domAttr.type === 'text'){
	    //     return parseText(domAttr);
	    // }
	    var code = "function (" + config_1.variable.scopeName + ", " + config_1.variable.treeName + ", " + config_1.variable.pathName + ") { \n        // parseDomDef\n        " + (domAttr.type === 'text' ? parseText_1.default(domAttr) : parseFor_1.default(domAttr)) + "\n    }";
	    return code;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释 for 标签
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var build_1 = __webpack_require__(7);
	var parseAttr_1 = __webpack_require__(9);
	var parseIf_1 = __webpack_require__(11);
	var config_1 = __webpack_require__(8);
	function buildArray(domAttr, iName, vName) {
	    var code = "\n        // buildArray\n        " + config_1.variable.forArrayName + ".forEach(function(" + vName + ", " + iName + "){\n            " + parseIf_1.begin(domAttr) + "\n                var " + config_1.variable.childrenName + "\n                " + parseAttr_1.default(domAttr) + "\n                " + build_1.default(domAttr, config_1.variable.pathName + ' + \'.\' + (' + config_1.variable.treeName + '.length)') + "\n            " + parseIf_1.end(domAttr) + "\n        })\n    ";
	    return code;
	}
	function buildObject(domAttr, kName, vName, oName) {
	    var code = "\n        // buildObject\n        " + config_1.variable.forObjKeysName + ".forEach(function(" + kName + "){\n            var " + vName + " = " + oName + "[" + kName + "]\n            " + parseIf_1.begin(domAttr) + "\n                var " + config_1.variable.childrenName + "\n                " + parseAttr_1.default(domAttr) + "\n                " + build_1.default(domAttr, config_1.variable.pathName + ' + \'.\' + (' + config_1.variable.treeName + '.length)') + "\n            " + parseIf_1.end(domAttr) + "\n        });\n    ";
	    return code;
	}
	function default_1(domAttr) {
	    var code = "\n        // parseFor\n    ";
	    if (!domAttr.attribs['mc-for']) {
	        code = "\n            // ![mc-for]\n            var " + config_1.variable.forArrayName + " = [0]\n            " + buildArray(domAttr, config_1.variable.forIName, config_1.variable.forVName) + "\n\n        ";
	    }
	    else {
	        var forCode = domAttr.attribs['mc-for'];
	        if (forCode.indexOf(' in ') !== -1) {
	            var iName = forCode.split(' in ').shift().indexOf(',') !== -1 ? forCode.split(',').pop().split(' in')[0].trim() : config_1.variable.forIxName;
	            var vName = forCode.split(' ')[0].replace(',', '');
	            code += "\n                /* [for-in] " + domAttr.attribs['mc-for'] + " */\n                var " + config_1.variable.forArrayName + " = " + forCode.split(' in ').pop() + "\n                if(false == Array.isArray(" + config_1.variable.forArrayName + ")){\n                    " + config_1.variable.forArrayName + " = []\n                }\n                " + buildArray(domAttr, iName, vName) + "\n            ";
	        }
	        else if (forCode.indexOf(' of ') !== -1) {
	            var kName = forCode.split(' of ')[0];
	            var oName = forCode.split(' of ').pop();
	            var vName = config_1.variable.forVName;
	            if (kName.indexOf(',') !== -1) {
	                vName = kName.split(',').pop();
	                kName = kName.split(',')[0];
	            }
	            code += "\n                /* [for-of] " + domAttr.attribs['mc-for'] + " */\n                var " + config_1.variable.forObjKeysName + " = Object.keys(" + oName + " || {})\n                " + buildObject(domAttr, kName, vName, oName) + "\n            ";
	        }
	    }
	    return code;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 生成 dom 定义
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var parseDomDef_1 = __webpack_require__(5);
	var filter_1 = __webpack_require__(4);
	var config_1 = __webpack_require__(8);
	function default_1(domAttr, key) {
	    var forCode = "\n        var " + config_1.variable.pathSubIName + " = String(" + key + ");\n    ";
	    if (Array.isArray(domAttr.children)) {
	        var childrens = filter_1.default(domAttr.children);
	        childrens.forEach(function (attr, k) {
	            forCode += "\n                (" + parseDomDef_1.default(attr) + ")(" + config_1.variable.scopeName + ", " + config_1.variable.childrenName + ", " + config_1.variable.pathSubIName + ");\n            ";
	        });
	    }
	    var code = "\n        // build\n        " + config_1.variable.childrenName + " = []\n        " + forCode + "\n        " + config_1.variable.treeName + ".push(\n            " + config_1.variable.utilName + ".build(\n                '" + domAttr.name + "', " + config_1.variable.pathSubIName + ", " + config_1.variable.attrName + ",\n                " + config_1.variable.dynamicAttrName + ", " + config_1.variable.eventName + ", " + config_1.variable.childrenName + "\n            )\n        )\n    ";
	    return code;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * 生成变量配置
	 * @author vfasky<vfasky@gmail.com>
	 *
	 **/
	'use strict';
	exports.variable = {
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
	    pathStaticIName: '__mc__pathStaticI',
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释 属性
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var parseFormatters_1 = __webpack_require__(10);
	var config_1 = __webpack_require__(8);
	var FUN_REG = /(^[a-zA-Z0-9_-]+)\(([^]+)\)$/;
	var VAR_REG = /(^[a-zA-Z0-9_-]+)$/;
	/**
	 * 解释动态属性
	 * @param name 属性名
	 * @param dynamicVal runtime script
	 * @param dynamicAttrName 动态属性变量名称
	 */
	function parseDynamicAttr(name, dynamicVal, dynamicAttrName) {
	    name = name.replace('mc-', '');
	    if (!dynamicVal) {
	        dynamicVal = "''";
	    }
	    if (dynamicVal.indexOf(' | ') !== -1) {
	        return parseFormatters_1.parseFormatters(name, dynamicVal, dynamicAttrName);
	    }
	    if (VAR_REG.test(dynamicVal)) {
	        return "\n            if(typeof (" + dynamicVal + ") == 'undefined'){\n                " + dynamicAttrName + "['" + name + "'] = " + config_1.variable.utilName + ".parseDynamicVal('" + dynamicVal + "', '" + dynamicVal + "')\n            }\n            else{\n                " + dynamicAttrName + "['" + name + "'] = " + config_1.variable.utilName + ".parseDynamicVal(" + dynamicVal + ", '" + dynamicVal + "')\n            }\n        ";
	    }
	    else {
	        return "\n            " + dynamicAttrName + "['" + name + "'] = " + config_1.variable.utilName + ".parseDynamicVal((" + dynamicVal + "), '" + dynamicVal.replace(/'/g, "\\'") + "')\n        ";
	    }
	}
	function parseAttr(domAttr) {
	    var attrKeys = Object.keys(domAttr.attribs);
	    var igKeys = ['mc-for', 'mc-if', 'mc-unless'];
	    var code = "\n        // parseAttr\n        var " + config_1.variable.attrName + " = {}, " + config_1.variable.dynamicAttrName + " = {}, " + config_1.variable.eventName + " = {}\n    ";
	    attrKeys.forEach(function (v) {
	        if (igKeys.indexOf(v) !== -1) {
	            return false;
	        }
	        // 解释事件
	        if (v.indexOf('mc-on-') === 0) {
	            var eventFunCode = String(domAttr.attribs[v]);
	            var funName = '';
	            var args = [];
	            if (FUN_REG.test(eventFunCode)) {
	                funName = eventFunCode.substr(0, eventFunCode.indexOf('('));
	                var strArgs = eventFunCode.substr(eventFunCode.indexOf('(') + 1);
	                args = strArgs.substr(0, strArgs.length - 1).split(',');
	            }
	            else {
	                funName = eventFunCode;
	            }
	            code += "\n                " + config_1.variable.eventName + "['" + v.replace('mc-on-', '') + "'] = {\n                    'funName': '" + funName + "',\n                    'args': [" + args.join(', ') + "]\n                };\n            ";
	            return false;
	        }
	        // 解释静态属性
	        if (v.indexOf('mc-') !== 0) {
	            code += "\n                " + config_1.variable.attrName + "['" + v + "'] = '" + domAttr.attribs[v] + "'\n            ";
	        }
	        else {
	            code += parseDynamicAttr(v, domAttr.attribs[v], config_1.variable.dynamicAttrName);
	        }
	    });
	    return code;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = parseAttr;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释过滤函数及动态变量
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var config_1 = __webpack_require__(8);
	var FORMATTERS_ARGS_REG = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
	/**
	 * 解释过滤函数及动态变量
	 * @param name 属性名
	 * @param dynamicVal runtime script
	 * @param dynamicAttrName 动态属性变量名称
	 */
	function parseFormatters(name, dynamicVal, dynamicAttrName) {
	    var funcs = dynamicVal.split(' | ');
	    var startVal = funcs.shift();
	    var formatterCode = '';
	    funcs.forEach(function (fun) {
	        var args = [];
	        fun = String(fun);
	        if (fun.indexOf('(') === -1) {
	            fun.replace(FORMATTERS_ARGS_REG, function (v) {
	                if (v === ']' && args.length > 2) {
	                    var _attr = args.pop();
	                    args[args.length - 1] = args[args.length - 1] + _attr + v;
	                }
	                else {
	                    args.push(v);
	                }
	                return '';
	            });
	        }
	        else {
	            fun.split(' ').forEach(function (v) {
	                var val = v.trim();
	                if (val.length > 0) {
	                    args.push(val.replace(/\\'/g, '__00__').replace(/\\"/g, '__01__'));
	                }
	            });
	            // 处理 xx xx
	            var mIx_1 = -1;
	            args.forEach(function (v, k) {
	                if (mIx_1 === -1 && v.indexOf("'") === 0 && v.slice(1).indexOf("'") === -1) {
	                    mIx_1 = k;
	                }
	                else if (mIx_1 !== -1 && v.indexOf("'") !== -1) {
	                    var strVal = [];
	                    for (var i = mIx_1; i < (k + 1); i++) {
	                        strVal.push(args[i]);
	                        args[i] = '';
	                    }
	                    args[mIx_1] = strVal.join(' ');
	                    mIx_1 = -1;
	                }
	            });
	            mIx_1 = -1;
	            args.forEach(function (v, k) {
	                if (mIx_1 === -1 && v.indexOf('"') === 0 && v.slice(1).indexOf('"') === -1) {
	                    mIx_1 = k;
	                }
	                else if (mIx_1 !== -1 && v.indexOf('"') !== -1) {
	                    var strVal = [];
	                    for (var i = mIx_1; i < (k + 1); i++) {
	                        strVal.push(args[i]);
	                        args[i] = '';
	                    }
	                    args[mIx_1] = strVal.join(' ');
	                    mIx_1 = -1;
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
	        }
	        var formatter = args[0];
	        args[0] = 'x';
	        formatterCode += "\n            x = " + config_1.variable.utilName + ".callFormatter('" + formatter + "')(" + args.join(',') + ");\n        ";
	    });
	    var code = " // parseFormatters\n        var " + config_1.variable.tmpAttrName + ";\n        try{\n            " + config_1.variable.tmpAttrName + " = " + startVal + "\n        } catch (err) {\n            console.error(err)\n        }\n\n        " + dynamicAttrName + "['" + name + "'] = (function(x){\n            " + formatterCode + "\n            return x == undefined ? '' : x\n        })(" + config_1.variable.tmpAttrName + ");\n    ";
	    return code;
	}
	exports.parseFormatters = parseFormatters;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 *
	 * 解释 if unless
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	function begin(domAttr) {
	    if (!domAttr.attribs['mc-if'] && !domAttr.attribs['mc-unless']) {
	        return '';
	    }
	    if (domAttr.attribs['mc-if']) {
	        return "\n            /* [mc-if] " + domAttr.attribs['mc-if'] + " */\n            if(" + domAttr.attribs['mc-if'] + "){\n        ";
	    }
	    else {
	        return "\n            /* [mc-unless] " + domAttr.attribs['mc-unless'] + " */\n            if(!(" + domAttr.attribs['mc-unless'] + ")){\n        ";
	    }
	}
	exports.begin = begin;
	function end(domAttr) {
	    if (!domAttr.attribs['mc-if'] && !domAttr.attribs['mc-unless']) {
	        return '';
	    }
	    else {
	        return '}';
	    }
	}
	exports.end = end;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * 解释文本
	 * @author vfasky <vfasky@gmail.com>
	 **/
	'use strict';
	var parseFormatters_1 = __webpack_require__(10);
	var config_1 = __webpack_require__(8);
	var SIGN_REG = /\{([^}]+)\}/g;
	var STREND_REG = /[^]+""$/;
	function parseText(domAttr) {
	    domAttr.data = domAttr.data.replace(/\n/g, ' ');
	    var text = domAttr.data;
	    var code = "\n        // parseText\n        var " + config_1.variable.pathStaticIName + " = " + config_1.variable.pathName + " + '.' + " + config_1.variable.treeName + ".length\n    ";
	    if (SIGN_REG.test(text)) {
	        code += "var " + config_1.variable.strValsName + " = {}";
	        var mapTree_1 = [];
	        var mapTreeId_1 = 0;
	        var runtimeCode = text.replace(/\s+/g, ' ').replace(SIGN_REG, function (key, val) {
	            var reKey = "rp_" + mapTreeId_1++;
	            mapTree_1.push({
	                key: reKey,
	                val: val
	            });
	            return "\" + " + config_1.variable.strValsName + "['" + reKey + "'] + \"";
	        });
	        runtimeCode = '"' + runtimeCode;
	        if (STREND_REG.test(runtimeCode) === false) {
	            runtimeCode += '"';
	        }
	        mapTree_1.forEach(function (v) {
	            code += parseFormatters_1.parseFormatters(v.key, v.val, config_1.variable.strValsName);
	        });
	        code += "\n            /* [formatter] " + text.trim() + " */\n            var " + config_1.variable.strName + " = " + runtimeCode + ";\n            var " + config_1.variable.dynamicAttrName + " = {text: " + config_1.variable.strName + "};\n            " + config_1.variable.treeName + ".push(" + config_1.variable.utilName + ".build(\n                '_textNode', " + config_1.variable.pathStaticIName + ", {},\n                " + config_1.variable.dynamicAttrName + ", {}, []\n            ));\n        ";
	    }
	    else {
	        code += "\n            var " + config_1.variable.attrName + " = {text: \"" + text.replace(/"/g, '\\"') + "\"}\n            " + config_1.variable.treeName + ".push(" + config_1.variable.utilName + ".build('_textNode', " + config_1.variable.pathStaticIName + ", " + config_1.variable.attrName + "))\n        ";
	    }
	    return code;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = parseText;


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("loader-utils");

/***/ }
/******/ ]);
//# sourceMappingURL=h2svd-loader.js.map