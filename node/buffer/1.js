let bf1 = new Buffer.alloc(4)

// bf1[1] = 'a'

console.log(bf1) // <Buffer 00 00 00 00> ,只能存储二进制值

bf1[1] = 96

console.log(bf1) // <Buffer 00 60 00 00>，转换为16进制

console.log(Buffer.byteLength('艾伦')) // 6
