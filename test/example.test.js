/**
 *
 *
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

var expect = require('chai').expect
var jsdom = require('mocha-jsdom')

var $, app, $main, getViewByUrl, viewRendered

getViewByUrl = (url, done) => {
    app.off('runView')
    app.on('runView', (view) => {
        setTimeout(() => {
            done(view.instantiate)
        }, 30)
    })
    app.router.match(url)
}

viewRendered = (view) => {
    view.off('rendered')
    return new Promise((resolve) => {
        view.on('rendered', resolve)
    })
}

describe('example', () => {
    jsdom()

    before((done) => {
        // init window and document
        $ = require('jquery')
        global.jQuery = $
        setTimeout(done, 50)
    })

    before(() => {
        var App = require('../example/app/dist/app')
        app = App.app($('<div></div>'))
    })

    it('test table view', (done) => {
        getViewByUrl('/table', (view) => {
            expect(view.$el.find('tbody tr').length).to.equal(6)

            // click Change Table button
            view.$el.find('button').click()

            viewRendered(view).then(() => {
                expect(view.$el.find('tbody tr').length).to.equal(7)
                // console.log(view.$el.html());
                done()
            })
        })
    })

    it('test removeItem view', (done) => {
        getViewByUrl('/removeItem', (view) => {
            expect(view.$el.find('.list li').length).to.equal(5)

            // click remove item
            view.$el.find('.list li').eq(0).find('i').click()

            viewRendered(view).then(() => {
                expect(view.$el.find('.list li').length).to.equal(4)
                done()
            })
        })
    })

    it('test changeItem view', (done) => {
        getViewByUrl('/changeItem', (view) => {
            expect(view.$el.find('.list li').length).to.equal(5)

            let $li = view.$el.find('.list li').eq(2)

            // click title
            $li.find('div').click()

            viewRendered(view).then(() => {
                $li.find('input').val('test').change()
                return viewRendered(view)
            }).then(() => {
                // console.log(view.scope.list);
                expect(view.scope.list[2].title).to.equal('test')
                done()
            })
        })
    })
})
