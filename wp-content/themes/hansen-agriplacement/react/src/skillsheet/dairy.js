import React from 'react';
import validatejs from 'validate.js';

import RadioGroup from './radiogroup';

export default class DairySkillsheet extends React.Component{
    constructor(props){
        super(props);
        this.totalpages = 4;

        this.formfields_vetpractices = [
            {field: 'vet_iv', label: '"IV"', type: 'radio' },
            {field: 'vet_iminjection', label: '"IM" Injection', type: 'radio' },
            {field: 'vet_subqinjection', label: '"Sub-Q" Injection', type: 'radio' },
            {field: 'vet_uterineinfusions', label: 'Uterine Infusions', type: 'radio' },
            {field: 'vet_replaceuterus', label: 'Replace Uterus', type: 'radio' },
            {field: 'vet_cleanuterus', label: 'Clean Uterus', type: 'radio' },
            {field: 'vet_correcthernias', label: 'Correct Hernias', type: 'radio' },
            {field: 'vet_diagnosemastitis', label: 'Diagnose Mastitis', type: 'radio' },
            {field: 'vet_treatmastitis', label: 'Treat Mastitis', type: 'radio' },
            {field: 'vet_diagnosepneumonia', label: 'Diagnose Pneumonia', type: 'radio' },
            {field: 'vet_treatpneumonia', label: 'Treat Pneumonia', type: 'radio' },
            {field: 'vet_diagnosemilkfever', label: 'Diagnose Milk Fever', type: 'radio' },
            {field: 'vet_treatmilkfever', label: 'Treat Milk Fever', type: 'radio' },
            {field: 'vet_diagnoseketosis', label: 'Diagnose Ketosis', type: 'radio' },
            {field: 'vet_treatketosis', label: 'Treat Ketosis', type: 'radio' },
            {field: 'vet_diagnosescours', label: 'Diagnose Scours', type: 'radio' },
            {field: 'vet_treatscours', label: 'Treat Scours', type: 'radio' },
            {field: 'vet_hooftrimming', label: 'Hoof Trimming', type: 'radio' },
            {field: 'vet_castrate', label: 'Castrate', type: 'radio' },
            {field: 'vet_castratemethod', label: 'Method', type: 'text', relation: 'top' },
            {field: 'vet_dehorning', label: 'Dehorning', type: 'radio' },
            {field: 'vet_dehorningmethod', label: 'Method', type: 'text', relation: 'top' },
            {field: 'vet_pregcheck', label: 'Preg Check', type: 'radio' },
            {field: 'vet_pregcheckmethod', label: 'Method', type: 'text', relation: 'top' },
            {field: 'vet_pregcheckdays', label: 'Number of Days able to detect', type: 'text', relation: 'top' },
            {field: 'vet_diagnoserightda', label: 'Diagnose Right DA', type: 'radio' },
            {field: 'vet_treatrightdamethod', label: 'Method', type: 'text', relation: 'top' },
            {field: 'vet_diagnoseleftda', label: 'Diagnose Left DA', type: 'radio' },
            {field: 'vet_treatleftdamethod', label: 'Method', type: 'text', relation: 'top' },
            {field: 'vet_drenching', label: 'Drenching', type: 'radio' },
            {field: 'vet_delivernormalcalf', label: 'Deliver Normal Calf', type: 'radio' },
            {field: 'vet_usecalfjack', label: 'Use "Calf Jack"', type: 'radio' },
            {field: 'vet_deliverbreachcalf', label: 'Deliver Breech Calf', type: 'radio' },
            {field: 'vet_csection', label: 'C-Section', type: 'radio' },
        ];

        this.formfields_reposkills = [
            {field: 'repro_heatdetection', label: 'Heat Detection', type: 'radio'},
            {field: 'repro_aibreeding', label: 'A.I. Breeding', type: 'radio'},
            {field: 'repro_timedbreeding', label: 'Timed Breeding Program', type: 'radio'},
            {field: 'repro_selectedcowmatings', label: 'Select Cow Matings', type: 'radio'},
            {field: 'repro_collectembryo', label: 'Collect Embryos', type: 'radio'},
            {field: 'repro_implantembryo', label: 'Implant Embryo', type: 'radio'}
        ];

        this.formfields_management = [
            {field: 'mgmnt_employeemanagement', label: 'Employee Management', type: 'radio'},
            {field: 'mgmnt_organizeherdhealth', label: 'Organize Herd Health', type: 'radio'},
            {field: 'mgmnt_readdhiarecords', label: 'Read DHIA Records', type: 'radio'},
            {field: 'mgmnt_inventorycontrol', label: 'Inventory Control', type: 'radio'},
            {field: 'mgmnt_purchasingsupplies', label: 'Purchasing Supplies', type: 'radio'},
            {field: 'mgmnt_financialresponsibilities', label: 'Financial Responsibilities', type: 'radio'},
        ];

        this.formfields_nutrition = [
            {field: 'nutri_feedcalves', label: 'Feed Calves', type: 'radio'},
            {field: 'nutri_feedcows', label: 'Feed Cows', type: 'radio'},
            {field: 'nutri_feedtmr', label: 'Feed TMR', type: 'radio'},
            {field: 'nutri_readfeedbunks', label: 'Read Feed Bunks', type: 'radio'},
            {field: 'nutri_balancefeedration', label: 'Balance Feed Ration', type: 'radio'},
            {field: 'nutri_priceandbuyfeeds', label: 'Price and Buy Feeds', type: 'radio'},
        ];

        this.formfields_misc = [
            {field: 'misc_prepcattleforshow', label: 'Prep Cattle for Show', type: 'radio'},
            {field: 'misc_merchcattle', label: 'Merchandise Cattle', type: 'radio'},
            {field: 'misc_readpedigrees', label: 'Read Pedigrees', type: 'radio'},
            {field: 'misc_readsalescatalog', label: 'Read Sale Catalog', type: 'radio'},
            {field: 'misc_completeregpapers', label: 'Complete Reg. Papers', type: 'radio'},
            {field: 'misc_takesterilesample', label: 'Take Sterile Sample', type: 'radio'},
            {field: 'misc_clippingudders', label: 'Clipping Udders', type: 'radio'},
            {field: 'misc_eartag', label: 'Ear Tag', type: 'radio'},
            {field: 'misc_rotationalgrazing', label: 'Rotational Grazing', type: 'radio'},
            {field: 'misc_organicfarming', label: 'Organic Farming', type: 'radio'},
            {field: 'misc_maternitybarn', label: 'Maternity Barn', type: 'radio'},
            {field: 'misc_calfraising', label: 'Calf Raising', type: 'radio'},
            {field: 'misc_registeredcowexperience', label: 'Registered Cow Experience', type: 'yes,no'},
            {field: 'misc_foreignlanguage', label: 'Foreign Language', type: 'yes,no'},
            {field: 'misc_foreignlanguagefluency', label: 'Foreign Language Fluency', type: 'basic,fluent', relation: 'top'},
            {field: 'misc_foreignlanguagename', label: 'What Language?', type: 'text', relation: 'top'},
        ];

        this.formfields_equip = [
            {field: 'equip_choretractor', label: 'Chore Tractor',type: 'radio'},
            {field: 'equip_largefieldtractor', label: 'Large Field Tractor',type: 'radio'},
            {field: 'equip_tracklayingtractor', label: 'Track Laying Tractor',type: 'radio'},
            {field: 'equip_articulatingtractor', label: 'Articulating Tractor',type: 'radio'},
            {field: 'equip_4wdtractor', label: '4-WD Tractor',type: 'radio'},
            {field: 'equip_chiselplow', label: 'Chisel Plow',type: 'radio'},
            {field: 'equip_moldboardplow', label: 'Moldboard Plow',type: 'radio'},
            {field: 'equip_disk', label: 'Disk',type: 'radio'},
            {field: 'equip_planter', label: 'Planter',type: 'radio'},
            {field: 'equip_sprayer', label: 'Sprayer',type: 'radio'},
            {field: 'equip_rowcropcultivator', label: 'Row Crop Cultivator',type: 'radio'},
            {field: 'equip_largetruck', label: 'Large Truck',type: 'radio'},
            {field: 'equip_semitractortrailer', label: 'Semi-Tractor/Trailer',type: 'radio'},
        ];

        this.formfields_forage = [
            {field: 'forage_mowerconditioner', label: 'Mower/Conditioner', type: 'radio'},
            {field: 'forage_smallsquarebailer', label: 'Small Square Baler', type: 'radio'},
            {field: 'forage_bigsquarebailer', label: 'Big Square Baler', type: 'radio'},
            {field: 'forage_bigroundbailer', label: 'Big Round Baler', type: 'radio'},
            {field: 'forage_foragechopper', label: 'Forage Chopper', type: 'radio'},
            {field: 'forage_silagewagon', label: 'Silage Wagon', type: 'radio'},
            {field: 'forage_silageblower', label: 'Silage Blower', type: 'radio'},
            {field: 'forage_foragepreservative', label: 'Forage Preservative', type: 'radio'},
            {field: 'forage_stacker', label: 'Stacker', type: 'radio'},
        ];

        this.formfields_mech = [
            {field: 'mech_repairgasengine', label: 'Repair Gas Engine', type: 'radio'},
            {field: 'mech_overhaulgasengine', label: 'Overhaul Gas Engine', type: 'radio'},
            {field: 'mech_repairdiesel', label: 'Repair Diesel', type: 'radio'},
            {field: 'mech_overhauldiesel', label: 'Overhaul Diesel', type: 'radio'},
            {field: 'mech_arcweld', label: 'Arc Weld', type: 'radio'},
            {field: 'mech_gasweld', label: 'Gas Weld', type: 'radio'},
            {field: 'mech_calibratesprayer', label: 'Calibrate Sprayer', type: 'radio'},
        ];

        this.formfields_manure = [
            {field: 'manureequip_chopperpump', label: 'Chopper Pump', type: 'radio'},
            {field: 'manureequip_solidsspreader', label: 'Solids Spreader', type: 'radio'},
            {field: 'manureequip_liquidspreader', label: 'Liquid Spreader', type: 'radio'},
            {field: 'manureequip_alleyscraper', label: 'Alley Scraper', type: 'radio'},
            {field: 'manureequip_flushsystem', label: 'Flush System', type: 'radio'},
            {field: 'manureequip_barncleaner', label: 'Barn Cleaner', type: 'radio'},
            {field: 'manureequip_skidsteerloader', label: 'Skid Steer Loader', type: 'radio'},
            {field: 'manureequip_loadertractor', label: 'Load Tractor', type: 'radio'},
        ];

        this.formfields_feeding = [
            {field: 'feedequip_electronicscales', label: 'Electronic Scales', type: 'radio'},
            {field: 'feedequip_runtmrmixer', label: 'Run TMR Mixer', type: 'radio'},
            {field: 'feedequip_autofeedbunk', label: 'Automatic Feed Bunk', type: 'radio'},
            {field: 'feedequip_gridermixer', label: 'Grinder/Mixer', type: 'radio'},
            {field: 'feedequip_computerfeeding', label: 'Computer Feeding', type: 'radio'},
            {field: 'feedequip_calibratemixmill', label: 'Calibrate Mix-Mill', type: 'radio'},
            {field: 'feedequip_serviceconveyors', label: 'Service Conveyors', type: 'radio'},
            {field: 'feedequip_operateharvester', label: 'Operate Harvester', type: 'radio'},
            {field: 'feedequip_serviceharvester', label: 'Service Harvester', type: 'radio'},
        ];

        this.formfields_milking = [
            {field: 'milkingequip_robotic', label: 'Robotic/Automated', type: 'radio'},
            {field: 'milkingequip_servicemilkingsystem', label: 'Service Milking Systems', type: 'radio'},
            {field: 'milkingequip_changeinflations', label: 'Change Inflations', type: 'radio'},
            {field: 'milkingequip_detectstrayvoltage', label: 'Detect Stray Voltage', type: 'radio'},
            {field: 'milkingequip_refrigeration', label: 'Refrigeration', type: 'radio'},
            {field: 'milkingequip_cleaning', label: 'Cleaning/Sanitation', type: 'radio'},
        ];

        this.formfields_trades = [
            {field: 'trades_carpentry', label: 'Carpentry', type: 'radio'},
            {field: 'trades_electrical', label: 'Electrical', type: 'radio'},
            {field: 'trades_electricalvoltages', label: 'Voltages', type: '110V,220V,440V', relation: 'top'},
            {field: 'trades_plumbing', label: 'Plumbing', type: 'radio'},
            {field: 'trades_bricklayer', label: 'Bricklayer', type: 'radio'},
            {field: 'trades_concrete', label: 'Concrete', type: 'radio'},
        ];
    }

    addOtherSkill = () => {
        var newskill = {
            skill: "",
            skillrating: "",
        }

        var otherskills = this.props.data.otherskills;
        otherskills.push(newskill);

        var e = {
            target: {
                name: "otherskills",
                value: otherskills
            }
        };

        this.props.handleChange(e);
    }

    removeOtherSkill = (index) => {
        var otherskills = this.props.data.otherskills;
        otherskills.splice(index, 1);

        var e = {
            target: {
                name: "otherskills",
                value: otherskills
            }
        };
        this.props.handleChange(e);
    }

    onSkillChange = (e, index) => {        
        var otherskills = this.props.data.otherskills;
        if(e.target.name.indexOf("skillrating[") != -1){
            otherskills[index]["skillrating"] = e.target.value;
        }else{
            otherskills[index][e.target.name] = e.target.value;
        }
        

        var e = {
            target: {
                name: "otherskills",
                value: otherskills
            }
        };
        this.props.handleChange(e);


    }

    render(){
        return(
            <div id="skillsheet_app">
                <div id="breadcrumbs">
                    <button onClick={this.props.prevPage} className="button btn_prev">Prev</button>
                    <div className="currentactivepage">
                        Page {this.props.currentpage} of {this.totalpages}
                    </div>
                    <button onClick={this.props.nextPage} className="button btn_next">Next</button>
                </div>
                <div id="application_pages">
                    {this.props.loading ? <div className='loading'></div> : null }
                    {this.props.currentpage == 1 ? 
                        <section id="skillsheet_page" className="active">
                            <header>
                                <h1>Dairy Skills Checklist</h1>
                                <div className="desc">
                                    <strong>READ BEFORE COMPLETING:  Hands on Experience refers to work you are capable of performing on your own; not textbook / classroom knowledge, or assisting a co-worker, veterinarian, etc.</strong>  By completing and submitting this form, you acknowledge that the information accurately reflects your experience.  Please rate your hands on experience in the following areas.
                                </div>
                                <div className="legend">
                                    <ul>
                                        <li>4 - High</li>
                                        <li>3 - Above Average</li>
                                        <li>2 - Average</li>
                                        <li>1 - Limited</li>
                                        <li>0 - None</li>
                                    </ul>
                                </div>
                            </header>
                            <div className="skillsheets">
                                <div className="formwrapper" id="vet_skillsheet">
                                    <h2>Vet Practices</h2>
                                    {this.props.buildControls(this.formfields_vetpractices, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="repo_skillsheet">
                                    <h2>Reproduction</h2>
                                    {this.props.buildControls(this.formfields_reposkills, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="mgmnt_skillsheet">
                                    <h2>Management</h2>
                                    {this.props.buildControls(this.formfields_management, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="nutrition_skillsheet">
                                    <h2>Nutrition</h2>
                                    {this.props.buildControls(this.formfields_nutrition, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="misc_skillsheet">
                                    <h2>Miscellaneous</h2>
                                    {this.props.buildControls(this.formfields_misc, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="equip_skillsheet">
                                    <h2>Field Equipment</h2>
                                    {this.props.buildControls(this.formfields_equip, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="forage_skillsheet">
                                    <h2>Forage Equipment</h2>
                                    {this.props.buildControls(this.formfields_forage, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="mech_skillsheet">
                                    <h2>Mechanical</h2>
                                    {this.props.buildControls(this.formfields_mech, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="manure_skillsheet">
                                    <h2>Manure Equipment</h2>
                                    {this.props.buildControls(this.formfields_manure, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="feeding_skillsheet">
                                    <h2>Feeding Equipment</h2>
                                    {this.props.buildControls(this.formfields_feeding, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="milking_skillsheet">
                                    <h2>Milking Equipment</h2>
                                    {this.props.buildControls(this.formfields_milking, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="formwrapper" id="trades_skillsheet">
                                    <h2>Trades</h2>
                                    {this.props.buildControls(this.formfields_trades, this.props.handleChange, this.props.data)}
                                </div>
                                <div className="clear">

                                </div>
                            </div>

                        </section> : null }
                    {this.props.currentpage == 2 ? 
                        <section id="animalskillsquestions_page">
                            <header>
                                <h1>Animal Skills Questions</h1>
                            </header>
                            <div className="formwrapper">
                                <div className="formrow">
                                    <label>Breed(s) worked with:</label>
                                    <textarea value={this.props.data.breedsworkedwith} onChange={this.props.handleChange} name="breedsworkedwith"></textarea>
                                </div>
                                <div className="row two-col">
                                    <div className="formrow">
                                        <label>Largest Milking Herd Size</label>
                                        <input value={this.props.data.largestmilkingherdsize} onChange={this.props.handleChange} type="text" name="largestmilkingherdsize" />
                                    </div>
                                    <div className="formrow">
                                        <label>Largest Total Herd Size</label>
                                        <input value={this.props.data.largesttotalherdsize} onChange={this.props.handleChange} type="text" name="largesttotalherdsize" />
                                    </div>
                                </div>
                                <div className="row two-col">
                                    <RadioGroup label="Will you milk?" value={this.props.data.willyoumilk} field="willyoumilk" choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]}  handleChange={this.props.handleChange} />                                                                        
                                    <RadioGroup label="If willing to milk, how often?" value={this.props.data.howoftenwillyoumilk} field="howoftenwillyoumilk" choices={[{label: "1x", val: "1x"}, {label: "2x", val: "2x"}, {label: "Other", val: "other"}]}  handleChange={this.props.handleChange} />                                                                                                            
                                </div>
                                <div className="formrow">
                                    <label>Type of Parlor(s) worked with:</label>
                                    <textarea value={this.props.data.typeofparlor} onChange={this.props.handleChange} name="typeofparlor"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>Milking Equipment Used:</label>
                                    <textarea value={this.props.data.milkingequipused} onChange={this.props.handleChange} name="milkingequipused"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>Number Of People You Have Supervised At One Time: </label>
                                    <input value={this.props.data.numberofpeoplesupervised} onChange={this.props.handleChange} type="text" name="numberofpeoplesupervised" />
                                </div>
                                <div className="row two-col">
                                    <RadioGroup label="Do you like supervising?" value={this.props.data.doyoulikesupervising} field="doyoulikesupervising" choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]}  handleChange={this.props.handleChange} />
                                    <RadioGroup label="Do you feel you are a strong supervisor?" value={this.props.data.doyoufeelstrongsupervisor} field="doyoufeelstrongsupervisor" choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]}  handleChange={this.props.handleChange} />
                                </div>
                                <div className="row two-col">
                                    <div className="formrow">
                                        <label>Spouse's Name:</label>
                                        <input value={this.props.data.spousename} onChange={this.props.handleChange} type="text" name="spousename" />
                                    </div>
                                    <div className="formrow">
                                        <label>Spouse's Skills:</label>
                                        <input value={this.props.data.spouseskills} onChange={this.props.handleChange} type="text" name="spouseskills" />
                                    </div>
                                </div>
                                <div className="row two-col">
                                    <RadioGroup label="Spouse interested in working on farm?" value={this.props.data.isspouseinterested} field="isspouseinterested" choices={[{label: "No", val: "no"}, {label: "Full-time", val: "fulltime"}, {label: "Part-Time", val: "parttime"}]}  handleChange={this.props.handleChange} />                                    
                                </div>
                            </div>
                        </section> : null }
                    
                    {this.props.currentpage == 3 ? 
                        <section id="additionalskills_page" >
                            <header>
                                <h1>Additional Dairy Skills</h1>
                            </header>
                            <div className="formwrapper">
                                <div className="otherskills_container">
                                    {this.props.data.otherskills.map((skill, index) => {
                                        return (
                                            <OtherSkills index={index} key={index} skill={skill} removeSkill={this.removeOtherSkill} changeSkill={this.onSkillChange} />
                                        )
                                    })}                                    
                                </div>
                                <a className="button" onClick={this.addOtherSkill} id="btn_addskill">Add Skills</a>
                            </div>
                        </section> : null }
                    {this.props.currentpage == 4 ? 
                        <section id="equipquestions_page">
                            <header>
                                <h1>Additional Skills Questions</h1>
                            </header>
                            <div className="formwrapper">
                                <div className="formrow">
                                    <label>Summary of Experiences:</label>
                                    <p>
                                        (So our employers have a better understanding, please describe in 5 – 10 sentences your experience working in the dairy industry.  Please include size of operations you have worked on, number of employees supervised, your skills (types of treatments, reproduction, etc.), education or training you have received, the type of positions / responsibilities you have held and the type of positions / responsibilities you are looking for)
                                    </p>
                                    <textarea value={this.props.data.summaryofexperience} onChange={this.props.handleChange} name="summaryofexperience"></textarea>
                                </div>

                                <div className="formrow">
                                    <label>Management Skills:</label>
                                    <textarea value={this.props.data.managementskills} onChange={this.props.handleChange} name="managementskills"></textarea>
                                </div>

                                <div className="formrow">
                                    <label>Computer Skills:</label>
                                    <p>
                                        (Office Programs, Dairy Software, Record Keeping Programs, etc.)
                                    </p>
                                    <textarea value={this.props.data.computerskills} onChange={this.props.handleChange} name="computerskills"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>CROPS:</label>
                                    <p>
                                        List types of crops worked with, acreages of each crop &amp; whether it was irrigated or dryland.  If you have worked for several operations, please provide information for each.
                                    </p>
                                    <textarea value={this.props.data.cropskills} onChange={this.props.handleChange} name="cropskills"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>CHEMICALS &amp; FERTILIZER:</label>
                                    <p>
                                        (methods of application, types used, equipment used)
                                    </p>
                                    <textarea value={this.props.data.chemfertskills} onChange={this.props.handleChange} name="chemfertskills"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>EQUIPMENT:</label>
                                    <p>
                                        List equipment operated. Include width of tillage equipment, row size, model numbers of tractors &amp; combines, methods of haying, etc. PLEASE BE SPECIFIC.
                                    </p>
                                    <textarea value={this.props.data.equipmentskills} onChange={this.props.handleChange} name="equipmentskills"></textarea>
                                </div>
                                <h2>Irrigation</h2>
                                <div className="formrow">
                                    <label>Pivot (Number &amp; Make):</label>
                                    <input value={this.props.data.irrigationpivot} onChange={this.props.handleChange} type="text" name="irrigationpivot" />
                                </div>
                                <div className="formrow">
                                    <label>Number of Acres:</label>
                                    <input value={this.props.data.irrigationacres} onChange={this.props.handleChange} type="text" name="irrigationacres" />
                                </div>
                                <div className="formrow">
                                    <label>Gated Pipe (list acres):</label>
                                    <input value={this.props.data.irrigationgatedpipe} onChange={this.props.handleChange} type="text" name="irrigationgatedpipe" />
                                </div>
                                <div className="formrow">
                                    <label>Other Types:</label>
                                    <input value={this.props.data.irrigationothertypes} onChange={this.props.handleChange} type="text" name="irrigationothertypes" />
                                </div>
                                <div className="formrow">
                                    <label>Explain your ability to service &amp; maintain pivots:</label>
                                    <textarea value={this.props.data.irrigationexplainability} onChange={this.props.handleChange} name="irrigationexplainability"></textarea>
                                </div>

                            </div>
                            <div className="application_completion">
                                <h2>Submit Skill Sheet</h2>
                                <p>
                                    To complete and submit your skill sheet to prospective employers, type your initials in the box below, then click <strong>Complete Skill Sheet.</strong>
                                    <input type="text" name="initials" onChange={this.props.handleChange} />
                                    <a id="submit_skillsheet" onClick={this.props.submitSkillsheet}  className="button">Complete Skill Sheet</a>
                                </p>
                            </div>
                        </section> : null }
                </div>

                <div id="application_controls">
                    <button id="btn_prev" className="button btn_prev" onClick={this.props.prevPage}>Prev</button>
                    <button id="btn_saveapp" className="button" onClick={this.props.saveSkillsheet}>Save Skill Sheet</button>
                    <button id="btn_next" className="button btn_next" onClick={this.props.nextPage}>Next</button>
                </div>
            </div>
        )
    }
}

class OtherSkills extends React.Component{
    isChecked = (value) => {
        if(value == this.props.skill.skillrating){
            return true;
        }else{
            return false;
        }
    }
    render(){        
        var isHighSelected = this.isChecked("high");
        var isMedSelected = this.isChecked("med");
        var isLowSelected = this.isChecked("none");
        return(
            <div className="otherskill">
                <div className="row two-col">
                    <div className="formrow">
                        <label>Skill</label>
                        <input value={this.props.skill.skill} onChange={(e) => { this.props.changeSkill(e, this.props.index) }} type="text" name="skill" />
                    </div>
                    <div className="formrow" onChange={(e) => { this.props.changeSkill(e, this.props.index) }}>
                        <label>Skill Level</label>
                        <span className="radioGroup"><input type="radio" defaultChecked={isHighSelected} value="high" name={"skillrating[" + this.props.index + "]"} /> High </span>
                        <span className="radioGroup"><input type="radio" defaultChecked={isMedSelected} value="med" name={"skillrating[" + this.props.index + "]"} /> Average </span>
                        <span className="radioGroup"><input type="radio" defaultChecked={isLowSelected} value="none" name={"skillrating[" + this.props.index + "]"} /> None </span>
                    </div>
                    <a onClick={this.props.removeSkill} className="delete_btn"><i className="fa fa-trash-o"></i></a>
                </div>
            </div>
        );
    }
}