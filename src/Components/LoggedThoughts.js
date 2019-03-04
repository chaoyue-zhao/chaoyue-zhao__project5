import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from '../firebase.js';
import {
    Section, Title, Paragraph, List, Item, Sentiment, SentimentText, SentimentProgressBar,
        SentimentScore
} from './StyledThoughts';

/**********
 STYLES
*********/

const Thought = styled.p`
    width: 100%;
`

const ThoughtDetails = styled.ul`
    display: flex;
    flex-wrap: wrap;
`

const Language = styled.p `
    width: 40%;
`

const LongerSentimentProgressBar = styled(SentimentProgressBar) `
  width: 50%;
`
const SmallerSentimentText = styled(SentimentText) `
  width: 50%;
`
const SmallerSentiment = styled(Sentiment)`
  width: 50%;
`

const ReadjustedSentimentScore = styled(SentimentScore) `
  right: 40%;
`

const KeyPhrases = styled.p `
    display: flex;
    justify-content: flex-start;
    margin: 0;
    width: 90%;
`
const Phrase = styled.span `
    margin-left: 5px;
`
const Bold = styled.span `
    font-weight: 600;
`
/************
  FUNCTIONS
************/

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
               <Section id="LoggedThoughts">
                    <Title>Logged Thoughts</Title>
                    <List id="LoggedThoughts">                    
                        {this.state.thoughts.map((thought, i) => {
                            return (
                                <Thought key={i}><Bold>Thought:</Bold> {thought.text}
                                <ThoughtDetails>
                                    <Language>Language: {thought.language} </Language>
                                    <SmallerSentiment>
                                        <SmallerSentimentText>
                                            Sentiment Score:
                                        </SmallerSentimentText>
                                        <LongerSentimentProgressBar sentimentValue={thought.sentiment} />
                                        <ReadjustedSentimentScore>{thought.sentiment}%</ReadjustedSentimentScore>
                                    </SmallerSentiment>   
                                    <KeyPhrases key={i}>KeyPhrases: 
                                        {thought.keyPhrases.map((keyPhrase, i) => {
                                            return (
                                                <Phrase key={i}>{keyPhrase},</Phrase>
                                            )
                                        })}
                                    </KeyPhrases>                                         
                                </ThoughtDetails>
                            </Thought>
                          )
                        })}  
                    </List>
               </Section>
            </React.Fragment>
        )
    }
}

export default LoggedThoughts;
