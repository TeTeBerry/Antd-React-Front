import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";
import { Descriptions } from "antd";

const DescriptionsItem = Descriptions.Item;

class RealTime extends React.Component {
  render() {
    const data = [
      {
        month: "5min",
        Monthly: 3.9
      },
      {
        month: "10min",
        Monthly: 4.2
      },
      {
        month: "15min",
        Monthly: 5.7
      },
      {
        month: "20min",
        Monthly: 8.5
      },
      {
        month: "25min",
        Monthly: 11.9
      },
      {
        month: "30min",
        Monthly: 15.2
      },
      {
        month: "35min",
        Monthly: 17.0
      },
      {
        month: "40min",
        Monthly: 16.6
      },
      {
        month: "45min",
        Monthly: 14.2
      },
      {
        month: "50min",
        Monthly: 10.3
      },
      {
        month: "55min",
        Monthly: 6.6
      },
      {
        month: "60min",
        Monthly: 4.8
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["Monthly"],
      // 展开字段集
      key: "date",
      // key字段
      value: "volume" // value字段
    });
    console.log(dv);
    const cols = {
      month: {
        range: [0, 1]
      }
    };

    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="volume"
            label={{
              formatter: val => `${val}L`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*volume"
            size={2}
            color={"date"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*volume"
            size={4}
            shape={"circle"}
            color={"date"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
        <Descriptions title="Colse time">
          <DescriptionsItem label="Recent Colse Time">8:45</DescriptionsItem>
        </Descriptions>
      </div>
    );
  }
}

export default RealTime;
