/**
 * 增加一些辅助 mcore 的 方法
 * @author vfasky<vfasky@gmail.com>
 * 
 **/
'use strict'

import { get$ } from './util'

export function buildCss() {
    const $ = get$()

    let css = `
    <style>
        .mc-hide {
            display: none !important;
        }
    </style>`

    let $target = $('head')
    if ($target.length === 0) {
        $target = $('html')
    }    

    $target.append(css)
}