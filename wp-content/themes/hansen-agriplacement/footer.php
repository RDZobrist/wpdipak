    <footer class="main">
        <div class="innerwrapper">
            <a href="tel:308.382.7350" class="phone">Tel: 308.382.7350</a>
            <a class="fax">Fax: 308.382.7427</a>
            <div class="rcol">
                <div class="copyright">
                    &copy; <?php print date("Y"); ?> Hansen Agri-PLACEMENT.  All rights reserved.
                </div>
                <?php if(is_front_page()): ?>
                    <div class="credits">SmartSite content, design, and development by <a href="http://vistacomm.com" target="_blank">VistaComm</a>.</div>
                <?php endif; ?>
                
                <img class="npasmall" src="<?php bloginfo('stylesheet_directory'); ?>/images/npasmall.jpg" alt="NPA Worldwide" />
            </div>
        </div>
    </footer>
    <div id="outdated">
        <h6>Your browser is out-of-date!</h6>
        <p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p>
        <p class="last"></p>
    </div>
</div>
<?php wp_footer(); ?>
<script type="text/javascript">
  jQuery.browser = {};
jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
</script>
<script type="text/javascript">
     var _mfq = _mfq || [];
     (function() {
     var mf = document.createElement("script");
     mf.type = "text/javascript"; mf.async = true;
     mf.src = "//cdn.mouseflow.com/projects/71a6c522-beb1-4802-883b-b56824e59e52.js";
     document.getElementsByTagName("head")[0].appendChild(mf);
     })();
    </script> 
</body>
</html>