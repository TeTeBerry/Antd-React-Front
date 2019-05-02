import React, { Component } from 'react';
import { Layout, Menu,} from 'antd';
import './App.css';
import AuthService from './pages/AuthService';
import withAuth from './pages/withAuth';
import { Radio } from 'antd';
import Admin from'./pages/Admin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Member from './pages/Member'
import Report from './pages/Report';








const { Header, Content, Footer } = Layout;
 
const Auth = new AuthService();

const Navigation = ({ handleLogout, sub }) => {
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo">
        <p>IoT Smart Water Meter</p>
      </div>
      <div className="logout">
        <Radio.Button value="small" onClick={handleLogout}>LOGOUT<Link to="/log" /></Radio.Button>
      </div>
      <div className="userlogin">
        <h5>Welcome, {sub}</h5>
      </div>
      

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Admin<Link to="/" /></Menu.Item>
        <Menu.Item key="2">Meter<Link to="/member" /></Menu.Item>
       
      </Menu>
    </Header>
  );
}

class App extends Component {
  

  _handleLogout = () => {
    Auth.logout()
    this.props.history.replace('/login')
   
  }

  render() {
    console.log("Rendering Appjs!")
    return (
      <Router>
      <Layout className="layout">
     <Content style={{ padding: '50px 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <Route path="/" render={() => {
          return <Navigation handleLogout={this._handleLogout} sub={this.confirm.sub} />
        }} />
        <Route exact path="/" component={Admin}/>
        <Route exact path="/member" component={Member}/>
        <Route exact path="/report" component={Report}/>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
    IoT Smart Water Meter ©2019 Created by ZiyuChen&&ZengyuLi
    </Footer>
     </Layout>
     </Router>
  
  );  
  }
}

export default withAuth(App);