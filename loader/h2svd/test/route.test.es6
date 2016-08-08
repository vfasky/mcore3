/**
 *
 * 权限测试
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";


import {expect} from 'chai';
import jsdom from 'mocha-jsdom';
import {Route} from '../../../src/route';
var $;

describe('route', ()=>{
    jsdom();

    before(()=>{
        $ = require('jquery');
    });

    it('match route', (done)=>{
        let route = new Route();
        route.add('/test1', function(){
            done();
        }).add('*', ()=>{
            done('not match');
        }).match('/test1');
    });

    it('args', (done)=>{
        let route = new Route();
        route.add('/test/:id', function(id){
            expect(this.data.id).to.equal(1);
            expect(id).to.equal(1);
            done();
        }).match('/test/1');
    });

    it('url args', (done)=>{
        let route = new Route();
        route.add('/test', function(){
            expect(this.context.id).to.equal(1);
            expect(this.context.name).to.equal('ok');
            done();
        }).match('/test?id=1&name=ok');
    });

    it('url compile', ()=>{
        let url = new Route().toUrl('/test/:id/ss/:name', {id: 123, name: 'test'});
        expect(url).to.equal('/test/123/ss/test');
    });

});
