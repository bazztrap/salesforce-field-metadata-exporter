# Icon Instructions

To create proper PNG icons for the Chrome extension, you need to convert the SVG file to PNG at different sizes.

## Required Icon Sizes:
- 16x16 pixels (icon16.png)
- 48x48 pixels (icon48.png)
- 128x128 pixels (icon128.png)

## Option 1: Using Online Tools
1. Go to https://cloudconvert.com/svg-to-png
2. Upload the `icon.svg` file
3. Set the output size to 128x128
4. Download as `icon128.png`
5. Repeat for 48x48 (icon48.png) and 16x16 (icon16.png)

## Option 2: Using ImageMagick (Command Line)
If you have ImageMagick installed:

```bash
# Convert to 128x128
magick icon.svg -resize 128x128 icon128.png

# Convert to 48x48
magick icon.svg -resize 48x48 icon48.png

# Convert to 16x16
magick icon.svg -resize 16x16 icon16.png
```

## Option 3: Using Inkscape (Command Line)
If you have Inkscape installed:

```bash
# Convert to 128x128
inkscape icon.svg --export-filename=icon128.png -w 128 -h 128

# Convert to 48x48
inkscape icon.svg --export-filename=icon48.png -w 48 -h 48

# Convert to 16x16
inkscape icon.svg --export-filename=icon16.png -w 16 -h 16
```

## Option 4: Using a Graphics Editor
1. Open `icon.svg` in Adobe Illustrator, Figma, or similar
2. Export as PNG at 128x128, 48x48, and 16x16 pixels
3. Save with the appropriate filenames

## Temporary Workaround
For testing purposes, you can create simple colored PNG files or copy the same image at different sizes. The extension will still work, but the icons won't look as professional.

## Design Guidelines
The current SVG icon shows:
- Blue circular background (Salesforce brand color #0176d3)
- White table/database rows (representing metadata)
- White download arrow (representing export functionality)

Feel free to customize the design to better match your branding!
