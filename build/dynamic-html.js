/**
 * 初始生成HTML插件添加、HTML生成插件动态添加
 * */
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 初始生成HTML插件添加html-webpack-plugin
 * @param entry
 * @param webpackConfig
 */
function initHtmlPluginAdd(webpackConfig) {
  for (var name in webpackConfig.entry) {
    // 配置生成的html文件，定义路径等
    var conf = {
      filename: name + '.html',
      template: 'src/view/' + name + '/index.html',   // 模板路径
      inject: true,              // js插入位置
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', name],
      hash: true
    };

    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
  }
}

/**
 * HTML生成插件html-webpack-plugin动态添加
 * @param name
 * @param webpackConfig
 */
function dynamicHtmlPluginAdd(name, webpackConfig) {
  var conf = {
    filename: name + '.html',
    template: 'src/view/' + name + '/index.html',   // 模板路径
    inject: true,              // js插入位置
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency',
    chunks: ['manifest', 'vendor', name],
    hash: true
  };

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = {
  initHtmlPluginAdd: initHtmlPluginAdd,
  dynamicHtmlPluginAdd: dynamicHtmlPluginAdd
};

