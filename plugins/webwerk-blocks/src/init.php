<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
// function ww_block_assets() { // phpcs:ignore
// Styles.
// wp_enqueue_style(
// 'ww-style-css', // Handle.
// plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
// array( 'wp-editor' ) // Dependency to include the CSS after it.
// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
// );
// }
//
// // Hook: Frontend assets.
// add_action( 'enqueue_block_assets', 'ww_block_assets' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function ww_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'ww-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	$translation_array = array( 'templateUrl' => get_template_directory_uri() );
	wp_localize_script( 'ww-block-js', 'ww_blocks', $translation_array );

	// Styles.
	wp_enqueue_style(
		'ww-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'ww_editor_assets' );

// Sever-side rendering for block "Webwerk - Block for The Events".
require_once plugin_dir_path( __FILE__ ) . 'ww-events/block.php';
