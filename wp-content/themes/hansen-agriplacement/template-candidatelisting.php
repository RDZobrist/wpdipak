<?php /* Template Name: Candidate Listing Page */ ?>
<?php get_header(); ?>
<?php $candidate = hansen_getCandidateById($_GET['cid']); ?>
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
                    <?php if(isset($_GET['cid'])): ?>                        
                        <section id="jobdetails">
                            <div id="referenceid">Reference Number: <?php print $candidate->referencenum; ?></div>
                            <h1 id="positionTitle"><?php print $candidate->positiontitle; ?></h1>
                            
                            <div class="desc">
                                <strong>Candidate Description:</strong><br /><br />
                                <?php print $candidate->description; ?>
                            </div>

                            <div class="desc">
                                <strong>Contact Info:</strong><br /><br />
                                <?php print $candidate->contactinfo; ?>
                            </div>
                        </section>
                    <?php else: ?> 
                        No valid candidate ID found.
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