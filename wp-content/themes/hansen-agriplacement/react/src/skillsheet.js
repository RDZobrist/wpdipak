import React from 'react';
import Api from './api';

import validatejs from 'validate.js';
import querystring from 'query-string';
import alertify from 'alertify.js';
import Notyf from 'notyf';
import AgSkillsheet from './skillsheet/ag';
import DairySkillsheet from './skillsheet/dairy';
import SwineSkillsheet from './skillsheet/swine';

import RadioControl from './skillsheet/radiocontrol';
import TextControl from './skillsheet/textcontrol';
import OptionControl from './skillsheet/optioncontrol';

export default class Skillsheet extends React.Component{
    constructor(props){
        super(props);
        var parsed = querystring.parse(location.search);

        this.api = new Api();
        this.skillsheetid = parsed.sid;
        this.notyf = new Notyf({
            delay: 6000
        });

        this.timer = null;
        

        this.state = {
            loading: true,
            type: '',
            page: 1,
            totalpages: 0,
            form: {}
        }
    }

    componentDidMount(){
        if(this.skillsheetid !== undefined){
            this.api.get('skillsheet/' + this.skillsheetid).then((res) => {
                console.log("Skillsheet", res);
                var skillsheet = res.skillsheet;  
                
                var totalpages = 0;

                if(skillsheet == null){
                    skillsheet = {};                   

                    //Skillsheet-specific initialization
                    if(res.type == "Dairy"){
                        skillsheet.otherskills = [];
                        totalpages = 4;
                    }       
                    
                    if(res.type == "Swine"){
                        totalpages = 3;
                    }

                    if(res.type == "Ag"){
                        totalpages = 2;
                    }
                }else{
                    if(Array.isArray(skillsheet)){
                        skillsheet = {};

                        if(res.type == "Dairy"){
                            skillsheet.otherskills = [];
                        }
                    }

                    if(res.type == "Dairy"){                        
                        totalpages = 4;
                    }       
                    
                    if(res.type == "Swine"){
                        totalpages = 3;
                    }

                    if(res.type == "Ag"){
                        totalpages = 2;
                    }
                }
                
                this.setState({
                    type: res.type,
                    form: skillsheet,
                    loading: false,
                    totalpages: totalpages
                });

                this.startAutoSaveTimer();

            }).catch((err) => {
                Raven.captureMessage("Error: Loading Skillsheet", {
                    level: "error",
                    extra:  {
                        error: err
                    }
                });
                alertify.alert("There was a problem loading your application.  Contact support.");
            });
        }
    }

    startAutoSaveTimer = () => {
        this.timer = setInterval(() => {
            console.log("Save Skillsheet");
            this.saveSkillsheet();
        }, 30000);
    }

    nextPage = () => {
        if(this.state.page != this.state.totalpages){
            this.setState({
                page: this.state.page + 1
            });

            jQuery("html, body").animate({ scrollTop: jQuery('#skillsheet_app').offset().top - 50 }, 300);
        }       
    }

    prevPage = () => {
        if(this.state.page != 0){
            this.setState({
                page: this.state.page - 1
            });

            jQuery("html, body").animate({ scrollTop: jQuery('#skillsheet_app').offset().top - 50 }, 300);
            
        }        
    }

    handleFieldChange = (e) => {
        var state = this.state;        
        state.form[e.target.name] = e.target.value;
        console.log(state.form);
        this.setState({
            form: state.form
        });
    }

    buildSkillsheetForm = (form, changeHandler) => {
        return (
            <div>
                {form.map((value, index) => {
                    var fielddata = this.state.form[value.field];                    
                    
                    if(value.type == "radio"){
                        return(
                            <RadioControl key={index} value={fielddata} field={value.field} label={value.label} onControlChange={changeHandler} />
                        )
                    }

                    if(value.type == "text"){
                        return (
                            <TextControl key={index} value={fielddata} field={value.field} label={value.label} onControlChange={changeHandler} />
                        )
                    }

                    if(value.type.indexOf(',') != -1){                        
                        var options = value.type.split(',');
                        return (
                            <OptionControl key={index} options={options} value={fielddata} field={value.field} label={value.label} onControlChange={changeHandler} />
                        )                        
                    }
                })}
            </div>
        )
    }    

    saveSkillsheet = () => {
        this.api.put('skillsheet/' + this.skillsheetid, this.state.form).then((res) => {
            this.notyf.confirm("Your skillsheet has been automatically saved.")
        }).catch((err) => {
            Raven.captureMessage("Error: Saving Skillsheet", {
                level: "error",
                extra:  {
                    error: err,
                    skillsheettype: this.state.type
                }
            });
            this.notyf.alert("There was a problem saving this skillsheet.  Check your internet connection or contact support.");
        });
    }

    submitSkillsheet = () => {
        console.log("Send skillsheet off to PCR");
        if(!this.state.loading){
            if(this.state.form.initials != "" && this.state.form.initials != null){
                this.setState({
                    loading: true
                });

                clearInterval(this.timer);
                this.timer = null;

                var skillsheet = this.state.form;
                

                this.api.put('skillsheet/' + this.skillsheetid + "?submitcomplete=true", skillsheet).then((res) => {
                    try {
                        goog_report_conversion('Bq-5CNj7snoQ04Ts8wM');
                        ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Skill Sheets'});
                        fbq('track', 'Skills Sheets', {
                            value: 0.00,
                            currency: 'USD'
                        });
                    } catch (err) {
                        console.warn("There was problem with analytics", err);
                        Raven.captureMessage("Analytics Error: Skillsheet", {
                            level: "error",
                            extra:  {
                                error: err
                            }
                        });
                    }
                    


                    alertify.alert("Skillsheet submitted successfully.", () => {
                        window.location.href = "/my-account";
                    });
                }).catch((err) => {                    
                    Raven.captureMessage("Error: Submitting Skillsheet", {
                        level: "error",
                        extra:  {
                            error: err,
                            skillsheettype: this.state.type
                        }
                    });
                    alertify.alert("There was an error saving the skillsheet.");
                    this.setState({
                        loading: false
                    });
                    
                    this.startAutoSaveTimer();
                })
            }else{
                alertify.alert("You must enter your initials to submit this application.");
            }
        }
    }

    render(){
        if(this.skillsheetid === undefined){
            return (<div>Invalid skillsheet ID</div>);
        }else{
            return (
                <div>
                    
                    {this.state.type == "Ag" ? 
                        <AgSkillsheet 
                            loading={this.state.loading}
                            currentpage={this.state.page}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                            handleChange={this.handleFieldChange}
                            buildControls={this.buildSkillsheetForm}
                            saveSkillsheet={this.saveSkillsheet}
                            submitSkillsheet={this.submitSkillsheet}
                            data={this.state.form}
                        /> 
                    : null}
                    {this.state.type == "Dairy" ? 
                        <DairySkillsheet 
                            loading={this.state.loading}
                            currentpage={this.state.page}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                            handleChange={this.handleFieldChange}
                            buildControls={this.buildSkillsheetForm}
                            saveSkillsheet={this.saveSkillsheet}
                            submitSkillsheet={this.submitSkillsheet}
                            data={this.state.form}
                        /> 
                    : null}
                    {this.state.type == "Swine" ? 
                        <SwineSkillsheet 
                            loading={this.state.loading}
                            currentpage={this.state.page}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                            handleChange={this.handleFieldChange}
                            buildControls={this.buildSkillsheetForm}
                            saveSkillsheet={this.saveSkillsheet}
                            submitSkillsheet={this.submitSkillsheet}
                            data={this.state.form}
                        /> 
                    : null}
                </div>
            );
        }        
    }
}