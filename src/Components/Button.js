import React, { Component } from 'react';
import styled from 'styled-components';
import { Analyse } from 'styled-icons/boxicons-regular/Analyse';

/**********
  STYLES
*********/

const AnalyseIcon = styled(Analyse)`
width: 20px;
position: absolute;
top: 100%;
left: 50%;
transform: translateX(-50%);
padding: 20px;
text-align: center;
vertical-align: middle;
`;

const Button = styled.button`
font-family: "Playfair Display", serif;
font-size: 1rem;
color: #295166;
text-transform: capitalize;
background-color: #ece8df;
border: none;
border: 2px solid #295166;
padding: 0.5rem 2rem;
position: relative;
backface-visibility: hidden;
cursor: pointer;
margin-bottom: 1rem;


span {
    transition: all 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
}

.icon {
    opacity: 0;
    transition: all 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
}

&::before {
    opacity: 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border: 2px solid #295166;
    transform: translate3d(0, 100%, 0) translate3d(0, -2px, 0);
    transform-origin: 50% 100%;
    transition: transform 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
}

&:hover,
&:focus {
    border: none;

    span {
    opacity: 0;
    transform: translate3d(0, -50%, 0);
    transition-delay: 0;
    }

    &::before {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    }

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
    render() {
        return (
            <Button type="submit">
                <AnalyseIcon className="icon" />
                <span>See results</span>
            </Button>
        )
    }
}

export default NiceButton;