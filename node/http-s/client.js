const http = require('http')

/**
 * http.ClientRequest 类
 *  new http.ClientRequest() / http.request()
*/

// 创建一个客户端的对象
// 请求行： get http://127.0.0.1:80/ http:1.1
const client = http.request({
    // 基于tcp
    host: '127.0.0.1',
    port: 80,
    // http
    protocol: 'http:', // 使用的协议。默认为 http:
    method: 'get', // 指定 HTTP 请求方法的字符串。默认为 'GET'
    path: '/' //  请求的路径。默认为 '/'。 应包括查询字符串（如有的话）。如 '/index.html?page=12'
}, res => {
    // 相应服务器时触发
    res.on('data', data => {
        console.log('data', data.toString())
    })
    res.on('end', () => {
        console.log('end---')
    })
})

// 发送请求
client.write('')
client.end()