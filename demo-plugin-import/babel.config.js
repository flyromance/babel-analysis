console.log("babel.import.js");
// https://github.com/umijs/babel-plugin-import
module.exports = {
  presets: [["@babel/preset-react"]],
  plugins: [
    [
      // require("./babel-plugin-import/lib"), // ok
      require.resolve("./babel-plugin-import"),
      {
        libraryName: "antd",

        // import { ElButton } from 'xx' 中的 ElButton => el-button
        // camel2DashComponentName: false, // 默认是true，需要转，因为组件库文件夹一般都是 keba-case

        /**
         * @script
         *
         * 有两种方式可以设置
         */

        libraryDirectory: "es", // 默认是 lib

        // 整个路径全部自己决定
        // customName(name) {
        //   // 必须返回string
        //   return `antd/exxxs/${name}`;
        // },

        /**
         * @style
         *
         * 有三种模式可以设置导入样式文件
         *
         * 没有指定 style 或 styleLibraryDirectory 或 customStyleName，表明不引入样式文件
         *
         **/

        // 插入 import 'antd/xxx/button'
        // 前缀 antd/xxx 全是自己决定
        // styleLibraryDirectory: 'xxx', // 默认是 null，不使用这种方式设置样式

        // 前缀由script的前缀决定
        style: true, // antd/lib/button/style
        // style: "css", // antd/lib/button/style/css
        // style(name) {
        //   return false // 表示没有不引入样式文件，不注入import style
        //   return `${name}/style/xxx` // 还会添加 antd/lib 前缀
        // },

        // 必须返回string，整个路径全部自己决定
        // customStyleName(name, file) {
        //   return `antd/es/components/${name}/style/css`;
        // },
      },
    ],
  ],
};
