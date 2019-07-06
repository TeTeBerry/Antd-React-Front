import Login from "../pages/auth/Login";

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { mount, shallow, render } from "enzyme";
import setTest from "../setupTests";
import { Input, Form, message } from "antd";

describe("Test case for login", () => {
  it("renders without crashing", () => {
    const component = shallow(<Login />);
    expect(component).toMatchSnapshot();
  });
  it("login check with right data ", () => {
    const wrapper = document.createElement("div");
    // just return the data
    const onSubmitFn = jest.fn(data => data);
    ReactDOM.render(
      <Form onSubmit={onSubmitFn}>
        <Input name="userName" />;
        <Input name="password" />;
      </Form>,
      wrapper
    );
    const input = wrapper.querySelector("input");
    const form = wrapper.querySelector("form");
    TestUtils.Simulate.change(input, { target: { value: "admin" } });
    TestUtils.Simulate.change(input, { target: { value: "1231" } });
    TestUtils.Simulate.submit(form);
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });
  it("logout", () => {
    const logoutAction = jest.fn();
    const props = {
      logoutAction
    };
    const logout = mount(<Login {...props} />);
    expect(logout.props().logoutAction).toHaveBeenCalledTimes(0);
  });
  it("message", () => {
    const props = {
      message: "login success"
    };
    const wrapper = mount(<Login {...props} />);
    expect(wrapper.props().message).toEqual("login success");
  });
});
