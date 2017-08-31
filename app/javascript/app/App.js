import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch';
import _ from 'lodash';
import GLOBALS from './GLOBALS';
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
            formOpen: false,
            numberHits: 0,
            pollingInterval: false
        };

        //https://github.com/algolia/algoliasearch-client-javascript#nodejs--react-native--browserify--webpack
        //https://www.algolia.com/doc/api-client/javascript/getting-started/
        this.client = algoliasearch(GLOBALS.algolia_application_id, GLOBALS.algolia_search_only_api_key);
        this.index = this.client.initIndex(GLOBALS.algolia_index);
        //Don't execute queries more than once every 50ms
        this.debouncedQuery = _.debounce(this.runAlgoliaQuery.bind(this), 50, {'leading': true});

    }

    runAlgoliaQuery(query, hitsPerPage) {
        if (typeof hitsPerPage == 'undefined' || Number(hitsPerPage) == 0) {
            hitsPerPage = 24;
        }
        //Need to clear the cache in order for deleted queries not to show up again, and for new queries to show up
        this.index.search({
            query,
            hitsPerPage,
            attributesToHighlight: []
        }, function searchDone(err, content) {
            if (err) {
                console.error(err);
                return;
            }
            // console.log(content);
            //Let's remove any hits that match our deleted indices (since we might be pulling up old data!)
            let hits = content.hits.filter(hit => this.state.deletedIndices.indexOf(hit.objectID) == -1);
            // console.log(hits)
            this.setState({searchResults: hits, numberHits: content.nbHits});
        }.bind(this));
    }

    clearCache() {
        this.client.clearCache();
        this.index.clearCache();
    }

    handleSearchChange(event) {
        let query = event.target.value;

        this.setState({searchValue: query});
        this.debouncedQuery(query);
    }
    addMovie(movieObject) {
        api.addMovie(movieObject, () => {
            this.clearCache();
        });
    }

    openForm() {
        this.props.history.push('/new');
    }
    closeForm() {
        this.props.history.push('/');
    }

    deleteMovie(id) {
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
        this.debouncedQuery(this.state.searchValue);
        //polling with a cleared cache every 2.5 seconds in order to guarantee that added and deleted movies are shown correctly...
        let interval = setInterval(() => {
            this.clearCache();
            //If the user has been playing with loading more, we should only load the number of hits they already have on the screen
            if (this.state.searchResults.length <= 24) {
                this.debouncedQuery(this.state.searchValue);
            } else {
                this.debouncedQuery(this.state.searchValue, this.state.searchResults.length);
            }

        }, 2500);

        this.setState({pollingInterval: interval});
    }

    componentWillUnmount() {

        clearInterval(this.state.pollingInterval);

    }

    loadMore() {
        this.runAlgoliaQuery(this.state.searchValue, this.state.searchResults.length + 24);
    }

    render() {
        // console.log('rendering app');
        let formOpen = this.props.location.pathname == '/new',
            appClasses = formOpen
                ? 'app app--locked'
                : 'app',
            newForm = formOpen
                ? (<NewMovieForm isOpen={true} addMovie={this.addMovie.bind(this)} closeForm={this.closeForm.bind(this)}/>)
                : '',
            loadMoreButton = this.state.searchResults.length < this.state.numberHits && this.state.searchResults.length < 1000
                ? <button className='button button--large app__load-more' onClick={this.loadMore.bind(this)}>Load more</button>
                : '';

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
                    <MovieGrid movies={this.state.searchResults} deleteMovie={this.deleteMovie.bind(this)}/> {loadMoreButton}
                </div>
                {newForm}
            </div>
        );
    }

}
