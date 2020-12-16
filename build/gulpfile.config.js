const SRC_DIR = `./src/`;   // 源文件目录
const DIST_DIR = `./dist/`;  // 打包目录

const config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: `${DIST_DIR}**`,
    viewportWidth: 750,     // 设计稿的视口宽度
    // html路径
    html: {
        dir: SRC_DIR,
        src: `${SRC_DIR}*.html`,
        dist: DIST_DIR
    },
    assets: {
        dir: `${SRC_DIR}assets`,
        src: `${SRC_DIR}assets/**/*`,           // assets目录：./src/assets  
        dist: `${DIST_DIR}assets`               // assets文件build后存放的目录：./dist/assets  
    },
    css: {
        dir: `${SRC_DIR}css`,
        src: `${SRC_DIR}css/**/*.css`,           // CSS目录：./src/css/  
        dist: `${DIST_DIR}css`                   // CSS文件build后存放的目录：./dist/css  
    },
    sass: {
        dir: `${SRC_DIR}sass`,
        src: `${SRC_DIR}sass/**/*.scss`,         // sass目录：./src/sass/  
        dist: `${SRC_DIR}css`,                   // sass文件生成CSS后存放的目录：./src/css  
    },
    js: {
        dir: `${SRC_DIR}js`,
        src: `${SRC_DIR}js/**/*.js`,             // JS目录：./src/js/  
        dist: `${DIST_DIR}js`,                   // JS文件build后存放的目录：./dist/js  
        temp: `${SRC_DIR}jstemp`
    },
    images: {
        dir: `${SRC_DIR}images`,
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/  
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images  
    },
    json: `${SRC_DIR}**/*.json`,
    revManifest: {
        css: `${SRC_DIR}rev-manifest/css`,
        js: `${SRC_DIR}rev-manifest/js`,
    }
}
module.exports = config;