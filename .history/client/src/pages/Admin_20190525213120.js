
import React from 'react';
import { Select, Form, Icon, Input, Button} from 'antd';

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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };




    render() { 
      const { getFieldDecorator } = this.props.form;
      
        return ( 
        <div className="change-password-form ">
          <div className="change-card ">
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
          <Option value="admin">Admin</Option>
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
              style={{width:'250px'}}
            />,
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'250px'}}>
            Change password
          </Button>
        </Form>
        </div>
        </div>
         );
    }
}

const Admin = Form.create({ name: 'normal_login' })(ChangePasswordForm);
 
export default Admin;