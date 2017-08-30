import React, {Component} from 'react';
import PropTypes from 'prop-types';
import xss from 'xss';
import _ from 'lodash';
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
            rating: '3',
            score: '',
            year: '',
            advancedOpen: false,
            inputErrors: []
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

    submitMovie() {
        //TODO: validate movie object
        //Movie title is not blank
        let movieObject = this.createMovieObject();
        //If all is not well, show form errors
        //If all is well
        this.props.addMovie(movieObject);
        this.closeForm();
    }

    toggleAdvanced() {
        this.setState({
            advancedOpen: !this.state.advancedOpen
        })
    }

    closeForm() {
        //reset form in addition to closing!
        this.setState({
            title: '',
            color: '#2c3e50',
            image: '',
            actors: [],
            actor_facets: [],
            actor_images: [],
            alternative_titles: [],
            genre: [],
            rating: '3',
            score: '',
            year: '',
            advancedOpen: false
        }, this.props.closeForm);
    }

    handleErrors(uniqueId, isValid, message) {
        let messages = this.state.inputErrors,
            index = _.findIndex(messages, function(message) {
                return message.uniqueId == uniqueId;
            });
        //remove former errors if isValid
        if (isValid) {
            if (index > -1) {
                messages.splice(index, 1);
            }
        } else {
            if (index > -1) {
                messages[index] = {
                    uniqueId,
                    isValid,
                    message
                }
            } else {
                messages.push({uniqueId, isValid, message});
            }
        }
        this.setState({inputErrors: messages});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isOpen || nextProps.isOpen) {
            return true;
        } else {
            let shouldUpdate = false;
            for (let key in nextState) {
                if (nextState[key] !== this.state[key]) {
                    shouldUpdate = true;
                    break;
                }
            }
            return shouldUpdate;
        }
    }

    //TODO: Form validation
    //TODO: Submit form
    render() {
        // console.log('rendering movie form');
        let formClasses = this.props.isOpen
                ? 'new-movie-form new-movie-form--open'
                : 'new-movie-form',
            advancedClasses = this.state.advancedOpen
                ? 'new-movie-form__advanced new-movie-form__advanced--open'
                : 'new-movie-form__advanced',
            advancedToggleButtonInner = this.state.advancedOpen
                ? 'Less'
                : 'More Attributes',
            moviePreviewObject = this.createMovieObject(),
            actorsInputGroups = '',
            genresInputs = '',
            alternativeTitlesInputs = '',
            movieErrors = this.state.inputErrors.length == 0
                ? ''
                : (
                    <div className="new-movie-form__errors">
                        <div className="new-movie-form__error">Please check the form for input errors.</div>
                    </div>
                ),
            submitButtonClasses = this.state.inputErrors.length == 0
                ? 'button button--large new-movie-form__submit'
                : 'button button--large new-movie-form__submit button--disabled';
        if (this.state.genre.length > 0) {
            genresInputs = this.state.genre.map((genre, i) => {
                return (
                    <div className="new-movie-form__repeater-field" key={'genres-input-' + i}>
                        <span className="icon-cancel new-movie-form__remove-field-instance new-movie-form__remove-genre" onClick={() => {
                            this.removeGenre(i)
                        }} title="Remove genre from movie" aria-label="Remove genre from movie"/>
                        <TextInput className="new-movie-form__genre-input" label="genre" keyName="genre" keyIndex={i} onChange={this.handleChange.bind(this)} value={genre} hidePlaceholder={true} reportErrors={this.handleErrors.bind(this)}/>
                    </div>
                );
            })
        }
        if (this.state.actors.length > 0) {
            actorsInputGroups = this.state.actors.map((actor, i) => {
                return (
                    <div className="new-movie-form__repeater-field" key={'actors-input-group-' + i}>
                        <span className="icon-cancel new-movie-form__remove-field-instance new-movie-form__remove-actor" onClick={() => {
                            this.removeActor(i)
                        }} title="Remove actor from movie" aria-label="Remove actor from movie"/>
                        <TextInput className="new-movie-form__actor-input" label="actor" keyName="actors" keyIndex={i} value={actor} onChange={this.handleChange.bind(this)} hidePlaceholder={true} reportErrors={this.handleErrors.bind(this)}/>
                        <TextInput className="new-movie-form__actor-image-input" label="actor image url" keyName="actor_images" keyIndex={i} value={this.state.actor_images[i]} onChange={this.handleChange.bind(this)} hidePlaceholder={true} reportErrors={this.handleErrors.bind(this)}/>
                    </div>
                );
            })
        }
        if (this.state.alternative_titles.length > 0) {
            alternativeTitlesInputs = this.state.alternative_titles.map((alternativeTitle, i) => {
                return (
                    <div className="new-movie-form__repeater-field" key={'alternative-title-input-' + i}>
                        <span className="icon-cancel new-movie-form__remove-field-instance new-movie-form__remove-alternative-title" onClick={() => {
                            this.removeAlternativeTitle(i)
                        }} title="Remove alternative title from movie" aria-label="Remove alternative title from movie"/>
                        <TextInput className="new-movie-form__alternative-title-input" label="alternative title" keyName="alternative_titles" keyIndex={i} onChange={this.handleChange.bind(this)} value={alternativeTitle} hidePlaceholder={true}/>
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
                        <Movie className="new-movie-form__movie" movieObject={moviePreviewObject} disableDelete={true}/>
                    </div>

                    <TextInput className="new-movie-form__title-input" label="title" keyName="title" onChange={this.handleChange.bind(this)} value={this.state.title} hidePlaceholder={true} required={true} reportErrors={this.handleErrors.bind(this)}/>
                    <TextInput className="new-movie-form__image-input" label="image url" keyName="image" onChange={this.handleChange.bind(this)} value={this.state.image} hidePlaceholder={true} reportErrors={this.handleErrors.bind(this)}/>
                    <TextInput className="new-movie-form__color-input" label="color" keyName="color" onChange={this.handleChange.bind(this)} value={this.state.color} features={['previewColor']} type="color" placeholder="Enter a valid html color" required={true} reportErrors={this.handleErrors.bind(this)}/>
                    <div className={advancedClasses}>
                        <button className="button new-movie-form__toggle-advanced" onClick={this.toggleAdvanced.bind(this)} title={advancedToggleButtonInner} aria-label={advancedToggleButtonInner}>
                            {advancedToggleButtonInner}
                        </button>
                        <div className="new-movie-form__advanced__inner">
                            <div className="new-movie-form__repeater-field-container">
                                <h5>Alternative Titles
                                    <span className="icon-plus new-movie-form__repeater-field-add new-movie-form__add-alternative-title" onClick={this.addAlternativeTitle.bind(this)} title="Add alternative title to movie" aria-label="Add alternative title to movie"/></h5>
                                {alternativeTitlesInputs}

                            </div>
                            <div className="new-movie-form__repeater-field-container">
                                <h5>Actors<span className="icon-plus new-movie-form__repeater-field-add new-movie-form__add-actor" onClick={this.addActor.bind(this)} title="Add actor to movie" aria-label="Add actor to movie"/></h5>
                                {actorsInputGroups}

                            </div>
                            <div className="new-movie-form__repeater-field-container">
                                <h5>Genres<span className="icon-plus new-movie-form__repeater-field-add new-movie-form__add-genre" onClick={this.addGenre.bind(this)} title="Add genre to movie" aria-label="Add genre to movie"/></h5>
                                {genresInputs}

                            </div>
                            <TextInput className="new-movie-form__rating-input" label="rating" keyName="rating" onChange={this.handleChange.bind(this)} value={this.state.rating} type="number" min="0" max="5" step="0.1" placeholder="Enter a rating between 0 and 5" reportErrors={this.handleErrors.bind(this)}/>
                            <TextInput className="new-movie-form__year-input" label="year" keyName="year" onChange={this.handleChange.bind(this)} value={this.state.year} type="number" min="1800" step="1" placeholder="Enter a year after 1799" integer={true} reportErrors={this.handleErrors.bind(this)}/>
                            <TextInput className="new-movie-form__score-input" label="score" keyName="score" onChange={this.handleChange.bind(this)} value={this.state.score} type="number" min="0" max="10" step="0.05" placeholder="Enter a score between 0 and 10" reportErrors={this.handleErrors.bind(this)}/>

                        </div>
                    </div>
                </div>
                <div className="new-movie-form__footer">
                    {movieErrors}
                    <button className={submitButtonClasses} onClick={this.submitMovie.bind(this)} disabled={this.state.inputErrors.length > 0}>
                        Submit
                    </button>
                </div>

                <span onClick={this.closeForm.bind(this)} className="icon-cancel new-movie-form__close" title="Close" aria-label="Close"/>
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
