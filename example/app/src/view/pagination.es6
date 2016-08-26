/**
 *
 * remove
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import mcore from 'mcore3';

import PaginationTag from '../tag/pagination';

export default class Pagination extends mcore.View {
    run(){
        this.data = [];
        for(let i = 0; i < 500; i++){
            this.data.push(i);
        }
        this.render(require('../tpl/view/pagination.html'), {
            list: this.data.slice(0, 10),
            pageInfo: {
                currentPage: 1,
                totalPage: 50,
            }
        });
    }

    chagePage(event, el, page){
        let sep = 10;
        this.scope.list = this.data.slice((page - 1) * sep, ((page - 1) * sep) + sep);
        this.scope.pageInfo.currentPage = page;
    }
}

Pagination.viewName = 'pagination';
