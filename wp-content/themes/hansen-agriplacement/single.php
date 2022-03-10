<?php get_header(); ?>
    <div id="subpage">
        <?php if (have_posts()) : while (have_posts()) : the_post();?>
            <article class="page">
                <header>
                    <div class="overlay">
                        <h1 id="pagetitle" class="pagetitle" >Career Counseling Corner</h1>
                    </div>            
                </header>
                <div class="innerwrapper">
                    <div class="content">
                        <h1><?php the_title(); ?></h1>
                        <div class="date">Published on <?php the_date(); ?></div>
                        <?php the_content(); ?>
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