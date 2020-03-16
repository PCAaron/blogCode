const MyPlugin = require('./plugin')
const Compiler = require('./Compiler')
const myPlugin = new MyPlugin();
const options = {
    plugins: [myPlugin]
}
const compiler = new Compiler();
for (const plugin of options.plugins) {
    if (typeof plugin === "function") {
        plugin.call(compiler, compiler);
    } else {
        plugin.apply(compiler);
    }
}
compiler.run();