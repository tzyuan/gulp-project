const config = require('./gulpfile.config.js');
const { watch, task, series, src, dest, parallel } = require('gulp');
// ====================== css处理插件 ======================
// sass
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
// postcss
const postcss = require('gulp-postcss');
const pxtoviewport = require('postcss-px-to-viewport');
const processors = [pxtoviewport({ viewportWidth: config.viewportWidth, viewportUnit: 'vmin' })];
// 处理css浏览器兼容的前缀  
const autoprefixer = require('gulp-autoprefixer');
// css压缩
const cssnano = require('gulp-cssnano');

// ====================== js处理插件 ======================
//js压缩
const uglify = require('gulp-uglify');

// ====================== html处理插件 ======================
// html压缩
const minifyHTML = require('gulp-minify-html');

// ====================== 其他插件 ======================

// 文件清理
const del = require('del');
// 文件hash
const rev = require('gulp-rev');
const revManifest = require('gulp-revmanifest');
const revCollector = require('gulp-rev-collector');
// 关键字替换
const replace = require('gulp-replace');

function prod() {
    // 清理dist文件夹
    const clearDist = () => {
        return del(['./dist/**/*']);
    }

    // CSS处理
    const css = () => {
        return src(config.sass.src)
            // sass样式处理
            .pipe(sass().on('error', sass.logError))
            // 视口单位转换
            .pipe(postcss(processors))
            // 处理css浏览器兼容的前缀
            .pipe(autoprefixer())
            // 压缩css dev环境不压缩
            .pipe(cssnano())
            // 输出css文件
            .pipe(dest(config.sass.dist))
            // 哈希编码和对照映射
            .pipe(rev())
            .pipe(dest(config.css.dist))
            .pipe(revManifest())
            .pipe(dest(config.revManifest.css));
    }

    // JS处理
    const js = () => {
        return src(config.js.src)
            // 替换服务器地址
            // .pipe(replace('需要替换的关键字', (match) => {
            //     return '替换关键字的字符串';
            // }))
            // js压缩
            .pipe(uglify())
            // 哈希编码和对照映射
            .pipe(rev())
            .pipe(dest(config.js.dist))
            .pipe(revManifest())
            .pipe(dest(config.revManifest.js));
    }

    // html处理
    let htmlTask = () => {
        return src([config.json, config.html.src])
            // 根据哈希映射替换引用文件名
            .pipe(revCollector({ replaceReved: true }))
            // 压缩html
            .pipe(minifyHTML({ empty: true, spare: true }))
            .pipe(dest(config.html.dist));
    }

    // assets文件夹下的所有文件处理
    let assets = () => {
        return src(config.assets.src)
            .pipe(dest(config.assets.dist));
    }
    // 图片处理
    let images = () => {
        return src(config.images.src)
            .pipe(dest(config.images.dist));
    }

    // 清理文件
    let clear = () => {
        return del(`${config.src}rev-manifest/`);
    }

    const prodTask = series(clearDist, css, js, assets, images, htmlTask, clear);

    task('prod', async () => {
        prodTask();
    });
}

module.exports = prod;
