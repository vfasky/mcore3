/**
 *
 * 解释文本
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import {parseFormatters} from './parseFormatters'
import {variable} from './config'
import {htmlParserDom} from './interface'

const SIGN_REG = /\{([^}]+)\}/g
const STREND_REG = /[^]+""$/

interface mapTreeConfig {
    key: string;
    val: string;
}

export default function parseText (domAttr:htmlParserDom):string {
    domAttr.data = domAttr.data.replace(/\n/g, ' ')
    let text = domAttr.data
    let code = `
        // parseText
        var ${variable.pathStaticIName} = ${variable.pathName} + '.' + ${variable.treeName}.length
    `

    if (SIGN_REG.test(text)) {
        code += `var ${variable.strValsName} = {}`
        let mapTree:mapTreeConfig[] = []
        let mapTreeId = 0
        let runtimeCode = text.replace(/\s+/g, ' ').replace(SIGN_REG, (key, val) => {
            let reKey = `rp_${mapTreeId++}`
            mapTree.push({
                key: reKey,
                val: val
            })
            return `" + ${variable.strValsName}['${reKey}'] + "`
        })

        runtimeCode = '"' + runtimeCode
        if (STREND_REG.test(runtimeCode) === false) {
            runtimeCode += '"'
        }

        mapTree.forEach((v) => {
            code += parseFormatters(v.key, v.val, variable.strValsName)
        })

        code += `
            /* [formatter] ${text.trim()} */
            var ${variable.strName} = ${runtimeCode};
            var ${variable.dynamicAttrName} = {text: ${variable.strName}};
            ${variable.treeName}.push(${variable.utilName}.build(
                '_textNode', ${variable.pathStaticIName}, {},
                ${variable.dynamicAttrName}, {}, []
            ));
        `
    } else {
        code += `
            var ${variable.attrName} = {text: "${text.replace(/"/g, '\\"')}"}
            ${variable.treeName}.push(${variable.utilName}.build('_textNode', ${variable.pathStaticIName}, ${variable.attrName}))
        `
    }

    return code
}
