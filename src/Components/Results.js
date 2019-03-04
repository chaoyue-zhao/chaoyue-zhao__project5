import React, { Component } from "react";
import axios from "axios";
import firebase from "../firebase";
import {
  Section, Title, Paragraph, List, Item, Sentiment, SentimentText, SentimentProgressBar,
  SentimentScore, Positive, Negative
} from './StyledThoughts'
import EditableKeyPhrases from "./KeyPhrase";
import NiceButton from "./Button";

/************
  FUNCTIONS
************/

class Results extends Component {
  constructor() {
    super();
    this.state = {
      language: "",
      sentiment: "",
      keyPhrases: [],
      loading: false
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
    } catch (error) {
      alert('Something went wrong, please try again!')
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

  abstractedFunction = () => {
    this.props.showLoggedThoughts()
    this.updateFirebase()
  }

  render() {
    return (
      <React.Fragment>
        <Section id="results">
          <Title>Here is what we found:</Title>
          <Paragraph>
            You were typing in {this.state.language}.
          </Paragraph>
          <List>
              The following key phrases are found:
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
          <Sentiment>
            <SentimentText>
              The overall sentiment score of your thought is:
            </SentimentText>
            <SentimentProgressBar sentimentValue={this.state.sentiment} />
            <Positive>Positive</Positive>
            <Negative>Negative</Negative>
            <SentimentScore>{this.state.sentiment}%</SentimentScore>
          </Sentiment>
          </Section>
     
          <NiceButton
            value="Log my thought"
            link="#loggedThoughts"
            type="button"
            whenClicked={this.abstractedFunction}
          />

          </React.Fragment>
          );
        }
      }
      
      export default Results;
      