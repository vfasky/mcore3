/**
 *
 * 工具类
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

// import $ from 'jquery';
let $;
let _isIOS = null;
let _isWeixinBrowser = null;

export function isIOS(){
    if(_isIOS === null){
        _isIOS = (/iphone|ipad/gi).test(window.navigator.appVersion);
    }
    return _isIOS;
}

export function isWeixinBrowser() {
    if(_isWeixinBrowser === null){
        _isWeixinBrowser = (/MicroMessenger/i).test(window.navigator.userAgent);
    }
    return _isWeixinBrowser;
}

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

export function each(arr, callback){
    get$().each(arr, (k, v)=>{
        return callback(v, k);
    });
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

export function getEvents(element, events = {}){
    if(element.children){
        element.children.forEach((child)=>{
            getEvents(child, events);
        });
    }

    Object.keys(element.events).forEach((name)=>{
        let curEvent = element.events[name];
        if(!events.hasOwnProperty(name)){
            events[name] = [];
        }
        events[name].push({
            funName: curEvent.funName,
            args: curEvent.args,
            target: ()=> {
                // console.log(element);
                return element.refs;
            },
            element: element,
        });
    });

    return events;
}

export function getComponents(element, components = []){
    if(!element){
        return components;
    }
    if(element.children){
        element.children.forEach((child)=>{
            getComponents(child, components);
        });
    }

    if(element._component){
        components.push(element._component);
    }

    return components;
}

export function getObjAttrByPath(path, obj = {}){
    if(path.indexOf('.') === -1){
        return obj[path];
    }
    let pathArr = path.split('.');
    let curObj = obj;

    each(pathArr, (curPath)=>{
        if(isNumber(curPath) && isArray(curObj)){
            let ix = parseInt(curPath);
            if(ix < curObj.length){
                curObj = curObj[ix];
                return;
            }
            else{
                curObj = null;
                return false;
            }
        }
        else if(isObject(curObj) && curObj.hasOwnProperty(curPath)){
            curObj = curObj[curPath];
            return;
        }
        else{
            curObj = null;
            return false;
        }
    });

    return curObj;
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
