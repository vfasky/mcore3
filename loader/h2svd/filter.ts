/**
 * 过滤掉不需要的 dom
 * @author vfasky<vfasky@gmail.com>
 * 
 **/
'use strict'

import { htmlParserDom } from './interface'

export default function (domTree: htmlParserDom[] = []): any[] {
    return domTree.filter((dom) => {
        if (dom.type === 'comment') return false
        if (dom.type === 'text' && dom.data.trim().length === 0) return false
        return true
    })
}