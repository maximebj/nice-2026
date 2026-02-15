<?php 

defined('ABSPATH') || exit;

# Chargement des scripts et styles de l'éditeur de blocs
function nice_2026_enqueue_admin_slot_fills_assets(): void
{
	# Exemple des slotFills dans l'éditeur de blocs
	# Récupération de la version et des dépendances du script
	$asset_file = NICE_2026_PLUGIN_DIR . 'build/slotFills/index.asset.php';

	if (! file_exists($asset_file)) {
		return;
	}

	$asset = require $asset_file;

	# Chargement du style compilé 
	wp_enqueue_style(
		'nice-2026-slot-fills-style',
		NICE_2026_PLUGIN_URL . 'build/slotFills/style.css',
		[],
		$asset['version']
	);

	# Chargement du script compilé
	wp_enqueue_script(
		'nice-2026-slot-fills-script',
		NICE_2026_PLUGIN_URL . 'build/slotFills/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action('enqueue_block_editor_assets', 'nice_2026_enqueue_admin_slot_fills_assets');
