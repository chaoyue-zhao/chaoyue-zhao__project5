import React, { Component } from 'react';
import styled from 'styled-components';
import { Heart } from "styled-icons/feather/Heart";
import { Coffee } from "styled-icons/feather/Coffee";

/**********
  STYLES
*********/

const FooterParagraph = styled.p`
    font-size: 0.8rem;
    margin: 0;
`

const Link = styled.a`
  text-decoration: none;
  color: #295166;
  border-bottom: 1px dotted #295166;
  padding: 2px;
  transition: all .2s;

  &:hover {
    background: #295166;
    color: #ece8df;
  }
`;

const HeartIcon = styled(Heart)`
  width: 20px;
  color: #d77a61;
`;

const CoffeeIcon = styled(Coffee)`
  width: 20px;
`

/************
  FUNCTIONS
************/

class Footer extends Component {
    render() {
        return (
          <React.Fragment>
            <FooterParagraph>
              Powered by <Link href="https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/" target="__blank">Microsoft Cognitive Services Text Analytics API</Link>. 
            </FooterParagraph>
            <FooterParagraph>
              Made with Love <HeartIcon /> and Tea <CoffeeIcon /> at the
              beautiful city of Toronto
            </FooterParagraph>
            <FooterParagraph>
              Copyright © 2019 Chaoyue Zhao.
            </FooterParagraph>
          </React.Fragment>
        );
    }
}

export default Footer;
