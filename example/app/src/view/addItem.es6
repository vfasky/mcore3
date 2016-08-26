/**
 *
 * add item
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import View from './changeItem';
import $ from 'jquery';

export default class AddItem extends View {
    run(){
        this.render(require('../tpl/view/addItem.html'), {
            addItemName: '',
            list: []
        });
    }

    syncItemName(event, el){
        this.scope.addItemName = el.value;
    }

    add(){
        if(!this.scope.addItemName){
            return false;
        }
        this.scope.list.push({
            edit: false,
            title: this.scope.addItemName,
        });
        this.scope.addItemName = '';
        return false;
    }
}

AddItem.viewName = 'addItem';
