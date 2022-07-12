module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: ["> 1%, last 2 versions, not dead"],
        useBuiltIns: "entry",
        // entry 形式 babel不会处理提案的特性，需要自己导入
        // 需要自己导入 proposals 的特性，比如 import 'core-js/proposals/string-replace-all'
        corejs: {
          version: "3",
        },
      },
    ],
    ["@babel/preset-typescript"],
  ],
  plugins: [["@babel/plugin-transform-runtime"]],
};
