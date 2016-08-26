
## mcore

- MVC 框架
- 模板渲染基于 virtual-dom diff 实现， 只更新需要变更的 DOM
- 模板不需要像 react 那样用 JSX； 跟原来一样， 写 html 就行了
- 模板中的 DIY tag 就是一个 Components， 实现组件化非常方便
- 每一个 DIY tag 是一个 “独立空间”， 子节点不参于 diff. 所以，你可以很方便的， 在 DIY tag 里，使用 jQuery 的插件

## MOVING PARTS

- [Binders](#Binders)
- [Formatters](#Formatters)
- [Components](#Components)

## Binders

Describe how your underlying data is reflected in the DOM and vice-versa. All binders create a binding that is automatically updated when model data changes or when the user interacts with the DOM.

### html

Sets the element's HTML content.

```html
<section mc-html="scope.item.summary"></section>

```

### show

Shows the element when the value evaluates to true and hides the element when the value evaluates to false.

```html
<button mc-show="scope.user.admin">Remove</button>
<button mc-show="scope.user.ix > 0">Remove</button>
```

### hide

Hides the element when the value evaluates to true and shows the element when the value evaluates to false.

```html
<section mc-hide="scope.feature.disabled"></section>
```

### if

Inserts and binds the element as well as it's child nodes into the DOM when the value evaluates to true and removes the element when the value evaluates to false.

```html
<section mc-if="scope.item.editable"></section>
<section mc-if="scope.item.editable || scope.item.ix > 0"></section>
<section mc-if="scope.item.editable && scope.item.ix != 0"></section>
<section mc-if="(scope.item.editable && scope.item.ix != 0) || scope.show"></section>
```

### for

Each Array or Object

```html
<ul>
    <li mc-for="v in scope.arrayData">
        {v}
    </li>
    <li mc-for="v, i in scope.arrayData">
        {v} index: {i}
    </li>

    <li mc-for="v of scope.objectData">
        {v}
    </li>

    <li mc-for="v, key of scope.objectData">
        {v} key: {key}
    </li>

    <li mc-for="v in (scope.arrayData || scope.otherData)">
        {v}
    </li>
</ul>
```

### on-[event]

Binds an event listener on the element using the event specified in [event]

> 注： callback 至小有二个参数， 参数1: event 参数2: element (跟 jQuery 的事件回调参数一样)

```html
<button mc-on-click="edit">Remove</button>
```

在事件中，传递上下文

```html
<div mc-for="v in scope.list">
    <span mc-on-click="show(v)">{v.title}</span>
</div>
```

```js
class Edit extends mcore.Veiw {
    show(event, el, v){
        console.log(v);
    }
}
```

### class-[classname] ( version added: 3.0 )

Adds a class (whatever value is in place of [classname]) on the element when the value evaluates to true and removes that class if the value evaluates to false.

```html
<li mc-class-completed="scope.todo.done">{ scope.todo.name }</li>
```

### [attribute]

Sets the value of an attribute (whatever value is in place of [attribute]) on the element.

If your binding declaration does not match any of the above routines, it will fallback to use this binding.

```html
<input type="text" mc-placeholder="scope.field.placeholder">
```
