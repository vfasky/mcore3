/**
 *
 * 解释 属性
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

export default (domAttr, attrName = '__mc__attr', ctxName = '__mc__ctx', utilName = '__mc__util')=>{
    let attrKeys = Object.keys(domAttr.attribs);
    let code = `
        ${ctxName}.isFor = ${attrKeys.indexOf('mc-for') == -1 ? 'false' : 'true'};
        ${ctxName}.isIf = ${attrKeys.indexOf('mc-if') == -1 ? 'false' : 'true'};
        ${ctxName}.isUnless = ${attrKeys.indexOf('mc-unless') == -1 ? 'false' : 'true'};
        ${ctxName}.events = {};
    `;
    let igKeys = ['mc-for', 'mc-if', 'mc-unless'];
    attrKeys.forEach((v)=>{
        if(igKeys.indexOf(v) != -1){
            return false;
        }
        if(v.indexOf('mc-on-') === 0){
            code += `
                ${ctxName}.events[${v.replace('mc-on-', '')}] = '${domAttr.attribs[v]}';
            `;
            return false;
        }
        code += `
            ${attrName}['${v}'] = '${domAttr.attribs[v]}';
        `;
    });


    return code;
};
