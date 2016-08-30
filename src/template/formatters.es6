/**
 *
 * 过滤函数
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import {get$, isNumber} from '../util';
const $ = get$();

let formatters = {};

formatters.toNumber = (x)=>{
    if(isNumber(x)){
        return Number(x);
    }
    return 0;
};

formatters.toFixed = (x, len = 1)=>{
    return formatters.toNumber(x).toFixed(len);
};

formatters.in = (x, ...arr)=>{
    return arr.indexOf(x) !== -1;
};


formatters.objToStyle = (value)=>{
    let autoPx = ['width', 'height', 'left', 'top', 'right', 'bottom'];
    let css = [];

    Object.keys(value).forEach((key)=>{
        let val = value[key];
        if(autoPx.indexOf(key) !== -1 && isNumber(val)){
            val = val + 'px';
        }
        css.push(`${key}: ${val}`);
    });

    return css.join(';');
};

export default formatters;
