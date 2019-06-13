import React, { Component } from 'react';
import CreateMember from './CreateMember';
import { Table } from 'antd';
import { Modal,Button,Divider,Form, Input } from 'antd';
import axios from 'axios';

const confirm = Modal.confirm;
const domain = 'http://localhost:4000/members';
const token = localStorage.getItem('id_token')
const header = {'Authorization' : `Bearer ${token}`}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

class Member extends Component {
    state = {
        memberList: []
    }

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
    render(){
        const {
            visible, onCancel, onCreate, form,
          } = this.props;
        const { getFieldDecorator } = form;
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
          <Button onClick={() => this.showEditMoal(record._id)}>Edit</Button>
          <Divider type="vertical" />
          <Button onClick={() =>this.showDeleteConfirm(record._id,record.membername)} type="danger">Delete</Button>
        </span>
            ),
          }];
          
          const { memberList } = this.state;
        return(
            <CreateMember/>,

            <Table  rowKey={record => record._id} columns={columns} dataSource={memberList} />,

            <Modal
            visible={visible}
            title="Edit Member"
            okText="Edit"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Member Name">
                {getFieldDecorator('membername', {
                  rules: [{ required: true, message: 'Please input member name!' }],
                })(
                  <Input onChange={this.onChangeMembername}/>
                )}
              </Form.Item>
              <Form.Item label="Phone Number">
              {getFieldDecorator('tel', {
                  rules: [{ required: true, message: 'Please input phone number!' }],
                })(
                  <Input onChange={this.onChangeTel}/>
                )}
              
              </Form.Item>
              <Form.Item label="Room Number">
              {getFieldDecorator('room', {
                  rules: [{ required: true, message: 'Please input room number!' }],
                })(
                  <Input onChange={this.onChangeRoom}/>
                )}
              
              </Form.Item>
              <Form.Item
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input onChange={this.onChangeEmail}/>
            )}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input type="password" onChange={this.onChangePassword}/>
            )}
          </Form.Item>
            </Form>
          </Modal>
        );
    }
  }
);
class CollectionsPage extends React.Component {
    state = {
      visible: false,
      membername: '',
      room: '',
      password: '',
      tel: '',
      email: '',
    };
  
    showModal = () => {
      this.setState({ visible: true });
    }
  
    handleCancel = () => {
      this.setState({ visible: false });
    }
  
    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
      });
      axios.post('http://localhost:4000/members/register',{
        membername: this.state.membername,
        room: this.state.room,
        email: this.state,
        tel: this.state.tel,
        password: this.state.password
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error);
        alert(error.response.data);
      })
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
  
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>Create Member</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
  }
export default CollectionsPage;