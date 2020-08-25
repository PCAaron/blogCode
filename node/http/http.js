// 引用http模块
const http = require('http')
// 引入url模块,解析url
const url = require('url')

// 创建一个http服务器，回调函数表示接收到请求后做的事情
const server = http.createServer((req,res) => {
    // req参数表示请求，res表示响应

    // url.parse将url地址解析出url对象：host,pathname,query,hash...
    const { pathname, query, hash} = url.parse(req.url, true) // true将query转化为k-v
    // 所有的路由设计，都是基于req.url
    console.log('服务器接收到了请求' + req.url, pathname, query, hash)

    // 设置响应头类型
    res.writeHead(200, {
        'Content-type': 'text/html;charset=UTF8'
    }) // res.setHeader('Content-type','text/html;charset=UTF8')
    // 写入
    res.write('<h1>write h1</h1>')
    // 表示响应头及响应体已经发送完成信号
    res.end('<h1>标题</h1>')
})

// 监听端口,IP
server.listen(3000, 'localhost')