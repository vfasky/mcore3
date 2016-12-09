/**
 *
 * 工具类
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import * as jquery from 'jquery'
import Element from './element'
 
const VAR_REG = /(^[a-zA-Z0-9_-]+)$/

let _isIOS: null | boolean = null
let _isWeixinBrowser: null | boolean = null

/**
 * 是否 ios
 */
export function isIOS(): boolean {
    if (_isIOS === null) {
        _isIOS = typeof window === 'object' && (/iphone|ipad/gi).test(window.navigator.appVersion)
    }
    return _isIOS
}

/**
 * 是否运行在微信里
 */
export function isWeixinBrowser(): boolean {
    if (_isWeixinBrowser === null) {
        _isWeixinBrowser = typeof window === 'object' && (/MicroMessenger/i).test(window.navigator.userAgent)
    }
    return _isWeixinBrowser
}

/**
 * 返回一个 jquery
 */
export function get$(): JQueryStatic {
    if (typeof $ === 'function') {
        return $
    }
    return jquery
}

/**
 * 遍历数组
 * @param arr 要遍历的数组
 * @param {function} callback 回调函数
 */
export function each(arr: any[], callback) {
    get$().each(arr, (k, v) => {
        return callback(v, k)
    })
}

/**
 * 是否数组
 * @param x 要检查的变量
 */
export function isNumber(x): boolean {
    return get$().isNumeric(x)
}

/**
 * 是否数组
 * @param x 要检查的变量
 */
export function isArray(x): boolean {
    return get$().isArray(x)
}

/**
 * 是否文本
 * @param x 要检查的变量
 */
export function isString(x): boolean {
    return get$().type(x) === 'string'
}

/**
 * 返回类型
 * @param x 要检查的变量
 */
export function type(x): string {
    return get$().type(x)
}

/**
 * 是否函数
 * @param x 要检查的变量
 */
export function isFunction(x): boolean {
    return get$().isFunction(x)
}

/**
 * 是否一个简单对象
 * @param x 要检查的变量
 */
export function isObject(x): boolean {
    return get$().isPlainObject(x)
}

/**
 * 是否一个简单对象
 * @param x 要检查的变量
 */
export function isPlainObject(x): boolean {
    return get$().isPlainObject(x)
}

/**
 * clone 对象
 * @param x 要 clone 的变量
 */
export function clone(x): any {
    if (isArray(x)) {
        return get$().extend(true, [], x)
    } else if (isPlainObject(x)) {
        return get$().extend(true, {}, x)
    }
    return x
}

export function extend(x) {
    return clone(x)
}

interface EventConfig {
    funName: string;
    args: any[];
    target: any;
    element: any;
}

interface Events {
    [key: string]: EventConfig[];
}

/**
 * 取 mcore element 的所有事件 （含子树）
 * @param element mcore Element
 * @param events 事件数据
 */
export function getEvents(element, events: any = {}): {} {
    if (element.children) {
        element.children.forEach((child) => {
            getEvents(child, events)
        })
    }

    Object.keys(element.events).forEach((name) => {
        let curEvent = element.events[name]
        if (!events.hasOwnProperty(name)) {
            events[name] = []
        }
        events[name].push({
            funName: curEvent.funName,
            args: curEvent.args,
            target: () => {
                // console.log(element);
                return element.refs
            },
            element: element
        })
    })

    return events
}

/**
 * 如果组件指定 mc-children-container="true", 返回特定 MCElement
 */
export function getComponentsContainer(elements: Element[], maxLevel = 100, level = 0): Element | null {
    
    if (maxLevel === level) {
        return null
    }

    for (let el of elements) {
        if (el.dynamicProps['children-container']) {
            return el
        }
        let findChildren = getComponentsContainer(el.children, maxLevel, level + 1)

        if (findChildren) {
            return findChildren
        }
    }
 
    return null
}


/**
 * 取 mcore element 的所有组件 （含子树）
 * @param element mcore Element
 * @param components 组件列表
 */
export function getComponents(element, components = []): any[] {
    if (!element) {
        return components
    }
    if (element.children) {
        element.children.forEach((child) => {
            getComponents(child, components)
        })
    }

    if (element._component) {
        components.push(element._component)
    }

    return components
}

/**
 * 根据属性路径从对象中取值
 * @param path 属性路径
 * @param obj 对象
 */
export function getObjAttrByPath(path: string, obj = {}): any {
    if (path.indexOf('.') === -1) {
        return obj[path]
    }
    let pathArr = path.split('.')
    let curObj = obj

    each(pathArr, (curPath) => {
        if (isNumber(curPath) && isArray(curObj)) {
            let ix = parseInt(curPath)
            if (ix < pathArr.length) {
                curObj = curObj[ix]
                return
            } else {
                curObj = null
                return false
            }
        }
        else if (isObject(curObj) && curObj.hasOwnProperty(curPath)) {
            curObj = curObj[curPath]
            return
        } else {
            curObj = null
            return false
        }
    })

    return curObj
}

/**
 * 解释动态值
 * @param dynamicCode 动态表达式
 * @param dynamicCodeStr 静态代码
 * @param view 对应的 view
 */
export function parseDynamicVal(dynamicCode: any, dynamicCodeStr: string, view: any): any {
    if (type(dynamicCode) === 'function') {
        type(console) !== 'undefined' && console.error('dynamicCode can not be a function')
        return ''

    } else if (type(dynamicCode) !== 'undefined'
        && ((type(Element) === 'function' || type(Element) === 'object')
            && dynamicCode instanceof Element === false)) {

        return type(dynamicCode) === 'undefined' ? '' : dynamicCode

    } else if (type(view[dynamicCode]) !== 'undefined') {
        return view[dynamicCode]

    } else if (VAR_REG.test(dynamicCodeStr)) {
        return type(dynamicCodeStr) === 'undefined' ? '' : dynamicCodeStr

    } else {
        return ''
    }
}

/**
 * 调用过滤函数
 * @param formatterName 函数名
 * @param mcore 
 */
export function callFormatter(formatterName: string, mcore): any {
    if (mcore.Template.formatters.hasOwnProperty(formatterName)) {
        return mcore.Template.formatters[formatterName]
    }
    return function () { }
}

/**
 * NodeList to Array
 */
export function nodeListToArray(nodeList: NodeList) {
    let list = []
    for(let i = 0, len = nodeList.length; i < len; i++) {
        list.push(nodeList[i])
    }
    return list
}


/**
 * 放到下一帧执行
 */
export class NextTick {
    static requestAnimationFrame() {
        return typeof requestAnimationFrame === 'function' ? requestAnimationFrame : setTimeout
    }
    static cancelAnimationFrame() {
        return typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout
    }
    
    /**
     * 放到下一帧执行
     * @param {function} fun 任务
     * @return 任务id
     */
    static next(fun: any): number {
        return NextTick.requestAnimationFrame()(() => {
            fun()
        })
    }
    
    /**
     * 清除需要下一帧执行的任务
     * @param id 任务id
     */
    static clear(id: number) {
        return NextTick.cancelAnimationFrame()(id)
    }
}