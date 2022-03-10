import React from 'react';
import datefns from 'date-fns';
import Api from './api';

export default class QuickApplications extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();
        this.state = {
            searchterm: "",
            applicants: [],
            filteredapplications: []
        };

        let now = new Date();
        let offset = now.getTimezoneOffset();
        this.timezoneoffset = offset / -60;
    }

    componentDidMount(){
        this.api.get('admin/quickapplicants').then((res) => {
            this.setState({
                applicants: res.quickapps
            });

            this.filterApplicants();
        });
    }

    searchAppilcations = (e) => {
        this.filterApplicants();
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

    render(){
        return(
            <div id="hansen_admin_applications" style={{marginTop: "30px"}}>
                <p className="search-box">
                    <label className="screen-reader-text" htmlFor="post-search-input">Search Pages:</label>
                    <input type="search" id="post-search-input" onKeyPress={this.handleKeyPress} onChange={this.handleInputChange} name="searchterm" value={this.state.searchterm} />
                    <input onClick={this.searchAppilcations} type="submit" id="search-submit" className="button" value="Search Applications" />
                </p>
                <br/><br/><br/>                
                <table className="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <td width="10%">First</td>
                            <td width="8%">Middle</td>
                            <td width="10%">Last</td>
                            <td>Email</td>
                            <td>Submitted On</td>                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredapplications.map((applicant, index) => {                            
                            var submittedon = datefns.parse(applicant.updated_at);
                            submittedon = datefns.addHours(submittedon, this.timezoneoffset);
                            return (
                                <tr key={index}>
                                    <td>{applicant.firstname}</td>
                                    <td>{applicant.middlename}</td>
                                    <td>{applicant.lastname}</td>
                                    <td>{applicant.email}</td>
                                    <td>{datefns.format(submittedon, "MM/DD/YYYY h:mmA")}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>            
        );
    }
}