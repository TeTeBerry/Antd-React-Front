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
            <Form.Item label="ID">
              {getFieldDecorator("mid", {
                rules: [{ required: true, message: "Please input meter name!" }]
              })(<Input disabled={this.state.disabled} />)}
            </Form.Item>
            <Form.Item label="Meter Name">
              {getFieldDecorator("meterName", {
                rules: [{ required: true, message: "Please input meter name!" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Descriptions">
              {getFieldDecorator("meterDesc", {
                rules: [
                  { required: true, message: "Please input descriptions!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Member Name">
              {getFieldDecorator("memberName", {
                rules: [
                  { required: true, message: "Please input member name!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Room Number">
              {getFieldDecorator("room", {
                rules: [
                  { required: true, message: "Please input room number!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Member Contact">
              {getFieldDecorator("memberContact", {
                rules: [
                  { required: true, message: "Please input member contact!" }
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
