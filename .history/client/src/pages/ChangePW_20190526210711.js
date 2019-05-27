import React from "react";
import { Select, Form, Icon, Input, Button } from "antd";
import "./Admin.css";
import AdminContext from "../App";

const token = localStorage.getItem("id_token");

const Option = Select.Option;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

class ChangePasswordForm extends React.Component {
  state = {
    isMember: Boolean
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.history.push("/member");
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
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {isAdmin && <Option value="admin">Admin</Option>}
                <Option value="member">Member</Option>
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
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="new Password"
                style={{ width: "200px" }}
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
