const fs = require('fs')
const path = require('path')
const { runLoaders } = require('loader-runner')

runLoaders({
    resource: path.join(__dirname, './src/demo.txt'),
    loaders: [
        //path.join(__dirname, './src/raw-loader.js')
        {
            loader: path.join(__dirname, './src/raw-loader.js'),
            // 配置loader可选参数
            options: {
                name: 'test'
            }
        }
    ],
    context: { minimize: true },
    readResource: fs.readFile.bind(fs)
},(err, result) => {
    err ? console.error(err) : console.log(result)
})


