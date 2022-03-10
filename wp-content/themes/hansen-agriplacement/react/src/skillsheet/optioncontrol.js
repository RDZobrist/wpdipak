import React from 'react';
import validatejs from 'validate.js';

export default class OptionControl extends React.Component{
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

        return(            
            <div className="row">
                <div className="formrow" onChange={this.props.onControlChange} >
                    <label>
                        {this.props.label}
                        {this.props.required ? <span> *</span> : null}
                    </label>
                    {this.props.options.map((opt, index) => {
                        var ischecked = false;
                        if(opt ==  this.props.value){
                            console.log(this.props.field + " is true");
                            ischecked = true;
                        }
                        return (
                            <span key={index} className="radioGroup">
                                <input checked={ischecked} type="radio" value={opt} name={this.props.field}/>{opt.toUpperCase()}
                            </span>
                        )
                    })}                    
                </div>
            </div>
        );
    }
}