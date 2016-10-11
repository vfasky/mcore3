/**
 *
 * 解释 if unless
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

export function begin (domAttr) {
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

export function end (domAttr) {
    if (!domAttr.attribs['mc-if'] && !domAttr.attribs['mc-unless']) {
        return ''
    } else {
        return '}'
    }
}
