import React, { Component } from "react";

import { Table, message, Modal, Button, Divider } from "antd";
import axios from "axios";
import CollectionUpdateForm from "./UpdateMemberForm";
import { Link } from "react-router-dom";
import CreateMeter from "./CreateMeter";

const confirm = Modal.confirm;
const domain = "http://localhost:8080/iot/meter/";
const token = localStorage.getItem("id_token");
const headers = { Authorization: token };

class Meter extends Component {
  state = {
    memberList: []
  };

  showInfo = () => {
    this.props.history.push("/info");
  };

  showBill = () => {
    this.props.history.push("/waterbill");
  };

  showRealTime = () => {
    message.warn("This month Already  outdone Water Volume", 10);
    this.props.history.push("/viewdata");
  };

  showEditMoal = record => {
    const { form } = this.formRef.props;
    form.memberList = record;
    console.log(record._id);
    const formFields = form.memberList;
    console.log(formFields);
    const formData = {
      metername: record.metername,
      descriptions: record.descriptions,
      meterid: record.meterid,
      roomnumber: record.roomnumber,
      membercontact: record.membercontact,
      membername: record.membername
    };
    form.setFieldsValue(formData);
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleUpdate = () => {
    const { form } = this.formRef.props;
    const formFields = form.getFieldsValue();
    console.log(formFields);
    const formData = {
      metername: formFields.metername,
      descriptions: formFields.descriptions,
      meterid: formFields.meterid,
      roomnumber: formFields.roomnumber,
      membercontact: formFields.membercontact,
      membername: formFields.membername
    };
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
    axios
      .put(`${domain}/` + formFields._id, formData, {
        headers
      })
      .then(data => {
        this.fetchMemberList();
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  deleteMember = _id => {
    axios
      .delete(`${domain}/` + _id, { headers })
      .then(data => {
        this.setState({
          memberList: this.state.memberList.filter(item => item._id !== _id)
        });
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  showDeleteConfirm(_id, membername) {
    console.log(_id);
    confirm({
      title: `Are you sure delete ${membername}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.deleteMember(_id);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  fetchMemberList = () => {
    axios
      .get({ domain }`$/getMeter`, { headers })
      .then(data => {
        this.setState({
          memberList: data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchMemberList();
  }

  render() {
    const columns = [
      {
        title: "MeterID",
        dataIndex: "meterid"
      },
      {
        title: "Meter Name",
        dataIndex: "metername"
      },
      {
        title: "Descriptions",
        dataIndex: "descriptions"
      },
      {
        title: "Day Volume",
        dataIndex: "dv"
      },
      {
        title: "Month Volume",
        dataIndex: "mv"
      },
      {
        title: "Action",
        key: "action",
        render: record => (
          <span>
            <Button size={"small"} onClick={() => this.showEditMoal(record)}>
              Edit
            </Button>
            <Divider type="vertical" />
            <Button
              size={"small"}
              onClick={() =>
                this.showDeleteConfirm(record._id, record.metername)
              }
              type="danger"
            >
              Delete
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size={"small"} onClick={this.showInfo}>
              Member Infomation
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size={"small"} onClick={this.showRealTime}>
              View Data
            </Button>
            <Divider type="vertical" />
            <Link to={"/report/" + record.meterid}>View Report</Link>
            <Divider type="vertical" />
            <Button type="primary" size={"small"} onClick={this.showBill}>
              Water Bill
            </Button>
          </span>
        )
      }
    ];

    const data = [
      {
        meterid: "DFS-123",
        metername: "SENSOR1",
        descriptions: "New York No. 1 Lake Park",
        membername: "John Brown",
        roomnumber: "B122",
        membercontact: "0958953557",
        dv: "1.2L",
        mv: "35.5L"
      }
    ];

    const { memberList } = this.state;
    return (
      <div>
        <CreateMeter coolName={this.fetchMemberList} />
        <Table
          rowKey={record => record._id}
          columns={columns}
          dataSource={memberList}
        />
        <CollectionUpdateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          handleSubmit={this.handleUpdate}
        />
      </div>
    );
  }
}

export default Meter;
