import React, { Component } from "react";
import { Button, message } from "antd";
import axios from "axios";
import CollectionCreateForm from "./CreateMeterForm";
const token = localStorage.getItem("id_token");
const headers = {
  auth: token
};
class CreateMeter extends Component {
  state = {
    visible: false
  };

  error = () => {
    message.error("Add Fail");
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
    console.log(formFields.meterDesc);
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
    const member = {
      meterDesc: formFields.meterDesc,
      meterName: formFields.meterName,
      memberName: formFields.memberName,
      room: formFields.room,
      memberContact: formFields.memberContact
    };
    axios
      .post("http://localhost:8080/iot/admin/addMeter", member, {
        headers
      })
      .then(member => {
        this.props.coolName(member);
        this.createSuccess();
      })
      .catch(error => {
        console.log(error);
        this.error();
      });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create Meter
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          handleSubmit={this.handleCreate}
        />
      </div>
    );
  }
}

export default CreateMeter;
