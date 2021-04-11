/**
 * usage: node simple app -i
 * simple：脚本文件     
 * app：要生成的项目的名称
 * -i：参数，表示要同时生成index.html文件       
*/

const fs = require('fs')
const path = require('path')

// 获取用户要生成的项目名称
let appName = process.argv[2]

// 根据项目名称生成指定的目录
let appRoot = path.join(__dirname, appName)
// console.log('appRoot', appRoot)
if (fs.existsSync(appRoot)) {
    process.stdout.write(`${appName}项目已经存在，请勿重复创建`)
    process.exit()
}
fs.mkdirSync(appRoot)
fs.mkdirSync(appRoot + '/images')
fs.mkdirSync(appRoot + '/css')
fs.mkdirSync(appRoot+'/js')

// 判断是否存在 -i 选项
if (process.argv.includes('-i')) {
    fs.writeFileSync(appRoot+'/index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${appName}</title>
</head>
<body>
   
</body>
</html>
    `)
}

console.log('项目模板已经创建完成')

