import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import algoliasearch from 'algoliasearch'

export default class App extends Component {

    render() {
        //https://github.com/algolia/algoliasearch-client-javascript#nodejs--react-native--browserify--webpack
        //https://www.algolia.com/doc/api-client/javascript/getting-started/
        let client = algoliasearch('H6LCFN7QUX', 'fd23d200ccc13ded45de9820fce938de'),
            index = client.initIndex('your_index_name');
        return <div> Hi! </div>;
    }

}
