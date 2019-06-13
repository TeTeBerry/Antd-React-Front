
import React from 'react';
import { Select, Form, Input, Button} from 'antd';

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





    render() { 
      const { getFieldDecorator } = this.props.form;
      
        return ( 
          <Form  onSubmit={this.handleSubmit}>
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
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        </Form>
         );
    }
}

const Admin = Form.create({ name: 'register' })(ChangePasswordForm);
 
export default Admin;