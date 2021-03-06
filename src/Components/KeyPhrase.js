import React, { Component } from 'react';
import styled from 'styled-components';
import { Edit2 } from "styled-icons/feather/Edit2";
import { Check } from 'styled-icons/boxicons-regular/Check';
import { Delete } from "styled-icons/material/Delete";

/**********
  STYLES
*********/

const EditIcon = styled(Edit2)`
  width: 20px;
  position: absolute;
  top: 25%;
  right: 10%;

  @media (max-width: 600px) {
    right: 8%;
  }
`;

const CheckIcon = styled(Check)`
  width: 20px;
  position: absolute;
  top: 25%;
  right: 10%;

  @media(max-width: 600px) {
    right: 8%;
  }
`;

const DeleteIcon = styled(Delete)`
  width: 20px;
  position: absolute;
  top: 25%;
  right: 5%;

  @media(max-width: 600px) {
    right: 2%;
  }
`;

const EditableInput = styled.input.attrs({
  type: "text"
})`
  background: ${props => props.theme.color.white};
  border: 2px solid ${props => props.theme.color.blue};
  color: ${props => props.theme.color.blue};
  border-radius: 10px;
  height: 10px;
  font-family: ${props => props.theme.bodyFont};
  font-size: 1rem;
  display: block;
  padding: 0.5rem;
  width: 80%;

  @media(max-width:600px) {
    width: 75%;
  }
`;

/************
  FUNCTIONS
************/


class EditableKeyPhrases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyPhrases: this.props.keyPhrases,
      editable: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick = () => {
    this.setState({
      editable: !this.state.editable,
    })

    this.props.newKeyPhrases(this.state.keyPhrases,this.props.phraseIndex); 
  }

  phraseChecked = () => {
    this.setState({
      editable: !this.state.editable
    });

    this.props.newKeyPhrases(this.state.keyPhrases, this.props.phraseIndex); 
  }

  deletePhrase = () => {
    this.props.deleteKeyPhrases(this.state.keyPhrases, this.props.phraseIndex); 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keyPhrases !== this.props.keyPhrases) {
      this.setState({
        keyPhrases: this.props.keyPhrases
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <EditableInput
          name="keyPhrases"
          type="text"
          disabled={!this.state.editable}
          value={this.state.keyPhrases}
          onChange={this.handleChange}
          />
          {!this.state.editable && <EditIcon aria-label="edit" onFocus={this.handleClick} onClick={this.handleClick} editable={this.state.editable}/>}
         {this.state.editable && <CheckIcon aria-label="done" onFocus={this.phraseChecked} onClick={this.phraseChecked}/>}
         <DeleteIcon aria-label="delete" onFocus={this.deletePhrase} onClick={this.deletePhrase}/>
      </React.Fragment>
    );
  }
}

export default EditableKeyPhrases;