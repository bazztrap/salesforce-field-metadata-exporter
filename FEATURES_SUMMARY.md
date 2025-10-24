# Features Summary

Quick overview of all Salesforce Metadata Exporter features.

## Current Version: 1.1.0

## Core Features

### 1. Basic Metadata Export
Export all Salesforce objects and fields to CSV format.

**What you get:**
- Object names and labels
- Field names, labels, and types
- Data type details (length, precision, scale)

**Configuration:**
- Include/exclude Standard objects
- Include/exclude Custom objects
- Choose Standard API or Tooling API

### 2. Detailed Field Metadata (Optional)

**Field Attributes:**
- Required, Unique, External ID flags
- Createable, Updateable flags
- Filterable, Sortable flags
- Calculated field indicator
- Default values

**Relationship Information:**
- Referenced objects (ReferenceTo)
- Relationship names
- Cascade delete settings
- Restricted delete settings

**Picklist Values:**
- All available picklist options
- Restricted picklist indicator

### 3. User Permission Filter ⭐ NEW in v1.1.0

Export metadata filtered by a specific user's access permissions.

**How it works:**
1. Enter a Salesforce username
2. Extension queries user's Profile and Permission Sets
3. Fetches ObjectPermissions and FieldPermissions
4. Filters export to only accessible objects/fields
5. Adds permission columns to CSV

**Permission Details in CSV:**
- `UserCanRead` - Field read access (Yes/No)
- `UserCanEdit` - Field edit access (Yes/No)
- `ObjRead` - Object read permission
- `ObjCreate` - Object create permission
- `ObjEdit` - Object edit permission
- `ObjDelete` - Object delete permission
- `ObjViewAll` - View All Records permission
- `ObjModifyAll` - Modify All Records permission
- `FilteredForUser` - Username in export

**Use Cases:**
- Security audits
- User access reviews
- Troubleshooting field visibility
- Compliance reporting
- Role comparisons

**See detailed docs:** [USER_PERMISSION_FILTER.md](USER_PERMISSION_FILTER.md)

### 4. Real-Time Progress Tracking

Visual feedback during export:
- Progress bar showing completion percentage
- Status messages (e.g., "Processing 50 of 200: Account")
- Live statistics (objects processed, fields found)
- Processing time counter

### 5. Smart Export Options

**API Selection:**
- Standard API - Regular Salesforce objects
- Tooling API - Metadata-specific objects

**Filtering:**
- Object type filtering (Standard/Custom)
- User permission filtering (v1.1.0+)

**Output:**
- Automatic CSV download
- Meaningful filename with date
- Username included in filename when filtered
- Proper CSV escaping and formatting

## Feature Comparison

| Feature | Without User Filter | With User Filter |
|---------|-------------------|------------------|
| Objects Exported | All accessible | Only user can read |
| Fields Exported | All fields | Only user can read |
| Permission Columns | No | Yes (9 columns) |
| Filename | `salesforce_metadata_2024-10-23.csv` | `salesforce_metadata_2024-10-23_username.csv` |
| Export Time | Baseline | +5-10 seconds |
| API Calls | ~N (describes) | ~N + 5-7 (permission queries) |
| Use Case | Documentation | Security/Compliance |

## Coming Features (Roadmap)

Potential future enhancements:
- Export to Excel format with multiple sheets
- Filter by object patterns (e.g., "Custom_*__c")
- Include Permission Set details
- Include Validation Rules
- Include Formula Field definitions
- Export Page Layouts
- Export Record Types
- Compare metadata between orgs
- Scheduled exports
- Export user assignments to Profiles/Permission Sets

## Version History

### v1.1.0 (Current)
- Added User Permission Filter
- Added permission columns to CSV
- Enhanced progress messaging
- Username in filename

### v1.0.1
- Fixed 401 authentication errors
- Improved session detection
- Better error messages
- Troubleshooting guide

### v1.0.0
- Initial release
- Basic metadata export
- Object/field filtering
- Progress tracking

## Technical Specifications

**Performance:**
- **Small orgs** (<100 objects): ~30-60 seconds
- **Medium orgs** (100-500 objects): ~2-5 minutes
- **Large orgs** (500+ objects): ~5-15 minutes

**API Usage:**
- Describe Global: 1 call
- Describe Object: 1 call per object
- User Lookup: 1 call (if filtering)
- Permission Sets: 1 call (if filtering)
- Object Permissions: ~1-2 calls (if filtering)
- Field Permissions: ~1-2 calls (if filtering)

**Limits:**
- Max fields per object: Unlimited
- Max objects: Unlimited (limited by API access)
- Max export size: Limited by browser memory
- Typical CSV size: 1-10 MB for most orgs

**Browser Compatibility:**
- Chrome 88+
- Edge 88+ (Chromium-based)
- Other Chromium browsers (Brave, Opera, etc.)

**Salesforce Compatibility:**
- All Salesforce editions
- Production orgs
- Sandbox environments
- Developer orgs
- API version 60.0 (Spring '24)

## Privacy & Security

**Data Handling:**
- All processing happens locally in your browser
- No data sent to external servers
- Uses your existing Salesforce session
- Session not stored permanently

**Permissions Required:**
- Cookies (to read Salesforce session)
- Active Tab (to detect Salesforce pages)
- Host Permissions (to call Salesforce APIs)

**User Data:**
- Usernames only used for permission queries
- Not stored or transmitted outside browser
- Appears in CSV filename and FilteredForUser column

## Support & Documentation

### Main Docs
- [README.md](README.md) - Complete user guide
- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

### Feature-Specific
- [USER_PERMISSION_FILTER.md](USER_PERMISSION_FILTER.md) - Permission filtering guide
- [FIXED_401_ERROR.md](FIXED_401_ERROR.md) - Authentication fix details

### Development
- [PUBLISHING.md](PUBLISHING.md) - Chrome Web Store publishing
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [PRIVACY_POLICY.md](PRIVACY_POLICY.md) - Privacy policy

## Quick Links

**Common Tasks:**
- Export all metadata → Check all options, click Export
- Export for specific user → Enable "Filter by User Permissions", enter username
- Export custom objects only → Uncheck "Include Standard Objects"
- Security audit → Use User Permission Filter
- Troubleshoot access → Export with username, check permission columns

**Getting Started:**
1. Install extension
2. Navigate to Salesforce
3. Click extension icon
4. Configure options
5. Click "Export All Metadata"
6. Review downloaded CSV

---

**Questions?** See [README.md](README.md) or [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
