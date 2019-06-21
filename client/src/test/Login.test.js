import NormalLoginForm from "../pages/auth/Login";

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { mount, shallow } from "enzyme";
import setTest from "../setupTests";
import { Input, Form } from "antd";

describe("Test case for login", () => {
  it("gets the form state from onSubmit function", () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<Form onSubmit={handleSubmit} />);
    const form = wrapper.find("form");
    form.simulate("submit");
    expect(handleSubmit).toHaveBeenCalledTimes(1);
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
});
