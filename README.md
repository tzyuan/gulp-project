### 项目结构
```
|- project
    |- build        // gulpfile配置文件
    |- dist         // 项目打包文件
    |- src          // 源文件文件夹
    | |- assets     // 第三方资源文件
    | |- images     // 图片
    | |- js         // js
    | |- sass       // scss
    |- gulpfile.js  // gulp执行文件
    |- package.json
```

### 参照 [文档](https://www.gulpjs.com.cn/docs/getting-started/quick-start/) 安装gulp

1. 安装组件

```
npm install
```

2. 生成目录结构

```
gulp init
```

3. 创建index.htm,scss,js等文件
4. 运行静态服务器

```
gulp dev
```

5. 打包项目
```
gulp prod
```