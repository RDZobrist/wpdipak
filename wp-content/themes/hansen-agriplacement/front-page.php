<?php get_header(); ?>
    <?php if (have_posts()) : while (have_posts()) : the_post();?>
        <div id="frontpage">
            <div id="heroimage">
                <div class="overlay">
                    <h2><img src="<?php bloginfo('stylesheet_directory'); ?>/images/leader.png" alt="The recognized leader in agricultural placement" /></h2>
                    <h3><img src="<?php bloginfo('stylesheet_directory'); ?>/images/deco.svg"/>Celebrating <?php print get_field('years'); ?> Years<img class="reversed" src="<?php bloginfo('stylesheet_directory'); ?>/images/deco.svg"/></h3>
                    <a class="button" href="/view-all-positions">View Jobs</a>
                    <a class="button" href="/view-candidates">View Candidates</a>
                </div>

                <div class="slider"> 
                    <?php $heroimages = get_field('hero_images'); ?>
                    <?php foreach($heroimages as $image): ?>
                        <div class="">
                            <img class="" src="<?php print $image['image']; ?>" />
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="largebackground">
                <div id="featuredjobs">
                    <div class="innerwrapper">
                        <h1>Featured Jobs</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th style="width:75px;">Job ID</th>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th>Salary Range</th>
                                    <th style="width: 55px;"></th>
                            </thead>
                            <tbody>
                                <?php foreach(hansen_getFeaturedJobs() as $job): ?>
                                    <tr>
                                        <td><?php print $job->position_id; ?></td>
                                        <td><a href="/jobs/<?php print sanitize_title($job->jobtitle); ?>-<?php print $job->pcr_job_id; ?>"><?php print $job->jobtitle; ?></a></td>
                                        <td><?php print $job->joblocation; ?></td>
                                        <td>$<?php print $job->minsalary; ?> - $<?php print $job->maxsalary; ?></td>
                                        <td><a href="/jobs?jid=<?php print $job->pcr_job_id; ?>"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/info.svg" /></a></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <div class="calltoaction">
                            <a class="button" href="/view-all-positions">View All Positions</a>
                            <a class="button" href="/register" runat="server" id="btn_registerbtn">Register Today</a>
                            <a class="button" id="btn_referafriend">Refer a Friend</a>									
                        </div>
                    </div>
                </div>

            <div class="largebackground">
                <div id="intro">
                    <div class="innerwrapper">
                        <h1>Discover Ag Job Opportunities</h1>
                        <div class="content">
                            <?php the_content(); ?>
                            <div class="clear"></div>
                        </div>
                        <div class="socialmedia">
                            Visit us on social media:
                            <ul>
                                <li>
                                    <a href="https://twitter.com/HansenAgriPLCMT" target="_blank">
                                        <svg version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                                                x="0px" y="0px" width="28.4px" height="28.4px" viewBox="0 0 28.4 28.4" enable-background="new 0 0 28.4 28.4"
                                                xml:space="preserve">
                                        <defs>
                                        </defs>
                                        <g>
                                            <path fill="#282218" d="M28.4,23.1c0,2.9-2.4,5.3-5.3,5.3H5.3c-2.9,0-5.3-2.4-5.3-5.3V5.3C0,2.4,2.4,0,5.3,0h17.8
                                                c2.9,0,5.3,2.4,5.3,5.3V23.1z M21.5,9.6c0.8-0.5,1.4-1.3,1.7-2.2c-0.8,0.4-1.6,0.8-2.5,0.9C20,7.6,19,7.1,17.9,7.1
                                                C15.7,7.1,14,8.9,14,11c0,0.3,0,0.6,0.1,0.9c-3.2-0.2-6.1-1.7-8-4.1c-0.3,0.6-0.5,1.3-0.5,2c0,1.4,0.6,2.5,1.7,3.2
                                                c-0.6,0-1.3-0.2-1.9-0.5c0,0,0,0,0,0c0,1.9,1.4,3.5,3.2,3.8c-0.3,0.1-0.6,0.1-0.9,0.1c-0.2,0-0.5,0-0.7-0.1
                                                c0.5,1.5,1.9,2.7,3.6,2.7c-1.3,1-3,1.7-4.8,1.7c-0.3,0-0.6,0-0.9-0.1c1.7,1.1,3.8,1.7,6,1.7c7.1,0,11.1-5.9,11.1-11.1
                                                c0-0.2,0-0.3,0-0.5c0.8-0.5,1.4-1.2,1.9-2C23,9.2,22.3,9.4,21.5,9.6z"/>
                                        </g>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/HansenAgriPLACEMENT/" target="_blank">
                                        <svg version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                                                x="0px" y="0px" width="27.7px" height="27.7px" viewBox="0 0 27.7 27.7" enable-background="new 0 0 27.7 27.7"
                                                xml:space="preserve">
                                        <defs>
                                        </defs>
                                        <g>
                                            <path fill="#282218" d="M27.7,1.5v24.7c0,0.8-0.7,1.5-1.5,1.5h-7.1V17h3.6l0.5-4.2h-4.1v-2.7c0-1.2,0.3-2,2.1-2l2.2,0V4.4
                                                c-0.4-0.1-1.7-0.2-3.2-0.2c-3.2,0-5.4,1.9-5.4,5.5v3.1h-3.6V17h3.6v10.7H1.5c-0.8,0-1.5-0.7-1.5-1.5V1.5C0,0.7,0.7,0,1.5,0h24.7
                                                C27.1,0,27.7,0.7,27.7,1.5z"/>
                                        </g>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/company/hansen-agri-placement?trk=tyah&trkInfo=clickedVertical%3Acompany%2CentityType%3AentityHistoryName%2CclickedEntityId%3Acompany_company_7054689%2Cidx%3A0" target="_blank">
                                        <svg version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                                                x="0px" y="0px" width="28.3px" height="28.3px" viewBox="0 0 28.3 28.3" enable-background="new 0 0 28.3 28.3"
                                                xml:space="preserve">
                                        <defs>
                                        </defs>
                                        <g>
                                            <path fill="#282218" d="M28.3,23c0,2.9-2.4,5.3-5.3,5.3H5.3C2.4,28.3,0,25.9,0,23V5.3C0,2.4,2.4,0,5.3,0H23c2.9,0,5.3,2.4,5.3,5.3
                                                V23z M6.5,4.8c-1.5,0-2.4,1-2.4,2.2c0,1.2,0.9,2.2,2.4,2.2h0c1.5,0,2.4-1,2.4-2.2C8.9,5.7,8,4.8,6.5,4.8z M8.6,23.7V10.9H4.4v12.8
                                                H8.6z M23.9,23.7v-7.3c0-3.9-2.1-5.8-4.9-5.8c-2.3,0-3.3,1.3-3.9,2.2h0v-1.9H11c0,0,0.1,1.2,0,12.8h4.3v-7.2c0-0.4,0-0.8,0.1-1
                                                c0.3-0.8,1-1.5,2.2-1.5c1.5,0,2.1,1.2,2.1,2.9v6.8H23.9z"/>
                                        </g>
                                        </svg>
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>


                <div id="featuredcandidates">
                    <div class="innerwrapper">
                        <h1>Our Candidates</h1>
                        <div class="content">                            
                            <?php print get_field('featured_candidates'); ?>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
                <div id="psalms">
                    <h1>"Unless The Lord Builds the House,  We Labor In Vain Who Build It"</h1>
                    <h2>PSALMS 127:1</h2>
                    <div class="desc">
                        The Nation's Oldest and Most Highly Respected Ag Agency, Serving Agri Business and Production Agriculture Since 1959.
                    </div>
                </div>
            </div>
        </div>
    <?php endwhile; endif; ?>
<?php get_footer(); ?>