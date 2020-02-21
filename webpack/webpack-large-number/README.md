# 大整数加法

> webpack打包基础库的demo

## 源码目录结构

````javascript
.
├── dist   // 打包输出文件夹
|   ├── w-larger-number.js    // 未压缩版输出文件
|   └── w-larger-number.min.js //压缩版
├── package.json // 依赖包配置说明
├── webpack.config.js  // 打包配置
├── index.js     // 
├── src         // 源码
     └── index.js      
````

## 使用方式

* 支持script标签/AMD/CJS/ESM模块引入        

````javascript
// ES module
import WLargeNumber from 'WLargeNumber'

console.log(WLargeNumber.add('12','21')) // 33
````

