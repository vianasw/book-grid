
=== Book Grid ===
Contributors:      williamvianas
Tags:              block, books, grid, openlibrary, gallery
Stable tag:        0.1.0
License:           GPL-2.0-or-later
Requires at least: 6.0
Requires PHP:      7.2
Text Domain:       book-grid-block-wp
Domain Path:       /languages

A WordPress block for displaying a responsive, visually appealing grid of book covers, automatically fetched from OpenLibrary by book title, with customizable captions, columns, and layout settings.

== Description ==

Book Grid lets you effortlessly showcase book cover galleries as a stylish grid layout. Add books quickly by title—the block fetches cover images from OpenLibrary automatically—and display attractive captions. The block features responsive settings to control the number of columns by device, advanced margin and background controls, and engaging hover effects for interactivity.

**Translations:**
* Spanish (es_ES) - Included
* Translation Ready - All text strings are internationalized. Community translations are welcome!

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/book-grid` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.

== Frequently Asked Questions ==

= How are images fetched from OpenLibrary? =
The block uses the public OpenLibrary Cover Images API, automatically looking up covers based on the book titles you enter.

= Can I change how many columns show on mobile or tablet? =
Yes, you can adjust column numbers for desktop, tablet, and mobile views in the block settings.

== Screenshots ==

1. Example of a book cover grid with captions.
2. Block settings for columns, margins, and background color.

== Changelog ==

= 0.1.0 =
* Initial release

== Developer Notes ==

**Source Code:** https://github.com/vianasw/book-grid
**Build Instructions:**
1. Clone the repository
2. Run `npm install`
3. Run `npm run build` to compile assets

This plugin uses @wordpress/scripts for building. All source files are in the `src/` directory of the GitHub repository.

== Arbitrary section ==

Great for book lists, reviews, reading challenges, libraries, and any content requiring book cover displays in a modern, grid gallery format.
