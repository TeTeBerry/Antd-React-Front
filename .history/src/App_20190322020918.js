import React, { Component } from 'react';
import { Layout, Menu,} from 'antd';
import './App.css';
import AuthService from './pages/AuthService';
import withAuth from './pages/withAuth';
import { Radio } from 'antd';


const { Header } = Layout;
 
const Auth = new AuthService();
class App extends Component {
  state = {
    username: ''
  }

  Auth = new AuthService();

  componentWillMount() {
    if (!Auth.loggedIn()) {
        this.props.history.replace('/login')
    }
    else {
        /* Try to get confirmation message from the Auth helper. */
        try {
            
            const confirm = Auth.getConfirm()
            console.log("confirmation is:", confirm);
            this.setState({
                confirm: confirm,
                loaded: true
            })
        }
        /* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
        catch (err) {
            console.log(err);
            Auth.logout()
            this.props.history.replace('/login');
        }
    }
}

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    let name = null;
    if (this.props.confirm) {
      name = this.props.confirm.username;
    }
    //let name = this.props.confirm.username;
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
       <h5>Welcome, {name}</h5>
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
     </Header>
     </Layout>
  );  
  }
}

export default App;