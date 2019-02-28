import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import Results from './Components/Results';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchForm />
        <Results />
      </div>
    );
  }
}

export default App;
