/**
 *
 * view
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import Component from './component';

let _$iframe = null;

export default class View extends Component{
    constructor($el, app){
        super($el[0]);
        this.$el = $el;
        // this.el = $el[0];

    }

    setTitle(title){
        this.title = title;
        if(document.title === title){
            return;
        }
        document.title = title;
        if(this.isWeixinBrowser && this.isIOS){
            if(_$iframe === null){
                _$iframe = this.util.get$()('<iframe style="width: 0; height: 0" src="/favicon.ico"></iframe>');
            }
            let $iframe = _$iframe;
            $iframe.one('load', ()=>{
                this.nextTick(()=>{
                    $iframe.remove();
                });
            }).appendTo(this.$body);
        }
    }

    back(){
        if(window.history.length >= 1){
            window.history.back();
        }
        else{
            window.location.href = '#';
        }
        return false;
    }

    // destroy(notRemove){
    //     super.destroy(notRemove);
    // }

    run(){}
    afterRun(){}
}
