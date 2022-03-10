import React from 'react';
import Api from './api';

import {states} from './misc/states';

import validatejs from 'validate.js';
import alertify from 'alertify.js';

export default class JobOrder extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();

        this.constraints = {
            "companyname": {presence: { allowEmpty: false }},
            "companyaddress": {presence: { allowEmpty: false }},
            "companycity": {presence: { allowEmpty: false }},
            "companystate": {presence: { allowEmpty: false }},
            "companyzip": {presence: { allowEmpty: false }},
            "companycountry": {presence: { allowEmpty: false }},
            "hiringauthority": {presence: { allowEmpty: false }},
            "hiringauthoritytitle": {presence: { allowEmpty: false }},
            "officephone": {presence: { allowEmpty: false }},
            "email": { email: true },
            "companydescription": {presence: { allowEmpty: false }},
            "reasonforposition": {presence: { allowEmpty: false }},
            "jobtitle": {presence: { allowEmpty: false }},
            "jobcity": {presence: { allowEmpty: false }},
            "jobstate": {presence: { allowEmpty: false }},
            "industry": {presence: { allowEmpty: false }},
            "positionneededby": {presence: { allowEmpty: false }},
            "estimatedfirstyearincome": {
                presence: { allowEmpty: false }
                /*format: {
                    pattern: /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{1,2}$/g,
                    message: "This must be a currency"
                }*/
            },
            "startingsalaryrange": {presence: { allowEmpty: false }},
            "qualifications": {presence: { allowEmpty: false }},
            "jobdescription": {presence: { allowEmpty: false }},
            "benefits": {presence: { allowEmpty: false }},
        }

        this.state = {
            loading: false,
            errors: [],
            page: 0,    
            regions: states,
            selectedjobfile: null,
            form: {
                companyname: "",
                companyaddress: "",
                companyaddress2: "",
                companycity: "",
                companystate: "",
                companyzip: "",
                companycountry: "",
                hiringauthority: "",
                hiringauthoritytitle: "",
                officephone: "",
                cellphone: "",
                faxnumber: "",
                email: "",
                companydescription: "",
                reasonforposition: "",
                jobtitle: "",
                jobcity: "",
                jobstate: "",
                industry: "",
                peopleneeded: "",
                positionneededby: "",
                estimatedfirstyearincome: "",
                startingsalaryrange: "",
                basesalary: "",
                incentives: "",
                qualifications: "",
                jobdescription: "",
                benefits: "",
                source: ""
            }
        };
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.unsavedFormWarning);
    }

    unsavedFormWarning = () => {
        return "If you leave, the contents of your job order form will be lost.";
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
            this.setState({
                selectedjobfile: file
            });          
        }       
    }

    nextPage = () => {
        if(this.state.page != 1){
            this.setState({
                page: this.state.page + 1
            });
        }       
    }

    prevPage = () => {
        if(this.state.page != 0){
            this.setState({
                page: this.state.page - 1
            });
        }        
    }

    triggerAnalytics = () => {
        try {
            goog_report_conversion('axQyCIGYyXoQ04Ts8wM');
            ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Job Order'});
            fbq('track', 'Job Order', {
                value: 0.00,
                currency: 'USD'
            });
        } catch (err) {
            console.warn("There was problem with analytics", err);
            Raven.captureMessage("Analytics Error: Job Order", {
                level: "error",
                extra:  {
                    error: err
                }
            });
        }
        
    }

    submitJobOrder = () => {        
        console.log(this.state.form);
        if(!this.state.loading){            
            this.setState({
                loading: true
            });               

            var order = this.state.form;            
            var errors = validatejs(order, this.constraints);

            var estimatedincomecurrency = order.estimatedfirstyearincome;
            estimatedincomecurrency = estimatedincomecurrency.replace("$", "");
            estimatedincomecurrency = estimatedincomecurrency.replace(",", "");
            estimatedincomecurrency = estimatedincomecurrency.replace(".", "");

            if(errors !== undefined && parseFloat(estimatedincomecurrency) !== NaN ){
                console.log(errors, estimatedincomecurrency);
                var fieldkeys = Object.keys(errors);
                this.setState({
                    errors: fieldkeys
                });  
                
                alertify.alert("Before submitting your job order, you must fill out all required fields.  Click OK to return to the first page to review your form.", () => {   
                    this.setState({
                        page: 0,
                        loading: false
                    });
                });   

                return;
            }

            this.api.post('application/joborder', order).then((res) => {
                if(this.state.selectedjobfile != null){
                    var formData = new FormData();                    
                    formData.append("jobfile", this.state.selectedjobfile);
                    formData.append("orderid", res.orderid);
                    
                    this.api.post('application/joborder/file', formData).then((res) => {
                        this.triggerAnalytics();
                        alertify.alert("Your Job Order has been successfully submitted.", () => {
                            window.removeEventListener("beforeunload", this.unsavedFormWarning);
                            window.location.reload();
                        });
                    });           
                }else{
                    this.triggerAnalytics();
                    alertify.alert("Your Job Order has been successfully submitted.", () => {
                        window.removeEventListener("beforeunload");
                        window.location.reload();
                    });
                }                
            }).catch((err) => {
                Raven.captureMessage("Error: Submitting Job Order", {
                    level: "error",
                    extra:  {
                        error: err
                    }
                });
                alertify.alert("There was a problem submitting your job order.", () => {
                    this.setState({
                        loading: false
                    });
                });
            });
        }
    }

    render(){
        return(
            <div id="joborderform">
                <div id="joborderform_app">
                    {this.state.loading ? <div className='loading'></div> : null }
                    <div id="breadcrumbs">
                        <button onClick={this.prevPage} className="button btn_prev">Prev</button>
                        <div className="currentactivepage">
                            Page {this.state.page + 1} of 2
                        </div>
                        <button onClick={this.nextPage} className="button btn_next">Next</button>
                    </div>
                    <div id="application_pages">
                        {this.state.page == 0 ? 
                        <section id="joborderinfo_page" className="active">
                            <header>                    
                                <h1>Company Info</h1>   
                            </header>
                            <div className="formwrapper">
                                <div className="formrow">
                                    <label>Company Name <span className="required">*</span></label>
                                    <input required autoComplete="off" onChange={this.handleFieldChange} value={this.state.form.companyname} type="text" id="txtCompanyName" name="companyname" />							
                                    <ErrorSpan invalidfields={this.state.errors} for="companyname" />
                                </div>
                                <div className="formrow">
                                    <label>Street Address <span className="required">*</span></label>
                                    <input required autoComplete="off" onChange={this.handleFieldChange} value={this.state.form.companyaddress} type="text" id="txtAddress" name="companyaddress" />
                                    <ErrorSpan invalidfields={this.state.errors} for="companyname" />
                                </div>
                                <div className="formrow">
                                    <label>Street Address 2</label>
                                    <input autoComplete="off" type="text" onChange={this.handleFieldChange} value={this.state.form.companyaddress2} id="txtAddress2" name="companyaddress2" />
                                </div>
                                <div className="row four-col">
                                    <div className="formrow">
                                        <label>City <span className="required">*</span></label>
                                        <input required autoComplete="off" onChange={this.handleFieldChange}  value={this.state.form.companycity} type="text" id="txtCity" name="companycity" />
                                        <ErrorSpan invalidfields={this.state.errors} for="companycity" />
                                    </div>
                                    <div className="formrow">
                                        <label>State <span className="required">*</span></label>
                                        <input required autoComplete="off" onChange={this.handleFieldChange} value={this.state.form.companystate} type="text" id="txtState" name="companystate" />
                                        <ErrorSpan invalidfields={this.state.errors} for="companystate" />
                                    </div>
                                    <div className="formrow">
                                        <label>Zip <span className="required">*</span></label>
                                        <input required autoComplete="off" onChange={this.handleFieldChange} value={this.state.form.companyzip} type="text" id="txtZip" name="companyzip" />
                                        <ErrorSpan invalidfields={this.state.errors} for="companyzip" />
                                    </div>
                                    <div className="formrow">
                                        <label>Country <span className="required">*</span></label>
                                        <input required autoComplete="off" onChange={this.handleFieldChange}  value={this.state.form.companycountry} type="text" id="txtCountry" name="companycountry" />
                                        <ErrorSpan invalidfields={this.state.errors} for="companycountry" />
                                    </div>
                                </div>		
                                <div className="row two-col">
                                    <div className="formrow">
                                        <label>Name of Hiring Authority <span className="required">*</span></label>
                                        <input required autoComplete="off" onChange={this.handleFieldChange}  value={this.state.form.hiringauthority} type="text" id="txtHiringAuth" name="hiringauthority" />
                                        <ErrorSpan invalidfields={this.state.errors} for="hiringauthority" />
                                    </div>
                                    <div className="formrow">
                                        <label>Title of Hiring Authority <span className="required">*</span></label>
                                        <input required autoComplete="off" onChange={this.handleFieldChange} value={this.state.form.hiringauthoritytitle} type="text" id="txtHiringAuthTitle" name="hiringauthoritytitle" />
                                        <ErrorSpan invalidfields={this.state.errors} for="hiringauthoritytitle" />
                                    </div>
                                </div>
                                <div className="row three-col">
                                    <div className="formrow">
                                        <label>Office Phone <span className="required">*</span></label>
                                        <input required autoComplete="off" onChange={this.handleFieldChange} value={this.state.form.officephone} type="text" id="txtOfficePhone" name="officephone" />
                                        <ErrorSpan invalidfields={this.state.errors} for="officephone" />
                                    </div>
                                    <div className="formrow">
                                        <label>Cell Phone</label>
                                        <input autoComplete="off"  onChange={this.handleFieldChange} value={this.state.form.cellphone} type="text" id="txtCellPhone" name="cellphone" />
                                    </div>
                                    <div className="formrow">
                                        <label>Fax</label>
                                        <input autoComplete="off" onChange={this.handleFieldChange}  value={this.state.form.faxnumber} type="text" id="txtFax" name="faxnumber" />
                                    </div>
                                </div>		
                                <div className="formrow">
                                    <label>Email <span className="required">*</span></label>
                                    <input required value={this.state.form.email} onChange={this.handleFieldChange} autoComplete="off" type="email" id="txtEmail" name="email" />
                                    <ErrorSpan invalidfields={this.state.errors} for="email" msg="Must be a valid email" />
                                </div>		
                                <div className="formrow">
                                    <label>Company Description <span className="required">*</span></label>
                                    <textarea required value={this.state.form.companydescription} onChange={this.handleFieldChange} id="txtYourQualifications" name="companydescription"></textarea>
                                    <ErrorSpan invalidfields={this.state.errors} for="companydescription" />
                                    <small>*include number of full time employees, size of operation, company products/services, etc.</small>
                                </div>
                                
                                <div className="formrow">
                                    <label>Reason Position is Open <span className="required">*</span></label>
                                    <textarea required value={this.state.form.reasonforposition} onChange={this.handleFieldChange} id="reasonforposition" name="reasonforposition"></textarea>							
                                    <ErrorSpan invalidfields={this.state.errors} for="reasonforposition" />
                                </div>
                            </div>      
                        </section> : null }
                        {this.state.page == 1 ? 
                        <section id="joborderdetails_page">
                            <header>                    
                                <h1>Position Information</h1>   
                            </header>
                            <div className="formwrapper">
                                <div className="formrow">
                                    <label>Job Title <span className="required">*</span></label>
                                    <input required autoComplete="off" value={this.state.form.jobtitle} onChange={this.handleFieldChange} type="text" id="txtJobTitle" name="jobtitle" />
                                    <ErrorSpan invalidfields={this.state.errors} for="jobtitle" />
                                </div>
                                <div className="row two-col">
                                    <div className="formrow">
                                        <label>City <span className="required">*</span></label>
                                        <input required autoComplete="off" value={this.state.form.jobcity} onChange={this.handleFieldChange} type="text" id="txtCity" name="jobcity" />
                                        <ErrorSpan invalidfields={this.state.errors} for="jobcity" />
                                    </div>
                                    <div className="formrow">
                                        <label>State <span className="required">*</span></label>
                                        <input required autoComplete="off" value={this.state.form.jobstate} onChange={this.handleFieldChange} type="text" id="txtState" name="jobstate" />
                                        <ErrorSpan invalidfields={this.state.errors} for="jobstate" />
                                    </div>
                                </div>	
                                <div className="formrow">
                                    <label>Industry Type <span className="required">*</span></label>
                                    <input required autoComplete="off" value={this.state.form.industry} onChange={this.handleFieldChange} type="text" id="txtIndustry" name="industry" />
                                    <ErrorSpan invalidfields={this.state.errors} for="industry" />
                                </div>	
                                <div className="formrow">
                                    <label>Number of People Needed</label>
                                    <input autoComplete="off" value={this.state.form.peopleneeded} onChange={this.handleFieldChange} type="text" id="txtPeopleNeeded" name="peopleneeded" />
                                </div>	
                                <div className="formrow">
                                    <label>Position to be Filled By <span className="required">*</span></label>
                                    <input required autoComplete="off" value={this.state.form.positionneededby} onChange={this.handleFieldChange} type="text" id="txtPositionFilledBy" name="positionneededby" />
                                    <ErrorSpan invalidfields={this.state.errors} for="positionneededby" />
                                </div>
                                <div className="row two-col">
                                    <div className="formrow">
                                        <label>Starting Base Salary Range (Please provide high &amp; low range) <span className="required">*</span></label>
                                        <input required autoComplete="off" value={this.state.form.startingsalaryrange} onChange={this.handleFieldChange} type="text" id="txtStartingSalary" name="startingsalaryrange" />
                                        <ErrorSpan invalidfields={this.state.errors} for="startingsalaryrange" />
                                    </div>
                                    <div className="formrow">
                                        <label>Incentives (Commission, Bonus, Etc.) </label>
                                        <input autoComplete="off" value={this.state.form.incentives} onChange={this.handleFieldChange} type="text" id="txtIncentives" name="incentives" />
                                    </div>                                    
                                </div>		
                                <div className="formrow">
                                    <label>Total Estimated 1st Year Income <span className="required">*</span></label>
                                    <input required autoComplete="off" value={this.state.form.estimatedfirstyearincome} onChange={this.handleFieldChange} type="text" id="txtFirstYearIncome" name="estimatedfirstyearincome" />
                                    <ErrorSpan invalidfields={this.state.errors} for="estimatedfirstyearincome" msg="Required, must be a number" />
                                    <small>(ex: $30,000)</small>
                                </div>
                                <div className="formrow">
                                    <label>Benefits <span className="required">*</span></label>
                                    <textarea required value={this.state.form.benefits} onChange={this.handleFieldChange} data-bind="value: benefits" id="txtBenefits" name="benefits"></textarea>
                                    <ErrorSpan invalidfields={this.state.errors} for="benefits" />
                                    <small>(insurance, vacation, holidays, relocation package, etc)</small>							
                                </div>
                                <div className="formrow">
                                    <label>Qualifications <span className="required">*</span></label>
                                    <textarea required value={this.state.form.qualifications} onChange={this.handleFieldChange} id="txtYourQualifications" name="qualifications"></textarea>
                                    <ErrorSpan invalidfields={this.state.errors} for="qualifications" />
                                    <small>(years of experience &amp; education requirements, specific key requirements for position)</small>							
                                </div>
                                <div className="formrow">
                                    <label>Job Description <span className="required">*</span></label>
                                    <textarea required value={this.state.form.jobdescription} onChange={this.handleFieldChange} id="txtJobDesc" name="jobdescription"></textarea>
                                    <ErrorSpan invalidfields={this.state.errors} for="jobdescription" />
                                    <small>(specify what will be expected of employee)</small>							
                                </div>
                                
                                <div className="formrow">
                                    <label>How did you hear about our company?</label>
                                    <textarea value={this.state.form.source} onChange={this.handleFieldChange} id="txtSource" name="source"></textarea>
                                    <small>(Name of newspaper, publication, Friend, Internet source, etc.)</small>							
                                </div>
                                <div className="row two-col">                            
                                    <div className="formrow file">
                                        <label>Upload Job Description</label>
                                        <input onChange={this.handleFileChange} type="file" name="jobfile" />
                                    </div>
                                </div>
                            </div>
                            <div className="application_completion">
                                <h2>Submit Job Order</h2>
                                <p>							
                                    <a id="submit_application" onClick={this.submitJobOrder} className="button">Submit</a>
                                </p>
                            </div>
                        </section> : null }
                    </div>
                    <div id="application_controls">
                        <button onClick={this.prevPage} className="button btn_prev">Prev</button>
                        <button onClick={this.nextPage} className="button btn_next">Next</button>
                    </div> 
                </div>
            </div>
        )
    }
}

class ErrorSpan extends React.Component{    
    render(){        
        if(this.props.invalidfields.indexOf(this.props.for) != -1){            
            if(this.props.msg !== undefined){
                return(
                    <p className="form-input-hint">{this.props.msg}</p>
                )
            }else{
                return (
                    <p className="form-input-hint">Required</p>
                )
            }
        }else{
            return null
        }        
    }
}