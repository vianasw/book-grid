# Translations

This directory contains translation files for the Book Grid plugin.

## Available Translations

- **Spanish (es_ES)** - Complete

## Contributing Translations

We welcome community translations! Here's how to add a new language:

### Method 1: Using Poedit (Recommended for non-developers)

1. Download and install [Poedit](https://poedit.net/)
2. Open `book-grid-block-wp.pot` in Poedit
3. Create a new translation from the POT file
4. Select your language
5. Translate all strings
6. Save the file (it will create both .po and .mo files)
7. Submit a pull request with your translation files

### Method 2: Manual (For developers)

1. Copy `book-grid-block-wp.pot` to `book-grid-block-wp-{locale}.po`
   - Example: `book-grid-block-wp-fr_FR.po` for French
2. Update the header information (language, translator, etc.)
3. Translate all `msgstr` values
4. Compile to .mo: `msgfmt -o book-grid-block-wp-{locale}.mo book-grid-block-wp-{locale}.po`
5. Create the JSON file for block editor translations
6. Submit a pull request

## File Structure

- `*.pot` - Template file (don't translate, use as source)
- `*.po` - Human-readable translation files
- `*.mo` - Compiled binary files (used by WordPress)
- `*-index.json` - JSON translations for the block editor

## Testing Your Translation

1. Copy the translation files to the `languages` directory
2. Change your WordPress site language to your target language
3. The plugin interface should display in your language

## Questions?

Open an issue on [GitHub](https://github.com/williamvianas/book-grid/issues) if you need help with translations!
