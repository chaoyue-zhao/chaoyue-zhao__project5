import React, { Component } from 'react';
import styled from 'styled-components';
import { Edit2 } from "styled-icons/feather/Edit2";

const EditIcon = styled(Edit2) `
    width: 20px;
`

class EditableKeyPhrases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyPhrases: this.props.keyPhrases
    //   editable: false
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
        <input
          name="keyPhrases"
          type="text"
        //   disabled={this.state.editable}
          value={this.state.keyPhrases}
          onChange={this.handleChange}
        />
        <EditIcon onClick={this.handleClick}/>
      </React.Fragment>
    );
  }
}

export default EditableKeyPhrases;