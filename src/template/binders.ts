/**
 *
 * 模板自定义属性
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'
import { get$, getObjAttrByPath, isString } from '../util'

let binder = {
    // /**
    //  * 显示 dom
    //  */
    // show: function (el: HTMLElement, value) {
    //     el.style.display = value ? '' : 'none'
    // },

    // /**
    //  * 隐藏
    //  */
    // hide: function (el: HTMLElement, value) {
    //     el.style.display = value ? 'none' : ''
    // },

    /**
     * 选中
     */
    checked: function (el: HTMLInputElement, value) {
        if (value) {
            el.checked = true
        } else {
            el.checked = false
        }
    },

    /**
     * 禁用
     */
    disabled: function (el: HTMLInputElement, value) {
        if (value) {
            el.disabled = true
        } else {
            el.disabled = false
        }
    },

    /**
     * 只读
     */
    readonly: function (el: HTMLInputElement, value) {
        if (value) {
            el.readOnly = true
        } else {
            el.readOnly = false
        }
    },

    /**
     * 取得焦点
     */
    focus: function (el: any, value) {
        if (el.focus && value) {
            el.focus()
        } else if (el.blur && !value) {
            el.blur()
        }
    },

    /**
     * 失去焦点
     */
    blur: function (el: any, value) {
        if (el.focus && !value) {
            el.focus()
        } else if (el.blur && value) {
            el.blur()
        }
    },

    /**
     * html 内容
     */
    html: function (el: any, value) {
        el.innerHTML = value || ''
        el._element._noDiffChild = true
    },

    /**
     * 声明不要diff子节点
     */
    'no-diff-child': function (el: any, value) {
        el._element._noDiffChild = value
    },

    /**
     * 值为真是，设置 dom class
     */
    'class-*': function (el: HTMLElement, value: boolean, attrValue: string) {
        let classNames = String(el.className || '').split(' ').filter((name) => {
            return name.trim().length
        }).map((name) => {
            return name.trim()
        })
        let ix = classNames.indexOf(attrValue)
        if (!value) {
            if (ix !== -1) {
                classNames.splice(ix, 1)
                el.className = classNames.join(' ')
            }
        } else if (ix === -1) {
            classNames.push(attrValue)
            el.className = classNames.join(' ')
        }
    },

    /**
     * 根据表单的name值，取 data 对应的属性值
     */
    'form-load-data': {
        init: function (el: any, data = {}) {
            if (el.tagName.toLowerCase() !== 'form' || !el._element) {
                return el.setAttribute('load-data', data)
            }
            let $ = get$()
            let $form = $(el)
            Object.keys(data).forEach((k) => {
                let v = data[k]
                let $el = $form.find(`[name=${k}]`)
                if ($el.is('[type=checkbox],[type=radio]')) {
                    $el.prop('checked', String($el.val()) === String(v))
                } else {
                    $el.val(v)
                }
            })
        }
    },

    /**
     * 当 from 中的元素触发 change 事件，
     * 且该元素的 name 值与 dataKey 的属性对上
     * 则自动更新 dataKey 属性的值
     */
    'form-sync': {
        init: function (el, dataKey) {
            if (el.tagName.toLowerCase() !== 'form' || !el._element || !el._element.view) {
                return el.setAttribute('sync', dataKey)
            }
            let view = el._element.view
            let $ = get$()
            let $form = $(el)
            let soure = dataKey
            if (isString(dataKey)) {
                soure = getObjAttrByPath(dataKey, view.scope)
            }

            $form.on('change', '[name]', function () {
                let $el = $(this)
                let name = $el.attr('name')
                if (name && soure) {
                    if ($el.is('[type=checkbox],[type=radio]')) {
                        let val = $el.prop('checked') ? this.value : ''
                        soure[name] = val
                    } else {
                        soure[name] = this.value
                    }
                }
            })
        }
    }
}

// 兼容 mcore2 
binder['load-data'] = binder['form-load-data']

export default binder
