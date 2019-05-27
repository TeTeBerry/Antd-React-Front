import React, { Component } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const CollectionUpdateForm = Form.create({ name: "form_in_modal" })(
  class UpdateMember extends Component {
    state = {
      disabled: true,
      visible: false
    };

    render() {
      const { visible, onCancel, handleSubmit, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Edit Form"
          okText="OK"
          onCancel={onCancel}
          onOk={handleSubmit}
        >
          <Form layout="vertical">
            {/* <Form.Item label="ID">
              {getFieldDecorator('_id', { 
                  rules: [{ required: true, message: 'Please input member name!' }],
                })(
                    <InputNumber  disabled={this.state.disabled} />
                )}
              </Form.Item> */}

            <Form.Item label="Meter Name">
              {getFieldDecorator("metername", {
                rules: [{ required: true, message: "Please input meter name!" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Descriptions">
              {getFieldDecorator("descriptions", {
                rules: [
                  { required: true, message: "Please input phone number!" }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default CollectionUpdateForm;
