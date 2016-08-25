/**
 *
 * 自定义tag测试
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import {expect} from 'chai';
import jsdom from 'mocha-jsdom';
import mcore from '../../../src/index';
import {getFun} from './util';
import h2svd from '../index.es6';
var $;

var requireHtml = (html)=>{
    return getFun(h2svd(html));
};


describe('component more test', ()=>{
    jsdom();

    before(()=>{
        $ = require('jquery');

        class Svgicon extends mcore.Component {
            constructor(parentNode, parentElement) {
                super(parentNode, parentElement);
                this.$parentNode = $(parentNode);
                this.buildSVG();
            }

            watch(){
                this.on('change:icon', ()=>{
                    this.buildSVG();
                });

                this.on('change:dir', ()=>{
                    this.buildSVG();
                });

                this.on('change:fill', ()=>{
                    this.buildSVG();
                });
            }

            buildSVG(){
                this.$parentNode.html(`
                    <svg class="svg-icon ${this.scope.dir ? 'svg-' + this.scope.dir  : ''} ${this.scope.fill !== undefined ? 'svg-fill' : ''}">
                        <use xlink:href="#${this.scope.icon}"></use>
                    </svg>
                `);
            }
        }

        mcore.Template.components.svgicon = Svgicon;

    });

    it('base', (done)=>{
        let $root = $('<div></div>');
        let html = `<div>
            <svgicon mc-icon="scope.icon"></svgicon>
            <button mc-on-click="change">change</button>
        </div>`;
        let component = new mcore.Component($root[0]);
        component.change = ()=>{
            this.scope.icon = 'user';
            console.log('click?');
            done();
        };
        component.render(requireHtml(html),{
            icon: 'arrow'
        }).then(()=>{
            setTimeout(()=>{
                $root.find('button').click();
                console.log($root.find('button'));
                console.log($root.html());
                // component.destroy();
            }, 200);
        });
    });


});
