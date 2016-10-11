/**
 *
 * 生成 dom 定义
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import {htmlParserDom} from './interface'
import paseDomDef from './parseDomDef'
import filter from './filter'
import {variable} from './config'


export default function (domAttr:htmlParserDom, key:string):string {
    let forCode = `
        var ${variable.pathSubIName} = String(${key})
    `

    if (Array.isArray(domAttr.children)) {
        let childrens = filter(domAttr.children)

        childrens.forEach((attr, k) => {
            forCode += `
                (${paseDomDef(attr)})(${variable.scopeName}, ${variable.childrenName}, ${variable.pathSubIName})
            `
        })
    }

    let code = `
        // build
        ${variable.childrenName} = []
        ${forCode}
        ${variable.treeName}.push(
            ${variable.utilName}.build(
                '${domAttr.name}', ${variable.pathSubIName}, ${variable.attrName},
                ${variable.dynamicAttrName}, ${variable.eventName}, ${variable.childrenName}
            )
        )
    `

    return code
}
