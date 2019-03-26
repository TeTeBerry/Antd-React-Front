import React, { Component } from 'react';
import { Button, Modal, Form, Input, Select} from 'antd';
import axios from 'axios';
import './CreateMember.css';

const { Option } = Select;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  //children component
  class CreateMember extends Component {
    onChangeMembername = (e) => {
      this.setState({
        membername: e.target.value
      })
    }
  
    onChangeTel = (e) => {
      this.setState({
        tel: e.target.value
      })
    }
  
    onChangeRoom = (e) => {
      this.setState({
        room: e.target.value
      })
    }
  
    onChangeEmail = (e) => {
      this.setState({
        email: e.target.value
      })
    }
  
    onChangePassword = (e) => {
      this.setState({
        password: e.target.value
      })
    }

    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '66',
      })(
        <Select style={{ width: 70 }}>
          <Option value="66">+66</Option>
        </Select>
      );

      return (
        <Modal
          visible={visible}
          title="Create Member"
          okText="Create"
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
            <Form.Item
          label="Phone Number"
        >
          {getFieldDecorator('tel', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector}  />
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
//parent component
class CollectionsPage extends React.Component {
  state = {
    visible: false,
    membername: "",
    room: "",
    password: "",
    tel: "",
    email: ""
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