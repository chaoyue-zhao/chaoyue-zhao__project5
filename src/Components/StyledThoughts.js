import styled from "styled-components";

export const Section = styled.section`
width: 60%;
margin: 0 auto;
border: 3px solid ${props => props.theme.color.blue};
border-radius: 10px;
padding: 2%;

@media (max-width: 1200px) {
    width: 80%;
    padding: 5%;
}

@media (max-width: 800px) {
    width: 95%;
}
`

export const Title = styled.h2`
font-family: ${props => props.theme.headingFont};
font-size: 2rem;
text-transform: lowercase;
margin: 1rem 0;

@media(max-width:400px) {
    font-size: 1.5rem;
    margin: 0.5rem 1rem;
}

`
export const Paragraph = styled.p`
font-size: 1rem;
text-align: left;
`

export const List = styled.ul`
list-style: none;
margin: 0;
padding: 0;
text-align: left;
display: flex;
flex-direction: column;
flex-wrap: wrap;
width: 100%;
`

export const Item = styled.li`
display: flex;
margin-top: 1rem;
position: relative;
`

export const Sentiment = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: baseline;
position: relative;
margin-top: 1rem;
`

export const SentimentText = styled.span`
width: 65%;
text-align: left;

@media(max-width: 900px) {
  width: 100%;
}
`

export const SentimentProgressBar = styled.span`
display: block;
width: 32%;
height: 20px;
background: linear-gradient(
    to right,
    ${props => props.theme.color.red} ${props => props.sentimentValue}%,
    transparent ${props => props.sentimentValue}%
    ),
    ${props => props.theme.color.blue};

@media(max-width: 900px) {
    width: 80%;
    margin: 1rem 0 2rem 1rem;
}
`

export const SentimentScore = styled.span`
position: absolute;
top: 22px;
right: 17%;
transform: translateX(50%);
font-size: 0.6rem;

@media(max-width: 900px) {
    top: 70px;
    right: 55%;
}

@media(max-width: 470px) {
    top: 95px;
}
`

export const Positive = styled(SentimentScore) `
right: 2%;

@media(max-width: 900px) {
    top: 70px;
    right: 20%;
}

@media(max-width: 470px) {
    top: 95px;
}
`

export const Negative = styled(SentimentScore) `
right: 30%;

@media(max-width: 900px) {
    top: 70px;
    right: 90%;
}

@media(max-width: 470px) {
    top: 95px;
}
`
