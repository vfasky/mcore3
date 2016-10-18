/**
 * 解释 htmlParserDom , 并生成 mcore dom
 * @author vfasky<vfasky@gmail.com>
 * 
 **/
'use strict'

import parseFor from './parseFor'
import parseText from './parseText'
import { variable } from './config'

import { htmlParserDom } from './interface'

/**
 * 解释并生成 virtual-dom 定义
 * @return Array
 */
export default function (domAttr: htmlParserDom) {
    // if(domAttr.type === 'text'){
    //     return parseText(domAttr);
    // }
    let code = `function (${variable.scopeName}, ${variable.treeName}, ${variable.pathName}) { 
        // parseDomDef
        ${domAttr.type === 'text' ? parseText(domAttr) : parseFor(domAttr)}
    }`

    return code
}
