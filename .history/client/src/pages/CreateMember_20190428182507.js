import React, { Component } from 'react';
import { Button} from 'antd';
import axios from 'axios';
import CollectionCreateForm from './CreateMemberForm';



class CreateMember extends Component {
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
    const {form } = this.formRef.props;
    const formFields = form.getFieldsValue();
    console.log(formFields.membername)
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
    axios.post('http://localhost:4000/members/register',{
        metername: formFields.metername,
        descriptions: formFields.descriptions,
        
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error);
        alert(error.response.data);
      })
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
          handleSubmit={this.handleCreate}
        />
      </div>
    );
  }
}

export default CreateMember;