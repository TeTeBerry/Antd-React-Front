import React from "react";
import setTest from "../setupTests";
import { shallow, mount } from "enzyme";
import CreateMeter from "../pages/adminpage/CreateMeter";

describe("Test case for CreateMeter", () => {
  const showModal = jest.fn();
  const handleCancel = jest.fn();
  const handleCreate = jest.fn();
  const saveFormRef = jest.fn();
  const props = {
    showModal,
    handleCancel,
    handleCreate,
    saveFormRef,
    data: {
      meterName: "sensor1",
      meterDesc: "made in 2019",
      memberName: "tete00111",
      room: "129",
      memberContact: "12323131"
    }
  };

  const wrapper = mount(<CreateMeter {...props} />);
  it("renders without crashing ", () => {
    const wrapper = shallow(<CreateMeter />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
  it("showModal", () => {
    expect(wrapper.props().showModal).not.toBeCalled();
  });
  it("handleCancel", () => {
    expect(wrapper.props().handleCancel).not.toBeCalled();
  });
  it("handleCreate", () => {
    expect(wrapper.props().data).toEqual({
      meterName: "sensor1",
      meterDesc: "made in 2019",
      memberName: "tete00111",
      room: "129",
      memberContact: "12323131"
    });
    expect(wrapper.props().handleCreate).not.toBeCalled();
  });
  it("saveFormRef", () => {
    expect(wrapper.props().saveFormRef).not.toBeCalled();
  });
});
