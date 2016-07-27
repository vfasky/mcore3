/**
 *
 * mcore element
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";
import Template from './template';

export default class Element {
    constructor(tagName, key, props = {}, dynamicProps = {}, children = [], events = {}) {
        this.tagName = tagName.trim().toLowerCase();
        this.key = key;
        //静态属性
        this.props = props;
        this.props._key = key;
        //动态属性
        this.dynamicProps = dynamicProps;
        //子元素
        this.children = children;
        //事件
        this.events = events;

        //上级 element
        this.parentElement = null;


        let count = 0;
        children.forEach((child, i)=>{
            if(child instanceof Element){
                //指定上级
                child.parentElement = this;
                count += child.count;
            }
            else{
                this.children[i] = String(child);
            }
            count++;
        });
        //子节点数量
        this.count = count;
    }

    render(){
        this.template = new Template(this);
        this.template.render();
    }
}
