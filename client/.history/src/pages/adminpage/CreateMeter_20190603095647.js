import React, { Component } from "react";
import { Button } from "antd";
import axios from "axios";
import CollectionCreateForm from "./CreateMeterForm";
import { AdminContext } from "../../../App";

class CreateMember extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const formFields = form.getFieldsValue();
    console.log(formFields.membername);
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
    const member = {
      meterid: formFields.meterid,
      metername: formFields.metername,
      descriptions: formFields.descriptions
    };
    axios
      .post("http://localhost:4000/meter/register", member)
      .then(member => {
        this.props.coolName(member);
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data);
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
        {/* <VolumeCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        /> */}
      </div>
    );
  }
}

export default CreateMember;
