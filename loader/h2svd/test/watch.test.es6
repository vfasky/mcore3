/**
 *
 * 观察者测试
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import Watch from '../../../src/watch';
import {expect} from 'chai';
import jsdom from 'mocha-jsdom';
var $;

describe('watch', ()=>{
    jsdom();

    before(()=>{
        $ = require('jquery');
    });

    it('watch object', (done)=>{
        var tObj = {
            k: 1,
            v: 'ok'
        };
        new Watch(tObj, (path)=>{
            expect(path).to.equal('');
            done();
        });
        tObj.k = 2;
    });

    it('watch mixed object', (done)=>{
        var tObj = {
            k: {
                val: 1
            },
            v: 'ok'
        };
        new Watch(tObj, (path)=>{
            expect(path).to.equal('.k');
            done();
        });
        tObj.k.val = 2;
    });

    it('watch mixed array', (done)=>{
        var tObj = {
            k: {
                val: 1,
                arr: [1, 2, 3]
            },
            v: 'ok'
        };
        new Watch(tObj, (path)=>{
            expect(path).to.equal('.k.arr');
            done();
        });
        tObj.k.arr.push(4);
    });

});
