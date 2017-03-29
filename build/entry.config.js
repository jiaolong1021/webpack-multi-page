const path = require('path')
const glob = require('glob');
var basePath = 'src/view';  // 文件根目录
var options = {
  cwd: basePath, // 在pages目录里找
  sync: true, // 这里不能异步，只能同步
};
var globInstance = new glob.Glob('!(_)*', options); // 考虑到多个页面共用HTML等资源的情况，跳过以'_'开头的目录
var pageArr = globInstance.found; // 一个数组，形如['index', 'login']

var configEntry = {};
pageArr.forEach((page) => {
  configEntry[page] = path.resolve(basePath, page + '/index');
});

module.exports = configEntry;
