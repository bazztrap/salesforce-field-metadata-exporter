// Background service worker for Salesforce Metadata Exporter
// Based on Salesforce Inspector Reloaded authentication approach

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Get Salesforce session from cookies
  if (request.message === 'getSession') {
    const sfHost = request.sfHost;
    const url = 'https://' + sfHost;

    // Get the sid cookie for this Salesforce host
    chrome.cookies.get({url: url, name: 'sid', storeId: sender.tab?.cookieStoreId}, sessionCookie => {
      if (!sessionCookie) {
        console.log('No sid cookie found for', sfHost);
        sendResponse(null);
        return;
      }

      console.log('Found session cookie for', sfHost);
      let session = {
        key: sessionCookie.value,
        hostname: sessionCookie.domain
      };
      sendResponse(session);
    });

    return true; // Tell Chrome that we want to call sendResponse asynchronously
  }

  // Get Salesforce host (handles visual.force.com mapping)
  if (request.message === 'getSfHost') {
    const currentDomain = new URL(request.url).hostname;

    // Get sid cookie to extract orgId
    chrome.cookies.get({url: request.url, name: 'sid', storeId: sender.tab?.cookieStoreId}, cookie => {
      if (!cookie || currentDomain.endsWith('.mcas.ms')) {
        sendResponse(currentDomain);
        return;
      }

      // Extract orgId from cookie (format: orgId!sessionId)
      const [orgId] = cookie.value.split('!');

      // Try domains in order
      const orderedDomains = ['salesforce.com', 'cloudforce.com', 'salesforce.mil', 'cloudforce.mil', 'force.com'];

      orderedDomains.forEach(domain => {
        chrome.cookies.getAll({name: 'sid', domain: domain, secure: true, storeId: sender.tab?.cookieStoreId}, cookies => {
          let sessionCookie = cookies.find(c => c.value.startsWith(orgId + '!'));
          if (sessionCookie) {
            sendResponse(sessionCookie.domain);
          }
        });
      });
    });

    return true; // Tell Chrome that we want to call sendResponse asynchronously
  }
});

// Handle installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Salesforce Metadata Exporter installed');
  } else if (details.reason === 'update') {
    console.log('Salesforce Metadata Exporter updated');
  }
});
