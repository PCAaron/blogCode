const express = require('express')
const router = express.Router()

/*router.get('/',(req,res)=>{
    res.json({code:0,msg:'simple router root'})
})*/

// 提供了router.route方法，restful风格的写法
router.route('/')
    .get((req,res)=>{
        res.json({code:0,msg:'getting simple'})
    })
    .post((req,res)=>{
        res.json({code:0,msg:'posting simple'})
    })

router.get('/simple',(req,res,next)=>{
    res.json({code:0,msg:'simple...'})
})

module.exports = router