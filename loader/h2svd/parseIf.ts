/**
 *
 * 解释 if unless
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'
import {htmlParserDom} from './interface'

export function begin (domAttr:htmlParserDom):string {
    if (!domAttr.attribs['mc-if'] && !domAttr.attribs['mc-unless']) {
        return ''
    }
    if (domAttr.attribs['mc-if']) {
        return `
            /* [mc-if] ${domAttr.attribs['mc-if']} */
            if(${domAttr.attribs['mc-if']}){
        `
    } else {
        return `
            /* [mc-unless] ${domAttr.attribs['mc-unless']} */
            if(!(${domAttr.attribs['mc-unless']})){
        `
    }
}

export function end (domAttr:htmlParserDom):string {
    if (!domAttr.attribs['mc-if'] && !domAttr.attribs['mc-unless']) {
        return ''
    } else {
        return '}'
    }
}
