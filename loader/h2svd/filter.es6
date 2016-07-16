/**
 *
 * 过滤掉不需要的 dom
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

export default (domTree = [])=>{
    return domTree.filter((dom)=>{
        if(dom.type == 'comment'){
            return false;
        }
        else if(dom.type == 'text' && dom.data.trim().length === 0){
            return false;
        }
        return true;
    });
};
