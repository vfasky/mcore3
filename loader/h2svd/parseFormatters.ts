/**
 *
 * 解释过滤函数及动态变量
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import { variable } from './config'

const FORMATTERS_ARGS_REG = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g

/**
 * 解释过滤函数及动态变量
 * @param name 属性名
 * @param dynamicVal runtime script
 * @param dynamicAttrName 动态属性变量名称
 */
export function parseFormatters(name: string, dynamicVal: string, dynamicAttrName: string): string {
    let funcs = dynamicVal.split(' | ')
    let startVal = funcs.shift()

    let formatterCode = ''

    funcs.forEach((fun) => {
        let args = []
        fun = String(fun)

        if (fun.indexOf('(') === -1) {
            fun.replace(FORMATTERS_ARGS_REG, (v) => {
                if (v === ']' && args.length > 2) {
                    let _attr = args.pop()
                    args[args.length - 1] = args[args.length - 1] + _attr + v
                } else {
                    args.push(v)
                }
                return ''
            })
        } else {
            fun.split(' ').forEach((v) => {
                let val = v.trim()
                if (val.length > 0) {
                    args.push(val.replace(/\\'/g, '__00__').replace(/\\"/g, '__01__'))
                }
            })
            // 处理 xx xx
            let mIx = -1
            args.forEach((v, k) => {
                if (mIx === -1 && v.indexOf("'") === 0 && v.slice(1).indexOf("'") === -1) {
                    mIx = k
                } else if (mIx !== -1 && v.indexOf("'") !== -1) {
                    let strVal = []
                    for (let i = mIx; i < (k + 1); i++) {
                        strVal.push(args[i])
                        args[i] = ''
                    }
                    args[mIx] = strVal.join(' ')
                    mIx = -1
                }
            })

            mIx = -1
            args.forEach((v, k) => {
                if (mIx === -1 && v.indexOf('"') === 0 && v.slice(1).indexOf('"') === -1) {
                    mIx = k
                } else if (mIx !== -1 && v.indexOf('"') !== -1) {
                    let strVal = []
                    for (let i = mIx; i < (k + 1); i++) {
                        strVal.push(args[i])
                        args[i] = ''
                    }
                    args[mIx] = strVal.join(' ')
                    mIx = -1
                }
            })

            args = args.filter((v) => {
                return v.length > 0
            }).map((v) => {
                v = v.replace(/__00__/g, "\\'").replace(/__01__/g, '\\"')
                if (v.slice(-1) === ',') {
                    v = v.slice(0, v.length - 1)
                }
                return v
            })
        }

        let formatter = args[0]
        args[0] = 'x'

        formatterCode += `
            x = ${variable.utilName}.callFormatter('${formatter}')(${args.join(',')});
        `
    })

    let code = ` // parseFormatters
        var ${variable.tmpAttrName};
        try{
            ${variable.tmpAttrName} = ${startVal}
        } catch (err) {
            console.error(err)
        }

        ${dynamicAttrName}['${name}'] = (function(x){
            ${formatterCode}
            return x == undefined ? '' : x
        })(${variable.tmpAttrName});
    `

    return code
}
