import React from "react";
import setTest from "../setupTests";
import { shallow } from "enzyme";
import CreateMeter from "../pages/adminpage/CreateMeter";

describe("Test case for CreateMeter", () => {
  it("get member list ", () => {
    const wrapper = shallow(<CreateMeter />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
