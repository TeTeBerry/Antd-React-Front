import React, { Component } from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
  } from "bizcharts";
  import DataSet from "@antv/data-set";
class Report extends Component {
    
    render() {
        const data = [
            {
              month: "Jan",
              Daily: 7.0,
              Weekly:2.0,
              Monthly: 3.9
            },
            {
              month: "Feb",
              Daily: 6.9,
              Weekly:10.3,
              Monthly: 4.2
            },
            {
              month: "Mar",
              Daily: 9.5,
              Weekly:20.4,
              Monthly: 5.7
            },
            {
              month: "Apr",
              Daily: 14.5,
              Weekly:12.1,
              Monthly: 8.5
            },
            {
              month: "May",
              Daily: 18.4,
              Weekly:10.3,
              Monthly: 11.9
            },
            {
              month: "Jun",
              Daily: 21.5,
              Weekly:12.2,
              Monthly: 15.2
            },
            {
              month: "Jul",
              Daily: 25.2,
              Weekly:22.2,
              Monthly: 17.0
            },
            {
              month: "Aug",
              Daily: 26.5,
              Weekly:12.3,
              Monthly: 16.6
            },
            {
              month: "Sep",
              Daily: 23.3,
              Weekly:12.5,
              Monthly: 14.2
            },
            {
              month: "Oct",
              Daily: 18.3,
              Weekly:12.2,
              Monthly: 10.3
            },
            {
              month: "Nov",
              Daily: 13.9,
              Weekly:12.2,
              Monthly: 6.6
            },
            {
              month: "Dec",
              Daily: 9.6,
              Weekly:12,
              Monthly: 4.8
            }
          ];
          const ds = new DataSet();
          const dv = ds.createView().source(data);
          dv.transform({
            type: "fold",
            fields: ["Daily", "Weekly","Monthly"],
            // 展开字段集
            key: "date",
            // key字段
            value: "temperature" // value字段
          });
          console.log(dv);
          const cols = {
            month: {
              range: [0, 1]
            }
          };
      return(
        <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}°C`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"date"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
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
    
export default Report;