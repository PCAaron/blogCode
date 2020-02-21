/*
 * @Descripttion: Web
 * @Author: Aaron
 * @Date: 2020-1-9-9:44
 */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

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
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
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
console.log(entry)

module.exports = {
    mode: 'production',
    entry:entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                use: [
                    MiniCssExtractPlugin.loader,
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
                test: /\.(png|jpg|jpeg|svg|gif)$/,
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
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        /*new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module:'react',
                    entry:'https://unpkg.com/react@16/umd/react.development.js',
                    global:'React'
                },
                {
                    module:'react-dom',
                    entry:'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
                    global:'ReactDOM'
                }
            ]
        })*/
    ].concat(htmlWebpackPlugins),
    optimization: {
        splitChunks: {
            /*cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }*/
            minSize: 0, // 设置最小size多少是才进行通用分离
            cacheGroups: {
                name:'commons',
                chunks: 'all', // all：所有引入的库进行分离；async：异步引入的库进行分离（默认）；initial：同步引入的库进行分离
                minChunks:2//设置默认最少多少个引入才进行通用分离
            }
        }
    }
}
