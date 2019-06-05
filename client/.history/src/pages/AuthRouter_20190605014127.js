import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

class AuthRouter extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const isMember =
      localStorage.getItem("currentUser") === "member" ? true : false;

    return (
      <Route
        {...rest}
        render={props => {
          return isMember ? <Component {...props} /> : <Redirect to="/admin" />;
        }}
      />
    );
  }
}

export default withRouter(AuthRouter);
