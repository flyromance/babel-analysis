# 插件功能

通过返回的 hook，来学习

```js
import { declare } from "@babel/helper-plugin-utils";

// 用户自己定义的配置
interface UserOption {}

export default declare((api, opt: UserOption) => {
  api.assetVersion(7);

  // api.types === types

  return {
    name: "transform-typescript",

    // 继承某个插件，具有继承插件的能力
    // 一般是当前transform插件 对应的 语法插件
    inherits: SyntaxTypescriptPlugin, // 让parser支持ts的解析

    // ??
    parserOverride() {},
    generatorOverride() {},

    // 配置修改 parser 参数的钩子函数，manipulateOptions
    manipulateOptions(opts, parserOpt) {},

    // 配置修改 ast 前，修改文件的 pre 钩子函数， pre() {}
    pre(file) {},

    // 配置修改 ast 节点的钩子函数
    visitor: {
      enter() {},
      exit() {},

      // enter
      Program(path, ctx) {
        // this === ctx
        // ctx 是文件相关的，跨插件的
        const opts = ctx.opts || {}; // 用户传的插件参数
        const file = ctx.file; // 文件对象
      },
      ImportDeclaration: {
        enter(path, ctx) {},
        exit(path, ctx) {},
      },
    },

    // 配置修改 ast 后，修改文件的 post 钩子函数
    post(file) {},
  };
});
```

# babel 插件分为三类

transform（纳入规范内的特性） 和 proposal（提案，但是没有纳入规范的特性）， 插件功能一样都是转码

## syntax 插件

语法插件

设置 hook1，让 parser 支持某种语法

```js
import { declare } from "@babel/helper-plugin-utils";

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: "syntax-decimal",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("decimal");
    },
  };
});
```

## transform 插件

```js
import { declare } from "@babel/helper-plugin-utils";

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: "transform-xxx",

    visitor: {
      ClassDeclaration() {},
    },
  };
});
```

## proposal 插件

同上
