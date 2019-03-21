import React, { Component } from 'react';
import { Layout, Menu,} from 'antd';
import './Layouts.css';

const { Header } = Layout;


class App extends Component {
  render() {
    return (
      <Layout className="layout">
      <Header  className="layout-header">
       <Menu
         theme="dark"
         mode="horizontal"
         defaultSelectedKeys={['2']}
         style={{ lineHeight: '64px' }}
       > 
         <Menu.Item className="title">IoT Smart Water Meter</Menu.Item>
         <Menu.Item key="1">Admin</Menu.Item>
         <Menu.Item key="2">Member</Menu.Item>
         <Menu.Item key="3">Report</Menu.Item>
       </Menu>
     </Header>
     </Layout>
  );  
  }
}

export default App;