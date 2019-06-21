import React from "react";
import setTest from "../setupTests";
import { shallow } from "enzyme";
import Member from "../pages/memberpage/Member";

describe("Test case for member", () => {
  it("get member list ", () => {
    const wrapper = shallow(<Member user={{ memberList: [] }} />);
    expect(wrapper.find("Table").props().dataSource).toEqual([]);
  });
});
