/**
 *
 * 模板渲染
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import { isNumber, isString, isFunction } from './util'
import EventEmitter from './eventEmitter'
import binders from './template/binders'
import formatters from './template/formatters'
import * as util from './util'
import Element from './element'

/**
 * 模板引擎
 */
export default class Template extends EventEmitter {
    /**
     * 绑定的自定义组件
     */
    static components: any = {}

    /**
     * binders
     */
    static binders: any = binders

    /**
     * 过滤函数
     */
    static formatters: any = formatters

    /**
     * 通过 function name 取 function
     */
    static strToFun = function (el, value: string) {
        if (!el._element || !el._element.view || !el._element.view[value]) {
            return () => { }
        }
        return function () {
            return el._element.view[value].apply(el._element.view, arguments)
        }
    }

    /**
     * 取模板对应的 view
     */
    static getEnv = function (el) {
        return el._element.view
    }

    /**
     * 标记是否监听事件
     */
    private _isWatchEvent: boolean

    /**
     * mcore element
     */
    element: Element


    /**
     * 真实 DOM
     */
    refs: HTMLInputElement

    constructor(element) {
        super()
        this._isWatchEvent = false
        this.element = element
        // this.childrenComponent = []
    }

    destroy(notRemove = false) {
        util.getComponents(this.element).forEach((component) => {
            component.destroy()
        })

        // 移除自身
        if (!notRemove) {
            if (this.refs && this.refs.parentNode && this.refs.parentNode.removeChild) {
                this.refs.parentNode.removeChild(this.refs)
            }
        }
        this.emit('destroy')
    }

    /**
     * 渲染 node
     * @method render
     * @return {Element}
     */
    render() {
        let node: any
        if (this.element.tagName == '_textnode') {
            if (this.element.dynamicProps.hasOwnProperty('text')) {
                node = document.createTextNode(this.element.dynamicProps.text)
            }
            else {
                node = document.createTextNode(this.element.props.text)
            }
            node._key = this.element.key
            // console.log(this.element.key, this.element);
            this.refs = node
            // node._element = this.element;
            return node
        }
        node = document.createElement(this.element.tagName)
        node._key = this.element.key
        node._element = this.element
        this.refs = node

        // 自定义组件初始化，子元素由 自定义组件 自己管理
        if (Template.components.hasOwnProperty(this.element.tagName)) {
            // 自定义组件，先设置静态属性
            Object.keys(this.element.props).forEach((attr) => {
                this.setAttr(attr.toLowerCase(), this.element.props[attr])
            })
            // 设置动态属性
            Object.keys(this.element.dynamicProps).forEach((attr) => {
                this.setAttr(attr.toLowerCase(), this.element.dynamicProps[attr], true)
            })

            this.element._component = new Template.components[this.element.tagName](node, this.element)
            this.element._noDiffChild = true
            // this.element.children = []
            // this.element.count = 0

            // node._component = this.element._component

        } else { // 非自定义组件，渲染子元素
            this.element.children.forEach((child) => {
                if (child.render) {
                    let childNode = child.render()
                    if (childNode) {
                        this.refs.appendChild(childNode)
                    }
                    else {
                        console.log(childNode)
                    }
                }
                else {
                    console.log(child)
                    throw new Error('child not Mcore Element')
                }
            })
            // 设置静态属性
            Object.keys(this.element.props).forEach((attr) => {
                this.setAttr(attr.toLowerCase(), this.element.props[attr])
            })
            // 设置动态属性
            Object.keys(this.element.dynamicProps).forEach((attr) => {
                this.setAttr(attr.toLowerCase(), this.element.dynamicProps[attr], true)
            })
        }

        return this.refs
    }

    /**
     * 调用自定义属性
     */
    callBinder(binder: any, status: string, value: any, attrValue: any = null) {
        if (isFunction(binder)) {
            this.element._binder = true
            binder(this.refs, value, attrValue)
        }
        if (status === 'init') {
            if (isFunction(binder.init)) {
                this.element._binder = true
                binder.init(this.refs, value, attrValue)
            }
            // 兼容mcore2
            if (isFunction(binder.rendered)) {
                this.element._binder = true
                binder.rendered(this.refs, value, attrValue)
            }
        }
        else {
            let binderFun = binder[status]
            if (isFunction(binderFun)) {
                this.element._binder = true
                binderFun(this.refs, value, attrValue)
            }
        }
    }

    /**
     * 通知更新的值
     */
    update(attr: string, value, status) {
        if (this.element._component) {
            this.element._component.update(attr, value, status)
        }
        this.emit(status, attr, value)
        this.emit('change:' + attr, value)
    }

    /**
     * 设置 node 属性
     */
    setAttr(attr: string, value: any, isDynamic = false, status = 'init') {
        // 处理动态属性
        if (isDynamic) {
            if (this.element.dynamicProps.hasOwnProperty(attr) === false) {
                return
            }
            if (Template.binders.hasOwnProperty(attr)) {
                let binder = Template.binders[attr]
                this.callBinder(binder, status, value)
                return
            }
            // 处理 mc-class-* (mc-class-test="true" => 'class-test': true)的情况
            let TemplateBinderKeys = Object.keys(Template.binders)
            for (let binderAttr of TemplateBinderKeys) {
                if (binderAttr.indexOf('*')) {
                    let t = binderAttr.split('*')
                    if (t.length === 2) {
                        let attrPrefix = t[0]
                        let attrValue = attr.replace(attrPrefix, '')
                        if (attr.indexOf(attrPrefix) === 0) {
                            let binder = Template.binders[binderAttr]
                            this.callBinder(binder, status, value, attrValue)
                            return
                        }
                    }
                }
            }
            if (status != 'init' && this.element.dynamicProps[attr] !== value) {
                this.update(attr, value, status)
                return
            }
        }
        if (attr === 'class') {
            this.refs.className = value
            return
        }
        else if (attr === 'style') {
            this.refs.style.cssText = value
            return
        }
        // else if(attr === '_key'){
        //     return;
        // }

        let tagName = this.element.tagName

        if (attr === 'value' && ['input', 'textarea', 'select'].indexOf(tagName) !== -1) {
            this.refs.value = value
            return
        }
        if (isNumber(value) || isString(value) || value === true) {
            this.refs.setAttribute(attr, value)
        }
    }
}