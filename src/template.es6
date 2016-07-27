/**
 *
 * 模板渲染
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import util from './util';
import EventEmitter from './eventEmitter';

export default class Template extends EventEmitter {
    constructor(element) {
        this.element = element;
    }
    render(){
        if(this.element.tagName == '_textNode'){
            return document.createTextNode(this.element.dynamicProps.text);
        }
    }
}
