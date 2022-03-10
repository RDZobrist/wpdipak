<?php

    remove_action('template_redirect', 'redirect_canonical');
    add_action('template_redirect', 'hansen_redirects');
    add_action('after_setup_theme', 'theme_setup');
    add_action( 'login_enqueue_scripts', 'custom_login_logo' );
    add_action('init', 'hansen_rewrites_init');
    add_filter('wpseo_sitemap_index', 'hansen_add_custom_sitemap_items');
    //add_filter( 'wpseo_enable_xml_sitemap_transient_caching', '__return_false');
    add_filter( 'wpseo_canonical', 'hansen_set_custom_jobpost_canonical');

    add_filter('query_vars', 'hansen_query_vars');
    //add_action('wp', 'hansen_custompaths');

    function theme_setup(){
        //Load Scripts        
        add_action('wp_enqueue_scripts', 'load_scripts');
        
        //Load Styles
        add_action('wp_enqueue_scripts', 'load_styles');
        
        add_action('init','load_menus');
        add_shortcode('hansen-job-listing', 'hansen_jobListing');
        add_shortcode('hansen-candidate-listing', 'hansen_candidateListing');

    }

    function hansen_redirects(){
        global $post;

        if($post){
            if($post->post_name == "view-all-positions" || $post->post_name  == "agri-business" || $post->post_name == "ag-production"){
                $catid = isset($_GET['cat']) ? $_GET['cat'] : '';


                if(!empty($catid)){
                    $endpointurl = HANSEN_API . '/api/v1/jobs?categories=';

                    $response = wp_remote_get($endpointurl);                    
                    $returnedcategories = array();
                    if(wp_remote_retrieve_response_code( $response ) == 200){            
                        $jobs = json_decode($response['body']);                        
                        $returnedcategories = $jobs->categories;
                        $foundcategory = null;
                        if(count($returnedcategories) > 0 && is_array($returnedcategories)){
                            foreach($returnedcategories as $category){
                                if($category->id == intval($catid)){
                                    $foundcategory = $category;
                                    break;
                                }
                            }
                        }

                        if($foundcategory){
                            wp_redirect( "/" . $post->post_name . "/" . $foundcategory->slug);
                            exit;
                        }
                    }  
                }                
            }
        }        
    }

    function hansen_rewrites_init(){
        add_rewrite_rule(
            'view-all-positions/([a-z0-9_-]+)/?$',
            'index.php?pagename=view-all-positions&catslug=$matches[1]',
            'top'
        );

        add_rewrite_rule(
            'agri-business/([a-z0-9_-]+)/?$',
            'index.php?pagename=agri-business&catslug=$matches[1]',
            'top'
        );

        add_rewrite_rule(
            'ag-production/([a-z0-9_-]+)/?$',
            'index.php?pagename=ag-production&catslug=$matches[1]',
            'top'
        );

        add_rewrite_rule(
            'jobs/([a-z0-9_-]+)/?$',
            'index.php?pagename=jobs&jobslug=$matches[1]',
            'top'
        );
    }

    function hansen_query_vars($queryvars){
        $queryvars[] = 'catslug';
        $queryvars[] = 'jobslug';
        return $queryvars;
    }

    function custom_login_logo() { ?>
        <style type="text/css">
            #login h1 a, .login h1 a {
                background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/images/logo.svg);            
                width:320px;
                background-size: auto 100%;
                background-repeat: no-repeat;
                padding-bottom: 30px;
            }
        </style>
    <?php }
    

    function load_scripts(){                
        /*wp_enqueue_script('theme-alertify', get_template_directory_uri() . '/js/alertify.js', array('jquery'), null, true);
        wp_enqueue_script('theme-velocity', get_template_directory_uri() . '/js/velocity.min.js', array('jquery'), null, true);
        wp_enqueue_script('theme-outdatedbrowser', get_template_directory_uri() . '/js/outdatedbrowser.min.js', array('jquery'), null, true);
        wp_enqueue_script('theme-breakpoints', get_template_directory_uri() . '/js/breakpoints.js', array('jquery'), null, true);
        wp_enqueue_script('theme-hoverintent', get_template_directory_uri() . '/js/hoverIntent.js', array('jquery'), null, true);
        wp_enqueue_script('theme-supersubs', get_template_directory_uri() . '/js/supersubs.js', array('jquery'), null, true);
        wp_enqueue_script('theme-superfish', get_template_directory_uri() . '/js/superfish.js', array('jquery'), null, true);
        wp_enqueue_script('theme-slick', get_template_directory_uri() . '/js/slick.min.js', array('jquery'), null, true);        
        wp_enqueue_script('theme-jscookie', get_template_directory_uri() . '/js/js.cookie.js', array('jquery'), null, true);        
        wp_enqueue_script('theme-serailize', get_template_directory_uri() . '/js/jquery.serialize-object.js', array('jquery'), null, true);        
        wp_enqueue_script('theme-dynatable', get_template_directory_uri() . '/js/jquery.dynatable.js', array('jquery'), null, true);        
        wp_enqueue_script('theme-raf', get_template_directory_uri() . '/js/requestAnimationFrame.js', array('jquery'), null, true);        
        wp_enqueue_script('theme-responsivetables', get_template_directory_uri() . '/js/responsive-tables.js', array('jquery'), null, true);        
        wp_enqueue_script('theme-mainscript', get_template_directory_uri() . '/js/script.js?v=1.10', array('jquery', 'theme-velocity'), null, true);        */

        wp_enqueue_script('theme-mainscript', get_template_directory_uri() . '/js/all.js?v=051', array('jquery'), null, true);
        wp_enqueue_script('theme-hansenapp', get_template_directory_uri() . '/js/reactapp.js?v=052', array('jquery'), null, true);
    }

    function load_styles(){	    
        wp_enqueue_style('theme_style', get_template_directory_uri() . '/style.css?v=0502', null, null);
    }	

	function load_menus(){
	    register_nav_menus(array('mainmenu' => __('Main Menu')));
    }
    
    function hansen_custompaths($wp){

    }

    function hansen_add_custom_sitemap_items() {

        $sitemap_custom_items = "<sitemap><loc>" . get_site_url() . "/jobs-sitemap.xml.php</loc>";
        $sitemap_custom_items .= "<lastmod>" . date("Y-m-d") . "T" . date("H:i:sP") . "</lastmod>";
        $sitemap_custom_items .= "</sitemap>";

        return $sitemap_custom_items;
    }

    function hansen_set_custom_jobpost_canonical($canonical) {
        global $wp;        
        $current_url = home_url(add_query_arg(array(),$wp->request));        
        if (strpos($current_url, "jobs/") !== false) {
            $canonical = get_site_url() . "/" . $wp->request;
        }        

        return $canonical;
    }

    function hansen_isApplicantAuth(){
        if(isset($_COOKIE['hansentoken'])){
            return true;
        }else{
            return false;
        }        
    }

    function hansen_getFeaturedJobs($count = -1){
        $response = wp_remote_get(HANSEN_API . '/api/v1/jobs/featured?take=' . $count);
        if(wp_remote_retrieve_response_code( $response ) == 200){            
            $jobs = json_decode($response['body']);
            return $jobs->jobs;
        }        
    }

    function hansen_getJobById($jid){
        $response = wp_remote_get(HANSEN_API . '/api/v1/jobs/' . $jid);
        if(wp_remote_retrieve_response_code( $response ) == 200){            
            $jobs = json_decode($response['body']);
            return $jobs->job;
        }else{
            return null;
        }
    }

    function hansen_getCandidateById($cid){
        $response = wp_remote_get(HANSEN_API . '/api/v1/candidates/' . $cid);
        if(wp_remote_retrieve_response_code( $response ) == 200){            
            $candidates = json_decode($response['body']);
            return $candidates->candidate;
        }else{
            return null;
        }
    }

    function hansen_applyForJobById(){
        
    }

    function hansen_candidateListing($attr){

        $catfilter = null;
        if(isset($_GET['cat'])){            
            $catfilter = $_GET['cat'];
        }

        $categories = "";
        if(isset($attr['categories'])){    
            $categories = $attr['categories'];
        }

        $endpointurl = HANSEN_API . '/api/v1/candidates?categories=all';
        if($catfilter != null){
            $endpointurl .= "&filtercat=" . $catfilter;
        }

        $response = wp_remote_get($endpointurl);
        $returnedcandidates = array();
        $returnedcategories = array();
        if(wp_remote_retrieve_response_code( $response ) == 200){            
            $candidates = json_decode($response['body']);
            $returnedcandidates = $candidates->candidates;
            $returnedcategories = $candidates->categories;
        } 
        
        ob_start();
        ?>            
            <div class="joblisting">
                <select name="jobcategory" data-type="jobs">
                    <option value="">All Categories</option>
                    <?php foreach($returnedcategories as $category): ?>
                        <?php if($category->for_candidates == 1): ?> 
                            <option <?php if($catfilter == $category->id): ?> selected<?php endif; ?> value="<?php print $category->id; ?>"><?php print $category->categoryfullname; ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>
                <table class="responsive">
                    <thead>
                        <tr>
                            <th style="width:15%;">Reference Number</th>
                            <th style="width:35%">Title</th>
                    </thead>
                    <tbody>

                       <?php if(!empty($returnedcandidates)): ?>
                            <?php foreach($returnedcandidates as $candidate): ?>                            
                                <tr>
                                    <td><?php print $candidate->referencenum; ?></td>
                                    <td><a href="/candidate?cid=<?php print $candidate->candidate_id; ?>"><?php print $candidate->positiontitle; ?></a></td>                                    
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?> 
                    </tbody>
                </table>
                <script type='text/javascript'>var limitcats = '<?php print $categories; ?>';</script>
                <script type="text/javascript">
                    (function ($) {
                        $(document).ready(function(){
                            $(".joblisting table").dynatable({
                                dataset: {
                                     perPageDefault: 20,
                                     perPageOptions: [],
                                     perPageText: null
                                }
                            });

                            $(".joblisting > select").change(function(e){       
                                if(e.target.value == ""){
                                    window.location = window.location.pathname;
                                }else{
                                    window.location = window.location.pathname + "?cat=" + e.target.value;
                                }
                            });
                        });
                    })(jQuery);
                </script>	
            </div>
        <?php 

        $joblisting = ob_get_clean();

        return $joblisting;
    }

    function hansen_jobListing($attr){
        $agribusiness_group = array(
            "Accounting / Banking / Financial",
            "Ag Chemical / Fertilizer",
            "Agronomy",
            "Animal Health / DVM",
            "Energy / Biofuels",
            "Equipment",
            "Feed / Animal Nutrition",
            "Food Processing",
            "Grain",
            "Management",
            "Manufacturing / Processing",
            "Merchandisers / Traders",
            "Miscellaneous",
            "Sales / Marketing",
            "Seed",
            "Transportation / Logistics"
        );

        $agproduction_group = array(
            "Agronomy, On-Farm",
            "Dairy Production",
            "Farm Production",
            "Feedlot Production",
            "Poultry Production",
            "Ranch Production",
            "Swine Production"
        );

        $listingcats = "";

        if($attr['categories'] == "agribusiness"){
            $listingcats = implode(",", $agribusiness_group);
        }

        if($attr['categories'] == "agproduction"){
            $listingcats = implode(",", $agproduction_group);
        }

        if($listingcats == ""){
            $listingcats = $attr['categories'];
        }

        $catfilter = null;
        if(!empty(get_query_var('catslug'))){
            $catfilter = get_query_var('catslug');
        }

        /*if(isset($_GET['cat'])){            
            $catfilter = $_GET['cat'];
        }*/

        $endpointurl = HANSEN_API . '/api/v1/jobs?categories=' . $listingcats;
        if($catfilter != null){
            $endpointurl .= "&filtercat=" . $catfilter;
        }

        $response = wp_remote_get($endpointurl);
        $returnedjobs = array();
        $returnedcategories = array();
        if(wp_remote_retrieve_response_code( $response ) == 200){            
            $jobs = json_decode($response['body']);
            $returnedjobs = $jobs->jobs;
            $returnedcategories = $jobs->categories;
        }  
        ob_start();
        ?>            
            <div class="joblisting">                
                <select name="jobcategory" data-type="jobs">
                    <option value="">All Categories</option>
                    <?php foreach($returnedcategories as $category): ?>      
                        <?php if($category->for_positions == 1): ?>                  
                            <option <?php if($catfilter == $category->slug): ?> selected<?php endif; ?> value="<?php print $category->slug; ?>"><?php print $category->categoryfullname; ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>
                <table class="responsive" id="joblisting_tbl">
                    <thead>
                        <tr>      
                            <th style="display:none">Is Featured</th>                      
                            <th style="width:15%;">Job Order #</th>
                            <th style="width:35%">Title</th>
                            <th>Location</th>
                           <!--  <th style="display:none">Description</th> -->
                            <th style="display:none">Job Type</th>
                            <th>Salary</th>
                    </thead>
                    <tbody>
                        <?php if(!empty($returnedjobs)): ?>
                            <?php foreach($returnedjobs as $job): ?>
                            <?php if($job->is_featured): ?>
                            <tr class="featuredjob">
                            <?php else: ?>
                            <tr>
                            <?php endif; ?>           
                                <td style="display:none"><?php print $job->is_featured; ?></td>                     
                                <td><?php print $job->position_id; ?></td>
                                <td><a href="/jobs/<?php print sanitize_title($job->jobtitle); ?>-<?php print $job->pcr_job_id; ?>"><?php print $job->jobtitle; ?></a></td>
                                <td><?php print $job->joblocation; ?></td>
                               <!--  <td style="display:none"><?php print $job->description; ?></td> -->
                                <td style="display:none"><?php print $job->jobtype; ?></td>
                                <td>$<?php print $job->minsalary; ?> - $<?php print $job->maxsalary; ?></td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?> 
                    </tbody>
                </table>
                <script type='text/javascript'>var limitcats = '<?php print $attr['categories']; ?>';</script>
                <script type="text/javascript">
                    (function ($) {
                        var joblis = <?php echo json_encode($returnedjobs) ?>;
                        $(document).ready(function(){


                                $('.joblisting table').DataTable({
           
                                    "pageLength": 20,
                                    
                                    order: [['0', 'desc']]
                                    
                                    
                                });
                                //  var i=0;
                            // $('#joblisting_tbl tbody tr').each(function(index, tr){
                            //   if (joblis[i].is_featured > 0) {
                            //     $(tr).addClass("featuredjob");
                            //   }
                            //     i++;
                            // });

                            // $(".joblisting table").dynatable({
                            //     dataset: {
                            //          perPageDefault: 20,
                            //          perPageOptions: [],
                            //          perPageText: null
                            //     },
                            //     writers: {
                            //         _rowWriter: function(rowIndex, record, column, cellWriter){
                            //             var row;
                            //             if(record.isFeatured == "1"){
                            //                 row += "<tr class='featuredjob'>";
                            //             }else{
                            //                 row += "<tr>";
                            //             }

                            //             row += "<td>" + record["jobOrder-#"] + "</td>";
                            //             row += "<td>" + record.title + "</td>";
                            //             row += "<td>" + record.location + "</td>";
                            //             row += "<td>" + record.salary + "</td>";
                                        
                            //             row += "</tr>";

                            //             return row;
                            //         }
                            //     }
                            // });

                            $(".joblisting > select").change(function(e){      
                                var pathname = window.location.pathname.split("/");                                
                                if(e.target.value == ""){
                                    window.location = "/" + pathname[1];
                                }else{
                                    window.location = "/" + pathname[1] + "/" + e.target.value;
                                }
                            });
                        });

                        
                    })(jQuery);
                </script>	
            </div>
        <?php 

        $joblisting = ob_get_clean();

        return $joblisting;


    }
	
	$search_args = array(
		'name' => 'Search',
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget' => '</section>',
		'before_title' => '',
		'after_title' => ''	
	);	
	
	
?>