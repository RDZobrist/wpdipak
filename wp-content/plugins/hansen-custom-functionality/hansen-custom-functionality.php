<?php
/*
 * Plugin Name: Hansen AgriPlacement Custom Functionality
 * Plugin URI: 
 * Description: 
 * Version: 1.0.0
 * Author: Joseph Pender
 * Author URI: http://vistacomm.com
 * 
 *
 * Copyright: @ 2017 VistaComm
 * 
 */

if(!defined('ABSPATH')) exit; // Exit if accessed directly

add_filter('admin_menu', 'hansen_application_menu');
add_action('admin_enqueue_scripts', 'hansen_load_scripts');

function hansen_load_scripts(){
    wp_enqueue_script('hansenwp_reactapp', plugin_dir_url( __FILE__ ) . 'js/reactapp.js?v=1.1', null, null, true);    
    wp_enqueue_style( 'hansen_reactapp-styles', plugin_dir_url( __FILE__ ) . 'css/hansen-custom-functionality.css', null, null );
    wp_enqueue_style( 'hansen_foundationicons', plugin_dir_url( __FILE__ ) . 'css/foundation-icons/foundation-icons.css', null, null );
}

function hansen_application_menu(){
    add_menu_page("Applications", "Applications", "edit_posts", "hansen-applications", "hansen_render_application_admin");
}

function hansen_render_application_admin(){
    ?>
        <script>
            var hansenapi = "<?php print HANSEN_API; ?>";
        </script>
        <div class="wrap">
            <h1 class="wp-heading-inline">Hansen Agri-Placement Application Data</h1>

            <div id="hansen_wordpresspanel"></div>
            
        </div>
    <?php 
}