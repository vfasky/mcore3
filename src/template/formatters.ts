/**
 *
 * 过滤函数
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import { isNumber } from '../util'

export default {
    toNumber: function (x) {
        if (isNumber(x)) {
            return Number(x)
        }
        return 0
    },

    toFixed: function (x, len = 1) {
        if (isNumber(x)) {
            return Number(Number(x).toFixed(len))
        }
        return 0
    },

    in: function (x, ...arr) {
        return arr.indexOf(x) !== -1
    },

    objToStyle: (value: any) => {
        let autoPx = [
            'width', 'height', 'left', 'top', 'right', 'bottom',
            'margin-top', 'margin-left', 'margin-right', 'margin-bottom',
            'padding-top', 'padding-left', 'padding-right', 'padding-bottom'
        ]
        let css = []

        Object.keys(value).forEach((key) => {
            let val = value[key]
            if (autoPx.indexOf(key) !== -1 && isNumber(val)) {
                val = val + 'px'
            }
            css.push(`${key}: ${val}`)
        })

        return css.join(';')
    }
}