/**
 *
 * 路由
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import * as pathToRegexp from 'path-to-regexp'
import { isNumber, each } from './util'

export function pathToObject(path: string) {
    let url = String(path).trim()
    let argStr = ''
    let attr = []
    if (url.indexOf('?') !== -1) {
        argStr = url.split('?').pop()
    }
    else if (url.indexOf('&') !== -1) {
        argStr = url
    }

    if (argStr === '') {
        return {}
    }

    let args = argStr.split('&')
    let data = {}
    let keys = []

    args.forEach((v) => {
        if (v.indexOf('=') === -1) {
            return
        }
        let vArr = v.split('=')
        if (vArr.length !== 2) {
            return
        }

        let key = vArr[0].trim()
        let value = decodeValue(vArr[1])
        data[key] = value
    })

    return data
}

function decodeValue(value: any) {
    if (isNumber(value) && String(value).length < 14) {
        value = Number(value)
    }
    else if (value) {
        value = decodeURIComponent(value)
    }
    else {
        value = null
    }
    return value
}

interface RuleConfig {
    path: string,
    reg: RegExp,
    keys: any[],
    fn: any
}

export class Route {
    hashchange: any
    sensitive: boolean
    rule: RuleConfig[]

    static changeByLocationHash(emit) {
        let hashChanged = () => {
            emit(window.location.hash.substring(1))
        }
        if (window.addEventListener) {
            window.addEventListener('hashchange', hashChanged, false)
        }
        else if ((<any>window).attachEven) {
            (<any>window).attachEven('onhashchange', hashChanged)
        }
        else {
            throw new Error('window not support hashchange event')
        }
        hashChanged()
    }

    constructor(hashchange = Route.changeByLocationHash, sensitive = false) {
        this.hashchange = hashchange
        this.sensitive = sensitive
        this.rule = []
    }

    run() {
        this.hashchange((url) => {
            this.match(url)
        })
    }

    add(path, fn) {
        let keys = []
        let reg = pathToRegexp(path, keys, this.sensitive)
        this.rule.push({
            path: path,
            reg: reg,
            keys: keys,
            fn: fn
        })
        return this
    }

    toUrl(path, args = {}, options = {}) {
        return pathToRegexp.compile(path)(args, options)
    }

    match(url) {
        let path = String(url)
        let fullPath = path
        let argStr = ''
        let getIx = path.indexOf('?')
        let isMatch = false
        if (getIx === -1) {
            getIx = path.indexOf('&')
        }

        if (getIx !== -1) {
            argStr = path.substring(getIx)
            path = path.substring(0, getIx)
        }

        each(this.rule, (v) => {
            let res = v.reg.exec(path)
            if (res === null) {
                return
            }
            isMatch = true
            let context = pathToObject(argStr)
            let data = {}
            let args = []
            for (let i = 1, len = res.length; i < len; i++) {
                let k = v.keys[i - 1]
                let value = decodeValue(res[i])

                if (k && k.name) {
                    data[k.name] = value
                }
                args.push(value)
            }

            if (isMatch) {
                let env = {
                    url: fullPath,
                    path: path,
                    args: argStr,
                    rule: v.path,
                    context: context,
                    keys: v.keys,
                    data: data
                    // compile: pathToRegexp.compile(v.path),
                }
                v.fn.apply(env, args)
                return false
            }
        })

        return this
    }
}
