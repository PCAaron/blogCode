/*
 * @Descripttion: WEB全栈笔记代码
 * @Author: Aaron
 * @Date: 2020-1-6-10:51
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import './main.less'
import logo from './logo.jpg'

class Index extends React.Component{
    render() {
        return (
            <div className="bg">
                <h1>
                    <img src={logo}/>
                </h1>
                react text
                <div className='main'>
                    <h1 className='font'>字体大小</h1>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
)
