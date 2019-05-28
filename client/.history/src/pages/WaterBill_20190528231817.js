import React from "react";
import { Descriptions } from "antd";

const DescriptionsItem = Descriptions.Item;

class WaterBill extends React.Component {
  render() {
    return (
      <div>
        <Descriptions bordered title="Member Water Bill" border>
          <DescriptionsItem label="Role">Member</DescriptionsItem>
          <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
          <DescriptionsItem label="time">18:00:00</DescriptionsItem>
          <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
          <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
          <DescriptionsItem label="Official">$60.00</DescriptionsItem>
        </Descriptions>
      </div>
    );
  }
}

export default WaterBill;
