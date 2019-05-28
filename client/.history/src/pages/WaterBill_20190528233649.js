import React from "react";
import { Descriptions } from "antd";

const DescriptionsItem = Descriptions.Item;

class WaterBill extends React.Component {
  render() {
    return (
      <div>
        <Descriptions bordered title="Member June Water Bill" border>
          <DescriptionsItem label="Role">Member</DescriptionsItem>
          <DescriptionsItem label="Billing">Postpaid</DescriptionsItem>
          <DescriptionsItem label="Month">June</DescriptionsItem>
          <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
          <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
          <DescriptionsItem label="Official">$60.00</DescriptionsItem>
        </Descriptions>
        <br />
        <Descriptions bordered title="Member July Water Bill" border>
          <DescriptionsItem label="Role">Member</DescriptionsItem>
          <DescriptionsItem label="Billing">Postpaid</DescriptionsItem>
          <DescriptionsItem label="Month">July</DescriptionsItem>
          <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
          <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
          <DescriptionsItem label="Official">$60.00</DescriptionsItem>
        </Descriptions>
      </div>
    );
  }
}

export default WaterBill;
