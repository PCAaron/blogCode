'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const glob = require('glob')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Happypack = require('happypack')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const PATHS = {
    src: path.join(__dirname,'src')
}

const smp = new SpeedMeasureWebpackPlugin()

const setMPA = () =>{
    const entry = {}
    const htmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))
    Object.keys(entryFiles).map(
        index => {
            const entryFile = entryFiles[index]
            const match = entryFile.match(/src\/(.*)\/index\.js/)
            const pageName = match && match[1]
            entry[pageName] = entryFile
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['commons', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
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

module.exports = smp.wrap({
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                //exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers:3
                        }
                    },
                    'babel-loader?cacheDirectory=true'
                    /*'happypack/loader'*/
                    /*'babel-loader',
                    'eslint-loader'*/
                ]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        /*new Happypack({
            loaders: ['babel-loader']
        }),*/
        //new WebpackBundleAnalyzer(),
        new CleanWebpackPlugin(),
        //new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/!**!/!*`,  { nodir: true }),
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        function () {
            this.hooks.done.tap('done', stats => {
                if (stats.compilation.errors && stats.compilation.errors.length &&
                    process.argv.indexOf('--watch') == -1) {
                    console.log('build err')
                    process.exit(1)
                }
            })
        },
        new webpack.DllReferencePlugin({
            manifest: require('./build/library/library.json')
        }),
        new HardSourceWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    optimization: {
        splitChunks: {
            minSize: 0,
            minChunks:2,
            cacheGroups: {
                defaults: {
                    name:'commons',
                    chunks: 'all', // all：所有引入的库进行分离；async：异步引入的库进行分离（默认）；initial：同步引入的库进行分离
                    reuseExistingChunk: true,//如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true
            })
        ]
    },
    /*resolve: {
        alias: {
            'react': path.resolve(__dirname,'./node_modules/react/umd/react.production.min.js'),
            'react-dom': path.resolve(__dirname,'./node_modules/react/umd/react-dom.production.min.js')
        },
        extensions: ['.js'],
        mainFields: ['main']
    }*/
    //stats: 'errors-only'
});
