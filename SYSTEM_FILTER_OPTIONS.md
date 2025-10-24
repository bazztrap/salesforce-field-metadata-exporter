# System Object Filter Options

Control which system objects to include or exclude in your exports.

## Overview

Version 1.2.0 adds **granular control** over system object filtering. You can now:
- Toggle system object filtering on/off
- Choose specific types of system objects to filter
- Keep some system objects while excluding others
- Customize filtering for your specific needs

## UI Options

When you enable **"Filter by User Permissions"**, you'll see:

### Main Toggle
```
☑ Exclude system objects (Share, Feed, History, etc.)
```

**Default:** Checked (enabled)

**When enabled:** Filters out system objects based on advanced settings
**When disabled:** Includes all objects (no system filtering)

### Advanced Options

Click **"Show advanced options"** to see:

```
☑ Share objects (AccountShare, etc.)
☑ Feed objects (AccountFeed, etc.)
☑ History objects (AccountHistory, etc.)
☑ Change Events (CDC)
☑ Platform Events (__e)
```

**Default:** All checked

## Filter Types

### 1. Share Objects

**What:** Record-level sharing objects

**Examples:**
- `AccountShare`
- `ContactShare`
- `OpportunityShare`
- `Custom_Object__Share`

**When to include:**
- Analyzing sharing rules
- Troubleshooting record access
- Documenting sharing model

**When to exclude:**
- Security audits (focuses on object/field permissions)
- Standard metadata exports
- User access reviews

### 2. Feed Objects

**What:** Chatter feed items

**Examples:**
- `AccountFeed`
- `CaseFeed`
- `FeedItem`
- `FeedComment`
- `Custom_Object__Feed`

**When to include:**
- Analyzing Chatter usage
- Feed item audits
- Social features documentation

**When to exclude:**
- Standard security audits
- Data model documentation
- Permission reviews

### 3. History Objects

**What:** Field history tracking

**Examples:**
- `AccountHistory`
- `ContactHistory`
- `ActivityHistory`
- `Custom_Object__History`

**When to include:**
- Audit trail analysis
- History tracking documentation
- Compliance reviews

**When to exclude:**
- Standard exports
- Permission audits
- Current state analysis

### 4. Change Events

**What:** Change Data Capture events

**Examples:**
- `AccountChangeEvent`
- `ContactChangeEvent`
- `Custom_Object__ChangeEvent`

**When to include:**
- CDC integration documentation
- Event-driven architecture planning
- Streaming API analysis

**When to exclude:**
- Standard exports
- User permission audits
- Most use cases (not queryable)

### 5. Platform Events

**What:** Custom platform events

**Examples:**
- `Order_Event__e`
- `Notification__e`
- `Integration_Event__e`

**When to include:**
- Event-driven architecture documentation
- Integration planning
- Messaging system analysis

**When to exclude:**
- Standard exports
- Data model documentation
- Most permission audits

## Always Filtered (When Enabled)

Some objects are always filtered when system filtering is enabled:

**Metadata Objects:**
- `Dashboard`, `DashboardComponent`
- `Report`, `ReportFolder`
- `Folder`

**Utility Objects:**
- `CombinedAttachment`
- `ContentDocumentLink`
- `AttachedContentDocument`
- `NoteAndAttachment`
- `UserRecordAccess`
- `RecentlyViewed`

**Process Objects:**
- `ProcessInstance`
- `ProcessInstanceHistory`
- `ProcessInstanceStep`
- `ProcessInstanceWorkitem`

**Reason:** These are internal/utility objects rarely needed in exports.

## Common Configurations

### 1. Clean Security Audit (Default)

**Goal:** Focus only on business data and user permissions

**Settings:**
- ☑ Exclude system objects
- ☑ Share objects
- ☑ Feed objects
- ☑ History objects
- ☑ Change Events
- ☑ Platform Events

**Result:** Only business objects (Account, Contact, custom objects, etc.)

### 2. Include Everything

**Goal:** Export all objects, no filtering

**Settings:**
- ☐ Exclude system objects

**Result:** All 500+ objects including Share, Feed, History, etc.

### 3. Data Model Only

**Goal:** Document current data structure without history/tracking

**Settings:**
- ☑ Exclude system objects
- ☐ Share objects (keep for sharing analysis)
- ☑ Feed objects
- ☑ History objects
- ☑ Change Events
- ☑ Platform Events

**Result:** Business objects + Share objects

### 4. Include History for Audit

**Goal:** Document objects and their history tracking

**Settings:**
- ☑ Exclude system objects
- ☑ Share objects
- ☑ Feed objects
- ☐ History objects (keep for audit)
- ☑ Change Events
- ☑ Platform Events

**Result:** Business objects + History objects

### 5. Integration Documentation

**Goal:** Document objects, events, and CDC

**Settings:**
- ☑ Exclude system objects
- ☑ Share objects
- ☑ Feed objects
- ☑ History objects
- ☐ Change Events (keep for CDC)
- ☐ Platform Events (keep for integration)

**Result:** Business objects + Change Events + Platform Events

## How It Works

### Filtering Logic

```javascript
For each object:
  1. Is system filtering enabled?
     - No → Include object
     - Yes → Continue

  2. Is this a Share object AND Share filter enabled?
     - Yes → EXCLUDE
     - No → Continue

  3. Is this a Feed object AND Feed filter enabled?
     - Yes → EXCLUDE
     - No → Continue

  4. Is this a History object AND History filter enabled?
     - Yes → EXCLUDE
     - No → Continue

  5. Is this a ChangeEvent AND ChangeEvent filter enabled?
     - Yes → EXCLUDE
     - No → Continue

  6. Is this a Platform Event AND Platform Event filter enabled?
     - Yes → EXCLUDE
     - No → Continue

  7. Is this an always-filtered object?
     - Yes → EXCLUDE
     - No → INCLUDE ✓
```

### Example

**Object:** `AccountShare`

**Checks:**
1. System filtering enabled? → Yes
2. Ends with "Share"? → Yes
3. Share filter enabled? → Yes
4. **Result:** EXCLUDE

**Object:** `Account`

**Checks:**
1. System filtering enabled? → Yes
2. Not a Share object → Continue
3. Not a Feed object → Continue
4. Not a History object → Continue
5. Not a ChangeEvent → Continue
6. Not a Platform Event → Continue
7. Not always-filtered → INCLUDE ✓

## Statistics

After export, you'll see what was filtered:

```
✓ Export completed! 50 objects, 1,234 fields exported.
Filtered out: 127 system objects, 200 objects without access
```

If you disable some filters:
```
✓ Export completed! 75 objects, 1,890 fields exported.
Filtered out: 52 system objects (Feed, History, ChangeEvent, Platform Events)
```

## Console Logging

Check browser console (F12) to see:

**With all filters enabled:**
```
Excluding system object: AccountShare
Excluding system object: AccountFeed
Excluding system object: AccountHistory
Excluding system object: AccountChangeEvent
Filtered out 127 system objects (Share, Feed, History, ChangeEvent, Platform Events)
```

**With only Share filter enabled:**
```
Excluding system object: AccountShare
Excluding system object: ContactShare
Filtered out 42 system objects (Share)
```

## Use Cases

### Security Audit: Focus on Accessible Data

**Need:** See only what user can access, no system clutter

**Configuration:**
- Enable all filters (default)
- Filter by user permissions

**Result:** Clean list of 50 accessible business objects

### Sharing Model Analysis

**Need:** Document sharing rules and object access

**Configuration:**
- Disable Share filter
- Enable all other filters

**Result:** Business objects + Share objects (for sharing analysis)

### Audit Trail Documentation

**Need:** Document field history tracking

**Configuration:**
- Disable History filter
- Enable all other filters

**Result:** Business objects + History objects (for audit purposes)

### Integration Planning

**Need:** Plan CDC and Platform Event integrations

**Configuration:**
- Disable ChangeEvent and Platform Event filters
- Enable all other filters

**Result:** Business objects + Change Events + Platform Events

## Tips

### Quick Toggle

The main checkbox controls all individual filters:
- Check main checkbox → All filters enabled
- Uncheck main checkbox → All filters disabled

### Selective Filtering

1. Uncheck main checkbox (disables all)
2. Show advanced options
3. Check only filters you want
4. Main checkbox shows as checked again

### Default Settings

For most users, the defaults work great:
- ☑ All filters enabled
- Result: Clean, focused exports

### When in Doubt

**Use defaults** - Filters out 70-80% of noise while keeping all relevant business data.

## Performance Impact

### With All Filters Enabled

- **Objects reduced:** 70-80%
- **API calls saved:** 70-80%
- **Export time:** 70% faster
- **CSV size:** 70% smaller

### With All Filters Disabled

- **Export time:** Baseline
- **CSV size:** Full size (may be very large)
- **Use case:** Complete documentation

## FAQ

**Q: Can I export Share objects?**
A: Yes! Uncheck "Share objects" in advanced options.

**Q: Why can't I see ChangeEvent objects even with filter off?**
A: ChangeEvent objects may not appear in describe if CDC isn't enabled for that object.

**Q: Does this affect exports without User Permission Filter?**
A: No. System filtering only works when User Permission Filter is enabled.

**Q: I unchecked the main filter but individual filters are still checked?**
A: That's visual only. Unchecking main filter disables all filtering regardless of individual checkboxes.

**Q: Can I save my filter preferences?**
A: Not yet. Future version may add preference saving.

**Q: What if I need just one specific system object?**
A: Currently, you'd need to export all of that type. Future version may add more granular control.

## Examples

### Example 1: Default Settings

**Configuration:**
```
☑ Exclude system objects
  ☑ Share objects
  ☑ Feed objects
  ☑ History objects
  ☑ Change Events
  ☑ Platform Events
```

**Export includes:**
- Account, Contact, Lead, Opportunity
- Case, Task, Event
- Custom_Object__c
- User, Profile, Group

**Export excludes:**
- AccountShare, ContactShare (Share)
- AccountFeed, CaseFeed (Feed)
- AccountHistory, ContactHistory (History)
- AccountChangeEvent (ChangeEvent)
- Order_Event__e (Platform Event)

### Example 2: Include Share Objects

**Configuration:**
```
☑ Exclude system objects
  ☐ Share objects (disabled)
  ☑ Feed objects
  ☑ History objects
  ☑ Change Events
  ☑ Platform Events
```

**Export includes:**
- All business objects
- AccountShare, ContactShare, etc.

**Export excludes:**
- Feed, History, ChangeEvent, Platform Events

### Example 3: No System Filtering

**Configuration:**
```
☐ Exclude system objects
```

**Export includes:**
- Everything! All 500+ objects

**Use for:**
- Complete documentation
- Finding obscure objects
- Comprehensive analysis

## Conclusion

System object filtering gives you:
- ✓ Control over what's included
- ✓ Cleaner, focused exports
- ✓ Flexibility for different use cases
- ✓ Better performance

**Default settings work for 95% of use cases** - but now you have control when you need it!

---

**Version:** 1.2.0
**Feature:** System Object Filter Options
