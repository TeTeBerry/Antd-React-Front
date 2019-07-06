import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import Meter from "../pages/adminpage/Meter";
import toJson from "enzyme-to-json";

describe("Test case for meter", () => {
  const showBill = jest.fn();
  const showRealTime = jest.fn();
  const showEditMoal = jest.fn();
  const showDeleteConfirm = jest.fn();
  const props = {
    showBill,
    showRealTime,
    showEditMoal,
    data: {
      mid: 1,
      meterName: "sensor4",
      meterDesc: "made in 2019",
      memberName: "tete00111",
      room: "201",
      memberContact: "12323131"
    },
    deleteMember: { mid: 4 },
    showDeleteConfirm
  };
  const wrapper = mount(<Meter {...props} />);
  it("renders without crashing", () => {
    const component = render(<Meter />);
    expect(component).toMatchSnapshot();
  });
  it("show bill", () => {
    expect(wrapper.props().showBill).not.toBeCalled();
  });
  it("show realtime", () => {
    expect(wrapper.props().showRealTime).not.toBeCalled();
  });
  it("show edit moal", () => {
    expect(wrapper.props().data).toEqual({
      mid: 1,
      meterName: "sensor4",
      meterDesc: "made in 2019",
      memberName: "tete00111",
      room: "201",
      memberContact: "12323131"
    });
  });
  it("handleUpdate", () => {
    expect(wrapper.props().data).toEqual({
      mid: 1,
      meterName: "sensor4",
      meterDesc: "made in 2019",
      memberName: "tete00111",
      room: "201",
      memberContact: "12323131"
    });
  });
  it("deleteMember", () => {
    expect(wrapper.props().deleteMember.mid).toEqual(4);
  });
  it("showDeleteConfirm", () => {
    expect(wrapper.props().showDeleteConfirm).not.toBeCalled();
  });
});
it("matches snapshot", () => {
  const memberList = [];
  const wrapper = shallow(<Meter memberList={memberList} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
