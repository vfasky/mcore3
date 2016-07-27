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
import {variable} from './config';

let buildArray = (domAttr, iName, vName)=>{
    let code = `
        ${variable.forArrayName}.forEach(function(${vName}, ${iName}){
            %s
                var ${variable.childrenName};
                %s
                ${build(domAttr, variable.pathName + ' + \'.\' + ' + iName)}
            %s
        });
    `;
    return util.format(code, ifBegin(domAttr), parseAttr(domAttr), ifEnd(domAttr));
};

let buildObject = (domAttr, kName, vName, oName)=>{
    let code = `
        ${variable.forObjKeysName}.forEach(function(${kName}, ${variable.forIName}){
            var ${vName} = ${oName}[${kName}];
            %s
                var ${variable.childrenName};
                %s
                ${build(domAttr, variable.pathName + ' + \'.\' + ' + variable.forIName)}
            %s
        });
    `;
    return util.format(code, ifBegin(domAttr), parseAttr(domAttr), ifEnd(domAttr));
};

export default (domAttr)=>{
    let code = '';

    if(!domAttr.attribs['mc-for']){
        code = `
            var ${variable.forArrayName} = [0];
            ${buildArray(domAttr, variable.forIName, variable.forVName)}
        `;
    }
    else{
        let forCode = domAttr.attribs['mc-for'];

        if(forCode.indexOf(' in ') !== -1){
            let iName = forCode.split(' in ').shift().indexOf(',') !== -1 ? forCode.split(',').pop().split(' in')[0].trim() : variable.forIxName;
            let vName = forCode.split(' ')[0].replace(',', '');
            code += `
                /* [for-in] ${domAttr.attribs['mc-for']} */
                var ${variable.forArrayName} = ${forCode.split(' in ').pop()};
                if(false == Array.isArray(${variable.forArrayName})){
                    ${variable.forArrayName} = [];
                }
                ${buildArray(domAttr, iName, vName)}
            `;
        }
        else if(forCode.indexOf(' of ') !== -1){
            let kName = forCode.split(' of ')[0];
            let oName = forCode.split(' of ').pop();
            let vName = variable.forVName;
            if(kName.indexOf(',') !== -1){
                vName = kName.split(',').pop();
                kName = kName.split(',')[0];
            }
            code += `
                /* [for-of] ${domAttr.attribs['mc-for']} */
                var ${variable.forObjKeysName} = Object.keys(${oName} || {});
                ${buildObject(domAttr, kName, vName, oName)}
            `;
        }
    }

    return code;
};
