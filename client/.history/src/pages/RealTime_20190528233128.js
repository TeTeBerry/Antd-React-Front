import React from "react";
import { Statistic, Row, Col } from "antd";

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
          <Countdown title="Set up Volme" value="80" />
        </Col>
      </Row>
    );
  }
}

export default RealTime;
