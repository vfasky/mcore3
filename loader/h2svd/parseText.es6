/**
 *
 * 解释文本
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import parseFormatters from './parseFormatters';
import {variable} from './config';

let _signReg = /\{([^}]+)\}/g;
let _strEndReg = /[^]+""$/;

export default (domAttr)=>{
    domAttr.data = domAttr.data.replace(/\n/g, ' ');
    let text = domAttr.data;
    let code = `function(${variable.scopeName}, ${variable.treeName}, ${variable.pathName}){`;

    if(_signReg.test(text)){
        code += `var ${variable.strValsName} = {}`;
        let mapTree = [];
        let mapTreeId = 0;
        let runtimeCode = text.replace(_signReg, (key, val)=>{
            let reKey = `rp_${mapTreeId++}`;
            mapTree.push({
                key: reKey,
                val: val
            });
            return `" + ${variable.strValsName}['${reKey}'] + "`;
        });

        runtimeCode = '"' + runtimeCode;
        if(false === _strEndReg.test(runtimeCode)){
            runtimeCode += '"';
        }

        mapTree.forEach((v)=>{
            code += parseFormatters(v.key, v.val, variable.strValsName);
        });

        code += `
            /* [formatter] ${text.trim()} */
            var ${variable.strName} = ${runtimeCode};
            var ${variable.dynamicAttrName} = {text: ${variable.strName}};
            ${variable.treeName}.push(${variable.utilName}.build(
                '_textNode', ${variable.pathName}, {},
                ${variable.dynamicAttrName}, {}, []}
            ));
        `;

    }
    else{
        // code += `
        //     ${variable.treeName}.push('${text}');
        // `;
        code += `
            var ${variable.attrName} = {text:'${text}'};
            ${variable.treeName}.push(${variable.utilName}.build('_textNode', ${variable.pathName}, ${variable.attrName}));
        `;
    }

    return code + '}';
};
