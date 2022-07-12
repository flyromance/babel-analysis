console.log("babel.polyfill.js");

// https://www.babeljs.cn/docs/babel-preset-env

/**
 * 要么设置 transform-runtime 插件的 corejs
 * 要么设置 preset-env 的 usage
 *
 *
 * entry 适合 app 使用
 *    这样就算三方包使用新特性，也没事。
 *
 * usage usage-pure 适合 lib
 *
 * 但是三方包如果用了新的语法，就不行。
 *    要么配置 让loader 处理特定的三方包，
 *    要么打包时降级一下语法
 *
 */
module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV === "development");
  // api.caller(caller => caller && caller.target === "node") ? {} : {}

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          // bugfixes: true, // 默认false

          // 不转化模块
          // modules: false, // 默认是auto, 由打包工具 @rollup/plugin-babel、babel-loader 指定

          // targets: {
          //   esmodules: true, // 告诉babel，转成支持es模块的浏览器代码
          //   chrome: "58",
          //   ie: "8",
          //   android: "4.4",
          //   ios: "9",
          // },

          // 如果设置了，babel不会用.browserslistrc的配置
          targets: ["> 0.25%, not dead"],

          // ignoreBrowserslistConfig: true, // default is false 查找更目录下的 .browserslistrc

          // 一共三种形式
          // 'usage'
          // false，TODO: 不处理 polyfill
          useBuiltIns: "entry",

          // 只要 useBuiltIns 不是 false，corejs就必须最好配置
          // require('core-js/xxx') 所以必须安装 yarn add core-js
          corejs: {
            version: 3,
            proposals: true, // 默认是false，不注入提案阶段的特性
          },

          // shippedProposals: true, // 默认false，和上面一样
        },
      ],
      ["@babel/preset-react", {

        /** both */
        // classic 默认
        runtime: 'automatic',
        // false
        development: true,
        // false
        pure: true,

        /** classic */
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
        useBuiltIns: true, // false
        useSpread: true, // false

        /** automatice */
        importSource: true, // false
      }],
      ["@babel/preset-typescript"], // ["@babel/plugin-transform-typescript", { "isTSX": true }],
    ],
    plugins: [
      ["babel-plugin-transform-typescript-metadata"], // 支持Reflet.metadata('design:type', xxx)
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      [
        // 这个插件运行时，知道哪些特性是目标浏览器不支持的，如果发现就修改代码，并引入相关的方法
        // TODO: 语法降级不是这个插件做的事情
        "@babel/plugin-transform-runtime",
        {
          // 默认是true，非inline形式导入 helper 相关的依赖，如 import '@babel/runtime/xxx'
          // helpers: false,

          // 默认是true，非inline形式导入 generator 相关的依赖，如 import '@babel/runtime/regenerator'
          // regenerator: false,

          /**
           * corejs: false, 默认值； TODO: 不处理 polyfill
           *
           * corejs: 2 | 3 | { version: 2 | 3 }
           * 1、helper和regenerator相关的依赖，就要改成从  @babel/runtime-corejs3 导入
           * 2、修改代码，以非污染原生的方式注入polyfill，如 Promise.all() 会改成
           *    import _Promise from 'xx';
           *    _Promise.all()
           */
          corejs: {
            // 不要用2
            // version: 2, // yarn add core-js@2 @babel/runtime-corejs2；corejs2不支持原型属性polyfill
            // proposals: true,

            version: 3, // byarn add core-js@3  @babel/runtime-corejs3； 支持原型方法和全局变量
            proposals: true, // 默认是"不注入"提案阶段的垫片，比如Reflect.defineMetadata
          },
        },
      ],
    ],
  };
};
