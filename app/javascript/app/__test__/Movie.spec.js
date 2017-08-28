import React from 'react';
import Movie from '../components/Movie';

describe('<Movie />', () => {
    const wrapper = shallow(<Movie/>);

    it('shows a menu when delete is clicked', () => {
        wrapper.find('.movie__expand').simulate('click');
        wrapper.update();
        wrapper.find('.movie__delete').simulate('click');
        wrapper.update();
        expect(wrapper.find('.movie__delete-menu--open')).to.have.length('1');
    });
    it('closes the delete menu when cancel is clicked', () => {
        wrapper.find('.movie__delete-menu__cancel').simulate('click');
        wrapper.update();
        expect(wrapper.find('.movie__delete-menu--open')).to.have.length('0');
    });

});
