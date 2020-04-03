const http = require('http')
// 用于 URL 处理与解析
const parserUrl = require('url')
// 创建服务器实例createServer
const server = http.createServer()

// 伪造缓存
const users = []
// 通过请求方式来判断增删改查的对应操作
server.on('request',(req,res)=>{
    const { method, url } = req
    const ContentType = req.headers['content-type'] // 获取Content-type类型处理对应的数据
    /*
    * Url {
          protocol: null,
          slashes: null,
          auth: null,
          host: null,
          port: null,
          hostname: null,
          hash: null,
          search: null,
          query: null,
          pathname: '/',
          path: '/',
          href: '/'
        }
    * */
    const { path } = parserUrl.parse(url) // 返回url对象，属性包含protocol协议、host等
    if(path.indexOf('/user') === -1){
        res.statusCode = 403
        res.end(`${res.statusCode} not allowed!`)
        return
    }
    switch (method){
        case 'GET':
            res.statusCode = 200
            res.end(JSON.stringify(users))
            break;
        case 'POST':
            req.on('data',(beffer)=>{
                const userStr = beffer.toString()
                console.log(ContentType)
                if(ContentType === 'application/json'){
                    users.push(JSON.parse(userStr))
                }
                res.statusCode  = 201
            })
            req.on('end',()=>{
                res.statusCode = 200
                res.end('create user success')
            })
            break;
        case 'PATCH':
            req.on('data',(buffer)=>{
                const userStr = buffer.toString()
                if(ContentType === 'application/json'){
                    const updater = JSON.parse(userStr)
                    const user = users.find(u=>u.name == updater.name)
                    user.age = updater.age
                }
                res.statusCode = 201
            })
            req.on('end',()=>{
                res.statusCode = 200
                res.end('update success')
            })
            break;
        case 'DELETE':
            break
    }
})

server.listen(8200)