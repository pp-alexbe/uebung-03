<?php
/**
 * Template Name: Suche
 *
 * @package BBSB
 **/

get_header();
?>

<main class="main content" id="main" content="true">
<div class="section">
<div class="page-wrap">
<?php the_title( '<h1>', '</h1>' ); ?>
<form role="search" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" class="search-form">
<label for="search">Suche</label>
<input type="search" class="search-field" name="s" id="search" value="<?php echo get_search_query(); ?>" />
<input type="submit" class="btn-search" value="Suchen" />
</form>
</div>
</div>
</main>
<?php
get_footer();
