const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'faq/index': path.resolve(process.cwd(), 'src', 'faq', 'index.js'),
        'faq/view': path.resolve(process.cwd(), 'src', 'faq', 'view.js'),
        'faq-item/index': path.resolve(process.cwd(), 'src', 'faq-item', 'index.js'),
    },
    output: {
        ...defaultConfig.output,
        path: path.resolve(process.cwd(), 'build'),
    },
}; 