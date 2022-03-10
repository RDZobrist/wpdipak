import React from 'react';
import Api from './api';
import validatejs from 'validate.js';
import datefns from 'date-fns';
import alertify from 'alertify.js';




export default class Account extends React.Component{
    constructor(props){
        super(props);
        
        this.api = new Api();
        this.state = {
            app: null,
            skillsheets: [],
            user: {},
            appliedjobs: [],
            pendingjobs: [],
            loading: true
        }

        this.constraints = {
            "email": {
                presence: { allowEmpty: false },
                email: true
            }
        }
    }

    componentDidMount(){
        this.getAccountData();
    }

    getAccountData(){
        this.api.get('account/auth').then((res) => {  
            var appliedjobs = [];
            var pendingjobs = [];
            res.appliedjobs.forEach((job, index) => {
                if(job.applied == 1){
                    appliedjobs.push(job);
                }else{
                    pendingjobs.push(job);
                }
            });            

            this.setState({
                app: res.application,
                skillsheets: res.skillsheets,
                user: res.user,
                appliedjobs: appliedjobs,
                pendingjobs: pendingjobs,
                loading: false           

            });            
        });
    }

    removePendingJob = (job) => {
        console.log(job);
        var message = "Are you sure you want to delete Job " + job.job_position_id + ": " + job.jobtitle + " from your application?";
        alertify.confirm(message, () => {            
            this.api.post('jobs/unapply', {jobappid: job.id}).then((res) => {
                this.getAccountData();
            })
        }, () => {
        })
    }

    updateEmailAddress = () => {
        var email = prompt("Please enter your new email address:");
        if(email !== undefined && email != ""){
            var errors = validatejs({email: email}, this.constraints);
            if(errors !== undefined){
                alert(errors.email);
            }else{
                this.api.post("account/updateEmail", {email: email}).then((res) => {
                    alertify.alert("Email address has been updated.");
                }).catch((err) => {                    
                    alert(err.response.data.message)
                });
            }
        }
    }

    render(){
        return (
            <div id="myaccount">
                {this.state.loading ? <div className="loading"></div> : null}
                <section className="dashboardsection" id="mydetails">
                    <h1>My Details</h1>
                    {this.state.app != null ?
                        <div id="applicant_details">
                            <strong id="acct_fullname">{this.state.user.firstname + " " + this.state.user.lastname}</strong><br />
                            <div id="acct_address">{this.state.user.address}<br/>{this.state.user.city}, {this.state.user.state} {this.state.user.zipcode}</div><br />
                            <div id="acct_contactinfo">
                                Email: {this.state.user.email}<br/>
                                Cell: {this.state.user.mobile}<br/>
                                Phone: {this.state.user.phone}
                            </div>
                            <br/>
                            <a className="button" onClick={this.updateEmailAddress} id="updateEmailBtn">Update my Email Address</a>
                        </div> : null 
                    }
                    {this.state.app == null ?
                        <div id="application_newapp">
                            <a href="/application">            
                                <i className="fa fa-check-square-o"></i><strong>You haven't started your application!</strong><span>Click here to get started</span>
                            </a>
                        </div>  : null 
                    }     
                </section>
                {this.state.app != null ?
                    <section className="dashboardsection" id="myapplication_section">
                        <h1>My Application</h1>
                        <div id="application_status">
                            <a href="/application">
                                <img src="/wp-content/themes/hansen-agriplacement/images/application_icon.svg" />
                                <div className="application_details">
                                    Application Status <span>{this.state.app.completion}%</span>
                                    <div id="app_progressbar" className="progressbartrack">
                                        <div className="progressbar" style={{width: this.state.app.completion + "%"}}></div>
                                    </div>
                                </div>
                                <span className="clear"></span>
                            </a>
                        </div>
                    </section> : null 
                }

                <section className="dashboardsection">
                    <h1>My Skills Sheets</h1>
                    {this.state.skillsheets.map((sheet, index) => {                        
                        return(
                            <div key={index} className="skillsheet">
                                <a href={"/skillsheet?sid=" + sheet.id}>
                                    <img src="/wp-content/themes/hansen-agriplacement/images/skillsheet_icon.svg" />
                                    <div className="skillsheet_detail">
                                        {sheet.type} Skillsheet <span>{sheet.completion}%</span>
                                        <div className="progressbartrack"><div style={{width: sheet.completion + "%"}} className="progressbar"></div></div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}                   
                </section>
                <section className="dashboardsection" id="appliedjobs">
                    <h1>Current Jobs I'm Applying To</h1>
                    <p>These are a list of jobs that you are applying to, but have not yet submitted. To submit your application for these jobs, simply review and complete your application. </p>
                    <table>
                        <thead>            
                            <tr>
                                <th>ID</th>
                                <th>Title</th>                   
                                <th></th>                    
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pendingjobs.map((job, index) => {                                
                                return (
                                    <tr key={index}>
                                        <td>{job.job_position_id}</td>
                                        <td>{job.jobtitle}</td>
                                        <td><a onClick={() => {this.removePendingJob(job)}} className="btn_removejobapp">Remove</a></td>
                                    </tr>
                                )
                            })}  
                            {this.state.pendingjobs.length == 0 ?
                                <tr>
                                    <td colSpan="3">No jobs found.</td>
                                </tr>
                                : null
                            }                     
                        </tbody>
                    </table>       
                </section>
                
                <section className="dashboardsection" id="pastjobs">
                    <h1>Jobs I've Applied To</h1>
                    <p>These are a list of jobs you have applied to in the past.</p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Applied On</th>                                    
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appliedjobs.map((job, index) => {                                
                                return (
                                    <tr key={index}>
                                        <td>{job.job_position_id}</td>
                                        <td>{job.jobtitle}</td>
                                        <td>{datefns.format(datefns.parse(job.appliedon_date), "MM-DD-YYYY - h:mma")}</td>
                                    </tr>
                                )
                            })}  
                            {this.state.appliedjobs.length == 0 ?
                                <tr>
                                    <td colSpan="3">No jobs found.</td>
                                </tr>
                                : null
                            }                       
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}