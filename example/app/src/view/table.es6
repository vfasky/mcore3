/**
 *
 * table render
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import mcore from 'mcore3';

import Svgicon from '../tag/svgicon';

export default class Table extends mcore.View {
    run(){
        this.render(require('../tpl/view/table.html'),{
            showIx: 0,
            icon: 'print',
            data: [
                ['New Customer', 0, 'Freddy Huang'],
                ['New Customer', 0, 'Freddy Huang'],
                ['New Customer', 0, 'Freddy Huang'],
                ['New Customer', 0, 'Freddy Huang'],
                ['New Customer', 0, 'Freddy Huang'],
                ['New Customer', 0, 'Freddy Huang'],
            ]
        });
    }

    changeTable(event, el){
        this.scope.icon = this.scope.showIx === 1 ? 'print' : 'report-appoint';
        this.scope.showIx = this.scope.showIx === 1 ? 0 : 1;
        return false;
    }
}
Table.viewName = 'table';
