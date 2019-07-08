import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import WaterBill from "../pages/common/WaterBill";

describe("Test case for setup volume", () => {
  it("should match its empty snapshot", () => {
    const wrapper = shallow(<WaterBill />);
    expect(wrapper).toMatchSnapshot();
  });
  it("getWaterbill", () => {
    const getWaterBill = jest.fn();
    const props = {
      getWaterBill
    };
    const wrapper = mount(<WaterBill {...props} />);
    expect(wrapper.props().getWaterBill).toHaveBeenCalledTimes(0);
  });
});
