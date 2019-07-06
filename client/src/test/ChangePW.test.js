import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import ChangePW from "../pages/adminpage/ChangePW";
import TestUtils from "react-dom/test-utils";
import Item from "antd/lib/list/Item";
import { Input, Form } from "antd";

describe("Test case for change password", () => {
  const onChangeUserName = jest.fn().mockReturnValue("admin");
  const handleSubmit = jest.fn();
  const onChangeOldPwd = jest.fn();
  const onChangeNewPwd = jest.fn();
  const props = {
    onChangeOldPwd,

    onChangeUserName,
    onChangeNewPwd,
    data: {
      newPwd: "1111",
      oldPwd: "123456",
      userName: "admin"
    },
    handleSubmit
  };

  const wrapper = mount(<ChangePW {...props} />);
  it("Input render correctly", () => {
    const component = shallow(<ChangePW />);
    expect(component).toMatchSnapshot();
  });
  it("Input check the right oldPwd", () => {
    expect(wrapper.props().data.oldPwd).toEqual("123456");
    expect(wrapper.props().onChangeOldPwd).toHaveBeenCalledTimes(0);
  });
  it("Input check the right newPwd", () => {
    expect(wrapper.props().onChangeNewPwd).toHaveBeenCalledTimes(0);
    expect(wrapper.props().data.newPwd).toEqual("1111");
  });
  it("Input check the right userName", () => {
    expect(wrapper.props().onChangeUserName).toHaveBeenCalledTimes(0);
    expect(wrapper.props().data.userName).toEqual("admin");
  });
  it("Input check the right data", () => {
    expect(wrapper.props().data).toEqual({
      newPwd: "1111",
      oldPwd: "123456",
      userName: "admin"
    });
    expect(wrapper.props().handleSubmit).toHaveBeenCalledTimes(0);
  });
  it("message", () => {
    const props = {
      message: "update success"
    };
    const wrapper = mount(<ChangePW {...props} />);
    expect(wrapper.props().message).toEqual("update success");
  });
});
