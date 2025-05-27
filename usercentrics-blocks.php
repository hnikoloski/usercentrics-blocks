<?php

/**
 * Plugin Name: Usercentrics Custom Blocks
 * Plugin URI: https://usercentrics.com
 * Description: Custom Gutenberg blocks for FAQ component with accessibility and SEO optimization.
 * Version: 1.0.0
 * Author: hNikoloski
 * Author URI: https://hnikoloski.com
 * License: GPL v2 or later
 * Text Domain: usercentrics-blocks
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('USERCENTRICS_BLOCKS_VERSION', '1.0.0');
define('USERCENTRICS_BLOCKS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('USERCENTRICS_BLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main plugin class
 */
class UsercentricsBlocks
{

    /**
     * Constructor
     */
    public function __construct()
    {
        add_action('init', array($this, 'init'));
        add_action('block_categories_all', array($this, 'add_custom_block_category'), 10, 2);
    }

    /**
     * Initialize the plugin
     */
    public function init()
    {
        // Register blocks
        $this->register_blocks();

        // Load text domain
        load_plugin_textdomain('usercentrics-blocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Register custom blocks
     */
    public function register_blocks()
    {
        // Register FAQ block
        register_block_type(USERCENTRICS_BLOCKS_PLUGIN_DIR . 'build/faq');

        // Register FAQ Item block (child block)
        register_block_type(USERCENTRICS_BLOCKS_PLUGIN_DIR . 'build/faq-item');
    }

    /**
     * Add custom block category
     */
    public function add_custom_block_category($categories, $post)
    {
        return array_merge(
            $categories,
            array(
                array(
                    'slug'  => 'usercentrics',
                    'title' => __('Usercentrics', 'usercentrics-blocks'),
                    'icon'  => 'shield-alt',
                ),
            )
        );
    }
}

// Initialize the plugin
new UsercentricsBlocks();
