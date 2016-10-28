import Template from './template';
import Component from './component';
export default class Element {
    _component: Component | null;
    _noDiffChild: boolean;
    _binder: boolean;
    tagName: string;
    key: string;
    props: any;
    dynamicProps: any;
    children: Element[];
    events: {};
    parentElement: Element | null;
    view: any;
    count: number;
    template: Template;
    refs: HTMLElement;
    constructor(tagName: string, key: string, props?: {}, dynamicProps?: {}, children?: any[], events?: {}, view?: any);
    cloneElement(element: Element): void;
    render(): HTMLElement;
    destroy(notRemove?: boolean): void;
}
