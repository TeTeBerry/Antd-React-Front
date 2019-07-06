import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import SensorData from "../pages/common/SensorData";

describe("Test case for setup volume", () => {
  it("should match its empty snapshot", () => {
    const wrapper = shallow(<SensorData />);
    expect(wrapper).toMatchSnapshot();
  });
  it("addLeadingZero", () => {
    const addLeadingZero = jest.fn();
    const wrapper = shallow(<SensorData handleAdd={addLeadingZero} />);
    expect(wrapper.addLeadingZero).toBeUndefined();
  });
  it("clientDateTime", () => {
    const clientDateTime = jest.fn();
    const method = shallow(
      <SensorData handleClientDataTime={clientDateTime} />
    );
    expect(method.clientDateTime).toBeUndefined();
  });
  it("getChartRef", () => {
    const getChartRef = jest.fn();
    const method = shallow(<SensorData getChartRef={getChartRef} />);
    expect(method.getChartRef).toBeUndefined();
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
