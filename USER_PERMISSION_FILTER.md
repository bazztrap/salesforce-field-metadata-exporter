# User Permission Filter Feature

Export metadata filtered by a specific user's access permissions.

## Overview

This feature allows you to export only the objects and fields that a specific user can access, based on their Profile and Permission Sets. This is incredibly useful for:

- **Security audits** - See exactly what data a user can access
- **User access reviews** - Document user permissions
- **Troubleshooting** - Understand why a user can/cannot see certain fields
- **Compliance** - Generate reports showing user data access
- **Role analysis** - Compare access between different users

## How It Works

When you enable "Filter by User Permissions", the extension:

1. **Looks up the user** by username
2. **Gets their Profile** and **Permission Sets**
3. **Queries ObjectPermissions** - What objects can they access?
4. **Queries FieldPermissions** - What fields can they read/edit?
5. **Filters the export** - Only includes accessible objects/fields
6. **Adds permission columns** - Shows Read/Edit access for each field

## Usage

### Step 1: Enable the Filter

1. Open the extension popup
2. Check **"Filter by User Permissions"**
3. Enter the username (e.g., `john.doe@company.com`)

### Step 2: Export

1. Configure other options as desired
2. Click **"Export All Metadata"**
3. The extension will:
   - Look up the user
   - Fetch their permissions
   - Export only accessible metadata

### Step 3: Review the CSV

The exported CSV includes additional columns:

**Field-Level Permissions:**
- `UserCanRead` - Can the user read this field? (Yes/No)
- `UserCanEdit` - Can the user edit this field? (Yes/No)

**Object-Level Permissions:**
- `ObjRead` - Can read records (Yes/No)
- `ObjCreate` - Can create records (Yes/No)
- `ObjEdit` - Can edit records (Yes/No)
- `ObjDelete` - Can delete records (Yes/No)
- `ObjViewAll` - Has "View All" permission (Yes/No)
- `ObjModifyAll` - Has "Modify All" permission (Yes/No)

**Metadata:**
- `FilteredForUser` - The username this export was filtered for

## Example Output

```csv
ObjectName,FieldName,FieldLabel,Type,UserCanRead,UserCanEdit,ObjRead,ObjCreate,ObjEdit,ObjDelete,FilteredForUser
Account,Name,Account Name,string,Yes,Yes,Yes,Yes,Yes,No,john.doe@company.com
Account,Phone,Phone,phone,Yes,Yes,Yes,Yes,Yes,No,john.doe@company.com
Contact,Email,Email,email,Yes,No,Yes,Yes,No,No,john.doe@company.com
```

## Understanding the Results

### Objects Filtered Out

If an object doesn't appear in the export, the user has NO read access to it.

### Fields Filtered Out

If a field doesn't appear for an object, the user has NO read access to that specific field (Field-Level Security).

### Read vs Edit Access

- `UserCanRead: Yes` - User can see the field
- `UserCanEdit: Yes` - User can modify the field (requires read access too)

### Object Permissions

- `ObjRead: Yes` - User can query/view records
- `ObjCreate: Yes` - User can create new records
- `ObjEdit: Yes` - User can edit existing records
- `ObjDelete: Yes` - User can delete records
- `ObjViewAll: Yes` - User can see all records (bypasses sharing)
- `ObjModifyAll: Yes` - User can edit all records (bypasses sharing)

## How Permissions Are Calculated

The extension queries:

### 1. User Record
```sql
SELECT Id, ProfileId, Profile.Name, Username
FROM User
WHERE Username = 'john.doe@company.com'
```

### 2. Permission Set Assignments
```sql
SELECT PermissionSetId, PermissionSet.Name
FROM PermissionSetAssignment
WHERE AssigneeId = '[user-id]'
```

### 3. Profile Permission Set
```sql
SELECT Id
FROM PermissionSet
WHERE ProfileId = '[profile-id]'
```

### 4. Object Permissions
```sql
SELECT SObjectType, PermissionsRead, PermissionsCreate, PermissionsEdit,
       PermissionsDelete, PermissionsViewAllRecords, PermissionsModifyAllRecords
FROM ObjectPermissions
WHERE ParentId IN ([permission-set-ids])
```

### 5. Field Permissions
```sql
SELECT SObjectType, Field, PermissionsRead, PermissionsEdit
FROM FieldPermissions
WHERE ParentId IN ([permission-set-ids])
```

### Permission Aggregation

If **ANY** Profile or Permission Set grants access, the user has it.

Example:
- Profile: No edit access to Account.Phone
- Permission Set 1: Grants edit access to Account.Phone
- **Result**: User CAN edit Account.Phone

## Use Cases

### 1. Security Audit
**Question**: "What can the Sales Rep see?"

**Action**:
1. Enter sales rep's username
2. Export with user filter
3. Review CSV to see all accessible objects/fields

### 2. Troubleshooting
**Question**: "Why can't Sarah edit the Custom_Field__c?"

**Action**:
1. Export with Sarah's username
2. Find Custom_Field__c in CSV
3. Check `UserCanEdit` column
4. If "No", review her Profile and Permission Sets

### 3. Compliance Reporting
**Question**: "Document who can access sensitive PII fields"

**Action**:
1. Export for each user
2. Filter CSV by sensitive fields
3. Create report showing access matrix

### 4. Role Comparison
**Question**: "Do Sales Managers have more access than Sales Reps?"

**Action**:
1. Export for sales_manager@company.com
2. Export for sales_rep@company.com
3. Compare the two CSVs
4. Identify differences in access

### 5. New User Setup
**Question**: "What will the new user see once we assign them the Standard User profile?"

**Action**:
1. Create the user
2. Assign Profile
3. Export with their username
4. Review what they'll have access to

## Performance Considerations

### Query Volume

For each filtered export, the extension makes:
- 1 query to find the user
- 1 query for Permission Set Assignments
- 1 query for Profile Permission Set
- ~1-2 queries for ObjectPermissions (depending on number of permission sets)
- ~1-2 queries for FieldPermissions

**Total**: ~5-7 API calls to fetch permissions, then normal describe calls.

### Time Impact

- **Small org**: Adds ~3-5 seconds
- **Large org**: Adds ~5-10 seconds
- Minimal impact compared to total export time

### API Limits

The permission queries count toward your daily API limit. For most orgs, this is negligible.

## Limitations

### 1. Sharing Rules Not Included

This export shows **Profile and Permission Set** access only.

**NOT included**:
- Sharing rules
- Manual sharing
- Team-based sharing
- Apex sharing
- Territory hierarchy

**Why**: These are record-specific and can't be determined without specific record IDs.

### 2. Record-Level Access Unknown

The export shows if a user **CAN** access an object/field in general, not if they can access a **specific record**.

### 3. No Validation Rules or Page Layouts

The export doesn't show:
- Validation rules
- Page layout field visibility
- Record types
- Dynamic forms

### 4. System Permissions Not Included

System-level permissions (like "Modify All Data") override everything but aren't explicitly shown per object.

## Troubleshooting

### "User not found"

**Problem**: Username entered incorrectly or user doesn't exist

**Solution**:
- Double-check the username (case-sensitive)
- Ensure the user exists and is active
- Try copying the username directly from Salesforce

### Export Takes Longer

**Problem**: Permission queries add time

**Solution**:
- Normal - permission queries add 5-10 seconds
- Check console for progress messages
- If very slow, check your org's API performance

### Unexpected Access

**Problem**: User appears to have access they shouldn't

**Possible Causes**:
- User has a Permission Set you didn't know about
- Profile was changed recently
- "Modify All Data" or "View All Data" system permission
- Object/Field permissions set to "Read" by default

**Debug**:
1. Check user's assigned Permission Sets in Salesforce
2. Review Profile object permissions
3. Look for system administrator permissions

### Missing Objects

**Problem**: Objects you expect aren't in export

**Reasons**:
- User has no read access (correct behavior)
- Object is hidden from user's Profile
- Object doesn't exist or is misspelled

### All Fields Show "No" for Edit

**Problem**: UserCanEdit shows "No" for all fields

**Likely Cause**:
- User has read-only access to the object
- Object permissions: `ObjEdit: No`
- Field-level security might say "Yes" but object-level blocks it

## Advanced Tips

### 1. Compare Multiple Users

Export for multiple users and use a spreadsheet to compare:

```bash
# Export for user 1
salesforce_metadata_2024-10-23_user1.csv

# Export for user 2
salesforce_metadata_2024-10-23_user2.csv

# Use VLOOKUP or Pivot Tables to compare
```

### 2. Filter for Specific Objects

After export, use Excel/Google Sheets to filter:
- Filter ObjectName column
- Look for specific fields
- Sort by UserCanEdit to find read-only fields

### 3. Identify Security Gaps

Look for:
- Sensitive fields with `UserCanRead: Yes` for low-privilege users
- `ObjViewAll: Yes` or `ObjModifyAll: Yes` for unexpected users
- Edit access on audit fields (CreatedDate, LastModifiedDate)

### 4. Audit Trail

Save exports with usernames in filename:
- `salesforce_metadata_2024-10-23_john_doe.csv`
- Track over time to see permission changes
- Compare before/after Profile updates

## Privacy and Security

### Username Privacy

- Usernames are only used for the export
- Not stored or transmitted anywhere
- Username appears in the CSV filename and FilteredForUser column

### Permission Data

- Permission queries use read-only SOQL
- No modifications to permissions
- All data stays in your browser

### CSV Security

- CSV contains sensitive security information
- Shows exactly what users can access
- Store exported CSVs securely
- Don't share CSVs with unauthorized people

## API Reference

### Input Options

```javascript
{
  filterByUser: true,          // Enable user filtering
  username: "user@example.com" // Salesforce username
}
```

### Output CSV Columns (when filtered)

**Additional Columns:**
- `UserCanRead` (string): "Yes" or "No"
- `UserCanEdit` (string): "Yes" or "No"
- `ObjRead` (string): "Yes" or "No"
- `ObjCreate` (string): "Yes" or "No"
- `ObjEdit` (string): "Yes" or "No"
- `ObjDelete` (string): "Yes" or "No"
- `ObjViewAll` (string): "Yes" or "No"
- `ObjModifyAll` (string): "Yes" or "No"
- `FilteredForUser` (string): Username

## Technical Implementation

### Permission Hierarchy

```
User
  └─ Profile (1)
       └─ PermissionSet (1)
            └─ ObjectPermissions (many)
            └─ FieldPermissions (many)
  └─ PermissionSetAssignments (many)
       └─ PermissionSets (many)
            └─ ObjectPermissions (many)
            └─ FieldPermissions (many)
```

### Aggregation Logic

```javascript
// If ANY permission set grants access, user has it
userCanRead =
  profilePermissions.read ||
  permissionSet1.read ||
  permissionSet2.read ||
  ...
```

## FAQ

**Q: Can I export for inactive users?**
A: Yes, if they still exist in the system.

**Q: Does this work for Community/Portal users?**
A: Yes! Enter their full username including domain.

**Q: Can I export for a Profile instead of a user?**
A: Not directly. Export for a user with that Profile.

**Q: Will this show API-only users?**
A: Yes, enter their username normally.

**Q: Does this check Apex Sharing?**
A: No, only Profile and Permission Set permissions.

**Q: Can I export for multiple users at once?**
A: Not currently. Run separate exports for each user.

---

**Feature Version**: 1.1.0
**Date Added**: October 2024
