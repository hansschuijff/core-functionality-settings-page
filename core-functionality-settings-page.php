<?php
/**
 * Core Functionality Settings Page
 *
 * @package DeWittePrins\CoreFunctionality;
 * @author  Hans Schuijff
 * @license GPL-2.0+
 * @link    https://dewitteprins.nl
 *
 * @wordpress-plugin
 * Plugin Name:       Core Functionality Settings Page
 * Plugin URI:        _
 * GitHub Plugin URI: hansschuijff/core-functionality-settings-page
 * Description:       This add a settings page to the core functionality plugin.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Hans Schuijff
 * Author URI:        https://dewitteprins.nl
 * Text Domain:       core-functionality-dwp
 * Domain Path:       /languages
 * Requires WP:       4.7
 * Requires PHP:      7.0
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

namespace DeWittePrins\CoreFunctionality;

use function \add_action;
use function \wp_enqueue_script;
use function \wp_enqueue_style;
use function \plugins_url;
use function \__;
use function \register_setting;

function dewitteprins_core_functionality_settings_options_assets() {
	wp_enqueue_script(
		'dewitteprins-core-functionality-settings-script',
		plugins_url( '/', __FILE__ ) . 'build/index.js',
		array( 'wp-api', 'wp-i18n', 'wp-components', 'wp-element' ),
		'0.1.0',
		true
	);
	wp_enqueue_style(
		'dewitteprins-core-functionality-settings-styles',
		plugins_url( '/', __FILE__ ) . 'build/style-index.css',
		array( 'wp-components' )
	);
}

function dewitteprins_core_functionality_settings_menu_callback() {
	echo '<div id="dewitteprins-core-functionality-settings"></div>';
}

function dewitteprins_core_functionality_settings_add_option_menu() {~

	$page_hook_suffix = add_options_page(
		/* string $page_title */
		__( 'Core Functionality Settings',
			'core-functionality-dwp' ),
		/* string $menu_title */
		__( 'Core Functionality', 'core-functionality-dwp' ),
		/* string $capability */
		'manage_options',
		/* string $menu_slug */
		'core-functionality',
		/* callable $callback */
		__NAMESPACE__ . '\dewitteprins_core_functionality_settings_menu_callback'
		/* int $position */
	);

	add_action( "admin_print_scripts-{$page_hook_suffix}", __NAMESPACE__ . '\dewitteprins_core_functionality_settings_options_assets' );
}

add_action( 'admin_menu', __NAMESPACE__ . '\dewitteprins_core_functionality_settings_add_option_menu' );

function dewitteprins_core_functionality_settings_register_settings() {

	$optional_functionality_config = (array) get_config( 'optional-functionality' );
	$option_names                  = array_unique( array_values( $optional_functionality_config ) );

	foreach ($option_names as $option_name ) {
		register_setting(
			/* string $option_group */
			get_plugin_data( 'options_prefix' ) . 'settings',
			/* string $option_name */
			$option_name,
			/* array $args = array() */
			array(
				'type'         => 'boolean',
				'show_in_rest' => true,
				'default'      => false,
			)
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\dewitteprins_core_functionality_settings_register_settings' );
