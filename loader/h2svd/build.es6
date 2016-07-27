/**
 *
 * 生成 dom 定义
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import paseDomDef from './parseDomDef.es6';
import filter from './filter';
import {variable} from './config';


export default (domAttr, key)=>{

    let forCode = '';

    if(Array.isArray(domAttr.children)){
        filter(domAttr.children).forEach((attr, k)=>{
            // console.log(attr);
            forCode += `(${paseDomDef(attr)})(${variable.scopeName}, ${variable.childrenName}, ${key} + '.${k}');`;
        });
    }

    let code = `
        ${variable.childrenName} = [];
        ${forCode}
        ${variable.treeName}.push(
            ${variable.utilName}.build(
                '${domAttr.name}', ${key}, ${variable.attrName},
                ${variable.dynamicAttrName}, ${variable.eventName}, ${variable.childrenName}
            )
        );
    `;

    return code;

};
