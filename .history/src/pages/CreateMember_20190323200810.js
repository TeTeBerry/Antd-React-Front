import React, { Component } from 'react';
import {
  Button, Modal, Form, Input,
} from 'antd';



const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class CreateMember extends Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
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
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Phone Number">
            {getFieldDecorator('tel', {
                rules: [{ required: true, message: 'Please input phone number!' }],
              })(
                <Input />
              )}
            
            </Form.Item>
            <Form.Item label="Room Number">
            {getFieldDecorator('room', {
                rules: [{ required: true, message: 'Please input room number!' }],
              })(
                <Input />
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
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input type="password" />
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