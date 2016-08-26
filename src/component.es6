/**
 *
 * 组件
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import EventEmitter from './eventEmitter';
import * as util from './util';
import Template from './template';
import Element from './element';
import diff from './diff';
import patch from './patch';
import Watch from './watch';

const isFunction = util.isFunction;
const nextTick = util.nextTick;
const getEvents = util.getEvents;
const getComponents = util.getComponents;

const templateHelper = {
    Template: Template,
    util: util,
    Element: Element,
};

let $_win = null;
let $_body = null;
let _id = 0;

const notProxyEvents = ['focus', 'blur'];

export default class Component extends EventEmitter {
    constructor(parentNode, parentElement = {}) {
        super();
        this.parentNode = parentNode;
        //兼容mcore2
        this.el = parentNode;
        this.parentElement = parentElement;
        // 渲染完成，回调队列
        this._queueCallbacks = [];
        // 正在排队的渲染队列id
        this._queueId = null;
        // 存放注册事件
        this._regEvents = [];

        this._initWatchScope = false;

        this.id = _id++;

        this.virtualDom = null;

        // 存放 window 及 body 引用
        if($_win === null || $_body === null){
            $_win = util.get$()(window);
            $_body = util.get$()('body');
        }
        this.$win = $_win;
        this.$body = $_body;

        this.util = util;
        this.nextTick = util.nextTick;
        // 是否在微信中打开
        this.isWeixinBrowser = util.isWeixinBrowser();
        // 是否在ios中打开
        this.isIOS = util.isIOS();

        // 模板 scope
        this.scope = parentElement.props || {};
        Object.keys(parentElement.dynamicProps || {}).forEach((attr)=>{
            this.scope[attr] = parentElement.dynamicProps[attr];
        });

        this.beforeInit();
        this.init();
        this.watch();




    }
    beforeInit(){}
    init(){}
    watch(){}

    mount(parentEl = this.parentNode){
        if(this.refs && parentEl.appendChild && !(util.get$().contains(parentEl, this.refs))){
            parentEl.appendChild(this.refs);
            this.emit('mount', this.refs);
        }
    }

    destroy(notRemove){
        if(this._initWatchScope){
            this.watchScope.unwatch();
        }

        if(!notRemove && this.$refs){
            this.$refs.remove();
            this.$refs = null;
        }
        else if(this.$refs){
            this.$refs.off();
        }
        // console.log(getComponents(this.virtualDom));
        getComponents(this.virtualDom).forEach((component)=>{
            component.destroy();
        });

        // 渲染完成，回调队列
        this._queueCallbacks = [];

    }

    /**
     * 取调用自定组件的上级view
     * @method parent
     * @return {View}
     */
    parentView(){
        return this.parentElement.view;
    }

    /**
     * 触发组件的自定义事件
     * @method emitEvent
     * @param  {String}  eventName
     * @param  {Array}  args
     * @return {Void}
     */
    emitEvent(eventName, args){
        let parentView = this.parentView();
        if(parentView && this.parentElement.events.hasOwnProperty(eventName)){
            let eventCtx = this.parentElement.events[eventName];
            let callback = parentView[eventCtx.funName];
            if(!isFunction(callback)){
                return;
            }
            if(!Array.isArray(args)){
                args = [];
            }
            //如果模板事件有参数，追加在最后一个参数
            if(Array.isArray(eventCtx.args) && eventCtx.args.length){
                args.push({
                    type: 'eventContext',
                    args: eventCtx.args,
                });
            }
            callback.apply(parentView, args);
        }
    }

    /**
     * 放入渲染队列
     * @method renderQueue
     * @param  {Function | Boolean}    doneOrAsync
     * @return {Void}
     */
    renderQueue(doneOrAsync){
        //加入成功回调队列
        if(isFunction(doneOrAsync)){
            this._queueCallbacks.push(doneOrAsync);
        }
        if(this._queueId){
            nextTick.clear(this._queueId);
        }
        //马上渲染，不进队列
        if(true === doneOrAsync){
            return this._render();
        }
        else{
            this._queueId = nextTick(()=>{
                this._render();
            });
        }
    }

    /**
     * 真实的渲染操作
     * @method _render
     * @return {[type]} [description]
     */
    _render(){
        if(!this.virtualDomDefine){
            return;
        }
        const $ = util.get$();

        let virtualDoms = this.virtualDomDefine(this.scope, this, templateHelper);
        let virtualDom;
        if(virtualDoms.length == 1){
            virtualDom = virtualDoms[0];
        }
        else{
            virtualDom = new Element('mc-vd', '0', {}, {}, virtualDoms);
        }
        // 未渲染，不用对比
        if(!this.virtualDom){
            this.virtualDom = virtualDom;
            this.refs = this.virtualDom.render();
            this.$refs = $(this.refs);
            this.mount();
        }
        else{
            let patches = diff(this.virtualDom, virtualDom);
            //先移除事件绑定
            // if(this.$refs){
            //     this.$refs.off();
            // }
            //更新dom
            patch(this.refs, patches);
            // console.log(this.refs);
            // this.$refs = $(this.refs);
            this.virtualDom = virtualDom;
        }
        // 绑定事件
        this.bindEvents();

        this.emit('rendered', this.refs);
        this._queueCallbacks.forEach((done, ix)=>{
            if(isFunction(done)){
                done(this.refs);
                this._queueCallbacks[ix] = null;
            }
        });

        if(!this._initWatchScope){
            this._initWatchScope = true;
            // 观察scope, 如果改动，渲染模板
            this.watchScope = new Watch(this.scope, (path)=>{
                this.renderQueue();
            });
        }

        return this.refs;
    }

    callEvent(event, eventName){
        const $ = util.get$();
        var res = null;
        let target = event.target;
        let eventData = this.events[eventName];
        // console.log(eventData, eventName);
        for(let i = 0, len = eventData.length; i < len; i++){
            let ctx = eventData[i];
            let ctxTarget = ctx.target();
            // console.log(ctxTarget, target);
            if(ctxTarget && (ctxTarget === target || $.contains(ctxTarget, target))){
                let callback = this[ctx.funName];
                // console.log(callback, ctx.args);
                if(isFunction(callback)){
                    let args = [event, ctxTarget];
                    args = args.concat(ctx.args);
                    // console.log(ctx.element);
                    res = callback.apply(this, args);
                    if(false === res){
                        break;
                    }
                }
            }
        }
        return res;
    }

    regEvent(eventName){
        const $ = util.get$();
        if(this._regEvents.indexOf(eventName) === -1){
            this._regEvents.push(eventName);

            if(notProxyEvents.indexOf(eventName) === -1){
                this.$refs.on(eventName, (event)=>{
                    return this.callEvent(event, eventName);
                });
            }
            else if(['focus', 'blur'].indexOf(eventName) !== -1){
                this.$refs.on(eventName, 'input, textarea, select, [tabindex]', (event)=>{
                    return this.callEvent(event, eventName);
                });
            }
        }
    }

    unRegEvent(eventName){
        this.$refs.off(eventName);
    }

    bindEvents(){
        if(!this.$refs){
            return;
        }
        const $ = util.get$();
        if(this.events){
            this.oldEvents = this.events;
        }
        this.events = getEvents(this.virtualDom);
        let curEvents = Object.keys(this.events);
        // console.log(curEvents, this.events);

        this._regEvents.forEach((regEventName)=>{
            if(curEvents.indexOf(regEventName) === -1){
                this.unRegEvent(regEventName);
            }
        });

        curEvents.forEach((eventName)=>{
            this.regEvent(eventName);
        });

    }

    /**
     * 更新 scope
     * @method set
     * @param  {String} attr
     * @param  {Mixed} value
     * @param  {Function | Boolean} doneOrAsync
     */
    set(attr, value, doneOrAsync = null){
        if(!isFunction(value.then)){
            let isChange = this.scope[attr] !== value;
            if(isChange){
                this.scope[attr] = value;
                this.emit('changeScope', this.scope, attr, value);
                this.emit('change:' + attr, value);
            }
            this.renderQueue(doneOrAsync);
        }
        else{
            return value.then((val)=>{
                this.set(attr, val, doneOrAsync);
            });
        }
    }

    /**
     * 取 scope 值， 兼容 mcore2
     * @method get
     * @param  {String} attr
     * @param  {Mixed} defaultVal = null
     * @return {Mixed}
     */
    get(attr, defaultVal = null){
        if(this.scope.hasOwnProperty(attr)){
            return this.scope[attr];
        }
        return defaultVal;
    }

    /**
     * 移除属性
     * @method remove
     * @param  {String} attr
     * @param  {Mixed} doneOrAsync = null
     * @return {Void}
     */
    remove(attr, doneOrAsync = null){
        if(this.scope.hasOwnProperty(attr)){
            delete this.scope[attr];
            this.emit('removeScope', this.scope, attr);
            this.emit('change:' + attr, null);
        }
        this.renderQueue(doneOrAsync);

    }

    /**
     * 对外接口
     * @method update
     * @param  {String} attr
     * @param  {Mixed} value
     * @param  {String} status
     * @return {Void}
     */
    update(attr, value, status){
        if(status === 'remove'){
            return this.remove(attr);
        }
        this.set(attr, value);
    }

    render(virtualDomDefine, scope = {}, doneOrAsync = null){
        this.virtualDomDefine = virtualDomDefine;
        let scopeKeys = Object.keys(scope);
        let promiseVals = [];
        scopeKeys.forEach((attr)=>{
            promiseVals.push(scope[attr]);
        });
        return Promise.all(promiseVals).then((results)=>{
            scopeKeys.forEach((attr, ix)=>{
                this.set(attr, results[ix]);
            });

            //马上渲染
            if(doneOrAsync === true){
                return this.renderQueue(doneOrAsync);
            }
            return new Promise((resolve)=>{
                this.renderQueue((refs)=>{
                    if(isFunction(doneOrAsync)){
                        doneOrAsync(refs);
                    }
                    resolve(refs);
                });
            });
        });

    }
}
