import React from 'react';
import TextInput from '../components/TextInput';

describe('<TextInput />', () => {
    const wrapper = shallow(<TextInput label="Hello World"/>);

    it('should be a div', () => {
        expect(wrapper.type()).to.eql('div');
    });
    it('contains a label', () => {
        expect(wrapper.find('label')).to.have.length('1');
    });
    it('renders label prop inside label', () => {
        expect(wrapper.find('label').text()).to.equal('Hello World');
    });
    it('includes optional color preview', () => {
        expect(wrapper.find('div.text-input__color-preview')).to.have.length('0');
        wrapper.setProps({features: ['previewColor']});
        wrapper.update();
        expect(wrapper.find('div.text-input__color-preview')).to.have.length('1');
    });
    it('should have defined classes', () => {
        wrapper.setProps({className: 'ipsum'});
        wrapper.update();
        expect(wrapper.hasClass('ipsum')).to.equal(true);
    });
    it('renders color picker', () => {
        wrapper.setProps({previewColor: true});
        wrapper.update();
        expect(wrapper.find('.text-input__color-picker')).to.have.length('1');
    });
});
