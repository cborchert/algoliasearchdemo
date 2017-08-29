import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch';
import _ from 'lodash';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import NewMovieForm from './components/NewMovieForm';
import api from './API';
import './styles/common.scss';
import './styles/App.scss';

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            searchValue: '',
            searchResults: [],
            deletedIndices: [],
            formOpen: false
        };

        //https://github.com/algolia/algoliasearch-client-javascript#nodejs--react-native--browserify--webpack
        //https://www.algolia.com/doc/api-client/javascript/getting-started/
        //We are making the client available in order to be able to clear the cache
        this.client = algoliasearch('H6LCFN7QUX', 'fd23d200ccc13ded45de9820fce938de');
        this.index = this.client.initIndex('technical_test_movies');
        // this.debouncedQuery = _.debounce(this.runAlgoliaQuery.bind(this), 300, {'leading': true});
        this.debouncedQuery = this.runAlgoliaQuery.bind(this);

    }

    runAlgoliaQuery(queryString) {
        //Need to clear the cache in order for deleted queries not to show up again
        // console.log('clearing the search');
        // this.client.clearCache();
        // this.index.clearCache();
        console.log('running algolia search');
        this.index.search(queryString, function searchDone(err, content) {
            if (err) {
                console.error(err);
                return;
            }
            //Let's remove any hits that match our deleted indices (since we might be pulling up old data!)
            let hits = content.hits.filter(hit => this.state.deletedIndices.indexOf(hit.objectID) == -1);
            // console.log(hits)
            this.setState({searchResults: hits});
        }.bind(this));
    }

    updateResults(popDeletedId) {
        console.log('updating results')
        // this.client.clearCache();
        // this.index.clearCache();
        // if (popDeletedId) {
        //     let deletedIndices = this.state.deletedIndices;
        //     deletedIndicies = deletedIndicies.filter(id => id !== popDeletedId);
        //     this.setState({deletedIndices});
        // }
        // this.runAlgoliaQuery(this.state.searchValue);
        this.debouncedQuery(this.state.searchValue);
    }

    handleSearchChange(event) {
        let query = event.target.value;

        this.setState({searchValue: query});

        // this.runAlgoliaQuery(query);
        this.debouncedQuery(query);
    }

    addMovie(movieObject) {
        api.addMovie(movieObject, this.updateResults.bind(this));
    }

    openForm() {
        this.setState({formOpen: true})
    }
    closeForm() {
        this.setState({formOpen: false})
    }

    //TODO: In development, at least, the database gets locked when running several deletes consecutively, returning 500 errors
    deleteMovie(id) {
        // console.log('deleting ' + id);
        //Remove the hit from the results preemptively (assume success)
        let results = this.state.searchResults.filter(result => result.objectID !== id),
            deletedIndices = this.state.deletedIndices;
        deletedIndices.push(id);
        this.setState({searchResults: results, deletedIndices});
        api.deleteMovie(id, () => {
            this.updateResults.call(this, id)
        });
    }

    componentDidMount() {
        // this.runAlgoliaQuery(this.state.searchValue);
        this.debouncedQuery(this.state.searchValue);
    }

    //TODO: shouldComponentUpdate to determine if we need to update the app -- or simply pass it into the query container
    render() {
        console.log('rendering app');
        let appClasses = this.state.formOpen
            ? 'app app--locked'
            : 'app';
        //<Results index={this.index} query={this.state.searchValue} />
        return (
            <div className={appClasses}>
                <div className="app__inner">
                    <button className="button" onClick={this.openForm.bind(this)}>New Movie</button>
                    <SearchBar value={this.state.searchValue} onChange={this.handleSearchChange.bind(this)}/>
                    <MovieGrid movies={this.state.searchResults} deleteMovie={this.deleteMovie.bind(this)}/>
                </div>
                <NewMovieForm isOpen={this.state.formOpen} addMovie={this.addMovie.bind(this)} closeForm={this.closeForm.bind(this)}/>
            </div>
        );
    }

}
