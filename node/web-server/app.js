/**
 * 后端人口文件
 * 提供web浏览器服务的工具
*/

const http = require('http')
const fs = require('fs')
const path = require('path')
const MIME = require('./libs/mime.js')
/**
 * 创建http服务器
*/
const app = http.createServer((req, res) => {
    console.log('接收到请求')

    // 静态资源处理
    let content = ''
    const staticSend = (filename, headers = {
        'Content-Type': 'text/html,charset=UTF-8'
    }, statusCode=200) => {
     if (fs.existsSync(filename)) {
        // 根据扩展名输出对应的MIME
        let ext = filename.substring(filename.lastIndexOf('.')+1) || 'txt'
        headers['Content-Type'] = `${MIME.getType(ext)},charset=UTF-8`
        res.writeHead(statusCode, http.STATUS_CODES[statusCode], headers)
        content = fs.readFileSync(filename)
        res.end(content)
     } else {
        staticSend(path.join(__dirname, 'static/404.html'), {
            'Content-Type': 'text/html,charset=UTF-8'
        }, 404)
     }
    }

    /**
     * req:ImcomingMessage类的实例对象，保存和提供了当前请求的客户端信息
     * res: ServerResponse类的实例对象，保存和提供了响应的相关方法
    */

    // 向客户端发送数据则需要使用res对象
    /**
     * 设置并写入头信息
     *  res.writeHead(状态码， 状态码描述， 头信息)
     * 设置头信息
     *  res.setHeader(头信息，信息描述)
    */
   
   
    /**
     * 通过fs读取对应的文件，返回给客户端
    */
   // 路由与资源匹配
   /**
    * 把动态与静态资源进行区分：url
    *   约定：以/staic开头的都算是静态
   */
  if (req.url.startsWith('/static')) {
    staticSend(path.join(__dirname, req.url))
  } else {
      //  动态资源
      switch(req.url) {
          case '/user': 
            res.writeHead(200, http.STATUS_CODES[200], {
                'Content-Type': 'application/json;charset=UTF-8'
            })
            let data = ['aa', 'bb']
            res.end(JSON.stringify(data))
            break
      }
  }
   

})


/**
 * 指定app监听的端口及ip
 * */ 
app.listen(80, () => {
    console.log(`服务已启动~`)
})