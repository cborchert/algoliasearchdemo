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
            expanded: false
        }
    }

    toggleExpanded() {
        let expanded = !this.state.expanded;
        this.setState({expanded: expanded});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.movieObject.objectID !== nextProps.movieObject.objectID || this.state.expanded !== nextState.expanded;
    }

    render() {
        console.log('rendering movie');
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
            ratingColor = '',
            ratingEmotion = '',
            expandIcon = 'icon-enlarge';

        if (this.props.movieObject.rating <= 1) {
            ratingEmotion = 'emote-crying';
            ratingColor = '#c0392b';
        } else if (this.props.movieObject.rating <= 2) {
            ratingEmotion = 'emote-sad';
            ratingColor = '#d35400';
        } else if (this.props.movieObject.rating <= 2.5) {
            ratingEmotion = 'emote-hmm';
            ratingColor = '#f39c12';
        } else if (this.props.movieObject.rating < 3) {
            ratingEmotion = 'emote-neutral';
            ratingColor = '#8e44ad';
        } else if (this.props.movieObject.rating < 4) {
            ratingEmotion = 'emote-smile';
            ratingColor = '#2980b9';
        } else if (this.props.movieObject.rating < 4.5) {
            ratingEmotion = 'emote-happy';
            ratingColor = '#16a085';
        } else {
            ratingEmotion = 'emote-grin';
            ratingColor = '#27ae60';
        }
        if (this.state.expanded) {
            classes += ' movie--expanded';
            expandIcon = 'icon-shrink';
            alternativeTitles = (
                <div className="movie__alternative-titles movie__additional">
                    <h5 className="movie__detail__heading">Alternative Titles</h5>
                    <ul className="movie__detail__text">
                        {this.props.movieObject.alternative_titles.map((title, i) => <li className="movie__alternative-title" key={'alternative-title' + i}>{title}</li>)}
                    </ul>
                </div>
            );
            actors = (
                <div className="movie__actors movie__additional">
                    <h5 className="movie__detail__heading">Starring</h5>
                    <p className="movie__detail__text">
                        {this.props.movieObject.actors.join(', ')}
                    </p>
                </div>
            );
            genres = (
                <div className="movie__genres movie__additional">
                    <h5 className="movie__detail__heading">Genre</h5>
                    <p className="movie__detail__text">
                        {this.props.movieObject.genre.join(', ')}
                    </p>
                </div>
            );
            deleteMovie = (
                <div className="movie__delete movie__additional" onClick={() => {
                    this.props.deleteMovie(this.props.movieObject.objectID)
                }}><span className="movie__delete-icon icon-delete"/></div>
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
                            <span className={`movie__rating-icon icon-${ratingEmotion}-full`} alt={`Rated ${this.props.movieObject.rating}/5`} ariaLabel={`Rated ${this.props.movieObject.rating}/5`}/>
                        </div>
                        {alternativeTitles}
                        {actors}
                        {genres}

                    </div>
                </div>
                <div className="movie__expand" onClick={this.toggleExpanded.bind(this)}><span className={`movie__expand-icon ${expandIcon}`}/></div>
                {deleteMovie}
            </div>
        );
    }
}

//PropTypes
Movie.propTypes = {
    className: PropTypes.string
};

Movie.defaultProps = {
    className: ''
}

export default Movie;
