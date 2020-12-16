var gulp = require('gulp');
var mkdirp = require('mkdirp');
var config = require('./gulpfile.config.js');
//======= gulp init 初始化项目结构 ===============
function init() {
    /** 
     * 初始化项目结构
     */
    gulp.task('init', async () => {
        var dirs = [config.html.dir, config.assets.dir, config.sass.dir, config.js.dir, config.images.dir];
        dirs.forEach(dir => {
            mkdirp.sync(dir);
        });
    });
}
module.exports = init;