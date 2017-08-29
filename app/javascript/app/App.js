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
        // this.client = algoliasearch('H6LCFN7QUX', 'fd23d200ccc13ded45de9820fce938de', {_useCache: false});
        this.client = algoliasearch('H6LCFN7QUX', 'fd23d200ccc13ded45de9820fce938de');
        this.index = this.client.initIndex('technical_test_movies');
        this.debouncedQuery = _.debounce(this.runAlgoliaQuery.bind(this), 50, {'leading': true});
        // this.debouncedQuery = this.runAlgoliaQuery.bind(this);

    }

    runAlgoliaQuery(queryString) {
        //Need to clear the cache in order for deleted queries not to show up again, and for new queries to show up
        this.index.search({
            query: queryString,
            hitsPerPage: 24,
            attributesToHighlight: []
        }, function searchDone(err, content) {
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

    clearCache(popDeletedId) {
        // console.log('updating results');
        this.client.clearCache();
        this.index.clearCache();
        //This requires between 1000 and 3000 ms to be searchable -- how do we deal with this without interfering?
    }

    handleSearchChange(event) {
        let query = event.target.value;

        this.setState({searchValue: query});

        // this.runAlgoliaQuery(query);
        this.debouncedQuery(query);
    }
    addMovie(movieObject) {
        api.addMovie(movieObject, () => {
            this.clearCache();
        });
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
            this.clearCache.call(this, id)
        });
    }

    componentDidMount() {
        // this.runAlgoliaQuery(this.state.searchValue);
        this.debouncedQuery(this.state.searchValue);
        //Consider polling with a cleared cache every 1.5 seconds in order to guarantee that added and deleted movies are shown correctly...
        //either here or in this.clearCache() which is called after add/remove actions
        // setTimeout(() => {
        //     this.client.clearCache();
        //     this.index.clearCache();
        //     this.debouncedQuery(this.state.searchValue);
        // }, 500);
    }

    //TODO: shouldComponentUpdate to determine if we need to update the app -- or simply pass it into the query container
    render() {
        // console.log('rendering app');
        let appClasses = this.state.formOpen
            ? 'app app--locked'
            : 'app';
        //<Results index={this.index} query={this.state.searchValue} />
        return (
            <div className={appClasses}>
                <div className="app__header">
                    <h1>cinesearch</h1>
                    <SearchBar value={this.state.searchValue} onChange={this.handleSearchChange.bind(this)}/>
                    <button className="button add-movie-button" onClick={this.openForm.bind(this)} title="Add new movie" aria-label="Add new movie">
                        Add
                        <span className="desktop-only">{' Movie'}</span>
                    </button>
                </div>
                <div className="app__inner">
                    <MovieGrid movies={this.state.searchResults} deleteMovie={this.deleteMovie.bind(this)}/>
                </div>
                <NewMovieForm isOpen={this.state.formOpen} addMovie={this.addMovie.bind(this)} closeForm={this.closeForm.bind(this)}/>
            </div>
        );
    }

}
