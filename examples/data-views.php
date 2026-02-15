<?php 

defined('ABSPATH') || exit;

# Déclaration de la page d'options dans l'administration
function nice_2026_add_dataviews_options_page(): void
{
	add_menu_page(
		__('DataViews', 'nice-2026'),    			  # Titre de la page
		__('DataViews', 'nice-2026'),           # Titre du menu
		'manage_options',                       # Capability requise
		'nice-2026-dataviews',                  # Slug de la page
		'nice_2026_render_dataviews_page',   		# Callback de rendu
    'dashicons-awards',                     # Icone
	);
}
add_action('admin_menu', 'nice_2026_add_dataviews_options_page');

# Rendu de la page d'options : un simple conteneur pour React.
function nice_2026_render_dataviews_page(): void
{
	echo '<div id="nice-2026-dataviews-page"></div>';
}

# Chargement des scripts et styles de la page d'options.
function nice_2026_enqueue_dataviews_page_assets(string $hook_suffix): void
{
	if ('toplevel_page_nice-2026-dataviews' !== $hook_suffix) {
		return;
	}

	$asset_file = NICE_2026_PLUGIN_DIR . 'build/dataViews/index.asset.php';

	if (! file_exists($asset_file)) {
		return;
	}

	$asset = require $asset_file;

	wp_enqueue_style(
		'nice-2026-dataviews-page-style',
		NICE_2026_PLUGIN_URL . 'build/dataViews/index.css',
		['wp-components'],
		$asset['version']
	);

	wp_enqueue_script(
		'nice-2026-dataviews-page-script',
		NICE_2026_PLUGIN_URL . 'build/dataViews/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action('admin_enqueue_scripts', 'nice_2026_enqueue_dataviews_page_assets');