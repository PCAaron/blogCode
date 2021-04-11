const commander = require('commander')

// 设置当前命令的版本信息
commander.version('1.0.0', '-v, --version') // 指定参数

// 设置其他option
// --name 后面的[optName]是当前这个选项的参数值
// []表示可选，<>表示必填
commander.option('-n, --name [val]', '设置名称', 'alex')
// 如果第三个参数是一个函数的话，那么该函数会接受来自用户输入的值，
// 并返回一个值作为最后这个选项实际的值 - 对用户输入做二次处理
// commander.option('-n, --name [val]', '设置名称', function(val) {
//     console.log(val)
//     if (val) return val
//     return 'alex'
// })

// 设置命令的动作
commander.action((commandAndOptions) => {
    console.log(commandAndOptions)
    console.log('hello ' + commandAndOptions.name)
})

// 设置子命令
let createCommander = commander.command('create <app-name>')
.description('create a project') // 设置说明
.alias('c') // 设置别名
.usage('descript: create appName') // 使用说明:node mvue c -h
createCommander.action((appName) => {
    console.log(appName)
    // fs.mkdirSync(appName)
})

// 解析来自process.argv的参数，会自动帮助我们添加一个 -h 的解析
commander.parse(process.argv)

// console.log(commander)

