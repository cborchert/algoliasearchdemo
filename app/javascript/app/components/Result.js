import React from 'react';
import '../styles/Result.scss';

//The SearchBar component can be pure -- at this level of an application, we don't need internalized state.
//We just receive state from the parent and pass the changed value back to the parent
//TODO: Styling
//TODO: proptypes
export default function Result(props) {

    console.log(props)
    return (
        <div className="result" style={{background: props.resultObject.color}}>
            <h2>{props.resultObject.title}</h2>
            <img src={props.resultObject.image} />
            <h5>genres</h5>
            <ul>
                {props.resultObject.genre.map((genre, i) => <li key={i}>{genre}</li>)}
            </ul>
        </div>
    );
}
