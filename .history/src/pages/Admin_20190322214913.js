
import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import AuthService from './AuthService';
import { Modal, Button } from 'antd';


 const confirm = Modal.confirm;


const columns = [{
  title: 'Username',
  dataIndex: 'username',
}, {
  title: 'First Name',
  dataIndex: 'firstName',
}, {
  title: 'Last Name',
  dataIndex: 'lastName',
}, {
  title: 'Action',
  key: 'action',
  render: () => (
    <Button onClick={this.showDeleteConfirm} type="danger">
      Delete
    </Button>
  ),
}];




class Admin extends React.Component {
    Auth = new AuthService();
    state = {
      userList :[]
      }

 showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}


      componentDidMount() {
        const token = localStorage.getItem('id_token')
        axios.get("http://localhost:4000/users", { headers: {"Authorization" : `Bearer ${token}`}})
        .then(data => {
          this.setState({
           userList: data.data
          });
        }).catch((error) => {
          console.log(error);
        })
      }

    render() { 
      const {userList } = this.state;
        return ( 
         <Table  rowKey={record => record._id} columns={columns} dataSource={userList} />
         );
    }
}
 
export default Admin;