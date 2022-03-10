import React from 'react';
import Cookies from 'js-cookie';
import querystring from 'query-string';
import Api from './api';
import validatejs from 'validate.js';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.api = new Api();

        this.state = {
            loading: false,
            errors: [],
            error: null,
            form: {
                username: "",
                password: ""
            }
        }

        this.constraints = {
            "username": {
                presence: { allowEmpty: false }
            },
            "password": {presence: { allowEmpty: false }}
        }
    }

    handleFieldChange = (e) => {
        var state = this.state;
        state.form[e.target.name] = e.target.value;
        this.setState({
            form: state.form
        });
    }

    submitLogin = () => {
        if(this.state.loading){
            return;
        }

        var form = this.state.form;
        var errors = validatejs(form, this.constraints);
        if(errors !== undefined){
            var fieldkeys = Object.keys(errors);
            this.setState({
                errors: fieldkeys,
                error: "You must enter a username and password."
                
            });
            console.log(fieldkeys);            
            return;
        }

        this.setState({
            loading: true
        });

        this.api.post('account/login', form).then((res) => {            
            Cookies.set("hansentoken", res.token);
            var parsed = querystring.parse(location.search);

            try {
                goog_report_conversion('B-4qCIzlxXoQ04Ts8wM');
                ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Sign In'});
                fbq('track', 'Sign In', {
                    value: 0.00,
                    currency: 'USD'
                });
            } catch (err) {
                console.warn("There was problem with analytics", err);
                Raven.captureMessage("Analytics Error: Login", {
                    level: "error",
                    extra:  {
                        error: err
                    }
                });
            }
            

            if(parsed.redirecttojob !== undefined){
                window.location.href = "/jobs/" + parsed.redirecttojob;
            }else{
                window.location.href = "/my-account";
            }
            
        }).catch((err) => {
            this.setState({
                loading: false
            });

            if(err.response){
                this.setState({
                    error: err.response.data.message
                });
            }else{
                this.setState({
                    error: "There was an error logging in."
                });
            }
        });
    }

    render(){
        return (
            <div id="loginform">
                {this.state.loading ? <div className='loading'></div> : null }
                {this.state.error != null ? 
                    <div className="invalidPwd">{this.state.error}</div> : null
                }
                <div className="form">
                    <div className="formrow">
                        <label>Username</label> 
                        <input type="text" value={this.state.username} id="txtUsername" name="username" onChange={this.handleFieldChange} />                                               
                    </div>
                    <div className="formrow">
                        <label>Password</label>
                        <input type="password" value={this.state.password} id="txtPassword" name="password" onChange={this.handleFieldChange} />                                            
                    </div>

                    <div className="formrow links">
                        <a href="/forgot-password">Forgot Password</a>                                        
                    </div>

                    <div className="formrow buttons">
                        <a onClick={this.submitLogin} className="button">Sign In</a>                                        
                        <a className="button" href="/register">Register</a>
                        <a className="button btn_cancellogin">Cancel</a>
                    </div>
                </div>
                
            </div>
        )
    }
}