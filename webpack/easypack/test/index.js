const path = require('path')
const {getAST, getDepeendencies, transform } = require('../lib/Parser')

// 测试ast
const ast = getAST(path.join(__dirname,'../src/index.js'))

const dependencies = getDepeendencies(ast)

const source = transform(ast)
console.log(source)