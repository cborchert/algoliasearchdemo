import React from 'react';
import '../styles/Result.scss';
import tinycolor from 'tinycolor2';

//The SearchBar component can be pure -- at this level of an application, we don't need internalized state.
//We just receive state from the parent and pass the changed value back to the parent
//TODO: Styling
//TODO: proptypes
//TODO: Add a confirmation before allowing delete
export default function Result(props) {

    let color = props.resultObject.color ? props.resultObject.color : '#FFF',
        theme = tinycolor(color).isLight() ? 'light' : 'dark',
        classes = 'result '+'result--'+theme;
    return (
        <div className={classes} style={{background: color}}>
            <div className="result__image-container">
                <img src={props.resultObject.image} className="result__image"/>
            </div>
            <div className="result__title">{props.resultObject.title}</div>
            <div className="result__delete" onClick={()=>{props.deleteMovie(props.resultObject.objectID)}}>(delete)</div>
        </div>
    );
}
