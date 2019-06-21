import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import ChangePW from "../pages/adminpage/ChangePW";

describe("Test case for meter", () => {
  const onChangeUserName = jest.fn();
  const handleSubmit = jest.fn();
  const onChangeOldPwd = jest.fn();
  const onChangeNewPwd = jest.fn();
  const props = {
    onChangeOldPwd,
    oldPwd: "123456",
    onChangeUserName,
    onChangeNewPwd,
    newPwd: "1111",
    handleSubmit,
    userName: "admin"
  };

  const wrapper = mount(<ChangePW {...props} />);
  it("Input render correctly", () => {
    const component = render(<ChangePW />);
    expect(component).toMatchSnapshot();
  });
  it("Input check the right oldPwd", () => {
    expect(wrapper.props().oldPwd).toEqual("123456");
    expect(wrapper.props().onChangeOldPwd).not.toBeCalled();
  });
  it("Input check the right newPwd", () => {
    expect(wrapper.props().onChangeNewPwd).not.toBeCalled();
    expect(wrapper.props().newPwd).toEqual("1111");
  });
  it("Input check the right userName", () => {
    expect(wrapper.props().onChangeUserName).not.toBeCalled();
    expect(wrapper.props().userName).toEqual("admin");
  });
  it("Input check the right data", () => {
    expect(wrapper.props().handleSubmit).not.toBeCalled();
  });
});
