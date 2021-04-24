const net = require('net')
const fs = require('fs')
/**
 * 创建客户端
 *  net.Socket类
*/
/**
 * 创建客户端端对象
		const socket = new net.Socket()
		const socket = net.createConnection(port[, host][, connectListener])
*/
// 连接目标主机地址及端口号
const client = net.createConnection(12345, '127.0.0.1')

// 监听数据传输
let chunk = Buffer.alloc(0)
client.on('data', data => {
    console.log('服务器返回：', data)
    chunk = Buffer.concat([chunk, data], chunk.length + data.length)
    // client.write('client已收到数据')
})

// 当数据包接受完成的时候触发
client.on('end', () => {
    fs.writeFileSync('./test.jpg', chunk)
    console.log('数据已完成接收')
})