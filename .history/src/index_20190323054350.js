import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import NormalLoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import Table from './pages/Admin'
import { Link } from 'react-router-dom'



ReactDOM.render(
    <Router>
    <div className="App">
    <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/user/add">添加用户</Link></li>
                <li><Link to="/user/list">用户列表</Link></li>
                <li><Link to="/book/add">添加图书</Link></li>
                <li><Link to="/book/list">图书列表</Link></li>
            </ul>

            <hr/>
    
    <Route exact path="/"  component={App}/>
    <Route exact path="/login" component={NormalLoginForm}/>
    <Route exact path="/register" component={RegisterForm}/>
    <Route exact path="/admin" component={Table}/>
    </div>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
