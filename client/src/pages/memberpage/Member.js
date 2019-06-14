import React from "react";
import { Table, Divider, Button } from "antd";
import SetupVolume from "./SetupVolume";
import axios from "axios";

class Member extends React.Component {
  state = {
    memberList: []
  };

  showBill = () => {
    this.props.history.push("/waterbill");
  };

  showRealTime = () => {
    this.props.history.push("/realtime");
  };

  fetchMemberList = () => {
    axios
      .get("http://localhost:8080/iot/meter/getMeters")
      .then(res => {
        this.setState({
          memberList: res.data.data
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
        title: "Meter Name",
        dataIndex: "meterName"
      },
      {
        title: "Descriptions",
        dataIndex: "meterDesc"
      },
      {
        title: "Member Name",
        dataIndex: "memberName"
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
            <Button type="primary" size={"small"} onClick={this.showRealTime}>
              View Data
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size={"small"} onClick={this.showBill}>
              Water Bill
            </Button>
          </span>
        )
      }
    ];

    const { memberList } = this.state;
    return (
      <div>
        <SetupVolume />
        <Table
          rowKey={record => record.mid}
          columns={columns}
          dataSource={memberList}
        />
      </div>
    );
  }
}

export default Member;
