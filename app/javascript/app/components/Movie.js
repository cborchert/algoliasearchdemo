import React, {Component} from 'react';
import '../styles/Movie.scss';
import tinycolor from 'tinycolor2';

//The SearchBar component can be pure -- at this level of an application, we don't need internalized state.
//We just receive state from the parent and pass the changed value back to the parent
//TODO: Styling
//TODO: proptypes
//TODO: Add a confirmation before allowing delete
export default class Movie extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        }
    }

    toggleExpanded() {
        let expanded = !this.state.expanded;
        this.setState({expanded: expanded});
    }

    render() {

        console.log('rendering movie');
        let color = this.props.movieObject.color
                ? this.props.movieObject.color
                : '#FFF',
            theme = tinycolor(color).isLight()
                ? 'light'
                : 'dark',
            classes = 'movie ' +
            'movie--' + theme,
            order = this.state.expanded
                ? this.props.order
                : this.props.order,
            width = this.state.expanded
                ? '100%'
                : '20%',
            style = {
                order: order,
                backgroundColor: color,
                width: width
            };
        return (
            <div className={classes} style={style}>
                <div className="movie__image-container">
                    <img src={this.props.movieObject.image} className="movie__image"/>
                </div>
                <div className="movie__title">{this.props.movieObject.title}</div>
                <ul>
                    {this.props.movieObject.actor_facets.map((facet, i) => <li key={'actor-' + i}><img src={facet.substring(0, facet.indexOf("|"))}/>{facet.substring(facet.indexOf("|") + 1)}</li>)}
                </ul>
                <div className="movie__delete" onClick={() => {
                    this.props.deleteMovie(this.props.movieObject.objectID)
                }}>(delete)</div>
                <div className="movie__expand" onClick={this.toggleExpanded.bind(this)}>(expand)</div>

            </div>
        );
    }
}
