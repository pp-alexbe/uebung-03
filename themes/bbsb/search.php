<?php
/**
 * Seiten
*
*
 * @package BBSB
 **/

get_header();
?>

<main class="main content" id="main" content="true">
  <div class="section">
    <div class="page-wrap">
<h1>Suche</h1>
<form method="get" id="searchform" action="<?php echo $_SERVER['PHP_SELF']; ?>">
   <input type="text" value="<?php echo wp_specialchars($s, 1); ?>" name="s" id="s" />
   <input type="submit" id="search_button" value="Suchen" />
</form>
<?php
echo '<section class="headline"><h1>Suchergebnisse für "' . get_search_query() . '"</h1></section>';
echo '<section class="search-result">';
if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();
    echo '<article class="a_item">';
    if( 'attachment' == get_post_type() ) {
      echo '<a class="result" href="' . esc_url( get_permalink() ) . '" target="blank" title="Öffnet Datei in einem neuen Fenster">';
    } else {
      echo '<a class="result" href="' . esc_url( get_permalink() ) . '">';
    }
    echo '<h3>';
    the_title( );

    echo '</h3></a></article>';
  }
} else {
  echo '<h2>Nichts gefunden.</h2>';
}
echo '</section>';
?>
</div>
</div>
</main>
<?php
get_footer(); ?>
