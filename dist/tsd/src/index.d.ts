/// <reference types="eventemitter3" />
import * as util from './util';
import Element from './element';
import Template from './template';
import EventEmitter from './eventEmitter';
import Component from './component';
import * as route from './route';
import View from './view';
import App from './app';
declare var _default: {
    version: string;
    util: typeof util;
    route: typeof route;
    http: any;
    Element: typeof Element;
    Template: typeof Template;
    EventEmitter: typeof EventEmitter;
    Component: typeof Component;
    View: typeof View;
    App: typeof App;
};
export default _default;
