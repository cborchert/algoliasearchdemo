import React, {Component} from 'react';
import '../styles/Result.scss';
import tinycolor from 'tinycolor2';

//The SearchBar component can be pure -- at this level of an application, we don't need internalized state.
//We just receive state from the parent and pass the changed value back to the parent
//TODO: Styling
//TODO: proptypes
//TODO: Add a confirmation before allowing delete
export default class Result extends Component {

    constructor(){
        super();
        this.state = {
            expanded: false
        }
    }

    toggleExpanded(){
        let expanded = !this.state.expanded;
        this.setState({
            expanded: expanded
        });
    }

    render(){

        console.log('rendering movie');
        let color = this.props.resultObject.color ? this.props.resultObject.color : '#FFF',
            theme = tinycolor(color).isLight() ? 'light' : 'dark',
            classes = 'result '+'result--'+theme,
            order = this.state.expanded ? this.props.order : this.props.order,
            width = this.state.expanded ? '100%' : '20%',
            style = {order: order, backgroundColor: color, width: width};
        return (
            <div className={classes} style={style}>
                <div className="result__image-container">
                    <img src={this.props.resultObject.image} className="result__image"/>
                </div>
                <div className="result__title">{this.props.resultObject.title}</div>
                <ul>
                    {this.props.resultObject.actor_facets.map(facet => <li><img src={facet.substring(0,facet.indexOf("|"))} />{facet.substring(facet.indexOf("|")+1)}</li>)}
                </ul>
                <div className="result__delete" onClick={()=>{this.props.deleteMovie(this.props.resultObject.objectID)}}>(delete)</div>
                <div className="result__expand" onClick={this.toggleExpanded.bind(this)}>(expand)</div>

            </div>
        );
    }
}
