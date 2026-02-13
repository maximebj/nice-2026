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


# API REST — lecture / écriture des options
function nice_2026_register_rest_routes(): void
{
	register_rest_route('nice-2026/v1', '/settings', [
		[
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'nice_2026_rest_get_settings',
			'permission_callback' => function () {
				return current_user_can('manage_options');
			},
		],
		[
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => 'nice_2026_rest_update_settings',
			'permission_callback' => function () {
				return current_user_can('manage_options');
			},
			'args'                => [
				'nice_2026_event_name' => [
					'type'              => 'string',
					'sanitize_callback' => 'sanitize_text_field',
				],
				'nice_2026_event_day' => [
					'type'              => 'string',
					'sanitize_callback' => 'sanitize_text_field',
				],
				'nice_2026_event_color' => [
					'type'              => 'string',
					'sanitize_callback' => 'sanitize_hex_color',
				],
				'nice_2026_event_confirmed' => [
					'type'              => 'boolean',
					'sanitize_callback' => 'rest_sanitize_boolean',
				],
			],
		],
	]);
}
add_action('rest_api_init', 'nice_2026_register_rest_routes');

# GET /wp-json/nice-2026/v1/settings
function nice_2026_rest_get_settings(WP_REST_Request $request): WP_REST_Response
{
	return new WP_REST_Response([
		'nice_2026_event_name'      => get_option('nice_2026_event_name', 'Conférence Nice 2026'),
		'nice_2026_event_day'       => get_option('nice_2026_event_day', 'jeudi'),
		'nice_2026_event_color'     => get_option('nice_2026_event_color', '#0073aa'),
		'nice_2026_event_confirmed' => (bool) get_option('nice_2026_event_confirmed', false),
	], 200);
}

# POST / PUT / PATCH /wp-json/nice-2026/v1/settings
function nice_2026_rest_update_settings(WP_REST_Request $request): WP_REST_Response
{
	$allowed = ['nice_2026_event_name', 'nice_2026_event_day', 'nice_2026_event_color', 'nice_2026_event_confirmed'];

	foreach ($allowed as $key) {
		if ($request->has_param($key)) {
			update_option($key, $request->get_param($key));
		}
	}

	return nice_2026_rest_get_settings($request);
}
