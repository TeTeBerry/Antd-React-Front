import React, { Component } from 'react';
import CreateMember from './CreateMember';
import { Table } from 'antd';
import { Modal,Button,Divider} from 'antd';
import axios from 'axios';
import CollectionCreateForm from './MemberForm';

const confirm = Modal.confirm;
const domain = 'http://localhost:4000/members';
const token = localStorage.getItem('id_token')
const header = {'Authorization' : `Bearer ${token}`}


class Member extends Component {
    state = {
        memberList: [],
    };



    deleteMember = (_id)=> {
        axios.delete(`${domain}/`+_id,{ headers:header})
        .then((data) => {
          this.setState({
            memberList: this.state.memberList.filter(item => item._id !== _id)
          })
          console.log(data);
        }).catch((error) => {
          console.log(error);
        })
      }

      showDeleteConfirm(_id,membername){
        console.log(_id)
        confirm({
          title: `Are you sure delete ${membername}?`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk:()=>{
            this.deleteMember(_id);
            console.log('OK')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
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
    // componentDidUpdate() {
    //   axios.get(domain, {headers: header})
    //   .then((data) => {
    //       this.setState({
    //           memberList: data.data
    //       });
    //   }).catch((error) => {
    //       console.log(error);
    //   })

    // }
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
            render: (record) => (
        <span>
          <Button onClick={() => this.showEditMoal(record)}>Edit</Button>
          <Divider type="vertical" />
          <Button onClick={() =>this.showDeleteConfirm(record._id,record.membername)} type="danger">Delete</Button>
        </span>
            ),
          }];
          
          const { memberList } = this.state;
        return(
            <CreateMember/>,
            <br/>,
            <Table  rowKey={record => record._id} columns={columns} dataSource={memberList} />,
            <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            handleSubmit={this.handleUpdate}/>


        )
    }
}

 export default Member;