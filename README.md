# Salesforce Field Metadata Exporter

A Chrome extension to export Salesforce object and field metadata to CSV with advanced filtering capabilities.

[![GitHub release](https://img.shields.io/github/v/release/bazztrap/salesforce-field-metadata-exporter)](https://github.com/bazztrap/salesforce-field-metadata-exporter/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 📊 **Export all Salesforce objects and fields** to CSV with one click
- 👤 **User Permission Filtering** - Export only objects/fields a specific user can access
- 🔧 **System Object Filtering** - Independent control over Share, Feed, History, ChangeEvent, and Platform Event objects
- 🎯 **Flexible Filtering** - Standard and Custom object filtering
- 🔌 **API Options** - Choose between Standard API and Tooling API
- 📋 **Comprehensive Metadata**:
  - Basic information (Name, Label, Type, Length, etc.)
  - Field attributes (Required, Unique, Createable, etc.)
  - Relationship information (ReferenceTo, RelationshipName, etc.)
  - Picklist values
  - User permissions (Read/Edit access per field when filtering by user)
- ⚡ **Real-time progress tracking**
- 🎨 **Clean, simple interface**

## Quick Start

### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/bazztrap/salesforce-field-metadata-exporter.git
   cd salesforce-field-metadata-exporter
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `salesforce-metadata-exporter` folder
   - The extension should now appear in your extensions list

### Usage

1. **Navigate to Salesforce** - Open any Salesforce org (production, sandbox, or developer)
2. **Click the extension icon** in the Chrome toolbar
3. **Configure export options**:
   - Select object types (Standard, Custom, or both)
   - Choose API type (Standard or Tooling)
   - Enable system object filtering (optional)
   - Enable user permission filtering (optional)
4. **Click "Export All Metadata"**
5. **Download completes** - CSV file automatically downloads

## Advanced Features

### System Object Filtering (v1.3.0)

Filter out system objects independently on ANY export:

```
✅ Export all objects WITHOUT system objects
✅ Export user-filtered objects WITHOUT system objects
✅ Export all objects WITH system objects (disable filter)
```

**Configurable filters:**
- Share objects (AccountShare, ContactShare, etc.)
- Feed objects (AccountFeed, CaseFeed, etc.)
- History objects (AccountHistory, etc.)
- Change Data Capture (ChangeEvent)
- Platform Events (__e suffix)

See [SYSTEM_FILTER_OPTIONS.md](SYSTEM_FILTER_OPTIONS.md) for details.

### User Permission Filtering (v1.1.0)

Export metadata filtered by a specific user's access rights - perfect for security audits!

**How to use:**
1. Check "Filter by User Permissions"
2. Enter a Salesforce username (e.g., `john.doe@company.com`)
3. Click "Export All Metadata"

**The export will:**
- Only include objects the user can read
- Only include fields the user can read
- Add permission columns showing Read/Edit access
- Add object-level permission columns (Create, Edit, Delete, etc.)

**Use cases:**
- Security audits - "What can this user access?"
- Troubleshooting - "Why can't Sarah see this field?"
- Compliance - Document PII field access
- User access reviews
- Role comparisons

See [USER_PERMISSION_FILTER.md](USER_PERMISSION_FILTER.md) for detailed documentation.

## CSV Output Format

### Always Included
- ObjectName, ObjectLabel, IsCustomObject
- FieldName, FieldLabel, Type
- Length, Precision, Scale

### Optional (Field Attributes)
- Required, Unique, ExternalId
- Createable, Updateable, Filterable, Sortable
- Calculated, DefaultValue

### Optional (Relationships)
- ReferenceTo, RelationshipName
- CascadeDelete, RestrictedDelete

### Optional (Picklist)
- PicklistValues, RestrictedPicklist

### When Filtering by User
- UserCanRead, UserCanEdit (field-level)
- ObjRead, ObjCreate, ObjEdit, ObjDelete (object-level)
- ObjViewAll, ObjModifyAll (object-level)
- FilteredForUser (metadata)

## Troubleshooting

### Common Issues

**Error 401 (Authentication Failed):**
1. Refresh the Salesforce page
2. Reload the extension at `chrome://extensions/`
3. Log out and back into Salesforce
4. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions

**"Could not connect to Salesforce page":**
- Refresh the Salesforce page (F5)
- Reload the extension
- Ensure you're on an actual Salesforce page, not the login page

**"Could not retrieve Salesforce session":**
- Log out and back into Salesforce
- Check cookie settings (must allow cookies for Salesforce)
- Disable ad blockers for Salesforce domains

**Export taking too long:**
- Uncheck "Include Standard Objects" for faster export
- Large orgs (500+ objects) may take 10-20 minutes
- Enable system object filtering to reduce objects

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for comprehensive solutions.

## Development

### File Structure
```
salesforce-field-metadata-exporter/
├── manifest.json          # Extension configuration
├── popup.html             # Extension popup UI
├── popup.css              # Popup styling
├── popup.js               # Popup logic
├── content.js             # Salesforce page interaction
├── background.js          # Service worker for cookies
├── icons/                 # Extension icons
│   ├── icon.svg          # Source SVG
│   ├── icon16.png        # 16x16 icon
│   ├── icon48.png        # 48x48 icon
│   └── icon128.png       # 128x128 icon
└── *.md                  # Documentation
```

### Building from Source

1. Clone the repository
2. Load in Chrome as unpacked extension
3. Make modifications as needed
4. Test thoroughly in different Salesforce orgs

### Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

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

## Permissions

This extension requires:
- **cookies**: To read the Salesforce session cookie for API authentication
- **activeTab**: To interact with the current Salesforce page
- **host_permissions**: To make API calls to Salesforce domains

**Privacy:** Your Salesforce credentials are never stored or transmitted outside of Salesforce. The extension only uses your existing browser session. See [PRIVACY_POLICY.md](PRIVACY_POLICY.md).

## Known Limitations

- Cannot export objects without API access
- Very large orgs (1000+ objects) may take 10+ minutes
- Picklist values limited to active values only
- Some field metadata may vary between API versions
- Requires active Salesforce session

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

### Recent Releases

- **v1.3.0** (2024-10-24) - Decoupled system filtering from user permission filtering
- **v1.2.1** (2024-10-23) - Critical hotfix for infinite loop and zero objects bug
- **v1.2.0** (2024-10-22) - Added granular system object filter controls
- **v1.1.1** (2024-10-21) - Fixed permission filtering logic
- **v1.1.0** (2024-10-20) - Added user permission filtering feature
- **v1.0.1** (2024-10-19) - Fixed 401 authentication errors
- **v1.0.0** (2024-10-18) - Initial release

## License

MIT License - See [LICENSE](LICENSE) for details.

## Support

For issues, questions, or suggestions:
- 🐛 [Report an issue](https://github.com/bazztrap/salesforce-field-metadata-exporter/issues)
- 📖 Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- 📋 Review [CHANGELOG.md](CHANGELOG.md)
- 💬 Start a [Discussion](https://github.com/bazztrap/salesforce-field-metadata-exporter/discussions)

## Acknowledgments

Built for Salesforce administrators, developers, and architects who need quick access to org metadata.

Authentication approach inspired by [Salesforce Inspector Reloaded](https://github.com/tprouvot/Salesforce-Inspector-reloaded).

---

**Note**: This is an independent project and is not affiliated with or endorsed by Salesforce.com, Inc.
