/**
 *
 *
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import h2svd from '../index.es6';

describe('h2svd', ()=>{
    it('pase html', ()=>{
        h2svd(`
            <!--test-->
            <div mc-show="scope.isShow || scope.id > 0" class="test" id="ok">
                <!--test2-->
                <span mc-for="v, k in scope.list"> {k} - {v.id | toString 123} </span>
            </div>
            <test>ok?</test>
        `);
    });
});
