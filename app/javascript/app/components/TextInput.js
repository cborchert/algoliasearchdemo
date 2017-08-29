import React, {Component} from 'react';
import tinycolor from 'tinycolor2';
import {GithubPicker} from 'react-color';
import '../styles/TextInput.scss';

export default class TextInput extends Component {

    constructor(props) {
        super(props);
        let value = this.props.value
            ? this.props.value
            : '';
        this.state = {
            value: value,
            pickerOpen: false
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
        this.setState({value});
        if (this.props.onChange && this.props.keyName) {
            this.props.onChange(this.props.keyName, value, this.props.keyIndex);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    render() {
        console.log('rendering text');
        console.log(this.state.value);
        let styles = {},
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
            ],
            colorPreview = '',
            colorPicker = '',
            colorPickerClasses = this.state.pickerOpen
                ? 'text-input__color-picker text-input__color-picker--open'
                : 'text-input__color-picker',
            classes = 'text-input';

        if (this.props.features && this.props.features.indexOf('previewColor') >= 0) {
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
        return (
            <div className={classes}>
                <label>{this.props.label}{colorPreview}</label>
                <div>
                    {colorPicker}
                    <input value={this.state.value} onChange={this.handleChange.bind(this)}/>
                </div>
            </div>
        );
    }
}
