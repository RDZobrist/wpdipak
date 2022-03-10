import React from 'react';
import validatejs from 'validate.js';

export default class RadioControl extends React.Component{
    constructor(props){
        super(props);
    }
    isChecked = (val) => {        
        if(val == this.props.value){
            return true;
        }else{
            return false;
        }
    }
    render(){             
        var highDefaultChecked = this.isChecked("high");
        var threeDefaultChecked = this.isChecked("3");
        var twoDefaultChecked = this.isChecked("2");
        var oneDefaultChecked = this.isChecked("1");
        var noneDefaultChecked = this.isChecked("None");

        return(            
            <div className="row">
                <div className="formrow" onChange={this.props.onControlChange} >
                    <label>{this.props.label}</label>
                    <span className="radioGroup"><input type="radio" defaultChecked={highDefaultChecked} value="high" name={this.props.field}/>4</span>
                    <span className="radioGroup"><input type="radio" defaultChecked={threeDefaultChecked} value="3" name={this.props.field}/>3</span>
                    <span className="radioGroup"><input type="radio" defaultChecked={twoDefaultChecked} value="2" name={this.props.field}/>2</span>
                    <span className="radioGroup"><input type="radio" defaultChecked={oneDefaultChecked} value="1" name={this.props.field}/>1</span>
                    <span className="radioGroup"><input type="radio" defaultChecked={noneDefaultChecked} value="None" name={this.props.field}/>0</span>
                </div>
            </div>
        );
    }
}