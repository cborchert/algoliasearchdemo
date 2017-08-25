import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Result from './Result';
import '../styles/Results.scss';

//Since Algolia search is asynchronous
//https://www.algolia.com/doc/api-reference/api-methods/search/
//TODO: Styling
//TODO: proptypes
class Results extends Component {

    shouldComponentUpdate(nextProps){

        if(this.props.hits.length !== nextProps.hits.length){
            //If the hit lists are not the same length, we definitely need to update!
            console.log('Hit lists not the same length. Let\'s update.');
            return true;
        } else {
            //Check whether each of the hits is the same and in the same order!
            let shouldUpdate = false;
            this.props.hits.forEach( function compareHits(hit, i){
                if(hit.objectID !== nextProps.hits[i].objectID){
                    console.log('Hit lists not identical. Let\'s update.');
                    shouldUpdate = true;
                }
            });
            return shouldUpdate;
        }
    }

    render() {
        console.log("Results Rendering");
        let hits = '';
        if( this.props.hits ){
            hits = this.props.hits.map( (hit, i) => {
                return <Result key={hit.objectID} resultObject={hit} order={2*(i+1)} deleteMovie={this.props.deleteMovie}/>;
            });
        }
        return (
            <div className="results">
                {hits}
            </div>
        );

    }

}

//PropTypes
Results.propTypes = {
    hits: PropTypes.array
};

Results.defaultProps = {
    hits: []
}

export default Results;
