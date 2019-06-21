import React from "react";
import ReactDOM from "react-dom";
import UpdateMeterForm from "../pages/adminpage/UpdateMemberForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UpdateMeterForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
