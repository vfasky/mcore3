/**
 *
 * 生成 dom 定义
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import paseDomDef from './parseDomDef.es6';
import filter from './filter';

export default (domAttr, key, treeName = '__mc__tree', childrenName = '__mc__children',
                attrName = '__mc__attr', dynamicAttrName = '__mc__dynamicAttr', eventName = '__mc__event',
                utilName = '__mc__util')=>{

    let forCode = '';

    if(Array.isArray(domAttr.children)){
        filter(domAttr.children).forEach((attr, k)=>{
            // console.log(attr);
            forCode += `(${paseDomDef(attr)})(__mc__scope, ${childrenName}, ${utilName}, ${key} + '.${k}', {});`;
        });
    }

    let code = `
        ${childrenName} = [];
        ${forCode}
        ${treeName}.push(${utilName}.build('${domAttr.name}', ${key}, ${attrName}, ${dynamicAttrName}, ${eventName}, ${childrenName}));
    `;

    return code;

};
