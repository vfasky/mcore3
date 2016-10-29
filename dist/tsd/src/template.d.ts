/// <reference types="eventemitter3" />
import EventEmitter from './eventEmitter';
import Element from './element';
export default class Template extends EventEmitter {
    static components: {};
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
    static formatters: {
        toNumber: (x: any) => number;
        toFixed: (x: any, len?: number) => number;
        in: (x: any, ...arr: any[]) => boolean;
        objToStyle: (value: any) => string;
    };
    static strToFun: (el: any, value: string) => () => void;
    static getEnv: (el: any) => any;
    private _isWatchEvent;
    element: Element;
    refs: HTMLInputElement;
    constructor(element: any);
    destroy(notRemove?: boolean): void;
    render(): any;
    callBinder(binder: any, status: string, value: any, attrValue?: any): void;
    update(attr: string, value: any, status: any): void;
    setAttr(attr: string, value: any, isDynamic?: boolean, status?: string): void;
}
