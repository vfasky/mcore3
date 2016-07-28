/**
 *
 * 动态生成模板
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import vm from 'vm';
import jsdom from 'mocha-jsdom';

export function getFun(scriptCode){
    const sandbox = {
        buildElement: null,
        window: global.window,
    };

    const script = new vm.Script('buildElement = ' + scriptCode);
    const context = new vm.createContext(sandbox);
    script.runInContext(context);
    return context.buildElement;
}
