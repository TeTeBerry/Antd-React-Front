import React from "react";
import { Select, Form, Icon, Input, Button } from "antd";
import "./Admin.css";
import { AdminContext } from "../App";
import axios from "axios";

const auth = localStorage.getItem("id_token");

const Option = Select.Option;

class ChangePasswordForm extends React.Component {
  state = {
    userName: "",
    oldPwd: "",
    newPwd: ""
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
    const user = {
      userName: this.state.userName,
      oldPwd: this.state.oldPwd,
      newPwd: this.state.newPwd
    };
    axios
      .post("http://localhost:8080/iot/admin/updatePassword", {
        user,
        Headers: auth
      })
      .then(data => {
        console.log(data);
        this.props.history.push("/member");
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
          <AdminContext.Consumer>
            {isAdmin => (
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
                {isAdmin && <Option value={"admin"}>Admin</Option>}
                <Option value={"member"}>Member</Option>
              </Select>
            )}
          </AdminContext.Consumer>
          <br />
          <br />
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
                { required: true, message: "Please input your new Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{ color: "rgba(0,0,0,.25)" }}
                    onChange={this.onChangeNewPwd}
                  />
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

const Admin = Form.create({ name: "normal_login" })(ChangePasswordForm);

export default Admin;
