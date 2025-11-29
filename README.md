# Book Grid

A WordPress block plugin for displaying responsive book cover grids. Fetches cover images automatically from OpenLibrary API by title, with customizable captions, columns, margins, and responsive layout settings.

![WordPress Plugin Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-GPL--2.0--or--later-green.svg)
![WordPress](https://img.shields.io/badge/wordpress-6.0%2B-blue.svg)

## Features

- 📚 **Automatic Cover Fetching** - Search books by title and fetch covers from OpenLibrary
- 🎨 **Responsive Grid Layout** - Customize columns for desktop, tablet, and mobile
- ✏️ **Custom Captions** - Add overlay captions with custom text
- 🔗 **Clickable Links** - Make book covers link to any URL
- 🖼️ **Manual Upload** - Replace fetched covers with custom images
- 🎨 **Customizable Design** - Adjust margins and background colors
- 🌍 **Translation Ready** - Includes Spanish translation, ready for more

## Screenshots

### Block Editor
Add books by title and customize the layout directly in the WordPress editor.

### Responsive Grid
Beautiful book cover displays that adapt to any screen size.

## Installation

### From WordPress.org (Coming Soon)
1. Go to **Plugins → Add New** in your WordPress admin
2. Search for "Book Grid"
3. Click **Install Now** and then **Activate**

### Manual Installation
1. Download the [latest release](https://github.com/vianasw/book-grid/releases)
2. Go to **Plugins → Add New → Upload Plugin**
3. Choose the ZIP file and click **Install Now**
4. Activate the plugin

## Usage

1. Create or edit a post/page
2. Click the **+** button to add a block
3. Search for "Book Grid" and add it
4. Enter book titles to fetch covers automatically
5. Customize columns, margins, and colors in the sidebar settings
6. Click **Details** on any book to add captions and links

## Development

### Prerequisites
- Node.js 14+ and npm
- WordPress 6.0+
- PHP 7.2+

### Project Structure

```
book-grid/
├── src/              # Source files
│   ├── edit.js       # Block editor component
│   ├── save.js       # Block save function
│   ├── index.js      # Block registration
│   ├── view.js       # Frontend JavaScript
│   ├── style.scss    # Frontend styles
│   └── editor.scss   # Editor styles
├── build/            # Compiled files (generated)
├── languages/        # Translation files
├── book-grid.php     # Main plugin file
├── block.json        # Block metadata
└── webpack.config.js # Build configuration
```

### Setup

```bash
# Clone the repository
git clone https://github.com/vianasw/book-grid.git
cd book-grid

# Install dependencies
npm install

# Build the plugin
npm run build

# Create plugin ZIP
npm run plugin-zip
```

### Development Workflow

```bash
# Start development mode with hot reload
npm run start

# Build for production
npm run build

# Format code
npm run format

# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css
```

### Local Testing

To test in a local WordPress installation:

1. Copy `sync-dev.sh.example` to `sync-dev.sh`
2. Update the path to your WordPress plugins directory
3. Run `./sync-dev.sh` to sync files

## Translations

The plugin is translation-ready and currently includes:
- 🇪🇸 Spanish (es_ES)

### Contributing Translations

Community translations are welcome! See [languages/README.md](languages/README.md) for instructions.

## API

This plugin uses the [OpenLibrary Covers API](https://openlibrary.org/dev/docs/api/covers) to fetch book cover images. The API is free and doesn't require authentication.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

### 0.1.0 - Initial Release
- Automatic book cover fetching from OpenLibrary
- Responsive grid layout with customizable columns
- Custom captions and links
- Manual image upload option
- Spanish translation included

## License

This project is licensed under the GPL-2.0-or-later License - see the [LICENSE](LICENSE) file for details.

## Credits

- Built with [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts)
- Book covers from [OpenLibrary](https://openlibrary.org/)
- Developed by [vianasw](https://github.com/vianasw)

## Support

- 🐛 [Report bugs](https://github.com/vianasw/book-grid/issues)
- 💡 [Request features](https://github.com/vianasw/book-grid/issues)

## Links

- [WordPress.org Plugin Page](#) (Coming Soon)
- [GitHub Repository](https://github.com/vianasw/book-grid)

## Source Code & Build

The distributed `build/` assets are compiled from the human-readable source in [`src/`](./src). Build scripts rely on `@wordpress/scripts`. Install dependencies with `npm install` and run `npm run build` to regenerate the production assets.

## External Services

This plugin calls Open Library to fetch book covers automatically:

- **Service**: Open Library Search and Covers APIs (`openlibrary.org`, `covers.openlibrary.org`)
- **Data sent**: The book title entered in the block is sent as a search query when you add or update a book. Cover image requests include the returned cover ID. No other data is transmitted.
- **Purpose**: Retrieve book cover images so the grid can display artwork without manual uploads.
- **Policies**: [Terms of Service](https://openlibrary.org/terms) | [Privacy Policy](https://openlibrary.org/privacy)
