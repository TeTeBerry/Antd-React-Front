
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
       userList : [] 
      }

      componentDidMount() {
        console.log(this.Auth.loggedIn());
        if(this.Auth.loggedIn()){
        axios.get("http://localhost:4000/users")
        .then(data => {
          console.log(data);
        }).catch((error) => {
          console.log(error);
        })
      }
      }

    render() { 
      const {userList } = this.state;
        return ( 
         <Table columns={columns} dataSource={userList} />
         );
    }
}
 
export default Admin;