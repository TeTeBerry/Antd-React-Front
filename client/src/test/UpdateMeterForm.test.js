import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import UpdateMeterForm from "../pages/adminpage/UpdateMeterForm";

describe("Test case for meter", () => {
  it("renders without crashing", () => {
    const component = shallow(<UpdateMeterForm />);
    expect(component).toMatchSnapshot();
  });
});
