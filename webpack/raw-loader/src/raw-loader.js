const loaderUtils = require('loader-utils')
const path = require('path')
const fs = require('fs')

module.exports = function (source) {
    // loader-utils：getOptions获取loader传递的参数
    const { name } = loaderUtils.getOptions(this)
    console.log(name)
    //关闭缓存
    this.cacheable(false)

    // 异步方式
    const callback = this.async()

    const json = JSON.stringify(source)
    json.replace(/\u2028/g,'\\u2028') // 行分隔符转义
        .replace(/\u2029/g,'\\u2029') // 段落分隔符转义
    //return `export default ${json}`
    // 同步抛出错误
    // throw new Error('err')
    // 或this.callback抛出错误或者返回内容
    //this.callback(null, json)

    fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
        if(err) {
            callback(err, '')
            return
        }
        callback(null, data)
    })
}

