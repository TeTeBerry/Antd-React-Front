
import React from 'react';
import { Table } from 'antd';
import { Button } from 'antd';
import axios from 'axios';

const columns = [{
  title: 'Username',
  dataIndex: 'username',
  key: 'username',
}, {
  title: 'First Name',
  dataIndex: 'firstname',
  key: 'firstname',
}, {
  title: 'Last Name',
  dataIndex: 'lastname',
  key: 'lastname',
}, {
  title: 'Action',
  key: 'action',
  render: () => (
    <Button  type="danger">
      Delete
    </Button>
  ),
}];


class Admin extends React.Component {
    state = {
       userList : [] 
      }

    componentDidMount() {
      axios.get("http://localhost:4000/users")
      .then(data => {
        this.setState({ userList: data.data});
      }).catch((error) => {
        console.log(error);
      })
    }
    render() { 
      const {userList } = this.state;
        return ( 
         <Table columns={columns} dataSource={userList} />
         );
    }
}
 
export default Admin;