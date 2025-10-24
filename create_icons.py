#!/usr/bin/env python3
"""
Simple script to create PNG icons from SVG using PIL/Pillow
Install Pillow first: pip install Pillow cairosvg
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os

    # Create icons directory if it doesn't exist
    icons_dir = os.path.join(os.path.dirname(__file__), 'icons')
    os.makedirs(icons_dir, exist_ok=True)

    # Icon sizes
    sizes = [16, 48, 128]

    # Salesforce blue color
    sf_blue = (1, 118, 211)  # #0176d3

    for size in sizes:
        # Create a new image with Salesforce blue background
        img = Image.new('RGB', (size, size), sf_blue)
        draw = ImageDraw.Draw(img)

        # Draw a simple white database/table icon
        white = (255, 255, 255)

        # Calculate proportions based on size
        margin = size // 5
        bar_height = size // 10
        spacing = size // 15

        # Draw three horizontal bars (representing table rows)
        y_positions = [
            margin,
            margin + bar_height + spacing,
            margin + 2 * (bar_height + spacing)
        ]

        for y in y_positions:
            draw.rectangle(
                [margin, y, size - margin, y + bar_height],
                fill=white
            )

        # Draw a simple download arrow (for larger icons)
        if size >= 48:
            # Arrow shaft
            center_x = size // 2
            arrow_top = size // 2 + size // 10
            arrow_bottom = size - margin - size // 10
            arrow_width = max(2, size // 20)

            draw.rectangle(
                [center_x - arrow_width, arrow_top, center_x + arrow_width, arrow_bottom],
                fill=white
            )

            # Arrow head
            arrow_head_size = size // 8
            arrow_points = [
                (center_x, arrow_bottom + arrow_head_size),
                (center_x - arrow_head_size, arrow_bottom),
                (center_x + arrow_head_size, arrow_bottom)
            ]
            draw.polygon(arrow_points, fill=white)

        # Save the image
        filename = f'icon{size}.png'
        filepath = os.path.join(icons_dir, filename)
        img.save(filepath, 'PNG')
        print(f'Created {filename}')

    print('\nAll icons created successfully!')
    print('Icons are located in the icons/ directory')

except ImportError:
    print('Error: Pillow library not found.')
    print('Please install it with: pip install Pillow')
    print('\nAlternatively, convert the SVG file manually using:')
    print('- Online tool: https://cloudconvert.com/svg-to-png')
    print('- ImageMagick: magick icon.svg -resize 128x128 icon128.png')
    print('- Inkscape: inkscape icon.svg --export-filename=icon128.png -w 128')
except Exception as e:
    print(f'Error creating icons: {e}')
