const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

/**
 * gulp引入用于监控触发view文件夹下新增页面动态加载
 * 页面的新增规则可自行定义，目前实现两种情况：
 * 1. 采用ejs模板生成HTML的情况(在相关文件夹下生成***.ejs文件)
 * 2. 直接采用HTML页面情况（在相关文件夹下生成***.ejs文件）
 */

const gulp = require("gulp");
module.exports = function dynamicEntry(compiler, webpackConfig, webpackDevMiddlewareInstance) {
  gulp.task('default', function () {
    gulp.watch(["src/view/**/**"], function (event) {
      if ((event.type === "added" || event.type === "renamed") && event.path.endsWith(".html")) {
        let pathArr = event.path.split(/\\/g);
        let entry = '.', srcFlag = false;
        for(let i=0; i<pathArr.length - 1; i++) {
          if(pathArr[i] === 'src'){
            srcFlag = true;
          }
          if(srcFlag) {
            entry += '/' + pathArr[i];
          }
        }
        // 所有模块都以index.js为入口，以模块名为编译后js名称
        entry += '/index.js';

        /* 添加HTML插件 */
        require("./dynamic-html").dynamicHtmlPluginAdd(pathArr[pathArr.length - 2], webpackConfig);

        compiler.apply(new SingleEntryPlugin(process.cwd(), entry, pathArr[pathArr.length - 2]));
        compiler.apply.apply(compiler, webpackConfig.plugins);
        webpackDevMiddlewareInstance.invalidate();
      }
    });
  });

  gulp.start('default');
};
