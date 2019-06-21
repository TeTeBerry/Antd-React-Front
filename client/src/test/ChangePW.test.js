import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import ChangePW from "../pages/adminpage/ChangePW";

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
    const component = render(<ChangePW />);
    expect(component).toMatchSnapshot();
  });
  it("Input check the right oldPwd", () => {
    expect(wrapper.props().data.oldPwd).toEqual("123456");
    expect(wrapper.props().onChangeOldPwd).not.toBeCalled();
  });
  it("Input check the right newPwd", () => {
    expect(wrapper.props().onChangeNewPwd).not.toBeCalled();
    expect(wrapper.props().data.newPwd).toEqual("1111");
  });
  it("Input check the right userName", () => {
    expect(wrapper.props().onChangeUserName).not.toBeCalled();
    expect(wrapper.props().data.userName).toEqual("admin");
  });
  it("Input check the right data", () => {
    expect(wrapper.props().data).toEqual({
      newPwd: "1111",
      oldPwd: "123456",
      userName: "admin"
    });
    expect(wrapper.props().handleSubmit).not.toBeCalled();
  });
});
