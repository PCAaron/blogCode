/*
 * @Descripttion: Web全栈笔记配套代码
 * @Author: Aaron
 * @Date: 2020-1-3-14:03
 */
'use strict';
const path = require('path')

module.exports = {
    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    mode:'production'
}

