import React from 'react';
import NewMovieForm from '../components/NewMovieForm';
import TextInput from '../components/TextInput';
import Movie from '../components/Movie';

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
        expect(wrapper.find('button.new-movie-form__submit')).to.have.length('1');
        expect(wrapper.find('button.new-movie-form__submit').is('.button--disabled')).to.equal(true);
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
        expect(wrapper.find('.new-movie-form__toggle-advanced')).to.have.length('1');
        expect(wrapper.find('.new-movie-form__advanced').is('.new-movie-form__advanced--open')).to.equal(false);
        wrapper.find('.new-movie-form__toggle-advanced').simulate('click');
        wrapper.update();
        expect(wrapper.find('.new-movie-form__advanced').is('.new-movie-form__advanced--open')).to.equal(true);
        wrapper.find('.new-movie-form__toggle-advanced').simulate('click');
        wrapper.update();
        expect(wrapper.find('.new-movie-form__advanced').is('.new-movie-form__advanced--open')).to.equal(false);
    });
    it('renders a movie preview', () => {
        expect(wrapper.find(Movie)).to.have.length('1');
    });
    it('passes correct props to movie preview', () => {
        wrapper.setState({
            title: 'Hello World',
            color: 'red',
            image: 'http://i695.photobucket.com/albums/vv311/salem_apocalypse/takethis-1.jpg',
            actors: [
                'Steve Carrell', 'Olivia Wilde'
            ],
            actor_images: [
                'https://image.tmdb.org/t/p/w45/70BJ9xbfkRtEWBeuMcAH8C9lhpA.jpg', 'https://image.tmdb.org/t/p/w45/3d69fgT1QOTDJxqy7FpBBAQxoM0.jpg'
            ],
            alternative_titles: [
                'Salut, le Monde!', 'Hey, Earth...'
            ],
            genre: [
                'action', 'adventure'
            ],
            rating: '5',
            score: '4',
            year: '1987'
        });
        wrapper.update();
        let theProps = wrapper.find(Movie).first().props().movieObject;
        console.log(theProps);
        expect(theProps.title).to.equal('Hello World');
        expect(theProps.color).to.equal('red');
        expect(theProps.image).to.equal('http://i695.photobucket.com/albums/vv311/salem_apocalypse/takethis-1.jpg');
        expect(theProps.actors).to.have.length('2');
        expect(theProps.actors[0]).to.equal('Steve Carrell');
        expect(theProps.actors[1]).to.equal('Olivia Wilde');
        expect(theProps.actor_facets).to.have.length('2');
        expect(theProps.actor_facets[0]).to.equal('https://image.tmdb.org/t/p/w45/70BJ9xbfkRtEWBeuMcAH8C9lhpA.jpg|Steve Carrell');
        expect(theProps.actor_facets[1]).to.equal('https://image.tmdb.org/t/p/w45/3d69fgT1QOTDJxqy7FpBBAQxoM0.jpg|Olivia Wilde');
        expect(theProps.alternative_titles).to.have.length('2');
        expect(theProps.alternative_titles[0]).to.equal('Salut, le Monde!');
        expect(theProps.alternative_titles[1]).to.equal('Hey, Earth...');
        expect(theProps.genre).to.have.length('2');
        expect(theProps.genre[0]).to.equal('action');
        expect(theProps.genre[1]).to.equal('adventure');
        expect(theProps.rating).to.equal('5');
        expect(theProps.score).to.equal('4');
        expect(theProps.year).to.equal('1987');

    });
});
