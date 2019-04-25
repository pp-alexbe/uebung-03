<?php
/**
 * Footer
 *
 * @package BBSB
 **/

?>

<footer class="section footer gradient">
  <div class="page-wrap">
	<div class="bbsb-brand-white">
	  <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/bbsb-logo-white.svg" class="bbsb-logo-white">
	</div>
	<div class="columns-3">
	  <div class="col">
		<nav class="footer-main-nav" role="navigation" aria-label="Footernavigation">
		  <ul id="footer-main-menu">
			<?php
				wp_nav_menu(
					array(
						'theme_location' => 'footer-main',
            'walker' => new Footer_Nav_Walker(),
						'container'      => '',
						'items_wrap'     => '%3$s',
						'depth'          => 1,
					)
				);
			?>
		  </ul>
		</nav>
	  </div>
	  <div class="col">
		<nav class="footer-service-nav">
		  <ul id="footer-service-menu">
			<?php
				wp_nav_menu(
					array(
						'theme_location' => 'footer-service',
            'walker' => new Footer_Nav_Walker(),
						'container'      => '',
						'items_wrap'     => '%3$s',
						'depth'          => 1,
					)
				);
			?>
		  </ul>
		</nav>
	  </div>
	  <div class="col">
		<p>Bleiben Sie auf dem Laufenden. Melden Sie sich hier für den BBSB-Newsletter an:</p>
		<a class="wp-block-ww-button__link" href="">
      <svg role="img" class="symbol" aria-hidden="true" focusable="false">
        <use xlink:href="<?php echo esc_url( get_template_directory_uri() ); ?>/img/icons.svg#button-next"></use>
      </svg>
		  <span>Für Newsletter anmelden</span>
	  </a>
	  </div>
	</div>
  </div>
</footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
