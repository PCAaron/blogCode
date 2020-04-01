const { RawSource } = require('webpack-sources')

module.exports = class Plugin {
    constructor(options){
        this.options = options
    }

    apply(compiler){
        console.log('plugin is executed')
        console.log(this.options)
        compiler.plugin("emit", function(compilation, callback) {
            compilation.assets['name'] = new RawSource('demo')
            callback()
        });
    }
}