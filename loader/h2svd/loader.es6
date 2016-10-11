/**
 *
 * webpack loader
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'
import h2svd from './index'
var loaderUtils = require('loader-utils')

module.exports = function (html) {
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
