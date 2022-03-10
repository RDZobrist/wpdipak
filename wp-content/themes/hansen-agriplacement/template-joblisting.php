<?php /* Template Name: Job Listing Page */ ?>
<?php 
    $jobslug = get_query_var('jobslug');
    if(empty($jobslug)){
        $jobid = $_GET['jid'];
        $job = hansen_getJobById($jobid);
        wp_redirect('/jobs/' . sanitize_title( $job->jobtitle ) . "-" . $jobid);
    }else{
        $jobslugexploded = explode('-', $jobslug);
        $jobid = $jobslugexploded[count($jobslugexploded) - 1];    
        $job = hansen_getJobById($jobid); 
    }    
?>
<?php get_header(); ?>
    <div id="subpage">
        <?php if (have_posts()) : while (have_posts()) : the_post();?>
            <article class="page">
                <header>
                    <div class="overlay">
                        <h1 id="pagetitle" class="pagetitle" ><?php the_title(); ?> - <?php print (isset($job->jobtitle)) ? $job->jobtitle : ''; ?></h1>
                    </div>            
                </header>
                <div class="innerwrapper">
                    <div class="content">
                        <?php if(!empty($jobid)): ?>
                            <input type="hidden" id="job_id" value="<?php print $jobid; ?>" />
                            <section id="jobdetails">   
                                                       
                                <h1 id="positionTitle">Job Title: <?php print (isset($job->jobtitle)) ? $job->jobtitle : '';  ?></h1>
                                <div id="jobid"><strong>Job Order #:</strong> <?php print (isset($job->position_id)) ? $job->position_id : '';?></div><br />
                                <strong>Location: </strong> <span id="jobLocation"><?php print (isset($job->joblocation)) ? $job->joblocation : ''; ?></span><br /><br />
                                <strong>Salary Range: </strong> <span id="jobSalaryRange">$<?php print (isset($job->minsalary)) ? $job->minsalary : ''; ?> - $<?php print (isset($job->maxsalary)) ? $job->maxsalary : ''; ?></span><br /><br/>
                                <strong>Commission / Bonus: </strong><?php print (isset($job->bonus)) ? $job->bonus : ''; ?><br /><br />
                                <strong>Benefits: </strong> <?php print (isset($job->benefits)) ? $job->benefits : ''; ?><br /><br />
                                <div class="desc">
                                    <?php print (isset($job->description)) ? $job->description : ''; ?><br /><br />
                                </div>
                                <div class="desc">
                                    <strong>Contact Info:</strong><br />
                                    <?php print (isset($job->contactinfo)) ? $job->contactinfo : '';  ?>
                                </div>
                                <div class="calltoaction">
                                    <?php if(isset($_COOKIE['hansentoken'])): ?>
                                        <a  id="btn_jobapply" class="button">Apply Now</a>
                                    <?php else: ?>
                                        <a href="/login?redirecttojob=<?php print sanitize_title((isset($job->jobtitle)) ? $job->jobtitle : ''); ?>-<?php print (isset($job->pcr_job_id)) ? $job->pcr_job_id : ''; ?>" id="btn_jobapply" class="button">Login to Apply</a>
                                        <a href="/register" id="btn_jobapply" class="button">Register</a>
                                    <?php endif; ?>                                    
                                    <a id="btn_referafriend" class="button">Refer a Friend</a>
                                </div>
                            </section>
                        <?php else: ?>
                            No valid job ID found.
                        <?php endif; ?>
                        <div class="clear"></div>
                    </div>
                    <?php get_sidebar(); ?>
                </div>
            </article>
        <?php endwhile; endif; ?>
        <div id="psalms">
            <h1>"Unless The Lord Builds the House,  We Labor In Vain Who Build It"</h1>
            <h2>PSALMS 127:1</h2>
            <div class="desc">
                The Nation's Oldest and Most Highly Respected Ag Agency, Serving Agri Business and Production Agriculture Since 1959.
            </div>
        </div>     
    </div>
    
<?php get_footer(); ?>