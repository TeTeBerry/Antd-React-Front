import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

class RealTime extends React.Component {
  render() {
    const data = [
      {
        month: "Jan",
        Monthly: 3.9
      },
      {
        month: "Feb",
        Monthly: 4.2
      },
      {
        month: "Mar",
        Monthly: 5.7
      },
      {
        month: "Apr",
        Monthly: 8.5
      },
      {
        month: "May",
        Monthly: 11.9
      },
      {
        month: "Jun",
        Monthly: 15.2
      },
      {
        month: "Jul",
        Monthly: 17.0
      },
      {
        month: "Aug",
        Monthly: 16.6
      },
      {
        month: "Sep",
        Monthly: 14.2
      },
      {
        month: "Oct",
        Monthly: 10.3
      },
      {
        month: "Nov",
        Monthly: 6.6
      },
      {
        month: "Dec",
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
      </div>
    );
  }
}

export default RealTime;
