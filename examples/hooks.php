<?php 

defined('ABSPATH') || exit;

# Chargement des scripts et styles de l'éditeur de blocs
function nice_2026_enqueue_admin_hooks_assets(): void
{
	# Chargement du script pour les hooks JS
	$asset_file = NICE_2026_PLUGIN_DIR . 'build/hooks/index.asset.php';

	if (! file_exists($asset_file)) {
		return;
	}

	$asset = require $asset_file;

	# Chargement du script pour les hooks JS
	wp_enqueue_script(
		'nice-2026-hooks-script',
		NICE_2026_PLUGIN_URL . 'build/hooks/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action('enqueue_block_editor_assets', 'nice_2026_enqueue_admin_hooks_assets');

# Charger le CSS du bouton seulement si le bloc est utilisé dans la page
function capitaine_hooks_register_blocks_assets()
{
	wp_enqueue_block_style(
		"core/button",
		[
			"handle" => "capitaine-hooks-core-button",
			"src"    => NICE_2026_PLUGIN_URL . "assets/css/core-button.css",
			"path"   => NICE_2026_PLUGIN_DIR . "assets/css/core-button.css",
			"ver"    => filemtime(NICE_2026_PLUGIN_DIR . "assets/css/core-button.css")
		]
	);
}
add_action("init", "capitaine_hooks_register_blocks_assets");

# Charger le CSS dans l'admin seulement si le bloc est utilisé dans la page
function capitaine_hooks_register_blocks_assets_admin()
{
	wp_enqueue_block_style(
		"core/button",
		[
			"handle" => "capitaine-hooks-core-button-admin",
			"src"    => NICE_2026_PLUGIN_URL . "assets/css/core-button-editor.css",
			"path"   => NICE_2026_PLUGIN_DIR . "assets/css/core-button-editor.css",
			"ver"    => filemtime(NICE_2026_PLUGIN_DIR . "assets/css/core-button-editor.css")
		]
	);
}
add_action("enqueue_block_editor_assets", "capitaine_hooks_register_blocks_assets_admin");