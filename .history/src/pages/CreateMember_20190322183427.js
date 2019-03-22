import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { Form, Input} from 'antd';
import { Link } from 'react-router-dom';

class CreateMember extends Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading} = this.state;
    const { getFieldDecorator } = this.props.form;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create Member
        </Button>
        <Modal
          title="Create Member"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
              label="First Name"
            >
              {getFieldDecorator('firstname', {
                rules: [{ required: true, message: 'Please input your First Name!' }],
              })(
                <Input onChange={this.onChangeFirstName}/>
              )}
            </Form.Item>
            <Form.Item
              label="Last Name"
            >
              {getFieldDecorator('lastname', {
                rules: [{ required: true, message: 'Please input your Last Name!' }],
              })(
                <Input onChange={this.onChangeLastName}/>
              )}
            </Form.Item>
            <Form.Item
              label="Username"
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input onChange={this.onChangeUsername}/>
              )}
            </Form.Item>
            <Form.Item
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" onChange={this.onChangePassword}/>
              )}
            </Form.Item>
            <Form.Item
              label="Confirm Password"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
          <Link to="/login" style={{padding:15}}>Cancel</Link>
        </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(CreateMember);
export default WrappedRegistrationForm;