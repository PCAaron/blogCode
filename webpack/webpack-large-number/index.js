if (process.env.NODE_ENV == 'production') {
    module.exports = requier('./dist/webpack-large-number.min.js')
} else {
    module.exports = require('./dist/webpack-large-number')
}