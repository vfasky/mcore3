/**
 *
 * watch
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import EventEmitter from './eventEmitter'
import 'object.observe'
import 'array.observe'

import { isPlainObject, isArray, NextTick } from './util'

export default class Watch extends EventEmitter {
    private _watchReg: any
    private _watchTotal: number

    callback: any
    scope: any

    constructor(scope = {}, callback = (path: string) => { }) {
        super()

        let nextTickTime = null
        this.scope = scope

        this.callback = (path: string) => {
            if (nextTickTime) {
                NextTick.clear(nextTickTime)
            }
            nextTickTime = NextTick.next(() => {
                callback(path)
            })
            // console.log(path);
        }

        this._watchReg = {}
        this._watchTotal = 0
        this.watch(this.scope)

    }

    observer(changes: any[], x: any, path: string) {
        changes.forEach((change) => {

            let curPath = path + '.' + change.name
            this.emit('update', curPath, change.object)

            if (change.type === 'add') {
                this.watch(x[change.name], curPath)
            }
            else if (change.type === 'splice' && path != 'scope') {
                this.unwatchByPath(path)
                this.watch(x, path)
            }
            else if (change.type === 'delete') {
                this.unwatchByPath(curPath)
            }
            else if (change.type === 'update' || change.type === 'reconfigure') {
                this.unwatchByPath(curPath)
                this.watch(x[change.name], curPath)
            }
            else {
                console.log(change)
            }
        })
        this.callback(path)
    }

    unwatchByPath(path: string) {
        Object.keys(this._watchReg).reverse().forEach((key) => {
            if (key.indexOf(path + '.') === 0) {
                this._unwatchByPath(key)
            }
        })
        this._unwatchByPath(path)
    }

    _unwatchByPath(path: string) {
        let reg = this._watchReg[path]
        if (!reg) {
            return
        }
        if (reg.type === 'object') {
            (<any>Object).unobserve(reg.x, reg.observer)
        }
        else if (reg.type === 'array') {
            (<any>Array).unobserve(reg.x, reg.observer)
        }
        delete this._watchReg[path]
    }

    watch(x, path = 'scope') {
        let watchType = null
        if (isPlainObject(x)) {
            watchType = 'object'
        }
        else if (isArray(x)) {
            watchType = 'array'
        }
        if (!watchType) {
            return
        }

        // 已经在观察列表
        if (this._watchReg[path]) {
            return
        }
        this._watchReg[path] = {
            x: x,
            type: watchType,
            observer: (changes) => {
                this.observer(changes, x, path)
            }
        }

        this._watchTotal++

        if (watchType === 'object') {
            (<any>Object).observe(x, this._watchReg[path].observer)
            Object.keys(x).forEach((attr) => {
                let v = x[attr]
                this.watch(v, path + '.' + attr)
            })
        }
        else if (watchType === 'array') {
            (<any>Array).observe(x, this._watchReg[path].observer)
            x.forEach((v, i) => {
                this.watch(v, path + '.' + i)
            })
        }
    }

    unwatch() {
        Object.keys(this._watchReg).forEach((path) => {
            this.unwatchByPath(path)
        })
        this._watchReg = {}
    }
}
