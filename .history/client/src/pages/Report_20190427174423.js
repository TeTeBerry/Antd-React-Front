import React, { Component } from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
  } from "bizcharts";
  import { Card } from 'antd';
  import DataSet from "@antv/data-set";
class Report extends Component {
    
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

          const weekdata = [
            {
              week:"Monday",
              Weekly:3.2
            },
            {
              week:"Tuesdat",
              Weekly:8
            },
            {
              week:"Wedesday",
              Weekly:3.1
            },{
              week:"Thuesday",
              Weekly:3.7
            },{
              week:"Friday",
              Weekly:3.0
            },
            {
              week:"Satuday",
              Weekly:2.7
            },
            {
              week:"Sunday",
              Weekly:2.0
            }
          ];
          const dsw = new DataSet();
          const dvw = dsw.createView().source(weekdata);
          dvw.transform({
            type: "fold",
            fields: ["Weekly"],
            key: "date",
            value: "volume"
          });
          console.log(dvw);
          const colsw = {
            week: {
              range: [0,1]
            }
          };

      return(
        <div>
      <Card title="Water report">
      <p
      style={{
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.85)',
        marginBottom: 16,
        fontWeight: 500,
      }}
    >
      Water graph
    </p>

    <Card
      type="inner"
      title="Monthly report"
    >
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
        </Card>


    <Card
      type="inner"
      title="Weekly report"
    >
      <Chart height={400} data={dvw} scale={colsw} forceFit>
      <Legend/>
      <Axis name="week"/>
      <Axis
         name="volume"
         label={{
           formatter: val => `${val}L`
         }}
         />

         <Tooltip
         crosshairs={{
           type: "y"
         }}/>

        <Geom
           type="line"
           position="week*volume"
           size={2}
           color={"date"}
           shape={"smooth"}
        />
        <Geom
          type="point"
          position="week*volume"
          size={4}
          shape={"circle"}
          color={"date"}
          style={{
            stroke: "#fff",
            lineWidth: 1
          }}
        />
        </Chart>
    
    </Card>

      </Card>
      </div>
    );
      }
    }
    
export default Report;