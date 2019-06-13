import React, { Component } from 'react';
import { Layouts } from './pages/Layout';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NormalLoginForm } from './pages/Login'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Layouts />
          <Route exact path="/" component={NormalLoginForm} />
        </div>
      </Router>
  );  
  }
}

export default App;