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
    else if(isString(oldNode) && isString(newNode)){
        if(newNode != oldNode){
            currentPatch.push({
                type: patch.TEXT,
                content: newNode,
            });
        }
    }
    // 文本替换
    else if (oldNode.tagName === '_textnode' && oldNode.tagName === newNode.tagName) {
        if(newNode != oldNode){
            currentPatch.push({
                type: patch.TEXT,
                content: String(newNode.dynamicProps.text || newNode.props.text || ''),
            });

        }

    }
    // 同一 node, 更新属性
    else if(oldNode.tagName === newNode.tagName && oldNode._key === newNode._key){
        let propsPatches = diffProps(oldNode, newNode);
        if(propsPatches){
            currentPatch.push({
                type: patch.PROPS,
                props: propsPatches,
            });
        }
        // 没有声明不要 diff 子元素
        if(!oldNode || !oldNode._noDiffChild){
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
    let diffs = listDiff(oldChildren, newChildren, '_key');
    newChildren = diffs.children;
    // 有移动
    if(diffs.moves.length){
        let reorderPatch = {
            type: patch.REORDER,
            moves: diffs.moves,
        };
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
