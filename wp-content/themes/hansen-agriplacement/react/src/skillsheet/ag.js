import React from 'react';
import validatejs from 'validate.js';

import RadioGroup from './radiogroup';

export default class AgSkillsheet extends React.Component{
    constructor(props){
        super(props);
        this.totalpages = 2;

        this.formfields_fieldequip = [
            {field: 'fieldequip_choretractor', label: 'Chore Tractor', type: 'radio' },
            {field: 'fieldequip_frontassisttractor', label: 'Front Assist Tractor', type: 'radio' },
            {field: 'fieldequip_4wdarticulatingtractor', label: '4-WD Articulating Tractor', type: 'radio' },
            {field: 'fieldequip_gps', label: 'GPS/Guidance System', type: 'radio' },
            {field: 'fieldequip_drone', label: 'Drone', type: 'radio' },
            {field: 'fieldequip_gpsvariablerateplanting', label: 'GPS-Variable Rate Planting', type: 'radio' },
            {field: 'fieldequip_cultivating', label: 'Cultivating', type: 'radio' },
            {field: 'fieldequip_disk', label: 'Disk', type: 'radio' },
            {field: 'fieldequip_rowplanter', label: 'Row Planter', type: 'radio' },
            {field: 'fieldequip_drillplanter', label: 'Drill Planter', type: 'radio' },
            {field: 'fieldequip_sprayersetcalibrate', label: 'Sprayer Set & Calibrate', type: 'radio' },
            {field: 'fieldequip_selfpropelledsprayer', label: 'Self-Propelled Sprayer', type: 'radio' },
            {field: 'fieldequip_pulltypesprayer', label: 'Pull Type Sprayer', type: 'radio' },
            {field: 'fieldequip_largetruck', label: 'Large Truck', type: 'radio' },
            {field: 'fieldequip_combine', label: 'Combine', type: 'radio' },
            {field: 'fieldequip_graincart', label: 'Grain Cart', type: 'radio' },
            {field: 'fieldequip_semitractortrailer', label: 'Semi-Tractor / Trailer', type: 'radio' },
        ];

        this.formfields_forage = [
            {field: 'forage_mowerconditioner', label: 'Mower/Conditioner', type: 'radio'},
            {field: 'forage_smallsquarebailer', label: 'Small Square Baler', type: 'radio'},
            {field: 'forage_bigsquarebailer', label: 'Big Square Baler', type: 'radio'},
            {field: 'forage_bigroundbailer', label: 'Big Round Baler', type: 'radio'},
            {field: 'forage_selfpropelledchopper', label: 'Self-Propelled Chopper', type: 'radio'},
            {field: 'forage_silagechopperpulltype', label: 'Silage Chopper Pull Type', type: 'radio'},
            {field: 'forage_silageblower', label: 'Silage Blower', type: 'radio'},
            {field: 'forage_foragepreservative', label: 'Forage Preservative', type: 'radio'},
            {field: 'forage_stackmaker', label: 'Stack Maker', type: 'radio'},
            {field: 'forage_swather', label: 'Swather', type: 'radio'},
        ]

        this.formfields_mechanical = [
            {field: 'mech_repairgasengine', label: 'Repair Gas Engine', type: 'radio'},
            {field: 'mech_overhaulgasengine', label: 'Overhaul Gas Engine', type: 'radio'},
            {field: 'mech_repairdiesel', label: 'Repair Diesel', type: 'radio'},
            {field: 'mech_overhauldiesel', label: 'Overhaul Diesel', type: 'radio'},
            {field: 'mech_generalservice', label: 'General Service Equip.', type: 'radio'},
        ];

        this.formfields_manure = [
            {field: 'manureequip_brownbearaerator', label: 'Brown Bear Manure Aerator', type: 'radio'},
            {field: 'manureequip_solidsspreader', label: 'Solids Spreader', type: 'radio'},
            {field: 'manureequip_liquidspreader', label: 'Liquid Spreader', type: 'radio'},
            {field: 'manureequip_liquidinjection', label: 'Liquid Injection', type: 'radio'},
            {field: 'manureequip_swingarmapplicator', label: 'Swingarm Applicator', type: 'radio'},
            {field: 'manureequip_pivotinjection', label: 'Pivot Injection', type: 'radio'},
            {field: 'manureequip_alleyscraper', label: 'Alley Scraper', type: 'radio'},
            {field: 'manureequip_flushsystem', label: 'Flush System', type: 'radio'},
            {field: 'manureequip_barncleaner', label: 'Barn Cleaner', type: 'radio'},
            {field: 'manureequip_pitsystems', label: 'Pit Systems', type: 'radio'},
            {field: 'manureequip_lagoonsystems', label: 'Lagoon Systems', type: 'radio'},
        ];

        this.formfields_fertilizer = [
            {field: 'fert_anhydrous', label: 'Anhydrous', type: 'radio'},
            {field: 'fert_dry', label: 'Dry', type: 'radio'},
            {field: 'fert_liquid', label: 'Liquid', type: 'radio'},
            {field: 'fert_gpsvariableratefertapp', label: 'GPS-Variable Rate - Fertilizer Application', type: 'radio'},
        ];

        this.formfields_irrigation = [
            {field: 'irri_pivot', label: 'Pivot', type: 'radio'},
            {field: 'irri_flood', label: 'Flood', type: 'radio'},
            {field: 'irri_sideroll', label: 'Sideroll', type: 'radio'},
            {field: 'irri_micro', label: 'Micro', type: 'radio'},
            {field: 'irri_undergrounddrip', label: 'Underground Drip', type: 'radio'},
            {field: 'irri_gpsvariablerateirri', label: 'GPS-Variable Rate - Irrigation', type: 'radio'},
        ];

        this.formfields_trades = [
            {field: 'trades_agronomyscouting', label: 'Agronomy (Scouting)', type: 'radio'},
            {field: 'trades_carpentry', label: 'Carpentry', type: 'radio'},
            {field: 'trades_electrical', label: 'Electrical', type: 'radio'},
            {field: 'trades_electricalvoltages', label: 'Voltages', type: '110V,220V,440V', relation: 'top'},
            {field: 'trades_plumbing', label: 'Plumbing', type: 'radio'},
            {field: 'trades_concrete', label: 'Concrete', type: 'radio'},
            {field: 'trades_arcwelding', label: 'Arc Welding', type: 'radio'},
            {field: 'trades_wirewelding', label: 'Wire Welding', type: 'radio'},
            {field: 'trades_propanewelding', label: 'Propane Welding', type: 'radio'},
            {field: 'trades_oxywelding', label: 'Oxy - Acetylene Welding', type: 'radio'},
        ]

        this.formfields_misc = [
            {field: 'misc_validdl', label: 'Do you have a current, valid driver\'s license?', type: 'yes,no'},
            {field: 'misc_cdl', label: 'Do you have a CDL?', type: 'yes,no'},
            {field: 'misc_endorsements', label: 'List Endorsements', type: 'text'},
            {field: 'misc_privateapplicator', label: 'Private Applicator', type: 'yes,no'},
            {field: 'misc_commercialapplicator', label: 'Commercial Applicator', type: 'yes,no'},
            {field: 'misc_other', label: 'Other', type: 'text'},
            {field: 'misc_foreignlanguage', label: 'Foreign Language', type: 'yes,no'},
            {field: 'misc_foreignlanguagefluency', label: 'Foreign Language Fluency', type: 'basic,fluent', relation: 'top'},
            {field: 'misc_foreignlanguagename', label: 'What Language?', type: 'text', relation: 'top'},
            {field: 'misc_problemheights', label: 'Problem with heights?', type: 'yes,no'},

        ];

        this.formfields_vetpractices = [
            {field: 'vet_iminjection', label: '"IM" Injection', type: 'radio' },
            {field: 'vet_iv', label: '"IV"', type: 'radio' },        
            {field: 'vet_subqinjection', label: '"Sub-Q" Injection', type: 'radio' },
            {field: 'vet_intraruminalinjection', label: 'Intra-Ruminal Injection', type: 'radio' },
            {field: 'vet_uterineinfusions', label: 'Uterine Infusions', type: 'radio' },
            {field: 'vet_uterineprolapses', label: 'Uterine Prolapses', type: 'radio' },
            {field: 'vet_cleanuterus', label: 'Clean Uterus', type: 'radio' },
            {field: 'vet_correcthernias', label: 'Correct Hernias', type: 'radio' },
            {field: 'vet_castrate', label: 'Castrate', type: 'radio' },
            {field: 'vet_castratemethodbanding', label: 'Banding Method', type: 'radio', relation: 'top' },
            {field: 'vet_castratemethodknife', label: 'Knife Method', type: 'radio', relation: 'top' },
            {field: 'vet_dehorning', label: 'Dehorning', type: 'radio' },
            {field: 'vet_dehorningmethodburning', label: 'Burning Method', type: 'radio', relation: 'top' },
            {field: 'vet_dehorningmethodguillotine', label: 'Guillotine Method', type: 'radio', relation: 'top' },
            {field: 'vet_trimcowsfeet', label: 'Trim Cow\'s Feet', type: 'radio' },
            {field: 'vet_delivernormalcalf', label: 'Deliver Normal Calf', type: 'radio' },
            {field: 'vet_usecalfjack', label: 'Use "Calf Jack"', type: 'radio' },
            {field: 'vet_deliverbreachcalf', label: 'Deliver Breech Calf', type: 'radio' },
            {field: 'vet_diagnosescours', label: 'Diagnose Scours', type: 'radio' },
            {field: 'vet_treatscours', label: 'Treat Scours', type: 'radio' },
            {field: 'vet_bolusing', label: 'Bolusing', type: 'radio' },
            {field: 'vet_takesterilesample', label: 'Take Sterile Sample', type: 'radio'},
            {field: 'vet_diagnosemastitis', label: 'Diagnose Mastitis', type: 'radio' },
            {field: 'vet_treatmastitis', label: 'Treat Mastitis', type: 'radio' },
            {field: 'vet_detecttreatsickanimals', label: 'Detect & Treat Sick Animals', type: 'radio' },
            {field: 'vet_taildocking', label: 'Dock Tail', type: 'radio' },
        ];

        this.formfields_breeding = [
            {field: 'breed_aibreeding', label: 'Breed A.I.', type: 'radio'},
            {field: 'breed_aisync', label: 'A.I. Synchronization', type: 'radio'},
            {field: 'breed_selectcowmatings', label: 'Select Cow Matings', type: 'radio'},
            {field: 'breed_cullherd', label: 'Cull & Evaluate Herd', type: 'radio'},
            {field: 'breed_completeregpaper', label: 'Complete Reg. Paper', type: 'radio'},
            {field: 'breed_fileregpaper', label: 'File Reg. Paper', type: 'radio'},
            {field: 'breed_implantembryos', label: 'Implant Embryos', type: 'radio'},
            {field: 'breed_collectembryos', label: 'Collect Embryos', type: 'radio'},
        ];

        this.formfields_management = [
            {field: 'mgmnt_employeemanagement', label: 'Employee Management', type: 'radio'},
            {field: 'mgmnt_organizeherdhealth', label: 'Organize Herd Health', type: 'radio'},
            {field: 'mgmnt_prepcattleforshow', label: 'Prep Cattle for Show', type: 'radio'},
            {field: 'mgmnt_merchcattle', label: 'Merchandise Cattle', type: 'radio'},
            {field: 'mgmnt_readpedigrees', label: 'Read Pedigrees', type: 'radio'},
            {field: 'mgmnt_readsalescatalog', label: 'Read Sale Catalog', type: 'radio'},
        ];

        this.formfields_misc2 = [
            {field: 'misc_feeding', label: 'Feeding', type: 'radio'},
            {field: 'misc_mixandbalancerations', label: 'Mix & Balance Rations', type: 'radio'},
            {field: 'misc_electrical', label: 'Electrical', type: 'radio'},
            {field: 'misc_eartag', label: 'Ear Tag', type: 'radio'},
            {field: 'misc_brand', label: 'Brand (hot)', type: 'radio'},
            {field: 'misc_freezebrand', label: 'Freeze Brand', type: 'radio'},
            {field: 'misc_tattooing', label: 'Tattooing', type: 'radio'},
            {field: 'misc_ridehorse', label: 'Ride Horse', type: 'radio'},
            {field: 'misc_ropefromhorse', label: 'Rope from Horse', type: 'radio'},
            {field: 'misc_breakhorsetoride', label: 'Break Horse to Ride', type: 'radio'},
            {field: 'misc_shoeahorse', label: 'Shoe a Horse', type: 'radio'},
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
            {field: 'feedequip_payloader', label: 'Payloader', type: 'radio'},
            {field: 'feedequip_skidsteerloader', label: 'Skid Steer Loader', type: 'radio'},
        ];
    } 

    componentWillReceiveProps(nextProps){
        console.log("props have updated");
    } 

    render(){        
        return(
            <div id="skillsheet_app">
                <div id="breadcrumbs">
                    <button className="button btn_prev" onClick={this.props.prevPage}>Prev</button>
                    <div className="currentactivepage">
                        Page {this.props.currentpage} of {this.totalpages}
                    </div>
                    <button className="button btn_next" onClick={this.props.nextPage}>Next</button>
                </div>
                <div id="application_pages">
                    {this.props.loading ? <div className='loading'></div> : null }
                    {this.props.currentpage == 1 ? 
                        <section id="skillsheet_page" className="active">
                            <header>
                                <h1>Ag Skills Checklist</h1>
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
                                <div className="formwrapper" id="fieldequip_skillsheet">
                                    <h2>Field Equipment</h2>
                                    {this.props.buildControls(this.formfields_fieldequip, this.props.handleChange, this.props.data)}
                                    
                                </div>
                                <div className="formwrapper" id="forage_skillsheet">
                                    <h2>Forage Equipment</h2>
                                    {this.props.buildControls(this.formfields_forage, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="mechanical_skillsheet">
                                    <h2>Mechanical</h2>
                                    {this.props.buildControls(this.formfields_mechanical, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="manure_skillsheet">
                                    <h2>Manure Equipment</h2>
                                    {this.props.buildControls(this.formfields_manure, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="fert_skillsheet">
                                    <h2>Fertilizer</h2>
                                    {this.props.buildControls(this.formfields_fertilizer, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="irri_skillsheet">
                                    <h2>Irrigation</h2>
                                    {this.props.buildControls(this.formfields_irrigation, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="trades_skillsheet">
                                    <h2>Trades</h2>
                                    {this.props.buildControls(this.formfields_trades, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="misc_skillsheet">
                                    <h2>Miscellaneous</h2>
                                    {this.props.buildControls(this.formfields_misc, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="vet_skillsheet">
                                    <h2>Vet Practices</h2>
                                    {this.props.buildControls(this.formfields_vetpractices, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="breeding_skillsheet">
                                    <h2>Breeding</h2>
                                    {this.props.buildControls(this.formfields_breeding, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="mgmt_skillsheet">
                                    <h2>Management</h2>
                                    {this.props.buildControls(this.formfields_management, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="misc2_skillsheet">
                                    <h2>Miscellaneous</h2>
                                    {this.props.buildControls(this.formfields_misc2, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="feeding_skillsheet">
                                    <h2>Feeding Equipment</h2>
                                    {this.props.buildControls(this.formfields_feeding, this.props.handleChange)}
                                </div>
                            </div>
                        </section> : null }

                    {this.props.currentpage == 2 ?  
                        <section id="animalskillsquestions_page">
                            <header>
                                <h1>Ag Skills Questions</h1>
                            </header>
                            <div className="formwrapper">
                                <div className="row two-col">
                                    <RadioGroup label="Many of our employers have a smoke free work environment including: housing that they provide, vehicles, tractor cabs, etc. Please advise us if this would be a problem for you." value={this.props.data.nonsmokingproblem} choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]} field="nonsmokingproblem"  handleChange={this.props.handleChange} />                                    
                                    <RadioGroup label="Do you smoke?" value={this.props.data.smoke} field="smoke" choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]}  handleChange={this.props.handleChange} />                                    
                                </div>
                                <div className="row two-col">
                                    <RadioGroup label="Are there any days of the week that you will not work?" value={this.props.data.unavailablecertaindays} field="unavailablecertaindays" choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]}  handleChange={this.props.handleChange} />
                                    
                                    <div className="formrow">
                                        <label>If so, please advise us as to which days you will not be able to work. Keep in mind that many agricultural operations may require 7 days per week during peak seasons.</label>
                                        <input value={this.props.data.daysunavailable} onChange={this.props.handleChange} type="text" name="daysunavailable" />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <label>We need to know if you have pets or animals that you absolutely must take with you.  Some employers will not allow pets and many may not have the facilities or extra pasture for your animals.  </label>
                                    <input value={this.props.data.pets} onChange={this.props.handleChange} type="text" name="pets" />
                                </div>
                                <div className="formrow">
                                    <label>Please advise us as to when the best times are to reach you by phone.</label>
                                    <input value={this.props.data.besttimetoreachphone} onChange={this.props.handleChange} type="text" name="besttimetoreachphone" />
                                </div>

                                <h2>Livestock (number of head, breeds and company)</h2>                
                                <div className="row three-col">
                                    <div className="formrow">
                                        <label>Purebred Cow/Calf:</label>
                                        <input value={this.props.data.purebredcow} onChange={this.props.handleChange} type="text" name="purebredcow" />
                                    </div>
                                    <div className="formrow">
                                        <label>Commercial Cow/Calf:</label>
                                        <input value={this.props.data.commericalcow} onChange={this.props.handleChange} type="text" name="commericalcow" />
                                    </div>
                                    <div className="formrow">
                                        <label>Yearlings:  (Number of head and company):</label>
                                        <input value={this.props.data.yearlings} onChange={this.props.handleChange} type="text" name="yearlings" />
                                    </div>
                                </div>
                                <div className="row three-col">
                                    <div className="formrow">
                                        <label>Feedlot: (Company, lot size, your duties, etc.):</label>
                                        <input value={this.props.data.feedlot} onChange={this.props.handleChange} type="text" name="feedlot" />
                                    </div>
                                    <div className="formrow">
                                        <label>Equine:</label>
                                        <input value={this.props.data.equine} onChange={this.props.handleChange} type="text" name="equine" />
                                    </div>
                                    <div className="formrow">
                                        <label>Number of Sows:</label>
                                        <input value={this.props.data.swinenumberofsows} onChange={this.props.handleChange} type="text" name="swinenumberofsows" />
                                    </div>
                                </div>
                                <div className="row three-col">
                                    <div className="formrow">
                                        <label>Number of Feeder Pigs:</label>
                                        <input value={this.props.data.numberfeederpigs} onChange={this.props.handleChange} type="text" name="numberfeederpigs" />
                                    </div>
                                    <div className="formrow">
                                        <label>Number of Finish Pigs:</label>
                                        <input value={this.props.data.numberfinishedpigs} onChange={this.props.handleChange} type="text" name="numberfinishedpigs" />
                                    </div>
                                </div>
                                <div className="row three-col">
                                    <div className="formrow">
                                        <label>Ewes:</label>
                                        <input value={this.props.data.ewes} onChange={this.props.handleChange} type="text" name="ewes" />
                                    </div>
                                    <div className="formrow">
                                        <label>Fat Lambs:</label>
                                        <input value={this.props.data.fats} onChange={this.props.handleChange} type="text" name="fats" />
                                    </div>
                                    <div className="formrow">
                                        <label>Dairy:</label>
                                        <input value={this.props.data.dairy} onChange={this.props.handleChange} type="text" name="dairy" />
                                    </div>
                                </div>
                                <div className="row two-col">
                                    <div className="formrow">
                                        <label>Type of Milking Parlor:</label>
                                        <input value={this.props.data.typeofmilkingparlor} onChange={this.props.handleChange} type="text" name="typeofmilkingparlor" />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <label>Other:</label>
                                    <textarea value={this.props.data.othertext} onChange={this.props.handleChange} name="othertext"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>List current medicines/vaccines used:</label>
                                    <textarea value={this.props.data.medicinesvaccines} onChange={this.props.handleChange} name="medicinesvaccines"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>Describe your doctoring abilities.  Be as specific as possible:</label>
                                    <textarea value={this.props.data.doctoringskills} onChange={this.props.handleChange} name="doctoringskills"></textarea>
                                </div>
                                <div className="row three-col">
                                    <div className="formrow">
                                        <label>A.I.:</label>
                                        <input value={this.props.data.ai} onChange={this.props.handleChange} type="text" name="ai" />
                                    </div>
                                    <div className="formrow">
                                        <label>Pregnancy Test:</label>
                                        <input value={this.props.data.pregtest} onChange={this.props.handleChange} type="text" name="pregtest" />
                                    </div>
                                    <div className="formrow">
                                        <label>Number of head on an annual basis?</label>
                                        <input value={this.props.data.numberofheadannual} onChange={this.props.handleChange} type="text" name="numberofheadannual" />
                                    </div>
                                </div>

                                <h2>Crops</h2>
                                <div className="formrow">
                                    <label>List types of crops worked with, acreages of each crop &amp; whether it was irrigated or dryland.  If you have worked for several operations, <u>please</u> provide information for each. </label>
                                    <input value={this.props.data.typesofcrops}  onChange={this.props.handleChange} type="text" name="typesofcrops" />
                                </div>

                                <h2>Equipment</h2>
                                <div className="formrow">
                                    <label>List equipment operated.  Include width of tillage equipment, row size, model numbers of tractors &amp; combines, methods of haying, (GPS, Precision Monitors &amp; Application, etc.)  PLEASE BE SPECIFIC.</label>
                                    <input value={this.props.data.equipmentskills} onChange={this.props.handleChange} type="text" name="equipmentskills" />
                                </div>
                                <div className="formrow">
                                    <label>Describe your abilities to maintain equipment</label>
                                    <input value={this.props.data.maintenanceskills} onChange={this.props.handleChange} type="text" name="maintenanceskills" />
                                </div>
                                <div className="formrow">
                                    <label>Describe your abilities to overhauling engines</label>
                                    <input value={this.props.data.overhaulingskills} onChange={this.props.handleChange} type="text" name="overhaulingskills" />
                                </div>

                                <h2>Irrigation</h2>
                                <div className="formrow">
                                    <label>Pivot (Number &amp; Make)</label>
                                    <input value={this.props.data.irrigationpivot} onChange={this.props.handleChange} type="text" name="irrigationpivot" />
                                </div>
                                <div className="formrow">
                                    <label>Number of Acres</label>
                                    <input value={this.props.data.irrigationacres} onChange={this.props.handleChange} type="text" name="irrigationacres" />
                                </div>
                                <div className="formrow">
                                    <label>Gated Pipe (list acres)</label>
                                    <input value={this.props.data.irrigationgatedpipe} onChange={this.props.handleChange} type="text" name="irrigationgatedpipe" />
                                </div>
                                <div className="formrow">
                                    <label>Other Types</label>
                                    <input value={this.props.data.irrigationothertypes} onChange={this.props.handleChange} type="text" name="irrigationothertypes" />
                                </div>
                                <div className="formrow">
                                    <label>Explain your ability to service &amp; maintain Pivots, Flood, Sideroll, etc.</label>
                                    <textarea value={this.props.data.irrigationexplainability} onChange={this.props.handleChange} name="irrigationexplainability"></textarea>
                                </div>

                                <div className="formrow">
                                    <label>CHEMICALS &amp; FERTILIZER:</label>
                                    <p>
                                        (methods of application, types used, equipment used)
                                    </p>
                                    <textarea value={this.props.data.chemfertskills} onChange={this.props.handleChange} name="chemfertskills"></textarea>
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
                                <h2>Supervisory</h2>
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

                                <div className="formrow">
                                    <label>Summary of Experiences:</label>
                                    <p>
                                        So our employers have a better understanding, please describe in 5 – 10 sentences your experience working in the Production Ag industry.  Please include size of operations you have worked on, number of employees supervised, your skills, education or training you have received, the type of positions / responsibilities you have held and the type of positions / responsibilities you are looking for:
                                    </p>
                                    <textarea value={this.props.data.summaryofexperience} onChange={this.props.handleChange} name="summaryofexperience"></textarea>
                                </div>
                            </div>
                            <div className="application_completion">
                                <h2>Submit Skill Sheet</h2>
                                <p>
                                    To complete and submit your skill sheet to prospective employers, type your initials in the box below, then click <strong>Complete Skill Sheet.</strong>
                                    <input type="text" name="initials" onChange={this.props.handleChange} />
                                    <a id="submit_skillsheet" onClick={this.props.submitSkillsheet} className="button">Complete Skill Sheet</a>
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
        );
    }
}