import React from 'react';
import datefns from 'date-fns';
import Api from './api';

export default class JobOrders extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();
        this.state = {
            searchterm: "",
            joborders: [],
            filteredjoborders: []
        };

        let now = new Date();
        let offset = now.getTimezoneOffset();
        this.timezoneoffset = offset / -60;
    }

    componentDidMount(){
        this.api.get('admin/joborders').then((res) => {
            this.setState({
                joborders: res.joborders
            });

            this.filterJobOrders();
        });
    }

    searchJobOrders = (e) => {
        this.filterJobOrders();
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

    filterJobOrders = () => {
        var filtered = [];

        if(this.state.searchterm != ""){
            this.state.joborders.forEach((joborder, index) => {
                var matches = false;

                if(joborder.companyname.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(joborder.hiringauthority.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(joborder.email.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(joborder.jobtitle.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(joborder.companycity.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(joborder.companystate.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(joborder.jobcity.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(joborder.jobstate.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                

                if(matches){
                    filtered.push(joborder);
                }
            });
        }else{
            filtered = this.state.joborders;
        }

        this.setState({
            filteredjoborders: filtered
        });
    }

    render(){
        return(
            <div id="hansen_admin_applications" style={{marginTop: "30px"}}>
                <p className="search-box">
                    <label className="screen-reader-text" htmlFor="post-search-input">Search Job Orders:</label>
                    <input type="search" id="post-search-input" onKeyPress={this.handleKeyPress} onChange={this.handleInputChange} name="searchterm" value={this.state.searchterm} />
                    <input onClick={this.searchJobOrders} type="submit" id="search-submit" className="button" value="Search Job Orders" />
                </p>
                <br/><br/><br/>                
                <table className="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th width="20%">Company</th>  
                            <th width="10%">Contact</th> 
                            <th width="10%">Office</th>                
                            <th>Email</th>   
                            <th width="20%">Job Title</th>                                         
                            <th width="10%">Location</th>                 
                            <th>Submitted At</th>                 
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredjoborders.map((joborder, index) => {
                            var submittedon = datefns.parse(joborder.created_at);
                            submittedon = datefns.addHours(submittedon, this.timezoneoffset);
                            return (
                                <tr key={index}>
                                    <td>{joborder.companyname}</td>
                                    <td>{joborder.hiringauthority}</td>
                                    <td>{joborder.officephone}</td>
                                    <td>{joborder.email}</td>
                                    <td>{joborder.jobtitle}</td>
                                    <td>{joborder.jobcity}, {joborder.jobstate}</td>
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