/**
 *
 * remove
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import mcore from 'mcore3';

import Svgicon from '../tag/svgicon';

export default class RemoveItem extends mcore.View {
    run(){
        this.render(require('../tpl/view/removeItem.html'), {
            list: [
                'hello #0',
                'hello #1',
                'hello #2',
                'hello #3',
                'hello #4',
            ]
        });
    }

    remove(event, el, v){
        // console.log(v);
        let ix = this.scope.list.indexOf(v);
        if(ix !== -1){
            this.scope.list.splice(this.scope.list.indexOf(v), 1);
        }
        return false;
    }
}

RemoveItem.viewName = 'removeItem';
