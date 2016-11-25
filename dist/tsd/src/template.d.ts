/// <reference types="eventemitter3" />
import EventEmitter from './eventEmitter';
import Element from './element';
/**
 * 模板引擎
 */
export default class Template extends EventEmitter {
    /**
     * 绑定的自定义组件
     */
    static components: {};
    /**
     * binders
     */
    static binders: {
        checked: (el: HTMLInputElement, value: any) => void;
        disabled: (el: HTMLInputElement, value: any) => void;
        focus: (el: any, value: any) => void;
        blur: (el: any, value: any) => void;
        html: (el: any, value: any) => void;
        'no-diff-child': (el: any, value: any) => void;
        'class-*': (el: HTMLElement, value: boolean, attrValue: string) => void;
        'form-load-data': {
            init: (el: any, data?: {}) => any;
        };
        'form-sync': {
            init: (el: any, dataKey: any) => any;
        };
    };
    /**
     * 过滤函数
     */
    static formatters: {
        toNumber: (x: any) => number;
        toFixed: (x: any, len?: number) => number;
        in: (x: any, ...arr: any[]) => boolean;
        objToStyle: (value: any) => string;
    };
    /**
     * 通过 function name 取 function
     */
    static strToFun: (el: any, value: string) => () => void;
    /**
     * 取模板对应的 view
     */
    static getEnv: (el: any) => any;
    /**
     * 标记是否监听事件
     */
    private _isWatchEvent;
    /**
     * mcore element
     */
    element: Element;
    /**
     * 真实 DOM
     */
    refs: HTMLInputElement;
    constructor(element: any);
    destroy(notRemove?: boolean): void;
    /**
     * 渲染 node
     * @method render
     * @return {Element}
     */
    render(): any;
    /**
     * 调用自定义属性
     */
    callBinder(binder: any, status: string, value: any, attrValue?: any): void;
    /**
     * 通知更新的值
     */
    update(attr: string, value: any, status: any): void;
    /**
     * 设置 node 属性
     */
    setAttr(attr: string, value: any, isDynamic?: boolean, status?: string): void;
}
