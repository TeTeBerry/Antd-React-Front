import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import CreateMeterForm from "../pages/adminpage/CreateMeterForm";

describe("Test case for meter", () => {
  it("renders without crashing", () => {
    const component = shallow(<CreateMeterForm />);
    expect(component).toMatchSnapshot();
  });
});
