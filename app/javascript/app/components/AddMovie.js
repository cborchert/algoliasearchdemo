import React, {Component} from 'react';
import {GithubPicker} from 'react-color';
import xss from 'xss';
import TextInput from './TextInput';
import Movie from './Movie';
import '../styles/AddMovie.scss';

export default class AddMovie extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            image: '',
            actors: [],
            actor_facets: [],
            actor_images: [],
            alternative_titles: [],
            genre: [],
            rating: '',
            score: '',
            year: ''
        }
    }

    handleChange(keyName, value, keyIndex) {

        let newValue = value;

        //handle array changes
        if (typeof keyIndex !== 'undefined' && Array.isArray(this.state[keyName])) {
            let stateValue = this.state[keyName];
            stateValue[keyIndex] = value;
            newValue = stateValue;
        }

        this.setState({[keyName]: newValue});

    }

    createMovieObject() {
        //compose the actor facets
        let actor_facets = Array(this.state.actors.length);

        this.state.actor_images.forEach((actorImage, i) => {
            actor_facets[i] = xss(actorImage) + '|';
            actor
        });
        this.state.actors.forEach((actor, i) => {
            actor_facets[i] += xss(actor);
        });

        let movie = {
            title: this.state.title,
            image: this.state.image,
            color: this.state.color,
            actors: this.state.actors,
            actor_facets: actor_facets,
            alternative_titles: this.state.alternative_titles,
            genre: this.state.genre,
            rating: this.state.rating,
            score: this.state.score,
            year: this.state.year
        };

        return movie;
    }

    addActor() {
        let actors = this.state.actors,
            actor_facets = this.state.actor_facets,
            actor_images = this.state.actor_images;
        actors.push('');
        actor_facets.push('|');
        actor_images.push('');
        this.setState({actors, actor_facets, actor_images});
    }

    removeActor(index) {
        let actors = this.state.actors,
            actor_facets = this.state.actor_facets,
            actor_images = this.state.actor_images;
        actors.splice(index, 1);
        actor_facets.splice(index, 1);
        actor_images.splice(index, 1);
        this.setState({actors, actor_facets, actor_images});
    }

    addGenre() {
        let genre = this.state.genre;
        genre.push('');
        this.setState({genre});
    }

    removeGenre(index) {
        let genre = this.state.genre;
        genre.splice(index, 1);
        this.setState({genre});
    }

    addAlternativeTitle() {
        let alternative_titles = this.state.alternative_titles;
        alternative_titles.push('');
        this.setState({alternative_titles});
    }

    removeAlternativeTitle(index) {
        let alternative_titles = this.state.alternative_titles;
        alternative_titles.splice(index, 1);
        this.setState({alternative_titles});
    }

    getMovieErrors(movieObject) {
        let errors = [];
        console.log('title', xss(movieObject.title).trim())
        if (xss(movieObject.title).trim() === '') {
            errors.push("A title is required");
        }
        return errors;
    }

    submitMovie() {
        //TODO: validate movie object
        //Movie title is not blank
        let movieObject = this.createMovieObject();
        //If all is not well, show form errors
        //If all is well
        this.props.addMovie(movieObject);
    }

    // actor_facets: ["https://image.tmdb.org/t/p/w45/ezPYICJlhdPrFPp7wBFChZ5CpEC.jpg|Kristen Holden-Ried"]
    // actors: ["Kristen Holden-Ried"]
    // alternative_titles:["Retornados"]
    // color:"#592B2B"
    // genre:["Horror", "Thriller", "Drama"]
    // image:"https://image.tmdb.org/t/p/w154/xaebgpsOqxkfeKDaV4YMTbww5ss.jpg"
    // rating:"3"
    // score:"5.125581395348838"
    // title:"The Returned"
    // year:"2014"
    //TODO: Form validation
    //TODO: Submit form
    //TODO: Color input circle
    render() {
        let colors = [
                "#e74c3c",
                "#c0392b",
                "#e67e22",
                "#d35400",
                "#f1c40f",
                "#f39c12",
                "#1abc9c",
                "#16a085",
                "#2ecc71",
                "#27ae60",
                "#3498db",
                "#2980b9",
                "#9b59b6",
                "#8e44ad",
                "#34495e",
                "#2c3e50",
                "#95a5a6",
                "#7f8c8d",
                "#ecf0f1",
                "#bdc3c7"
            ],
            moviePreviewObject = this.createMovieObject(),
            actorsInputGroups = '',
            genresInputs = '',
            alternativeTitlesInputs = '',
            movieErrorsArray = this.getMovieErrors(moviePreviewObject),
            movieErrors = movieErrorsArray.length == 0
                ? ''
                : (
                    <ul>
                        {movieErrorsArray.map((error, i) => {
                            return <li key={i}>{error}</li>
                        })}
                    </ul>
                );

        console.log(movieErrorsArray);
        console.log(movieErrors);

        if (this.state.genre.length > 0) {
            genresInputs = this.state.genre.map((genre, i) => {
                return (
                    <div>
                        <div onClick={() => {
                            this.removeGenre(i)
                        }}>remove</div>
                        <TextInput key={'genres-input-' + i} label="genre" keyName="genre" keyIndex={i} onChange={this.handleChange.bind(this)} value={genre}/>
                    </div>
                );
            })
        }
        if (this.state.actors.length > 0) {
            actorsInputGroups = this.state.actors.map((actor, i) => {
                return (
                    <div key={'actors-input-group-' + i}>
                        <div onClick={() => {
                            this.removeActor(i)
                        }}>remove</div>
                        <TextInput label="actor" keyName="actors" keyIndex={i} value={actor} onChange={this.handleChange.bind(this)}/>
                        <TextInput label="actor image url" keyName="actor_images" keyIndex={i} value={this.state.actor_images[i]} onChange={this.handleChange.bind(this)}/>
                    </div>
                );
            })
        }
        if (this.state.alternative_titles.length > 0) {
            alternativeTitlesInputs = this.state.alternative_titles.map((alternativeTitle, i) => {
                return (
                    <div>
                        <div onClick={() => {
                            this.removeAlternativeTitle(i)
                        }}>remove</div>
                        <TextInput key={'alternative-title-input-' + i} label="alternative title" keyName="alternative_titles" keyIndex={i} onChange={this.handleChange.bind(this)} value={alternativeTitle}/>
                    </div>
                );
            });
        }
        return (
            <div className="add-movie">
                <TextInput label="title (required)" keyName="title" onChange={this.handleChange.bind(this)}/>
                <TextInput label="image url" keyName="image" onChange={this.handleChange.bind(this)}/>
                <TextInput label="color" keyName="color" onChange={this.handleChange.bind(this)} value={this.state.color} features={['previewColor']}/>
                <GithubPicker triangle="hide" colors={colors} color={this.state.color} onChange={(color) => {
                    console.log(color);
                    this.handleChange('color', color.hex)
                }}/>
                <hr/> {actorsInputGroups}
                <div onClick={this.addActor.bind(this)}>Add Actor</div>
                {genresInputs}
                <div onClick={this.addGenre.bind(this)}>Add Genre</div>
                <TextInput label="rating" keyName="rating" onChange={this.handleChange.bind(this)}/>
                <TextInput label="year" keyName="year" onChange={this.handleChange.bind(this)}/>
                <TextInput label="score" keyName="score" onChange={this.handleChange.bind(this)}/> {alternativeTitlesInputs}
                <div onClick={this.addAlternativeTitle.bind(this)}>Add Alternative Title</div>
                <h5>Preview</h5>
                <Movie movieObject={moviePreviewObject}/> {movieErrors}
                <button onClick={this.submitMovie.bind(this)} disabled={movieErrorsArray.length > 0}>
                    Submit
                </button>
            </div>
        );
    }
}
