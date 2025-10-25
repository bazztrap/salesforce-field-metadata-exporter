# Chrome Web Store Publishing Guide

Complete step-by-step guide to publish Salesforce Field Metadata Exporter to Chrome Web Store.

---

## Prerequisites

### 1. Google Account
- You need a Google account to access Chrome Web Store Developer Dashboard
- Use an account you'll maintain long-term (for updates and support)

### 2. Developer Fee
- One-time $5 registration fee
- Payment via credit/debit card
- Fee is per developer account (not per extension)

### 3. Files Ready
✅ Extension package: `salesforce-field-metadata-exporter-v1.3.0.zip` (23KB)
✅ Store listing: `CHROME_WEB_STORE_LISTING.md`
✅ Privacy policy: `PRIVACY_POLICY.md`
✅ Icons: Already included in package

---

## Step-by-Step Publishing Process

### Step 1: Create Chrome Web Store Developer Account

1. Go to: https://chrome.google.com/webstore/devconsole
2. Sign in with your Google account
3. Accept Developer Agreement
4. Pay $5 one-time registration fee
5. Wait for payment confirmation (usually instant)

### Step 2: Upload Your Extension

1. Click **"New Item"** button
2. Click **"Choose file"** and select: `salesforce-field-metadata-exporter-v1.3.0.zip`
3. Click **"Upload"**
4. Wait for upload to complete
5. You'll be redirected to the listing page

### Step 3: Fill Store Listing Tab

Copy information from `CHROME_WEB_STORE_LISTING.md`:

**Product details:**
- Language: English
- Name: Salesforce Field Metadata Exporter
- Summary: Export Salesforce object and field metadata to CSV with user permission filtering and system object controls.
- Description: [Use detailed description from CHROME_WEB_STORE_LISTING.md]
- Category: Developer Tools
- Language: English (United States)

**Store listing:**
- Small promo tile (440x280): Optional - create if desired
- Large promo tile (920x680): Optional - create if desired
- Marquee promo tile (1400x560): Optional - create if desired
- Screenshots (1280x800 or 640x400): **REQUIRED - Need at least 1, up to 5**

### Step 4: Create Screenshots

**You MUST create at least 1 screenshot before you can publish.**

**Recommended approach:**

1. Install the extension locally in Chrome
2. Navigate to a Salesforce org
3. Click the extension icon
4. Take screenshots using:
   - Mac: Cmd+Shift+4
   - Windows: Windows+Shift+S
   - Chrome DevTools Device Mode for consistent sizing

**Screenshot Ideas:**

**Screenshot 1** (Required):
- Open extension popup showing all options
- Make sure UI looks clean
- Caption: "Export Salesforce metadata with one click"

**Screenshot 2** (Recommended):
- Export in progress with progress bar
- Caption: "Real-time progress tracking"

**Screenshot 3** (Recommended):
- CSV file opened in Excel/Google Sheets
- Show actual metadata columns
- Caption: "Comprehensive metadata export"

**Screenshot 4** (Optional):
- User permission filter enabled
- Caption: "Filter by user permissions for security audits"

**Screenshot 5** (Optional):
- System object filters expanded
- Caption: "Granular control over system objects"

**Resize screenshots to:**
- 1280x800 (16:10 ratio) - Recommended
- OR 640x400 (16:10 ratio)

Use any image editor or online tool like:
- https://www.resizepixel.com/
- https://imageresizer.com/
- Photoshop / GIMP / Preview (Mac)

### Step 5: Privacy Practices

**Privacy tab:**

1. **Data usage:**
   - Select: "This item does not collect user data"

2. **Certification:**
   - ✅ Check: "This extension complies with the Chrome Web Store policies"
   - ✅ Check: "This extension follows the acceptable use policy"

3. **Privacy policy:**
   - Privacy policy URL: `https://github.com/bazztrap/salesforce-field-metadata-exporter/blob/main/PRIVACY_POLICY.md`
   - Or host PRIVACY_POLICY.md on your own website if you have one

### Step 6: Permissions Justification

In the **Permissions tab**, you'll see the permissions your extension requests. You need to justify each one:

**cookies:**
```
Required to access the user's Salesforce session cookie (sid) for authenticating API requests to Salesforce. Without this permission, the extension cannot make authenticated calls to retrieve metadata from the Salesforce REST API.
```

**activeTab:**
```
Required to detect when the user is on a Salesforce page and to communicate between the popup and the content script that handles metadata export functionality.
```

**host_permissions (*.salesforce.com, etc.):**
```
Required to make API calls to various Salesforce domains (salesforce.com, force.com, cloudforce.com, visualforce.com, salesforce-setup.com) to retrieve object and field metadata via Salesforce REST API.
```

### Step 7: Distribution

**Distribution tab:**

1. **Visibility:** Public
2. **Regions:** All regions (or select specific countries)
3. **Pricing:** Free
4. **Single Purpose:**
   ```
   This extension exports Salesforce object and field metadata to CSV format with filtering options for security audits and documentation.
   ```

### Step 8: Submit for Review

1. Review all tabs for completeness:
   - ✅ Store listing (with screenshots)
   - ✅ Privacy practices
   - ✅ Permissions justifications
   - ✅ Distribution settings

2. Click **"Submit for review"** button

3. Confirm submission

4. You'll receive an email confirming submission

### Step 9: Wait for Review

**Timeline:**
- Initial review: 1-3 business days (typically)
- Updates: Usually faster (hours to 1 day)

**Review process:**
- Chrome Web Store team reviews your extension
- They check for policy compliance
- They may test basic functionality
- They verify privacy claims

**Possible outcomes:**
1. ✅ **Approved** - Extension goes live immediately
2. ⚠️ **Needs changes** - You'll receive feedback to address
3. ❌ **Rejected** - Policy violation (rare if following this guide)

### Step 10: Monitor Status

1. Check Developer Dashboard: https://chrome.google.com/webstore/devconsole
2. Check email for updates
3. Status shows as:
   - "Pending review" - Waiting for review
   - "In review" - Being reviewed
   - "Published" - Live on store!
   - "Needs action" - Changes required

---

## After Publication

### Update README

Add Chrome Web Store badge to README.md:

```markdown
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/YOUR_EXTENSION_ID)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/YOUR_EXTENSION_ID)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/YOUR_EXTENSION_ID)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
```

Replace `YOUR_EXTENSION_ID` with the actual ID from the Chrome Web Store URL.

### Monitor Reviews

- Check Chrome Web Store listing regularly
- Respond to user reviews (both positive and negative)
- Address issues reported by users
- Update extension based on feedback

### Handle Updates

When you release a new version:

1. Update `manifest.json` version number
2. Create new ZIP file
3. Upload to Developer Dashboard
4. Update store listing if needed (screenshots, description)
5. Submit for review
6. Updates typically approved faster than initial submission

---

## Troubleshooting

### "Screenshots Required"
- You must upload at least 1 screenshot
- Size must be 1280x800 or 640x400
- Format: PNG or JPEG

### "Privacy Policy Required"
- Add privacy policy URL
- Can use GitHub link: `https://github.com/bazztrap/salesforce-field-metadata-exporter/blob/main/PRIVACY_POLICY.md`

### "Permission Justification Required"
- Provide clear explanation for each permission
- Explain how it's used and why it's necessary
- Use justifications from Step 6 above

### "Manifest V2 Deprecated"
- Extension already uses Manifest V3 ✅
- No action needed

### "Description Too Short"
- Minimum 132 characters for detailed description
- Use description from CHROME_WEB_STORE_LISTING.md

### Review Takes Too Long
- Normal: 1-3 business days
- If > 7 days, check Developer Dashboard for messages
- Contact Chrome Web Store support if needed

---

## Quick Reference Checklist

Before submitting:

- [ ] Chrome Web Store Developer account created ($5 fee paid)
- [ ] Extension ZIP uploaded (salesforce-field-metadata-exporter-v1.3.0.zip)
- [ ] Store listing completed (name, description, category)
- [ ] At least 1 screenshot uploaded (1280x800 or 640x400)
- [ ] Privacy policy URL added
- [ ] Data usage set to "does not collect user data"
- [ ] All permissions justified
- [ ] Distribution set to Public
- [ ] Pricing set to Free
- [ ] Single purpose description added
- [ ] All tabs show green checkmarks
- [ ] "Submit for review" button clicked

After submission:

- [ ] Confirmation email received
- [ ] Status shows "Pending review" or "In review"
- [ ] Monitoring email for review results
- [ ] Prepared to address feedback if needed

After approval:

- [ ] Extension shows as "Published" in dashboard
- [ ] Can find extension in Chrome Web Store search
- [ ] README updated with store link
- [ ] GitHub release created with store link
- [ ] Monitoring reviews and ratings

---

## Support During Publication

If you encounter issues:

1. **Chrome Web Store Help:** https://support.google.com/chrome_webstore/
2. **Developer Forum:** https://groups.google.com/a/chromium.org/g/chromium-extensions
3. **GitHub Issues:** For extension-specific questions

---

## Important Links

- **Developer Dashboard:** https://chrome.google.com/webstore/devconsole
- **Extension Package:** `salesforce-field-metadata-exporter-v1.3.0.zip` (in current directory)
- **Store Listing Info:** `CHROME_WEB_STORE_LISTING.md` (in current directory)
- **Privacy Policy:** `PRIVACY_POLICY.md` (in current directory)
- **Chrome Web Store Policies:** https://developer.chrome.com/docs/webstore/program-policies/

---

## Timeline Estimate

| Step | Time Required |
|------|---------------|
| Create developer account | 5-10 minutes |
| Upload extension | 2 minutes |
| Fill store listing | 15-30 minutes |
| Create screenshots | 30-60 minutes |
| Complete privacy/permissions | 10-15 minutes |
| Submit for review | 2 minutes |
| **Initial review** | **1-3 business days** |
| Post-publication setup | 15 minutes |
| **Total active time:** | **~2 hours** |
| **Total with review:** | **1-3 days** |

---

Good luck with your Chrome Web Store publication! 🚀

Generated: October 24, 2024
Extension Version: 1.3.0
