import React, { Component } from 'react';
import CreateMember from './CreateMember';
import { Table } from 'antd';
import { Modal,Button,Divider,Form, Input } from 'antd';
import axios from 'axios';

const confirm = Modal.confirm;
const domain = 'http://localhost:4000/members';
const token = localStorage.getItem('id_token')
const header = {'Authorization' : `Bearer ${token}`}


class Member extends Component {
    state = {
        memberList: []
    }

    
    componentDidMount() {
      axios.get(domain, {headers: header})
      .then((data) => {
          this.setState({
              memberList: data.data
          });
      }).catch((error) => {
          console.log(error);
      })

    }
    render(){
        const columns = [{
            title: 'Member Name',
            dataIndex: 'membername',
          }, {
            title: 'Room Number',
            dataIndex: 'room',
          }, {
            title: 'Phone Number',
            dataIndex: 'tel',
          }, {
            title: 'Email',
            dataIndex: 'email',
          },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
        <span>
          <Button onClick={() => this.showEditMoal(record._id)}>Edit</Button>
          <Divider type="vertical" />
          <Button onClick={() =>this.showDeleteConfirm(record._id,record.membername)} type="danger">Delete</Button>
        </span>
            ),
          }];
          
          const { memberList } = this.state;
        return(
            <CreateMember/>,
            <br/>,
            <Table  rowKey={record => record._id} columns={columns} dataSource={memberList} />

        )
    }
}



export default Member;