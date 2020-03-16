const {
    SyncHook,
    AsyncSeriesHook
} = require('tapable')

class Car {
    constructor(){
        this.hooks = {
            accelerate: new SyncHook(['newspeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook(["source", "target", "routesList"])
        }
    }
}

const myCar = new Car()

// 绑定同步钩子
myCar.hooks.brake.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'))

// 绑定同步钩子并传参
myCar.hooks.accelerate.tap('LoggerPlugin', newSpeed => console.log('Accelerating to'+newSpeed))

//绑定一个异步Promise钩子
myCar.hooks.calculateRoutes.tapPromise('calculateRoutes tapPromise',(source, target, routesList)=>{
    console.log('source',source)
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(`tapPromise to ${source} ${target} ${routesList}`)
            resolve()
        },1000)
    })
})

//执行同步钩子
myCar.hooks.brake.call()
myCar.hooks.accelerate.call(10)
//执行异步钩子
myCar.hooks.calculateRoutes.promise('Async','hook','demo').then(()=>{
    console.log('succ')
},err=>{
    console.err(err)
})
