import React from 'react';
import datefns from 'date-fns';
import Api from './api';

export default class EmailLogs extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();
        this.state = {
            searchterm: "",
            emaillogs: [],
            filteredemaillogs: []
        };

        let now = new Date();
        let offset = now.getTimezoneOffset();
        this.timezoneoffset = offset / -60;
    }

    componentDidMount(){
        this.api.get('admin/emaillogs').then((res) => {
            this.setState({
                emaillogs: res.emaillogs
            });
            this.filterEmailLogs();            
        });
    }

    searchEmailLogs = (e) => {
        this.filterEmailLogs();
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

    filterEmailLogs = () => {
        var filtered = [];
        
        if(this.state.searchterm != ""){
            this.state.emaillogs.forEach((emaillog, index) => {
                var matches = false;

                if(emaillog.to_email.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(emaillog.subject.indexOf(this.state.searchterm) != -1){
                    matches = true;
                }

                if(matches){
                    filtered.push(emaillog);
                }
            });
        }else{
            filtered = this.state.emaillogs;
        }

        this.setState({
            filteredemaillogs: filtered
        });
    }

    render(){
        return(
            <div id="hansen_admin_emails" style={{marginTop: "30px"}}>
                <p className="search-box">
                    <label className="screen-reader-text" htmlFor="post-search-input">Search Email Logs:</label>
                    <input type="search" id="post-search-input" onKeyPress={this.handleKeyPress} onChange={this.handleInputChange} name="searchterm" value={this.state.searchterm} />
                    <input onClick={this.searchEmailLogs} type="submit" id="search-submit" className="button" value="Search Email Logs" />
                </p>
                <br/><br/><br/>
                <table className="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th width="20%">To</th>  
                            <th width="20%">Subject</th> 
                            <th width="10%">Sent At</th>                                                         
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredemaillogs.map((emaillog, index) => {
                            var sentondate = null;
                            if(emaillog.sent_on != null){
                                sentondate = datefns.parse(emaillog.sent_on);
                                sentondate = datefns.addHours(sentondate, this.timezoneoffset);
                            }
                            
                            return (
                                <tr key={index}>
                                    <td>{emaillog.to_email}</td>
                                    <td>{emaillog.subject}</td>
                                    <td>{sentondate ? datefns.format(sentondate, "MM/DD/YYYY h:mmA") : "Never Sent" }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}