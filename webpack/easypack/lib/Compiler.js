const path = require('path')
const {getAST, getDepeendencies, transform } = require('./Parser')

module.exports = class Compiler {
    //初始化参数
    constructor(options){
        const { entry, output } = options
        this.entry = entry
        this.output = output
        // 最终构建的模块依赖列表
        this.modules = []
    }

    // 提供run，入口方法
    run(){
        const entryModule = this.buildModules(this.entry, true)
        //console.log(entryModule)
        this.modules.push(entryModule)
        //遍历获取所有依赖
        this.modules.map((module)=>{
            module.dependencies.map((dependency)=>{
                this.modules.push(this.buildModules(dependency))
            })
        })
        //console.log(this.modules)
        this.emitFiles()
    }
    // 模块构建
    buildModules(filename,isEntry){
        let ast
        if(isEntry){
            ast = getAST(filename)
        } else {
            //由于不是入口文件，则返回的为相对路径，转换为绝对路径
            const absolutePath = path.join(process.cwd(),'./src',filename)
            ast = getAST(absolutePath)
        }
        return {
            filename,
            dependencies: getDepeendencies(ast),
            source: transform(ast)
        }
    }
    //文件输出:easypack提供的output输出路径
    emitFiles(){
        const outputPath = path.join(this.output.path,this.output.filename)
        const bundle = ``

    }
}