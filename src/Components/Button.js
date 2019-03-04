import React, { Component } from 'react';
import styled from 'styled-components';
import { DownArrowCircle } from "styled-icons/boxicons-regular/DownArrowCircle";

/**********
  STYLES
*********/

const ArrowIcon = styled(DownArrowCircle)`
  width: 20px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  text-align: center;
  vertical-align: middle;
`;

// button styled inspiration https://tympanus.net/Development/ButtonStylesInspiration/.
const Button = styled.button`
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  color: ${props => props.theme.color.blue};
  text-transform: capitalize;
  background-color: ${props => props.theme.color.white};
  border: none;
  border: 2px solid ${props => props.theme.color.blue};
  padding: 0.5rem 2rem;
  position: relative;
  backface-visibility: hidden;
  cursor: pointer;
  margin: 1rem;

  /* span refers to the text on the button */
  span {
    transition: all 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  /* icon refers to the icon on the button after hover effect takes place */
  .icon {
    opacity: 0;
    transition: all 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  /* using before element as the border after the hover effect takes place */
  &::before {
    opacity: 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border: 2px solid ${props => props.theme.color.blue};
    /* this transform translate3d is very sweet. a lil better effect  */
    transform: translate3d(0, 100%, 0) translate3d(0, -2px, 0);
    transform-origin: 50% 100%;
    transition: transform 0.3s;
    /* i did grab this cubic-bezier directly from the inspector of the original post */
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &:hover,
  &:focus {
    border: none;

    /* on :hover make the text go away */
    span {
      opacity: 0;
      transform: translate3d(0, -50%, 0);
      transition-delay: 0;
    }

    /* on hover let the border shown */
    /* very important lesson learnt here hover effect on before element has to be written as :hover::before */
    &::before {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    /* on hover let the icon take the place of the text */
    .icon {
      opacity: 1;
      transition-delay: 0.1s;
      transform: translate3d(-50%, -85%, 0);
    }
  }
`;

/************
FUNCTIONS
************/

class NiceButton extends Component {
    constructor(){
      super();

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
      window.location.hash = this.props.link
      
    }

    render() {
        return (
            <Button 
            type="submit"
            onClick={this.handleClick}>
                <ArrowIcon className="icon" />
                <span>{this.props.value}</span>
            </Button>
        )
    }
}

export default NiceButton;