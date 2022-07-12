## 如何获取指定环境不支持的特性

根据 browserslistrc 配置，拿到需要支持的浏览器

在 core-js-compat/data.json，每一个特性对应一个最低浏览器版本的映射关系

```json
{
  "es.symbol": {
    "android": "49",
    "chrome": "49",
    "deno": "1.0",
    "edge": "15",
    "electron": "0.37",
    "firefox": "51",
    "ios": "10.0",
    "node": "6.0",
    "opera": "36",
    "opera_mobile": "36",
    "safari": "10.0",
    "samsung": "5.0"
  }
}
```

如果需要支持的版本小于最低映射版本，则表示这个特性是需要 polyfill 的

到了这里 babel 就知道所有需要 polyfill 的特性

这个特性会对应一个或多个 plugin

## 为什么最新的 ecma 草案 (Array.prototype.at)，没有在 preset-env 的支持范围内？

preset-env 只包含当年的 ecmascript 规范中的实现

当年确定明年的特性，当年处于 stage4 的特性，明年会成为正式特性，浏览器会跟进

当年的特性是去年确定的（stage4），当年正式的特性，是去年处于 stage4 的特性

如果该特性处于 0 - 4，统称 proposal，需要查找对应的插件，自己安装，比如 装饰器

## preset-env 的 stage 和 上一个问题的关系

tc39 把提案分为 0 1 2 3 4
一个新特性提出，一般分为以下几个阶段
stage0，可能有 babel 插件支持
stage1，表示可以跟进
stage2，初始规范
stage3，在浏览器上实现
stage4，将添加到下一个年度的发布版本

## babel 如何优化直接 import polyfill 整个包的情况？

1、preset-env useBuildIns entry，会把入口处的 import 'core-js'，转为需要的 polyfill，一次性引入
2、preset-env useBuildIns usage, 会把不支持的特性按需引入 require('core-js/xxx')，污染的方式
3、preset-env transform-plugin corejs3，修改代码不支持的特性映入 import xxx from '@babel/runtime-corejs3'，非污染的方式

## babel runtime 和 helper 的区别？

runtime 相当于是真正的 polyfill

helper 只是工具函数，在降级语法的时候需要用到，比如把 class 转为 function

## 它们和 perset-env 有何关系

## babel 的原理

文件 => token => ast => plugins 修改 ast => printer 生成 文件

## babel-plugin-import 主要做了什么

import { Button } from 'antd'

转为

import Button from 'antd/lib/button'
import 'antd/lib/button/style'

如果 antd 只提供了 commonjs，如果不转，我想引用一个 button，但是会引入所有组件，如果转了只需要引入对应的组件就行，需要组件库支持

并且还能引入style样式，这个是可选的

## import 插件对于当前的 bundle 环境，你认为还有什么价值吗

引入 css

如果源代码是用 esm 形式，现在打包工具都有 treeshaking 能力，最后只把使用的文件打包了

基于 ES Module 可以实现 Tree Shaking，只要 npm 包支持 esm，打包器就能 tree shaking

类似 element-plus 组件库支持 esm 模块，只需安装 unplugin-element-plus 来按需引入样式就行

## 用 babel 处理过 code-mod

背景：多个项目，每个项目里面的有一个 components 文件夹，代码是重复，现在需要把 components 抽离到 npm 包，把项目中其他引入 components 的路径替换为从 npm 包导入，人工修改费时费力，又容易遗漏出错，所以写一个 code-mod 工具，统一修改
实现：gulp，匹配需要转换的文件，交给 babel，按照需求处理定义好一个或多个 plugin，处理代码

# acron

## 把代码转为 ast 后，内部是如何解析模块关系的？
