<?php 

defined('ABSPATH') || exit;

# Déclaration automatique des blocs Gutenberg à partir du manifeste généré dans le dossier /build/
function nice_2026_blocks_register_blocks()
{
	wp_register_block_types_from_metadata_collection(NICE_2026_PLUGIN_DIR . '/build', NICE_2026_PLUGIN_DIR . '/build/blocks-manifest.php');
}
add_action('init', 'nice_2026_blocks_register_blocks');