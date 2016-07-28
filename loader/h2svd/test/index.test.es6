/**
 *
 *
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import h2svd from '../index.es6';
import {expect} from 'chai';
import jsdom from 'mocha-jsdom';

import {getFun} from './util';
import mcore from '../../../src/index';
var $;

describe('h2svd', ()=>{
    jsdom();

    before(()=>{
        $ = require('jquery');
    });

    it('parse html to element', ()=>{

        let build = getFun(h2svd('<span mc-id="scope.id" class="dddd" mc-class-test-kk-ss="true" mc-class-ok="" mc-class-yes="1">123</span>'));
        let scope = {
            id: 123
        };
        let tree = build(scope, null, mcore);
        let $root = $('<div></div>');
        tree.forEach((el)=>{
            $root.append(el.render());
        });
        let $span = $root.find('span');

        expect($span.attr('id')).to.equal('123');
        expect($span.is('.test-kk-ss')).to.equal(true);
        expect($span.is('.dddd')).to.equal(true);
        expect($span.is('.yes')).to.equal(true);
        expect($span.is('.ok')).to.equal(false);
        expect($span.html()).to.equal('123');
        // console.log($root.html());
    });

    it('mc-for in', ()=>{
        let html = `<ul><li mc-for="v in scope.list" mc-class-active="v == 1 || v == 5">{v}</li></ul>`;
        let code = h2svd(html);
        // console.log(code);

        let build = getFun(code);
        let scope = {
            list: [1,2,3,4,5]
        };
        let tree = build(scope, null, mcore);
        let $root = $('<div></div>');
        tree.forEach((el)=>{
            $root.append(el.render());
        });
        let $ul = $root.find('ul');

        expect($ul.find('li').length).to.equal(5);
        expect($ul.find('li').eq(0).is('.active')).to.equal(true);
        expect($ul.find('li').eq(4).is('.active')).to.equal(true);

        // console.log($root.html());
    });

    it('mc-for and mc-if', ()=>{
        let html = `<ul><li mc-for="v in scope.list" mc-if="v >= 4">{v}</li></ul>`;
        let code = h2svd(html);

        let build = getFun(code);
        let scope = {
            list: [1,2,3,4,5]
        };
        let tree = build(scope, null, mcore);
        let $root = $('<div></div>');
        tree.forEach((el)=>{
            $root.append(el.render());
        });
        let $ul = $root.find('ul');

        expect($ul.find('li').length).to.equal(2);
        console.log($root.html());
    });

});
