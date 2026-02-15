<?php 

defined('ABSPATH') || exit;

# Déclaration de la page d'options dans l'administration
function nice_2026_add_options_page(): void
{
	add_menu_page(
		__('Options', 'nice-2026'),    			  # Titre de la page
		__('Options', 'nice-2026'),           # Titre du menu
		'manage_options',                     # Capability requise
		'nice-2026-settings',                 # Slug de la page
		'nice_2026_render_options_page'    		# Callback de rendu
	);
}
add_action('admin_menu', 'nice_2026_add_options_page');

# Rendu de la page d'options : un simple conteneur pour React.
function nice_2026_render_options_page(): void
{
	echo '<div id="nice-2026-options-page"></div>';
}

# Chargement des scripts et styles de la page d'options.
function nice_2026_enqueue_options_page_assets(string $hook_suffix): void
{
	if ('toplevel_page_nice-2026-settings' !== $hook_suffix) {
		return;
	}

	$asset_file = NICE_2026_PLUGIN_DIR . 'build/optionsPage/index.asset.php';

	if (! file_exists($asset_file)) {
		return;
	}

	$asset = require $asset_file;

	wp_enqueue_style(
		'nice-2026-options-page-style',
		NICE_2026_PLUGIN_URL . 'build/optionsPage/index.css',
		['wp-components'],
		$asset['version']
	);

	wp_enqueue_script(
		'nice-2026-options-page-script',
		NICE_2026_PLUGIN_URL . 'build/optionsPage/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action('admin_enqueue_scripts', 'nice_2026_enqueue_options_page_assets');


# Enregistrement des réglages via la Settings API native de WordPress.
# Chaque option est exposée automatiquement sur GET/POST /wp/v2/settings.
function nice_2026_register_settings(): void
{
	register_setting('nice_2026_settings', 'nice_2026_event_name', [
		'type'              => 'string',
		'default'           => 'Conférence Nice 2026',
		'sanitize_callback' => 'sanitize_text_field',
		'show_in_rest'      => true,
	]);

	register_setting('nice_2026_settings', 'nice_2026_event_day', [
		'type'              => 'string',
		'default'           => 'jeudi',
		'sanitize_callback' => 'sanitize_text_field',
		'show_in_rest'      => true,
	]);

	register_setting('nice_2026_settings', 'nice_2026_event_color', [
		'type'              => 'string',
		'default'           => '#0073aa',
		'sanitize_callback' => 'sanitize_hex_color',
		'show_in_rest'      => true,
	]);

	register_setting('nice_2026_settings', 'nice_2026_event_confirmed', [
		'type'              => 'boolean',
		'default'           => false,
		'sanitize_callback' => 'rest_sanitize_boolean',
		'show_in_rest'      => true,
	]);
}
add_action('init', 'nice_2026_register_settings');
