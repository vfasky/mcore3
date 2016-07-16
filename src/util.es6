/**
 *
 * 工具类
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import $ from 'jquery';

export function isNumber(x){
    return $.isNumeric(x);
}

export function isArray(x){
    return $.isArray(x);
}

/**
 * 兼容 mcore 2
 */
export function isObject(x){
    return $.isPlainObject(x);
}

export function isPlainObject(x){
    return $.isPlainObject(x);
}

export function extend(x){
    if(isArray(x)){
        return $.extend(true, [], x);
    }
    return $.extend(true, {}, x);
}

/**
 * 放到下一帧执行
 */
export function nextTick(fun){
    if(window.requestAnimationFrame){
        return requestAnimationFrame(()=>{
            fun();
        });
    }
    else{
        return setTimeout(()=>{
            fun();
        }, 0);
    }
}
nextTick.clear = (id)=>{
    if(window.requestAnimationFrame){
        return cancelAnimationFrame(id);
    }
    else{
        return clearTimeout(id);
    }
};
