import React, { Component } from 'react';

const LoggedThoughts = 

componentDidMount () {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (firebaseData) => {
    const newState = [];
    const data = firebaseData.val();

    for(let key in data) {
        newState.push(data[key]);
    }

    this.setState({
        text: newState
    })
    })
}

export default 
