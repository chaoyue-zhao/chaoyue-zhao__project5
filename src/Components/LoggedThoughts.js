import React, { Component } from 'react';
import firebase from '../firebase.js';

class LoggedThoughts extends Component {
    constructor(){
        super();
        this.state = {
            thoughts: []
        }
    }
    
    componentDidMount() {
        const dbRef = firebase.database().ref();
        dbRef.on('value', (firebaseData) => {
            const newState = [];
            const data = firebaseData.val();

            for (let key in data) {
                newState.push(data[key]);
            }

            this.setState({
                thoughts: newState
            })
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <ul id="LoggedThoughts">Logged Thoughts:                        
                    {this.state.thoughts.map((thought, i) => {
                        return (
                        <li key={i}>Thought:{thought.text}
                            <ul>
                                <li>Language used:{thought.language}</li>
                                <li key={i}>KeyPhrases:{}
                                    <ul>
                                        {thought.keyPhrases.map((keyPhrase, i) => {
                                            return (
                                                <li key={i}>{keyPhrase}</li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li>Sentiment:{thought.sentiment}</li>                                                   
                            </ul>
                        </li>
                      )
                    })}  
                </ul>
            </React.Fragment>
        )
    }
}

export default LoggedThoughts;
