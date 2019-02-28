import React, {Component} from 'react';
import axios from 'axios';

class Results extends Component {
    constructor() {
        super();
        this.state = {
            sentiment: 0,
            keyPhrase: []
        }
    }

    componentDidMount () {
        this.getResponse();
    }

    apiCalls = (endpoint,language) => {
        return axios({
          method: 'POST',
          url:
            `https://canadacentral.api.cognitive.microsoft.com/text/analytics/v2.0/${endpoint}`,
          dataResponse: 'json',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': `${process.env.REACT_APP_API_KEY}`
          },
          data: {
            'documents': [
                {
                    'language': language,
                    'id': '1',
                    'text': 'I love Cat'
                }
            ]
         }
        });
    }

    getResponse = async () => {
        try {

            const getLanguage = await this.apiCalls('languages');
    
            console.log(getLanguage);
            
            const language = getLanguage.data.documents[0].detectedLanguages[0].name;
    
            const languageCode = getLanguage.data.documents[0].detectedLanguages[0].iso6391Name;
    
            console.log(languageCode);

            console.log(language);
    
            const getKeyPhrase = await this.apiCalls('keyPhrases',languageCode);
    
            const keyPhrase = getKeyPhrase.data.documents[0].keyPhrases
    
            console.log(keyPhrase);
    
            const getSentiment = await this.apiCalls('sentiment');
    
            const sentiment = getSentiment.data.documents[0].score;
    
            console.log(sentiment);
    
            const values = await Promise.all([
              this.apiCalls("keyPhrases", languageCode),
              this.apiCalls("sentiment", languageCode)
            ]);
    
            console.log (values);
        }
        
        catch(error) {
            throw error;
        }
    }

    render() {
        return (
           <div className="results">
            <p>{this.state.sentiment}</p>
            <p>{this.state.keyPhrase}</p>
           </div>            
        )
    }
}

export default Results; 