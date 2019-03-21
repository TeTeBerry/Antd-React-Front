import React, { Component } from 'react';
import { Layout, Menu,} from 'antd';
import './App.css';
import { Link, Redirect } from 'react-router-dom';
import AuthService from './pages/AuthService';
import withAuth from './pages/withAuth';


const { Header } = Layout;

class App extends Component {
  state = {
    username: ''
  }

  Auth = new AuthService();

  render() {
    return (
      <Layout className="layout">
      <Header  className="layout-header">
      <div className="logo"> 
      <p>IoT Smart Water Meter</p>
      </div>
       <Menu
         theme="dark"
         mode="horizontal"
         defaultSelectedKeys={['2']}
         style={{ lineHeight: '64px' }}
       > 
         <Menu.Item key="1">Admin</Menu.Item>
         <Menu.Item key="2">Member</Menu.Item>
         <Menu.Item key="3">Report</Menu.Item>
       </Menu>
       <div className="userlogin">
       <h5>Welcome, tete</h5>
       <button onClick={this._handleLogout}>LOGOUT</button>
       </div>
     </Header>
     </Layout>
  );  
  }
}

export default App;