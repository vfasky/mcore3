/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference types="eventemitter3" />
import EventEmitter from './eventEmitter';
import * as util from './util';
import Element from './element';
import Watch from './watch';
export default class Component extends EventEmitter {
    private _queueCallbacks;
    private _queueId;
    private _regEvents;
    private _initWatchScope;
    id: number;
    watchScope: Watch;
    parentNode: HTMLElement;
    el: HTMLElement;
    refs: HTMLElement;
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
    constructor(parentNode: HTMLElement, parentElement?: any, args?: {});
    beforeInit(): void;
    init(): void;
    watch(): void;
    mount(parentEl?: HTMLElement): void;
    destroy(notRemove?: boolean): void;
    parentView(): any;
    emitEvent(eventName: string, args: any[]): void;
    renderQueue(doneOrAsync?: any): HTMLElement;
    private _render();
    callEvent(event: any, eventName: string): any;
    regEvent(eventName: any): void;
    unRegEvent(eventName: any): void;
    bindEvents(): void;
    set(attr: any, value: any, doneOrAsync?: any, isPromeisCallback?: boolean): any;
    get(attr: any, defaultVal?: any): any;
    remove(attr: any, doneOrAsync?: any): void;
    update(attr: any, value: any, status: any): void;
    render(virtualDomDefine: any, scope?: {}, doneOrAsync?: any): any;
}
