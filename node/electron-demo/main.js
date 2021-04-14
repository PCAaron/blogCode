const { app, BrowserWindow, ipcMain } = require('electron')

global.username = 'alex'

let datas = {
    username: 'alex',
    gender: 'male'
}

app.on('ready', () => {
    const win = new BrowserWindow()

    win.webContents.openDevTools()
    win.loadFile('./layout/index.html')

    // 监听渲染进程ipcRenderer发送的消息
    ipcMain.on('getData', (e, key) => {
        console.log(data)
        // e.sender: 通过该对象返回消息给渲染进程
        e.sender.send('sendData', datas[key])
    })

    // 主进程主动发送消息到渲染进程
    win.webContents.send('hello' ,'hello win')

    const win2 = new BrowserWindow()
    win2.webContents.openDevTools()
    win2.loadFile('./layout/index2.html')
})