/*
 * @Descripttion: WEB全栈笔记代码
 * @Author: Aaron
 * @Date: 2020-1-6-10:50
 */
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: {
       index: './src/index.js',
       search: './src/search.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name][chunkhash:8].js'
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test:/\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit:10240
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf|svg)/,
                use:'file-loader'
            }
        ]
    },
    plugins: [
       new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}
