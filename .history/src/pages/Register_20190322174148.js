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
        firstname: "",
        lastname: "",
        username: "",
        password: ""
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/users/register",{
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          password: this.state.password
        }).then((data) => {
          console.log(data);
          this.props.history.replace('/login')
        }).catch((error) => {
          console.log(error.response.data);
          alert(error.response.data);
        })
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
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
        console.log(this.Auth.loggedIn());
        if(this.Auth.loggedIn()){
            this.props.history.push('/login')
        }
    }
    onChangeFirstName = (e) => {
      this.setState({
        firstname: e.target.value
      });
    }

    onChangeLastName = (e) => {
      this.setState({
        lastname: e.target.value
      });
    }
    onChangeUsername = (e) => {
      this.setState({
        username: e.target.value
      });
    }
    onChangePassword = (e) => {
      this.setState({
        password: e.target.value
      });
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
              label="First Name"
            >
              {getFieldDecorator('firstname', {
                rules: [{ required: true, message: 'Please input your First Name!' }],
              })(
                <Input onChange={this.onChangeFirstName}/>
              )}
            </Form.Item>
            <Form.Item
              label="Last Name"
            >
              {getFieldDecorator('lastname', {
                rules: [{ required: true, message: 'Please input your Last Name!' }],
              })(
                <Input onChange={this.onChangeLastName}/>
              )}
            </Form.Item>
            <Form.Item
              label="Username"
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input onChange={this.onChangeUsername}/>
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
                <Input type="password" onChange={this.onChangePassword}/>
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