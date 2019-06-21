import React from "react";
import { Select, Form, Icon, Input, Button, message } from "antd";
import "./ChangePW.css";

import axios from "axios";
import q from "querystring";

const token = localStorage.getItem("id_token");
const headers = {
  auth: token,
  "Content-Type": "application/x-www-form-urlencoded"
};

const Option = Select.Option;

class ChangePasswordForm extends React.Component {
  state = {
    userName: "",
    oldPwd: "",
    newPwd: ""
  };

  error = () => {
    message.error("Update fail!");
  };

  success = () => {
    message.success("Update success!");
  };

  onChange = value => {
    console.log(`selected ${value}`);
    this.setState({
      userName: value
    });
  };

  onChangeOldPwd = e => {
    this.setState({
      oldPwd: e.target.value
    });
  };

  onChangeNewPwd = e => {
    this.setState({
      newPwd: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = q.stringify({
      userName: this.state.userName,
      oldPwd: this.state.oldPwd,
      newPwd: this.state.newPwd
    });
    console.log(user);
    axios
      .post("http://localhost:8080/iot/admin/updatePassword", user, {
        headers
      })
      .then(res => {
        if (res.data.code !== 200) {
          return this.error();
        }
        console.log(res.data.code);
        this.props.history.push("/" + this.state.userName);
        this.success();
      })
      .catch(error => {
        console.log(error);
        alert("Failure change password");
      });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="ant-form">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "Please select person!" }]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.onChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={"admin"}>Admin</Option>
                <Option value={"member"}>Member</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("oldPwd", {
              rules: [
                { required: true, message: "Please input your old Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="old Password"
                style={{ width: "200px" }}
                onChange={this.onChangeOldPwd}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("newPwd", {
              rules: [
                { required: true, message: "Please input your new Password!" },
                { min: 4, message: "At least 4 digits!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="new Password"
                style={{ width: "200px" }}
                onChange={this.onChangeNewPwd}
              />
            )}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "200px" }}
          >
            Change password
          </Button>
        </Form>
      </div>
    );
  }
}

const ChangePw = Form.create({ name: "normal_login" })(ChangePasswordForm);

export default ChangePw;