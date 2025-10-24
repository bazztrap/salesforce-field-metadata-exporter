# Quick Start Guide

Get the Salesforce Metadata Exporter up and running in 5 minutes!

## Step 1: Load the Extension (2 minutes)

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Toggle **Developer mode** ON (top-right corner)
4. Click **Load unpacked**
5. Navigate to and select the `salesforce-metadata-exporter` folder
6. Done! The extension is now installed

## Step 2: Test It Out (3 minutes)

1. **Open a Salesforce org**
   - Navigate to any Salesforce instance (login.salesforce.com or your custom domain)
   - Make sure you're logged in

2. **Open the extension**
   - Click the extension icon in your Chrome toolbar
   - You should see the Salesforce Metadata Exporter popup

3. **Export metadata**
   - Leave the default options selected
   - Click **Export All Metadata**
   - Watch the progress bar
   - A CSV file will download automatically when complete

4. **Review your data**
   - Open the downloaded CSV file
   - You'll see all objects and fields from your Salesforce org!

## That's It!

You're now ready to use the Salesforce Metadata Exporter.

## Tips

- **For large orgs**: The export may take 5-10 minutes
- **To export faster**: Uncheck "Include Standard Objects" to only get custom objects
- **Tooling API**: Use this option to get metadata-specific objects
- **Can't see the icon?**: Click the puzzle piece icon in Chrome toolbar and pin the extension

## Troubleshooting

### Extension won't load
- Make sure all files are in the folder
- Check that icon PNG files exist in the `icons/` folder
- Look for errors in the Chrome extensions page

### Can't connect to Salesforce
- Refresh the Salesforce page
- Make sure you're logged in
- Check that the URL contains "salesforce.com" or "force.com"

### Export fails
- Check your API permissions in Salesforce
- Try a smaller export (uncheck Standard Objects)
- Look at the browser console (F12) for error messages

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [PRIVACY_POLICY.md](PRIVACY_POLICY.md) to understand data handling
- Customize the export options for your needs
- Share with your team!

## Need Help?

- Check browser console for errors (F12 → Console tab)
- Review Salesforce API permissions
- Ensure you have API access enabled in your Salesforce org

---

Happy exporting!
