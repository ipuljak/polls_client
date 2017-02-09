import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

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
        <Container text className='ui center aligned'>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default App;