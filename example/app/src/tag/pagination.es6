/**
 *
 * 分页组件
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import mcore from 'mcore3';
import Svgicon from './svgicon';

import paginationBase from '../../../../ext/tag/pagination';

export default class Pagination extends paginationBase(mcore) {
    init(){
        this.buildPage(this.scope['page-info']);
        this.render(require('../tpl/tag/pagination.html'));
    }

    changePage(){
        this.emitEvent('change-page', arguments);
        return false;
    }
}

mcore.Template.components.pagination = Pagination;
