const commander = require('commander')
const fs = require('fs')

commander.version('1.0.0', '-v, --version')

let createCommander = commander.command('create <app-name>')
.description('create a project') // 设置说明
.alias('c') // 设置别名
.usage('descript: create appName') // 使用说明:node mvue c -h
createCommander.action((appName) => {
    console.log(appName)
    fs.mkdirSync(appName)
})

commander.parse(process.argv)