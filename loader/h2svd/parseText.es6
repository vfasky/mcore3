/**
 *
 * 解释文本
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import parseFormatters from './parseFormatters';

let _signReg = /\{([^}]+)\}/g;
let _strEndReg = /[^]+""$/;

export default (domAttr)=>{
    domAttr.data = domAttr.data.replace(/\n/g, ' ');
    let text = domAttr.data;
    let code = 'function(__mc__rootScope, __mc__tree, __mc__util, __mc_path, __mc__ctx){';

    if(_signReg.test(text)){
        code += 'var __mc_str_val = {}';
        let mapTree = [];
        let mapTreeId = 0;
        let runtimeCode = text.replace(_signReg, (key, val)=>{
            let reKey = `rp_${mapTreeId++}`;
            mapTree.push({
                key: reKey,
                val: val
            });
            return `" + __mc_str_val['${reKey}'] + "`;
        });

        runtimeCode = '"' + runtimeCode;
        if(false === _strEndReg.test(runtimeCode)){
            runtimeCode += '"';
        }

        mapTree.forEach((v)=>{
            code += parseFormatters(v.key, v.val, '__mc_str_val');
        });

        code += `
            /* [formatter] ${text.trim()} */
            var __mc_str = ${runtimeCode};
            __mc__tree.push(__mc_str, __mc_path);
        `;

    }
    else{
        code += `
            __mc__tree.push('${text}', __mc_path);
        `;
    }

    return code + '}';
};
