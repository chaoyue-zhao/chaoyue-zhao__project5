import React, { Component } from "react";
import axios from "axios";
import firebase from "../firebase";
import styled from "styled-components";
import EditableKeyPhrases from "./KeyPhrase";
import NiceButton from "./Button";

/**********
  STYLES
*********/

const Section = styled.section`
  width: 60%;
  margin: 0 auto;
  border: 3px solid ${props => props.theme.color.blue};
  border-radius: 10px;
  padding: 2%;
`;

const Title = styled.h2`
  font-family: ${props => props.theme.headingFont};
  font-size: 2rem;
  text-transform: lowercase;
  margin: 1rem 0;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  text-align: left;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Item = styled.li`
  display: flex;
  margin-top: 1rem;
  position: relative;
`;

const Sentiment = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  position: relative;
  margin-top: 1rem;
`;
const SentimentText = styled.span`
  width: 65%;
  text-align: left;
`;

const SentimentProgressBar = styled.span`
  display: block;
  width: 32%;
  height: 20px;
  background: linear-gradient(
      to right,
      ${props => props.theme.color.red} ${props => props.sentimentValue}%,
      transparent ${props => props.sentimentValue}%
    ),
    ${props => props.theme.color.blue};
`;

const SentimentScore = styled.span`
  position: absolute;
  top: 22px;
  right: 28%;
  transform: translateX(50%);
  font-size: 0.8rem;
`;

/************
  FUNCTIONS
************/

class Results extends Component {
  constructor() {
    super();
    this.state = {
      language: "",
      sentiment: "",
      keyPhrases: []
    };
  }

  componentDidMount() {
    this.getResponse();
  }

  // using componentDidUpdate here as api calls should be made ONLY when user entered something into the form (when props changed)
  componentDidUpdate(prevProps) {
    if (prevProps.userInput !== this.props.userInput) {
      this.getResponse();
    }
  }

  // function to make api calls that accept endpoint and language as parameters
  apiCalls = (endpoint, language) => {
    return axios({
      method: "POST",
      url: `https://canadacentral.api.cognitive.microsoft.com/text/analytics/v2.0/${endpoint}`,
      dataResponse: "json",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_API_KEY}`
      },
      data: {
        documents: [
          {
            language: language,
            id: "1",
            text: this.props.userInput
          }
        ]
      }
    });
  };

  // function to push logged thoughts to Firebase
  updateFirebase = data => {
    console.log("updated firebase!");
    // created an object that contains all the details about the thought
    const results = {
      text: this.props.userInput,
      language: this.state.language,
      keyPhrases: this.state.keyPhrases,
      sentiment: this.state.sentiment
    };
    const dbRef = firebase.database().ref();
    dbRef.push(results);
  };

  // function to actually fetch data from api with super sweet syntax sugar
  getResponse = async () => {
    console.log("went to get data");

    try {
      const getLanguage = await this.apiCalls("languages");

      const languageCode =
        getLanguage.data.documents[0].detectedLanguages[0].iso6391Name;

      let getResults = await Promise.all([
        this.apiCalls("keyPhrases", languageCode),
        this.apiCalls("sentiment", languageCode)
      ]);

      this.setState({
        language: getLanguage.data.documents[0].detectedLanguages[0].name,
        keyPhrases: getResults[0].data.documents[0].keyPhrases,
        sentiment: (getResults[1].data.documents[0].score * 100).toFixed(2)
      });

      console.log(this.state.language);
    } catch (error) {
      throw error;
    }
  };

  // very important lesson learnt here also: we do not want to directly mutate the state. We want to create a array to hold the old state first
  updateKeyPhrases = (newKeyPhrases, phraseIndex) => {
    let oldState = this.state.keyPhrases;
    let newState = [...oldState];

    for (let i = 0; i < newState.length; i++) {
      if (i === phraseIndex) {
        newState[i] = newKeyPhrases;
      }
    }

    this.setState({
      keyPhrases: newState
    });
  };

  deleteKeyPhrases = (newKeyPhrases, phraseIndex) => {

    let oldState = this.state.keyPhrases;
    let newState = [...oldState];

    for (let i = 0; i < newState.length; i++) {
      if (i === phraseIndex && newState.length > 1) {
        newState.splice(i, 1);
      } else if (newState.length <= 1) {
        alert("Please do not delete the last key phrase!");
      }
    }

    this.setState({
      keyPhrases: newState
    });
  };

  render() {
    return (
      <React.Fragment>
        <Section id="results">
          <Title>Here is what we found:</Title>
          <Paragraph>
            You were typing in {this.state.language}.
          </Paragraph>
          {!this.state.keyPhrases ? (
            <List>
              The following key phrases are found in the text you entered:
              {this.state.keyPhrases.map((keyPhrase, i) => {
                return (
                  <Item key={i}>
                    <EditableKeyPhrases
                      newKeyPhrases={this.updateKeyPhrases}
                      deleteKeyPhrases={this.deleteKeyPhrases}
                      keyPhrases={keyPhrase}
                      phraseIndex={i}
                    />
                  </Item>
                );
              })}
            </List>
          ) : (
            <Paragraph>We did not find any key phrases in the text you entered. Please try again</Paragraph>
          )}
          <Sentiment>
            <SentimentText>
              The overall sentiment score of your thought is:
            </SentimentText>
            <SentimentProgressBar sentimentValue={this.state.sentiment} />
            <SentimentScore>{this.state.sentiment}%</SentimentScore>
          </Sentiment>
          </Section>
          <NiceButton
            value="Log my thought"
            link="#loggedThoughts"
            updateFirebase={this.updateFirebase}
          />
      </React.Fragment>
    );
  }
}

export default Results;
