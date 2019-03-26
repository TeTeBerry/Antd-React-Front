import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import NormalLoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import Member from './pages/Member'
import Report from './pages/Report';
import CreateMember from './pages/CreateMember'







ReactDOM.render(
    
    <Router>
    <div className="App">
  
    <Route exact path="/"  component={App}/>
    <Route exact path="/login" component={NormalLoginForm}/>
    <Route exact path="/register" component={RegisterForm}/>
    
    <Route path="/member" component={CreateMember}/>
    <Route path="/member" component={Member}/>
    <Route path="/report" component={Report}/>
    
 
   
    
 

    
    </div>
    </Router>

  
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
