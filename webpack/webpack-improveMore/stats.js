const webpack = require('webpack')
const config = require('./webpack.prod')

webpack(config,(err,stats) => {
    if(err){
        return console.error(err)
    }
    if(stats.hasErrors()){
        return console.error(stats.toString('errors-only'))
    }
    console.log(stats)
})