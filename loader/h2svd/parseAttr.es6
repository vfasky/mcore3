/**
 *
 * 解释 属性
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";
import util from 'util';
import parseFormatters from './parseFormatters';
import {variable} from './config';

let _funReg = /(^[a-zA-Z0-9_-]+)\(([^]+)\)$/;

/**
 * 解释动态属性
 */
let parseDynamicAttr = (name, dynamicVal, dynamicAttrName)=>{
    name = name.replace('mc-', '');
    if(!dynamicVal){
        dynamicVal = "''";
    }
    if(dynamicVal.indexOf(' | ') !== -1){
        return parseFormatters(name, dynamicVal, dynamicAttrName, variable.utilName);
    }
    let code = `
        ${dynamicAttrName}['${name}'] = ${variable.utilName}.parseDynamicVal((${dynamicVal}), '${dynamicVal.replace(/'/g, "\\'")}');
    `;
    return code;
};

export default (domAttr)=>{
    let attrKeys = Object.keys(domAttr.attribs);

    let igKeys = ['mc-for', 'mc-if', 'mc-unless'];

    let code = `var ${variable.attrName} = {}, ${variable.dynamicAttrName} = {}, ${variable.eventName} = {};`;

    attrKeys.forEach((v)=>{
        if(igKeys.indexOf(v) != -1){
            return false;
        }
        //解释事件
        if(v.indexOf('mc-on-') === 0){
            let eventFunCode = domAttr.attribs[v];
            let funName, args = [];
            if(_funReg.test(eventFunCode)){
                funName = eventFunCode.substr(0, eventFunCode.indexOf('('));
                args = eventFunCode.substr(eventFunCode.indexOf('(') + 1);
                args = args.substr(0, args.length - 1).split(',');
            }
            else {
                funName = eventFunCode;
            }
            code += `
                ${variable.eventName}['${v.replace('mc-on-', '')}'] = {
                    'funName': '${funName}',
                    'args': [${args.join(', ')}]
                };
            `;
            return false;
        }
        //解释静态属性
        if(v.indexOf('mc-') !== 0){
            code += `
                ${variable.attrName}['${v}'] = '${domAttr.attribs[v]}';
            `;
        }
        else {
            code += parseDynamicAttr(v, domAttr.attribs[v], variable.dynamicAttrName);
        }
    });


    return code;
};
