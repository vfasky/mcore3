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
import {variable} from './config';

export default (html, options = {})=>{
    if(!options.moduleName){
        options.moduleName = 'mcore3';
    }
    let domTree = filter(htmlparser.parseDOM(html,{
        decodeEntities: true
    }));

    let forCode = '';

    domTree.forEach((domAttr, k)=>{
        forCode += `(${paseDomDef(domAttr)})(${variable.scopeName}, ${variable.treeName}, '0.${k}');`;
    });

    let code = `
        return function(${variable.scopeName}, ${variable.viewName}, ${variable.mcoreName}){
            if(!${variable.mcoreName}){
                ${variable.mcoreName} = require('${options.moduleName}');
            }
            var ${variable.utilName} = {
                clone: ${variable.mcoreName}.util.clone,
                build: function(tagName, key, attr, dynamicAttr, events, children){

                },
                parseDynamicVal: function(dynamicCode, dynamicCodeStr){
                    if(typeof dynamicCode !== 'undefined' && (false === dynamicCode instanceof window.Element)){
                        return dynamicCode;
                    }
                    else if(typeof ${variable.viewName}[dynamicCode] !== 'undefined'){
                        return ${variable.viewName}[dynamicCode];
                    }
                    else{
                        return dynamicCodeStr == 'undefined' ? '' : dynamicCodeStr;
                    }
                },
                callFormatter: function(formatterName){
                    if(${variable.mcoreName}.Template.formatters.hasOwnProperty(formatterName)){
                        return ${variable.mcoreName}.Template.formatters[formatterName];
                    };
                    return function(){};
                },
            };
            var ${variable.treeName} = [];
            ${forCode}
            return ${variable.treeName};
        };
    `;

    code = beautify(code,{
        indent_size: 4
    });
    console.log(code);
    return code;
};
