import React, { Component } from 'react';
import { Card,InputGroup,Input } from 'antd';


export default class Message extends Component{
    render() {
    
     
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Card title="Send Water Fee to Memeber" bordered={false} style={{ width: 300 }}>
              <p>Member Name:</p>
              <InputGroup compact>
               <Input style={{ width: '20%' }} defaultValue="0571" />
               <Input style={{ width: '30%' }} defaultValue="26888888" />
              </InputGroup>
            </Card>
          </div>
        )
    
 }
}