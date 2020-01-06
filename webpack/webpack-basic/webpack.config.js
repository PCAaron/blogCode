/*
 * @Descripttion: WEB全栈笔记代码
 * @Author: Aaron
 * @Date: 2020-1-6-10:50
 */
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
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
            /*{
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: 'file-loader'
            },*/
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
    }
}
