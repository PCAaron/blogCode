/**
 * 服务端
 * 监听当前服务器上指定的ip与端口，如果有数据发送到给定ip和端口上，
 * 就进行相应处理
*/

const dgram = require('dgram')

/**
 * 创建socket类，socket就是用来处理网络数据的一个标准API对象
 * 通过socket，就可以对网络数据进行读取和输出
*/
// udp4 -> ipv4
const serverSocket = dgram.createSocket('udp4') // new dgram.Socket()

// 事件：error
serverSocket.on('error', (err) => {
    console.log(`服务器异常：\n${err.stack}`)
    // 事件：close
    serverSocket.close()
})

// 事件：listening
serverSocket.on('listening', () => {
    console.log('服务开启成功，等待数据...')
})

/**
 * 当接收到数据的时候触发
 * 事件：message
*/
serverSocket.on('message', data => {
    console.log('接收到数据', data.toString())
    // 关闭服务.close()
    serverSocket.close()
})

/**
 * 监听指定的地址和端口
 * 
 * server.bind([port][, address][, callback])
*  prot: 未指定则由系统分配
*  address: 默认 0.0.0.0，表示所有地址/IP
*  callback: 绑定成功后的回调
*/
serverSocket.bind(12345, '127.0.0.1')


