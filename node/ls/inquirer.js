const inquirer = require('inquirer')

// 提问用户，与用户进行命令行的交互
// prompt数组中存放一个指定格式的对象，question对象
inquirer.prompt([
    {
        type: 'input',
        name: 'username',
        message: '请输入应用名称：',
        default: 'app',
        validate(val) {
            if (val.trim() === '') {
                return '应用名称不能为空'
            }
            return true
        },
        filter(val) { // 过滤用户输入的数据
            return val.toLowerCase()
        }
    },
    {
        type: 'confirm',
        name: 'ecmascript6',
        message: '是否启用ES6支持',
        default: true
    },
    {
        type: 'list',
        name: 'framework',
        message: '请选择框架类型：',
        choices: ['Vue', 'React', 'Angular'],
        default: 1
    }, {
        type: 'checkbox',
        name: 'tools',
        message:'请选择支持模块',
        choices: [{
            name: '使用eslint',
            value: 'eslint'
        }, {
            name: '使用mocha单元测试',
            value: 'mocha'
        }]
    }
]).then(answers => {
    console.log(answers)
})