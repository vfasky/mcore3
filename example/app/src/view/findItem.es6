/**
 *
 * find item
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import View from './addItem';

export default class FindItem extends View {
    run(){
        this.render(require('../tpl/view/findItem.html'), {
            addItemName: '',
            find: '',
            list: [],
            filterList: []
        });
    }

    edit(event, el, v){
        if(!this.scope.find){
            v.edit = true;
        }
        return false;
    }

    find(event, el){
        this.scope.find = el.value;
        if(!this.scope.find){
            return;
        }
        this.scope.filterList = this.scope.list.filter((v)=>{
            return v.title.indexOf(this.scope.find) !== -1;
        });
    }


}

FindItem.viewName = 'findItem';
