import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import ChangePW from "../pages/adminpage/ChangePW";

describe("Test case for meter", () => {
  it("Input render correctly", () => {
    const wrapper = render(<ChangePW />);
    expect(wrapper).toMatchSnapshot();
  });
  it("Input check the right data", () => {
    const onChange = jest.fn();
    const props = {
      oldPwd: "123456",
      onChange
    };

    const wrapper = mount(<ChangePW {...props} />);
    expect(wrapper.props().oldPwd).toEqual("123456");
  });
});
