import React from 'react';
import { render } from 'react-dom';

import Applications from './applications';
import JobOrders from './joborders';
import QuickApplications from './quickapp';
import EmailLogs from './emaillog';
import PCRStatusLogs from './pcrlog';

class WordpressPanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectedtab: 1,
            tabs: [
                {
                    name: "Applications",
                    index: 1
                },
                {
                    name: "Quick Applications",
                    index: 2
                },{
                    name: "Job Orders",
                    index: 3
                },{
                    name: "Email Log",
                    index: 4
                },{
                    name: "PCR Update Log",
                    index: 5
                }
            ]
        }
    }

    onTabSelect = (index) => {
        this.setState({
            selectedtab: index
        });
    }

    

    render(){
        return(
            <div id="hansen_admin">
                <h2 className="nav-tab-wrapper wp-clearfix">
                    {this.state.tabs.map((tab, index) => {
                        var classes = "nav-tab";
                        if(this.state.selectedtab == tab.index){
                            classes += " nav-tab-active";
                        }
                        return(
                            <a key={index} onClick={() => {this.onTabSelect(tab.index)}} className={classes}>{tab.name}</a>
                        )
                    })}                                
                </h2>
                {this.state.selectedtab == 1 ? <Applications /> : null}
                {this.state.selectedtab == 3 ? <JobOrders /> : null}
                {this.state.selectedtab == 2 ? <QuickApplications /> : null}
                {this.state.selectedtab == 4 ? <EmailLogs /> : null}
                {this.state.selectedtab == 5 ? <PCRStatusLogs /> : null}
                
            </div>            
        );
    }
}

if(document.getElementById("hansen_wordpresspanel") != null){
    render(<WordpressPanel />, document.getElementById("hansen_wordpresspanel"));
}