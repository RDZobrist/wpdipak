import React from 'react';
import datefns from 'date-fns';

import Api from './api';

export default class Applications extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();
        this.state = {
            searchterm: "",
            applicants: [],
            totalapplicants: 0,
            pages: 0,
            currentpage: 0,
            filteredapplications: [],
            editapplicant: null,
            loading: true            
        };

        let now = new Date();
        let offset = now.getTimezoneOffset();
        this.timezoneoffset = offset / -60;

    }

    componentDidMount(){
        this.getApplicantData(this.state.currentpage);
    }

    getApplicantData = (currentpage) => {
        var offset = 20 * currentpage;
        this.setState({loading: true});
        this.api.get('admin/applicants?offset=' + offset + '&count=20&search=' + this.state.searchterm).then((res) => {
            jQuery("html, body").animate({ scrollTop: jQuery('#hansen_admin').offset().top}, 100);
            this.setState({
                applicants: res.applicants,
                totalapplicants: res.totalapplicants,
                pages: Math.round((res.totalapplicants / 20)),
                currentpage: currentpage,
                loading: false
            });
        });
    }

    nextPage = () => {
        var nextpage = this.state.currentpage + 1;
        if(nextpage < this.state.pages){            
            this.getApplicantData(nextpage);
        }
    }

    prevPage = () => {
        var nextpage = this.state.currentpage - 1;
        if(nextpage >= 0){
            this.getApplicantData(nextpage);
        }
    }

    searchAppilcations = (e) => {
        this.getApplicantData(0);
    }

    handleInputChange = (e) => {
        var state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state)
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter"){
            this.searchAppilcations();
        }
    }

    onEditApplicantClicked = (index) => {
        var applicant = this.state.applicants[index];

        this.setState({
            editapplicant: applicant
        });
    }

    onDeleteApplicantClicked = (index) => {
        var applicant = this.state.applicants[index];

        if(confirm("Are you sure you want to delete this applicant:\n" + applicant.firstname + " " + applicant.lastname + "?")){
            this.api.delete("admin/applicants/" + applicant.id).then((res) => {
                this.getApplicantData(this.state.currentpage);
            }).catch((error) => {
                this.setState({loading: false});
                alert("There was an issue deleting this applicant.");
            })
        }
    }

    onEditApplicantSave = (applicant) => {
        this.api.post("admin/applicants/" + applicant.id, applicant).then((res) => {
            this.onEditApplicantCancel();

            this.api.get('admin/applicants').then((res) => {
                this.setState({
                    applicants: res.applicants
                });
            });
        }).catch((error) => {
            alert("There was a problem saving the applicant: " + error);
        });
    }

    onEditApplicantCancel = () => {
        this.setState({
            editapplicant: null
        });
    }

    onAccountPasswordReset = (index) => {
        var applicant = this.state.applicants[index];
        this.setState({loading: true});
        this.api.post('account/reset', {email: applicant.email}).then((res) => {
            this.setState({loading: false});
            if(res.status == "OK"){
                alert("Password reset email has been sent to this user.");
            }
        }).catch((error) => {
            this.setState({loading: false});
            alert("There was a problem generating the password reset email.");
        });
    }

    filterApplicants = () => {
        var filtered = [];

        if(this.state.searchterm != ""){
            this.state.applicants.forEach((app, index) => {
                var matches = false;

                if(app.firstname.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(app.lastname.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(app.email.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(matches){
                    filtered.push(app);
                }
            });
        }else{
            filtered = this.state.applicants;
        }

        this.setState({
            filteredapplications: filtered
        });
    }

    toggleSkillsheetType = (type, userid) => {
        this.api.post('admin/assignskillsheet', {
            type: type,
            userid: userid
        }).then((res) => {
            this.getApplicantData(this.state.currentpage);
        });
    }

    render(){
        return(
            <div id="hansen_admin_applications" style={{marginTop: "30px"}}>
                {this.state.loading ? <div className='loading'></div>: null}
                <p className="search-box">
                    <label className="screen-reader-text" htmlFor="post-search-input">Search Pages:</label>
                    <input type="search" id="post-search-input" onKeyPress={this.handleKeyPress} onChange={this.handleInputChange} name="searchterm" value={this.state.searchterm} />
                    <input onClick={this.searchAppilcations} type="submit" id="search-submit" className="button" value="Search Applications" />
                </p>
                <br/><br/><br/>                
                <table className="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <td width="5%">ID</td>
                            <td width="15%">Fullname</td>                            
                            <td width="10%">Username</td>
                            <td width="19%">Email</td>                            
                            <td width="12%">Application</td>
                            <td width="15%">Skillsheets</td>    
                            <td width="15%">Applied On</td>    
                            <td width="10%">Last Login</td>
                            <td width="10%">Updated At</td>                        
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.applicants.map((applicant, index) => {
                            var agskillsheet = null;
                            var swineskillsheet = null;
                            var dairyskillsheet = null;

                            applicant.skillsheets.map((skillsheet) => {
                                if(skillsheet.type == "Ag"){
                                    agskillsheet = skillsheet;
                                }

                                if(skillsheet.type == "Swine"){
                                    swineskillsheet = skillsheet;
                                }

                                if(skillsheet.type == "Dairy"){
                                    dairyskillsheet = skillsheet;
                                }
                            });
                            var lastlogindate = null;
                            if(applicant.lastlogin_date != null){
                                lastlogindate = datefns.parse(applicant.lastlogin_date);
                                lastlogindate = datefns.addHours(lastlogindate, this.timezoneoffset);
                            }                            

                            var updatedatdate = null;
                            if(applicant.application != null && applicant.application.updated_at){
                                updatedatdate = datefns.parse(applicant.application.updated_at);
                                updatedatdate = datefns.addHours(updatedatdate, this.timezoneoffset);
                            }     

                            var completeddate = null;
                            if (applicant.application != null && applicant.application.completed_date) {
                                completeddate = datefns.parse(applicant.application.completed_date);
                                completeddate = datefns.addHours(completeddate, this.timezoneoffset);
                            }

                            return (
                                <tr key={index}>    
                                    <td>
                                        {applicant.id}
                                    </td>
                                    <td>
                                        {applicant.firstname} {applicant.middlename} {applicant.lastname}<br/>
                                        <a onClick={() => {this.onEditApplicantClicked(index)}}>Edit Applicant</a> | <a style={{color: "#a00"}} onClick={() => { this.onDeleteApplicantClicked(index) }}>Delete</a>
                                    </td>
                                   
                                    <td>
                                        {applicant.username}
                                    </td>
                                    <td>
                                        {applicant.email}<br/>
                                        <a onClick={() => {this.onAccountPasswordReset(index)}}>Send Password Reset</a>
                                    </td>                                    
                                    {applicant.application ? 
                                        <td>                                        
                                            <strong>Status: {applicant.application.completion}%</strong><br/>                                        
                                            {applicant.application.completed ? <strong>Submitted</strong> : <strong>Unsubmitted</strong>}<br/>
                                            <a target="_blank" href={hansenapi + "/api/v1/admin/applicants/"+ applicant.id}>View Application</a>
                                        </td> :
                                        <td>No Application Started</td>                                        
                                    }    
                                    <td>
                                        
                                        Ag Skillsheet: {agskillsheet != null ?
                                            <span><strong>Status: {agskillsheet.completion}%</strong><br/><a style={{color: "#a00"}} onClick={() => { this.toggleSkillsheetType("Ag", applicant.id) }}>Disable</a> - <a href={hansenapi + "/api/v1/admin/downloadskillsheet/" + agskillsheet.id}>View</a><hr/></span>
                                            : <a onClick={() => { this.toggleSkillsheetType("Ag", applicant.id) }}>Enable<br/></a>
                                        }
                                        

                                        Swine Skillsheet: {swineskillsheet != null ?
                                            <span><strong>Status: {swineskillsheet.completion}%</strong><br/><a style={{color: "#a00"}} onClick={() => { this.toggleSkillsheetType("Swine", applicant.id) }}>Disable</a> - <a href={hansenapi + "/api/v1/admin/downloadskillsheet/" + swineskillsheet.id}>View</a><hr /></span>
                                            : <a onClick={() => { this.toggleSkillsheetType("Swine", applicant.id) }}>Enable<br/></a>
                                        }

                                        Dairy Skillsheet: {dairyskillsheet != null ?
                                            <span><strong>Status: {dairyskillsheet.completion}%</strong><br/><a style={{color: "#a00"}} onClick={() => { this.toggleSkillsheetType("Dairy", applicant.id) }}>Disable</a> - <a href={hansenapi + "/api/v1/admin/downloadskillsheet/" + dairyskillsheet.id}>View</a><hr/></span>
                                            : <a onClick={() => { this.toggleSkillsheetType("Dairy", applicant.id) }}>Enable<br/></a>
                                        }
                                        
                                    </td>
                                    <td>{completeddate == null ? <span>Never</span> : <span>{datefns.format(completeddate, "MM/DD/YYYY h:mmA")}</span>}</td>
                                    <td>{lastlogindate == null ? <span>Never</span> : <span>{datefns.format(lastlogindate, "MM/DD/YYYY h:mmA")}</span>}</td>
                                    <td>{updatedatdate == null ? <span>Never</span> : <span>{datefns.format(updatedatdate, "MM/DD/YYYY h:mmA")}</span>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="tablenav bottom">
                    <div className="tablenav-pages">
                        <span className="displaying-num">{this.state.totalapplicants} items</span>
                        <span className="pagination-links">
                            <span className="tablenav-pages-navspan" aria-hidden="true">«</span>
                            <a className="prev-page" onClick={this.prevPage}>
                                <span className="screen-reader-text">Previous page</span>
                                <span aria-hidden="true">‹</span>
                            </a>
                            <span className="screen-reader-text">Current Page</span>
                            <span id="table-paging" className="paging-input">
                                <span className="tablenav-paging-text">{this.state.currentpage + 1} of
                                    <span className="total-pages"> {this.state.pages}</span>
                                </span>
                            </span>
                            <a className="next-page" onClick={this.nextPage}>
                                <span className="screen-reader-text">Next page</span>
                                <span aria-hidden="true">›</span>
                            </a>
                            <span className="tablenav-pages-navspan" aria-hidden="true">»</span>
                        </span>
                    </div>
                    <br className="clear" />
                </div>
                {this.state.editapplicant != null ? <ApplicantEditor applicant={this.state.editapplicant} save={this.onEditApplicantSave} cancel={this.onEditApplicantCancel} /> : null}
            </div>            
        );
    }
}

class ApplicantEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            applicant: props.applicant,
            savedisabled: false
        }
    }

    handleInputChange = (e) => {
        var state = this.state;        
        state.applicant[e.target.name] = e.target.value;
        state.savedisabled = false;

        if(state.applicant.firstname == "" || state.applicant.lastname == "" || state.applicant.email == ""){
            state.savedisabled = true;
        }
        this.setState(state)
    }

    saveApplicant = () => {
        this.props.save(this.state.applicant);
    }

    render(){
        return(
            <div id="applicantEditor" className="modal">
                <div className="modalcontent">
                    <div className="modaltitle">
                        <div className="titlecontent">Editing Applicant</div>
                        <button onClick={this.props.cancel} className="modalclosebtn"><i className="fi-x"></i></button>
                    </div>
                    <div className="modaldetails">
                        <div className="formrow">
                            <div width="30%" className="field">
                                <label>First Name</label><br/>
                                <input value={this.state.applicant.firstname} name="firstname" onChange={this.handleInputChange} type='text' />    
                            </div>   
                            <div width="30%" className="field">
                                <label>Middle Name</label><br/>
                                <input value={this.state.applicant.middlename} name="middlename" onChange={this.handleInputChange} type='text' />    
                            </div> 
                            <div width="30%" className="field">
                                <label>Last Name</label><br/>
                                <input value={this.state.applicant.lastname} name="lastname" onChange={this.handleInputChange} type='text' />    
                            </div>  
                        </div>  
                        <div className="formrow">
                            <div width="100%" className="field">
                                <label>Email Address</label><br/>
                                <input value={this.state.applicant.email} name="email" onChange={this.handleInputChange} type='text' />    
                            </div>
                        </div>
                        <div className="formrow">
                            <div className="field">
                                <label>Address</label><br/>
                                <input value={this.state.applicant.address} name="address" onChange={this.handleInputChange} type='text' />    
                            </div>   
                        </div>
                        <div className="formrow">
                            <div className="field">
                                <label>City</label><br/>
                                <input value={this.state.applicant.city} name="city" onChange={this.handleInputChange} type='text' />    
                            </div> 
                            <div className="field">
                                <label>State</label><br/>
                                <input value={this.state.applicant.state} name="state" onChange={this.handleInputChange} type='text' />    
                            </div>  
                            <div className="field">
                                <label>Zipcode</label><br/>
                                <input value={this.state.applicant.zipcode} name="zipcode" onChange={this.handleInputChange} type='text' />    
                            </div>  
                        </div> 
                        <div className="formrow">
                            <div className="field">
                                <label>Phone</label><br/>
                                <input value={this.state.applicant.phone} name="phone" onChange={this.handleInputChange} type='text' />    
                            </div> 
                            <div className="field">
                                <label>Mobile</label><br/>
                                <input value={this.state.applicant.mobile} name="mobile" onChange={this.handleInputChange} type='text' />    
                            </div>  
                        </div>
                    </div>
                    <div className="submitbox">
                        <div className="primarybutton">
                            <button disabled={this.state.savedisabled} onClick={this.saveApplicant} className="button button-primary">Save Applicant</button>
                        </div>
                    </div>
                </div>            
            </div>
        )
    }
}