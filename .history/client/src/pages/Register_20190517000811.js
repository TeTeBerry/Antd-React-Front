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
        password: ""
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/users/register",{
          firstName: this.state.firstName,
          lastName: this.state.lastName,
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

      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
     
      componentDidMount() {
        console.log(this.Auth.loggedIn());
        console.log(this.props.location);
        if(this.Auth.loggedIn()){
            this.props.history.push('/login')
            
        }
    }

    
    onChangePassword = (e) => {
      this.setState({
        password: e.target.value
      });
    }

    
    
      render() { 
        const isAdmin  = this.props.location.search.includes('admin');
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
            <h1>{isAdmin ? 'Change' : 'Set'} Password</h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                },{
                validator: this.validateToNextPassword},]
              })(
                <Input type="password" onChange={this.onChangePassword}/>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">{isAdmin}</Button>
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