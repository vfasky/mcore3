> 使用 es6 重构 mcore

### dev

-	webpack
-	babel

### run time

#### 依赖

-	jQuery 1.9+

## Binders

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
<section mc-hide="feature.disabled"></section>
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
</ul>
```
