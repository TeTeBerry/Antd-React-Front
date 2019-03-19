import React, { Component } from 'react';
import { Layout, Menu,} from 'antd';

const { Header } = Layout;

class Layouts extends Component {
    render() {
        return(
            <Layout className="App">
            <Header className="App-header">
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
           
           </Header>
           </Layout>
        )
    }
}

export default Layouts;