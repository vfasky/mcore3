/**
 *
 * view
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import Component from './component';
import {getComponents} from './util';

let _$iframe = null;

export default class View extends Component{
    constructor($el, app){
        super($el[0], {}, {app: app});
        this.$el = $el;
        // this.el = $el[0];

    }

    useVirtualDom(virtualDom, refs){
        this.refs = refs;
        this.virtualDom = virtualDom;
        this.virtualDom.view = this;

        getComponents(this.virtualDom).forEach((component)=>{
            if(component.parentElement){
                component.parentElement.view = this;
            }
            // console.log(component);
        });

        // console.log(virtualDom);
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

    // destroy(){
    //     console.log("d");
    //     super.destroy();
    // }

    run(){}
    afterRun(){}
}
