/*
 * @Descripttion: Web
 * @Author: Aaron
 * @Date: 2020-1-9-9:47
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Index extends React.Component{
    render(){
        return (
            <div className='index'>
                index page
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
)
