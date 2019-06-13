import React, { Component } from 'react';
import './Login.css';
import {
    Form, Icon, Input, Button, Radio
  } from 'antd';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
const RadioGroup = Radio.Group;
  
  class NormalLoginForm extends Component {

    Auth = new AuthService();

    state = {
      username: "",
      password: "",
      value: 1,
    }

    onChange = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    };

    onChangePassword = (e) => {
      this.setState({
        password: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.Auth.login(this.state.username,this.state.password)
      .then(res => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        }
        console.log(res);
        this.props.history.replace('/')
        window.location.reload();
      
      }).catch(err => {
        alert("Invalid Account");
      })
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    componentWillMount() {
      /* Here is a great place to redirect someone who is already logged in to the protected route */
      if (this.Auth.loggedIn())
          this.props.history.replace('/');
        
  }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="center">
  
        <div className="login-card">
        <h1>Login</h1>


        <Form onSubmit={this.handleSubmit} className="login-form">
        <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>Admin</Radio>
        <Radio value={2}>Member</Radio>
      </RadioGroup>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" 
              onChange={this.onChangePassword}/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
        </div>
        </div>
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
  
export default WrappedNormalLoginForm;