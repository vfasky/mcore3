/**
 *
 * 解释 属性
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import { parseFormatters } from './parseFormatters'
import { variable } from './config'
import { htmlParserDom } from './interface'

const FUN_REG = /(^[a-zA-Z0-9_-]+)\(([^]+)\)$/
const VAR_REG = /(^[a-zA-Z0-9_-]+)$/

/**
 * 解释动态属性
 * @param name 属性名
 * @param dynamicVal runtime script
 * @param dynamicAttrName 动态属性变量名称
 */
function parseDynamicAttr(name: string, dynamicVal: string, dynamicAttrName: string): string {
    name = name.replace('mc-', '')
    if (!dynamicVal) {
        dynamicVal = "''"
    }
    if (dynamicVal.indexOf(' | ') !== -1) {
        return parseFormatters(name, dynamicVal, dynamicAttrName)
    }

    if (VAR_REG.test(dynamicVal)) {
        return `
            if(typeof (${dynamicVal}) == 'undefined'){
                ${dynamicAttrName}['${name}'] = ${variable.utilName}.parseDynamicVal('${dynamicVal}', '')
            }
            else{
                ${dynamicAttrName}['${name}'] = ${variable.utilName}.parseDynamicVal(${dynamicVal}, '${dynamicVal}')
            }
        `
    } else {
        return `
            ${dynamicAttrName}['${name}'] = ${variable.utilName}.parseDynamicVal((${dynamicVal}), '${dynamicVal.replace(/'/g, "\\'")}')
        `
    }
}

/**
 * 解释 mc-show, mc-hide
 */
function parseShowHideAttr(attribs: any): string {
    if(!attribs.hasOwnProperty('mc-show') && !attribs.hasOwnProperty('mc-hide')) {
        return ''
    }
    let code = `
        ${variable.dynamicAttrName}['class'] = ${variable.dynamicAttrName}['class'] || ''
        if (${variable.attrName}.hasOwnProperty('class')) {
            ${variable.dynamicAttrName}['class'] += ' ' + ${variable.attrName}['class']
            delete ${variable.attrName}['class']
        }
    `

    if (attribs.hasOwnProperty('mc-show')) {
        code += `
        if (${attribs['mc-show']}) {
            if (${variable.dynamicAttrName}['class'].indexOf(' mc-hide ') !== -1 ){
                ${variable.dynamicAttrName}['class'] = ${variable.dynamicAttrName}['class'].replace(' mc-hide ', ' ')
            }
        } else {
            if (${variable.dynamicAttrName}['class'].indexOf(' mc-hide ') === -1 ){
                ${variable.dynamicAttrName}['class'] += ' mc-hide ' 
            }
        }
        `
    }
    if (attribs.hasOwnProperty('mc-hide')) {
        code += `
        if (!(${attribs['mc-hide']})) {
            if (${variable.dynamicAttrName}['class'].indexOf(' mc-hide ') !== -1 ){
                ${variable.dynamicAttrName}['class'] = ${variable.dynamicAttrName}['class'].replace(' mc-hide ', ' ')
            }
        } else {
            if (${variable.dynamicAttrName}['class'].indexOf(' mc-hide ') === -1 ){
                ${variable.dynamicAttrName}['class'] += ' mc-hide ' 
            }
        }
        `
    }

    return code
}

export default function parseAttr(domAttr: htmlParserDom): string {
    let attrKeys = Object.keys(domAttr.attribs)

    let igKeys = ['mc-for', 'mc-if', 'mc-unless', 'mc-show', 'mc-hide']

    let code = `
        // parseAttr
        var ${variable.attrName} = {}, ${variable.dynamicAttrName} = {}, ${variable.eventName} = {}
    `

    attrKeys.forEach((v) => {
        if (igKeys.indexOf(v) !== -1) {
            return false
        }
        // 解释事件
        if (v.indexOf('mc-on-') === 0) {
            let eventFunCode = String(domAttr.attribs[v])
            let funName: string = ''
            let args: string[] = []
            if (FUN_REG.test(eventFunCode)) {
                funName = eventFunCode.substr(0, eventFunCode.indexOf('('))
                let strArgs = eventFunCode.substr(eventFunCode.indexOf('(') + 1)
                args = strArgs.substr(0, strArgs.length - 1).split(',')
            } else {
                funName = eventFunCode
            }
            code += `
                ${variable.eventName}['${v.replace('mc-on-', '')}'] = {
                    'funName': '${funName}',
                    'args': [${args.join(', ')}]
                };
            `
            return false
        }
        // 解释静态属性
        if (v.indexOf('mc-') !== 0) {
            // code += `
            //     ${variable.attrName}['${v}'] = '${
            //         domAttr.attribs[v].replace(/\n/g, ' ').replace(/\r/g, '')
            //                           .replace(/\t/g, ' ').replace(/'/g, "\\'")
            //     }'
            // `
            code += `
                ${variable.attrName}['${v}'] = '${domAttr.attribs[v]}'
            `
        } else {
            code += parseDynamicAttr(v, domAttr.attribs[v], variable.dynamicAttrName)
        }
    })

    return code + parseShowHideAttr(domAttr.attribs)
}
