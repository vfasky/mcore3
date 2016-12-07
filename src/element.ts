/**
 *
 * mcore element
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'
import Template from './template'
import Component from './component'

/**
 * mcore element
 */
export default class Element {
    /**
     * 绑定的组件实例
     */
    _component: Component | null

    /**
     * 不 diff 节元素
     */
    _noDiffChild: boolean = false
    
    /**
     * 是否有绑定 binder
     */
    _binder: boolean = false

    tagName: string

    key: string
    /**
     * 静态属性
     */
    props: any
    /**
     * 动态属性
     */
    dynamicProps: any
    /**
     * 子元素
     */
    children: Element[]
    /**
     * 事件
     */
    events: {}
    /**
     * 父节点
     */
    parentElement: Element | null
    /**
     * 所属的view
     */
    view: any

    /**
     * 子节点数量
     */
    count: number

    /**　
     * 模板引擎实例
     */
    template: Template


    /**
     * 真实 DOM
     */
    refs: MCElement
    // get refs() {
    //     return this.template ? this.template.refs : null
    // }

    constructor(tagName: string, key: string, props = {}, dynamicProps = {}, children = [], events = {}, view: any = null) {
        this.tagName = tagName.trim().toLowerCase()
        this.key = key
        this.props = props
        this.dynamicProps = dynamicProps
        this.children = children
        this.events = events
        this.parentElement = null
        this.view = view

        if (Array.isArray(children) === false) {
            children = []
        }

        let count = 0
        children.forEach((child, i) => {
            if (child instanceof Element) {
                // 指定上级
                child.parentElement = this
                count += child.count
            }
            count++
        })
        // 子节点数量
        this.count = count
    }
    
    /**
     * 复制已经渲染的 element
     */
    cloneElement(element: Element) {
        // if (element._component) {
        //     console.log(this._component)
        //     console.log(element._component)
        // }
        this._component = element._component
        this._noDiffChild = element._noDiffChild
        this._binder = element._binder
        this.refs = element.refs

        this.view = element.view
        // this.children = element.children
        // this.count = element.count
        this.template = element.template
        this.template.element = this

        if (this._component) {
            this._component.bindEvents()
        }
        
        element = null

        // 设置动态属性
        Object.keys(this.dynamicProps).forEach((attr) => {
            this.template.setAttr(attr.toLowerCase(), this.dynamicProps[attr], true, 'update')
        })

        return this.refs
    }

    render() {
        this.template = new Template(this)
        this.refs = this.template.render()
        return this.refs
    }

    destroy(notRemove = false) {
        if (this.template) {
            this.template.destroy(notRemove)
        }
    }

}


export interface MCElement extends HTMLInputElement {
    _element: Element,
}