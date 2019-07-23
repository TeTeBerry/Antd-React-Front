import React from "react";
import {
  Table,
  Tag,
  Divider,
  Form,
  Button,
  Input,
  Card,
  message,
  Modal
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import q from "querystring";
import AuthService from "../auth/AuthService";

const VolumeCreateForm = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    state = {
      disabled: true,
      visible: false
    };
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Set up water volume"
          okText="Setup"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Meter ID">
              {getFieldDecorator("meter_id", {
                rules: [{ required: true, message: "Please input meter id!" }]
              })(<Input disabled={this.state.disabled} />)}
            </Form.Item>
            <Form.Item label="Member ID">
              {getFieldDecorator("member_id", {
                rules: [{ required: true, message: "Please input member id!" }]
              })(<Input disabled={this.state.disabled} />)}
            </Form.Item>
            <Form.Item label="Volume (mL)">
              {getFieldDecorator("volume", {
                rules: [
                  {
                    required: true,
                    message: "Please input water volume!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>

          <Tag color="magenta" style={{ marginBottom: 15 }}>
            Do you know ?
          </Tag>
          <Card style={{ width: 472 }}>
            <p>
              <b>1.</b>Toilet flush: 126 litres (two flushes per day; the rest
              of the time use grey water)
            </p>
            <p>
              <b>2.</b>Washing hands: 25.2 litres (12 times per day, on average)
            </p>
            <p>
              <b>3.</b>Brushing teeth: 5.6 litres (twice per day)
            </p>
            <p>
              <b>4.</b>Bath: 50 litres (1 half-full bath per week, which
              includes water for rinsing hair. Washing your hair once a week may
              be less than you or your hair type can tolerate but it’s perfectly
              hygienic.)
            </p>
            <p>
              <b>5.</b>Sponge bath: 1.8 litres (six times per week. Sponge baths
              are also hygienic if done properly: it’s how patients are washed
              in hospital. Make sure you keep your washcloths/sponges
              scrupulously clean, and use a fresh one every time you wash.)
            </p>
            <p>
              <b>6.</b>Handwashing dishes: 63 litres (3.5 sink-loads per week)
            </p>
            <p>
              <b>7.</b>Dishwasher: 29 litres (one load per week)
            </p>
            <p>
              <b>8.</b>Washing machine: 112.5 litres (1.5 loads per week)
            </p>
            <p>
              <b>9.</b>Cooking: 7 litres (average one litre per day)
            </p>
            <p>
              <b>10.</b>Water for tea/coffee: 4.2 litres (average three cups per
              day)
            </p>
            <p>
              <b>11.</b>Refilling pet water bowl: 6.3 litres (three cat bowls
              per day)
            </p>
            <p>
              <b>12.</b>Dripping tap: 35 litres
            </p>
            <p>
              <b>TOTAL = 465.6 litres per week OR 66.5 litres per day</b>
            </p>
          </Card>
        </Modal>
      );
    }
  }
);

class Member extends React.Component {
  Auth = new AuthService();
  state = {
    memberList: [],
    visible: false
  };
  error = () => {
    message.error("Set up volume fail!");
  };

  showSetupVolumeModal = record => {
    const { form } = this.formRef.props;
    form.memberList = record;
    console.log(record.id);
    const formFields = form.memberList;
    console.log(formFields);
    const formData = {
      meter_id: record.id,
      member_id: record.meter.member_id
    };
    console.log(formData);
    form.setFieldsValue(formData);
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  createSuccess = () => {
    message.success("Set up volume success!");
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const formFields = form.getFieldsValue();
    const formData = q.stringify({
      volume: formFields.volume,
      meter_id: formFields.meter_id,
      member_id: formFields.member_id
    });
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
      .post("/iot/meter/setVolume", formData, { headers: { token: token } })
      .then(res => {
        console.log(res.data);
        if (res.data.code !== 200) {
          return alert(res.data.msg);
        }
        this.createSuccess();
      });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  showBill = () => {
    this.props.history.push("/waterbill");
  };

  showRealTime = () => {
    this.props.history.push("/sensorData");
  };

  fetchMemberList = () => {
    axios
      .get("/iot/meter/getMeterAndMember")
      .then(res => {
        this.setState({
          memberList: res.data.data
        });
      })
      .catch(error => {
        return alert(error);
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
        title: "Action",
        key: "action",
        render: record => (
          <span>
            <Button
              type="primary"
              size={"small"}
              onClick={() => this.showSetupVolumeModal(record)}
            >
              Setup Volume
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size={"small"} onClick={this.showRealTime}>
              View Data
            </Button>
            <Divider type="vertical" />
            <Link
              to={{
                pathname: `/waterbill/${record.meter.meterName}`,
                query: {
                  meterName: record.meter.meterName,
                  memberName: record.name
                }
              }}
            >
              Water Bill
            </Link>
            <Divider type="vertical" />
            <Link
              to={{
                pathname: `/report/${record.meter.meterName}`,
                query: { meterName: record.meter.meterName }
              }}
            >
              View Report
            </Link>
          </span>
        )
      }
    ];

    const { memberList } = this.state;
    return (
      <div>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={memberList}
        />
        <VolumeCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default Member;
