import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import SetupVolume from "../pages/memberpage/SetupVolume";

describe("Test case for setup volume", () => {
  it("should match its empty snapshot", () => {
    const wrapper = shallow(<SetupVolume />);
    expect(wrapper).toMatchSnapshot();
  });
});
