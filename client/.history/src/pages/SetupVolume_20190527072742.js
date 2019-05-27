import React from "react";
import { Button, Modal, Form, Input, Radio } from "antd";

const VolumeCreateForm = Form.create({ name: "form_in_modal" })(
  class SetupVolume extends React.Component {
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

export default VolumeCreateForm;
