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

# Exemple des slotFills dans l'éditeur de blocs
function nice_2026_enqueue_admin_assets(): void
{
	# Récupération de la version et des dépendances du script
	$asset_file = NICE_2026_PLUGIN_DIR . 'build/slotFills/index.asset.php';

	if (! file_exists($asset_file)) {
		return;
	}

	$asset = require $asset_file;

	# Chargement du style compilé 
	wp_enqueue_style(
		'nice-2026-admin-style',
		NICE_2026_PLUGIN_URL . 'build/slotFills/style.css',
		[],
		$asset['version']
	);

	# Chargement du script compilé
	wp_enqueue_script(
		'nice-2026-admin-script',
		NICE_2026_PLUGIN_URL . 'build/slotFills/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action('enqueue_block_editor_assets', 'nice_2026_enqueue_admin_assets');


# Déclaration automatique des blocs Gutenberg à partir du manifeste 
function nice_2026_blocks_register_blocks()
{
	wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
}
add_action('init', 'nice_2026_blocks_register_blocks');
