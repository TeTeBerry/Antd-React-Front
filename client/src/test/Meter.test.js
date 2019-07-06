import React from "react";
import setTest from "../setupTests";
import { shallow, render, mount } from "enzyme";
import Meter from "../pages/adminpage/Meter";

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
  it("get member array dataSource of table", () => {
    const wrapper = shallow(<Meter user={{ memberList: [] }} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Table").props().dataSource).toEqual([]);
  });
  it("show bill", () => {
    expect(wrapper.props().showBill).toHaveBeenCalledTimes(0);
  });
  it("show realtime", () => {
    expect(wrapper.props().showRealTime).toHaveBeenCalledTimes(0);
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
    expect(wrapper.props().showDeleteConfirm).toHaveBeenCalledTimes(0);
  });
  it("message", () => {
    const props = {
      update: "Update success",
      delete: "Delete success",
      fail: "Opreating Fail"
    };
    const wrapper = mount(<Meter {...props} />);
    expect(wrapper.props().update).toEqual("Update success");
    expect(wrapper.props().delete).toEqual("Delete success");
    expect(wrapper.props().fail).toEqual("Opreating Fail");
  });
});
