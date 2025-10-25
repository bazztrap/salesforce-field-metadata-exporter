# Screenshot Guide for Chrome Web Store

Quick guide to create required screenshots for Chrome Web Store listing.

---

## Requirements

- **Minimum:** 1 screenshot (required)
- **Recommended:** 3-5 screenshots
- **Size:** 1280x800 pixels (16:10 ratio) OR 640x400 pixels
- **Format:** PNG or JPEG
- **Max file size:** 16 MB per screenshot

---

## Quick Setup (5 minutes)

### Option 1: Use Chrome DevTools (Easiest)

1. **Load extension locally:**
   ```bash
   # In Chrome
   chrome://extensions/
   # Enable "Developer mode"
   # Click "Load unpacked"
   # Select: /Users/rohanpoojary/salesforce-metadata-exporter
   ```

2. **Open Chrome DevTools:**
   - Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - Click "Toggle device toolbar" icon (or `Cmd+Shift+M`)

3. **Set device size:**
   - In device dropdown, select "Responsive"
   - Set dimensions: 1280 x 800
   - Or use: 640 x 400 (smaller option)

4. **Navigate and capture:**
   - Go to: https://login.salesforce.com (or your Salesforce org)
   - Log in if needed
   - Click extension icon
   - Take screenshot using your OS screenshot tool

5. **Save screenshots:**
   - Mac: `Cmd+Shift+4` (select area) or `Cmd+Shift+5` (screenshot tool)
   - Windows: `Windows+Shift+S` (Snipping Tool)
   - Linux: `PrtScn` or screenshot utility

### Option 2: Use Online Screenshot Tool

1. Install extension in Chrome
2. Go to https://www.screenshotmachine.com/ or similar
3. Enter your Salesforce org URL
4. Capture full page
5. Crop to 1280x800 using online image editor

### Option 3: Manual Capture + Resize

1. Take screenshots naturally while using extension
2. Use online resize tool:
   - https://www.resizepixel.com/
   - https://imageresizer.com/
   - Upload screenshot
   - Resize to 1280x800 pixels
   - Download resized image

---

## Screenshot Content Recommendations

### Screenshot 1: Extension Popup (REQUIRED)

**What to show:**
- Extension popup fully opened
- All options visible
- Clean, professional appearance

**How to capture:**
1. Click extension icon in Chrome
2. Make sure popup is fully visible
3. Screenshot the popup window
4. Include some Salesforce page in background (optional)

**Caption:**
```
Export Salesforce metadata with one click
```

---

### Screenshot 2: Export Options (RECOMMENDED)

**What to show:**
- System Object Filter section expanded
- User Permission Filter section visible
- All checkboxes and options clear

**How to capture:**
1. Click extension icon
2. Expand "Show advanced options"
3. Capture full popup with all options

**Caption:**
```
Granular control over what to export
```

---

### Screenshot 3: Export Progress (RECOMMENDED)

**What to show:**
- Progress bar active
- Status message showing
- Real-time feedback

**How to capture:**
1. Start an export
2. Quickly capture while progress bar is showing
3. Alternative: Edit screenshot to add progress bar at 50%

**Caption:**
```
Real-time progress tracking during export
```

---

### Screenshot 4: CSV Output (RECOMMENDED)

**What to show:**
- Exported CSV opened in Excel or Google Sheets
- Multiple columns visible (ObjectName, FieldName, Type, etc.)
- Professional data table view

**How to capture:**
1. Run an export
2. Open downloaded CSV in Excel or Google Sheets
3. Zoom to show data clearly
4. Capture spreadsheet window
5. Resize to 1280x800

**Caption:**
```
Comprehensive metadata in clean CSV format
```

---

### Screenshot 5: User Permission Filter (OPTIONAL)

**What to show:**
- User Permission Filter section
- Username field filled in
- Permission-related options visible

**How to capture:**
1. Check "Filter by User Permissions"
2. Enter a sample username
3. Capture the popup

**Caption:**
```
Filter by user permissions for security audits
```

---

## Quick Screenshot Templates

### Template 1: Minimal (1 screenshot - fastest)

1. Extension popup with all options visible
2. Size: 1280x800
3. Caption: "Export Salesforce metadata with powerful filtering options"
4. **Time: 5 minutes**

### Template 2: Standard (3 screenshots - recommended)

1. Extension popup with main options
2. Export in progress with progress bar
3. CSV file opened in spreadsheet
4. **Time: 15 minutes**

### Template 3: Comprehensive (5 screenshots - best)

1. Extension popup - main view
2. Extension popup - advanced options expanded
3. Export in progress
4. CSV output in spreadsheet
5. User permission filter example
6. **Time: 30 minutes**

---

## Screenshot Editing Tips

### Use Preview (Mac)

1. Open screenshot in Preview
2. Tools → Adjust Size
3. Set width: 1280, height: 800
4. Check "Scale proportionally"
5. Save

### Use Paint (Windows)

1. Open screenshot in Paint
2. Home → Resize
3. Uncheck "Maintain aspect ratio"
4. Set 1280 x 800 pixels
5. Save

### Use GIMP (Free, all platforms)

1. Open screenshot in GIMP
2. Image → Scale Image
3. Set width: 1280, height: 800
4. Interpolation: Cubic
5. Scale
6. Export as PNG

### Use Online Tool

1. Go to: https://www.resizepixel.com/
2. Upload your screenshot
3. Enter dimensions: 1280 x 800
4. Download resized image

---

## Screenshot Checklist

Before uploading to Chrome Web Store:

- [ ] At least 1 screenshot created
- [ ] Size is exactly 1280x800 or 640x400 pixels
- [ ] Format is PNG or JPEG
- [ ] File size under 16 MB (should be ~100-500 KB)
- [ ] Screenshot shows extension clearly
- [ ] No sensitive/personal data visible
- [ ] Image is clear and professional
- [ ] Caption written for each screenshot
- [ ] Screenshots numbered/named clearly

---

## Example Screenshot Workflow (Fastest)

**Total time: ~5 minutes**

1. Load extension in Chrome (1 min)
2. Go to Salesforce org (30 sec)
3. Open Chrome DevTools, set to 1280x800 (30 sec)
4. Click extension icon (5 sec)
5. Take screenshot with Cmd+Shift+4 (10 sec)
6. Save as PNG (5 sec)
7. Verify size (10 sec)
8. Done! ✅

---

## Troubleshooting

### "Screenshot wrong size"
- Use image resize tool (links above)
- Chrome DevTools device mode helps get exact size
- Aspect ratio must be 16:10

### "Screenshot quality too low"
- Use PNG format instead of JPEG
- Don't scale up from smaller screenshots
- Capture at native resolution

### "Can't see extension popup in screenshot"
- Use browser extension to capture extension popups
- Try "Awesome Screenshot" extension
- Or manually edit screenshot to include popup

### "Screenshot shows my personal data"
- Use a Salesforce Developer Edition org for screenshots
- Create test data instead of real data
- Blur/redact any sensitive information in image editor

---

## Tools Reference

**Screenshot Capture:**
- Mac: Built-in (Cmd+Shift+4 or Cmd+Shift+5)
- Windows: Snipping Tool (Windows+Shift+S)
- Linux: Screenshot utility (varies by distro)
- Chrome Extension: "Awesome Screenshot"
- Online: ScreenshotMachine.com

**Image Resize:**
- Online: ResizePixel.com, ImageResizer.com
- Mac: Preview (built-in)
- Windows: Paint (built-in)
- Cross-platform: GIMP (free), Photoshop (paid)

**Image Editing:**
- Mac: Preview, Pixelmator
- Windows: Paint, Paint.NET
- Cross-platform: GIMP, Photoshop, Figma

---

## Final Notes

- Quality matters! Take clear, professional screenshots
- Show the extension in action
- Highlight key features visually
- Don't include personal/sensitive data
- Test in a Salesforce Developer org for safe screenshots

---

Need help? Check PUBLISHING_GUIDE.md for the full publishing process.

Generated: October 24, 2024
