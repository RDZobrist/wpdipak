import React from 'react';
import datefns from 'date-fns';
import Api from './api';

export default class PCRStatusLogs extends React.Component{
    constructor(props){
        super(props);

        this.api = new Api();
        this.state = {
            searchterm: "",
            pcrlogs: [],            
        };

        let now = new Date();
        let offset = now.getTimezoneOffset();
        this.timezoneoffset = offset / -60;
    }

    componentDidMount(){
        this.api.get('admin/pcrlogs').then((res) => {
            this.setState({
                pcrlogs: res.pcrlogs
            });                      
        });
    }    

    

    render(){
        return(
            <div id="hansen_admin_emails" style={{marginTop: "30px"}}>                
                <br/><br/><br/>
                <table className="wp-list-table widefat fixed striped">
                    <thead>
                        <tr> 
                            <th width="20%">Status</th> 
                            <th width="10%">Updated At</th>                                                         
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pcrlogs.map((pcrlog, index) => {
                            var createdat = datefns.parse(pcrlog.created_at);
                            createdat = datefns.addHours(createdat, this.timezoneoffset);
                            return (
                                <tr key={index}>
                                    <td>{pcrlog.status}</td>                                    
                                    <td>{datefns.format(createdat, "MM/DD/YYYY h:mmA")}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}