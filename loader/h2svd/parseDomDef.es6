/**
 *
 * 解释 dom, 并生成 virtual-dom 定义
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import filter from './filter';
import util from 'util';
import parseAttr from './parseAttr';
import parseFor from './parseFor';
import parseText from './parseText';


/**
 * 解释并生成 virtual-dom 定义
 * @return Array
 */
export default (domAttr)=>{
    if(domAttr.type === 'text'){
        return parseText(domAttr);
    }
    let code = `function(__mc__rootScope, __mc__tree, __mc__util, __mc_path){

        %s

    }`;

    code = util.format(code, parseFor(domAttr));

    return code;
};
