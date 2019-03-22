
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
      firstname: "",
      lastname: "",
      username: "", 
      }

      componentDidMount() {
        console.log(this.Auth.loggedIn())
        console.log(localStorage.getItem('id_token'));
        axios.get("http://localhost:4000/users")
        .then(data => {
          this.setState({
            firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
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