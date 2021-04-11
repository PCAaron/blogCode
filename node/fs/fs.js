const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {
    // 不处理图标
    if(req.url == '/favicon.icon') return
    // fs.mkdir，异步创建文件夹
    fs.mkdir('./album/aaa')

    

    // 存储所有的文件夹
    let folders = []

    // fs.readdir,读取文件夹下的文件
    fs.readdir('./album', (err, files) => {
        // files，数组，./album文件夹下的所有东西
        console.log(files)
        files.forEach(f => {
            // fs.stat，检测文件状态
            fs.stat(`./album/${f}`, (err, stats) => {
                // 检测这个路径是不是一个文件夹
                console.log(stats.isDirectory())
                if(stats.isDirectory()){
                    folders.push(f)
                }
            })
        })
    })
})

server.listen(3000, 'localhost')