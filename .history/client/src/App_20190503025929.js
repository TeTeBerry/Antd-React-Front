import React, { Component } from 'react';
import { Layout, Menu} from 'antd';
import './App.css';
import AuthService from './pages/AuthService';
import withAuth from './pages/withAuth';
import { Radio } from 'antd';
import Admin from'./pages/Admin';
import { BrowserRouter as Router,Switch, Route, HashRouter,Link,withRouter } from "react-router-dom";
import Member from './pages/Member'
import Report from './pages/Report';


const { Header, Content, Footer } = Layout;
 
const Auth = new AuthService();

const MenuItem = withRouter(({history}) => {
  return (
   <Menu
   theme="dark"
   mode="horizontal"
   defaultSelectedKeys={['/admin']}
   selectedKeys={[history.location.pathname]}
   style={{ lineHeight: '64px' }}
 >
   <Menu.Item key="1">Admin<Link to="/" /></Menu.Item>
   <Menu.Item key="2">Meter<Link to="/member" /></Menu.Item>
  
 </Menu>
  )
});
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
    
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo">
        <p>IoT Smart Water Meter</p>
      </div>
      <div className="logout">
        <Radio.Button value="small" onClick={this._handleLogout}>LOGOUT<Link to="/login" /></Radio.Button>
      </div>
      <div className="userlogin">
        <h5>Welcome, {this.props.confirm.sub}</h5>
      </div>
      
      <MenuItem/>
      
    </Header>
      
     <Content style={{ padding: '50px 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <Switch>
        <Route exact path="/" component={Admin}/>
        <Route path="/member" component={Member}/>
        <Route path="/report" component={Report}/>
        </Switch>
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