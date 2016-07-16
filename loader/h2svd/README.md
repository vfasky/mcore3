将 html 解释成 virtual-dom 的定义
---------------------------------

### 标签解释优化级

1.	`mc-for`
2.	`mc-if` `mc-unless`
3.	`mc-[binders]`

### `mc-for` 转换

```html
<div mc-for="v in scope.list"> {v.id} </div>
```

to js

```js
(function(domDef, list, valName, ixName){
    var len = Array.isArray(list) ? list.length : 0;
    if(ixName == null){
        ixName = '_i';
    }

    var tree = [];

    for(var i = 0; i < len; i++){
        var v = list[i];
        var ctx = { vars : {}, binders: {} };
        ctx.vars[valName] = v;
        ctx.vars[ixName] = i;

        tree.push(new Element(domDef.tagName, domDef.props, domDef.children, ctx));
    }

    return tree;
})(domDef, scope.list, 'v');
```
