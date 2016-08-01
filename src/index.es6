/**
 *
 * mcore version 3
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import * as util from './util';
import Element from './element';
import Template from './template';
import EventEmitter from './eventEmitter';
import Component from './component';

export default {
    version: '3',
    util: util,
    Element: Element,
    Template: Template,
    EventEmitter: EventEmitter,
    Component: Component,
};
