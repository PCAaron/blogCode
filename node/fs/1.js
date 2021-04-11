const fs = require('fs')

// 写入数据到文件
// input/output => i/o操作 => 流，二进制 => buffer
// 数据(字符串，音频，视频，二进制) => buffer => stream
fs.writeFile('./1.txt', 'hello' , function (err) {
    if (err){
        console.error(err)
    } 
}) 
try {
    const res = fs.readFileSync('./1.txt')
    console.log(res.toString())
} catch (e) {
    console.error(e)
}

try {
    const info = fs.statSync('./1.txt')
    console.log(info)
    console.log(info.isDirectory()) // 是否是文件夹
} catch (e) {
    console.log(e)
}

// let dirPath='./a'
// rmdir(dirPath)

// function rmdir(dirPath) {
//     let files = fs.readdirSync(dirPath)
//     files.forEach(c => {
//         let childPath = dirPath + '/' + c
//         if (fs.statSync(childPath).isDirectory()) { // 判断是否是文件夹类型
//             rmdir(childPath) // 递归删除
//         } else {
//             fs.unlinkSync(childPath)
//         }
//     })
//     fs.rmdirSync(dirPath)
// }

// 监听文件，当文件发生变化的时候，触发回调
fs.watchFile('./data.txt', (cur, prv) => {
    console.log(`当前的最近修改时间是: ${cur.mtime}`);
    console.log(`之前的最近修改时间是: ${prv.mtime}`);
})

fs.watch('./a', (eventType, filename) => {
    console.log('change', eventType, filename)
})
