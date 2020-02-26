class Vue{
    constructor(options){
        this.$data = options.data //保存data
        this.observe(this.$data) // 执行响应式，观察者

        this.$options = options //Compile调用

        //测试
        //new Watcher()
        //console.log('模拟compile',this.$data.test)
        this.$compile = new Compile(options.el,this)
    }

    observe(value){
        // 遍历data
        // 判断data是否存在且为对象类型
        if(!value || typeof value !== 'object'){
            return
        }
        //遍历data
        Object.keys(value).forEach(key=>{
            //为每一个key定义响应式
            this.defineReactive(value,key,value[key])
            //为vue的data做属性代理
            this.proxyData(key)
        })
    }
    //其中接受三个参数：要定义的对象，键值key和对应的值value
    defineReactive(obj,key,val){
        //递归查找嵌套的属性
        this.observe(val)

        // 创建Dep
        const dep = new Dep()

        // 为data对象定义属性
        Object.defineProperty(obj,key,{
            enumerable: true,//可枚举
            configurable: true, //可修改或删除
            get(){
                Dep.target && dep.addDep(Dep.target)
                console.log(dep.deps)
                return val
            },
            set(newVal){
                if(newVal === val){
                    return
                }
                console.log('数据发生变化~')
                val = newVal
                // 通知依赖进行更新
                dep.notify()
            }
        })
    }
    proxyData(key){
        //将data中的key定义到vm实例上
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key]
            },
            set(newVal){
                this.$data[key] = newVal
            }
        })
    }
}

//依赖管理器，负责将视图中所有依赖收集管理，包括依赖添加和通知
class Dep{
    constructor(){
        this.deps = [] //deps里面存放的是Watcher实例
    }
    addDep(dep){
        this.deps.push(dep)
    }
    //通知所有watcher执行更新
    notify(){
        this.deps.forEach(dep=>{
            dep.update()
        })
    }
}

//Watcher:具体的更新执行者
class Watcher {
    constructor(vm,key,cb){
        this.vm = vm
        this.key = key
        this.cb = cb
        //将来new一个监听器时候，将当前Watcher实例附加到Dep.target上
        // 当执行数据属性get时候，可以获取到对应依赖的实例
        Dep.target = this
        this.vm[this.key] // 触发data的get
        Dep.target = null //避免重复添加defineReactive中defineProperty重复set
    }

    //更新
    update(){
        console.log('视图更新')
        this.cb.call(this.vm,this.vm[this.key])
    }
}
