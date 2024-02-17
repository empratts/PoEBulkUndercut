// Saves options to chrome.storage
const saveOptions = () => {
    const search_percent = Math.max(Math.min(Math.floor(document.getElementById('search_percent').value), 5), 100);
  
    chrome.storage.sync.set(
      { searchPercent: search_percent },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { searchPercent:100 },
      (items) => {
        document.getElementById('search_percent').value = items.searchPercent;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);