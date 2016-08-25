/**
 *
 * change
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import View from './removeItem';

import Svgicon from '../tag/svgicon';

export default class ChangeItem extends View {
    run(){
        this.render(require('../tpl/view/changeItem.html'), {
            list: [
                {
                    edit: false,
                    title: 'click edit 0',
                },
                {
                    edit: false,
                    title: 'click edit 1',
                },
                {
                    edit: false,
                    title: 'click edit 2',
                },
                {
                    edit: false,
                    title: 'click edit 3',
                },
                {
                    edit: false,
                    title: 'click edit 4',
                },

            ]
        });
    }

    save(event, el, v){
        v.title = el.value;
        return false;
    }

    edit(event, el, v){
        v.edit = true;
        return false;
    }

    hideEdit(event, el, v){
        v.edit = false;
        return false;
    }
}

ChangeItem.viewName = 'changeItem';
