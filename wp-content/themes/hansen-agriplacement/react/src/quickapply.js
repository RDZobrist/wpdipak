import React from 'react';
import Api from './api';

import {states} from './misc/states';

import validatejs from 'validate.js';
import alertify from 'alertify.js';

import OptionControl from './skillsheet/optioncontrol';

export default class QuickApply extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();

        this.state = {
            loading: false,
            errors: [],    
            regions: states,     
            selectedresume: null,   
            form: {
                firstname: "",
                middlename: "",
                lastname: "",
                email: "",
                email_confirmation: "",
                address: "",
                phone: "",
                city: "",
                state: "",
                zip: "",
                relocate: "",
                wouldrelocateto: [],
                wouldnotrelocateto: [],
                desiredpositions: "",
                jobordernum: "",
                currentsalary: "",
                minimumsalary: "",
                initials: ""
            }
        };

        this.constraints = {
            "firstname": {presence: { allowEmpty: false }},
            "middlename": {presence: { allowEmpty: false }},
            "lastname": {presence: { allowEmpty: false }},
            "email": {
                presence: { allowEmpty: false },
                email: true
            },
            "email_confirmation" :{
                presence: { allowEmpty: false },
                equality: {
                    attribute: "email",
                    message: "^The email addresses do not match."
                }
            },
            "address": {presence: { allowEmpty: false }},
            "relocate": {presence: { allowEmpty: false }},
            "phone": {presence: { allowEmpty: false }},
            "city": {presence: { allowEmpty: false }},
            "state": {presence: { allowEmpty: false }},
            "zip": {presence: { allowEmpty: false }},
            "desiredpositions": {presence: { allowEmpty: false }},
            "resume": {presence: { allowEmpty: false }},
            "initials": {presence: { allowEmpty: false }},
        }
    }

    handleFieldChange = (e) => {
        var state = this.state;        
        state.form[e.target.name] = e.target.value;
        this.setState({
            form: state.form
        });
    }

    handleFileChange = (e) => {
        if(e.target.files.length > 0){
            var form = this.state.form;
            var file = e.target.files[0];
            form.resume = "added";
            this.setState({
                selectedresume: file,
                form: form
            });          
        }       
    }

    handleRelocationToggle = (e, arrayname) => {
        var state = this.state;
        var array = state.form[arrayname];
        if(e.target.checked){
            array.push(e.target.value);            
        }else{
            var index = array.indexOf(e.target.value);
            array.splice(index, 1);
        }
        state.form[arrayname] = array;
        this.setState({
            form: state.form
        });
    }

    checkIfRegionSelected = (abbr, array) => {
        if(this.state.form[array].indexOf(abbr) != -1){
            return true;
        }else{
            return false;
        }        
    }

    selectAllRegions = (arrayname) => {
        var state = this.state;
        var array = state.form[arrayname];

        this.state.regions.map((region, index) => {
            array.push(region.abbr);
        });

        state.form[arrayname] = array;
        this.setState({
            form: state.form
        });
    }

    selectNoRegions = (arrayname) => {
        var state = this.state;

        state.form[arrayname] = [];
        this.setState({
            form: state.form
        });
    }

    triggerAnalytics = () => {
        try {
            goog_report_conversion('zv9MCJnvsnoQ04Ts8wM');
            ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Quick Apply'});
            fbq('track', 'Quick Apply', {
                value: 0.00,
                currency: 'USD'
            });
        } catch (err) {
            console.warn("There was problem with analytics", err);
            Raven.captureMessage("Analytics Error: Quick Apply", {
                level: "error",
                extra:  {
                    error: err
                }
            });
        }
        
    }

    submitQuickApplication = () => {
        if(!this.state.loading){
            this.setState({
                loading: true
            });  
            var form = this.state.form;
            var errors = validatejs(form, this.constraints);
            if(errors !== undefined){
                var fieldkeys = Object.keys(errors);
                this.setState({
                    errors: fieldkeys,
                    loading: false
                });
                        
                return;
            }
            
            this.api.post('application/quickapply', this.state.form).then((res) => {
                if(this.state.selectedresume != null){
                    var formData = new FormData();                    
                    formData.append("resume", this.state.selectedresume);
                    formData.append("quickapp_id", res.application_id);

                    this.api.post('application/quickapply/resume', formData).then((res) => {
                        this.triggerAnalytics();
                        window.location.href = "/quick-apply-submitted";
                    }).catch((err) => {
                        alertify.alert("There was a problem uploading ther resume for your application.", () => {                      
                        });  
                    });
                }else{
                    this.triggerAnalytics();
                    window.location.href = "/quick-apply-submitted";
                }
            }).catch((err) => {
                var errmsg = err.response.data.error;
                console.log(err.response.data.error);
                alertify.alert(errmsg, () => {                      
                });  
                this.setState({
                    loading: false
                });  
            });
        }
    }

    render(){
        return (
            <div id="application_app">
                {this.state.loading ? <div className='loading'></div> : null }
                <div id="application_pages">
                    <section id="quickapply_page" className="active">
                        <div className="formwrapper">
                            <div className="row three-col">
                                <div className="formrow">
                                    <label>First Name <span>*</span></label>                        
                                    <input required type="text" name="firstname" value={this.state.form.firstname} onChange={this.handleFieldChange} />
                                     <ErrorSpan invalidfields={this.state.errors} for="firstname" />
                                </div>
                                <div className="formrow">
                                    <label>Middle Name <span>*</span></label>
                                    <input required  type="text" name="middlename" value={this.state.form.middlename} onChange={this.handleFieldChange} />
                                     <ErrorSpan invalidfields={this.state.errors} for="middlename" />
                                </div>
                                <div className="formrow">
                                    <label>Last Name <span>*</span></label>
                                    <input required type="text" name="lastname" value={this.state.form.lastname} onChange={this.handleFieldChange} />
                                     <ErrorSpan invalidfields={this.state.errors} for="lastname" />
                                </div>
                            </div>
                            <div className="formrow">
                                <label>Email Address <span>*</span></label>
                                <input required type="email" name="email" value={this.state.form.email} onChange={this.handleFieldChange} />
                                 <ErrorSpan invalidfields={this.state.errors} for="email" />
                            </div>
                            <div className="formrow">
                                <label>Confirm Email Address <span>*</span></label>
                                <input required type="email" name="email_confirmation" value={this.state.form.email_confirmation} onChange={this.handleFieldChange} />
                                 <ErrorSpan invalidfields={this.state.errors} for="email_confirmation" />
                            </div>
                            <div className="row two-col">
                            <div className="formrow">
                                <label>Street Address <span>*</span></label>
                                <input required type="text" name="address" value={this.state.form.address} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="address" />
                            </div>
                            <div className="formrow">
                                <label>Phone <span>*</span></label>
                                <input required type="text" name="phone" value={this.state.form.phone} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="phone" />
                            </div>
                            </div>
                            <div className="row three-col">
                                <div className="formrow">
                                    <label>City <span>*</span></label>
                                    <input required type="text" name="city" value={this.state.form.city} onChange={this.handleFieldChange} />
                                    <ErrorSpan invalidfields={this.state.errors} for="city" />
                                </div>
                                <div className="formrow">
                                    <label>State <span>*</span></label>
                                    <select required name="state" value={this.state.form.state} onChange={this.handleFieldChange}>
                                        <option value="">Select a State</option>
                                        {this.state.regions.map((region, index) => {
                                            return (
                                                <option key={index} value={region.abbr}>{region.name}</option>
                                            )
                                        })}
                                    </select>
                                    <ErrorSpan invalidfields={this.state.errors} for="state" />
                                </div>
                                <div className="formrow">
                                    <label>Zip <span>*</span></label>
                                    <input required type="text" name="zip" value={this.state.form.zip} onChange={this.handleFieldChange} />
                                    <ErrorSpan invalidfields={this.state.errors} for="zip" />
                                </div>
                            </div>
                            <div className="formrow">
                                <OptionControl label="Are you willing to relocate?" value={this.state.form.relocate} field="relocate" onControlChange={this.handleFieldChange} required={true} options={["Yes", "No"]} />                                
                                <ErrorSpan invalidfields={this.state.errors} for="relocate" />
                            </div>
                            <div className="row two-col">
                                <div className="formrow">
                                    <label>Which states will you relocate to?</label>
                                    <span className="listoptions">
                                        <a onClick={() => {this.selectAllRegions('wouldrelocateto')}} className="listSelectAll">Select All</a> /
                                        <a onClick={() => {this.selectNoRegions('wouldrelocateto')}} className="listSelectNone">Select None</a>
                                    </span>
                                    <ul className="list">
                                        {this.state.regions.map((region, index) => {
                                            var isChecked = this.checkIfRegionSelected(region.abbr, "wouldrelocateto");

                                            return(
                                                <li key={index}>
                                                    <input type="checkbox" value={region.abbr} checked={isChecked} onChange={(e) => {this.handleRelocationToggle(e, "wouldrelocateto")}} />
                                                    <span>{region.name}</span>
                                                </li>
                                            );                                            
                                        })}
                                    </ul>                                                          
                                </div>

                                <div className="formrow">
                                    <label>Which states will you NOT relocate to?</label>
                                    <span className="listoptions">
                                        <a onClick={() => {this.selectAllRegions('wouldnotrelocateto')}} className="listSelectAll">Select All</a> /
                                        <a onClick={() => {this.selectNoRegions('wouldnotrelocateto')}} className="listSelectNone">Select None</a>
                                    </span>
                                    <ul className="list">
                                        {this.state.regions.map((region, index) => {
                                            var isChecked = this.checkIfRegionSelected(region.abbr, "wouldnotrelocateto");

                                            return(
                                                <li key={index}>
                                                    <input type="checkbox" value={region.abbr} checked={isChecked} onChange={(e) => {this.handleRelocationToggle(e, "wouldnotrelocateto")}} />
                                                    <span>{region.name}</span>
                                                </li>
                                            );                                            
                                        })}
                                    </ul>   
                                </div>
                            </div>
                            <div className="formrow">
                                <label>What positions are you qualified for? <span>*</span></label>
                                <textarea required  name="desiredpositions" value={this.state.form.desiredpositions} onChange={this.handleFieldChange}></textarea>
                                <ErrorSpan invalidfields={this.state.errors} for="desiredpositions" />
                            </div>
                            <div className="formrow">
                                <label>Job Order numbers you are initially interested in</label>
                                <input required type="text" name="jobordernum" value={this.state.form.jobordernum} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="jobordernum" />
                            </div>
                            <div className="formrow">
                                <label>Current Salary</label>
                                <input placeholder="ex. $35,000" type="text" name="currentsalary"  value={this.state.form.currentsalary} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="currentsalary" />
                            </div>
                            <div className="formrow">
                                <label>Minimum Salary</label>
                                <input placeholder="ex. $35,000" type="text" name="minimumsalary" value={this.state.form.minimumsalary} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="minimumsalary" />
                            </div>
                            <div className="row two-col">
                                <div className="formrow file">
                                    <label>Upload Resume <span>*</span></label>
                                    <input required type="file" name="resume" accept=".doc, .docx, .odt, .pdf" onChange={this.handleFileChange}  />
                                    <ErrorSpan invalidfields={this.state.errors} for="resume" />
                                </div>
                            </div>
                        </div>
                        <div className="application_completion">
                            <h2>Submit Quick Apply Application</h2>
                            <p>
                                To complete and submit your application to prospective employers, type your initials in the box below, then click <strong>Submit Quick Apply Application.</strong>
                                <input type="text" name="initials" value={this.state.form.initials} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="initials" />
                                <a id="submit_application" onClick={this.submitQuickApplication} className="button">Submit Quick Apply Application</a>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
                
        )
    }
}

class ErrorSpan extends React.Component{    
    render(){        
        if(this.props.invalidfields.indexOf(this.props.for) != -1){
            return (
                <p className="form-input-hint">Required</p>
            )
        }else{
            return null
        }        
    }
}