import React, { Component } from 'react';
import { Layout } from './pages/Layout';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NormalLoginForm } from './pages/Login'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
    <Route exact path="/" component={Layout} />
    </div>
    </Router>
  );  
  }
}

export default App;