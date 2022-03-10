<?php /* Template Name: Password Reset */ ?>
<?
    if(isset($_COOKIE['hansentoken'])){
        header('Location: /my-account');
    }
?>
<?php get_header(); ?>
<?php $job = hansen_getJobById($_GET['jid']); ?>
    <div id="subpage">
        <?php if (have_posts()) : while (have_posts()) : the_post();?>
            <article class="page">
                <header>
                    <div class="overlay">
                        <h1 id="pagetitle" class="pagetitle" ><?php the_title(); ?></h1>
                    </div>            
                </header>
                <div class="innerwrapper">
                    <div class="content">
                        <div id="forgotpassword">
                            <div id="forgotpasswordform">
                                <?php if(isset($_GET['token'])): ?>
                                    <?php
                                        $token = $_GET['token'];
                                        $response = wp_remote_get(HANSEN_API . '/api/v1/account/token?token=' . $token);
                                        if(wp_remote_retrieve_response_code( $response ) == 200){            
                                            ?>
                                            <div class="form">
                                                <input type="hidden" name="_token" value="<?php print $_GET['token']; ?>" />
                                                <div class="formrow">
                                                    <label>New Password</label>
                                                    <input name="newpassword" type="password" id="newpassword">
                                                </div>
                                                <div class="formrow">
                                                    <label>New Password</label>
                                                    <input name="newpassword_confirm" type="password" id="newpassword_confirm">
                                                </div>
                                                <div class="formrow">
                                                    <a id="btnSetPassword" class="button">Reset Password</a>
                                                </div>
                                            </div>
                                            <?php                                            
                                        }else{
                                            $responseJSON = json_decode($response['body']);
                                            print "<p style='text-align:center;'>" . $responseJSON->message . "</p>";
                                            print "<p style='text-align:center;'><a href='/forgot-password'>Click here to reset your password.</a></p>";
                                        } 
                                    ?>
                                <?php else: ?>
                                    <h1>Password Reset</h1>
                                    <div class="form">
                                        <div class="formrow">
                                            <label>Email</label>
                                            <input name="accountemail" type="email" id="email">
                                        </div>
                                        <div class="formrow">
                                            <a id="btnResetPassword" class="button">Reset Password</a>
                                        </div>
                                    </div>
                                <?php endif; ?>
                                
                            </div>
                        </div>
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