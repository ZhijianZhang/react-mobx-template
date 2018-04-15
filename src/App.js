import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import Home from './component/Home'
import Count from './component/Count'
import stores from './stores'

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <div className="App">
          <Home />
          <Count />
        </div>
      </Provider>
    );
  }
}

export default App;
