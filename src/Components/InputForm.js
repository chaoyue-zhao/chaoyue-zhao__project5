import React, { Component } from 'react';

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
            <form action="#" name="inputForm" onSubmit = {this.handleFormSubmit}>
                <label htmlFor="input">What're you thinking:</label>
                <textarea 
                name="userInput" 
                id="input" 
                cols="30" 
                rows="10"
                value={this.state.userInput}
                onChange={this.handleChange}
                required
                >
                </textarea>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default InputForm;