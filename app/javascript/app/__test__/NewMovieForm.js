import React from 'react';
import NewMovieForm from '../components/NewMovieForm';
import TextInput from '../components/TextInput';

//These tests are a bit too exhaustive -- the add/remove should be sufficient on the multi-tests
describe('<NewMovieForm />', () => {
    const wrapper = shallow(<NewMovieForm/>);

    it('should be a div', () => {
        expect(wrapper.type()).to.eql('div');
    });
    it('renders title input', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__title-input')).to.have.length('1');
    });
    it('renders image url input', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__image-input')).to.have.length('1');
    });
    it('renders color input', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__color-input')).to.have.length('1');
    });
    it('renders color picker', () => {
        expect(wrapper.find('.new-movie-form__color-picker')).to.have.length('1');
    });
    it('renders color picker and color input with same values', () => {
        wrapper.setState({color: '#ff0000'});
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__color-input').prop('value')).to.equal('#ff0000');
        expect(wrapper.find('.new-movie-form__color-picker').prop('color')).to.equal('#ff0000');
    });
    it('renders actor and actor image inputs based on state', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__actor-input')).to.have.length('0');
        expect(wrapper.find('TextInput').filter('.new-movie-form__actor-image-input')).to.have.length('0');
        wrapper.setState({
            actors: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__actor-input')).to.have.length('2');
        expect(wrapper.find('TextInput').filter('.new-movie-form__actor-image-input')).to.have.length('2');
        wrapper.setState({actors: []});
        wrapper.update();

    });
    it('responds to add actor click', () => {
        expect(wrapper.find('div').filter('.new-movie-form__add-actor')).to.have.length('1');
        wrapper.find('div').filter('.new-movie-form__add-actor').simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__actor-input')).to.have.length('1');
        expect(wrapper.find('TextInput').filter('.new-movie-form__actor-image-input')).to.have.length('1');
        wrapper.setState({actors: []});
        wrapper.update();
    });
    it('responds to remove actor click', () => {
        wrapper.setState({
            actors: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('div').filter('.new-movie-form__remove-actor')).to.have.length('2');
        wrapper.find('div').filter('.new-movie-form__remove-actor').first().simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__actor-input')).to.have.length('1');
        expect(wrapper.find('TextInput').filter('.new-movie-form__actor-image-input')).to.have.length('1');
        wrapper.setState({actors: []});
        wrapper.update();
    });
    it('renders genre inputs based on state', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__genre-input')).to.have.length('0');
        wrapper.setState({
            genre: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__genre-input')).to.have.length('2');
        wrapper.setState({genre: []});
        wrapper.update();

    });
    it('responds to add genre click', () => {
        expect(wrapper.find('div').filter('.new-movie-form__add-genre')).to.have.length('1');
        wrapper.find('div').filter('.new-movie-form__add-genre').simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__genre-input')).to.have.length('1');
        wrapper.setState({genre: []});
        wrapper.update();
    });
    it('responds to remove genre click', () => {
        wrapper.setState({
            genre: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__genre-input')).to.have.length('2');
        wrapper.find('div').filter('.new-movie-form__remove-genre').first().simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__genre-input')).to.have.length('1');
        wrapper.setState({genre: []});
        wrapper.update();
    });
    it('renders rating input', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__rating-input')).to.have.length('1');
    });
    it('renders year input', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__year-input')).to.have.length('1');
    });
    it('renders score input', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__score-input')).to.have.length('1');
    });
    it('renders alternative title inputs based on state', () => {
        expect(wrapper.find('TextInput').filter('.new-movie-form__alternative-title-input')).to.have.length('0');
        wrapper.setState({
            alternative_titles: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__alternative-title-input')).to.have.length('2');
        wrapper.setState({alternative_titles: []});
        wrapper.update();

    });
    it('responds to add alternative title click', () => {
        expect(wrapper.find('div').filter('.new-movie-form__add-alternative-title')).to.have.length('1');
        wrapper.find('div').filter('.new-movie-form__add-alternative-title').simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__alternative-title-input')).to.have.length('1');
        wrapper.setState({alternative_titles: []});
        wrapper.update();
    });
    it('responds to remove alternative title click', () => {
        wrapper.setState({
            alternative_titles: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__alternative-title-input')).to.have.length('2');
        wrapper.find('div').filter('.new-movie-form__remove-alternative-title').first().simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.new-movie-form__alternative-title-input')).to.have.length('1');
        wrapper.setState({alternative_titles: []});
        wrapper.update();
    });
    it('enables/disables submit button', () => {
        expect(wrapper.find('button')).to.have.length('1');
        expect(wrapper.find('button').is('.button--disabled')).to.equal(true);
    });
    it('renders error if no title', () => {
        expect(wrapper.find('.new-movie-form__errors')).to.have.length('1');
        expect(wrapper.find('.new-movie-form__error')).to.have.length('1');
        wrapper.setState({title: 'Hello World'});
        wrapper.update();
        expect(wrapper.find('.new-movie-form__errors')).to.have.length('0');
        expect(wrapper.find('.new-movie-form__error')).to.have.length('0');
    });
    it('has an advanced field panel', () => {
        expect(wrapper.find('.new-movie-form__advanced')).to.have.length('1');
    });
    it('responds to expand advanced fields', () => {
        expect(wrapper.find('.new-movie-form__open-advanced')).to.have.length('1');
        expect(wrapper.find('.new-movie-form__advanced').is('.new-movie-form__advanced--open')).to.equal(false);
        wrapper.find('.new-movie-form__open-advanced').simulate('click');
        wrapper.update();
        expect(wrapper.find('.new-movie-form__advanced').is('.new-movie-form__advanced--open')).to.equal(true);
        wrapper.find('.new-movie-form__open-advanced').simulate('click');
        wrapper.update();
        expect(wrapper.find('.new-movie-form__advanced').is('.new-movie-form__advanced--open')).to.equal(false);
    });
    it('responds to close button', () => {
        wrapper.setState({isOpen: true});
        wrapper.update();
        expect(wrapper.find('.new-movie-form__close')).to.have.length('1');
        expect(wrapper.is('.new-movie-form--open')).to.equal(true);
        wrapper.find('.new-movie-form__close').simulate('click');
        expect(wrapper.is('.new-movie-form--open')).to.equal(false);
    });
    it('renders a movie preview', () => {
        expect(false).to.eql(true);
    });
    it('passes correct props to movie preview', () => {
        expect(false).to.eql(true);
    });
});
