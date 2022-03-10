import React from 'react';

export default class RadioGroup extends React.Component{
    
    render(){        
        return(
            <div className="formrow" onChange={this.props.handleChange}>
                <label>{this.props.label}</label>
                {this.props.choices.map((opt, index) => {
                    var ischecked = false;
                    if(opt.val == this.props.value){
                        ischecked = true;
                    }
                    return (
                        <span key={index} className="radioGroup">
                            <input defaultChecked={ischecked} type="radio" value= {opt.val} name={this.props.field} />
                            {opt.label}
                        </span>
                    )
                })}
            </div>
        );
    }
}