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

// 静态服务器
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;



function dev() {
    // 清理dist文件夹
    const clearDist = () => {
        return del(['./dist/**/*']);
    }

    // CSS处理
    const clearCss = () => {
        return del([`${config.src}rev-manifest/css/`, `${config.dist}/css/*`]);
    }
    const css = () => {
        console.log('css处理开始');
        return src(config.sass.src)
            // sass样式处理
            .pipe(sass().on('error', sass.logError))
            // 视口单位转换
            .pipe(postcss(processors))
            // 处理css浏览器兼容的前缀
            .pipe(autoprefixer())
            // 压缩css dev环境不压缩
            // .pipe(cssnano())
            // 输出css文件
            .pipe(dest(config.sass.dist))
            // 哈希编码和对照映射
            .pipe(rev())
            .pipe(dest(config.css.dist))
            .pipe(revManifest())
            .pipe(dest(config.revManifest.css))
            // dev工程则需要刷新页面
            .pipe(reload({ stream: true }));
    }

    // JS处理
    const clearJs = () => {
        return del([`${config.src}rev-manifest/js/`, `${config.dist}/js/*`]);
    }
    const js = () => {
        console.log('js处理开始');
        return src(config.js.src)
            // 替换服务器地址
            .pipe(replace('需要替换的关键字', (match) => {
                return '替换关键字的字符串';
            }))
            // js压缩 dev环境不压缩
            // .pipe(uglify())
            // 哈希编码和对照映射
            .pipe(rev())
            .pipe(dest(config.js.dist))
            .pipe(revManifest())
            .pipe(dest(config.revManifest.js))
            // dev工程则需要刷新页面
            .pipe(reload({ stream: true }));
    }

    // html处理
    let htmlTask = () => {
        console.log('html处理开始');
        return src([config.json, config.html.src])
            // 根据哈希映射替换引用文件名
            .pipe(revCollector({ replaceReved: true }))
            // 压缩html
            // .pipe(minifyHTML({ empty: true, spare: true }))
            .pipe(dest(config.html.dist))
            // dev工程则需要刷新页面
            .pipe(reload({ stream: true }));
    }

    // assets文件夹下的所有文件处理
    let assets = () => {
        console.log('assets文件夹下的所有文件处理');
        return src(config.assets.src)
            .pipe(dest(config.assets.dist))
            // dev工程则需要刷新页面
            .pipe(reload({ stream: true }));
    }
    // assets文件夹下的所有文件处理
    let images = () => {
        console.log('assets文件夹下的所有文件处理');
        return src(config.images.src)
            .pipe(dest(config.images.dist));
    }


    const cssChange = series(clearCss, css, htmlTask);
    const jsChange = series(clearJs, js, htmlTask);
    const assetsChange = series(assets);
    const htmlChange = series(htmlTask);
    const imagesChange = series(images);
    const devTask = series(clearDist, css, js, assets, htmlTask);


    task('dev', async () => {
        devTask();
        await console.log('dev结束')
        // 打开静态服务器
        console.log('打开静态服务器');
        browserSync.init({
            server: {
                baseDir: config.dist
            }
            , notify: false
        });
        // 打开监控
        watch(config.html.src).on('all', htmlChange);
        watch(config.js.src).on('all', jsChange);
        watch(config.sass.src).on('all', cssChange);
        watch(config.assets.src).on('all', assetsChange);
        watch(config.images.src).on('all', imagesChange);
    });
}

module.exports = dev;
