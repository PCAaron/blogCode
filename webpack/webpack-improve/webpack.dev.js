/*
 * @Descripttion: Web
 * @Author: Aaron
 * @Date: 2020-1-9-9:44
 */
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin  = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')

const setMPA = () => {
    const entry  = {}
    const htmlWebpackPlugins= []

    // 获取entry入口文件
    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))

    Object.keys(entryFiles).map(
        (index) => {
            const entryFile = entryFiles[index]
            const match = entryFile.match(/src\/(.*)\/index\.js/)
            const pageName = match && match[1]

            entry[pageName] = entryFile
            htmlWebpackPlugins.push(
                new htmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapsableWhitespace: true,
                        preserveLineBreaks: false,
                        minifyJS: true,
                        minifyCSS: true,
                        removeComments: true
                    }
                })
            )
        }
    )

    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: entry,
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
                    'postcss-loader',
                    {
                        loader:'px2rem-loader',
                        options: {
                            remUnit: 75, //rem相对px的转换，1rem = 75px
                            remPrecesion:8 // rem后的小数位数
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                    {
                        loader:'px2rem-loader',
                        options: {
                            remUnit: 75, //rem相对px的转换，1rem = 75px
                            remPrecesion:8 // rem后的小数位数
                        }
                    }
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
    ].concat(htmlWebpackPlugins),
    devServer: {
        baseContent: './dist',
        hot: true,
        open: true
    },
    devtool: 'source-map'
}
