import React from "react";
import { Statistic, Row, Col, Descriptions } from "antd";

const DescriptionsItem = Descriptions.Item;
const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
  console.log("finished!");
}

class RealTime extends React.Component {
  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Countdown
            title="Water Volume"
            value={deadline}
            onFinish={onFinish}
          />
        </Col>
        <Col span={12}>
          <Countdown
            title="Water Volume on Seconds"
            value={deadline}
            format="HH:mm:ss:SSS"
          />
        </Col>
        <Col span={24} style={{ marginTop: 32 }}>
          <Descriptions title="User Info">
            <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
            <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
            <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
            <DescriptionsItem label="Remark">empty</DescriptionsItem>
            <DescriptionsItem label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </DescriptionsItem>
          </Descriptions>
        </Col>
      </Row>
    );
  }
}

export default RealTime;
