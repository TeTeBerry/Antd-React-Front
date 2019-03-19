import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layouts from './pages/Layouts'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Layouts/>
        </div>
        </Router>
  );  
  }
}

export default App;