// 扫描模板中所有依赖，{{}}，dom属性，v-xxx指令，@方法等创建函数和Watcher
class Compile{
    //el 宿主元素或选择器
    //vm 当前Vue实例
    constructor(el,vm){
        this.$vm = vm
        this.$el = document.querySelector(el)//设置为默认选择器

        if(this.$el){
            // 将dom转换成代码块Fragment，提高性能,效率
            this.$fragment = this.node2Fragment(this.$el)
            //执行编译
            this.compile(this.$fragment)
            //将生成的结果追加至宿主元素
            this.$el.appendChild(this.$fragment)
        }
    }
    node2Fragment(el){
        // 创建新的Fragment
        const fragment = document.createDocumentFragment()
        let child;
        // 将原生节点拷贝至fragment
        while(child = el.firstChild){ //获取el任意子节点，有可能是注释，文本节点，元素等
            // appendChild是移动操作
            fragment.appendChild(child)
        }
        return fragment
    }
    // 编译指定片段
    compile(el){
        let childNodes = el.childNodes
        // 将类数组转为数组并遍历节点
        Array.from(childNodes).forEach(node => {
            //判断node类型，做相应处理
            if(this.isElementNode(node)){
                //元素节点，要识别v-xx或者@xx
                this.compileElement(node)
            } else if(this.isTextNode(node) && /\{\{(.*)\}\}/.test(node.textContent)){
                // 文本节点，只关系{{xx}}形式
                this.compileText(node,RegExp.$1); //RegExp.$1,匹配内容
            }
            // 递归，遍历可能存在的子节点
            if(node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        })
    }

    //编译元素节点
    compileElement(node){
        //<div v-test='test' @click='handleClick'></div>
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
            //规定指令 v-test='test' @click='handleClick'
            const attrName = attr.name //属性名
            const exp = attr.value  //属性值
            if(this.isDirective(attrName)){ //指令
                const dir = attrName.substr(2)  //v-text -> text
                this[dir] && this[dir](node,this.$vm,exp)
            } else if (this.isEventDirective(attrName)){ //事件
                const dir = attrName.substr(1) //click
                this.eventHandler(node,this.$vm,exp,dir)
            }
        })
    }
    //编译文本节点
    compileText(node,exp){
        this.text(node,this.$vm,exp)
    }
    isElementNode(node){
        return node.nodeType == 1 //元素节点
    }
    isTextNode(node){
        return node.nodeType == 3 //文本节点
    }

    isDirective(attr){
        return attr.indexOf('v-') == 0
    }
    isEventDirective(dir){
        return dir.indexOf('@') == 0
    }
    //文本更新
    text(node,vm,exp){
        this.update(node,vm,exp,'text')
    }
    //处理html
    html(node,vm,exp){
        this.update(node,vm,exp,'html')
    }
    //双向绑定
    model(node,vm,exp){
        this.update(node,vm,exp,'model')

        const val = vm.exp
        //双向绑定还要处理视图对模型的更新
        node.addEventListener('input',e=>{
            vm[exp] = e.target.value
        })
    }

    //更新函数Updater
    update(node,vm,exp,dir){
        let updateFn = this[dir+'Updater']
        updateFn && updateFn(node,vm[exp]) //立刻执行更新，get Compile -> Updater
        new Watcher(vm,exp,function (value) { //当监听到变化时再执行更新    Watcher -> Updater
            updateFn && updateFn(node,value)
        })
    }
    //执行DOM操作
    textUpdater(node,value){
        node.textContent = value
    }
    htmlUpdater(node,value){
        node.innerHTML = value
    }
    modelUpdater(node,value){
        node.value = value
    }

    eventHandler(node,vm,exp,dir){
        let fn = vm.$options.methods && vm.$options.methods[exp]
        if(dir && fn){
            node.addEventListener(dir,fn.bind(vm)) // fn.bind，绑定当前实例vm
        }
    }
}