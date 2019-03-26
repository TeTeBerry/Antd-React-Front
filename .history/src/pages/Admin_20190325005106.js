
import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { Modal,Button } from 'antd';
import CreateMember from './CreateMember';

//common variables
 const confirm = Modal.confirm;
 const domain = 'http://localhost:4000/users';
 const token = localStorage.getItem('id_token')
 const header = {'Authorization' : `Bearer ${token}`}
class Admin extends React.Component {

    state = {
      userList :[]
      }

      deleteAdmin = (_id)=> {
        axios.delete(`${domain}/`+_id,{ headers:header})
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
      
      componentWillMount() {
        axios.get(domain, { headers: header})
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
      <Button onClick={()=>this.showDeleteConfirm(record._id,record.username)} type="danger">Delete</Button>
    </span>
        ),
      }];
      
      const { userList } = this.state;
        return ( 
          <CreateMember/>,
        
         <Table  rowKey={record => record._id} columns={columns} dataSource={userList} />
  
         
         );
    }
}
 
export default Admin;