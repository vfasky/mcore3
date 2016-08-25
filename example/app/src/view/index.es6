/**
 *
 * home
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import mcore from 'mcore3';


export default class Index extends mcore.View {
    run() {
        this.render(require('../tpl/view/index.html'), {
            menu: [{
                title: 'Template',
                menu: [{
                    title: 'Base Render',
                    subTitle: 'Render Html',
                    url: '#/',
                },{
                    title: 'Table Render',
                    subTitle: 'Diff and Render Table',
                    url: '#/table',
                },]
            },{
                title: 'Interaction',
                menu:[{
                    title: 'Remove',
                    subTitle: 'Remove Item',
                    url: '#/removeItem'
                }]
            }]
        });
    }
}

Index.viewName = 'index';
