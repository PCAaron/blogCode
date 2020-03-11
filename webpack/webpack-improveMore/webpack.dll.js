const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        library: [ // 分离基础包，如果需要分离业务基础包可以配置多个
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name]_[chunkhash:8].dll.js',
        path: path.join(__dirname, './build/library'), //避免build时候清理dist目录
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({ //提供manifest引用
            name: '[name]_[hash:8]',
            path: path.join(__dirname, './build/library/[name].json')
        })
    ]
}