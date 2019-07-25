import React from "react";
import { Descriptions } from "antd";
import axios from "axios";

class WaterBill extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
      waterBill: [],
      meterName: props.match.params.meterName,
      memberName: "",
      fee: "",
      totalMilliters: "",
      month: ""
    };
  }

  componentDidMount() {
    this.getWaterBill();
  }

  getWaterBill() {
    axios
      .get(
        `/iot/meter/getWaterBill/?meterName=${this.state.meterName}&password=${
          this.state.password
        }`
      )
      .then(res => {
        console.log(res);
        const mm = res.data.data.month;
        var months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        const month = months[mm - 1] || "";
        console.log(month);
        if (res.data.code === 200) {
          if (res.data.data.meterName === this.state.meterName) {
            this.setState({
              meterName: res.data.data.meterName,
              memberName: res.data.data.memberName,
              fee: res.data.data.fee,
              totalMilliters: res.data.data.totalMilliters,
              month: month
            });
          }
        }
      })

      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Descriptions bordered title="Water Bill" border size={this.state.size}>
        <Descriptions.Item label="Meter Name">
          {this.state.meterName}
        </Descriptions.Item>
        <Descriptions.Item label="Member Name">
          {this.state.memberName}
        </Descriptions.Item>
        <Descriptions.Item label="Month">{this.state.month}</Descriptions.Item>
        <Descriptions.Item label="Fee">{this.state.fee}</Descriptions.Item>
        <Descriptions.Item label="TotalMilliters">
          {this.state.totalMilliters}
        </Descriptions.Item>
      </Descriptions>
    );
  }
}
export default WaterBill;
