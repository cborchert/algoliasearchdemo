import React, {Component} from 'react';
import tinycolor from 'tinycolor2';
import '../styles/TextInput.scss';

export default class TextInput extends Component {

    constructor(props) {
        super(props);
        let value = this.props.value
            ? this.props.value
            : '';
        this.state = {
            value: value
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        if (this.props.onChange && this.props.keyName) {
            this.props.onChange(this.props.keyName, event.target.value, this.props.keyIndex);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value && nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    render() {
        let styles = {},
            colorPreview = '',
            classes = 'text-input';

        if (this.props.features && this.props.features.indexOf('previewColor') >= 0) {
            styles.borderLeftColor = tinycolor(this.state.value).toHexString();
            styles.borderLeftStyle = "solid";
            styles.borderLeftWidth = "10px";
            colorPreview = <div className="text-input__color-preview" style={{
                backgroundColor: tinycolor(this.state.value).toHexString()
            }}>color preview
            </div>;
        }
        if (this.props.className) {
            classes += ` ${this.props.className}`;
        }
        return (
            <div className={classes}>
                <label>{this.props.label}</label>
                <div>
                    {colorPreview}
                    <input value={this.state.value} onChange={this.handleChange.bind(this)}/>
                </div>
            </div>
        );
    }
}
