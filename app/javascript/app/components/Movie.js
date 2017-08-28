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
            theme = tinycolor(color).isLight()
                ? 'light'
                : 'dark',
            classes = `movie movie--${theme} ${this.props.className}`,
            order = this.state.expanded
                ? this.props.order
                : this.props.order,
            width = this.state.expanded
                ? '100%'
                : '20%',
            image = this.props.movieObject.image && this.props.movieObject.image !== ''
                ? this.props.movieObject.image
                : '',
            style = {
                backgroundColor: color
            },
            bgStyle = {
                backgroundImage: `url(${image})`
            },
            innerStyle = {
                backgroundColor: tinycolor(color).setAlpha(0.7).toRgbString()
            };

        classes += this.state.expanded
            ? ' movie--expanded'
            : '';
        return (
            <div className={classes} style={style}>
                <div className="movie__background" style={bgStyle}/>
                <div className="movie__inner" style={innerStyle}>
                    <img className="movie__image" src={image}/>
                    <div className="movie__details">
                        <div className="movie__title">{this.props.movieObject.title}</div>
                        <div className="movie__alternative-titles movie__additional">
                            <h5>Alternative Titles</h5>
                            <ul>
                                {this.props.movieObject.alternative_titles.map((title, i) => <li className="movie__alternative-title" key={'alternative-title' + i}>{title}</li>)}
                            </ul>
                        </div>
                        <div className="movie__actors movie__additional">
                            <h5>Starring</h5>
                            <ul>
                                {this.props.movieObject.actor_facets.map((facet, i) => <li className="movie__actor" key={'actor-' + i}><img className="movie__actor__image" src={facet.substring(0, facet.indexOf("|"))}/>{facet.substring(facet.indexOf("|") + 1)}</li>)}
                            </ul>
                        </div>
                        <div className="movie__genres movie__additional">
                            <h5>Genre</h5>
                            <ul>
                                {this.props.movieObject.genre.map((genre, i) => <li className="movie__genre" key={'genre-' + i}>{genre}</li>)}
                            </ul>
                        </div>
                        <div className="movie__delete movie__additional" onClick={() => {
                            this.props.deleteMovie(this.props.movieObject.objectID)
                        }}>(delete)</div>
                        <div className="movie__expand" onClick={this.toggleExpanded.bind(this)}>(expand)</div>
                    </div>
                </div>
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
