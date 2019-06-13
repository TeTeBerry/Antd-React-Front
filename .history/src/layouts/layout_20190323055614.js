import React, { Component } from 'react';
import { Layout, Menu,} from 'antd';
import './App.css';
import AuthService from './pages/AuthService';
import withAuth from './pages/withAuth';
import { Radio } from 'antd';
import Table from'./pages/Admin';
import { Link } from 'react-router-dom';
import CreateMember from './pages/CreateMember';




const { Header, Content, Footer } = Layout;
 
const Auth = new AuthService();
class Layout extends Component {

  _handleLogout = () => {
    Auth.logout()
    this.props.history.replace('/login');
  }

  


  render() {
    console.log("Rendering Appjs!")
    return (
      <Layout className="layout">
      <Header  className="layout-header">
      <div className="logo"> 
      <p>IoT Smart Water Meter</p>
      </div>
      <div className="logout">
      <Radio.Button value="small" onClick={this._handleLogout}>LOGOUT</Radio.Button>
       </div>
      <div className="userlogin">
       <h5>Welcome, {this.props.confirm.sub}</h5>
       </div>
      

       <Menu
         theme="dark"
         mode="horizontal"
         defaultSelectedKeys={['2']}
         style={{ lineHeight: '64px' }}
       > 
         <Menu.Item key="/admin">
         <Link to="/admin">Admin</Link></Menu.Item>
         <Menu.Item key="2">Member</Menu.Item>
         <Menu.Item key="3">Report</Menu.Item>
       
       </Menu>
     </Header>
     {/* <Content style={{ padding: '0 50px' }}>
  
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <CreateMember/>
      <br/>
      <Table/>
      </div>
    </Content> */}
    <Footer style={{ textAlign: 'center' }}>
    IoT Smart Water Meter ©2019 Created by ZiyuChen&&ZengyuLi
    </Footer>
     </Layout>
  );  
  }
}

export default withAuth(Layout);