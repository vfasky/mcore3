/**
 *
 * 将 html 解释成 virtual-dom 的定义
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import htmlparser from 'htmlparser2';
import {js_beautify as beautify} from 'js-beautify';
import filter from './filter';
import paseDomDef from './parseDomDef';

export default (html, options = {})=>{
    let domTree = filter(htmlparser.parseDOM(html,{
        decodeEntities: true
    }));

    let forCode = '';

    domTree.forEach((domAttr, k)=>{
        console.log(domAttr);
        forCode += '(' + paseDomDef(domAttr) +')(__mc__scope, __mc__tree, __mc__util, \''+ k +'\' {});\n';
    });

    let code = `
        (function(__mc__scope){
            var __mc__tree = [];
            ${forCode}
        })(scope);
    `;

    code = beautify(code,{
        indent_size: 4
    });
    console.log(code);
};
