import React from "react";
import { Table, Divider, Button } from "antd";
import SetupVolume from "./SetupVolume";
class Member extends React.Component {
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
            <Button type="primary" size={"small"} onClick={this.showRealTime}>
              View Data
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size={"small"} onClick={this.showBill}>
              Water Bill
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size={"small"} onClick={this.showBill}>
              Used Water
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

    return (
      <div>
        <SetupVolume />
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Member;
