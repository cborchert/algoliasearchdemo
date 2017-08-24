import React from 'react';
import '../styles/Result.scss';
import tinycolor from 'tinycolor2';

//The SearchBar component can be pure -- at this level of an application, we don't need internalized state.
//We just receive state from the parent and pass the changed value back to the parent
//TODO: Styling
//TODO: proptypes
export default function Result(props) {

    let theme = tinycolor(props.resultObject.color).isLight() ? 'light' : 'dark',
        classes = 'result '+'result--'+theme;
    return (
        <div className={classes} style={{background: props.resultObject.color}}>
            <div className="result__image-container">
                <img src={props.resultObject.image} className="result__image"/>
            </div>
            <h2 className="result__title">{props.resultObject.title}</h2>
            <h5>genres</h5>
            <ul>
                {props.resultObject.genre.map((genre, i) => <li key={i}>{genre}</li>)}
            </ul>
        </div>
    );
}
