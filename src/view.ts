/**
 *
 * view
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import Component from './component'
import App from './app'

let _$iframe = null

export default class View extends Component {
    $el: any
    title: string

    constructor($el, app?: App) {
        super($el[0], {}, { app: app })
        this.$el = $el
    }

    setTitle(title: string) {
        this.title = title
        if (document.title === title) {
            return
        }
        document.title = title
        if (this.isWeixinBrowser && this.isIOS) {
            if (_$iframe === null) {
                _$iframe = this.util.get$()('<iframe style="width: 0; height: 0" src="/favicon.ico"></iframe>')
            }
            let $iframe = _$iframe
            $iframe.one('load', () => {
                this.nextTick.next(() => {
                    $iframe.remove()
                })
            }).appendTo(this.$body)
        }
    }

    back() {
        if (window.history.length >= 1) {
            window.history.back()
        }
        else {
            window.location.href = '#'
        }
        return false
    }

    run(): any { }
    afterRun(): any { }
}
