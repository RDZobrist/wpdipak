import React from 'react';
import Api from './api';
import Cookies from 'js-cookie';

export default class AccountPanel extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();

        this.state = {
            app: null,
            skillsheets: []
        }
    }

    componentDidMount(){
        this.api.get('account/auth').then((res) => {            
            var fullname = res.user.firstname + " " + res.user.lastname;
            document.getElementById("accountname").innerHTML = fullname;
            this.setState({
                app: res.application,
                skillsheets: res.skillsheets                
            });            
        }).catch((err) => {
            if(err.response.status == 401){                
                Cookies.remove("hansentoken");
                window.location.href = "/";
            }            
        });
    }

    logout(){
        Cookies.remove("hansentoken");
        window.location.href = "/";
    }


    render(){
        return (
            <div id="accountdashboard">
                <section className="dashboardsection">
                    <h1>My Application</h1>
                    <div id="application_status">
                        <a href="/application">
                            <img src="/wp-content/themes/hansen-agriplacement/images/application_icon.svg" />
                            {this.state.app == null ?
                                <div className="application_details">You haven't started your application.  Click here to begin.</div>
                            :
                                <div className="application_details">
                                    Application Status <span>{this.state.app.completion}%</span>
                                    <div id="app_progressbar" className="progressbartrack">
                                        <div style={{width: this.state.app.completion + "%"}} className="progressbar"></div>
                                    </div>
                                </div>
                            }                            
                            <span className="clear"></span>
                        </a>
                    </div>
                </section>
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
                    {this.state.skillsheets.length == 0 ? <span className='noresults'>No skillsheets have been assigned to you.</span>: null }
                </section>
                <div id="account_controls">
                    <a className="button altbutton" href="/my-account">My Account</a>
                    <a onClick={this.logout} id="btn_logout" className="button">Logout</a>                    
                </div>
            </div>
        )
    }
}