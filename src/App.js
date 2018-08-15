import React, { Component } from 'react';
import logo from './logo.svg';
import Users from './Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="col-12 App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Users List</h1>
        </header>
        <Users />
      </div>
    );
  }
}

export default App;
