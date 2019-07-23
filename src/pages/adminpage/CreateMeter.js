import React, { Component } from "react";
import { Button, message } from "antd";
import axios from "axios";
import CollectionCreateForm from "./CreateMeterForm";
import AuthService from "../auth/AuthService";
import q from "querystring";

class CreateMeter extends Component {
  Auth = new AuthService();
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
    const member = {
      meterDesc: formFields.meterDesc,
      meterName: formFields.meterName,
      name: formFields.name,
      room: formFields.room,
      contact: formFields.contact
    };
    const user_id = q.stringify({
      user_id: this.Auth.getUserId()
    });
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      this.setState({ visible: false });
      form.resetFields();
    });

    const token = this.Auth.getToken();

    axios
      .post(`/iot/meter/addMeter/?${user_id}`, member, {
        headers: {
          token: token
        }
      })
      .then(member => {
        if (member.data.code !== 200) {
          return this.error();
        }

        this.props.coolName(member);
        this.createSuccess();
      })
      .catch(error => {
        console.log(error);
        this.error();
        console.log(token);
      });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}
          style={{ marginTop: 6 }}
        >
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
