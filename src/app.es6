/**
 *
 * app es6
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import {Route} from './route';
import EventEmitter from './eventEmitter';
import {get$} from './util';

export default class App extends EventEmitter {
    constructor($el, options = {}) {
        let $ = get$();
        super();
        this.$el = $el;
        this.options = $.extend({
            viewClass: 'mcore-app-view',
            routeChange: Route.changeByLocationHash,
        }, options);
        // 路由
        this.router = new Route(this.options.routeChange);

        // 当前的 view
        this.curView = null;

        // 中间件
        this._middlewares = [];

        // url map
        this._viewUrlMap = {};

        // 过场动画
        this._changeViewEvent = {
            // 移除 view 之前
            before: function(oldView, done, app){
                done();
            },
            // 插入新 view 之后
            after: function(newView, done, app){
                done();
            }
        };
    }

    route(path, View){
        //兼容 esModule
        if(View.default){
            View = View.default;
        }
        if(!this._viewUrlMap.hasOwnProperty(View.viewName)){
            this._viewUrlMap[View.viewName] = [];
        }
        this._viewUrlMap[View.viewName].push({
            path: path,
            toUrl: (args, options)=>{
                return this.router.toUrl(path, args, options);
            }
        });

        let self = this;
        this.router.add(path, function(){
            self.runView(View, this, arguments);
        });
        return this;
    }

    // 添加中间件
    use(middleware){
        this._middlewares.push(middleware);
        return this;
    }



    _runView(done, err){
        this.curView.instantiate.route = this.env.route;
        this.curView.instantiate.context = this.env.context;
        this.curView.instantiate.run.apply(this.curView.instantiate, this.env.args);
        this.emit('runView', this.curView);
        // console.log(this.curView.instantiate);
        done(err, this.curView.instantiate);
    }

    stack(ix = 0, err = null, done = ()=>{}){
        if(ix >= this._middlewares.length){
            return this._runView(done, err);
        }
        let middleware = this._middlewares[ix];
        let nextIx = ix + 1;
        let next = (err)=>{
            this.stack(nextIx, err, done);
        };
        this.env.view = this.curView.instantiate;
        middleware.call(this.env, err, next);
    }

    // 调用中间件
    runMiddlewares(done){
        if(this._middlewares.length === 0){
            return this._runView(done);
        }
        this.stack(0, null, done);
    }

    // _initView(View, viewName){
    //     let $el = get$()('<div />');
    //     $el.attr('class', this.options.viewClass);
    //
    //     let instantiate = new View($el, this);
    //
    //     this.curView = {
    //         name: viewName,
    //         instantiate: instantiate,
    //     };
    //
    //     this.runMiddlewares((err, instantiate)=>{
    //         instantiate.$el.appendTo(this.$el);
    //         if(!err){
    //             this._changeViewEvent.after(this.curView, ()=>{
    //                 instantiate.afterRun();
    //             }, this);
    //         }
    //     });
    // }

    _initView(View, viewName, parentNode, virtualDom, refs){
        let $el = get$()(parentNode);
        $el.attr('class', this.options.viewClass);

        let instantiate = new View($el, this);
        if(refs){
            instantiate.virtualDom = virtualDom;
            instantiate.refs = refs;
        }

        this.curView = {
            name: viewName,
            instantiate: instantiate,
        };

        this.runMiddlewares((err, instantiate)=>{
            if(!refs){
                instantiate.$el.appendTo(this.$el);
            }
            if(!err){
                this._changeViewEvent.after(this.curView, ()=>{
                    instantiate.afterRun();
                }, this);
            }
        });
    }

    // 启动view
    runView(View, route, args){
        let viewName = View.viewName;
        if(!viewName){
            throw new Error('View not viewName');
        }

        this.env = {
            route: route,
            context: route.context,
            args: args,
            viewName: viewName,
            app: this,
        };

        if(this.curView){
            // 已经初始化，只调用run方法
            if(this.curView.name === viewName){
                this.runMiddlewares((err, instantiate)=>{
                    if(!err){
                        instantiate.afterRun();
                    }
                });
                return;
            }

            this._changeViewEvent.before(this.curView, ()=>{
                this.emit('destroyView', this.curView);
                let virtualDom = this.curView.instantiate.virtualDom;
                let refs = this.curView.instantiate.refs;
                let parentNode = this.curView.instantiate.parentNode;
                // console.log(parentNode);
                // console.log(refs, parentNode);

                this.curView.instantiate.destroy(true);
                // console.log(parentNode);

                this._initView(View, viewName, parentNode, virtualDom, refs);
            }, this);
        }
        else{
            this._initView(View, viewName, document.createElement('div'));
        }
    }

    // 启动view
    // runView(View, route, args){
    //     let viewName = View.viewName;
    //     if(!viewName){
    //         throw new Error('View not viewName');
    //     }
    //
    //     this.env = {
    //         route: route,
    //         context: route.context,
    //         args: args,
    //         viewName: viewName,
    //         app: this,
    //     };
    //     if(this.curView){
    //         // 已经初始化，只调用run方法
    //         if(this.curView.name === viewName){
    //             this.runMiddlewares((err, instantiate)=>{
    //                 if(!err){
    //                     instantiate.afterRun();
    //                 }
    //             });
    //             return;
    //         }
    //
    //         this._changeViewEvent.before(this.curView, ()=>{
    //             this.emit('destroyView', this.curView);
    //
    //
    //             this.curView.instantiate.destroy();
    //             // console.log(this.curView.instantiate.$el);
    //             this.curView.instantiate.$el.remove();
    //
    //             this._initView(View, viewName);
    //         }, this);
    //     }
    //     else{
    //         this._initView(View, viewName);
    //     }
    // }

    run(){
        this.router.run();
    }
}
