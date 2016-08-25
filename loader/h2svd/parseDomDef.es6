/**
 *
 * 解释 dom, 并生成 virtual-dom 定义
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import filter from './filter';
import parseFor from './parseFor';
import parseText from './parseText';
import {variable} from './config';


/**
 * 解释并生成 virtual-dom 定义
 * @return Array
 */
export default (domAttr)=>{
    if(domAttr.type === 'text'){
        return parseText(domAttr);
    }
    let code = `function(${variable.scopeName}, ${variable.treeName}, ${variable.pathName}){
        
        ${parseFor(domAttr)}
    }`;

    return code;
};
