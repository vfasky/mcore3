/**
 *
 * example
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import $ from 'jquery';
import mcore from 'mcore3';

let app = new mcore.App($('#main'));

app.route('/table', require('./view/table.es6').default)
   .route('/removeItem', require('./view/removeItem.es6').default)
   .route('/changeItem', require('./view/changeItem.es6').default)
   .route('/addItem', require('./view/addItem.es6').default)
   .route('/', require('./view/index.es6').default)
   .run();
