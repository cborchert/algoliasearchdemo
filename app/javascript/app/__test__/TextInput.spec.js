import React from 'react';
import TextInput from '../components/TextInput';

describe('Text Inputs', () => {
    const wrapper = shallow(<TextInput/>);

    it('should be a div', () => {
        expect(wrapper.type()).to.eql('div');
    });
});
