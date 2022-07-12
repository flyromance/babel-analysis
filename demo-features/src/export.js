// 三种默认导出
// export default x1
export { default } from "ss"; // { default as default }  { xx as default }
// export default from 'ssx'; // 这个比较新的语法

export * from "antd";

const a = 1;

export { a, a as a1 };

export { default as x } from "antd";
