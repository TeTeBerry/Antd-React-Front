import React, { Component } from "react";
import { Modal, Form, Input } from "antd";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  class CreateMeterForm extends Component {
    render() {
      const { visible, onCancel, handleSubmit, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Create Form"
          okText="OK"
          onCancel={onCancel}
          onOk={handleSubmit}
        >
          <Form layout="vertical">
            <Form.Item label="Meter Name">
              {getFieldDecorator("meterName", {
                rules: [
                  { required: true, message: "Please input meter name!" },
                  { max: 10, message: "Please input correct meter name!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Descriptions">
              {getFieldDecorator("meterDesc", {
                rules: [
                  { required: true, message: "Please input descriptions!" },
                  { max: 30, message: "Max 30 digits!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Member Name">
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "Please input member name!" },
                  { max: 15, message: "Incorrect format!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Room Number">
              {getFieldDecorator("room", {
                rules: [
                  { required: true, message: "Please input room number!" },
                  { max: 5, message: "Invild room number!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Member Contact(Email)">
              {getFieldDecorator("contact", {
                rules: [
                  { required: true, message: "Please input member contact!" },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Member Password">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input member password!" },
                  { min: 4, message: "At least 4 digits!" }
                ]
              })(<Input.Password />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default CollectionCreateForm;
