import React, { Component } from "react";
import "./Login.css";
import { Form, Icon, Input, Button, Radio, message } from "antd";
import AuthService from "./AuthService";
const RadioGroup = Radio.Group;

class Login extends Component {
  Auth = new AuthService();

  state = {
    userName: "",
    password: ""
  };

  error = () => {
    message.error("Invalid Account");
  };

  success = () => {
    message.success("Login Suceess!");
  };

  onChangeRadio = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      userName: e.target.value
    });
  };

  onChangePassword = e => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    this.Auth.login(this.state.userName, this.state.password)
      .then(res => {
        if (res.code !== 200) {
          return alert(res.msg);
        }
        console.log(res.msg);
        this.props.history.push("/" + this.state.userName);
        this.success();
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
    if (this.Auth.loggedIn()) this.props.history.replace("/");
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
              userName={this.state.value}
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
