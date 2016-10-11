/// <reference path="../../definition/loader-utils.d.ts" />
/**
 *
 * webpack loader
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'
import h2svd from './index'
import * as loaderUtils from 'loader-utils'

function loader (html:string):void {
    let callback, query, code, js
    query = loaderUtils.parseQuery(this.query)
    if (this.cacheable) {
        this.cacheable()
    }
    callback = this.async()
    code = h2svd(html, query)
    js = `module.exports = ${code}`
    callback(null, js)
}

export = loader