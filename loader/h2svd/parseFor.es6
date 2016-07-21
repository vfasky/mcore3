/**
 *
 * 解释 for 标签
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import build from './build';
import util from 'util';
import parseAttr from './parseAttr';
import {begin as ifBegin, end as ifEnd} from './parseIf';

let buildArray = (domAttr, iName, vName, pathName, treeName, childrenName, attrName, dynamicAttrName)=>{
    let code = `
        __mc__forArr.forEach(function(${vName}, ${iName}){
            %s
                var ${childrenName};
                %s
                ${build(domAttr, pathName + ' + \'.\' + ' + iName, treeName, childrenName, attrName, dynamicAttrName)}
            %s
        });
    `;
    return util.format(code, ifBegin(domAttr), parseAttr(domAttr), ifEnd(domAttr));
};

let buildObject = (domAttr, kName, vName, oName, pathName, treeName, childrenName, attrName, dynamicAttrName)=>{
    let code = `
        __mc__objKeys.forEach(function(${kName}, __mc__i){
            var ${vName} = ${oName}[${kName}];
            %s
                var ${childrenName};
                %s
                ${build(domAttr, pathName + ' + \'.\' + __mc__i', treeName, childrenName, attrName, dynamicAttrName)}
            %s
        });
    `;
    return util.format(code, ifBegin(domAttr), parseAttr(domAttr), ifEnd(domAttr));
};

export default (domAttr, pathName = '__mc_path', treeName = '__mc__tree', childrenName = '__mc__children',
                attrName = '__mc__attr', dynamicAttrName = '__mc__dynamicAttr')=>{
    let code = '';

    if(!domAttr.attribs['mc-for']){
        code = `
            var __mc__forArr = [0];
            ${buildArray(domAttr, '__mc__$ix_', '__mc__$vn_', pathName, treeName, childrenName, attrName, dynamicAttrName)}
        `;
    }
    else{
        let forCode = domAttr.attribs['mc-for'];

        if(forCode.indexOf(' in ') !== -1){
            let iName = forCode.split(' in ').shift().indexOf(',') !== -1 ? forCode.split(',').pop().split(' in')[0].trim() : '__mc__$ix_';
            let vName = forCode.split(' ')[0].replace(',', '');
            code += `
                /* [for-in] ${domAttr.attribs['mc-for']} */
                var __mc__forArr = ${forCode.split(' in ').pop()};
                if(false == Array.isArray(__mc__forArr)){
                    __mc__forArr = [];
                }
                ${buildArray(domAttr, iName, vName, pathName, treeName, childrenName, attrName, dynamicAttrName)}
            `;
        }
        else if(forCode.indexOf(' of ') !== -1){
            let kName = forCode.split(' of ')[0];
            let oName = forCode.split(' of ').pop();
            let vName = '__mc__$vn_';
            if(kName.indexOf(',') !== -1){
                vName = kName.split(',').pop();
                kName = kName.split(',')[0];
            }
            code += `
                /* [for-of] ${domAttr.attribs['mc-for']} */
                var __mc__objKeys = Object.keys(${oName} || {});
                ${buildObject(domAttr, kName, vName, oName, pathName, treeName, childrenName, attrName, dynamicAttrName)}
            `;
        }
    }

    return code;
};
