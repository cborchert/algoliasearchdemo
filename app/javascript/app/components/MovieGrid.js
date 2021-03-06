import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
import '../styles/MovieGrid.scss';

class MovieGrid extends Component {

    shouldComponentUpdate(nextProps) {

        if (this.props.movies.length !== nextProps.movies.length) {
            //If the hit lists are not the same length, we definitely need to update!
            // console.log('Hit lists not the same length. Let\'s update.');
            return true;
        } else {
            //Check whether each of the hits is the same and in the same order!
            let shouldUpdate = false;
            this.props.movies.forEach(function compareMovies(movie, i) {
                if (movie.objectID !== nextProps.movies[i].objectID) {
                    // console.log('Hit lists not identical. Let\'s update.');
                    shouldUpdate = true;
                }
            });
            return shouldUpdate;
        }
    }

    render() {
        // console.log("Rendering movie grid");
        let movies = <h3>Nothing matched your search{' '}<span className="icon-emote-crying"/></h3>;
        if (this.props.movies && this.props.movies.length > 0) {
            movies = this.props.movies.map((movie, i) => {
                return <Movie key={movie.objectID} movieObject={movie} order={2 * (i + 1)} deleteMovie={this.props.deleteMovie}/>;
            });
        }
        return (
            <div className="movie-grid">
                {movies}
            </div>
        );

    }

}

//PropTypes
MovieGrid.propTypes = {
    movies: PropTypes.array,
    deleteMovie: PropTypes.func
};

MovieGrid.defaultProps = {
    movies: [],
    deleteMovie: () => {}
}

export default MovieGrid;
