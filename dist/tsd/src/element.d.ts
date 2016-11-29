import Template from './template';
import Component from './component';
/**
 * mcore element
 */
export default class Element {
    /**
     * 绑定的组件实例
     */
    _component: Component | null;
    /**
     * 不 diff 节元素
     */
    _noDiffChild: boolean;
    /**
     * 是否有绑定 binder
     */
    _binder: boolean;
    tagName: string;
    key: string;
    /**
     * 静态属性
     */
    props: any;
    /**
     * 动态属性
     */
    dynamicProps: any;
    /**
     * 子元素
     */
    children: Element[];
    /**
     * 事件
     */
    events: {};
    /**
     * 父节点
     */
    parentElement: Element | null;
    /**
     * 所属的view
     */
    view: any;
    /**
     * 子节点数量
     */
    count: number;
    /**
     * 模板引擎实例
     */
    template: Template;
    /**
     * 真实 DOM
     */
    refs: MCElement;
    constructor(tagName: string, key: string, props?: {}, dynamicProps?: {}, children?: any[], events?: {}, view?: any);
    /**
     * 复制已经渲染的 element
     */
    cloneElement(element: Element): MCElement;
    render(): MCElement;
    destroy(notRemove?: boolean): void;
}
export interface MCElement extends HTMLInputElement {
    _element: Element;
}
