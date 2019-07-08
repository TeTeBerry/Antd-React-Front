import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import SensorData from "../pages/common/SensorData";

describe("Test case for setup volume", () => {
  it("should match its empty snapshot", () => {
    const wrapper = shallow(<SensorData />);
    expect(wrapper).toMatchSnapshot();
  });
  it("clientDateTime", () => {
    const clientDateTime = jest.fn();
    const date_time = new Date();
    const curr_hour = date_time.getHours();
    const curr_min = date_time.getMinutes();
    const curr_sec = date_time.getSeconds();
    const curr_time = curr_hour + ":" + curr_min + ":" + curr_sec;

    const props = {
      clientDateTime,
      curr_time
    };

    const method = mount(<SensorData {...props} />);
    expect(method.props().clientDateTime).toHaveBeenCalledTimes(0);
    expect(curr_time).toEqual(curr_time);
  });
  it("getDataFor data", () => {
    const getDataFor = jest.fn();

    const props = {
      getDataFor,
      data: {
        reading_time: "2019-07-03 18:57:35",
        SensorName: "Sensor-1",
        flowRate: "30.23",
        flowMilliLitres: "100.50",
        totalMilliLitres: "23421"
      }
    };

    const wrapper = mount(<SensorData {...props} />);
    expect(wrapper.props().data).toEqual({
      reading_time: "2019-07-03 18:57:35",
      SensorName: "Sensor-1",
      flowRate: "30.23",
      flowMilliLitres: "100.50",
      totalMilliLitres: "23421"
    });
    expect(wrapper.props().getDataFor).toHaveBeenCalledTimes(0);
  });
  it("startUpdatingData", () => {
    const startUpdatingData = jest.fn();
    const wrapper = mount(<SensorData startUpdatingData={startUpdatingData} />);
    expect(wrapper.props().startUpdatingData).toHaveBeenCalledTimes(0);
  });
});
