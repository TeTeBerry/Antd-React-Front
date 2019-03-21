import React,{ Component } from "react";
import { Form, Input, Button} from 'antd';
import './Register.css'
import { Link } from 'react-router-dom';
import AuthService from'./AuthService';
import axios from 'axios';




class RegisterForm extends Component {
    Auth = new AuthService();
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        username: "",
        password: ""
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
        axios.post("/register",{
          username: this.state.username,
          password: this.state.password
        }).then((data) => {
          console.log(data);
          this.props.history.replace('/login')
        })
      }
    
      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
    
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      }
    
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
      componentDidMount() {

      }
    
      render() { 
        const { getFieldDecorator } = this.props.form;
    
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };

        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
    
        return (
            <div className="center">
            <div className="register-card">
            <h1>Register</h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
              label="Username"
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item
              label="Confirm Password"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
          <Link to="/login" style={{padding:15}}>Cancel</Link>
        </Form.Item>
          </Form>
          </div>
          </div>
        );
          
      }
    }
    const WrappedRegistrationForm = Form.create({ name: 'register' })(RegisterForm);

export default WrappedRegistrationForm;