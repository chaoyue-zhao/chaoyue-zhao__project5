import React, { Component } from 'react';
import './App.css';
import InputForm from './Components/InputForm';
import Results from './Components/Results';

class App extends Component {
  constructor() {
    super();
    //set up state here so we can use this throughout our app
    this.state = {
      text: ''
    }
  }

  //function to handle form submit which is expecting a parameter
  handleFormSubmit = (userInput) => {
    this.setState({
      text: userInput
    })
  }

  render() {
    return (
      <div className="App">
        {/*passing the handleFormSubmit function down as props*/}
        <InputForm gatherUserInput={this.handleFormSubmit}/>
        <Results userInput={this.state.text}/>
      </div>
    );
  }

}
export default App;
