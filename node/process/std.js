// 标准输出输入流       
const fs = require('fs')
process.stdout.write('请输入你想要创建的项目名称: ') // 向屏幕输入,console.log实现的就是流的输出

// 监听用户的输入
process.stdin.on('data', function(chunk) { // process.stdin为events的实力
    fs.mkdirSync(chunk.toString().replace('\r\n', '')) //替换非法回车
    process.stdout.write('项目创建成功')
})

