import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import Meter from "../pages/adminpage/Meter";

describe("Test case for meter", () => {
  it("Input render correctly", () => {
    const wrapper = render(<Meter />);
    expect(wrapper).toMatchSnapshot();
  });
});
