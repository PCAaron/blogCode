/*
 * @Descripttion: Web
 * @Author: Aaron
 * @Date: 2020-1-9-9:47
 */
import React from 'react'
import ReactDOM from 'react-dom'
import '../../common'
import './index.css'
import { a } from '../tree-shaking'

class Index extends React.Component{
    render(){
        const val = a()
        return (
            <div className='index'>
                index page,{val}
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
)
