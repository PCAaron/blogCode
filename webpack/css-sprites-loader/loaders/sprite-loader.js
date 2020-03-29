const fs = require('fs')
const path = require('path')
const Spritesmith = require('spritesmith');

module.exports = function (source) {
    const cb = this.async()
    const imgs = source.match(/url\((\S*)\?_sprite/g)
    const matchedImgs = []

    for(let i =0;i<imgs.length;i++){
        const img = imgs[i].match(/url\((\S*)\?_sprite/)[1]
        console.log(img)
        matchedImgs.push(
            path.join(__dirname, img)
        )
    }
    Spritesmith.run({
        src: matchedImgs
    }, (err, result) => {
        if(err){
            cb(err,'')
            return
        }
        console.log(result)
        fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'),result.image)
        source = source.replace(/url\((\S*)\?_sprite/g, (match) => {
            return `url("dist/sprite.jpg")`
        })
        cb(null, source)
    })
}