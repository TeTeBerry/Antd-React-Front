import React, { Component } from "react";

import { Table, message, Modal, Button, Divider } from "antd";
import axios from "axios";
import CollectionUpdateForm from "./UpdateMeterForm";
import { Link } from "react-router-dom";
import CreateMeter from "./CreateMeter";
import AuthService from "../auth/AuthService";
import q from "querystring";

const confirm = Modal.confirm;

class Meter extends Component {
  Auth = new AuthService();
  state = {
    memberList: []
  };

  error = () => {
    message.error("Opreating Fail");
  };

  showRealTime = () => {
    this.props.history.push("/SensorData");
  };

  showEditMoal = record => {
    const { form } = this.formRef.props;
    form.memberList = record;
    console.log(record.id);
    const formFields = form.memberList;
    console.log(formFields);
    const formData = {
      meter_id: record.meter.id,
      member_id: record.meter.member_id,
      meterName: record.meter.meterName,
      meterDesc: record.meter.meterDesc,
      name: record.name,
      room: record.room,
      contact: record.contact
    };
    form.setFieldsValue(formData);
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  updateSuccess = () => {
    message.success("Update success");
  };

  deleteSuccess = () => {
    message.success("Delete success!");
  };

  handleUpdate = () => {
    const { form } = this.formRef.props;
    const formFields = form.getFieldsValue();
    console.log(formFields.meter_id);
    const formData = {
      meter_id: formFields.meter_id,
      member_id: formFields.member_id,
      meterName: formFields.meterName,
      meterDesc: formFields.meterDesc,
      room: formFields.room,
      contact: formFields.contact,
      name: formFields.name
    };
    console.log(formData);
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
    const token = this.Auth.getToken();
    axios
      .post("/iot/meter/update", formData, { headers: { token: token } })
      .then(data => {
        console.log(data.data.code);
        if (data.data.code !== 200) {
          return this.error();
        }
        this.fetchMemberList();
        this.updateSuccess();
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        this.error();
      });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  deleteMember(mid, member_id) {
    // const params = { mid: mid };
    // console.log(params);
    const deletemid = q.stringify({
      mid: mid,
      bid: member_id
    });
    const token = this.Auth.getToken();
    axios
      .delete(
        `/iot/meter/delete/?${deletemid}`,
        // { params: params },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: token
          }
        }
      )
      .then(data => {
        this.setState({
          memberList: this.state.memberList.filter(item => item.mid !== mid)
        });
        if (data.data.code === 200) {
          this.deleteSuccess();
          this.fetchMemberList();
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error);
        this.error();
        console.log(token);
      });
  }

  showDeleteConfirm(id, meterName, member_id) {
    console.log(member_id);
    confirm({
      title: `Are you sure delete ${meterName}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.deleteMember(id, member_id);
        console.log(member_id);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  fetchMemberList = () => {
    axios
      .get("/iot/meter/getMeterAndMember")
      .then(res => {
        this.setState({
          memberList: res.data.data
        });
        console.log(res.data.data);
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
        title: "Meter Name",
        dataIndex: "meter.meterName"
      },
      {
        title: "Descriptions",
        dataIndex: "meter.meterDesc"
      },
      {
        title: "Member Name",
        dataIndex: "name"
      },
      {
        title: "Room",
        dataIndex: "room"
      },
      {
        title: "Member Contact",
        dataIndex: "contact"
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
                this.showDeleteConfirm(
                  record.id,
                  record.meter.meterName,
                  record.meter.member_id
                )
              }
              type="danger"
            >
              Delete
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size={"small"} onClick={this.showRealTime}>
              View Data
            </Button>
            <Divider type="vertical" />
            <Link
              to={{
                pathname: `/report/${record.meter.meterName}`,
                query: { meterName: record.meterName }
              }}
            >
              View Report
            </Link>
            <Divider type="vertical" />
            <Link
              to={{
                pathname: `/waterbill/${record.meter.meterName}`,
                query: { meterName: record.meterName }
              }}
            >
              Water Bill
            </Link>
          </span>
        )
      }
    ];

    const { memberList } = this.state;
    return (
      <div>
        <CreateMeter coolName={this.fetchMemberList} />
        <br />
        <Table
          rowKey={record => record.id}
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
