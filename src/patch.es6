/**
 *
 * 应用比对结果
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

// 替换
const REPLACE = 0;
// 重新排序
const REORDER = 1;
// 属性变更
const PROPS = 2;
// 文字
const TEXT = 3;

function dfsWalk (node, walker, patches){
    let currentPatches = patches[walker.index];
    //计算子节点数量
    let len;

    if((!node.childNodes) || (node._element && node._element._noDiffChild)){
        len = 0;
    }
    else{
        len = node.childNodes.length;
    }

    for(let i = 0; i < len; i++){
        let child = node.childNodes[i];
        walker.index++;
        dfsWalk(child, walker, patches);
    }
    if(currentPatches){
        applyPatches(node, currentPatches);
    }
}

function applyPatches(node, currentPatches){
    for(let currentPatch of currentPatches){
        switch (currentPatch.type) {
            // 替换
            case REPLACE:
                let newNode;
                if(currentPatch.node.render){
                    newNode = currentPatch.node.render();
                }
                else if(typeof currentPatch.node == 'string'){
                    newNode = document.createTextNode(currentPatch.node);
                }
                if(newNode){
                    if(node._element && node._element.destroy){
                        node._element.destroy(true);
                    }
                    node.parentNode.replaceChild(newNode, node);
                }
                break;
            // 重新排序
            case REORDER:
                reorderChildren(node, currentPatch.moves);
                break;
            // 属性变更
            case PROPS:
                if(node._element && node._element.template){
                    let propkeys = Object.keys(currentPatch.props);
                    for(let attr of propkeys){
                        let value = currentPatch.props[attr];
                        let status = value !== undefined ? 'update' : 'remove';
                        node._element.template.setAttr(attr.toLowerCase(), value, true, status);
                    }
                }
                else {
                    throw new Error('not mcore Element:' + node);
                }
                break;
            // 变更文本
            case TEXT:
                if(node.textContent){
                    node.textContent = currentPatch.content;
                }
                else{
                    node.nodeValue = currentPatch.content;
                }
                break;
            default:
                throw new Error('Unknown patch type ' + currentPatch.type);
        }
    }
}

/**
 * 重新排序
 * @method reorderChildren
 * @param  {Element}      node
 * @param  {array}        moves
 * @return {Void}
 */
function reorderChildren(node, moves){
    let staticNodeList = Array.from(node.childNodes);
    let maps = {};
    staticNodeList.forEach((node)=>{
        let key = null;
        if(node._element && node._element.key){
            key = node._element.key;
        }
        if(key === null && node.nodeType === 1){
            key = node.getAttribute('_key');
        }
        if(key){
            maps[key] = node;
        }
    });
    moves.forEach((move)=>{
        let index = move.index;
        if(move.type === 0){
            // remove item
            if(staticNodeList[index] == node.childNodes[index]){
                let childNode = node.childNodes[index];
                if(childNode._element){
                    childNode._element.destroy(true);
                }
                node.removeChild(childNode);
            }
        }
        else if(move.type === 1){
            let insertNode;
            // 使用旧节点
            if(maps[move.item.key]){
                insertNode = maps[move.item.key];
                if(insertNode._element && insertNode._element.template){
                    insertNode._element.template.emit('reorder', node);
                }
            }
            // 创建一个新节点
            else if(move.item.render){
                insertNode = move.item.render();
            }
            // 创建文本
            else {
                insertNode = document.createTextNode(String(move.item));
            }
            staticNodeList.splice(index, 0, insertNode);
            node.insertBefore(insertNode, (node.childNodes[index] || null));
        }
    });

}

export default function patch(node, patches){
    let walker = {
        index: 0
    };
    return dfsWalk(node, walker, patches);
}

patch.REPLACE = REPLACE;
patch.REORDER = REORDER;
patch.PROPS = PROPS;
patch.TEXT = TEXT;
