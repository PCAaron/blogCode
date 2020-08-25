/**
 * 实现一个命令行龟兔赛跑动画
*/

const rabbit = '兔子'
const turtle = '乌龟'
const start = '|'
const end = '>>'
const pad = '.'
const speed = 1
const steps = 50 // 赛道一共50m
const stopAt = 42 // 兔子在42m停下
let stoped = false
let t = 0
let timer

// 计算兔子距离终点
const getRabbitLastSteps = () =>{
    return steps - t*speed - t*speed*3
}

// 乌龟距离终点
const getTurtleLastStep = () =>{
    return steps - t*speed
}

// 龟兔间距
const getGapSteps = () => {
    return stopAt - t*speed
}

// 初始赛道状态
const checkRaceInitState = () =>{
    return`${rabbit}${turtle}${start}${pad.repeat(steps)}${end}`
}

// 兔子领先时的赛道状态
const checkRaceState =() => {
    return `${start}${pad.repeat(t*speed)}${turtle}${pad.repeat(t*speed*3)}${rabbit}${pad.repeat(getRabbitLastSteps())}${end}`
}

// 分情况计算赛道的实时状态
const checkBackRaceState =() =>{
    if(getGapSteps() <= 0){
        if(getTurtleLastStep()===0){
            return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(steps-stopAt)}${end}${turtle}`
        } else {
            return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(t*speed - stopAt)}${turtle}${pad.repeat(getTurtleLastStep())}${end}`
        }
    } else {
        return `${start}${pad.repeat(t.speed)}${turtle}${pad.repeat(getGapSteps())}${rabbit}${pad.repeat(steps - stopAt)}${end}`
    }
}

const wait = (sec) => new Promise(resolve => setTimeout(() => resolve(), sec))

// 可以支持特效刷新的命令行日志模块
const chalkWorker = require('chalk-animation')
const initState = checkRaceInitState()
const racing = chalkWorker.rainbow(initState)

const updateRaceTrack = state => {
    racing.replace(state)
}

const race = () => {
    timer = setInterval(() => {
        // 判断是否兔子停下
        if (!stoped) {
            if (getRabbitLastSteps() <= (steps - stopAt)) {
                stoped = true
            }
        }

        if(stoped){
            let state = checkBackRaceState()
            updateRaceTrack(state)

            if(getTurtleLastStep() === 0) {
                // 乌龟过线后就停止定时器
                clearInterval(timer)
                return
            }
        } else {
            let state = checkRaceState()
            updateRaceTrack(state)
        }
        t++
    }, 150)
}

// 等待2再开始启动比赛
wait(2000).then(() => {
    race()
})



