import React, { Component } from 'react';
import { Layout, Menu,} from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="App">
     <Header className="App-header">
     <h1> IoT Smart Water Meter</h1>
      <div className="logo" />
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
    
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
    IoT Smart Water Meter ©2019 Created by CAMT
    </Footer>
    </Layout>
  );  
  }
}

export default App;