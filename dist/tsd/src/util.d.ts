/// <reference types="jquery" />
import Element from './element';
/**
 * 是否 ios
 */
export declare function isIOS(): boolean;
/**
 * 是否运行在微信里
 */
export declare function isWeixinBrowser(): boolean;
/**
 * 返回一个 jquery
 */
export declare function get$(): JQueryStatic;
/**
 * 遍历数组
 * @param arr 要遍历的数组
 * @param {function} callback 回调函数
 */
export declare function each(arr: any[], callback: any): void;
/**
 * 是否数组
 * @param x 要检查的变量
 */
export declare function isNumber(x: any): boolean;
/**
 * 是否数组
 * @param x 要检查的变量
 */
export declare function isArray(x: any): boolean;
/**
 * 是否文本
 * @param x 要检查的变量
 */
export declare function isString(x: any): boolean;
/**
 * 返回类型
 * @param x 要检查的变量
 */
export declare function type(x: any): string;
/**
 * 是否函数
 * @param x 要检查的变量
 */
export declare function isFunction(x: any): boolean;
/**
 * 是否一个简单对象
 * @param x 要检查的变量
 */
export declare function isObject(x: any): boolean;
/**
 * 是否一个简单对象
 * @param x 要检查的变量
 */
export declare function isPlainObject(x: any): boolean;
/**
 * clone 对象
 * @param x 要 clone 的变量
 */
export declare function clone(x: any): any;
export declare function extend(x: any): any;
/**
 * 取 mcore element 的所有事件 （含子树）
 * @param element mcore Element
 * @param events 事件数据
 */
export declare function getEvents(element: any, events?: any): {};
/**
 * 如果组件指定 mc-children-container="true", 返回特定 MCElement
 */
export declare function getComponentsContainer(elements: Element[], maxLevel?: number, level?: number): Element | null;
/**
 * 取 mcore element 的所有组件 （含子树）
 * @param element mcore Element
 * @param components 组件列表
 */
export declare function getComponents(element: any, components?: any[]): any[];
/**
 * 根据属性路径从对象中取值
 * @param path 属性路径
 * @param obj 对象
 */
export declare function getObjAttrByPath(path: string, obj?: {}): any;
/**
 * 解释动态值
 * @param dynamicCode 动态表达式
 * @param dynamicCodeStr 静态代码
 * @param view 对应的 view
 */
export declare function parseDynamicVal(dynamicCode: any, dynamicCodeStr: string, view: any): any;
/**
 * 调用过滤函数
 * @param formatterName 函数名
 * @param mcore
 */
export declare function callFormatter(formatterName: string, mcore: any): any;
/**
 * NodeList to Array
 */
export declare function nodeListToArray(nodeList: NodeList): any[];
/**
 * 放到下一帧执行
 */
export declare class NextTick {
    static requestAnimationFrame(): typeof requestAnimationFrame;
    static cancelAnimationFrame(): typeof cancelAnimationFrame;
    /**
     * 放到下一帧执行
     * @param {function} fun 任务
     * @return 任务id
     */
    static next(fun: any): number;
    /**
     * 清除需要下一帧执行的任务
     * @param id 任务id
     */
    static clear(id: number): void;
}
