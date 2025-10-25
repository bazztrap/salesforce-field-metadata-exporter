# Chrome Web Store Listing

Complete listing information for publishing Salesforce Field Metadata Exporter.

---

## Store Listing Information

### Name
```
Salesforce Field Metadata Exporter
```

### Summary (132 characters max)
```
Export Salesforce object and field metadata to CSV with user permission filtering and system object controls.
```

### Description (Detailed - up to 16,000 characters)

```
Export all your Salesforce object and field metadata to CSV with one click!

Salesforce Field Metadata Exporter is a powerful Chrome extension designed for Salesforce administrators, developers, and architects who need quick access to comprehensive metadata documentation.

🎯 KEY FEATURES

• Export All Metadata - Export all Salesforce objects and their fields to CSV format instantly
• User Permission Filtering - Filter exports by specific user's access rights for security audits
• System Object Filtering - Independent control over Share, Feed, History, ChangeEvent, and Platform Event objects
• Flexible Object Selection - Choose between Standard objects, Custom objects, or both
• API Options - Select between Standard API and Tooling API
• Comprehensive Field Metadata:
  - Basic information (Name, Label, Type, Length, etc.)
  - Field attributes (Required, Unique, Createable, etc.)
  - Relationship information (ReferenceTo, RelationshipName, etc.)
  - Picklist values
  - User permissions (Read/Edit access when filtering by user)
• Real-time Progress Tracking - Watch the export progress with live status updates
• Clean Interface - Simple, intuitive UI that works right from your browser toolbar

📊 PERFECT FOR

Security Audits - "What can this user access?"
Compliance Documentation - Document access to sensitive fields
Troubleshooting - "Why can't this user see this field?"
User Access Reviews - Regular audits of permissions
Data Dictionary - Create comprehensive org documentation
Training Materials - Document your org's data model
Migration Planning - Understand your metadata before migrations

🔒 PRIVACY & SECURITY

• No data collection - Extension does NOT collect any personal data
• No external servers - All processing happens locally in your browser
• Uses existing session - Works with your current Salesforce login
• Open source - Code available on GitHub for transparency
• Secure authentication - Uses Salesforce session cookies (same as Salesforce Inspector)

🚀 HOW TO USE

1. Navigate to any Salesforce org (production, sandbox, or developer)
2. Click the extension icon in your Chrome toolbar
3. Configure export options:
   - Select object types (Standard, Custom, or both)
   - Choose API type (Standard or Tooling)
   - Enable system object filtering (optional)
   - Enable user permission filtering (optional)
4. Click "Export All Metadata"
5. CSV file downloads automatically when complete

💡 ADVANCED FEATURES

System Object Filtering (NEW)
Filter out system clutter independently on ANY export:
• Share objects (AccountShare, ContactShare, etc.)
• Feed objects (AccountFeed, CaseFeed, etc.)
• History objects (AccountHistory, etc.)
• Change Data Capture (ChangeEvent)
• Platform Events (__e suffix)

User Permission Filtering
Export only what a specific user can access:
1. Check "Filter by User Permissions"
2. Enter Salesforce username (e.g., john.doe@company.com)
3. Export includes only accessible objects and fields
4. Adds permission columns to CSV (Read, Edit, Create, Delete, etc.)

📋 CSV OUTPUT INCLUDES

Always Included:
• Object Name, Label, Type
• Field Name, Label, Type
• Length, Precision, Scale

Optional Field Details:
• Required, Unique, ExternalId
• Createable, Updateable, Filterable, Sortable
• Calculated, DefaultValue
• ReferenceTo, RelationshipName
• CascadeDelete, RestrictedDelete
• PicklistValues, RestrictedPicklist

When Filtering by User:
• UserCanRead, UserCanEdit (field-level)
• ObjRead, ObjCreate, ObjEdit, ObjDelete (object-level)
• ObjViewAll, ObjModifyAll (object-level)
• FilteredForUser (audit trail)

📦 TECHNICAL DETAILS

• Works with all Salesforce editions
• Supports all Salesforce domains (salesforce.com, force.com, cloudforce.com, etc.)
• Chrome Manifest V3 compliant
• Uses Salesforce REST API v60.0
• Handles large orgs (tested with 1000+ objects)
• Real-time progress tracking
• Automatic file download

🆘 SUPPORT

Need help? Check our documentation:
• GitHub Repository: https://github.com/bazztrap/salesforce-field-metadata-exporter
• Report Issues: https://github.com/bazztrap/salesforce-field-metadata-exporter/issues
• Troubleshooting Guide: Available in repository
• Privacy Policy: Available in repository

⚡ VERSION HISTORY

v1.3.0 - Decoupled system filtering from user permission filtering
v1.2.1 - Critical hotfix for infinite loop and zero objects bug
v1.2.0 - Added granular system object filter controls
v1.1.1 - Fixed permission filtering logic
v1.1.0 - Added user permission filtering feature
v1.0.1 - Fixed authentication errors
v1.0.0 - Initial release

📝 PERMISSIONS EXPLAINED

This extension requires minimal permissions:
• cookies - To read Salesforce session for API authentication
• activeTab - To interact with the current Salesforce page
• host_permissions - To make API calls to Salesforce domains

Your credentials are never stored or transmitted outside Salesforce. The extension only uses your existing browser session.

🎓 BUILT FOR SALESFORCE PROFESSIONALS

Whether you're a Salesforce admin conducting security audits, a developer documenting your data model, or an architect planning a migration - this extension saves hours of manual work.

Download now and start exporting your Salesforce metadata in seconds!
```

---

## Category
```
Developer Tools
```

---

## Language
```
English
```

---

## Store Icon (128x128)
Use: `icons/icon128.png`

---

## Screenshots

You'll need to create 1-5 screenshots (1280x800 or 640x400 pixels).

### Recommended Screenshots:

**Screenshot 1: Main Extension Popup**
- Show the extension popup with all options visible
- Caption: "Simple, intuitive interface - configure your export in seconds"

**Screenshot 2: Export in Progress**
- Show the progress bar and status messages
- Caption: "Real-time progress tracking - watch your export complete"

**Screenshot 3: CSV Output in Excel/Sheets**
- Show the exported CSV file opened in a spreadsheet
- Caption: "Comprehensive metadata in clean CSV format"

**Screenshot 4: User Permission Filtering**
- Show the user permission filter options
- Caption: "Filter by user permissions for security audits"

**Screenshot 5: System Object Filtering**
- Show the system object filter options expanded
- Caption: "Granular control over system object filtering"

---

## Promotional Tiles (Optional but Recommended)

### Small Tile (440x280)
- Background: Salesforce blue gradient
- Icon: Extension icon
- Text: "Salesforce Field Metadata Exporter"
- Subtext: "Export to CSV instantly"

### Large Tile (920x680)
- Same design as small tile, larger format
- Add key features as bullet points

### Marquee Tile (1400x560) - Optional
- Promotional banner format
- Highlight main value proposition

---

## Privacy Policy

Use the existing `PRIVACY_POLICY.md` file.

**Privacy Policy URL:**
```
https://github.com/bazztrap/salesforce-field-metadata-exporter/blob/main/PRIVACY_POLICY.md
```

**Or host it separately if preferred.**

---

## Website (Optional)
```
https://github.com/bazztrap/salesforce-field-metadata-exporter
```

---

## Support URL
```
https://github.com/bazztrap/salesforce-field-metadata-exporter/issues
```

---

## Version Number
```
1.3.0
```

---

## Pricing
```
Free
```

---

## Distribution
```
Public
```

---

## Regions
```
All regions
```

---

## Single Purpose Description (For Review)
```
This extension exports Salesforce object and field metadata to CSV format with filtering options.
```

---

## Permission Justification (For Review)

**cookies:**
```
Required to access the user's Salesforce session cookie (sid) for authenticating API requests to Salesforce. Without this, the extension cannot make authenticated calls to retrieve metadata.
```

**activeTab:**
```
Required to detect when the user is on a Salesforce page and to inject the content script that handles the export functionality.
```

**host_permissions (*.salesforce.com, *.force.com, etc.):**
```
Required to make API calls to various Salesforce domains (salesforce.com, force.com, cloudforce.com, visualforce.com) to retrieve object and field metadata via Salesforce REST API.
```

---

## Remote Code
```
No - Extension does not load any remote code
```

---

## Data Usage Disclosure

**Does this extension collect user data?**
```
No
```

**Certify:**
- ✅ Extension does not collect, use, or transmit user data
- ✅ Extension does not use or transmit data for purposes unrelated to the extension's functionality
- ✅ Extension does not sell user data

---

## Notes for Reviewers

```
This extension is a productivity tool for Salesforce administrators and developers.

How it works:
1. User navigates to their Salesforce org
2. User clicks the extension icon and configures export options
3. Extension reads the existing Salesforce session cookie (same approach as Salesforce Inspector)
4. Extension makes API calls to Salesforce REST API to retrieve metadata
5. Extension generates a CSV file locally in the browser
6. CSV file is downloaded to user's computer

No data is collected, stored, or transmitted to any external servers. All processing happens locally in the user's browser.

The extension only works on Salesforce domains and requires an active Salesforce session.

For testing:
- You can use a free Salesforce Developer Edition org: https://developer.salesforce.com/signup
- Log in to the org, then click the extension icon
- The extension will display available export options
```

---

## Testing Instructions for Chrome Web Store Review

```
Testing Steps:

1. Create a free Salesforce Developer Edition account:
   https://developer.salesforce.com/signup

2. Log in to your Salesforce org

3. Click the extension icon in Chrome toolbar

4. You should see the extension popup with export options:
   - Include Standard Objects (checkbox)
   - Include Custom Objects (checkbox)
   - Standard API / Tooling API (radio buttons)
   - System Object Filter section
   - User Permission Filter section (optional)
   - Export All Metadata button

5. Click "Export All Metadata" button

6. Extension will show progress:
   - "Initializing export..."
   - "Fetching objects..."
   - Progress bar updates
   - "Export completed!" message

7. CSV file will download automatically
   - Filename format: salesforce_metadata_YYYY-MM-DD.csv

8. Open CSV file to verify:
   - Contains Salesforce object and field data
   - Columns: ObjectName, ObjectLabel, FieldName, FieldLabel, Type, etc.

Expected behavior: Extension exports metadata successfully from Salesforce to CSV.

Test credentials can be provided if needed for review process.
```

---

## Post-Publication Checklist

After approval:

- [ ] Update README.md with Chrome Web Store link
- [ ] Add Chrome Web Store badge to repository
- [ ] Create GitHub release for v1.3.0 with store link
- [ ] Update PUBLISHING.md with actual publication date
- [ ] Tweet/announce the release (optional)
- [ ] Monitor reviews and ratings
- [ ] Respond to user feedback

---

## Chrome Web Store Developer Dashboard

**URL:** https://chrome.google.com/webstore/devconsole

**Steps:**
1. Log in with your Google account
2. Pay one-time $5 developer fee (if not already paid)
3. Click "New Item"
4. Upload: `salesforce-field-metadata-exporter-v1.3.0.zip`
5. Fill in all store listing information from above
6. Upload screenshots
7. Submit for review

**Review Time:** Typically 1-3 business days

---

Generated: October 24, 2024
Extension Version: 1.3.0
