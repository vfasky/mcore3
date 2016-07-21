将 html 解释成 virtual-dom 的定义
---------------------------------

### 标签解释优先级

1.	`mc-for`
2.	`mc-if` `mc-unless`
3.	`mc-[attr]` `mc-on-[event]`
4.	`{x | [formatter] arg... | [formatter] arg...}` `{x}`
