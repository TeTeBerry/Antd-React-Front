import React, { Component } from 'react';
import { Layout, Menu,} from 'antd';
import './Layouts.css';

const { Header, Content, Footer } = Layout;

class Layouts extends Component {
    render() {
        return(
          <Layout className="layout">
            <Header  className="layout-header">
            <h1> IoT Smart Water Meter</h1>
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
             <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
           
           </Header>
           </Layout>
        )
    }
}

export default Layouts;