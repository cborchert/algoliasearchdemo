import React, {Component} from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import '../styles/Movie.scss';

//The SearchBar component can be pure -- at this level of an application, we don't need internalized state.
//We just receive state from the parent and pass the changed value back to the parent
//TODO: Styling
//TODO: proptypes
//TODO: Add a confirmation before allowing delete
class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            deleteMenuOpen: false
        }
    }

    toggleExpanded() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    toggleDeleteMenu() {
        this.setState({
            deleteMenuOpen: !this.state.deleteMenuOpen
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.movieObject.objectID !== nextProps.movieObject.objectID || this.state.expanded !== nextState.expanded || this.state.deleteMenuOpen !== nextState.deleteMenuOpen || this.props.movieObject.alwaysUpdate === true || nextProps.movieObject.alwaysUpdate === true) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        // console.log('rendering movie');
        // console.log('rendering movie');
        let color = this.props.movieObject.color
                ? this.props.movieObject.color
                : '#FFF',
            classes = `movie ${this.props.className}`,
            image = this.props.movieObject.image && this.props.movieObject.image !== ''
                ? this.props.movieObject.image
                : '',
            style = {
                backgroundColor: color
            },
            bgStyle = {
                backgroundImage: `url(${image})`
            },
            alternativeTitles = '',
            actors = '',
            genres = '',
            deleteMovie = '',
            rating = Number(this.props.movieObject.rating),
            ratingColor = '',
            ratingEmotion = '',
            expandIcon = 'icon-enlarge',
            deleteMenu = '';

        if (rating <= 1) {
            ratingEmotion = 'emote-crying';
        } else if (rating <= 2) {
            ratingEmotion = 'emote-sad';
        } else if (rating <= 2.5) {
            ratingEmotion = 'emote-hmm';
        } else if (rating < 3) {
            ratingEmotion = 'emote-neutral';
        } else if (rating < 4) {
            ratingEmotion = 'emote-smile';
        } else if (rating < 4.5) {
            ratingEmotion = 'emote-happy';
        } else {
            ratingEmotion = 'emote-grin';
        }
        if (this.state.expanded) {
            classes += ' movie--expanded';
            expandIcon = 'icon-shrink';
            alternativeTitles = this.props.movieObject.alternative_titles.length > 0
                ? (
                    <div className="movie__alternative-titles movie__additional">
                        <h5 className="movie__detail__heading">Alternative Titles</h5>
                        <ul className="movie__detail__text">
                            {this.props.movieObject.alternative_titles.map((title, i) => <li className="movie__alternative-title" key={'alternative-title' + i}>{title}</li>)}
                        </ul>
                    </div>
                )
                : '';
            actors = this.props.movieObject.actors.length > 0
                ? (
                    <div className="movie__actors movie__additional">
                        <h5 className="movie__detail__heading">Starring</h5>
                        <p className="movie__detail__text">
                            {this.props.movieObject.actors.join(', ')}
                        </p>
                    </div>
                )
                : '';
            genres = this.props.movieObject.genre.length > 0
                ? (
                    <div className="movie__genres movie__additional">
                        <h5 className="movie__detail__heading">Genre</h5>
                        <p className="movie__detail__text">
                            {this.props.movieObject.genre.join(', ')}
                        </p>
                    </div>
                )
                : '';
            deleteMovie = (
                <div className="movie__delete movie__additional" onClick={this.toggleDeleteMenu.bind(this)}><span className="movie__delete-icon icon-delete"/></div>
            );
        }
        if (this.state.deleteMenuOpen) {
            classes += ' movie__delete-menu-open';
            deleteMenu = (
                <div className="movie__delete-menu movie__delete-menu--open">
                    <div className="movie__delete-menu__inner">
                        <h2>Are you sure you want to delete this movie?</h2>
                        <p>
                            <button className="button button--large movie__delete-menu__cancel" onClick={this.toggleDeleteMenu.bind(this)}>Cancel</button>
                            <button className="button button--red button--large movie__delete-menu__delete" onClick={() => {
                                this.props.deleteMovie(this.props.movieObject.objectID)
                            }}>Delete</button>
                        </p>
                    </div>
                </div>
            );
        }
        return (
            <div className={classes} style={style}>
                <div className="movie__background" style={bgStyle}/>
                <div className="movie__inner">
                    <img className="movie__image" src={image}/>
                    <div className="movie__details">
                        <div className="movie__title" onClick={this.toggleExpanded.bind(this)}>{this.props.movieObject.title}</div>
                        <div className="movie__year">{this.props.movieObject.year}</div>
                        <div className="movie__rating">
                            <span className={`movie__rating-icon icon-${ratingEmotion}-full`} title={`Rated ${this.props.movieObject.rating}/5`}/>
                        </div>
                        {alternativeTitles}
                        {actors}
                        {genres}

                    </div>
                </div>
                <div className="movie__expand" onClick={this.toggleExpanded.bind(this)}><span className={`movie__expand-icon ${expandIcon}`}/></div>
                {deleteMovie}
                {deleteMenu}
            </div>
        );
    }
}

//PropTypes
Movie.propTypes = {
    className: PropTypes.string,
    movieObject: PropTypes.shape({
        title: PropTypes.string,
        color: PropTypes.string,
        year: PropTypes.string,
        rating: PropTypes.string,
        score: PropTypes.string,
        genre: PropTypes.array,
        alternative_titles: PropTypes.array,
        actors: PropTypes.array,
        actor_facets: PropTypes.array,
        alwaysUpdate: PropTypes.bool,
        objectID: PropTypes.string
    })
};

Movie.defaultProps = {
    className: '',
    movieObject: {
        title: '',
        color: '#34495e',
        year: '',
        rating: '',
        score: '',
        genre: [],
        alternative_titles: [],
        actors: [],
        actor_facets: [],
        alwaysUpdate: false,
        objectID: 'uninstantiated'
    }
}

export default Movie;
