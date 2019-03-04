import React, { Component } from 'react';
import Typed from 'typed.js';
import styled from 'styled-components';
import NiceButton from './Button';

/**********
  STYLES
*********/

const Form = styled.form `
  position: relative;
`

const TextArea = styled.textarea`
  display: block;
  width: 60%;
  height: 35vh;
  margin: 1.5rem auto;
  padding: 2%;
  resize: none;
  box-shadow: none;
  outline: none;
  border: none;
  border: 3px solid ${props => props.theme.color.blue};
  border-radius: 10px;
  overflow: auto;
  word-wrap: break-word;
  background: #ece8df;
  line-height: 1.6;
  font-family: ${props => props.theme.headingFont};
  font-size: 1.3rem;
  color: ${props => props.theme.color.blue};

  &:focus + .label {
    display: none;
  }
`;

const TypedText = styled.label`
  position: absolute;
  top: 15%;
  left: 20%;
  right: 20%;
  font-family: ${props => props.theme.headingFont};
  font-size: 1.4rem;
  color: ${props => props.theme.color.blue};
  text-align: left;
`;

/************
  FUNCTIONS
************/
class InputForm extends Component {
  constructor() {
    super();
    // set the state of InputForm to expect the input from user.
    this.state = {
      userInput: "",
      showLabel: true
    };
  }

  // passing the userInput back to App here
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.gatherUserInput(this.state.userInput);
  };

  // super super sweet binding
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // label disabled if any input has received from user
  hideLabel = () => {
    this.setState({
      showLabel: false
    });
  };

  componentDidMount() {
    /**********
        Type.js
      *********/

    const options = {
      strings: [
        `A week ago, I
      dreamt about this super cool idea for a mood diary app.
      Throughout the week, I drank lots of tea, had a couple of 'why
      this is not working', followed by 'oh my, I am so smart'
      moments, got help from many, many, many, many people. And
      you guess it, now you are looking at this app. I feel very
      proud of myself.`,
        `Now you can type your thoughts here!`
      ],
      typeSpeed: 60,
      loop: false,
      showCursor: false
    };

    this.typed = new Typed("#typed", options);
  }

  render() {
    return (
      <Form
        action="#"
        name="inputForm"
        onSubmit={this.handleFormSubmit}
        onInput={this.hideLabel}
      >
        <TextArea
          name="userInput"
          id="userInput"
          value={this.state.userInput}
          onChange={this.handleChange}
          required
        />

        {this.state.showLabel && (
          <TypedText
            htmlFor="userInput"
            id="typed"
            aria-label="type your thoughts here to start!"
            className="label"
          />
        )}

        <NiceButton 
          value= 'See results'
          link= '#results'
          type= 'submit'
        />
      </Form>
    );
  }
}

export default InputForm;