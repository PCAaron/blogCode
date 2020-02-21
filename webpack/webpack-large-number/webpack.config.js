const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'none',
    entry: {
        "w-large-number": "./src/index.js",
        "w-large-number.min": "./src/index.js"
    },
    output: {
        filename: "[name].js",
        library: "WLargeNumber", // 指定库的全局变量
        libraryExport: "default", // 
        libraryTarget: "umd" // 支出库引入的方式
    },
    optimization: {
        minimize: true, // 默认为true，压缩js代码
        minimizer: [
            new TerserPlugin({ // terser-webpack-plugin支持es6语法压缩
                include: /\.min\.js$/
            })
        ]
    }
}