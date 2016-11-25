/**
 *
 * 组件
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import EventEmitter from './eventEmitter'
import * as util from './util'
import Template from './template'
import Element from './element'
import diff from './diff'
import { patch } from './patch'
import Watch from './watch'

const isFunction = util.isFunction
const nextTick = util.NextTick
const getEvents = util.getEvents
const getComponents = util.getComponents

const templateHelper = {
    Template: Template,
    util: util,
    Element: Element
}

const keyCode = {
    keyenter: 13, // mcore 2
    keyesc: 27, // mcore 2
    'key-enter': 13,
    'key-esc': 27,
    'key-back': 8,
    'key-tab': 9,
    'key-left': 37,
    'key-up': 38,
    'key-right': 39,
    'key-down': 40,
    'key-escape': 27
}

let $_win = null
let $_body = null
let _id = 0

const notProxyEvents = ['focus', 'blur']

export default class Component extends EventEmitter {
    // 渲染完成，回调队列
    private _queueCallbacks: any[] = []

    // 正在排队的渲染队列id
    private _queueId: number | null = null

    // 存放注册事件
    private _regEvents: any[] = []

    // 是否在观察 scope
    private _initWatchScope: boolean = false

    id: number

    watchScope: Watch
    parentNode: HTMLElement
    el: HTMLElement
    refs: HTMLElement
    parentElement: Element
    virtualDom: Element
    scope: any
    virtualDomDefine: any
    events: any

    $win: any
    $body: any
    $refs: any

    util = util
    nextTick = nextTick

    // 是否在微信中打开
    isWeixinBrowser = util.isWeixinBrowser()
    // 是否在ios中打开
    isIOS = util.isIOS()


    constructor(parentNode: HTMLElement, parentElement: any = {}, args = {}) {
        super()
        Object.keys(args).forEach((key) => {
            this[key] = args[key]
        })
        this.parentNode = parentNode
        // 兼容mcore2
        this.el = parentNode
        this.parentElement = parentElement

        this._initWatchScope = false

        this.id = _id++

        // this.virtualDom = null

        // 存放 window 及 body 引用
        if ($_win === null || $_body === null) {
            $_win = util.get$()(window)
            $_body = util.get$()('body')
        }
        this.$win = $_win
        this.$body = $_body


        // 模板 scope
        this.scope = parentElement.props || {}
        Object.keys(parentElement.dynamicProps || {}).forEach((attr) => {
            this.scope[attr] = parentElement.dynamicProps[attr]
        })

        this.beforeInit()
        this.init()
        this.watch()
    }
    beforeInit() { }
    init() { }
    watch() { }

    mount(parentEl = this.parentNode) {
        if (this.refs && parentEl.appendChild && !(util.get$().contains(parentEl, this.refs))) {
            parentEl.appendChild(this.refs)
            this.emit('mount', this.refs)
        }
    }

    destroy(notRemove: boolean = false) {
        if (this._initWatchScope) {
            this.watchScope.unwatch()
            this.watchScope.off('update')
        }

        getComponents(this.virtualDom).forEach((component) => {
            component.destroy()
        })

        if (!notRemove && this.$refs) {
            this.$refs.remove()
            this.$refs = null
        }
        else if (this.$refs) {
            this.$refs.off()
        }

        // 渲染完成，回调队列
        this._queueCallbacks = []
    }

    /**
     * 取调用自定组件的上级view
     */
    parentView() {
        return this.parentElement.view
    }

    /**
     * 触发组件的自定义事件
     */
    emitEvent(eventName: string, args: any[]) {
        let parentView = this.parentView()
        if (parentView && this.parentElement.events.hasOwnProperty(eventName)) {
            let eventCtx = this.parentElement.events[eventName]
            let callback = parentView[eventCtx.funName]
            if (!isFunction(callback)) {
                return
            }
            if (!Array.isArray(args)) {
                if (args && (<any>args).length !== undefined) {
                    args = (<any>Array).from(args)
                }
                else {
                    args = []
                }
            }
            // 如果模板事件有参数，追加在最后一个参数
            if (Array.isArray(eventCtx.args) && eventCtx.args.length) {
                args = args.concat(eventCtx.args)
            }
            callback.apply(parentView, args)
        }
    }

    /**
     * 放入渲染队列
     */
    renderQueue(doneOrAsync = null) {
        // 加入成功回调队列
        if (isFunction(doneOrAsync)) {
            this._queueCallbacks.push(doneOrAsync)
        }
        if (this._queueId) {
            nextTick.clear(this._queueId)
        }
        // 马上渲染，不进队列
        if (doneOrAsync === true) {
            return this._render()
        }
        else {
            this._queueId = nextTick.next(() => {
                this._render()
            })
        }
    }

    /**
     * 真实的渲染操作
     * @method _render
     * @return {[type]} [description]
     */
    private _render() {
        if (!this.virtualDomDefine) {
            return
        }
        const $ = util.get$()
        // console.log(this.scope)

        let virtualDoms = this.virtualDomDefine(this.scope, this, templateHelper)
        let virtualDom
        if (virtualDoms.length == 1) {
            virtualDom = virtualDoms[0]
        }
        else {
            virtualDom = new Element('mc-vd', '0', {}, {}, virtualDoms)
        }
        // 未渲染，不用对比
        if (!this.virtualDom) {
            this.virtualDom = virtualDom
            // console.log(this.virtualDom)
            this.refs = this.virtualDom.render()
            this.$refs = $(this.refs)
            this.mount()
        } else {
            let patches = diff(this.virtualDom, virtualDom)
            // console.log(patches)

            // 更新dom
            patch(this.refs, patches)
            this.virtualDom = virtualDom
        }
        // 绑定事件
        this.bindEvents()

        this.emit('rendered', this.refs)
        this._queueCallbacks.forEach((done, ix) => {
            if (isFunction(done)) {
                done(this.refs)
                this._queueCallbacks[ix] = null
            }
        })

        if (!this._initWatchScope) {
            this._initWatchScope = true
            // 观察scope, 如果改动，渲染模板
            this.watchScope = new Watch(this.scope, () => {

                this.renderQueue()
            })

            let times = {}
            this.watchScope.on('update', (path, val) => {
                if (path !== 'scope') {
                    path = path.replace('scope.', '')

                    let now = (new Date()).getTime()
                    let paths = path.split('.')

                    paths.forEach((v, index) => {
                        let curPath = paths.slice(0, paths.length - index).join('.')
                        let value = util.getObjAttrByPath(curPath, this.scope)

                        if (times[curPath] && now - times[curPath] < 100) {
                            return false
                        }

                        times[curPath] = (new Date()).getTime()
                        this.emit('update:' + curPath, value)
                    })
                }
            })
        }

        return this.refs
    }

    callEvent(event, eventName: string) {

        const $ = util.get$()
        var res = null
        let target = event.target
        let eventData = this.events[eventName]

        if (Array.isArray(eventData)) {
            for (let i = 0, len = eventData.length; i < len; i++) {
                let ctx = eventData[i]
                let ctxTarget = ctx.target()
                // console.log(ctxTarget, target)

                if (ctxTarget && (ctxTarget === target || $.contains(ctxTarget, target))) {
                    let callback = this[ctx.funName]

                    if (isFunction(callback)) {
                        let args = [event, ctxTarget]
                        args = args.concat(ctx.args)
                        res = callback.apply(this, args)
                        if (res === false) {
                            break
                        }
                    }
                }
            }
        }
        return res
    }

    regEvent(eventName) {
        const $ = util.get$()
        if (this._regEvents.indexOf(eventName) === -1) {
            this._regEvents.push(eventName)

            if (keyCode.hasOwnProperty(eventName)) {
                this.$refs.on('keyup', (event) => {
                    if (event.keyCode == keyCode[eventName]) {
                        return this.callEvent(event, eventName)
                    }
                })
            }
            else if (notProxyEvents.indexOf(eventName) === -1) {
                this.$refs.on(eventName, (event) => {
                    return this.callEvent(event, eventName)
                })
            }
            else if (['focus', 'blur'].indexOf(eventName) !== -1) {
                this.$refs.on(eventName, 'input, textarea, select, [tabindex]', (event) => {
                    return this.callEvent(event, eventName)
                })
            }
        }
    }

    unRegEvent(eventName) {
        let ix = this._regEvents.indexOf(eventName)
        if (ix !== -1) {
            this.$refs.off(eventName)
            this._regEvents.splice(ix, 1)
        }
    }

    bindEvents() {
        if (!this.$refs) {
            return
        }
        const $ = util.get$()
        // if (this.events) {
        //     this.oldEvents = this.events
        // }
        this.events = getEvents(this.virtualDom)
        let curEvents = Object.keys(this.events)
        // console.log(curEvents, this.events);

        this._regEvents.forEach((regEventName) => {
            if (curEvents.indexOf(regEventName) === -1) {
                this.unRegEvent(regEventName)
            }
        })

        curEvents.forEach((eventName) => {
            this.regEvent(eventName)
        })
    }

    /**
     * 更新 scope
     * @method set
     * @param  {String} attr
     * @param  {Mixed} value
     * @param  {Function | Boolean} doneOrAsync
     */
    set(attr, value, doneOrAsync = null, isPromeisCallback = false) {
        if (isPromeisCallback || !value || !isFunction(value.then)) {
            let isChange = this.scope[attr] !== value
            // console.log(isChange)
            if (isChange) {
                this.scope[attr] = value
                // for mcore3
                // this.emit('update:' + attr, value)
            }
            // else{
            //     this.renderQueue(doneOrAsync);
            // }
            this.emit('changeScope', this.scope, attr, value)
            this.emit('change:' + attr, value)
            return isChange
        }
        else {
            return value.then((val) => {
                let isChange = this.set(attr, val, doneOrAsync, true)
                return isChange
            })
        }
    }

    /**
     * 取 scope 值， 兼容 mcore2
     * @method get
     * @param  {String} attr
     * @param  {Mixed} defaultVal = null
     * @return {Mixed}
     */
    get(attr, defaultVal = null) {
        if (this.scope.hasOwnProperty(attr)) {
            return this.scope[attr]
        }
        return defaultVal
    }

    /**
     * 移除属性
     * @method remove
     * @param  {String} attr
     * @param  {Mixed} doneOrAsync = null
     * @return {Void}
     */
    remove(attr, doneOrAsync = null) {
        if (this.scope.hasOwnProperty(attr)) {
            delete this.scope[attr]
            this.emit('removeScope', this.scope, attr)
            this.emit('change:' + attr, null)
        }
        this.renderQueue(doneOrAsync)
    }

    /**
     * 对外接口
     * @method update
     * @param  {String} attr
     * @param  {Mixed} value
     * @param  {String} status
     * @return {Void}
     */
    update(attr, value, status) {
        if (status === 'remove') {
            return this.remove(attr)
        }
        this.set(attr, value)
    }

    render(virtualDomDefine, scope = {}, doneOrAsync = null) {
        this.virtualDomDefine = virtualDomDefine
        let scopeKeys = Object.keys(scope)
        let promiseVals = []
        let setKeys = []
        scopeKeys.forEach((attr) => {
            if (scope[attr] && isFunction(scope[attr].then)) {
                promiseVals.push(scope[attr])
                setKeys.push(attr)
            } else {
                this.set(attr, scope[attr])
            }
        })

        if (promiseVals.length === 0) {
            // console.log(this.scope)
            return new Promise((resolve) => {
                this.renderQueue((refs) => {
                    if (isFunction(doneOrAsync)) {
                        doneOrAsync(refs)
                    }
                    resolve(refs)
                })
            })
        }

        return <any>Promise.all(promiseVals).then((results) => {
            setKeys.forEach((attr, ix) => {
                this.set(attr, results[ix])
            })

            // 马上渲染
            if (doneOrAsync === true) {
                return this.renderQueue(doneOrAsync)
            }
            return new Promise((resolve) => {
                this.renderQueue((refs) => {
                    if (isFunction(doneOrAsync)) {
                        doneOrAsync(refs)
                    }
                    resolve(refs)
                })
            })
        })
    }
}
