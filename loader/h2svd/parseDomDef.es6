/**
 *
 * 解释 dom, 并生成 virtual-dom 定义
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import filter from './filter';
import util from 'util';
import parseAttr from './parseAttr';
/**
 * 解释并生成 virtual-dom 定义
 * @return Array
 */
export default (domAttr)=>{

    let code = `function(__mc__rootScope, __mc__tree, __mc__util, __mc_path, __mc__ctx){
        var __mc__children = [];
        var __mc__attr = {};
        // parseAttr
        %s
        // parseFor

        // parseIf, parseUnless

    }`;

    code = util.format(code, parseAttr(domAttr));

    return code;
};
