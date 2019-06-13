
import React from 'react';
import { Select, Form, Icon, Input, Button} from 'antd';
import './Admin.css';

const Option = Select.Option;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}



class ChangePasswordForm extends React.Component {

  state = {
    isMember:true
  }

  toggleHidden() {
    this.setState({
      isMember: !this.state.isMember&&localStorage.getItem('user_name')
    })

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push('/member')
      }
    });
  };




    render() { 
      const { getFieldDecorator } = this.props.form;
      
        return ( 
          <div className="ant-form">
          <Form onSubmit={this.handleSubmit} className="login-form">
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
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="admin" onFocus={this.toggleHidden()}>Admin</Option>
          <Option value="member">Member</Option>
        </Select>
        <br/>
        <br/>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              style={{width:'200px'}}
            />,
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'200px'}}>
            Change password
          </Button>
         
        </Form>
        </div>
      
         );
    }
}

const Admin = Form.create({ name: 'normal_login' })(ChangePasswordForm);
 
export default Admin;