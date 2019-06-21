import React from "react";
import setTest from "../setupTests";
import { shallow } from "enzyme";
import CreateMeterForm from "../pages/adminpage/CreateMeterForm";

describe("Test case for login", () => {
  // const props = {
  //   _handleLogout: jest.fn()
  // };
  const wrapper = shallow(<CreateMeterForm debug />);

  it("test case for logout ", () => {
    //   wrapper.find("Layout").simulate("submit");

    //   expect(wrapper.props()._handleLogout).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
