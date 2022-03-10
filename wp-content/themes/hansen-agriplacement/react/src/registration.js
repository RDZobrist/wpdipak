import React from 'react';
import Api from './api';

import validatejs from 'validate.js';

export default class Registration extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();

        this.state = {
            loading: false,
            success: false,
            errors: [],
            form: {
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                email_confirmation: "",
                password: "",
                password_confirmation: ""
            }
        };

        this.constraints = {
            "firstname": {presence: { allowEmpty: false }},
            "lastname": {presence: { allowEmpty: false }},
            "username": {presence: { allowEmpty: false }},
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
            "password": {presence: { allowEmpty: false }},
            "password_confirmation": {
                presence: { allowEmpty: false },
                equality: {
                    attribute: "password",
                    message: "^The passwords do not match."
                }
            }             
        }
    }
    handleFieldChange = (e) => {
        var state = this.state;
        state.form[e.target.name] = e.target.value;
        this.setState({
            form: state.form
        });
    }

    submitRegistration = () => {
        if(this.state.loading){
            return;
        }
        
        var form = this.state.form;
        var errors = validatejs(form, this.constraints);
        if(errors !== undefined){
            var fieldkeys = Object.keys(errors);
            this.setState({
                errors: fieldkeys
            });
            console.log(fieldkeys);            
            return;
        }

        this.setState({
            loading: true
        });

        this.api.post('account/register', form).then((res) => {          
            try{
                goog_report_conversion('8_aRCMCJyXoQ04Ts8wM');
                ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Registration'});
                fbq('track', 'Registration', {
                    value: 0.00,
                    currency: 'USD'
                });
            }catch(exception){
                console.warn("There was problem with analytics", err);
                Raven.captureMessage("Analytics Error: Registration", {
                    level: "error",
                    extra:  {
                        error: err
                    }
                });
            }

            this.setState({
                loading: false,
                success: true
            });
        }).catch((err) => {     
            this.setState({
                loading: false
            });

            Raven.captureMessage("Error: Account Registration", {
                level: "error",
                extra:  {
                    error: err							
                }
            });	
            if (err.response.data.error !== null) {
                if (err.response.data.error.exception !== null){
                    alert("Error creating account: " + err.response.data.error.exception);                
                }else{
                    if (err.response.data.error.message !== null && err.response.data.error.message !== undefined) {
                        alert("Error creating account: " + err.response.data.error.message);     
                    } else {
                        alert("Error creating account");     
                    }
                }
            } else {
                if (err.response.status == 409) {                
                    alert("Error creating account: Username already used.");
                } else {
                    alert("Error creating account: " + err.response.data.message);   
                }
            }
        });
    }

    render(){
        return (
            <div id="register">
                {this.state.success != true ?
                <div id="registerform">
                    {this.state.loading ? <div className='loading'></div> : null }
                    <h1>Create an Account</h1>
                    <div className="form">
                        <div className="row two-col">
                            <div className="formrow">
                                <label>First Name</label>
                                <input type="text" name="firstname" value={this.state.form.firstname} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="firstname" />
                            </div>
                            <div className="formrow">
                                <label>Last Name</label>
                                <input type="text" name="lastname" value={this.state.form.lastname} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="lastname" />
                            </div>
                        </div>
                        <div className="formrow">
                            <label>Username</label>
                            <input type="text" name="username" value={this.state.form.username} onChange={this.handleFieldChange} />
                            <ErrorSpan invalidfields={this.state.errors} for="username" />
                        </div>
                        <div className="formrow">
                            <label>Email</label>
                            <input type="email" name="email" value={this.state.form.email} onChange={this.handleFieldChange} />
                            <ErrorSpan invalidfields={this.state.errors} for="email" />
                        </div>
                        <div className="formrow">
                            <label>Confirm Email</label>
                            <input type="email" name="email_confirmation" value={this.state.form.email_confirmation} onChange={this.handleFieldChange} />
                            <ErrorSpan invalidfields={this.state.errors} for="email_confirmation" />
                        </div>
                        <div className="row two-col">
                            <div className="formrow">
                                <label>Password</label>
                                <input type="password" name="password" value={this.state.form.password} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="password" />
                            </div>
                            <div className="formrow">
                                <label>Confirm Password</label>
                                <input type="password" name="password_confirmation" value={this.state.form.password_confirmation} onChange={this.handleFieldChange} />
                                <ErrorSpan invalidfields={this.state.errors} for="password_confirmation" />
                            </div>
                        </div>
                        <div className="formrow">
                            <input type="submit" className="button" value="Register" onClick={this.submitRegistration} />
                        </div>
                    </div>
                </div> : null }
                {this.state.success ? 
                <div id="thankyou_registered">
                    <h1>Thank you for registering!</h1>
                    <p>
                        An email has just been sent to your email address containing your username and password for future reference.  You can now sign in using the sign in menu located at the top right of the screen!
                    </p>
                </div>
                : null }
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