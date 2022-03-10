<?php get_header(); ?>
    <div id="subpage">
        
        <article class="page">
            <header>
                <div class="overlay">
                    <h1 id="pagetitle" class="pagetitle" ><?php single_post_title(); ?></h1>
                </div>            
            </header>
            <div class="innerwrapper">
                <div class="content">
                    <?php if (have_posts()) : while (have_posts()) : the_post();?>
                        <article>
                            <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
                            <div class="date"><strong>Published on <?php the_date(); ?></strong></div>
                            <div><?php the_excerpt(); ?></div>
                            <a href="<?php the_permalink(); ?>" class="readmore">Read More</a>
                        </article>                        
                    <?php endwhile; ?>

                    <div class="pagination">
                        <span class="prev"><?php next_posts_link("< Previous"); ?></span>
                        <span class="next"><?php previous_posts_link("Next >"); ?></span>
                    </div>
                <?php endif; ?>
                    <div class="clear"></div>
                </div>
                <?php get_sidebar(); ?>
            </div>
        </article>
        
        <div id="psalms">
            <h1>"Unless The Lord Builds the House,  We Labor In Vain Who Build It"</h1>
            <h2>PSALMS 127:1</h2>
            <div class="desc">
                The Nation's Oldest and Most Highly Respected Ag Agency, Serving Agri Business and Production Agriculture Since 1959.
            </div>
        </div>     
    </div>
    
<?php get_footer(); ?>