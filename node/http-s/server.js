const http = require('http')

/**
 * http.Server 类
 *  new http.Server() / http.createServer()
*/
const server = http.createServer()

/**
 * http.ImcomingMessage 类
 * request:客户端请求对象，保存了与当前这次请求得客户端相关的信息
 *  request本质时net.socket+http协议增加的内容
 *  request.socket => net.socket
 * response：服务端输出对象，提供了服务端输出(响应)相关的一些方法
*/
server.on('request', (request, response) => {
    console.log('接收到请求')
    switch(request.url){
        default:
            response.writeHead(404, http.STATUS_CODES[404], {
                'Content-Type':  'text/html;charset=UTF-8'
            })
            response.write('<h1>NOT FOUND</h1>')
            break
        case '/':
            // response.setHeader('Content-Type', 'text/html;charset=UTF-8')
            response.writeHead(200, 'ok', {
                'Content-Type':  'text/html;charset=UTF-8'
            })
            response.write('<h1>index</h1>')
            break
        case '/login':
            response.writeHead(301, http.STATUS_CODES[301], {
                'Content-Type':  'text/html;charset=UTF-8',
                // 重定向地址
                'Location': '/'
            })
            response.write('<h1>index</h1>')
            break
    }
    response.end()
})

// 80默认，约定，给http使用
server.listen(80, '0.0.0.0')