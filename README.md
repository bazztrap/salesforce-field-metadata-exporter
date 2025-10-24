# Salesforce Metadata Exporter

A simple Chrome extension to export all Salesforce objects and fields metadata to CSV with one click.

## Features

- Export all Salesforce objects and their fields to a CSV file
- **Filter by User Permissions** - Export only objects/fields a specific user can access
- Filter by Standard and Custom objects
- Choose between Standard API and Tooling API
- Include detailed field metadata:
  - Basic information (Name, Label, Type, Length, etc.)
  - Field attributes (Required, Unique, Createable, etc.)
  - Relationship information (ReferenceTo, RelationshipName, etc.)
  - Picklist values
  - **User permissions** (Read/Edit access per field when filtering by user)
- Real-time progress tracking
- Simple, clean interface

## Installation

### For Development/Testing

1. **Generate Icon Files**

   Before loading the extension, you need to create PNG icon files from the SVG:

   ```bash
   cd salesforce-metadata-exporter/icons
   ```

   Follow the instructions in `ICON_INSTRUCTIONS.md` to create:
   - `icon16.png` (16x16 pixels)
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)

   Quick option using online converter:
   - Go to https://cloudconvert.com/svg-to-png
   - Upload `icon.svg` and convert to each required size

2. **Load Extension in Chrome**

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `salesforce-metadata-exporter` folder
   - The extension should now appear in your extensions list

### For Chrome Web Store Publication

To publish this extension to the Chrome Web Store:

1. Create a Chrome Web Store developer account ($5 one-time fee)
2. Ensure all icon files are properly created
3. Create a privacy policy (required for extensions requesting permissions)
4. Prepare promotional images:
   - Small tile: 440x280 pixels
   - Large tile: 920x680 pixels
   - Marquee tile: 1400x560 pixels (optional)
   - Screenshots: 1280x800 or 640x400 pixels
5. Zip the extension folder (excluding README and development files)
6. Upload to Chrome Web Store Developer Dashboard
7. Fill in the store listing details
8. Submit for review

## Usage

1. **Navigate to Salesforce**
   - Open any Salesforce org (production, sandbox, or developer org)
   - Ensure you are logged in

2. **Open the Extension**
   - Click the extension icon in the Chrome toolbar
   - Or use the keyboard shortcut (if configured)

3. **Configure Export Options**
   - Select object types: Standard Objects, Custom Objects, or both
   - Choose API type: Standard API or Tooling API
   - Select which field details to include:
     - Field Attributes (Required, Unique, etc.)
     - Relationship Information
     - Picklist Values

4. **Export**
   - Click "Export All Metadata"
   - Watch the progress bar as the extension fetches data
   - The CSV file will automatically download when complete

5. **Review the CSV**
   - Open the downloaded CSV file in Excel, Google Sheets, or any spreadsheet application
   - File naming format: `salesforce_metadata_YYYY-MM-DD.csv`
   - If filtered by user: `salesforce_metadata_YYYY-MM-DD_username.csv`

## Advanced Features

### Filter by User Permissions (NEW in v1.1.0)

Export metadata filtered by a specific user's access rights - perfect for security audits and user access reviews!

**How to use:**
1. Check "Filter by User Permissions"
2. Enter a Salesforce username (e.g., `john.doe@company.com`)
3. Click "Export All Metadata"

The export will:
- Only include objects the user can read
- Only include fields the user can read
- Add permission columns showing Read/Edit access
- Add object-level permission columns (Create, Edit, Delete, etc.)

**Use cases:**
- Security audits - "What can this user access?"
- Troubleshooting - "Why can't Sarah see this field?"
- Compliance - "Document PII field access"
- User access reviews
- Role comparisons

**System Object Filtering (NEW in v1.2.0):**
- Control which system objects to include/exclude
- Toggle filters for Share, Feed, History, ChangeEvent, Platform Events
- Advanced options for granular control
- Default: Filters out all system objects for clean exports
- Optional: Include specific types as needed

**See detailed documentation**:
- [USER_PERMISSION_FILTER.md](USER_PERMISSION_FILTER.md) - Permission filtering guide
- [SYSTEM_FILTER_OPTIONS.md](SYSTEM_FILTER_OPTIONS.md) - System object filtering guide

## CSV Output Format

The exported CSV includes the following columns:

### Always Included:
- **ObjectName**: API name of the object
- **ObjectLabel**: Display label of the object
- **IsCustomObject**: Yes/No indicating if it's a custom object
- **FieldName**: API name of the field
- **FieldLabel**: Display label of the field
- **Type**: Field data type (text, number, picklist, etc.)
- **Length**: Maximum length for text fields
- **Precision**: Total digits for number fields
- **Scale**: Decimal places for number fields

### Optional (Field Attributes):
- **Required**: Whether the field is required
- **Unique**: Whether the field must be unique
- **ExternalId**: Whether it's marked as external ID
- **Createable**: Can be set when creating records
- **Updateable**: Can be modified after creation
- **Filterable**: Can be used in WHERE clauses
- **Sortable**: Can be used in ORDER BY
- **Calculated**: Formula field
- **DefaultValue**: Default value if any

### Optional (Relationships):
- **ReferenceTo**: Object(s) this field references
- **RelationshipName**: Name used for relationship queries
- **CascadeDelete**: Child records deleted with parent
- **RestrictedDelete**: Prevents deletion if children exist

### Optional (Picklist Fields):
- **PicklistValues**: All available picklist values (semicolon-separated)
- **RestrictedPicklist**: Whether custom values are allowed

### When Filtering by User (v1.1.0+):
- **UserCanRead**: Whether the user can read this field (Yes/No)
- **UserCanEdit**: Whether the user can edit this field (Yes/No)
- **ObjRead**: Object-level read permission (Yes/No)
- **ObjCreate**: Object-level create permission (Yes/No)
- **ObjEdit**: Object-level edit permission (Yes/No)
- **ObjDelete**: Object-level delete permission (Yes/No)
- **ObjViewAll**: Object-level "View All" permission (Yes/No)
- **ObjModifyAll**: Object-level "Modify All" permission (Yes/No)
- **FilteredForUser**: The username this export was filtered for

## Permissions Explained

This extension requires the following permissions:

- **cookies**: To read the Salesforce session cookie for API authentication
- **activeTab**: To interact with the current Salesforce page
- **host_permissions**: To make API calls to Salesforce domains

Your Salesforce credentials are never stored or transmitted outside of Salesforce. The extension only uses your existing browser session.

## Troubleshooting

### Quick Fixes

**Error 401 (Authentication Failed):**
1. Refresh the Salesforce page
2. Reload the extension at `chrome://extensions/`
3. Log out and back into Salesforce
4. See [detailed 401 troubleshooting](TROUBLESHOOTING.md#error-401-api-call-failed)

**"Could not connect to Salesforce page":**
- Refresh the Salesforce page (F5)
- Reload the extension at `chrome://extensions/`
- Make sure you're on an actual Salesforce page, not the login page

**"Could not retrieve Salesforce session":**
- Log out and back into Salesforce
- Check cookie settings (must allow cookies for Salesforce)
- Disable ad blockers for Salesforce domains

**Export taking too long:**
- Uncheck "Include Standard Objects" for faster export
- Large orgs (500+ objects) may take 10-20 minutes
- Progress bar should keep moving - if stuck, see [troubleshooting guide](TROUBLESHOOTING.md)

### Full Troubleshooting Guide

For detailed solutions to common problems, see **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

Topics covered:
- Authentication errors (401)
- Session detection issues
- API access problems
- Export hangs or failures
- CSV download issues
- Debugging tips
- Alternative solutions

## Technical Details

- **API Version**: 60.0 (Spring '24)
- **Manifest Version**: 3 (latest Chrome extension format)
- **Minimum Chrome Version**: 88+
- **Supported Salesforce Domains**:
  - `*.salesforce.com`
  - `*.force.com`
  - `*.cloudforce.com`
  - `*.visualforce.com`
  - `*.salesforce-setup.com`

## Privacy

This extension:
- Does NOT collect any user data
- Does NOT send data to external servers
- Does NOT store credentials
- Only accesses Salesforce APIs using your existing browser session
- All processing happens locally in your browser

## Development

### File Structure
```
salesforce-metadata-exporter/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup UI
├── popup.css             # Popup styling
├── popup.js              # Popup logic
├── content.js            # Salesforce page interaction
├── background.js         # Service worker
├── icons/                # Extension icons
│   ├── icon.svg         # Source SVG
│   ├── icon16.png       # 16x16 icon
│   ├── icon48.png       # 48x48 icon
│   └── icon128.png      # 128x128 icon
└── README.md            # This file
```

### Building from Source

1. Clone or download this repository
2. Generate icon files (see Installation section)
3. Load in Chrome as unpacked extension
4. Make modifications as needed
5. Test thoroughly in different Salesforce orgs

### Contributing

To contribute to this project:
1. Test the extension in various Salesforce environments
2. Report bugs or suggest features
3. Submit improvements to the code
4. Help with documentation

## Known Limitations

- Cannot export objects without API access
- Very large orgs (1000+ objects) may take 10+ minutes
- Picklist values limited to active values only
- Some field metadata may vary between API versions
- Requires active Salesforce session

## Roadmap

Potential future enhancements:
- [ ] Export to Excel format with multiple sheets
- [ ] Filter by specific object types or patterns
- [ ] Include custom metadata types
- [ ] Export permission sets and profiles
- [ ] Export validation rules and formulas
- [ ] Support for bulk API for faster exports
- [ ] Scheduled/automated exports
- [ ] Compare metadata between orgs

## License

MIT License - Feel free to use and modify as needed.

## Support

For issues, questions, or suggestions:
- Check the Troubleshooting section above
- Review Chrome extension logs (`chrome://extensions` → Details → Inspect views)
- Check Salesforce API limits and permissions

## Version History

### 1.0.0 (Initial Release)
- Export all objects and fields to CSV
- Configurable export options
- Progress tracking
- Support for Standard and Tooling APIs
- Comprehensive field metadata

## Acknowledgments

Built for Salesforce administrators, developers, and architects who need quick access to org metadata.

---

**Note**: This is an independent project and is not affiliated with or endorsed by Salesforce.com, Inc.
