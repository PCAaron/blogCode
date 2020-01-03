/*
 * @Descripttion: Web全栈笔记代码记录
 * @Author: Aaron
 * @Date: 2020-1-3-16:22
 */
const path = require('path')

const pjoin = path.join('/foo', 'bar', 'baz/asdf', 'quux')

console.log(pjoin)

const presolve = path.resolve('/foo', '/bar', 'baz')

console.log(presolve)

