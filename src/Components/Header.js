import React, {Component} from 'react';
import styled from "styled-components";

const Title = styled.h1`
  font-family: "Reenie Beanie", cursive;
  font-size: 3rem;
  color: #295166;
`;

class Header extends Component {
    render(){
        return <Title>what'cha think'n</Title>;
    }
}

export default Header;