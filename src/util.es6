/**
 *
 * 工具类
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

// import $ from 'jquery';
let $;

export function get$(){
    if($){
        return $;
    }
    if(window.$){
        $ = window.$;
        return window.$;
    }
    $ = require('jquery');
    return $;
}


export function isNumber(x){
    return get$().isNumeric(x);
}

export function isArray(x){
    return get$().isArray(x);
}

export function isString(x){
    return get$().type(x) === 'string';
}

export function type(x){
    return get$().type(x);
}

export function isFunction(x){
    return get$().isFunction(x);
}

/**
 * 兼容 mcore 2
 */
export function isObject(x){
    return get$().isPlainObject(x);
}

export function isPlainObject(x){
    return get$().isPlainObject(x);
}

export function extend(x){
    if(isArray(x)){
        return get$().extend(true, [], x);
    }
    return get$().extend(true, {}, x);
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
