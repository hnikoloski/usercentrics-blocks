# Usercentrics Custom Gutenberg Blocks

A WordPress plugin providing custom Gutenberg blocks optimized for accessibility, SEO, and mobile responsiveness.

## 🎯 Features

### FAQ Block

- **Dynamic FAQ Component**: Parent-child block architecture for flexible content management
- **Rich Content Editing**: Full WordPress editor support for answers (paragraphs, lists, images, etc.)
- **Interactive Controls**: Move up/down, remove buttons with intuitive tooltips
- **Accessibility Optimized**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **SEO Enhanced**: Schema.org markup for better search visibility
- **Mobile Responsive**: Optimized for all device sizes

## 📥 Installation

### Quick Installation (Recommended)

**🚀 [Download Latest Release](https://github.com/hnikoloski/usercentrics-blocks/releases)**

1. Download the plugin zip file from GitHub releases
2. In WordPress Admin: **Plugins → Add New → Upload Plugin**
3. Upload and activate the plugin
4. Find "FAQ Section" in the Gutenberg block inserter

### Alternative: Direct Download

1. Click the green **Code** button → **Download ZIP**
2. Extract the zip file
3. Upload the `usercentrics-blocks` folder to `/wp-content/plugins/`
4. Activate the plugin in WordPress Admin

### Development Installation

For developers who want to modify the plugin:

**Prerequisites:**

- Node.js (v14 or higher)
- npm or yarn
- WordPress development environment

**Steps:**

```bash
# Clone the repository
git clone https://github.com/hnikoloski/usercentrics-blocks.git
cd usercentrics-blocks

# Install dependencies
npm install

# Build the plugin
npm run build

# For development with auto-rebuild
npm run dev
```

Copy the folder to `/wp-content/plugins/` and activate in WordPress Admin.

## 🚀 Usage

### Adding FAQ Block

1. In Gutenberg editor, click **+** to add a block
2. Search for "FAQ Section" in the Usercentrics category
3. Click to add the block

### Configuring Settings

Use the Inspector Panel (right sidebar) to:

- Toggle title visibility
- Set title heading level (H1-H6)
- Allow multiple FAQ items to be open simultaneously

### Managing FAQ Items

- Click the **+** button to add new FAQ items
- Edit questions and answers with rich content
- Use move up/down buttons to reorder items
- Use the **×** button to remove items

## 🏗️ Technical Architecture

### Block Structure

```
usercentrics/faq (Parent Block)
├── Settings Panel (Inspector Controls)
│   ├── Show Title Toggle
│   ├── Title Level (H1-H6)
│   └── Allow Multiple Open Toggle
└── usercentrics/faq-item (Child Blocks)
    ├── Question (RichText)
    ├── Answer (InnerBlocks)
    └── Controls (Move Up/Down/Remove)
```

### File Structure

```
src/
├── faq/
│   ├── index.js          # Main FAQ block
│   ├── view.js           # Frontend JavaScript
│   ├── block.json        # Block metadata
│   └── style.scss        # Styles
├── faq-item/
│   ├── index.js          # FAQ Item block
│   └── block.json        # Block metadata
└── index.js              # Main entry point
```

## ♿ Accessibility (WCAG 2.1 AA Compliance)

- **Keyboard Navigation**: Tab, Arrow keys, Enter/Space, Home/End
- **Screen Reader Support**: Proper ARIA attributes and live regions
- **Visual Accessibility**: High contrast mode and reduced motion support
- **Focus Management**: Clear focus indicators and logical tab order

## 🔍 SEO Optimization (Microdata Schema)

Implements **Microdata structured data** for enhanced search visibility. We use Microdata instead of JSON-LD because it integrates seamlessly with our HTML structure and ensures the schema markup is directly tied to the visible content.

```html
<div itemscope itemtype="https://schema.org/FAQPage">
  <h2 itemprop="name">Frequently Asked Questions</h2>
  <div itemprop="mainEntity">
    <div itemscope itemtype="https://schema.org/Question">
      <button itemprop="name">What is Usercentrics?</button>
      <div
        itemscope
        itemtype="https://schema.org/Answer"
        itemprop="acceptedAnswer"
      >
        <div itemprop="text">Answer content...</div>
      </div>
    </div>
  </div>
</div>
```

**Why Microdata?**

- ✅ **Content-Coupled**: Schema markup is directly embedded in the HTML elements
- ✅ **No Duplication**: Avoids maintaining separate JSON-LD and HTML content
- ✅ **Guaranteed Accuracy**: Schema always matches visible content
- ✅ **Block-Level Control**: Each block manages its own schema markup

## 📱 Mobile Responsiveness

- **Fluid Typography**: Scales appropriately across devices
- **Touch-Friendly**: 44px minimum touch targets
- **Optimized Spacing**: Reduced padding on mobile devices
- **Readable Text**: Maintains readability at all screen sizes

## ✅ Verification & Testing

After installation, verify the plugin works correctly:

### Frontend Check

- FAQ items should be clickable and expandable
- Keyboard navigation should work (Tab, Arrow keys, Enter/Space)
- Mobile responsiveness should be intact

### SEO Check

- View page source and look for `itemscope itemtype="https://schema.org/FAQPage"`
- Use [Google's Rich Results Test](https://search.google.com/test/rich-results) to verify schema

### Accessibility Check

- Test with screen readers
- Verify keyboard navigation
- Check color contrast

## 🐛 Troubleshooting

### Plugin Not Appearing

- Ensure you've activated the plugin in WordPress Admin
- Check that your WordPress version supports Gutenberg blocks

### Styling Issues

- Clear any caching plugins
- Check for theme conflicts by switching to a default theme temporarily

### Build Issues

- Ensure Node.js version is 14 or higher
- Delete `node_modules` and run `npm install` again
- Check for any error messages during the build process

## 🔧 Development

### Build Process

```bash
npm install
npm run build       # Build for production
npm run dev         # Development mode with auto-rebuild
npm run release     # Prepare plugin for distribution
```

### Creating Distribution Package

```bash
npm run release     # Builds and prepares files
# Then manually zip these files for distribution:
# - build/ (compiled assets)
# - src/ (source files)
# - *.php (plugin files)
# - README.md (documentation)
# - package.json, webpack.config.js
```

### Code Standards

- **WordPress Coding Standards**: PHP, JavaScript, CSS
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **PHPCS**: PHP code standards

## 📋 Version History

### v1.0.0 - Initial Release

- ✅ **FAQ Block**: Dynamic FAQ component with parent-child architecture
- ✅ **Rich Content Support**: Full WordPress editor support for answers
- ✅ **Interactive Controls**: Move up/down, remove buttons with tooltips
- ✅ **WCAG 2.1 AA Compliance**: Full accessibility support
- ✅ **SEO Optimization**: Microdata schema markup
- ✅ **Mobile Responsive**: Optimized for all device sizes
- ✅ **Modern WordPress Block**: Built with latest block editor APIs

## 📞 Support

For issues or questions:

- 🐛 [Create an issue on GitHub](https://github.com/hnikoloski/usercentrics-blocks/issues)
- 📖 Check this README for technical details and implementation info

## 📄 License

GPL v2 or later - WordPress compatible licensing

---

**Built with ❤️ for Usercentrics**
