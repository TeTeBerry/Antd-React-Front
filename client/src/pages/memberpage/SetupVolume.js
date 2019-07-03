import React from "react";
import { Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import q from "querystring";

const VolumeCreateForm = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Set up water volume"
          okText="Setup"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Member Name">
              {getFieldDecorator("memberName", {
                rules: [
                  {
                    required: true,
                    message: "Please input meter name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Volume">
              {getFieldDecorator("volume", {
                rules: [
                  {
                    required: true,
                    message: "Please input water volume!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class SetupVolume extends React.Component {
  state = {
    visible: false
  };
  error = () => {
    message.error("Set up volume fail!");
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  createSuccess = () => {
    message.success("Create success!");
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const formFields = form.getFieldsValue();
    const formData = q.stringify({
      memberName: formFields.memberName,
      volume: formFields.volume
    });
    console.log(formData);
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });

    axios
      .post("http://localhost:8080/iot/meter/setMemberVolume", formData)
      .then(res => {
        console.log(res.data);
        if (res.data.code !== 200) {
          return this.error();
        }
        this.createSuccess();
      });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Setup Volume
        </Button>
        <VolumeCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default SetupVolume;
