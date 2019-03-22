
import React from 'react';
import { Table } from 'antd';
import { Button } from 'antd';

const columns = [{
  title: 'Username',
  dataIndex: 'username',
  key: 'username',
}, {
  title: 'First Name',
  dataIndex: 'firstname',
  key: 'age',
}, {
  title: 'Last Name',
  dataIndex: 'lastname',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: () => (
    <Button  type="danger">
      Delete
    </Button>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
 
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',

}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',

}];
class Admin extends React.Component {
    state = {  }
    render() { 
        return ( 
         <Table columns={columns} dataSource={data} />
         );
    }
}
 
export default Admin;