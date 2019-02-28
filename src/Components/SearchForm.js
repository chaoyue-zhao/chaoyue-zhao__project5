import React, { Component } from 'react';

class SearchForm extends Component {
    render(){
        return (
            <form action="#">
                <label htmlFor="text">Thoughts:</label>
                <textarea name="text" id="text" cols="30" rows="10"></textarea>
            </form>
        )
    }
}

export default SearchForm;