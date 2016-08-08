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
import * as route from './route';
import View from './view';
import App from './app';

export default {
    version: '3',
    util: util,
    route: route,
    Element: Element,
    Template: Template,
    EventEmitter: EventEmitter,
    Component: Component,
    View: View,
    App: App,
};
