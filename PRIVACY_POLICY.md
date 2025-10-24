# Privacy Policy for Salesforce Metadata Exporter

**Effective Date**: [Insert Date]

## Overview

Salesforce Metadata Exporter ("the Extension") is committed to protecting your privacy. This privacy policy explains how the Extension handles data.

## Data Collection

The Extension does NOT collect, store, or transmit any personal data or information to external servers.

### What the Extension Does:
- Reads your Salesforce session from browser cookies to authenticate API requests
- Retrieves object and field metadata from your Salesforce org via Salesforce APIs
- Generates CSV files locally in your browser
- All data processing happens entirely within your browser

### What the Extension Does NOT Do:
- Does NOT collect personal information
- Does NOT store your Salesforce credentials
- Does NOT send data to third-party servers
- Does NOT track your usage or behavior
- Does NOT use analytics or tracking tools
- Does NOT share data with anyone

## Permissions

The Extension requires the following permissions:

### Cookies Permission
- **Purpose**: To read the Salesforce session cookie that authenticates you with Salesforce APIs
- **Scope**: Only Salesforce domains (*.salesforce.com, *.force.com, etc.)
- **Usage**: The session cookie is read locally and used only for API authentication during your active browser session

### Active Tab Permission
- **Purpose**: To detect when you're on a Salesforce page and to inject content scripts
- **Scope**: Only when you click the extension icon
- **Usage**: Allows the extension to interact with the current Salesforce page

### Host Permissions (Salesforce Domains)
- **Purpose**: To make API calls to Salesforce to retrieve metadata
- **Scope**: Only official Salesforce domains
- **Usage**: Enables the extension to call Salesforce REST APIs using your existing session

## Data Storage

The Extension stores minimal configuration data locally:
- User preferences (checkbox selections for export options)
- This data is stored in Chrome's local storage and never leaves your device

## Data Security

- All API calls are made directly from your browser to Salesforce using HTTPS
- No intermediary servers are involved
- Your Salesforce session is handled securely through browser APIs
- Downloaded CSV files are saved locally to your device

## Third-Party Access

The Extension does not integrate with or share data with any third-party services.

## Children's Privacy

The Extension does not knowingly collect information from children under 13. The Extension is designed for Salesforce administrators and developers.

## Changes to This Privacy Policy

We may update this privacy policy from time to time. Any changes will be posted in the Chrome Web Store listing and within the extension's update notes.

## Your Consent

By using the Extension, you consent to this privacy policy.

## Contact

For questions about this privacy policy or the Extension's data practices:
- Review the source code (open source)
- Contact: [Your contact information]

## Open Source

The Extension is open source. You can review the complete source code to verify these privacy claims:
- [Link to source code repository]

---

**Summary**: This extension operates entirely locally in your browser, does not collect or transmit your data, and only uses Salesforce APIs to retrieve metadata that you explicitly request to export.
