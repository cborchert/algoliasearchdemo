import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GithubPicker} from 'react-color';
import xss from 'xss';
import TextInput from './TextInput'
import Movie from './Movie';
import '../styles/NewMovieForm.scss';

class NewMovieForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            color: '#2c3e50',
            image: '',
            actors: [],
            actor_facets: [],
            actor_images: [],
            alternative_titles: [],
            genre: [],
            rating: '',
            score: '',
            year: '',
            advancedOpen: false
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
            year: this.state.year,
            alwaysUpdate: true
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
        //console.log('title', xss(movieObject.title).trim())
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

    toggleAdvanced() {
        this.setState({
            advancedOpen: !this.state.advancedOpen
        })
    }

    closeForm() {
        //reset form in addition to closing!
        this.state = {
            title: '',
            color: '',
            image: '',
            actors: [],
            actor_facets: [],
            actor_images: [],
            alternative_titles: [],
            genre: [],
            rating: '',
            score: '',
            year: '',
            advancedOpen: false
        }
        this.props.closeForm();
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = false;
        for (let key in nextProps) {
            if (key !== 'addMovie' && key !== 'closeForm' && nextProps[key] !== this.props[key]) {
                shouldUpdate = true;
                // console.log(key, nextProps[key], this.props[key]);
                break;
            }
        }
        if (shouldUpdate) {
            return true;
        }
        for (let key in nextState) {
            if (nextState[key] !== this.state[key]) {
                shouldUpdate = true;
                // console.log(key, nextState[key], this.state[key]);
                break;
            }
        }
        return shouldUpdate;
    }

    //TODO: Form validation
    //TODO: Submit form
    //TODO: Color input circle
    render() {
        console.log('rendering movie form');
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
            formClasses = this.props.isOpen
                ? 'new-movie-form new-movie-form--open'
                : 'new-movie-form',
            advancedClasses = this.state.advancedOpen
                ? 'new-movie-form__advanced new-movie-form__advanced--open'
                : 'new-movie-form__advanced',
            advancedToggleButtonInner = this.state.advancedOpen
                ? 'Show Less'
                : 'Show More',
            moviePreviewObject = this.createMovieObject(),
            actorsInputGroups = '',
            genresInputs = '',
            alternativeTitlesInputs = '',
            movieErrorsArray = this.getMovieErrors(moviePreviewObject),
            movieErrors = movieErrorsArray.length == 0
                ? ''
                : (
                    <ul className="new-movie-form__errors">
                        {movieErrorsArray.map((error, i) => {
                            return <li className="new-movie-form__error" key={i}>{error}</li>
                        })}
                    </ul>
                ),
            submitButtonClasses = movieErrorsArray.length == 0
                ? 'button button--large new-movie-form__submit'
                : 'button button--large new-movie-form__submit button--disabled';
        console.log(moviePreviewObject);
        if (this.state.genre.length > 0) {
            genresInputs = this.state.genre.map((genre, i) => {
                return (
                    <div>
                        <div className="new-movie-form__remove-genre" onClick={() => {
                            this.removeGenre(i)
                        }}>remove</div>
                        <TextInput className="new-movie-form__genre-input" key={'genres-input-' + i} label="genre" keyName="genre" keyIndex={i} onChange={this.handleChange.bind(this)} value={genre}/>
                    </div>
                );
            })
        }
        if (this.state.actors.length > 0) {
            actorsInputGroups = this.state.actors.map((actor, i) => {
                return (
                    <div key={'actors-input-group-' + i}>
                        <div className="new-movie-form__remove-actor" onClick={() => {
                            this.removeActor(i)
                        }}>remove</div>
                        <TextInput className="new-movie-form__actor-input" label="actor" keyName="actors" keyIndex={i} value={actor} onChange={this.handleChange.bind(this)}/>
                        <TextInput className="new-movie-form__actor-image-input" label="actor image url" keyName="actor_images" keyIndex={i} value={this.state.actor_images[i]} onChange={this.handleChange.bind(this)}/>
                    </div>
                );
            })
        }
        if (this.state.alternative_titles.length > 0) {
            alternativeTitlesInputs = this.state.alternative_titles.map((alternativeTitle, i) => {
                return (
                    <div>
                        <div className="new-movie-form__remove-alternative-title" onClick={() => {
                            this.removeAlternativeTitle(i)
                        }}>remove</div>
                        <TextInput className="new-movie-form__alternative-title-input" key={'alternative-title-input-' + i} label="alternative title" keyName="alternative_titles" keyIndex={i} onChange={this.handleChange.bind(this)} value={alternativeTitle}/>
                    </div>
                );
            });
        }
        return (
            <div className={formClasses}>
                <div className="new-movie-form__inner">
                    <h2>New Movie</h2>

                    <div className="new-movie-form__movie-preview">
                        <h5>Preview</h5>
                        <Movie className="new-movie-form__movie" movieObject={moviePreviewObject}></Movie>
                    </div>

                    <TextInput className="new-movie-form__title-input" label="title (required)" keyName="title" onChange={this.handleChange.bind(this)}/>
                    <TextInput className="new-movie-form__image-input" label="image url" keyName="image" onChange={this.handleChange.bind(this)}/>
                    <TextInput className="new-movie-form__color-input" label="color" keyName="color" onChange={this.handleChange.bind(this)} value={this.state.color} features={['previewColor']}/>
                    <GithubPicker className="new-movie-form__color-picker" triangle="hide" colors={colors} color={this.state.color} onChange={(color) => {
                        this.handleChange('color', color.hex)
                    }}/>
                    <div className={advancedClasses}>
                        <button className="button new-movie-form__toggle-advanced" onClick={this.toggleAdvanced.bind(this)}>
                            {advancedToggleButtonInner}
                        </button>
                        <div className="new-movie-form__advanced__inner">
                            <div>
                                <h5>Alternative Titles</h5>
                                {alternativeTitlesInputs}

                                <div className="new-movie-form__add-alternative-title" onClick={this.addAlternativeTitle.bind(this)}>Add Alternative Title</div>
                            </div>
                            <div>
                                <h5>Actors</h5>
                                {actorsInputGroups}
                                <div className="new-movie-form__add-actor" onClick={this.addActor.bind(this)}>Add Actor</div>
                            </div>
                            <div>
                                <h5>Genres</h5>
                                {genresInputs}
                                <div className="new-movie-form__add-genre" onClick={this.addGenre.bind(this)}>Add Genre</div>
                            </div>
                            <TextInput className="new-movie-form__rating-input" label="rating" keyName="rating" onChange={this.handleChange.bind(this)}/>
                            <TextInput className="new-movie-form__year-input" label="year" keyName="year" onChange={this.handleChange.bind(this)}/>
                            <TextInput className="new-movie-form__score-input" label="score" keyName="score" onChange={this.handleChange.bind(this)}/>

                        </div>
                    </div>

                    <div className="new-movie-form__footer">
                        {movieErrors}
                        <button onClick={this.closeForm.bind(this)} className="button button--red button--large new-movie-form__close">
                            Cancel
                        </button>
                        <button className={submitButtonClasses} onClick={this.submitMovie.bind(this)} disabled={movieErrorsArray.length > 0}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

//PropTypes
NewMovieForm.propTypes = {
    isOpen: PropTypes.bool,
    closeForm: PropTypes.func
};

NewMovieForm.defaultProps = {
    isOpen: false,
    closeForm: () => {}
}

export default NewMovieForm;
