import React from 'react';
import validatejs from 'validate.js';

export default class TextControl extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="formrow">
                    <label>{this.props.label}</label>
                    <input type="text" value={this.props.value} onChange={this.props.onControlChange} name={this.props.field} />
                </div>
            </div>
        );
    }
}