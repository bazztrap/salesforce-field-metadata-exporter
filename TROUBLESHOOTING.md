# Troubleshooting Guide

Common issues and solutions for Salesforce Metadata Exporter.

## Error: 401 API call failed

**Symptom:** Extension shows "✗ Error: API call failed: 401"

**Causes and Solutions:**

### 1. Session Cookie Not Accessible

**Solution:**
1. Reload the extension:
   - Go to `chrome://extensions/`
   - Find "Salesforce Metadata Exporter"
   - Click the reload icon (circular arrow)
2. Refresh the Salesforce page (F5 or Cmd+R)
3. Try the export again

### 2. Not Logged Into Salesforce

**Solution:**
- Ensure you are logged into Salesforce
- You should see the Salesforce UI (home page, objects, etc.)
- If logged out, log back in and try again

### 3. API Access Control Enabled

Some Salesforce orgs have "API Access Control" enabled, which blocks cookie-based authentication.

**Solution:**
- Ask your Salesforce administrator to add your IP address to the "API Access Control" whitelist, OR
- Use a Connected App with OAuth (requires custom development)
- Alternative: Use Salesforce Inspector Reloaded which has OAuth support

### 4. Session Expired

**Solution:**
- Log out of Salesforce completely
- Log back in
- Refresh the page
- Try the export again

### 5. Wrong Salesforce Domain

**Solution:**
- Make sure you're on the correct Salesforce domain:
  - ✅ `yourorg.my.salesforce.com`
  - ✅ `yourorg.lightning.force.com`
  - ✅ `yourorg.cloudforce.com`
  - ✅ `cs123.salesforce.com`
  - ❌ NOT on login.salesforce.com
  - ❌ NOT on developer.salesforce.com documentation pages

## Error: Could not retrieve Salesforce session

**Symptom:** Extension shows "Could not retrieve Salesforce session"

**Solutions:**

1. **Verify Cookies Permission:**
   - Go to `chrome://extensions/`
   - Click on "Salesforce Metadata Exporter"
   - Scroll to "Permissions"
   - Ensure "Read and change your data on salesforce.com and force.com" is granted

2. **Check Cookie Settings:**
   - Go to `chrome://settings/cookies`
   - Ensure "Allow all cookies" or add Salesforce domains to allowed list
   - Don't block third-party cookies for Salesforce domains

3. **Disable Ad Blockers:**
   - Some ad blockers interfere with cookie access
   - Temporarily disable ad blockers for Salesforce domains
   - Try uBlock Origin instead of other ad blockers (more compatible)

4. **Clear Cache and Cookies:**
   ```
   - Right-click in Salesforce page
   - Click "Inspect" (or press F12)
   - Go to "Application" tab
   - Click "Clear storage"
   - Check "Cookies"
   - Click "Clear site data"
   - Close DevTools
   - Refresh page and log in again
   ```

## Error: Could not connect to Salesforce page

**Symptom:** Popup shows "Could not connect to Salesforce page. Please refresh the page and try again."

**Solutions:**

1. **Refresh the Page:**
   - Press F5 or Cmd+R to refresh
   - Wait for Salesforce to fully load
   - Try the export again

2. **Check Content Script Injection:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for "Salesforce Metadata Exporter: Content script loaded"
   - If not present, reload the extension

3. **Verify You're on a Salesforce Page:**
   - URL must contain `salesforce.com`, `force.com`, or similar
   - Not on login page
   - Not on help.salesforce.com

## Export Takes Too Long / Hangs

**Symptom:** Export starts but never completes

**Solutions:**

1. **Reduce Scope:**
   - Uncheck "Include Standard Objects" (only export custom objects)
   - This can reduce export time from 10+ minutes to under 1 minute

2. **Check API Limits:**
   - Your org may have hit API request limits
   - Wait a few minutes and try again
   - Check in Setup → System Overview → API Usage

3. **Large Org Warning:**
   - Orgs with 500+ standard objects may take 10-20 minutes
   - Progress bar should still be moving
   - Check browser console for errors (F12 → Console)

4. **Network Issues:**
   - Ensure stable internet connection
   - Try from a different network
   - Disable VPN temporarily

## Extension Not Showing Up

**Symptom:** Extension icon not visible in Chrome toolbar

**Solutions:**

1. **Pin the Extension:**
   - Click the puzzle piece icon in Chrome toolbar
   - Find "Salesforce Metadata Exporter"
   - Click the pin icon to pin it to toolbar

2. **Extension Not Installed:**
   - Go to `chrome://extensions/`
   - Look for "Salesforce Metadata Exporter"
   - If not present, reinstall the extension

3. **Check if Extension is Enabled:**
   - Go to `chrome://extensions/`
   - Make sure the toggle for the extension is ON (blue)

## CSV Download Fails

**Symptom:** Export completes but no CSV file downloads

**Solutions:**

1. **Check Download Settings:**
   - Go to `chrome://settings/downloads`
   - Ensure "Ask where to save each file before downloading" is configured as desired
   - Check your default download location

2. **Check Downloads:**
   - Press Ctrl+J (or Cmd+J on Mac)
   - Look for recent downloads
   - File may have already downloaded

3. **Browser Blocking Downloads:**
   - Chrome may have blocked the download
   - Look for a download icon in address bar
   - Click it to allow download

## Debugging Tips

### Enable Verbose Logging

1. Open DevTools (F12) before using the extension
2. Go to Console tab
3. Check "Preserve log"
4. Look for messages starting with "Salesforce Metadata Exporter"

### Check Background Script Logs

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Find "Salesforce Metadata Exporter"
4. Click "Inspect views: service worker"
5. Check the console for errors

### Test API Access Manually

1. Open DevTools (F12) on Salesforce page
2. Go to Console tab
3. Run this test:
   ```javascript
   fetch('/services/data/v60.0/sobjects/', {
     headers: { 'Authorization': 'Bearer YOUR_SESSION_ID' }
   }).then(r => r.json()).then(console.log);
   ```
4. If this fails, there's a fundamental API access issue

## Still Having Issues?

### Gather Information

Before seeking help, gather:
- Chrome version (`chrome://version/`)
- Extension version (from `chrome://extensions/`)
- Salesforce org type (Production, Sandbox, Developer)
- Exact error message
- Browser console logs (DevTools → Console)
- Background script logs (from service worker inspector)

### Alternative Solutions

If the extension won't work:

1. **Use Salesforce Inspector Reloaded:**
   - More mature extension
   - Better authentication handling
   - OAuth support
   - https://github.com/tprouvot/Salesforce-Inspector-reloaded

2. **Use Salesforce Workbench:**
   - Official tool from Salesforce
   - https://workbench.developerforce.com/
   - Can export metadata via REST API

3. **Use Salesforce CLI:**
   ```bash
   sfdx force:schema:sobject:list
   sfdx force:schema:sobject:describe -s Account
   ```

4. **Use Postman or cURL:**
   - Manually call Salesforce REST APIs
   - More control but requires setup

## Getting Help

- Check this troubleshooting guide first
- Review the main README.md
- Check Chrome extension error logs
- Search for similar issues online
- File an issue with detailed logs

## Prevention Tips

- Keep Chrome up to date
- Reload extension after Chrome updates
- Log out and back into Salesforce if session expires
- Use stable internet connection
- Start with small exports (custom objects only) to test
