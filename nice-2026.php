<?php

/**
 * Plugin Name:       Conférence Nice 2026
 * Description:       Plugin pour la Conférence WordPress Nice 2026.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       nice-2026
 * Domain Path:       /languages
 */

defined('ABSPATH') || exit;

define('NICE_2026_VERSION', '1.0.0');
define('NICE_2026_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('NICE_2026_PLUGIN_URL', plugin_dir_url(__FILE__));

function nice_2026_enqueue_admin_assets(): void
{
	$asset_file = NICE_2026_PLUGIN_DIR . 'build/index.asset.php';

	if (! file_exists($asset_file)) {
		return;
	}

	$asset = require $asset_file;

	wp_enqueue_style(
		'nice-2026-admin-style',
		NICE_2026_PLUGIN_URL . 'build/style-index.css',
		array(),
		$asset['version']
	);

	wp_enqueue_script(
		'nice-2026-admin-script',
		NICE_2026_PLUGIN_URL . 'build/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action('enqueue_block_editor_assets', 'nice_2026_enqueue_admin_assets');
