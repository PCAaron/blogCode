if (process.env.NODE_ENV == 'production') {
    module.exports = requier('./dist/w-large-number.min.js')
} else {
    module.exports = require('./dist/w-large-number')
}