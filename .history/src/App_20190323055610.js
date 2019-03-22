import React, { Component } from 'react';

import './App.css';

import withAuth from './pages/withAuth';
import Layout from './layouts/layout';

class App extends Component {



  


  render() {
    console.log("Rendering Appjs!")
    return (
     
      <h1>Welcome</h1>,
      <Layout></Layout>
    
  );  
  }
}

export default withAuth(App);