import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import Report from "../pages/common/Report";

describe("Test case for report", () => {
  it("render the component", () => {
    const wrapper = shallow(<Report />);
    expect(wrapper).toMatchSnapshot();
  });
});
