import React, { Component } from "react";
import styled from "styled-components";
import firebase from "../firebase.js";
import {
  Section,
  Title,
  List,
  Sentiment,
  SentimentText,
  SentimentProgressBar,
  SentimentScore,
  Positive,
  Negative
} from "./StyledThoughts";

/**********
 STYLES
*********/

const Thought = styled.p`
  width: 100%;
`;

const ThoughtDetails = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0 1rem;
`
const Language = styled.p`
  width: 40%;

  @media (max-width: 1350px) {
    width: 30;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  @media (max-width: 1000px) {
    width: 100%;
    margin-bottom: 0;
  }
`;

const LongerSentimentProgressBar = styled(SentimentProgressBar)`
  width: 50%;
  margin-top: 1rem;

  @media(max-width: 1000px) {
    width: 80%;
    margin: 1rem 0 2rem 1rem;
  }
`;
const SmallerSentimentText = styled(SentimentText) `
  width: 50%;

`
const SmallerSentiment = styled(Sentiment)`
  width: 50%;

  @media(max-width: 1000px) {
      width: 100%;
      flex-direction: column; 
      margin-top: 1rem;
  }
`

const ReadjustedSentimentScore = styled(SentimentScore)`
  right: 25%;

  @media (max-width: 1000px) {
    top: 70px;
    right: 55%;
  }
`;
const ReadjustedNegative = styled(Negative)`
  right: 50%;

  @media (max-width: 1000px) {
    top: 70px;
    right: 90%;
  }

`
const ReadjustedPositive = styled(Positive)`
  @media (max-width: 1000px) {
    top: 70px;
    right: 23%;
  }
`;
const KeyPhrases = styled.p`
  display: flex;
  justify-content: flex-start;
  margin: 0;
  width: 90%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const Phrase = styled.span `
    margin-left: 5px;
`
const Bold = styled.span `
    font-weight: 600;
`
const SmallerSentimentText = styled(SentimentText)`
  width: 50%;
`;
const SmallerSentiment = styled(Sentiment)`
  width: 50%;
`;

const ReadjustedSentimentScore = styled(SentimentScore)`
  right: 40%;
`;

/************
  FUNCTIONS
************/

class LoggedThoughts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: this.props.data,
      loading: false
    };
  }
  
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", async (firebaseData) => {
      const newState = [];
      const data = firebaseData.val();

      for (let key in data) {
        newState.push(data[key]);
      }
      await this.setState({
        thoughts: newState,
        loading: true
      });
    })
  }

  render() {
    return (
    this.state.thoughts.length && this.state.loading && (
        <React.Fragment>
          <Section id="LoggedThoughts">
            <Title>Logged Thoughts (from you and everyone!)</Title>
            <List id="LoggedThoughts">
              {this.state.thoughts.map((thought, i) => {
                return (
                  <Thought key={i}>
                    <Bold>Thought:</Bold> {thought.text}
                    <ThoughtDetails>
                      <Language>Language: {thought.language} </Language>
                      <SmallerSentiment>
                        <SmallerSentimentText>
                          Sentiment Score:
                        </SmallerSentimentText>
                        <LongerSentimentProgressBar
                          sentimentValue={thought.sentiment}
                        />
                        <ReadjustedSentimentScore>
                          {thought.sentiment}%
                        </ReadjustedSentimentScore>
                        <Positive>Positive</Positive>
                        <Negative>Negative</Negative>
                      </SmallerSentiment>
                      {thought.keyPhrases && <KeyPhrases key={i}>
                        KeyPhrases:
                        {thought.keyPhrases.map((keyPhrase, i) => {
                          return <Phrase key={i}>{keyPhrase},</Phrase>;
                        })}
                      </KeyPhrases>}
                    </ThoughtDetails>
                  </Thought>
                );
              })}
            </List>
          </Section>
        </React.Fragment>
      )
    );
  }
}

LoggedThoughts.defaultProps = {

  data: [{
    keyPhrases: "somephrases",
    language: "somelanguage",
    sentiment: "80.00",
    text: "sometext"
  }]
}

export default LoggedThoughts;



