// Saves options to chrome.storage
const saveOptions = () => {
    const search_percent = Math.max(Math.min(Math.floor(document.getElementById('search_percent').value), 100), 5);
    const advanced_pricing = document.getElementById("adv_pricing").checked;
    const debug_mode = document.getElementById("debug_mode").checked;
    const debug_item_count = Math.floor(document.getElementById("debug_item_count").value);
    const debug_item_name = document.getElementById("debug_item_name").value;
  
    chrome.storage.sync.set({ searchPercent: search_percent , advancedPricing: advanced_pricing, debugMode: debug_mode, debugItemCount: debug_item_count, debugItemName: debug_item_name}).then(() => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => { status.textContent = ''; }, 750);
    });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(["searchPercent", "advancedPricing", "debugMode", "debugItemCount", "debugItemName"]).then((items) => {
        document.getElementById('search_percent').setAttribute("value", items.searchPercent);
        document.getElementById("adv_pricing").checked = items.advancedPricing;
        document.getElementById("debug_mode").checked = items.debugMode;
        document.getElementById("debug_item_count").setAttribute("value", items.debugItemCount);
        document.getElementById("debug_item_name").setAttribute("value", items.debugItemName);
    });
};
  
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);