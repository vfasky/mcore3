/**
 *
 * 模板自定义属性
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'
import {get$, getObjAttrByPath, isString} from '../util'

let binders = {}

binders.show = function (el, value) {
    el.style.display = value ? '' : 'none'
}

binders.hide = function (el, value) {
    el.style.display = value ? 'none' : ''
}

binders.checked = function (el, value) {
    if (value) {
        el.checked = true
    } else {
        el.checked = false
    }
}

binders.disabled = function (el, value) {
    if (value) {
        el.disabled = true
    } else {
        el.disabled = false
    }
}

binders.focus = function (el, value) {
    if (el.focus && value) {
        el.focus()
    } else if (el.blur && !value) {
        el.blur()
    }
}

binders.blur = function (el, value) {
    if (el.focus && !value) {
        el.focus()
    } else if (el.blur && value) {
        el.blur()
    }
}

binders.html = function (el, value) {
    el.innerHTML = value || ''
    el._element._noDiffChild = true
}

// 声明不要diff子节点
binders['no-diff-child'] = function (el, value) {
    el._element._noDiffChild = value
}

binders['class-*'] = function (el, value, attrValue) {
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
}

binders['load-data'] = binders['form-load-data'] = {
    init: function (el, data) {
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
}

binders['form-sync'] = {
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

export default binders
