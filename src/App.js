import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const helloWorld = {
      text: 'Welcome to the road to learn React'
    };
    return (
      <div className="App">
        <h2>{helloWorld.text}</h2>
      </div>
    );
  }
}

export default App;
