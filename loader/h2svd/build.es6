/**
 *
 * 生成 dom 定义
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import paseDomDef from './parseDomDef.es6'
import filter from './filter'
import {variable} from './config'


export default (domAttr, key) => {
    let forCode = `

        var ${variable.pathSubIName} = String(${key});
        var ${variable.textNodeTotal} = 0;
    `

    if (Array.isArray(domAttr.children)) {
        let childrens = filter(domAttr.children)

        childrens.forEach((attr, k) => {
            forCode += `
                (${paseDomDef(attr)})(${variable.scopeName}, ${variable.childrenName}, ${variable.pathSubIName});
            `
        })
    }

    let code = `
        // build.es6
        ${variable.childrenName} = [];

        ${forCode}
        ${variable.treeName}.push(
            ${variable.utilName}.build(
                '${domAttr.name}', ${variable.pathSubIName}, ${variable.attrName},
                ${variable.dynamicAttrName}, ${variable.eventName}, ${variable.childrenName}
            )
        );
    `

    return code
}
