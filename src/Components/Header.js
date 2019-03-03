import React, {Component} from 'react';
import styled from "styled-components";

/**********
  STYLES
*********/

const Title = styled.h1`
  font-family: 'Reenie Beanie', cursive;
  font-size: 4rem;
  color: #295166;
  margin: 10px 0;
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