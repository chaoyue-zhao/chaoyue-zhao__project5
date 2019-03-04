import React, {Component} from 'react';
import styled from "styled-components";

/**********
  STYLES
*********/

const Title = styled.h1`
  font-family: "Reenie Beanie", cursive;
  font-size: 4rem;
  color: ${props => props.theme.color.blue};
  margin: 10px 0;

  @media(max-width: 1200px) {
    font-size: 3rem;
    margin: 1rem 0;
  }

  @media(max-width: 450px) {
    font-size: 2.5rem;
  }

  @media(max-width: 350px) {
    font-size: 2rem;
  }
`;

/************
  FUNCTIONS
************/

class Header extends Component {
    render(){
        return (
          <Title>What'cha think'n</Title>
        )
    }
}

export default Header; 