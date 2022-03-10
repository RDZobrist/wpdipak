import React from 'react';
import validatejs from 'validate.js';

import RadioGroup from './radiogroup';

export default class SwineSkillsheet extends React.Component{
    constructor(props){
        super(props);
        this.totalpages = 3;

        this.formfields_vetpractices = [
            {field: 'vet_clipneedleteeth', label: 'Clip Needle Teeth', type: 'radio' },
            {field: 'vet_castration', label: 'Castration', type: 'radio' },
            {field: 'vet_rupturerepair', label: 'Rupture Repair', type: 'radio' },
            {field: 'vet_taildocking', label: 'Tail Docking', type: 'radio' },
            {field: 'vet_earnotching', label: 'Ear Notching', type: 'radio' },
            {field: 'vet_eartagging', label: 'Ear Tagging', type: 'radio' },
            {field: 'vet_eartattooing', label: 'Ear Tattooing', type: 'radio' },
            {field: 'vet_slaptattooing', label: 'Slap Tattooing', type: 'radio' },
            {field: 'vet_iv', label: 'Injection', type: 'radio' },
            {field: 'vet_iminjection', label: '"IM" Injection', type: 'radio' },
            {field: 'vet_subqinjection', label: '"Sub-Q" Injection', type: 'radio' },
            {field: 'vet_detecttreatsickanimals', label: 'Detect/Treat Sick Animals', type: 'radio' },
            {field: 'vet_vaccinations', label: 'Vaccinations', type: 'radio' },
            {field: 'vet_usesnoutsnare', label: 'Use Snout Snare', type: 'radio' },
            {field: 'vet_bloodtestingbreeding', label: 'Blood-Testing Breeding', type: 'radio' },
            {field: 'vet_assistingsowdeliver', label: 'Assisting Sow Delivery', type: 'radio' },
            {field: 'vet_crossfosteringpiglets', label: 'Cross-Fostering Piglets', type: 'radio' },
            {field: 'vet_diagnosemastitis', label: 'Diagnose Mastitis', type: 'radio' },
            {field: 'vet_treatmastitis', label: 'Treat Mastitis', type: 'radio' },
            {field: 'vet_diagnosescours', label: 'Diagnose Scours', type: 'radio' },
            {field: 'vet_treatscours', label: 'Treat Scours', type: 'radio' },
            {field: 'vet_sew', label: 'SEW (Segregated Early Weaning)', type: 'radio' },
            {field: 'vet_mew', label: 'MEW (Medicated Early Weaning)', type: 'radio' },
            {field: 'vet_biosecurity', label: 'Bio Security', type: 'radio' },
        ];

        this.formfields_breeding = [
            {field: 'breed_collectedsemen', label: 'Collected Semen', type: 'radio' },
            {field: 'breed_detectedheat', label: 'Detected Heat', type: 'radio' },
            {field: 'breed_extendedsemen', label: 'Extended Semen', type: 'radio' },
            {field: 'breed_aibreeding', label: 'A.I. Breeding', type: 'radio'},
            {field: 'breed_deeputerineai', label: 'Deep Uterine A.I.', type: 'radio'},
            {field: 'breed_syncmatings', label: 'Synchronization Breeding', type: 'radio'},
            {field: 'breed_ultrasonicpregchecker', label: 'Use of Ultrasonic Pregnancy Checker', type: 'radio'},
            {field: 'breed_gestationcrates', label: 'Gestation Crates', type: 'radio'},
            {field: 'breed_gestationlargepens', label: 'Gestation Large Pens', type: 'radio'},
            {field: 'breed_boarbreeding', label: 'Boar Breeding', type: 'yes,no'},
            {field: 'breed_boarai', label: 'Boar - AI', type: 'yes,no'},
            {field: 'breed_2xai', label: '2X AI', type: 'yes,no'},
            {field: 'breed_3xai', label: '3X AI', type: 'yes,no'},
        ];

        this.formfields_management = [
            {field: 'mgmnt_breedinggestation', label: 'Breeding/Gestation', type: 'radio' },
            {field: 'mgmnt_farrowing', label: 'Farrowing', type: 'radio' },
            {field: 'mgmnt_nursery', label: 'Nursery', type: 'radio' },
            {field: 'mgmnt_finishing', label: 'Finishing', type: 'radio' },
            {field: 'mgmnt_boarstud', label: 'Boar Stud', type: 'radio' },
            {field: 'mgmnt_organizedherdhealth', label: 'Organized Herd Health', type: 'radio' },
            {field: 'mgmnt_multiboarlinebreeding', label: 'Multi. Boar Line Breeding', type: 'radio' },
            {field: 'mgmnt_marketing', label: 'Marketing', type: 'radio' },
            {field: 'mgmnt_transportation', label: 'Transportation', type: 'radio' },
            {field: 'mgmnt_feedmill', label: 'Feed Mill', type: 'radio' },
        ];

        this.formfields_nutrition = [
            {field: 'nutri_boars', label: 'Boars', type: 'radio' },
            {field: 'nutri_gestatingsows', label: 'Gestating Sows', type: 'radio' },
            {field: 'nutri_lactatingsows', label: 'Lactating Sows', type: 'radio' },
            {field: 'nutri_supplementalfeeding', label: 'Supplemental Feeding', type: 'radio' },
            {field: 'nutri_earlyweanedpiglets', label: 'Early Weaned Piglets', type: 'radio' },
            {field: 'nutri_nurserypigs', label: 'Nursery Pigs', type: 'radio' },
            {field: 'nutri_weanedpiglets', label: 'Weaned Piglets', type: 'radio' },
            {field: 'nutri_finishingpigs', label: 'Finishing Pigs', type: 'radio' },
            {field: 'nutri_balancefeedration', label: 'Balance Feed Ration', type: 'radio' },
            {field: 'nutri_operatefeedmill', label: 'Operate Feed Mill', type: 'radio' },
            {field: 'nutri_priceandbuyfeeds', label: 'Price and Buy Feeds', type: 'radio' },
        ];

        this.formfields_selection = [
            {field: 'sel_ultrasonicfattolean', label: 'Ultrasonic fat to lean evaluation', type: 'radio' },
            {field: 'sel_underlineeval', label: 'Underline Evaluation (gilt teat-line)', type: 'radio' },
            {field: 'sel_structuraleval', label: 'Structural Evaluation (feet & legs)', type: 'radio' },
            {field: 'sel_conformation', label: 'Conformation (desirable Body type)', type: 'radio' },
            {field: 'sel_linebreedchar', label: 'Line/breed characteristics', type: 'radio' },
            {field: 'sel_growthchar', label: 'Growth characteristics', type: 'radio' },
            {field: 'sel_mechanicalscales', label: 'Mechanical Scales', type: 'radio' },
            {field: 'sel_electronicscales', label: 'Electronic Scales', type: 'radio' },
        ];

        this.formfields_manure = [
            {field: 'manureequip_chopperpump', label: 'Chopper Pump', type: 'radio'},
            {field: 'manureequip_solidsspreader', label: 'Solids Spreader', type: 'radio'},
            {field: 'manureequip_liquidspreader', label: 'Liquid Spreader', type: 'radio'},
            {field: 'manureequip_liquidinjection', label: 'Liquid Injection', type: 'radio'},
            {field: 'manureequip_alleyscraper', label: 'Alley Scraper', type: 'radio'},
            {field: 'manureequip_flushsystem', label: 'Flush System', type: 'radio'},
            {field: 'manureequip_swingarmsystem', label: 'Swing Arm Application', type: 'radio'},
            {field: 'manureequip_pitsystems', label: 'Pit Systems', type: 'radio'},
            {field: 'manureequip_lagoonsystems', label: 'Lagoon Systems', type: 'radio'},
            {field: 'manureequip_skidsteerloader', label: 'Skid Steer Loader', type: 'radio'},
        ];

        this.formfields_feeding = [
            {field: 'feedequip_gridermixer', label: 'Grinder - Mixer', type: 'radio'},
            {field: 'feedequip_calibratemixmill', label: 'Calibrate Mix-Mill', type: 'radio'},
            {field: 'feedequip_computerfeeding', label: 'Computer Feeding', type: 'radio'},
            {field: 'feedequip_rfid', label: 'RFID Technology', type: 'radio'},
            {field: 'feedequip_esffeeding', label: 'ESF Feeding', type: 'radio'},
            {field: 'feedequip_dropsystemfeeders', label: 'Drop System Feeders', type: 'radio'},
            {field: 'feedequip_feederadjustments', label: 'Feeder Adjustments', type: 'radio'},
        ];

        this.formfields_skills = [
            {field: 'skills_arcwelding', label: 'Arc Welding', type: 'radio'},
            {field: 'skills_wirewelding', label: 'Wire Welding', type: 'radio'},
            {field: 'skills_oxyacetylene', label: 'Oxy/Acetylene', type: 'radio'},
            {field: 'skills_gasdieselrepair', label: 'Gas/Diesel Engine Repair', type: 'radio'},
            {field: 'skills_barnventilationskills', label: 'Barn Ventilation Skills', type: 'radio'},
            {field: 'skills_carpentry', label: 'Carpentry', type: 'radio'},
            {field: 'skills_electrical', label: 'Electrical', type: 'radio'},
            {field: 'skills_plumbing', label: 'Plumbing', type: 'radio'},
            {field: 'skills_concrete', label: 'Concrete', type: 'radio'},
        ];

        this.formfield_misc = [
            {field: 'misc_swineimportexport', label: 'Swine Import/Export', type: 'radio'},
            {field: 'misc_confinementop', label: 'Confinement Operation', type: 'radio'},
            {field: 'misc_outdoorpigprod', label: 'Outdoor Pig Production', type: 'radio'},
            {field: 'misc_organicfarming', label: 'Organic Farming', type: 'radio'},
            {field: 'misc_semitrailer', label: 'Semi-Trailer', type: 'radio'},
            {field: 'misc_composting', label: 'Composting', type: 'radio'},
            {field: 'misc_humaneeuthanasia', label: 'Humane Euthanasia', type: 'radio'},
            {field: 'misc_crops', label: 'Crops', type: 'radio'},
        ];

        this.formfield_training = [
            {field: 'training_cdl', label: 'CDL License', type: 'yes,no'},
            {field: 'training_pqa', label: 'PQA', type: 'yes,no'},
            {field: 'training_tqa', label: 'TQA', type: 'yes,no'},
            {field: 'training_pqaadvisor', label: 'PQA Advisor', type: 'yes,no'},
            {field: 'training_tqaadvisor', label: 'TQA Advisor', type: 'yes,no'},
            {field: 'training_foreignlanguage', label: 'Foreign Language', type: 'yes,no'},
            {field: 'training_foreignlanguagefluency', label: 'Foreign Language Fluency', type: 'basic,fluent', relation: 'top'},
            {field: 'training_foreignlanguagename', label: 'What Language?', type: 'text', relation: 'top'},
        ];
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
                                <h1>Animal Skills Checklist</h1>
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
                                    {this.props.buildControls(this.formfields_vetpractices, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="breeding_skillsheet">
                                    <h2>Breeding</h2>
                                    {this.props.buildControls(this.formfields_breeding, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="management_skillsheet">
                                    <h2>Management</h2>
                                    {this.props.buildControls(this.formfields_management, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="nutrition_skillsheet">
                                    <h2>Nutrition</h2>
                                    {this.props.buildControls(this.formfields_nutrition, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="selection_skillsheet">
                                    <h2>Selection</h2>
                                    {this.props.buildControls(this.formfields_selection, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="manure_skillsheet">
                                    <h2>Manure Equipment</h2>
                                    {this.props.buildControls(this.formfields_manure, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="feeding_skillsheet">
                                    <h2>Feeding Equipment</h2>
                                    {this.props.buildControls(this.formfields_feeding, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="skills_skillsheet">
                                    <h2>Additional Skills</h2>
                                    {this.props.buildControls(this.formfields_skills, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="misc_skillsheet">
                                    <h2>Miscellaneous</h2>
                                    {this.props.buildControls(this.formfield_misc, this.props.handleChange)}
                                </div>
                                <div className="formwrapper" id="training_skillsheet">
                                    <h2>Training</h2>
                                    {this.props.buildControls(this.formfield_training, this.props.handleChange)}
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
                                    <label>Record Keeping System Used:</label>
                                    <textarea value={this.props.data.recordkeepingsystem} onChange={this.props.handleChange} name="recordkeepingsystem"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>Number of sows:</label>
                                    <input value={this.props.data.numberofsows} onChange={this.props.handleChange} type="text" name="numberofsows" />
                                </div>
                                <div className="formrow">
                                    <label>Ave. Born Alive:</label>
                                    <input value={this.props.data.averagebornalive} onChange={this.props.handleChange} type="text" name="averagebornalive" />
                                </div>
                                <div className="formrow">
                                    <label>Ave. Weaned / Sow:</label>
                                    <input value={this.props.data.averageweanedsows} onChange={this.props.handleChange} type="text" name="averageweanedsows" />
                                </div>
                                <div className="formrow">
                                    <label>Number of Finished Pigs:</label>
                                    <input value={this.props.data.numberoffinishedpigs} onChange={this.props.handleChange} type="text" name="numberoffinishedpigs" />
                                </div>
                                <div className="formrow">
                                    <label>Confinement Experience / Size of Unit(s):</label>
                                    <input value={this.props.data.confinementsize} onChange={this.props.handleChange} type="text" name="confinementsize" />
                                </div>
                            </div>
                        </section> : null }
                    {this.props.currentpage == 3 ? 
                        <section id="supervisory_page">
                            <header>
                                <h1>Animal Skills Questions</h1>
                            </header>
                            <div className="formwrapper">
                                <div className="formrow">
                                    <label>Number Of People You Have Supervised At One Time: </label>
                                    <input value={this.props.data.numberofpeoplesupervised} onChange={this.props.handleChange} type="text" name="numberofpeoplesupervised" />
                                </div>
                                <div className="row two-col">
                                    <RadioGroup label="Do you like supervising?" value={this.props.data.doyoulikesupervising} field="doyoulikesupervising" choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]}  handleChange={this.props.handleChange} />
                                    <RadioGroup label="Do you feel you are a strong supervisor?" value={this.props.data.doyoufeelstrongsupervisor} field="doyoufeelstrongsupervisor" choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]}  handleChange={this.props.handleChange} />
                                    <RadioGroup label="Do you feel you are a strong leader?" value={this.props.data.doyoufeelstrongleader} field="doyoufeelstrongleader" choices={[{label: "Yes", val: "yes"}, {label: "No", val: "no"}]}  handleChange={this.props.handleChange} />
                                </div>
                                <div className="formrow">
                                    <label>Please Explain Your Management Skills:</label>
                                    <textarea value={this.props.data.managementskills} onChange={this.props.handleChange} name="managementskills"></textarea>
                                </div>
                                <div className="formrow">
                                    <label>Please Explain Your Computer Skills:</label>
                                    <p>
                                        (Office Programs, Dairy Software, Record Keeping Programs, etc.)
                                    </p>
                                    <textarea value={this.props.data.computerskills} onChange={this.props.handleChange} name="computerskills"></textarea>
                                </div>
                                
                                <div className="formrow">
                                    <label>Please Explain Your Laboratory Skills:</label>
                                    <textarea value={this.props.data.labskills} onChange={this.props.handleChange} name="labskills"></textarea>
                                </div>
                            </div>
                            <div className="application_completion">
                                <h2>Submit Skill Sheet</h2>
                                <p>
                                    To complete and submit your skill sheet to prospective employers, type your initials in the box below, then click <strong>Complete Skill Sheets.</strong>
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
        )
    }
}