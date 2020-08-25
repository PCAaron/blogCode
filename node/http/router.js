/**
 * 简单路由案例
 * /student/1234567890：为学生信息
 * /teacher/123456:为老师信息
*/

const http = require('http')
const url = require('url')

const server = http.createServer((req,res) => {
    // 获取url
    const { pathname, query } = url.parse(req.url, true) 
    console.log(url.parse(req.url))
    res.writeHead(200, {
        'Content-type': 'text/html;charset=UTF-8'
    })
    // substr判断url开头
    if(pathname.substr(0,9) === '/student/'){
        // 匹配学号
        const _studentid = pathname.substr(9)
        console.log('_studentid', _studentid)
        if(/^\d{10}$/.test(_studentid)){
            res.end('学生学号'+ _studentid)
        } else {
            res.end('学号错误')
        }
    } else if(pathname.substr(0,9) === '/teacher/'){
        // 匹配老师
        const _teacherid = pathname.substr(9)
        if(/^\d{6}$/.test(_teacherid)){
            res.end('老师信息'+ _teacherid)
        } else {
            res.end('老师信息错误')
        }
    } else {
        res.end('路径错误')
    }
})

server.listen(3000, '127.0.0.1')