/*
 * @Descripttion: WEB全栈笔记代码
 * @Author: Aaron
 * @Date: 2020-1-6-10:50
 */
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    /*'style-loader',*/
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
                use: [{
                    loader:'file-loader',
                    options: {
                        name: 'img/[name][hash:8].[ext]'
                    }
                }],
            },
            /*{
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit:10240
                        }
                    }
                ]
            },*/
            {
                test:/\.(woff|woff2|eot|ttf|otf|svg)/,
                use:'file-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src/search.html'), // 使用模板
            filename: 'search.html',    //  打包后的文件名
            chunks: ['search'], // 打包后需要使用的chunk(文件)
            inject: true, // 默认注入所有静态资源
            minify: {
                html5:true,
                collapsableWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src/index.html'), // 使用模板
            filename: 'index.html',    //  打包后的文件名
            chunks: ['index'], // 打包后需要使用的chunk(文件)
            inject: true,
            minify: {
                html5:true,
                collapsableWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
    ],
}
