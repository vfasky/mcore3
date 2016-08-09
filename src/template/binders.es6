/**
 *
 * 模板自定义属性
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";
import {get$} from '../util';

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

binders['load-data'] = {
    init:(el, data)=>{
        if(el.tagName.toLowerCase() !== 'form' || !el._element){
            return el.setAttribute('load-data', data);
        }
        let $ = get$();
        let $form = $(el);
        Object.keys(data).forEach((k)=>{
            let v = data[k];
            let $el = $form.find(`[name=${k}]`);
            if($el.is('[type=checkbox],[type=radio]')){
                $el.prop('checked', String($el.val()) == String(v));
            }
            else{
                $el.val(v);
            }
        });
    }
};

binders.sync = {
    init:(el, dataKey)=>{
        if(el.tagName.toLowerCase() !== 'form' || !el._element || !el._element.view){
            return el.setAttribute('symc', dataKey);
        }
        let view = el._element.view;
        let $ = get$();
        let $form = $(el);

        $form.on('change', '[name]', function(){
            let $el = $(this);
            let name = $el.attr('name');
            if(name && view.scope[dataKey]){
                if($el.is('[type=checkbox],[type=radio]')){
                    let val = $el.prop('checked') ? this.value : '';
                    view.scope[dataKey][name] = val;
                }
                else{
                    view.scope[dataKey][name] = this.value;
                }
            }
        });
    }
};

export default binders;
