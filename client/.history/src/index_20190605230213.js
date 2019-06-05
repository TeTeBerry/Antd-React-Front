import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import NormalLoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Meter from "./pages/adminpage/Meter";
import Report from "./pages/adminpage/Report";

ReactDOM.render(
  <Router>
    <div className="App">
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={NormalLoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <Route path="/admin" component={Meter} />
      <Route path="/report" component={Report} />
    </div>
  </Router>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
