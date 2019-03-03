import React, { Component } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Theme from './Components/Theme';
import InputForm from './Components/InputForm';
import Results from './Components/Results';
import Header from './Components/Header';
import LoggedThoughts from './Components/LoggedThoughts';
import Footer from './Components/Footer';
import Description from './Components/Description';

/**********
   STYLES
 *********/
const GlobalStyle = createGlobalStyle`
  html {
    font-size: 125%;
  }

  body {
    background-color: ${props => props.theme.color.white};
    color: ${props => props.theme.color.blue};
    font-family: ${props => props.theme.bodyFont};
    font-size: 1rem;
  }
`;

const Wrapper = styled.div `
   max-width: 1400px;
   margin: 0 auto;
   width: 80%;
   text-align: center;
`
/************
  FUNCTIONS
************/
class App extends Component {
  constructor() {
    super();
    //set up state here so we can use this in all of  our app Components
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
      <ThemeProvider theme={Theme}>
        <Wrapper>
          <div className="App">
            <GlobalStyle />
              <Header />
              <Description />
              {/*passing the handleFormSubmit function down as props*/}
              <InputForm gatherUserInput={this.handleFormSubmit}/>
              <Footer />      
              <Results userInput={this.state.text}/>
              <LoggedThoughts thoughts={this.state.text}/>  
          </div>  
        </Wrapper>  
      </ThemeProvider>
    );
  }
}
export default App;
