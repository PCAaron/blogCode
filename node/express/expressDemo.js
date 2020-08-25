const express = require('express')
const app = express()
const router = express.Router()
const simpleRouter = require('./router')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))

app.post('/',(req,res)=>{
    console.log(req.body)
})

app.use('/simple',simpleRouter)

app.use('/',[mw1],mw2)

function mw1(req,res,next){
    req.user ={name:'test'}
    next('123')
    console.log('mw1 done')
}

function mw2(req,res,next){
    console.log('mw2 done')
    console.log(JSON.stringify(req.user))
    next()
}

// 监听/?username=abc&birthday=19
app.get('/:name',(req,res)=>{
    //console.log(`${req.method}`) // GET
    //console.log(JSON.stringify(req.query)) //{"username":"aba","birthday":"19"}
    //console.log(req.params.name)
    //console.log(req.get('Accept'))
    //res.set('Content-Type','application/json;chartset=utf-8')
    //res.status(404)
    //return res.send(JSON.stringify({code:1}))

    return res.json({code:'0'})
})

app.use((err,req,res,next)=>{
    res.status(401)
    res.json({code:'-1',msg:'error'})
})

app.listen('8200',()=>{
    console.log('server...')
})