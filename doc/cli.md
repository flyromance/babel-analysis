# context

process.cwd() 貌似不支持通过命令行参数去配置

# 输入

## files

glob parttern

`指定 files，确定需要编译的文件`

而 tsc 不需要指定编译范围

最大公共路径，也就是 tsc 中所谓的 rootDir

`babel <...files> [...options]`

--extensions 指定可编译文件后缀， 默认是 .js,.jsx,.es6,.es,.mjs,.cjs

--include-dotfiles 默认排除.开头的文件

--ignore glob1,glob2 过滤一些文件

# 输出

如果不指定 --out-file && --out-dir，则把所有文件合并然后输出到 stdout，也就是打印到终端

如果指定了 --out-file xxx，则把所有文件合并然后写入文件 path.resolve(xxx)

如果指定了 --out-dir xxx，则按照原有的结构平移到这个 xxx 文件夹内

`只是简单的拼接，没有处理作用域，会有污染的情况`

- 编译多个文件或一个文件，合并成一个文件，并写入到指定的位置

babel src --out-file combo.js

- 编译多个文件或一个文件，并输出到某一个文件夹，并且可以排除一些文件

babel src --out-dir dist --ignore test/\*.js,xx.js

通过声明的 glob parttern 确定编译文件，取最大的公共路径 rootDir，

每个文件 f 对应的输出文件路径为 `path.join(path.resolve(outDir), path.relative(rootDir, f))`

--copy-files 把不可编译文件复制到指定的目录，默认是 不复制

--no-copy-ignored

# --config-file

可以指定配置文件，默认 babel.config.js，path.resolve(xxx) 获取文件路径，读取文件的导出
