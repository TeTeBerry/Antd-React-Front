import React, { Component } from 'react';
import CreateMember from './CreateMember';
import { Table } from 'antd';
import { Modal,Button,Divider} from 'antd';
import axios from 'axios';
import CollectionUpdateForm from '../pages/UpdateMemberForm';
import { Link } from 'react-router-dom'; 


const confirm = Modal.confirm;
const domain = 'http://localhost:4000/members';
const token = localStorage.getItem('id_token')
const header = {'Authorization' : `Bearer ${token}`}


class Member extends Component {
    state = {
        memberList: [],
    };


    showEditMoal = (record) => {
      const {form } = this.formRef.props;
      form.memberList= record
      console.log(record._id)
      const formFields = form.memberList;
      console.log(formFields)
      const formData ={
        membername: record.membername,
        room: record.room,
        email: record.email,
        tel: record.tel, 
        _id: record._id
      }
      form.setFieldsValue(formData)
      this.setState({ 
        visible: true,

      });
    }


  
    handleCancel = () => {
      this.setState({ visible: false });
    }

    handleUpdate = () => {
      const {form } = this.formRef.props;
      const formFields = form.getFieldsValue();
      console.log(formFields)
      const formData = {
        membername: formFields.membername,
        room: formFields.room,
        email: formFields.email,
        tel: formFields.tel
      }
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
      });
      axios.put(`${domain}/`+formFields._id,formData,{
          headers:header,
        }).then((data) => {
          console.log(data)
        }).catch((error) => {
          console.log(error);
          alert(error);
        })
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }


    deleteMember = (_id)=> {
        axios.delete(`${domain}/`+_id,{ headers:header })
        .then((data) => {
          this.setState({
            memberList: this.state.memberList.filter(item => item._id !== _id)
          })
          console.log(data);
        }).catch((error) => {
          console.log(error);
        })
      }

      showDeleteConfirm(_id,membername){
        console.log(_id)
        confirm({
          title: `Are you sure delete ${membername}?`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk:()=>{
            this.deleteMember(_id);
            console.log('OK')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    
    componentDidMount() {
      axios.get(domain, {headers: header})
      .then((data) => {
          this.setState({
              memberList: data.data
          });
      }).catch((error) => {
          console.log(error);
      })

    }
    // componentDidUpdate() {
    //   axios.get(domain, {headers: header})
    //   .then((data) => {
    //       this.setState({
    //           memberList: data.data
    //       });
    //   }).catch((error) => {
    //       console.log(error);
    //   })

    // }
    render(){
        const columns = [{
            title: 'Member Name',
            dataIndex: 'membername',
          }, {
            title: 'Room Number',
            dataIndex: 'room',
          }, {
            title: 'Phone Number',
            dataIndex: 'tel',
          }, {
            title: 'Email',
            dataIndex: 'email',
          },{
            title: 'Action',
            key: 'action',
            render: (record) => (
        <span>
          <Button onClick={() => this.showEditMoal(record)}>Edit</Button>
          <Divider type="vertical" />
          <Button onClick={() =>this.showDeleteConfirm(record._id,record.membername)} type="danger">Delete</Button>
          <Divider type="vertical" />
          <Link to={"/report"}>View Water Report</Link>
          <Divider type="vertical" />
          <Link to={"/message"}>Send Message</Link>
        </span>
            ),
          }];
          
          const { memberList } = this.state;
        return(
          <div>
            
            <CreateMember/>
    
            <Table  rowKey={record => record._id} columns={columns} dataSource={memberList} />, 
            <CollectionUpdateForm
             wrappedComponentRef={this.saveFormRef}
             visible={this.state.visible}
             onCancel={this.handleCancel}
             handleSubmit={this.handleUpdate}/>,
            </div>
            

        )
    }
}

 export default Member;