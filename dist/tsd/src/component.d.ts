/// <reference types="eventemitter3" />
import EventEmitter from './eventEmitter';
import * as util from './util';
import Element from './element';
import { MCElement } from './element';
import Watch from './watch';
export default class Component extends EventEmitter {
    private _queueCallbacks;
    private _queueId;
    private _regEvents;
    private _initWatchScope;
    id: number;
    watchScope: Watch;
    parentNode: MCElement | HTMLElement;
    el: HTMLElement;
    refs: MCElement;
    parentElement: Element;
    virtualDom: Element;
    scope: any;
    virtualDomDefine: any;
    events: any;
    $win: any;
    $body: any;
    $refs: any;
    util: typeof util;
    nextTick: typeof util.NextTick;
    isWeixinBrowser: boolean;
    isIOS: boolean;
    constructor(parentNode: MCElement | HTMLElement, parentElement?: any, args?: {});
    beforeInit(): any;
    init(): any;
    watch(): any;
    /**
     * 取自定义组件子自的子节点
     */
    getSoureChildrens(): Element[];
    mount(parentEl?: MCElement | HTMLElement): void;
    destroy(notRemove?: boolean): any;
    /**
     * 取调用自定组件的上级view
     */
    parentView(): any;
    /**
     * 触发组件的自定义事件
     */
    emitEvent(eventName: string, args: any[]): void;
    /**
     * 放入渲染队列
     */
    renderQueue(doneOrAsync?: any): MCElement;
    /**
     * 真实的渲染操作
     * @method _render
     * @return {[type]} [description]
     */
    private _render();
    callEvent(event: any, eventName: string): any;
    regEvent(eventName: any): void;
    unRegEvent(eventName: any): void;
    bindEvents(): void;
    /**
     * 更新 scope
     * @method set
     * @param  {String} attr
     * @param  {Mixed} value
     * @param  {Function | Boolean} doneOrAsync
     */
    set(attr: any, value: any, doneOrAsync?: any, isPromeisCallback?: boolean): any;
    /**
     * 取 scope 值， 兼容 mcore2
     * @method get
     * @param  {String} attr
     * @param  {Mixed} defaultVal = null
     * @return {Mixed}
     */
    get(attr: any, defaultVal?: any): any;
    /**
     * 移除属性
     * @method remove
     * @param  {String} attr
     * @param  {Mixed} doneOrAsync = null
     * @return {Void}
     */
    remove(attr: any, doneOrAsync?: any): void;
    /**
     * 对外接口
     * @method update
     * @param  {String} attr
     * @param  {Mixed} value
     * @param  {String} status
     * @return {Void}
     */
    update(attr: any, value: any, status: any): void;
    render(virtualDomDefine: any, scope?: {}, doneOrAsync?: any): any;
}
