/*
 * @Descripttion: Web
 * @Author: Aaron
 * @Date: 2020-1-9-9:44
 */
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin  = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true
        })
    ],
    devServer: {
        baseContent: './dist',
        hot: true
    }
}
