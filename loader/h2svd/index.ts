/// <reference path="../../definition/htmlparser2.d.ts" />
/**
 * html to mcore dom
 * @author vfasky<vfasky@gmail.com>
 * 
 **/
'use strict'

import * as htmlparser from 'htmlparser2'
import { js as beautify } from 'js-beautify'
import filter from './filter'

import paseDomDef from './parseDomDef'
import { variable } from './config'


export default function (html: string, options = {}): string {
    let domTree = filter(htmlparser.parseDOM(html, {
        decodeEntities: true
    }))

    let forCode = ''

    domTree.forEach((domAttr, k) => {
        forCode += `
            (${paseDomDef(domAttr)})(${variable.scopeName}, ${variable.treeName}, '${k}');
        `
    })

    let code = `function (${variable.scopeName}, ${variable.viewName}, ${variable.mcoreName}) { // index
            var ${variable.utilName} = {
                clone: ${variable.mcoreName}.util.clone,
                build: function(tagName, key, attr, dynamicAttr, events, children){
                    return new ${variable.mcoreName}.Element(tagName, key, attr, dynamicAttr, children, events, ${variable.viewName})
                },
                parseDynamicVal: function(dynamicCode, dynamicCodeStr){
                    return ${variable.mcoreName}.util.parseDynamicVal(dynamicCode, dynamicCodeStr, ${variable.viewName})
                },
                callFormatter: function(formatterName){
                    return ${variable.mcoreName}.util.callFormatter(formatterName, ${variable.mcoreName})
                }
            }
            var ${variable.treeName} = [];
            
            ${forCode}

            return ${variable.treeName}
        }
    `

    code = beautify(code, {
        indent_size: 4
    })
    // console.log(code);
    return code
}
