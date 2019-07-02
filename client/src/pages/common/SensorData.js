import React from "react";
import axios from "axios";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SensorData.css";

ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

class SensorData extends React.Component {
  chartRef = null;
  state = {
    titleData: [],
    showChart: false,
    initValue: 0,
    dataSource: {
      chart: {
        caption: "Real Time Water Flow Rate",
        subCaption: "",
        xAxisName: "Local Time",
        yAxisName: "Flow Rate",
        numberPrefix: "L/min",
        refreshinterval: "2",
        slantLabels: "1",
        numdisplaysets: "10",
        labeldisplay: "rotate",
        showValues: "0",
        showRealTimeValue: "0",
        theme: "fusion"
      },
      categories: [
        {
          category: [
            {
              label: this.clientDateTime().toString()
            }
          ]
        }
      ],
      dataset: [
        {
          data: [
            {
              value: 0
            }
          ]
        }
      ]
    }
  };
  chartConfigs = {
    type: "realtimeline",
    renderAt: "container",
    width: "100%",
    height: "400",
    dataFormat: "json"
  };

  componentDidMount() {
    this.getDataFor();
    this.getTitle();
  }

  getTitle() {
    axios.get("http://127.0.0.1:8088/read.php").then(res => {
      this.setState({
        titleData: res.data
      });
      console.log(res.data[0].reading_time);
    });
  }

  startUpdatingData() {
    this.timerID = setInterval(() => {
      axios.get("http://127.0.0.1:8088/read.php").then(d => {
        let x_axis = this.clientDateTime();
        for (var i = 0; i <= 88; i++) {
          let y_axis = d.data[i].flowRate;
          // if (this.flowRate === undefined) {
          //   return clearInterval(this.timerID);
          // }
          console.log(d.data[i]);
          this.chartRef.feedData("&label=" + x_axis + "&value=" + y_axis);
        }
      });
    }, 3000);
  }

  getDataFor() {
    axios
      .get("http://127.0.0.1:8088/read.php", {
        mode: "cors"
      })
      .then(d => {
        const dataSource = this.state.dataSource;
        dataSource.chart.yAxisMaxValue = 500;
        dataSource.chart.yAxisMinValue = 0;

        dataSource.dataset = d.data;
        console.log(dataSource.dataset);

        this.setState(
          {
            showChart: true,
            dataset: d.data,
            dataSource: dataSource,
            initValue: d.data[0].flowRate
          },
          () => {
            this.startUpdatingData();
          }
        );
      });
  }

  static addLeadingZero(num) {
    return num <= 9 ? "0" + num : num;
  }

  clientDateTime() {
    var date_time = new Date();
    var curr_hour = date_time.getHours();
    var zero_added_curr_hour = SensorData.addLeadingZero(curr_hour);
    var curr_min = date_time.getMinutes();
    var curr_sec = date_time.getSeconds();
    var curr_time = zero_added_curr_hour + ":" + curr_min + ":" + curr_sec;
    return curr_time;
  }

  getChartRef(chart) {
    this.chartRef = chart;
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // componentDidMount() {
  //   axios("http://127.0.0.1:8088/read.php").then(response => {
  //     const object = Object.assign(...response.data.map(k => ({ [k]: 0 })));
  //     console.log(object);
  //   });
  // }

  render() {
    return (
      <div className="row mt-5 mt-xs-4">
        <div className="col-12">
          <div className="card custom-card mb-5 mb-xs-4">
            <div className="card-body">
              {this.state.showChart ? (
                <ReactFC
                  {...this.chartConfigs}
                  dataSource={this.state.dataSource}
                  onRender={this.getChartRef.bind(this)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SensorData;
