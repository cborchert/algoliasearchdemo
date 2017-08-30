import React, {Component} from 'react';
import tinycolor from 'tinycolor2';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {GithubPicker} from 'react-color';
import '../styles/TextInput.scss';

class TextInput extends Component {

    constructor(props) {
        super(props);
        let value = this.props.value
            ? this.props.value
            : '';
        this.state = {
            value: value,
            pickerOpen: false,
            valid: true,
            errorMessage: '',
            uniqueId: _.uniqueId(this.props.label.replace(' ', '-') + '--')
        };
    }

    togglePicker() {
        this.setState({
            pickerOpen: !this.state.pickerOpen
        });
    }

    handleChange(event, value) {
        if (event) {
            value = event.target.value
        }
        this.setState({
            value
        }, () => {
            this.validate()
        });
        if (this.props.onChange && this.props.keyName) {
            this.props.onChange(this.props.keyName, value, this.props.keyIndex);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    validate() {
        let isValid = true,
            message = '',
            value = this.state.value;

        //check is empty for required
        if (this.props.required && value.trim() == '') {
            isValid = false;
            message = 'must not be empty';
        }
        //check numbers
        if (isValid && this.props.type == 'number') {
            //check is numeric
            if (value !== '' && !(!isNaN(parseFloat(value)) && isFinite(value))) {
                isValid = false;
                message = 'must be a numeric value';
            }
            //check min val
            if (value !== '' && isValid && this.props.min !== '' && Number(value) < Number(this.props.min)) {
                isValid = false;
                message = `must be a number greater than or equal to ${Number(this.props.min)}`;
            }
            //check max val
            if (value !== '' && isValid && this.props.max !== '' && Number(value) > Number(this.props.max)) {
                isValid = false;
                message = `must be a number less than or equal to ${Number(this.props.max)}`;
            }
            //check is integer
            if (value !== '' && isValid && this.props.integer && !Number.isInteger(Number(value))) {
                isValid = false;
                message = `must be an integer`;
            }
        }
        //check color
        if (isValid && this.props.type == 'color' && !tinycolor(value).isValid()) {
            isValid = false;
            message = `must be an HTML color`;
        }
        this.setState({valid: isValid, message});
        //Send off to parent
        this.props.reportErrors(this.state.uniqueId, isValid, `${this.props.label} ${message}`);

    }

    componentDidMount() {
        this.validate();
    }

    render() {
        // console.log('rendering text');
        let styles = {},
            colors = [],
            type = this.props.type,
            label = this.props.label,
            colorPreview = '',
            colorPicker = '',
            colorPickerClasses = this.state.pickerOpen
                ? 'text-input__color-picker text-input__color-picker--open'
                : 'text-input__color-picker',
            classes = 'text-input',
            placeholder = this.props.placeholder == ''
                ? this.props.label
                : this.props.placeholder,
            message = '';

        if (this.props.hidePlaceholder) {
            placeholder = '';
        }

        if (this.props.type == 'color') {
            type = 'text';
        }

        if (this.props.features && this.props.features.indexOf('previewColor') >= 0) {
            colors = [
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
            ];
            colorPreview = (
                <div className="text-input__color-preview" onClick={this.togglePicker.bind(this)} title="Toggle color picker" aria-label="Toggle color picker">
                    <span className="text-input__color-preview-icon icon-drop" style={{
                        color: tinycolor(this.state.value).toHexString()
                    }}/>
                    ({this.state.pickerOpen
                        ? 'close'
                        : 'pick'})
                </div>
            );
            colorPicker = (
                <div className={colorPickerClasses}>
                    <GithubPicker className="text-input__color-picker__picker" triangle="hide" colors={colors} color={tinycolor(this.state.value).toHexString()} onChange={(color) => {
                        this.handleChange(null, color.hex);
                    }}/>
                </div>
            );
        }

        if (this.props.className) {
            classes += ` ${this.props.className}`;
        }

        if (!this.state.valid) {
            classes += ' text-input--invalid';
            message = (
                <div className="text-input__error">{this.state.message}</div>
            )
        }

        if (this.props.required) {
            label += ' (required)';
        }

        return (
            <div className={classes}>
                <label>{label}{colorPreview}
                    <div>
                        {colorPicker}
                        <input type={type} value={this.state.value} placeholder={placeholder} onChange={this.handleChange.bind(this)} step={this.props.step} min={this.props.min} max={this.props.max}/>
                    </div>
                </label>
                {message}
            </div>
        );
    }
}

//PropTypes
TextInput.propTypes = {
    label: PropTypes.string,
    features: PropTypes.array,
    type: PropTypes.string,
    step: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    placeholder: PropTypes.string,
    hidePlaceholder: PropTypes.bool,
    integer: PropTypes.bool,
    required: PropTypes.bool,
    reportErrors: PropTypes.func,
    onChange: PropTypes.func
};

TextInput.defaultProps = {
    label: '',
    features: [],
    type: 'text',
    step: '',
    min: '',
    max: '',
    placeholder: '',
    hidePlaceholder: false,
    integer: false,
    required: false,
    reportErrors: () => {},
    onChange: () => {}
};

export default TextInput;
