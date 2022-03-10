import React from 'react';
import Api from './api';
import {states} from './misc/states';
import Notyf from 'notyf';
import validatejs from 'validate.js';
import alertify from 'alertify.js';


import OptionControl from './skillsheet/optioncontrol';



export default class Application extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();

        this.timer = null;
        this.notyf = new Notyf({
            delay: 6000
        });
        this.state = {
            loading: true,
            errors: [],
            page: 0,
            regions: states, 
            appliedjobs: [],
            selectedresume: null,
            selectedcoverletter: null,
            form: {
                firstname: "",
                middlename: "",
                lastname: "",
                address: "",
                phone: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                homephone: "",
                cellphone: "",
                is_uscitizen: null,
                contactemployer: null,
                visatype: "",
                willrelocate: null,
                wouldrelocateto: [],
                wouldnotrelocateto: [],
                yourqualifications: "",
                additionalskills: "",
                foreignlanguages: "",
                howdidyoufindus: "",
                daystochangejob: "",
                desiredpositions: "",
                bestqualifiedpositions: "",
                homeowner: null,
                whylooking: "",
                base_salary: "",
                benefitsreceived: "",
                bonusesreceived: "",
                commissionreceived: "",
                minimumsalarybenefits: "",
                desiredsalarybenefits: "",
                willtravel: null,
                acceptablenightsaway: null,
                education: null,
                workhistory: null,
                verificationinitials: "",
                coverletter: "",
                resume: ""
            }
        }

        this.constraints = {
            "firstname": {presence: { allowEmpty: false }},
            "lastname": {presence: { allowEmpty: false }},
            "address": {presence: { allowEmpty: false }},
            "city": {presence: { allowEmpty: false }},
            "state": {presence: { allowEmpty: false }},
            "zip": {presence: { allowEmpty: false }},
            "homephone": {presence: { allowEmpty: false }},
            "cellphone": {presence: { allowEmpty: false }},
            "is_uscitizen": {presence: { allowEmpty: false }},
            "willrelocate": {presence: { allowEmpty: false }},
            "desiredpositions": {presence: { allowEmpty: false }},
            "base_salary": {presence: { allowEmpty: false }},
            "benefitsreceived": {presence: { allowEmpty: false }},
            "minimumsalarybenefits": {presence: { allowEmpty: false }},
            "education.highschool.highschoolname": {presence: { allowEmpty: false }},
            "education.highschool.highschoolcity": {presence: { allowEmpty: false }},
            "education.highschool.highschoolstate": {presence: { allowEmpty: false }},
            "education.highschool.highschoolgraddate": {presence: { allowEmpty: false }},
        }
    }

    componentDidCatch(error, info){
        console.log(error, info);
    }

    componentDidMount(){
        this.api.get('application/application').then((res) => {
            var appliedjobs = [];
            
            res.appliedjobs.forEach((job) => {
                if(job.applied == 0){
                    appliedjobs.push(job);
                }
            })

            var form = this.state.form;
            if(res.application == null){
                form = this.state.form;
            }else{
                form = res.application;
            }
            
            form.firstname = res.user.firstname;
            form.middlename = res.user.middlename;
            form.lastname = res.user.lastname;
            form.address = res.user.address;
            form.city = res.user.city;
            form.state = res.user.state;
            form.country = res.user.country;
            form.zip = res.user.zipcode;
            form.cellphone = res.user.mobile;
            form.homephone = res.user.phone;


            if(form.workhistory == null){
                form.workhistory = [{
                    name: "",
                    city: "",
                    state: "",
                    description: "",
                    startingdate: "",
                    endingdate: "",
                    basesalary: "",
                    benefitsreceived: "",
                    bonusreceived: "",
                    bonusamount: "",
                    commissionamount: "",
                    supervisor: "",
                    yourresponsibilities: "",
                    reasonforleaving: ""
                }];
            }else{
                form.workhistory = JSON.parse(form.workhistory);
            }

            if(form.education == null){
                form.education = {
                    highschool: {
                        highschoolname: "",
                        highschoolcity: "",
                        highschoolstate: "",
                        highschoolgraddate: ""
                    },
                    undergraduate: {
                        undergradname: "",
                        undergraddegree: "",
                        undergradmajor: "",
                        undergradgraddate: "",
                        undergradoverallgpa: "",
                        undergradaccumhours: "",
                    },
                    postgraduate: {
                        postgradname: "",
                        postgraddegree: "",
                        postgradmajor: "",
                        postgradgraddate: "",
                        postgradoverallgpa: "",
                        postgradaccumhours: "",
                    },
                    othereducation: [{
                        schoolname: "",
                        degree: "",
                        major: "",
                        graddate: "",
                        overallgpa: "",
                        accumhours: ""
                    }]
                }
            }else{         
                form.education = JSON.parse(form.education);   
            }

            if(form.contactemployer == 1){
                form.contactemployer = "Yes";
            }else{
                if(form.contactemployer == 0){
                    form.contactemployer = "No";
                }
            }

            if(form.willtravel == 1){
                form.willtravel = "Yes";
            }else{
                if(form.willtravel == 0){
                    form.willtravel = "No";
                }
            }

            if(form.homeowner == 1){
                form.homeowner = "Yes";
            }else{
                if(form.homeowner == 0){
                    form.homeowner = "No";
                }
            }
            if(form.is_uscitizen == 1){
                form.is_uscitizen = "Yes";
            }else{
                if(form.is_uscitizen == 0){
                    form.is_uscitizen = "No";
                }
            }

            if(form.willrelocate == 1){
                form.willrelocate = "Yes";
            }else{
                if(form.willrelocate == 0){
                    form.willrelocate = "No";
                }
            }

            if(form.wouldrelocateto != ""){
                form.wouldrelocateto = form.wouldrelocateto.split(",");
            }else{
                form.wouldrelocateto = [];
            }

            if(form.wouldnotrelocateto != ""){
                form.wouldnotrelocateto = form.wouldnotrelocateto.split(",");
            }else{
                form.wouldnotrelocateto = [];
            }

            console.log("Appication", form);

            this.setState({
                form: form,
                appliedjobs: appliedjobs,
                loading: false
            });

            //Start auto update timer
            this.timer = setInterval(() => {
                console.log("Save Application");
                this.saveApplication();
            }, 20000);
        }).catch((err) => {
            alertify.alert("There was a problem loading your application.  Contact support.", () => {
                console.log(err.response.status);
                switch (err.response.status) {
                    case 400:
                        window.location.href = "/";
                        break;
                    case 401:
                        window.location.href = "/?cause=timedout";
                        break;
                    default : {
                        Raven.captureMessage("Error: Loading Application", {
                            level: "error",
                            extra:  {
                                error: err
                            }
                        });
                        break;
                    }
                }
            });
        });
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
            var file = e.target.files[0];
            var size = file.size / 1000000;

            if (size > 8) {
                alertify.alert("Your resume or coverletter must be smaller than 8MB.");
                if(e.target.name == "resume"){          
                    document.getElementById("resumefilefield").value = "";      
                    this.setState({
                        selectedresume: null
                    });
                }
    
                if(e.target.name == "coverletter"){     
                    document.getElementById("coverletterfilefield").value = "";           
                    this.setState({
                        selectedcoverletter: null
                    });
                }

                
            } else {
                if(e.target.name == "resume"){                
                    this.setState({
                        selectedresume: file
                    });
                }
    
                if(e.target.name == "coverletter"){                
                    this.setState({
                        selectedcoverletter: file
                    });
                }
            }           
        }       
    }

    handleEducationChange = (key, e) => {
        var state = this.state;
        state.form.education[key][e.target.name] = e.target.value;
        this.setState({
            form: state.form
        });
    }

    handleOtherEducationChange = (index, e) => {
        var state = this.state;
        state.form.education.othereducation[index][e.target.name] = e.target.value;
        this.setState({
            form: state.form
        });
    }

    addEducation = () => {
        var state = this.state;
        state.form.education.othereducation.push({
            schoolname: "",
            degree: "",
            major: "",
            graddate: "",
            overallgpa: "",
            accumhours: ""
        });
        this.setState({
            form: state.form
        });
    }

    removeEducation = (i) => {
        var state = this.state;
        state.form.education.othereducation.splice(i, 1);
        this.setState({
            form: state.form
        });
    }

    handleWorkHistoryChange = (index, e) => {
        var state = this.state;
        state.form.workhistory[index][e.target.name] = e.target.value;
        this.setState({
            form: state.form
        });
    }

    addWorkHistory = () => {
        var state = this.state;
        state.form.workhistory.push({
            name: "",
            city: "",
            state: "",
            description: "",
            startingdate: "",
            endingdate: "",
            basesalary: "",
            benefitsreceived: "",
            bonusreceived: "",
            bonusamount: "",
            commissionamount: "",
            supervisor: "",
            yourresponsibilities: "",
            reasonforleaving: ""
        });
        this.setState({
            form: state.form
        });
    }

    removeWorkHistory = (i) => {
        var state = this.state;
        state.form.workhistory.splice(i, 1);
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

    handleRelocationToggle = (e, arrayname) => {
        var state = this.state;        
        
        var array = state.form[arrayname];
        if (arrayname == 'wouldrelocateto') {
            var otherarray = state.form['wouldnotrelocateto'];
        } else {
            var otherarray = state.form['wouldrelocateto'];
        }

        if(e.target.checked){
            array.push(e.target.value);
            var index = otherarray.indexOf(e.target.value);
            otherarray.splice(index, 1);                        
        }else{
            var index = array.indexOf(e.target.value);
            array.splice(index, 1);
        }

        state.form[arrayname] = array;
        this.setState({
            form: state.form
        });
    }

    selectAllRegions = (arrayname) => {
        var state = this.state;
        var array = state.form[arrayname];
        if (arrayname == 'wouldrelocateto') {
            var otherarrayname = 'wouldnotrelocateto';
        } else {
            var otherarrayname = 'wouldrelocateto';
        }        

        this.state.regions.map((region, index) => {
            array.push(region.abbr);
        });

        state.form[otherarrayname] = [];
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

    nextPage = () => {
        if(this.state.page != 4){
            this.setState({
                page: this.state.page + 1
            });
            
            jQuery("html, body").animate({ scrollTop: jQuery('#application_app').offset().top - 50 }, 300);
        }       
    }

    prevPage = () => {
        if(this.state.page != 0){
            this.setState({
                page: this.state.page - 1
            });

            jQuery("html, body").animate({ scrollTop: jQuery('#application_app').offset().top - 50 }, 300);
        }        
    }

    saveApplication = () => {
        console.log(this.state.form);
        this.api.put('application/application', this.state.form).then((res) => {
            console.log(res);
            this.notyf.confirm("Your application has been automatically saved.")
        }).catch((err) => {
            switch (err.response.status) {
                case 401:
                    window.location.href = "/?cause=timedout";
                    break;
                default: {
                    Raven.captureMessage("Error: Saving Application", {
                        level: "error",
                        extra:  {
                            error: err
                        }
                    });
                    this.notyf.alert("There was a problem saving this application.  Check your internet connection or contact support.");
                    break;
                }
            }
        });
    }

    removeResume = () => {
        this.api.delete('application/application/resume').then((res) => {
            var form = this.state.form;
            form.resume = null;
            this.setState({
                form: form,
            });
        });
    }

    removeCoverletter = () => {
        this.api.delete('application/application/coverletter').then((res) => {
            var form = this.state.form;
            form.coverletter = null;
            this.setState({
                form: form,
            });
        });
    }

    triggerAnalytics = () => {
        try {
            goog_report_conversion('dgnRCIKNyXoQ04Ts8wM');
            ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Application'});
            fbq('track', 'Application', {
                value: 0.00,
                currency: 'USD'
            });
        } catch (err) {
            console.warn("There was problem with analytics", err);
            Raven.captureMessage("Analytics Error: Application", {
                level: "error",
                extra:  {
                    error: err
                }
            });
        }
        
        
    }

    submitApplication = () => {
        //Do application validation first
        if(!this.state.loading){
            if(this.state.form.verificationinitials != "" && this.state.form.verificationinitials != null){
                this.setState({
                    loading: true
                });

                clearInterval(this.timer);
                this.timer = null;

                var app = this.state.form;
                var errors = validatejs(app, this.constraints);

                if(errors !== undefined){
                    var fieldkeys = Object.keys(errors);
                    this.setState({
                        errors: fieldkeys
                    });     

                    alertify.alert("Before submitting your application, you must fill out all required fields.  Click OK to return to the first page to review your application.", () => {   
                        console.log(this.state.errors);
                        this.setState({
                            page: 0,
                            loading: false
                        });
                    });     
                    
                    this.timer = setInterval(() => {
                        console.log("Save Application");
                        this.saveApplication();
                    }, 30000);
                    return false;
                }

                
                this.api.put('application/application?submitcomplete=true', app).then((res) => {
                    //Upload and submit attachments

                    if(this.state.selectedresume != null || this.state.selectedcoverletter != null){
                        var formData = new FormData();
                        if(this.state.selectedresume){
                            formData.append("resume", this.state.selectedresume);
                        }

                        if(this.state.selectedcoverletter){
                            formData.append("coverletter", this.state.selectedcoverletter);
                        }

                        this.api.post('application/application/resume', formData).then((res) => {
                            this.triggerAnalytics();
                            alertify.alert("Application submitted successfully.", () => {
                                window.location.href = "/my-account";
                            })
                        }).catch((err) => {
                            Raven.captureMessage("Error: Submitting Application Resume", {
                                level: "error",
                                extra:  {
                                    error: err
                                }
                            });
                            alertify.alert("There was an error saving the application resume/coverletter.");
                            this.setState({
                                loading: false
                            });
                            this.timer = setInterval(() => {
                                console.log("Save Application");
                                this.saveApplication();
                            }, 30000);
                        });          
                    }else{
                        this.triggerAnalytics();
                        alertify.alert("Application submitted successfully.", () => {
                            window.location.href = "/my-account";
                        })
                    }                    
                }).catch((err) => {
                    Raven.captureMessage("Error: Submitting Application", {
                        level: "error",
                        extra:  {
                            error: err
                        }
                    });
                    alertify.alert("There was an error saving the application.");
                    this.setState({
                        loading: false
                    });
                    this.timer = setInterval(() => {
                        console.log("Save Application");
                        this.saveApplication();
                    }, 30000);
                });
            }else{
                alertify.alert("You must enter your initials to submit this application.");
                
            }
        }
    }



    render(){
        return (
            <div id="fullaplication">
                {this.state.appliedjobs.length != 0 ?
                    <section id="application_jobs">
                        <h1>Currently Applying For:</h1>
                        <strong>
                            {this.state.appliedjobs.map((job, index) => {
                                return (
                                    <span key={index}>{job.jobtitle} + ({job.job_position_id}) </span>
                                )
                            })}    
                        </strong>    
                    </section>                
                : null}
                
                <div id="application_app">
                    {this.state.loading ? <div className='loading'></div> : null }
                    <div id="breadcrumbs">
                        {this.state.page > 0 ? <button onClick={this.prevPage} className="button btn_prev">Prev</button> : null}
                        
                        <div className="currentactivepage">
                            Page {this.state.page + 1} of 5
                        </div>
                        {this.state.page != 4 ? <button onClick={this.nextPage} className="button btn_next">Next</button> : null}
                    </div>
                    <div id="application_pages">
                        {this.state.page == 0 ? 
                            <PersonalInfoPage 
                                errors={this.state.errors}
                                form={this.state.form} 
                                regions={this.state.regions} 
                                onChange={this.handleFieldChange}
                                isRegionSelected={this.checkIfRegionSelected}
                                toggleRegion={this.handleRelocationToggle}
                                selectAllRegions={this.selectAllRegions}
                                selectNoRegions={this.selectNoRegions}
                             /> : null}

                        {this.state.page == 1 ? 
                            <CareerInfoPage 
                                errors={this.state.errors}
                                form={this.state.form} 
                                regions={this.state.regions} 
                                onChange={this.handleFieldChange}
                                isRadioChecked={this.isRadioChecked}
                                isRegionSelected={this.checkIfRegionSelected}
                                toggleRegion={this.handleRelocationToggle}
                                selectAllRegions={this.selectAllRegions}
                                selectNoRegions={this.selectNoRegions}
                             /> : null}
                        {this.state.page == 2 ? 
                            <EducationInfoPage 
                                errors={this.state.errors}
                                form={this.state.form}                                 
                                onChange={this.handleEducationChange}
                                otherEduChange={this.handleOtherEducationChange}
                                isRadioChecked={this.isRadioChecked}
                                addEducation={this.addEducation}
                                removeEducation={this.removeEducation}
                             /> : null}
                        {this.state.page == 3 ? 
                            <WorkInfoPage 
                                onChange={this.handleFieldChange}
                                onWorkHistoryChange={this.handleWorkHistoryChange}
                                addWorkHistory={this.addWorkHistory}
                                removeWorkHistory={this.removeWorkHistory}
                                form={this.state.form}  
                             /> : null}

                        {this.state.page == 4 ? 
                            <ResumeInfoPage 
                                onFileChange={this.handleFileChange}
                                onChange={this.handleFieldChange}
                                submitApplication={this.submitApplication}      
                                onResumeDelete={this.removeResume}       
                                onCoverLetterDelete={this.removeCoverletter}                   
                                form={this.state.form}  
                             /> : null}
                    </div>
                    <div id="application_controls">
                        <button id="btn_prev" onClick={this.prevPage} className="button btn_prev">Prev</button>
                        <button id="btn_saveapp" onClick={this.saveApplication} className="button">Save Application</button>
                        <button id="btn_next" onClick={this.nextPage} className="button btn_next">Next</button>
                    </div>
                </div>                
            </div>
        )
    }
}

class PersonalInfoPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <section id="personalinfo_page" className="active">
                <header>                    
                    <h1>Personal Info</h1>                    
                </header>
                <div className="formwrapper">
                    <div className="row three-col">
                        <div className="formrow">
                            <label>First Name <span>*</span></label>
                            <input required value={this.props.form.firstname} onChange={this.props.onChange} type="text"  id="txtFirstname" name="firstname" />
                            <ErrorSpan invalidfields={this.props.errors} for="firstname" />
                        </div>
                        <div className="formrow">
                            <label>Middle Name</label>
                            <input value={this.props.form.middlename} onChange={this.props.onChange} type="text"  id="txtMiddlename" name="middlename" />
                        </div>
                        <div className="formrow">
                            <label>Last Name <span>*</span></label>
                            <input required value={this.props.form.lastname} onChange={this.props.onChange} type="text"  id="txtLastname" name="lastname" />
                            <ErrorSpan invalidfields={this.props.errors} for="lastname" />
                        </div>
                    </div>

                    <div className="formrow">
                        <label>Street Address <span>*</span></label>
                        <input required value={this.props.form.address} onChange={this.props.onChange} type="text"  id="txtAddress" name="address" />
                        <ErrorSpan invalidfields={this.props.errors} for="address" />
                    </div>
                    <div className="row three-col">
                        <div className="formrow">
                            <label>City <span>*</span></label>
                            <input required value={this.props.form.city} onChange={this.props.onChange} type="text"  id="txtCity" name="city" />
                            <ErrorSpan invalidfields={this.props.errors} for="city" />
                        </div>
                        <div className="formrow">
                            <label>State <span>*</span></label>
                            <input required value={this.props.form.state} onChange={this.props.onChange} type="text"  id="txtState" name="state" />
                            <ErrorSpan invalidfields={this.props.errors} for="state" />
                        </div>
                        <div className="formrow">
                            <label>Zip <span>*</span></label>
                            <input required value={this.props.form.zip} onChange={this.props.onChange} type="text"  id="txtZip" name="zip" />
                            <ErrorSpan invalidfields={this.props.errors} for="zip" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="formrow">
                            <label>Country <span>*</span></label>
                            <select name="country" value={this.props.form.country} onChange={this.props.onChange}>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                            </select>
                        </div>
                    </div>
                    <div className="row two-col">
                        <div className="formrow">
                            <label>Home Phone <span>*</span></label>
                            <input required value={this.props.form.homephone} onChange={this.props.onChange} type="text"  id="txtHomephone" name="homephone" />
                            <ErrorSpan invalidfields={this.props.errors} for="homephone" />
                        </div>
                        <div className="formrow">
                            <label>Cell Phone <span>*</span></label>
                            <input required value={this.props.form.cellphone} onChange={this.props.onChange} type="text"  id="txtCellphone" name="cellphone" />
                            <ErrorSpan invalidfields={this.props.errors} for="cellphone" />
                        </div>
                    </div>

                    <div className="formrow">
                        <OptionControl required={true} options={["Yes", "No"]} value={this.props.form.is_uscitizen} field="is_uscitizen" label="Are you a US Citizen/permanent US resident?" onControlChange={this.props.onChange} />
                    </div>
                    <div className="formrow">
                        <label>If you are not a US citizen/permanant resident of the U.S., under what type of visa are you authorized to work in the US?</label>
                        <input value={this.props.form.visatype} onChange={this.props.onChange} type="text"  id="txtVisaType" name="visatype" />
                    </div>
                    <div className="formrow">
                        <OptionControl required={true} options={["Yes", "No"]} value={this.props.form.willrelocate} field="willrelocate" label="Will you relocate?" onControlChange={this.props.onChange} />
                    </div>
                    <div className={this.props.form.willrelocate == 'No' ? 'row two-col hidden' : 'row two-col'}>
                        <div className="formrow">
                            <label>Which states will you relocate to?</label>
                            <span className="listoptions">
                                <a onClick={() => {this.props.selectAllRegions('wouldrelocateto')}} className="listSelectAll">Select All</a> /
                                <a onClick={() => {this.props.selectNoRegions('wouldrelocateto')}} className="listSelectNone">Select None</a>
                            </span>
                            <ul className="list">
                                {this.props.regions.map((region, index) => {
                                    var isChecked = this.props.isRegionSelected(region.abbr, "wouldrelocateto");

                                    return(
                                        <li key={index}>
                                            <input type="checkbox" value={region.abbr} checked={isChecked} onChange={(e) => {this.props.toggleRegion(e, "wouldrelocateto")}} />
                                            <span>{region.name}</span>
                                        </li>
                                    );                                            
                                })}
                            </ul>
                        </div>

                        <div className="formrow">
                            <label>Which states will you NOT relocate to?</label>
                            <span className="listoptions">
                                <a onClick={() => {this.props.selectAllRegions('wouldnotrelocateto')}} className="listSelectAll">Select All</a> /
                                <a onClick={() => {this.props.selectNoRegions('wouldnotrelocateto')}} className="listSelectNone">Select None</a>
                            </span>
                            <ul className="list">
                                {this.props.regions.map((region, index) => {
                                    var isChecked = this.props.isRegionSelected(region.abbr, "wouldnotrelocateto");

                                    return(
                                        <li key={index}>
                                            <input type="checkbox" value={region.abbr} checked={isChecked} onChange={(e) => {this.props.toggleRegion(e, "wouldnotrelocateto")}} />
                                            <span>{region.name}</span>
                                        </li>
                                    );                                            
                                })}
                            </ul> 
                        </div>
                    </div>
                    <div className="formrow">
                        <label>In the following area list skills and a general overview of your qualifications.</label>
                        <textarea value={this.props.form.yourqualifications} onChange={this.props.onChange} id="txtYourQualifications" name="yourqualifications"></textarea>
                    </div>
                    <div className="formrow">
                        <label>In the following area, please list any additional information that you would like an employer to know about yourself (strong points and abilities, previous achievements, things you do best, etc).</label>
                        <textarea value={this.props.form.additionalskills} onChange={this.props.onChange} id="txtAdditionalSkills" name="additionalskills"></textarea>
                    </div>
                    <div className="formrow">
                        <label>Foreign Languages and Level of Fluency</label>
                        <textarea value={this.props.form.foreignlanguages} onChange={this.props.onChange} id="txtForeignLanguages" name="foreignlanguages"></textarea>
                    </div>
                    <div className="formrow">
                        <label>How did you hear about us? If from a magazine or newspaper, please provide the name of the publication. If from a career site or other web site, please list the name of the site here.</label>
                        <textarea value={this.props.form.howdidyoufindus} onChange={this.props.onChange} id="txtHowDidYouFindUs" name="howdidyoufindus"></textarea>
                    </div>
                </div>
            </section>
        )
    }
}

class CareerInfoPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <section id="careerinfo_page">
                <header>
                    <h1>Career Info</h1>
                </header>
                <div className="formwrapper">
                    <div className="formrow">
                        <label>How many days do you need to change jobs?</label>
                        <input value={this.props.form.daystochangejob} onChange={this.props.onChange} type="text" id="txtDaysToChangeJob" name="daystochangejob" />
                    </div>
                    <div className="row two-col">
                        <div className="formrow">
                            <label>What positions do you desire? <span>*</span></label>
                            <textarea required value={this.props.form.desiredpositions} onChange={this.props.onChange}  id="txtDesiredPositions" name="desiredpositions"></textarea>
                            <ErrorSpan invalidfields={this.props.errors} for="desiredpositions" />
                        </div>
                        <div className="formrow">
                            <label>What positions are you best qualified for?</label>
                            <textarea value={this.props.form.bestqualifiedpositions} onChange={this.props.onChange}  id="txtBestQualifiedPositions" name="bestqualifiedpositions"></textarea>
                        </div>
                    </div>
                    <div className="formrow" onChange={this.props.onChange}>
                        <OptionControl options={["Yes", "No"]} value={this.props.form.homeowner} field="homeowner" label="Do you own your own home?" onControlChange={this.props.onChange} />                        
                    </div>
                    <div className="formrow">
                        <label>Why are you looking for a new position?</label>
                        <textarea value={this.props.form.whylooking} onChange={this.props.onChange}  id="txtWhyLooking" name="whylooking"></textarea>
                    </div>
                    <div className="row three-col">
                        <div className="formrow">
                            <label>What is your current base salary? <span>*</span></label>
                            <input required value={this.props.form.base_salary} onChange={this.props.onChange}  type="text" id="txtBaseSalary" name="base_salary" />
                            <ErrorSpan invalidfields={this.props.errors} for="base_salary" />
                        </div>
                        <div className="formrow">
                            <label>What benefits do you receive? <span>*</span></label>
                            <input required value={this.props.form.benefitsreceived} onChange={this.props.onChange}  type="text" id="txtBenefitsReceived" name="benefitsreceived" />
                            <ErrorSpan invalidfields={this.props.errors} for="benefitsreceived" />
                        </div>
                        <div className="formrow">
                            <label>What bonuses do you receive?</label>
                            <input value={this.props.form.bonusesreceived} onChange={this.props.onChange}  type="text" id="txtBonusesReceived" name="bonusesreceived" />
                        </div>
                    </div>
                    <div className="formrow">
                        <label>What commissions do you receive?</label>
                        <input value={this.props.form.commissionreceived} onChange={this.props.onChange}  type="text" id="txtCommissionReceived" name="commissionreceived" />
                    </div>
                    <div className="formrow">
                        <label>What is your minimum salary and benefit requirements? <span>*</span></label>
                        <input required value={this.props.form.minimumsalarybenefits} onChange={this.props.onChange}  type="text" id="txtMinimumSalaryBenefits" name="minimumsalarybenefits" />
                        <ErrorSpan invalidfields={this.props.errors} for="minimumsalarybenefits" />
                    </div>
                    <div className="row two-col">
                        <div className="formrow" onChange={this.props.onChange}>
                            <OptionControl options={["Yes", "No"]} value={this.props.form.willtravel} field="willtravel" label="Will you travel?" onControlChange={this.props.onChange} />
                        </div>
                        <div className="formrow">
                            <label>How many nights away per week would you prefer if you traveled?</label>
                            <input value={this.props.form.acceptablenightsaway} onChange={this.props.onChange}  type="number" id="txtAcceptableNightsAway" name="acceptablenightsaway" />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


class EducationInfoPage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.form);
    }

    onChange = (e) => {        
        this.props.onChange(e.target.getAttribute('data-type'), e);
    }

    render(){
        return (
            <section id="educationinfo_page">
                <header>
                    <h1>Education History</h1>
                </header>
                <div className="formwrapper">
                    <div className="education">
                        <h2>High School</h2>
                        <div className="row two-col">
                            <div className="formrow">
                                <label>School <span>*</span></label>
                                <input required value={this.props.form.education.highschool.highschoolname}  onChange={this.onChange} data-type="highschool" type="text"  id="txtHighSchoolName" name="highschoolname" />
                                <ErrorSpan invalidfields={this.props.errors} for="education.highschool.highschoolname" />
                            </div>
                            <div className="formrow">
                                <label>City <span>*</span></label>
                                <input required value={this.props.form.education.highschool.highschoolcity}  onChange={this.onChange} data-type="highschool" type="text" id="txtHighSchoolCity" name="highschoolcity" />
                                <ErrorSpan invalidfields={this.props.errors} for="education.highschool.highschoolcity" />
                            </div>
                        </div>
                        <div className="row two-col">
                            <div className="formrow">
                                <label>State <span>*</span></label>
                                <input required value={this.props.form.education.highschool.highschoolstate}  onChange={this.onChange} data-type="highschool"  type="text" id="txtHighSchoolState" name="highschoolstate" />
                                <ErrorSpan invalidfields={this.props.errors} for="education.highschool.highschoolstate" />
                            </div>
                            <div className="formrow">
                                <label>Graduation Date<span>*</span></label>
                                <input required className="date" value={this.props.form.education.highschool.highschoolgraddate}  onChange={this.onChange} data-type="highschool" type="text" id="txtHighSchoolGradDate" name="highschoolgraddate" />
                                <ErrorSpan invalidfields={this.props.errors} for="education.highschool.highschoolgraddate" />
                            </div>
                        </div>
                    </div>
                    <div className="education">
                        <h2>Undergraduate</h2>
                        <div className="row two-col">
                            <div className="formrow">
                                <label>School</label>
                                <input value={this.props.form.education.undergraduate.undergradname}  onChange={this.onChange} data-type="undergraduate"  type="text" id="txtUndergradName" name="undergradname" />
                            </div>
                            <div className="formrow">
                                <label>Degree</label>
                                <input value={this.props.form.education.undergraduate.undergraddegree}  onChange={this.onChange} data-type="undergraduate"  type="text" id="txtUndergradDegree" name="undergraddegree" />
                            </div>
                        </div>
                        <div className="row two-col">
                            <div className="formrow">
                                <label>Major</label>
                                <input value={this.props.form.education.undergraduate.undergradmajor}  onChange={this.onChange} data-type="undergraduate"  type="text" id="txtUndergradMajor" name="undergradmajor" />
                            </div>
                            <div className="formrow">
                                <label>Graduation Date</label>
                                <input className="date" value={this.props.form.education.undergraduate.undergradgraddate}  onChange={this.onChange} data-type="undergraduate" type="text" id="txtUndergradGradDate" name="undergradgraddate" />
                            </div>
                        </div>
                        <div className="formrow">
                            <label>Overall GPA</label>
                            <input value={this.props.form.education.undergraduate.undergradoverallgpa}  onChange={this.onChange} data-type="undergraduate" type="text" id="txtUndergradOverallGpa" name="undergradoverallgpa" />
                        </div>
                        <div className="formrow">
                            <label>Accumulated Hours</label>
                            <input value={this.props.form.education.undergraduate.undergradaccumhours}  onChange={this.onChange} data-type="undergraduate"  type="text" id="txtUndergradAccumHours" name="undergradaccumhours" />
                        </div>
                    </div>
                    <div className="education">
                        <h2>Postgraduate</h2>
                        <div className="row two-col">
                            <div className="formrow">
                                <label>School</label>
                                <input value={this.props.form.education.postgraduate.postgradname}  onChange={this.onChange} data-type="postgraduate"  type="text" id="txtPostgradName" name="postgradname" />
                            </div>
                            <div className="formrow">
                                <label>Degree</label>
                                <input value={this.props.form.education.postgraduate.postgraddegree}  onChange={this.onChange} data-type="postgraduate"   type="text" id="txtPostgradDegree" name="postgraddegree" />
                            </div>
                        </div>
                        <div className="row two-col">
                            <div className="formrow">
                                <label>Major</label>
                                <input value={this.props.form.education.postgraduate.postgradmajor}  onChange={this.onChange} data-type="postgraduate"   type="text" id="txtPostgradMajor" name="postgradmajor" />
                            </div>
                            <div className="formrow">
                                <label>Graduation Date</label>
                                <input className="date" value={this.props.form.education.postgraduate.postgradgraddate}  onChange={this.onChange} data-type="postgraduate"   type="text" id="txtPostgradGradDate" name="postgradgraddate" />
                            </div>
                        </div>
                        <div className="formrow">
                            <label>Overall GPA</label>
                            <input value={this.props.form.education.postgraduate.postgradoverallgpa}  onChange={this.onChange} data-type="postgraduate"   type="text" id="txtPostgradOverallGpa" name="postgradoverallgpa" />
                        </div>
                        <div className="formrow">
                            <label>Accumulated Hours</label>
                            <input value={this.props.form.education.postgraduate.postgradaccumhours}  onChange={this.onChange} data-type="postgraduate"   type="text" id="txtPostgradAccumHours" name="postgradaccumhours" />
                        </div>
                    </div>
                    {this.props.form.education.othereducation.map((edu, i) => {
                        return (
                            <div key={i} className="moreeducation">
                                <div className="education">
                                    <h2>Education</h2>
                                    {i > 0 ? <a onClick={() => this.props.removeEducation(i)} className="delete_btn"><i className="fa fa-trash-o"></i></a> : null }
                                    <div className="row two-col">
                                        <div className="formrow">
                                            <label>School</label>
                                            <input value={this.props.form.education.othereducation[i].schoolname} onChange={(e) => { this.props.otherEduChange(i, e); }} type="text" name="schoolname"  />
                                        </div>
                                        <div className="formrow">
                                            <label>Degree</label>
                                            <input value={this.props.form.education.othereducation[i].degree} onChange={(e) => { this.props.otherEduChange(i, e); }}  type="text" name="degree" />
                                        </div>
                                    </div>
                                    <div className="row two-col">
                                        <div className="formrow">
                                            <label>Major</label>
                                            <input value={this.props.form.education.othereducation[i].major} onChange={(e) => { this.props.otherEduChange(i, e); }} name="major"  type="text" />
                                        </div>
                                        <div className="formrow">
                                            <label>Graduation Date</label>
                                            <input className="date" value={this.props.form.education.othereducation[i].graddate} onChange={(e) => { this.props.otherEduChange(i, e); }}  type="text"  name="graddate" />
                                        </div>
                                    </div>
                                    <div className="formrow">
                                        <label>Overall GPA</label>
                                        <input value={this.props.form.education.othereducation[i].overallgpa} onChange={(e) => { this.props.otherEduChange(i, e); }} name="overallgpa"  type="text"  />
                                    </div>
                                    <div className="formrow">
                                        <label>Accumulated Hours</label>
                                        <input value={this.props.form.education.othereducation[i].accumhours} onChange={(e) => { this.props.otherEduChange(i, e); }} name="accumhours"    type="text"  />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                    <a className="button" onClick={this.props.addEducation} id="btn_addedu">Add Education</a>
                </div>

            </section>
        )
    }
}

class WorkInfoPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <section id="workhistoryinfo_page">
                <header>
                    <h1>Work History</h1>
                </header>
                <div className="formwrapper">
                    <div className="formrow">
                        <OptionControl options={["Yes", "No"]} value={this.props.form.contactemployer} field="contactemployer" label="May we contact your current employer?" onControlChange={this.props.onChange} />                        
                    </div>
                    <div className="moreworkhistory">
                        {this.props.form.workhistory.map((work, i) => {
                            return (
                                <div key={i} className="workhistory">
                                    <h2>Employer</h2>
                                    {i > 0 ? <a onClick={() => {this.props.removeWorkHistory(i)}} className="delete_btn"><i className="fa fa-trash-o"></i></a> : null }
                                    <div className="formrow">
                                        <label>Business Name</label>
                                        <input value={this.props.form.workhistory[i].name} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="name" type="text" />
                                    </div>
                                    <div className="row two-col">
                                        <div className="formrow">
                                            <label>City</label>
                                            <input value={this.props.form.workhistory[i].city} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="city"  type="text" />
                                        </div>
                                        <div className="formrow">
                                            <label>State</label>
                                            <input value={this.props.form.workhistory[i].state} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="state" type="text" />
                                        </div>

                                    </div>
                                    <div className="formrow">
                                        <label>Company Description  (Product(s), Size of Operation, etc.)</label>
                                        <textarea value={this.props.form.workhistory[i].description} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="description" ></textarea>
                                    </div>
                                    <div className="row two-col">
                                        <div className="formrow">
                                            <label>Starting Date</label>
                                            <input className="date" value={this.props.form.workhistory[i].startingdate} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="startingdate"  type="text" />
                                        </div>
                                        <div className="formrow">
                                            <label>Ending Date</label>
                                            <input className="date" value={this.props.form.workhistory[i].endingdate} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="endingdate"  type="text" />
                                        </div>
                                    </div>
                                    <div className="row two-col">
                                        <div className="formrow">
                                            <label>Base Salary</label>
                                            <input value={this.props.form.workhistory[i].basesalary} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="basesalary"  type="text" />
                                        </div>
                                        <div className="formrow">
                                            <label>Benefits Received</label>
                                            <input value={this.props.form.workhistory[i].benefitsreceived} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="benefitsreceived"  type="text" />
                                        </div>
                                    </div>
                                    <div className="row two-col">
                                        <div className="formrow">
                                            <label>Bonus Received</label>
                                            <input value={this.props.form.workhistory[i].bonusreceived} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="bonusreceived"  type="text" />
                                        </div>
                                        <div className="formrow">
                                            <label>Bonus Amount</label>
                                            <input value={this.props.form.workhistory[i].bonusamount} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="bonusamount"  type="text" />
                                        </div>
                                    </div>
                                    <div className="row two-col">
                                        <div className="formrow">
                                            <label>Commission Amount</label>
                                            <input value={this.props.form.workhistory[i].commissionamount} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="commissionamount"  type="text" />
                                        </div>
                                        <div className="formrow">
                                            <label>Supervisor Name and Title</label>
                                            <input value={this.props.form.workhistory[i].supervisor} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="supervisor" type="text" />
                                        </div>
                                    </div>
                                    <div className="formrow">
                                        <label>Your Title and Responsibilities</label>
                                        <textarea value={this.props.form.workhistory[i].yourresponsibilities} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="yourresponsibilities" ></textarea>
                                    </div>
                                    <div className="formrow">
                                        <label>Reason for Leaving</label>
                                        <textarea value={this.props.form.workhistory[i].reasonforleaving} onChange={(e) => { this.props.onWorkHistoryChange(i, e); }} name="reasonforleaving" ></textarea>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>

                    <a className="button" id="btn_addwork" onClick={this.props.addWorkHistory}>Add Work History</a>
                </div>
            </section>
        )
    }
}

class ResumeInfoPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <section id="resume_page">
                <header>
                    <h1>Resume and Cover Letter</h1>
                </header>
                <div className="formwrapper">
                    <div className="row two-col">
                        <div className="formrow">
                            <label>Your Current Resume</label>
                            <a>{this.props.form.resume}</a><br/>
                            {this.props.form.resume !== "" && this.props.form.resume !== null? <small><a style={{cursor: "pointer"}} onClick={this.props.onResumeDelete}>Remove Resume</a></small> : null }
                        </div>
                        <div className="formrow file">
                            <label>Upload Resume</label>
                            <input value={this.props.selectedresume} onChange={this.props.onFileChange} type="file" id="resumefilefield" name="resume" accept=".doc, .docx, .odt, .pdf" />
                        </div>
                    </div>
                    <div className="row two-col">
                        <div className="formrow">
                            <label>Your Current Cover Letter</label>
                            <a>{this.props.form.coverletter}</a><br/>
                            {this.props.form.coverletter !== "" && this.props.form.coverletter !== null ? <small><a style={{cursor: "pointer"}} onClick={this.props.onCoverLetterDelete}>Remove Cover Letter</a></small> : null }
                        </div>
                        <div className="formrow file">
                            <label>Upload Cover Letter</label>
                            <input value={this.props.selectedcoverletter} onChange={this.props.onFileChange} type="file" id="coverletterfilefield" name="coverletter" accept=".doc, .docx, .odt, .pdf" />
                        </div>
                    </div>
                </div>
                <div className="application_completion">
                    <h2>Complete Application</h2>
                    <p>
                        To submit your application to Hansen Agri-PLACEMENT, type your initials in the box below, then click <strong>Submit Application.</strong> Please ensure you have completed all 5 steps before submitting.
                        <input type="text" value={this.props.form.verificationinitials} onChange={this.props.onChange} name="verificationinitials" />
                        <a id="submit_application" onClick={this.props.submitApplication} className="button">Submit Application</a>
                    </p>
                </div>
            </section>
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