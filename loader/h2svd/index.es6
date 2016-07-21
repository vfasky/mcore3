/**
 *
 * 将 html 解释成 virtual-dom 的定义
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import htmlparser from 'htmlparser2';
import {js_beautify as beautify} from 'js-beautify';
import filter from './filter';
import paseDomDef from './parseDomDef';

export default (html, options = {})=>{
    if(!options.moduleName){
        options.moduleName = 'mcore3';
    }
    let domTree = filter(htmlparser.parseDOM(html,{
        decodeEntities: true
    }));

    let forCode = '';

    domTree.forEach((domAttr, k)=>{
        //console.log(domAttr);
        forCode += '(' + paseDomDef(domAttr) +')(__mc__scope, __mc__tree, __mc__util, \'0.'+ k +'\');\n';
    });

    let code = `
        var __mc__mcore = require('${options.moduleName}');
        (function(__mc__scope, __mc__view){
            var __mc__util = {
                clone: __mc__mcore.util.clone,
                build: function(tagName, key, attr, dynamicAttr, events, ctx, children){

                },
                parseDynamicVal: function(dynamicCode, dynamicCodeStr){
                    if(typeof dynamicCode !== 'undefined' && (false === dynamicCode instanceof window.Element)){
                        return dynamicCode;
                    }
                    else if(typeof __mc__view[dynamicCode] !== 'undefined'){
                        return __mc__view[dynamicCode];
                    }
                    else{
                        return dynamicCodeStr == 'undefined' ? '' : dynamicCodeStr;
                    }
                },
                callFormatter: function(formatterName){
                    if(__mc__mcore.Template.formatters.hasOwnProperty(formatterName)){
                        return __mc__mcore.Template.formatters[formatterName];
                    };
                    return function(){};
                },
            };
            var __mc__tree = [];
            ${forCode}
        })(scope, view);
    `;

    code = beautify(code,{
        indent_size: 4
    });
    console.log(code);
};
