import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.scss';

class SearchBar extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.className !== nextProps.className || this.props.value !== nextProps.value;
    }

    render() {
        // console.log('rendering search');
        let className = this.props.className
            ? 'search-bar ' + this.props.className
            : 'search-bar';
        return (
            <div className="search-bar-container">
                <input className={className} value={this.props.value} onChange={this.props.onChange} placeholder="Search for a movie"/>
            </div>
        );
    }
}

//PropTypes
SearchBar.propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func
};

SearchBar.defaultProps = {
    value: '',
    onChange: '',
    onChange: () => {}
}

export default SearchBar;
