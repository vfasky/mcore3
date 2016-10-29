/// <reference types="eventemitter3" />
import { Route } from './route';
import EventEmitter from './eventEmitter';
export default class App extends EventEmitter {
    private _middlewares;
    private _viewUrlMap;
    private _changeViewEvent;
    $el: any;
    options: any;
    router: Route;
    curView: any;
    env: any;
    constructor($el: any, options?: {});
    route(path: string, View: any): this;
    use(middleware: any): this;
    private _runView(done, err?);
    stack(ix?: number, err?: any, done?: () => void): void;
    runMiddlewares(done: any): void;
    private _initView(ViewClass, viewName);
    runView(View: any, route: any, args: any): void;
    run(): void;
}
