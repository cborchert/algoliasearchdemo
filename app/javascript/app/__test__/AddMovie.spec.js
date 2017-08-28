import React from 'react';
import AddMovie from '../components/AddMovie';
import TextInput from '../components/TextInput';

//These tests are a bit too exhaustive -- the add/remove should be sufficient on the multi-tests
describe('Add Movie Form', () => {
    const wrapper = shallow(<AddMovie/>);

    it('should be a div', () => {
        expect(wrapper.type()).to.eql('div');
    });
    it('renders title input', () => {
        expect(wrapper.find('TextInput').filter('.movie__title-input')).to.have.length('1');
    });
    it('renders image url input', () => {
        expect(wrapper.find('TextInput').filter('.movie__image-input')).to.have.length('1');
    });
    it('renders color input', () => {
        expect(wrapper.find('TextInput').filter('.movie__color-input')).to.have.length('1');
    });
    it('renders color picker', () => {
        expect(wrapper.find('.movie__color-picker')).to.have.length('1');
    });
    it('renders color picker and color input with same values', () => {
        wrapper.setState({color: '#ff0000'});
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__color-input').prop('value')).to.equal('#ff0000');
        expect(wrapper.find('.movie__color-picker').prop('color')).to.equal('#ff0000');
    });
    it('renders actor and actor image inputs based on state', () => {
        expect(wrapper.find('TextInput').filter('.movie__actor-input')).to.have.length('0');
        expect(wrapper.find('TextInput').filter('.movie__actor-image-input')).to.have.length('0');
        wrapper.setState({
            actors: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__actor-input')).to.have.length('2');
        expect(wrapper.find('TextInput').filter('.movie__actor-image-input')).to.have.length('2');
        wrapper.setState({actors: []});
        wrapper.update();

    });
    it('responds to add actor click', () => {
        expect(wrapper.find('div').filter('.movie__add-actor')).to.have.length('1');
        wrapper.find('div').filter('.movie__add-actor').simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__actor-input')).to.have.length('1');
        expect(wrapper.find('TextInput').filter('.movie__actor-image-input')).to.have.length('1');
        wrapper.setState({actors: []});
        wrapper.update();
    });
    it('responds to remove actor click', () => {
        wrapper.setState({
            actors: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('div').filter('.movie__remove-actor')).to.have.length('2');
        wrapper.find('div').filter('.movie__remove-actor').first().simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__actor-input')).to.have.length('1');
        expect(wrapper.find('TextInput').filter('.movie__actor-image-input')).to.have.length('1');
        wrapper.setState({actors: []});
        wrapper.update();
    });
    it('renders genre inputs based on state', () => {
        expect(wrapper.find('TextInput').filter('.movie__genre-input')).to.have.length('0');
        wrapper.setState({
            genre: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__genre-input')).to.have.length('2');
        wrapper.setState({genre: []});
        wrapper.update();

    });
    it('responds to add genre click', () => {
        expect(wrapper.find('div').filter('.movie__add-genre')).to.have.length('1');
        wrapper.find('div').filter('.movie__add-genre').simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__genre-input')).to.have.length('1');
        wrapper.setState({genre: []});
        wrapper.update();
    });
    it('responds to remove genre click', () => {
        wrapper.setState({
            genre: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__genre-input')).to.have.length('2');
        wrapper.find('div').filter('.movie__remove-genre').first().simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__genre-input')).to.have.length('1');
        wrapper.setState({genre: []});
        wrapper.update();
    });
    it('renders rating input', () => {
        expect(wrapper.find('TextInput').filter('.movie__rating-input')).to.have.length('1');
    });
    it('renders year input', () => {
        expect(wrapper.find('TextInput').filter('.movie__year-input')).to.have.length('1');
    });
    it('renders score input', () => {
        expect(wrapper.find('TextInput').filter('.movie__score-input')).to.have.length('1');
    });
    it('renders alternative title inputs based on state', () => {
        expect(wrapper.find('TextInput').filter('.movie__alternative-title-input')).to.have.length('0');
        wrapper.setState({
            alternative_titles: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__alternative-title-input')).to.have.length('2');
        wrapper.setState({alternative_titles: []});
        wrapper.update();

    });
    it('responds to add alternative title click', () => {
        expect(wrapper.find('div').filter('.movie__add-alternative-title')).to.have.length('1');
        wrapper.find('div').filter('.movie__add-alternative-title').simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__alternative-title-input')).to.have.length('1');
        wrapper.setState({alternative_titles: []});
        wrapper.update();
    });
    it('responds to remove alternative title click', () => {
        wrapper.setState({
            alternative_titles: ['lorem', 'ipsum']
        });
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__alternative-title-input')).to.have.length('2');
        wrapper.find('div').filter('.movie__remove-alternative-title').first().simulate('click');
        wrapper.update();
        expect(wrapper.find('TextInput').filter('.movie__alternative-title-input')).to.have.length('1');
        wrapper.setState({alternative_titles: []});
        wrapper.update();
    });
    it('enables/disables submit button', () => {
        expect(wrapper.find('button')).to.have.length('1');
        expect(wrapper.find('button').is('.button--disabled')).to.equal(true);
    });
    it('renders error if no title', () => {
        expect(wrapper.find('.movie__errors')).to.have.length('1');
        expect(wrapper.find('.movie__error')).to.have.length('1');
        wrapper.setState({title: 'Hello World'});
        wrapper.update();
        expect(wrapper.find('.movie__errors')).to.have.length('0');
        expect(wrapper.find('.movie__error')).to.have.length('0');
    });
});
