<?php
/**
 * Index
 *
 * @package BBSB
 **/

get_header();
?>
<main class="main content" id="main" content="true">
<?php
the_post();
the_content();
?>
</main>
<?php
get_footer(); ?>
