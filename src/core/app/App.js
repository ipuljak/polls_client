import React, { Component } from 'react';

import Header from '../header';
import './App.css';

/**
 *  Main App Component
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default App;