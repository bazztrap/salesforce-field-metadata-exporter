// Check if we're on a Salesforce page
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  const url = currentTab?.url || '';

  const isSalesforcePage = url.includes('salesforce.com') ||
                           url.includes('force.com') ||
                           url.includes('cloudforce.com') ||
                           url.includes('visualforce.com');

  if (!isSalesforcePage) {
    document.getElementById('notSalesforce').style.display = 'block';
  } else {
    document.getElementById('mainContent').style.display = 'block';

    // Setup user filter toggle
    const filterByUserCheckbox = document.getElementById('filterByUser');
    const userFilterOptions = document.getElementById('userFilterOptions');

    filterByUserCheckbox.addEventListener('change', (e) => {
      userFilterOptions.style.display = e.target.checked ? 'block' : 'none';
    });

    // Setup system object details toggle
    const toggleSystemDetails = document.getElementById('toggleSystemDetails');
    const systemObjectDetails = document.getElementById('systemObjectDetails');

    toggleSystemDetails.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = systemObjectDetails.style.display === 'none';
      systemObjectDetails.style.display = isHidden ? 'block' : 'none';
      toggleSystemDetails.textContent = isHidden ? 'Hide advanced options' : 'Show advanced options';
    });

    // Auto-check/uncheck individual filters when main filter changes
    const filterSystemObjects = document.getElementById('filterSystemObjects');
    const individualFilters = [
      'filterShareObjects',
      'filterFeedObjects',
      'filterHistoryObjects',
      'filterChangeEvents',
      'filterPlatformEvents'
    ];

    filterSystemObjects.addEventListener('change', (e) => {
      individualFilters.forEach(id => {
        document.getElementById(id).checked = e.target.checked;
      });
    });
  }
});

// Export button handler
document.getElementById('exportBtn').addEventListener('click', async () => {
  const exportBtn = document.getElementById('exportBtn');
  const statusDiv = document.getElementById('status');
  const statusText = document.getElementById('statusText');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const stats = document.getElementById('stats');
  const statsText = document.getElementById('statsText');

  // Get user preferences
  const filterByUser = document.getElementById('filterByUser').checked;

  const options = {
    includeStandard: document.getElementById('includeStandard').checked,
    includeCustom: document.getElementById('includeCustom').checked,
    apiType: document.querySelector('input[name="apiType"]:checked').value,
    includeAttributes: document.getElementById('includeAttributes').checked,
    includeRelationships: document.getElementById('includeRelationships').checked,
    includePicklist: document.getElementById('includePicklist').checked,
    filterByUser: filterByUser,
    username: document.getElementById('username').value.trim(),
    // System filters work independently of user filtering
    systemObjectFilters: {
      enabled: document.getElementById('filterSystemObjects').checked,
      filterShare: document.getElementById('filterShareObjects').checked,
      filterFeed: document.getElementById('filterFeedObjects').checked,
      filterHistory: document.getElementById('filterHistoryObjects').checked,
      filterChangeEvents: document.getElementById('filterChangeEvents').checked,
      filterPlatformEvents: document.getElementById('filterPlatformEvents').checked
    }
  };

  // Validate selection
  if (!options.includeStandard && !options.includeCustom) {
    alert('Please select at least one object type (Standard or Custom)');
    return;
  }

  // Validate username if filtering by user
  if (options.filterByUser && !options.username) {
    alert('Please enter a username to filter by user permissions');
    return;
  }

  // Disable button and show status
  exportBtn.disabled = true;
  exportBtn.textContent = 'Exporting...';
  statusDiv.style.display = 'block';
  statusText.innerHTML = '<span class="spinner"></span> Initializing export...';
  progressBar.style.display = 'block';
  progressFill.style.width = '0%';
  stats.style.display = 'none';

  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send message to content script to start export
    chrome.tabs.sendMessage(tab.id, { action: 'startExport', options }, (response) => {
      if (chrome.runtime.lastError) {
        statusText.innerHTML = `
          <strong>Error: Could not connect to Salesforce page</strong><br>
          <small>Please refresh the page and try again.<br>
          If the problem persists, reload the extension at chrome://extensions/</small>
        `;
        exportBtn.disabled = false;
        exportBtn.textContent = 'Export All Metadata';
        progressBar.style.display = 'none';
        return;
      }
    });

    // Listen for progress updates
    chrome.runtime.onMessage.addListener(function progressListener(message) {
      if (message.action === 'exportProgress') {
        statusText.innerHTML = `<span class="spinner"></span> ${message.text}`;
        if (message.progress !== undefined) {
          progressFill.style.width = `${message.progress}%`;
        }
        if (message.stats) {
          stats.style.display = 'block';
          statsText.textContent = `Objects: ${message.stats.objects} | Fields: ${message.stats.fields}`;
        }
      } else if (message.action === 'exportComplete') {
        let completionMsg = `✓ Export completed! ${message.stats.objects} objects, ${message.stats.fields} fields exported.`;

        // Build detailed filtering message
        let filterDetails = [];
        if (message.stats.filteredSystemObjects > 0) {
          filterDetails.push(`${message.stats.filteredSystemObjects} system objects`);
        }
        if (message.stats.filteredByPermissions > 0) {
          filterDetails.push(`${message.stats.filteredByPermissions} objects without access`);
        }
        if (message.stats.filteredFields > 0) {
          filterDetails.push(`${message.stats.filteredFields} fields without access`);
        }

        if (filterDetails.length > 0) {
          completionMsg += `\nFiltered out: ${filterDetails.join(', ')}`;
        }

        statusText.textContent = completionMsg;
        statusText.style.whiteSpace = 'pre-line'; // Allow line breaks
        progressBar.style.display = 'none';
        stats.style.display = 'block';
        statsText.textContent = `Download started: ${message.filename}`;
        exportBtn.disabled = false;
        exportBtn.textContent = 'Export All Metadata';

        chrome.runtime.onMessage.removeListener(progressListener);
      } else if (message.action === 'exportError') {
        let errorMsg = message.error;
        let helpText = '';

        // Provide helpful hints based on error type
        if (errorMsg.includes('401')) {
          helpText = '<br><small>This is an authentication error. Try:<br>' +
                     '1. Refresh this page<br>' +
                     '2. Log out and back into Salesforce<br>' +
                     '3. Reload the extension at chrome://extensions/<br>' +
                     '<a href="https://github.com/yourusername/salesforce-metadata-exporter/blob/main/TROUBLESHOOTING.md" target="_blank">See detailed troubleshooting</a></small>';
        } else if (errorMsg.includes('session')) {
          helpText = '<br><small>Could not find Salesforce session. Try:<br>' +
                     '1. Make sure you\'re logged into Salesforce<br>' +
                     '2. Refresh this page<br>' +
                     '3. Clear cookies and log in again</small>';
        }

        statusText.innerHTML = `✗ Error: ${errorMsg}${helpText}`;
        progressBar.style.display = 'none';
        exportBtn.disabled = false;
        exportBtn.textContent = 'Export All Metadata';

        chrome.runtime.onMessage.removeListener(progressListener);
      }
    });

  } catch (error) {
    statusText.textContent = `✗ Error: ${error.message}`;
    progressBar.style.display = 'none';
    exportBtn.disabled = false;
    exportBtn.textContent = 'Export All Metadata';
  }
});
