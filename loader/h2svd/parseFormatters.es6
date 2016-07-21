/**
 *
 * 解释过滤函数
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import util from 'util';

let _formattersArgsReg = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;

export default (name, dynamicVal, dynamicAttrName, utilName = '__mc__util')=>{
    let funcs = dynamicVal.split(' | ');
    let startVal = funcs.shift();

    let code = `
        ${dynamicAttrName}['${name}'] = (function(x){
            %s
            return x;
        })(${startVal});
    `;

    let formatterCode = '';

    funcs.forEach((fun)=>{
        let args = [];
        let isHasTag = false;
        fun = String(fun);

        if(fun.indexOf('(') == -1){
            fun.replace(_formattersArgsReg, (v)=>{
                if(v === ']' && args.length > 2){
                    let _attr = args.pop();
                    args[args.length - 1] = args[args.length - 1] + _attr + v;
                }
                else{
                    args.push(v);
                }
            });
        }
        else{
            fun.split(' ').forEach((v)=>{
                let val = v.trim();
                if(val.length > 0){
                    args.push(val.replace(/\\'/g, '__00__').replace(/\\"/g, '__01__'));
                }
            });
            // 处理 xx xx
            let mIx = -1;
            args.forEach((v, k)=>{
                if(mIx == -1 && v.indexOf("'") === 0 && v.slice(1).indexOf("'") == -1){
                    mIx = k;
                }
                else if(mIx != -1 && v.indexOf("'") != -1){
                    let strVal = [];
                    for(let i = mIx; i < (k + 1); i++){
                        strVal.push(args[i]);
                        args[i] = '';
                    }
                    args[mIx] = strVal.join(' ');
                    mIx = -1;
                }
            });

            mIx = -1;
            args.forEach((v, k)=>{
                if(mIx === -1 && v.indexOf('"') === 0 && v.slice(1).indexOf('"') === -1){
                    mIx = k;
                }
                else if(mIx !== -1 && v.indexOf('"') !== -1){
                    let strVal = [];
                    for(let i = mIx; i < (k + 1); i++){
                        strVal.push(args[i]);
                        args[i] = '';
                    }
                    args[mIx] = strVal.join(' ');
                    mIx = -1;
                }
            });

            args = args.filter((v)=>{
                return v.length > 0;
            }).map((v)=>{
                v = v.replace(/__00__/g, "\\'").replace(/__01__/g, '\\"');
                if(v.slice(-1) === ','){
                    v = v.slice(0, v.length - 1);
                }
                return v;
            });
        }

        let formatter = args[0];
        args[0] = 'x';

        formatterCode += `
            x = ${utilName}.callFormatter('${formatter}')(${args.join(',')});
        `;
    });

    return util.format(code, formatterCode);
};
