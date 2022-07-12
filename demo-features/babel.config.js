// https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from
const path = require("path");

module.exports = {
  presets: [
    ["@babel/preset-react"],
    ["@babel/preset-typescript"], // ["@babel/plugin-transform-typescript", { "isTSX": true }],
  ],
  plugins: [
    // https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata
    // 当前 2022.7 不是规范  单独安装
    ["babel-plugin-transform-typescript-metadata"],

    ["@babel/plugin-proposal-decorators", { legacy: true }], // 当前 2022.7 不是规范 单独安装
    "@babel/plugin-proposal-export-default-from", // 当前 2022.7 不是规范，单独安装

    // https://github.com/tleunen/babel-plugin-module-resolver
    [
      "babel-plugin-module-resolver",
      {
        root: ["."],
        alias: {
          utils: "./src/utils", // 这里不会拼接 root
        },
      },
    ], // 修改 moduledeclaration 的 source

    "@babel/plugin-proposal-export-namespace-from", // 纳入 2020 年规范
  ],
};
