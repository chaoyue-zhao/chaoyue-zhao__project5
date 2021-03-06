import React, {Component} from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  line-height: 1.6;
  width: 80%;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 1400px) {
    width: 95%;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

class Description extends Component {
    render () {
        return (
           <Paragraph>
            Start by typing a thought (long or short) below. The app will then return the language you were typing in, the key phrases mentioned in your thought, and a sentiment score between 0% (negative) to 100% (positive). You will have the chance to edit the key phrases and log your thought after! Please note the the thoughts you logged will be saved in a database and displayed to this page. 
           </Paragraph>
        )
    }
}

export default Description 