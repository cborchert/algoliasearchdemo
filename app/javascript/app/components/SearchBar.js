import React, {Component} from 'react';
import '../styles/SearchBar.scss';

//The SearchBar component can be pure -- at this level of an application, we don't need internalized state.
//We just receive state from the parent and pass the changed value back to the parent
//TODO: Styling
//TODO: proptypes
export default class SearchBar extends Component {

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
