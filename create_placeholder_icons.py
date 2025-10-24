#!/usr/bin/env python3
"""
Create minimal placeholder PNG icons without requiring PIL
These are very basic but functional icons for testing
"""
import base64
import os

# Minimal PNG files (1x1 pixel blue squares) in base64
# These are valid PNG files that will work for testing

# Blue pixel PNG (Salesforce blue color)
BLUE_PNG_BASE64 = (
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
)

def create_placeholder_icon(size, filename):
    """Create a simple colored PNG icon"""
    icons_dir = 'icons'
    os.makedirs(icons_dir, exist_ok=True)

    # Decode the base64 PNG
    png_data = base64.b64decode(BLUE_PNG_BASE64)

    # Write to file
    filepath = os.path.join(icons_dir, filename)
    with open(filepath, 'wb') as f:
        f.write(png_data)

    print(f'Created placeholder {filename}')

# Create placeholder icons
sizes = [(16, 'icon16.png'), (48, 'icon48.png'), (128, 'icon128.png')]

print('Creating placeholder icons...')
print('Note: These are minimal placeholders for testing only.')
print('For production, create proper icons using the SVG file.\n')

for size, filename in sizes:
    create_placeholder_icon(size, filename)

print('\nPlaceholder icons created successfully!')
print('\nIMPORTANT: Before publishing to Chrome Web Store:')
print('1. Use the create_icons.py script with Pillow installed, OR')
print('2. Convert icons/icon.svg to PNG using an online tool, OR')
print('3. Design custom icons in a graphics editor')
print('\nThese placeholders will work for local testing.')
