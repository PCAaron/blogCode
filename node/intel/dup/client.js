const dgram = require('dgram')
const clientSocket = dgram.createSocket('udp4')

/**
 * 发送数据
 * UDP,无连接协议，不需要连接到服务器，然后再发数据
 * server.send(msg, port, [address])
			msg: 发送的数据（字符串/Buffer）
*/

clientSocket.send('hello udp', 12345, '127.0.0.1')