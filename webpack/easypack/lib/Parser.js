const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

module.exports = {
    getAST: path => {
        // fs读取内容
        const source = fs.readFileSync(path,'utf-8')
        // 将source转换为ast
        return babylon.parse(source,{
            sourceType: 'module'
        })
    },
    getDepeendencies:(ast) => {
        const dependencies = []
        traverse(ast, {
            // 分析import语句，获取依赖内容
            ImportDeclaration:({node}) => {
                dependencies.push(node.source.value)
            }
        })
        return dependencies
    },
    // 将ast转换为源码
    transform: (ast) => {
        const { code } = transformFromAst(ast, null, {
            presets: ['env']
        })
        return code
    }
}