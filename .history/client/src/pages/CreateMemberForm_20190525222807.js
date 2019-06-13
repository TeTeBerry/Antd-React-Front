import React, { Component } from 'react';
import { Modal, Form, Input} from 'antd';


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class CreateMember extends Component {
  
     
      render() {
        const {
          visible, onCancel, handleSubmit, form,
        } = this.props;
        const { getFieldDecorator } = form;
  
        return (
          <Modal
            visible={visible}
            title='Create Form'
            okText="OK"
            onCancel={onCancel}
            onOk={handleSubmit}
          >
            <Form layout="vertical">
            <Form.Item label="Meter ID">
                {getFieldDecorator('meterid', {
                  rules: [{ required: true, message: 'Please input meter ID!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Meter Name">
                {getFieldDecorator('metername', {
                  rules: [{ required: true, message: 'Please input meter name!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Descriptions">
              {getFieldDecorator('descriptions', {
                  rules: [{ required: true, message: 'Please input descriptions!' }],
                })(
                  <Input />
                )}
              
              </Form.Item>
              <Form.Item label="Member Name">
                {getFieldDecorator('membername', {
                  rules: [{ required: true, message: 'Please input meter name!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Room Number">
                {getFieldDecorator('roomnumber', {
                  rules: [{ required: true, message: 'Please input meter name!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Member Contact">
                {getFieldDecorator('membercontact', {
                  rules: [{ required: true, message: 'Please input meter name!' }],
                })(
                  <Input />
                )}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );

  export default CollectionCreateForm;