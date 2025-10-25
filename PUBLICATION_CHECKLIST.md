# Chrome Web Store Publication Checklist

Track your progress publishing Salesforce Field Metadata Exporter to Chrome Web Store.

---

## Pre-Publication Tasks

### Account Setup
- [ ] Create Google account (or use existing)
- [ ] Access Chrome Web Store Developer Dashboard
- [ ] Pay $5 one-time developer registration fee
- [ ] Confirm payment receipt

### Files Preparation
- [x] Extension package created: `salesforce-field-metadata-exporter-v1.3.0.zip` (23KB)
- [x] Store listing document: `CHROME_WEB_STORE_LISTING.md`
- [x] Publishing guide: `PUBLISHING_GUIDE.md`
- [x] Screenshot guide: `SCREENSHOT_GUIDE.md`
- [x] Privacy policy: `PRIVACY_POLICY.md`

### Screenshots (REQUIRED)
- [ ] Screenshot 1: Extension popup (main view) - 1280x800 or 640x400
- [ ] Screenshot 2: Export options/advanced settings (optional but recommended)
- [ ] Screenshot 3: Export progress (optional but recommended)
- [ ] Screenshot 4: CSV output in spreadsheet (optional but recommended)
- [ ] Screenshot 5: User permission filter (optional)

**Minimum requirement: 1 screenshot**
**Recommended: 3-5 screenshots**

---

## Chrome Web Store Submission

### Upload Extension
- [ ] Log in to Developer Dashboard: https://chrome.google.com/webstore/devconsole
- [ ] Click "New Item"
- [ ] Upload `salesforce-field-metadata-exporter-v1.3.0.zip`
- [ ] Wait for upload confirmation

### Store Listing Tab
- [ ] Product name: Salesforce Field Metadata Exporter
- [ ] Summary (132 char max): Copy from CHROME_WEB_STORE_LISTING.md
- [ ] Detailed description: Copy from CHROME_WEB_STORE_LISTING.md
- [ ] Category: Developer Tools
- [ ] Language: English
- [ ] Upload screenshots (minimum 1, max 5)
- [ ] Add screenshot captions
- [ ] Optional: Upload promotional tiles (440x280, 920x680, 1400x560)

### Privacy Tab
- [ ] Set data usage: "This item does not collect user data"
- [ ] Privacy policy URL: https://github.com/bazztrap/salesforce-field-metadata-exporter/blob/main/PRIVACY_POLICY.md
- [ ] Check certification boxes

### Permissions Tab
- [ ] Justify "cookies" permission (copy from CHROME_WEB_STORE_LISTING.md)
- [ ] Justify "activeTab" permission (copy from CHROME_WEB_STORE_LISTING.md)
- [ ] Justify host_permissions (copy from CHROME_WEB_STORE_LISTING.md)

### Distribution Tab
- [ ] Visibility: Public
- [ ] Regions: All regions (or select specific)
- [ ] Pricing: Free
- [ ] Single purpose description: Copy from CHROME_WEB_STORE_LISTING.md

### Final Review
- [ ] All tabs show green checkmarks
- [ ] Review summary page
- [ ] Click "Submit for review"
- [ ] Confirm submission
- [ ] Save confirmation email

---

## During Review

- [ ] Confirmation email received
- [ ] Status shows "Pending review" or "In review"
- [ ] Monitor Developer Dashboard for updates
- [ ] Monitor email for review results
- [ ] Prepare to address feedback if requested

**Expected review time: 1-3 business days**

---

## After Approval

### Immediate Tasks
- [ ] Verify extension shows as "Published" in dashboard
- [ ] Find extension in Chrome Web Store search
- [ ] Note down Extension ID from store URL
- [ ] Test installation from Chrome Web Store
- [ ] Verify all features work when installed from store

### Repository Updates
- [ ] Update README.md with Chrome Web Store link
- [ ] Add Chrome Web Store badges to README:
  - Version badge
  - Users badge
  - Rating badge
- [ ] Create GitHub release for v1.3.0 with store link
- [ ] Update PUBLISHING.md with actual publication date
- [ ] Commit and push changes

### Promotion (Optional)
- [ ] Share on Twitter/X
- [ ] Share on LinkedIn
- [ ] Post in Salesforce communities
- [ ] Share in relevant Slack/Discord channels
- [ ] Add to personal portfolio/website

### Monitoring
- [ ] Set up email notifications for reviews
- [ ] Check Chrome Web Store listing weekly
- [ ] Monitor user reviews and ratings
- [ ] Respond to user feedback
- [ ] Track installation metrics in Developer Dashboard

---

## Ongoing Maintenance

### Regular Tasks
- [ ] Respond to user reviews (within 48 hours)
- [ ] Monitor GitHub issues
- [ ] Track feature requests
- [ ] Plan future updates

### For Updates/New Versions
- [ ] Update version in manifest.json
- [ ] Create new ZIP package
- [ ] Upload to Developer Dashboard
- [ ] Update store listing if needed
- [ ] Submit for review
- [ ] Create GitHub release
- [ ] Update README with new version

---

## Quick Reference

**Files Location:**
```
/Users/rohanpoojary/salesforce-metadata-exporter/
├── salesforce-field-metadata-exporter-v1.3.0.zip  ← Upload this
├── CHROME_WEB_STORE_LISTING.md                    ← Copy from this
├── PUBLISHING_GUIDE.md                             ← Step-by-step guide
├── SCREENSHOT_GUIDE.md                             ← Screenshot help
├── PRIVACY_POLICY.md                               ← Privacy policy
└── PUBLICATION_CHECKLIST.md                        ← This file
```

**Important Links:**
- Developer Dashboard: https://chrome.google.com/webstore/devconsole
- Support: https://support.google.com/chrome_webstore/
- Policies: https://developer.chrome.com/docs/webstore/program-policies/

**Chrome Web Store Badge (after publication):**
```markdown
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/YOUR_EXTENSION_ID)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
```

---

## Troubleshooting

### Common Issues

**"Screenshots required"**
- Solution: Upload at least 1 screenshot (1280x800 or 640x400)
- See: SCREENSHOT_GUIDE.md

**"Privacy policy required"**
- Solution: Add privacy policy URL
- Use: https://github.com/bazztrap/salesforce-field-metadata-exporter/blob/main/PRIVACY_POLICY.md

**"Permission justification required"**
- Solution: Explain each permission
- Copy from: CHROME_WEB_STORE_LISTING.md → Permission Justification section

**Review taking too long**
- Normal: 1-3 business days
- If >7 days: Check dashboard for messages
- Contact: Chrome Web Store support

---

## Success Criteria

✅ Extension published and live on Chrome Web Store
✅ Can be found by searching "Salesforce Field Metadata Exporter"
✅ Installation works correctly from store
✅ All features function as expected
✅ Privacy policy accessible
✅ README updated with store link
✅ First 5-star review received! 🎉

---

## Notes

**Estimated timeline:**
- Preparation: 1-2 hours
- Review: 1-3 business days
- Post-publication: 30 minutes

**Total time to go live: 1-4 days**

---

**Last Updated:** October 24, 2024
**Extension Version:** 1.3.0
**Package:** salesforce-field-metadata-exporter-v1.3.0.zip

---

## Status Tracker

**Current Status:** ⏸️ Ready for submission

**Timeline:**
- [x] October 24, 2024: Package created
- [x] October 24, 2024: Documentation completed
- [ ] _________: Developer account created
- [ ] _________: Extension uploaded
- [ ] _________: Store listing completed
- [ ] _________: Submitted for review
- [ ] _________: Review approved
- [ ] _________: Published to Chrome Web Store
- [ ] _________: Repository updated with store link

---

Good luck with your publication! 🚀
