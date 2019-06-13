
import React from 'react';
import { Table } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
import AuthService from './AuthService';


const columns = [{
  title: 'Username',
  dataIndex: 'username',
  key: 'username',
}, {
  title: 'First Name',
  dataIndex: 'firstname',
  key: 'firstname',
}, {
  title: 'Last Name',
  dataIndex: 'lastname',
  key: 'lastname',
}, {
  title: 'Action',
  key: 'action',
  render: () => (
    <Button  type="danger">
      Delete
    </Button>
  ),
}];




class Admin extends React.Component {
    Auth = new AuthService();
    state = {
      userList :{}
      }

      componentDidMount() {
        console.log(this.Auth.loggedIn())
        console.log(localStorage.getItem('id_token'));
        const token = localStorage.getItem('id_token')
        axios.get("http://localhost:4000/users", { headers: {"Authorization" : `Bearer ${token}`}})
        .then(data => {
          this.setState({
           userList: data
          });
        }).catch((error) => {
          console.log(error);
        })
      }

    render() { 
      const {userList } = this.state;
        return ( 
         <Table columns={columns} dataSource={userList} />
         );
    }
}
 
export default Admin;