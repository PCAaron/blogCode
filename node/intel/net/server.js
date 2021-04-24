/**
 * 在node中，tcp协议，基于net模块来实现的
 * 
*/

const net =  require('net')
const fs = require('fs')
/**
 * 1.创建服务端对象
 *  监听地址及端口
 *  处理发送到当前监听地址及端口的数据
 *  返回数据到连接的客户端
*/
// net.Server 类
/**
 * const server = new net.Server()
   const server = net.createServer([port[, host]])
	监听端口，处理请求
*/
const server = net.createServer(() => {
    // 当前函数其实是connection事件绑定的函数
    /**
     * function createServer(cb) {
     *  let s = new net.createServer()
     *  s.on('connettion', cb)
     *  return s
     * }
    */
})

// 当有客户端连接的时候触发
server.on('connection', socket => {
    // socket : 当前连接的socket对象
    // socket.remoteAddress: 客户端ip
    // socket.remotePort:客户端接口
    console.log('客户端连接了', socket.remoteAddress, socket.remotePort)

    let buf = fs.readFileSync('../img.jpg')
    socket.write(buf)
    socket.end()
    socket.on('data', data => {
        // socket.write('服务器端已收到数据---')
        
    })
})

/**
 * 监听地址及端口
*/
server.listen(12345, '127.0.0.1')
