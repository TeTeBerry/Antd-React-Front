import React from "react";
import setTest from "../setupTests";
import { shallow, mount } from "enzyme";
import Member from "../pages/memberpage/Member";

describe("Test case for member", () => {
  const props = {
    mid: 1,
    meterName: "sensor1",
    meterDesc: "made in 2019",
    memberName: "tete00111",
    room: "201",
    memberContact: "12323131",
    createDate: "2019-06-18T07:01:21.000+0000"
  };
  const wrapper = mount(<Member {...props} />);
  it("get member array dataSource of table", () => {
    const wrapper = shallow(<Member user={{ memberList: [] }} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Table").props().dataSource).toEqual([]);
  });
  it("fetchMemberList", () => {
    expect(wrapper.props()).toEqual({
      mid: 1,
      meterName: "sensor1",
      meterDesc: "made in 2019",
      memberName: "tete00111",
      room: "201",
      memberContact: "12323131",
      createDate: "2019-06-18T07:01:21.000+0000"
    });
  });
});
