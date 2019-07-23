import React, { Component } from "react";
import "./Login.css";
import { Form, Icon, Input, Button, Radio, message } from "antd";
import AuthService from "./AuthService";
import axios from "axios";
const RadioGroup = Radio.Group;

class Login extends Component {
  Auth = new AuthService();

  state = {
    username: "",
    password: ""
  };

  passwordError = () => {
    message.error("invalid password");
  };

  error = () => {
    message.error("Invalid Account");
  };

  success = () => {
    message.success("Login Success!");
  };

  onChangeRadio = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      username: e.target.value
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("/iot/admin/login", user)
      .then(res => {
        if (res.data.code === 1004) {
          this.passwordError();
        } else if (res.data.code === 200) {
          this.Auth.setUserName(res.data.data.username);
          this.Auth.setToken(res.data.msg);
          this.Auth.setUserId(res.data.data.id);
          this.props.history.push("/" + this.state.username);
          this.success();
          console.log(this.Auth.getUserId());
        }
      })
      .catch(error => {
        this.error();
        console.log(error);
      });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  componentDillMount() {
    /* Here is a great place to redirect someone who is already logged in to the protected route */
    if (this.Auth.isLoggedIn()) this.props.history.replace("/");
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="center">
        <div className="login-card">
          <h1>Login</h1>

          <Form onSubmit={this.handleLogin} className="login-form">
            <RadioGroup
              onChange={this.onChangeRadio}
              username={this.state.value}
            >
              <Radio value={"admin"}>Admin</Radio>
              <Radio value={"member"}>Member</Radio>
            </RadioGroup>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default WrappedNormalLoginForm;
