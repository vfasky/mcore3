/**
 *
 * 模板自定义属性
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

let binders = {};

binders.show = (el, value)=>{
    el.style.display = value ? '' : 'none';
};

binders.hide = (el, value)=>{
    el.style.display = value ? 'none' : '';
};

binders.checked = (el, value)=>{
    el.checked = value ? true : false;
};

binders.disabled = (el, value)=>{
    el.disabled = value ? true : false;
};

binders.focus = (el, value)=>{
    if(el.focus && value){
        el.focus();
    }
    else if(el.blur && !value){
        el.blur();
    }
};

binders.blur = (el, value)=>{
    if(el.focus && !value){
        el.focus();
    }
    else if(el.blur && value){
        el.blur();
    }
};

binders.html = (el, value)=>{
    el.innerHTML = value ? value : '';
    el._element._noDiffChild = true;
};

// 声明不要diff子节点
binders['no-diff-child'] = (el, value)=>{
    el._element._noDiffChild = value ? true : false;
};

binders['class-*'] = (el, value, attrValue)=>{
    let classNames = String(el.className || '').split(' ').filter((name)=>{
        return name.trim().length;
    }).map((name)=>{
        return name.trim();
    });
    let ix = classNames.indexOf(attrValue);
    if(!value){
        if(ix !== -1){
            classNames.splice(ix, 1);
            el.className = classNames.join(' ');
        }
    }
    else{
        if(ix == -1){
            classNames.push(attrValue);
            el.className = classNames.join(' ');
        }
    }
};


export default binders;
