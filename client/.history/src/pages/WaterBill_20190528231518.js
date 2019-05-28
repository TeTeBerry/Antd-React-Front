import React from "react";
import { Descriptions } from "antd";

const DescriptionsItem = Descriptions.Item;

class WaterBill extends React.Component {
  render() {
    return (
      <div>
        <Descriptions bordered title="Custom Size" border>
          <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
          <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
          <DescriptionsItem label="time">18:00:00</DescriptionsItem>
          <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
          <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
          <DescriptionsItem label="Official">$60.00</DescriptionsItem>
          <DescriptionsItem label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication_factor:3
            <br />
            Region: East China 1<br />
          </DescriptionsItem>
        </Descriptions>
      </div>
    );
  }
}

export default WaterBill;
