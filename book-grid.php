<?php
/**
 * Plugin Name:       Book Grid
 * Description:       A WordPress block for displaying a responsive, visually appealing grid of book covers, automatically fetched from OpenLibrary by book title, with customizable captions, columns, and layout settings.
 * Version:           0.1.0
 * Author:            williamvianas
 * License:           GPL-2.0-or-later
 * Text Domain:       book-grid-block-wp
 * Domain Path:       /languages
 *
 * @package BookGrid
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function book_grid_block_init() {
	register_block_type( __DIR__ . '/build/' );

	// Register translations for the block.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'w0-book-grid-editor-script', 'book-grid-block-wp', plugin_dir_path( __FILE__ ) . 'languages' );
	}
}
add_action( 'init', 'book_grid_block_init' );
