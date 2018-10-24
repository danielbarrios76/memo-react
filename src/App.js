import React, { Component } from 'react'
import './App.css'
import MemosContainer from './components/MemosContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Memo Notes</h1>
        </header>
        <MemosContainer />
      </div>
    );
  }
}

export default App;
