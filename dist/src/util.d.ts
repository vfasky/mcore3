/// <reference types="jquery" />
export declare function isIOS(): boolean;
export declare function isWeixinBrowser(): boolean;
export declare function get$(): JQueryStatic;
export declare function each(arr: any[], callback: any): void;
export declare function isNumber(x: any): boolean;
export declare function isArray(x: any): boolean;
export declare function isString(x: any): boolean;
export declare function type(x: any): string;
export declare function isFunction(x: any): boolean;
export declare function isObject(x: any): boolean;
export declare function isPlainObject(x: any): boolean;
export declare function clone(x: any): any;
export declare function extend(x: any): any;
export declare function getEvents(element: any, events?: any): {};
export declare function getComponents(element: any, components?: any[]): any[];
export declare function getObjAttrByPath(path: string, obj?: {}): any;
export declare function parseDynamicVal(dynamicCode: any, dynamicCodeStr: string, view: any): any;
export declare function callFormatter(formatterName: string, mcore: any): any;
export declare function nodeListToArray(nodeList: NodeList): any[];
export declare class NextTick {
    static requestAnimationFrame(): typeof requestAnimationFrame;
    static cancelAnimationFrame(): typeof cancelAnimationFrame;
    static next(fun: any): number;
    static clear(id: number): void;
}
