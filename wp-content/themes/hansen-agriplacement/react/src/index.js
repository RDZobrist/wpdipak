import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';

import Registration from './registration';
import QuickApply from './quickapply';
import JobOrder from './joborder';
import Login from './login';
import Account from './account';
import AccountPanel from './accountpanel';
import Application from './application';
import Skillsheet from './skillsheet';

if(document.getElementById("loginpanel") != null){
    render(<Login />, document.getElementById("loginpanel"));
}

if(document.getElementById("fullloginpanel") != null){
    render(<Login />, document.getElementById("fullloginpanel"));
}

if(document.getElementById("hansenapp_registration") != null){
    render(<Registration />, document.getElementById("hansenapp_registration"));
}

if(document.getElementById("hansenapp_quickapply") != null){
    render(<QuickApply />, document.getElementById("hansenapp_quickapply"));
}

if(document.getElementById("hansenapp_myaccount") != null){
    render(<Account />, document.getElementById("hansenapp_myaccount"));
}

if(document.getElementById("hansenapp_application") != null){
    render(<Application />, document.getElementById("hansenapp_application"));
}

if(document.getElementById("hansenapp_skillsheet") != null){
    render(<Skillsheet />, document.getElementById("hansenapp_skillsheet"));
}

if(document.getElementById("hansenapp_joborder") != null){
    render(<JobOrder />, document.getElementById("hansenapp_joborder"));
}

if(document.getElementById("accountpanel")!= null){
    render(<AccountPanel />, document.getElementById("accountpanel"));
}




