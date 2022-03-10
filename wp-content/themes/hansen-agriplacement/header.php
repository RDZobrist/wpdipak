<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php wp_title('|'); ?></title>   
        <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
        <!-- Facebook Pixel Code -->
        <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1630566566966126');
        fbq('track', 'PageView');
        </script>
        <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1630566566966126&ev=PageView&noscript=1"
        /></noscript>
        <!-- End Facebook Pixel Code -->
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KC6ZD7Q');</script>
        <!-- End Google Tag Manager -->
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->        
        <script src="https://use.typekit.net/gqf1bmc.js"></script>
        <script>try{Typekit.load({ async: true });}catch(e){}</script>
        <script src="https://cdn.ravenjs.com/3.18.1/raven.min.js" crossorigin="anonymous"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <script>
            function addLoadEvent(func) {
                var oldonload = window.onload;
                if (typeof window.onload != 'function') {
                    window.onload = func;
                } else {
                    window.onload = function() {
                        if (oldonload) {
                            oldonload();
                        }
                        func();
                    }
                }
            }
            //call plugin function after DOM ready
            addLoadEvent(function(){
                outdatedBrowser({
                    bgColor: '#f25648',
                    color: '#ffffff',
                    lowerThan: 'transform'                
                })
            });
        </script>
        <script>
            Raven.config('https://14c0308184ae474e8d41936513b6392a@sentry.io/206987').install();
            var hansenapi = "<?php print HANSEN_API; ?>";
        </script>
        <?php wp_head(); ?>
        <script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript">
            /* <![CDATA[ */
            goog_snippet_vars = function(conversionlabel) {
                var w = window;
                w.google_conversion_id = 1048248915;
                w.google_conversion_label = conversionlabel;
                w.google_remarketing_only = false;
            }
            // DO NOT CHANGE THE CODE BELOW.
            goog_report_conversion = function(label, url) {
                goog_snippet_vars(label);
                window.google_conversion_format = "3";
                var opt = new Object();
                opt.onload_callback = function() {
                    if (typeof(url) != 'undefined') {
                        window.location = url;
                    }
                }

                var conv_handler = window['google_trackConversion'];
                if (typeof(conv_handler) == 'function') {
                    conv_handler(opt);
                }
            }
            /* ]]> */
        </script>
        <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion_async.js"></script>
        <link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/images/favicon/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="57x57" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_directory'); ?>/images/favicon/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/images/favicon/favicon-16x16.png" sizes="16x16">
        <link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/images/favicon/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/images/favicon/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/images/favicon/android-chrome-192x192.png" sizes="192x192">
        <meta name="msapplication-square70x70logo" content="<?php bloginfo('template_directory'); ?>/images/favicon/smalltile.png" />
        <meta name="msapplication-square150x150logo" content="<?php bloginfo('template_directory'); ?>/images/favicon/mediumtile.png" />
        <meta name="msapplication-wide310x150logo" content="<?php bloginfo('template_directory'); ?>/images/favicon/widetile.png" />
        <meta name="msapplication-square310x310logo" content="<?php bloginfo('template_directory'); ?>/images/favicon/largetile.png" />


    </head>
	<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P7PXXZ8"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div id="wrapper">
        <header class="main">
            <div class="innerwrapper">
                <h1 id="logo"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/logo.svg" alt="Hansen Agri-PLACEMENT" /></h1>
                <?php if(!hansen_isApplicantAuth()): ?>
                    <a id="signinbtn">
                        <svg class="icon" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                                x="0px" y="0px" width="57.9px" height="57.9px" viewBox="0 0 57.9 57.9" enable-background="new 0 0 57.9 57.9"
                                xml:space="preserve">
                        <defs>
                        </defs>
                        <g>
                            <g>
                                <circle fill="#DD3839" cx="28.9" cy="28.9" r="28.9"/>
                            </g>
                            <g opacity="0.2">
                                <g>
                                    <path fill="#231F20" d="M39.7,43c-3.5-1.5-4.7-3.8-5.1-5.8c2.5-2,4.5-5.2,5.6-8.7c1.1-1.4,1.8-2.9,1.8-4.2c0-0.9-0.3-1.5-0.9-2
                                        C40.9,15,35.7,9.1,29.3,9c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c-6.4,0-11.6,5.8-11.9,13c-0.8,0.5-1.3,1.2-1.3,2.2
                                        c0,1.5,0.9,3.3,2.4,4.9c1.1,3,2.8,5.8,5,7.6c-0.3,2.1-1.5,4.6-5.2,6.1c-2,0.8-5.5,1.6-7.1,2.4c3.9,4.3,11.4,7,17.7,7.1l0.1,0
                                        c0,0,0,0,0,0c6.3,0,13.9-2.7,17.8-7.1C45.2,44.6,41.6,43.8,39.7,43z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path fill="#FFFFFF" d="M39.7,41.2c-3.5-1.5-4.7-3.8-5.1-5.8c2.5-2,4.5-5.2,5.6-8.7c1.1-1.4,1.8-2.9,1.8-4.2c0-0.9-0.3-1.5-0.9-2
                                        c-0.2-7.3-5.4-13.2-11.8-13.3c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c-6.4,0-11.6,5.8-11.9,13c-0.8,0.5-1.3,1.2-1.3,2.2
                                        c0,1.5,0.9,3.3,2.4,4.9c1.1,3,2.8,5.8,5,7.6c-0.3,2.1-1.5,4.6-5.2,6.1c-2,0.8-5.5,1.6-7.1,2.4c3.9,4.3,11.4,7,17.7,7.1l0.1,0
                                        c0,0,0,0,0,0c6.3,0,13.9-2.7,17.8-7.1C45.2,42.8,41.6,42,39.7,41.2z"/>
                                </g>
                            </g>
                        </g>
                        </svg>

                        My Account
                    </a>
                <?php else: ?>
                    <a id="accountbtn">
                        <svg class="icon" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                                x="0px" y="0px" width="57.9px" height="57.9px" viewBox="0 0 57.9 57.9" enable-background="new 0 0 57.9 57.9"
                                xml:space="preserve">
                        <defs>
                        </defs>
                        <g>
                            <g>
                                <circle fill="#DD3839" cx="28.9" cy="28.9" r="28.9"/>
                            </g>
                            <g opacity="0.2">
                                <g>
                                    <path fill="#231F20" d="M39.7,43c-3.5-1.5-4.7-3.8-5.1-5.8c2.5-2,4.5-5.2,5.6-8.7c1.1-1.4,1.8-2.9,1.8-4.2c0-0.9-0.3-1.5-0.9-2
                                        C40.9,15,35.7,9.1,29.3,9c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c-6.4,0-11.6,5.8-11.9,13c-0.8,0.5-1.3,1.2-1.3,2.2
                                        c0,1.5,0.9,3.3,2.4,4.9c1.1,3,2.8,5.8,5,7.6c-0.3,2.1-1.5,4.6-5.2,6.1c-2,0.8-5.5,1.6-7.1,2.4c3.9,4.3,11.4,7,17.7,7.1l0.1,0
                                        c0,0,0,0,0,0c6.3,0,13.9-2.7,17.8-7.1C45.2,44.6,41.6,43.8,39.7,43z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path fill="#FFFFFF" d="M39.7,41.2c-3.5-1.5-4.7-3.8-5.1-5.8c2.5-2,4.5-5.2,5.6-8.7c1.1-1.4,1.8-2.9,1.8-4.2c0-0.9-0.3-1.5-0.9-2
                                        c-0.2-7.3-5.4-13.2-11.8-13.3c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c-6.4,0-11.6,5.8-11.9,13c-0.8,0.5-1.3,1.2-1.3,2.2
                                        c0,1.5,0.9,3.3,2.4,4.9c1.1,3,2.8,5.8,5,7.6c-0.3,2.1-1.5,4.6-5.2,6.1c-2,0.8-5.5,1.6-7.1,2.4c3.9,4.3,11.4,7,17.7,7.1l0.1,0
                                        c0,0,0,0,0,0c6.3,0,13.9-2.7,17.8-7.1C45.2,42.8,41.6,42,39.7,41.2z"/>
                                </g>
                            </g>
                        </g>
                        </svg>

                        <span id="accountname"></span>
                    </a>

                <?php endif; ?>
                
                <a id="mobilemenubtn">
                    <span class="label">
                        <svg class="icon" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                                x="0px" y="0px" width="57.9px" height="57.9px" viewBox="0 0 57.9 57.9" enable-background="new 0 0 57.9 57.9"
                                xml:space="preserve">
                        <defs>
                        </defs>
                        <g>
                            <g>
                                <circle fill="#DD3839" cx="28.9" cy="28.9" r="28.9"/>
                            </g>
                            <g opacity="0.2">
                                <g>
                                    <path fill="#231F20" d="M39.7,43c-3.5-1.5-4.7-3.8-5.1-5.8c2.5-2,4.5-5.2,5.6-8.7c1.1-1.4,1.8-2.9,1.8-4.2c0-0.9-0.3-1.5-0.9-2
                                        C40.9,15,35.7,9.1,29.3,9c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c-6.4,0-11.6,5.8-11.9,13c-0.8,0.5-1.3,1.2-1.3,2.2
                                        c0,1.5,0.9,3.3,2.4,4.9c1.1,3,2.8,5.8,5,7.6c-0.3,2.1-1.5,4.6-5.2,6.1c-2,0.8-5.5,1.6-7.1,2.4c3.9,4.3,11.4,7,17.7,7.1l0.1,0
                                        c0,0,0,0,0,0c6.3,0,13.9-2.7,17.8-7.1C45.2,44.6,41.6,43.8,39.7,43z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path fill="#FFFFFF" d="M39.7,41.2c-3.5-1.5-4.7-3.8-5.1-5.8c2.5-2,4.5-5.2,5.6-8.7c1.1-1.4,1.8-2.9,1.8-4.2c0-0.9-0.3-1.5-0.9-2
                                        c-0.2-7.3-5.4-13.2-11.8-13.3c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c-6.4,0-11.6,5.8-11.9,13c-0.8,0.5-1.3,1.2-1.3,2.2
                                        c0,1.5,0.9,3.3,2.4,4.9c1.1,3,2.8,5.8,5,7.6c-0.3,2.1-1.5,4.6-5.2,6.1c-2,0.8-5.5,1.6-7.1,2.4c3.9,4.3,11.4,7,17.7,7.1l0.1,0
                                        c0,0,0,0,0,0c6.3,0,13.9-2.7,17.8-7.1C45.2,42.8,41.6,42,39.7,41.2z"/>
                                </g>
                            </g>
                        </g>
                        </svg>

                        My Account / Menu
                    </span>
                    <svg version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                            x="0px" y="0px" width="24.4px" height="16.2px" viewBox="0 0 24.4 16.2" enable-background="new 0 0 24.4 16.2"
                            xml:space="preserve">
                    <defs>
                    </defs>
                    <path fill="#292A2A" d="M0,0h24.4v2.7H0V0 M0,6.8h24.4v2.7H0V6.8 M0,13.5h24.4v2.7H0V13.5z"/>
                    </svg>

                </a>

                    <a href="tel:308.382.7350" class="phone">Tel: 308.382.7350</a>
                <nav class="main">
                    <div class="nav">
                        <?php wp_nav_menu(array('menu'=>'Main Menu', 'container'=> '')); ?>
                        
                        <a class="phone" href="tel:308-382-7350">308-382-7350</a>
                        <?php if(!hansen_isApplicantAuth()): ?>   
                            <a class="button" id="mobile_login_btn">Log In</a>
                        <?php endif; ?>
                    </div>
                    <?php if(hansen_isApplicantAuth()): ?>                    
                        <div class="account" id="accountpanel">                            
                        </div>
                    <?php else: ?>
                        <div class="login" id="loginpanel">
                        </div>
                    <?php endif; ?>
                    
                </nav>
            </div>
        </header>
		