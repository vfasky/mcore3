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

        let build = getFun(h2svd('<span mc-id="scope.id" class="dddd" mc-class-test="true" mc-class-ok="" mc-class-yes="1">123</span>'));
        let scope = {
            id: 123
        };
        let tree = build(scope, null, mcore);
        let $root = $('<div></div>');
        tree.forEach((el)=>{
            $root.append(el.render());
        });
        console.log($root.html());
    });

});
