(function(modules){
            function require(filename){
                var fn = modules[filename];
                var module = { exports: {} };
                
                fn(require, module, module.exports);
                return module.exports
            }
            require('D:\github\blogCode\webpack\easypack\src\index.js')
        })({'D:\github\blogCode\webpack\easypack\src\index.js': function (require, module, exports){"use strict";

var _hello = require("./hello.js");

document.write((0, _hello.hello)());},'./hello.js': function (require, module, exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = hello;
function hello() {
  return 'hello webpack';
}},})