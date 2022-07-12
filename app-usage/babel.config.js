module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV === "development");
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: ["> 1%, last 2 versions, not dead"],
          useBuiltIns: "usage",
          corejs: {
            version: "3",
            proposals: true, // 二选一，都可以让babel处理提案相关的代码
          },
          shippedProposals: true, // 二选一
        },
      ],
    ],

    plugins: [["@babel/plugin-transform-runtime"]],
  };
};
