class MyPlugin{
    constructor() {
    }
    apply(compiler){
        compiler.hooks.brake.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));
        compiler.hooks.accelerate.tap("LoggerPlugin", newSpeed =>
            console.log(`Accelerating to ${newSpeed}`)
        );
        compiler.hooks.calculateRoutes.tapPromise("calculateRoutes tapAsync",
            (source, target, routesList) => {
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        console.log(`tapPromise to ${source} ${target} ${routesList}`)
                        resolve();
                    },1000)
                });
            });
    }
}

module.exports = MyPlugin