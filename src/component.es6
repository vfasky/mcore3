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


const isFunction = util.isFunction;
const nextTick = util.nextTick;
const getEvents = util.getEvents;
const getComponents = util.getComponents;

const templateHelper = {
    Template: Template,
    util: util,
    Element: Element,
};

export default class Component extends EventEmitter {
    constructor(parentNode, parentElement = {}) {
        super();
        this.el = parentNode;
        this.parentElement = parentElement;
        // 渲染完成，回调队列
        this._queueCallbacks = [];
        // 正在排队的渲染队列id
        this._queueId = null;

        this.virtualDom = null;

        // 模板 scope
        this.scope = parentElement.props || {};
        Object.keys(parentElement.dynamicProps || {}).forEach((attr)=>{
            this.scope[attr] = parentElement.dynamicProps[attr];
        });

        this.init();
        this.watch();
    }
    init(){}
    watch(){}

    mount(parentEl = this.el){
        if(this.refs && parentEl.appendChild){
            parentEl.appendChild(this.refs);
            this.emit('mount', this.refs);
        }
    }

    destroy(){
        if(this.$refs){
            this.$refs.remove();
            this.$refs = null;
        }
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
        if(this.virtualDom === null){
            this.virtualDom = virtualDom;
            this.refs = this.virtualDom.render();
            this.$refs = $(this.refs);
            this.mount();
        }
        else{
            let patches = diff(this.virtualDom, virtualDom);
            //先移除事件绑定
            if(this.$refs){
                this.$refs.off();
            }
            //更新dom
            patch(this.refs, patches);
            this.$refs = $(this.refs);
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

        return this.refs;
    }

    bindEvents(){
        if(!this.$refs){
            return;
        }
        const $ = util.get$();
        this.events = getEvents(this.virtualDom);

        Object.keys(this.events).forEach((eventName)=>{
            let eventData = this.events[eventName];
            this.$refs.on(eventName, (event)=>{
                var res = null;
                let target = event.target;
                $.each(eventData, (ix, ctx)=>{
                    if(ctx.target === target || $.contains(ctx.target, target)){
                        let callback = this[ctx.funName];
                        if(isFunction(callback)){
                            let args = [event, ctx.target];
                            ctx.args.forEach((v)=>{
                                args.push(v);
                            });
                            res = callback.apply(this, args);
                            return res;
                        }
                    }
                });
                return res;
            });
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
