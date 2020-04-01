const path = require('path')
const Plugin = require('./plugins/Plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new Plugin({
            name: 'plugin'
        })
    ]
}
