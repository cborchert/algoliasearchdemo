import React from 'react';
import '../styles/SearchBar.scss';

//The SearchBar component can be pure -- at this level of an application, we don't need internalized state.
//We just receive state from the parent and pass the changed value back to the parent
//TODO: Styling
//TODO: proptypes
export default function SearchBar(props) {

    let className = props.className ? 'search-bar ' + props.className : 'search-bar';
    return (
        <div className="search-bar-container">
            <input className={className} value={props.value} onChange={props.onChange} />
        </div>
    );
}
