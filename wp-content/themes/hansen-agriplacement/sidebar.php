<div id="sidebar">
    <?php if($post->ID != 59 && !$post->ID != 61): ?>
        <section id="latestjobs">
            <h1>Featured Jobs
                <svg version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    x="0px" y="0px" width="51.9px" height="12.7px" viewBox="0 0 51.9 12.7" enable-background="new 0 0 51.9 12.7"
                    xml:space="preserve">
                <defs>
                </defs>
                <path id="XMLID_15_" fill="#282218" d="M28.5,0l-4.3,0c-0.3,0-0.6,0.1-0.9,0.4l-4.9,5H0l0,1.9h18.3l5,5.1c0.2,0.2,0.5,0.4,0.9,0.4
                    h4.3l-5.6-5.7c-0.2-0.2-0.5-0.4-0.9-0.4h-1.3V6.1H22c0.3,0,0.6-0.1,0.9-0.4L28.5,0z M31.4,7.8c-0.2-0.2-0.5-0.4-0.9-0.4h-4.3l4.9,5
                    c0.2,0.2,0.5,0.4,0.9,0.4h4.3L31.4,7.8z M39.2,7.8c-0.2-0.2-0.5-0.4-0.9-0.4H34l4.9,5c0.2,0.2,0.6,0.4,0.9,0.4h4.3L39.2,7.8z
                    M47,7.8c-0.2-0.2-0.5-0.4-0.9-0.4h-4.3l4.9,5c0.2,0.2,0.5,0.4,0.9,0.4h4.3L47,7.8z M36.3,0l-4.3,0c-0.3,0-0.6,0.1-0.9,0.4l-4.9,5
                    h4.3c0.3,0,0.6-0.1,0.9-0.4L36.3,0z M44.1,0l-4.3,0c-0.3,0-0.6,0.1-0.9,0.4l-4.9,5h4.3c0.3,0,0.6-0.1,0.9-0.4L44.1,0z M47,5
                    c-0.2,0.2-0.5,0.4-0.9,0.4h-4.3l4.9-5C46.9,0.1,47.2,0,47.5,0l4.3,0L47,5z"/>
                </svg>

            </h1>
            <div class="content">
                <ul>
                    <?php foreach(hansen_getFeaturedJobs(12) as $job): ?>                    
                        <?php if($job->is_featured == 1): ?>
                        <li class="featuredjob">
                        <?php else: ?>  
                        <li>
                        <?php endif; ?>
                            <a href="/jobs/<?php print sanitize_title($job->jobtitle); ?>-<?php print $job->pcr_job_id; ?>"><i class="fa fa-star"></i><?php print $job->jobtitle; ?> (<?php print $job->position_id; ?>)</a>
                        </li>
                    <?php endforeach; ?>                                        
                </ul>
                <a id="sidebar_register_btn" runat="server" href="/register" class="button">Register Today</a>
                <a id="sidebar_viewalljobs_btn" runat="server" href="/view-all-positions" class="button">View all Positions</a>
            </div>
        </section>
    <?php endif; ?>    
    <section id="employers">
        <h1>Employers</h1>
        <a class="button" href="/view-candidates">View Candidates</a>
    </section>
</div>