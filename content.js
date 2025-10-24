// Content script for Salesforce Metadata Exporter
// Runs in the context of Salesforce pages

class SalesforceMetadataExporter {
  constructor() {
    this.sessionId = null;
    this.instanceUrl = null;
    this.apiVersion = '60.0'; // Using a stable API version
  }

  // Initialize and get session (based on Salesforce Inspector approach)
  async initialize() {
    console.log('Initializing Salesforce Metadata Exporter...');

    // Get the Salesforce host domain
    const sfHost = await this.getSalesforceHost();
    if (!sfHost) {
      throw new Error('Could not determine Salesforce host. Please ensure you are on a Salesforce page.');
    }

    console.log('Salesforce host:', sfHost);
    this.instanceUrl = 'https://' + sfHost;

    // Get session from cookies via background script
    const session = await this.getSession(sfHost);
    if (!session || !session.key) {
      throw new Error('Could not retrieve Salesforce session. Please ensure you are logged in and refresh the page.');
    }

    this.sessionId = session.key;
    console.log('Session retrieved successfully');

    return true;
  }

  // Get Salesforce host (handles visual.force.com mapping to salesforce.com)
  getSalesforceHost() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { message: 'getSfHost', url: window.location.href },
        (response) => {
          resolve(response);
        }
      );
    });
  }

  // Get Salesforce session from cookies via background script
  getSession(sfHost) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { message: 'getSession', sfHost: sfHost },
        (response) => {
          resolve(response);
        }
      );
    });
  }

  // Make Salesforce REST API call
  async callSalesforceAPI(endpoint) {
    const url = `${this.instanceUrl}${endpoint}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.sessionId}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Send progress update to popup
  sendProgress(text, progress, stats) {
    chrome.runtime.sendMessage({
      action: 'exportProgress',
      text,
      progress,
      stats
    });
  }

  // Send completion message
  sendComplete(stats, filename) {
    chrome.runtime.sendMessage({
      action: 'exportComplete',
      stats,
      filename
    });
  }

  // Send error message
  sendError(error) {
    chrome.runtime.sendMessage({
      action: 'exportError',
      error: error.message || String(error)
    });
  }

  // Get user permissions (Profile + Permission Sets)
  async getUserPermissions(username) {
    this.sendProgress(`Looking up user: ${username}...`, 3);

    // Query the User
    const userQuery = `SELECT Id, ProfileId, Profile.Name, Username FROM User WHERE Username = '${username}' LIMIT 1`;
    const userResult = await this.callSalesforceAPI(`/services/data/v${this.apiVersion}/query/?q=${encodeURIComponent(userQuery)}`);

    if (!userResult.records || userResult.records.length === 0) {
      throw new Error(`User not found: ${username}`);
    }

    const user = userResult.records[0];
    console.log('Found user:', user);

    this.sendProgress(`Found user: ${user.Profile.Name}. Fetching permissions...`, 5);

    // Get Permission Set Assignments for this user
    const psaQuery = `SELECT PermissionSetId, PermissionSet.Name FROM PermissionSetAssignment WHERE AssigneeId = '${user.Id}'`;
    const psaResult = await this.callSalesforceAPI(`/services/data/v${this.apiVersion}/query/?q=${encodeURIComponent(psaQuery)}`);

    const permissionSetIds = psaResult.records.map(psa => psa.PermissionSetId);
    console.log('Permission Set IDs:', permissionSetIds);

    // Get PermissionSet for the Profile (Profiles are also PermissionSets)
    const profilePsQuery = `SELECT Id FROM PermissionSet WHERE ProfileId = '${user.ProfileId}'`;
    const profilePsResult = await this.callSalesforceAPI(`/services/data/v${this.apiVersion}/query/?q=${encodeURIComponent(profilePsQuery)}`);

    if (profilePsResult.records.length > 0) {
      permissionSetIds.push(profilePsResult.records[0].Id);
    }

    console.log('All Permission Set IDs (including Profile):', permissionSetIds);

    this.sendProgress('Querying object permissions...', 7);

    // Query ObjectPermissions for all PermissionSets
    const objectPermissions = await this.getObjectPermissions(permissionSetIds);
    const fieldPermissions = await this.getFieldPermissions(permissionSetIds);

    return {
      user,
      objectPermissions,
      fieldPermissions
    };
  }

  // Get Object Permissions
  async getObjectPermissions(permissionSetIds) {
    if (permissionSetIds.length === 0) {
      console.warn('No permission set IDs provided');
      return {};
    }

    console.log(`Querying ObjectPermissions for ${permissionSetIds.length} permission sets...`);
    const chunks = this.chunkArray(permissionSetIds, 50); // Query in chunks to avoid URL length limits
    const allPermissions = {};
    let totalPermissionsFound = 0;

    for (const chunk of chunks) {
      const ids = chunk.map(id => `'${id}'`).join(',');
      const query = `SELECT SObjectType, PermissionsRead, PermissionsCreate, PermissionsEdit, PermissionsDelete, PermissionsViewAllRecords, PermissionsModifyAllRecords
                     FROM ObjectPermissions
                     WHERE ParentId IN (${ids})`;

      console.log(`Querying ObjectPermissions: ${query.substring(0, 100)}...`);
      const result = await this.callSalesforceAPI(`/services/data/v${this.apiVersion}/query/?q=${encodeURIComponent(query)}`);

      console.log(`Found ${result.records.length} ObjectPermissions records`);
      totalPermissionsFound += result.records.length;

      for (const perm of result.records) {
        const objName = perm.SObjectType;
        if (!allPermissions[objName]) {
          allPermissions[objName] = {
            read: false,
            create: false,
            edit: false,
            delete: false,
            viewAll: false,
            modifyAll: false
          };
        }

        // Aggregate permissions (if any permission set grants it, user has it)
        allPermissions[objName].read = allPermissions[objName].read || perm.PermissionsRead;
        allPermissions[objName].create = allPermissions[objName].create || perm.PermissionsCreate;
        allPermissions[objName].edit = allPermissions[objName].edit || perm.PermissionsEdit;
        allPermissions[objName].delete = allPermissions[objName].delete || perm.PermissionsDelete;
        allPermissions[objName].viewAll = allPermissions[objName].viewAll || perm.PermissionsViewAllRecords;
        allPermissions[objName].modifyAll = allPermissions[objName].modifyAll || perm.PermissionsModifyAllRecords;
      }
    }

    console.log(`Total ObjectPermissions found: ${totalPermissionsFound}`);
    console.log(`Total unique objects with permissions: ${Object.keys(allPermissions).length}`);

    // Log a few examples
    const exampleObjects = Object.keys(allPermissions).slice(0, 5);
    exampleObjects.forEach(objName => {
      console.log(`  ${objName}: read=${allPermissions[objName].read}, create=${allPermissions[objName].create}`);
    });

    return allPermissions;
  }

  // Get Field Permissions
  async getFieldPermissions(permissionSetIds) {
    if (permissionSetIds.length === 0) return {};

    const chunks = this.chunkArray(permissionSetIds, 50);
    const allPermissions = {};

    for (const chunk of chunks) {
      const ids = chunk.map(id => `'${id}'`).join(',');
      const query = `SELECT SObjectType, Field, PermissionsRead, PermissionsEdit
                     FROM FieldPermissions
                     WHERE ParentId IN (${ids})`;

      const result = await this.callSalesforceAPI(`/services/data/v${this.apiVersion}/query/?q=${encodeURIComponent(query)}`);

      for (const perm of result.records) {
        const key = `${perm.SObjectType}.${perm.Field}`;
        if (!allPermissions[key]) {
          allPermissions[key] = {
            read: false,
            edit: false
          };
        }

        allPermissions[key].read = allPermissions[key].read || perm.PermissionsRead;
        allPermissions[key].edit = allPermissions[key].edit || perm.PermissionsEdit;
      }
    }

    return allPermissions;
  }

  // Helper to chunk arrays
  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  // Main export function
  async exportMetadata(options) {
    try {
      await this.initialize();

      // If filtering by user, get their permissions first
      let userPermissions = null;
      if (options.filterByUser && options.username) {
        userPermissions = await this.getUserPermissions(options.username);
        this.sendProgress(`Permissions loaded for ${options.username}. Fetching objects...`, 10);
      } else {
        this.sendProgress('Fetching all objects...', 5);
      }

      // Get all objects
      const apiPath = options.apiType === 'tooling' ? 'tooling/' : '';
      const describeUrl = `/services/data/v${this.apiVersion}/${apiPath}sobjects/`;
      const describeResult = await this.callSalesforceAPI(describeUrl);

      let allObjects = describeResult.sobjects;

      // Helper function to check if object should be excluded based on user preferences
      const isSystemObject = (objName, filters) => {
        // If system object filtering is disabled, don't filter anything
        if (!filters.enabled) {
          return false;
        }

        // Check Share objects
        if (filters.filterShare) {
          if (objName.endsWith('Share') || objName.endsWith('__Share')) {
            return true;
          }
        }

        // Check Feed objects
        if (filters.filterFeed) {
          if (objName.endsWith('Feed') || objName.endsWith('__Feed')) {
            return true;
          }
          // Additional feed-related objects
          if (['FeedItem', 'FeedComment', 'FeedTrackedChange'].includes(objName)) {
            return true;
          }
        }

        // Check History objects
        if (filters.filterHistory) {
          if (objName.endsWith('History') || objName.endsWith('__History')) {
            return true;
          }
          if (['ActivityHistory', 'OpenActivity'].includes(objName)) {
            return true;
          }
        }

        // Check Change Events
        if (filters.filterChangeEvents) {
          if (objName.endsWith('ChangeEvent') || objName.endsWith('__ChangeEvent')) {
            return true;
          }
        }

        // Check Platform Events
        if (filters.filterPlatformEvents) {
          if (objName.endsWith('__e')) {
            return true;
          }
        }

        // Additional system objects always filtered when any filter is enabled
        if (filters.enabled) {
          const systemPrefixes = ['Dashboard', 'Report', 'Folder'];
          for (const prefix of systemPrefixes) {
            if (objName.startsWith(prefix)) {
              return true;
            }
          }

          const alwaysExclude = [
            'CombinedAttachment',
            'ContentDocumentLink',
            'AttachedContentDocument',
            'NoteAndAttachment',
            'UserRecordAccess',
            'RecentlyViewed',
            'ProcessInstance',
            'ProcessInstanceHistory',
            'ProcessInstanceStep',
            'ProcessInstanceWorkitem',
          ];

          return alwaysExclude.includes(objName);
        }

        return false;
      };

      // Track filtering statistics
      let filteredSystemObjects = 0;
      let filteredByPermissions = 0;

      // Filter out system objects based on user preferences
      // System filtering works independently of user permission filtering
      if (options.systemObjectFilters && options.systemObjectFilters.enabled) {
        console.log('Applying system object filters...');
        const beforeSystemFilter = allObjects.length;
        allObjects = allObjects.filter(obj => {
          const isSystem = isSystemObject(obj.name, options.systemObjectFilters);
          if (isSystem) {
            console.log(`Excluding system object: ${obj.name}`);
          }
          return !isSystem;
        });
        filteredSystemObjects = beforeSystemFilter - allObjects.length;

        if (filteredSystemObjects > 0) {
          const filterTypes = [];
          if (options.systemObjectFilters.filterShare) filterTypes.push('Share');
          if (options.systemObjectFilters.filterFeed) filterTypes.push('Feed');
          if (options.systemObjectFilters.filterHistory) filterTypes.push('History');
          if (options.systemObjectFilters.filterChangeEvents) filterTypes.push('ChangeEvent');
          if (options.systemObjectFilters.filterPlatformEvents) filterTypes.push('Platform Events');

          console.log(`Filtered out ${filteredSystemObjects} system objects (${filterTypes.join(', ')})`);
        }
      } else {
        console.log('System object filtering disabled or not applicable');
      }

      // Filter objects based on user selection
      if (!options.includeStandard || !options.includeCustom) {
        allObjects = allObjects.filter(obj => {
          const isCustom = obj.custom;
          return (options.includeCustom && isCustom) || (options.includeStandard && !isCustom);
        });
      }

      // Filter objects based on user permissions
      if (userPermissions) {
        console.log(`Filtering objects based on permissions for ${options.username}...`);
        const beforePermFilter = allObjects.length;
        console.log(`Objects before permission filter: ${beforePermFilter}`);

        allObjects = allObjects.filter(obj => {
          const objPerms = userPermissions.objectPermissions[obj.name];

          // IMPORTANT: Only include if we found permissions AND user has read access
          // If no permissions found, exclude (safer for permission filtering)
          if (!objPerms) {
            console.log(`No permissions found for ${obj.name}, excluding`);
            return false;
          }

          if (!objPerms.read) {
            console.log(`User has no read access to ${obj.name}, excluding`);
            return false;
          }

          console.log(`User has read access to ${obj.name}, including`);
          return true;
        });

        filteredByPermissions = beforePermFilter - allObjects.length;
        console.log(`Filtered out ${filteredByPermissions} objects without read permission`);
        console.log(`Final object count for ${options.username}: ${allObjects.length} objects`);

        if (allObjects.length === 0) {
          console.warn('WARNING: No objects remaining after permission filter! This might indicate an issue.');
          console.warn('Check if ObjectPermissions were retrieved correctly.');
        }
      }

      const totalObjects = allObjects.length;
      this.sendProgress(`Found ${totalObjects} objects. Fetching field details...`, 10, {
        objects: totalObjects,
        fields: 0
      });

      // Fetch field details for each object
      const allFieldsData = [];
      let totalFields = 0;
      let filteredFields = 0;

      for (let i = 0; i < allObjects.length; i++) {
        const object = allObjects[i];
        const progressPercent = 10 + Math.round((i / totalObjects) * 80);

        this.sendProgress(
          `Processing ${i + 1} of ${totalObjects}: ${object.name}`,
          progressPercent,
          { objects: totalObjects, fields: totalFields }
        );

        try {
          const objectDescribeUrl = `/services/data/v${this.apiVersion}/${apiPath}sobjects/${object.name}/describe/`;
          const objectDescribe = await this.callSalesforceAPI(objectDescribeUrl);

          // Get object-level permissions
          const objPerms = userPermissions ? userPermissions.objectPermissions[object.name] : null;

          // Process each field
          for (const field of objectDescribe.fields) {
            totalFields++;

            // Check field-level permissions if filtering by user
            if (userPermissions) {
              const fieldKey = `${object.name}.${field.name}`;
              const fieldPerms = userPermissions.fieldPermissions[fieldKey];

              // Skip field if user doesn't have read access
              // Note: Fields without explicit field permissions inherit object read permission
              if (fieldPerms && !fieldPerms.read) {
                filteredFields++;
                continue;
              }
            }

            const fieldData = {
              ObjectName: object.name,
              ObjectLabel: object.label,
              IsCustomObject: object.custom ? 'Yes' : 'No',
              FieldName: field.name,
              FieldLabel: field.label,
              Type: field.type,
              Length: field.length || '',
              Precision: field.precision || '',
              Scale: field.scale || ''
            };

            if (options.includeAttributes) {
              fieldData.Required = field.nillable === false && field.defaultedOnCreate === false ? 'Yes' : 'No';
              fieldData.Unique = field.unique ? 'Yes' : 'No';
              fieldData.ExternalId = field.externalId ? 'Yes' : 'No';
              fieldData.Createable = field.createable ? 'Yes' : 'No';
              fieldData.Updateable = field.updateable ? 'Yes' : 'No';
              fieldData.Filterable = field.filterable ? 'Yes' : 'No';
              fieldData.Sortable = field.sortable ? 'Yes' : 'No';
              fieldData.Calculated = field.calculated ? 'Yes' : 'No';
              fieldData.DefaultValue = field.defaultValue || '';
            }

            if (options.includeRelationships) {
              fieldData.ReferenceTo = field.referenceTo ? field.referenceTo.join(', ') : '';
              fieldData.RelationshipName = field.relationshipName || '';
              fieldData.CascadeDelete = field.cascadeDelete ? 'Yes' : 'No';
            }

            if (options.includePicklist && (field.type === 'picklist' || field.type === 'multipicklist')) {
              const picklistValues = field.picklistValues
                ? field.picklistValues.map(pv => pv.value).join('; ')
                : '';
              fieldData.PicklistValues = picklistValues;
              fieldData.RestrictedPicklist = field.restrictedPicklist ? 'Yes' : 'No';
            }

            // Add user permission info if filtering by user
            if (userPermissions) {
              const fieldKey = `${object.name}.${field.name}`;
              const fieldPerms = userPermissions.fieldPermissions[fieldKey];

              fieldData.UserCanRead = fieldPerms ? (fieldPerms.read ? 'Yes' : 'No') : (objPerms?.read ? 'Yes' : 'No');
              fieldData.UserCanEdit = fieldPerms ? (fieldPerms.edit ? 'Yes' : 'No') : (objPerms?.edit ? 'Yes' : 'No');

              // Add object-level permissions (only add once per object, but we'll add for each field)
              if (!fieldData.ObjectPermissionsAdded) {
                fieldData.ObjRead = objPerms?.read ? 'Yes' : 'No';
                fieldData.ObjCreate = objPerms?.create ? 'Yes' : 'No';
                fieldData.ObjEdit = objPerms?.edit ? 'Yes' : 'No';
                fieldData.ObjDelete = objPerms?.delete ? 'Yes' : 'No';
                fieldData.ObjViewAll = objPerms?.viewAll ? 'Yes' : 'No';
                fieldData.ObjModifyAll = objPerms?.modifyAll ? 'Yes' : 'No';
                fieldData.FilteredForUser = userPermissions.user.Username;
              }
            }

            allFieldsData.push(fieldData);
          }

        } catch (error) {
          console.error(`Error describing object ${object.name}:`, error);
          // Continue with next object
        }
      }

      this.sendProgress('Generating CSV file...', 95, {
        objects: totalObjects,
        fields: allFieldsData.length
      });

      // Generate CSV
      const csv = this.generateCSV(allFieldsData);

      // Download CSV with username in filename if filtered
      let filename = `salesforce_metadata_${new Date().toISOString().split('T')[0]}`;
      if (userPermissions) {
        const usernameShort = options.username.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_');
        filename += `_${usernameShort}`;
      }
      filename += '.csv';

      this.downloadCSV(csv, filename);

      // Log filtering stats
      if (userPermissions && filteredFields > 0) {
        console.log(`Filtered ${filteredFields} fields without read access`);
      }

      this.sendComplete({
        objects: totalObjects,
        fields: allFieldsData.length,
        filteredFields: filteredFields,
        filteredSystemObjects: filteredSystemObjects,
        filteredByPermissions: filteredByPermissions
      }, filename);

    } catch (error) {
      console.error('Export error:', error);
      this.sendError(error);
    }
  }

  // Generate CSV from data
  generateCSV(data) {
    if (data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]);

    const escapeCSV = (value) => {
      if (value === null || value === undefined) {
        return '';
      }
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const csvRows = [headers.map(escapeCSV).join(',')];

    for (const row of data) {
      const values = headers.map(header => escapeCSV(row[header]));
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  // Download CSV file
  downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startExport') {
    const exporter = new SalesforceMetadataExporter();
    exporter.exportMetadata(request.options);
    sendResponse({ status: 'started' });
  }
  return true;
});

console.log('Salesforce Metadata Exporter: Content script loaded');
