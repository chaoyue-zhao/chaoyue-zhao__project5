import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import InputForm from './Components/InputForm';
import Results from './Components/Results';
import Header from './Components/Header';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ece8df;
    color: #295166;
  }
`;

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
        <GlobalStyle />
          <Header />
          {/*passing the handleFormSubmit function down as props*/}
          <InputForm gatherUserInput={this.handleFormSubmit}/>
          <Results userInput={this.state.text}/>        
      </div>
    );
  }

}
export default App;
