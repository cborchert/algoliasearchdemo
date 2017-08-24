import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import './styles/common.scss';

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            searchValue: '',
            searchResults: []
        };

        //https://github.com/algolia/algoliasearch-client-javascript#nodejs--react-native--browserify--webpack
        //https://www.algolia.com/doc/api-client/javascript/getting-started/
        //We will not be needing to change anything on the client, or to access it after this
        //The index should be available though
        const client = algoliasearch('H6LCFN7QUX', 'fd23d200ccc13ded45de9820fce938de');
        this.index = client.initIndex('technical_test_movies');

    }

    handleSearchChange(event){
        let query = event.target.value;

        this.setState({
            searchValue: query
        });

        this.index.search(query, function searchDone(err, content) {
            if (err) {
                console.error(err);
                return;
            }
            this.setState({searchResults: content.hits});
        }.bind(this));
    }

    //TODO: shouldComponentUpdate to determine if we need to update the app -- or simply pass it into the query container
    render() {

        //<Results index={this.index} query={this.state.searchValue} />
        return (
            <div>
                <SearchBar value={this.state.searchValue} onChange={this.handleSearchChange.bind(this)}/>
                <Results hits={this.state.searchResults} />
            </div>
        );
    }

}
