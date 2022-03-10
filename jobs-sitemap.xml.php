<?php
    require_once('./wp-load.php');    
    $endpointurl = HANSEN_API . '/api/v1/jobs?categories=all';        

    $response = wp_remote_get($endpointurl);
    $returnedjobs = array();
    $returnedcategories = array();
    if(wp_remote_retrieve_response_code( $response ) == 200){            
        $jobs = json_decode($response['body']);
        $returnedjobs = $jobs->jobs;            
    }  
    header('Content-type: application/xml');
    print '<?xml version="1.0" encoding="UTF-8"?>';
    print '<?xml-stylesheet type="text/xsl" href="' . get_site_url() . '/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>';
?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <?php foreach($returnedjobs as $job): ?>
        <url>
            <loc><?php print get_site_url() . "/jobs/" . sanitize_title($job->jobtitle) . "-" . $job->pcr_job_id; ?></loc>
            <lastmod><?php print $job->posted_on; ?></lastmod>
        </url>
    <?php endforeach; ?>	
</urlset>