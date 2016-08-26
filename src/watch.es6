/**
 *
 * watch
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

require('object.observe');
require('array.observe');

import {isPlainObject, isArray} from './util';

export default class Watch {
    constructor(scope = {}, callback = ()=>{}) {
        this.scope = scope;
        this.callback = callback;

        this._watchReg = {};
        this._watchTotal = 0;
        this.watch(this.scope);
    }

    observer(changes, x, path){
        changes.forEach((change)=>{
            let curPath = path + '.' + change.name;
            // console.log(change, x, path);
            if(change.type === 'add'){
                this.watch(x[change.name], curPath);
            }
            if(change.type === 'splice'){
                this.unwatchByPath(path);
                this.watch(x, path);
            }
            else if(change.type === 'delete'){
                this.unwatchByPath(curPath);
            }
            else if(['reconfigure', 'update', 'splice'].indexOf(change.type) !== -1){
                this.unwatchByPath(curPath);
                this.watch(x[change.name], curPath);
            }
        });
        this.callback(path);
    }

    unwatchByPath(path){
        let reg = this._watchReg[path];
        if(!reg){
            return;
        }
        if(reg.type === 'object'){
            Object.unobserve(reg.x, reg.observer);
        }
        else if(reg.type === 'array'){
            Array.unobserve(reg.x, reg.observer);
        }
        delete this._watchReg[path];
    }

    watch(x, path = ''){
        let watchType = null;
        if(isPlainObject(x)){
            watchType = 'object';
        }
        else if(isArray(x)){
            watchType = 'array';
        }
        if(!watchType){
            return;
        }

        // 已经在观察列表
        if(this._watchReg[path]){
            return;
        }
        this._watchReg[path] = {
            x: x,
            type: watchType,
            observer: (changes)=>{
                this.observer(changes, x, path);
            }
        };

        this._watchTotal++;

        if(watchType === 'object'){
            Object.observe(x, this._watchReg[path].observer);
            Object.keys(x).forEach((attr)=>{
                let v = x[attr];
                this.watch(v, path + '.' + attr);
            });
        }
        else if(watchType === 'array'){
            Array.observe(x, this._watchReg[path].observer);
            x.forEach((v, i)=>{
                this.watch(v, path + '.' + i);
            });
        }
    }

    unwatch(){
        Object.keys(this._watchReg).forEach((path)=>{
            this.unwatchByPath(path);
        });
        this._watchReg = {};
    }
}
