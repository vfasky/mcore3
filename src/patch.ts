/**
 *
 * 应用比对结果
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

import { nodeListToArray } from './util'
import { MCElement } from './element'
import Element from './element'

// 替换
const REPLACE = 0
// 重新排序
const REORDER = 1
// 属性变更
const PROPS = 2
// 文字
const TEXT = 3

interface WalkerConfig {
    index: number;
}


function dfsWalk(node: MCElement, walker: WalkerConfig, patches = {}) {
    if (!node) return
    let currentPatches = patches[walker.index]
    // 计算子节点数量
    let len
    if (!node.childNodes || (node._element && node._element._noDiffChild)) {
        len = 0
    } else {
        len = node.childNodes.length
    }

    for (let i = 0; i < len; i++) {
        let child = <MCElement>node.childNodes[i]
        walker.index++
        dfsWalk(child, walker, patches)
    }
    if (currentPatches) {
        applyPatches(node, currentPatches)
    }
}

interface PatchInfo {
    type: number;
    node: Element;
    moves: any;
    props: any;
    index?: number;
    content?: string;
    oldNode?: Element;
}

function applyPatches(node: MCElement, currentPatches: PatchInfo[]) {
    for (let currentPatch of currentPatches) {
        switch (currentPatch.type) {
            // 替换
            case REPLACE:
                let newNode: MCElement
                // if(currentPatch.node) {
                //     console.log(currentPatch.node._component)
                // }
                // if (!currentPatch.node._component || !currentPatch.node.refs) {
                //     newNode = currentPatch.node.render()
                // }
                // else {
                //     console.log(currentPatch.node)
                //     newNode = currentPatch.node.refs
                // }
                // neNode = currentPatch.node.render()
                // else if (typeof currentPatch.node == 'string') {
                //     newNode = document.createTextNode(currentPatch.node)
                //     console.log(newNode)
                // }
                if (node.parentNode && node.parentNode.replaceChild) {
                    let childNodes = nodeListToArray(node.parentNode.childNodes)
                    // console.log('replace: %s -> %s', currentPatch.node.tagName, node._element.tagName)
                    // console.log(childNodes)
                    let isMatch = false
                    // let oldNode = <MCElement>childNodes[currentPatch.index]
                    for(let i = currentPatch.index; i < childNodes.length; i++) {
                        let childNode = <MCElement>childNodes[i]
                   
                        // console.log(childNode._element, currentPatch.node)
                        if(childNode && childNode._element && childNode._element.tagName == currentPatch.node.tagName && childNode._element._component){
                            isMatch = true
                            // childNode._element.key = currentPatch.node.key
                            // currentPatch.node = childNode._element
                            // newNode = childNode

                            newNode = currentPatch.node.cloneElement(childNode._element)
                            // console.log(newNode.childNodes)
                            break
                            // console.log(childNode._element.tagName, currentPatch.oldNode.tagName, currentPatch.node.tagName)
                        }
                    }

                    if (isMatch === false) {
                        newNode = currentPatch.node.render()
                    }

                    if (newNode) {
                        try {
                            node.parentNode.replaceChild(newNode, node)
                        } catch (error) {
                            console.log(node, newNode, currentPatches)                            
                        }
                    }
                }

                // if (newNode) {
                //     // let element = node._element
                //     if (node.parentNode) {
                //         node.parentNode.replaceChild(newNode, node)
                //     }
                //     // if (element && element.destroy) {
                //     //     element.destroy()
                //     // }
                // }
                break
            // 重新排序
            case REORDER:
                reorderChildren(node, currentPatch.moves)
                break
            // 属性变更
            case PROPS:
                if (node._element) {
                    let propkeys = Object.keys(currentPatch.props)
                    for (let attr of propkeys) {
                        // console.log(attr, currentPatch.props[attr])
                        let value = currentPatch.props[attr]
                        let status = value !== undefined ? 'update' : 'remove'
                        if (node._element.template) {
                            node._element.template.setAttr(attr.toLowerCase(), value, true, status)
                        }
                        if (node._element._component) {
                            node._element._component.set(attr.toLowerCase(), value)
                        }
                    }
                }
                else if (node.textContent) {
                    node.textContent = currentPatch.content
                }
                else if (node.nodeValue) {
                    node.nodeValue = currentPatch.content
                }
                else {
                    console.log(node)
                    throw new Error('not mcore Element:' + node)
                }
                break
            // 变更文本
            case TEXT:
                // console.log(node.textContent, currentPatch);
                if (node.textContent) {
                    node.textContent = currentPatch.content
                }
                else {
                    node.nodeValue = currentPatch.content
                }
                break
            default:
                throw new Error('Unknown patch type ' + currentPatch.type)
        }
    }
}


/**
 * 重新排序
 * @method reorderChildren
 * @param  node
 * @param  moves
 */
function reorderChildren(node: MCElement, moves: any[]) {
    let staticNodeList = nodeListToArray(node.childNodes)
    let maps = {}
    staticNodeList.forEach((node: MCElement) => {
        let key = null
        if (node._element && node._element.key) {
            key = node._element.key
        }
        if (key) {
            maps[key] = node
        }
    })
    moves.forEach((move) => {
        let index = move.index
        // 删除
        if (move.type === 0) {
            if (staticNodeList[index] == node.childNodes[index]) {
                let childNode = (<MCElement>node.childNodes[index])
                if (childNode) {
                    if (childNode._element) {
                        childNode._element.destroy(true)
                    }
                    node.removeChild(childNode)
                }
            }
            staticNodeList.splice(index, 1)
        }
        else if (move.type === 1) {
            let insertNode
            let oldNode = maps[move.item.key]
            // 使用旧节点
            if (oldNode && oldNode._element == move.item) {
                insertNode = maps[move.item.key]
                if (insertNode._element && insertNode._element.template) {
                    insertNode._element.template.emit('reorder', node)
                }
            }
            // 创建一个新节点
            else if (move.item.render) {
                insertNode = move.item.render()
            }
            // 创建文本
            else {
                insertNode = document.createTextNode(String(move.item))
            }
            if (insertNode && node.insertBefore) {
                staticNodeList.splice(index, 0, insertNode)
                node.insertBefore(insertNode, (node.childNodes[index] || null))
            }
        }
    })
}

function patch (node, patches) {
    let walker: WalkerConfig = {
        index: 0
    }
    
    return dfsWalk(node, walker, patches)
}

export {
    patch,
    REPLACE,
    REORDER,
    PROPS,
    TEXT
}