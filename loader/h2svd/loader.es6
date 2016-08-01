/**
 *
 * webpack loader
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";
import h2svd from './index';
import loaderUtils from 'loader-utils';

export default function(html){
    let callback, query;
    query = loaderUtils.parseQuery(this.query);
    if(this.cacheable){
        this.cacheable();
    }
    callback = this.async();
    callback(null, h2svd(html, query));
}
