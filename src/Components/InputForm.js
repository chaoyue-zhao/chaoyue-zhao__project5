import React, { Component } from 'react';
import styled from 'styled-components';
import NiceButton from './Button';

/**********
  STYLES
*********/

const TextArea = styled.textarea`
  display: block;
  width: 60%;
  height: 35vh;
  margin: 1rem auto;
  padding: 2%;
  resize: none;
  box-shadow: none;
  outline: none;
  border: none;
  border: 3px solid #295166;
  border-radius: 10px;
  overflow: auto;
  word-wrap: break-word;
  background: #ece8df;
  line-height: 1.6;
  font-family: "Reenie Beanie", cursive;
  font-size: 1.5rem;
  color: #232323;
`;


/************
  FUNCTIONS
************/
class InputForm extends Component {
    constructor() {
        super();
        // set the state of InputForm to expect the input from user. 
        this.state = {
           userInput: ''
        }
    }

    
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.gatherUserInput(this.state.userInput);
    }
    
    handleChange = (e) => {       
        
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return (
          <form
            action="#"
            name="inputForm"
            onSubmit={this.handleFormSubmit}
          >
            <TextArea
              name="userInput"
              value={this.state.userInput}
              onChange={this.handleChange}
              placeholder="A week ago, I dreamt about this super cool idea for a mood diary app. Throughout the week, I drunk lots of tea, had couple 'why this is not working', followed by 'oh lord, I an so smart' moments, got helps from many, many people. And you guess it, now you are looking at this app. I feel very proud of myself. Thank you very much! Now you can type your thoughts here! "
              required
            />
            <NiceButton />
          </form>
        );
    }
}

export default InputForm;