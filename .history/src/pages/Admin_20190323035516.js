
import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import AuthService from './AuthService';
import { Modal,Divider, Button } from 'antd';

 const confirm = Modal.confirm;
 const token = localStorage.getItem('id_token')
class Admin extends React.Component {
    Auth = new AuthService();
    state = {
      userList :[]
      }
      showDeleteConfirm(_id,username){
        console.log(_id)
        confirm({
          title: `Are you sure delete ${username}?`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onCancel() {
            console.log('Cancel');
          },
          OnOk:this.deleteAdmin(_id),
        });
      }
      
      componentWillMount() {
        axios.get('http://localhost:4000/users', { headers: {'Authorization' : `Bearer ${token}`}})
        .then(data => {
          this.setState({
           userList: data.data
          });
        }).catch((error) => {
          console.log(error);
        })
      }
      deleteAdmin = (_id)=> {
        axios.delete('http://localhost:4000/users/'+_id,{ headers: {'Authorization' : `Bearer ${token}`}})
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
        render: (text, record) => (
          <span>
      <a href="#">Invite {record.username}</a>
      <Divider type="vertical" />
      <a href="#"onClick={()=>this.showDeleteConfirm(record._id,record.username)}>Delete</a>
    </span>
        ),
      }];
      
      const {userList } = this.state;
        return ( 
         <Table  rowKey={record => record._id} columns={columns} dataSource={userList} />
         );
    }
}
 
export default Admin;