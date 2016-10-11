/**
 *
 * app test
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'
import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import App from '../../../src/app'
import View from '../../../src/view'
import {getFun} from './util'
import h2svd from '../index.es6'

var $

describe('app', () => {
    jsdom()

    before(() => {
        $ = require('jquery')
    })

    it('base', (done) => {
        let $root = $('<div></div>')
        let app = new App($root)

        class HomeView extends View {
            run () {
                this.render(getFun(h2svd(`
                    <div class="test1">
                        <h1>{scope.test}</h1>
                    </div>
                `)), {
                    test: 'hello'
                }).then(() => {
                    expect($root.find('h1').text().trim()).to.equal('hello')
                    done()
                })
            }
        }
        HomeView.viewName = 'home'

        class TestView extends View {
            run () {
                this.render(getFun(h2svd(`
                    <div2 class="test1">
                        <h1>{scope.test}</h1>
                    </div2>
                `)), {
                    test: 'hello mcore 3'
                }).then(() => {
                    // console.log($root.html());
                    app.router.match('/')
                })
            }
        }
        TestView.viewName = 'test'

        app.route('/test', TestView)
           .route('*', HomeView)

        app.router.match('/test')
    })
})
