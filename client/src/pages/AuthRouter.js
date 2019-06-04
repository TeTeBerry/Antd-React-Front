import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

class AuthRouter extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const currentUser =
      localStorage.getItem("currentUser") === "admin" ? true : false;

    return (
      <Route
        {...rest}
        render={props => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/member" />
          );
        }}
      />
    );
  }
}

export default withRouter(AuthRouter);
