import React, { Component } from "react";
import { Layout, Menu, Dropdown, Icon } from "antd";
import "./App.css";
import AuthService from "./pages/AuthService";
import withAuth from "./pages/withAuth";
import { Radio } from "antd";
import ChangePw from "./pages/ChangePW";
import { Switch, Route, HashRouter, Link, withRouter } from "react-router-dom";
import Meter from "./pages/adminpage/Meter";
import Report from "./pages/adminpage/Report";
import WaterBill from "./pages/WaterBill";
import ViewData from "./pages/ViewData";
import Info from "./pages/adminpage/Info";
import Member from "./pages/memberpage/Member";

export const AdminContext = React.createContext();
const auth = (localStorage.getItem("currentUser") || "") === "admin";
const requireAuth = (nextState, replace) => {
  if (!auth) {
    // Redirect to Home page if not an Admin
    replace({ pathname: "/member" });
  }
  console.log(auth);
};

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_self" rel="noopener noreferrer" href="/#/admin">
        Change password
      </a>
    </Menu.Item>
  </Menu>
);

const { Header, Content, Footer } = Layout;

const Auth = new AuthService();

const MenuItem = withRouter(({ history }) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      selectedKeys={[history.location.pathname]}
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="1">
        Meter
        <Link to="/meter" />
      </Menu.Item>
    </Menu>
  );
});
class App extends Component {
  state = {
    isAdmin: (localStorage.getItem("currentUser") || "") === "admin"
  };

  _handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/login");
  };

  render() {
    console.log("Rendering Appjs!");
    return (
      <HashRouter>
        <Layout className="layout">
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo">
              <p>IoT Smart Water Meter</p>
            </div>
            <div className="logout">
              <Radio.Button value="small" onClick={this._handleLogout}>
                LOGOUT
                <Link to="/login" />
              </Radio.Button>
            </div>
            <div className="userlogin">
              <h5>
                Welcome{" "}
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="/">
                    {localStorage.getItem("currentUser")} <Icon type="down" />
                  </a>
                </Dropdown>
              </h5>
            </div>

            <MenuItem />
          </Header>

          <AdminContext.Provider value={this.state.isAdmin}>
            <Content style={{ padding: "50px 50px" }}>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <Switch>
                  <Route path="/admin" component={ChangePw} />
                  <Route
                    path="/meter"
                    component={Meter}
                    onEnter={requireAuth}
                  />
                  <Route path="/report" component={Report} />
                  <Route path="/waterbill" component={WaterBill} />
                  <Route path="/viewdata" component={ViewData} />
                  <Route path="/info" component={Info} />
                  <Route path="/member" component={Member} />
                </Switch>
              </div>
            </Content>
          </AdminContext.Provider>
          <Footer style={{ textAlign: "center" }}>
            IoT Smart Water Meter ©2019 Created by ZiyuChen&&ZengyuLi
          </Footer>
        </Layout>
      </HashRouter>
    );
  }
}

export default withAuth(App);
