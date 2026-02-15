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

# Chaque exemple est dans un fichier PHP distinct.
require_once NICE_2026_PLUGIN_DIR . 'examples/slot-fills.php';
require_once NICE_2026_PLUGIN_DIR . 'examples/hooks.php';
require_once NICE_2026_PLUGIN_DIR . 'examples/blocks.php';
require_once NICE_2026_PLUGIN_DIR . 'examples/options-page.php';