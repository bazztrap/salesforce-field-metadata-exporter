# System Object Filters

Documentation for automatic system object filtering when using User Permission Filter.

## Overview

When exporting with the **User Permission Filter** enabled, the extension automatically excludes system and internal Salesforce objects that are typically not relevant for security audits or user access reviews.

## What Gets Filtered

### 1. Share Objects
Objects that end with `Share` - these control record-level sharing.

**Examples:**
- `AccountShare`
- `ContactShare`
- `OpportunityShare`
- `Custom_Object__Share`

**Why excluded:** Share objects control record-level access, not user permissions. They show who can access specific records, which is separate from object/field permissions.

### 2. Feed Objects
Objects that end with `Feed` - these are Chatter feed items.

**Examples:**
- `AccountFeed`
- `CaseFeed`
- `UserFeed`
- `Custom_Object__Feed`

**Why excluded:** Feed objects are Chatter-related and not part of core data model permissions.

### 3. History Objects
Objects that end with `History` - these track field history.

**Examples:**
- `AccountHistory`
- `ContactHistory`
- `OpportunityHistory`
- `Custom_Object__History`

**Why excluded:** History objects are read-only audit trails. Field history permissions are controlled by the parent object.

### 4. Change Event Objects
Objects that end with `ChangeEvent` or `__ChangeEvent` - Change Data Capture events.

**Examples:**
- `AccountChangeEvent`
- `ContactChangeEvent`
- `Custom_Object__ChangeEvent`

**Why excluded:** Change events are streaming events, not queryable objects. They're used for integration, not user access.

### 5. Platform Events
Custom objects that end with `__e` - Platform Events.

**Examples:**
- `Order_Event__e`
- `Notification__e`

**Why excluded:** Platform events are messaging objects, not data objects. They have different permission models.

### 6. Dashboard/Report Objects
Objects that start with `Dashboard`, `Report`, or `Folder`.

**Examples:**
- `Dashboard`
- `DashboardComponent`
- `Report`
- `ReportFolder`

**Why excluded:** These are metadata objects for analytics, not user data.

### 7. Specific System Objects
Individual objects that are system-related.

**Excluded objects:**
- `ActivityHistory` - Historical activity records
- `OpenActivity` - Open tasks/events
- `FeedItem` - Chatter feed items
- `FeedComment` - Chatter comments
- `FeedTrackedChange` - Chatter tracked changes
- `CombinedAttachment` - Virtual attachment view
- `ContentDocumentLink` - File associations
- `AttachedContentDocument` - File attachments
- `NoteAndAttachment` - Legacy attachments
- `UserRecordAccess` - Record access info
- `RecentlyViewed` - Recently viewed records
- `ProcessInstance` - Approval processes
- `ProcessInstanceHistory` - Approval history
- `ProcessInstanceStep` - Approval steps
- `ProcessInstanceWorkitem` - Approval work items

**Why excluded:** These are system/internal objects that don't represent core business data.

## What Does NOT Get Filtered

### Standard Business Objects
All standard Salesforce objects remain if user has access:
- Account, Contact, Lead, Opportunity, Case, etc.
- Task, Event (actual objects, not ActivityHistory)
- User, Profile, PermissionSet
- Campaign, Product, PriceBook
- Any other standard object the user can read

### Custom Objects
All custom objects remain if user has access:
- `Custom_Object__c`
- Any custom object with read permission

### Special Objects
Some "system-like" objects are kept if they're useful:
- `User` - User records
- `Group` - Public groups and queues
- `Profile` - User profiles
- `PermissionSet` - Permission sets
- `RecordType` - Record types

## Filtering Logic Flow

```javascript
For each object in org:
  1. Is user filtering enabled?
     - No → Include all accessible objects
     - Yes → Continue to step 2

  2. Is this a system object? (Share, Feed, History, etc.)
     - Yes → EXCLUDE
     - No → Continue to step 3

  3. Does user have ObjectPermissions for this object?
     - No permissions found → EXCLUDE (safe default)
     - Permissions found → Continue to step 4

  4. Does user have READ access?
     - No → EXCLUDE
     - Yes → INCLUDE ✓
```

## Statistics Shown

After export completes, you'll see:
```
✓ Export completed! 50 objects, 1,234 fields exported.
Filtered out: 127 system objects, 200 objects without access, 89 fields without access
```

**Breakdown:**
- **127 system objects** - Share, Feed, History, ChangeEvent objects
- **200 objects without access** - Objects user can't read
- **89 fields without access** - Fields with FLS restrictions

## Console Logs

When exporting, check the browser console (F12) to see:

```
Excluding system object: AccountShare
Excluding system object: AccountFeed
Excluding system object: AccountHistory
Excluding system object: AccountChangeEvent
...
Filtered out 127 system objects (Share, Feed, History, ChangeEvent, etc.)

No permissions found for Some_Object__c, excluding
User has no read access to Private_Object__c, excluding
...
Filtered out 200 objects without read permission

Final object count for user@example.com: 50 objects
```

## Use Cases

### Security Audit
**Without filtering:** 500 objects (includes 200+ system objects)
**With filtering:** 50 relevant business objects

**Benefit:** Focus on actual data the user accesses, not system clutter.

### Compliance Report
**Question:** "What customer data can this user see?"

**With system filtering:**
- ✓ Account, Contact, Opportunity (business data)
- ✗ AccountShare, ContactFeed (noise)

**Result:** Clean report showing actual data access.

### Troubleshooting
**Question:** "Why can't the user see the custom field?"

**With system filtering:**
- Export shows only relevant objects
- Easier to find the object in CSV
- Clear permission columns

## Customizing Filters

If you need to include some system objects:

### Option 1: Export Without User Filter
Uncheck "Filter by User Permissions" to get all objects including system ones.

### Option 2: Modify the Code
Edit `content.js` and adjust the `isSystemObject()` function:

```javascript
const isSystemObject = (objName) => {
  // Comment out suffixes you want to include
  const systemSuffixes = [
    // 'Share',  // Include Share objects
    'Feed',      // Still exclude Feed
    'History',   // Still exclude History
    // ...
  ];
  // ...
};
```

### Option 3: Post-Processing
Export all, then filter the CSV in Excel/Sheets.

## Technical Notes

### Why Exclude Objects Without Permissions?

When filtering by user, if we can't find ObjectPermissions:
- **Old approach:** Include it (assumed accessible)
- **New approach:** Exclude it (safer)

**Reasoning:** If the user truly has access, there should be an ObjectPermission entry. If there isn't one, they likely don't have access.

**Exception:** Some legacy orgs might have implicit permissions without entries. In that case, use the non-filtered export.

### Performance Impact

Filtering system objects:
- **Time saved:** ~30-60 seconds (fewer API calls)
- **CSV size:** 50-70% smaller
- **Memory:** Lower browser memory usage

### API Limits

Filtering reduces API calls:
- Without filtering: 500 describe calls
- With filtering: 50 describe calls
- **Saved:** 450 API calls

## FAQ

**Q: Why isn't Share object showing up?**
A: Share objects are automatically filtered when using User Permission Filter.

**Q: I need to see History objects. How?**
A: Export without User Permission Filter, or modify the code.

**Q: Why filter out ChangeEvent objects?**
A: Change events aren't queryable like normal objects and have different permissions.

**Q: Can I see which objects were filtered?**
A: Yes! Check the browser console (F12) for detailed logs.

**Q: Does this affect exports without user filter?**
A: No. System object filtering only happens when User Permission Filter is enabled.

**Q: Why exclude Event objects?**
A: The suffix "Event" catches ChangeEvent objects. Standard Event and Task objects are kept.

**Q: What if I need Feed or History objects?**
A: Export without the User Permission Filter to get all objects.

## Examples

### Before System Filtering
```
Total objects: 523
- Account, Contact, Lead, Opportunity (business)
- AccountShare, ContactShare, LeadShare, OpportunityShare (share)
- AccountFeed, ContactFeed, LeadFeed, OpportunityFeed (feed)
- AccountHistory, ContactHistory, LeadHistory, OpportunityHistory (history)
- AccountChangeEvent, ContactChangeEvent, ... (change events)
- 400+ more system objects
```

### After System Filtering
```
Total objects: 87
- Account, Contact, Lead, Opportunity (business)
- Case, Campaign, Product, PriceBook (business)
- Custom_Object__c, Another_Custom__c (custom)
- User, Profile, Group (identity)
- 70+ other relevant objects
```

**Result:** 83% reduction in noise!

## Conclusion

System object filtering makes user permission exports:
- ✓ Cleaner and focused
- ✓ Faster to process
- ✓ Easier to analyze
- ✓ More relevant for security audits

The filtered objects are not lost - they're just excluded from user-specific exports where they're not relevant.

---

**Version:** 1.1.1
**Date:** October 2024
