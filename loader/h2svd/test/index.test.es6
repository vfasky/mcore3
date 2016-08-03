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
        // console.log($root.html());
    });
});

describe('component', ()=>{
    jsdom();

    before(()=>{
        $ = require('jquery');
    });

    it('base', (done)=>{
        let html = `<ul><li mc-for="v in scope.list" mc-if="v >= 4">{v}</li></ul>`;
        let $root = $('<div></div>');
        let component = new mcore.Component($root[0]);
        component.render(getFun(h2svd(html)),{
            list: [1,2,3,4,5]
        }).then((refs)=>{
            // console.log($root.html());

            component.set('list', [5,6,7,8,9], (refs)=>{
                let $ul = $root.find('ul');
                // console.log($root.html());
                expect($ul.find('li').length).to.equal(5);
                done();
            });
        });

    });

    it('component more child', (done)=>{
        let html = `<span mc-for="v in scope.list" mc-if="v >= 4">{v}</span>`;
        let $root = $('<div></div>');
        let component = new mcore.Component($root[0]);
        component.render(getFun(h2svd(html)),{
            list: [1,2,3,4,5]
        }).then((refs)=>{
            // console.log($root.html());

            component.set('list', [5,6,7,8,9], (refs)=>{
                let $span = $root.find('span');
                expect($span.length).to.equal(5);
                done();
            });
        });
    });

    it('component render promise', (done)=>{
        let html = `<span mc-for="v in scope.list" mc-if="v >= 4">{v}</span>`;
        let $root = $('<div></div>');
        let component = new mcore.Component($root[0]);
        component.render(getFun(h2svd(html)),{
            list: new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve([5,6,7]);
                }, 5);
            })
        }).then((refs)=>{

            component.set('list', new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve([5,6,7,8,9]);
                }, 5);
            }), (refs)=>{
                let $span = $root.find('span');
                expect($span.length).to.equal(5);
                done();
            });
        });
    });

    it('component diff other tagName', (done)=>{
        let html = `<span mc-for="v in scope.list" mc-if="v >= 4">{v}</span>`;
        let $root = $('<div></div>');
        let component = new mcore.Component($root[0]);
        component.render(getFun(h2svd(html)),{
            list: [1,2,3,4,5]
        }).then((refs)=>{
            // console.log($root.html());
            let $span = $root.find('span');
            expect($span.length).to.equal(2);

            let html = `<ul><li mc-for="v in scope.list" mc-if="v >= 2">{v}</li></ul>`;
            component.render(getFun(h2svd(html)),{
                list: [1,2,3,4,5]
            }).then((refs)=>{
                let $ul = $root.find('ul');
                expect($ul.find('li').length).to.equal(4);
                done();
            });
        });
    });

    it('component get events', (done)=>{
        let html = `
            <ul mc-on-click="test">
                <li mc-on-click="click(v)" mc-for="v in scope.list">
                    ix: {v}
                </li>
            </ul>
        `;
        let $root = $('<div></div>');
        let component = new mcore.Component($root[0]);

        component.render(getFun(h2svd(html)),{
            list: [1,2,3,4,5]
        }).then((refs)=>{
            expect(component.events.click.length).to.equal(6);
            done();
        });
    });

    it('component event test', (done)=>{
        let html = `
            <ul mc-on-click="test">
                <li mc-on-click="click(v)" mc-for="v in scope.list">
                    ix: {v}
                </li>
            </ul>
        `;
        let $root = $('<div></div>');
        let component = new mcore.Component($root[0]);

        component.click = (event, el, v)=>{
            expect(v).to.equal(3);
        };

        component.test = (event, el)=>{
            done();
        };

        component.render(getFun(h2svd(html)),{
            list: [1,2,3,4,5]
        }).then((refs)=>{
            $root.find('li').eq(2).click();
        });
    });

    it('component diy tag', (done)=>{

        let $root = $('<div></div>');

        class Test extends mcore.Component {
            constructor(parentNode, parentElement) {
                super(parentNode, parentElement);
                let html = `
                    <ul mc-on-click="test">
                        <li mc-on-click="click(v)" mc-for="v in scope.list">
                            ix: {v}
                        </li>
                    </ul>

                `;
                this.render(getFun(h2svd(html)),{
                    list: [1,2,3,4,5]
                });
            }

            destroy(){
                super.destroy();
                done();
            }

            click(event, el, v){
                expect(v).to.equal(3);
            }
        }

        mcore.Template.components.test = Test;

        let html = '<test></test>';
        let component = new mcore.Component($root[0]);
        component.render(getFun(h2svd(html))).then(()=>{
            setTimeout(()=>{
                $root.find('li').eq(2).click();
                component.destroy();
            }, 20);
        });
    });

});
