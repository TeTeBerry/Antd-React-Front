import React, { Component } from 'react';

import './App.css';

import withAuth from './pages/withAuth';
import Layouts from './layouts/layout';

class App extends Component {



  


  render() {
    console.log("Rendering Appjs!")
    return (
     
      <h1>Welcome</h1>,
      <Layouts></Layout>
    
  );  
  }
}

export default withAuth(App);