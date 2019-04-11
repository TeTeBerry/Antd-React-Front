import React, { Component } from 'react';
import { Card,Input,Button } from 'antd';


export default class Message extends Component{

   
    render() {
        const InputGroup = Input.Group;
    
     
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Card title="Send Water Fee to Memeber" bordered={false} style={{ width: 300 }}>
              <p>Member Name:</p>
              <InputGroup compact>
               <Input style={{ width: '20%' }} defaultValue="0571" />
               <Input style={{ width: '40%' }} defaultValue="26888888" />
              </InputGroup>
              <p>Fee:</p>
              <table>
                  <tr>
                  <th>Water Volume:</th>
                  <td>12L</td>
                  </tr>
              </table>
              <Button type="primary">Send</Button>
            </Card>
          </div>
        )
    
 }
}