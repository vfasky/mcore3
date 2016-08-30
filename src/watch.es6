/**
 *
 * watch
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

require('object.observe');
require('array.observe');

import {isPlainObject, isArray, nextTick} from './util';

export default class Watch {
    constructor(scope = {}, callback = ()=>{}) {
        let nextTickTime = null;
        this.scope = scope;

        this.callback = (path)=>{
            if(nextTickTime){
                nextTick.clear(nextTickTime);
            }
            nextTickTime = nextTick(()=>{
                callback(path);
            });
            // console.log(path);
        };

        this._watchReg = {};
        this._watchTotal = 0;
        this.watch(this.scope);
    }

    observer(changes, x, path){
        // console.log(changes,x, path);
        changes.forEach((change)=>{
            let curPath = path + '.' + change.name;
            // console.log(change, x, path);
            if(change.type === 'add'){
                this.watch(x[change.name], curPath);
            }
            else if(change.type === 'splice' && path != 'scope'){
                this.unwatchByPath(path);
                this.watch(x, path);
                // console.log(this._watchReg[path]);
            }
            else if(change.type === 'delete'){
                this.unwatchByPath(curPath);
            }
            // else if(['reconfigure', 'update', 'splice'].indexOf(change.type) !== -1){
            else if(change.type === 'update' || change.type === 'reconfigure'){
                this.unwatchByPath(curPath);
                this.watch(x[change.name], curPath);
            }
            else{
                console.log(change);
            }
        });
        // console.log(path, changes);
        this.callback(path);
    }

    unwatchByPath(path){
        Object.keys(this._watchReg).reverse().forEach((key)=>{
            if(key.indexOf(path + '.') === 0){
                // console.log(key);
                this._unwatchByPath(key);
            }
        });
        this._unwatchByPath(path);
    }

    _unwatchByPath(path){
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

    watch(x, path = 'scope'){
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
