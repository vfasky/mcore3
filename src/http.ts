/**
 *
 * http
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import { get$ } from './util'

// 兼容mcore2
if (typeof (<any>Promise.prototype).done == 'undefined') {
    (<any>Promise.prototype).done = function (onFulfilled, onRejected) {
        return this.then(onFulfilled, onRejected).catch(function (error) {
            setTimeout(function () {
                throw error
            }, 0)
        })
    }
}

if (typeof (<any>Promise.prototype).fail == 'undefined') {
    (<any>Promise.prototype).fail = function (onResolveOrReject) {
        return this.then(function () { }, onResolveOrReject).catch(function (error) {
            throw error
        })
    }
}

if (typeof (<any>Promise.prototype).always == 'undefined') {
    (<any>Promise.prototype).always = function (onResolveOrReject) {
        return this.then(onResolveOrReject, function (reason) {
            onResolveOrReject(reason)
            throw reason
        })
    }
}

let _networkErrCallback = (xhr, status, hideError: boolean = false) => {
    let msg = 'Network Error'
    let $ = get$()

    // 后端是否返回错误信息
    if (xhr.responseText)
        try {
            let res = $.parseJSON(xhr.responseText)
            if (res.error) {
                msg = res.error
            }
        }
        catch (error) { }

    let httpCode = xhr.statusCode().status

    if (httpCode) {
        msg = msg + ' ( code: ' + httpCode + ' )'
    }

    // 是否需要隐藏
    if (!hideError) {
        if (window.alert) {
            window.alert(msg)
        }
    } else {
        console.log(msg)
    }
}

// 默认： 业务层面的出错处理
let _errCallback = (res: any = {}, hideError = false, xhr?) => {
    let msg = res.error || res.msg || 'An unknown error occurred'
    // 是否需要隐藏
    if (!hideError) {
        if (window.alert) {
            window.alert(msg)
        }
    } else {
        console.log(msg)
    }
}

let http: any = {
    onBeforeSend: (xhr) => { },
    sendDataFormat: (data) => {
        return data
    },
    // 返回数据的处理
    responseFormat: (res) => {
        return res
    },
    // 注册错误处理
    regErrCallback: (type, fun) => {
        if (type === 'network') {
            _networkErrCallback = fun
        }
        else {
            _errCallback = fun
        }
    },
    // 构造请求头
    buildHeaders: () => {
        return {}
    },
    // 判断请求是否成功
    isSuccess: (res) => Number(res.code) === 1,
    // 注册请求完成事件（无论成功与否）
    onComplete: (xhr) => { }
}

export default http

function ajax(type: string, url: string, data, hideError = false, timeout = 10000) {
    let $ = get$()
    data = http.sendDataFormat(data)

    let options: any = {
        cache: false,
        data: data,
        dataType: 'json',
        type: type || 'GET',
        timeout: timeout,
        headers: http.buildHeaders()
    }

    if (typeof window !== 'undefined' && (<any>window).FormData && data instanceof (<any>window).FormData) {
        options.processData = false
        options.contentType = false
    }

    if (type === 'JSONP') {
        options.type = 'GET'
        options.dataType = 'jsonp'
    }

    let xhr: any = $.ajax(url, options)
    xhr.sendData = options.data
    http.onBeforeSend(xhr)

    let promise: any = new Promise(function (resolve, reject) {
        xhr.then((res) => {
            if (http.isSuccess(res, xhr)) {
                return resolve(http.responseFormat(res))
            } else {
                reject(res)
                return _errCallback(res, hideError, xhr)
            }
        }).fail((xhr, status) => {
            reject(xhr)
            if (!xhr.statusCode().status) {
                _networkErrCallback(xhr, status, hideError)
            }
            else {
                let res = {}
                try {
                    res = $.parseJSON(xhr.responseText)
                }
                catch (error) { }
                _errCallback(res, hideError)
            }
        }).always(() => {
            http.onComplete(xhr)
        })
    })
    promise.xhr = xhr
    promise.reject = Promise.reject
    return promise
}

['get', 'post', 'jsonp', 'head', 'options', 'put', 'delete', 'trace', 'connect', 'patch'].forEach((method) => {
    http[method] = (url, data, hideError = false, timeout = 10000) => {
        return ajax(method.toUpperCase(), url, data, hideError, timeout)
    }
})
