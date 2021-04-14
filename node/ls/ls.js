#!/usr/bin/env node

// 实现linux ls命令
/**
 * 输出当前指定的目录下的文件以及文件夹
 * ls:-p 指定显示的目录
*/

const commander = require('commander');
const fs = require('fs');
const chalk = require('chalk') // 美化命令行
const inquirer = require('inquirer') // 交互式

// 文字修饰：斜体，加粗在win下支持不好
console.log(chalk.bold.red.bgGreen('hello ls'))
// process.exit()

// 设置命令工具的版本号
commander.version('1.0.0', '-v, --version');

// 子命令
commander.option('-p, --path [path]', '设置要显示的目录', __dirname);
commander.option('-l, --list', '以列表的形式显示')

// 实现命令逻辑
commander.action( () => {
    console.log('path', commander.path)
    // 把当前命令指定的目录下的文件以及文件夹全部显示在控制台中
    try {
        const files = fs.readdirSync(commander.path)
        if (commander.list) {
            let output = files.map(file => {
                let stat = fs.statSync(commander.path + '/' + file)
                let type = stat.isDirectory() ? chalk.red('[目录]') :
                    chalk.green('[文件]') 
                return `${type} ${file}\r\n`
            }).join('')
            console.log(output)
        } else {
            console.log(files)
        }
    } catch (e) {
        console.log(e)
    }
});

// console.log(process.argv)

// 解析用户输入
commander.parse(process.argv);