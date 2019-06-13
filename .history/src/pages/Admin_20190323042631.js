
import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import AuthService from './AuthService';
import { Modal } from 'antd';

 const confirm = Modal.confirm;
 const domain = 'http://localhost:4000/users';
 const token = localStorage.getItem('id_token')
class Admin extends React.Component {
    Auth = new AuthService();
    state = {
      userList :[]
      }

      deleteAdmin = (_id)=> {
        axios.delete(domain+'/'+_id,{ headers: {'Authorization' : `Bearer ${token}`}})
        .then((data) => {
          this.setState({
            userList: this.state.userList.filter(item => item._id !== _id)
          })
          console.log(data);
        }).catch((error) => {
          console.log(error);
        })
      }

      showDeleteConfirm(_id,username){
        console.log(_id)
        confirm({
          title: `Are you sure delete ${username}?`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk:()=>{
            this.deleteAdmin(_id);
            console.log('OK')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
      
      componentDidMount() {
        axios.get(domain, { headers: {'Authorization' : `Bearer ${token}`}})
        .then(data => {
          this.setState({
           userList: data.data
          });
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