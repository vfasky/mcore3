/**
 *
 * diff Element
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import patch from './patch';
import listDiff from 'list-diff2';
import {isString} from './util';

/**
 * 比对两个虚拟dom, 标出变更部分
 * @method dfsWalk
 * @param  {[type]} oldNode
 * @param  {[type]} newNode
 * @param  {[type]} index
 * @param  {[type]} patches
 * @return {[type]} [description]
 */
function dfsWalk(oldNode, newNode, index, patches){
    let currentPatch = [];
    // node is removed
    if(newNode === null){

    }
    // 文本替换
    // else if(isString(oldNode) && isString(newNode)){
    //     if(newNode != oldNode){
    //         currentPatch.push({
    //             type: patch.TEXT,
    //             content: newNode,
    //         });
    //     }
    // }
    // 文本替换
    else if (oldNode.tagName === '_textnode' && oldNode.tagName === newNode.tagName) {
        let oldText = String(oldNode.dynamicProps.text || oldNode.props.text);
        let newText = String(newNode.dynamicProps.text || newNode.props.text);
        if(oldText != newText){
            // console.log(oldNode, newNode, index);
            currentPatch.push({
                type: patch.TEXT,
                content: newText,
            });

        }

    }
    // 同一 node, 更新属性
    else if(oldNode.tagName === newNode.tagName && oldNode._key === newNode._key){
        // 变更静态属性
        diffAndPatchStaticProps(oldNode, newNode);

        let propsPatches = diffProps(oldNode, newNode);
        if(propsPatches){
            currentPatch.push({
                type: patch.PROPS,
                props: propsPatches,
            });
        }
        if(!newNode.refs && oldNode.refs){
            // newNode.render(oldNode.refs);
            newNode.cloneElement(oldNode);
            // console.log(newNode);
        }
        // if(!newNode.template && oldNode.template){
        //     newNode.template = oldNode.template;
        //     newNode.template.element = newNode;
        // }
        // 没有声明不要 diff 子元素
        // console.log(newNode._noDiffChild);
        if(!oldNode || !oldNode._noDiffChild || !newNode._noDiffChild){
            diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
        }
    }
    // 替换
    else{
        currentPatch.push({
            type: patch.REPLACE,
            node: newNode,
        });
    }

    if(currentPatch.length){
        patches[index] = currentPatch;
    }

}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch){
    let diffs = listDiff(oldChildren, newChildren, 'key');
    newChildren = diffs.children;
    // 有移动
    if(diffs.moves.length){
        let reorderPatch = {
            type: patch.REORDER,
            moves: diffs.moves,
        };
        // console.log(diffs, oldChildren, newChildren);
        currentPatch.push(reorderPatch);
    }
    let leftNode = null;
    let currentNodeIndex = index;
    Array.from(oldChildren).forEach((child, i)=>{
        let newChild = newChildren[i];
        if(leftNode && leftNode.count){
            currentNodeIndex += leftNode.count + 1;
        }
        else{
            currentNodeIndex++;
        }
        dfsWalk(child, newChild, currentNodeIndex, patches);
        leftNode = child;
    });
}

/**
 * 检查并更新静态属性
 * @method diffStaticProps
 * @param  {Element}        oldNode
 * @param  {Element}        newNode
 * @return {Object | Null}        [description]
 */
function diffAndPatchStaticProps(oldNode, newNode){
    if(oldNode._noDiffChild || oldNode._component){
        return;
    }
    let oldProps = oldNode.props;
    let newProps = newNode.props;
    let node = oldNode.refs;
    let propsPatches = {};

    if(!node){
        throw new Error('node not inexistence');
    }

    //判断旧值变更或删除
    Object.keys(oldProps).forEach((attr)=>{
        // if(attr === '_key'){
        //     return;
        // }
        let value = oldProps[attr];
        if(newProps[attr] !== value){
            propsPatches[attr] = newProps[attr];
            if(newProps[attr] === undefined){
                node.removeAttribute(attr);
            }
            else{
                node.setAttribute(attr, newProps[attr]);
            }
        }
    });

    // 查找新添加的值
    Object.keys(newProps).forEach((attr)=>{
        if(false === propsPatches.hasOwnProperty(attr)){
            node.setAttribute(attr, newProps[attr]);
        }

    });

    if(oldNode._binder){
        for(let i = node.attributes.length - 1; i >= 0; i--){
            let attr = String(node.attributes[i].name);
            // if(attr === '_key'){
            //     return;
            // }
            if(false === newProps.hasOwnProperty(attr)){
                node.removeAttribute(attr);
            }
        }
    }
}

/**
 * 检查属性变更
 * @method diffProps
 * @param  {Element}  oldNode
 * @param  {Element}  newNode
 * @return {Object | Null}  [description]
 */
function diffProps(oldNode, newNode){

    let count = 0;
    let oldProps = oldNode.dynamicProps;
    let newProps = newNode.dynamicProps;
    let propsPatches = {};


    //判断旧值变更或删除
    Object.keys(oldProps).forEach((attr)=>{
        let value = oldProps[attr];
        if(newProps[attr] !== value){
            count++;
            propsPatches[attr] = newProps[attr];
        }
    });

    // 查找新添加的值
    Object.keys(newProps).forEach((attr)=>{
        if(false === propsPatches.hasOwnProperty(attr)){
            count++;
            propsPatches[attr] = newProps[attr];
        }
    });
    if(count === 0){
        return null;
    }
    return propsPatches;
}

export default function diff(oldTree, newTree){
    let index = 0;
    let patches = {};
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}
