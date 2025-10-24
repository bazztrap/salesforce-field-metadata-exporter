# Publishing to Chrome Web Store

Complete guide to publishing the Salesforce Metadata Exporter to the Chrome Web Store.

## Prerequisites

Before you can publish:

1. **Chrome Web Store Developer Account**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay the $5 one-time registration fee
   - Verify your email address

2. **Proper Icons**
   - Replace placeholder icons with professional ones
   - Use the `create_icons.py` script (requires Pillow) OR
   - Convert `icons/icon.svg` to PNG using an online tool OR
   - Create custom icons in a graphics editor

3. **Privacy Policy**
   - Host the `PRIVACY_POLICY.md` on a public URL
   - Options: GitHub Pages, your website, or Google Drive (public link)

## Step-by-Step Publishing Process

### 1. Prepare the Extension Package

```bash
# Navigate to the extension directory
cd salesforce-metadata-exporter

# Create proper icons (if not already done)
# Option A: Using Python with Pillow
pip install Pillow
python3 create_icons.py

# Option B: Convert SVG manually
# Use online converter: https://cloudconvert.com/svg-to-png

# Remove development files
rm create_icons.py
rm create_placeholder_icons.py
rm PUBLISHING.md
rm QUICKSTART.md
rm .gitignore

# Create a ZIP file (from parent directory)
cd ..
zip -r salesforce-metadata-exporter.zip salesforce-metadata-exporter \
  -x "*.git*" \
  -x "*node_modules*" \
  -x "*.DS_Store"
```

### 2. Prepare Store Listing Assets

Create promotional images (required):

#### Small Tile (Required)
- Size: 440 x 280 pixels
- PNG format
- Shows on search results

#### Large Tile (Required)
- Size: 920 x 680 pixels
- PNG format
- Shows on extension detail page

#### Marquee Tile (Optional but recommended)
- Size: 1400 x 560 pixels
- PNG format
- Featured placement

#### Screenshots (Required - at least 1)
- Size: 1280 x 800 or 640 x 400 pixels
- PNG or JPEG
- Show the extension in action
- Recommendation: 3-5 screenshots showing:
  1. Extension popup with options
  2. Export in progress
  3. Downloaded CSV file
  4. Sample data in spreadsheet

### 3. Upload to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

2. Click **New Item**

3. Upload `salesforce-metadata-exporter.zip`

4. Fill in the **Store Listing** details:

   **Product Details:**
   - Name: `Salesforce Metadata Exporter`
   - Summary (132 chars max):
     ```
     Export all Salesforce objects and fields to CSV with one click. Simple, fast, and secure metadata export for admins and developers.
     ```

   **Description:**
   ```
   Salesforce Metadata Exporter makes it easy to export all your Salesforce objects and field metadata to CSV format.

   KEY FEATURES:
   • One-click export of all objects and fields
   • Filter by Standard or Custom objects
   • Include detailed field attributes
   • Export relationship information
   • Include picklist values
   • Real-time progress tracking
   • Simple, clean interface

   PERFECT FOR:
   • Salesforce Administrators documenting their org
   • Developers needing schema reference
   • Architects planning migrations
   • Consultants auditing configurations
   • Anyone needing quick metadata exports

   HOW IT WORKS:
   1. Navigate to any Salesforce org
   2. Click the extension icon
   3. Select export options
   4. Click "Export All Metadata"
   5. Download completes automatically!

   PRIVACY & SECURITY:
   • No data collection
   • No external servers
   • Uses your existing Salesforce session
   • All processing happens locally
   • Open source - verify the code yourself

   CSV OUTPUT INCLUDES:
   • Object and field names/labels
   • Data types and lengths
   • Field attributes (Required, Unique, etc.)
   • Relationship information
   • Picklist values
   • And more!

   SUPPORTED SALESFORCE INSTANCES:
   • Production orgs
   • Sandbox environments
   • Developer editions
   • All Salesforce clouds

   NO INSTALLATION HASSLES:
   Just add the extension and start exporting. No configuration required!
   ```

   **Category:** Developer Tools

   **Language:** English

5. **Privacy Practices:**

   **Single Purpose:**
   ```
   Export Salesforce metadata (objects and fields) to CSV format for documentation and analysis purposes.
   ```

   **Permission Justifications:**

   - **cookies**
     ```
     Required to access the Salesforce session cookie for API authentication
     ```

   - **activeTab**
     ```
     Required to detect Salesforce pages and inject content scripts for metadata retrieval
     ```

   - **host_permissions (Salesforce domains)**
     ```
     Required to make API calls to Salesforce REST APIs to retrieve metadata
     ```

   **Data Usage:**
   - Select: "Does not collect user data"

   **Privacy Policy URL:**
   - Host your PRIVACY_POLICY.md somewhere public
   - Example: `https://yourusername.github.io/salesforce-metadata-exporter/privacy-policy.html`

6. **Upload Assets:**
   - Upload all promotional images
   - Upload screenshots

7. **Set Visibility:**
   - Public (if ready for everyone)
   - Unlisted (if testing with specific users)

8. **Click Save Draft**

### 4. Submit for Review

1. Review all information
2. Click **Submit for Review**
3. Wait for Google's review (typically 1-3 business days)

### 5. After Publication

Once approved:

1. **Share the link:**
   - Your extension URL will be: `https://chrome.google.com/webstore/detail/[extension-id]`

2. **Monitor reviews:**
   - Respond to user feedback
   - Fix reported bugs
   - Add requested features

3. **Update regularly:**
   - Fix bugs
   - Add new Salesforce API versions
   - Improve features

## Updating the Extension

To publish an update:

1. Increment version in `manifest.json`
2. Create new ZIP file
3. Go to Developer Dashboard
4. Click on your extension
5. Upload new ZIP
6. Submit for review

## Pricing Options

### Free Extension (Recommended)
- No cost to users
- Maximum adoption
- Build reputation

### Paid Extension
- One-time payment or subscription
- Requires merchant account setup
- Provides revenue stream

## Marketing Tips

1. **Optimize listing:**
   - Use keywords: Salesforce, metadata, export, CSV, fields, objects
   - Great screenshots
   - Clear description

2. **Promote on:**
   - Salesforce community forums
   - LinkedIn
   - Twitter
   - Reddit (r/salesforce)
   - Salesforce Stack Exchange

3. **Get reviews:**
   - Ask colleagues to review
   - Share with Salesforce admins groups
   - Respond to all reviews

## Common Review Rejection Reasons

- **Permissions too broad:** Ensure you only request necessary permissions
- **Missing privacy policy:** Must have public privacy policy URL
- **Poor quality icons:** Use professional-looking icons
- **Unclear description:** Be specific about what the extension does
- **Trademark issues:** Don't claim to be official Salesforce product

## Legal Considerations

1. **Trademark:**
   - Don't use Salesforce logos without permission
   - Include disclaimer: "Not affiliated with Salesforce.com, Inc."

2. **Privacy Policy:**
   - Must be accurate and complete
   - Must be publicly accessible
   - Update if you change data practices

3. **Terms of Service:**
   - Consider adding terms of service
   - Limit liability

## Resources

- [Chrome Web Store Developer Documentation](https://developer.chrome.com/docs/webstore/)
- [Extension Best Practices](https://developer.chrome.com/docs/extensions/mv3/quality_guidelines/)
- [Branding Guidelines](https://developer.chrome.com/docs/webstore/branding/)
- [Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)

## Checklist Before Publishing

- [ ] Professional icons created (16x16, 48x48, 128x128)
- [ ] All promotional images created
- [ ] Screenshots prepared
- [ ] Privacy policy hosted publicly
- [ ] Manifest.json version set correctly
- [ ] Extension tested in multiple Salesforce orgs
- [ ] All features working correctly
- [ ] No console errors
- [ ] Description is clear and accurate
- [ ] Permissions justified
- [ ] ZIP file created (no dev files included)
- [ ] Developer account registered and paid

Good luck with your Chrome Web Store publication!
