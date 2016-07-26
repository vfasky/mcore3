/**
 *
 *
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import h2svd from '../index.es6';

describe('h2svd', ()=>{
    it('pase html', ()=>{
        h2svd('<ul><li mc-for="v in scope.list" mc-on-click="showCode(v)">{v.title}</li></ul>');
        h2svd(`
            <!--test-->
            {test | toString | add 123 \'xxx\' attr['ok'] v[0] scope.format('test')}
            <span mc-for="v, k in scope.list" mc-on-click="test(v)" mc-if="k > 0"> {k} - {v.id | toString 123} </span>
            <div mc-show="scope.isShow || scope.id > 0" class="test" id="ok" mc-test="'xx' | toString | add 123 'xxx'">
                <!--test2-->
                <span mc-for="v, k in scope.list" mc-unless="v.id == 0 && k > 1"> {k} - {v.id | toString 123} </span>
            </div>
            <span mc-for="v in scope.list"> {k} - {v.id | toString 123} </span>
            <span mc-for="k of scope.data"> {k} - {v.id | toString 123} </span>
            <span mc-for="k, v of scope.data" mc-if="v.id == 100 || v.id == -1"> {k} - {v.id | toString 123} </span>
            <test>ok?</test>
        `);
    });
});
