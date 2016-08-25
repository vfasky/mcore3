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

    let forCode = `

        var ${variable.pathSubIName} = String(${key});
    `;

    if(Array.isArray(domAttr.children)){
        let childrens = filter(domAttr.children);
        let len = childrens.length;

        childrens.forEach((attr, k)=>{
            forCode += `
                (${paseDomDef(attr)})(${variable.scopeName}, ${variable.childrenName}, ${variable.pathSubIName});
            `;

        });
    }

    let code = `

        ${variable.childrenName} = [];

        
        ${forCode}
        ${variable.treeName}.push(
            ${variable.utilName}.build(
                '${domAttr.name}', ${variable.pathSubIName}, ${variable.attrName},
                ${variable.dynamicAttrName}, ${variable.eventName}, ${variable.childrenName}
            )
        );
    `;

    return code;

};
