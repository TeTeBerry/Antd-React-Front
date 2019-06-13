
import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import AuthService from './AuthService';
import { Modal, Button } from 'antd';

 const confirm = Modal.confirm;

class Admin extends React.Component {
    Auth = new AuthService();
    state = {
      userList :[]
      }
      showDeleteConfirm(){
        confirm({
          title: `Are you sure delete this admin?`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log()
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
      
      componentDidMount() {
        const token = localStorage.getItem('id_token')
        axios.get('http://localhost:4000/users', { headers: {'Authorization' : `Bearer ${token}`}})
        .then(data => {
          this.setState({
           userList: data.data
          });
        }).catch((error) => {
          console.log(error);
        })
      }
      deleteAdmin(_id) {
        axios.delete('http://localhost:4000/users/'+_id)
        .then((data) => {
          this.setState({
            userList: this.state.userList.filter(item => item._id !== _id)
          })
          console.log(data);
        }).catch((error) => {
          console.log(error);
        })
      }
      

    render() { 
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
        render: (_id) => (
          <Button  onClick={()=>this.showDeleteConfirm(_id)} type="danger">
            Delete
          </Button>
        ),
      }];
      
      const {userList } = this.state;
        return ( 
         <Table  rowKey={record => record._id} columns={columns} dataSource={userList} />
         );
    }
}
 
export default Admin;